export default function Footer() {
  return (
    <footer className="section py-10 text-sm text-[#6b5444]">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div>© 2026 LivEstates. All rights reserved.</div>
        <div className="flex gap-1">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="rounded-full px-3 py-1.5 transition hover:bg-[#f1e6d5] hover:text-[#9e4a2a]"
          >
            X.com
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noreferrer"
            className="rounded-full px-3 py-1.5 transition hover:bg-[#f1e6d5] hover:text-[#9e4a2a]"
          >
            Instagram
          </a>
          <a href="#" className="rounded-full px-3 py-1.5 transition hover:bg-[#f1e6d5] hover:text-[#9e4a2a]">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
