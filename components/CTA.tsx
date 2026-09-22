"use client";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section id="download" className="section py-24 md:py-40">
      <div className="mb-12 flex items-center gap-4 md:mb-20">
        <span className="font-mono text-[11px] tracking-[0.3em] text-bronze md:text-xs">07</span>
        <span className="h-px flex-1 bg-ink/20" />
      </div>
      <motion.div
        className="relative overflow-hidden border border-ink/20 bg-bone/50 px-6 py-20 text-center md:px-16 md:py-32"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.2, 0.7, 0.1, 1] }}
      >
        {/* Plate corners */}
        <span aria-hidden="true" className="pointer-events-none absolute inset-3 border border-ink/10 md:inset-5" />
        <svg
          aria-hidden="true"
          viewBox="0 0 400 400"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[125%] -translate-x-1/2 -translate-y-1/2 text-bronze/25 md:h-[112%]"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.6"
        >
          <circle cx="200" cy="200" r="190" />
          <circle cx="200" cy="200" r="150" strokeDasharray="1 5" />
        </svg>

        <div className="relative">
          <p className="eyebrow flex items-center justify-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-ink/40" />
            Download
            <span aria-hidden="true" className="h-px w-8 bg-ink/40" />
          </p>
          <h2 className="mx-auto mt-8 max-w-5xl font-display text-[clamp(2.9rem,8vw,7.75rem)] font-normal leading-[0.92] tracking-[-0.02em] text-ink">
            LivEstates <em className="font-light italic text-bronze">to get started.</em>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-lg font-light leading-relaxed text-ink/70 md:text-xl">
            Experience live property showings, agent conversations, and saved
            replays from one place.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <a className="btn btn-solid w-full justify-center sm:w-auto" href="#">
              Get iOS app
              <span aria-hidden="true" className="btn-arrow">&rarr;</span>
            </a>
            <a className="btn w-full justify-center sm:w-auto" href="#">
              Join the waitlist
              <span aria-hidden="true" className="btn-arrow">&rarr;</span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
