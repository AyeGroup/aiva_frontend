import { Button } from "@/components/button";
import { ctaData } from "./landing.data";

import { PageType } from "@/types/common";

interface FinalCTAProps {
  onNavigate: (page: PageType) => void;
}

// export function FinalCTA({ onNavigate }: FinalCTAProps) {
export default function FinalCTA() {
  const { title, subtitle, cta, features } = ctaData;

  return (
    <section
      className="py-16 md:py-24 text-white relative overflow-hidden"
      aria-labelledby="final-cta-title"
      style={{ background: "var(--brand-secondary)" }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <header className="mb-12">
            <h2
              id="final-cta-title"
              className="text-3xl md:text-4xl lg:text-5xl mb-6"
            >
              {title}
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          </header>

          {/* دکمه‌های اقدام */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              variant="secondary"
              size="lg"
              title={cta.primary.title}
              // onClick={() => onNavigate("signup")}
              // elham
              icon="arrow-right"
              iconPosition="right"
              className="bg-white text-brand-primary hover:bg-white/90 w-full sm:w-auto"
            >
              {cta.primary.text}
            </Button>

            <Button
              variant="tertiary"
              size="lg"
              title={cta.secondary.title}
              // onClick={() => onNavigate("consultation")}
              // elham
              icon="external"
              iconPosition="right"
              className="text-white border-white hover:bg-white/10 w-full sm:w-auto"
            >
              {cta.secondary.text}
            </Button>
          </div>

          {/* ویژگی‌های کلیدی */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-white/80">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
