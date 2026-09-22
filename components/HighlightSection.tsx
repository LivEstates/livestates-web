"use client";
import { motion } from "framer-motion";
import Phone, { MockChat } from "./Phone";

export default function HighlightSection({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="section py-24 md:py-40">
      <div className="mb-12 flex items-center gap-4 md:mb-20">
        <span className="font-mono text-[11px] tracking-[0.3em] text-bronze md:text-xs">04</span>
        <span className="h-px flex-1 bg-ink/20" />
      </div>
      <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-14 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] md:gap-12">
        <div className="md:pb-10">
          <p className="eyebrow flex items-center gap-3">
            <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-bronze" />
            Dual Camera
          </p>
          <h2 className="mt-7 font-display text-[clamp(2.6rem,6.6vw,6.5rem)] font-normal leading-[0.95] tracking-[-0.015em] text-ink">
            {title}
          </h2>
          <div className="mt-10 grid gap-6 border-t border-ink/15 pt-6 md:ml-[18%] md:grid-cols-[auto_1fr]">
            <span aria-hidden="true" className="hidden font-display text-5xl italic leading-none text-bronze md:block">&para;</span>
            <p className="max-w-md text-lg font-light leading-relaxed text-ink/70 md:text-xl">
              {description}
            </p>
          </div>
        </div>

        <div className="relative flex min-h-[460px] items-center justify-center md:min-h-[620px]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[6%] inset-y-[4%] border border-ink/15 bg-bone/60 md:inset-x-[10%]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[3%] top-[10%] font-mono text-[10px] tracking-[0.3em] text-ink/40 [writing-mode:vertical-rl] md:left-[6%]"
          >
            01 — 02
          </div>
          <motion.div
            initial={{ rotate: -8, y: 20, opacity: 0 }}
            whileInView={{ rotate: -4, y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
          >
            <Phone className="max-md:!h-[118vw] max-md:!w-[58vw]">
              <MockChat
                title="Live Tour"
                messages={[
                  {
                    id: "1",
                    role: "assistant",
                    text: "Front camera is on. Want to see the street view next?",
                  },
                  {
                    id: "2",
                    role: "user",
                    text: "Yes, and then the primary bedroom.",
                  },
                ]}
              />
            </Phone>
          </motion.div>
          <motion.div
            className="-ml-24 mt-16 md:-ml-28"
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
            <Phone className="scale-90 max-md:!h-[118vw] max-md:!w-[58vw]">
              <MockChat
                title="Agent"
                messages={[
                  {
                    id: "1",
                    role: "assistant",
                    text: "The showing request is ready to send.",
                  },
                  {
                    id: "2",
                    role: "user",
                    text: "Send it for Saturday afternoon.",
                  },
                ]}
              />
            </Phone>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
