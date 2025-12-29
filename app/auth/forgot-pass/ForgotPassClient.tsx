"use client";

import React, { useState } from "react";
import { Input } from "@/components/input";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { API_ROUTES } from "@/constants/apiRoutes";
import {
  LoginTopLeft,
  LoginTopRight,
  RegisterTopLeft,
} from "@/public/icons/AppIcons";
import Link from "next/link";
import Image from "next/image";
import axiosInstance from "@/lib/axiosInstance";

export default function ForgotPassClient() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    if (!isValidEmail(email)) {
      setError("لطفاً ایمیل معتبر وارد کنید");
      return;
    }
    setLoading(true);

    try {
      const res = await axiosInstance.post(API_ROUTES.AUTH.FORGOT_PASSWORD, {
        email,
      });

      if (res.status === 200) {
        setMessage(res?.data?.message || "لینک بازیابی رمز عبور به ایمیل شما ارسال شد.");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "خطا در ارسال ایمیل");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page min-h-screen relative overflow-hidden">
      {/* Header */}
      <div className="relative z-50 w-full p-2">
        <div className="container mx-auto flex justify-between items-center">
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
              <p className="text-grey-500 text-sm">دستیار هوشمند کسب‌وکار تو</p>
            </div>
          </Link>

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

      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
      <div className="absolute left-8 top-2/3 transform -translate-y-1/2 w-72 h-72 opacity-15">
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

      {/* Card */}
      <div className="flex justify-center items-start min-h-[80vh]">
        <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <h1 className="text-center text-xl font-bold">فراموشی رمز عبور </h1>

            <Input
              type="email"
              placeholder="ایمیل خود را وارد کنید"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {error && (
              <p className="text-sm text-center text-red-500">{error}</p>
            )}
            {message && (
              <p className="text-sm text-center text-primary">{message}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-white rounded-lg bg-primary"
            >
              {loading ? "در حال ارسال..." : "ارسال لینک"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
