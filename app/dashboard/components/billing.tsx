"use client";
import axiosInstance from "@/lib/axiosInstance";
import PageLoader from "@/components/pageLoader";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/card";
import { toast } from "sonner";
import { useBot } from "@/providers/BotProvider";
import { Button } from "@/components/button";
import { useAuth } from "@/providers/AuthProvider";
import { PlanCard } from "../plan-card";
import { BotConfig } from "@/types/common";
import { useRouter } from "next/navigation";
import { API_ROUTES } from "@/constants/apiRoutes";
import { WalletCard } from "../wallet-card";
import { ChatbotList } from "../chatbot-list";
import { Transactions } from "../Transactions";
import { CreditIncreaseModal } from "./CreditIncrease";
import { getDaysRemaining } from "@/utils/common";
import { AlertCircle, X, Bot } from "lucide-react";
import {
  getFaNameByCode,
  getPlanIcon,
  getPlanNameById,
  PLAN_COLORS_BYID,
  translateFeature,
} from "@/constants/plans";

export function Billing() {
  const { bots } = useBot();
  const { user, loading } = useAuth();
  const router = useRouter();
  const maxDays = 7;
  const maxCredit = 85;
  const [showDiscountHint, setShowDiscountHint] = useState(true);
  const [billingBot, setBillingBot] = useState<BotConfig | null>(null);
  const [isCreditIncreaseModalOpen, setIsCreditIncreaseModalOpen] =
    useState(false);
  const [selectedChatbot, setSelectedChatbot] = useState<any>(null);
  const [activeSubscrp, setActiveSubscrp] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expiringPlan, setExpiringPlan] = useState<any>(null);
  const [plans, setPlans] = useState<any[]>([]);
  const [periods, setPeriods] = useState<Record<string, "monthly" | "yearly">>(
    {}
  );

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(
          API_ROUTES.FINANCIAL.SUBSCRIPTIONS
        );
        const active = response.data.data;
        setActiveSubscrp(active);

        // محاسبه expiring plans همینجا
        const expiring = active
          .map((p: any) => {
            const daysRemaining = getDaysRemaining(p.subscription.end_date);
            const usagePercent =
              100 -
              (p.subscription.balance / p.subscription.total_balance) * 100;
            return { ...p, daysRemaining, usagePercent };
          })
          .filter(
            (p: any) =>
              p.daysRemaining <= maxDays || p.usagePercent >= maxCredit
          );

        setExpiringPlan(expiring);

        // console.log("expiringPlan", expiring);
      } catch (error) {
        console.error("خطا در دریافت داده کاربران:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [user]);

  useEffect(() => {
    if (!user?.token) return;

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

        console.log("allPlans :", allPlans);
        // console.log("filteredPlans :", filteredPlans);
      } catch (apiError: any) {
        console.warn("API fetch failed:", apiError);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [user?.token]);

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
  const handlePeriodChange = (
    planCode: string,
    newPeriod: "monthly" | "yearly"
  ) => {
    setPeriods((prev) => ({
      ...prev,
      [planCode]: newPeriod, // ثبت period مخصوص این پلن
    }));
  };

  const handlePlanPurchase = (planName: string) => {
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
    // console.log("ali:", plan);
    if (plan) {
      localStorage.setItem("returnUrl", window.location.href);
      //
      localStorage.setItem(
        "selectedPlan",
        JSON.stringify({
          ...plan,
          billingBot,
          periods,
        })
      );
      router.push("/pay/checkout");
    }
  };

  const handleUpgrade = (chatbot: any) => {
    setSelectedChatbot(chatbot);
    setIsCreditIncreaseModalOpen(true);
  };

  return (
    <div className="h-screen w-full overflow-y-auto z-0!" style={{ zIndex: 0 }}>
      <div className="flex flex-col lg:flex-row w-ful">
        {(isLoading || loading) && <PageLoader />}
        <main className="flex flex-col p-4 sm:p-6 w-full">
          <header className="mb-6 sm:mb-8">
            <div className="text-right">
              <h1 className="text-grey-900 mb-0 mr-0 sm:mr-10 text-2xl sm:text-3xl font-bold">
                مالی و اشتراک
              </h1>
              <p className="text-grey-600 mr-0 sm:mr-10 text-sm sm:text-base">
                مدیریت پلن‌ها، اعتبار و تراکنش‌های مالی
              </p>
            </div>
          </header>

          <section className="mb-6 sm:mb-8" aria-label="خلاصه اعتبار">
            <WalletCard />
          </section>

          {/* Discount & Expiring Alert */}
          {showDiscountHint && expiringPlan && expiringPlan.length > 0 && (
            <section className="mb-6 sm:mb-8" aria-label="هشدار و اطلاعیه‌ها">
              <Card className="p-0 overflow-hidden border-2 bg-[#FFA18E] mb-4">
                <div
                  className="px-4 sm:px-6 py-4 flex flex-col gap-4"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255, 161, 142, 0.1) 0%, rgba(255, 161, 142, 0.05) 100%)",
                  }}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center "
                        style={{ backgroundColor: "#FFA18E" }}
                      >
                        <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <h3 className="text-grey-900 mb-2 text-right text-sm sm:text-base">
                        ⚠️ پلن در حال منقضی شدن
                      </h3>
                    </div>

                    <button
                      onClick={() => setShowDiscountHint(false)}
                      className="p-1 hover:bg-grey-200 rounded-lg transition-colors"
                      title="بستن هشدار"
                      aria-label="بستن هشدار"
                    >
                      <X className="w-4 h-4 sm:w-5 sm:h-5 text-grey-600" />
                    </button>
                  </div>

                  {expiringPlan.map((plan: any, index: number) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-grey-700 mx-2 sm:mx-4 my-2 text-right"
                    >
                      <div className="my-2 sm:my-4 text-sm sm:text-base">
                        پلن چت‌بات <strong>{plan.chatbot_name}</strong>{" "}
                        {plan.daysRemaining <= maxDays ? (
                          <>
                            <strong className="text-red-600">
                              {plan.daysRemaining.toLocaleString("fa-IR")} روز
                            </strong>{" "}
                            دیگر منقضی می‌شود.
                          </>
                        ) : (
                          <>
                            بیش از{" "}
                            <strong className="text-red-600">
                              {plan.usagePercent.toFixed(0)}٪
                            </strong>{" "}
                            از اعتبار آن مصرف شده است.
                          </>
                        )}
                      </div>

                      {plan.daysRemaining <= maxDays ? (
                        <Button
                          variant="primary"
                          size="sm"
                          title="تمدید"
                          onClick={() => handleUpgrade(plan)}
                        >
                          تمدید پلن
                        </Button>
                      ) : (
                        <Button
                          variant="secondary"
                          size="sm"
                          title="افزایش اعتبار"
                          onClick={() => handleUpgrade(plan)}
                        >
                          افزایش اعتبار
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </section>
          )}

          {/* Active Chatbot Plans Table */}
          <section
            className="mb-6 sm:mb-8"
            aria-labelledby="chatbot-plans-heading"
          >
            <div className="mb-4 sm:mb-6">
              <h2
                id="chatbot-plans-heading"
                className="text-grey-900 text-right text-xl sm:text-2xl"
              >
                پلن‌های فعال چت‌بات‌ها
              </h2>
              <p className="text-grey-600 text-right mt-2 text-sm sm:text-base">
                مشاهده و مدیریت پلن‌های فعال چت‌بات‌های شما
              </p>
            </div>

            <Card>
              {activeSubscrp.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 sm:py-16 px-4">
                  <div
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-4"
                    style={{ backgroundColor: "rgba(101, 188, 182, 0.1)" }}
                  >
                    <Bot
                      style={{
                        width: "24px",
                        height: "24px",
                        color: "#65BCB6",
                      }}
                      className="sm:w-8 sm:h-8"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-grey-900 mb-2 text-base sm:text-lg">
                    هیچ چت‌بات فعالی وجود ندارد
                  </h3>
                  <p className="text-grey-600 text-center max-w-md mb-4 text-sm sm:text-base">
                    برای شروع، یک چت‌بات جدید ایجاد کنید و پلن مورد نظر را
                    خریداری کنید
                  </p>
                  <Button
                    variant="primary"
                    size="md"
                    title="ایجاد چت‌بات جدید"
                    onClick={() => router.push("/onboarding")}
                  >
                    ایجاد چت‌بات جدید
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto" style={{ direction: "rtl" }}>
                  {/* Mobile Cards */}
                  <div className="flex flex-col gap-4 lg:hidden mt-4">
                    {activeSubscrp.map((plan, index) => {
                      const creditPercent = Math.round(
                        ((plan.subscription.total_characters -
                          plan.subscription.remaining_upload_chars) /
                          plan.subscription.total_characters) *
                          100
                      );
                      const planColor =
                        bots.find((b) => b.uuid === plan.chatbot_uuid)
                          ?.primary_color || "";

                      return (
                        <div
                          key={index}
                          className="rounded-xl border border-grey-200 p-4 bg-white shadow-sm"
                        >
                          {/* نام چت‌بات */}
                          <div className="flex w-full items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: `${planColor}20` }}
                              >
                                <Bot
                                  style={{
                                    width: "18px",
                                    height: "18px",
                                    color: planColor,
                                  }}
                                />
                              </div>
                              <span className="text-grey-900 font-medium text-sm">
                                {plan.chatbot_name}
                              </span>
                            </div>

                            <span
                              className="px-2 py-1 rounded-lg text-xs"
                              style={{
                                backgroundColor: `${
                                  PLAN_COLORS_BYID[plan.subscription.plan]
                                }15`,
                                color: PLAN_COLORS_BYID[plan.subscription.plan],
                              }}
                            >
                              {getPlanNameById(plan.subscription.plan)}
                            </span>
                          </div>

                          {/* کاراکتر مصرفی */}
                          <div className="mb-3">
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="text-grey-700">
                                {new Intl.NumberFormat("fa-IR").format(
                                  plan.subscription.total_characters -
                                    plan.subscription.remaining_upload_chars
                                )}{" "}
                                /
                                {new Intl.NumberFormat("fa-IR").format(
                                  plan.subscription.total_characters
                                )}
                              </span>
                              <span className="text-grey-500">
                                {creditPercent.toLocaleString("fa-IR")}٪
                              </span>
                            </div>

                            <div className="w-full h-1.5 bg-grey-100 rounded-full">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${creditPercent}%`,
                                  backgroundColor:
                                    creditPercent > 90
                                      ? "#ef4444"
                                      : creditPercent > 70
                                      ? "#FFA18E"
                                      : planColor,
                                }}
                              />
                            </div>
                          </div>

                          {/* انقضا */}
                          <div className="flex items-center justify-between mb-3 text-xs">
                            <span className="text-grey-600">
                              انقضا:{" "}
                              {new Date(
                                plan.subscription.end_date
                              ).toLocaleDateString("fa-IR")}
                            </span>
                            <span className="text-grey-600">
                              {getDaysRemaining(
                                plan.subscription.end_date
                              ).toLocaleString("fa-IR")}{" "}
                              روز مانده
                            </span>
                          </div>

                          <button
                            onClick={() => handleUpgrade(plan)}
                            className="w-full py-2 rounded-lg text-sm text-white"
                            style={{ backgroundColor: "#65bcb6" }}
                          >
                            افزایش اعتبار
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <table className="hidden lg:table w-full ">
                    <thead>
                      <tr className="border-b border-grey-200 ">
                        <th className="px-2 sm:px-4 py-3 text-right text-grey-600 text-xs sm:text-sm">
                          چت‌بات
                        </th>
                        <th className="px-2 sm:px-4 py-3 text-right text-grey-600 text-xs sm:text-sm">
                          پلن
                        </th>
                        <th className="px-2 sm:px-4 py-3 text-right text-grey-600 text-xs sm:text-sm">
                          کاراکتر
                        </th>
                        <th className="px-2 sm:px-4 py-3 text-right text-grey-600 text-xs sm:text-sm">
                          اعتبار
                        </th>
                        <th className="px-2 sm:px-4 py-3 text-right text-grey-600 text-xs sm:text-sm">
                          انقضا
                        </th>
                        <th className="px-2 sm:px-4 py-3 text-center text-grey-600 text-xs sm:text-sm">
                          عملیات
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeSubscrp.map((plan, index) => {
                        const creditPercent = Math.round(
                          ((plan.subscription.total_characters -
                            plan.subscription.remaining_upload_chars) /
                            plan.subscription.total_characters) *
                            100
                        );
                        const planColor =
                          bots.find((b) => b.uuid === plan.chatbot_uuid)
                            ?.primary_color || "";

                        const fileCharPercent = Math.round(
                          (plan.subscription.balance /
                            plan.subscription.balance) *
                            100
                        );

                        return (
                          <tr
                            key={index}
                            className="border-b border-grey-100 hover:bg-grey-50 "
                          >
                            <td className="px-2 sm:px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center "
                                  style={{
                                    backgroundColor: `${planColor}20`,
                                  }}
                                >
                                  <Bot
                                    style={{
                                      width: "14px",
                                      height: "14px",
                                      color: planColor,
                                    }}
                                    className="sm:w-[18px] sm:h-[18px]"
                                    aria-hidden="true"
                                  />
                                </div>
                                <span className="text-grey-900 text-xs sm:text-sm truncate max-w-[100px] sm:max-w-none">
                                  {plan.chatbot_name}
                                </span>
                              </div>
                            </td>

                            <td className="px-2 sm:px-4 py-3">
                              <span
                                className="inline-block px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm whitespace-nowrap"
                                style={{
                                  backgroundColor: `${
                                    PLAN_COLORS_BYID[plan.subscription.plan]
                                  }15`,
                                  color:
                                    PLAN_COLORS_BYID[plan.subscription.plan],
                                }}
                              >
                                {getPlanNameById(plan.subscription.plan)}
                              </span>
                            </td>

                            <td className="px-2 sm:px-4 py-3">
                              <div className="flex flex-col gap-1.5 min-w-[120px]">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-grey-900 text-xs sm:text-sm">
                                    {new Intl.NumberFormat("fa-IR").format(
                                      plan.subscription.total_characters -
                                        plan.subscription.remaining_upload_chars
                                    )}{" "}
                                    /{" "}
                                    {new Intl.NumberFormat("fa-IR").format(
                                      plan.subscription.total_characters
                                    )}
                                  </span>
                                  <span className="text-grey-500 text-xs">
                                    {creditPercent.toLocaleString("fa-IR")}٪
                                  </span>
                                </div>
                                <div
                                  className="w-full rounded-full overflow-hidden"
                                  style={{
                                    height: "4px",
                                    backgroundColor: "rgba(0, 0, 0, 0.05)",
                                  }}
                                >
                                  <div
                                    className="h-full rounded-full billing-progress-bar"
                                    style={{
                                      width: `${creditPercent}%`,
                                      backgroundColor:
                                        creditPercent > 90
                                          ? "#ef4444"
                                          : creditPercent > 70
                                          ? "#FFA18E"
                                          : planColor,
                                    }}
                                  />
                                </div>
                              </div>
                            </td>

                            <td className="px-2 sm:px-4 py-3">
                              <div className="flex items-center gap-1 sm:gap-2">
                                <span className="text-grey-700 text-xs sm:text-sm">
                                  {new Intl.NumberFormat("fa-IR").format(
                                    plan.subscription.balance
                                  )}
                                </span>
                                <span className="text-grey-500 text-xs">
                                  ({fileCharPercent}٪)
                                </span>
                              </div>
                            </td>

                            <td className="px-2 sm:px-4 py-3">
                              <div className="flex flex-col gap-1">
                                <time
                                  dateTime={plan.subscription.end_date}
                                  className="text-grey-900 text-xs sm:text-sm whitespace-nowrap"
                                >
                                  {new Date(
                                    plan.subscription.end_date
                                  ).toLocaleDateString("fa-IR")}
                                </time>
                                <span className="text-grey-600 text-xs whitespace-nowrap">
                                  {getDaysRemaining(
                                    plan.subscription.end_date
                                  ).toLocaleString("fa-IR")}{" "}
                                  روز مانده
                                </span>
                              </div>
                            </td>

                            <td className="px-2 sm:px-4 py-3">
                              <div className="flex items-center justify-center">
                                <button
                                  onClick={() => handleUpgrade(plan)}
                                  className="px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg billing-upgrade-btn text-xs sm:text-sm whitespace-nowrap"
                                  style={{
                                    backgroundColor: "#65bcb6",
                                    color: "white",
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                      "#52a89d";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                      "#65bcb6";
                                  }}
                                  title="افزایش اعتبار پیام"
                                  type="button"
                                >
                                  افزایش اعتبار
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </section>

          {/* Available Plans Section */}
          <section
            className="mb-6 sm:mb-8"
            aria-labelledby="available-plans-heading"
          >
            <div className="mb-4">
              <h2
                id="available-plans-heading"
                className="text-grey-900 text-right mb-1 text-xl sm:text-2xl"
              >
                پلن‌های قابل خرید
              </h2>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 text-grey-600 text-right text-sm sm:text-base">
                <span>پلن مناسب خود را انتخاب کنید</span>
                <ChatbotList
                  placeholder="یک چت‌بات را انتخاب کنید"
                  selectedBot={billingBot}
                  onSelect={(bot) => setBillingBot(bot)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 px-0 sm:px-6">
              {plans.map((plan, index) => (
                <PlanCard
                  key={index}
                  name={getFaNameByCode(plan?.plan) || plan?.plan}
                  description={plan?.description}
                  priceMonthly={Number(plan?.price_monthly_irr || 0)}
                  priceYearly={Number(plan?.price_yearly_irr || 0)}
                  period={periods[plan.plan] || "monthly"}
                  onPeriodChange={(p) => handlePeriodChange(plan.plan, p)}
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

          {/*نمایش همه تراکنش‌ها */}
          <Transactions />
        </main>

        <CreditIncreaseModal
          isOpen={isCreditIncreaseModalOpen}
          onClose={() => setIsCreditIncreaseModalOpen(false)}
          selectedChatbot={selectedChatbot}
        />
      </div>
    </div>
  );
}
