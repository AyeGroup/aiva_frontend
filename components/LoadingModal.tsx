"use client";
import React from "react";

export default function LoadingModal({
  show,
  message,
}: {
  show: boolean;
  message?: string;
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-9999">
      <div className="bg-white rounded-2xl shadow-2xl px-8 py-6 flex flex-col items-center gap-4 w-[300px]">
        {/* انیمیشن چرخان */}
        {/* <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div> */}
        <div className="flex items-center text-white gap-2">
          <span className="dot delay-0" />
          <span className="dot delay-1" />
          <span className="dot delay-2" />
        </div>
        <p className="text-center text-gray-700 text-sm leading-6">
          {message || "در حال پردازش... لطفاً منتظر بمانید"}
        </p>
      </div>
    </div>
  );
}
