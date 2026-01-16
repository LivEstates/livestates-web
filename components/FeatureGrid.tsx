"use client";
import { motion } from "framer-motion";

const items = [
  "Live Voicemail",
  "Audio Transcription",
  "Voice‑to‑Text",
  "View Stats",
  "Location Share",
  "Media Calendar",
  "End‑to‑End Encryption",
  "Smart Replies",
  "Pinned Chats",
];

export default function FeatureGrid() {
  return (
    <section className="section py-24 md:py-32">
      <h2 className="text-3xl md:text-5xl font-semibold">更多功能</h2>
      <p className="text-slate-600 dark:text-slate-300 mt-3 max-w-prose">
        功能很多，但对话始终是第一位。
      </p>

      <motion.div
        className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.06 } },
        }}
      >
        {items.map((t) => (
          <motion.div
            key={t}
            variants={{
              hidden: { opacity: 0, y: 18 },
              visible: { opacity: 1, y: 0 },
            }}
            className="rounded-2xl border border-black/10 bg-black/[0.03] dark:border-white/10 dark:bg-white/[0.03] p-4 h-32"
          >
            <div className="text-lg">{t}</div>
            <div className="mt-2 h-2 w-2/3 rounded bg-black/10 dark:bg-white/10"></div>
            <div className="mt-2 h-2 w-1/2 rounded bg-black/5 dark:bg-white/5"></div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
