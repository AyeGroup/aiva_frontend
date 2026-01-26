"use client";
import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import PageLoader from "@/components/pageLoader";
import axiosInstance from "@/lib/axiosInstance";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { useAuth } from "@/providers/AuthProvider";
import { API_ROUTES } from "@/constants/apiRoutes";
import { ProfileModal } from "./ProfileModal";
import { convertNumbersToPersian } from "@/utils/common";
import { Refresh } from "@/public/icons/AppIcons";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ConfirmModal } from "@/components/ConfirmModal";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AdminUsers() {
  const { user, loading, logout } = useAuth();

  // State اصلی
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [total, setTotal] = useState(0);

  // Modal states
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [profileId, setProfileId] = useState<any>(null);
  const router = useRouter();
  // محاسبه تعداد صفحات
  const totalPages = Math.ceil(total / pageSize);

  // دریافت کاربران با pagination و جستجو
  const loadUsers = useCallback(
    async (pageNumber: number = page, searchQuery: string = search) => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(API_ROUTES.ADMIN.USERS, {
          params: {
            page: pageNumber,
            page_size: pageSize,
            search: searchQuery || undefined,
          },
        });

        const data = response.data.data;

        setUsers(data.items);
        setPage(data.pagination.page);
        setTotal(data.pagination.total);
      } catch (error) {
        console.error("Error loading users:", error);
        setUsers([]);
      } finally {
        setIsLoading(false);
      }
    },
    [pageSize],
  );

  const handleSearch = async () => {
    setPage(1);
    await loadUsers(1, search);
  };

  const handleLoginAsUser = async () => {
    try {
      if (!profileId) return;
      const res = await axiosInstance.post(API_ROUTES.ADMIN.USER_LOGIN(profileId));
      const data = res.data;
      if (!data.success) {
        toast.error(data.message || "اشکال در  ورود به حساب کاربر");
        return;
      }

      console.log("data login:", res.data);
      // logout();
      // router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.message || "اشکال در  ورود به حساب کاربر");
    }
  };

  const handleRefresh = async () => {
    setPage(1);
    await loadUsers(1, "");
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      loadUsers(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      loadUsers(page - 1);
    }
  };

  const handleSetPage = (page: number) => {
    setPage(page);
    loadUsers(page);
  };

  const handleProfileModal = async (id: string) => {
    setShowProfileModal(true);
    setProfileId(id);
  };

  useEffect(() => {
    if (!loading) {
      loadUsers(1);
    }
  }, [loading]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="lg:h-screen w-full overflow-y-auto">
      <header className="bg-bg-surface border-b border-border-soft px-6 lg:px-8 py-6">
        <div className="text-right">
          <h1 className="text-grey-900 mb-0 mr-1 lg:mr-10 text-2xl lg:text-3xl font-bold">
            مدیریت کاربران
          </h1>
        </div>
      </header>

      <main className="flex-1 p-6 ">
        {(isLoading || loading) && <PageLoader />}

        <div className="max-w-7xl mx-auto pb-8">
          <div className="flex items-center justify-between mb-2 pb-4">
            <div className="flex items-center gap-3 flex-1">
              <label className="block mb-1 text-sm">جستجو</label>
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="نام، موبایل یا ایمیل"
                className="flex-1 "
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button
              onClick={handleSearch}
              disabled={isLoading}
              className="py-2!"
            >
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
          {/* کارت اصلی */}
          <div className="bg-white rounded-3xl border border-grey-100 shadow-card w-full p-3">
            {/* جدول کاربران */}
            <div className="divide-grey-100 w-full">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b border-grey-200 text-sm font-normal bg-grey-50">
                    <th className="px-3 py-2 text-right text-grey-600">کد</th>
                    <th className="px-3 py-2 text-right text-grey-600">
                      موبایل
                    </th>
                    <th className="px-3 py-2 text-right text-grey-600">نام</th>
                    <th className="px-3 py-2 text-right text-grey-600">شرکت</th>
                    <th className="px-3 py-2 text-right text-grey-600">
                      تعداد چت‌بات‌ها
                    </th>
                    <th className="px-3 py-2 text-right text-grey-600">
                      تاریخ ثبت‌نام
                    </th>
                    <th className="px-3 py-2 text-center text-grey-600">
                      عملیات
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user, index) => (
                      <tr
                        key={index}
                        className="border-b last:border-b-0 border-grey-100 hover:bg-grey-100 transition-colors"
                      >
                        <td className="px-3 py-2 text-sm">
                          <span className="rounded-full bg-gray-100 py-1 px-3">
                            {convertNumbersToPersian(user.id)}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-sm">
                          {convertNumbersToPersian(user.phone)}
                        </td>
                        <td className="px-3 py-2 text-sm">
                          {user.full_name || "-"}
                        </td>
                        <td className="px-3 py-2">
                          {user.company_name || "-"}
                        </td>
                        <td className="px-3 py-2">
                          {convertNumbersToPersian(user.total_chatbots)}
                        </td>
                        <td className="px-3 py-2">
                          <time className="text-grey-600">
                            {new Date(user.created_at).toLocaleDateString(
                              "fa-IR",
                            )}
                          </time>
                        </td>
                        <td className="px-3 py-2">
                          <div className="flex items-center justify-center gap-4">
                            <button
                              onClick={() => handleProfileModal(user.id)}
                              className=" cursor-pointer border-2 border-primary text-sm  py-1 px-3 text-primary hover:text-secondary hover:border-secondary rounded-md transition-colors"
                              type="button"
                            >
                              پروفایل
                            </button>
                            <Link
                              className=" cursor-pointer border-2 border-primary text-sm  py-1 px-3 text-primary hover:text-secondary hover:border-secondary rounded-md transition-colors"
                              href={`/admin/chatbots/${user.id}`}
                            >
                              چت‌بات‌ها
                            </Link>
                            <Link
                              className=" cursor-pointer border-2 border-primary text-sm  py-1 px-3 text-primary hover:text-secondary hover:border-secondary rounded-md transition-colors"
                              href={`/admin/tickets?id=${user.id}`}
                            >
                              تیکت‌ها
                            </Link>
                            <Link
                              className=" cursor-pointer border-2 border-primary text-sm  py-1 px-3 text-primary hover:text-secondary hover:border-secondary rounded-md transition-colors"
                              href={`/admin/transactions?id=${user.id}`}
                            >
                              مالی
                            </Link>
                            <button
                              className=" cursor-pointer border-2 border-primary text-sm  py-1 px-3 text-primary hover:text-secondary hover:border-secondary rounded-md transition-colors"
                              title="ورود به عنوان کاربر "
                              onClick={() =>{
                                setProfileId(user.id);

                                setShowConfirmModal(true);
                              }}
                            >
                              ورود
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-3 py-8 text-center">
                        <p className="text-grey-500">
                          {isLoading
                            ? "در حال بارگذاری..."
                            : "کاربری یافت نشد."}
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center px-3 py-4 gap-6">
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

        {/* Modals */}
        <ProfileModal
          open={showProfileModal}
          data={null}
          id={profileId}
          onClose={() => {
            setShowProfileModal(false);
            setProfileId(null);
          }}
        />
        <ConfirmModal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={handleLoginAsUser}
          title=" ورود به حساب کاربری"
          message="با ورود به حساب کاربر، از پنل مدیریت خارج می شود. آیا ادامه می‌دهید؟"
          confirmText="بله"
          cancelText="خیر"
          type="warning"
        />
      </main>
    </div>
  );
}
