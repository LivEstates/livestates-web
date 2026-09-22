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
    <section className="section py-24 md:py-40">
      <div className="mb-12 flex items-center gap-4 md:mb-20">
        <span className="font-mono text-[11px] tracking-[0.3em] text-bronze md:text-xs">05</span>
        <span className="h-px flex-1 bg-ink/20" />
      </div>
      <div className="grid gap-8 md:grid-cols-12 md:items-end md:gap-10">
        <h2 className="font-display text-[clamp(3rem,8.5vw,8rem)] font-normal leading-[0.9] tracking-[-0.02em] text-ink md:col-span-7">
          And so much <em className="font-light italic text-bronze">more.</em>
        </h2>
        <p className="max-w-md text-lg font-light leading-relaxed text-ink/70 md:col-span-4 md:col-start-9 md:pb-3 md:text-xl">
          LivEstates is packed with tools for live property discovery, but the
          showing always comes first.
        </p>
      </div>

      <motion.div
        className="mt-14 grid grid-cols-1 gap-px border-y border-ink/20 bg-ink/15 md:mt-24 md:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
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
            className="group relative flex min-h-[13rem] flex-col bg-paper px-1 py-7 transition-colors duration-500 hover:bg-bone md:min-h-[17rem] md:px-8 md:py-9"
          >
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-bronze transition-transform duration-700 ease-out group-hover:scale-x-100"
            />
            <div className="flex items-baseline justify-between font-mono text-[11px] tracking-[0.25em] text-ink/45">
              <span className="text-bronze">{String(i + 1).padStart(2, "0")}</span>
              <span
                aria-hidden="true"
                className="translate-x-[-6px] opacity-0 transition duration-500 group-hover:translate-x-0 group-hover:opacity-100"
              >
                &rarr;
              </span>
            </div>
            <div className="mt-auto pt-10 font-display text-[1.9rem] font-normal leading-[1.02] text-ink transition-all duration-500 group-hover:italic md:text-[2.1rem]">
              {item.title}
            </div>
            <p className="mt-3 max-w-[30ch] text-[15px] font-light leading-relaxed text-ink/65">
              {item.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
