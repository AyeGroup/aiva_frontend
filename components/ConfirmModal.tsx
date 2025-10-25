"use client";
import React from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  type?: "danger" | "warning" | "info";
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message = "این عمل قابل بازگشت نیست",
  confirmText = "بله، حذف کن",
  cancelText = "لغو",
  type = "danger",
}) => {
  if (!isOpen) return null;

  const getIconColors = () => {
    switch (type) {
      case "danger":
        return {
          bg: "bg-red-100",
          icon: "text-red-600",
          button: "bg-red-500 hover:bg-red-600",
        };
      case "warning":
        return {
          bg: "bg-yellow-100",
          icon: "text-yellow-600",
          button: "bg-yellow-500 hover:bg-yellow-600",
        };
      case "info":
        return {
          bg: "bg-blue-100",
          icon: "text-blue-600",
          button: "bg-blue-500 hover:bg-blue-600",
        };
      default:
        return {
          bg: "bg-red-100",
          icon: "text-red-600",
          button: "bg-red-500 hover:bg-red-600",
        };
    }
  };

  const colors = getIconColors();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-md w-full mx-auto transform transition-all duration-200">
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-12 h-12 ${colors.bg} rounded-full flex items-center justify-center`}
          >
            <svg
              className={`w-6 h-6 ${colors.icon}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-grey-900 text-lg">{title}</h3>
            {message && <p className="text-grey-600 text-sm mt-1">{message}</p>}
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <button
            className="px-6 py-2.5 text-sm bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            onClick={onClose}
          >
            {cancelText}
          </button>
          <button
            className={`px-6 py-2.5 text-sm text-white rounded-lg transition-colors font-medium ${colors.button}`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
