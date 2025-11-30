import React from "react";

interface PlanFeature {
  text: string;
  enabled: boolean;
}

interface PlanCardProps {
  name: string;
  description: string;
  priceMonthly: number;
  priceYearly: number;
  period: "monthly" | "yearly";
  onPeriodChange: (newPeriod: "monthly" | "yearly") => void;

  features: PlanFeature[];
  icon: React.ReactNode;
  featured?: boolean;
  badgeText?: string;
  buttonText?: string;
  buttonVariant?: "primary" | "secondary";
  onSelect: () => void;
  disabled?: boolean;
}

export function PlanCardMenu({
  name,
  priceMonthly,
  priceYearly,
  period,
  features,
  icon,
  featured = false,
  badgeText,
  buttonText = "انتخاب پلن",
  buttonVariant = "primary",
  onSelect,
  disabled = false,
}: PlanCardProps) {
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  // انتخاب قیمت و متن دوره بر اساس period
  const price = period === "monthly" ? priceMonthly : priceYearly;

  return (
    <article className={`plan-compact-card ${featured ? "featured" : ""}`}>
      {badgeText && <span className="plan-compact-badge">{badgeText}</span>}

      <div className="plan-compact-header">
        <div
          className="plan-compact-icon flex items-center justify-center"
          style={{
            background: "var(--bg-soft-peach)",
            color: "var(--brand-secondary)",
          }}
        >
          <div className="size-4" style={{ color: "var(--brand-secondary)" }}>
            {icon}
          </div>
        </div>
        <div>
          <h4 className="plan-compact-name">{name}</h4>
          <p className="plan-compact-price">
            {formatPrice(price)}
            تومان
          </p>
        </div>
      </div>

      <ul className="plan-compact-features">
        {features.map((feature, index) => (
          <li key={index}>
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={`plan-compact-button ${buttonVariant}`}
        onClick={onSelect}
        disabled={disabled}
        title={buttonText}
        style={{ textAlign: "center" }}
      >
        {buttonText}
      </button>
    </article>
  );
}
