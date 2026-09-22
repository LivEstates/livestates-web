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

/* Little decorative motifs, cycled across the cards. */
const MOTIFS = [
  { bg: "bg-[#f3dccb]", shape: "rounded-full bg-[#c4673f]" },
  { bg: "bg-[#dde3d0]", shape: "arch bg-[#56654d]" },
  { bg: "bg-[#f6e3c4]", shape: "rounded-[60%_40%_55%_45%/60%_55%_45%_40%] bg-[#d9a55b]" },
];

export default function FeatureGrid() {
  return (
    <section className="band my-3 bg-[#f1e6d5] md:my-4">
    <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#e8d5be]/80" />
    <div className="section relative py-20 md:py-32">
      <h2 className="font-display max-w-4xl text-[clamp(2.75rem,7.5vw,6.5rem)] font-medium leading-[1] tracking-[-0.015em] text-[#3b2a20]">
        And so much more.
      </h2>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#5b4636] md:text-xl">
        LivEstates is packed with tools for live property discovery, but the
        showing always comes first.
      </p>

      <motion.div
        className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5"
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
            className="group min-h-44 rounded-[32px] bg-[#fffaf2] p-6 shadow-soft transition duration-300 ease-out hover:-translate-y-1.5 hover:shadow-lift md:p-7"
          >
            <div
              aria-hidden
              className={`mb-5 flex h-14 w-14 items-center justify-center rounded-[20px] transition duration-300 group-hover:rotate-[-6deg] ${MOTIFS[i % 3].bg}`}
            >
              <span className={`block h-6 w-6 ${MOTIFS[i % 3].shape}`} />
            </div>
            <div className="font-display text-2xl font-semibold leading-tight text-[#3b2a20]">
              {item.title}
            </div>
            <p className="mt-2.5 text-sm leading-relaxed text-[#6b5444] md:text-base">
              {item.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
    </section>
  );
}
