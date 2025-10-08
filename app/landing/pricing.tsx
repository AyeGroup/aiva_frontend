import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { pricingData } from "./landing.data";
import { Star } from "lucide-react";

import { PageType } from "@/types/common";

interface PricingProps {
  onNavigate: (page: PageType) => void;
}

// export  function Pricing({ onNavigate }: PricingProps) {
export default function Pricing( ) {
  const { title, subtitle, plans, faq } = pricingData;

  return (
    <section
      className="relative"
      id="pricing"
      aria-labelledby="pricing-title"
      style={{
        padding: "var(--space-20) 0",
        background: "var(--bg-soft-mint)",
      }}
    >
      <div className="container mx-auto px-6 mx-[74px] my-[0px] pt-[24px] pr-[24px] pb-[32px] pl-[24px]">
        <header className="text-center mt-16 mb-12 px-[0px] py-[24px] p-[0px]">
          <h2
            id="pricing-title"
            className="text-grey-900 mb-6"
            style={{
              fontSize: "var(--text-h2)",
              lineHeight: "var(--text-h2-lh)",
              fontWeight: "var(--font-weight-display)",
            }}
          >
            {title}
          </h2>
          <p
            className="text-grey-600 max-w-2xl mx-auto"
            style={{
              fontSize: "var(--text-body-large)",
              lineHeight: "var(--text-body-large-lh)",
            }}
          >
            {subtitle}
          </p>
        </header>

        {/* پلن‌های قیمت‌گذاری */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto mb-20">
          {plans.map((plan, index) => (
            <Card
              key={plan.id}
              variant="default"
              elevation={plan.popular ? "md" : "low"}
              padding="lg"
              radius="lg"
              hover={true}
              className={`relative text-center transition-all duration-300 ${
                plan.popular
                  ? "transform lg:scale-105 ring-2 ring-brand-primary/30 bg-bg-soft-mint"
                  : "hover:scale-105"
              }`}
              aria-labelledby={`plan-${plan.id}-title`}
              // style={{
              //   animationDelay: `${index * 0.1}s`,
              //   ...(plan.id === "growth" && { backgroundColor: "#FAEAE4" }),
              // }}
            >
              {/* برچسب محبوب‌ترین برای پلان رشد */}
              {plan.id === "growth" && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-white rounded-full shadow-md border border-gray-200 flex items-center gap-1 px-[12px] py-[8px]">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span
                      className="text-gray-700"
                      style={{
                        fontSize: "10px",
                        lineHeight: "12px",
                        fontWeight: "var(--font-weight-medium)",
                      }}
                    >
                      محبوب‌ترین
                    </span>
                  </div>
                </div>
              )}

              {/* هدر پلن */}
              <header className="mb-8">
                <h3
                  id={`plan-${plan.id}-title`}
                  className="text-grey-900 mb-3"
                  style={{
                    fontSize: "var(--text-h3)",
                    lineHeight: "var(--text-h3-lh)",
                    fontWeight: "var(--font-weight-medium)",
                  }}
                >
                  {plan.name}
                </h3>
                <p
                  className="text-grey-600 mb-6"
                  style={{
                    fontSize: "var(--text-body-small)",
                    lineHeight: "var(--text-body-small-lh)",
                  }}
                >
                  {plan.description}
                </p>

                <div className="flex items-baseline justify-center gap-2">
                  {plan.price === "سفارشی" ? (
                    <span className="text-grey-900 text-kpi">سفارشی</span>
                  ) : (
                    <>
                      <span
                        className="text-grey-900 text-kpi"
                        style={{ fontVariantNumeric: "tabular-nums" }}
                      >
                        {plan.price}
                      </span>
                      <span className="text-grey-500">تومان</span>
                      {plan.period && (
                        <span className="text-grey-500">/ {plan.period}</span>
                      )}
                    </>
                  )}
                </div>
              </header>

              {/* ویژگی‌ها */}
              <ul className="space-y-4 mb-8 text-right" role="list">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-success/10 flex items-center justify-center mt-1">
                      <span className="text-success text-sm" aria-hidden="true">
                        ✓
                      </span>
                    </div>
                    <span
                      className="text-grey-600"
                      style={{
                        fontSize: "var(--text-body-small)",
                        lineHeight: "var(--text-body-small-lh)",
                      }}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* دکمه اقدام */}
              <Button
                variant={plan.popular ? "primary" : "secondary"}
                size="lg"
                title={`انتخاب پلن ${plan.name}`}
                onClick={() => {
                  if (plan.id === "pro") {
                    // onNavigate("consultation");
                    // elham
                  } else {
                    // onNavigate("signup");
                    // elham
                  }
                }}
                icon={plan.id === "pro" ? "external" : "arrow-right"}
                iconPosition="right"
                className="w-full"
              >
                {plan.cta}
              </Button>
            </Card>
          ))}
        </div>

        {/* سؤالات قیمت‌گذاری */}
        <div className="max-w-2xl mx-auto">
          <h3
            className="text-grey-900 text-center mb-12"
            style={{
              fontSize: "var(--text-h3)",
              lineHeight: "var(--text-h3-lh)",
              fontWeight: "var(--font-weight-medium)",
            }}
          >
            سؤالات رایج قیمت‌گذاری
          </h3>
          <div className="space-y-4">
            {faq.map((item, index) => (
              <Card
                key={index}
                variant="default"
                elevation="low"
                padding="sm"
                radius="md"
                className="group overflow-hidden"
              >
                <details className="group">
                  <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-bg-soft-mint/50 animate-soft list-none">
                    <span
                      className="font-medium text-grey-900"
                      style={{
                        fontSize: "var(--text-body-large)",
                        lineHeight: "var(--text-body-large-lh)",
                      }}
                    >
                      {item.question}
                    </span>
                    <span
                      className="text-grey-500 group-open:rotate-180 animate-slow"
                      aria-hidden="true"
                    >
                      ↓
                    </span>
                  </summary>
                  <div
                    className="px-4 pb-4 text-grey-600"
                    style={{
                      fontSize: "var(--text-body-small)",
                      lineHeight: "var(--text-body-small-lh)",
                    }}
                  >
                    {item.answer}
                  </div>
                </details>
              </Card>
            ))}
          </div>
        </div>

        {/* متن توضیحی اضافه */}
        <div className="text-center mt-16 max-w-2xl mx-auto">
          <p
            className="text-grey-500"
            style={{
              fontSize: "var(--text-body-small)",
              lineHeight: "var(--text-body-small-lh)",
            }}
          >
            تمام پلن‌ها شامل ۱۴ روز تست رایگان هستند. بدون نیاز به کارت اعتباری.
          </p>
        </div>
      </div>
    </section>
  );
}
