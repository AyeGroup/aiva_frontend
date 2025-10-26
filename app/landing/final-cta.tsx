// import { Button } from '../_components/Button/button';
import { useRouter } from "next/navigation";
import { ctaData } from "./landing.data";

type PageType = "landing" | "signup" | "dashboard" | "consultation";

interface FinalCTAProps {
  onNavigate: (page: PageType) => void;
}

export function FinalCTA() {
  const { title, subtitle, cta, features } = ctaData;
  const router = useRouter();
  return (
    <section
      className="py-20 md:py-32 relative overflow-hidden"
      aria-labelledby="final-cta-title"
    >
      {/* Background Solid */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "#65bcb6" }}
      ></div>

      {/* Decorative Circles */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <header className="mb-12">
            <h2
              id="final-cta-title"
              className="text-white mb-4"
              style={{
                fontSize: "var(--text-h1)",
                lineHeight: "var(--text-h1-lh)",
                fontWeight: "var(--font-weight-display)",
              }}
            >
              {title}
            </h2>
            <p
              className="text-white/95 max-w-2xl mx-auto"
              style={{
                fontSize: "var(--text-body-large)",
                lineHeight: "var(--text-body-large-lh)",
              }}
            >
              {subtitle}
            </p>
          </header>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              type="button"
              title={cta.primary.title}
              onClick={() => router.push("signup")}
              className="btn animate-soft focus:outline-none inline-flex items-center justify-center gap-2 min-h-[44px] whitespace-nowrap px-6 py-4 rounded-[12px] bg-white text-[#2D3748] hover:bg-white/90 focus:ring-4 focus:ring-white/25 shadow-lg transition-all hover:scale-105"
              style={{
                transition: "all var(--transition-default)",
                borderRadius: "var(--radius-sm)",
              }}
            >
              {cta.primary.text}
            </button>

            <button
              type="button"
              title={cta.secondary.title}
              onClick={() => router.push("consultation")}
              // onClick={() => onNavigate("consultation")}
              className="btn animate-soft focus:outline-none inline-flex items-center justify-center gap-2 min-h-[44px] whitespace-nowrap px-6 py-4 rounded-[12px] bg-white/10 text-white border-2 border-white/30 hover:bg-white/20 focus:ring-4 focus:ring-white/25 transition-all"
              style={{
                transition: "all var(--transition-default)",
                borderRadius: "var(--radius-sm)",
              }}
            >
              {cta.secondary.text}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
