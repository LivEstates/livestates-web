"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QA = [
  {
    q: "What is LivEstates?",
    a: "LivEstates is a live real estate showing platform for buyers, renters, agents, and property teams. It brings tours, questions, replays, and follow-ups into one experience.",
  },
  {
    q: "Do I need to be at the open house in person?",
    a: "No. You can join live from anywhere, ask the agent to show specific details, and revisit saved content later.",
  },
  {
    q: "Can I talk to a real agent?",
    a: "Yes. LivEstates is built around verified agents and real-time conversations, so questions can be answered while the showing is happening.",
  },
  {
    q: "Are live showings saved?",
    a: "A showing can become a reusable library item, making it easier to compare homes, share details, and keep context after the live session.",
  },
  {
    q: "Who is LivEstates for?",
    a: "It is designed for buyers and renters who want more access, and for real estate professionals who want live content to keep working after the appointment ends.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="section py-20 md:py-32">
      <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
      <div className="relative">
        <h2 className="font-display max-w-4xl text-[clamp(2.75rem,6.5vw,5.75rem)] font-medium leading-[1] tracking-[-0.015em] text-[#3b2a20] md:sticky md:top-24">
          In case you missed anything.
        </h2>
        <div aria-hidden className="pointer-events-none mt-10 hidden gap-3 md:flex">
          <span className="arch block h-24 w-16 bg-[#c4673f]" />
          <span className="block h-16 w-16 self-end rounded-full bg-[#a9b69a]" />
          <span className="block h-10 w-20 self-end rounded-t-full bg-[#d9a55b]" />
        </div>
      </div>
      <div className="space-y-3">
        {QA.map((item, i) => (
          <Disclosure key={i} question={item.q} answer={item.a} />
        ))}
      </div>
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
