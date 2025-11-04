import React from "react";

interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  title?: string;
  className?: string;
  activeLabel?: string;
  inactiveLabel?: string;
}

export function Switch({
  checked = false,
  onCheckedChange,
  disabled = false,
  title = "تغییر وضعیت",
  className = "",
  activeLabel = "فعال",
  inactiveLabel = "غیرفعال",
}: SwitchProps) {
  const handleToggle = () => {
    if (disabled) return;
    const newChecked = !checked;
    onCheckedChange?.(newChecked);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <div className={`flex items-center gap-2 ${disabled ? "opacity-60" : ""}`}>
      {/* دکمه سوییچ */}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        title={title}
        disabled={disabled}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className={`switch-root ${
          checked ? "switch-checked" : "switch-unchecked"
        } ${disabled ? "switch-disabled" : ""} ${className}`}
        data-name="Switch"
        tabIndex={disabled ? -1 : 0}
      >
        <div className="switch-inner">
          <div
            className={`switch-track ${
              checked ? "switch-track-checked" : "switch-track-unchecked"
            }`}
          >
            <div className="switch-halo" data-name="halo" />
            <div className="switch-nob" data-name="switch-nob/default" />
          </div>
        </div>
      </button>

      {/* متن وضعیت */}
      <span className="text-xs px-1 select-none">
        {checked ? activeLabel : inactiveLabel}
      </span>
    </div>
  );
}
