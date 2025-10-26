"use client";

import React, { useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { Input } from "@/components/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { API_ROUTES } from "@/constants/apiRoutes";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Eye, EyeOff, ArrowLeft, Check } from "lucide-react";
import { LoginTopLeft, RegisterTopLeft } from "@/public/icons/AppIcons";
import { englishToPersian, cleanPhoneNumber } from "@/utils/number-utils";
import { convertPersianToEnglishDigits } from "@/utils/common";
import Link from "next/link";
import Image from "next/image";

type RegisterStep = "signup" | "otp" | "success" | "password";

export default function Register() {
  const otpTime = Number(process.env.PHONE_OTP_TTL_SECONDS) || 60;
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<RegisterStep>("signup");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [warning, setWarning] = useState("");
  const [otpTimer, setOtpTimer] = useState(otpTime);
  const [errors, setErrors] = useState<{
    email?: string;
    phone?: string;
    password?: string;
  }>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const cleanedPhone = cleanPhoneNumber(phone);
    return cleanedPhone.length >= 10;
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 5;
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (/[آ-ی]/.test(value)) {
      setWarning("رمز عبور نباید شامل کاراکتر فارسی باشد!");
    } else {
      setWarning("");
    }
    // Clear errors on valid input
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const submitValidation = async () => {
    const newErrors: typeof errors = {};
    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email = "لطفاً ایمیل معتبر وارد کنید";
    }

    if (!formData.phone || !validatePhone(formData.phone)) {
      newErrors.phone = "لطفاً شماره تلفن معتبر وارد کنید";
    }

    if (!formData.password || !validatePassword(formData.password)) {
      newErrors.password = "رمز عبور باید حداقل ۶ حرف باشد";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleRegisterSubmit");

    setMessage("");
    if (!submitValidation()) return;
    setIsLoading(true);

    try {
      const { data, status } = await axiosInstance.post(
        API_ROUTES.AUTH.REGISTER,
        formData
      );

      if (status !== 200) {
        // console.log("1");
        setMessage(data?.message || "در ثبت اطلاعات خطایی رخ داد.");
        setIsLoading(false);
        return;
      }
    } catch (err: any) {
      // if (axiosInstance.isAxiosError(err)) {
      // setMessage(
      // err.response?.data?.message || "در ثبت اطلاعات خطایی رخ داد."
      // );
      // } else {
      setMessage("یک خطای ناشناخته رخ داد.");
      // }
      setIsLoading(false);
      // console.log("2");
      return;
    }

    try {
      const res = await axiosInstance.post(API_ROUTES.AUTH.SEND_CODE, {
        phone: formData.phone,
      });

      if (res.status === 200) {
        // success response
        toast.success(
          `کد تایید به شماره ${englishToPersian(formData.phone)} ارسال شد`
        );
        setCurrentStep("otp");

        // start countdown (60s for example)
        setOtpTimer(otpTime);
        const timer = setInterval(() => {
          setOtpTimer((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        setMessage("مشکلی در ارسال کد رخ داد. لطفا دوباره تلاش کنید.");
        toast.error("مشکلی در ارسال کد رخ داد. لطفا دوباره تلاش کنید.");
      }
    } catch (err: any) {
      console.error("Register error:", err);

      if (err.response) {
        const msg =
          err.response.data?.message ||
          "خطا در برقراری ارتباط با سرور. دوباره تلاش کنید.";
        setMessage("خطا در برقراری ارتباط با سرور. دوباره تلاش کنید." + msg);
      } else if (err.request) {
        toast.error("پاسخی از سرور دریافت نشد. اینترنت خود را بررسی کنید.");
        setMessage("خطا در برقراری ارتباط با سرور. دوباره تلاش کنید.");
      } else {
        setMessage("خطا در برقراری ارتباط با سرور. دوباره تلاش کنید.");
        toast.error("خطای ناشناخته‌ای رخ داد. دوباره تلاش کنید.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input (RTL: move to left - previous index)
    if (value && index > 0) {
      const nextInput = document.getElementById(`otp-${index - 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index < 5) {
      // Move to next input (right) when backspace on empty field
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      // Move to previous input (left)
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      // Move to next input (right)
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleOtpSubmit");

    const otpValue = otp.join("");
    if (otpValue.length !== 5) {
      toast.error("لطفاً کد ۵ رقمی را کامل وارد کنید");
      return;
    }

    try {
      setIsLoading(true);
      const reversed = otpValue.split("").reverse().join("");

      const res = await axiosInstance.post(API_ROUTES.AUTH.VERIFY_PHONE, {
        phone: formData.phone,
        code: reversed,
        // code: otpValue,
      });
      if (res.status === 200) {
        toast.success("حساب کاربری شما با موفقیت ایجاد شد");
        setCurrentStep("success");
        router.push("/dashboard");
      } else {
        toast.error("کد صحیح نیست");
      }
    } catch (err: any) {
      console.error("OTP verification error:", err);

      // نمایش خطای مناسب از سمت سرور یا پیش‌فرض
      const message =
        err.response?.data?.message ||
        err.message ||
        "خطا در تأیید کد. لطفاً مجدداً تلاش کنید.";

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setOtpTimer(0);

    console.log("handleResendOtp");
    setOtp(["", "", "", "", ""]);
    try {
      const res = await axiosInstance.post(API_ROUTES.AUTH.SEND_CODE, {
        phone: formData.phone,
      });

      if (res.status !== 200) {
        toast.error("خطا در ارسال پیامک");
        console.log("resend otp: ", res);
        return;
      }
      setOtpTimer(otpTime);

      toast.success(
        `کد تایید به شماره ${englishToPersian(formData.phone)} ارسال شد`
      );

      // Restart timer
      const timer = setInterval(() => {
        setOtpTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err: any) {
      console.error("Register error:", err);
      toast.error("خطا در ارسال پیامک");
    } finally {
      // setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    // console.log("renderStepContent", currentStep);

    switch (currentStep) {
      case "signup":
        return (
          <form onSubmit={handleRegisterSubmit} className="space-y-6">
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
                اطلاعات زیر را برای ایجاد حساب کاربری تکمیل کنید
              </p>
            </div>

            {/* Email Field */}
            <div>
              <label
                className="block text-grey-700 mb-2 text-right"
                style={{ fontSize: "var(--text-body-small)" }}
              >
                آدرس ایمیل
              </label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="example@domain.com"
                  className={`w-full pr-4 pl-4 leading-6 text-base rounded-lg py-4 border bg-white text-grey-900 placeholder-grey-500 transition-all focus:ring-2 focus:ring-brand-primary/20 focus:outline-none ltr text-right ${
                    errors.email
                      ? "border-danger focus:border-danger"
                      : "border-grey-300 focus:border-brand-primary"
                  }`}
                  dir="ltr"
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className="text-danger text-body-small mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label
                className="block text-grey-700 mb-2 text-right"
                style={{ fontSize: "var(--text-body-small)" }}
              >
                شماره موبایل
              </label>
              <div className="relative">
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => {
                    const inputValue = e.target.value;

                    const normalizedValue =
                      convertPersianToEnglishDigits(inputValue);

                    handleInputChange("phone", normalizedValue);
                  }}
                  // onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="09123456789"
                  numeric
                  className={`w-full pr-4 pl-4 py-4 border bg-white text-grey-900 placeholder-grey-500 transition-all focus:ring-2 focus:ring-brand-primary/20 focus:outline-none ltr text-right ${
                    errors.phone
                      ? "border-danger focus:border-danger"
                      : "border-grey-300 focus:border-brand-primary"
                  }`}
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
              {errors.phone && (
                <p className="text-danger text-body-small mt-1">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                className="block text-grey-700 mb-2 text-right"
                style={{ fontSize: "var(--text-body-small)" }}
              >
                رمز عبور
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  placeholder="حداقل ۶ کاراکتر"
                  className={`w-full pr-4 pl-14 py-4 border bg-white text-grey-900 placeholder-grey-500 transition-all focus:ring-2 focus:ring-brand-primary/20 focus:outline-none ${
                    errors.password
                      ? "border-danger focus:border-danger"
                      : "border-grey-300 focus:border-brand-primary"
                  }`}
                  style={{
                    borderRadius: "var(--radius-lg)",
                    fontSize: "var(--text-body-large)",
                    lineHeight: "var(--text-body-large-lh)",
                  }}
                  disabled={isLoading}
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
              </div>{" "}
              {warning && (
                <p className="text-red-500 mt-2 text-sm">{warning}</p>
              )}
              {errors.password && (
                <p className="text-danger text-body-small mt-1">
                  {errors.password}
                </p>
              )}
            </div>
            {message && (
              <p className="text-danger text-body-small mt-1">{message}</p>
            )}
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
                <span>ایجاد حساب و ارسال کد تایید</span>
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
                کد ۵ رقمی ارسال شده به شماره {englishToPersian(formData.phone)}{" "}
                را وارد کنید
              </p>
            </div>

            {/* OTP Inputs */}
            <div className="flex justify-center gap-3 mb-6" dir="rtl">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  className={`
                    w-12 h-12 text-center text-xl font-semibold rounded-xl border-2
                    ${
                      digit
                        ? "border-brand-primary bg-brand-primary/5 text-brand-primary focus:ring-2 focus:ring-brand-primary/20 focus:shadow-lg focus:shadow-brand-primary/15"
                        : "border-grey-200 bg-white text-grey-700 focus:border-brand-primary focus:bg-brand-primary/5 focus:ring-2 focus:ring-brand-primary/20 focus:shadow-lg focus:shadow-brand-primary/10"
                    }
                    transition-all duration-200 focus:outline-none
                  `}
                  dir="ltr"
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
                    onClick={handleResendOtp}
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
              حساب کاربری شما با موفقیت ایجاد شد. در حال انتقال به دشبورد...
            </p>
            <button
              onClick={() => router.push("/auth/login")}
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
    <div className="login-page min-h-screen relative overflow-hidden">
      {/* Header Content */}
      <div className="relative z-50 w-full p-2 pb-0">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo - Right Side */}
            <Link
              href="/"
              className="flex items-center gap-3 hover:opacity-90 transition"
            >
              <Image
                src="/logo.png"
                alt="آیوا"
                width={80}
                height={80}
                priority
              />
              <div className="flex flex-col">
                <span className="text-grey-900 font-semibold text-xl text-right text-[24px]">
                  آیوا
                </span>
                <p className="text-grey-500 text-sm">
                  دستیار هوشمند کسب و کار تو
                </p>
              </div>
            </Link>

            {/* Header Actions - Left Side */}
            <div className="flex items-center gap-3">
              <button
                className="px-4 py-2 text-white flex items-center gap-2 hover:opacity-90 rounded-lg border-none"
                onClick={() => router.push("/auth/login")}
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
          <LoginTopLeft />
        </div>

        <div className="absolute top-20 right-16 w-40 h-40 opacity-15">
          <RegisterTopLeft />
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
          {/* register Card */}
          <div className="bg-white rounded-2xl p-4 shadow-lg border border-grey-200">
            {/* Step indicator */}
            {currentStep !== "success" && (
              <div className="flex justify-center gap-2 mb-6">
                <div
                  className={`w-2 h-2 rounded-full ${
                    currentStep === "signup"
                      ? "bg-brand-primary"
                      : "bg-grey-300"
                  }`}
                ></div>
                <div
                  className={`w-2 h-2 rounded-full ${
                    currentStep === "otp" ? "bg-brand-primary" : "bg-grey-300"
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
    </div>
  );
}
