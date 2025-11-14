'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import clsx from 'clsx';

export default function Phone({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <motion.div
      className={clsx('phone', className)}
      whileHover={{ translateY: -4 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <div className="screen">
        {children}
      </div>
    </motion.div>
  );
}

export function MockChat({ title='Chats', accent='emerald' }: {title?: string, accent?: 'emerald'|'sky'|'violet'|'amber'}) {
  return (
    <div className="screen-grid">
      <div className="px-5 flex items-center justify-between border-b border-white/10 bg-white/5">
        <span className="text-sm text-slate-300">{title}</span>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-white/20"></span>
          <span className="w-4 h-4 rounded-full bg-white/20"></span>
        </div>
      </div>
      <div className="px-4 py-3 space-y-3 overflow-hidden">
        <div className="flex gap-2 items-start">
          <div className="w-8 h-8 rounded-full bg-white/10"></div>
          <div className="space-y-2 flex-1">
            <div className="h-3 w-4/5 rounded bg-white/20"></div>
            <div className="h-3 w-2/5 rounded bg-white/10"></div>
          </div>
        </div>
        <div className="flex gap-2 items-start justify-end">
          <div className="space-y-2 flex-1 max-w-[70%]">
            <div className="h-3 w-full rounded bg-white/30"></div>
            <div className="h-3 w-3/5 rounded bg-white/20"></div>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/10"></div>
        </div>
        <div className="flex gap-2 items-start">
          <div className="w-8 h-8 rounded-full bg-white/10"></div>
          <div className="space-y-2 flex-1">
            <div className="h-3 w-2/3 rounded bg-white/20"></div>
            <div className="h-3 w-1/3 rounded bg-white/10"></div>
          </div>
        </div>
      </div>
      <div className="px-5 flex items-center gap-2 border-t border-white/10 bg-white/5">
        <div className="flex-1 my-3 h-9 rounded-full bg-white/10"></div>
        <div className="w-10 h-10 rounded-full bg-white/20"></div>
      </div>
    </div>
  );
}
