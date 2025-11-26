// components/FloatSideMenu.tsx
"use client";

import {
  Home,
  User,
  Settings,
  RocketIcon,
  DiamondIcon,
  StarIcon,
  CrownIcon,
} from "lucide-react";

export default function FloatSideMenu() {
  const menuItems = [
    {
      icon: <DiamondIcon size={24} />,
      label: "پایه",
      onClick: () => alert("Home clicked"),
    },
    {
      icon: <StarIcon size={24} />,
      label: "حرفه‌ای",
      onClick: () => alert("Profile clicked"),
    },
    {
      icon: <CrownIcon size={24} />,
      label: "پیشرفته",
      onClick: () => alert("Settings clicked"),
    },
    {
      icon: <RocketIcon size={24} />,
      label: "ویژه",
      onClick: () => alert("Settings clicked"),
    },
  ];

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50">
      <div className="flex flex-col gap-2 bg-white/40 backdrop-blur-md shadow-lg border-r border-gray-200 rounded-r-xl p-1">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={item.onClick}
            className="flex items-center gap-4 overflow-hidden w-10 hover:w-32 transition-all duration-500 ease-in-out rounded-r-lg px-2 py-2 text-white bg-primary hover:bg-secondary"
          >
            <div>{item.icon}</div>
            <div>{item.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
