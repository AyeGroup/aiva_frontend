"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import axiosInstance from "@/lib/axiosInstance";
import { API_ROUTES } from "@/constants/apiRoutes";
import { Plan, PricingContextType } from "@/types/common";
import { useBot } from "./BotProvider";
import { getPlanCodeById } from "@/constants/plans";
import { useAuth } from "./AuthProvider";
import PageLoader from "@/components/pageLoader";
import { usePathname } from "next/navigation";

export const PricingContext = createContext<PricingContextType | null>(null);
const PUBLIC_ROUTES = ["/login", "/register", "/"];

export const PricingProvider = ({ children }: { children: ReactNode }) => {
  const { user, loading: authLoading } = useAuth();
  const [plans, setPlans] = useState<Plan[] | null>(null);
  const [currentPlan, setCurrentPlan] = useState<string | null>(null);
  const [featureMinPlan, setFeatureMinPlan] = useState<Record<string, string>>(
    {}
  );
  const { currentBot } = useBot();
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
        const res = await axiosInstance.get(API_ROUTES.PAYMENT.PRICING);
        console.log("res", res);
        const allPlans = res.data?.data?.subscription_plans ?? [];
        setPlans(allPlans);
      } catch (error) {
        console.error("Pricing fetch failed:", error);
      }
    };

    fetchPricing();
  }, [authLoading]);

  // 2) Update user currentPlan WHEN bot changes
  useEffect(() => {
    if (!user) return;
    if (authLoading || !currentBot) return;

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
  }, [authLoading, currentBot]);

  // 3) Build feature → minPlan map
  useEffect(() => {
    if (!plans) return;

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
  }, [plans]);

  return (
    <PricingContext.Provider
      value={{
        plans,
        currentPlan,
        setCurrentPlan,
        featureMinPlan,
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

export const useFeatureAccess = (bot_uuid: string, feature: string) => {
  const { featureMinPlan } = usePricing();
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    if (!bot_uuid) {
      setAllowed(false);
      return;
    }

    const checkAccess = async () => {
      try {
        const response = await axiosInstance.get(
          API_ROUTES.FINANCIAL.SUBSCRIPTION(bot_uuid)
        );

        if (!response || response.status !== 200) {
          setAllowed(false);
          return;
        }

        const currentPlan = response.data.data.plan;
        if (!currentPlan) {
          setAllowed(false);
          return;
        }

        const planOrder = ["FREE", "BASIC", "MEDIUM", "ADVANCE", "ENTERPRISE"];

        const minPlan = featureMinPlan[feature] ?? "FREE";
        const minIndex = planOrder.indexOf(minPlan);

        setAllowed(currentPlan >= minIndex);
      } catch (err) {
        console.error("Failed to check feature access:", err);
        setAllowed(false);
      }
    };

    checkAccess();
  }, [bot_uuid, feature, featureMinPlan]);

  return allowed;
};

export const useFeatureRequiredPlan = (feature: string) => {
  const { featureMinPlan } = usePricing();
  return featureMinPlan[feature] ?? "FREE";
};

export const useUploadLimits = () => {
  const { currentPlan } = usePricing();
  if (!currentPlan) return 0;
  switch (currentPlan) {
    case "FREE":
      return Number(process.env.NEXT_PUBLIC_UPLOAD_LIMIT_FREE);
    case "BASIC":
      return Number(process.env.NEXT_PUBLIC_UPLOAD_LIMIT_BASIC);
    case "MEDIUM":
      return Number(process.env.NEXT_PUBLIC_UPLOAD_LIMIT_MEDIUM);
    case "ADVANCE":
      return Number(process.env.NEXT_PUBLIC_UPLOAD_LIMIT_ADVANCE);
    case "ENTERPRISE":
      return process.env.NEXT_PUBLIC_UPLOAD_LIMIT_ENTERPRISE === "Infinity"
        ? Infinity
        : Number(process.env.NEXT_PUBLIC_UPLOAD_LIMIT_ENTERPRISE);
    default:
      return 0;
  }
};
