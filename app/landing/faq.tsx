"use client";

import React from "react";
import { faqData } from "./landing.data";

export function FAQ() {
  const { title, subtitle, questions } = faqData;

  return (
    <section id="faq" aria-labelledby="faq-title">
      <div className="max-w-7xl mx-auto px-6">
        <header className="text-center mb-16">
          <h2
            id="faq-title"
            className="text-[#111827] mb-6"
            style={{
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: "800",
              lineHeight: "1.2",
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </h2>
          <p
            className="text-[#4B5563] max-w-2xl mx-auto"
            style={{
              fontSize: "18px",
              lineHeight: "1.6",
              fontWeight: "400",
            }}
          >
            {subtitle}
          </p>
        </header>

        {/* Grid of FAQ Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {questions.map((item) => {
            return (
              <article
                key={item.id}
                className="p-6 rounded-2xl bg-white border border-grey-200 hover:shadow-lg transition-shadow duration-300 text-right"
                aria-labelledby={`faq-${item.id}-question`}
              >
                {/* آیکون */}
                <div className="mb-5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: "rgba(101,188,182,0.1)" }}
                  >
                    <span style={{ color: "#65bcb6" }} aria-hidden="true">
                      {item.icon === "help-circle" && (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                          <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>
                      )}
                      {item.icon === "clock" && (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                      )}
                      {item.icon === "shield" && (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                      )}
                      {item.icon === "zap" && (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                        </svg>
                      )}
                      {item.icon === "users" && (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                      )}
                      {item.icon === "file-text" && (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                          <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                      )}
                    </span>
                  </div>
                </div>

                {/* محتوا */}
                <h3
                  id={`faq-${item.id}-question`}
                  className="text-grey-900 mb-3"
                  style={{
                    fontSize: "var(--text-body-large)",
                    lineHeight: "var(--text-body-large-lh)",
                    fontWeight: "var(--font-weight-semibold)",
                  }}
                >
                  {item.question}
                </h3>
                <p
                  className="text-grey-600"
                  style={{
                    fontSize: "var(--text-body-small)",
                    lineHeight: "var(--text-body-small-lh)",
                  }}
                >
                  {item.answer}
                </p>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p
            className="text-grey-600 mb-6"
            style={{
              fontSize: "var(--text-body-large)",
              lineHeight: "var(--text-body-large-lh)",
            }}
          >
            سؤال دیگری دارید؟
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/docs"
              title="مشاهده مستندات کامل آیوا"
              className="inline-flex items-center gap-2 text-grey-700 hover:text-brand-primary transition-colors"
              style={{
                fontSize: "var(--text-body-base)",
                lineHeight: "var(--text-body-base-lh)",
              }}
            >
              <span>مستندات کامل</span>
              <span aria-hidden="true">←</span>
            </a>
            <a
              href="/contact"
              title="تماس با پشتیبانی آیوا"
              className="inline-flex items-center gap-2 text-grey-700 hover:text-brand-primary transition-colors"
              style={{
                fontSize: "var(--text-body-base)",
                lineHeight: "var(--text-body-base-lh)",
              }}
            >
              <span>تماس با پشتیبانی</span>
              <span aria-hidden="true">←</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
