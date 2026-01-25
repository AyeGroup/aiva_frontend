"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import PageLoader from "@/components/pageLoader";
import { Card } from "@/components/card";
import { Button } from "@/components/button";
import { API_ROUTES } from "@/constants/apiRoutes";
import { useAuth } from "@/providers/AuthProvider";

/* =======================
   Types
======================= */
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

/* =======================
   Utils
======================= */
const formatDateTime = (date: string) => new Date(date).toLocaleString("fa-IR");

const formatAmount = (amount: number) =>
  amount.toLocaleString("fa-IR") + " تومان";

const statusStyle: Record<string, string> = {
  success: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
  pending: "bg-yellow-100 text-yellow-700",
  failed: "bg-gray-200 text-gray-700",
};

/* =======================
   Transaction Card
======================= */
const TransactionCard = ({ transaction }: { transaction: Transaction }) => {
  return (
    <Card className="p-4 space-y-2 border border-border-soft">
      <div className="flex justify-between text-sm text-gray-500">
        <span>#{transaction.id}</span>
        <span>{formatDateTime(transaction.created_at)}</span>
      </div>

      <div className="font-semibold">
        {transaction.user_name} ({transaction.user_email})
      </div>

      <div className="text-sm">
        <span className="font-medium">نوع:</span> {transaction.type}
      </div>

      <div className="flex gap-3 text-sm">
        <span>
          <span className="font-medium">جهت:</span>{" "}
          {transaction.direction === "income" ? "ورودی" : "خروجی"}
        </span>

        <span
          className={`px-2 py-0.5 rounded text-xs font-medium ${
            statusStyle[transaction.status] ?? "bg-gray-100"
          }`}
        >
          {transaction.status}
        </span>
      </div>

      <div className="text-sm">
        <span className="font-medium">مبلغ:</span>{" "}
        {formatAmount(transaction.amount)}
      </div>

      {transaction.description && (
        <div className="text-xs text-gray-600">{transaction.description}</div>
      )}

      <div className="text-xs text-gray-400">
        کد پیگیری: {transaction.tracking_code ?? "-"}
      </div>
    </Card>
  );
};

/* =======================
   Main Component
======================= */
export default function AdminTransactions() {
  const { loading } = useAuth();
  const params = useParams();

  // ✅ user-id اختیاری
  const userId = params?.id as string | undefined;

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Pagination (Backend)
  const [page, setPage] = useState(1);
  const [pageSize] = useState(50);
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
    [pageSize, userId]
  );

  useEffect(() => {
    if (!loading) loadTransactions(1);
  }, [loading, loadTransactions]);

  /* =======================
     Render
  ======================= */
  return (
    <div className="h-screen overflow-y-auto w-full">
      {(isLoading || loading) && <PageLoader />}
      <header className="bg-bg-surface border-b px-6 py-6 flex justify-between">
        <h1 className="text-2xl font-bold">
          {userId ? "تراکنش‌های کاربر" : "مدیریت تراکنش‌ها"}
        </h1>
      </header>

      <main className="space-y-4">
        {transactions.length === 0 && !isLoading ? (
          <div className="text-center text-gray-500 py-12">
            تراکنشی یافت نشد
          </div>
        ) : (
          transactions.map((tx) => (
            <TransactionCard key={tx.id} transaction={tx} />
          ))
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center pt-6 border-t mt-6">
            <span className="text-sm text-gray-600">
              صفحه {page} از {totalPages} | مجموع{" "}
              {total.toLocaleString("fa-IR")}
            </span>

            <div className="flex gap-2">
              <Button
                // variant="outline"
                disabled={page === 1}
                onClick={() => loadTransactions(page - 1)}
              >
                قبلی
              </Button>
              <Button
                // variant="outline"
                disabled={page === totalPages}
                onClick={() => loadTransactions(page + 1)}
              >
                بعدی
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
