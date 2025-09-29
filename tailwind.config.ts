import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // همه صفحات داخل app/
    "./components/**/*.{js,ts,jsx,tsx}", // همه کامپوننت‌ها
    "./lib/**/*.{js,ts,jsx,tsx}", // اگر توابعی داری که استایل دارند
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb", // رنگ اصلی (مثال: آبی)
        secondary: "#64748b", // رنگ دوم (مثال: خاکستری)
        accent: "#f59e0b", // رنگ تاکیدی (مثال: زرد-نارنجی)
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"], // فونت پیش‌فرض
      },
    },
  },
  plugins: [],
};

export default config;
