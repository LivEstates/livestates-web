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
    <section id="faq" className="bg-lime border-b-[3px] border-ink">
      <div className="section py-24 md:py-36">
      <h2 className="max-w-5xl font-display text-[clamp(3.25rem,15vw,5.5rem)] leading-[1] tracking-normal text-ink md:text-[clamp(5rem,10vw,10rem)] md:leading-[0.98]">
        In case you missed anything.
      </h2>
      <div className="mt-12 space-y-4 md:mt-16 md:space-y-5">
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
      className={`card-brut px-5 py-4 md:px-7 md:py-5 ${open ? "bg-cream" : "bg-white"}`}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 text-left"
      >
        <span className="text-xl font-extrabold leading-tight text-ink md:text-2xl">
          {question}
        </span>
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[3px] border-ink text-ink transition-colors duration-200 md:h-12 md:w-12 ${
            open ? "bg-tomato" : "bg-lime"
          }`}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5 md:h-6 md:w-6"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
          >
            <path d="M5 12h14" />
            <path
              d="M12 5v14"
              style={{ transformBox: "fill-box" }}
              className={`origin-center transition-transform duration-200 ${open ? "scale-y-0" : ""}`}
            />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden text-ink/80"
          >
            <div className="max-w-3xl pt-4 pb-1 text-base font-medium leading-relaxed md:text-lg">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
