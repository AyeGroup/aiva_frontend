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
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: any) => Promise<void>;
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

  // 🔹 Fetch user info when app loads
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const savedUser = localStorage.getItem("user");
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const response = await axios.get(API_ROUTES.auth_me, {
  //         withCredentials: true,
  //       });
  //       setUser(response.data.user);
  //     } catch (err) {
  //       console.warn("User not authenticated, trying refresh...");
  //       await refreshAccessToken();
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   checkAuth();
  // }, []);

  // 🔹 Refresh token if access token expired
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

  // 🔹 Login handler
  const login = async (data: any) => {
    const response = await axios.post(API_ROUTES.AUTH.LOGIN, data, {
      withCredentials: true,
    });
    setUser(response.data.user);
    router.push("/dashboard");
  };

  // 🔹 Logout handler
  const logout = async () => {
    try {
      await axios.post(API_ROUTES.AUTH.LOGOUT, {}, { withCredentials: true });
    } finally {
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
