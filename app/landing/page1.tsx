"use client"
import React from "react";
import { ErrorBoundary } from "@/components/error-boundary";
import  Hero  from "./hero";
import { HowItWorks } from "./how-it-works";
import { Features } from "./features";
import  Pricing  from "./pricing";
import { Trust } from "./trust";
import { FAQ } from "./faq";
import  FinalCTA  from "./final-cta";
import { Footer } from "./footer";
import { PageType } from "@/types/common";

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

// export default function Landing({ onNavigate }: LandingPageProps) {
export default function Landing( ) {
  return (
    <main className="landing-page min-h-screen bg-gradient-to-br from-bg-app via-bg-shell to-bg-soft-mint">
      {/* Hero Section */}
      <ErrorBoundary>
        {/* <Hero onNavigate={onNavigate} /> */}
        <Hero />
      </ErrorBoundary>

      {/* چطور کار می‌کند */}
      <ErrorBoundary>
        <HowItWorks />
      </ErrorBoundary>

      {/* ویژگی‌ها */}
      <ErrorBoundary>
        <Features />
      </ErrorBoundary>

      {/* قیمت‌گذاری */}
      <ErrorBoundary>
        {/* <Pricing onNavigate={onNavigate} /> */}
        <Pricing />
      </ErrorBoundary>

      {/* امنیت و اعتماد */}
      <ErrorBoundary>
        <Trust />
      </ErrorBoundary>

      {/* سؤالات متداول */}
      <ErrorBoundary>
        <FAQ />
      </ErrorBoundary>

      {/* دعوت نهایی به اقدام */}
      <ErrorBoundary>
        <FinalCTA  />
        {/* <FinalCTA onNavigate={onNavigate} /> */}
      </ErrorBoundary>

      {/* فوتر */}
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
    </main>
  );
}
