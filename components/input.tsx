"use client";

import { forwardRef, useEffect, useState } from "react";
import { persianToEnglish, englishToPersian } from "@/utils/number-utils";
import "@/styles/components.css";

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: "default" | "search" | "bordered";
  inputSize?: "small" | "medium" | "large";
  error?: boolean;
  helperText?: string;
  label?: string;
  required?: boolean;
  numeric?: boolean;
  allowDecimal?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  variant = "default",
  inputSize = "medium",
  error = false,
  helperText,
  label,
  required = false,
  numeric = false,
  allowDecimal = false,
  className = "",
  value,
  onChange,
  ...props
}, ref) => {
  const [displayValue, setDisplayValue] = useState("");

  useEffect(() => {
    if (numeric && value !== undefined) {
      setDisplayValue(englishToPersian(String(value)));
    }
  }, [numeric, value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;

    if (numeric) {
      let englishValue = persianToEnglish(inputVal);
      const allowedChars = allowDecimal ? /[0-9.]/g : /[0-9]/g;
      englishValue = englishValue.match(allowedChars)?.join("") || "";

      if (allowDecimal) {
        const parts = englishValue.split(".");
        if (parts.length > 2) englishValue = parts[0] + "." + parts.slice(1).join("");
      }

      const persianVal = englishToPersian(englishValue);
      setDisplayValue(persianVal);

      const modifiedEvent = {
        ...e,
        target: { ...e.target, value: englishValue },
      } as React.ChangeEvent<HTMLInputElement>;

      onChange?.(modifiedEvent);
    } else {
      onChange?.(e);
    }
  };

  const inputValue = numeric ? displayValue : value ?? "";

  const baseClasses = "input-base";
  const variantClasses = `input-${variant}`;
  const sizeClasses = `input-${inputSize}`;
  const errorClasses = error ? "input-error" : "";

  return (
    <div className="input-container">
      {label && (
        <label className="input-label">
          {label} {required && <span className="input-required">*</span>}
        </label>
      )}

      <input
        ref={ref}
        className={`${baseClasses} ${variantClasses} ${sizeClasses} ${errorClasses} ${className}`}
        value={inputValue}
        onChange={handleChange}
        {...props}
      />

      {helperText && (
        <p className={`input-helper ${error ? "input-helper-error" : ""}`}>
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";
