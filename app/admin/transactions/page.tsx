"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Refresh } from "@/public/icons/AppIcons";
import { useAuth } from "@/providers/AuthProvider";
import { API_ROUTES } from "@/constants/apiRoutes";
import { ProfileModal } from "../users/ProfileModal";
import { useSearchParams } from "next/navigation";
import { GenericSelector } from "@/components/selector";
import { convertNumbersToPersian } from "@/utils/common";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { TRANSACTION_OPTION, TRANSACTION_STATUS } from "@/constants/plans";
import PageLoader from "@/components/pageLoader";
import axiosInstance from "@/lib/axiosInstance";
import TableTransaction from "./tableTransaction";
import { Transaction } from "@/types/common";

export default function AdminTransactions() {
  const { loading } = useAuth();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id") ?? undefined;
  const [openProfile, setOpenProfile] = useState(false);
  const [profileId, setProfileId] = useState<number>();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [transactionType, setTransactionType] = useState("all");
  const [transactionStatus, setTransactionStatus] = useState("all");

  /* =======================
        Applied Filters (API)
  ======================= */
  const [appliedSearch, setAppliedSearch] = useState("");
  const [appliedTransactionType, setAppliedTransactionType] = useState("all");
  const [appliedTransactionStatus, setAppliedTransactionStatus] =
    useState("all");

  /* =======================
        Pagination
  ======================= */
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const [total, setTotal] = useState(0);
  const totalPages = Math.ceil(total / pageSize);

  /* =======================
        Load Transactions
  ======================= */
  const loadTransactions = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get(API_ROUTES.ADMIN.TRANSACTIONS, {
        params: {
          page,
          page_size: pageSize,
          ...(userId && { user_id: userId }),
          ...(appliedSearch && { search: appliedSearch }),
          ...(appliedTransactionType !== "all" && {
            transaction_type: appliedTransactionType,
          }),
          ...(appliedTransactionStatus !== "all" && {
            status: appliedTransactionStatus,
          }),
        },
      });

      const data = res.data.data;
      setTransactions(data.items);
      setTotal(data.pagination.total);
    } catch (error) {
      console.error("Load transactions error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [
    page,
    pageSize,
    userId,
    appliedSearch,
    appliedTransactionType,
    appliedTransactionStatus,
  ]);

  /* =======================
        Effects
  ======================= */
  useEffect(() => {
    if (!loading) {
      loadTransactions();
    }
  }, [loading, loadTransactions]);

  /* =======================
        Handlers
  ======================= */
  const handleSearch = () => {
    setPage(1);
    setAppliedSearch(search);
    setAppliedTransactionType(transactionType);
    setAppliedTransactionStatus(transactionStatus);
  };

  const handleRefresh = () => {
    setSearch("");
    setTransactionType("all");
    setTransactionStatus("all");

    setAppliedSearch("");
    setAppliedTransactionType("all");
    setAppliedTransactionStatus("all");

    setPage(1);
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleSetPage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <div className="h-screen overflow-y-auto w-full">
      {(isLoading || loading) && <PageLoader />}
      <header className="bg-bg-surface border-b px-6 py-6 flex justify-between">
        {/* <h1 className="text-2xl font-bold">
          {userId ? "تراکنش‌های کاربر" : "مدیریت تراکنش‌ها"}
        </h1> */}
        {userId ? (
          <div className="flex flex-col">
            <div className="font-medium ">تراکنش‌های کاربر</div>
            <div className="flex items-center gap-2 mt-2 text-sm">
              <div className="font-medium ">کد:</div>

              {userId}
              <button
                className="flex items-center cursor-pointer text-primary font-medium gap-2 border border-primary rounded-2xl px-4 py-1"
                onClick={() => {
                  setOpenProfile(true);
                  setProfileId(userId ? Number(userId) : undefined);
                }}
              >
                مشاهده پروفایل
                <Eye size={14} />
              </button>
            </div>
          </div>
        ) : (
          <h1 className="text-grey-900 mb-0 mr-1 lg:mr-10 text-2xl lg:text-3xl font-bold">
            مدیریت تراکنش‌ها
          </h1>
        )}
      </header>

      <main className="flex-1 p-6 ">
        <div className="flex justify-between gap-4 items-center p-2 mb-4 ">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              نوع تراکنش
              <GenericSelector
                items={TRANSACTION_OPTION}
                selectedValue={transactionType}
                onSelect={(value) => {
                  setTransactionType(value);
                }}
                showIndicator
                className="border border-primary rounded-xl bg-white"
              />
            </div>
            <div className="flex items-center gap-1">
              وضعیت
              <GenericSelector
                items={TRANSACTION_STATUS}
                selectedValue={transactionStatus}
                onSelect={(value) => {
                  setTransactionStatus(value);
                }}
                showIndicator
                className="border border-primary rounded-xl bg-white"
              />
            </div>
            <div className="flex items-center gap-1">
              جستجو 
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="توضیحات و کد  "
                className="border border-primary rounded-xl bg-white"
              />
            </div>
          </div>

          <div className="flex items-center">
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? "در حال جستجو..." : "جستجو"}
            </Button>
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="mr-3"
            >
              <div className="w-6 text-primary">
                <Refresh />
              </div>
            </button>
          </div>

          {/* <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="mr-3"
            >
              <div className="w-6 text-primary">
                <Refresh />
              </div>
            </button> */}
        </div>
        <div className="bg-white rounded-3xl border border-grey-100 shadow-card w-full p-3">
          {transactions.length === 0 && !isLoading ? (
            <div className="text-center text-gray-500 py-12">
              تراکنشی یافت نشد
            </div>
          ) : (
            <TableTransaction
              data={transactions}
              showUserCol={userId ? false : true}
            />
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
      {profileId && (
        <ProfileModal
          open={openProfile}
          id={profileId}
          data={null}
          onClose={() => setOpenProfile(false)}
        />
      )}
    </div>
  );
}
