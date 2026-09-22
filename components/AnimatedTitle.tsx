"use client";

import { motion } from "framer-motion";

export default function AnimatedTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-navy bg-dots-light pt-16 text-center md:pt-24">
      <motion.h2
        initial={{ opacity: 0, y: 8, rotate: 0 }}
        animate={{ opacity: 1, y: 0, rotate: -3 }}
        transition={{ duration: 0.5 }}
        className="sticker inline-block bg-tomato px-6 py-2 font-display text-2xl font-normal normal-case tracking-normal text-ink md:text-4xl"
      >
        {children}
      </motion.h2>
    </div>
  );
}
