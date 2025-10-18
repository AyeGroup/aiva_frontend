import { useId } from "react";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  description?: string;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "success" | "warning" | "danger";
}

export function Toggle({
  checked,
  onChange,
  label,
  disabled = false,
  description,
  size = "md",
  color = "primary",
}: ToggleProps) {
  const id = useId();

  const sizeClasses = {
    sm: { switch: "w-8 h-5", thumb: "w-3 h-3", translate: "translate-x-3" },
    md: { switch: "w-11 h-6", thumb: "w-4 h-4", translate: "translate-x-5" },
    lg: { switch: "w-14 h-7", thumb: "w-5 h-5", translate: "translate-x-7" },
  };

  const colorClasses = {
    primary: checked ? "bg-brand-primary" : "bg-grey-300",
    secondary: checked ? "bg-brand-secondary" : "bg-grey-300",
    success: checked ? "bg-success" : "bg-grey-300",
    warning: checked ? "bg-warning" : "bg-grey-300",
    danger: checked ? "bg-danger" : "bg-grey-300",
  };

  const focusRingColors = {
    primary: "focus:ring-brand-primary/20",
    secondary: "focus:ring-brand-secondary/20",
    success: "focus:ring-success/20",
    warning: "focus:ring-warning/20",
    danger: "focus:ring-danger/20",
  };

  const handleToggle = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <div className="flex items-start gap-3">
      <div className="flex items-center">
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          aria-labelledby={label ? `${id}-label` : undefined}
          aria-describedby={description ? `${id}-description` : undefined}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={`
            relative inline-flex items-center rounded-full
            focus:outline-none focus:ring-4
            ${sizeClasses[size].switch}
            ${colorClasses[color]}
            ${focusRingColors[color]}
            ${
              disabled
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:opacity-90"
            }
          `}
          title={label || (checked ? "خاموش کردن" : "روشن کردن")}
        >
          {/* Thumb */}
          <span
            className={`
    inline-block bg-white rounded-full shadow-sm
    transform transition-transform duration-200 ease-in-out
    ${sizeClasses[size].thumb}
    ${checked ? sizeClasses[size].translate : "translate-x-1"}
  `}
            aria-hidden="true"
          />
        </button>
      </div>

      {(label || description) && (
        <div className="flex-1 min-w-0">
          {label && (
            <label
              id={`${id}-label`}
              className={`
                block cursor-pointer text-grey-900
                ${disabled ? "opacity-50 cursor-not-allowed" : ""}
              `}
              onClick={handleToggle}
            >
              {label}
            </label>
          )}

          {description && (
            <p
              id={`${id}-description`}
              className={`
                text-body-small text-grey-600 mt-1
                ${disabled ? "opacity-50" : ""}
              `}
            >
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
