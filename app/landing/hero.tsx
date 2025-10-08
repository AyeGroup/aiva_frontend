import { Button } from "@/components/button";
import { heroData } from "./landing.data";
import { AnimatedChatDemo } from "./animated-chat-demo";

import { PageType } from "@/types/common";

interface HeroProps {
  onNavigate: (page: PageType) => void;
}

// export function Hero({ onNavigate }: HeroProps) {
export default function Hero() {
  const { headline, subheadline, cta, socialProof } = heroData;

  return (
    <section
      className="hero-section relative overflow-hidden"
      aria-labelledby="hero-headline"
    >
      {/* Sharp & Vibrant Background */}
      <div className="absolute inset-0" style={{ background: "#FFFFFF" }}></div>
      <div
        className="absolute inset-0 pattern-dots opacity-20"
        style={{ backgroundColor: "#F1FAF8" }}
      ></div>

      {/* Sharp Floating Elements */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 opacity-15"
        style={{
          background: "var(--sharp-secondary)",
          borderRadius: "50%",
          filter: "blur(60px)",
        }}
      ></div>

      <div
        className="absolute bottom-1/3 left-1/5 w-64 h-64 opacity-12"
        style={{
          background: "var(--sharp-emerald)",
          borderRadius: "50%",
          filter: "blur(40px)",
        }}
      ></div>

      <div
        className="absolute top-1/2 left-1/2 w-48 h-48 opacity-8"
        style={{
          background: "var(--sharp-coral)",
          borderRadius: "50%",
          filter: "blur(50px)",
        }}
      ></div>

      <div className="container mx-auto px-6 relative z-10 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center min-h-[80vh]">
          {/* محتوای متنی */}
          <div className="space-y-10 text-right">
            {/* Sharp Modern Badge */}
            <div className="inline-flex items-center gap-3 glass-effect px-6 py-3 rounded-full shadow-sm">
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: "var(--sharp-cyan)" }}
              ></div>
              <span
                className="text-sm font-medium"
                style={{ color: "#65bcb6" }}
              >
                جدیدترین فناوری هوش مصنوعی
              </span>
            </div>

            <header className="space-y-8">
              <h1
                id="hero-headline"
                className="leading-tight"
                style={{
                  fontSize: "clamp(32px, 4.5vw, 56px)",
                  lineHeight: "clamp(40px, 5.5vw, 64px)",
                  fontWeight: "var(--font-weight-display)",
                  letterSpacing: "-0.02em",
                }}
              >
                <span className="text-sharp-secondary font-semibold">
                  {headline}
                </span>
              </h1>
              <p
                className="text-grey-600 leading-relaxed text-xl max-w-xl"
                style={{
                  lineHeight: "1.7",
                }}
              >
                {subheadline}
              </p>
            </header>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="primary"
                size="lg"
                title={cta.primary.title}
                // onClick={() => onNavigate("signup")}
// elham
                icon="arrow-right"
                iconPosition="right"
                className="w-full sm:w-auto hover:shadow-lg transform hover:scale-105 transition-all duration-200 px-8 py-4"
              >
                {cta.primary.text}
              </Button>

              <Button
                variant="secondary"
                size="lg"
                title={cta.secondary.title}
                onClick={() => {
                  const demoSection = document.getElementById("demo");
                  demoSection?.scrollIntoView({ behavior: "smooth" });
                }}
                icon="play"
                iconPosition="right"
                className="w-full sm:w-auto px-8 py-4"
              >
                {cta.secondary.text}
              </Button>

              <Button
                variant="tertiary"
                size="lg"
                title="مشاهده کامپوننت‌های کاستوم"
                // onClick={() => onNavigate("components")}
                //elham
                icon="check"
                // icon="layers"
                iconPosition="right"
                className="w-full sm:w-auto px-8 py-4 border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
              >
                کامپوننت‌های کاستوم
              </Button>
            </div>

            {/* Sharp Social Proof */}
            <div
              className="glass-effect rounded-2xl p-6 border-2"
              style={{ borderColor: "var(--sharp-primary)" }}
            >
              <div className="flex flex-wrap items-center gap-8">
                <div className="flex items-center gap-3 text-sm text-grey-600">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "var(--sharp-cyan)" }}
                  ></div>
                  <span className="font-medium">بیش از ۱۰۰۰ کسب‌وکار فعال</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-grey-600">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "var(--sharp-orange)" }}
                  ></div>
                  <span className="font-medium">
                    راه‌اندازی در کمتر از ۵ دقیقه
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-grey-600">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "var(--sharp-emerald)" }}
                  ></div>
                  <span className="font-medium">پشتیبانی ۲۴/۷</span>
                </div>
              </div>
            </div>
          </div>

          {/* Clean Demo */}
          <div className="relative" id="demo">
            {/* Sharp Floating Elements */}
            <div
              className="absolute -top-6 -right-6 w-24 h-24 rounded-full morphing-shape"
              style={{
                background: "var(--sharp-pink)",
                opacity: 0.15,
              }}
            ></div>
            <div
              className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full floating-element"
              style={{
                background: "var(--sharp-teal)",
                opacity: 0.2,
              }}
            ></div>
            <div
              className="absolute top-1/2 right-1/4 w-8 h-8 rounded-full particle-effect"
              style={{
                background: "var(--sharp-violet)",
                opacity: 0.25,
              }}
            ></div>
            <div
              className="absolute top-1/4 left-1/3 w-12 h-12 rounded-full"
              style={{
                background: "var(--sharp-amber)",
                opacity: 0.18,
                animation: "gentle-bounce 3s ease-in-out infinite",
              }}
            ></div>

            <div className="relative bg-white/95 backdrop-blur-xl border border-white/60 p-8 shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl">
              {/* Clean Status Indicator */}
              <div className="absolute -top-3 -right-3 bg-brand-primary text-white px-4 py-2 rounded-xl shadow-md">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">دموی زنده</span>
                </div>
              </div>

              <AnimatedChatDemo />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
