'use client';
import { motion } from 'framer-motion';
import Phone, { MockChat } from './Phone';

export default function HighlightSection() {
  return (
    <section className="section py-24 md:py-32">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl md:text-5xl font-semibold">Multi Camera Mode</h2>
          <p className="text-slate-300 mt-4 max-w-prose">前后摄像头同时开拍，用双摄聊天展示更多。</p>
        </div>

        <div className="relative flex items-center justify-center gap-6">
          <motion.div
            initial={{ rotate: -8, y: 20, opacity: 0 }}
            whileInView={{ rotate: -4, y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ type: 'spring', stiffness: 120, damping: 14 }}
          >
            <Phone><MockChat title="Dual" /></Phone>
          </motion.div>
          <motion.div
            initial={{ rotate: 12, y: 20, opacity: 0 }}
            whileInView={{ rotate: 6, y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.05 }}
          >
            <Phone><MockChat title="Camera" /></Phone>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
