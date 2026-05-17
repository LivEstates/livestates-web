"use client";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section id="download" className="section py-24 md:py-36 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-400">
          Download
        </p>
        <h2 className="mx-auto mt-5 max-w-5xl text-[clamp(3rem,8vw,7rem)] font-extrabold leading-[1] tracking-normal text-slate-950 dark:text-white">
          LivEstates to get started.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300 md:text-xl">
          Experience live property showings, agent conversations, and saved
          replays from one place.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <a className="btn font-semibold" href="#">
            Get iOS app
          </a>
          <a className="btn font-semibold" href="#">
            Join the waitlist
          </a>
        </div>
      </motion.div>
    </section>
  );
}
