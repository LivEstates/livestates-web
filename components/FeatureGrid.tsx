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

// Cards cycle through the palette; each carries a small decorative shape.
const CARD_TONES = ["bg-lime", "bg-cream", "bg-tomato"];
const DOT_SHAPES = [
  "rounded-full bg-tomato",
  "rotate-45 bg-lime",
  "rounded-full bg-cream",
];

export default function FeatureGrid() {
  return (
    <section className="bg-navy bg-dots-light border-b-[3px] border-ink">
      <div className="section py-24 md:py-36">
      <h2 className="text-pop-ink max-w-4xl font-display text-[clamp(3.25rem,15vw,5.5rem)] leading-[1] tracking-normal text-lime md:text-[clamp(5rem,10vw,10rem)] md:leading-[0.98]">
        And so much more.
      </h2>
      <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-cream/85 md:text-xl">
        LivEstates is packed with tools for live property discovery, but the
        showing always comes first.
      </p>

      <motion.div
        className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-7"
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
            className={`card-brut relative min-h-44 p-6 text-ink ${CARD_TONES[i % CARD_TONES.length]}`}
          >
            <span
              aria-hidden="true"
              className={`absolute right-5 top-5 h-6 w-6 border-[3px] border-ink ${DOT_SHAPES[i % DOT_SHAPES.length]}`}
            />
            <div className="pr-10 font-display text-[1.9rem] leading-none tracking-wide">
              {item.title}
            </div>
            <p className="mt-4 text-base font-medium leading-snug text-ink/80">
              {item.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
      </div>
    </section>
  );
}
