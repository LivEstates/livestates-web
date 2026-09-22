"use client";

import { motion } from "framer-motion";

export default function AnimatedTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex items-center justify-center gap-4 px-5 pt-16 md:pt-24">
      <span aria-hidden className="h-px w-10 bg-gradient-to-r from-transparent to-signal/70 md:w-24" />
      <span aria-hidden className="live-dot is-signal" />
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="font-mono text-xs font-medium uppercase tracking-[0.32em] text-signal md:text-sm"
      >
        {children}
      </motion.h2>
      <span aria-hidden className="h-px w-10 bg-gradient-to-l from-transparent to-signal/70 md:w-24" />
    </div>
  );
}
