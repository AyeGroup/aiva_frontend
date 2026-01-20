"use client";

import { useMemo } from "react";
import { usePricing } from "@/providers/PricingContext";

export const usePlans = () => {
  const { plans, loading, isFeatureMapReady } = usePricing();

  const paidPlans = useMemo(
    () => plans.filter((p) => p.plan !== "FREE"),
    [plans]
  );

  return {
    plans,
    paidPlans,
    loading,
    ready: isFeatureMapReady,
    hasPlans: plans.length > 0,
  };
};
