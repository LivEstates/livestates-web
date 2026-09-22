export default function Footer() {
  return (
    <footer className="section py-12 font-mono text-xs tracking-[0.06em] text-slate-400">
      <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
        <div className="flex items-center gap-3"><span aria-hidden className="live-dot is-signal" /><span>© 2026 LivEstates. All rights reserved.</span></div>
        <div className="flex gap-5">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-signal"
          >
            X.com
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-signal"
          >
            Instagram
          </a>
          <a href="#" className="transition hover:text-signal">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
