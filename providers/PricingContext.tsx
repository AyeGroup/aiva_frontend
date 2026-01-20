"use client";

import axios from "axios";
import axiosInstance from "@/lib/axiosInstance";
import { API_ROUTES } from "@/constants/apiRoutes";
import { getPlanCodeById } from "@/constants/plans";
import { useBot } from "./BotProvider";
import { useAuth } from "./AuthProvider";
import { usePathname } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { Plan, PricingContextType as BaseType, PlanCode } from "@/types/common";

/* -------------------------------- CONSTANTS -------------------------------- */

const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/register",
  "/verification",
  "/reset-pass",
  "/auth/forgot-pass",
];

// export const PLAN_ORDER = [
//   "FREE",
//   "BASIC",
//   "MEDIUM",
//   "ADVANCE",
//   "ENTERPRISE",
// ] as const;
export const PLAN_ORDER: readonly PlanCode[] = [
  "FREE",
  "BASIC",
  "MEDIUM",
  "ADVANCE",
  "ENTERPRISE",
];


/* -------------------------------- TYPES -------------------------------- */

export type PricingContextType = BaseType & {
  plans: Plan[];
  loading: boolean;
  isFeatureMapReady: boolean;
  featureMinPlan: Record<string, PlanCode>;
};

/* -------------------------------- CONTEXT -------------------------------- */

export const PricingContext = createContext<PricingContextType | null>(null);

/* -------------------------------- PROVIDER -------------------------------- */

export const PricingProvider = ({ children }: { children: ReactNode }) => {
  const { user, loading: authLoading } = useAuth();
  const { currentBot } = useBot();
  const pathname = usePathname();

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  const [plans, setPlans] = useState<Plan[]>([]);
  const [currentPlan, setCurrentPlan] = useState<string>("FREE");
  const [loading, setLoading] = useState<boolean>(true);

  /* ------------------ FETCH PRICING (ONCE) ------------------ */
  useEffect(() => {
    if (isPublicRoute || authLoading || !user) return;

    let mounted = true;

    const fetchPricing = async () => {
      try {
        setLoading(true);
        const res = await axios.get(API_ROUTES.PAYMENT.PRICING);
        const list = res.data?.data?.subscription_plans ?? [];
        if (mounted) setPlans(list);
      } catch (error) {
        console.error("Pricing fetch failed:", error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchPricing();

    return () => {
      mounted = false;
    };
  }, [authLoading, user, isPublicRoute]);

  /* ------------------ FETCH USER PLAN (OPTIONAL / GLOBAL) ------------------ */
  useEffect(() => {
    if (!user || !currentBot?.uuid || isPublicRoute) return;

    const fetchUserPlan = async () => {
      try {
        const res = await axiosInstance.get(
          API_ROUTES.FINANCIAL.SUBSCRIPTION(currentBot.uuid)
        );
        const planCode = getPlanCodeById(res.data?.data?.plan) ?? "FREE";
        setCurrentPlan(planCode);
      } catch {
        setCurrentPlan("FREE");
      }
    };

    fetchUserPlan();
  }, [user, currentBot, isPublicRoute]);

  /* ------------------ FEATURE → MIN PLAN MAP ------------------ */
  const featureMinPlan = useMemo(() => {
    const map: Record<string, PlanCode> = {};

    if (plans.length === 0) return map;

    for (const planName of PLAN_ORDER) {
      const plan = plans.find((p) => p.plan === planName);
      if (!plan) continue;

      for (const feature of plan.features) {
        if (!map[feature]) {
          map[feature] = planName;
        }
      }
    }

    return map;
  }, [plans]);

  const isFeatureMapReady = !loading && plans.length > 0;

  /* -------------------------------- PROVIDE -------------------------------- */

  return (
    <PricingContext.Provider
      value={{
        plans,
        currentPlan,
        setCurrentPlan,
        loading,
        isFeatureMapReady,
        featureMinPlan,
      }}
    >
      {children}
    </PricingContext.Provider>
  );
};

/* -------------------------------- HOOK -------------------------------- */

export const usePricing = () => {
  const ctx = useContext(PricingContext);
  if (!ctx) {
    throw new Error("usePricing must be used inside PricingProvider");
  }
  return ctx;
};
