"use client";

import { motion } from "framer-motion";

export default function AnimatedTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center pb-2 pt-10 md:pt-16">
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="eyebrow bg-[#c4673f] text-[#fff6ea] shadow-soft"
      >
        <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor">
          <path d="M8 1.5 1.5 7v7.5h4.5V10h4v4.5h4.5V7L8 1.5Z" />
        </svg>
        {children}
      </motion.h2>
    </div>
  );
}
