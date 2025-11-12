"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useAuth } from "./AuthProvider";
import { API_ROUTES } from "@/constants/apiRoutes";
import { BotConfig } from "@/types/common";
import axiosInstance from "@/lib/axiosInstance";
console.log("✅ BotProvider rendered");

interface BotContextType {
  bots: BotConfig[];
  currentBot: BotConfig | null;
  setCurrentBot: (bot: BotConfig) => void;
  refreshBots: () => Promise<void>;
}

const BotContext = createContext<BotContextType | undefined>(undefined);

export const BotProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [bots, setBots] = useState<BotConfig[]>([]);
  const [currentBot, setCurrentBot] = useState<BotConfig | null>(null);

  // ✅ تابع fetchBots به صورت useCallback برای جلوگیری از ساخت مجدد
  const fetchBots = useCallback(async () => {
    console.log("🐞 fetchBots called", new Date().toISOString());
    if (!user) return;

    try {
      const response = await axiosInstance.get(API_ROUTES.BOTS.GET);

      if (response.status !== 200 || !response.data?.data) {
        console.warn("Unexpected bots API response:", response);
        return;
      }
      console.log("fetchBots");

      const userBots: BotConfig[] = response.data.data;
      setBots(userBots);

      // فقط اگر باتی وجود دارد
      if (userBots.length > 0) {
        // اگر currentBot هنوز انتخاب نشده یا از لیست حذف شده
        if (!currentBot || !userBots.find((b) => b.uuid === currentBot.uuid)) {
          setCurrentBot(userBots[0]);
        }
      } else {
        setCurrentBot(null);
      }
    } catch (error) {
      console.error("Failed to fetch bots:", error);
    }
  }, [user, currentBot]);

  // ✅ اجرای اولیه هنگام ورود کاربر
  useEffect(() => {
      console.log("useEffect");

    if (user) {
      fetchBots();
      console.log("after");
    } else {
      setBots([]);
      setCurrentBot(null);
    }
  }, [user, fetchBots]);

  // ✅ تابع refreshBots هم useCallback شود
  const refreshBots = useCallback(async () => {
      console.log("refreshBots");
    if (!user) return;
    try {
      const response = await axiosInstance.get(API_ROUTES.BOTS.GET);
      if (response.status === 200 && response.data?.data) {
        const userBots: BotConfig[] = response.data.data;
        setBots(userBots);

        if (userBots.length > 0) {
          if (currentBot) {
            const cbot = userBots.find((b) => b.uuid === currentBot.uuid);
            if (cbot) setCurrentBot(cbot);
            else setCurrentBot(userBots[0]);
          } else setCurrentBot(userBots[0]);
        } else setCurrentBot(null);
      }
    } catch (error) {
      console.error("Failed to refresh bots:", error);
    }
  }, [user, currentBot]);

  // ✅ فقط زمانی value تغییر کند که واقعاً یکی از مقادیر تغییر کرده باشد
  const value = useMemo(
    () => ({ bots, currentBot, setCurrentBot, refreshBots }),
    [bots, currentBot, refreshBots]
  );

  return <BotContext.Provider value={value}>{children}</BotContext.Provider>;
};

// ✅ هوک مخصوص دسترسی به context
export const useBot = () => {
  const context = useContext(BotContext);
  if (!context) throw new Error("useBot must be used within a BotProvider");
  return context;
};
