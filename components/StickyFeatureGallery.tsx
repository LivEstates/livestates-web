"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Phone, { MockChat } from "./Phone";

type Tone = "navy" | "lime" | "tomato";

// Each gallery is a full-bleed block of flat colour; the phone's hard shadow
// is picked to contrast with the block behind it.
const TONES: Record<Tone, { section: string; title: string; shadow: string }> = {
  navy: {
    section: "bg-navy bg-dots-light",
    title: "text-lime text-pop-ink",
    shadow: "var(--lime)",
  },
  lime: {
    section: "bg-lime",
    title: "text-ink",
    shadow: "var(--ink)",
  },
  tomato: {
    section: "bg-tomato",
    title: "text-cream text-pop-ink",
    shadow: "var(--ink)",
  },
};

export default function StickyFeatureGallery({
  id,
  description = "MEET LivE, YOUR VIRTUAL HOME AGENT",
  children,
  tone = "navy",
}: {
  id?: string;
  tone?: Tone;
  description?: string;
  children?: React.ReactNode;
}) {
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

  const t = TONES[tone];

  return (
    <section
      id={id}
      className={`border-b-[3px] border-ink ${t.section}`}
      style={{ ["--phone-shadow" as string]: t.shadow } as React.CSSProperties}
    >
      <div className="section py-24 md:py-36">
      <div ref={progressRef} className="relative h-[300vh]">
        <div
          ref={stickyRef}
          className="sticky top-16 md:top-20 h-[72vh] flex items-center justify-center"
        >
          <div className="relative w-full">
            <motion.div
              style={{ scale: rowScale, filter: rowBlur, opacity: rowOpacity }}
              className={`flex items-center justify-center whitespace-pre-wrap text-center font-display text-[clamp(2.4rem,10.5vw,4.5rem)] leading-[0.98] tracking-normal md:text-[clamp(4.5rem,8.4vw,8.5rem)] md:leading-[0.94] ${t.title}`}
            >
              <span className="max-w-[18ch] md:max-w-[20ch]">
                {description}
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
