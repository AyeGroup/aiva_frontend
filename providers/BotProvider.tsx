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
import { API_ROUTES } from "@/constants/apiRoutes";
import { BotConfig } from "@/types/common";
import axiosInstance from "@/lib/axiosInstance";
// console.log("✅ BotProvider rendered");

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
  const hasFetchedRef = useRef(false); // ✅ جلوگیری از fetch مجدد

  // ✅ تابع fetchBots بدون currentBot در dependency
  const fetchBots = useCallback(async () => {
    // console.log("BotProvider> fetchBots", new Date().toISOString());
    if (!user) return;

    try {
      const response = await axiosInstance.get(API_ROUTES.BOTS.GET);

      if (response.status !== 200 || !response.data?.data) {
        console.warn("Unexpected bots API response:", response);
        return;
      }
      // console.log("fetchBots");

      const userBots: BotConfig[] = response.data.data;
      setBots(userBots);

      // ✅ از functional update استفاده می‌کنیم
      setCurrentBot((prev) => {
        if (userBots.length === 0) return null;

        // اگر currentBot قبلی هنوز در لیست هست، همون رو نگه دار
        if (prev && userBots.find((b) => b.uuid === prev.uuid)) {
          return prev;
        }

        // در غیر این صورت اولین بات رو انتخاب کن
        return userBots[0];
      });
    } catch (error) {
      console.error("Failed to fetch bots:", error);
    }
  }, [user]); // ✅ فقط user در dependency

  // ✅ useEffect فقط یک بار هنگام تغییر user اجرا میشه
  useEffect(() => {
    // console.log("BotProvider> useEffect");

    if (user) {
      // ✅ فقط اگر قبلاً fetch نشده باشد
      if (!hasFetchedRef.current) {
        hasFetchedRef.current = true;
        fetchBots();
      }
    } else {
      hasFetchedRef.current = false; // ✅ reset هنگام logout
      setBots([]);
      setCurrentBot(null);
    }
  }, [user, fetchBots]); // این دیگه infinite loop نداره

  // ✅ تابع refreshBots هم بدون currentBot
  const refreshBots = useCallback(async () => {
    // console.log("BotProvider> refreshBots");
    if (!user) return;

    try {
      const response = await axiosInstance.get(API_ROUTES.BOTS.GET);
      if (response.status === 200 && response.data?.data) {
        const userBots: BotConfig[] = response.data.data;
        setBots(userBots);

        // ✅ از functional update استفاده می‌کنیم
        setCurrentBot((prev) => {
          if (userBots.length === 0) return null;

          if (prev) {
            const found = userBots.find((b) => b.uuid === prev.uuid);
            return found || userBots[0];
          }

          return userBots[0];
        });
      }
    } catch (error) {
      console.error("Failed to refresh bots:", error);
    }
  }, [user]); // ✅ فقط user در dependency

  // ✅ value فقط با تغییر واقعی مقادیر تغییر می‌کنه
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
// console.log("✅ BotProvider rendered");

// interface BotContextType {
//   bots: BotConfig[];
//   currentBot: BotConfig | null;
//   setCurrentBot: (bot: BotConfig) => void;
//   refreshBots: () => Promise<void>;
// }

// const BotContext = createContext<BotContextType | undefined>(undefined);

// export const BotProvider = ({ children }: { children: ReactNode }) => {
//   const { user } = useAuth();
//   const [bots, setBots] = useState<BotConfig[]>([]);
//   const [currentBot, setCurrentBot] = useState<BotConfig | null>(null);

//   // ✅ تابع fetchBots بدون currentBot در dependency
//   const fetchBots = useCallback(async () => {
//     console.log("BotProvider> fetchBots", new Date().toISOString());
//     if (!user) return;

//     try {
//       const response = await axiosInstance.get(API_ROUTES.BOTS.GET);

//       if (response.status !== 200 || !response.data?.data) {
//         console.warn("Unexpected bots API response:", response);
//         return;
//       }
//       console.log("fetchBots");

//       const userBots: BotConfig[] = response.data.data;
//       setBots(userBots);

//       // ✅ از functional update استفاده می‌کنیم
//       setCurrentBot((prev) => {
//         if (userBots.length === 0) return null;

//         // اگر currentBot قبلی هنوز در لیست هست، همون رو نگه دار
//         if (prev && userBots.find((b) => b.uuid === prev.uuid)) {
//           return prev;
//         }

//         // در غیر این صورت اولین بات رو انتخاب کن
//         return userBots[0];
//       });
//     } catch (error) {
//       console.error("Failed to fetch bots:", error);
//     }
//   }, [user]); // ✅ فقط user در dependency

//   // ✅ useEffect فقط یک بار هنگام تغییر user اجرا میشه
//   useEffect(() => {
//     console.log("BotProvider> useEffect");

//     if (user) {
//       fetchBots();
//     } else {
//       setBots([]);
//       setCurrentBot(null);
//     }
//   }, [user, fetchBots]); // این دیگه infinite loop نداره

//   // ✅ تابع refreshBots هم بدون currentBot
//   const refreshBots = useCallback(async () => {
//     console.log("BotProvider> refreshBots");
//     if (!user) return;

//     try {
//       const response = await axiosInstance.get(API_ROUTES.BOTS.GET);
//       if (response.status === 200 && response.data?.data) {
//         const userBots: BotConfig[] = response.data.data;
//         setBots(userBots);

//         // ✅ از functional update استفاده می‌کنیم
//         setCurrentBot((prev) => {
//           if (userBots.length === 0) return null;

//           if (prev) {
//             const found = userBots.find((b) => b.uuid === prev.uuid);
//             return found || userBots[0];
//           }

//           return userBots[0];
//         });
//       }
//     } catch (error) {
//       console.error("Failed to refresh bots:", error);
//     }
//   }, [user]); // ✅ فقط user در dependency

//   // ✅ value فقط با تغییر واقعی مقادیر تغییر می‌کنه
//   const value = useMemo(
//     () => ({ bots, currentBot, setCurrentBot, refreshBots }),
//     [bots, currentBot, refreshBots]
//   );

//   return <BotContext.Provider value={value}>{children}</BotContext.Provider>;
// };

// // ✅ هوک مخصوص دسترسی به context
// export const useBot = () => {
//   const context = useContext(BotContext);
//   if (!context) throw new Error("useBot must be used within a BotProvider");
//   return context;
// };