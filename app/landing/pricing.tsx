"use client";

import { Card } from "@/components/card";
import { pricingData } from "./landing.data";
import { Check, Sparkles, Zap, Rocket, Crown, Building2 } from "lucide-react";
import { Button } from "@/components/button";
import { useRouter } from "next/navigation";

type PageType = "landing" | "signup" | "dashboard" | "consultation";

interface PricingProps {
  onNavigate: (page: PageType) => void;
}

// آیکون‌ها و رنگ‌های هر پلن
const planThemes = {
  free: {
    icon: Sparkles,
    color: "var(--sharp-cyan)",
    bg: "var(--bg-soft-teal)",
  },
  basic: {
    icon: Zap,
    color: "var(--sharp-emerald)",
    bg: "var(--bg-soft-emerald)",
  },
  medium: {
    icon: Rocket,
    color: "var(--brand-primary)",
    bg: "var(--bg-soft-mint)",
  },
  advance: {
    icon: Crown,
    color: "var(--sharp-violet)",
    bg: "var(--bg-soft-purple)",
  },
  enterprise: {
    icon: Building2,
    color: "var(--sharp-indigo)",
    bg: "var(--bg-soft-indigo)",
  },
};

export function Pricing() {
  const { title, subtitle, plans, faq } = pricingData;
  const router = useRouter();
  return (
    <section
      className="relative overflow-hidden"
      id="pricing"
      aria-labelledby="pricing-title"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <header className="text-center mb-16">
          <h2
            id="pricing-title"
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

        {/* پلن‌های قیمت‌گذاری */}
        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1300px] mx-auto"
          style={{ alignItems: "stretch" }}
        >
          {plans.map((plan, index) => {
            const theme = planThemes[plan.id as keyof typeof planThemes];
            const Icon = theme.icon;
            const isPopular = plan.popular;

            return (
              <Card
                key={plan.id}
                variant="default"
                elevation="low"
                // padding="none"
                radius="xl"
                hover={false}
                className={`relative overflow-hidden transition-all duration-300 group ${
                  isPopular ? "lg:row-span-1" : ""
                }`}
                aria-labelledby={`plan-${plan.id}-title`}
                // style={{
                //   animationDelay: `${index * 0.1}s`,
                //   border: isPopular ? `2px solid ${theme.color}` : '1px solid var(--grey-200)',
                //   transform: isPopular ? 'scale(1.05)' : 'scale(1)'
                // }}
              >
                {/* Background Accent */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 opacity-20 transition-all duration-500 group-hover:opacity-30"
                  style={{
                    background: `radial-gradient(circle at top right, ${theme.color} 0%, transparent 70%)`,
                  }}
                />

                <div className="relative flex flex-col h-full">
                  {/* آیکون و نام پلن */}
                  <header className="mb-6 text-right">
                    <div className="flex items-center justify-between mb-4 p-8 pb-0">
                      <div
                        className="flex items-center justify-center w-14 h-14 rounded-2xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                        style={{
                          backgroundColor: theme.bg,
                        }}
                      >
                        <Icon
                          style={{
                            width: "28px",
                            height: "28px",
                            color: theme.color,
                            strokeWidth: 2,
                          }}
                        />
                      </div>

                      {/* برچسب محبوب */}
                      {isPopular && (
                        <div
                          className="px-4 py-1.5 rounded-full shadow-md flex-shrink-0"
                          style={{
                            backgroundColor: theme.color,
                            animation:
                              "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                          }}
                        >
                          <span
                            className="text-white"
                            style={{
                              fontSize: "var(--text-caption)",
                              fontWeight: "var(--font-weight-medium)",
                            }}
                          >
                            ⭐ محبوب‌ترین
                          </span>
                        </div>
                      )}
                    </div>

                    <h3
                      id={`plan-${plan.id}-title`}
                      className="text-grey-900 mb-1 px-8"
                    >
                      {plan.name}
                    </h3>
                    <p
                      className="text-grey-500 px-8"
                      style={{
                        fontSize: "var(--text-body-small)",
                      }}
                    >
                      {plan.nameEn}
                    </p>
                  </header>

                  {/* قیمت - بزرگ و برجسته */}
                  <div className="mb-8 pb-6 border-b border-grey-100 px-8">
                    {plan.price === "سفارشی" ? (
                      <div className="flex items-baseline gap-2">
                        <span
                          className="text-grey-900"
                          style={{
                            fontSize: "36px",
                            fontWeight: "var(--font-weight-display)",
                            lineHeight: "1",
                          }}
                        >
                          توافقی
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-baseline gap-2">
                        <span
                          className="text-grey-900"
                          style={{
                            fontSize: isPopular ? "42px" : "38px",
                            fontWeight: "var(--font-weight-display)",
                            lineHeight: "1",
                            fontVariantNumeric: "tabular-nums",
                            color: isPopular ? theme.color : "var(--grey-900)",
                          }}
                        >
                          {plan.price}
                        </span>
                        <div className="flex flex-col">
                          <span
                            className="text-grey-500"
                            style={{
                              fontSize: "var(--text-body-small)",
                            }}
                          >
                            تومان
                          </span>
                          {plan.period && (
                            <span
                              className="text-grey-400"
                              style={{
                                fontSize: "var(--text-caption)",
                              }}
                            >
                              / {plan.period}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ویژگی‌ها */}
                  <ul className="space-y-3.5 mb-8 text-right px-8" role="list">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div
                          className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                          style={{
                            backgroundColor: theme.bg,
                          }}
                        >
                          <Check
                            style={{
                              width: "14px",
                              height: "14px",
                              color: theme.color,
                              strokeWidth: 3,
                            }}
                            aria-hidden="true"
                          />
                        </div>
                        <span className="text-grey-700 flex-1">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* دکمه اقدام */}
                  <div
                    className="mt-auto px-8"
                    style={{ paddingBottom: "40px" }}
                  >
                    <Button
                      variant={isPopular ? "primary" : "secondary"}
                      size="lg"
                      title={`انتخاب پلن ${plan.name}`}
                      onClick={() => {
                        if (plan.id === "enterprise") {
                          router.push("/consultation");
                          // onNavigate('consultation');
                          //elham
                        } else {
                          // onNavigate('signup');
                          router.push("/signup");
                          //elham
                        }
                      }}
                      className="w-full transition-all duration-300 hover:shadow-lg"
                      // style={{
                      //   backgroundColor: isPopular ? theme.color : undefined,
                      //   borderColor: isPopular ? theme.color : undefined
                      // }}
                    >
                      {plan.cta}
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>
    </section>
  );
}
