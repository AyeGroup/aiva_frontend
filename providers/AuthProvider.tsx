"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import API from "@/lib/api";
import { API_ROUTES } from "@/constants/apiRoutes";
import axios from "axios";

type User = {
  id: string;
  email: string;
  name?: string;
  token: string;
};

type LoginResponse =
  | { success: true; user: any }
  | { success: false; status: number | null; message: string };

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (identity: string, password: string) => Promise<LoginResponse>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const savedUser = localStorage.getItem("user");
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    console.log("AuthContext check user");
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/auth/me");
      setUser(res.data);
    } catch {
      setUser(null);
    }
  };

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
        id: identity,
        name: "",
        email: "",
        token: res.data.data.access_token,
      };

      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);

      return { success: true, user };
    } catch (err: any) {
      console.log("err: ", err);

      if (err.response) {
        console.log("mmm: ", err.response);
        if (err.response.status === 401) {
          return {
            success: false,
            status: 401,
            message: "اطلاعات ورود نادرست است",
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

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
    window.location.href = "/auth/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
