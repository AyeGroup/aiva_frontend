"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { API_ROUTES } from "@/constants/apiRoutes";
import axios from "axios";
import PageLoader from "@/components/pageLoader";
import axiosInstance from "@/lib/axiosInstance";

console.log("✅ AuthProvider rendered");

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  token: string;
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

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  console.log("AuthProvider> ", user);

  // ✅ فقط یکبار ثبت listener
  useEffect(() => {
    console.log("AuthProvider> useEffect ");
    const handleLogout = () => router.push("/auth/login");
    window.addEventListener("auth-logout", handleLogout);
    return () => window.removeEventListener("auth-logout", handleLogout);
  }, [router]);

  // ✅ دریافت اطلاعات از localStorage
  useEffect(() => {
    console.log("AuthProvider> useEffect2 ");

    const token = localStorage.getItem("accessToken");
    const savedUser = localStorage.getItem("user");
    if (token && savedUser) setUser(JSON.parse(savedUser));
    setLoading(false);
  }, []);

  // ✅ useCallback برای جلوگیری از ساخت تابع جدید در هر رندر
  const login = useCallback(
    async (identity: string, password: string): Promise<LoginResponse> => {
      try {
        console.log("AuthProvider> login ");
        const res = await axios.post(API_ROUTES.AUTH.LOGIN, {
          identity,
          password,
        });
        const data = res.data.data;

        const user: User = {
          id: data.id,
          name: data.name || "",
          email: data.email,
          phone: data.phone || identity,
          token: data.access_token,
        };

        localStorage.setItem("accessToken", data.access_token);
        localStorage.setItem("refreshToken", data.refresh_token);
        localStorage.setItem("user", JSON.stringify(user));

        setUser(user);
        return { success: true, user };
      } catch (err: any) {
        const status = err.response?.status ?? null;
        let message = "خطای ناشناخته از سرور";
        if (status === 401) message = "اطلاعات ورود نادرست است";
        else if (status === 403)
          message = "لطفاً شماره موبایل خود را تایید کنید";
        else if (err.message) message = err.message;

        return { success: false, status, message };
      }
    },
    []
  );

  // ✅ useCallback برای logout
  const logout = useCallback(async () => {
    try {
      console.log("AuthProvider> logout ");

      // await axiosInstance.post(API_ROUTES.AUTH.LOGOUT);
      /* ignore logout errors */
      // } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      setUser(null);
      router.push("/auth/login");
    } catch {}
  }, [router]);

  // ✅ useMemo برای جلوگیری از ساخت آبجکت جدید value
  const value = useMemo(
    () => ({ user, loading, login, logout }),
    [user, loading, login, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {!loading ? (
        children
      ) : (
        <div className="text-center p-6">
          <PageLoader />
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
