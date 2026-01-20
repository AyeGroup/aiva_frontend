import { usePricing } from "@/providers/PricingContext";
import { PlanCode } from "@/types/common";

export const useFeatureRequiredPlan = (feature: string) => {
  const { featureMinPlan, isFeatureMapReady } = usePricing();

  const requiredPlan: PlanCode = featureMinPlan[feature] ?? "FREE";

  return {
    requiredPlan,
    loading: !isFeatureMapReady,
  };
};
