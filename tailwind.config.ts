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
        primary: "##65BCB6",
        secondary: "##FFA18E",
        text: "#4b5563",
        accent: "#f59e0b",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"], // فونت پیش‌فرض
      },
    },
  },
  plugins: [],
};

export default config;
