import { AnimatedInView } from './AnimatedInView';

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
};

export function SectionHeading({ eyebrow, title, description, align = 'left' }: SectionHeadingProps) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      {eyebrow && (
        <AnimatedInView delay={0.1}>
          <p className="section-heading__eyebrow">{eyebrow}</p>
        </AnimatedInView>
      )}
      <AnimatedInView delay={0.15}>
        <h2 className="section-heading__title">{title}</h2>
      </AnimatedInView>
      {description && (
        <AnimatedInView delay={0.2}>
          <p className="section-heading__description">{description}</p>
        </AnimatedInView>
      )}
    </div>
  );
}
