"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/card";
import { toast } from "sonner";
import { useAuth } from "@/providers/AuthProvider";
import { useBot } from "@/providers/BotProvider";
import { BotConfig } from "@/types/common";
import { useRouter } from "next/navigation";
import { API_ROUTES } from "@/constants/apiRoutes";
import { ChatbotList } from "./chatbot-list";
import { convertToPersian } from "@/utils/common";
import { getTransactionTitle, TRANSACTION_TYPE } from "@/constants/plans";
import {
  Download,
  RefreshCw,
  FileText,
  Bot,
  TrendingUp,
  X,
  Filter,
  ChevronDown,
} from "lucide-react";
import persian from "react-date-object/calendars/persian";
import DatePicker from "react-multi-date-picker";
import PageLoader from "@/components/pageLoader";
import persian_fa from "react-date-object/locales/persian_fa";
import axiosInstance from "@/lib/axiosInstance";

export const Transactions: React.FC = () => {
  const { user, loading } = useAuth();
  const { bots } = useBot();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<any[]>([]);
  const [transactionTypeFilter, setTransactionTypeFilter] = useState<
    "all" | TRANSACTION_TYPE
  >("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateFromTemp, setDateFromTemp] = useState("");
  const [dateToTemp, setDateToTemp] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isLoading, setIsLoading] = useState(true);
  const [filterBot, setFilterBot] = useState<BotConfig | null>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById("filter-dropdown");
      if (dropdown && !dropdown.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };

    if (isFilterOpen)
      document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isFilterOpen]);

  // اعمال فیلتر
  useEffect(() => {
    if (!transactions) return;

    let data = [...transactions];

    // فیلتر نوع تراکنش
    if (transactionTypeFilter !== "all") {
      if (transactionTypeFilter === TRANSACTION_TYPE.BUY_SUBSCRIPTION) {
        data = data.filter((t) => t.type === TRANSACTION_TYPE.BUY_SUBSCRIPTION);
      } else if (transactionTypeFilter === TRANSACTION_TYPE.INCREASE_WALLET) {
        data = data.filter((t) => t.type === TRANSACTION_TYPE.INCREASE_WALLET);
      }
    }

    // فیلتر بازه زمانی
    if (dateFrom) {
      const from = new Date(dateFrom);
      data = data.filter((t) => new Date(t.created_at) >= from);
    }

    if (dateTo) {
      const to = new Date(dateTo);
      data = data.filter((t) => new Date(t.created_at) <= to);
    }
    if (filterBot) {
      data = data.filter((t) => t.chatbot_uuid === filterBot.uuid);
    }

    setFilteredTransactions(data);
    setCurrentPage(1);
  }, [transactionTypeFilter, dateFrom, dateTo, filterBot, transactions]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );



  const hasActiveFilters = dateFrom !== "" || dateTo !== "";

  const handlePdf = async (transaction_id: string) => {
    try {
      const response = await axiosInstance.get(
        API_ROUTES.FINANCIAL.PDF(transaction_id),
        { responseType: "blob" } // مهم!!
      );

      const pdfBlob = new Blob([response.data], { type: "application/pdf" });

      // دانلود
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice-${transaction_id}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);

      console.log("PDF downloaded");
    } catch (error: any) {
      console.error("Error downloading PDF:", error);
    }
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
            onClick={() =>
              setTransactionTypeFilter(TRANSACTION_TYPE.BUY_SUBSCRIPTION)
            }
            className={`px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-2 ${
              transactionTypeFilter === TRANSACTION_TYPE.BUY_SUBSCRIPTION
                ? "bg-[#65bcb6] text-white shadow-sm"
                : "bg-grey-50 text-grey-700 hover:bg-grey-100"
            }`}
            title="نمایش تراکنش‌های پلن"
          >
            <Bot style={{ width: "16px", height: "16px" }} aria-hidden="true" />
            <span>پلن‌ها</span>
          </button>
          <button
            onClick={() =>
              setTransactionTypeFilter(TRANSACTION_TYPE.INCREASE_WALLET)
            }
            className={`px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-2 ${
              transactionTypeFilter === TRANSACTION_TYPE.INCREASE_WALLET
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
          <div>
            {/* <ChatbotList onSelect={(bot) => setFilterBot(bot)} /> */}
            <ChatbotList
              selectedBot={filterBot}
              onSelect={(bot) => setFilterBot(bot)}
            />
          </div>
          {/* Filter Dropdown Button */}
          <div className="relative mr-auto">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-2 ${
                hasActiveFilters
                  ? "bg-[#65bcb6] text-white shadow-sm"
                  : "bg-grey-50 text-grey-700 hover:bg-grey-100"
              }`}
              title="فیلتر تاریخ"
              type="button"
            >
              <Filter
                style={{ width: "16px", height: "16px" }}
                aria-hidden="true"
              />
              <span>تاریخ</span>
              {hasActiveFilters && (
                <span className="bg-white text-[#65bcb6] rounded-full px-2 py-0.5 text-xs">
                  {dateFrom || dateTo ? 1 : 0}
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

            {isFilterOpen && (
              <div
                id="filter-dropdown"
                className="absolute left-0 mt-2 w-96 bg-white rounded-2xl shadow-lg border border-grey-100 p-4 z-50"
                style={{ maxWidth: "calc(100vw - 2rem)" }}
              >
                {/* Date Range Filter */}
                <div className="mb-4">
                  <label className="block text-grey-700 mb-3">
                    بازه زمانی:
                  </label>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <label className="text-grey-600 whitespace-nowrap text-sm min-w-[30px]">
                        از:
                      </label>
                      <DatePicker
                        value={dateFromTemp ? new Date(dateFromTemp) : ""}
                        onChange={(val) =>
                          setDateFromTemp(
                            val?.toDate?.()?.toISOString?.() || ""
                          )
                        }
                        calendar={persian}
                        locale={persian_fa}
                        inputClass="flex-1 px-3 py-2 rounded-lg border border-grey-200 focus:border-[#65bcb6] focus:outline-none transition-colors text-sm w-full"
                        placeholder="انتخاب تاریخ شروع"
                        calendarPosition="bottom-right"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-grey-600 whitespace-nowrap text-sm min-w-[30px]">
                        تا:
                      </label>
                      <DatePicker
                        value={dateToTemp ? new Date(dateToTemp) : ""}
                        onChange={(val) =>
                          setDateToTemp(val?.toDate?.()?.toISOString?.() || "")
                        }
                        calendar={persian}
                        locale={persian_fa}
                        inputClass="flex-1 px-3 py-2 rounded-lg border border-grey-200 focus:border-[#65bcb6] focus:outline-none transition-colors text-sm w-full"
                        placeholder="انتخاب تاریخ پایان"
                        calendarPosition="bottom-right"
                      />
                    </div>
                  </div>
                </div>

                {/* Apply Filters Button */}
                <button
                  onClick={() => {
                    setDateFrom(dateFromTemp);
                    setDateTo(dateToTemp);
                    setIsFilterOpen(false);
                  }}
                  className="w-full px-4 py-2 mt-3 rounded-lg bg-[#65bcb6] text-white hover:bg-[#52a89d] transition-colors flex items-center justify-center gap-2"
                  type="button"
                >
                  <Filter style={{ width: "16px", height: "16px" }} />
                  <span>اعمال فیلتر</span>
                </button>

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <button
                    onClick={() => {
                      setDateFrom("");
                      setDateTo("");
                    }}
                    className="w-full px-4 py-2 mt-2 rounded-lg bg-grey-50 text-grey-700 hover:bg-grey-100 transition-colors flex items-center justify-center gap-2"
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
                  {paginatedTransactions.map((transaction) => (
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
                          <p className="text-grey-900 font-normal">
                            {getTransactionTitle(transaction.type)}
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
                        </div>
                      </td>

                      {/* شناسه */}
                      <td className="px-6 py-4">
                        {convertToPersian(transaction.tracking_code)}
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
                            onClick={() => handlePdf(transaction.id)}
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

                          {/* <button
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
                          </button> */}

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
              {(i + 1).toLocaleString("fa-IR")}
            </button>
          ))}
        </div>
      )}
    </section>
  );
};
