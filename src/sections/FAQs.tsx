import { faqEntries } from '../data/content';
import { SectionHeading } from '../components/SectionHeading';
import { AnimatedInView } from '../components/AnimatedInView';
import { useState } from 'react';

export function FAQs() {
  const [openQuestion, setOpenQuestion] = useState<string | null>(faqEntries[0]?.question ?? null);

  return (
    <section id="faqs" className="faqs">
      <div className="section-shell">
        <SectionHeading
          eyebrow="FAQs"
          title="In case you missed anything"
          description="Answers to the most common questions about using and customising the Sticky experience."
        />
        <div className="faqs__list">
          {faqEntries.map((faq, index) => {
            const isOpen = openQuestion === faq.question;
            return (
              <AnimatedInView key={faq.question} delay={index * 0.05} className={`faq${isOpen ? ' faq--open' : ''}`}>
                <button className="faq__trigger" onClick={() => setOpenQuestion(isOpen ? null : faq.question)}>
                  <span>{faq.question}</span>
                  <span className="faq__icon" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                <div className="faq__answer">
                  <p>{faq.answer}</p>
                </div>
              </AnimatedInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}
