"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import {
  LoginTopLef2,
  LoginTopLeft,
  LoginTopLeft3,
  LoginTopRight,
} from "@/public/icons/AppIcons";
import {
  convertPersianToEnglishDigits,

} from "@/utils/common";

function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

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
    const identity = phone.trim();
    console.log("login ", identity);
    if (!isValidEmail(identity) && !isValidPhone(identity)) {
      toast.error("لطفاً شماره موبایل یا ایمیل معتبر وارد کنید");
      return;
    }
    // if (!isValidPhone(identity)) {
      // identity = user?.phone || "";
    // }
    try {
      setIsLoading(true);
      const res = await login(identity, password);
      if (!res.success) {
        toast.error(res.message);
        if (res.status === 403) {
          router.push(`/auth/verification?phone=${identity}`);
          return;
        }
      }
      // toast.success("ورود موفق!");
      console.log("redirecting dashboard ...");
      router.push("/dashboard");
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
      <div className="relative z-50 w-full p-2 pb-0">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo - Right Side */}
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="آیوا"
                width={80}
                height={80}
                // className=" object-cover"
                priority={true}
              />
              <div className="flex flex-col">
                <span className="text-grey-900 font-semibold text-xl text-right   text-[24px]">
                  آیوا
                </span>
                <p className="text-grey-500 text-sm">
                  دستیار هوشمند کسب و کار تو
                </p>
              </div>
            </div>

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
      <div className="relative z-10 min-h-[calc(100vh-120px)] flex items-center justify-center p-2 pt-4 pb-16">
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
            {/* <form className="space-y-3" onSubmit={handleSubmit}> */}
            {/* Phone Field with prefix */}
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div>
                <div className="relative">
                  {/* {!phone && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-grey-400 pointer-events-none z-10">
                      <span className="text-grey-400">موبایل / ایمیل </span>
                    </div>
                  )} */}
                  <Input
                    id="phone"
                    type="text"
                    value={phone}
                    // onChange={(e) => setPhone(e.target.value)}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      const normalizedValue =
                        convertPersianToEnglishDigits(inputValue);
                      setPhone(normalizedValue);
                    }}
                    placeholder="موبایل / ایمیل "
                    className="w-full rounded-3xl pr-4 pl-4 py-6 border bg-white text-grey-900 placeholder-grey-500 transition-all focus:ring-2 focus:ring-brand-primary/20 focus:outline-none ltr  border-grey-300 focus:border-brand-primary !text-center"
                    maxLength={32}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="relative">
                  {/* {!password && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-grey-400 pointer-events-none z-10 text-sm">
                      <span className="text-grey-400">رمز عبور</span>
                    </div>
                  )} */}
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    placeholder="رمز عبور"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pr-4 pl-12 rounded-l-lg text-lg leading-2 py-6 border border-grey-300 !bg-white text-grey-900 placeholder-grey-500 transition-all focus:border-brand-secondary focus:ring-2 focus:ring-brand-secondary/20 focus:outline-none !text-center !placeholder:text-center "
                  />
                  {/* Password toggle button */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-grey-400 hover:text-grey-600 transition-colors"
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
                <p className="text-grey-600 text-right text-sm">
                  استفاده از آیوا به معنی پذیرش{" "}
                  <button className="hover:opacity-80 text-base active:opacity-60 text-primary">
                    قوانین و مقررات
                  </button>
                  این سرویس است.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                // onClick={handleSubmit}
                disabled={isLoading}
                className="w-full py-4 px-4 flex items-center justify-center gap-2  text-white font-medium text-base rounded-lg border-none  bg-brand-primary hover:opacity-90 border-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>در حالّ پردازش...</span>
                  </>
                ) : (
                  <span>تایید</span>
                )}
              </button>

              {/* Password login link */}
              <div className="text-center mt-3">
                <span className="text-grey-600 text-base">
                  حساب کاربری ندارید؟
                  <button
                    type="button"
                    onClick={() => router.push("/auth/register")}
                    className="hover:opacity-80 border-0 text-base text-primary p-0 cursor-pointer active:opacity-60"
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
              onClick={() => router.push("/")}
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
            <button className="hover:text-grey-700 transition-colors border-0">
              سیاست حفظ حریم خصوصی
            </button>
          </p>
        </div>
      </div>

      {/* <Toaster position="top-center" dir="rtl" richColors closeButton /> */}
    </div>
    //   </div>
    // </div>
  );
}

export default Login;
