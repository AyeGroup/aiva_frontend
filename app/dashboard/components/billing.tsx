import React, { useEffect, useState } from "react";
// import { Sidebar } from "./sidebar";
// import { Card } from "../_components/Card/card";
// import { Button } from "../_components/Button/button";
// import { ChatbotPlanCard } from "../_components/ChatbotPlanCard/chatbot-plan-card";
// import { CreditSummaryCard } from "../_components/CreditSummaryCard/credit-summary-card";
import {
  AlertCircle,
  TrendingUp,
  Download,
  RefreshCw,
  X,
  MessageCircle,
  FileText,
  Zap,
  Bot,
} from "lucide-react";
import { toast } from "sonner";
import { CreditSummaryCard } from "@/components/credit-summary-card";
import { Card } from "@/components/card";
import { Button } from "@/components/button";
import { ChatbotPlanCard } from "@/components/chatbot-plan-card";
import { useAuth } from "@/providers/AuthProvider";
import { useBot } from "@/providers/BotProvider";
import axiosInstance from "@/lib/axiosInstance";
import { API_ROUTES } from "@/constants/apiRoutes";

interface ChatbotPlan {
  id: string;
  chatbotName: string;
  planName: string;
  planColor: string;
  totalCredit: number; // اعتبار کل (پیام)
  usedCredit: number; // اعتبار استفاده شده
  totalFileChars: number; // کاراکتر فایل کل
  usedFileChars: number; // کاراکتر فایل استفاده شده
  expiryDate: string;
  daysLeft: number; // روزهای باقیمانده
}

interface Transaction {
  id: string;
  date: string;
  planName: string;
  chatbotName: string;
  amount: string;
  status: "success" | "failed" | "pending";
  invoiceUrl?: string;
}

export function Billing() {
  const [showDiscountHint, setShowDiscountHint] = useState(true);

  // داده‌های پلن‌های چت‌بات‌ها
  const chatbotPlans: ChatbotPlan[] = [
    {
      id: "cb-1",
      chatbotName: "چت‌بات فروشگاه",
      planName: "پیشرفته",
      planColor: "#65bcb6", // سبز آبی
      totalCredit: 20000,
      usedCredit: 18500,
      totalFileChars: 500000,
      usedFileChars: 450000,
      expiryDate: "۱۴۰۳/۱۰/۲۵",
      daysLeft: 5,
    },
    {
      id: "cb-2",
      chatbotName: "پشتیبانی مشتریان",
      planName: "پایه",
      planColor: "#7c89b8", // آبی بنفش
      totalCredit: 5000,
      usedCredit: 2300,
      totalFileChars: 200000,
      usedFileChars: 85000,
      expiryDate: "۱۴۰۳/۱۱/۱۵",
      daysLeft: 35,
    },
    {
      id: "cb-3",
      chatbotName: "فروش آنلاین",
      planName: "متوسط",
      planColor: "#52d4a0", // سبز زمردی
      totalCredit: 20000,
      usedCredit: 5200,
      totalFileChars: 500000,
      usedFileChars: 120000,
      expiryDate: "۱۴۰۴/۰۱/۰۵",
      daysLeft: 70,
    },
    {
      id: "cb-4",
      chatbotName: "خدمات مشاوره",
      planName: "سازمانی",
      planColor: "#b07cc6", // بنفش
      totalCredit: 15000,
      usedCredit: 8200,
      totalFileChars: 350000,
      usedFileChars: 180000,
      expiryDate: "۱۴۰۳/۱۲/۱۰",
      daysLeft: 60,
    },
    {
      id: "cb-5",
      chatbotName: "رزرواسیون",
      planName: "رایگان",
      planColor: "#FFA18E", // نارنجی
      totalCredit: 5000,
      usedCredit: 3800,
      totalFileChars: 200000,
      usedFileChars: 160000,
      expiryDate: "۱۴۰۳/۱۱/۰۵",
      daysLeft: 25,
    },
    {
      id: "cb-6",
      chatbotName: "سفارش‌گیری",
      planName: "پیشرفته",
      planColor: "#f59e0b", // زرد/عنبری
      totalCredit: 15000,
      usedCredit: 4500,
      totalFileChars: 350000,
      usedFileChars: 95000,
      expiryDate: "۱۴۰۴/۰۲/۱۲",
      daysLeft: 105,
    },
  ];

  // تراکنش‌ها
  const transactions: Transaction[] = [
    {
      id: "TRX-2024-001",
      date: "۱۴۰۳/۰۹/۲۰",
      planName: "پیشرفته - سالانه",
      chatbotName: "چت‌بات فروشگاه",
      amount: "۷,۶۷۰,۰۰۰ تومان",
      status: "success",
      invoiceUrl: "#",
    },
    {
      id: "TRX-2024-002",
      date: "۱۴۰۳/۰۹/۱۵",
      planName: "پایه - ماهانه",
      chatbotName: "پشتیبانی مشتریان",
      amount: "۲۹۹,۰۰۰ تومان",
      status: "success",
      invoiceUrl: "#",
    },
    {
      id: "TRX-2024-003",
      date: "۱۴۰۳/۰۹/۱۰",
      planName: "متوسط - ماهانه",
      chatbotName: "فروش آنلاین",
      amount: "۷۹۹,۰۰۰ تومان",
      status: "pending",
    },
    {
      id: "TRX-2024-004",
      date: "۱۴۰۳/۰۹/۰۵",
      planName: "سازمانی - سالانه",
      chatbotName: "خدمات مشاوره",
      amount: "۴,۹۹۰,۰۰۰ تومان",
      status: "success",
      invoiceUrl: "#",
    },
    {
      id: "TRX-2024-005",
      date: "۱۴۰۳/۰۸/۲۵",
      planName: "رایگان - ماهانه",
      chatbotName: "رزرواسیون",
      amount: "۰ تومان",
      status: "success",
      invoiceUrl: "#",
    },
    {
      id: "TRX-2024-006",
      date: "۱۴۰۳/۰۸/۲۰",
      planName: "پیشرفته - سالانه",
      chatbotName: "سفارش‌گیری",
      amount: "۴,۹۹۰,۰۰۰ تومان",
      status: "failed",
    },
    {
      id: "TRX-2024-007",
      date: "۱۴۰۳/۰۸/۱۵",
      planName: "پیشرفته - سالانه",
      chatbotName: "چت‌بات فروشگاه",
      amount: "۷,۶۷۰,۰۰۰ تومان",
      status: "success",
      invoiceUrl: "#",
    },
  ];

  const handleUpgrade = (chatbotId: string, chatbotName: string) => {
    toast.info(`در حال انتقال به صفحه ارتقا برای ${chatbotName}...`);
    // می‌توان به صفحه پلن‌ها یا checkout هدایت شود
  };

  const getStatusBadge = (status: Transaction["status"]) => {
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

  const calculatePercentage = (used: number, total: number): number => {
    return Math.round((used / total) * 100);
  };

  const getProgressColor = (percentage: number): string => {
    if (percentage >= 90) return "#FF6B6B";
    if (percentage >= 70) return "#FFA18E";
    return "#65bcb6";
  };

  // پیدا کردن پلنی که رو به اتمام است (کمتر از 10 روز)
  const expiringPlan = chatbotPlans.find((p) => p.daysLeft <= 10);

  // محاسبه آمار کلی
  const totalChatbots = chatbotPlans.length;
  const totalCredit = chatbotPlans.reduce(
    (sum, plan) => sum + (plan.totalCredit - plan.usedCredit),
    0
  );
  const totalFileChars = chatbotPlans.reduce(
    (sum, plan) => sum + (plan.totalFileChars - plan.usedFileChars),
    0
  );
  const totalUsedCredit = chatbotPlans.reduce(
    (sum, plan) => sum + plan.usedCredit,
    0
  );
  const { user, loading } = useAuth();
  const { currentBot } = useBot();
  const [isLoading, setIsLoading] = useState(false);
  const [subscription, setSubscription] = useState<any>();

useEffect(() => {
  if (!user?.token) return;
  if (!currentBot?.uuid) return;

  const fetchAllData = async () => {
    setIsLoading(true);

    try {
      const res = await axiosInstance.get(
        API_ROUTES.FINANCIAL.SUBSCRIPTION(currentBot.uuid)
      );

      setSubscription(res.data?.data ?? []);
      console.log("subscription :", res.data?.data);
    } catch (apiError: any) {
      console.warn("API fetch failed:", apiError);
    } finally {
      setIsLoading(false);
    }
  };

  fetchAllData();
}, [user?.token, currentBot?.uuid]);

  return (
    <div className="min-h-screen flex bg-grey-50" dir="rtl">
      {/* <Sidebar onNavigate={onNavigate} currentPage="billing" /> */}

      <main className="flex-1 p-8" role="main">
        <header className="mb-8">
          <div className="text-right">
            <h1 className="text-grey-900 mb-2">مالی و اشتراک</h1>
            <p className="text-grey-600">
              مدیریت پلن‌ها، اعتبار و تراکنش‌های مالی
            </p>
          </div>
        </header>

        {/* Credit Summary Cards */}
        <section className="mb-8" aria-label="خلاصه اعتبار">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <CreditSummaryCard
              title="تعداد چت‌بات‌ها"
              value={totalChatbots.toLocaleString("fa-IR")}
              subtitle="چت‌بات فعال"
              color="#65bcb6"
              icon={<Bot />}
              trend="neutral"
            />
            <CreditSummaryCard
              title="اعتبار پیام باقیمانده"
              value={totalCredit.toLocaleString("fa-IR")}
              subtitle="پیام در تمام چت‌بات‌ها"
              color="#7c89b8"
              icon={<MessageCircle />}
              trend="down"
              trendValue={`${totalUsedCredit.toLocaleString(
                "fa-IR"
              )} استفاده شده`}
            />
            <CreditSummaryCard
              title="کاراکتر فایل باقیمانده"
              value={`${(totalFileChars / 1000).toLocaleString("fa-IR")}K`}
              subtitle="کاراکتر در تمام چت‌بات‌ها"
              color="#52d4a0"
              icon={<FileText />}
              trend="neutral"
            />
            <CreditSummaryCard
              title="نزدیک‌ترین انقضا"
              value={expiringPlan ? `${expiringPlan.daysLeft} روز` : "—"}
              subtitle={
                expiringPlan ? expiringPlan.chatbotName : "بدون پلن منقضی شده"
              }
              color={expiringPlan ? "#FF6B6B" : "#65bcb6"}
              icon={<Zap />}
              trend={
                expiringPlan && expiringPlan.daysLeft <= 10 ? "down" : "neutral"
              }
            />
          </div>
        </section>

        {/* Discount & Expiring Alert */}
        {showDiscountHint && expiringPlan && (
          <section className="mb-8" aria-label="هشدار و اطلاعیه‌ها">
            <Card className="p-0 overflow-hidden border-2 bg-[#FFA18E]">
              <div
                className="px-6 py-4 flex items-start gap-4"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255, 161, 142, 0.1) 0%, rgba(255, 161, 142, 0.05) 100%)",
                }}
              >
                <div className="flex-shrink-0 mt-1">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: "#FFA18E" }}
                  >
                    <AlertCircle className="w-5 h-5 text-white" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-grey-900 mb-2 text-right">
                        ⚠️ اعتبار در حال اتمام - تخفیف ویژه تمدید!
                      </h3>
                      <p className="text-grey-700 mb-3">
                        پلن «{expiringPlan.chatbotName}» تنها{" "}
                        <strong className="text-red-600">
                          {expiringPlan.daysLeft} روز
                        </strong>{" "}
                        دیگر منقضی می‌شود. با تمدید همین الان، از{" "}
                        <strong className="text-green-600">
                          ۲۰٪ تخفیف ویژه
                        </strong>{" "}
                        بهره‌مند شوید!
                      </p>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="primary"
                          size="sm"
                          title="تمدید با تخفیف"
                          onClick={() =>
                            handleUpgrade(
                              expiringPlan.id,
                              expiringPlan.chatbotName
                            )
                          }
                        >
                          🎁 تمدید با تخفیف
                        </Button>
                        <button
                          onClick={() =>
                            toast.info("اطلاعات بیشتر درباره تخفیف...")
                          }
                          className="text-brand-primary hover:underline text-sm"
                          title="اطلاعات بیشتر"
                        >
                          ��طلاعات بیشتر
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowDiscountHint(false)}
                      className="flex-shrink-0 p-1 hover:bg-grey-200 rounded-lg transition-colors"
                      title="بستن هشدار"
                      aria-label="بستن هشدار"
                    >
                      <X className="w-5 h-5 text-grey-600" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </section>
        )}

        {/* Chatbot Plans Cards */}
        <section className="mb-8" aria-labelledby="chatbot-plans-heading">
          <h2
            id="chatbot-plans-heading"
            className="text-grey-900 mb-6 text-right"
          >
            پلن‌های چت‌بات‌ها
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chatbotPlans.map((plan) => (
              <ChatbotPlanCard
                key={plan.id}
                chatbotName={plan.chatbotName}
                planName={plan.planName}
                planColor={plan.planColor}
                totalCredit={plan.totalCredit}
                usedCredit={plan.usedCredit}
                totalFileChars={plan.totalFileChars}
                usedFileChars={plan.usedFileChars}
                expiryDate={plan.expiryDate}
                daysLeft={plan.daysLeft}
                onUpgrade={() => handleUpgrade(plan.id, plan.chatbotName)}
              />
            ))}
          </div>
        </section>

        {/* Transaction History */}
        <section aria-labelledby="transactions-heading">
          <h2
            id="transactions-heading"
            className="text-grey-900 mb-4 text-right"
          >
            تاریخچه تراکنش‌ها
          </h2>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-grey-200 bg-grey-50">
                    <th className="text-right px-6 py-4 text-grey-900">
                      شناسه
                    </th>
                    <th className="text-right px-6 py-4 text-grey-900">
                      تاریخ
                    </th>
                    <th className="text-right px-6 py-4 text-grey-900">پلن</th>
                    <th className="text-right px-6 py-4 text-grey-900">
                      چت‌بات
                    </th>
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
                  {transactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="border-b border-grey-100 hover:bg-grey-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-grey-900 font-mono text-sm">
                        {transaction.id}
                      </td>
                      <td className="px-6 py-4 text-grey-600">
                        {transaction.date}
                      </td>
                      <td className="px-6 py-4 text-grey-900">
                        {transaction.planName}
                      </td>
                      <td className="px-6 py-4 text-grey-700">
                        {transaction.chatbotName}
                      </td>
                      <td className="px-6 py-4 text-grey-900">
                        {transaction.amount}
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(transaction.status)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {transaction.status === "success" &&
                            transaction.invoiceUrl && (
                              <button
                                onClick={() =>
                                  toast.success("دانلود فاکتور شروع شد")
                                }
                                className="flex items-center gap-1 text-brand-primary hover:text-brand-primary/80 transition-colors text-sm"
                                title="دانلود فاکتور"
                              >
                                <Download className="w-4 h-4" />
                                دانلود
                              </button>
                            )}
                          {transaction.status === "failed" && (
                            <button
                              onClick={() =>
                                toast.info("در حال انتقال به درگاه پرداخت...")
                              }
                              className="flex items-center gap-1 text-brand-secondary hover:text-brand-secondary/80 transition-colors text-sm"
                              title="پرداخت مجدد"
                            >
                              <RefreshCw className="w-4 h-4" />
                              پرداخت مجدد
                            </button>
                          )}
                          {transaction.status === "pending" && (
                            <span className="text-grey-500 text-sm">
                              در حال بررسی...
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>
      </main>

      {/* <Toaster position="top-center" dir="rtl" /> */}
    </div>
  );
}
