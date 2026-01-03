import { API_BASE_URL } from "@/config";

export const convertToEnglish = (str: string) => {
  if (!str) return str;

  // Add type checking at runtime
  if (typeof str !== "string") {
    // Convert to string or return empty string
    if (str === null || str === undefined) return "";
    return String(str);
  }

  const numberMap: { [key: string]: string } = {
    "۰": "0",
    "۱": "1",
    "۲": "2",
    "۳": "3",
    "۴": "4",
    "۵": "5",
    "۶": "6",
    "۷": "7",
    "۸": "8",
    "۹": "9",
    "٠": "0",
    "١": "1",
    "٢": "2",
    "٣": "3",
    "٤": "4",
    "٥": "5",
    "٦": "6",
    "٧": "7",
    "٨": "8",
    "٩": "9",
  };

  return str.replace(/[۰-۹٠-٩]/g, (d) => numberMap[d] || d).replace(/,/g, "");
};

export const convertToPersian = (text: string | number): string => {
  if (!text || text===null) return"";
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

export const convertPersianToEnglishDigits = (str: string) => {
  if (!str) return str;

  // نگاشت ارقام فارسی و عربی به انگلیسی
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  let output = str;

  // تبدیل ارقام فارسی
  for (let i = 0; i < persianDigits.length; i++) {
    const regex = new RegExp(persianDigits[i], "g");
    output = output.replace(regex, englishDigits[i]);
  }

  // تبدیل ارقام عربی (برای پوشش همه موارد)
  for (let i = 0; i < arabicDigits.length; i++) {
    const regex = new RegExp(arabicDigits[i], "g");
    output = output.replace(regex, englishDigits[i]);
  }

  return output;
};

export const convertNumbersToPersian = (text: string | number): string => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  return text
    .toString()
    .replace(/\d/g, (digit) => persianDigits[parseInt(digit, 10)]);
};

export const normalizeFileUrl = (path: string) => {
  if (!path) return "";
  return (
    API_BASE_URL.replace("/api", "") +
    "/" +
    path
      .replace(/\\/g, "/") // همه \ را به / تبدیل کن
      .replace(/^(\.\/)?data\//, "") // حذف ./data/
  );
};

export function getDaysRemaining(targetDate: string | Date): number {
  const target = new Date(targetDate);
  const now = new Date();

  // Calculate difference in milliseconds
  const diffMs = target.getTime() - now.getTime();

  // Convert milliseconds to days
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return diffDays;
}

export function utcHourToLocalTime(hourUTC: number) {
  const now = new Date();
  const date = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), hourUTC)
  );

  return date.toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const jalaliToGregorian = (jy: number, jm: number, jd: number) => {
  const gy = jy <= 979 ? 621 : 1600;
  const days =
    365 * (jy - (jy <= 979 ? 0 : 979)) +
    Math.floor((jy - (jy <= 979 ? 0 : 979)) / 33) * 8 +
    Math.floor((((jy - (jy <= 979 ? 0 : 979)) % 33) + 3) / 4) +
    jd +
    (jm < 7 ? (jm - 1) * 31 : (jm - 7) * 30 + 186);

  let gDay = days + 79;
  let gy2 = gy + 400 * Math.floor(gDay / 146097);
  gDay %= 146097;

  if (gDay >= 36525) {
    gDay--;
    gy2 += 100 * Math.floor(gDay / 36524);
    gDay %= 36524;
    if (gDay >= 365) gDay++;
  }

  gy2 += 4 * Math.floor(gDay / 1461);
  gDay %= 1461;

  if (gDay >= 366) {
    gy2 += Math.floor((gDay - 1) / 365);
    gDay = (gDay - 1) % 365;
  }

  const gd = gDay + 1;
  const sal_a = [
    0,
    31,
    (gy2 % 4 === 0 && gy2 % 100 !== 0) || gy2 % 400 === 0 ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  let gm = 1;
  let d = gd;
  while (gm < 13 && d > sal_a[gm]) {
    d -= sal_a[gm];
    gm++;
  }

  return new Date(gy2, gm - 1, d);
};
