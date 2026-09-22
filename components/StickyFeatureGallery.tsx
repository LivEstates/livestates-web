"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Phone, { MockChat } from "./Phone";

type Tone = "oat" | "sage" | "clay";

const TONES: Record<Tone, { band: string; arch: string; ring: string; sun: string; leaf: string }> = {
  oat: {
    band: "bg-[#f1e6d5]",
    arch: "bg-[#e8d5be]",
    ring: "border-[#c4673f]/35",
    sun: "bg-[#c4673f]",
    leaf: "bg-[#a9b69a]",
  },
  sage: {
    band: "bg-[#dde3d0]",
    arch: "bg-[#cbd5bb]",
    ring: "border-[#56654d]/30",
    sun: "bg-[#d9a55b]",
    leaf: "bg-[#c4673f]",
  },
  clay: {
    band: "bg-[#f3dccb]",
    arch: "bg-[#ecc8ae]",
    ring: "border-[#9e4a2a]/30",
    sun: "bg-[#56654d]",
    leaf: "bg-[#d9a55b]",
  },
};

/** Paints the brand word in the accent colour without touching the copy. */
function withBrandAccent(text: string) {
  return text.split(/(LivE)(?!states)/).map((part, i) =>
    part === "LivE" ? (
      <span key={i} className="italic text-[#c4673f]">
        {part}
      </span>
    ) : (
      part
    )
  );
}

export default function StickyFeatureGallery({
  id,
  description = "MEET LivE, YOUR VIRTUAL HOME AGENT",
  tone = "oat",
  children,
}: {
  id?: string;
  description?: string;
  tone?: Tone;
  children?: React.ReactNode;
}) {
  const t = TONES[tone];
  const stickyRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: progressRef,
    offset: ["start start", "end start"],
  });

  const rowScale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [1, 0.97, 0.94, 0.9, 0.86]
  );
  const rowBlur = useTransform(
    scrollYProgress,
    [0, 0.16, 0.42, 1],
    ["blur(0px)", "blur(0px)", "blur(8px)", "blur(14px)"]
  );
  const rowOpacity = useTransform(
    scrollYProgress,
    [0, 0.26, 0.44],
    [1, 1, 0]
  );

  const phoneY = useTransform(
    scrollYProgress,
    [0, 0.12, 0.32, 1],
    ["66%", "34%", "0%", "0%"]
  );
  const phoneOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.28, 0.38],
    [0, 0.8, 1]
  );
  const phoneScale = useTransform(
    scrollYProgress,
    [0, 0.6, 1],
    [0.95, 1, 1.05]
  );

  return (
    <section id={id} className={`band my-3 md:my-4 ${t.band}`}>
      <div className="section py-20 md:py-28">
      <div ref={progressRef} className="relative h-[300vh]">
        <div
          ref={stickyRef}
          className="sticky top-16 md:top-20 h-[72vh] flex items-center justify-center"
        >
          {/* Doorway arch + a couple of soft shapes: purely decorative. */}
          <div aria-hidden className="pointer-events-none absolute inset-0 flex items-end justify-center">
            <div className={`arch h-[96%] w-[min(80vw,440px)] ${t.arch}`} />
            <div className={`arch absolute bottom-0 h-[100%] w-[min(88vw,480px)] border-2 border-b-0 border-dashed ${t.ring}`} />
            <div className={`absolute -bottom-2 h-4 w-[min(94vw,600px)] rounded-full opacity-70 ${t.arch}`} />
            <div className={`drift absolute left-[6%] top-[8%] h-16 w-16 rounded-full opacity-80 md:left-[14%] md:h-24 md:w-24 ${t.sun}`} />
            <div className={`drift-slow absolute bottom-[10%] right-[6%] h-14 w-24 rounded-[60%_40%_55%_45%/60%_55%_45%_40%] opacity-70 md:right-[14%] md:h-20 md:w-32 ${t.leaf}`} />
          </div>
          <div className="relative w-full">
            <motion.div
              style={{ scale: rowScale, filter: rowBlur, opacity: rowOpacity }}
              className="font-display flex items-center justify-center whitespace-pre-wrap text-center text-[clamp(2.2rem,6.6vw,6.25rem)] font-medium leading-[1] tracking-[-0.015em] text-[#3b2a20]"
            >
              <span className="max-w-[13ch] md:max-w-[17ch]">
                {withBrandAccent(description)}
              </span>
            </motion.div>

            <motion.div
              style={{ y: phoneY, opacity: phoneOpacity, scale: phoneScale }}
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              <Phone>
                {children || (
                  <MockChat title="LivEstates" accent={"violet" as any} />
                )}
              </Phone>
            </motion.div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
