"use client";
import React, { useEffect, useState } from "react";
import {
  AlertCircle,
  TrendingUp,
  Download,
  RefreshCw,
  X,
  MessageCircle,
  FileText,
  Bot,
  Filter,
  ChevronDown,
  Share2,
  Rocket,
  Crown,
  Star,
  Gift,
  Users,
} from "lucide-react";
import { Card } from "@/components/card";
import { Modal } from "../modal";
import { toast } from "sonner";
import { useBot } from "@/providers/BotProvider";
import { Button } from "@/components/button";
import { useAuth } from "@/providers/AuthProvider";
import { PlanCard } from "../plan-card";
import { useRouter } from "next/navigation";
import { API_ROUTES } from "@/constants/apiRoutes";
import { WalletCard } from "../wallet-card";
import { convertToPersian, getDaysRemaining } from "@/utils/common";
import {
  getFaNameByCode,
  getPlanNameById,
  getTransactionTitle,
  PLAN_COLORS_BYID,
  TRANSACTION_TYPE,
} from "@/constants/plans";
import axiosInstance from "@/lib/axiosInstance";
import { CreditIncreaseModal } from "./CreditIncrease";
import { Transactions } from "../Transactions";

interface Transaction {
  id: string;
  date: string;
  planName?: string;
  chatbotName?: string;
  amount: string;
  status: "success" | "failed" | "pending";
  invoiceUrl?: string;
  type: "plan" | "wallet";
  walletType?: "deposit" | "withdraw";
}

export function Billing() {
  const { bots } = useBot();
  const { user, loading } = useAuth();
  const router = useRouter();
  const maxDays = 31;
  const maxCredit = 85;
  const [showDiscountHint, setShowDiscountHint] = useState(true);
  const [transactionFilter, setTransactionFilter] = useState<
    "all" | "plan" | "wallet"
  >("all");
  const [walletTypeFilter, setWalletTypeFilter] = useState<
    "all" | "deposit" | "withdraw"
  >("all");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
 
  const [isCreditIncreaseModalOpen, setIsCreditIncreaseModalOpen] =
    useState(false);
  const [selectedChatbot, setSelectedChatbot] = useState<any>(null);
  const [activeSubscrp, setActiveSubscrp] = useState<any[]>([]);
  // const [selectedChatbotName, setSelectedChatbotName] = useState<string>("");
  // const [messageCount, setMessageCount] = useState<string>("1000");
  const [isLoading, setIsLoading] = useState(true);
  const [expiringPlan, setExpiringPlan] = useState<any>(null);
  const [plans, setPlans] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [period, setPeriod] = useState<"monthly" | "yearly">("monthly");

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

        console.log("expiringPlan", expiring);
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

        // console.log("allPlans :", allPlans);
        // console.log("filteredPlans :", filteredPlans);
      } catch (apiError: any) {
        console.warn("API fetch failed:", apiError);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [user?.token]);

  useEffect(() => {
    if (!user?.token) return;

    const fetchHistory = async () => {
      setIsLoading(true);

      try {
        const res = await axiosInstance.get(
          API_ROUTES.FINANCIAL.TRANSACTION_ALL
        );

        setTransactions(res.data?.data);
        console.log("HISTORY :", res.data?.data);
      } catch (apiError: any) {
        console.warn("API fetch failed:", apiError);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
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
  const getPlanIcon = (planCode: string) => {
    switch (planCode.toUpperCase()) {
      case "FREE":
        return <Gift />;
      case "BASIC":
        return <Rocket />;
      case "MEDIUM":
        return <Crown />;
      case "ADVANCE":
        return <Star />;
      case "ENTERPRISE":
        return <Users />;
      default:
        return <Gift />;
    }
  };

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
          period,
        })
      );
      router.push("/pay/checkout");
    }
  };

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

  const walletTransactions = [
    {
      id: "WT-001",
      type: "deposit" as const,
      amount: 3000000,
      description: "واریز به کیف پول از طریق درگاه بانکی",
      date: "2024-01-15",
      status: "completed" as const,
    },
    {
      id: "WT-002",
      type: "withdraw" as const,
      amount: 299000,
      description: "خرید پلن پایه - پشتیبانی مشتریان",
      date: "2024-01-10",
      status: "completed" as const,
    },
    {
      id: "WT-003",
      type: "withdraw" as const,
      amount: 799000,
      description: "خرید پلن متوسط - فروش آنلاین",
      date: "2024-01-08",
      status: "completed" as const,
    },
    {
      id: "WT-004",
      type: "deposit" as const,
      amount: 500000,
      description: "واریز به کیف پول از طریق کارت به کارت",
      date: "2024-01-05",
      status: "pending" as const,
    },
    {
      id: "WT-005",
      type: "withdraw" as const,
      amount: 1500000,
      description: "خرید پلن سازمانی - ارتباط با مشتری",
      date: "2024-01-02",
      status: "completed" as const,
    },
  ];

  const totalDeposit = walletTransactions
    .filter((t) => t.type === "deposit" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalWithdraw = walletTransactions
    .filter((t) => t.type === "withdraw" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  // تبدیل تاریخ فارسی به میلادی برای مقایسه

  // فیلتر تراکنش‌ها
  const filteredTransactions = transactions.filter((transaction) => {
    // فیلتر نوع (پلن/کیف پول)
    if (transactionFilter === "plan" && transaction.type !== "plan")
      return false;
    if (transactionFilter === "wallet" && transaction.type !== "wallet")
      return false;

    // فیلتر نوع تراکنش کیف پول (واریز/برداشت)
    if (transaction.type === "wallet" && walletTypeFilter !== "all") {
      if (
        walletTypeFilter === "deposit" &&
        transaction.walletType !== "deposit"
      )
        return false;
      if (
        walletTypeFilter === "withdraw" &&
        transaction.walletType !== "withdraw"
      )
        return false;
    }

    // فیلتر تاریخ
    if (dateFrom || dateTo) {
      const transactionDate = transaction.date;
      if (!transactionDate) return false;

      if (dateFrom) {
        const fromDate = new Date(dateFrom);
        if (transactionDate < fromDate) return false;
      }

      if (dateTo) {
        const toDate = new Date(dateTo);
        toDate.setHours(23, 59, 59, 999); // انتهای روز
        if (transactionDate > toDate) return false;
      }
    }

    return true;
  });
  // console.log("filteredTransactions", filteredTransactions);

  // پاکسازی فیلترها

  const handleUpgrade = (chatbot: any ) => {
    setSelectedChatbot(chatbot);
    setIsCreditIncreaseModalOpen(true);
  };

  // محاسبه قیمت بر اساس تعداد پیام (قیمت‌گذاری پله‌ای)
  const calculateMessagePrice = (
    count: number
  ): { pricePerMessage: number; discount: number; discountPercent: number } => {
    if (count >= 50000) {
      return { pricePerMessage: 25, discount: 15, discountPercent: 15 }; // 15% تخفیف
    } else if (count >= 20000) {
      return { pricePerMessage: 30, discount: 10, discountPercent: 10 }; // 10% تخفیف
    } else if (count >= 10000) {
      return { pricePerMessage: 35, discount: 5, discountPercent: 5 }; // 5% تخفیف
    } else if (count >= 5000) {
      return { pricePerMessage: 40, discount: 0, discountPercent: 0 };
    } else {
      return { pricePerMessage: 50, discount: 0, discountPercent: 0 };
    }
  };

 

 

  const getProgressColor = (percentage: number): string => {
    if (percentage >= 90) return "#FF6B6B";
    if (percentage >= 70) return "#FFA18E";
    return "#65bcb6";
  };


  // محاسبه آمار کلی
  // const totalChatbots = activeSubscrp.length;
  // const totalCredit = activeSubscrp.reduce(
  //   (sum, plan) => sum + (plan.totalCredit - plan.usedCredit),
  //   0
  // );
  // const totalFileChars = activeSubscrp.reduce(
  //   (sum, plan) => sum + (plan.totalFileChars - plan.usedFileChars),
  //   0
  // );
  // const totalUsedCredit = activeSubscrp.reduce(
  //   (sum, plan) => sum + plan.usedCredit,
  //   0
  // );

  return (
    <div className="min-h-screen flex bg-grey-50" dir="rtl">

      <main className="flex-1 p-8" role="main">
        <header className="mb-8">
          <div className="text-right">
            <h1 className="text-grey-900 mb-2"> مالی و اشتراک</h1>
            <p className="text-grey-600">
              مدیریت پلن‌ها، اعتبار و تراکنش‌های مالی
            </p>
          </div>
        </header>

        {/* Credit Summary Cards */}
        <section className="mb-8" aria-label="خلاصه اعتبار">
          <WalletCard
            // balance={walletBalance}
            totalDeposit={totalDeposit}
            totalWithdraw={totalWithdraw}
            transactions={walletTransactions}
            onAddCredit={() => {
              toast.success("افزایش موجودی", {
                description: "به صفحه پرداخت منتقل می‌شوید...",
                duration: 2000,
              });
              setTimeout(() => router.push("/dashboard?tab=billing"), 2000);
            }}
            onDownloadHistory={() => {
              toast.success("دانلود تاریخچه", {
                description: "فایل تاریخچه تراکنش‌ها در حال آماده‌سازی است",
                duration: 3000,
              });
            }}
          />
        </section>

        {/* Discount & Expiring Alert */}
        {showDiscountHint && expiringPlan && (
          <section className="mb-8" aria-label="هشدار و اطلاعیه‌ها">
            <Card className="p-0 overflow-hidden border-2 bg-[#FFA18E] mb-4">
              <div
                className="px-6 py-4 flex flex-col gap-4"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255, 161, 142, 0.1) 0%, rgba(255, 161, 142, 0.05) 100%)",
                }}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: "#FFA18E" }}
                    >
                      <AlertCircle className="w-5 h-5 text-white" />
                    </div>{" "}
                    <h3 className="text-grey-900 mb-2 text-right">
                      ⚠️ پلن در حال منقضی شدن
                    </h3>
                  </div>

                  <button
                    onClick={() => setShowDiscountHint(false)}
                    className="p-1 hover:bg-grey-200 rounded-lg transition-colors"
                    title="بستن هشدار"
                    aria-label="بستن هشدار"
                  >
                    <X className="w-5 h-5 text-grey-600" />
                  </button>
                </div>

                {expiringPlan.map((plan: any, index: number) => (
                  <div
                    key={index}
                    // key={plan.id}
                    className="flex justify-between items-center text-grey-700 mx-4 my-2 text-right"
                  >
                    <div className="my-4">
                      پلن چت‌بات <strong>{plan.chatbot_name}</strong>{" "}
                      {plan.daysRemaining <= maxDays ? (
                        <>
                          <strong className="text-red-600">
                            {plan.daysRemaining} روز
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
                        onClick={() =>
                          handleUpgrade(plan )
                        }
                      >
                        تمدید پلن
                      </Button>
                    ) : (
                      <Button
                        variant="secondary"
                        size="sm"
                        title="افزایش اعتبار"
                        onClick={
                          () => handleUpgrade(plan)
                        }
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
        <section className="mb-8" aria-labelledby="chatbot-plans-heading">
          <div className="mb-6">
            <h2 id="chatbot-plans-heading" className="text-grey-900 text-right">
              پلن‌های فعال چت‌بات‌ها
            </h2>
            <p className="text-grey-600 text-right mt-2">
              مشاهده و مدیریت پلن‌های فعال چت‌بات‌های شما
            </p>
          </div>

          <Card>
            {activeSubscrp.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: "rgba(101, 188, 182, 0.1)" }}
                >
                  <Bot
                    style={{ width: "32px", height: "32px", color: "#65BCB6" }}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-grey-900 mb-2">
                  هیچ چت‌بات فعالی وجود ندارد
                </h3>
                <p className="text-grey-600 text-center max-w-md mb-4">
                  برای شروع، یک چت‌بات جدید ایجاد کنید و پلن مورد نظر را خریداری
                  کنید
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
                <table className="w-full" dir="rtl">
                  <thead>
                    <tr className="border-b border-grey-200">
                      <th className="px-4 py-3 text-right text-grey-600">
                        چت‌بات
                      </th>
                      <th className="px-4 py-3 text-right text-grey-600">
                        پلن
                      </th>
                      <th className="px-4 py-3 text-right text-grey-600">
                        کاراکتر
                      </th>
                      <th className="px-4 py-3 text-right text-grey-600">
                        اعتبار
                      </th>
                      <th className="px-4 py-3 text-right text-grey-600">
                        انقضا
                      </th>
                      <th className="px-4 py-3 text-center text-grey-600">
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
                          className="border-b border-grey-100 hover:bg-grey-50"
                        >
                          {/* چت‌بات */}
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{
                                  backgroundColor: `${planColor}20`,
                                }}
                              >
                                <Bot
                                  style={{
                                    width: "18px",
                                    height: "18px",
                                    color: planColor,
                                  }}
                                  aria-hidden="true"
                                />
                              </div>
                              <span className="text-grey-900">
                                {plan.chatbot_name}
                              </span>
                            </div>
                          </td>

                          {/* پلن */}
                          <td className="px-4 py-3">
                            <span
                              className="inline-block px-3 py-1 rounded-lg"
                              style={{
                                backgroundColor: `${
                                  PLAN_COLORS_BYID[plan.subscription.plan]
                                }15`,
                                color: PLAN_COLORS_BYID[plan.subscription.plan],
                              }}
                            >
                              {getPlanNameById(plan.subscription.plan)}
                            </span>
                          </td>

                          {/* اعتبار پیام */}
                          <td className="px-4 py-3">
                            <div className="flex flex-col gap-1.5">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-grey-900">
                                  {new Intl.NumberFormat("fa-IR").format(
                                    plan.subscription.total_characters -
                                      plan.subscription.remaining_upload_chars
                                  )}{" "}
                                  /{" "}
                                  {new Intl.NumberFormat("fa-IR").format(
                                    plan.subscription.total_characters
                                  )}
                                </span>
                                <span className="text-grey-500">
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
                                        : plan.planColor,
                                  }}
                                />
                              </div>
                            </div>
                          </td>

                          {/* کاراکتر فایل */}
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <span className="text-grey-700">
                                {new Intl.NumberFormat("fa-IR").format(
                                  plan.subscription.balance
                                )}
                              </span>
                              <span className="text-grey-500">
                                ({fileCharPercent}٪)
                              </span>
                            </div>
                          </td>

                          {/* انقضا */}
                          <td className="px-4 py-3">
                            <div className="flex flex-col gap-1">
                              <time
                                dateTime={plan.subscription.end_date}
                                className="text-grey-900"
                              >
                                {new Date(
                                  plan.subscription.end_date
                                ).toLocaleDateString("fa-IR")}
                              </time>
                              <span className="text-grey-600">
                                {getDaysRemaining(
                                  plan.subscription.end_date
                                ).toLocaleString("fa-IR")}{" "}
                                روز مانده
                              </span>
                            </div>
                          </td>

                          {/* عملیات */}
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-center">
                              <button
                                onClick={() =>
                                  handleUpgrade(plan )
                                }
                                className="px-4 py-2 rounded-lg billing-upgrade-btn"
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
        <section className="mb-8" aria-labelledby="available-plans-heading">
          <div className="mb-4">
            <h2
              id="available-plans-heading"
              className="text-grey-900 text-right mb-1"
            >
              پلن‌های قابل خرید
            </h2>
            <p className="text-grey-600 text-right">
              پلن مناسب خود را انتخاب کنید
            </p>
          </div>

          <div className="available-plans-grid">
            {plans.map((plan, index) => (
              <PlanCard
                key={index}
                name={getFaNameByCode(plan?.plan) || plan?.plan}
                description=""
                priceMonthly={Number(plan?.price_monthly_irr || 0)}
                priceYearly={Number(plan?.price_yearly_irr || 0)}
                period={period}
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
        // calculateMessagePrice={calculateMessagePrice}
        // handleCreditIncrease={handleCreditIncrease}
      />
    </div>
  );
}
