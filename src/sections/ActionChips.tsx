import { featureChips } from '../data/content';
import { SectionHeading } from '../components/SectionHeading';
import { AnimatedInView } from '../components/AnimatedInView';

export function ActionChips() {
  return (
    <section id="security" className="action-chips">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Do more"
          title="Do more in your chats with just a tap"
          description="Suggested replies, instant actions, and quick tools let you keep pace with any conversation."
        />
        <AnimatedInView delay={0.1}>
          <div className="action-chips__marquee" aria-hidden="true">
            <div className="action-chips__track">
              {[...featureChips, ...featureChips].map((chip, index) => (
                <span key={`${chip.label}-${index}`} className="action-chips__chip">
                  {chip.label}
                </span>
              ))}
            </div>
          </div>
        </AnimatedInView>
        <AnimatedInView delay={0.15}>
          <p className="action-chips__description">
            Take the effort out of responding with suggested text and emoji replies, check off little to-dos, and share moments in seconds.
          </p>
        </AnimatedInView>
      </div>
    </section>
  );
}
