"use client";
import React, { useRef } from "react";

interface TemplateModalProps {
  open: boolean;
  title: string;
  value: string;
  onChange: (value: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
}

export function TemplateModal({
  open,
  title,
  value,
  onChange,
  onCancel,
  onConfirm,
}: TemplateModalProps) {

  const highlightRef = useRef<HTMLDivElement>(null);

  const highlightText = (text: string) => {
    return text.replace(
      /\[([^\]]+)\]/g,
      `<span class="text-secondary font-medium">[$1]</span>`
    );
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-xl bg-white p-5 shadow-lg">
        <h3 className="mb-3 text-sm font-semibold text-gray-800">{title}</h3>

        {/* WRAPPER */}
        <div className="relative w-full h-40 overflow-hidden rounded-lg">
          {/* Highlight */}
          <div
            ref={highlightRef}
            className="pointer-events-none absolute inset-0 overflow-hidden whitespace-pre-wrap break-words p-3 text-sm leading-6"
            dangerouslySetInnerHTML={{
              __html: highlightText(value || ""),
            }}
          />

          {/* Textarea */}
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onScroll={(e) => {
              if (highlightRef.current) {
                highlightRef.current.scrollTop = e.currentTarget.scrollTop;
              }
            }}
            className="relative h-full w-full resize-none overflow-auto rounded-lg border border-gray-300 bg-transparent
              p-3 text-sm leading-6 text-transparent caret-black
              focus:outline-none focus:ring-2 focus:ring-brand-primary
              scrollbar-hide"
          />
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button
            className="rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
            onClick={onCancel}
          >
            انصراف
          </button>

          <button
            className="rounded-lg bg-brand-primary px-4 py-2 text-sm text-white hover:opacity-90"
            onClick={onConfirm}
          >
            افزودن به متن
          </button>
        </div>
      </div>
    </div>
  );
}
