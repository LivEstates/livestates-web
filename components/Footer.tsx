export default function Footer() {
  return (
    <footer className="section pb-12 pt-4 text-sm text-ink/60">
      <div className="border-t border-ink" />
      <div className="mt-[3px] border-t border-ink/30" />
      <div className="flex flex-col items-center justify-between gap-5 pt-8 md:flex-row">
        <div className="font-mono text-[11px] tracking-[0.12em]">
          © 2026 LivEstates. All rights reserved.
        </div>
        <div className="flex gap-7 font-light">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="link-underline transition-colors hover:text-ink"
          >
            X.com
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noreferrer"
            className="link-underline transition-colors hover:text-ink"
          >
            Instagram
          </a>
          <a href="#" className="link-underline transition-colors hover:text-ink">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
