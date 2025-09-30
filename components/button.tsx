import { ButtonProps } from "@/types/common";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Download,
  Plus,
  Check,
  X,
  Play,
  Loader2,
} from "lucide-react";
import "@/styles/components.css";

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  title = "",
  type = "button",
  icon = "null",
  iconPosition = "right",
  className = "",
  children,
  onClick,
}: ButtonProps) {
  const baseClasses =
    "btn animate-soft focus:outline-none inline-flex items-center justify-center gap-2 min-h-[44px] whitespace-nowrap";
  const variantClasses = {
    primary:
      "bg-[#65BCB6] text-white hover:bg-[#5AA8A2] focus:ring-4 focus:ring-[rgba(101,188,182,0.25)] shadow-sm",
    secondary:
      "border-2 border-[#65BCB6] text-[#65BCB6] bg-white hover:bg-[rgba(101,188,182,0.08)] focus:ring-4 focus:ring-[rgba(101,188,182,0.25)]",
    tertiary:
      "text-[#65BCB6] bg-transparent hover:underline hover:opacity-80 focus:ring-2 focus:ring-[rgba(101,188,182,0.25)]",
  };
  const sizeClasses = {
    sm: "px-3 py-2 text-sm rounded-[10px] min-h-[36px]",
    md: "px-4 py-3 rounded-[12px]",
    lg: "px-6 py-4 rounded-[12px] text-lg",
  };

  // Icon mapping
  const iconMap = {
    "arrow-right": ArrowRight,
    "arrow-left": ArrowLeft,
    external: ExternalLink,
    download: Download,
    plus: Plus,
    check: Check,
    x: X,
    play: Play,
    null: "",
  };

  // Icon color based on variant
  const getIconColor = () => {
    switch (variant) {
      case "primary":
        return "text-white";
      case "secondary":
        return "text-[#65BCB6]";
      case "tertiary":
        return "text-[#65BCB6]";
      default:
        return "text-current";
    }
  };

  const IconComponent = icon ? iconMap[icon] : null;
  const iconSize = size === "sm" ? 16 : size === "lg" ? 20 : 18;

  const combinedClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    loading && "opacity-70 cursor-not-allowed",
    disabled && "opacity-50 cursor-not-allowed pointer-events-none",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      title={title}
      disabled={disabled || loading}
      onClick={onClick}
      className={combinedClasses}
      aria-disabled={disabled || loading}
      style={{
        transition: "all var(--transition-default)",
        borderRadius: size === "sm" ? "var(--radius-xs)" : "var(--radius-sm)",
      }}
    >
      {/* Loading spinner */}
      {loading && (
        <Loader2
          size={iconSize}
          className={`animate-spin ${getIconColor()}`}
          aria-hidden="true"
        />
      )}

      {/* Icon on the left for RTL (Persian) - shows first in RTL layout */}
      {!loading && IconComponent && iconPosition === "left" && (
        <IconComponent
          size={iconSize}
          className={getIconColor()}
          aria-hidden="true"
        />
      )}

      {/* Text content */}
      <span
        className={
          variant === "secondary" || variant === "tertiary"
            ? "text-[#65BCB6]"
            : "text-[rgba(255,255,255,1)]"
        }
      >
        {loading ? "در حال بارگذاری..." : children}
      </span>

      {/* Icon on the right for RTL (Persian) - shows last in RTL layout */}
      {!loading && IconComponent && iconPosition === "right" && (
        <IconComponent
          size={iconSize}
          className={getIconColor()}
          aria-hidden="true"
        />
      )}
    </button>
  );
}
