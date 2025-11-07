import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navigationLinks } from '../data/content';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="navigation">
      <div className="navigation__inner">
        <a className="navigation__brand" href="#top" aria-label="Sticky home">
          Sticky
        </a>
        <nav className="navigation__links" aria-label="Primary">
          {navigationLinks.map((link) => (
            <a key={link.href} href={link.href} className="navigation__link">
              {link.label}
            </a>
          ))}
        </nav>
        <a className="navigation__cta" href="https://yegor.lemonsqueezy.com/checkout/buy/8d1656ae-0ac2-4d85-8445-a5784338d47d">
          Buy Template — $39
        </a>
        <button
          type="button"
          className="navigation__toggle"
          aria-label="Toggle menu"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="navigation__mobile"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
          >
            {navigationLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="navigation__mobile-link"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              className="navigation__mobile-cta"
              href="https://yegor.lemonsqueezy.com/checkout/buy/8d1656ae-0ac2-4d85-8445-a5784338d47d"
              onClick={() => setIsOpen(false)}
            >
              Buy Template — $39
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
