import { X } from "lucide-react";
import { toast } from "sonner";
import { useBot } from "@/providers/BotProvider";
import { useRouter } from "next/navigation";
import { API_ROUTES } from "@/constants/apiRoutes";
import { PlanCardMenu } from "./plan-card-menu";
import { useEffect, useState } from "react";
import {
  getFaNameByCode,
  getPlanIcon,
  translateFeature,
} from "@/constants/plans";
import axiosInstance from "@/lib/axiosInstance";

interface StatsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StatsDrawer({ isOpen, onClose }: StatsDrawerProps) {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">(
    "monthly"
  );

  const [plans, setPlans] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { currentBot } = useBot();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);

      try {
        const res = await axiosInstance.get(API_ROUTES.PAYMENT.PRICING);

        // setPlans(res.data?.data?.subscription_plans ?? []);
        const allPlans = res.data?.data?.subscription_plans ?? [];
        const filteredPlans = allPlans.filter(
          (p: any) => p.plan?.toLowerCase() !== "free"
        );
        setPlans(filteredPlans);

        // console.log("allPlans :", allPlans);
        // console.log("filteredPlans :", filteredPlans);
      } catch (apiError: any) {
        console.warn("API fetch failed:", apiError);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const handlePlanPurchase = (planName: string) => {
    const billingBot = currentBot;
    if (!billingBot) {
      toast.info("لطفاً چت‌بات مورد نظر را انتخاب کنید");
      return;
    } else if (planName.toLowerCase() === "enterprise".toLowerCase()) {
      toast.info("لطفاً با تیم فروش ما تماس بگیرید");
      return;
    } else if (planName.toLowerCase() === "free".toLowerCase()) {
      toast.info("شما در حال حاضر از پلن رایگان استفاده می‌کنید");
      return;
    }
    console.log("planName", planName);
    // Navigate to checkout page
    const plan = plans.find(
      (p) => p.plan.toLowerCase() === planName.toLowerCase()
    );
    console.log("plan:", plan);
    console.log("billingBot:", billingBot);
    console.log("billingPeriod:", billingPeriod);
    if (plan) {
      localStorage.setItem("returnUrl", window.location.href);
      //
      localStorage.setItem(
        "selectedPlan",
        JSON.stringify({
          ...plan,
          billingBot,
          billingPeriod,
        })
      );
      router.push("/pay/checkout");
    }
  };

  const mapFeatures = (plan: any): { text: string; enabled: boolean }[] => {
    return [
      ...plan.features.map((f: string) => ({
        text: translateFeature(f),
        enabled: true,
      })),
      {
        text: `${plan.upload_char_limit.toLocaleString("fa-IR")} کاراکتر فایل`,
        enabled: true,
      },
    ];
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`stats-drawer-overlay ${isOpen ? "active" : ""}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className={`stats-drawer ${isOpen ? "open" : ""}`}
        role="complementary"
        aria-label="پنل پلن‌های پیشنهادی"
      >
        {/* Header */}
        <header className="stats-drawer-header">
          <div>
            <h2>پلن‌های پیشنهادی</h2>
            <p className="stats-drawer-subtitle">
              انتخاب بهترین پلن برای نیازهای شما
            </p>
          </div>
          <button
            onClick={onClose}
            className="stats-drawer-close"
            title="بستن پنل"
            aria-label="بستن پنل پلن‌ها"
          >
            <X size={20} />
          </button>
        </header>

        {/* Content */}
        <div className="stats-drawer-content">
          {/* Billing Period Toggle */}
          <div className="billing-toggle-wrapper">
            <button
              type="button"
              className={`billing-toggle-option ${
                billingPeriod === "monthly" ? "active" : ""
              }`}
              onClick={() => setBillingPeriod("monthly")}
              title="نمایش قیمت ماهانه"
            >
              ماهانه
            </button>
            <button
              type="button"
              className={`billing-toggle-option ${
                billingPeriod === "yearly" ? "active" : ""
              }`}
              onClick={() => setBillingPeriod("yearly")}
              title="نمایش قیمت سالانه"
            >
              سالانه
              <span className="billing-toggle-badge">{"20"}٪ تخفیف</span>
            </button>
          </div>

          {/* Plans Section */}
          <section className="stats-section" aria-labelledby="plans-heading">
            <h3 id="plans-heading" className="section-title">
              تمام پلن‌ها
            </h3>

            <div className="flex flex-col">
              {plans.map((plan, index) => (
                <PlanCardMenu
                  key={index}
                  name={getFaNameByCode(plan?.plan) || plan?.plan}
                  description=""
                  priceMonthly={Number(plan?.price_monthly_irr || 0)}
                  priceYearly={Number(plan?.price_yearly_irr || 0)}
                  period={billingPeriod}
                  onPeriodChange={(p) => setBillingPeriod(p)}
                  icon={getPlanIcon(plan.plan)}
                  features={mapFeatures(plan)}
                  onSelect={() => {
                    handlePlanPurchase(plan.plan);
                  }}
                  buttonText="خرید پلن"
                  buttonVariant="secondary"
                />
              ))}
            </div>
          </section>
        </div>
      </aside>
    </>
  );
}
