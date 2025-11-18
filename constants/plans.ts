export enum TRANSACTION_TYPE {
  INCREASE_WALLET = "increase_wallet",
  INCREASE_BALANCE = "increase_balance",
  BUY_SUBSCRIPTION = "buy_subscription",
  MESSAGE_COST = "message_cost",
}

export enum TRANSACTION_TITLE {
  increase_wallet = "افزایش موجودی کیف پول",
  increase_balance = "افزایش اعتبار",
  buy_subscription = "خرید پلن",
  message_cost = "هزینه پیام",
}

export const getTransactionTitle = (type: keyof typeof TRANSACTION_TITLE) => {
  return TRANSACTION_TITLE[type] || "";
};

//  const getTransactionTitle = (type: string) =>
//    type === TRANSACTION_TYPE.BUY_SUBSCRIPTION
//      ? "خرید پلن"
//      : type === TRANSACTION_TYPE.INCREASE_WALLET
//      ? "افزایش موجودی کیف پول"
//      : type === TRANSACTION_TYPE.INCREASE_BALANCE
//      ? "افزایش اعنبار"
//      : "نا مشخص";

// export const TRANSACTION_TITLE: Record<string, string> = {
//   increase_wallet: "افزایش موجودی",
//   increase_balance: "افزایش بالانس",
//   buy_subscription: "خرید پلن",
//   message_cost: "هزینه پیام",
// };

// export const getTransactionTitle = (type: string): string  => {

//   if (type == "increase_wallet") return "افزایش موجودی";
//   else if (type == "increase_balance") return "افزایش بالانس";
//   else if (type == "buy_subscription") return "خرید پلن";
//   else if (type == "message_cost") return "هزینه پیام";
//   else return "";
// };

type PlanCode = "FREE" | "BASIC" | "MEDIUM" | "ADVANCE" | "ENTERPRISE";

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
