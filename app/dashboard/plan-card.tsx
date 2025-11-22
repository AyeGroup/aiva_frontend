import React from "react";
import { Check, X } from "lucide-react";

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

export function PlanCard({
  name,
  description,
  priceMonthly,
  priceYearly,
  period,
  onPeriodChange,
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
  const periodLabel = period === "monthly" ? "ماهانه" : "سالانه";

  return (
    <article className={`plan-card ${featured ? "featured" : ""}`}>
      {badgeText && <span className="plan-card-badge">{badgeText}</span>}

      <header className="plan-card-header">
        <div className="plan-card-icon">{icon}</div>
        <h3 className="plan-card-name text-right">{name}</h3>
        <p className="plan-card-description text-right text-sm">{description}</p>
      </header>
      <div className="grid grid-cols-2   mb-3 w-full text-sm rounded-sm bg-gray-100 p-1.5">
        <button
          onClick={() => onPeriodChange("monthly")}
          className={`px-4 py-2 rounded-sm transition
            ${
              period === "monthly"
                ? "bg-white shadow text-primary "
                : "text-gray-500"
            }
          `}
        >
          ماهانه
        </button>

        <button
          onClick={() => onPeriodChange("yearly")}
          className={`px-4 py-2 rounded-sm transition
            ${
              period === "yearly"
                ? "bg-white shadow text-primary"
                : "text-gray-500"
            }
          `}
        >
          <div>
            سالانه
            <span className="text-xs font-medium rounded-[6px] text-white bg-secondary px-1 mr-1">
              ۲۰% تخفیف
            </span>
          </div>
        </button>
      </div>

      <div className="plan-card-price">
        <div className="plan-card-price-amount">
          <span className="plan-card-price-number">
            {price === 0 ? "رایگان" : formatPrice(price)}
          </span>
          {price > 0 && <span className="plan-card-price-currency">تومان</span>}
          {price > 0 && (
            <p className="plan-card-price-period text-sm">/ {periodLabel} </p>
          )}
        </div>
      </div>

      <ul className="plan-card-features">
        {features.map((feature, index) => (
          <li
            key={index}
            className={`plan-card-feature ${
              !feature.enabled ? "disabled" : ""
            }`}
          >
            <span className="plan-card-feature-icon">
              {feature.enabled ? (
                <Check
                  style={{ width: "11px", height: "11px", strokeWidth: "3" }}
                  aria-hidden="true"
                />
              ) : (
                <X
                  style={{ width: "11px", height: "11px", strokeWidth: "3" }}
                  aria-hidden="true"
                />
              )}
            </span>
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={`plan-card-button ${buttonVariant}`}
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
