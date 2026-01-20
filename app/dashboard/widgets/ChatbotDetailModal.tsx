"use client";
import React, { useEffect, useState } from "react";
import PageLoader from "@/components/pageLoader";
import axiosInstance from "@/lib/axiosInstance";
import { useBot } from "@/providers/BotProvider";
import { Button } from "@/components/button";
import { useRouter } from "next/navigation";
import { BotConfig } from "@/types/common";
import { API_ROUTES } from "@/constants/apiRoutes";
import { getDaysRemaining } from "@/utils/common";
import { getPlanCodeById, PLAN_TYPES } from "@/constants/plans";
import {
  MessageSquare,
  Zap,
  X,
  Calendar,
  TrendingUp,
  BarChart3,
  Info,
} from "lucide-react";
// import { usePricing } from "@/providers/PricingContext";
import { usePlans } from "@/hook/usePlans";

interface ChatbotDetailModalProps {
  show: boolean;
  chatbot: BotConfig | null;
  onClose: () => void;
}

export default function ChatbotDetailModal({
  show,
  chatbot,
  onClose,
}: ChatbotDetailModalProps) {
  const router = useRouter();
  const [chatbotSubsc, setChatbotSubsc] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [usagePercentage, setUsagePercentage] = useState<number>(100);
  const [totalMessages, setTotalMessages] = useState<number>();
  const [daysRemaining, setDaysRemaining] = useState<number>(0);
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const { setCurrentBot } = useBot();
  // const { plans } = usePricing();
  const { paidPlans: plans, loading: isLoadingPlans } = usePlans();

  useEffect(() => {
    const fetchData = async () => {
      if (!chatbot || !chatbot?.uuid || !show) return;
      setLoading(true);

      try {
        //  1. دریافت اطلاعات اشتراک
        const subRes = await axiosInstance.get(
          API_ROUTES.FINANCIAL.SUBSCRIPTION(chatbot.uuid)
        );

        const subData = subRes.data.data;

        if (!subData) {
          setIsExpired(true);
          return;
        }

        setIsExpired(false);
        setChatbotSubsc(subData);

        //   2. محاسبه روزهای باقی‌مانده
        if (subData?.end_date) {
          const diffDays = getDaysRemaining(subData.end_date);
          setDaysRemaining(diffDays);
        } else {
          setDaysRemaining(0);
        }
        //   3. گرفتن لیست pricing
        const pricingData = plans ?? [];
        //   4. پیدا کردن پلن فعلی
        const currentPlan = pricingData.find(
          (plan: any) => plan.plan === getPlanCodeById(subData?.plan)
        );

        //   5. تنظیم totalMessages
        if (currentPlan) {
          setTotalMessages(currentPlan?.upload_char_limit || 0);
        } else {
          setTotalMessages(0);
        }

        //   6. درصد مصرف
        if (
          subData?.remaining_upload_chars !== undefined &&
          currentPlan?.upload_char_limit
        ) {
          const percentage =
            100 -
            (subData.remaining_upload_chars / currentPlan.upload_char_limit) *
              100;

          setUsagePercentage(percentage);
        } else {
          setUsagePercentage(0);
        }
      } catch (err: any) {
        // 🔴 هندل 404 اشتراک
        const status = err?.response?.status;
        const message = err?.response?.data?.message;

        if (status === 404 && message === "No active subscription found") {
          setIsExpired(true);
          setChatbotSubsc(null);
          setDaysRemaining(0);
          setUsagePercentage(0);
          setTotalMessages(0);
          return;
        }

        console.error("Error fetching subscription or pricing:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [chatbot?.uuid, show, isLoadingPlans]);

  const handleDashboard = () => {
    if (chatbot?.uuid) setCurrentBot(chatbot);
    onClose();
    router.push("/dashboard");
  };

  const handlePlan = () => {
    onClose();
    sessionStorage.setItem("scrollTo", "chooseplan");
    sessionStorage.setItem("billingchatbotId", chatbot?.uuid || "");
    router.push("/dashboard/?tab=billing");
  };

  if (!show || !chatbot?.uuid) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-99 chatbot-modal-overlay "
      onClick={onClose}
      style={{ animation: "fadeIn 0.2s ease-out" }}
    >
      {(loading || isLoadingPlans) && <PageLoader />}
      <div
        className="bg-white max-h-[95vh]   rounded-3xl max-w-2xl w-full overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "slideUp 0.3s ease-out" }}
      >
        {/* Header */}
        <div
          className="relative py-4 px-6 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${chatbot.primary_color}15 0%, ${chatbot.primary_color}05 100%)`,
          }}
        >
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: chatbot.primary_color }}
          />
          <div className="relative flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                style={{
                  backgroundColor: chatbot.primary_color + "20",
                  border: `2px solid ${chatbot.primary_color}40`,
                }}
              >
                <MessageSquare
                  className="w-7 h-7"
                  style={{ color: chatbot.primary_color }}
                />
              </div>
              <div>
                <h2 className="text-grey-900 mb-2 text-right">
                  {chatbot.name}
                </h2>
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Plan */}
                  <div
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm shadow-sm"
                    style={{
                      backgroundColor: chatbot?.primary_color + "20",
                      color: chatbot?.primary_color,
                      border: `1px solid ${chatbot?.primary_color}40`,
                    }}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>{PLAN_TYPES[chatbotSubsc?.plan]}</span>
                  </div>

                  {/* Status */}
                  <div
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm shadow-sm"
                    style={{
                      backgroundColor: chatbot.active
                        ? "#52d4a020"
                        : "#EF444420",
                      color: chatbot.active ? "#52d4a0" : "#EF4444",
                      border: `1px solid ${
                        chatbot.active ? "#52d4a040" : "#EF444440"
                      }`,
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: chatbot.active ? "#52d4a0" : "#EF4444",
                      }}
                    />

                    <span>{chatbot?.active ? "فعال" : "غیر فعال"}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/80 transition-all bg-white/60 backdrop-blur-sm shadow-sm"
              title="بستن"
            >
              <X className="w-5 h-5 text-grey-600" />
            </button>
          </div>
        </div>

        {/* Content */}

        <div className=" space-y-1 overflow-y-auto  ">
          {!isExpired ? (
            <div
              className={`p-2 relative   overflow-hidden h-full flex flex-col items-center justify-center   border-[${chatbot?.primary_color}30]`}
            >
              <div
                className="absolute top-0 left-0 w-32 h-32 rounded-full opacity-5 blur-3xl"
                style={{ backgroundColor: chatbot?.primary_color }}
              />

              {/* Usage Circle */}
              <div className="relative mb-2">
                <svg
                  width="140"
                  height="140"
                  viewBox="0 0 140 140"
                  className="transform -rotate-90"
                >
                  <circle
                    cx="70"
                    cy="70"
                    r="60"
                    fill="none"
                    stroke="#F3F4F6"
                    strokeWidth="10"
                  />
                  <circle
                    cx="70"
                    cy="70"
                    r="60"
                    fill="none"
                    stroke={
                      usagePercentage > 80
                        ? "#EF4444"
                        : usagePercentage > 50
                        ? "#F59E0B"
                        : chatbot?.primary_color
                    }
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${
                      (usagePercentage / 100) * 376.99
                    } 376.99`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p
                    className="mb-0.5"
                    style={{
                      fontSize: "28px",
                      fontWeight: "700",
                      lineHeight: "1",
                    }}
                  >
                    {(usagePercentage || "0").toLocaleString("fa-IR")}٪
                  </p>
                  <p className="text-grey-600" style={{ fontSize: "11px" }}>
                    مصرف شده
                  </p>
                </div>
              </div>

              {/* Info Blocks */}
              <div className="grid grid-cols-2 gap-3 w-full mb-1">
                <div className="text-center p-3 bg-grey-50 rounded-xl border border-grey-100">
                  <p className="text-grey-600 text-xs mb-1">باقی‌مانده</p>
                  <p className="text-grey-900 text-base font-semibold">
                    {(
                      chatbotSubsc?.remaining_upload_chars || ""
                    ).toLocaleString("fa-IR")}
                  </p>
                </div>
                <div className="text-center p-3 bg-grey-50 rounded-xl border border-grey-100">
                  <p className="text-grey-600 text-xs mb-1">کل ظرفیت</p>
                  <p className="text-grey-900 text-base font-semibold">
                    {(totalMessages || "").toLocaleString("fa-IR")}
                  </p>
                </div>
              </div>

              {/* Expiry Date */}
              <div className="w-full p-3 bg-grey-50 rounded-xl border border-grey-100 mb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-grey-500" />
                    <span className="text-grey-600 text-sm">تاریخ انقضا</span>
                  </div>
                  <span className="text-grey-900 text-sm">
                    {new Date(chatbotSubsc?.end_date).toLocaleDateString(
                      "fa-IR"
                    )}
                  </span>
                </div>
                <div
                  className="px-2.5 py-1.5 rounded-lg text-center text-sm"
                  style={{
                    backgroundColor:
                      daysRemaining < 7
                        ? "#FFA18E15"
                        : chatbot?.primary_color + "15",
                    color:
                      daysRemaining < 7 ? "#FFA18E" : chatbot?.primary_color,
                    border: `1.5px solid ${
                      daysRemaining < 7
                        ? "#FFA18E30"
                        : chatbot?.primary_color + "30"
                    }`,
                  }}
                >
                  {daysRemaining > 0
                    ? `${daysRemaining.toLocaleString("fa-IR")} روز باقیمانده`
                    : "بدون محدودیت زمانی"}
                </div>
              </div>

              {/* Warning */}
              {usagePercentage > 70 && (
                <div className="w-full p-2 bg-orange-50 border border-orange-200 rounded-xl">
                  <div className="flex items-start gap-2">
                    <div className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center">
                      <TrendingUp className="w-3.5 h-3.5 text-orange-600" />
                    </div>
                    <p className="text-orange-800 text-right text-xs leading-relaxed">
                      برای استفاده بهتر، ارتقا پلن خود را در نظر بگیرید.
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 p-10 text-secondary font-extrabold">
              <Info />
              چت‌بات پلن فعال ندارد
            </div>
          )}

          {/* Buttons */}
          <div className="   pt-2 pb-2 px-5 bg-white">
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="primary"
                size="sm"
                onClick={handlePlan}
                className="cursor-pointer"
              >
                <div className="flex">
                  <Zap className="w-4 h-4 ml-2" />
                  ارتقا پلن
                </div>
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleDashboard}
                className="cursor-pointer"
              >
                <div className="flex">
                  <BarChart3 className="w-4 h-4 ml-2" />
                  مشاهده داشبورد
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
