import { X } from "lucide-react";
import { toast } from "sonner";
import { useBot } from "@/providers/BotProvider";
import { useRouter } from "next/navigation";
import { BotConfig } from "@/types/common";
import { API_ROUTES } from "@/constants/apiRoutes";
import { ChatbotList } from "./chatbot-list";
import { PlanCardMenu } from "./plan-card-menu";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import {
  getFaNameByCode,
  getPlanIcon,
  translateFeature,
} from "@/constants/plans";
import PageLoader from "@/components/pageLoader";
import axiosInstance from "@/lib/axiosInstance";

interface StatsDrawerProps {
  isOpen: boolean;
  chatbot?: BotConfig | null;
  onClose: () => void;
  selectedPlan?: string;
}

export function StatsDrawer({
  isOpen,
  chatbot = null,
  onClose,
  selectedPlan,
}: StatsDrawerProps) {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const planRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [plans, setPlans] = useState<any[]>([]);
  const [selectedBot, setSelectedBot] = useState<BotConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { currentBot } = useBot();

  useEffect(() => {
    console.log("chatbot", chatbot);


    if (chatbot ) {
      setSelectedBot(chatbot);
    } else if (currentBot && currentBot?.uuid?.length > 3) {
      setSelectedBot(currentBot);
    } else {
      setSelectedBot(null);
    }
  }, [chatbot, currentBot]);

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
    if (isOpen && selectedPlan) {
      setTimeout(() => {
        const el = planRefs.current[selectedPlan.toLowerCase()];
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 350);
    }
  }, [isOpen, selectedPlan]);

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

  //get pricing
  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);

      try {
        const res = await axiosInstance.get(API_ROUTES.PAYMENT.PRICING);

        const allPlans = res.data?.data?.subscription_plans ?? [];
        const filteredPlans = allPlans.filter(
          (p: any) => p.plan?.toLowerCase() !== "free"
        );
        setPlans(filteredPlans);
      } catch (apiError: any) {
        console.warn("API fetch failed:", apiError);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const handlePlanPurchase = (planName: string) => {
    // let billingBot;
    // if (chatbot == null) billingBot = currentBot;
    // else billingBot = chatbot;
    // console.log("selectedBot", selectedBot);
    if (!selectedBot || !selectedBot?.uuid) {
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
    const plan = plans.find(
      (p) => p.plan.toLowerCase() === planName.toLowerCase()
    );
    // console.log("plan:", plan);
    // console.log("billingBot:", billingBot);
    // console.log("billingPeriod:", billingPeriod);
    if (plan) {
      localStorage.setItem("returnUrl", window.location.href);

      localStorage.setItem(
        "selectedPlan",
        JSON.stringify({
          ...plan,
          billingBot: selectedBot,
          periods: billingPeriod,
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
        text:
          plan.plan === "ENTERPRISE"
            ? "کاراکتر نامحدود در بارگذاری اسناد "
            : `بارگذاری اسناد تا ${plan.upload_char_limit.toLocaleString(
                "fa-IR"
              )} کاراکتر`,
        enabled: true,
      },
    ];
  };

  return createPortal(
    <div className="">
      {/* Overlay */}
      <div
        className={`stats-drawer-overlay ${isOpen ? "block" : "hidden"}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className={`stats-drawer   ${isOpen ? "open" : ""}`}
        role="complementary"
        aria-label=" پلن‌های پیشنهادی"
      >
        {/* Header */}
        <header className="stats-drawer-header px-4 sm:px-6">
          <div>
            <h2 className="text-lg sm:text-xl">تمام پلن‌ها</h2>
            <p className="stats-drawer-subtitle text-xs sm:text-sm">
              انتخاب بهترین پلن برای نیازهای شما
            </p>
          </div>
          <button
            onClick={onClose}
            className="stats-drawer-close w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
            title="بستن پنل"
            aria-label="بستن پنل پلن‌ها"
          >
            <X size={window.innerWidth < 640 ? 18 : 20} />
          </button>
        </header>

        {/* Content */}
        <div className="stats-drawer-content px-4 sm:px-6">
          {/* Billing Period Toggle */}
          <div className="flex items-center justify-center mb-3 sm:mb-4 gap-2 text-sm sm:text-base">
            <span>چت‌بات</span>
            {/* <ChatbotSelector /> */}
            <ChatbotList
              placeholder="یک چت‌بات را انتخاب کنید"
              selectedBot={selectedBot}
              onSelect={(bot) => setSelectedBot(bot)}
            />
          </div>

          <div className="billing-toggle-wrapper  flex-row gap-2 sm:gap-0">
            <button
              type="button"
              className={`billing-toggle-option ${
                billingPeriod === "monthly" ? "active" : ""
              } 
            py-2 sm:py-3 text-sm sm:text-base`}
              onClick={() => setBillingPeriod("monthly")}
              title="نمایش قیمت ماهانه"
            >
              ماهانه
            </button>
            <button
              type="button"
              className={`billing-toggle-option ${
                billingPeriod === "yearly" ? "active" : ""
              } 
            py-2 sm:py-3 text-sm sm:text-base flex items-center justify-center gap-1 sm:gap-2`}
              onClick={() => setBillingPeriod("yearly")}
              title="نمایش قیمت سالانه"
            >
              سالانه
              <span className="billing-toggle-badge text-xs sm:text-sm px-1.5 sm:px-2">
                {"20"}٪ تخفیف
              </span>
            </button>
          </div>

          {/* Plans Section */}
          <section
            className="stats-section mt-4 sm:mt-6"
            aria-labelledby="plans-heading"
          >
            {isLoading && <PageLoader />}
            <div className="flex flex-col gap-3 sm:gap-4">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    planRefs.current[plan.plan.toLowerCase()] = el;
                  }}
                >
                  <PlanCardMenu
                    key={index}
                    plan={plan?.plan}
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
                    buttonText={
                      plan?.plan.toLowerCase() === "enterprise"
                        ? "تماس بگیرید"
                        : "خرید پلن"
                    }
                    buttonVariant="secondary"
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </aside>
    </div>,
    document.body
  );
}
