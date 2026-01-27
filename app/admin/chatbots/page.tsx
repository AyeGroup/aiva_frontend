"use client";

import React, { useCallback, useEffect, useState } from "react";

import axiosInstance from "@/lib/axiosInstance";
import PageLoader from "@/components/pageLoader";
import { API_ROUTES } from "@/constants/apiRoutes";
import { useAuth } from "@/providers/AuthProvider";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Refresh } from "@/public/icons/AppIcons";
import { ToggleSmall } from "@/components/toggleSmall";
import { convertNumbersToPersian, convertToPersian } from "@/utils/common";
import { getPlanNameById } from "@/constants/plans";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AdminChatbots() {
  const { loading } = useAuth();

  const [chatbots, setChatbots] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [activeOnly, setActiveOnly] = useState(true);
 
  // Pagination
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [total, setTotal] = useState(0);

  const totalPages = Math.ceil(total / pageSize);

  // Load Chatbots
  const loadChatbots = useCallback(
    async (pageNumber: number = 1, searchQuery: string = search) => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(API_ROUTES.ADMIN.CHATBOTS, {
          params: {
            page: pageNumber,
            page_size: pageSize,
            //  search: searchQuery || undefined,
            ...(search && { search: searchQuery }),
            ...(activeOnly === true && { active_only: true }),
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
    [pageSize, activeOnly, search],
  );

  // Handlers
  const handleSearch = () => {
    setPage(1);
    loadChatbots(1, search);
  };

  const handleRefresh = () => {
    setPage(1);
    setSearch("");
    loadChatbots(1, "");
  };
  const handleSetPage = (page: number) => {
    setPage(page);
    loadChatbots(page);
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

  // Initial Load
  useEffect(() => {
    if (!loading) {
      loadChatbots(1);
    }
  }, [loading]);

  if (loading) return <PageLoader />;

  // Render
  return (
    <div className="w-full overflow-y-auto h-screen">
      {/* Header */}
      <header className="bg-bg-surface border-b border-border-soft px-6 lg:px-8 py-6 flex justify-between items-center">
        <h1 className="text-grey-900 text-2xl lg:text-3xl font-bold">
          مدیریت چت‌بات‌ها
        </h1>
      </header>

      {/* Content */}
      <main className="flex-1 p-6 ">
        {(isLoading || loading) && <PageLoader />}
        <div className="flex items-center justify-between m-2 pb-4 gap-4">
          <div className="flex items-center gap-4">
            جستجو
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="نام چت‌بات ، کاربر یا شرکت "
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <ToggleSmall
              label="فقط فعال‌ها"
              checked={activeOnly}
              onChange={(e) => {
                setActiveOnly(!activeOnly);
                loadChatbots(1, search);
              }}
            />
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
        </div>
        <div className="max-w-7xl mx-auto pb-8">
          <div className="bg-white rounded-3xl border border-grey-100 shadow-card w-full p-3">
            {/* Filters */}

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b border-grey-200 text-sm bg-grey-50">
                    <th className="px-3 py-2 text-right">کد</th>
                    <th className="px-3 py-2 text-right">نام</th>
                    <th className="px-3 py-2 text-right">وضعیت</th>
                    <th className="px-3 py-2 text-right">کاربر</th>
                    <th className="px-3 py-2 text-right">شرکت</th>
                    <th className="px-3 py-2 text-right">پلن</th>
                    <th className="px-3 py-2 text-right">انقضا</th>
                    <th className="px-3 py-2 text-right">تعداد کاربران</th>
                    <th className="px-3 py-2 text-right">تاریخ ایجاد</th>
                  </tr>
                </thead>
                <tbody>
                  {chatbots.length > 0 ? (
                    chatbots.map((bot, index) => (
                      <tr
                        key={index}
                        className="border-b  last:border-b-0 border-grey-100 hover:bg-grey-100 transition"
                      >
                        <td className="px-3 py-2 text-sm">
                          <span className="rounded-full bg-gray-100 py-1 px-3">
                            {convertToPersian(bot.id)}
                          </span>
                        </td>
                        <td className="px-3 py-2">{bot.name}</td>
                        <td className="px-3 py-2">
                          {bot.active ? (
                            <span className="text-green-600">فعال</span>
                          ) : (
                            <span className="text-red-500">غیرفعال</span>
                          )}
                        </td>
                        <td className="px-3 py-2">{bot.owner_company}</td>
                        <td className="px-3 py-2">{bot.owner_name}</td>
                        <td className="px-3 py-2">
                          {getPlanNameById(bot.plan)}
                        </td>
                        <td className="px-3 py-2">
                          {bot.expires_at
                            ? new Date(bot.expires_at).toLocaleDateString(
                                "fa-IR",
                              )
                            : "-"}
                        </td>
                        <td className="px-3 py-2">
                          {convertNumbersToPersian(bot.total_users)}
                        </td>
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
        </div>
      </main>
    </div>
  );
}
