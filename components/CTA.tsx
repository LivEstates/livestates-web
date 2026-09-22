"use client";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section id="download" className="section py-20 text-center md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="glass relative overflow-hidden rounded-[28px] px-5 py-16 md:rounded-[40px] md:px-12 md:py-28"
      >
        <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[820px] max-w-[160%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(61,245,200,0.45),rgba(24,120,190,0.2)_60%,transparent)] blur-2xl" />
        <div aria-hidden className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_75%)]" />
        <div aria-hidden className="viewfinder !inset-4 md:!inset-6" />
        <div className="relative">
        <p className="tag inline-flex items-center gap-3">
          <span aria-hidden className="live-dot" />
          Download
        </p>
        <h2 className="mx-auto mt-6 max-w-5xl font-display text-[clamp(2.1rem,8.5vw,5.75rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-sheen">
          LivEstates to get started.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 md:text-xl">
          Experience live property showings, agent conversations, and saved
          replays from one place.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 md:gap-4">
          <a className="btn btn-primary" href="#">
            Get iOS app
          </a>
          <a className="btn" href="#">
            Join the waitlist
          </a>
        </div>
        </div>
      </motion.div>
    </section>
  );
}
