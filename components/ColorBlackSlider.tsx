import React, { useState, useEffect, useRef } from "react";

interface ColorSliderProps {
  value?: string; // Hex value, like "#ff0000"
  onChange?: (color: string) => void;
}

const ColorBlackSlider: React.FC<ColorSliderProps> = ({
  value = "#000000",
  onChange,
}) => {
  const [color, setColor] = useState(value);
  const [hue, setHue] = useState(hexToHue(value));
  const sliderRef = useRef<HTMLDivElement>(null);

  // وقتی value از بیرون تغییر کنه، رنگ و hue رو آپدیت می‌کنه
  useEffect(() => {
    setColor(value);
    setHue(hexToHue(value));
  }, [value]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(0, e.clientX - rect.left), rect.width);
    const newHue = Math.round((x / rect.width) * 360);
    const newColor = hueToHex(newHue);
    setHue(newHue);
    setColor(newColor);
    onChange?.(newColor);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div
        ref={sliderRef}
        onMouseDown={handleMove}
        onMouseMove={(e) => e.buttons === 1 && handleMove(e)}
        className="relative w-full h-6 rounded-md cursor-pointer"
        style={{
          background:
            "linear-gradient(to right, #000000, #808080, #ffffff, red, yellow, lime, cyan, blue, magenta, red)",
        }}
      >
        <div
          className="absolute top-1/2 w-3 h-3 rounded-full border border-white shadow -translate-y-1/2"
          style={{
            left: `${(hue / 360) * 100}%`,
            background: color,
          }}
        ></div>
      </div>
      <div className="text-sm text-gray-300">
        {color.toUpperCase()} (Hue: {Math.round(hue)})
      </div>
    </div>
  );
};

export default ColorBlackSlider;

function hueToHex(hue: number): string {
  const c = 1;
  const x = 1 - Math.abs(((hue / 60) % 2) - 1);
  let [r, g, b] = [0, 0, 0];

  if (hue < 60) [r, g, b] = [c, x, 0];
  else if (hue < 120) [r, g, b] = [x, c, 0];
  else if (hue < 180) [r, g, b] = [0, c, x];
  else if (hue < 240) [r, g, b] = [0, x, c];
  else if (hue < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  // در بخش خاکستری، بر اساس hue رنگ بین سیاه و سفید می‌سازیم
  if (hue <= 60) {
    const gray = (hue / 60) * 255;
    return rgbToHex(gray, gray, gray);
  }

  return rgbToHex(r * 255, g * 255, b * 255);
}

function hexToHue(hex: string): number {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16) / 255;
  const g = parseInt(clean.substring(2, 4), 16) / 255;
  const b = parseInt(clean.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  if (delta === 0) {
    // رنگ‌های سیاه، سفید یا خاکستری
    const grayLevel = r * 255;
    return (grayLevel / 255) * 60; // نگاشت خاکستری‌ها بین 0 تا 60
  }

  let hue = 0;
  if (max === r) hue = ((g - b) / delta) % 6;
  else if (max === g) hue = (b - r) / delta + 2;
  else hue = (r - g) / delta + 4;

  hue *= 60;
  if (hue < 0) hue += 360;
  return hue;
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((v) => {
        const h = Math.round(v).toString(16);
        return h.length === 1 ? "0" + h : h;
      })
      .join("")
  );
}
