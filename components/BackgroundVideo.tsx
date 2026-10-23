"use client";
import { useEffect, useRef, useState } from "react";
import type { MotionValue } from "framer-motion";
import { enqueueVideo, releaseVideoQueue } from "./videoQueue";
import { getPosterPath } from "@/utils/path";

/**
 * - `eager`: the first hero slide. src, poster and autoplay are in the HTML,
 *   so the download starts while the page is still parsing.
 * - `queued`: waits in the video queue (videoQueue.ts), lowest priority first.
 * - `near`: loads once it is within a screen of the viewport.
 */
export type VideoLoad = "eager" | "queued" | "near";

// How long a clip may hold the queue, so a slow connection degrades to
// parallel downloads instead of stalling.
const BUFFER_TIMEOUT_MS = 4000;

/** Resolves once `el` has buffered to its end, fails, or `ms` pass. The first
 *  slide waits for this rather than `canplaythrough`, which fires on an early
 *  estimate and would let the queue start sharing its connection. */
function whenBuffered(el: HTMLVideoElement, ms: number) {
  return new Promise<void>((resolve) => {
    const full = () =>
      el.duration > 0 && el.buffered.length > 0 && el.buffered.end(el.buffered.length - 1) >= el.duration - 0.1;
    if (full()) return resolve();
    // Poll: the buffered range can reach the end after the last `progress`
    // event, and nothing fires after that.
    const poll = window.setInterval(() => {
      if (full()) finish();
    }, 250);
    const finish = () => {
      window.clearInterval(poll);
      window.clearTimeout(timer);
      el.removeEventListener("error", finish);
      resolve();
    };
    el.addEventListener("error", finish);
    const timer = window.setTimeout(finish, ms);
  });
}

/** Resolves once `el` can play through, fails, or `ms` pass. Queued clips
 *  are hidden until the visitor scrolls, so being ready to play is enough
 *  before the next one starts. */
function whenPlayable(el: HTMLVideoElement, ms: number) {
  return new Promise<void>((resolve) => {
    if (el.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) return resolve();
    const finish = () => {
      el.removeEventListener("canplaythrough", finish);
      el.removeEventListener("error", finish);
      window.clearTimeout(timer);
      resolve();
    };
    el.addEventListener("canplaythrough", finish);
    el.addEventListener("error", finish);
    const timer = window.setTimeout(finish, ms);
  });
}

/** Muted looping background clip with a first-frame poster. It plays only
 *  while it is on screen and its layer is visible. */
export default function BackgroundVideo({
  src,
  load,
  priority = 0,
  visibility,
  minWidth,
  eagerPoster = false,
  className,
}: {
  src: string;
  load: VideoLoad;
  /** Position in the queue; lower loads first. */
  priority?: number;
  /** Opacity of the layer the clip sits in. The clip plays only while it is
   *  above 0, and a queued clip that becomes visible loads at once. */
  visibility?: MotionValue<number>;
  /** Never load below this viewport width (for elements CSS hides there). */
  minWidth?: number;
  /** Put the poster in the HTML even though the clip itself is deferred. */
  eagerPoster?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [armed, setArmed] = useState(load === "eager");
  const armedRef = useRef(armed);
  // True while a queued clip takes its turn: it plays hidden, because browsers
  // buffer a playing clip at full speed but a paused one slowly or, in iOS
  // Safari, not at all.
  const warmingRef = useRef(false);
  const syncRef = useRef(() => {});

  const arm = () => {
    if (armedRef.current) return;
    armedRef.current = true;
    setArmed(true);
  };

  // The first slide frees the queue once it is fully buffered (its download
  // starts before hydration, so it may already be done by now).
  useEffect(() => {
    const el = ref.current;
    if (load !== "eager" || !el) return;
    let live = true;
    whenBuffered(el, BUFFER_TIMEOUT_MS).then(() => live && releaseVideoQueue());
    return () => {
      live = false;
    };
  }, [load]);

  // Deferred loading.
  useEffect(() => {
    const el = ref.current;
    if (!el || load === "eager") return;
    const cleanups: (() => void)[] = [];
    const start = () => {
      if (load === "near") {
        const io = new IntersectionObserver(
          (entries) => {
            if (entries.some((e) => e.isIntersecting)) {
              arm();
              io.disconnect();
            }
          },
          { rootMargin: "100% 0px" },
        );
        io.observe(el);
        cleanups.push(() => io.disconnect());
        return;
      }
      cleanups.push(
        enqueueVideo(priority, async () => {
          if (armedRef.current) return;
          warmingRef.current = true;
          arm();
          await whenPlayable(el, BUFFER_TIMEOUT_MS);
          warmingRef.current = false;
          syncRef.current();
        }),
      );
    };
    if (!minWidth) {
      start();
    } else {
      const mq = window.matchMedia(`(min-width: ${minWidth}px)`);
      const onChange = () => {
        if (!mq.matches) return;
        mq.removeEventListener("change", onChange);
        start();
      };
      if (mq.matches) start();
      else {
        mq.addEventListener("change", onChange);
        cleanups.push(() => mq.removeEventListener("change", onChange));
      }
    }
    return () => cleanups.forEach((c) => c());
  }, [load, priority, minWidth]);

  // Play only while on screen and visible; pause otherwise, so a phone never
  // decodes clips nobody can see.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let onScreen = false;
    let shown = visibility ? visibility.get() > 0.01 : true;
    const sync = () => {
      // A hidden (display: none) element never intersects, so this also
      // keeps CSS-hidden tiles from loading.
      if (shown && onScreen && load === "queued") arm();
      if (armedRef.current && ((onScreen && shown) || warmingRef.current)) {
        if (el.paused) el.play().catch(() => {});
      } else if (!el.paused) {
        el.pause();
      }
    };
    syncRef.current = sync;
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      sync();
    });
    io.observe(el);
    const unsubscribe = visibility?.on("change", (v) => {
      if (v > 0.01 !== shown) {
        shown = v > 0.01;
        sync();
      }
    });
    return () => {
      io.disconnect();
      unsubscribe?.();
    };
  }, [visibility, load]);

  // A clip that just got its src may already be visible.
  useEffect(() => {
    if (armed) syncRef.current();
  }, [armed]);

  return (
    <video
      ref={ref}
      className={className}
      src={armed ? src : undefined}
      poster={armed || eagerPoster ? getPosterPath(src) : undefined}
      preload={armed ? "auto" : "none"}
      autoPlay={load === "eager"}
      muted
      loop
      playsInline
    />
  );
}
