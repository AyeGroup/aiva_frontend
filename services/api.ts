import axios from "axios";

import { API_BASE_URL } from "@/config";

const api = axios.create({
  baseURL: API_BASE_URL, // آدرس بک‌اندت
  withCredentials: true, // اگر کوکی/سشن داری
});

// نمونه: ارسال لاگین
export const login = (identifier: string) => {
  return api.post("/auth/login", { identifier });
};

// نمونه: ثبت نام
export const signup = (identifier: string, password: string) => {
  return api.post("/auth/signup", { identifier, password });
};

// نمونه: تایید OTP
export const verifyOtp = (identifier: string, otp: string) => {
  return api.post("/auth/verify-otp", { identifier, otp });
};

export default api;
