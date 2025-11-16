import { deepFeatures } from '../data/content';
import { SectionHeading } from '../components/SectionHeading';
import { AnimatedInView } from '../components/AnimatedInView';

export function DeepFeatures() {
  return (
    <section className="deep-features">
      <div className="section-shell">
        <SectionHeading
          eyebrow="And so much more"
          title="Sticky is packed with thoughtful details"
          description="From live voicemail to powerful analytics, every corner is designed to keep you in control."
        />
        <div className="deep-features__grid">
          {deepFeatures.map((feature, index) => (
            <AnimatedInView key={feature.title} delay={index * 0.05} className="deep-feature">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </AnimatedInView>
          ))}
        </div>
      </div>
    </section>
  );
}
