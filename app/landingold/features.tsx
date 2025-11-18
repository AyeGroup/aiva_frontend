"use client";

import React, { useState } from "react";
import { successStoriesData } from "./landing.data";
import { TrendingUp, TrendingDown, Award } from "lucide-react";

export function Features() {
  const { title, subtitle, brands, cases } = successStoriesData;
  const [activeTab, setActiveTab] = useState<string>("hamiiyar");

  const activeCase = cases[activeTab as keyof typeof cases];

  return (
    <section
      className="relative overflow-hidden"
      // id="features"
      id="case-study"
      aria-labelledby="features-title"
    >
      <div className="max-w-7xl mx-auto px-6">
        <header className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-[#E3F4F1]">
            <Award className="w-4 h-4 text-[#65bcb6]" aria-hidden="true" />
            <span
              className="text-sm text-[#65bcb6]"
              style={{ fontWeight: "500" }}
            >
              داستان‌های موفقیت
            </span>
          </div>

          <h2
            id="features-title"
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

        {/* Tabs */}
        <nav role="tablist" aria-label="انتخاب برند" className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {brands.map((brand) => (
              <button
                key={brand.id}
                role="tab"
                aria-selected={activeTab === brand.id}
                aria-controls={`case-${brand.id}`}
                onClick={() => setActiveTab(brand.id)}
                className="relative px-6 py-3 rounded-lg transition-all duration-200 border"
                style={{
                  background: activeTab === brand.id ? "#65bcb6" : "white",
                  color: activeTab === brand.id ? "white" : "#4B5563",
                  borderColor: activeTab === brand.id ? "#65bcb6" : "#E5E7EB",
                  fontWeight: activeTab === brand.id ? "600" : "500",
                }}
                title={`مشاهده نتایج ${brand.name}`}
              >
                {brand.name}
              </button>
            ))}
          </div>
        </nav>

        {/* Case Content with Animation */}
        <div
          key={activeTab}
          id={`case-${activeTab}`}
          role="tabpanel"
          className="max-w-6xl mx-auto"
          style={{
            animation: "fadeInUp 0.5s ease-out",
          }}
        >
          {/* Brand Info - Minimal */}
          <div className="text-center mb-12">
            <h3 className="text-grey-900 mb-1">{activeCase.brand}</h3>
            <p className="text-grey-500">{activeCase.industry}</p>
          </div>

          {/* Stats Grid - Clean Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {activeCase.stats.map((stat, index) => {
              const isPositive =
                stat.value.includes("+") ||
                stat.value.includes("٪") ||
                stat.value.includes("/");
              const isNegative = stat.value.includes("-");

              const colors = [
                {
                  light: "rgba(16, 185, 129, 0.1)",
                  dark: "#10B981",
                  border: "rgba(16, 185, 129, 0.2)",
                },
                {
                  light: "rgba(59, 130, 246, 0.1)",
                  dark: "#3B82F6",
                  border: "rgba(59, 130, 246, 0.2)",
                },
                {
                  light: "rgba(239, 68, 68, 0.1)",
                  dark: "#EF4444",
                  border: "rgba(239, 68, 68, 0.2)",
                },
              ];

              const color = colors[index % 3];

              return (
                <article
                  key={stat.id}
                  className="relative bg-white rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    border: `2px solid ${color.border}`,
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 10px 30px -5px ${color.border}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 1px 3px rgba(0, 0, 0, 0.05)";
                  }}
                >
                  {/* Top Badge */}
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className="px-3 py-1.5 rounded-full"
                      style={{ background: color.light }}
                    >
                      {isPositive && !isNegative && (
                        <TrendingUp
                          className="w-4 h-4"
                          style={{ color: color.dark }}
                          aria-label="روند صعودی"
                        />
                      )}
                      {isNegative && (
                        <TrendingDown
                          className="w-4 h-4"
                          style={{ color: color.dark }}
                          aria-label="روند نزولی"
                        />
                      )}
                    </div>
                  </div>

                  {/* Value - Large & Bold */}
                  <div className="mb-3">
                    <p
                      className="text-grey-900"
                      style={{
                        fontSize: "2.5rem",
                        fontWeight: "700",
                        lineHeight: "1",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {stat.value}
                    </p>
                  </div>

                  {/* Label */}
                  <h4 className="text-grey-800 mb-2">{stat.label}</h4>

                  {/* Description */}
                  <p className="text-grey-600" style={{ fontSize: "0.875rem" }}>
                    {stat.description}
                  </p>
                </article>
              );
            })}
          </div>

          {/* Testimonial - Minimal Card */}
          <div
            className="bg-white rounded-2xl p-8 md:p-10 transition-all duration-300"
            style={{
              border: "1px solid #E5E7EB",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div
                  className="relative w-20 h-20 rounded-full overflow-hidden"
                  style={{
                    border: "3px solid #65bcb6",
                  }}
                >
                  <img
                    src={activeCase.testimonial.avatar}
                    alt={`عکس ${activeCase.testimonial.author}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-right">
                <blockquote className="mb-4">
                  <p
                    className="text-grey-700 leading-relaxed"
                    style={{ fontSize: "1.125rem" }}
                  >
                    {activeCase.testimonial.text}
                  </p>
                </blockquote>

                <footer>
                  <cite className="not-italic">
                    <p className="text-grey-900 font-medium">
                      {activeCase.testimonial.author}
                    </p>
                    <p
                      className="text-grey-500"
                      style={{ fontSize: "0.875rem" }}
                    >
                      {activeCase.testimonial.role} • {activeCase.brand}
                    </p>
                  </cite>
                </footer>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </section>
  );
}
