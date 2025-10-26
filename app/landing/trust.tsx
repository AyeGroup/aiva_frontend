"use client";
 import React from "react";
import { Lock, ShieldCheck, Key, Database } from "lucide-react";
import { trustData } from "./landing.data";

const getIcon = (iconName: string, color: string) => {
  const iconProps = {
    className: "w-8 h-8",
    strokeWidth: 2.5,
    style: { color },
  };

  switch (iconName) {
    case "lock":
      return <Lock {...iconProps} />;
    case "shield-check":
      return <ShieldCheck {...iconProps} />;
    case "key":
      return <Key {...iconProps} />;
    case "database":
      return <Database {...iconProps} />;
    default:
      return <Lock {...iconProps} />;
  }
};

export function Trust() {
  const { title, subtitle, features } = trustData;

  return (
    <section id="security" aria-labelledby="trust-title">
      <div className="max-w-7xl mx-auto px-6">
        <header className="text-center mb-16">
          <h2
            id="trust-title"
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const colors = ["#FF8970", "#78E2E2", "#FFCE4D", "#4460F7"];
            const iconColor = colors[index % colors.length];
            const bgColor = `${iconColor}15`;

            return (
              <article
                key={index}
                className="group relative p-8 rounded-3xl bg-white border-2 border-transparent hover:border-[rgba(101,188,182,0.2)] transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1 text-right"
                aria-labelledby={`trust-feature-${index}-title`}
              >
                {/* دایره پس‌زمینه با افکت blur */}
                <div
                  className="absolute top-6 right-6 w-20 h-20 rounded-full opacity-10 blur-2xl transition-all duration-500 group-hover:opacity-20 group-hover:scale-110"
                  style={{ backgroundColor: iconColor }}
                  aria-hidden="true"
                ></div>

                {/* آیکون */}
                <div className="relative mb-6">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                    style={{ backgroundColor: bgColor }}
                  >
                    <span aria-hidden="true" style={{ color: iconColor }}>
                      {getIcon(feature.icon, iconColor)}
                    </span>
                  </div>
                </div>

                {/* محتوا */}
                <div className="relative">
                  <h3
                    id={`trust-feature-${index}-title`}
                    className="mb-3 transition-colors duration-300"
                    style={{ color: iconColor }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* خط تزئینی */}
                <div
                  className="absolute bottom-0 right-0 h-1 w-0 rounded-full transition-all duration-500 group-hover:w-full"
                  style={{ backgroundColor: iconColor }}
                  aria-hidden="true"
                ></div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
