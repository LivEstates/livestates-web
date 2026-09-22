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
    <section id="faq" className="section py-24 md:py-36">
      <h2 className="max-w-4xl font-display text-[clamp(2.2rem,9vw,5.75rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-sheen">
        In case you missed anything.
      </h2>
      <div className="mt-12 space-y-3">
        {QA.map((item, i) => (
          <Disclosure key={i} index={i} question={item.q} answer={item.a} />
        ))}
      </div>
    </section>
  );
}

function Disclosure({
  index,
  question,
  answer,
}: {
  index: number;
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`glass rounded-2xl px-5 py-5 transition-[border-color,box-shadow] duration-300 md:px-7 md:py-6 ${
        open ? "!border-signal/40 shadow-[0_0_40px_-12px_rgba(61,245,200,0.45)]" : "hover:!border-white/20"
      }`}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="flex min-w-0 items-baseline gap-4 md:gap-6">
          <span aria-hidden className={`font-mono text-xs tracking-[0.2em] ${open ? "text-signal" : "text-white/40"}`}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-display text-base font-medium tracking-[-0.02em] text-white md:text-2xl">
            {question}
          </span>
        </span>
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-mono text-lg transition-all duration-300 md:h-10 md:w-10 ${
            open
              ? "border-signal bg-signal text-[#03140f] shadow-[0_0_20px_rgba(61,245,200,0.6)]"
              : "border-white/20 text-white/70"
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
            className="overflow-hidden text-slate-300"
          >
            <div className="max-w-3xl pt-4 pb-1 text-base leading-relaxed md:pl-12 md:text-lg">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
