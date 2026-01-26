"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import axiosInstance from "@/lib/axiosInstance";
import { API_ROUTES } from "@/constants/apiRoutes";
import { useAuth } from "@/providers/AuthProvider";

import PageLoader from "@/components/pageLoader";
import { Back } from "@/public/icons/AppIcons";
import { convertNumbersToPersian, convertToPersian } from "@/utils/common";
import { getPlanNameById } from "@/constants/plans";
import { ChevronLeft, ChevronRight, Edit3, Eye } from "lucide-react";

export default function AdminUserChatbots() {
  const { loading } = useAuth();
  const { id } = useParams<{ id: string }>();

  const [chatbots, setChatbots] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [total, setTotal] = useState(0);

  const totalPages = Math.ceil(total / pageSize);

  // Load Chatbots
  const loadChatbots = useCallback(
    async (pageNumber: number = 1) => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(
          API_ROUTES.ADMIN.USER_PROFILE(id),
          {
            params: {
              page: pageNumber,
              page_size: pageSize,
            },
          },
        );

        const data = response.data.data;
        console.log("data ", data);

        // Use optional chaining to avoid errors if pagination is missing
        setChatbots(data?.chatbots?.items);
        setProfile(data?.profile);

        //   // Ensure pagination is present and has 'page' and 'total' properties
        setPage(data?.chatbots?.pagination?.page || 1); // Default to 1 if page is missing
        setTotal(data?.chatbots?.pagination?.total || 0); // Default to 0 if total is missing
      } catch (error) {
        console.error("Error loading chatbots:", error);
        setChatbots([]);
      } finally {
        setIsLoading(false);
      }
    },
    [pageSize],
  );

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
  const handleSetPage = (page: number) => {
    setPage(page);
    loadChatbots(page);
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
      <header className="bg-bg-surface border-b border-border-soft px-6 lg:px-8 py-6 flex justify-between items-start">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span>نام:</span>
            <span className="font-medium">{profile?.full_name}</span>
          </div>
          <div className="flex items-center gap-2 ">
            <span>شرکت:</span>
            <span className="font-medium">{profile?.company_name}</span>
          </div>

          <div className="flex items-center gap-2">
            <span>شماره تماس:</span>
            <span className="font-medium">
              {convertToPersian(profile?.phone)}
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-between items-end">
          <Link
            href="/admin/users"
            className="flex text-primary items-center gap-2 cursor-pointer"
          >
            بازگشت
            <div className="text-primary w-6">
              <Back />
            </div>
          </Link>

          <div className="flex items-center gap-2 mt-4">
            <div className="text-sm">

            موجودی کیف پول
            </div>
            <div className="text-white bg-primary px-3 py-1 rounded-md">{Number(profile?.wallet_balance).toLocaleString("fa-IR")}</div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 p-6 ">
        {(isLoading || loading) && <PageLoader />}

        <div className="max-w-7xl mx-auto pb-8">
          <div className="bg-white rounded-3xl border border-grey-100 shadow-card w-full p-3">
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b border-grey-200 text-sm bg-grey-50">
                    <th className="px-3 py-2 text-right">نام</th>
                    <th className="px-3 py-2 text-right">وضعیت</th>
                    <th className="px-3 py-2 text-right">پلن</th>
                    <th className="px-3 py-2 text-right">انقضا</th>
                    <th className="px-3 py-2 text-right">تعداد کاربران</th>
                  </tr>
                </thead>
                <tbody>
                  {chatbots.length > 0 ? (
                    chatbots.map((bot, index) => (
                      <tr
                        key={index}
                        className="border-b last:border-b-0 border-grey-100 hover:bg-grey-100 transition"
                      >
                        <td className="px-3 py-2">{bot.name}</td>
                        <td className="px-3 py-2">
                          {bot.active ? (
                            <span className="text-green-600">فعال</span>
                          ) : (
                            <span className="text-red-500">غیرفعال</span>
                          )}
                        </td>
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
                        {/* <td className="px-3 py-2">
                          <Link
                            href={`/onboarding&id=${bot.uuid}`}
                            className="chatbot-menu-item"
                          >
                            <Eye size={20} className="text-primary" />
                          </Link>
                        </td> */}
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
