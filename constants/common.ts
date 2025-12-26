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
  if(!day) return ""
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

export const getPriorityLabel = (priority: string): string => {
  const labels: Record<string, string> = {
    urgent: "اورژانسی",
    high: "بالا",
    medium: "متوسط",
    low: "پایین",
  };
  return labels[priority] || priority;
};