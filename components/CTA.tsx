"use client";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section id="download" className="relative overflow-hidden bg-tomato text-center">
      {/* Decorative stamps. */}
      <div
        aria-hidden="true"
        className="absolute -left-12 top-4 h-24 w-24 rotate-12 rounded-3xl border-[3px] border-ink bg-lime shadow-hard md:left-[6%] md:top-16 md:h-44 md:w-44"
      />
      <div
        aria-hidden="true"
        className="absolute -right-10 bottom-6 h-24 w-24 rounded-full border-[3px] border-ink bg-navy shadow-hard md:bottom-16 md:right-[7%] md:h-40 md:w-40"
      />
      <div className="section relative py-24 md:py-36">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <p className="sticker rotate-2 bg-cream text-ink">
          Download
        </p>
        <h2 className="text-pop-ink mx-auto mt-7 max-w-5xl font-display text-[clamp(3.25rem,15vw,5.5rem)] leading-[1] tracking-normal text-cream md:text-[clamp(5rem,11vw,11rem)] md:leading-[0.98]">
          LivEstates to get started.
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-lg font-semibold leading-relaxed text-ink md:text-xl">
          Experience live property showings, agent conversations, and saved
          replays from one place.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
          <a className="btn btn-ink text-lg" href="#">
            Get iOS app
          </a>
          <a className="btn btn-cream text-lg" href="#">
            Join the waitlist
          </a>
        </div>
      </motion.div>
      </div>
    </section>
  );
}
