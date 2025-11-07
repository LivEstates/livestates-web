import { storyFeatures } from '../data/content';
import { AnimatedInView } from '../components/AnimatedInView';
import { SectionHeading } from '../components/SectionHeading';

export function StoryFeatures() {
  return (
    <section id="stories" className="story-features">
      <div className="section-shell">
        <SectionHeading
          eyebrow="In the spotlight"
          title="Stories that feel alive"
          description="From dual cameras to live reactions, every piece of Sticky is tuned to bring conversations closer."
        />
        <div className="story-features__stack">
          {storyFeatures.map((feature, index) => {
            const reverse = index % 2 === 1;
            return (
              <div key={feature.id} className={`story-row${reverse ? ' story-row--reverse' : ''}`}>
                <AnimatedInView delay={0.1} className="story-row__media">
                  <span className="story-row__halo" style={{ background: feature.accent }} />
                  <img src={feature.image} alt="" loading="lazy" />
                </AnimatedInView>
                <div className="story-row__content">
                  <AnimatedInView delay={0.05}>
                    <p className="story-row__eyebrow">{feature.eyebrow}</p>
                  </AnimatedInView>
                  <AnimatedInView delay={0.1}>
                    <h3 className="story-row__title">{feature.title}</h3>
                  </AnimatedInView>
                  <AnimatedInView delay={0.15}>
                    <p className="story-row__emphasis">{feature.emphasis}</p>
                  </AnimatedInView>
                  <AnimatedInView delay={0.2}>
                    <p className="story-row__description">{feature.description}</p>
                  </AnimatedInView>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
