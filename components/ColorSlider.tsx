"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";

interface ColorSliderProps {
  value: string; // HEX string (e.g., "#FF0000")
  onChange?: (color: string) => void;
}

export const ColorSlider: React.FC<ColorSliderProps> = ({
  value,
  onChange,
}) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  // مقدار hue را همیشه بر اساس value ورودی سینک می‌کنیم
  const [hue, setHue] = useState(0);
  const isDragging = useRef(false);

  // --- تبدیل‌ها (این توابع را داخل کامپوننت قرار می‌دهیم یا مطمئن می‌شویم در دسترس هستند) ---

  // 🎨 HSL → HEX (توابع شما در اینجا قرار می‌گیرند یا به صورت جهانی در دسترس باشند)
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
  // ---------------------------------------------------------------------

  // 1. سینک کردن وضعیت داخلی (hue) با وضعیت خارجی (value)
  // این تنها راهی است که hue می‌تواند تغییر کند، مگر اینکه کاربر اسلایدر را بکشد.
  useEffect(() => {
    if (
      value &&
      typeof value === "string" &&
      value.length === 7 &&
      value.startsWith("#")
    ) {
      const h = hexToHue(value);
      // فقط در صورتی مقدار hue را تنظیم کن که تفاوت قابل توجهی داشته باشد
      // این از تنظیمات مکرر در اثر محاسبات اعشاری جلوگیری می‌کند.
      if (Math.abs(h - hue) > 1 || Math.round(h) !== Math.round(hue)) {
        setHue(h);
      }
    }
  }, [value]); // وابستگی فقط به value خارجی

  // محاسبه رنگ فعلی (فقط برای نمایش)
  const currentColor = `hsl(${hue}, 100%, 50%)`;

  // 2. مدیریت حرکت اسلایدر (هندل کردن تغییرات توسط کاربر)
  const handleMove = useCallback(
    (clientX: number) => {
      const rect = sliderRef.current?.getBoundingClientRect();
      if (!rect || !isDragging.current) return;

      const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
      const newHue = Math.round((x / rect.width) * 360);

      // به محض دریافت Hue جدید از کاربر، آن را در وضعیت داخلی قرار می‌دهیم.
      setHue(newHue);

      // بلافاصله فراخوانی onChange برای اطلاع دادن به والد (این کار باعث حلقه نمی‌شود زیرا ما تغییر وضعیت داخلی را مدیریت می‌کنیم)
      const newHex = hslToHex(newHue, 100, 50);
      // بررسی می‌کنیم که آیا رنگ جدید با رنگی که در حال حاضر در والد تنظیم شده است، متفاوت است یا خیر.
      if (newHex !== value) {
        onChange?.(newHex);
      }
    },
    [value, onChange]
  ); // وابستگی به value برای جلوگیری از ارسال مقدار قدیمی

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

  // محاسبه موقعیت نشانگر
  const leftPosition = `calc(${(hue / 360) * 100}% - 8px)`;

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

// "use client";

// import React, { useState, useRef, useEffect } from "react";

// interface ColorSliderProps {
//   value: string;
//   onChange?: (color: string) => void;
// }

// export const ColorSlider: React.FC<ColorSliderProps> = ({
//   value ,
//   onChange,
// }) => {
//   const [hue, setHue] = useState(0);
//   const sliderRef = useRef<HTMLDivElement | null>(null);

// useEffect(() => {
//   const hex = hslToHex(hue, 100, 50);
//    if (hex !== value) {
//     onChange?.(hex);
//   }
// }, [hue]);

// useEffect(() => {
//   if (value) {
//     const h = hexToHue(value);
//     if (Math.round(h) !== Math.round(hue)) {
//      setHue(h);
//    }

//   }
// }, [value]);

//   const handleMove = (clientX: number) => {
//     const rect = sliderRef.current?.getBoundingClientRect();
//     if (!rect) return;

//     const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
//     const newHue = Math.round((x / rect.width) * 360);
//     setHue(newHue);
//   };

//   const handleMouseDown = (e: React.MouseEvent) => {
//     handleMove(e.clientX);
//     const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX);
//     const handleMouseUp = () => {
//       document.removeEventListener("mousemove", handleMouseMove);
//       document.removeEventListener("mouseup", handleMouseUp);
//     };
//     document.addEventListener("mousemove", handleMouseMove);
//     document.addEventListener("mouseup", handleMouseUp);
//   };

//   const color = `hsl(${hue}, 100%, 50%)`;

//   return (
//     <div className="w-full select-none">
//       <div
//         ref={sliderRef}
//         onMouseDown={handleMouseDown}
//         className="relative h-4 rounded-full cursor-pointer"
//         style={{
//           background:
//             "linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red)",
//         }}
//       >
//         <div
//           className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white shadow-md"
//           style={{
//             left: `calc(${(hue / 360) * 100}% - 8px)`,
//             backgroundColor: color,
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// // 🎨 HSL → HEX
// function hslToHex(h: number, s: number, l: number): string {
//   s /= 100;
//   l /= 100;
//   const k = (n: number) => (n + h / 30) % 12;
//   const a = s * Math.min(l, 1 - l);
//   const f = (n: number) =>
//     l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
//   const toHex = (x: number) =>
//     Math.round(x * 255)
//       .toString(16)
//       .padStart(2, "0");
//   return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
// }

// // 🎯 HEX → HUE
// function hexToHue(hex: string): number {
//   const clean = hex.replace("#", "");
//   const r = parseInt(clean.substring(0, 2), 16) / 255;
//   const g = parseInt(clean.substring(2, 4), 16) / 255;
//   const b = parseInt(clean.substring(4, 6), 16) / 255;

//   const max = Math.max(r, g, b);
//   const min = Math.min(r, g, b);
//   const delta = max - min;

//   let hue = 0;
//   if (delta === 0) hue = 0;
//   else if (max === r) hue = ((g - b) / delta) % 6;
//   else if (max === g) hue = (b - r) / delta + 2;
//   else hue = (r - g) / delta + 4;

//   hue = Math.round(hue * 60);
//   if (hue < 0) hue += 360;
//   return hue;
// }
