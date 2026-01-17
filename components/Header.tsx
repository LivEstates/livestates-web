'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from '@/components/ThemeProvider';

const items = [
  { href: '#features', label: 'Features' },
  { href: '#faq', label: 'FAQs' },
  { href: 'https://twitter.com', label: 'Support', external: true },
];

export default function Header() {
  const { theme, toggle } = useTheme();
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/40 dark:supports-[backdrop-filter]:bg-[#0b0f15]/40 border-b border-black/10 dark:border-white/10"
    >
      <div className="section flex items-center justify-between py-3">
        <a href="#" className="font-medium tracking-wide">
          <span className="inline-block mr-2 h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
          Sticky
        </a>

        <nav className="hidden md:flex gap-8 text-sm text-slate-600 dark:text-slate-300">
          {items.map((it) => it.external ? (
            <a key={it.label} href={it.href} target="_blank" rel="noreferrer" className="hover:text-black dark:hover:text-white">{it.label}</a>
          ) : (
            <a key={it.label} href={it.href} className="hover:text-black dark:hover:text-white">{it.label}</a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#download" className="btn text-sm">Get the App</a>
          <button onClick={toggle} className="btn text-sm">{theme === 'dark' ? '切换到白色' : '切换到黑色'}</button>
        </div>
      </div>
    </motion.header>
  );
}
