import { heroTestimonial } from '../data/content';
import { AnimatedInView } from '../components/AnimatedInView';

export function Testimonial() {
  return (
    <section className="testimonial">
      <div className="section-shell testimonial__inner">
        <AnimatedInView delay={0.05}>
          <p className="testimonial__quote">{heroTestimonial.quote}</p>
        </AnimatedInView>
        <AnimatedInView delay={0.1}>
          <p className="testimonial__author">{heroTestimonial.name}</p>
        </AnimatedInView>
        <AnimatedInView delay={0.15}>
          <p className="testimonial__role">{heroTestimonial.role}</p>
        </AnimatedInView>
        <AnimatedInView delay={0.2}>
          <p className="testimonial__metric">{heroTestimonial.supportingMetric}</p>
        </AnimatedInView>
      </div>
    </section>
  );
}
