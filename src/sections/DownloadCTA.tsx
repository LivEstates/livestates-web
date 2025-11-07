import { AnimatedInView } from '../components/AnimatedInView';
import { SectionHeading } from '../components/SectionHeading';
import { downloadLinks } from '../data/content';

export function DownloadCTA() {
  return (
    <section id="download" className="download-cta">
      <div className="section-shell download-cta__inner">
        <SectionHeading
          align="center"
          eyebrow="Download"
          title="Sticky to get started"
          description="Start building a richer messaging experience with a single download."
        />
        <div className="download-cta__actions">
          {downloadLinks.map((link, index) => (
            <AnimatedInView key={link.label} delay={index * 0.05}>
              <a className="download-cta__button" href={link.href}>
                {link.label}
              </a>
            </AnimatedInView>
          ))}
        </div>
      </div>
    </section>
  );
}
