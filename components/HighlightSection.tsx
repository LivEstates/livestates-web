"use client";
import { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import Phone, { MockChat } from "./Phone";

export default function HighlightSection({
  title,
  description,
}: {
  title?: string;
  description?: string;
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
        <div className="grid items-center gap-12 md:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-400">
              Dual Camera
            </p>
            <h2 className="mt-5 whitespace-pre-line text-[clamp(2.75rem,7vw,6.25rem)] font-extrabold leading-[1] tracking-normal text-slate-950 dark:text-white">
              {title}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300 md:text-xl">
              {description}
            </p>
          </div>

          <div className="highlight-stage relative flex min-h-[520px] items-center justify-center">
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
                  <Phone>
                    <MockChat
                      title="Live Tour"
                      rowInsetClassName="pr-[26%]"
                      messages={[
                        {
                          id: "1",
                          role: "assistant",
                          text: "Thank you for your showing request. I'm currently reviewing homes that match your criteria and will share options shortly.",
                        },
                        {
                          id: "2",
                          role: "user",
                          text: "Sounds great! I'm open to a private live tour too.",
                        },
                      ]}
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
                  <Phone className="scale-90">
                    <MockChat
                      title="Agent"
                      messages={[
                        {
                          id: "1",
                          role: "assistant",
                          text: "Thank you for your showing request. I have a few questions about what you're looking for. Would you be available for a quick call?",
                        },
                        {
                          id: "2",
                          role: "user",
                          text: "Of course! You can reach me at (555) 123‑4567.",
                        },
                      ]}
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
