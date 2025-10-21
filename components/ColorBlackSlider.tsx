"use client";

import React, { useState, useRef, useCallback } from "react";

interface ColorSliderProps {
  value: string;
  onChange?: (color: string) => void;
}

export const ColorBlackSlider: React.FC<ColorSliderProps> = ({
  value,
  onChange,
}) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState(0);
  const isDragging = useRef(false);

  // 🎨 تبدیل HSL → HEX
  function hslToHex(h: number, s: number, l: number): string {
    s /= 100;
    l /= 100;
    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    const toHex = (x: number) =>
      Math.round(x * 255)
        .toString(16)
        .padStart(2, "0");
    return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
  }

  // 🎯 HEX → RGB
  function hexToRgb(hex: string) {
    const clean = hex.replace("#", "");
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    return { r, g, b };
  }

  // 🎯 RGB → Lightness & Saturation check
  function isGray(r: number, g: number, b: number) {
    return Math.abs(r - g) < 10 && Math.abs(g - b) < 10 && Math.abs(r - b) < 10;
  }

  // 🎨 مقدار رنگ جاری بر اساس موقعیت (۰ تا ۱۰۰٪)
  const getColorByPosition = (pos: number): string => {
    if (pos < 10) {
      // 0–10% → از سیاه تا طوسی
      const gray = Math.round((pos / 10) * 128);
      return `rgb(${gray}, ${gray}, ${gray})`;
    } else if (pos < 20) {
      // 10–20% → از طوسی تا سفید
      const gray = Math.round(128 + ((pos - 10) / 10) * 127);
      return `rgb(${gray}, ${gray}, ${gray})`;
    } else {
      // 20–100% → رنگی‌ها (Hue از 0 تا 360)
      const hue = ((pos - 20) / 80) * 360;
      return `hsl(${hue}, 100%, 50%)`;
    }
  };

  const handleMove = useCallback(
    (clientX: number) => {
      const rect = sliderRef.current?.getBoundingClientRect();
      if (!rect || !isDragging.current) return;

      const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
      const newPos = (x / rect.width) * 100;
      setPosition(newPos);

      const color = getColorByPosition(newPos);
      onChange?.(rgbToHex(color));
    },
    [onChange]
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    handleMove(e.clientX);

    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const handleMouseUp = () => {
      isDragging.current = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // 🎨 کمک: RGB string → HEX
  function rgbToHex(rgb: string): string {
    const match = rgb.match(/\d+/g);
    if (!match) return "#000000";
    const [r, g, b] = match.map((v) => parseInt(v));
    return (
      "#" +
      [r, g, b]
        .map((x) => x.toString(16).padStart(2, "0"))
        .join("")
        .toUpperCase()
    );
  }

  // محاسبه رنگ فعلی
  const currentColor = getColorByPosition(position);

  // 📏 موقعیت نشانگر
  const leftPosition = `calc(${position}% - 8px)`;

  return (
    <div className="w-full select-none">
      <div
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        className="relative h-4 rounded-full cursor-pointer"
        style={{
          background:
            "linear-gradient(to right, black, gray, white, red, yellow, lime, cyan, blue, magenta, red, black)",
        }}
      >
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white shadow-md transition-all duration-75 ease-linear"
          style={{
            left: leftPosition,
            backgroundColor: currentColor,
          }}
        />
      </div>
    </div>
  );
};
