"use client";
import { motion } from "framer-motion";
import DownloadButtons from "./DownloadButtons";

const GET_STARTED_CARDS = [
  {
    icon: "sparkles",
    title: "AI-Powered",
    description:
      "Your 24/7 real estate assistant. Get instant answers to your property questions, anytime.",
  },
  {
    icon: "video",
    title: "Live & Video Tours",
    description:
      "Tour homes in real time and ask questions as you go. Missed a live? Catch the replay or explore videos anytime.",
  },
  {
    icon: "calendar",
    title: "Simplified Showing Requests",
    description:
      "Find your agent and book a showing in one tap. Chat directly and get the details you need, hassle-free.",
  },
  {
    icon: "userCheck",
    title: "Real Agents, Real Videos",
    description:
      "Every tour comes from a verified agent with their own video profile. Get to know them through their videos before you ever meet.",
  },
];


/** Simple line icons (lucide-style paths, inline so no new dependency). */
const ICON_PATHS: Record<string, JSX.Element> = {
  sparkles: (
    <>
      <path d="M9.94 14.06 4 20M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9Z" />
      <path d="M20 3v4M22 5h-4" />
    </>
  ),
  video: (
    <>
      <rect x="2" y="6" width="14" height="12" rx="2" />
      <path d="m16 10 6-3v10l-6-3" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
      <path d="m9 16 2 2 4-4" />
    </>
  ),
  userCheck: (
    <>
      <circle cx="9" cy="7" r="4" />
      <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      <path d="m16 11 2 2 4-4" />
    </>
  ),
};

function CardIcon({ name }: { name: string }) {
  return (
    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/70 text-violet-600 shadow-sm">
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {ICON_PATHS[name]}
      </svg>
    </div>
  );
}

/** Purple family, light to deeper, so the four cards read as one set (Ivy). */
const CARD_TINTS = [
  "border-violet-300/60 bg-gradient-to-br from-violet-100 to-violet-200",
  "border-purple-300/60 bg-gradient-to-br from-purple-100 to-purple-200",
  "border-fuchsia-300/60 bg-gradient-to-br from-fuchsia-100 to-violet-200",
  "border-indigo-300/60 bg-gradient-to-br from-indigo-100 to-violet-200",
];

/** Page 5 (Ivy batch 3): a second, earlier download pitch. Same layout as the
 *  closing Download page, one size down, with a bold lead and a regular body
 *  stepping down again. The closing page stays as it was. */
export default function GetStarted() {
  return (
    <section id="get-started" className="section py-24 md:py-36 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Buttons sit above the headline at every width (Ivy). */}
        <DownloadButtons className="mb-8 lg:mb-12" />
        <h2 className="mx-auto max-w-5xl text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold leading-[1.08] tracking-normal text-slate-950 dark:text-white">
          Download LivEstates App to get started.
        </h2>
        {/* One line on desktop (Ivy); wraps naturally on smaller screens. */}
        <p className="mx-auto mt-6 lg:mt-[4.5rem] max-w-4xl lg:max-w-none lg:whitespace-nowrap text-[clamp(1.375rem,2.8vw,2.5rem)] lg:text-[clamp(1.75rem,2.6vw,2.5rem)] font-bold leading-[1.3] text-slate-950 dark:text-white">
          A new way to see homes: live, social, and on video.
        </p>
        {/* Four cards replace the body copy (Ivy). Placeholder text until she
            sends the real titles and copy. Same card style as "And so much
            more". */}
        <div className="mx-auto mt-10 lg:mt-14 grid max-w-6xl grid-cols-1 gap-3 text-center sm:grid-cols-2 lg:grid-cols-4 md:gap-4">
          {GET_STARTED_CARDS.map((card, i) => (
            <div
              key={i}
              className={`min-h-56 lg:min-h-72 rounded-2xl border p-6 ${CARD_TINTS[i % CARD_TINTS.length]}`}
            >
              <CardIcon name={card.icon} />
              <div className="text-xl font-bold text-violet-950">
                {card.title}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-violet-900/75 md:text-base">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
