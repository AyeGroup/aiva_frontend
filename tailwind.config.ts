import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // همه صفحات داخل app/
    "./components/**/*.{js,ts,jsx,tsx}", // همه کامپوننت‌ها
    "./lib/**/*.{js,ts,jsx,tsx}", // اگر توابعی داری که استایل دارند
  ],
  theme: {
    extend: {
      backgroundImage: {
        "step2-gradient":
          "linear-gradient(180deg, rgba(227, 243, 240, 0.51) 0%, #FBF4F4 100%)",
        "step5-gradient":
          "linear-gradient(0deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), linear-gradient(180deg, rgba(227, 243, 240, 0.51) 0%, #FBF4F4 100%)",

        "step6-gradient":
          "linear-gradient(0deg, #FFFFFF, #FFFFFF), linear-gradient(180deg, rgba(227, 243, 240, 0.51) 0%, #FBF4F4 100%)",
      },
      boxShadow: {
        box1: "0px 4px 6px -4px #0000001A, 0px 10px 15px -3px #0000001A",
      },

      colors: {
        primary: "#65BCB6",
        secondary: "#FFA18E",
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
