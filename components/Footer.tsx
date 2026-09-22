export default function Footer() {
  return (
    <footer className="border-t-[3px] border-ink bg-ink text-sm font-semibold text-cream/80">
      <div className="section flex flex-col items-center justify-between gap-5 py-10 md:flex-row">
        <div>© 2026 LivEstates. All rights reserved.</div>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border-2 border-cream/30 px-3 py-1 transition hover:border-ink hover:bg-lime hover:text-ink"
          >
            X.com
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border-2 border-cream/30 px-3 py-1 transition hover:border-ink hover:bg-lime hover:text-ink"
          >
            Instagram
          </a>
          <a href="#" className="rounded-full border-2 border-cream/30 px-3 py-1 transition hover:border-ink hover:bg-lime hover:text-ink">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
