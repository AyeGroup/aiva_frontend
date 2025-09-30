"use client";

import React, { useState } from "react";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Input } from "@/components/ui/input";
import {
  Eye,
  EyeOff,
  Phone,
  Lock,
  ArrowLeft,
  MessageSquare,
  Mail,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { englishToPersian, cleanPhoneNumber } from "@/utils/number-utils";
import "@/styles/login.css";
import { login } from "@/services/auth.service";

type PageType =
  | "landing"
  | "signup"
  | "dashboard"
  | "consultation"
  | "demo"
  | "chatbot-management"
  | "tickets"
  | "login"
  | "otp-verification"
  | "register";

// interface LoginProps {
//   onNavigate: (page: PageType) => void;
// }

function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [mode, setMode] = useState<"login" | "signup">("login");

  const handleSendOtp = async () => {
    const cleanedPhone = cleanPhoneNumber(phone);

    if (!cleanedPhone) {
      toast.error("لطفاً شماره تلفن خود را وارد کنید");
      return;
    }

    // Simple validation - just check if we have some digits
    if (cleanedPhone.length < 10) {
      toast.error("لطفاً شماره تلفن معتبر وارد کنید");
      return;
    }

    setIsLoading(true);

    // Simulate OTP sending
    setTimeout(() => {
      setIsLoading(false);
      toast.success("کد تایید به شماره شما ارسال شد");

      // Navigate to OTP verification page
      // onNavigate("otp-verification");
      // elham
    }, 2000);
  };
  const isValidEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const isValidPhone = (value: string) => {
    const phoneRegex = /^(\+98|0)?9\d{9}$/; // شماره موبایل ایران
    return phoneRegex.test(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // const cleanedPhone = cleanPhoneNumber(phone);

    const cleanedPhone = phone.trim();

    if (!isValidEmail(cleanedPhone) && !isValidPhone(cleanedPhone)) {
      toast.error("لطفاً شماره موبایل یا ایمیل معتبر وارد کنید");
      return;
    }

    if (!cleanedPhone) {
      toast.error("لطفاً شماره تلفن یا ایمیل خود را وارد کنید");
      return;
    }

    if (mode === "login") {
      handleLogin(e);
      // handleSendOtp();
      return;
    }

    if (mode === "signup") {
      if (!password) {
        toast.error("لطفاً رمز عبور را وارد کنید");
        return;
      }

      setIsLoading(true);

      // Simulate API call for signup
      setTimeout(() => {
        setIsLoading(false);
        toast.success("در حال ارسال کد تایید...");

        // Navigate to OTP verification for signup
        // onNavigate("otp-verification");
        //elham
      }, 2000);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    //  const inputValue = identifier.trim();

    //  if (!isValidEmail(inputValue) && !isValidPhone(inputValue)) {
    //    toast.error("لطفاً شماره موبایل یا ایمیل معتبر وارد کنید");
    //    return;
    //  }

    if (!password) {
      toast.error("لطفاً رمز عبور را وارد کنید");
      return;
    }

    setIsLoading(true);
    try {
      const res = await login(phone, password);

      // فرض: پاسخ سرور چیزی شبیه { verify: boolean, token?: string } است
      if (res.data.verify === false) {
        toast("لطفاً شماره خود را تایید کنید");
        // onNavigate("otp-verification"); // صفحه تایید شماره
        //elham
      } else {
        toast.success("ورود موفق!");
        // ذخیره توکن در localStorage یا context اگر نیاز بود
        // localStorage.setItem("token", res.data.token);
        // onNavigate("dashboard");
        //elham
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("خطای ناشناخته رخ داد");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    setPhone("");
    setPassword("");
    setOtp("");
    setIsOtpSent(false);
    setOtpTimer(0);
  };

  return (
    <div
      className="login-page min-h-screen relative overflow-hidden"
      style={{
        backgroundColor: "#FFFFFF",
        fontFamily: "Vazirmatn, sans-serif",
      }}
    >
      {/* Header Content */}
      <div className="relative z-50 w-full p-2 pb-0">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo - Right Side */}
            <div className="flex items-center gap-3">
              <ImageWithFallback
                src="/logo.png"
                alt="آیوا"
                className="w-20 h-20 object-cover"
              />
              <div className="flex flex-col">
                <span className="text-grey-900 font-semibold text-xl text-right   text-[24px]">
                  آیوا
                </span>
                <p
                  className="text-grey-500"
                  style={{
                    fontSize: "var(--text-body-small)",
                    lineHeight: "var(--text-body-small-lh)",
                  }}
                >
                  دستیار هوشمند کسب و کار تو
                </p>
              </div>
            </div>

            {/* Header Actions - Left Side */}
            <div className="flex items-center gap-3"></div>
          </div>
        </div>
      </div>

      {/* Enhanced Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top Left - Geometric Pattern */}
        <div className="absolute top-28 left-12 w-32 h-32 opacity-20">
          <svg width="100%" height="100%" viewBox="0 0 128 128" fill="none">
            <circle cx="20" cy="20" r="8" fill="#65BCB6" />
            <circle cx="60" cy="20" r="6" fill="#FFA18E" />
            <circle cx="100" cy="20" r="4" fill="#65BCB6" />
            <circle cx="40" cy="60" r="8" fill="#FFA18E" />
            <circle cx="80" cy="60" r="6" fill="#65BCB6" />
            <circle cx="20" cy="100" r="6" fill="#65BCB6" />
            <circle cx="100" cy="100" r="8" fill="#FFA18E" />
          </svg>
        </div>

        {/* Top Right - Flowing Curves */}
        <div className="absolute top-20 right-16 w-40 h-40 opacity-15">
          <svg width="100%" height="100%" viewBox="0 0 160 160" fill="none">
            <path
              d="M20 140 Q80 20 140 80 Q100 120 60 100 Q40 140 20 140Z"
              fill="#65BCB6"
            />
            <path
              d="M40 120 Q100 40 120 100 Q80 140 40 120Z"
              fill="#FFA18E"
              opacity="0.7"
            />
          </svg>
        </div>

        {/* Center Left - Tech Elements */}
        <div className="absolute left-8 top-1/2 transform -translate-y-1/2 w-24 h-32 opacity-25">
          <svg width="100%" height="100%" viewBox="0 0 96 128" fill="none">
            {/* Chat bubbles */}
            <rect x="10" y="10" width="60" height="20" rx="10" fill="#65BCB6" />
            <rect x="20" y="40" width="50" height="16" rx="8" fill="#FFA18E" />
            <rect x="15" y="70" width="55" height="18" rx="9" fill="#65BCB6" />

            {/* Connection lines */}
            <line
              x1="40"
              y1="30"
              x2="45"
              y2="40"
              stroke="#65BCB6"
              strokeWidth="2"
              opacity="0.6"
            />
            <line
              x1="45"
              y1="56"
              x2="42"
              y2="70"
              stroke="#FFA18E"
              strokeWidth="2"
              opacity="0.6"
            />
          </svg>
        </div>

        {/* Bottom Left - Modern Grid Pattern */}
        <div
          className="absolute bottom-28 left-16 w-28 h-28 rounded-2xl p-3 opacity-20"
          style={{ backgroundColor: "#65BCB6" }}
        >
          <div className="grid grid-cols-3 gap-2 h-full">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className={`rounded-lg ${
                  i % 2 === 0 ? "bg-white" : "bg-white/60"
                }`}
              ></div>
            ))}
          </div>
        </div>

        {/* Center Right - AI Assistant Illustration */}
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 w-72 h-72 opacity-15">
          <svg width="100%" height="100%" viewBox="0 0 288 288" fill="none">
            {/* AI Brain/Network */}
            <circle cx="144" cy="120" r="40" fill="#65BCB6" opacity="0.3" />
            <circle cx="144" cy="120" r="25" fill="#65BCB6" opacity="0.5" />
            <circle cx="144" cy="120" r="12" fill="#65BCB6" />

            {/* Network connections */}
            <circle cx="100" cy="80" r="8" fill="#FFA18E" />
            <circle cx="188" cy="80" r="8" fill="#FFA18E" />
            <circle cx="120" cy="180" r="8" fill="#FFA18E" />
            <circle cx="168" cy="180" r="8" fill="#FFA18E" />

            <line
              x1="144"
              y1="108"
              x2="100"
              y2="88"
              stroke="#65BCB6"
              strokeWidth="2"
              opacity="0.6"
            />
            <line
              x1="144"
              y1="108"
              x2="188"
              y2="88"
              stroke="#65BCB6"
              strokeWidth="2"
              opacity="0.6"
            />
            <line
              x1="144"
              y1="132"
              x2="120"
              y2="172"
              stroke="#65BCB6"
              strokeWidth="2"
              opacity="0.6"
            />
            <line
              x1="144"
              y1="132"
              x2="168"
              y2="172"
              stroke="#65BCB6"
              strokeWidth="2"
              opacity="0.6"
            />

            {/* Data flow particles */}
            <circle cx="122" cy="94" r="3" fill="#FFA18E" opacity="0.8" />
            <circle cx="166" cy="94" r="3" fill="#FFA18E" opacity="0.8" />
            <circle cx="132" cy="156" r="3" fill="#FFA18E" opacity="0.8" />
            <circle cx="156" cy="156" r="3" fill="#FFA18E" opacity="0.8" />
          </svg>
        </div>

        {/* Bottom Right - Layered Shapes */}
        <div className="absolute bottom-20 right-24 w-20 h-24 opacity-20">
          <div
            className="absolute inset-0 rounded-2xl transform rotate-12"
            style={{ backgroundColor: "#65BCB6" }}
          ></div>
          <div className="absolute inset-2 bg-white rounded-xl transform -rotate-6"></div>
          <div
            className="absolute inset-4 rounded-lg transform rotate-3"
            style={{ backgroundColor: "#FFA18E" }}
          ></div>
        </div>

        {/* Floating Elements */}
        <div
          className="absolute top-40 left-1/4 w-3 h-3 rounded-full opacity-40"
          style={{ backgroundColor: "#65BCB6" }}
        ></div>
        <div
          className="absolute bottom-40 right-1/3 w-4 h-4 rounded-full opacity-30"
          style={{ backgroundColor: "#FFA18E" }}
        ></div>
        <div
          className="absolute top-2/3 right-1/4 w-2 h-2 rounded-full opacity-50"
          style={{ backgroundColor: "#65BCB6" }}
        ></div>
        <div
          className="absolute top-1/4 left-2/3 w-3 h-3 rounded-full opacity-35"
          style={{ backgroundColor: "#FFA18E" }}
        ></div>

        {/* Subtle Gradient Overlays */}
        <div
          className="absolute top-0 left-0 w-1/3 h-1/3 rounded-full opacity-5"
          style={{
            background: "radial-gradient(circle, #65BCB6 0%, transparent 70%)",
          }}
        ></div>
        <div
          className="absolute bottom-0 right-0 w-1/2 h-1/2 rounded-full opacity-5"
          style={{
            background: "radial-gradient(circle, #FFA18E 0%, transparent 70%)",
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div
        className="relative z-10 flex items-center justify-center p-2 pt-4 pb-16"
        style={{ minHeight: "calc(100vh - 120px)" }}
      >
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-white rounded-2xl p-4 shadow-lg border border-grey-200">
            {/* Card Header */}
            <div className="text-center mb-4">
              <h1
                className="text-grey-900 mb-3"
                style={{
                  fontSize: "var(--text-h2)",
                  fontWeight: "var(--font-weight-display)",
                  lineHeight: "var(--text-h2-lh)",
                }}
              >
                ورود یا ثبت نام
              </h1>
              <p
                className="text-grey-600"
                style={{
                  fontSize: "var(--text-body-large)",
                  lineHeight: "var(--text-body-large-lh)",
                }}
              >
                برای شروع شماره موبایل خود را وارد کنید.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Phone Field with prefix */}
              <div>
                <div className="relative">
                  {!phone && (
                    <div
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-grey-400 pointer-events-none z-10"
                      style={{ fontSize: "var(--text-body-small)" }}
                    >
                      <span className="text-grey-400">شماره موبایل</span>
                    </div>
                  )}
                  <Input
                    id="phone"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder=""
                    // numeric
                    className="w-full pr-4 pl-4 py-4 border border-grey-300 bg-white text-grey-900 placeholder-grey-500 transition-all focus:border-brand-secondary focus:ring-2 focus:ring-brand-secondary/20 focus:outline-none phone-input"
                    style={{
                      borderRadius: "var(--radius-lg)",
                      fontSize: "var(--text-body-large)",
                      lineHeight: "var(--text-body-large-lh)",
                    }}
                    dir="ltr"
                    maxLength={11}
                    disabled={isOtpSent && mode === "login"}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="relative">
                  {!password && (
                    <div
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-grey-400 pointer-events-none z-10"
                      style={{ fontSize: "var(--text-body-small)" }}
                    >
                      <span className="text-grey-400">رمز عبور</span>
                    </div>
                  )}
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder=""
                    className="w-full pr-4 pl-12 py-4 border border-grey-300 bg-white text-grey-900 placeholder-grey-500 transition-all focus:border-brand-secondary focus:ring-2 focus:ring-brand-secondary/20 focus:outline-none"
                    style={{
                      borderRadius: "var(--radius-lg)",
                      fontSize: "var(--text-body-large)",
                      lineHeight: "var(--text-body-large-lh)",
                    }}
                    dir="rtl"
                  />
                  {/* Password toggle button */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-grey-400 hover:text-grey-600 transition-colors"
                    style={{
                      background: "none",
                      border: "none",
                      padding: "0",
                      cursor: "pointer",
                    }}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms and conditions info */}
              <div className="flex items-start gap-2 p-4 bg-grey-50 rounded-lg">
                <div className="flex-shrink-0 mt-0.5"></div>
                <p
                  className="text-grey-600 text-right"
                  style={{
                    fontSize: "var(--text-body-small)",
                    lineHeight: "var(--text-body-small-lh)",
                  }}
                >
                  استفاده از آیوا به معنی پذیرش{" "}
                  <button
                    className="hover:opacity-80 active:opacity-60"
                    style={{
                      background: "none",
                      border: "none",
                      fontSize: "inherit",
                      color: "var(--brand-primary)",
                    }}
                  >
                    قوانین و مقررات
                  </button>{" "}
                  این سرویس است.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full text-white py-4 px-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all hover:opacity-90"
                style={{
                  backgroundColor: "var(--brand-primary)",
                  borderRadius: "var(--radius-lg)",
                  fontSize: "var(--text-body-large)",
                  fontWeight: "var(--font-weight-medium)",
                  lineHeight: "var(--text-body-large-lh)",
                  border: "none",
                }}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>در حال پردازش...</span>
                  </>
                ) : (
                  <span>تایید و دریافت کد</span>
                )}
              </button>

              {/* Password login link */}
              <div className="text-center mt-3">
                <span
                  className="text-grey-600"
                  style={{ fontSize: "var(--text-body-large)" }}
                >
                  حساب کاربری ندارید؟{" "}
                  <button
                    type="button"
                    // onClick={() => onNavigate("register")}
                    //elham
                    className="hover:opacity-80 active:opacity-60"
                    style={{
                      background: "none",
                      border: "none",
                      fontSize: "var(--text-body-large)",
                      color: "var(--brand-primary)",
                      padding: "0",
                      cursor: "pointer",
                    }}
                  >
                    ثبت نام کنید
                  </button>
                </span>
              </div>
            </form>
          </div>

          {/* Back to Landing */}
          <div className="flex justify-end mt-[24px] mr-[0px] mb-[0px] ml-[0px]">
            <button
              // onClick={() => onNavigate("landing")}
              //elham
              className="text-grey-600 hover:text-grey-800 text-sm font-medium transition-colors flex items-center gap-2 self-center text-center"
            >
              بازگشت به صفحه اصلی
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-2">
        <div className="text-center">
          <p
            className="text-grey-500"
            style={{ fontSize: "var(--text-caption)" }}
          >
            کپی رایت © آیوا ۱۴۰۳ |{" "}
            <button
              className="hover:text-grey-700 transition-colors"
              style={{ background: "none", border: "none" }}
            >
              سیاست حفظ حریم خصوصی
            </button>
          </p>
        </div>
      </div>

      <Toaster position="top-center" dir="rtl" richColors closeButton />
    </div>
  );
}

export default Login;
