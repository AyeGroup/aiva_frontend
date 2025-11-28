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
 

export const PricingContext = createContext<PricingContextType | null>(null);

export const PricingProvider = ({ children }: { children: ReactNode }) => {
  const [plans, setPlans] = useState<Plan[] | null>(null);
  const [currentPlan, setCurrentPlan] = useState<string | null>(null);
const [featureMinPlan, setFeatureMinPlan] = useState<Record<string, string>>(
  {}
);

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const res = await axiosInstance.get(API_ROUTES.PAYMENT.PRICING);

        const allPlans = res.data?.data?.subscription_plans ?? [];
        setPlans(allPlans);

        // Plan کاربر از بک میاد — اگر نبود پیشفرض Free
        setCurrentPlan(res.data?.data?.user_plan ?? "FREE");
      } catch (error) {
        console.error("Pricing fetch failed:", error);
      }
    };

    fetchPricing();
  }, []);

  useEffect(() => {
    if (!plans) return;

    const planOrder = ["FREE", "BASIC", "MEDIUM", "ADVANCE", "ENTERPRISE"];

    const map: Record<string, string> = {};

    for (const plan of planOrder) {
      const p = plans.find((x) => x.plan === plan);
      if (!p) continue;

      p.features.forEach((feature) => {
        if (!map[feature]) {
          map[feature] = plan; // اولین پلنی که feature را دارد = کمترین پلن لازم
        }
      });
    }

    setFeatureMinPlan(map);
  }, [plans]);

  return (
    // <PricingContext.Provider value={{ plans, currentPlan, setCurrentPlan }}>
    <PricingContext.Provider
      value={{
        plans,
        currentPlan,
        setCurrentPlan,
        featureMinPlan, // 🔥 اضافه شد
      }}
    >
      {children}
    </PricingContext.Provider>
  );
};

// ------------------------------
// ✨ اینجا کاستوم هوک تعریف می‌شود
// ------------------------------

export const usePricing = () => {
  const context = useContext(PricingContext);

  if (!context) {
    throw new Error("usePricing must be used inside PricingProvider");
  }

  return context;
};
export const useFeatureAccess = (feature: string) => {
  const { currentPlan, featureMinPlan } = usePricing();

  if (!currentPlan) return false;

  const planOrder = ["FREE", "BASIC", "MEDIUM", "ADVANCE", "ENTERPRISE"];

  const userIndex = planOrder.indexOf(currentPlan);
  const minPlan = featureMinPlan[feature] ?? "FREE";
  const minIndex = planOrder.indexOf(minPlan);

  return userIndex >= minIndex;
};
