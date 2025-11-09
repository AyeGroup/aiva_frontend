"use client";

import React from "react";

interface ThreeLevelSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export default function ThreeLevelSlider({
  value,
  onChange,
}: ThreeLevelSliderProps) {
  const levels = [
    { label: "کم", value: 5 },
    { label: "متوسط", value: 10 },
    { label: "زیاد", value: 15 },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    // نزدیک‌ترین مقدار به 5،10،15 انتخاب شود
    const closest = levels.reduce((prev, curr) =>
      Math.abs(curr.value - newValue) < Math.abs(prev.value - newValue)
        ? curr
        : prev
    );
    onChange(closest.value);
    console.log("k",closest.value)
  };

  const getGradient = () => {
    if (value <= 5) return "from-grey-400 to-grey-400";
    if (value === 10) return "from-grey-400 to-orange-400";
    return "from-orange-400 to-orange-400";
  };

  return (
    <div className="w-full px-2 py-4">
      {/* Slider */}
      <div className="relative w-full flex flex-col items-center">
        <input
          type="range"
          min={5}
          max={15}
          step={5}
          value={value}
          onChange={handleChange}
          className="w-full appearance-none h-1.5 rounded-full bg-gradient-to-r from-grey-300 to-orange-300 outline-none accent-orange-500"
          style={{
            background: `linear-gradient(to left, #FCA5A5 ${
              ((value - 5) / 10) * 100
            }%, #9CA3AF ${((value - 5) / 10) * 100}%)`,
          }}
        />

        {/* Labels */}
        <div className="flex justify-between w-full text-sm text-grey-700 mt-2 px-1">
          {levels.map((lvl) => (
            <span
              key={lvl.value}
              className={`${
                lvl.value === value ? "font-bold text-brand-primary" : ""
              }`}
            >
              {lvl.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
