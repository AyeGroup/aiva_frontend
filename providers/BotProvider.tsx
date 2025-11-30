"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { useAuth } from "./AuthProvider";
import { BotConfig } from "@/types/common";
import { API_ROUTES } from "@/constants/apiRoutes";
import axiosInstance from "@/lib/axiosInstance";

interface BotContextType {
  bots: BotConfig[];
  currentBot: BotConfig | null;
  loading: boolean;
  setCurrentBot: (bot: BotConfig) => void;
  refreshBots: () => Promise<void>;
}

const BotContext = createContext<BotContextType | undefined>(undefined);

export const BotProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [bots, setBots] = useState<BotConfig[]>([]);
  const [currentBot, setCurrentBot] = useState<BotConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const hasFetchedRef = useRef(false);

  const fetchBots = useCallback(async () => {
    if (!user) return;

    try {
      const response = await axiosInstance.get(API_ROUTES.BOTS.GET);

      if (response.status !== 200 || !response.data?.data) {
        console.warn("Unexpected bots API response:", response);
        setLoading(false);
        return;
      }

      const userBots: BotConfig[] = response.data.data;
      setBots(userBots);

      setCurrentBot((prev) => {
        if (userBots.length === 0) return null;

        if (prev && userBots.find((b) => b.uuid === prev.uuid)) {
          return prev;
        }

        return userBots[0];
      });
    } catch (error) {
      console.error("Failed to fetch bots:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      if (!hasFetchedRef.current) {
        hasFetchedRef.current = true;
        setLoading(true);
        fetchBots();
      }
    } else {
      hasFetchedRef.current = false;
      setBots([]);
      setCurrentBot(null);
      setLoading(false);
    }
  }, [user, fetchBots]);

  const refreshBots = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      const response = await axiosInstance.get(API_ROUTES.BOTS.GET);

      if (response.status === 200 && response.data?.data) {
        const userBots: BotConfig[] = response.data.data;
        setBots(userBots);

        setCurrentBot((prev) => {
          if (userBots.length === 0) return null;

          const found = prev
            ? userBots.find((b) => b.uuid === prev.uuid)
            : null;

          return found || userBots[0];
        });
      }
    } catch (err) {
      console.error("Failed to refresh bots:", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const value = useMemo(
    () => ({ bots, currentBot, loading, setCurrentBot, refreshBots }),
    [bots, currentBot, loading, refreshBots]
  );

  return <BotContext.Provider value={value}>{children}</BotContext.Provider>;
};

export const useBot = () => {
  const context = useContext(BotContext);
  if (!context) throw new Error("useBot must be used within a BotProvider");
  return context;
};
