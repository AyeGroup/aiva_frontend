import React, { useState, useEffect } from "react";

function clamp(v: number, a = 0, b = 1) {
  return Math.min(b, Math.max(a, v));
}
function hexToRgb(hex: string) {
  hex = hex.replace(/^#/, "").trim();
  if (hex.length === 3)
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  if (hex.length !== 6) return null;
  const num = parseInt(hex, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}
function rgbToHex({ r, g, b }: { r: number; g: number; b: number }) {
  const toHex = (n: number) =>
    clamp(Math.round(n), 0, 255).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}
function rgbToHsv(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h /= 6;
  }
  const s = max === 0 ? 0 : d / max;
  const v = max;
  return { h: h * 360, s, v };
}
function hsvToRgb(h: number, s: number, v: number) {
  h = ((h % 360) + 360) % 360;
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let r = 0,
    g = 0,
    b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

export interface ColorPickerProps {
  value?: string;
  onChange?: (hex: string) => void;
  showAlpha?: boolean;
  presets?: string[];
  className?: string;
}

export default function ColorPicker({
  value = "#3B82F6",
  onChange,
  showAlpha = false,
  presets = [],
  className,
}: ColorPickerProps) {
  const parseHex = (v: string) => {
    v = v || "#000000";
    const hasAlpha = v.length === 9 || v.length === 7;
    const hex = (v.startsWith("#") ? v : `#${v}`).slice(0, 7);
    const rgb = hexToRgb(hex) || { r: 0, g: 0, b: 0 };
    const a = hasAlpha
      ? Math.round((parseInt(v.slice(7), 16) / 255) * 100) / 100
      : 1;
    const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
    return { hex, rgb, hsv, a };
  };

  const initial = parseHex(value);

  const [hue, setHue] = useState(initial.hsv.h);
  const [sat, setSat] = useState(initial.hsv.s);
  const [val, setVal] = useState(initial.hsv.v);
  const [alpha, setAlpha] = useState<number>(initial.a);
  const [hexInput, setHexInput] = useState<string>(initial.hex);

  useEffect(() => {
    const p = parseHex(value);
    setHue(p.hsv.h);
    setSat(p.hsv.s);
    setVal(p.hsv.v);
    setAlpha(p.a);
    setHexInput(p.hex);
  }, [value]);

  function commitChange(h = hue, s = sat, v = val, a = alpha) {
    const rgb = hsvToRgb(h, s, v);
    let out = rgbToHex(rgb);
    if (showAlpha) {
      const alphaByte = Math.round(clamp(a, 0, 1) * 255);
      out = `${out}${alphaByte.toString(16).padStart(2, "0").toUpperCase()}`;
    }
    setHexInput(out.slice(0, 7));
    if (onChange) onChange(out);
  }

  const previewRgb = hsvToRgb(hue, sat, val);
  const previewHex = rgbToHex(previewRgb);
  const previewCss = showAlpha
    ? `rgba(${previewRgb.r},${previewRgb.g},${previewRgb.b},${alpha})`
    : previewHex;

  function handleSaturationPointer(e: React.PointerEvent) {
    const el = e.currentTarget as HTMLDivElement;
    el.setPointerCapture(e.pointerId);
    const onMove = (ev: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = clamp((ev.clientX - rect.left) / rect.width, 0, 1);
      const y = clamp((ev.clientY - rect.top) / rect.height, 0, 1);
      setSat(x);
      setVal(1 - y);
    };
    const onUp = () => {
      el.releasePointerCapture(e.pointerId);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      commitChange();
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    const rect = el.getBoundingClientRect();
    const xInit = clamp((e.clientX - rect.left) / rect.width, 0, 1);
    const yInit = clamp((e.clientY - rect.top) / rect.height, 0, 1);
    setSat(xInit);
    setVal(1 - yInit);
  }

  function handleHueChange(e: React.ChangeEvent<HTMLInputElement>) {
    const h = Number(e.target.value);
    setHue(h);
    commitChange(h, sat, val, alpha);
  }
  function handleAlphaChange(e: React.ChangeEvent<HTMLInputElement>) {
    const a = Number(e.target.value);
    setAlpha(a);
    commitChange(hue, sat, val, a);
  }
  function handleHexInput(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setHexInput(v);
    const parsed = hexToRgb(v.startsWith("#") ? v : `#${v}`);
    if (parsed) {
      const hsv = rgbToHsv(parsed.r, parsed.g, parsed.b);
      setHue(hsv.h);
      setSat(hsv.s);
      setVal(hsv.v);
      commitChange(hsv.h, hsv.s, hsv.v, alpha);
    }
  }

  return (
    <div
      className={`w-[320px] p-3 rounded-2xl bg-white shadow-2xl text-sm ${
        className || ""
      }`}
    >
      {/* <div className="flex items-center gap-3 mb-3">
        <div
          className="w-12 h-12 rounded-md border relative"
          style={{
            background: `linear-gradient(45deg, #fff 0%, rgba(0,0,0,0) 100%)`,
          }}
        >
          <div
            className="absolute inset-0 rounded-md"
            style={{ background: previewCss }}
            aria-hidden
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <input
              aria-label="Hex color"
              value={hexInput}
              onChange={handleHexInput}
              className="w-full rounded px-2 py-1 border"
            />
            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText(
                  showAlpha
                    ? `${previewHex}${Math.round(alpha * 255)
                        .toString(16)
                        .padStart(2, "0")
                        .toUpperCase()}`
                    : previewHex
                );
              }}
              className="px-2 py-1 border rounded"
            >
              Copy
            </button> 
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Preview:{" "}
            {showAlpha
              ? `${previewHex}${Math.round(alpha * 255)
                  .toString(16)
                  .padStart(2, "0")
                  .toUpperCase()}`
              : previewHex}
          </div>
        </div>
      </div> */}

      <div className="mb-3">
        {presets.length > 0 && (
          <div className="mb-2">
            {/* <div className="text-xs text-gray-600 mb-1">Presets</div> */}
            <div className="flex gap-2 flex-wrap">
              {presets.map((c, i) => (
                <div
                  key={c + i}
                  // onClick={() => setColor(c)} // 👈 با کلیک، رنگ انتخابی تنظیم می‌شود
                  onClick={() => {
                    const parsed = hexToRgb(c);
                    if (parsed) {
                      const hsv = rgbToHsv(parsed.r, parsed.g, parsed.b);
                      setHue(hsv.h);
                      setSat(hsv.s);
                      setVal(hsv.v);
                      setAlpha(1);
                      commitChange(hsv.h, hsv.s, hsv.v, 1);
                    }
                  }}
                  className={`w-8 h-8 rounded-full border cursor-pointer transition-transform 
            ${value === c ? "scale-110 border-black" : "hover:scale-105"}`}
                  aria-label={`Preset ${c}`}
                  style={{ background: c }}
                />
              ))}
            </div>
          </div>
        )}
        <div
          role="application"
          aria-label="saturation value"
          onPointerDown={handleSaturationPointer}
          className="relative h-36 rounded-md overflow-hidden border"
          style={{
            background: `linear-gradient(90deg, #fff 0%, hsl(${hue}deg 100% 50%) 100%)`,
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
            }}
          />
          <div
            className="w-4 h-4 rounded-full ring-2 ring-white shadow absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${sat * 100}%`,
              top: `${(1 - val) * 100}%`,
              background: previewHex,
            }}
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="text-xs text-gray-600">Hue</label>
        <input
          aria-label="hue"
          type="range"
          min={0}
          max={360}
          value={Math.round(hue)}
          onChange={handleHueChange}
          className="w-full h-2 appearance-none rounded"
          style={{
            background: `linear-gradient(90deg, red 0%, yellow 17%, lime 33%, cyan 50%, blue 67%, magenta 83%, red 100%)`,
          }}
        />
      </div>

      {showAlpha && (
        <div className="mb-3">
          <label className="text-xs text-gray-600">Alpha</label>
          <input
            aria-label="alpha"
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={alpha}
            onChange={handleAlphaChange}
            className="w-full h-2"
          />
        </div>
      )}
    </div>
  );
}
