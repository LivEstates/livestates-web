"use client";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type HeroVariant = "plain" | "intro";

export type HeroItem = {
  /** Landscape clip filling the stage. */
  src: string;
  /** Overlay headline. Empty means the clip carries its own type, which also
   *  suppresses the scrim. */
  text: string;
  /** Portrait-framed alternate. A 16:9 clip in a phone viewport is cropped to a
   *  narrow centre strip, so slides whose subject matters ship one of these. */
  portraitSrc?: string;
  /** Clip for the call overlay's picture-in-picture tile. The tile is the other
   *  end of the call: when the stage shows an agent broadcasting, this is the
   *  property feed; when the stage shows someone watching, this is what they
   *  are watching. */
  previewSrc?: string;
};

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
      className={
        variant === "intro"
          ? "w-full bg-lime p-2 md:p-3"
          : "w-full border-y-[3px] border-ink bg-ink"
      }
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

  const galleryItems = items.map(({ src, text, portraitSrc, previewSrc }, i) => {
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

    const resolvedSrc = isPortrait && portraitSrc ? portraitSrc : src;

    return {
      src: resolvedSrc,
      text,
      // Never run the same clip in the stage and the tile at once — side by side
      // at two sizes it reads as a duplication bug, not a picture-in-picture.
      previewSrc: previewSrc === resolvedSrc ? undefined : previewSrc,
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
            ? "sticky top-2 md:top-3 h-[calc(100vh-1rem)] md:h-[calc(100vh-1.5rem)] w-full overflow-hidden rounded-[22px] md:rounded-[28px] border-[3px] md:border-4 border-ink bg-navy z-10"
            : "sticky top-0 h-screen w-full overflow-hidden bg-navy z-10"
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
            {text ? (
              <div className="absolute inset-0 bg-gradient-to-b from-navy/55 via-black/35 to-navy/70" />
            ) : null}
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
                      ? "text-pop max-w-[min(94vw,1440px)] px-4 text-center font-display text-[clamp(2.6rem,10.5vw,4rem)] leading-[0.98] tracking-normal text-cream whitespace-pre-wrap md:text-[clamp(4rem,7.2vw,7.5rem)] md:leading-[0.95]"
                      : "text-pop max-w-[min(94vw,1440px)] px-4 text-center font-display text-[clamp(3rem,13vw,5rem)] leading-[0.95] tracking-normal text-lime whitespace-pre-wrap md:text-[clamp(5rem,10vw,10rem)]"
                  }
                >
                  {text}
                </h2>
              </motion.div>
            ) : null
          )}
        </div>

        {isIntro && (
          <>
            <div className="pointer-events-none absolute inset-0 z-30">
              {galleryItems.map(({ previewSrc, opacity }, idx) =>
                previewSrc ? (
                  <motion.div
                    key={idx}
                    style={{ opacity }}
                    className="absolute right-5 bottom-5 hidden aspect-[3/4] w-32 rotate-3 overflow-hidden rounded-2xl border-[3px] border-ink bg-navy shadow-hard-tomato md:bottom-7 md:block lg:right-20 lg:w-44"
                  >
                    <video
                      src={previewSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                ) : null
              )}
            </div>
            <CallControls />
          </>
        )}
      </motion.div>
    </div>
  );
}

function IntroChrome() {
  return (
    <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 py-5 text-white md:px-9 md:py-7">
      <nav className="hidden flex-1 items-center gap-2 text-sm font-extrabold md:flex lg:text-base">
        <a href="#features" className="rounded-full border-2 border-transparent px-3 py-1.5 transition hover:border-ink hover:bg-lime hover:text-ink">
          Features
        </a>
        <a href="#faq" className="rounded-full border-2 border-transparent px-3 py-1.5 transition hover:border-ink hover:bg-lime hover:text-ink">
          FAQs
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noreferrer"
          className="rounded-full border-2 border-transparent px-3 py-1.5 transition hover:border-ink hover:bg-lime hover:text-ink"
        >
          Support
        </a>
      </nav>

      <a
        href="#"
        className="absolute left-5 -rotate-2 md:left-1/2 md:-translate-x-1/2 rounded-lg border-[3px] border-ink bg-lime px-3 py-1 font-display text-xl leading-none tracking-normal text-ink shadow-hard-sm md:px-4 md:py-1.5 md:text-3xl"
      >
        LivEstates
      </a>

      <div className="flex flex-1 justify-end">
        <a
          href="#download"
          className="btn btn-cream px-4 py-2 text-sm md:px-7 md:py-3 md:text-base"
        >
          Get the App
        </a>
      </div>
    </div>
  );
}

/** Persistent call chrome. Stays put across slides — the picture-in-picture
 *  tile is rendered per slide so it can cross-fade with the stage behind it. */
function CallControls() {
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
      ? "bg-lime text-ink"
      : tone === "red"
      ? "bg-tomato text-ink"
      : "bg-cream text-ink";

  return (
    <span
      aria-label={label}
      className={`${toneClass} inline-flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-ink shadow-hard-sm md:h-14 md:w-14`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
      >
        {children}
      </svg>
    </span>
  );
}
