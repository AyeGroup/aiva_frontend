"use client";

import { Lock } from "lucide-react";
import { getFaNameByCode } from "@/constants/plans";
import { useFeatureRequiredPlan } from "@/providers/PricingContext";

export default function LockFeature({
  feature,
}: {
  feature: string;
}) {
    const requiredPlan = useFeatureRequiredPlan(feature);

  return (
    <div className="flex items-start -mt-3 gap-1 border h-fit border-gray-100 py-1 px-2 rounded-xl bg-gray-50 shadow">
      <Lock className="text-secondary size-4 " strokeWidth={3} />

      <div className="text-gray-500 text-xs">{`در پلن ${getFaNameByCode(
        requiredPlan
      )} فعال است`}</div>
    </div>
  );
}
