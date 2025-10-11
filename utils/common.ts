import { API_BASE_URL } from "@/config";

// Function to convert English numbers to Persian
export const convertToPersian = (text: string | number): string => {
  const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  let result = text.toString();
  for (let i = 0; i < englishDigits.length; i++) {
    result = result.replace(
      new RegExp(englishDigits[i], "g"),
      persianDigits[i]
    );
  }
  return result;
};
export const normalizeFileUrl = (path: string) => {
  if (!path) return "";
  return (
    API_BASE_URL.replace("/api","") +
    "/" +
    path
      .replace(/\\/g, "/") // همه \ را به / تبدیل کن
      .replace(/^(\.\/)?data\//, "") // حذف ./data/
  );
};