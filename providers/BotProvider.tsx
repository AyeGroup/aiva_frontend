// providers/BotProvider.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useAuth } from "./AuthProvider"; // فرض می‌کنیم AuthProvider چنین هوکی دارد
import axiosInstance from "@/lib/axiosInstance";
import { API_ROUTES } from "@/constants/apiRoutes";

// تعریف نوع بات
export interface Bot {
  uuid: string;
  name: string;
  isDefault: boolean;
}

// نوع Context
interface BotContextType {
  bots: Bot[];
  currentBot: Bot | null;
  setCurrentBot: (bot: Bot) => void;
}

const BotContext = createContext<BotContextType | undefined>(undefined);

// Provider
export const BotProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth(); // گرفتن اطلاعات کاربر از AuthProvider
  const [bots, setBots] = useState<Bot[]>([]);
  const [currentBot, setCurrentBot] = useState<Bot | null>(null);

  useEffect(() => {
    if (!user) return;

    let isMounted = true;

    const fetchBots = async () => {
      try {
        const response = await axiosInstance.get(API_ROUTES.BOTS.GET);

        if (response.status !== 200 || !response.data?.data) {
          console.warn("Unexpected bots API response:", response);
          return;
        }

        const userBots: Bot[] = response.data.data;

        if (!isMounted) return;

        setBots(userBots);

        // انتخاب بات پیش‌فرض
        const defaultBot =
          userBots.find((b) => b.isDefault) ?? userBots[0] ?? null;
        setCurrentBot(defaultBot);
      } catch (error) {
        console.error("Failed to fetch bots:", error);
      }
    };

    fetchBots();

    // Cleanup
    return () => {
      isMounted = false;
    };
  }, [user]);

  return (
    <BotContext.Provider value={{ bots, currentBot, setCurrentBot }}>
      {children}
    </BotContext.Provider>
  );
};

// هوک برای دسترسی راحت به Context
export const useBot = () => {
  const context = useContext(BotContext);
  if (!context) throw new Error("useBot must be used within a BotProvider");
  return context;
};
