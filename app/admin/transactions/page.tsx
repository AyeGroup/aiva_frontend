"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import PageLoader from "@/components/pageLoader";
import { Button } from "@/components/button";
import { API_ROUTES } from "@/constants/apiRoutes";
import { useAuth } from "@/providers/AuthProvider";
import TableTransaction from "./tableTransaction";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { convertNumbersToPersian } from "@/utils/common";

type Transaction = {
  id: number;
  user_id: number;
  user_name: string;
  user_email: string;
  chatbot_id: number | null;
  chatbot_name: string | null;
  type: string;
  direction: "income" | "outcome";
  status: "success" | "cancelled" | "pending" | "failed" | string;
  amount: number;
  description: string | null;
  tracking_code: string | null;
  created_at: string;
};

export default function AdminTransactions() {
  const { loading } = useAuth();
  const params = useParams();

  // ✅ user-id اختیاری
  const userId = params?.id as string | undefined;

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Pagination (Backend)
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [total, setTotal] = useState(0);

  const totalPages = Math.ceil(total / pageSize);

  /* =======================
     Load Transactions
  ======================= */
  const loadTransactions = useCallback(
    async (pageNumber: number = 1) => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get(API_ROUTES.ADMIN.TRANSACTIONS, {
          params: {
            page: pageNumber,
            page_size: pageSize,
            ...(userId && { user_id: userId }),
          },
        });

        const data = res.data.data;

        setTransactions(data.items);
        setPage(data.pagination.page);
        setTotal(data.pagination.total);
      } catch (error) {
        console.error("Load transactions error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [pageSize, userId],
  );

  useEffect(() => {
    if (!loading) loadTransactions(1);
  }, [loading, loadTransactions]);

  // هندلرهای صفحه‌بندی
  const handleNextPage = () => {
    if (page < totalPages) {
      loadTransactions(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      loadTransactions(page - 1);
    }
  };
  const handleSetPage = (page: number) => {
    setPage(page);
    loadTransactions(page);
  };
 
  return (
    <div className="h-screen overflow-y-auto w-full">
      {(isLoading || loading) && <PageLoader />}
      <header className="bg-bg-surface border-b px-6 py-6 flex justify-between">
        <h1 className="text-2xl font-bold">
          {userId ? "تراکنش‌های کاربر" : "مدیریت تراکنش‌ها"}
        </h1>
      </header>

      <main className="flex-1 p-6 ">
        <div className="bg-white rounded-3xl border border-grey-100 shadow-card w-full p-3">
          {transactions.length === 0 && !isLoading ? (
            <div className="text-center text-gray-500 py-12">
              تراکنشی یافت نشد
            </div>
          ) : (
            <TableTransaction data={transactions} />
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center mt-6 px-3 py-4 gap-6">
              {/* Previous Page */}
              <button
                onClick={handlePrevPage}
                disabled={page === 1 || isLoading}
                className={`text-secondary text-sm flex items-center cursor-pointer ${page === 1 ? "opacity-50" : ""}`}
              >
                <ChevronRight />
                قبلی
              </button>

              {/* Numeric Pagination */}
              <div className="flex items-center gap-3">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handleSetPage(index + 1)}
                    className={`px-3 py-1 text-sm border-secondary rounded-full ${page === index + 1 ? "border " : "border-none"}`}
                  >
                    {convertNumbersToPersian(index + 1)}
                  </button>
                ))}
              </div>

              {/* Next Page */}
              <button
                onClick={handleNextPage}
                disabled={page === totalPages || isLoading}
                className={`text-secondary text-sm flex items-center cursor-pointer ${page === totalPages ? "opacity-50" : ""}`}
              >
                بعدی
                <ChevronLeft />
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
