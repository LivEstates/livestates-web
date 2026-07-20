"use client";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type HeroVariant = "plain" | "intro";

/**
 * [landscapeSrc, overlayText, portraitSrc?]
 *
 * A 16:9 clip in a portrait viewport gets cropped to a narrow centre strip, so
 * slides whose subject matters can ship a portrait-framed alternate.
 */
export type HeroItem = [src: string, text: string, portraitSrc?: string];

/** Tracks `(orientation: portrait)`, defaulting to false so SSR and the first
 *  client render agree. The effect corrects it immediately after hydration. */
function useIsPortrait() {
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(orientation: portrait)");
    const sync = () => setIsPortrait(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return isPortrait;
}

export default function Hero({
  items,
  variant = "plain",
}: {
  items: HeroItem[];
  variant?: HeroVariant;
}) {
  return (
    <section
      className={variant === "intro" ? "w-full bg-white p-1 md:p-2" : "w-full"}
    >
      <VideoScrollGallery items={items} variant={variant} />
    </section>
  );
}

function VideoScrollGallery({
  items,
  variant,
}: {
  items: HeroItem[];
  variant: HeroVariant;
}) {
  const isIntro = variant === "intro";
  const isPortrait = useIsPortrait();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const containerScale = useTransform(
    scrollYProgress,
    [0, 0.8, 1],
    [1, 1, 0.9]
  );
  const containerRadius = useTransform(
    scrollYProgress,
    [0, 0.8, 1],
    [0, 0, 24]
  );

  const galleryItems = items.map(([src, text, portraitSrc], i) => {
    const n = items.length || 1;
    const start = i / n;
    const end = (i + 1) / n;
    const w = end - start;
    const b0 = start;
    const b1 = start + w * 0.25;
    const b2 = start + w * 0.75;
    const b3 = end;

    const opacity = useTransform(
      scrollYProgress,
      [b0, b1, b2, b3],
      [i === 0 ? 1 : 0, 1, 1, i === n - 1 ? 1 : 0]
    );
    const scale = useTransform(scrollYProgress, [b0, b1, b2, b3], [1, 1, 1, 1]);

    const textY = useTransform(
      scrollYProgress,
      [start, end],
      [i === 0 ? "0%" : "30%", i === 0 ? "-50%" : "-50%"]
    );

    return {
      src: isPortrait && portraitSrc ? portraitSrc : src,
      text,
      opacity,
      scale,
      textY,
    };
  });

  const containerHeightVh = Math.max(180 * (items.length || 1), 160);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${containerHeightVh}vh` }}
    >
      <motion.div
        className={
          isIntro
            ? "sticky top-1 md:top-2 h-[calc(100vh-0.5rem)] md:h-[calc(100vh-1rem)] w-full overflow-hidden rounded-[28px] md:rounded-[32px] shadow-2xl z-10"
            : "sticky top-0 h-screen w-full overflow-hidden shadow-2xl z-10"
        }
        style={
          isIntro
            ? { scale: containerScale }
            : { scale: containerScale, borderRadius: containerRadius }
        }
      >
        {galleryItems.map(({ src, text, opacity, scale }, idx) => (
          <motion.div
            key={idx}
            style={{ opacity, scale }}
            className="absolute inset-0 h-full w-full"
          >
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={src}
              playsInline
              muted
              autoPlay
              loop
              preload="metadata"
            />
            {/* Scrim only where overlay copy sits on top — slides that carry
                their own artwork are shown untinted. */}
            {text ? <div className="absolute inset-0 bg-black/45" /> : null}
          </motion.div>
        ))}

        {isIntro && <IntroChrome />}

        <div className="absolute inset-0 z-20 pointer-events-none">
          {galleryItems.map(({ text, opacity, scale, textY }, idx) =>
            text ? (
              <motion.div
                key={idx}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  opacity,
                  scale,
                  y: textY,
                }}
              >
                <h2
                  className={
                    isIntro
                      ? "max-w-[min(94vw,1440px)] px-4 text-center text-[clamp(2.25rem,4.5vw,4.75rem)] font-bold leading-[1.08] tracking-normal text-white drop-shadow-md whitespace-pre-wrap"
                      : "max-w-[min(94vw,1440px)] px-4 text-center text-[clamp(2.25rem,4.5vw,4.75rem)] font-bold leading-[1.08] tracking-normal text-white drop-shadow-md whitespace-pre-wrap"
                  }
                >
                  {text}
                </h2>
              </motion.div>
            ) : null
          )}
        </div>

        {isIntro && <CallOverlay previewSrc={items[0]?.[0]} />}
      </motion.div>
    </div>
  );
}

function IntroChrome() {
  return (
    <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 py-5 text-white md:px-9 md:py-7">
      <nav className="hidden flex-1 items-center gap-8 text-sm font-semibold md:flex lg:text-base">
        <a href="#features" className="transition hover:text-white/75">
          Features
        </a>
        <a href="#faq" className="transition hover:text-white/75">
          FAQs
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noreferrer"
          className="transition hover:text-white/75"
        >
          Support
        </a>
      </nav>

      <a
        href="#"
        className="absolute left-1/2 -translate-x-1/2 text-xl font-bold tracking-normal md:text-3xl"
      >
        LivEstates
      </a>

      <div className="flex flex-1 justify-end">
        <a
          href="#download"
          className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-extrabold text-black shadow-lg transition hover:bg-white/90 md:px-7 md:text-base"
        >
          Get the App
        </a>
      </div>
    </div>
  );
}

function CallOverlay({ previewSrc }: { previewSrc?: string }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-5 z-30 flex items-end justify-center px-5 md:bottom-7 md:px-9">
      <div className="flex items-center gap-3">
        <CallButton label="Mic">
          <path d="M12 4a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V7a3 3 0 0 0-3-3Z" />
          <path d="M19 11a7 7 0 0 1-14 0" />
          <path d="M12 18v3" />
          <path d="M8 21h8" />
        </CallButton>
        <CallButton label="Audio">
          <path d="M4 10v4h4l5 4V6L8 10H4Z" />
          <path d="M16 9a4 4 0 0 1 0 6" />
        </CallButton>
        <CallButton label="Video">
          <path d="M4 7h10v10H4z" />
          <path d="m14 11 5-3v8l-5-3" />
        </CallButton>
        <CallButton label="Chat" tone="blue">
          <path d="M5 6h14v10H8l-3 3V6Z" />
          <path d="M9 10h6" />
          <path d="M9 13h4" />
        </CallButton>
        <CallButton label="End" tone="red">
          <path d="M8 8l8 8" />
          <path d="M16 8l-8 8" />
        </CallButton>
      </div>

      {previewSrc && (
        <div className="absolute right-5 bottom-0 hidden aspect-[3/4] w-32 overflow-hidden rounded-2xl bg-white/10 shadow-2xl ring-1 ring-white/20 md:block lg:right-20 lg:w-44">
          <video
            src={previewSrc}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
        </div>
      )}
    </div>
  );
}

function CallButton({
  children,
  label,
  tone = "dark",
}: {
  children: ReactNode;
  label: string;
  tone?: "dark" | "blue" | "red";
}) {
  const toneClass =
    tone === "blue"
      ? "bg-blue-600"
      : tone === "red"
      ? "bg-red-500"
      : "bg-black/60";

  return (
    <span
      aria-label={label}
      className={`${toneClass} inline-flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg backdrop-blur md:h-14 md:w-14`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        {children}
      </svg>
    </span>
  );
}
