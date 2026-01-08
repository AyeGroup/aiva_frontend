"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useBot } from "./BotProvider";
import { useAuth } from "./AuthProvider";
import { API_ROUTES } from "@/constants/apiRoutes";
import { usePathname } from "next/navigation";
import { getPlanCodeById } from "@/constants/plans";
import {
  Plan,
  PricingContextType as BasePricingContextType,
} from "@/types/common";
import axios from "axios";
import axiosInstance from "@/lib/axiosInstance";

// Extend the base type to include isFeatureMapReady
type PricingContextType = BasePricingContextType & {
  isFeatureMapReady: boolean;
};

export const PricingContext = createContext<PricingContextType | null>(null);
const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/register",
  "/verification",
  "/reset-pass",
  "/auth/forgot-pass",
];

export const PricingProvider = ({ children }: { children: ReactNode }) => {
  const { currentBot } = useBot();
  const { user, loading: authLoading } = useAuth();
  const [plans, setPlans] = useState<Plan[] | null>(null);
  const [currentPlan, setCurrentPlan] = useState<string | null>(null);
  const [featureMinPlan, setFeatureMinPlan] = useState<Record<string, string>>(
    {}
  );
  const [isFeatureMapReady, setIsFeatureMapReady] = useState(false);
  const pathname = usePathname();
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  // 1) Load pricing ONCE
  useEffect(() => {
    if (isPublicRoute) {
      return;
    }

    if (authLoading) return;
    if (!user) return;
    const fetchPricing = async () => {
      try {
        const res = await axios.get(API_ROUTES.PAYMENT.PRICING);
        const allPlans = res.data?.data?.subscription_plans ?? [];
        setPlans(allPlans);
        // console.log("allPlans", allPlans);
      } catch (error) {
        console.error("Pricing fetch failed:", error);
      }
    };

    fetchPricing();
  }, [authLoading, user, isPublicRoute]);

  // 2) Update user currentPlan WHEN bot changes
  useEffect(() => {
    if (!user) return;
    if (authLoading) return;
    if (!currentBot) return;
    if (isPublicRoute) return;

    const fetchUserPlan = async () => {
      if (!currentBot?.uuid) {
        setCurrentPlan("FREE");
        return;
      }

      try {
        const res = await axiosInstance.get(
          API_ROUTES.FINANCIAL.SUBSCRIPTION(currentBot.uuid)
        );

        const myPlan = getPlanCodeById(res.data?.data?.plan) ?? "FREE";
        setCurrentPlan(myPlan);
      } catch (error) {
        console.error("Failed to fetch user plan:", error);
        setCurrentPlan("FREE");
      }
    };

    fetchUserPlan();
  }, [authLoading, currentBot, user, isPublicRoute]);

  // 3) Build feature → minPlan map
  useEffect(() => {
    if (!plans) {
      setIsFeatureMapReady(false);
      return;
    }

    const planOrder = ["FREE", "BASIC", "MEDIUM", "ADVANCE", "ENTERPRISE"];
    const map: Record<string, string> = {};

    for (const plan of planOrder) {
      const p = plans.find((x) => x.plan === plan);
      if (!p) continue;

      p.features.forEach((feature) => {
        if (!map[feature]) {
          map[feature] = plan;
        }
      });
    }
    setFeatureMinPlan(map);
    setIsFeatureMapReady(true);
    // console.log("FeatureMinPlan: ", map);
  }, [plans]);

  return (
    <PricingContext.Provider
      value={{
        plans,
        currentPlan,
        setCurrentPlan,
        featureMinPlan,
        isFeatureMapReady,
      }}
    >
      {children}
    </PricingContext.Provider>
  );
};

// HOOKS
export const usePricing = () => {
  const context = useContext(PricingContext);

  if (!context) {
    throw new Error("usePricing must be used inside PricingProvider");
  }

  return context;
};

export const useFeatureAccess = (bot_uuid?: string, feature?: string) => {
  const { featureMinPlan, isFeatureMapReady } = usePricing();

  const [state, setState] = useState<{
    allowed: boolean;
    loading: boolean;
  }>({
    allowed: false,
    loading: true,
  });

  useEffect(() => {
    // اگر featureMinPlan هنوز آماده نیست، loading رو true نگه دار
    if (!isFeatureMapReady) {
      setState({ allowed: false, loading: true });
      return;
    }

    if (!bot_uuid || !feature) {
      setState({ allowed: false, loading: false });
      return;
    }

    let cancelled = false;

    const run = async () => {
      try {
        const result = await checkFeatureAccess(
          bot_uuid,
          feature,
          featureMinPlan
        );

        if (!cancelled) {
          setState({ allowed: result, loading: false });
        }
      } catch {
        if (!cancelled) {
          setState({ allowed: false, loading: false });
        }
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [bot_uuid, feature, featureMinPlan, isFeatureMapReady]);

  return state;
};

const checkFeatureAccess = async (
  bot_uuid: string,
  feature: string,
  featureMinPlan: Record<string, string>
): Promise<boolean> => {
  if (!bot_uuid) return false;

  try {
    const response = await axiosInstance.get(
      API_ROUTES.FINANCIAL.SUBSCRIPTION(bot_uuid)
    );

    if (!response || response.status !== 200) return false;

    const currentPlan = response.data.data.plan;

    if (typeof currentPlan !== "number" || isNaN(currentPlan)) {
      return false;
    }

    const planOrder = ["FREE", "BASIC", "MEDIUM", "ADVANCE", "ENTERPRISE"];

    const minPlan = featureMinPlan[feature] ?? "FREE";
    const minIndex = planOrder.indexOf(minPlan);
    const rslt = currentPlan >= minIndex;

    // console.log("minPlan: ", minPlan);
    // console.log("minIndex: ", minIndex);
    // console.log("currentPlan: ", currentPlan);
    // console.log(feature, rslt);

    return rslt;
  } catch (error) {
    console.error("Failed to check feature access:", error);
    return false;
  }
};

export const useFeatureRequiredPlan = (feature: string) => {
  const { featureMinPlan } = usePricing();
  return featureMinPlan[feature] ?? "FREE";
};
 
