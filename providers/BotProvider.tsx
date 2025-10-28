"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useAuth } from "./AuthProvider";
import { API_ROUTES } from "@/constants/apiRoutes";
import { BotConfig } from "@/types/common";
import axiosInstance from "@/lib/axiosInstance";

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

        const userBots: BotConfig[] = response.data.data;
        if (!isMounted) return;

        setBots(userBots);

        // فقط اگر باتی وجود دارد
        if (userBots.length > 0) {
          setCurrentBot(userBots[0]);
        } else {
          setCurrentBot(null);
        }
      } catch (error) {
        console.error("Failed to fetch bots:", error);
      }
    };

    fetchBots();

    return () => {
      isMounted = false;
    };
  }, [user]);

  // useEffect(() => {
  //   if (!user) return;

  //   let isMounted = true;

  //   const fetchBots = async () => {
  //     try {
  //       const response = await axiosInstance.get(API_ROUTES.BOTS.GET);

  //       if (response.status !== 200 || !response.data?.data) {
  //         console.warn("Unexpected bots API response:", response);
  //         return;
  //       }

  //       const userBots: BotConfig[] = response.data.data;
  //       if (!isMounted) return;
  //       setBots(userBots);

  //       // انتخاب بات پیش‌فرض
  //       const defaultBot = userBots[0] ?? null;
  //       setCurrentBot(defaultBot);
  //     } catch (error) {
  //       console.error("Failed to fetch bots:", error);
  //     }
  //   };

  //   fetchBots();

  //   // Cleanup
  //   return () => {
  //     isMounted = false;
  //   };
  // }, [user]);

  const refreshBots = async () => {
    if (!user) return;
    try {
      const response = await axiosInstance.get(API_ROUTES.BOTS.GET);
      if (response.status === 200 && response.data?.data) {
        const userBots: BotConfig[] = response.data.data;
        setBots(userBots);

        if (userBots.length > 0) {
          if (
            !currentBot ||
            !userBots.find((b) => b.uuid === currentBot.uuid)
          ) {
            setCurrentBot(userBots[0]);
          }
        } else {
          setCurrentBot(null);
        }
      }
    } catch (error) {
      console.error("Failed to refresh bots:", error);
    }
  };

  // const refreshBots = async () => {
  //   if (!user) return;
  //   try {
  //     const response = await axiosInstance.get(API_ROUTES.BOTS.GET);
  //     if (response.status === 200 && response.data?.data) {
  //       const userBots: BotConfig[] = response.data.data;
  //       setBots(userBots);
  //       if (!currentBot || !userBots.find((b) => b.uuid === currentBot.uuid)) {
  //         const defaultBot = userBots[0] ?? null;
  //         setCurrentBot(defaultBot);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Failed to refresh bots:", error);
  //   }
  // };

  return (
    <BotContext.Provider
      value={{ bots, currentBot, setCurrentBot, refreshBots }}
    >
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
