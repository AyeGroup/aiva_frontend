"use client";

import React, { useState, useRef, useEffect } from "react";

interface ColorSliderProps {
  value: string;
  onChange?: (color: string) => void;
}

export const ColorSlider: React.FC<ColorSliderProps> = ({
  value = "",
  onChange,
}) => {
  const [hue, setHue] = useState(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  // 🎨 وقتی hue تغییر می‌کند، رنگ جدید به فرمت HEX تولید و ارسال شود
  useEffect(() => {
    const hex = hslToHex(hue, 100, 50);
    onChange?.(hex);
  }, [hue]);

  // ✅ وقتی prop `value` تغییر کرد (مثلاً با کلیک روی پالت)
  // hue جدید را از رنگ hex استخراج کن و اسلایدر را آپدیت کن
  useEffect(() => {
    if (value) {
      const h = hexToHue(value);
      setHue(h);
    }
    // console.log("value", value);
    // console.log("hue",hue)
    // console.log("value", value);
  }, [value]);

  const handleMove = (clientX: number) => {
    const rect = sliderRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    const newHue = Math.round((x / rect.width) * 360);
    setHue(newHue);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    handleMove(e.clientX);
    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const color = `hsl(${hue}, 100%, 50%)`;

  return (
    <div className="w-full select-none">
      <div
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        className="relative h-4 rounded-full cursor-pointer"
        style={{
          background:
            "linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red)",
        }}
      >
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white shadow-md"
          style={{
            left: `calc(${(hue / 360) * 100}% - 8px)`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
};

// 🎨 HSL → HEX
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

// 🎯 HEX → HUE
function hexToHue(hex: string): number {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16) / 255;
  const g = parseInt(clean.substring(2, 4), 16) / 255;
  const b = parseInt(clean.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let hue = 0;
  if (delta === 0) hue = 0;
  else if (max === r) hue = ((g - b) / delta) % 6;
  else if (max === g) hue = (b - r) / delta + 2;
  else hue = (r - g) / delta + 4;

  hue = Math.round(hue * 60);
  if (hue < 0) hue += 360;
  return hue;
}
