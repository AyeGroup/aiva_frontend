import { Rocket, Crown, Star, Gift, Users } from "lucide-react";

export enum TRANSACTION_TYPE {
  INCREASE_WALLET = "increase_wallet",
  INCREASE_BALANCE = "increase_balance",
  BUY_SUBSCRIPTION = "buy_subscription",
  MESSAGE_COST = "message_cost",
}

export enum PAYMENT_PURPOSE {
  BALANCE_INCREASE = "balance_increase",
  SUBSCRIPTION_PURCHASE = "subscription_purchase",
  WALLET_CHARGE = "wallet_charge",
}

export enum TRANSACTION_TITLE {
  increase_wallet = "افزایش موجودی کیف پول",
  decrease_wallet="خرید از کیف پول",
  increase_balance = "افزایش اعتبار",
  buy_subscription = "خرید پلن",
  message_cost = "هزینه پیام",
}

export const getTransactionTitle = (type: keyof typeof TRANSACTION_TITLE) => {
  return TRANSACTION_TITLE[type] || "";
};

export type PlanCode = "FREE" | "BASIC" | "MEDIUM" | "ADVANCE" | "ENTERPRISE";

interface PlanInfo {
  code: PlanCode;
  id: number;
  faName: string;
}

export const PLANS: PlanInfo[] = [
  { code: "FREE", id: 0, faName: "آغازین" },
  { code: "BASIC", id: 1, faName: "پایه" },
  { code: "MEDIUM", id: 2, faName: "حرفه‌ای" },
  { code: "ADVANCE", id: 3, faName: "پیشرفته" },
  { code: "ENTERPRISE", id: 4, faName: "ویژه" },
];

export const PLAN_TYPES: Record<number, string> = Object.fromEntries(
  PLANS.map((p) => [p.id, p.faName])
);

export const PLAN_TYPES_CODE: Record<PlanCode, number> = Object.fromEntries(
  PLANS.map((p) => [p.code, p.id])
) as Record<PlanCode, number>;

export const PLAN_TYPES_NAME: Record<PlanCode, string> = Object.fromEntries(
  PLANS.map((p) => [p.code, p.faName])
) as Record<PlanCode, string>;

export function getFaNameByCode(
  code: string
): (typeof PLANS)[number]["faName"] | undefined {
  const plan = PLANS.find((p) => p.code === code);
  return plan?.faName;
}
export const translateFeature = (key: string): string => {
  const dict: Record<string, string> = {
    base_stats: "آمار پایه",
    choosing_llm: "انتخاب مدل هوش مصنوعی",
    usage_reports: "گزارش مصرف",
    upload_docs: "آموزش چت بات از طریق آپلود فایل",
    chatbot_logo: "لوگوی چت‌بات اختصاصی",
    advanced_stats: "آمار پیشرفته",
    website_crawling: "جمع آوری اطلاعات از سایت شما برای آموزش",
    website_crawling_level_2: "خزش وب‌سایت سطح ۲ ",
    qa_as_file: "سوال و پاسخ از فایل",
    chatbot_greetings: "پیام خوش‌آمدگویی",
    chatbot_k: "حافظه چت‌بات",
    chatbot_emoji: "استفاده از ایموجی",
    chatbot_support_phone: "اضافه کردن پشتیبان انسانی",
    chatbot_answer_length: "کنترل طول پاسخ",
    bale_integration: "اتصال به پیامرسان بله",
    create_free_bot: "ساخت چت‌بات رایگان",
    customize_design: "تطبیق ظاهری کامل با هویت بصری شما",
    customize_behavior: "تنظیم رفتار چت‌بات",
    widget: "اتصال به سایت (ویجت)",
    api_as_tool: "اتصال به api‌های خارجی",
    sql_as_tool: "اتصال به دیتابیس",
    specialized_agent: "اضافه شدن ایجنت های هوش مصنوعی سفارشی",
    onboarding: "آموزش و آنبوردینگ اختصاصی",
    optimize_answers: "مشاوره بهینه سازی پاسخ‌ها",
    voice_chat: "گفتگوی صوتی",
  };
  return dict[key] || key;
};

// داشبورد تحلیلی مشتریان

export const getPlanIcon = (planCode: string) => {
  switch (planCode.toUpperCase()) {
    case "FREE":
      return <Gift />;
    case "BASIC":
      return <Rocket />;
    case "MEDIUM":
      return <Crown />;
    case "ADVANCE":
      return <Star />;
    case "ENTERPRISE":
      return <Users />;
    default:
      return <Gift />;
  }
};
export const getPlanIdByCode = (code: string): number | undefined => {
  const plan = PLANS.find((p) => p.code === code);
  return plan?.id;
};
export const getPlanCodeById = (id: number): PlanCode | undefined => {
  const plan = PLANS.find((p) => p.id === id);
  return plan?.code;
};
export const getPlanNameById = (id: number): string | undefined => {
  const plan = PLANS.find((p) => p.id === id);
  return plan?.faName;
};

export const PLAN_COLORS: Record<string, string> = {
  FREE: "#9ca3af",
  BASIC: "#60a5fa",
  MEDIUM: "#34d399",
  ADVANCE: "#f59e0b",
  ENTERPRISE: "#8b5cf6",
};
export const PLAN_COLORS_BYID: Record<string, string> = {
  1: "#9ca3af",
  2: "#60a5fa",
  3: "#34d399",
  4: "#f59e0b",
  5: "#8b5cf6",
};

export const SUBSCRIPTION_TYPES: Record<string, string> = {
  monthly: "ماهانه",
  yearly: "سالانه",
};
