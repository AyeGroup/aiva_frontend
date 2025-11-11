"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "sonner";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { API_ROUTES } from "@/constants/apiRoutes";
import { getPlanNameById, TRANSACTION_TYPE } from "@/constants/plans";
import {
  Download,
  Share2,
  RefreshCw,
  FileText,
  Bot,
  TrendingUp,
  X,
  Filter,
  ChevronDown,
} from "lucide-react";
import PageLoader from "@/components/pageLoader";
import { convertToPersian } from "@/utils/common";
import { Card } from "@/components/card";
import { useBot } from "@/providers/BotProvider";

export const Transactions: React.FC = () => {
  const { user, loading } = useAuth();
  // const router = useRouter();
  const { bots } = useBot();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<any[]>([]);

  // فیلترها
  const [transactionTypeFilter, setTransactionTypeFilter] = useState<
    "all" | "plan" | "wallet"
  >("all");
  const [walletTypeFilter, setWalletTypeFilter] = useState<
    "all" | "deposit" | "withdraw"
  >("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // صفحه بندی
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isLoading, setIsLoading] = useState(true);

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

  // اعمال فیلتر
  useEffect(() => {
    let data = [...transactions];

    if (transactionTypeFilter !== "all") {
      if (transactionTypeFilter === "plan") {
        data = data.filter((t) => t.type === TRANSACTION_TYPE.BUY_SUBSCRIPTION);
      } else if (transactionTypeFilter === "wallet") {
        data = data.filter((t) => t.type === TRANSACTION_TYPE.INCREASE_WALLET);
      }
    }

    if (walletTypeFilter !== "all") {
      data = data.filter((t) => t.walletType === walletTypeFilter);
    }

    if (dateFrom) {
      data = data.filter((t) => new Date(t.created_at) >= new Date(dateFrom));
    }

    if (dateTo) {
      data = data.filter((t) => new Date(t.created_at) <= new Date(dateTo));
    }

    setFilteredTransactions(data);
    setCurrentPage(1); // بازگشت به صفحه اول بعد از فیلتر
  }, [transactionTypeFilter, walletTypeFilter, dateFrom, dateTo, transactions]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getTransactionTitle = (type: string) =>
    type === TRANSACTION_TYPE.BUY_SUBSCRIPTION ? "خرید پلن" : "افزایش موجودی";

  const hasActiveFilters =
    transactionTypeFilter !== "all" ||
    walletTypeFilter !== "all" ||
    dateFrom !== "" ||
    dateTo !== "";

  const clearFilters = () => {
    setTransactionTypeFilter("all");
    setWalletTypeFilter("all");
    setDateFrom("");
    setDateTo("");
  };

  return (
    <section>
      <h2 className="text-grey-900 mb-6 text-right">تاریخچه تراکنش‌ها</h2>

      {/* فیلترها */}
      <div className="mb-4 p-4 md:p-5 bg-white rounded-2xl border border-grey-200">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-grey-600 ml-2">نوع تراکنش:</span>
          <button
            onClick={() => setTransactionTypeFilter("all")}
            className={`px-4 py-2 rounded-xl transition-all duration-200 ${
              transactionTypeFilter === "all"
                ? "bg-[#65bcb6] text-white shadow-sm"
                : "bg-grey-50 text-grey-700 hover:bg-grey-100"
            }`}
            title="نمایش همه تراکنش‌ها"
          >
            همه
          </button>
          <button
            onClick={() => setTransactionTypeFilter("plan")}
            className={`px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-2 ${
              transactionTypeFilter === "plan"
                ? "bg-[#65bcb6] text-white shadow-sm"
                : "bg-grey-50 text-grey-700 hover:bg-grey-100"
            }`}
            title="نمایش تراکنش‌های پلن"
          >
            <Bot style={{ width: "16px", height: "16px" }} aria-hidden="true" />
            <span>پلن‌ها</span>
          </button>
          <button
            onClick={() => setTransactionTypeFilter("wallet")}
            className={`px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-2 ${
              transactionTypeFilter === "wallet"
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
                  transform: isFilterOpen ? "rotate(180deg)" : "rotate(0deg)",
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
                {transactionTypeFilter === "wallet" && (
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
      {(isLoading || loading) && <PageLoader />}
      {/* جدول */}
      <div className="flex justify-between items-center">
        <div className="mb-4 p-4 rounded-xl bg-grey-50 flex items-center gap-2">
          <FileText
            style={{ width: "16px", height: "16px", color: "#65bcb6" }}
            aria-hidden="true"
          />
          <span className="text-grey-700">
            مجموع{" "}
            <strong className="text-[#65bcb6]">
              {filteredTransactions.length.toLocaleString("fa-IR")}
            </strong>{" "}
            تراکنش
          </span>
        </div>
        {/* <button
          onClick={() => setTransactionTypeFilter("all")}
          className="px-4 py-2 rounded-xl bg-[#65bcb6] text-white hover:bg-[#52a89d] transition-all duration-200 flex items-center gap-2 shadow-sm"
          type="button"
          title="مشاهده همه تراکنش‌ها"
        >
          <FileText
            style={{ width: "16px", height: "16px" }}
            aria-hidden="true"
          />
          <span>مشاهده همه</span>
        </button> */}
      </div>
      <Card className="overflow-hidden">
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
                            {getTransactionTitle(transaction.type)}
                            {/* {transaction.type ===
                            TRANSACTION_TYPE.BUY_SUBSCRIPTION
                              ? "خرید پلن"
                              : transaction.walletType === "deposit"
                              ? "واریز"
                              : "برداشت"} */}
                          </p>
                          {transaction.chatbot_uuid && (
                            <p className="text-grey-500 text-sm">
                              {
                                bots.find(
                                  (p) => p.uuid === transaction.chatbot_uuid
                                )?.name
                              }
                            </p>
                          )}
                          {/* {transaction.type === "wallet" && (
                            <p className="text-grey-500 text-sm">
                              {transaction.walletType === "deposit"
                                ? "واریز به کیف پول"
                                : "برداشت از کیف پول"}
                            </p>
                          )} */}
                        </div>
                      </td>

                      {/* شناسه */}
                      <td className="px-6 py-4">
                        {/* <code className="text-grey-600 text-sm"> */}
                        {convertToPersian(transaction.tracking_code)}
                        {/* </code> */}
                      </td>

                      {/* مبلغ */}
                      <td className="px-6 py-4">
                        <p className="text-grey-900">
                          {transaction?.amount.toLocaleString("fa-IR")}
                        </p>
                      </td>

                      {/* تاریخ */}
                      <td className="px-6 py-4">
                        <time
                          dateTime={transaction.created_at}
                          className="text-grey-600"
                        >
                          {new Date(transaction.created_at).toLocaleDateString(
                            "fa-IR"
                          )}
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
      </Card>
      {/* صفحه بندی */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-[#65bcb6] text-white"
                  : "bg-grey-50 text-grey-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </section>
  );
};
