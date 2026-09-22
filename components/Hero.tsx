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
      className={variant === "intro" ? "w-full p-1.5 md:p-3" : "w-full"}
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
            ? "sticky top-1.5 md:top-3 h-[calc(100vh-0.75rem)] md:h-[calc(100vh-1.5rem)] w-full overflow-hidden rounded-[26px] md:rounded-[34px] bg-abyss ring-1 ring-white/10 shadow-[0_0_0_1px_rgba(61,245,200,0.12),0_0_80px_-20px_rgba(61,245,200,0.35),0_40px_100px_-30px_rgba(0,0,0,0.9)] z-10"
            : "sticky top-0 h-screen w-full overflow-hidden bg-abyss ring-1 ring-white/10 shadow-[0_0_80px_-20px_rgba(61,245,200,0.3)] z-10"
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
              <>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(3,10,12,0.35),rgba(3,10,12,0.75))]" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#03080b]/60 via-transparent to-[#03080b]/70" />
              </>
            ) : null}
          </motion.div>
        ))}

        <div aria-hidden className="scanlines pointer-events-none absolute inset-0 z-[15] opacity-60" />
        <div aria-hidden className="viewfinder z-[15] hidden md:block" />
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
                      ? "max-w-[min(94vw,1440px)] px-4 text-center font-display text-[clamp(1.6rem,4.6vw,4.5rem)] font-semibold leading-[1.12] tracking-[-0.01em] text-white text-glow whitespace-pre-wrap [text-shadow:0_2px_30px_rgba(0,0,0,0.55),0_0_40px_rgba(61,245,200,0.25)]"
                      : "max-w-[min(94vw,1440px)] px-4 text-center font-display text-[clamp(2rem,6vw,5.5rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-white whitespace-pre-wrap [text-shadow:0_2px_30px_rgba(0,0,0,0.55),0_0_40px_rgba(61,245,200,0.25)]"
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
                    className="absolute right-5 bottom-5 hidden aspect-[3/4] w-32 overflow-hidden rounded-2xl bg-white/10 ring-1 ring-signal/50 shadow-[0_0_30px_-4px_rgba(61,245,200,0.45),0_20px_40px_rgba(0,0,0,0.6)] md:bottom-8 md:block lg:right-16 lg:w-44"
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
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[25] h-40 bg-gradient-to-b from-[#03080b]/90 via-[#03080b]/50 to-transparent md:h-44"
      />
      <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 py-5 text-white md:px-9 md:py-7">
        <nav className="hidden flex-1 items-center gap-7 font-mono text-[0.8rem] font-medium tracking-[0.08em] text-white/80 md:flex">
          <a href="#features" className="transition hover:text-signal">
            Features
          </a>
          <a href="#faq" className="transition hover:text-signal">
            FAQs
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-signal"
          >
            Support
          </a>
        </nav>

        <a
          href="#"
          className="absolute left-5 flex items-center gap-2.5 font-display text-lg font-semibold tracking-[-0.02em] md:left-1/2 md:-translate-x-1/2 md:text-2xl"
        >
          <span aria-hidden className="live-dot is-signal" />
          LivEstates
        </a>

        <div className="flex flex-1 justify-end">
          <a href="#download" className="btn btn-primary !px-5 !py-2.5 md:!px-6 md:!py-3">
            Get the App
          </a>
        </div>
      </div>

      {/* On-air slate */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-5 top-[76px] z-30 flex items-center gap-3 md:left-9 md:top-[100px]"
      >
        <span className="live-badge">
          <span className="live-dot" />
          LIVE
        </span>
        <span className="hidden font-mono text-[0.7rem] tracking-[0.2em] text-white/60 sm:inline">
          REC&nbsp;&nbsp;CH-01&nbsp;&nbsp;1080p
        </span>
      </div>
    </>
  );
}

/** Persistent call chrome. Stays put across slides — the picture-in-picture
 *  tile is rendered per slide so it can cross-fade with the stage behind it. */
function CallControls() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-5 z-30 flex items-end justify-center px-5 md:bottom-8 md:px-9">
      <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-[#03090c]/50 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl md:gap-3">
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
      ? "bg-signal text-[#03140f] ring-1 ring-white/60 shadow-[0_0_24px_rgba(61,245,200,0.6)]"
      : tone === "red"
      ? "bg-onair text-white ring-1 ring-white/30 shadow-[0_0_24px_rgba(255,59,78,0.55)]"
      : "bg-white/[0.07] text-white ring-1 ring-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]";

  return (
    <span
      aria-label={label}
      className={`${toneClass} inline-flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-md md:h-14 md:w-14`}
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
