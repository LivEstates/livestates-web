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
    <section className="band my-3 bg-[#dde3d0] md:my-4">
      {/* Soft organic shapes behind the copy. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="drift-slow absolute -left-24 -top-24 h-72 w-72 rounded-[58%_42%_63%_37%/45%_55%_45%_55%] bg-[#cbd5bb]" />
        <div className="absolute -bottom-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-[#f1e6d5]/70 md:right-[4%]" />
      </div>
      <div className="section relative py-20 md:py-32">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_0.9fr] md:gap-12">
        <div className="min-w-0">
          <p className="eyebrow bg-[#fbf5eb] text-[#56654d]">
            <span className="h-2 w-2 rounded-full bg-[#c4673f]" />
            Dual Camera
          </p>
          <h2 className="font-display mt-6 text-[clamp(2.4rem,6.4vw,5.75rem)] font-medium leading-[1.02] tracking-[-0.015em] text-[#3b2a20]">
            {title}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#5b4636] md:text-xl">
            {description}
          </p>
        </div>

        <div className="relative flex min-h-[440px] min-w-0 items-center justify-center md:min-h-[600px]">
          <motion.div
            initial={{ rotate: -8, y: 20, opacity: 0 }}
            whileInView={{ rotate: -4, y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
          >
            <Phone className="max-md:!h-[400px] max-md:!w-[196px] max-md:!rounded-[32px]">
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
            className="-ml-16 mt-16 md:-ml-28"
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
            <Phone className="scale-90 max-md:!h-[400px] max-md:!w-[196px] max-md:!rounded-[32px]">
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
