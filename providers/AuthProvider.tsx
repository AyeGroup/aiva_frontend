"use client";
import Cookies from "js-cookie";

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import PageLoader from "@/components/pageLoader";
import { useRouter, usePathname } from "next/navigation";
import { API_ROUTES } from "@/constants/apiRoutes";
import { jwtDecode } from "jwt-decode";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  token: string;
  role?: string;
}

type LoginResponse =
  | { success: true; user: User }
  | { success: false; status: number | null; message: string };

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (identity: string, password: string) => Promise<LoginResponse>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// مسیرهای عمومی که نیاز به لاگین ندارند
const PUBLIC_ROUTES = [
  "/auth/login",
  "/auth/register",
  "/auth/reset-pass",
  "/auth/forgot-pass",
  "/",
  "verification",
];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // چک کردن اینکه مسیر فعلی عمومی است یا خیر
  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  useEffect(() => {
    const handleLogout = () => {
      router.push("/auth/login");
    };
    window.addEventListener("auth-logout", handleLogout);
    return () => window.removeEventListener("auth-logout", handleLogout);
  }, [router]);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("accessToken");
      const savedUser = localStorage.getItem("user");

      if (token && savedUser) {
        try {
          // بررسی اعتبار token
          const decoded: any = jwtDecode(token);
          const currentTime = Date.now() / 1000;

          if (decoded.exp && decoded.exp < currentTime) {
            // Token منقضی شده
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user");

            if (!isPublicRoute) {
              router.replace("/auth/login");
            }
          } else {
            // Token معتبر است
            setUser(JSON.parse(savedUser));

            // اگر کاربر لاگین کرده و می‌خواد به صفحه login/register بره
            if (pathname === "/auth/login" || pathname === "/auth/register") {
              router.replace("/dashboard");
            }
          }
        } catch (error) {
          console.error("Error decoding token:", error);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("user");

          if (!isPublicRoute) {
            router.replace("/auth/login");
          }
        }
      } else {
        // Token وجود ندارد
        if (!isPublicRoute) {
          router.replace("/auth/login");
        }
      }

      setLoading(false);
    };

    checkAuth();
  }, [pathname, isPublicRoute, router]);

  const login = async (
    identity: string,
    password: string
  ): Promise<LoginResponse> => {
    try {
      const res = await axios.post(API_ROUTES.AUTH.LOGIN, {
        identity,
        password,
      });

      const data = res.data.data;
      localStorage.setItem("accessToken", data.access_token);
      localStorage.setItem("refreshToken", data.refresh_token);

      const payload: any = jwtDecode(data.access_token);
      const user: User = {
        id: data.id,
        name: data.name || "",
        role: payload.role || "user",
        email: data.email,
        phone: data.phone || identity,
        token: data.access_token,
      };

      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      Cookies.set("role", payload.role, { expires: 7 });
      Cookies.set("accessToken", data.access_token, { expires: 7 });

      return { success: true, user };
    } catch (err: any) {
      console.error("Login error:", err);

      const status = err.response?.status ?? null;
      let message = "خطای ناشناخته از سرور";

      if (status === 401) message = "اطلاعات ورود نادرست است";
      else if (status === 403) message = "لطفاً شماره موبایل خود را تایید کنید";
      else if (err.message) message = err.message;

      return { success: false, status, message };
    }
  };

  const logout = async () => {
    try {
      // localStorage.removeItem("accessToken");
      // localStorage.removeItem("refreshToken");
      // localStorage.removeItem("aiva-onboarding-data");
      // localStorage.removeItem("selectedPlan");
      // localStorage.removeItem("lastInvoiceId");
      // localStorage.removeItem("invoice-undefined");
      localStorage.clear();
      sessionStorage.clear();
      setUser(null);
      router.push("/auth/login");
    } catch {
      /* ignore logout errors */
    }
  };

  const value: AuthContextType = { user, loading, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <PageLoader />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
