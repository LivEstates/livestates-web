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
      className={variant === "intro" ? "w-full p-2 md:p-4" : "w-full"}
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
            ? "sticky top-2 md:top-4 h-[calc(100vh-1rem)] md:h-[calc(100vh-2rem)] w-full overflow-hidden rounded-[2px] bg-[#2a241c] ring-1 ring-ink/30 z-10"
            : "sticky top-0 h-screen w-full overflow-hidden bg-[#2a241c] z-10"
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
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,18,12,0.55)_0%,rgba(23,18,12,0.28)_45%,rgba(23,18,12,0.6)_100%)]" />
            ) : null}
          </motion.div>
        ))}

        {/* Plate frame: an inset hairline like a printed photo border. */}
        <div
          aria-hidden="true"
          className={
            isIntro
              ? "pointer-events-none absolute inset-3 z-20 border border-[#f3ede2]/30 md:inset-5"
              : "pointer-events-none absolute inset-4 z-20 border border-[#f3ede2]/25 md:inset-8"
          }
        />

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
                      ? "max-w-[min(94vw,1440px)] px-6 text-center font-display text-[clamp(2.3rem,6vw,6.25rem)] font-light leading-[0.98] tracking-[0.01em] text-[#f7f2e8] whitespace-pre-wrap [text-shadow:0_2px_30px_rgba(0,0,0,0.25)]"
                      : "max-w-[min(94vw,1440px)] px-6 text-center font-display text-[clamp(3rem,9vw,9rem)] font-light italic leading-[0.92] tracking-[-0.01em] text-[#f7f2e8] whitespace-pre-wrap [text-shadow:0_2px_30px_rgba(0,0,0,0.25)]"
                  }
                >
                  {text}
                </h2>
              </motion.div>
            ) : null
          )}
        </div>

        {isIntro && (
          <div className="pointer-events-none absolute bottom-9 left-9 z-30 hidden font-mono text-[11px] tracking-[0.28em] text-[#f3ede2]/80 md:block lg:left-12 lg:bottom-11">
            {galleryItems.map(({ opacity }, idx) => (
              <motion.div
                key={idx}
                style={{ opacity }}
                className="absolute bottom-0 left-0 flex items-center gap-3 whitespace-nowrap"
              >
                <span>{String(idx + 1).padStart(2, "0")}</span>
                <span className="h-px w-10 bg-[#f3ede2]/50" />
                <span className="text-[#f3ede2]/50">
                  {String(galleryItems.length).padStart(2, "0")}
                </span>
              </motion.div>
            ))}
          </div>
        )}

        {isIntro && (
          <>
            <div className="pointer-events-none absolute inset-0 z-30">
              {galleryItems.map(({ previewSrc, opacity }, idx) =>
                previewSrc ? (
                  <motion.div
                    key={idx}
                    style={{ opacity }}
                    className="absolute right-5 bottom-5 hidden aspect-[3/4] w-32 overflow-hidden rounded-[2px] bg-[#2a241c] p-1.5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] ring-1 ring-[#f3ede2]/50 md:bottom-12 md:right-12 md:block lg:right-20 lg:w-44"
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
    <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-6 text-[#f7f2e8] md:px-12 md:py-10">
      <nav className="hidden flex-1 items-center gap-9 font-mono text-[11px] uppercase tracking-[0.26em] md:flex lg:text-xs">
        <a href="#features" className="link-underline transition hover:text-white">
          Features
        </a>
        <a href="#faq" className="link-underline transition hover:text-white">
          FAQs
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noreferrer"
          className="link-underline transition hover:text-white"
        >
          Support
        </a>
      </nav>

      <a
        href="#"
        className="font-display text-[1.7rem] font-medium leading-none tracking-[0.01em] md:absolute md:left-1/2 md:-translate-x-1/2 md:text-[2.4rem]"
      >
        LivEstates
      </a>

      <div className="flex flex-1 justify-end">
        <a
          href="#download"
          className="inline-flex items-center border border-[#f3ede2]/70 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.24em] text-[#f7f2e8] backdrop-blur-[2px] transition duration-500 hover:bg-[#f3ede2] hover:text-ink md:px-6 md:py-3 md:text-[11px]"
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
    <div className="pointer-events-none absolute inset-x-0 bottom-8 z-30 flex items-end justify-center px-5 md:bottom-12 md:px-9">
      <div className="flex items-center gap-2.5 md:gap-3">
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
      ? "bg-[#f3ede2] text-ink border-[#f3ede2]"
      : tone === "red"
      ? "bg-clay text-[#f7f2e8] border-clay"
      : "bg-black/15 text-[#f7f2e8] border-[#f3ede2]/55";

  return (
    <span
      aria-label={label}
      className={`${toneClass} inline-flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md md:h-14 md:w-14`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px] md:h-5 md:w-5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      >
        {children}
      </svg>
    </span>
  );
}
