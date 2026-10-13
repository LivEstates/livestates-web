"use client";
import { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import Phone from "./Phone";
import { getAssetPath } from "@/utils/path";

const DEFAULT_BACK = {
  src: "/images/app-user-request-v1.jpg",
  alt: "LivEstates app showing request form",
};
const DEFAULT_FRONT = {
  src: "/images/app-showing-requests-v1.jpg",
  alt: "LivEstates app agent showing requests",
};

export default function HighlightSection({
  title,
  description,
  reverse = false,
  backImage = DEFAULT_BACK,
  frontImage = DEFAULT_FRONT,
}: {
  title?: string;
  description?: string;
  /** Phones on the left, text on the right (md and up). */
  reverse?: boolean;
  backImage?: { src: string; alt: string };
  frontImage?: { src: string; alt: string };
}) {
  const fitRef = useRef<HTMLDivElement>(null);

  // Below lg the phone pair is scaled to the column width (see
  // .highlight-fit in globals.css). Scale = column width / 540px design width.
  useLayoutEffect(() => {
    const el = fitRef.current;
    if (!el) return;
    const update = () => {
      const w = el.getBoundingClientRect().width;
      if (w > 0) {
        el.style.setProperty("--highlight-scale", String(Math.min(1, w / 540)));
      }
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    // The clip only trims what already falls past the viewport edge (the
    // tilted second phone pokes a few px out around 1024px wide).
    <div className="overflow-x-clip">
      <section className="section py-24 md:py-36">
        <div className={`grid items-center gap-12 ${reverse ? "md:grid-cols-[0.9fr_1fr]" : "md:grid-cols-[1fr_0.9fr]"}`}>
          <div>
            <h2 className="whitespace-pre-line text-[clamp(2.75rem,7vw,6.25rem)] font-extrabold leading-[1] tracking-normal text-slate-950 dark:text-white">
              {title}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300 md:text-xl">
              {description}
            </p>
          </div>

          <div className={`highlight-stage relative flex min-h-[520px] items-center justify-center ${reverse ? "md:order-first" : ""}`}>
            {/* Below lg these two wrappers scale the phone pair down as one
                unit so it fits narrow screens; at lg and up they are
                display: contents and the layout is exactly as before. */}
            <div ref={fitRef} className="highlight-fit">
              <div className="highlight-cluster">
                <motion.div
                  initial={{ rotate: -8, y: 20, opacity: 0 }}
                  whileInView={{ rotate: -4, y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ type: "spring", stiffness: 120, damping: 14 }}
                >
                  {/* Ivy (10/13): back phone = buyer's User Request form,
                      partly covered by the front phone. Used as-is. */}
                  <Phone>
                    <img
                      src={getAssetPath(backImage.src)}
                      alt={backImage.alt}
                      className="h-full w-full bg-white object-cover object-top"
                    />
                  </Phone>
                </motion.div>
                <motion.div
                  className="-ml-28 mt-16"
                  initial={{ rotate: 12, y: 20, opacity: 0 }}
                  whileInView={{ rotate: 6, y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 14,
                    delay: 0.05,
                  }}
                >
                  {/* Ivy (10/13): front phone = agent's Showing Requests list. */}
                  <Phone className="scale-90">
                    <img
                      src={getAssetPath(frontImage.src)}
                      alt={frontImage.alt}
                      className="h-full w-full bg-white object-cover object-top"
                    />
                  </Phone>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
