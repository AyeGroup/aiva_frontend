import React, { useState } from "react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { Input } from "../_components/Input/input";
import { Eye, EyeOff, ArrowLeft, Check } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "../../components/ui/sonner";
import { englishToPersian, cleanPhoneNumber } from "../../utils/number-utils";
// import aivaLogo from "/logo.png";

import "./login.css";

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

interface SignupProps {
  onNavigate: (page: PageType) => void;
}

type SignupStep = "phone" | "otp" | "password" | "success";

export function Signup({ onNavigate }: SignupProps) {
  const [currentStep, setCurrentStep] = useState<SignupStep>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpTimer, setOtpTimer] = useState(120); // 2 minutes

  // Phone number step handler
  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanedPhone = cleanPhoneNumber(phone);

    if (!cleanedPhone) {
      toast.error("لطفاً شماره تلفن خود را وارد کنید");
      return;
    }

    if (cleanedPhone.length < 10) {
      toast.error("لطفاً شماره تلفن معتبر وارد کنید");
      return;
    }

    setIsLoading(true);

    // Simulate OTP sending
    setTimeout(() => {
      setIsLoading(false);
      toast.success("کد تایید به شماره شما ارسال شد");
      setCurrentStep("otp");

      // Start countdown timer
      const timer = setInterval(() => {
        setOtpTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 2000);
  };

  // OTP input handler
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  // OTP step handler
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      toast.error("لطفاً کد 6 رقمی را کامل وارد کنید");
      return;
    }

    setIsLoading(true);

    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      toast.success("شماره تلفن تایید شد");
      setCurrentStep("password");
    }, 1500);
  };

  // Password step handler
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password) {
      toast.error("لطفاً رمز عبور را وارد کنید");
      return;
    }

    if (password.length < 6) {
      toast.error("رمز عبور باید حداقل 6 کاراکتر باشد");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("رمز عبور و تکرار آن یکسان نیستند");
      return;
    }

    setIsLoading(true);

    // Simulate account creation
    setTimeout(() => {
      setIsLoading(false);
      toast.success("حساب کاربری شما با موفقیت ایجاد شد");
      setCurrentStep("success");

      // Auto redirect to login after 3 seconds
      setTimeout(() => {
        onNavigate("login");
      }, 3000);
    }, 2000);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "phone":
        return (
          <form onSubmit={handlePhoneSubmit} className="space-y-4">
            <div className="text-center mb-6">
              <h1
                className="text-grey-900 mb-3"
                style={{
                  fontSize: "var(--text-h2)",
                  fontWeight: "var(--font-weight-display)",
                  lineHeight: "var(--text-h2-lh)",
                }}
              >
                ثبت نام در آیوا
              </h1>
              <p
                className="text-grey-600"
                style={{
                  fontSize: "var(--text-body-large)",
                  lineHeight: "var(--text-body-large-lh)",
                }}
              >
                برای شروع، شماره موبایل خود را وارد کنید
              </p>
            </div>

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
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder=""
                  numeric
                  className="w-full pr-4 pl-4 py-4 border border-grey-300 bg-white text-grey-900 placeholder-grey-500 transition-all focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 focus:outline-none"
                  style={{
                    borderRadius: "var(--radius-lg)",
                    fontSize: "var(--text-body-large)",
                    lineHeight: "var(--text-body-large-lh)",
                  }}
                  dir="ltr"
                  maxLength={11}
                  disabled={isLoading}
                />
              </div>
            </div>

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
                  <span>در حال ارسال...</span>
                </>
              ) : (
                <span>ارسال کد تایید</span>
              )}
            </button>
          </form>
        );

      case "otp":
        return (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <div className="text-center mb-6">
              <h1
                className="text-grey-900 mb-3"
                style={{
                  fontSize: "var(--text-h2)",
                  fontWeight: "var(--font-weight-display)",
                  lineHeight: "var(--text-h2-lh)",
                }}
              >
                تایید شماره موبایل
              </h1>
              <p
                className="text-grey-600"
                style={{
                  fontSize: "var(--text-body-large)",
                  lineHeight: "var(--text-body-large-lh)",
                }}
              >
                کد 6 رقمی ارسال شده به شماره {englishToPersian(phone)} را وارد
                کنید
              </p>
            </div>

            {/* OTP Inputs */}
            <div className="flex justify-center gap-3 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className={`
                    w-12 h-12 text-center text-xl font-semibold rounded-xl border-2
                    ${
                      digit
                        ? "border-brand-primary bg-brand-primary/5 text-brand-primary focus:ring-2 focus:ring-brand-primary/20 focus:shadow-lg focus:shadow-brand-primary/15"
                        : "border-grey-200 bg-white text-grey-700 focus:border-brand-primary focus:bg-brand-primary/5 focus:ring-2 focus:ring-brand-primary/20 focus:shadow-lg focus:shadow-brand-primary/10"
                    }
                    transition-all duration-200 focus:outline-none
                  `}
                  dir="rtl"
                />
              ))}
            </div>

            {/* Timer */}
            <div className="text-center mb-4">
              <p
                className="text-grey-500"
                style={{ fontSize: "var(--text-body-small)" }}
              >
                {otpTimer > 0 ? (
                  <>
                    زمان باقی‌مانده:{" "}
                    {englishToPersian(
                      Math.floor(otpTimer / 60)
                        .toString()
                        .padStart(2, "0")
                    )}
                    :
                    {englishToPersian(
                      (otpTimer % 60).toString().padStart(2, "0")
                    )}
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setOtpTimer(120);
                      toast.success("کد مجدداً ارسال شد");
                    }}
                    className="text-brand-primary hover:opacity-80"
                    style={{ background: "none", border: "none", padding: "0" }}
                  >
                    ارسال مجدد کد
                  </button>
                )}
              </p>
            </div>

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
                  <span>در حال تایید...</span>
                </>
              ) : (
                <span>تایید کد</span>
              )}
            </button>
          </form>
        );

      case "password":
        return (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="text-center mb-6">
              <h1
                className="text-grey-900 mb-3"
                style={{
                  fontSize: "var(--text-h2)",
                  fontWeight: "var(--font-weight-display)",
                  lineHeight: "var(--text-h2-lh)",
                }}
              >
                تعیین رمز عبور
              </h1>
              <p
                className="text-grey-600"
                style={{
                  fontSize: "var(--text-body-large)",
                  lineHeight: "var(--text-body-large-lh)",
                }}
              >
                رمز عبور خود را برای حساب کاربری انتخاب کنید
              </p>
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
                  className="w-full pr-4 pl-12 py-4 border border-grey-300 bg-white text-grey-900 placeholder-grey-500 transition-all focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 focus:outline-none"
                  style={{
                    borderRadius: "var(--radius-lg)",
                    fontSize: "var(--text-body-large)",
                    lineHeight: "var(--text-body-large-lh)",
                  }}
                  dir="rtl"
                />
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

            {/* Confirm Password Field */}
            <div>
              <div className="relative">
                {!confirmPassword && (
                  <div
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-grey-400 pointer-events-none z-10"
                    style={{ fontSize: "var(--text-body-small)" }}
                  >
                    <span className="text-grey-400">تکرار رمز عبور</span>
                  </div>
                )}
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder=""
                  className="w-full pr-4 pl-12 py-4 border border-grey-300 bg-white text-grey-900 placeholder-grey-500 transition-all focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 focus:outline-none"
                  style={{
                    borderRadius: "var(--radius-lg)",
                    fontSize: "var(--text-body-large)",
                    lineHeight: "var(--text-body-large-lh)",
                  }}
                  dir="rtl"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-grey-400 hover:text-grey-600 transition-colors"
                  style={{
                    background: "none",
                    border: "none",
                    padding: "0",
                    cursor: "pointer",
                  }}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

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
                  <span>در حال ایجاد حساب...</span>
                </>
              ) : (
                <span>ایجاد حساب کاربری</span>
              )}
            </button>
          </form>
        );

      case "success":
        return (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-success" />
            </div>
            <h1
              className="text-grey-900 mb-3"
              style={{
                fontSize: "var(--text-h2)",
                fontWeight: "var(--font-weight-display)",
                lineHeight: "var(--text-h2-lh)",
              }}
            >
              حساب شما ایجاد شد!
            </h1>
            <p
              className="text-grey-600 mb-6"
              style={{
                fontSize: "var(--text-body-large)",
                lineHeight: "var(--text-body-large-lh)",
              }}
            >
              حساب کاربری شما با موفقیت ایجاد شد. در حال انتقال به صفحه ورود...
            </p>
            <button
              onClick={() => onNavigate("login")}
              className="text-white py-3 px-6 rounded-lg transition-all hover:opacity-90"
              style={{
                backgroundColor: "var(--brand-primary)",
                fontSize: "var(--text-body-large)",
                fontWeight: "var(--font-weight-medium)",
                border: "none",
              }}
            >
              رفتن به صفحه ورود
            </button>
          </div>
        );

      default:
        return null;
    }
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
                <span className="text-grey-900 font-semibold text-xl text-right font-bold text-[24px]">
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
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate("login")}
                className="px-4 py-2 text-white flex items-center gap-2 hover:opacity-90 rounded-lg border-none"
                style={{
                  backgroundColor: "var(--brand-primary)",
                  fontSize: "var(--text-body-large)",
                  fontWeight: "var(--font-weight-medium)",
                  cursor: "pointer",
                  userSelect: "none",
                  minHeight: "44px",
                }}
              >
                <ArrowLeft className="w-4 h-4" />
                بازگشت به ورود
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Same background decorations as login page */}
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
      </div>

      {/* Main Content */}
      <div
        className="relative z-10 flex items-center justify-center p-2 pt-4 pb-16"
        style={{ minHeight: "calc(100vh - 120px)" }}
      >
        <div className="w-full max-w-md">
          {/* Signup Card */}
          <div className="bg-white rounded-2xl p-4 shadow-lg border border-grey-200">
            {/* Step indicator */}
            {currentStep !== "success" && (
              <div className="flex justify-center gap-2 mb-6">
                <div
                  className={`w-2 h-2 rounded-full ${
                    currentStep === "phone" ? "bg-brand-primary" : "bg-grey-300"
                  }`}
                ></div>
                <div
                  className={`w-2 h-2 rounded-full ${
                    currentStep === "otp" ? "bg-brand-primary" : "bg-grey-300"
                  }`}
                ></div>
                <div
                  className={`w-2 h-2 rounded-full ${
                    currentStep === "password"
                      ? "bg-brand-primary"
                      : "bg-grey-300"
                  }`}
                ></div>
              </div>
            )}

            {/* Step Content */}
            {renderStepContent()}
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

export default Signup;
