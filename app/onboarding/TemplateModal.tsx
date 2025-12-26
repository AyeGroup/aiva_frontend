"use client";
import React from "react";

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
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-xl bg-white p-5 shadow-lg">
        <h3 className="mb-3 text-sm font-semibold text-gray-800">{title}</h3>

        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={6}
          className="w-full rounded-lg border border-gray-300 p-3 text-sm
            focus:outline-none focus:ring-2 focus:ring-brand-primary"
        />

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
