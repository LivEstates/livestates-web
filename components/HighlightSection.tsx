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
    <section className="section py-24 md:py-36">
      <div className="grid items-center gap-12 md:grid-cols-[1fr_0.9fr]">
        <div className="min-w-0">
          <p className="tag flex items-center gap-3">
            <span aria-hidden className="live-dot" />
            Dual Camera
          </p>
          <h2 className="mt-6 font-display text-[clamp(2rem,8.6vw,4.6rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-white md:text-[clamp(2.4rem,4.8vw,4.6rem)]">
            {title}
          </h2>
          <p className="mt-6 max-w-xl border-l border-signal/50 pl-5 text-lg leading-relaxed text-slate-300 md:text-xl">
            {description}
          </p>
        </div>

        <div className="highlight-phones relative flex min-h-[460px] min-w-0 items-center justify-center md:min-h-[520px]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-[10%] rounded-full bg-[radial-gradient(closest-side,rgba(61,245,200,0.3),rgba(24,120,190,0.15)_55%,transparent)] blur-2xl"
          />
          <motion.div
            initial={{ rotate: -8, y: 20, opacity: 0 }}
            whileInView={{ rotate: -4, y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
          >
            <Phone>
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
            className="-ml-[30vw] mt-16 md:-ml-28"
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
