"use client";
import { motion } from "framer-motion";
import DownloadButtons from "./DownloadButtons";

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
        <h2 className="mx-auto max-w-5xl text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold leading-[1.08] tracking-normal text-slate-950 dark:text-white">
          Download LivEstates App to get started.
        </h2>
        <p className="mx-auto mt-6 max-w-4xl text-[clamp(1.375rem,2.8vw,2.5rem)] font-bold leading-[1.3] text-slate-950 dark:text-white">
          LivEstates is an AI-powered social video app for real estate.
        </p>
        <p className="mx-auto mt-4 max-w-3xl text-[clamp(1.0625rem,1.6vw,1.5rem)] font-normal leading-relaxed text-slate-600 dark:text-slate-300">
          Tour homes through live streams, ask agents questions in real time,
          and explore videos of the properties you care about, plus the latest
          real estate news, all in one place.
        </p>
        <DownloadButtons />
      </motion.div>
    </section>
  );
}
