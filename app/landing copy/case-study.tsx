"use client";

import React, { useState, useEffect } from "react";
import { caseStudyData } from "./landing.data";
import {
  MessageCircle,
  TrendingUp,
  Check,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";

// interface CaseStudyProps {
//   onNavigate: (page: 'landing' | 'signup' | 'dashboard' | 'consultation' | 'onboarding') => void;
// }

export function CaseStudy() {
  const { title, story, stat, cta, chatDemo } = caseStudyData;
  const [animationStep, setAnimationStep] = useState(0);
  const router = useRouter();
  useEffect(() => {
    const steps = [0, 1, 2, 3, 4, 5];
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep = (currentStep + 1) % steps.length;
      setAnimationStep(currentStep);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative"
      id="case-study"
      aria-labelledby="case-study-title"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Chat Demo - سمت راست */}
          <article className="order-2 lg:order-1" aria-label="نمایش دموی چت">
            <div
              className="relative rounded-[32px] p-8 md:p-10 overflow-hidden"
              style={{
                minHeight: "520px",
                background: "#FFA18E",
                boxShadow: "0 20px 60px rgba(255, 161, 142, 0.25)",
              }}
            >
              {/* Minimal Geometric Pattern */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='2' fill='white' fill-opacity='0.2'/%3E%3C/svg%3E")`,
                  backgroundSize: "60px 60px",
                }}
                aria-hidden="true"
              ></div>
              {/* Header Badge */}
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
                style={{
                  background: "rgba(255, 255, 255, 0.25)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Sparkles className="w-4 h-4 text-white" aria-hidden="true" />
                <span className="text-white text-sm">{chatDemo.timestamp}</span>
              </div>

              {/* Chat Messages Container */}
              <div className="space-y-4">
                {/* User Message */}
                {animationStep >= 1 && (
                  <div
                    className="flex justify-end"
                    style={{ animation: "slideInRight 0.4s ease-out" }}
                  >
                    <div
                      className="bg-white rounded-[24px] px-5 py-4 max-w-[280px]"
                      style={{
                        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
                      }}
                    >
                      <p className="text-right text-grey-900">
                        {chatDemo.initialMessage}
                      </p>
                      <p className="text-xs text-grey-500 text-left mt-2">
                        ۲:۳۰
                      </p>
                    </div>
                  </div>
                )}

                {/* Typing Indicator */}
                {animationStep === 2 && (
                  <div
                    className="flex justify-start"
                    style={{ animation: "slideInLeft 0.4s ease-out" }}
                  >
                    <div
                      className="bg-white/90 backdrop-blur-sm rounded-[24px] px-5 py-4 flex items-center gap-2"
                      style={{ boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)" }}
                    >
                      <div className="flex gap-1.5">
                        <div className="typing-dot"></div>
                        <div
                          className="typing-dot"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="typing-dot"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bot Response */}
                {animationStep >= 3 && (
                  <div
                    className="flex justify-start"
                    style={{ animation: "slideInLeft 0.4s ease-out" }}
                  >
                    <div
                      className="bg-white rounded-[24px] px-6 py-5 max-w-[380px]"
                      style={{
                        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
                      }}
                    >
                      <p className="text-right text-grey-900 mb-3">
                        {chatDemo.response}
                      </p>

                      <div
                        className="text-right text-sm text-grey-700 leading-relaxed whitespace-pre-line rounded-2xl px-4 py-3 mb-4"
                        style={{ background: "#F5F5F5" }}
                      >
                        {chatDemo.extraInfo}
                      </div>

                      {/* Action Buttons */}
                      {animationStep >= 4 && (
                        <div
                          className="flex gap-2"
                          style={{ animation: "fadeIn 0.4s ease-out" }}
                        >
                          {chatDemo.buttons.map((button, index) => (
                            <button
                              key={index}
                              className="flex-1 py-2.5 rounded-xl transition-transform duration-200 hover:scale-105"
                              style={
                                button.variant === "primary"
                                  ? {
                                      background: "#65bcb6",
                                      color: "white",
                                      boxShadow:
                                        "0 4px 12px rgba(101, 188, 182, 0.25)",
                                    }
                                  : {
                                      border: "1.5px solid #65bcb6",
                                      background: "white",
                                      color: "#65bcb6",
                                    }
                              }
                              title={button.text}
                            >
                              <span className="text-sm">{button.text}</span>
                            </button>
                          ))}
                        </div>
                      )}

                      <p className="text-xs text-grey-500 text-left mt-3">
                        ۲:۳۱
                      </p>
                    </div>
                  </div>
                )}

                {/* Success Message */}
                {animationStep >= 5 && (
                  <div
                    className="flex justify-center pt-2"
                    style={{ animation: "scaleIn 0.4s ease-out" }}
                  >
                    <div
                      className="bg-white rounded-full px-5 py-2.5 flex items-center gap-2"
                      style={{
                        boxShadow: "0 8px 20px rgba(34, 197, 94, 0.2)",
                        border: "2px solid #22c55e",
                      }}
                    >
                      <Check
                        className="w-5 h-5 text-green-600"
                        aria-hidden="true"
                      />
                      <span className="text-grey-900">
                        {chatDemo.finalMessage}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </article>

          {/* Content - سمت چپ */}
          <div className="order-1 lg:order-2 text-right space-y-8">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{ background: "#E8F6F5" }}
            >
              <MessageCircle
                className="w-4 h-4"
                style={{ color: "#65bcb6" }}
                aria-hidden="true"
              />
              <span className="text-sm" style={{ color: "#65bcb6" }}>
                یک فروش بی نقص
              </span>
            </div>

            {/* Title */}
            <header>
              <h2
                id="case-study-title"
                className="text-grey-900 mb-4"
                style={{ lineHeight: "1.3" }}
              >
                {title}
              </h2>
              <p className="text-grey-600 leading-relaxed">{story}</p>
            </header>

            {/* Stat Card */}
            <article
              className="bg-white rounded-[28px] p-8 transition-all duration-300 hover:translate-y-[-4px]"
              style={{
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
                border: "2px solid #E8F6F5",
              }}
              aria-labelledby="stat-label"
            >
              <div className="flex items-start gap-5">
                {/* Icon */}
                <div
                  className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{
                    background: "#E8F6F5",
                  }}
                  aria-hidden="true"
                >
                  <TrendingUp
                    className="w-7 h-7"
                    style={{ color: "#65bcb6" }}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 text-right">
                  <div className="mb-2" style={{ color: "#65bcb6" }}>
                    {stat.value}
                  </div>
                  <h3 id="stat-label" className="text-grey-900 mb-2">
                    {stat.label}
                  </h3>
                  <p className="text-grey-600 leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </div>
            </article>

            {/* CTA Button */}
            <button
              onClick={() => router.push("onboarding")}
              className="w-full py-5 px-8 rounded-[20px] text-white transition-all duration-300 hover:translate-y-[-2px] active:translate-y-[0px] flex items-center justify-center gap-2"
              style={{
                background: "#65bcb6",
                boxShadow: "0 12px 28px rgba(101, 188, 182, 0.35)",
              }}
              title="تست رایگان محصول"
            >
              <span>تست رایگان محصول</span>
              <ArrowLeft className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-8px);
          }
        }

        .typing-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #65bcb6;
          animation: typing 1.4s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
}
