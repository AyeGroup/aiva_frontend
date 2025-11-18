"use client";

import React from "react";
import { comparisonData } from "./landing.data";
import {
  Phone,
  Users,
  DollarSign,
  UserX,
  Zap,
  MessageCircle,
  TrendingDown,
  Clock,
  X,
  Check,
  Receipt,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  phone: Phone,
  users: Users,
  "dollar-sign": DollarSign,
  "user-x": UserX,
  zap: Zap,
  "message-circle": MessageCircle,
  "trending-down": TrendingDown,
  clock: Clock,
  receipt: Receipt,
};

export function Comparison() {
  const { title, subtitle, comparisons } = comparisonData;

  return (
    <section
      className="relative overflow-hidden"
      id="comparison"
      aria-labelledby="comparison-title"
    >
      <div className="max-w-7xl mx-auto px-6">
        <header className="text-center mb-16">
          <h2
            id="comparison-title"
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
            className="text-[#4B5563] max-w-3xl mx-auto"
            style={{
              fontSize: "18px",
              lineHeight: "1.6",
              fontWeight: "400",
            }}
          >
            {subtitle}
          </p>
        </header>

        {/* Comparisons Grid */}
        <div className="max-w-7xl mx-auto space-y-8">
          {comparisons.map((comparison, index) => {
            const ProblemIcon = iconMap[comparison.problem.icon];
            const SolutionIcon = iconMap[comparison.solution.icon];

            return (
              <div
                key={comparison.id}
                className="grid md:grid-cols-2 gap-4 md:gap-6 comparison-row"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s backwards`,
                }}
              >
                {/* Problem Card - Right Side */}
                <article
                  className="relative bg-white rounded-2xl p-6 md:p-8 transition-all duration-300 order-2 md:order-1 problem-card"
                  aria-labelledby={`problem-${comparison.id}`}
                  style={{
                    border: "2px solid rgba(239, 68, 68, 0.2)",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 28px -8px rgba(239, 68, 68, 0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 1px 3px rgba(0, 0, 0, 0.05)";
                  }}
                >
                  {/* Problem Badge - Minimal */}
                  <div
                    className="absolute -top-2.5 right-6 px-3 py-1 rounded-full flex items-center gap-1.5"
                    style={{
                      background: "#EF4444",
                      boxShadow: "0 2px 8px rgba(239, 68, 68, 0.2)",
                    }}
                  >
                    <X className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                    <span
                      className="text-white"
                      style={{ fontSize: "0.75rem", fontWeight: "600" }}
                    >
                      مشکل
                    </span>
                  </div>

                  <div className="flex items-start gap-5 mt-3">
                    {/* Icon - Larger & More Prominent */}
                    <div
                      className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-300 icon-wrapper"
                      style={{
                        background: "rgba(239, 68, 68, 0.1)",
                        border: "2px solid rgba(239, 68, 68, 0.15)",
                      }}
                      aria-hidden="true"
                    >
                      {ProblemIcon && (
                        <ProblemIcon
                          className="w-8 h-8"
                          // style={{ color: '#EF4444' }}
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-right">
                      <h3
                        id={`problem-${comparison.id}`}
                        className="text-grey-900 mb-2"
                      >
                        {comparison.problem.title}
                      </h3>
                      <p
                        className="text-grey-600"
                        style={{ fontSize: "0.938rem" }}
                      >
                        {comparison.problem.description}
                      </p>
                    </div>
                  </div>
                </article>

                {/* Solution Card - Left Side */}
                <article
                  className="relative bg-white rounded-2xl p-6 md:p-8 transition-all duration-300 order-1 md:order-2 solution-card"
                  aria-labelledby={`solution-${comparison.id}`}
                  style={{
                    border: "2px solid rgba(16, 185, 129, 0.2)",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 28px -8px rgba(16, 185, 129, 0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 1px 3px rgba(0, 0, 0, 0.05)";
                  }}
                >
                  {/* Solution Badge - Minimal */}
                  <div
                    className="absolute -top-2.5 left-6 px-3 py-1 rounded-full flex items-center gap-1.5"
                    style={{
                      background: "#10B981",
                      boxShadow: "0 2px 8px rgba(16, 185, 129, 0.2)",
                    }}
                  >
                    <Check
                      className="w-3.5 h-3.5 text-white"
                      aria-hidden="true"
                    />
                    <span
                      className="text-white"
                      style={{ fontSize: "0.75rem", fontWeight: "600" }}
                    >
                      راه‌حل
                    </span>
                  </div>

                  <div className="flex items-start gap-5 mt-3">
                    {/* Content */}
                    <div className="flex-1 text-right">
                      <h3
                        id={`solution-${comparison.id}`}
                        className="text-grey-900 mb-2"
                      >
                        {comparison.solution.title}
                      </h3>
                      <p
                        className="text-grey-600"
                        style={{ fontSize: "0.938rem" }}
                      >
                        {comparison.solution.description}
                      </p>
                    </div>

                    {/* Icon - Larger & More Prominent */}
                    <div
                      className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-300 icon-wrapper"
                      style={{
                        background: "rgba(16, 185, 129, 0.1)",
                        border: "2px solid rgba(16, 185, 129, 0.15)",
                      }}
                      aria-hidden="true"
                    >
                      {SolutionIcon && (
                        <SolutionIcon
                          className="w-8 h-8"
                          // style={{ color: '#10B981' }}
                        />
                      )}
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>

        {/* Bottom Note - Enhanced */}
        <div className="text-center mt-20">
          <div
            className="inline-block bg-white rounded-2xl px-8 py-6 transition-all duration-300 note-card"
            style={{
              border: "2px solid rgba(101, 188, 182, 0.2)",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 10px 30px -5px rgba(101, 188, 182, 0.2)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.05)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div className="flex items-start gap-3 text-right">
              <div
                className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "rgba(101, 188, 182, 0.1)",
                  border: "1px solid rgba(101, 188, 182, 0.2)",
                }}
              >
                <span style={{ fontSize: "1.25rem" }}>💡</span>
              </div>
              <div className="flex-1">
                <p className="text-grey-800 mb-1">
                  <strong>نکته:</strong> با آیوا، تیم پشتیبانی شما روی مشکلات
                  پیچیده تمرکز می‌کنه
                </p>
                <p className="text-grey-600" style={{ fontSize: "0.875rem" }}>
                  و کارهای تکراری رو به چت‌بات هوشمند واگذار می‌کنید
                </p>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .problem-card:hover .icon-wrapper {
            transform: rotate(-5deg) scale(1.05);
          }
          
          .solution-card:hover .icon-wrapper {
            transform: rotate(5deg) scale(1.05);
          }
          
          .note-card {
            transition: all 0.3s ease;
          }
        `}</style>
      </div>
    </section>
  );
}
