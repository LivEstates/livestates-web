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
      <div className="flex items-end justify-between gap-10">
        <h2 className="font-display max-w-4xl text-[clamp(3rem,8vw,7rem)] font-medium leading-[1] tracking-[-0.015em] text-[#3b2a20]">
          In case you missed anything.
        </h2>
        {/* Arch / sun / hill trio: decorative only, desktop only. */}
        <div aria-hidden className="pointer-events-none mb-3 hidden shrink-0 gap-3 lg:flex">
          <span className="arch block h-24 w-16 bg-[#c4673f]" />
          <span className="block h-16 w-16 self-end rounded-full bg-[#a9b69a]" />
          <span className="block h-10 w-20 self-end rounded-t-full bg-[#d9a55b]" />
        </div>
      </div>
      <div className="mt-10 space-y-3">
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
    <div
      className={`rounded-[28px] px-5 py-5 transition duration-300 md:px-7 md:py-6 ${
        open ? "bg-[#fffaf2] shadow-lift" : "bg-[#f1e6d5] hover:bg-[#ecdcc6]"
      }`}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between text-left"
      >
        <span className="font-display pr-6 text-xl font-medium leading-snug text-[#3b2a20] md:text-2xl">
          {question}
        </span>
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xl leading-none transition duration-300 ${
            open ? "bg-[#c4673f] text-[#fff6ea]" : "bg-[#fffaf2] text-[#9e4a2a]"
          }`}
        >
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
            className="overflow-hidden text-[#5b4636]"
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
