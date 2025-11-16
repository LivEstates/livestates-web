import { featureHighlights } from '../data/content';
import { AnimatedInView } from '../components/AnimatedInView';
import { SectionHeading } from '../components/SectionHeading';

export function FeatureHighlights() {
  return (
    <section id="features" className="feature-highlights">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Feature suite"
          title="Meet Sticky"
          description="Sticky keeps your conversations sharp, secure, and expressive with tools that feel instantly familiar."
        />
        <div className="feature-highlights__grid">
          {featureHighlights.map((feature, index) => (
            <AnimatedInView key={feature.id} delay={index * 0.08} className="feature-card">
              <span className="feature-card__accent" style={{ background: feature.accent }} />
              <div className="feature-card__image">
                <img src={feature.image} alt="" loading="lazy" />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </AnimatedInView>
          ))}
        </div>
      </div>
    </section>
  );
}
