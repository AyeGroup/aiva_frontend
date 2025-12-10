"use client";
import React from "react";

export default function UploadProgressModal({
  show,
  progress,
}: {
  show: boolean;
  progress: number;
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-2xl shadow-xl px-6 py-5 w-80 flex flex-col gap-4">
        <p className="text-gray-700 font-medium text-center">
          در حال آپلود فایل...
        </p>

        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-gray-600 text-center text-sm">{progress}%</p>
      </div>
    </div>
  );
}
