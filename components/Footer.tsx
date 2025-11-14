export default function Footer() {
  return (
    <footer className="section py-12 text-sm text-slate-400">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>© 2024 Sticky Template Clone.</div>
        <div className="flex gap-4">
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white">X.com</a>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="hover:text-white">Instagram</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
