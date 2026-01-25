import { SelectorItem } from "@/types/common";

export const DAYS = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنج‌شنبه",
  "جمعه",
];

export function paersianDay(day: string): string {
  if (!day) return "";
  const daysMap: Record<string, string> = {
    saturday: "شنبه",
    sunday: "یک‌شنبه",
    monday: "دوشنبه",
    tuesday: "سه‌شنبه",
    wednesday: "چهارشنبه",
    thursday: "پنج‌شنبه",
    friday: "جمعه",
  };

  return daysMap[day.toLowerCase()] || "روز نامعتبر";
}

export const getCategoryLabel = (category: string): string => {
  const labels: Record<string, string> = {
    technical: "فنی",
    financial: "مالی",
    general: "عمومی",
    others: "سایر",
  };
  return labels[category] || category;
};

export const getPriorityStyles = (priority: string): string => {
  const styles: Record<string, string> = {
    urgent: "bg-red-100 text-red-700",
    high: "bg-orange-100 text-orange-700",
    medium: "bg-yellow-100 text-yellow-700",
    low: "bg-blue-100 text-blue-700",
  };
  return styles[priority] || "";
};
export const getPriorityLabel = (priority: string): string => {
  const labels: Record<string, string> = {
    urgent: "اورژانسی",
    high: "بالا",
    medium: "متوسط",
    low: "پایین",
  };
  return labels[priority] || priority;
};

export enum DiscountType {
  PERCENTAGE = "percentage",
  FIXED_AMOUNT = "fixed_amount",
}

export const discountType: SelectorItem[] = [
  { id: "percentage", value: "percentage", label: "درصد" },
  { id: "fixed_amount", value: "fixed_amount", label: "مبلغ ثابت" },
];

export enum DiscountUsageType {
  ONE_TIME_PER_USER = "one_time_per_user",
  TIME_LIMITED = "time_limited",
  USER_SPECIFIC = "user_specific",
}

export const discountUsageType: SelectorItem[] = [
  {
    id: "one_time_per_user",
    value: "one_time_per_user",
    label: "یک‌بار برای هر کاربر",
  },
  { id: "time_limited", value: "time_limited", label: "محدودیت زمان" },
  { id: "user_specific", value: "user_specific", label: "کاربر مشخص" },
];
export const STATUS_OPTIONS = [
  { label: "همه", value: "all" },
  { label: "باز", value: "open" },
  { label: "در حال بررسی", value: "in_progress" },
  { label: "بسته شده", value: "closed" },
];

export const PRIORITY_OPTIONS = [
  { label: "همه", value: "all" },
  { label: "کم", value: "low" },
  { label: "متوسط", value: "medium" },
  { label: "زیاد", value: "high" },
  { label: "اورژانسی", value: "urgent" },
];

export const CATEGORY_OPTIONS = [
  { label: "همه", value: "all" },
  { label: "عمومی", value: "general" },
  { label: "فنی", value: "technical" },
  { label: "مالی", value: "financial" },
];

