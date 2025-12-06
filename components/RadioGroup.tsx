import React from "react";

type Option = {
  label: string;
  value: number;
};

interface RadioGroupProps {
  value: number;
  onChange: (value: number) => void;
  options: Option[];
  name: string;
}

export default function RadioGroup({
  value,
  onChange,
  options,
  name,
}: RadioGroupProps) {
  return (
    <div className="flex items-center gap-6">
      {options.map((opt) => (
        <label
          key={opt.value}
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className="peer absolute opacity-0 w-0 h-0"
          />

          <span
            className="w-4 h-4 rounded-full border border-gray-400
                       peer-checked:border-primary peer-checked:bg-primary
                       transition"
          ></span>

          <span className="text-gray-700 peer-checked:text-primary transition">
            {opt.label}
          </span>
        </label>
      ))}
    </div>
  );
}
