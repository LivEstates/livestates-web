'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QA = [
  { q: '这个模板怎么用？', a: '将它部署到 Vercel 或 Netlify，替换文案与图片即可。' },
  { q: '是不是很容易上手？', a: '是的，所有动画都用 Framer Motion 编写，修改变量就可以。' },
  { q: '需要后端吗？', a: '不需要，这是一个静态展示站点。' },
  { q: '可以自定义域名吗？', a: '可以，在托管平台绑定自己的域名即可。' },
];

export default function FAQ() {
  return (
    <section id="faq" className="section py-24 md:py-32">
      <h2 className="text-3xl md:text-5xl font-semibold">常见问题</h2>
      <div className="mt-6 divide-y divide-white/10 border-y border-white/10">
        {QA.map((item, i) => (
          <Disclosure key={i} question={item.q} answer={item.a} />
        ))}
      </div>
    </section>
  );
}

function Disclosure({ question, answer }: { question: string, answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="py-4">
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center justify-between text-left">
        <span className="text-lg">{question}</span>
        <span className="text-slate-400">{open ? '—' : '+'}</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden text-slate-300"
          >
            <div className="pt-2 pb-4">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
