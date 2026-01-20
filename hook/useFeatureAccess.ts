"use client";

import { useMemo } from "react";
import {
  usePricing,
  PLAN_ORDER,
 
} from "@/providers/PricingContext";
import { PlanCode } from "@/types/common";

export const useFeatureAccess = (
  bot_uuid: string,
  feature: string,
  planId: number
) => {
  const { featureMinPlan, isFeatureMapReady } = usePricing();

  const allowed = useMemo(() => {
    if (!isFeatureMapReady) return false;
    if (!bot_uuid || !feature) return false;

    const rawMinPlan = featureMinPlan[feature] ?? "FREE";

    const minPlan: PlanCode = PLAN_ORDER.includes(rawMinPlan as PlanCode)
      ? (rawMinPlan as PlanCode)
      : "FREE";

    const minIndex = PLAN_ORDER.indexOf(minPlan);

    return planId >= minIndex;
  }, [bot_uuid, feature, planId, featureMinPlan, isFeatureMapReady]);

  return {
    allowed,
    loading: !isFeatureMapReady,
    requiredPlan: featureMinPlan[feature] ?? "FREE",
  };
};
