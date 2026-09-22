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
    <section id="faq" className="section py-24 md:py-40">
      <div className="mb-12 flex items-center gap-4 md:mb-20">
        <span className="font-mono text-[11px] tracking-[0.3em] text-bronze md:text-xs">06</span>
        <span className="h-px flex-1 bg-ink/20" />
      </div>
      <div className="grid gap-12 md:grid-cols-12 md:gap-10">
        <h2 className="font-display text-[clamp(2.9rem,6.4vw,6.5rem)] font-normal leading-[0.92] tracking-[-0.02em] text-ink md:sticky md:top-24 md:col-span-5 md:self-start">
          In case you <em className="font-light italic text-bronze">missed anything.</em>
        </h2>
        <div className="border-t border-ink md:col-span-7">
          {QA.map((item, i) => (
            <Disclosure key={i} index={i} question={item.q} answer={item.a} />
          ))}
        </div>
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
    <div className="border-b border-ink/20">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-2 py-7 text-left md:grid-cols-[3.5rem_1fr_auto] md:py-8"
      >
        <span className="font-mono text-[11px] tracking-[0.2em] text-bronze">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="pr-4 font-display text-[1.6rem] font-normal leading-[1.1] text-ink transition-colors duration-300 group-hover:text-bronze md:text-[2.1rem]">
          {question}
        </span>
        <span
          aria-hidden="true"
          className="relative top-[-0.2em] h-8 w-8 shrink-0 self-center rounded-full border border-ink/30 transition-colors duration-300 group-hover:border-ink md:h-10 md:w-10"
        >
          <span className="absolute left-1/2 top-1/2 h-px w-3.5 -translate-x-1/2 -translate-y-1/2 bg-ink" />
          <span
            className={`absolute left-1/2 top-1/2 h-3.5 w-px -translate-x-1/2 -translate-y-1/2 bg-ink transition-transform duration-300 ${
              open ? "scale-y-0" : "scale-y-100"
            }`}
          />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.2, 0.7, 0.1, 1] }}
            className="overflow-hidden text-ink/70"
          >
            <div className="max-w-2xl pb-8 pl-[2.5rem] text-base font-light leading-relaxed md:pl-[3.5rem] md:text-lg">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
