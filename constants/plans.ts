export enum TRANSACTION_TYPE {
  INCREASE_WALLET = "increase_wallet", // User wallet charge (payment gateway)
  INCREASE_BALANCE = "increase_balance", // Chatbot balance increase
  BUY_SUBSCRIPTION = "buy_subscription",
  MESSAGE_COST = "message_cost",
}

export const PLAN_TYPES: Record<number, string> = {
  0: "رایگان",
  1: "پایه",
  2: "حرفه‌ای",
  3: "پیشرفته",
  4: "سازمانی",
};

export const PLAN_TYPES_CODE: Record<string, number> = {
  FREE: 0,
  BASIC: 1,
  MEDIUM: 2,
  ADVANCE: 3,
  ENTERPRISE: 4,
};

export const PLAN_TYPES_NAME: Record<string, string> = {
  FREE: "رایگان",
  BASIC: "پایه",
  MEDIUM: "حرفه‌ای",
  ADVANCE: "پیشرفته",
  ENTERPRISE: "سازمانی",
};

export const PLAN_COLORS: Record<string, string> = {
  FREE: "#9ca3af",
  BASIC: "#60a5fa",
  MEDIUM: "#34d399",
  ADVANCE: "#f59e0b",
  ENTERPRISE: "#8b5cf6",
};

export const SUBSCRIPTION_TYPES: Record<string, string> = {
  monthly: "ماهانه",
  yearly: "سالانه",
};
// const plans: Plan[] = [
//   {
//     id: "0",

//     name: "رایگان",
//     price: "۰",
//     description: "برای شروع و آزمایش",
//     color: "#9B59B6",
//     features: [
//       "تا ۱۰۰ پیام در ماه",
//       "یک چت‌بات",
//       "پشتیبانی ایمیلی",
//       "گزارش‌های پایه",
//     ],
//   },
//   {
//     id: "1",
//     name: "استارتر",
//     price: billingPeriod === "monthly" ? "۲۹۹,۰۰۰" : "۲,۸۷۰,۰۰۰",
//     priceMonthly: billingPeriod === "yearly" ? "۲۳۹,۰۰۰" : undefined,
//     description: "برای کسب‌وکارهای کوچک",
//     color: "#3498DB",
//     features: [
//       "تا ۵,۰۰۰ پیام در ماه",
//       "تا ۳ چت‌بات",
//       "پشتیبانی ایمیلی و چت",
//       "گزارش‌های پیشرفته",
//       "قابلیت سفارشی‌سازی ظاهر",
//       "یکپارچگی با ابزارهای محبوب",
//     ],
//   },
//   {
//     id: "2",
//     name: "حرفه‌ای",
//     price: billingPeriod === "monthly" ? "۷۹۹,۰۰۰" : "۷,۶۷۰,۰۰۰",
//     priceMonthly: billingPeriod === "yearly" ? "۶۳۹,۰۰۰" : undefined,
//     description: "برای کسب‌وکارهای در حال رشد",
//     color: "#65bcb6",
//     recommended: true,
//     current: true,
//     features: [
//       "تا ۲۰,۰۰۰ پیام در ماه",
//       "تا ۱۰ چت‌بات",
//       "پشتیبانی ۲۴/۷",
//       "گزارش‌های تحلیلی پیشرفته",
//       "سفارشی‌سازی کامل",
//       "API دسترسی",
//       "آموزش هوش مصنوعی اختصاصی",
//       "ادغام با CRM",
//     ],
//   },
//   {
//     id: "3",
//     name: "سازمانی",
//     price: "تماس بگیرید",
//     description: "برای سازمان‌های بزرگ",
//     color: "#FFA18E",
//     features: [
//       "پیام نامحدود",
//       "چت‌بات نامحدود",
//       "مدیر اختصاصی",
//       "پشتیبانی اولویت‌دار",
//       "سفارشی‌سازی کامل",
//       "قرارداد SLA",
//       "آموزش تیم",
//       "استقرار اختصاصی",
//     ],
//   },
// ];
