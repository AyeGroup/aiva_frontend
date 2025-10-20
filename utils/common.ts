import { API_BASE_URL } from "@/config";

export const convertPersianToEnglishDigits = (str:string) => {
  if (!str) return str;

  // نگاشت ارقام فارسی و عربی به انگلیسی
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  let output = str;
  
  // تبدیل ارقام فارسی
  for (let i = 0; i < persianDigits.length; i++) {
    const regex = new RegExp(persianDigits[i], 'g');
    output = output.replace(regex, englishDigits[i]);
  }

  // تبدیل ارقام عربی (برای پوشش همه موارد)
  for (let i = 0; i < arabicDigits.length; i++) {
    const regex = new RegExp(arabicDigits[i], 'g');
    output = output.replace(regex, englishDigits[i]);
  }

  return output;
};

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