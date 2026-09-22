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
      className={variant === "intro" ? "w-full p-2 md:p-4" : "w-full px-2 md:px-4"}
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
    [40, 40, 72]
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
            ? "sticky top-2 md:top-4 h-[calc(100svh-1rem)] md:h-[calc(100vh-2rem)] w-full overflow-hidden rounded-[32px] md:rounded-[52px] shadow-warm z-10"
            : "sticky top-2 md:top-4 h-[calc(100svh-1rem)] md:h-[calc(100vh-2rem)] w-full overflow-hidden shadow-warm z-10"
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
            {text ? <div className="absolute inset-0 bg-gradient-to-b from-[#3b2a20]/55 via-[#5c3a24]/30 to-[#2e1f16]/65" /> : null}
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
                      ? "font-display max-w-[min(94vw,1440px)] px-5 text-center text-[clamp(2rem,5vw,5.25rem)] font-medium leading-[1.04] tracking-[-0.01em] text-[#fff6ea] [text-shadow:0_2px_24px_rgba(59,42,32,0.45)] whitespace-pre-wrap"
                      : "font-display max-w-[min(94vw,1440px)] px-5 text-center text-[clamp(2.75rem,8vw,8rem)] font-medium italic leading-[1] tracking-[-0.02em] text-[#fff6ea] [text-shadow:0_2px_24px_rgba(59,42,32,0.45)] whitespace-pre-wrap"
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
                    className="absolute right-5 bottom-5 hidden aspect-[3/4] w-32 overflow-hidden rounded-t-full rounded-b-[28px] bg-[#e8d5be] shadow-warm ring-[5px] ring-[#fbf5eb] md:bottom-8 md:block lg:right-16 lg:w-44"
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
    <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between bg-gradient-to-b from-[#2e1f16]/45 to-transparent px-5 pb-10 pt-5 text-[#fff6ea] md:px-10 md:pb-12 md:pt-8">
      <nav className="hidden flex-1 items-center gap-1 text-sm font-medium md:flex lg:text-base">
        <a href="#features" className="rounded-full px-4 py-2 transition hover:bg-[#fff6ea]/15">
          Features
        </a>
        <a href="#faq" className="rounded-full px-4 py-2 transition hover:bg-[#fff6ea]/15">
          FAQs
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noreferrer"
          className="rounded-full px-4 py-2 transition hover:bg-[#fff6ea]/15"
        >
          Support
        </a>
      </nav>

      <a
        href="#"
        className="font-display absolute left-5 text-2xl font-semibold tracking-[-0.01em] md:left-1/2 md:-translate-x-1/2 md:text-[2rem]"
      >
        LivEstates
      </a>

      <div className="flex flex-1 justify-end">
        <a
          href="#download"
          className="btn btn-cream px-5 py-2.5 text-sm md:px-7 md:py-3.5 md:text-base"
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
      ? "bg-[#56654d] text-[#fff6ea]"
      : tone === "red"
      ? "bg-[#c4673f] text-[#fff6ea]"
      : "bg-[#fbf5eb]/85 text-[#3b2a20]";

  return (
    <span
      aria-label={label}
      className={`${toneClass} inline-flex h-12 w-12 items-center justify-center rounded-full shadow-[0_10px_24px_-8px_rgba(46,31,22,0.6)] backdrop-blur md:h-14 md:w-14`}
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
