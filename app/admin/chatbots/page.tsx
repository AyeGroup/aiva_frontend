"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import axiosInstance from "@/lib/axiosInstance";
import { API_ROUTES } from "@/constants/apiRoutes";
import { useAuth } from "@/providers/AuthProvider";

import PageLoader from "@/components/pageLoader";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

export default function AdminUserChatbots() {
  const { loading } = useAuth();
  const params = useParams();

  // اگر صفحه از مسیر /admin/users/[id]/chatbots باز شود، مقدار دارد
  // اگر از /admin/chatbots باز شود، undefined خواهد بود
  const userId = params?.id as string | undefined;

  // ========================
  // State ها
  // ========================
  const [chatbots, setChatbots] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [activeOnly, setActiveOnly] = useState(true);

  // Pagination
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [total, setTotal] = useState(0);

  const totalPages = Math.ceil(total / pageSize);

  // ========================
  // Load Chatbots
  // ========================
  const loadChatbots = useCallback(
    async (pageNumber: number = 1, searchQuery: string = search) => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(API_ROUTES.ADMIN.CHATBOTS, {
          params: {
            page: pageNumber,
            page_size: pageSize,
            search: searchQuery || undefined,
            active_only: activeOnly,
            ...(userId && { user_id: userId }), // ✅ فقط در صورت وجود
          },
        });

        const data = response.data.data;

        setChatbots(data.items);
        setPage(data.pagination.page);
        setTotal(data.pagination.total);
      } catch (error) {
        console.error("Error loading chatbots:", error);
        setChatbots([]);
      } finally {
        setIsLoading(false);
      }
    },
    [pageSize, activeOnly, search, userId]
  );

  // ========================
  // Handlers
  // ========================
  const handleSearch = () => {
    setPage(1);
    loadChatbots(1, search);
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      loadChatbots(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      loadChatbots(page - 1);
    }
  };

  // ========================
  // Initial Load
  // ========================
  useEffect(() => {
    if (!loading) {
      loadChatbots(1);
    }
  }, [loading]);

  if (loading) return <PageLoader />;

  // ========================
  // Render
  // ========================
  return (
    <div className="lg:h-screen w-full overflow-hidden">
      {/* Header */}
      <header className="bg-bg-surface border-b border-border-soft px-6 lg:px-8 py-6 flex justify-between items-center">
        <h1 className="text-grey-900 text-2xl lg:text-3xl font-bold">
          {userId ? "چت‌بات‌های کاربر" : "مدیریت چت‌بات‌ها"}
        </h1>

        {userId && (
          <Link
            href="/admin/users"
            className="text-primary-600 hover:underline text-sm"
          >
            ← بازگشت به لیست کاربران
          </Link>
        )}
      </header>

      {/* Content */}
      <main className="flex-1 p-6 overflow-y-auto h-screen">
        {(isLoading || loading) && <PageLoader />}

        <div className="max-w-7xl mx-auto pb-8">
          <div className="bg-white rounded-3xl border border-grey-100 shadow-card w-full p-3">
            {/* Filters */}
            <div className="flex flex-wrap items-end justify-between m-6 pb-4 border-b border-primary/50 gap-4">
              <div className="flex flex-col gap-1 flex-1 min-w-[250px]">
                <label className="text-sm">جستجو</label>
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="نام چت‌بات یا مالک"
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm">فقط فعال‌ها</label>
                <input
                  type="checkbox"
                  checked={activeOnly}
                  onChange={(e) => {
                    setActiveOnly(e.target.checked);
                    loadChatbots(1, search);
                  }}
                />
              </div>

              <Button onClick={handleSearch} disabled={isLoading}>
                {isLoading ? "در حال جستجو..." : "جستجو"}
              </Button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b border-grey-200 text-sm bg-grey-50">
                    <th className="px-3 py-2 text-right">نام</th>
                    <th className="px-3 py-2 text-right">وضعیت</th>
                    <th className="px-3 py-2 text-right">مالک</th>
                    <th className="px-3 py-2 text-right">پلن</th>
                    <th className="px-3 py-2 text-right">انقضا</th>
                    <th className="px-3 py-2 text-right">تعداد کاربران</th>
                    <th className="px-3 py-2 text-right">تاریخ ایجاد</th>
                  </tr>
                </thead>
                <tbody>
                  {chatbots.length > 0 ? (
                    chatbots.map((bot) => (
                      <tr
                        key={bot.uuid}
                        className="border-b border-grey-100 hover:bg-grey-100 transition"
                      >
                        <td className="px-3 py-2">{bot.name}</td>
                        <td className="px-3 py-2">
                          {bot.active ? (
                            <span className="text-green-600">فعال</span>
                          ) : (
                            <span className="text-red-500">غیرفعال</span>
                          )}
                        </td>
                        <td className="px-3 py-2">{bot.owner_name}</td>
                        <td className="px-3 py-2">{bot.plan}</td>
                        <td className="px-3 py-2">
                          {bot.expires_at
                            ? new Date(bot.expires_at).toLocaleDateString(
                                "fa-IR"
                              )
                            : "-"}
                        </td>
                        <td className="px-3 py-2">{bot.total_users}</td>
                        <td className="px-3 py-2">
                          {new Date(bot.created_at).toLocaleDateString("fa-IR")}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="py-8 text-center text-grey-500"
                      >
                        {isLoading ? "در حال بارگذاری..." : "چت‌باتی یافت نشد"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 px-3 py-4 border-t border-grey-200">
                <span className="text-sm text-grey-600">
                  صفحه {page} از {totalPages} | مجموع {total}
                </span>
                <div className="flex gap-2">
                  <Button
                    // variant="outline"
                    disabled={page === 1 || isLoading}
                    onClick={handlePrevPage}
                  >
                    قبلی
                  </Button>
                  <Button
                    // variant="outline"
                    disabled={page === totalPages || isLoading}
                    onClick={handleNextPage}
                  >
                    بعدی
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
