import { ReactNode } from "react";
import "@/styles/components.css";
import "@/styles/components.css";

interface CardProps {
  children?: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  disable?: boolean;
  onClick?: () => void;
}

export function Card({
  children,
  title,
  subtitle,
  className = "",
  disable = false,

  onClick,
}: CardProps) {
  const style = {
    transition: "var(--transition-default)",
    borderRadius: `var(--radius-md)`,
    boxShadow: `var(--shadow-md)`,
  };

  return (
    <div
      className={`card animate-soft border shadow-low rounded-2xl p-1 lg:p-4shadow-low 
        bg-bg-surface border-border-soft card-hover cursor-pointer ${
          disable ? "pointer-events-none opacity-50" : ""
        } border-2! border-solid! border-grey-200! ${className} ${
        onclick ? "cursor-pointer" : ""
      }`}
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
