/** The two store buttons, shared by the page-5 intro and the closing
 *  Download page so they always carry the same labels and links. The iOS
 *  app isn't out yet, so its pill is a non-interactive label for now. */
export default function DownloadButtons({
  className = "mt-8",
}: {
  className?: string;
}) {
  return (
    <div className={`${className} flex flex-wrap items-center justify-center gap-4`}>
      {/* Not live yet (Ivy): same pill as the waitlist button, but a plain
          label rather than a link. Hover tint is pinned so it doesn't read
          as clickable. The longer label no longer fits beside the waitlist
          pill on phones, so the pills stay on one line each and wrap onto
          two rows at equal width there instead of breaking mid-label. */}
      <span
        className="btn font-semibold whitespace-nowrap justify-center max-sm:min-w-[13rem] cursor-default hover:bg-black/10 dark:hover:bg-white/10"
        aria-disabled="true"
      >
        Coming soon on iOS
      </span>
      <a
        className="btn font-semibold whitespace-nowrap justify-center max-sm:min-w-[13rem]"
        href="https://tally.so/r/A7Vjke"
        target="_blank"
        rel="noopener noreferrer"
      >
        Join the waitlist
      </a>
    </div>
  );
}
