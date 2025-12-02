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
  botLoading: boolean;
  setCurrentBot: (bot: BotConfig) => void;
  refreshBots: () => Promise<void>;
  setBotLoading: (value: boolean) => void;
}

const BotContext = createContext<BotContextType | undefined>(undefined);

export const BotProvider = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  const [bots, setBots] = useState<BotConfig[]>([]);
  const [currentBot, setCurrentBot] = useState<BotConfig | null>(null);
  const [botLoading, setBotLoading] = useState(false);
  const hasFetchedRef = useRef(false);

  const fetchBots = useCallback(async () => {
    if (!user) return;

    try {
      setBotLoading(true);

      const response = await axiosInstance.get(API_ROUTES.BOTS.GET);

      if (response.status !== 200 || !response.data?.data) {
        console.warn("Unexpected bots API response:", response);
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
      setBotLoading(false);
    }
  }, [user]);

  useEffect(() => {
    // منتظر بمان تا loading از useAuth تمام شود
    if (loading) return;

    if (user) {
      // اگر کاربر لاگین است و هنوز fetch نشده
      if (!hasFetchedRef.current) {
        hasFetchedRef.current = true;
        fetchBots();
      }
    } else {
      // اگر کاربر لاگین نیست، همه چیز را ریست کن
      hasFetchedRef.current = false;
      setBots([]);
      setCurrentBot(null);
    }
  }, [user, loading, fetchBots]);

  const refreshBots = useCallback(async () => {
    if (!user) return;

    try {
      setBotLoading(true);
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
      setBotLoading(false);
    }
  }, [user]);

  const value = useMemo(
    () => ({
      bots,
      currentBot,
      botLoading,
      setCurrentBot,
      refreshBots,
      setBotLoading,
    }),
    [bots, currentBot, botLoading, refreshBots]
  );

  return <BotContext.Provider value={value}>{children}</BotContext.Provider>;
};

export const useBot = () => {
  const context = useContext(BotContext);
  if (!context) throw new Error("useBot must be used within a BotProvider");
  return context;
};
// "use client";

// import {
//   createContext,
//   useContext,
//   useState,
//   ReactNode,
//   useEffect,
//   useCallback,
//   useMemo,
//   useRef,
// } from "react";
// import { useAuth } from "./AuthProvider";
// import { BotConfig } from "@/types/common";
// import { API_ROUTES } from "@/constants/apiRoutes";
// import axiosInstance from "@/lib/axiosInstance";

// interface BotContextType {
//   bots: BotConfig[];
//   currentBot: BotConfig | null;
//   isLoading: boolean;
//   botLoading: boolean;

//   setCurrentBot: (bot: BotConfig) => void;
//   refreshBots: () => Promise<void>;
//   setBotLoading: (value: boolean) => void;
// }

// const BotContext = createContext<BotContextType | undefined>(undefined);

// export const BotProvider = ({ children }: { children: ReactNode }) => {
//   const { user,loading} = useAuth();
//   const [bots, setBots] = useState<BotConfig[]>([]);
//   const [currentBot, setCurrentBot] = useState<BotConfig | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [botLoading, setBotLoading] = useState(false);
//   const hasFetchedRef = useRef(false);

//   const fetchBots = useCallback(async () => {
//     if (!user) return;

//     try {
//       setBotLoading(true);

//       const response = await axiosInstance.get(API_ROUTES.BOTS.GET);

//       if (response.status !== 200 || !response.data?.data) {
//         console.warn("Unexpected bots API response:", response);
//         setIsLoading(false);
//         return;
//       }

//       const userBots: BotConfig[] = response.data.data;
//       setBots(userBots);

//       setCurrentBot((prev) => {
//         if (userBots.length === 0) return null;

//         if (prev && userBots.find((b) => b.uuid === prev.uuid)) {
//           return prev;
//         }

//         return userBots[0];
//       });
//     } catch (error) {
//       console.error("Failed to fetch bots:", error);
//     } finally {
//       setIsLoading(false);
//       setBotLoading(false);
//     }
//   }, [user]);

//   useEffect(() => {
//     if (user) {
//       if (!hasFetchedRef.current) {
//         hasFetchedRef.current = true;
//         setIsLoading(true);
//         fetchBots();
//       }
//     } else {
//       hasFetchedRef.current = false;
//       setBots([]);
//       setCurrentBot(null);
//       setIsLoading(false);
//     }
//   }, [user, fetchBots]);

//   const refreshBots = useCallback(async () => {
//     if (!user) return;

//     try {
//       setBotLoading(true);
//       setIsLoading(true);
//       const response = await axiosInstance.get(API_ROUTES.BOTS.GET);

//       if (response.status === 200 && response.data?.data) {
//         const userBots: BotConfig[] = response.data.data;
//         setBots(userBots);

//         setCurrentBot((prev) => {
//           if (userBots.length === 0) return null;

//           const found = prev
//             ? userBots.find((b) => b.uuid === prev.uuid)
//             : null;

//           return found || userBots[0];
//         });
//       }
//     } catch (err) {
//       console.error("Failed to refresh bots:", err);
//     } finally {
//       setIsLoading(false);
//       setBotLoading(false);
//     }
//   }, [user]);

//   const value = useMemo(
//     () => ({
//       bots,
//       currentBot,
//       botLoading,
//       isLoading,
//       setCurrentBot,
//       refreshBots,
//       setBotLoading,
//     }),
//     [bots, currentBot, botLoading, refreshBots]
//   );

//   return <BotContext.Provider value={value}>{children}</BotContext.Provider>;
// };

// export const useBot = () => {
//   const context = useContext(BotContext);
//   if (!context) throw new Error("useBot must be used within a BotProvider");
//   return context;
// };
