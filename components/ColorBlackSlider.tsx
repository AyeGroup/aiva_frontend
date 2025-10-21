"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";

interface ColorSliderProps {
  value: string;
  onChange?: (color: string) => void;
}

export const ColorBlackSlider: React.FC<ColorSliderProps> = ({
  value,
  onChange,
}) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState(0); // 0-100 for slider position
  const isDragging = useRef(false);

  useEffect(() => {
    if (
      value &&
      typeof value === "string" &&
      value.length === 7 &&
      value.startsWith("#")
    ) {
      const pos = hexToSliderPosition(value);
      setPosition(pos);
    }
  }, [value]);

  // Convert slider position (0-100) to color
  function positionToColor(pos: number): string {
    if (pos <= 10) {
      // Black to dark gray range (0-10)
      const intensity = Math.round((pos / 10) * 50); // 0 to 50
      const hex = intensity.toString(16).padStart(2, "0");
      return `#${hex}${hex}${hex}`;
    } else if (pos <= 20) {
      // Gray range (10-20)
      const intensity = Math.round(50 + ((pos - 10) / 10) * 155); // 50 to 205
      const hex = intensity.toString(16).padStart(2, "0");
      return `#${hex}${hex}${hex}`;
    } else {
      // Color spectrum (20-100)
      const hue = Math.round(((pos - 20) / 80) * 360);
      return hslToHex(hue, 100, 50);
    }
  }

  // Convert color to slider position (0-100)
  function hexToSliderPosition(hex: string): number {
    const clean = hex.replace("#", "");
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);

    // Check if it's a grayscale color
    if (r === g && g === b) {
      if (r <= 50) {
        // Black to dark gray range (0-10)
        return (r / 50) * 10;
      } else {
        // Gray range (10-20)
        return 10 + ((r - 50) / 155) * 10;
      }
    } else {
      // Color spectrum - convert to hue
      const hue = hexToHue(hex);
      return 20 + (hue / 360) * 80;
    }
  }

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

  const currentColor = positionToColor(position);

  const getSliderBackground = () => {
    return `
      linear-gradient(to right,
        #000000 0%, 
        #0a0a0a 10%,
        #323232 20%,
        #595959 30%,
        #7f7f7f 40%,
        #a5a5a5 50%,
        #cccccc 60%,
        #f2f2f2 70%,
        #ffffff 80%,
        #ff0000 85%,
        #ffff00 90%,
        #00ff00 95%,
        #00ffff 100%,
        #0000ff 105%,
        #ff00ff 110%,
        #ff0000 115%
      )
    `;
  };

  const handleMove = useCallback(
    (clientX: number) => {
      const rect = sliderRef.current?.getBoundingClientRect();
      if (!rect || !isDragging.current) return;

      const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
      const newPosition = Math.round((x / rect.width) * 100);

      setPosition(newPosition);

      const newHex = positionToColor(newPosition);
      if (newHex !== value) {
        onChange?.(newHex);
      }
    },
    [value, onChange]
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    handleMove(e.clientX);

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX);
    };
    const handleMouseUp = () => {
      isDragging.current = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const leftPosition = `calc(${(position / 100) * 100}% - 8px)`;

  return (
    <div className="w-full select-none">
      <div className="text-xs text-gray-500 mb-1 flex justify-between">
        <span>Black</span>
        <span>Gray</span>
        <span>Colors</span>
      </div>
      <div
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        className="relative h-6 rounded-full cursor-pointer border"
        style={{
          background: getSliderBackground(),
          backgroundSize: "100% 100%",
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
      <div className="text-xs text-gray-500 mt-1 text-center">
        {currentColor}
      </div>
    </div>
  );
};
