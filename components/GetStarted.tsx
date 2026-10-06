"use client";
import { motion } from "framer-motion";
import DownloadButtons from "./DownloadButtons";

const GET_STARTED_CARDS = [
  { title: "Card title 1", description: "Card text goes here." },
  { title: "Card title 2", description: "Card text goes here." },
  { title: "Card title 3", description: "Card text goes here." },
  { title: "Card title 4", description: "Card text goes here." },
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
        <p className="mx-auto mt-6 lg:mt-[4.5rem] max-w-4xl text-[clamp(1.375rem,2.8vw,2.5rem)] font-bold leading-[1.3] text-slate-950 dark:text-white">
          The social video app{" "}
          <span className="lg:block">made for real estate.</span>
        </p>
        {/* Four cards replace the body copy (Ivy). Placeholder text until she
            sends the real titles and copy. Same card style as "And so much
            more". */}
        <div className="mx-auto mt-10 lg:mt-14 grid max-w-6xl grid-cols-1 gap-3 text-left sm:grid-cols-2 lg:grid-cols-4 md:gap-4">
          {GET_STARTED_CARDS.map((card, i) => (
            <div
              key={i}
              className="min-h-44 rounded-lg border border-black/10 bg-black/[0.03] p-5 dark:border-white/10 dark:bg-white/[0.03]"
            >
              <div className="text-xl font-bold text-slate-950 dark:text-white">
                {card.title}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
