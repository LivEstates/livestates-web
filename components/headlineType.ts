/** Headline type shared by the full-bleed Hero slides. A plain module (not
 *  "use client") so the server page.tsx and the client components read the
 *  same strings and can't drift apart. Tailwind scans this file, so every
 *  class must stay a complete literal. */

/** Box around every overlay headline. */
export const HEADLINE_BOX = "max-w-[min(94vw,1440px)] px-4 text-center";

/** Face shared by every overlay headline (white on the scrim). */
const HEADLINE_FACE = "font-bold tracking-normal text-white drop-shadow-md";

/** Intro slides 1-3 (the call-style hero). */
export const INTRO_HEADLINE = `text-[clamp(2.25rem,4.5vw,4.75rem)] leading-[1.5] ${HEADLINE_FACE}`;

/** Intro slides 2-3 on phones: type scales with width so each phrase fits on
 *  one line (Ivy); from lg it matches INTRO_HEADLINE. */
export const INTRO_HEADLINE_FIT = `text-[min(6.4vw,2.25rem)] lg:text-[clamp(2.25rem,4.5vw,4.75rem)] leading-[1.5] ${HEADLINE_FACE}`;

/** Plain (full-bleed) slides, e.g. "More Ways to See". */
export const HERO_HEADLINE = `text-[clamp(2.5rem,5.6vw,6rem)] leading-[1.08] ${HEADLINE_FACE}`;
