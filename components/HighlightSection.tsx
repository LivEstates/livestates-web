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
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-400">
            Dual Camera
          </p>
          <h2 className="mt-5 text-[clamp(2.75rem,7vw,6.25rem)] font-extrabold leading-[1] tracking-normal text-slate-950 dark:text-white">
            {title}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300 md:text-xl">
            {description}
          </p>
        </div>

        <div className="relative flex min-h-[520px] items-center justify-center">
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
