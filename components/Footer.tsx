export default function Footer() {
  return (
    <footer className="section py-12 text-sm text-slate-500 dark:text-slate-400">
      <div className="flex flex-col items-center justify-between gap-4 border-t border-black/10 pt-8 dark:border-white/10 lg:flex-row">
        <div>© 2026 LivEstates. All rights reserved.</div>
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 lg:justify-end">
          <a
            href="mailto:info@livestates.tech"
            className="hover:text-black dark:hover:text-white"
          >
            info@livestates.tech
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-black dark:hover:text-white"
          >
            X.com
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-black dark:hover:text-white"
          >
            Instagram
          </a>
          <a
            href="https://livestates.tech/policy/terms-and-conditions.html"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black dark:hover:text-white"
          >
            Terms of Service
          </a>
          <a
            href="https://livestates.tech/policy/privacy-policy.html"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black dark:hover:text-white"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
