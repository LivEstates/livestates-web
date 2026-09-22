"use client";

import { motion } from "framer-motion";

export default function AnimatedTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="section pt-24 md:pt-36">
      <div className="flex items-center gap-5 md:gap-8">
        <span aria-hidden="true" className="h-px flex-1 bg-ink/20" />
        <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-bronze" />
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-normal italic leading-none text-ink"
        >
          {children}
        </motion.h2>
        <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-bronze" />
        <span aria-hidden="true" className="h-px flex-1 bg-ink/20" />
      </div>
    </div>
  );
}
