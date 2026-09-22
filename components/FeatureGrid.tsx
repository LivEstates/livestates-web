"use client";
import { motion } from "framer-motion";

const items = [
  {
    title: "Live Open Houses",
    description: "Join real-time property tours without losing the live agent experience.",
  },
  {
    title: "Verified Agents",
    description: "Talk to real professionals who can answer questions while you tour.",
  },
  {
    title: "Interactive Replays",
    description: "Rewatch saved showings and compare homes after the live session ends.",
  },
  {
    title: "Room-by-Room Details",
    description: "Capture finishes, layouts, light, storage, and neighborhood context.",
  },
  {
    title: "Showing Requests",
    description: "Turn interest into action with one clear request flow.",
  },
  {
    title: "Private Messaging",
    description: "Keep buyer, renter, and agent conversations organized in one place.",
  },
  {
    title: "Saved Homes",
    description: "Return to the properties, moments, and details that matter most.",
  },
  {
    title: "Agent Profiles",
    description: "Build trust with live content, verified identity, and clear availability.",
  },
  {
    title: "Market Content",
    description: "Publish tours, updates, and local insights that keep working after live.",
  },
];

export default function FeatureGrid() {
  return (
    <section className="section relative py-24 md:py-36">
      <p className="tag mb-6 flex items-center gap-3">
        <span aria-hidden className="h-px w-8 bg-signal/70" />
        <span aria-hidden>// 09</span>
      </p>
      <h2 className="max-w-4xl font-display text-[clamp(2.2rem,9vw,5.75rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-sheen">
        And so much more.
      </h2>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">
        LivEstates is packed with tools for live property discovery, but the
        showing always comes first.
      </p>

      <motion.div
        className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.06 } },
        }}
      >
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            variants={{
              hidden: { opacity: 0, y: 18 },
              visible: { opacity: 1, y: 0 },
            }}
            className="glass glass-card group min-h-48 overflow-hidden rounded-2xl p-6"
          >
            <div aria-hidden className="mb-8 flex items-center justify-between font-mono text-[0.7rem] tracking-[0.2em] text-white/40">
              <span className="text-signal/90">{String(i + 1).padStart(2, "0")}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-white/25 transition-colors duration-300 group-hover:bg-signal group-hover:shadow-[0_0_10px_rgba(61,245,200,0.9)]" />
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-signal/0 blur-3xl transition-colors duration-500 group-hover:bg-signal/20"
            />
            <div className="font-display text-lg font-medium tracking-[-0.02em] text-white md:text-xl">
              {item.title}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-300/90 md:text-base">
              {item.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
