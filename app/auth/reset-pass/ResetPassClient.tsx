"use client";

import { useState } from "react";
import { Input } from "@/components/input";
import { API_ROUTES } from "@/constants/apiRoutes";
import axiosInstance from "@/lib/axiosInstance";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LoginTopLeft,
  LoginTopRight,
  RegisterTopLeft,
} from "@/public/icons/AppIcons";

type Props = {
  token: string;
};

type Errors = {
  password?: string;
  confirmPassword?: string;
};

export default function ResetPasswordClient({ token }: Props) {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [warning, setWarning] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [passwordRules, setPasswordRules] = useState<any>(null);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  /* ---------------- password strength ---------------- */

  const checkPasswordStrength = (password: string) => {
    const rules = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      noPersian: !/[آ-ی]/.test(password),
    };

    const score = Object.values(rules).filter(Boolean).length;

    return {
      rules,
      score,
      isStrong: score >= 5,
    };
  };

  /* ---------------- handlers ---------------- */

  const handlePasswordChange = (
    field: "password" | "confirmPassword",
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === "password") {
      const result = checkPasswordStrength(value);
      setPasswordRules(result);

      if (!result.rules.noPersian) {
        setWarning("رمز عبور نباید شامل کاراکتر فارسی باشد");
      } else {
        setWarning("");
      }
    }

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  /* ---------------- validation ---------------- */

  const submitValidation = () => {
    const newErrors: Errors = {};
    const strength = checkPasswordStrength(formData.password);

    if (!strength.isStrong) {
      newErrors.password = "رمز عبور باید قوی باشد";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "تکرار رمز عبور صحیح نیست";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------------- submit ---------------- */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!submitValidation()) return;

    setIsLoading(true);

    try {
      const res = await axiosInstance.post(API_ROUTES.AUTH.RESET_PASSWORD, {
        token,
        new_password: formData.password,
      });

      if (res.status === 200) {
        router.push("/auth/login?reset=success");
      }
    } catch (err: any) {
      setMessage(
        err?.response?.data?.message || "لینک منقضی شده یا نامعتبر است"
      );
    } finally {
      setIsLoading(false);
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
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-28 left-12 w-32 h-32 opacity-20">
          <LoginTopLeft />
        </div>
        <div className="absolute top-20 right-16 w-40 h-40 opacity-15">
          <RegisterTopLeft />
        </div>
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
      <div className="absolute left-8 top-2/3 transform -translate-y-1/2 w-72 h-72 opacity-15">
        <LoginTopRight />
      </div>
      {/* Card */}
      <div className="flex justify-center items-start min-h-[80vh]">
        <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-5">
            <h1 className="text-center text-xl font-bold">رمز عبور جدید</h1>

            {/* password */}
            <div>
              <label className="text-sm">رمز عبور</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    handlePasswordChange("password", e.target.value)
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            {passwordRules && (
              <ul className="text-xs flex flex-wrap gap-2">
                <li
                  className={
                    passwordRules.rules.length
                      ? "text-primary"
                      : "text-secondary"
                  }
                >
                  حداقل ۸ کاراکتر
                </li>
                <li
                  className={
                    passwordRules.rules.uppercase
                      ? "text-primary"
                      : "text-secondary"
                  }
                >
                  حرف بزرگ
                </li>
                <li
                  className={
                    passwordRules.rules.number
                      ? "text-primary"
                      : "text-secondary"
                  }
                >
                  عدد
                </li>
                <li
                  className={
                    passwordRules.rules.special
                      ? "text-primary"
                      : "text-secondary"
                  }
                >
                  کاراکتر خاص
                </li>
              </ul>
            )}
            {/* confirm password */}
            <div>
              <label className="text-sm">تکرار رمز عبور</label>
              <Input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  handlePasswordChange("confirmPassword", e.target.value)
                }
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* password rules */}

            {warning && <p className="text-red-500 text-sm">{warning}</p>}

            {message && <p className="text-red-500 text-sm">{message}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 text-white rounded-lg"
              style={{ backgroundColor: "var(--brand-primary)" }}
            >
              {isLoading ? "در حال ثبت..." : "تأیید"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
