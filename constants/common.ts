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