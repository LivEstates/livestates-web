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
    <section className="section py-24 md:py-36">
      <h2 className="max-w-4xl text-[clamp(3rem,8vw,7rem)] font-extrabold leading-[1] tracking-normal text-slate-950 dark:text-white">
        And so much more.
      </h2>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300 md:text-xl">
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
        {items.map((item) => (
          <motion.div
            key={item.title}
            variants={{
              hidden: { opacity: 0, y: 18 },
              visible: { opacity: 1, y: 0 },
            }}
            className="min-h-44 rounded-lg border border-black/10 bg-black/[0.03] p-5 dark:border-white/10 dark:bg-white/[0.03]"
          >
            <div className="text-xl font-bold text-slate-950 dark:text-white">
              {item.title}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
              {item.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
