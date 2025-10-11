"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import PageLoader from "@/components/pageLoader";
import { useRouter } from "next/navigation";
import { API_ROUTES } from "@/constants/apiRoutes";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  // [key: string]: any;
  token: string;
}

type LoginResponse =
  | { success: true; user: any }
  | { success: false; status: number | null; message: string };

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (identity: string, password: string) => Promise<LoginResponse>;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // setup axios defaults
  axios.defaults.withCredentials = true;

  // Fetch user info when app loads
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const savedUser = localStorage.getItem("user");
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    console.log("AuthContext check user");

    setLoading(false);
  }, []);

  //  Refresh token if access token expired
  const refreshAccessToken = async () => {
    try {
      const res = await axios.post(
        API_ROUTES.AUTH.REFRESH,
        {},
        { withCredentials: true }
      );
      if (res.data?.user) {
        setUser(res.data.user);
        return;
      }
      // optional: get user info after refresh
      // const me = await axios.get(API_ROUTES.auth_me, { withCredentials: true });
      // setUser(me.data.user);
    } catch (error) {
      console.error("Refresh token failed:", error);
      setUser(null);
      router.push("/auth/login");
    }
  };

  //  Login handler
  const login = async (
    identity: string,
    password: string
  ): Promise<LoginResponse> => {
    try {
      // console.log("login api path: ", API_ROUTES.AUTH.LOGIN);
      const res = await axios.post(API_ROUTES.AUTH.LOGIN, {
        identity,
        password,
      });
      // console.log("sara  : ", res.data.data);

      // const { access_token, refresh_token } = res.data;

      localStorage.setItem("access_token", res.data.data.access_token);
      localStorage.setItem("refresh_token", res.data.data.refresh_token);
      const user: User = {
        id: res.data.data.id,
        name: "",
        email: res.data.data.email,
        phone: res.data.data.phone,
        token: res.data.data.access_token,
      };

      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);

      return { success: true, user };
    } catch (err: any) {
      console.log("err: ", err);

      if (err.response) {
        console.log("login err response: ", err.response);
        if (err.response.status === 401) {
          return {
            success: false,
            status: 401,
            message: "اطلاعات ورود نادرست است",
          };
        }
        if (err.response.status === 403) {
          return {
            success: false,
            status: 403,
            message: "لازم است شماره موبایل خود را تایید کنید",
          };
        }

        return {
          success: false,
          status: err.response.status,
          message: err.response.data?.message || "خطای ناشناخته از سرور",
        };
      } else {
        return {
          success: false,
          status: null,
          message: err.message || "خطای شبکه",
        };
      }
    }
  };

  //  Logout handler
  const logout = async () => {
    try {
      await axios.post(API_ROUTES.AUTH.LOGOUT, {}, { withCredentials: true });
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      setUser(null);

      router.push("/auth/login");
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    refreshAccessToken,
  };

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
