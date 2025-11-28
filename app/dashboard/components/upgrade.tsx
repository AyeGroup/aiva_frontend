"use client";
import React, { useEffect, useState } from "react";
import PageLoader from "@/components/pageLoader";
import axiosInstance from "@/lib/axiosInstance";
import { Card } from "@/components/card";
import { toast } from "sonner";
import { useBot } from "@/providers/BotProvider";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { API_ROUTES } from "@/constants/apiRoutes";
import { ChatbotSelector } from "../chatbot-selector";
import { purchaseHistory } from "../billing.data";
import { convertToEnglish } from "@/utils/common";
import { Check, Download, CreditCard } from "lucide-react";
import { billingPeriod, Plan, PurchaseHistory } from "@/types/common";
import {
  getFaNameByCode,
  PLAN_COLORS,
  PLAN_TYPES,
  SUBSCRIPTION_TYPES,
} from "@/constants/plans";

export function Upgrade() {
  const [billingPeriod, setBillingPeriod] = useState<billingPeriod>("monthly");
  const [plans, setPlans] = useState<Plan[]>([]);
  const [subscription, setSubscription] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const { user, loading } = useAuth();
  const { currentBot } = useBot();
  const router = useRouter();
  const endDate = new Date(subscription?.end_date || "").toLocaleDateString(
    "fa-IR"
  );
  const planType = SUBSCRIPTION_TYPES[subscription?.type];
  const planName = PLAN_TYPES[subscription?.plan];

  // 🔹 محاسبه پیام‌های مصرف‌شده (اگر داده واقعی داشتی)
  const usedMessages = 20000 - subscription?.remaining_upload_chars;
  const totalMessages = 20000;

  useEffect(() => {
    if (!user?.token) return;
    if (!currentBot?.uuid) return;

    const fetchAllData = async () => {
      setIsLoading(true);

      try {
        // انجام دو درخواست به صورت موازی
        const [pricingRes, subscriptionRes] = await Promise.all([
          axiosInstance.get(API_ROUTES.PAYMENT.PRICING),
          axiosInstance.get(
            API_ROUTES.FINANCIAL.SUBSCRIPTION(currentBot?.uuid)
          ),
        ]);

        setPlans(pricingRes.data?.data?.subscription_plans ?? []);
        setSubscription(subscriptionRes.data?.data ?? []);
        console.log("plans :", pricingRes.data?.data?.subscription_plans);
        console.log("subscription :", subscriptionRes.data?.data);
      } catch (apiError: any) {
        console.warn("API fetch failed:", apiError);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [user?.token, currentBot?.uuid]);

  const translateFeature = (key: string): string => {
    const dict: Record<string, string> = {
      base_stats: "آمار پایه",
      choosing_llm: "انتخاب مدل هوش مصنوعی",
      usage_reports: "گزارش مصرف",
      upload_docs: "آپلود فایل",
      chatbot_logo: "لوگوی چت‌بات اختصاصی",
      advanced_stats: "آمار پیشرفته",
      website_crawling: "خزش وب‌سایت",
      qa_as_file: "سوال و پاسخ از فایل",
      chatbot_greetings: "پیام خوش‌آمدگویی",
      chatbot_k: "حافظه چت‌بات",
      chatbot_emoji: "استفاده از ایموجی",
      chatbot_support_phone: "پشتیبانی تلفنی",
      chatbot_answer_length: "کنترل طول پاسخ",
    };
    return dict[key] || key;
  };

  const normalizedPlans = plans.map((p, index) => ({
    id: index.toString(),
    plan: p.plan,
    name: getFaNameByCode(p.plan),
    description:
      p.plan === "FREE"
        ? "پلن رایگان برای شروع"
        : "امکانات و ظرفیت بیشتر برای استفاده پیشرفته‌تر",
    color: PLAN_COLORS[p.plan] || "#ccc",
    price:
      p.plan === "FREE"
        ? "۰"
        : Number(p.price_yearly_irr).toLocaleString("fa-IR"),
    priceMonthly:
      p.plan === "FREE"
        ? "۰"
        : Number(p.price_monthly_irr).toLocaleString("fa-IR"),
    features: p.features.map((f) => translateFeature(f)),
    recommended: p.plan === "MEDIUM",
    current: subscription.plan === p.plan,
  }));

  const handlePlanPurchase = (planName: string) => {
    if (planName.toLowerCase() === "enterprise".toLowerCase()) {
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
    console.log("ali:", plan);
    if (plan) {
      localStorage.setItem("returnUrl", window.location.href);

      localStorage.setItem(
        "selectedPlan",
        JSON.stringify({
          ...plan,
          billingPeriod,
        })
      );
      router.push("/pay/checkout");
    }
  };

  const getStatusBadge = (status: PurchaseHistory["status"]) => {
    const styles = {
      success: "bg-green-50 text-green-700 border-green-200",
      failed: "bg-red-50 text-red-700 border-red-200",
      pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
    };

    const labels = {
      success: "موفق",
      failed: "ناموفق",
      pending: "در انتظار",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm border ${styles[status]}`}
      >
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="min-h-screen flex bg-grey-50">
      {/* <Sidebar onNavigate={onNavigate} currentPage="billing" /> */}
      {(isLoading || loading) && <PageLoader />}
      <main className="flex-1 p-8" role="main">
        <div className="mb-8 flex items-center justify-between">
          <header className="mb-8">
            <h1 className="text-grey-900 mb-2 text-right">مدیریت مالی</h1>
            <p className="text-grey-600 text-right">
              مدیریت اشتراک و مشاهده سوابق پرداخت
            </p>
          </header>
          <div>
            <ChatbotSelector />
          </div>
        </div>

        {/* Current Plan Section */}
        <section className="mb-8" aria-labelledby="current-plan-heading">
          <h2
            id="current-plan-heading"
            className="text-grey-900 mb-4 text-right"
          >
            پلن فعلی
          </h2>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: "#65bcb6" }}
                >
                  <CreditCard className="w-8 h-8 text-white" />
                </div>

                <div className="text-right">
                  <h3 className="text-grey-900 mb-1">{planName}</h3>
                  <p className="text-grey-600">
                    {planType} - تا {endDate}
                  </p>
                  <p className="text-grey-500 text-sm mt-1">
                    {usedMessages.toLocaleString("fa-IR")} پیام از{" "}
                    {totalMessages.toLocaleString("fa-IR")} استفاده شده
                  </p>
                </div>
              </div>

              <div className="text-left">
                <p className="text-grey-900 mb-1">
                  {subscription?.balance.toLocaleString("fa-IR")} تومان / ماه
                </p>
                <p className="text-grey-500 text-sm">
                  صورتحساب بعدی: {endDate}
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Billing Period Toggle */}
        <section className="mb-8" aria-labelledby="plans-heading">
          <div className="flex flex-col items-center text-center mb-[90px] mt-[0px] mr-[0px] ml-[0px]">
            <h2 id="plans-heading" className="text-grey-900 mb-3">
              پلن مناسب خود را انتخاب کنید
            </h2>
            <p className="text-grey-600 mb-6">
              با پلن‌های متنوع ما، بهترین گزینه برای کسب‌وکار خود را پیدا کنید
            </p>

            <div className="flex items-center gap-3 bg-gradient-to-br from-grey-50 to-white rounded-3xl p-1.5 border-2 border-grey-200 shadow-sm">
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={`px-6 py-3 rounded-2xl transition-all duration-300 ${
                  billingPeriod === "monthly"
                    ? "bg-gradient-to-br from-brand-primary to-[#4da9a3] text-white shadow-lg scale-105"
                    : "text-grey-600 hover:text-grey-900 hover:bg-grey-100"
                }`}
                title="پرداخت ماهانه"
              >
                پرداخت ماهانه
              </button>
              <button
                onClick={() => setBillingPeriod("yearly")}
                className={`px-6 py-3 rounded-2xl transition-all duration-300 flex items-center gap-2 ${
                  billingPeriod === "yearly"
                    ? "bg-gradient-to-br from-brand-primary to-[#4da9a3] text-white shadow-lg scale-105"
                    : "text-grey-600 hover:text-grey-900 hover:bg-grey-100"
                }`}
                title="پرداخت سالانه"
              >
                <span>پرداخت سالانه</span>
                <span className="px-2.5 py-1 rounded-full text-xs bg-brand-secondary text-white shadow-sm">
                  ۲۰٪ تخفیف
                </span>
              </button>
            </div>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {normalizedPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative group ${
                  plan.recommended ? "lg:scale-105 lg:-mt-4 lg:mb-4" : ""
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-5 left-0 right-0 flex justify-center z-10">
                    <div
                      className="px-5 py-2 rounded-full text-white shadow-lg animate-pulse"
                      style={{
                        background: `linear-gradient(135deg, ${plan.color} 0%, ${plan.color}dd 100%)`,
                      }}
                    >
                      ⭐ پیشنهاد ویژه
                    </div>
                  </div>
                )}

                <Card
                  className={`p-8 relative transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                    plan.recommended
                      ? "border-3 shadow-xl"
                      : "hover:border-grey-300"
                  }`}
                  // style={{
                  //   borderColor: plan.recommended ? plan.color : undefined,
                  //   background: plan.recommended
                  //     ? `linear-gradient(135deg, ${plan.color}05 0%, white 100%)`
                  //     : undefined
                  // }}
                >
                  {plan.current && (
                    <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-green-500 text-white shadow-lg">
                      ✓ فعلی
                    </div>
                  )}

                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div
                      className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-lg transform transition-transform group-hover:rotate-6 group-hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${plan.color} 0%, ${plan.color}cc 100%)`,
                      }}
                    >
                      <div className="text-white">
                        {plan.id === "0" && "🎁"}
                        {plan.id === "1" && "🚀"}
                        {plan.id === "2" && "💎"}
                        {plan.id === "3" && "👑"}
                      </div>
                    </div>
                  </div>

                  {/* Plan Name & Description */}
                  <div className="text-center mb-6">
                    <h3 className="text-grey-900 mb-2">{plan.name}</h3>
                    <p className="text-grey-600 text-sm">{plan.description}</p>
                  </div>

                  {/* Pricing */}
                  <div className="text-center mb-8 pb-6 border-b border-grey-200">
                    {plan.id !== "3" ? (
                      <>
                        <div className="flex items-baseline justify-center gap-2 mb-2">
                          <span
                            className="text-grey-900"
                            style={{
                              fontSize: "2rem",
                              fontWeight: "700",
                              background: plan.recommended
                                ? `linear-gradient(135deg, ${plan.color} 0%, ${plan.color}aa 100%)`
                                : undefined,
                              WebkitBackgroundClip: plan.recommended
                                ? "text"
                                : undefined,
                              WebkitTextFillColor: plan.recommended
                                ? "transparent"
                                : undefined,
                            }}
                          >
                            {/* {plan.price} */}
                            {billingPeriod === "monthly"
                              ? plan.priceMonthly
                              : plan.price}
                          </span>
                          {plan.id !== "0" && (
                            <span className="text-grey-500">تومان</span>
                          )}
                        </div>
                        {plan.id !== "0" && (
                          <p className="text-grey-500 text-sm">
                            {billingPeriod === "monthly" ? "هر ماه" : "هر سال"}
                          </p>
                        )}
                        {plan.priceMonthly && (
                          <p className="text-brand-primary text-sm mt-2">
                            💰 صرفه‌جویی:{" "}
                            {(
                              parseInt(
                                convertToEnglish(
                                  plan.priceMonthly.replace(/٬/g, "")
                                )
                              ) *
                                12 -
                              parseInt(
                                convertToEnglish(plan.price.replace(/٬/g, ""))
                              )
                            ).toLocaleString("fa-IR")}{" "}
                            تومان
                          </p>
                        )}
                      </>
                    ) : (
                      <div>
                        <span
                          className="text-grey-900"
                          style={{ fontSize: "2rem" }}
                        >
                          {plan.price}
                        </span>
                        <p className="text-grey-500 text-sm mt-2">
                          قیمت‌گذاری اختصاصی
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-grey-700 text-sm transition-all hover:translate-x-1"
                      >
                        <div
                          className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                          style={{ backgroundColor: `${plan.color}20` }}
                        >
                          <Check
                            className="w-4 h-4"
                            style={{ color: plan.color }}
                          />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={() => handlePlanPurchase(plan.plan)}
                    disabled={plan.current}
                    title={`خرید پلن ${plan.name}`}
                    className={`w-full py-4 rounded-2xl transition-all duration-300 text-center relative overflow-hidden group/btn ${
                      plan.current
                        ? "bg-grey-200 text-grey-500 cursor-not-allowed"
                        : "text-white shadow-lg hover:shadow-2xl hover:scale-105 transform"
                    }`}
                    style={{
                      background: !plan.current
                        ? `linear-gradient(135deg, ${plan.color} 0%, ${plan.color}dd 100%)`
                        : undefined,
                    }}
                  >
                    {!plan.current && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700" />
                    )}
                    <span className="relative z-10">
                      {plan.current
                        ? "✓ پلن فعلی شما"
                        : plan.id === "3"
                        ? "📞 تماس با فروش"
                        : "🛒 انتخاب و خرید"}
                    </span>
                  </button>
                </Card>
              </div>
            ))}
          </div>

          {/* Bottom Info */}
          <div className="mt-10 text-center">
            <p className="text-grey-600 text-sm">
              تمامی پلن‌ها شامل پشتیبانی فارسی و به‌روزرسانی‌های رایگان می‌باشند
            </p>
            <p className="text-grey-500 text-xs mt-2">
              امکان تغییر یا لغو اشتراک در هر زمان
            </p>
          </div>
        </section>

        {/* Purchase History */}
        <section aria-labelledby="history-heading">
          <h2 id="history-heading" className="text-grey-900 mb-4 text-right">
            سوابق خرید
          </h2>
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-grey-200 bg-grey-50">
                    <th className="text-right px-6 py-4 text-grey-900">
                      شماره فاکتور
                    </th>
                    <th className="text-right px-6 py-4 text-grey-900">
                      تاریخ
                    </th>
                    <th className="text-right px-6 py-4 text-grey-900">پلن</th>
                    <th className="text-right px-6 py-4 text-grey-900">مبلغ</th>
                    <th className="text-right px-6 py-4 text-grey-900">
                      وضعیت
                    </th>
                    <th className="text-right px-6 py-4 text-grey-900">
                      عملیات
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseHistory.map((purchase) => (
                    <tr
                      key={purchase.id}
                      className="border-b border-grey-100 hover:bg-grey-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-grey-900">{purchase.id}</td>
                      <td className="px-6 py-4 text-grey-600">
                        {purchase.date}
                      </td>
                      <td className="px-6 py-4 text-grey-900">
                        {purchase.plan}
                      </td>
                      <td className="px-6 py-4 text-grey-900">
                        {purchase.amount}
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(purchase.status)}
                      </td>
                      <td className="px-6 py-4">
                        {purchase.status === "success" &&
                          purchase.invoiceUrl && (
                            <button
                              onClick={() =>
                                toast.success("دانلود فاکتور شروع شد")
                              }
                              className="flex items-center gap-2 text-brand-primary hover:text-brand-primary/80 transition-colors"
                              title="دانلود فاکتور"
                            >
                              <Download className="w-4 h-4" />
                              <span>دانلود</span>
                            </button>
                          )}
                        {purchase.status === "failed" && (
                          <button
                            onClick={() =>
                              toast.info("در حال انتقال به درگاه پرداخت...")
                            }
                            className="text-brand-secondary hover:text-brand-secondary/80 transition-colors"
                            title="پرداخت مجدد"
                          >
                            پرداخت مجدد
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>
      </main>

      {/* <Toaster position="top-center"  /> */}
    </div>
  );
}
