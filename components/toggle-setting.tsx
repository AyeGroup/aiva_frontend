"use client";

import React from "react";

interface ToggleSettingProps {
  label: string;
  description?: string;
  disabled?: boolean;
  value: boolean;
  onToggle: () => void;
}

export default function ToggleSetting({
  label,
  description,
  disabled = false,
  value,
  onToggle,
}: ToggleSettingProps) {
  return (
    <div className={`flex items-center justify-between border-grey-200 `}>
      <div className="flex-1 text-right">
        <h4 className="text-grey-900 mb-1">{label}</h4>
        {description && (
          <p className="text-grey-600 text-body-small">{description}</p>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={value}
        aria-label={label}
        onClick={() => {
          if (!disabled) onToggle();
        }}
        className={`relative w-12 h-6 rounded-full p-0.5 overflow-hidden transition-colors duration-200
          ${
            disabled
              ? "bg-grey-200 cursor-not-allowed"
              : value
              ? "bg-brand-primary shadow-inner"
              : "bg-grey-300 hover:bg-grey-400"
          }
        `}
        disabled={disabled}
      >
        <div
          className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
            value ? "-translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
