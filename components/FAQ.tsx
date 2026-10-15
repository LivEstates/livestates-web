"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QA = [
  {
    q: "What is LivEstates?",
    a: "LivEstates is a brand new, AI-powered social media platform dedicated to revolutionizing traditional property presenting experience in the real estate industry. We offer an opportunity that allows users to interact with creators to access a variety of properties in real-time via livestreams, which will definitely improve efficiency and convenience on both sides. Moreover, our product aims to connect all individuals related to real estate, including buyers, sellers, agents, lenders, even builders and much more. With the state-of-the-art technology, we provide a seamless experience for our users to obtain all property-related information at their fingertips!",
  },
  {
    q: "Who is LivEstates for?",
    a: "LivEstates redefines the real estate journey by bridging the gap between convenience and expertise. For users, it offers real-time access and immersive videos for property showings, alongside thousands of real estate content videos to explore. For agents, it provides a powerful platform to build their own video branding profiles, receive direct user requests, and establish genuine, lasting connections.",
  },
  {
    q: "Can I talk to a real agent?",
    a: "Yes. LivEstates is built around verified agents and real-time conversations, so questions can be answered while the showing is happening. Beyond live tours, you can message agents instantly, follow their profiles, and drop comments directly on their videos within the platform.",
  },
  {
    q: "Are live showings saved?",
    a: "A showing can become a reusable library item for a limited time, making it easier to compare homes, share details, and retain critical context before the live video expires.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="section py-24 md:py-36">
      <h2 className="max-w-4xl text-[clamp(3rem,8vw,7rem)] font-extrabold leading-[1] tracking-normal text-slate-950 dark:text-white">
        In case you missed anything.
      </h2>
      <div className="mt-10 divide-y divide-black/10 border-y border-black/10 dark:divide-white/10 dark:border-white/10">
        {QA.map((item, i) => (
          <Disclosure key={i} question={item.q} answer={item.a} />
        ))}
      </div>
    </section>
  );
}

function Disclosure({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="py-6">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between text-left"
      >
        <span className="pr-6 text-xl font-semibold text-slate-950 dark:text-white md:text-2xl">
          {question}
        </span>
        <span className="text-2xl text-slate-500 dark:text-slate-400">
          {open ? "—" : "+"}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden text-slate-600 dark:text-slate-300"
          >
            <div className="max-w-3xl pt-4 pb-2 text-base leading-relaxed md:text-lg">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
