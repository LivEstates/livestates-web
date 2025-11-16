import { heroContent } from '../data/content';
import { AnimatedInView } from '../components/AnimatedInView';

export function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__inner">
        <div className="hero__content">
          <AnimatedInView delay={0.05}>
            <p className="hero__eyebrow">{heroContent.eyebrow}</p>
          </AnimatedInView>
          <AnimatedInView delay={0.1}>
            <h1 className="hero__title">{heroContent.title}</h1>
          </AnimatedInView>
          <AnimatedInView delay={0.15}>
            <p className="hero__body">{heroContent.body}</p>
          </AnimatedInView>
          <div className="hero__cta-group">
            <AnimatedInView delay={0.2}>
              <a className="hero__cta hero__cta--primary" href={heroContent.primaryCta.href}>
                {heroContent.primaryCta.label}
              </a>
            </AnimatedInView>
            <AnimatedInView delay={0.25}>
              <a className="hero__cta hero__cta--ghost" href={heroContent.secondaryCta.href}>
                {heroContent.secondaryCta.label}
              </a>
            </AnimatedInView>
          </div>
          <AnimatedInView delay={0.3}>
            <ul className="hero__highlights">
              {heroContent.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </AnimatedInView>
        </div>
        <AnimatedInView delay={0.2}>
          <div className="hero__media">
            <span className="hero__glow" />
            <img src={heroContent.heroImage} alt="Sticky mobile app preview" loading="lazy" />
          </div>
        </AnimatedInView>
      </div>
    </section>
  );
}
