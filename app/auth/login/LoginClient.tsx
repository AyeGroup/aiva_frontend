"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/input";
import { toast } from "sonner";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { convertPersianToEnglishDigits } from "@/utils/common";
import {
  LoginTopLef2,
  LoginTopLeft,
  LoginTopLeft3,
  LoginTopRight,
} from "@/public/icons/AppIcons";
import { Checkbox } from "@/components/checkbox";

function LoginClient() {
  const router = useRouter();
  const { login } = useAuth();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [warning, setWarning] = useState("");
  // const [rememberMe, setRememberMe] = useState<boolean>(true);

  // useEffect(() => {
  //   if (localStorage.getItem("accessToken")) {
  //     setRememberMe(true);
  //   }
  // }, []);

  useEffect(() => {
    setPhone("");
    setPassword("");
  }, []);

  const isValidEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const isValidPhone = (value: string) => {
    const phoneRegex = /^(\+98|0)?9\d{9}$/; // شماره موبایل ایران
    return phoneRegex.test(value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    // بررسی وجود کاراکتر فارسی
    if (/[آ-ی]/.test(value)) {
      setWarning("رمز عبور نباید شامل کاراکتر فارسی باشد!");
    } else {
      setWarning("");
    }
  };

  const persianYear = new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
  }).format(new Date());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const identity = phone.trim();
    if (!isValidEmail(identity) && !isValidPhone(identity)) {
      toast.error("لطفاً شماره موبایل یا ایمیل معتبر وارد کنید");
      return;
    }
    if (!password) {
      toast.error("لطفاً رمز عبور را وارد کنید");
      return;
    }

    try {
      setIsLoading(true);
      const res = await login(identity, password);

      if (!res.success) {
        toast.error(res.message);
        if (res.status === 403) {
          router.push(`/auth/verification?phone=${identity}`);
          return;
        }
        return;
      }
      // console.log("user role", res.user.role);
      const storedUrl = localStorage.getItem("alogUrl");
      localStorage.removeItem("alogUrl");

      if (res.user.role === "admin") router.push("/admin");
      else if (storedUrl) router.push(storedUrl);
      else router.push("/dashboard");

      // console.log("user");
    } catch (err) {
      console.log(err);
      toast.error("خطا در ورود");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page min-h-screen bg-white relative overflow-hidden">
      {/* Header Content */}
      <div className="relative z-50 w-full px-2 pb-0">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-3 hover:opacity-90 transition"
            >
              <Image
                src="/logo.webp"
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
                  دستیار هوشمند کسب‌وکار تو
                </p>
              </div>
            </Link>

            <div className="flex items-center gap-3"></div>
          </div>
        </div>
      </div>

      {/* Enhanced Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-28 left-12 w-32 h-32 opacity-20">
          <LoginTopLeft />
        </div>

        <div className="absolute top-20 right-16 w-40 h-40 opacity-15">
          <LoginTopLef2 />
        </div>

        <div className="absolute left-8 top-1/2 transform -translate-y-1/2 w-24 h-32 opacity-25">
          <LoginTopLeft3 />
        </div>

        <div className="absolute bottom-28 bg-primary left-16 w-28 h-28 rounded-2xl p-3 opacity-20">
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
          <LoginTopRight />
        </div>

        {/* Bottom Right - Layered Shapes */}
        <div className="absolute bottom-20 right-24 w-20 h-24 opacity-20">
          <div className="absolute inset-0 bg-primary rounded-2xl transform rotate-12"></div>
          <div className="absolute inset-2 bg-white rounded-xl transform -rotate-6"></div>
          <div className="absolute inset-4 bg-secondary rounded-lg transform rotate-3"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-40 left-1/4 w-3 bg-primary h-3 rounded-full opacity-40"></div>
        <div className="absolute bottom-40 right-1/3 bg-secondary w-4 h-4 rounded-full opacity-30"></div>
        <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-primary rounded-full opacity-50"></div>
        <div className="absolute top-1/4 left-2/3 w-3 bg-secondary h-3 rounded-full opacity-35"></div>

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
      <div className="relative z-10 flex items-center justify-center p-2 pt-0">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-white rounded-2xl p-4 shadow-lg border border-grey-200">
            {/* Card Header */}
            <div className="text-center mb-4">
              <h1
                className="text-grey-900 mb-3 "
                style={{
                  fontSize: "var(--text-h2)",
                  fontWeight: "var(--font-weight-display)",
                  lineHeight: "var(--text-h2-lh)",
                }}
              >
                ورود
              </h1>
              <p className="text-grey-600 text-body-large leading-body-large">
                شماره موبایل یا ایمیل خود را وارد کنید
              </p>
            </div>

            {/* Form */}
            <form
              className="space-y-3"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <div>
                <div className="relative">
                  <Input
                    id="phone"
                    type="text"
                    value={phone}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      const normalizedValue =
                        convertPersianToEnglishDigits(inputValue);
                      setPhone(normalizedValue);
                    }}
                    placeholder="موبایل / ایمیل "
                    className="w-full rounded-3xl pr-4 pl-4 py-6 border bg-white text-grey-900 placeholder-grey-500 transition-all focus:ring-2 focus:ring-brand-primary/20 focus:outline-none ltr  border-grey-300 focus:border-brand-primary text-center!"
                    maxLength={32}
                  />
                </div>
              </div>

              <div>
                {/* Anti-autofill fake fields */}
                <input
                  type="text"
                  name="username"
                  autoComplete="username"
                  style={{ display: "none" }}
                />
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  style={{ display: "none" }}
                />

                <div className="relative">
                  <Input
                    id="password"
                    name="fake-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    maxLength={12}
                    placeholder="رمز عبور"
                    autoComplete="new-password"
                    onChange={handlePasswordChange}
                    dir="ltr"
                    className="w-full pr-4 pl-12 rounded-l-lg text-lg leading-2 py-6 border border-grey-300 bg-white! text-grey-900 placeholder-grey-500 transition-all focus:border-brand-secondary focus:ring-2 focus:ring-brand-secondary/20 focus:outline-none text-center! !placeholder:text-center"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-grey-400 hover:text-grey-600 transition-colors"
                    aria-label={
                      showPassword ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {warning && (
                  <p className="text-red-400 mt-2 text-xs">{warning}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 px-4 cursor-pointer flex items-center justify-center gap-2  text-white font-medium text-base rounded-lg border-none  bg-brand-primary hover:opacity-90 border-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>در حال پردازش...</span>
                  </>
                ) : (
                  <span>تایید</span>
                )}
              </button>

              {/* Password login link */}
              <div className="text-center mt-3">
                <span className="text-grey-600 text-base">
                  {/* حساب کاربری ندارید؟ */}
                  <button
                    type="button"
                    onClick={() => router.push("/auth/register")}
                    className="hover:opacity-80 border-0 text-base text-primary p-0 cursor-pointer active:opacity-60 mr-2"
                  >
                    ثبت نام
                  </button>
                  <span className="mx-3 text-secondary">|</span>
                  <button
                    type="button"
                    onClick={() => router.push("/auth/forgot-pass")}
                    className="hover:opacity-80 border-0 text-base text-primary p-0 cursor-pointer active:opacity-60 mr-2"
                  >
                    فراموشی رمز عبور
                  </button>
                </span>
              </div>
            </form>
          </div>

          {/* Back to Landing */}
          <div className="flex justify-end mt-6 mr-0 mb-0 ml-0">
            <button
              onClick={() => router.push("/")}
              className="text-grey-600 hover:text-grey-800 text-sm font-medium transition-colors flex items-center gap-2 self-center cursor-pointer text-center"
            >
              بازگشت به صفحه اصلی
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-end justify-center mt-8">
        <p
          className="text-grey-500"
          style={{ fontSize: "var(--text-caption)" }}
        >
          © {persianYear} تمام حقوق سایت متعلق به شرکت آیه است.
        </p>
      </div>
    </div>
  );
}

export default LoginClient;
