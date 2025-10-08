import React from 'react';
import { faqData } from './landing.data';

export function FAQ() {
  const { title, subtitle, questions } = faqData;

  return (
    <section className="py-16 md:py-24" aria-labelledby="faq-title">
      <div className="container mx-auto px-4">
        <header className="text-center mb-16">
          <h2 id="faq-title" className="text-3xl md:text-4xl mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </header>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {questions.map((item) => (
              <details 
                key={item.id}
                className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-all duration-300"
              >
                <summary 
                  className="flex items-center justify-between p-6 cursor-pointer hover:bg-muted/50 transition-colors"
                  aria-expanded="false"
                >
                  <span className="font-medium pr-4">{item.question}</span>
                  <span className="text-muted-foreground group-open:rotate-180 transition-transform duration-200 flex-shrink-0" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6,9 12,15 18,9"></polyline>
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>

          {/* لینک به مستندات */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              سؤال دیگری دارید؟
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/docs"
                title="مشاهده مستندات کامل آیوا"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              >
                <span>مستندات کامل</span>
                <span aria-hidden="true">←</span>
              </a>
              <a
                href="/contact"
                title="تماس با پشتیبانی آیوا"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              >
                <span>تماس با پشتیبانی</span>
                <span aria-hidden="true">←</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}