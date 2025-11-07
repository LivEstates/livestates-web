import { legalLinks, socialLinks } from '../data/content';
import { AnimatedInView } from './AnimatedInView';

export function Footer() {
  return (
    <footer className="footer">
      <div className="section-shell footer__inner">
        <AnimatedInView>
          <p className="footer__brand">Sticky</p>
        </AnimatedInView>
        <AnimatedInView delay={0.05}>
          <p className="footer__copy">© 2024 Sticky Framer Template. All rights reserved.</p>
        </AnimatedInView>
        <div className="footer__links">
          <AnimatedInView delay={0.1} className="footer__group">
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} className="footer__link">
                {link.label}
              </a>
            ))}
          </AnimatedInView>
          <AnimatedInView delay={0.15} className="footer__group">
            {legalLinks.map((link) => (
              <a key={link.label} href={link.href} className="footer__link">
                {link.label}
              </a>
            ))}
          </AnimatedInView>
        </div>
      </div>
    </footer>
  );
}
