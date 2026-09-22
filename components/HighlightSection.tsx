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
    <section className="bg-dots overflow-hidden">
      <div className="section py-24 md:py-36">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1fr_0.9fr]">
        <div className="min-w-0">
          <p className="sticker -rotate-2 bg-navy text-lime">
            Dual Camera
          </p>
          <h2 className="mt-7 font-display text-[clamp(3rem,13.5vw,5rem)] leading-[1] tracking-normal text-ink md:text-[clamp(4.5rem,7.4vw,7.5rem)] md:leading-[0.98]">
            {title}
          </h2>
          <p className="mt-7 max-w-xl border-l-[6px] border-tomato pl-5 text-lg font-medium leading-relaxed text-ink/80 md:text-xl">
            {description}
          </p>
        </div>

        <div className="phone-pair relative flex min-h-[420px] min-w-0 items-center justify-center md:min-h-[640px]">
          {/* Decorative colour blocks behind the phones. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 inset-y-[22%] -rotate-3 rounded-[32px] md:inset-x-[-2%] border-[3px] border-ink bg-lime shadow-hard-lg"
          />
          <div
            aria-hidden="true"
            className="absolute right-[4%] top-[6%] h-16 w-16 rounded-full border-[3px] border-ink bg-tomato shadow-hard md:h-24 md:w-24"
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
            className="-ml-20 mt-16 md:-ml-28"
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
      </div>
    </section>
  );
}
