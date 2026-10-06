"use client";
import { motion } from "framer-motion";
import DownloadButtons from "./DownloadButtons";

const GET_STARTED_CARDS = [
  { title: "Card title 1", description: "Card text goes here." },
  { title: "Card title 2", description: "Card text goes here." },
  { title: "Card title 3", description: "Card text goes here." },
  { title: "Card title 4", description: "Card text goes here." },
];

/** Purple family, light to deeper, so the four cards read as one set (Ivy). */
const CARD_TINTS = [
  "border-violet-300/60 bg-gradient-to-br from-violet-100 to-violet-200",
  "border-purple-300/60 bg-gradient-to-br from-purple-100 to-purple-200",
  "border-fuchsia-300/60 bg-gradient-to-br from-fuchsia-100 to-violet-200",
  "border-indigo-300/60 bg-gradient-to-br from-indigo-100 to-violet-200",
];

/** Page 5 (Ivy batch 3): a second, earlier download pitch. Same layout as the
 *  closing Download page, one size down, with a bold lead and a regular body
 *  stepping down again. The closing page stays as it was. */
export default function GetStarted() {
  return (
    <section id="get-started" className="section py-24 md:py-36 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Buttons sit above the headline at every width (Ivy). */}
        <DownloadButtons className="mb-8 lg:mb-12" />
        <h2 className="mx-auto max-w-5xl text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold leading-[1.08] tracking-normal text-slate-950 dark:text-white">
          Download LivEstates App to get started.
        </h2>
        {/* One line on desktop (Ivy); wraps naturally on smaller screens. */}
        <p className="mx-auto mt-6 lg:mt-[4.5rem] max-w-4xl lg:max-w-none lg:whitespace-nowrap text-[clamp(1.375rem,2.8vw,2.5rem)] lg:text-[clamp(1.75rem,2.6vw,2.5rem)] font-bold leading-[1.3] text-slate-950 dark:text-white">
          A new way to see homes: live, social, and on video.
        </p>
        {/* Four cards replace the body copy (Ivy). Placeholder text until she
            sends the real titles and copy. Same card style as "And so much
            more". */}
        <div className="mx-auto mt-10 lg:mt-14 grid max-w-6xl grid-cols-1 gap-3 text-left sm:grid-cols-2 lg:grid-cols-4 md:gap-4">
          {GET_STARTED_CARDS.map((card, i) => (
            <div
              key={i}
              className={`min-h-56 lg:min-h-72 rounded-2xl border p-6 ${CARD_TINTS[i % CARD_TINTS.length]}`}
            >
              <div className="text-xl font-bold text-violet-950">
                {card.title}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-violet-900/75 md:text-base">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
