"use client";
import { useEffect, useRef, useState } from "react";
import type { MotionValue } from "framer-motion";
import {
  enqueueVideo,
  isVideoQueueReleased,
  releaseNearPosters,
  releasePosters,
  releaseVideoQueue,
  whenNearPostersReleased,
  whenPostersReleased,
} from "./videoQueue";
import { getPosterPath } from "@/utils/path";

/**
 * - `eager`: the first hero slide. Its video, poster and autoplay are in the
 *   HTML, so the download starts while the page is still parsing.
 * - `queued`: waits in the video queue (videoQueue.ts), lowest priority first.
 *   Its poster loads earlier, as soon as the first slide is playing.
 * - `near`: loads once it is within a screen of the viewport. Its poster
 *   loads earlier, with all the others, as soon as the first `near` clip
 *   starts loading.
 */
export type VideoLoad = "eager" | "queued" | "near";

// How long a clip may hold the queue, so a slow connection degrades to
// parallel downloads instead of stalling.
const BUFFER_TIMEOUT_MS = 4000;

// Viewports at least this wide get a clip's full frame. Narrower ones get its
// narrow cut, the centre 2:3 of the frame: a stage that fills such a viewport
// shows no more than that centre under `object-cover`, so the cut looks the
// same for a quarter to a half of the bytes.
const WIDE_MEDIA = "(min-aspect-ratio: 2/3)";

/** Calls `fail` once `el` can't load its clip, and returns a function that
 *  stops listening. A clip with `<source>`s fires `error` at each source it
 *  skips, for a failed fetch and also for a `media` that doesn't match, and
 *  the event doesn't bubble. So listen in the capture phase, and count only
 *  the last source: before it, the browser goes on to the next one. */
function onLoadError(el: HTMLVideoElement, fail: () => void) {
  const listener = (e: Event) => {
    if (e.target === el || e.target === el.lastElementChild) fail();
  };
  el.addEventListener("error", listener, { capture: true });
  return () => el.removeEventListener("error", listener, { capture: true });
}

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
      stopErrors();
      resolve();
    };
    const stopErrors = onLoadError(el, finish);
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
      stopErrors();
      window.clearTimeout(timer);
      resolve();
    };
    el.addEventListener("canplaythrough", finish);
    const stopErrors = onLoadError(el, finish);
    const timer = window.setTimeout(finish, ms);
  });
}

/** Muted looping background clip with a first-frame poster. It plays only
 *  while it is on screen and its layer is visible. */
export default function BackgroundVideo({
  src,
  narrowSrc,
  load,
  priority = 0,
  visibility,
  minWidth,
  firstScreen = false,
  className,
}: {
  src: string;
  /** Centre 2:3 cut of `src` for narrow viewports (see WIDE_MEDIA). Both go
   *  in as `<source>`s, in the HTML for an eager clip, so the browser picks
   *  one before it starts loading and downloads only that one. Narrow
   *  viewports also get the cut's own poster, a third of the size, except
   *  for an eager clip, whose poster is in the HTML. With it, `src` must not
   *  change: a changed `<source>` doesn't reload the clip. */
  narrowSrc?: string;
  load: VideoLoad;
  /** Position in the queue; lower loads first. */
  priority?: number;
  /** Opacity of the layer the clip sits in. The clip plays only while it is
   *  above 0, and a queued clip that becomes visible loads at once. */
  visibility?: MotionValue<number>;
  /** Never load below this viewport width (for elements CSS hides there). */
  minWidth?: number;
  /** A queued clip on the first screen alongside the eager one, such as slide
   *  1's tile. Its poster ships in the HTML, and it waits for the queue even
   *  while visible, so it doesn't split the eager clip's connection. Give it
   *  the queue's first slot. */
  firstScreen?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [armed, setArmed] = useState(load === "eager");
  const [posterReleased, setPosterReleased] = useState(false);
  const [narrowPoster, setNarrowPoster] = useState(false);
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

  // `<source media>` is read only when the clip loads. A viewport that turns
  // wide later, such as a phone turned sideways, would show the narrow cut
  // zoomed to fill it, so it switches to the full frame. An eager clip loads
  // before hydration, so the viewport may already have turned: check once
  // now too. This runs before the next effect, so a clip reloaded here holds
  // the queue until the full frame is buffered, like any first load.
  useEffect(() => {
    const el = ref.current;
    if (!el || !narrowSrc) return;
    const wide = window.matchMedia(WIDE_MEDIA);
    // The poster follows the clip, if it isn't in the HTML.
    if (load !== "eager") setNarrowPoster(!wide.matches);
    const onChange = () => {
      if (!wide.matches) return;
      setNarrowPoster(false);
      if (!el.currentSrc.endsWith(narrowSrc)) return;
      // Reloading picks the source again. It pauses the clip, and autoplay
      // restarts it even out of view, so sync once more when it plays.
      el.load();
      el.addEventListener("play", () => syncRef.current(), { once: true });
      syncRef.current();
    };
    wide.addEventListener("change", onChange);
    onChange();
    return () => wide.removeEventListener("change", onChange);
  }, [narrowSrc, load]);

  // The first slide frees the other clips' posters once it is playing, and the
  // queue once it is fully buffered. Its download starts before hydration, so
  // either may already have happened by now.
  useEffect(() => {
    const el = ref.current;
    if (load !== "eager" || !el) return;
    let live = true;
    if (!el.paused && el.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) releasePosters();
    else el.addEventListener("playing", releasePosters, { once: true });
    whenBuffered(el, BUFFER_TIMEOUT_MS).then(() => live && releaseVideoQueue());
    return () => {
      live = false;
      el.removeEventListener("playing", releasePosters);
    };
  }, [load]);

  // Deferred loading.
  useEffect(() => {
    const el = ref.current;
    if (!el || load === "eager") return;
    const cleanups: (() => void)[] = [];
    const start = () => {
      if (load === "near") {
        // A poster loaded only with its own clip shares the link with the
        // videos loading by then, and on a fast scroll it can arrive after
        // its empty scrim is on screen. So the first clip down here to start
        // loading starts every poster down here, before those videos.
        cleanups.push(whenNearPostersReleased(() => setPosterReleased(true)));
        const io = new IntersectionObserver(
          (entries) => {
            if (entries.some((e) => e.isIntersecting)) {
              releaseNearPosters();
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
      cleanups.push(whenPostersReleased(() => setPosterReleased(true)));
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
    // Unknown until the observer first reports. Until then sync() leaves the
    // clip alone: at hydration the eager clip may already be playing.
    let onScreen: boolean | undefined;
    let shown = visibility ? visibility.get() > 0.01 : true;
    const sync = () => {
      if (onScreen === undefined) return;
      // A queued clip that comes into view loads at once, except a first-screen
      // one: it is in view from the start, so it waits for the queue. A hidden
      // (display: none) element never intersects, so this also keeps
      // CSS-hidden tiles from loading.
      if (shown && onScreen && load === "queued" && (!firstScreen || isVideoQueueReleased())) arm();
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
  }, [visibility, load, firstScreen]);

  // A clip that just got its src may already be visible. A new src (slide 3
  // follows the orientation) pauses the clip, and only the eager one has
  // autoplay to restart it.
  useEffect(() => {
    if (armed) syncRef.current();
  }, [armed, src]);

  return (
    <video
      ref={ref}
      className={className}
      src={armed && !narrowSrc ? src : undefined}
      poster={armed || firstScreen || posterReleased ? getPosterPath(narrowPoster && narrowSrc ? narrowSrc : src) : undefined}
      preload={armed ? "auto" : "none"}
      autoPlay={load === "eager"}
      muted
      loop
      playsInline
    >
      {armed && narrowSrc ? (
        <>
          {/* Full frame first: a browser that ignores `media` takes the first source. */}
          <source src={src} media={WIDE_MEDIA} type="video/mp4" />
          <source src={narrowSrc} type="video/mp4" />
        </>
      ) : null}
    </video>
  );
}
