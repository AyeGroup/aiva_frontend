import { ReactNode } from 'react';
import "@/styles/components.css";
import "@/styles/components.css";

interface CardProps {
  children?: ReactNode;
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'soft-mint' | 'soft-rose';
  elevation?: 'low' | 'md' | 'high';
  padding?: 'sm' | 'md' | 'lg';
  radius?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  hover?: boolean;
  disable?:boolean
  onClick?: () => void;
}

export function Card({
  children,
  title,
  subtitle,
  variant = "default",
  elevation = "low",
  padding = "md",
  radius = "lg",
  className = "",
  disable = false,
  hover = false,
  onClick,
}: CardProps) {
  const baseClasses = "card animate-soft border";

  const variantClasses = {
    default: "bg-bg-surface border-border-soft",
    "soft-mint": "bg-bg-soft-mint border-border-soft",
    "soft-rose": "bg-bg-soft-rose border-border-soft",
  };

  const elevationClasses = {
    low: "shadow-low",
    md: "shadow-md",
    high: "shadow-high",
  };

  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const radiusClasses = {
    sm: "rounded-[12px]",
    md: "rounded-[16px]",
    lg: "rounded-[20px]",
    xl: "rounded-[28px]",
  };

  const combinedClasses = [
    baseClasses,
    variantClasses[variant],
    elevationClasses[elevation],
    paddingClasses[padding],
    radiusClasses[radius],
    hover && "card-hover cursor-pointer",
    onClick && "cursor-pointer",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const style = {
    transition: "var(--transition-default)",
    borderRadius: `var(--radius-${radius})`,
    boxShadow: `var(--shadow-${elevation})`,
  };

  return (
    <div
      className={`${combinedClasses} ${
        disable ? "pointer-events-none opacity-50" : ""
      } border-2! border-solid! border-grey-200!`}
      style={style}
      onClick={onClick}
    >
      {title && (
        <div className="text-center mb-4">
          <h3
            className="text-grey-900 mb-2"
            style={{
              fontSize: "var(--text-h4)",
              lineHeight: "var(--text-h4-lh)",
            }}
          >
            {title}
          </h3>
          {subtitle && (
            <p
              className="text-grey-600"
              style={{
                fontSize: "var(--text-body-small)",
                lineHeight: "var(--text-body-small-lh)",
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
