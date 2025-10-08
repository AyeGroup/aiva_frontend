import { howItWorksData } from "./landing.data";
import { Button } from "@/components/button";

const iconMap: Record<string, string> = {
  settings: "⚙️",
  brain: "🧠",
  "test-tube": "🧪",
  code: "💻",
};

export function HowItWorks() {
  const { title, subtitle, steps } = howItWorksData;

  return (
    <section
      className="py-20 md:py-32 relative"
      aria-labelledby="how-it-works-title"
    >
      {/* Sharp Background */}
      <div
        className="absolute inset-0"
        style={{ background: "var(--sharp-primary)", opacity: 0.05 }}
      >
        <div
          className="absolute top-1/4 right-1/4 w-64 h-64 opacity-30 rounded-full"
          style={{
            background: "var(--sharp-accent)",
            filter: "blur(80px)",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <header className="text-center mb-20">
          {/* Clean Badge */}
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-brand-primary/15 px-4 py-2 rounded-full shadow-sm mb-8">
            <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
            <span className="text-sm text-brand-primary font-medium">
              فرایند ساده
            </span>
          </div>

          <h2 id="how-it-works-title" className="text-grey-900 mb-6">
            {title}
          </h2>
          <p className="text-xl text-grey-600 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </header>

        <div className="relative">
          {/* Clean Progress Line */}
          <div className="hidden lg:block absolute top-20 left-0 right-0 h-px bg-grey-200"></div>
          <div
            className="hidden lg:block absolute top-20 left-0 w-full h-px"
            style={{
              background: "var(--sharp-primary)",
              opacity: 0.3,
            }}
          ></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <article
                key={step.id}
                className="relative text-center group"
                aria-labelledby={`step-${step.id}-title`}
              >
                {/* Clean Card */}
                <div className="relative bg-white/95 backdrop-blur-sm border border-white/60 rounded-xl p-8 shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all duration-300">
                  {/* Icon & Number */}
                  <div className="flex items-center justify-center mb-6 relative">
                    <div
                      className={`w-16 h-16 rounded-xl flex items-center justify-center relative`}
                      style={{
                        background:
                          index % 2 === 0
                            ? "var(--sharp-emerald)"
                            : "var(--sharp-coral)",
                        opacity: 0.15,
                      }}
                    >
                      <span className="text-2xl" aria-hidden="true">
                        {iconMap[step.icon] || "⭐"}
                      </span>
                      {/* Step Number */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-brand-primary text-white rounded-full flex items-center justify-center text-xs font-bold shadow-sm">
                        {step.id}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3
                    id={`step-${step.id}-title`}
                    className="text-grey-900 mb-4 font-medium"
                  >
                    {step.title}
                  </h3>
                  <p className="text-grey-600 leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Clean CTA */}
        <div className="text-center mt-20">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/60 inline-block">
            <p className="text-grey-700 mb-4">آماده شروع هستید؟</p>
            <Button
              variant="primary"
              size="md"
              title="مشاهده دموی زنده آیوا"
              icon="arrow-right"
              iconPosition="right"
              onClick={() => {
                const demoSection = document.getElementById("demo");
                demoSection?.scrollIntoView({ behavior: "smooth" });
              }}
              className="hover:shadow-md transform hover:scale-105 transition-all duration-200"
            >
              تست رایگان کنید
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
