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

export default function AdminUsers() {
  const { user, loading } = useAuth();

  // State اصلی
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [total, setTotal] = useState(0);

  // Modal states
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    id: string | null;
  }>({
    isOpen: false,
    id: null,
  });

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
    [pageSize]
  );

  // هندلر جستجو
  const handleSearch = async () => {
    setPage(1);
    await loadUsers(1, search);
  };

  // هندلرهای صفحه‌بندی
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

  // هندلرهای مودال
  const handleProfileModal = async (id: string) => {
    setShowProfileModal(true);
    setProfileData(id);
  };

  // بارگذاری اولیه
  useEffect(() => {
    if (!loading) {
      loadUsers(1);
    }
  }, [loading]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="lg:h-screen w-full overflow-hidden">
      <header className="bg-bg-surface border-b border-border-soft px-6 lg:px-8 py-6">
        <div className="text-right">
          <h1 className="text-grey-900 mb-0 mr-1 lg:mr-10 text-2xl lg:text-3xl font-bold">
            مدیریت کاربران
          </h1>
        </div>
      </header>

      <main className="flex-1 p-6 overflow-y-auto h-screen">
        {(isLoading || loading) && <PageLoader />}

        <div className="max-w-7xl mx-auto pb-8">
          {/* کارت اصلی */}
          <div className="bg-white rounded-3xl border border-grey-100 shadow-card w-full p-3">
            {/* بخش جستجو */}
            <div className="flex items-center justify-between m-6 pb-4 border-b border-primary/50">
              <div className="flex items-center gap-3 flex-1">
                <label className="block mb-1 text-sm">جستجو</label>
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="نام، موبایل یا ایمیل"
                  className="flex-1"
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch} disabled={isLoading}>
                {isLoading ? "در حال جستجو..." : "جستجو"}
              </Button>
            </div>

            {/* جدول کاربران */}
            <div className="divide-grey-100 w-full">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b border-grey-200 text-sm font-normal bg-grey-50">
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
                    users.map((user) => (
                      <tr
                        key={user.id}
                        className="border border-grey-100 hover:bg-grey-100 transition-colors"
                      >
                        <td className="px-3 py-2 text-sm">{user.phone}</td>
                        <td className="px-3 py-2 text-sm">
                          {user.full_name || "-"}
                        </td>
                        <td className="px-3 py-2">
                          {user.company_name || "-"}
                        </td>
                        <td className="px-3 py-2">{user.total_chatbots}</td>
                        <td className="px-3 py-2">
                          <time className="text-grey-600">
                            {new Date(user.created_at).toLocaleDateString(
                              "fa-IR"
                            )}
                          </time>
                        </td>
                        <td className="px-3 py-2">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleProfileModal(user.id)}
                              className="inline-flex cursor-pointer items-center justify-center p-2 hover:bg-grey-100 rounded-lg transition-colors"
                              type="button"
                            >
                              پروفایل
                            </button>
                            <Link
                              className="inline-flex cursor-pointer items-center justify-center p-2 hover:bg-grey-100 rounded-lg transition-colors"
                              href={`/admin/chatbots/${user.id}`}
                            >
                              چت‌بات‌ها
                            </Link>
                            <Link
                              className="inline-flex cursor-pointer items-center justify-center p-2 hover:bg-grey-100 rounded-lg transition-colors"
                              href={`/admin/tickets/${user.id}`}
                            >
                              تیکت‌ها
                            </Link>
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
              <div className="flex items-center justify-between mt-6 px-3 py-4 border-t border-grey-200">
                <span className="text-sm text-grey-600">
                  صفحه {page} از {totalPages} | مجموع {total} کاربر
                </span>
                <div className="flex gap-2">
                  <Button
                    onClick={handlePrevPage}
                    disabled={page === 1 || isLoading}
                    // variant="outline"
                  >
                    قبلی
                  </Button>
                  <Button
                    onClick={handleNextPage}
                    disabled={page === totalPages || isLoading}
                    // variant="outline"
                  >
                    بعدی
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modals */}
        <ProfileModal
          open={showProfileModal}
          data={profileData}
          onClose={() => {
            setShowProfileModal(false);
            setProfileData(null);
          }}
        />
      </main>
    </div>
  );
}
