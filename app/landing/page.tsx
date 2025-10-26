import React from 'react';
// import { ErrorBoundary } from '../_components/ErrorBoundary/error-boundary';
import { Hero } from './hero';
import { ErrorBoundary } from "@/components/error-boundary";
import { HowItWorks } from "./how-it-works";
import { Features } from './features';
import { Comparison } from './comparison';
import { CaseStudy } from './case-study';
import { Pricing } from './pricing';
import { Trust } from './trust';
import { FAQ } from './faq';
import { FinalCTA } from './final-cta';
import { Footer } from './footer';

type PageType = 'landing' | 'signup' | 'dashboard' | 'consultation';

interface LandingPageProps {
  onNavigate: (page: PageType) => void;
}

// Loading fallback component
const LoadingSection = () => (
  <div className="py-16 md:py-24">
    <div className="container mx-auto px-4">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-8"></div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// export function LandingPage({ onNavigate }: LandingPageProps) {
export default function Landing() {
  return (
    <main className="landing-page min-h-screen bg-white">
      {/* Hero Section */}
      <ErrorBoundary>
        <Hero   />
      </ErrorBoundary>

      {/* چطور کار می‌کند */}
      <ErrorBoundary>
        <section className="py-24 bg-[#F9FAFB]">
          <HowItWorks />
        </section>
      </ErrorBoundary>

      {/* ویژگی‌ها */}
      <ErrorBoundary>
        <section className="py-24 bg-white">
          <Features />
        </section>
      </ErrorBoundary>

      {/* مقایسه پشتیبانی */}
      <ErrorBoundary>
        <section className="py-24 bg-[#F9FAFB]">
          <Comparison />
        </section>
      </ErrorBoundary>

      {/* داستان موفقیت */}
      <ErrorBoundary>
        <section className="py-24 bg-white">
          <CaseStudy />
        </section>
      </ErrorBoundary>

      {/* قیمت‌گذاری */}
      <ErrorBoundary>
        <section className="py-24 bg-[#F9FAFB]">
          <Pricing  />
        </section>
      </ErrorBoundary>

      {/* امنیت و اعتماد */}
      <ErrorBoundary>
        <section className="py-20 bg-white">
          <Trust />
        </section>
      </ErrorBoundary>

      {/* سؤالات متداول */}
      <ErrorBoundary>
        <section className="py-24 bg-[#F9FAFB]">
          <FAQ />
        </section>
      </ErrorBoundary>

      {/* دعوت نهایی به اقدام */}
      <ErrorBoundary>
        <FinalCTA   />
      </ErrorBoundary>

      {/* فوتر */}
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
    </main>
  );
}