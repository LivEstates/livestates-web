'use client';
import { motion } from 'framer-motion';

export default function CTA() {
  return (
    <section id="download" className="section py-24 md:py-32 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="text-4xl md:text-6xl font-semibold">立即开始使用 Sticky</h2>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mt-4">下载 iOS 应用或在网页端体验。</p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <a className="btn" href="#">Get iOS app</a>
          <a className="btn" href="#">Get Android app</a>
        </div>
      </motion.div>
    </section>
  );
}
