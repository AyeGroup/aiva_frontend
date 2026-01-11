"use client";
import React, { useEffect, useState } from "react";
import PageLoader from "@/components/pageLoader";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "sonner";
import { Delete } from "@/public/icons/AppIcons";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { API_ROUTES } from "@/constants/apiRoutes";
import { ConfirmModal } from "@/components/ConfirmModal";
import { ProfileModal } from "./ProfileModal";
import { Check, Edit, Eye, Plus, X } from "lucide-react";

export default function AdminUsers() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [users, setUsers] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    id: string | null;
  }>({
    isOpen: false,
    id: null,
  });

  useEffect(() => {
    if (!user?.token) {
      localStorage.setItem("returnUrla", window.location.href);
      router.push("/auth/login");
      return;
    }
    const fetchUsers = async () => {
      await loadUsers();
    };

    fetchUsers();
  }, [user?.token]);

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

  const handleCode = async (id: string) => {
    setShowCodeModal(true);
    setProfileData(id);
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.delete(
        API_ROUTES.ADMIN.DISCOUNT_DELETE(id)
      );

      if (res.data.success) {
        await loadUsers();
        toast.success("کد تخفیف با موفقیت غیرفعال شد");
      } else {
        toast.error("خطا در حذف کد تخفیف");
        console.warn("⚠️ Unexpected response while removing item:", res.data);
      }
    } catch (error: any) {
      toast.error("خطا در حذف کد تخفیف");
      console.error("Failed to remove item:", error);
    } finally {
      setIsLoading(false);
      setConfirmModal({ isOpen: false, id: null });
    }
  };

  const openConfirmModal = (id: string) => {
    setConfirmModal({ isOpen: true, id });
  };

  const closeConfirmModal = () => {
    setConfirmModal({ isOpen: false, id: null });
  };

  const handleConfirmDelete = () => {
    if (confirmModal.id) {
      handleDelete(confirmModal.id);
    }
  };

  return (
    <div
      className="lg:h-screen w-full overflow-hidden"
      style={{ background: "#FFFFFF" }}
    >
      <main className="flex-1 p-6 overflow-y-auto h-screen">
        {(isLoading || loading) && <PageLoader />}
        <div className="max-w-7xl mx-auto pb-8">
          {/* Page Header */}
          <header className="flex items-center justify-between mb-8">
            <div className="text-right">
              <h1 className="text-grey-900 mb-0 mr-2 lg:mr-10 text-2xl lg:text-3xl font-bold">
                مدیریت کاربران
              </h1>
            </div>

            {/* <button
              className="flex bg-primary rounded-sm white px-2 lg:px-4 py-2 lg:py-3 cursor-pointer"
              onClick={() => {
                setProfileData("");
                setShowCodeModal(true);
              }}
            >
              <span className="text-white text-sm lg:text-base">
                کاربر جدید
              </span>
              <div className="w-4 h-4 mr-2 text-white">
                <Plus />
              </div>
            </button> */}
          </header>

          {/* Chatbots List */}
          <div className="bg-white rounded-3xl border border-grey-100 shadow-card w-full ">
            <div className="p-6 border-b border-grey-100">
              <h2 className="font-bold text-grey-900 text-xl">کاربران</h2>
            </div>

            <div className=" divide-grey-100 w-full ">
              <table className="w-full table-auto table-cell ">
                <thead>
                  <tr className="border-b border-grey-200 bg-grey-50">
                    <th className="px-3 py-2 text-right text-grey-600">
                      موبایل
                    </th>
                    <th className="px-3 py-2 text-right text-grey-600">
                      ایمیل
                    </th>
                    <th className="px-3 py-2 text-right text-grey-600">نام</th>
                    <th className="px-3 py-2 text-right text-grey-600">شرکت</th>
                    <th className="px-3 py-2 text-right text-grey-600">سمت</th>
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
                      <td className="px-3 py-2 text-sm">{user?.email}</td>
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
                        {user.id && (
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => {
                                handleCode(user.code);
                              }}
                              className="inline-flex cursor-pointer items-center justify-center p-2 hover:bg-grey-100 rounded-lg transition-colors"
                              type="button"
                            >
                              <Eye
                                size={20}
                                className="text-primary cursor-pointer"
                              />
                            </button>
                          </div>
                        )}
                        {user?.is_active == true && (
                          <button
                            onClick={() => openConfirmModal(user.id)}
                            className="inline-flex cursor-pointer items-center justify-center p-2 hover:bg-grey-100 rounded-lg transition-colors"
                            type="button"
                          >
                            <div className="w-5 text-red-400 cursor-pointer">
                              <Delete />
                            </div>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <ProfileModal
          open={showCodeModal}
          data={profileData}
          onClose={() => {
            setShowCodeModal(false);
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
