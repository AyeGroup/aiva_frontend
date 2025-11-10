"use client";
import React, { useEffect, useState } from "react";
// import { Sidebar } from "./sidebar";
// import { Card } from "../_components/Card/card";
// import { Button } from "../_components/Button/button";
// import { ChatbotPlanCard } from "../_components/ChatbotPlanCard/chatbot-plan-card";
// import { WalletCard } from "../_components/WalletCard/wallet-card";
// import { Modal } from "../_components/Modal/modal";
// import { PlanCard } from "../_components/PlanCard/plan-card";
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
  Filter,
  ChevronDown,
  Share2,
  Rocket,
  Crown,
  Star,
  Gift,
  ArrowUp,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { WalletCard } from "../wallet-card";
import { useRouter } from "next/navigation";
import { Card } from "@/components/card";
import { PlanCard } from "../plan-card";
import { Button } from "@/components/button";
import { Modal } from "../modal";
import axiosInstance from "@/lib/axiosInstance";
import { API_ROUTES } from "@/constants/apiRoutes";
import { useAuth } from "@/providers/AuthProvider";
// import { Toaster } from "../../components/ui/sonner";
// import "./billing.css";

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
  planName?: string;
  chatbotName?: string;
  amount: string;
  status: "success" | "failed" | "pending";
  invoiceUrl?: string;
  type: "plan" | "wallet";
  walletType?: "deposit" | "withdraw";
}

export function Billing() {
  const [showDiscountHint, setShowDiscountHint] = useState(true);
  const [transactionFilter, setTransactionFilter] = useState<
    "all" | "plan" | "wallet"
  >("all");
  const [walletTypeFilter, setWalletTypeFilter] = useState<
    "all" | "deposit" | "withdraw"
  >("all");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAllTransactionsModalOpen, setIsAllTransactionsModalOpen] =
    useState(false);

  // States for Credit Increase Modal
  const [isCreditIncreaseModalOpen, setIsCreditIncreaseModalOpen] =
    useState(false);
  const [selectedChatbotId, setSelectedChatbotId] = useState<string>("");
  const [activeSubscrp, setActiveSubscrp] = useState<any[]>([]);
     const { user, loading } = useAuth();
   
  const [selectedChatbotName, setSelectedChatbotName] = useState<string>("");
  const [messageCount, setMessageCount] = useState<string>("1000");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
     const fetchData = async () => {
      //  if (!currentBot) return;
       setIsLoading(true);
       try {
         const response = await axiosInstance.get(
           API_ROUTES.FINANCIAL.SUBSCRIPTIONS
         );
         setActiveSubscrp(response.data.data);
       } catch (error) {
         console.error("  خطا در دریافت داده کاربران:", error);
       } finally {
         setIsLoading(false);
       }
     };
     fetchData();
   }, [user]);


  // داده‌های کیف پول
  const walletBalance = 2450000; // تومان
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

  // داده‌های پلن‌های چت‌بات‌ها
  // const chatbotPlans: ChatbotPlan[] = [
  //   {
  //     id: "cb-1",
  //     chatbotName: "چت‌بات فروشگاه",
  //     planName: "پیشرفته",
  //     planColor: "#65bcb6", // سبز آبی
  //     totalCredit: 20000,
  //     usedCredit: 18500,
  //     totalFileChars: 500000,
  //     usedFileChars: 450000,
  //     expiryDate: "۱۴۰۳/۱۰/۲۵",
  //     daysLeft: 5,
  //   },
  //   {
  //     id: "cb-2",
  //     chatbotName: "پشتیبانی مشتریان",
  //     planName: "پایه",
  //     planColor: "#7c89b8", // آبی بنفش
  //     totalCredit: 5000,
  //     usedCredit: 2300,
  //     totalFileChars: 200000,
  //     usedFileChars: 85000,
  //     expiryDate: "۱۴۰۳/۱۱/۱۵",
  //     daysLeft: 35,
  //   },
  //   {
  //     id: "cb-3",
  //     chatbotName: "فروش آنلاین",
  //     planName: "متوسط",
  //     planColor: "#52d4a0", // سبز زمردی
  //     totalCredit: 20000,
  //     usedCredit: 5200,
  //     totalFileChars: 500000,
  //     usedFileChars: 120000,
  //     expiryDate: "۱۴۰۴/۰۱/۰۵",
  //     daysLeft: 70,
  //   },
  //   {
  //     id: "cb-4",
  //     chatbotName: "خدمات مشاوره",
  //     planName: "سازمانی",
  //     planColor: "#b07cc6", // بنفش
  //     totalCredit: 15000,
  //     usedCredit: 8200,
  //     totalFileChars: 350000,
  //     usedFileChars: 180000,
  //     expiryDate: "۱۴۰۳/۱۲/۱۰",
  //     daysLeft: 60,
  //   },
  //   {
  //     id: "cb-5",
  //     chatbotName: "رزرواسیون",
  //     planName: "رایگان",
  //     planColor: "#FFA18E", // نارنجی
  //     totalCredit: 5000,
  //     usedCredit: 3800,
  //     totalFileChars: 200000,
  //     usedFileChars: 160000,
  //     expiryDate: "۱۴۰۳/۱۱/۰۵",
  //     daysLeft: 25,
  //   },
  //   {
  //     id: "cb-6",
  //     chatbotName: "سفارش‌گیری",
  //     planName: "پیشرفته",
  //     planColor: "#f59e0b", // زرد/عنبری
  //     totalCredit: 15000,
  //     usedCredit: 4500,
  //     totalFileChars: 350000,
  //     usedFileChars: 95000,
  //     expiryDate: "۱۴۰۴/۰۲/۱۲",
  //     daysLeft: 105,
  //   },
  // ];

  // تراکنش‌ها - ترکیبی از پلن و کیف پول
  const transactions: Transaction[] = [
    // تراکنش پلن
    {
      id: "TRX-2024-001",
      date: "۱۴۰۳/۰۹/۲۰",
      planName: "پیشرفته - سالانه",
      chatbotName: "چت‌بات فروشگاه",
      amount: "۷,۶۷۰,۰۰۰ تومان",
      status: "success",
      invoiceUrl: "#",
      type: "plan",
    },
    // تراکنش کیف پول - واریز
    {
      id: "WT-001",
      date: "۱۴۰۳/۰۹/۱۸",
      amount: "۳,۰۰۰,۰۰۰ تومان",
      status: "success",
      invoiceUrl: "#",
      type: "wallet",
      walletType: "deposit",
    },
    // تراکنش پلن
    {
      id: "TRX-2024-002",
      date: "۱۴۰۳/۰۹/۱۵",
      planName: "پایه - ماهانه",
      chatbotName: "پشتیبانی مشتریان",
      amount: "۲۹۹,۰۰۰ تومان",
      status: "success",
      invoiceUrl: "#",
      type: "plan",
    },
    // تراکنش کیف پول - برداشت
    {
      id: "WT-002",
      date: "۱۴۰۳/۰۹/۱۲",
      amount: "۲۹۹,۰۰۰ تومان",
      status: "success",
      type: "wallet",
      walletType: "withdraw",
    },
    // تراکنش پلن
    {
      id: "TRX-2024-003",
      date: "۱۴۰۳/۰۹/۱۰",
      planName: "متوسط - ماهانه",
      chatbotName: "فروش آنلاین",
      amount: "۷۹۹,۰۰۰ تومان",
      status: "pending",
      type: "plan",
    },
    // تراکنش کیف پول - واریز در انتظار
    {
      id: "WT-004",
      date: "۱۴۰۳/۰۹/۰۸",
      amount: "۵۰۰,۰۰۰ تومان",
      status: "pending",
      type: "wallet",
      walletType: "deposit",
    },
    // تراکنش پلن
    {
      id: "TRX-2024-004",
      date: "۱۴۰۳/۰۹/۰۵",
      planName: "سازمانی - سالانه",
      chatbotName: "خدمات مشاوره",
      amount: "۴,۹۹۰,۰۰۰ تومان",
      status: "success",
      invoiceUrl: "#",
      type: "plan",
    },
    // تراکنش کیف پول - برداشت
    {
      id: "WT-003",
      date: "۱۴۰۳/۰۹/۰۳",
      amount: "۷۹۹,۰۰۰ تومان",
      status: "success",
      type: "wallet",
      walletType: "withdraw",
    },
    // تراکنش پلن
    {
      id: "TRX-2024-005",
      date: "۱۴۰۳/۰۸/۲۵",
      planName: "رایگان - ماهانه",
      chatbotName: "رزرواسیون",
      amount: "۰ تومان",
      status: "success",
      invoiceUrl: "#",
      type: "plan",
    },
    // تراکنش کیف پول - برداشت
    {
      id: "WT-005",
      date: "۱۴۰۳/۰۸/۲۰",
      amount: "۱,۵۰۰,۰۰۰ تومان",
      status: "success",
      type: "wallet",
      walletType: "withdraw",
    },
    // تراکنش پلن - ناموفق
    {
      id: "TRX-2024-006",
      date: "۱۴۰۳/۰۸/۲۰",
      planName: "پیشرفته - سالانه",
      chatbotName: "سفارش‌گیری",
      amount: "��,۹۹۰,۰۰۰ تومان",
      status: "failed",
      type: "plan",
    },
    // تراکنش پلن
    {
      id: "TRX-2024-007",
      date: "۱۴۰۳/۰۸/��۵",
      planName: "پیشرفته - سالانه",
      chatbotName: "چت‌بات فروشگاه",
      amount: "۷,۶۷۰,۰۰۰ تومان",
      status: "success",
      invoiceUrl: "#",
      type: "plan",
    },
  ];

  // تبدیل تاریخ فارسی به میلادی برای مقایسه
  const parsePersianDate = (persianDate: string): Date | null => {
    try {
      // فرمت: ۱۴۰۳/۰۹/۲۰
      const parts = persianDate.split("/");
      if (parts.length !== 3) return null;

      // تبدیل تقریبی به میلادی (برای مقایسه)
      const year = parseInt(parts[0]) - 1303 + 2024;
      const month = parseInt(parts[1]) - 1;
      const day = parseInt(parts[2]);

      return new Date(year, month, day);
    } catch {
      return null;
    }
  };

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
      const transactionDate = parsePersianDate(transaction.date);
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

  // پاکسازی فیلترها
  const clearFilters = () => {
    setTransactionFilter("all");
    setWalletTypeFilter("all");
    setDateFrom("");
    setDateTo("");
  };

  // چک کردن اینکه آیا فیلتری فعال است
  const hasActiveFilters =
    transactionFilter !== "all" ||
    walletTypeFilter !== "all" ||
    dateFrom !== "" ||
    dateTo !== "";

  const handleUpgrade = (chatbotId: string, chatbotName: string) => {
    setSelectedChatbotId(chatbotId);
    setSelectedChatbotName(chatbotName);
    setMessageCount("1000");
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

  const handleCreditIncrease = () => {
    const count = parseInt(messageCount) || 0;
    if (count < 100) {
      toast.error("حداقل تعداد پیام باید 100 عدد باشد");
      return;
    }

    const { pricePerMessage } = calculateMessagePrice(count);
    const basePrice = count * pricePerMessage;
    const tax = Math.round(basePrice * 0.09);
    const totalPrice = basePrice + tax;

    // اینجا می‌توانیم به صفحه checkout بریم یا درگاه پرداخت
    toast.success(`در حال انتقال به درگاه پرداخت...`);

    // شبیه‌سازی انتقال به checkout
    setTimeout(() => {
      setIsCreditIncreaseModalOpen(false);
      // onNavigate('checkout'); // اگر صفحه checkout داریم
      toast.info("در محیط واقعی به درگاه پرداخت منتقل می‌شوید");
    }, 1500);
  };

  const handleAddCredit = (chatbotId: string, chatbotName: string) => {
    toast.info(`در حال انتقال به صفحه افزایش اعتبار برای ${chatbotName}...`);
    // می‌توان به صفحه خرید اعتبار هدایت شود
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
  const expiringPlan = activeSubscrp.find((p) => p.daysLeft <= 10);

  // محاسبه آمار کلی
  const totalChatbots = activeSubscrp.length;
  const totalCredit = activeSubscrp.reduce(
    (sum, plan) => sum + (plan.totalCredit - plan.usedCredit),
    0
  );
  const totalFileChars = activeSubscrp.reduce(
    (sum, plan) => sum + (plan.totalFileChars - plan.usedFileChars),
    0
  );
  const totalUsedCredit = activeSubscrp.reduce(
    (sum, plan) => sum + plan.usedCredit,
    0
  );

  return (
    <div className="min-h-screen flex bg-grey-50" dir="rtl">
      {/* <Sidebar onNavigate={onNavigate} currentPage="billing" /> */}

      <main className="flex-1 p-8" role="main">
        <header className="mb-8">
          <h1 className="text-grey-900 mb-2 text-right">مالی و اشتراک</h1>
          <p className="text-grey-600 text-right">
            مدیریت پلن‌ها، اعتبار و تراکنش‌های مالی
          </p>
        </header>

        {/* Credit Summary Cards */}
        <section className="mb-8" aria-label="خلاصه اعتبار">
          <WalletCard
            balance={walletBalance}
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
                        پلن «{expiringPlan.chatbotName}» ت��ها{" "}
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
                        اعتبار پیام
                      </th>
                      <th className="px-4 py-3 text-right text-grey-600">
                        کاراکتر فایل
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
                    {activeSubscrp.map((plan) => {
                      const creditPercent = Math.round(
                        (plan.usedCredit / plan.totalCredit) * 100
                      );
                      const fileCharPercent = Math.round(
                        (plan.usedFileChars / plan.totalFileChars) * 100
                      );

                      return (
                        <tr
                          key={plan.id}
                          className="border-b border-grey-100 hover:bg-grey-50"
                        >
                          {/* چت‌بات */}
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{
                                  backgroundColor: `${plan.planColor}20`,
                                }}
                              >
                                <Bot
                                  style={{
                                    width: "18px",
                                    height: "18px",
                                    color: plan.planColor,
                                  }}
                                  aria-hidden="true"
                                />
                              </div>
                              <span className="text-grey-900">
                                {plan.chatbotName}
                              </span>
                            </div>
                          </td>

                          {/* پلن */}
                          <td className="px-4 py-3">
                            <span
                              className="inline-block px-3 py-1 rounded-lg"
                              style={{
                                backgroundColor: `${plan.planColor}15`,
                                color: plan.planColor,
                              }}
                            >
                              {plan.planName}
                            </span>
                          </td>

                          {/* اعتبار پیام */}
                          <td className="px-4 py-3">
                            <div className="flex flex-col gap-1.5">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-grey-900">
                                  {new Intl.NumberFormat("fa-IR").format(
                                    plan.usedCredit
                                  )}{" "}
                                  /{" "}
                                  {new Intl.NumberFormat("fa-IR").format(
                                    plan.totalCredit
                                  )}
                                </span>
                                <span className="text-grey-500">
                                  {creditPercent}٪
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
                                  plan.usedFileChars
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
                                dateTime={plan.expiryDate}
                                className="text-grey-900"
                              >
                                {plan.expiryDate}
                              </time>
                              <span className="text-grey-600">
                                {new Intl.NumberFormat("fa-IR").format(
                                  plan.daysLeft
                                )}{" "}
                                روز مانده
                              </span>
                            </div>
                          </td>

                          {/* عملیات */}
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-center">
                              <button
                                onClick={() =>
                                  handleUpgrade(plan.id, plan.chatbotName)
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
            {/* رایگان */}
            <PlanCard
              name="رایگان"
              description="شروع رایگان با امکانات پایه"
              price={0}
              period="ماهانه"
              icon={<Gift style={{ width: "20px", height: "20px" }} />}
              features={[
                { text: "۱,۰۰۰ پیام در ماه", enabled: true },
                { text: "۵۰,۰۰۰ کاراکتر فایل", enabled: true },
                { text: "یک چت‌بات", enabled: true },
                { text: "پشتیبانی ایمیل", enabled: true },
                { text: "تحلیل پیشرفته", enabled: false },
                { text: "API دسترسی", enabled: false },
              ]}
              onSelect={() => {
                toast.success("پلن رایگان برای شما فعال است");
              }}
              buttonText="خرید پلن"
              buttonVariant="secondary"
            />

            {/* پایه */}
            <PlanCard
              name="پایه"
              description="برای کسب‌وکارهای کوچک"
              price={299000}
              period="ماهانه"
              icon={<Rocket style={{ width: "20px", height: "20px" }} />}
              features={[
                { text: "۵,۰۰۰ پیام در ماه", enabled: true },
                { text: "۲۰۰,۰۰۰ کاراکتر فایل", enabled: true },
                { text: "سه چت‌بات", enabled: true },
                { text: "پشتیبانی اولویت‌دار", enabled: true },
                { text: "تحلیل پایه", enabled: true },
                { text: "API دسترسی", enabled: false },
              ]}
              onSelect={() => {
                router.push("/pay/checkout");
                toast.info("در حال انتقال به صفحه پرداخت...");
              }}
              buttonText="خرید پلن"
            />

            {/* متوسط - Featured */}
            <PlanCard
              name="حرفه‌ای"
              description="برای کسب‌وکارهای در حال رشد"
              price={799000}
              period="ماهانه"
              icon={<Crown style={{ width: "20px", height: "20px" }} />}
              featured={true}
              badgeText="محبوب"
              features={[
                { text: "۲۰,۰۰۰ پیام در ماه", enabled: true },
                { text: "۵۰۰,۰۰۰ کاراکتر فایل", enabled: true },
                { text: "ده چت‌بات", enabled: true },
                { text: "پشتیبانی ۲۴/۷", enabled: true },
                { text: "تحلیل پیشرفته", enabled: true },
                { text: "API دسترسی کامل", enabled: true },
              ]}
              onSelect={() => {
                router.push("/pay/checkout");
                toast.info("در حال انتقال به صفحه پرداخت...");
              }}
              buttonText="خرید پلن"
            />

            {/* پیشرفته */}
            <PlanCard
              name="پیشرفته"
              description="برای تیم‌های بزرگ"
              price={1990000}
              period="ماهانه"
              icon={<Star style={{ width: "20px", height: "20px" }} />}
              features={[
                { text: "۱۰۰,۰۰۰ پیام در ماه", enabled: true },
                { text: "۲,۰۰۰,۰۰۰ کاراکتر فایل", enabled: true },
                { text: "نامحدود چت‌بات", enabled: true },
                { text: "پشتیبانی اختصاصی", enabled: true },
                { text: "تحلیل کامل + گزارش", enabled: true },
                { text: "API + Webhook", enabled: true },
              ]}
              onSelect={() => {
                router.push("/pay/checkout");
                toast.info("در حال انتقال به صفحه پرداخت...");
              }}
              buttonText="خرید پلن"
            />

            {/* سازمانی */}
            <PlanCard
              name="سازمانی"
              description="سفارشی‌سازی کامل"
              price={0}
              period="ماهانه"
              icon={<Users style={{ width: "20px", height: "20px" }} />}
              features={[
                { text: "پیام نامحدود", enabled: true },
                { text: "فضای نامحدود", enabled: true },
                { text: "چت‌بات نامحدود", enabled: true },
                { text: "مدیر حساب اختصاصی", enabled: true },
                { text: "سفارشی‌سازی کامل", enabled: true },
                { text: "قرارداد SLA", enabled: true },
              ]}
              onSelect={() => {
                toast.info("لطفا برای مشاوره با تیم فروش تماس بگیرید");
              }}
              buttonText="تماس با فروش"
              buttonVariant="secondary"
            />
          </div>

          <style>{`
            .available-plans-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
              gap: 16px;
            }

            @media (max-width: 1280px) {
              .available-plans-grid {
                grid-template-columns: repeat(2, 1fr);
              }
            }

            @media (max-width: 768px) {
              .available-plans-grid {
                grid-template-columns: 1fr;
                gap: 12px;
              }
            }
          `}</style>
        </section>

        {/* Transaction History */}
        <section aria-labelledby="transactions-heading">
          <h2
            id="transactions-heading"
            className="text-grey-900 mb-6 text-right"
          >
            تاریخچه تراکنش‌ها
          </h2>

          {/* Filters Section */}
          <div className="mb-4 p-4 md:p-5 bg-white rounded-2xl border border-grey-200">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-grey-600 ml-2">نوع تراکنش:</span>
              <button
                onClick={() => setTransactionFilter("all")}
                className={`px-4 py-2 rounded-xl transition-all duration-200 ${
                  transactionFilter === "all"
                    ? "bg-[#65bcb6] text-white shadow-sm"
                    : "bg-grey-50 text-grey-700 hover:bg-grey-100"
                }`}
                title="نمایش همه تراکنش‌ها"
              >
                همه
              </button>
              <button
                onClick={() => setTransactionFilter("plan")}
                className={`px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-2 ${
                  transactionFilter === "plan"
                    ? "bg-[#65bcb6] text-white shadow-sm"
                    : "bg-grey-50 text-grey-700 hover:bg-grey-100"
                }`}
                title="نمایش تراکنش‌های پلن"
              >
                <Bot
                  style={{ width: "16px", height: "16px" }}
                  aria-hidden="true"
                />
                <span>پلن‌ها</span>
              </button>
              <button
                onClick={() => setTransactionFilter("wallet")}
                className={`px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-2 ${
                  transactionFilter === "wallet"
                    ? "bg-[#65bcb6] text-white shadow-sm"
                    : "bg-grey-50 text-grey-700 hover:bg-grey-100"
                }`}
                title="نمایش تراکنش‌های کیف پول"
              >
                <Download
                  style={{ width: "16px", height: "16px" }}
                  aria-hidden="true"
                />
                <span>کیف پول</span>
              </button>

              {/* Filter Dropdown Button */}
              <div className="relative mr-auto">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className={`px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-2 ${
                    hasActiveFilters
                      ? "bg-[#65bcb6] text-white shadow-sm"
                      : "bg-grey-50 text-grey-700 hover:bg-grey-100"
                  }`}
                  title="فیلترهای پیشرفته"
                  type="button"
                >
                  <Filter
                    style={{ width: "16px", height: "16px" }}
                    aria-hidden="true"
                  />
                  <span>فیلترها</span>
                  {hasActiveFilters && (
                    <span className="bg-white text-[#65bcb6] rounded-full px-2 py-0.5 text-xs">
                      {(dateFrom || dateTo ? 1 : 0) +
                        (walletTypeFilter !== "all" ? 1 : 0)}
                    </span>
                  )}
                  <ChevronDown
                    style={{
                      width: "16px",
                      height: "16px",
                      transform: isFilterOpen
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                      transition: "transform 0.2s",
                    }}
                    aria-hidden="true"
                  />
                </button>

                {/* Dropdown Menu */}
                {isFilterOpen && (
                  <div
                    className="absolute left-0 mt-2 w-96 bg-white rounded-2xl shadow-lg border border-grey-100 p-4 z-50"
                    style={{ maxWidth: "calc(100vw - 2rem)" }}
                  >
                    {/* Wallet Type Filter */}
                    {transactionFilter === "wallet" && (
                      <div className="mb-4 pb-4 border-b border-grey-100">
                        <label className="block text-grey-700 mb-3">
                          نوع عملیات کیف پول:
                        </label>
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => setWalletTypeFilter("all")}
                            className={`px-4 py-2 rounded-xl text-sm transition-all duration-200 ${
                              walletTypeFilter === "all"
                                ? "bg-[#65bcb6] text-white shadow-sm"
                                : "bg-grey-50 text-grey-700 hover:bg-grey-100"
                            }`}
                            type="button"
                            title="نمایش همه تراکنش‌های کیف پول"
                          >
                            همه
                          </button>
                          <button
                            onClick={() => setWalletTypeFilter("deposit")}
                            className={`px-4 py-2 rounded-xl text-sm transition-all duration-200 flex items-center gap-2 ${
                              walletTypeFilter === "deposit"
                                ? "bg-[#52d4a0] text-white shadow-sm"
                                : "bg-grey-50 text-grey-700 hover:bg-grey-100"
                            }`}
                            type="button"
                            title="فقط تراکنش‌های واریز"
                          >
                            <TrendingUp
                              style={{ width: "16px", height: "16px" }}
                              aria-hidden="true"
                            />
                            <span>واریز</span>
                          </button>
                          <button
                            onClick={() => setWalletTypeFilter("withdraw")}
                            className={`px-4 py-2 rounded-xl text-sm transition-all duration-200 flex items-center gap-2 ${
                              walletTypeFilter === "withdraw"
                                ? "bg-[#FFA18E] text-white shadow-sm"
                                : "bg-grey-50 text-grey-700 hover:bg-grey-100"
                            }`}
                            type="button"
                            title="فقط تراکنش‌های برداشت"
                          >
                            <Download
                              style={{ width: "16px", height: "16px" }}
                              aria-hidden="true"
                            />
                            <span>برداشت</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Date Range Filter */}
                    <div className="mb-4">
                      <label className="block text-grey-700 mb-3">
                        بازه زمانی:
                      </label>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <label
                            htmlFor="date-from"
                            className="text-grey-600 whitespace-nowrap text-sm min-w-[30px]"
                          >
                            از:
                          </label>
                          <input
                            id="date-from"
                            type="date"
                            value={dateFrom}
                            onChange={(e) => setDateFrom(e.target.value)}
                            className="flex-1 px-3 py-2 rounded-lg border border-grey-200 focus:border-[#65bcb6] focus:outline-none transition-colors text-sm"
                            title="تاریخ شروع"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <label
                            htmlFor="date-to"
                            className="text-grey-600 whitespace-nowrap text-sm min-w-[30px]"
                          >
                            تا:
                          </label>
                          <input
                            id="date-to"
                            type="date"
                            value={dateTo}
                            onChange={(e) => setDateTo(e.target.value)}
                            className="flex-1 px-3 py-2 rounded-lg border border-grey-200 focus:border-[#65bcb6] focus:outline-none transition-colors text-sm"
                            title="تاریخ پایان"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Clear Filters */}
                    {hasActiveFilters && (
                      <button
                        onClick={() => {
                          setDateFrom("");
                          setDateTo("");
                          setWalletTypeFilter("all");
                        }}
                        className="w-full px-4 py-2 rounded-lg bg-grey-50 text-grey-700 hover:bg-grey-100 transition-colors flex items-center justify-center gap-2"
                        type="button"
                      >
                        <X
                          style={{ width: "16px", height: "16px" }}
                          aria-hidden="true"
                        />
                        <span>پاک کردن فیلترها</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-4 px-4">
            <div className="flex items-center gap-2 text-grey-600">
              <FileText
                style={{ width: "16px", height: "16px" }}
                aria-hidden="true"
              />
              <span>
                <strong className="text-[#65bcb6]">
                  {filteredTransactions.length}
                </strong>{" "}
                تراکنش یافت شد
              </span>
            </div>

            {filteredTransactions.length > 5 && (
              <button
                onClick={() => setIsAllTransactionsModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-[#65bcb6] text-white hover:bg-[#52a89d] transition-all duration-200 flex items-center gap-2 shadow-sm"
                type="button"
                title="مشاهده همه تراکنش‌ها"
              >
                <FileText
                  style={{ width: "16px", height: "16px" }}
                  aria-hidden="true"
                />
                <span>مشاهده همه</span>
              </button>
            )}
          </div>

          <Card className="overflow-hidden">
            {/* Transactions List - Table View */}
            <div className="overflow-x-auto">
              {filteredTransactions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-grey-500">
                  <FileText
                    style={{
                      width: "48px",
                      height: "48px",
                      strokeWidth: "1.5",
                    }}
                    aria-hidden="true"
                  />
                  <p className="mt-4">هیچ تراکنشی یافت نشد</p>
                </div>
              ) : (
                <table className="w-full" dir="rtl">
                  <thead>
                    <tr className="border-b border-grey-200 bg-grey-50">
                      <th className="px-6 py-4 text-right text-grey-600">
                        نوع
                      </th>
                      <th className="px-6 py-4 text-right text-grey-600">
                        جزئیات
                      </th>
                      <th className="px-6 py-4 text-right text-grey-600">
                        شناسه
                      </th>
                      <th className="px-6 py-4 text-right text-grey-600">
                        مبلغ
                      </th>
                      <th className="px-6 py-4 text-right text-grey-600">
                        تاریخ
                      </th>
                      <th className="px-6 py-4 text-right text-grey-600">
                        وضعیت
                      </th>
                      <th className="px-6 py-4 text-center text-grey-600">
                        عملیات
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.slice(0, 5).map((transaction) => (
                      <tr
                        key={transaction.id}
                        className="border-b border-grey-100 hover:bg-grey-50 transition-colors"
                      >
                        {/* نوع */}
                        <td className="px-6 py-4">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{
                              backgroundColor:
                                transaction.type === "plan"
                                  ? "rgba(101, 188, 182, 0.1)"
                                  : transaction.walletType === "deposit"
                                  ? "rgba(82, 212, 160, 0.1)"
                                  : "rgba(255, 161, 142, 0.1)",
                            }}
                          >
                            {transaction.type === "plan" ? (
                              <Bot
                                style={{
                                  width: "18px",
                                  height: "18px",
                                  color: "#65BCB6",
                                  strokeWidth: "2",
                                }}
                                aria-hidden="true"
                              />
                            ) : transaction.walletType === "deposit" ? (
                              <TrendingUp
                                style={{
                                  width: "18px",
                                  height: "18px",
                                  color: "#52d4a0",
                                  strokeWidth: "2",
                                }}
                                aria-hidden="true"
                              />
                            ) : (
                              <Download
                                style={{
                                  width: "18px",
                                  height: "18px",
                                  color: "#FFA18E",
                                  strokeWidth: "2",
                                }}
                                aria-hidden="true"
                              />
                            )}
                          </div>
                        </td>

                        {/* جزئیات */}
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <p className="text-grey-900">
                              {transaction.type === "plan"
                                ? "خرید پلن"
                                : transaction.walletType === "deposit"
                                ? "واریز"
                                : "برداشت"}
                            </p>
                            {transaction.type === "plan" &&
                              transaction.chatbotName && (
                                <p className="text-grey-500 text-sm">
                                  {transaction.planName?.split(" - ")[0]} /{" "}
                                  {transaction.chatbotName}
                                </p>
                              )}
                            {transaction.type === "wallet" && (
                              <p className="text-grey-500 text-sm">
                                {transaction.walletType === "deposit"
                                  ? "واریز به کیف پول"
                                  : "برداشت از کیف پول"}
                              </p>
                            )}
                          </div>
                        </td>

                        {/* شناسه */}
                        <td className="px-6 py-4">
                          <code className="text-grey-600 text-sm font-mono">
                            {transaction.id}
                          </code>
                        </td>

                        {/* مبلغ */}
                        <td className="px-6 py-4">
                          <p className="text-grey-900">{transaction.amount}</p>
                        </td>

                        {/* تاریخ */}
                        <td className="px-6 py-4">
                          <time
                            dateTime={transaction.date}
                            className="text-grey-600"
                          >
                            {transaction.date}
                          </time>
                        </td>

                        {/* وضعیت */}
                        <td className="px-6 py-4">
                          <div
                            className="inline-flex items-center justify-center px-3 py-1 rounded-full border text-sm"
                            style={{
                              backgroundColor:
                                transaction.status === "success"
                                  ? "#f0fdf4"
                                  : transaction.status === "failed"
                                  ? "#fef2f2"
                                  : "#fefce8",
                              borderColor:
                                transaction.status === "success"
                                  ? "#b9f8cf"
                                  : transaction.status === "failed"
                                  ? "#fecaca"
                                  : "#fde68a",
                              color:
                                transaction.status === "success"
                                  ? "#008236"
                                  : transaction.status === "failed"
                                  ? "#dc2626"
                                  : "#ca8a04",
                            }}
                          >
                            {transaction.status === "success"
                              ? "موفق"
                              : transaction.status === "failed"
                              ? "ناموفق"
                              : "در انتظار"}
                          </div>
                        </td>

                        {/* عملیات */}
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            {/* دانلود - برای همه */}
                            <button
                              onClick={() =>
                                toast.success("دانلود فاکتور شروع شد")
                              }
                              className="inline-flex items-center justify-center p-2 hover:bg-grey-100 rounded-lg transition-colors"
                              title="دانلود فاکتور"
                              type="button"
                            >
                              <Download
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  color: "#374151",
                                }}
                                aria-hidden="true"
                              />
                            </button>

                            {/* اشتراک‌گذاری - برای همه */}
                            <button
                              onClick={() =>
                                toast.success("لینک اشتراک‌گذاری کپی شد")
                              }
                              className="inline-flex items-center justify-center p-2 hover:bg-grey-100 rounded-lg transition-colors"
                              title="اشتراک‌گذاری"
                              type="button"
                            >
                              <Share2
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  color: "#374151",
                                }}
                                aria-hidden="true"
                              />
                            </button>

                            {/* پرداخت مجدد - فقط برای ناموفق‌ها */}
                            {transaction.status === "failed" && (
                              <button
                                onClick={() =>
                                  toast.info("در حال انتقال به درگاه پرداخت...")
                                }
                                className="inline-flex items-center justify-center p-2 hover:bg-grey-100 rounded-lg transition-colors"
                                title="پرداخت مجدد"
                                type="button"
                              >
                                <RefreshCw
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    color: "#374151",
                                  }}
                                  aria-hidden="true"
                                />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </Card>
        </section>
      </main>

      {/* Modal برای نمایش همه تراکنش‌ها */}
      <Modal
        isOpen={isAllTransactionsModalOpen}
        onClose={() => setIsAllTransactionsModalOpen(false)}
        title="همه تراکنش‌ها"
        size="xl"
      >
        <div className="overflow-x-auto">
          {filteredTransactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-grey-500">
              <FileText
                style={{ width: "48px", height: "48px", strokeWidth: "1.5" }}
                aria-hidden="true"
              />
              <p className="mt-4">هیچ تراکنشی یافت نشد</p>
            </div>
          ) : (
            <>
              <div className="mb-4 p-4 rounded-xl bg-grey-50 flex items-center gap-2">
                <FileText
                  style={{ width: "16px", height: "16px", color: "#65bcb6" }}
                  aria-hidden="true"
                />
                <span className="text-grey-700">
                  مجموع{" "}
                  <strong className="text-[#65bcb6]">
                    {filteredTransactions.length}
                  </strong>{" "}
                  تراکنش
                </span>
              </div>

              <table className="w-full" dir="rtl">
                <thead>
                  <tr className="border-b border-grey-200 bg-grey-50">
                    <th className="px-6 py-4 text-right text-grey-600">نوع</th>
                    <th className="px-6 py-4 text-right text-grey-600">
                      جزئیات
                    </th>
                    <th className="px-6 py-4 text-right text-grey-600">
                      شناسه
                    </th>
                    <th className="px-6 py-4 text-right text-grey-600">مبلغ</th>
                    <th className="px-6 py-4 text-right text-grey-600">
                      تاریخ
                    </th>
                    <th className="px-6 py-4 text-right text-grey-600">
                      وضعیت
                    </th>
                    <th className="px-6 py-4 text-center text-grey-600">
                      عملیات
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="border-b border-grey-100 hover:bg-grey-50 transition-colors"
                    >
                      {/* نوع */}
                      <td className="px-6 py-4">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{
                            backgroundColor:
                              transaction.type === "plan"
                                ? "rgba(101, 188, 182, 0.1)"
                                : transaction.walletType === "deposit"
                                ? "rgba(82, 212, 160, 0.1)"
                                : "rgba(255, 161, 142, 0.1)",
                          }}
                        >
                          {transaction.type === "plan" ? (
                            <Bot
                              style={{
                                width: "18px",
                                height: "18px",
                                color: "#65BCB6",
                                strokeWidth: "2",
                              }}
                              aria-hidden="true"
                            />
                          ) : transaction.walletType === "deposit" ? (
                            <TrendingUp
                              style={{
                                width: "18px",
                                height: "18px",
                                color: "#52d4a0",
                                strokeWidth: "2",
                              }}
                              aria-hidden="true"
                            />
                          ) : (
                            <Download
                              style={{
                                width: "18px",
                                height: "18px",
                                color: "#FFA18E",
                                strokeWidth: "2",
                              }}
                              aria-hidden="true"
                            />
                          )}
                        </div>
                      </td>

                      {/* جزئیات */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <p className="text-grey-900">
                            {transaction.type === "plan"
                              ? "خرید پلن"
                              : transaction.walletType === "deposit"
                              ? "واریز"
                              : "برداشت"}
                          </p>
                          {transaction.type === "plan" &&
                            transaction.chatbotName && (
                              <p className="text-grey-500 text-sm">
                                {transaction.planName?.split(" - ")[0]} /{" "}
                                {transaction.chatbotName}
                              </p>
                            )}
                          {transaction.type === "wallet" && (
                            <p className="text-grey-500 text-sm">
                              {transaction.walletType === "deposit"
                                ? "واریز به کیف پول"
                                : "برداشت از کیف پول"}
                            </p>
                          )}
                        </div>
                      </td>

                      {/* شناسه */}
                      <td className="px-6 py-4">
                        <code className="text-grey-600 text-sm font-mono">
                          {transaction.id}
                        </code>
                      </td>

                      {/* مبلغ */}
                      <td className="px-6 py-4">
                        <p className="text-grey-900">{transaction.amount}</p>
                      </td>

                      {/* تاریخ */}
                      <td className="px-6 py-4">
                        <time
                          dateTime={transaction.date}
                          className="text-grey-600"
                        >
                          {transaction.date}
                        </time>
                      </td>

                      {/* وضعیت */}
                      <td className="px-6 py-4">
                        <div
                          className="inline-flex items-center justify-center px-3 py-1 rounded-full border text-sm"
                          style={{
                            backgroundColor:
                              transaction.status === "success"
                                ? "#f0fdf4"
                                : transaction.status === "failed"
                                ? "#fef2f2"
                                : "#fefce8",
                            borderColor:
                              transaction.status === "success"
                                ? "#b9f8cf"
                                : transaction.status === "failed"
                                ? "#fecaca"
                                : "#fde68a",
                            color:
                              transaction.status === "success"
                                ? "#008236"
                                : transaction.status === "failed"
                                ? "#dc2626"
                                : "#ca8a04",
                          }}
                        >
                          {transaction.status === "success"
                            ? "موفق"
                            : transaction.status === "failed"
                            ? "ناموفق"
                            : "در انتظار"}
                        </div>
                      </td>

                      {/* عملیات */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          {/* دانلود - برای همه */}
                          <button
                            onClick={() =>
                              toast.success("دانلود فاکتور شروع شد")
                            }
                            className="inline-flex items-center justify-center p-2 hover:bg-grey-100 rounded-lg transition-colors"
                            title="دانلود فاکتور"
                            type="button"
                          >
                            <Download
                              style={{
                                width: "20px",
                                height: "20px",
                                color: "#374151",
                              }}
                              aria-hidden="true"
                            />
                          </button>

                          {/* اشتراک‌گذاری - برای همه */}
                          <button
                            onClick={() =>
                              toast.success("لینک اشتراک‌گذاری کپی شد")
                            }
                            className="inline-flex items-center justify-center p-2 hover:bg-grey-100 rounded-lg transition-colors"
                            title="اشتراک‌گذاری"
                            type="button"
                          >
                            <Share2
                              style={{
                                width: "20px",
                                height: "20px",
                                color: "#374151",
                              }}
                              aria-hidden="true"
                            />
                          </button>

                          {/* پرداخت مجدد - فقط برای ناموفق‌ها */}
                          {transaction.status === "failed" && (
                            <button
                              onClick={() =>
                                toast.info("در حال انتقال به درگاه پرداخت...")
                              }
                              className="inline-flex items-center justify-center p-2 hover:bg-grey-100 rounded-lg transition-colors"
                              title="پرداخت مجدد"
                              type="button"
                            >
                              <RefreshCw
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  color: "#374151",
                                }}
                                aria-hidden="true"
                              />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </Modal>

      {/* Modal برای افزایش اعتبار پیام */}
      <Modal
        isOpen={isCreditIncreaseModalOpen}
        onClose={() => setIsCreditIncreaseModalOpen(false)}
        title={`افزایش اعتبار - ${selectedChatbotName}`}
        size="sm"
      >
        <div className="space-y-4">
          {/* ورودی تعداد پیام */}
          <div>
            <label
              htmlFor="message-count"
              className="block text-grey-900 mb-2 text-right"
            >
              تعداد پیام مورد نیاز
            </label>
            <input
              id="message-count"
              type="number"
              min="100"
              step="100"
              value={messageCount}
              onChange={(e) => setMessageCount(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-grey-200 focus:border-[#65bcb6] focus:outline-none transition-colors"
              placeholder="مثال: 1000"
            />
            <p
              className="text-grey-500 mt-1.5"
              style={{ fontSize: "0.875rem" }}
            >
              حداقل ۱۰۰ پیام
            </p>
          </div>

          {/* قیمت‌گذاری کامپکت */}
          <div className="p-3 rounded-xl bg-grey-50">
            <p className="text-grey-700 mb-2" style={{ fontSize: "0.875rem" }}>
              قیمت‌گذاری پله‌ای:
            </p>
            <div
              className="grid grid-cols-2 gap-2"
              style={{ fontSize: "0.8125rem" }}
            >
              <div className="text-grey-600">تا ۵ هزار</div>
              <div className="text-left text-grey-900">۵۰ ت</div>

              <div className="text-grey-600">۵-۱۰ هزار</div>
              <div className="text-left text-grey-900">۴۰ ت</div>

              <div className="text-grey-600">۱۰-۲۰ هزار</div>
              <div className="text-left text-green-600">۳۵ ت (۵٪ 🎁)</div>

              <div className="text-grey-600">۲۰-۵۰ هزار</div>
              <div className="text-left text-green-600">۳۰ ت (۱۰٪ 🎁)</div>

              <div className="text-grey-600">بیش از ۵۰ هزار</div>
              <div className="text-left text-green-600">۲۵ ت (۱۵٪ 🎁)</div>
            </div>
          </div>

          {/* فاکتور */}
          {(() => {
            const count = parseInt(messageCount) || 0;
            if (count >= 100) {
              const { pricePerMessage, discountPercent } =
                calculateMessagePrice(count);
              const basePrice = count * pricePerMessage;
              const tax = Math.round(basePrice * 0.09);
              const totalPrice = basePrice + tax;

              return (
                <div className="p-4 rounded-xl border-2 border-[#65bcb6] bg-gradient-to-br from-[#65bcb6]/5 to-[#65bcb6]/10">
                  <div className="flex items-center gap-2 mb-3">
                    <MessageCircle
                      style={{
                        width: "18px",
                        height: "18px",
                        color: "#65bcb6",
                      }}
                      aria-hidden="true"
                    />
                    <span className="text-grey-900">فاکتور</span>
                  </div>

                  <div className="space-y-2" style={{ fontSize: "0.875rem" }}>
                    <div className="flex items-center justify-between">
                      <span className="text-grey-600">
                        {new Intl.NumberFormat("fa-IR").format(count)} پیام ×{" "}
                        {new Intl.NumberFormat("fa-IR").format(pricePerMessage)}{" "}
                        تومان
                      </span>
                      <span className="text-grey-900">
                        {new Intl.NumberFormat("fa-IR").format(basePrice)} ت
                      </span>
                    </div>

                    {discountPercent > 0 && (
                      <div className="flex items-center justify-between text-green-600">
                        <span>تخفیف {discountPercent}٪ 🎁</span>
                        <span>-</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-grey-600">مالیات ۹٪</span>
                      <span className="text-grey-900">
                        {new Intl.NumberFormat("fa-IR").format(tax)} ت
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t-2 border-[#65bcb6]">
                      <span className="text-grey-900">قابل پرداخت</span>
                      <span
                        className="text-[#65bcb6]"
                        style={{ fontSize: "1.125rem", fontWeight: "600" }}
                      >
                        {new Intl.NumberFormat("fa-IR").format(totalPrice)}{" "}
                        تومان
                      </span>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })()}

          {/* دکمه‌ها */}
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={handleCreditIncrease}
              disabled={parseInt(messageCount) < 100}
              className="flex-1 px-5 py-2.5 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: "#65bcb6",
                color: "white",
              }}
              onMouseEnter={(e) => {
                if (parseInt(messageCount) >= 100) {
                  e.currentTarget.style.backgroundColor = "#52a89d";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#65bcb6";
              }}
              title="تایید و پرداخت"
              type="button"
            >
              پرداخت
            </button>
            <button
              onClick={() => setIsCreditIncreaseModalOpen(false)}
              className="px-5 py-2.5 rounded-xl bg-grey-100 text-grey-700 hover:bg-grey-200 transition-colors"
              title="انصراف"
              type="button"
            >
              انصراف
            </button>
          </div>
        </div>
      </Modal>

      {/* <Toaster position="top-center" dir="rtl" /> */}
    </div>
  );
}
