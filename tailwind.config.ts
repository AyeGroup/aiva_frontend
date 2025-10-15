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
        accent: "#f59e0b",
        accentOrange: "#f59e0b",
        text: "#4b5563",
        // --brandSecondary
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"], // فونت پیش‌فرض
      },
    },
    fontSize: {
      h1: "var(--text-h1)",
      "h1-mobile": "var(--text-h1-mobile)",
      h2: "var(--text-h2)",
      h3: "var(--text-h3)",
      h4: "var(--text-h4)",
      "body-large": "var(--text-body-large)",
      "body-small": "var(--text-body-small)",
      caption: "var(--text-caption)",
      kpi: "var(--text-kpi)",
    },
    fontWeight: {
      display: "var(--font-weight-display)",
    },
    lineHeight: {
      h1: "var(--text-h1-lh)",
      "h1-mobile": "var(--text-h1-mobile-lh)",
      h2: "var(--text-h2-lh)",
      h3: "var(--text-h3-lh)",
      h4: "var(--text-h4-lh)",
      "body-large": "var(--text-body-large-lh)",
      "body-small": "var(--text-body-small-lh)",
      caption: "var(--text-caption-lh)",
      kpi: "var(--text-kpi-lh)",
    },
  },
  plugins: [],
};

export default config;
