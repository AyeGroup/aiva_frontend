"use client";

import { Lock } from "lucide-react";
import { getFaNameByCode } from "@/constants/plans";
import { useFeatureRequiredPlan } from "@/hook/useFeatureRequiredPlan";

export default function LockFeature({ feature }: { feature: string }) {
  const { requiredPlan, loading } = useFeatureRequiredPlan(feature);

  if (loading) return null;

  if (requiredPlan === "FREE") return null;

  return (
    <div className="flex items-start -mt-4 gap-1 border h-fit border-gray-100 py-1 px-2 rounded-xl bg-gray-50 shadow w-fit">
      <Lock className="text-secondary size-4" strokeWidth={3} />

      <div className="text-gray-500 text-xs">
        {`در پلن ${getFaNameByCode(requiredPlan)} فعال است`}
      </div>
    </div>
  );
}
