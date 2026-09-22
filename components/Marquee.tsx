/** Decorative ticker strip. Purely presentational: it only repeats words that
 *  already appear elsewhere on the page, so it is hidden from assistive tech. */
export default function Marquee({
  words,
  className = "bg-ink text-lime",
  starClassName = "text-tomato",
  slow = false,
  tilt = 0,
  wrapClassName = "",
}: {
  words: string[];
  className?: string;
  starClassName?: string;
  slow?: boolean;
  tilt?: number;
  wrapClassName?: string;
}) {
  const run = (key: string) => (
    <div key={key} className="flex shrink-0 items-center">
      {Array.from({ length: 3 }).flatMap((_, r) =>
        words.map((w, i) => (
          <span key={`${key}-${r}-${i}`} className="flex items-center">
            <span className="px-5 md:px-8">{w}</span>
            <svg
              viewBox="0 0 24 24"
              className={`h-6 w-6 shrink-0 md:h-9 md:w-9 ${starClassName}`}
              fill="currentColor"
            >
              <path d="M12 0l2.6 8.2L23 6l-6 6.1L23 18l-8.4-2.2L12 24l-2.6-8.2L1 18l6-5.9L1 6l8.4 2.2z" />
            </svg>
          </span>
        ))
      )}
    </div>
  );

  return (
    <div
      aria-hidden="true"
      className={`relative z-20 overflow-hidden ${tilt ? "py-6 md:py-10" : ""} ${wrapClassName}`}
    >
      <div
        className={`-mx-[4%] overflow-hidden border-y-[3px] border-ink py-3 font-display text-[clamp(1.75rem,4.5vw,3.5rem)] leading-none md:py-4 ${className}`}
        style={tilt ? { transform: `rotate(${tilt}deg)` } : undefined}
      >
        <div
          className={`flex w-max ${slow ? "animate-marquee-slow" : "animate-marquee"}`}
        >
          {run("a")}
          {run("b")}
        </div>
      </div>
    </div>
  );
}
