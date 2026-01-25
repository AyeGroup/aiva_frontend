"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import PageLoader from "@/components/pageLoader";
import axiosInstance from "@/lib/axiosInstance";
import { useAuth } from "@/providers/AuthProvider";
import { API_ROUTES } from "@/constants/apiRoutes";
import { ConfirmModal } from "@/components/ConfirmModal";
import { ProfileModal } from "./ProfileModal";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

export default function AdminUsers() {
  const { user, loading } = useAuth();
  const [users, setUsers] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    id: string | null;
  }>({
    isOpen: false,
    id: null,
  });

  useEffect(() => {
    if (loading) return;

    const fetchUsers = async () => {
      await loadUsers();
    };

    fetchUsers();
  }, [loading, user?.token]);

  const loadUsers = async () => {
    setIsLoading(true);
    setUsers([]);
    try {
      const response = await axiosInstance.get(API_ROUTES.ADMIN.USERS);
      console.log("users: ", response.data.data);
      setUsers(response?.data?.data);
    } catch (apiError: any) {
      console.warn("API fetch failed, using local data:", apiError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {};

  const handleConfirmDelete = () => {};

  const handleProfileModal = async (id: string) => {
    setShowProfileModal(true);
    setProfileData(id);
  };

  const openConfirmModal = (id: string) => {
    setConfirmModal({ isOpen: true, id });
  };

  const closeConfirmModal = () => {
    setConfirmModal({ isOpen: false, id: null });
  };

  
  if (loading) return;

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
          {/* Chatbots List */}
          <div className="bg-white rounded-3xl border border-grey-100 shadow-card w-full p-3">
            <div className="flex items-center justify-between m-6 pb-4 border-b border-primary/50">
              <div className="flex items-center gap-3">
                <label className="block mb-1 text-sm">نام</label>
                <Input
                  value={searchName || ""}
                  onChange={(e) => setSearchName(e.target.value)}
                  maxLength={5}
                />
              </div>
              <div className="flex items-center gap-3">
                <label className="block mb-1 text-sm">موبایل</label>
                <Input
                  value={searchPhone || ""}
                  onChange={(e) => setSearchPhone(e.target.value)}
                  maxLength={5}
                />
              </div>
              <Button onClick={handleSearch} disabled={isLoading}>
                {isLoading ? "جستجو..." : "جستجو "}
              </Button>
            </div>
          

            <div className=" divide-grey-100 w-full ">
              <table className="w-full table-auto  ">
                <thead>
                  <tr className="border-b border-grey-200 text-sm   font-normal bg-grey-50">
                    <th className="px-3 py-2 text-right text-grey-600">
                      موبایل
                    </th>

                    <th className="px-3 py-2 text-right text-grey-600">نام</th>
                    <th className="px-3 py-2 text-right text-grey-600">شرکت</th>
                    <th className="px-3 py-2 text-right text-grey-600">
                      مجموع کاربران
                    </th>
                    <th className="px-3 py-2 text-right text-grey-600">
                      تاریخ ثبت نام
                    </th>

                    <th className="px-3 py-2 text-center text-grey-600">
                      عملیات
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user: any, index: number) => (
                    <tr
                      key={index}
                      className="border border-grey-100 hover:bg-grey-100 transition-colors"
                    >
                      <td className="px-3 py-2 text-sm">{user?.id}</td>
                      <td className="px-3 py-2 text-sm">{user?.phone}</td>
                      <td className="px-3 py-2">{user?.full_name}</td>
                      <td className="px-3 py-2">{user?.company_name}</td>
                      <td className="px-3 py-2">{user?.company_role}</td>

                      {/* تاریخ */}
                      <td className="px-3 py-2">
                        <time
                          dateTime={user.created_at}
                          className="text-grey-600"
                        >
                          {new Date(user.created_at).toLocaleDateString(
                            "fa-IR"
                          )}
                        </time>
                      </td>

                      <td className="px-3 py-2">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => {
                              handleProfileModal(user.code);
                            }}
                            className="inline-flex cursor-pointer items-center justify-center p-2 hover:bg-grey-100 rounded-lg transition-colors"
                            type="button"
                          >
                            پروفایل
                          </button>
                          <Link
                            className="inline-flex cursor-pointer items-center justify-center p-2 hover:bg-grey-100 rounded-lg transition-colors"
                            href={`/admin/users/${user.id}`}
                          >
                            چت‌بات‌ها
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <ProfileModal
          open={showProfileModal}
          data={profileData}
          onClose={() => {
            setShowProfileModal(false);
            setProfileData(null);
          }}
        />
        <ConfirmModal
          isOpen={confirmModal.isOpen}
          onClose={closeConfirmModal}
          onConfirm={handleConfirmDelete}
          title=" کاربر"
          message="آیا از غیر فعال کردن این کاربر اطمینان دارید؟ این عمل قابل بازگشت نیست."
          confirmText="بله"
          cancelText="خیر"
          type="danger"
        />
      </main>
    </div>
  );
}
