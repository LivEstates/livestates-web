"use client";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section id="download" className="band bg-[#c4673f] text-center text-[#fff6ea]">
      {/* Warm sunset shapes. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -bottom-[45%] left-1/2 h-[90%] w-[140%] -translate-x-1/2 rounded-[50%] bg-[#b35a35] md:w-[90%]" />
        <div className="drift absolute -left-6 top-6 h-20 w-20 rounded-full bg-[#d9a55b] md:left-[8%] md:top-[14%] md:h-32 md:w-32" />
        <div className="drift-slow absolute -bottom-6 right-[8%] h-20 w-14 arch bg-[#a9b69a] md:bottom-[12%] md:right-[6%] md:h-40 md:w-28" />
      </div>
      <motion.div
        className="section relative py-24 md:py-36"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <p className="eyebrow bg-[#fff6ea]/15 text-[#fff6ea] ring-1 ring-[#fff6ea]/30">
          Download
        </p>
        <h2 className="font-display mx-auto mt-6 max-w-5xl text-[clamp(3rem,8vw,7rem)] font-medium leading-[1] tracking-[-0.02em]">
          LivEstates to get started.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#fff6ea]/85 md:text-xl">
          Experience live property showings, agent conversations, and saved
          replays from one place.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 md:gap-4">
          <a className="btn btn-cream" href="#">
            Get iOS app
          </a>
          <a className="btn btn-ghost" href="#">
            Join the waitlist
          </a>
        </div>
      </motion.div>
    </section>
  );
}
