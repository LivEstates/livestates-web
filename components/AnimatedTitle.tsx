"use client";

import { motion } from "framer-motion";

export default function AnimatedTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="text-center">
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-sm font-bold uppercase tracking-[0.16em] text-slate-400 md:text-base"
      >
        {children}
      </motion.h2>
    </div>
  );
}
