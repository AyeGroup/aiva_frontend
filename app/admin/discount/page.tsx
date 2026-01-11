"use client";
import React, { useEffect, useState } from "react";
import PageLoader from "@/components/pageLoader";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "sonner";
import { Delete } from "@/public/icons/AppIcons";
import { useAuth } from "@/providers/AuthProvider";
import { CodeModal } from "./CodeModal";
import { useRouter } from "next/navigation";
import { API_ROUTES } from "@/constants/apiRoutes";
import { ConfirmModal } from "@/components/ConfirmModal";
import { Check, Edit, Eye, Plus, X } from "lucide-react";

export default function Discount() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [codes, setCodes] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [codeId, setCodeId] = useState("");
  const [modalMode, setModalMode] = useState("new");
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
    const fetchCodes = async () => {
      await loadCodes();
    };

    fetchCodes();
  }, [user?.token]);

  const loadCodes = async () => {
    setIsLoading(true);
    setCodes([]);
    try {
      const response = await axiosInstance.get(API_ROUTES.ADMIN.DISCOUNTS);
      console.log("codes: ", response.data.data);
      setCodes(response?.data?.data);
    } catch (apiError: any) {
      console.warn("API fetch failed, using local data:", apiError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCode = async (id: string) => {
    setShowCodeModal(true);
    setCodeId(id);
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.delete(
        API_ROUTES.ADMIN.DISCOUNT_DELETE(id)
      );

      if (res.data.success) {
        await loadCodes();
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
                مدیریت کد تخفیف
              </h1>
            </div>

            <button
              className="flex bg-primary rounded-sm white px-2 lg:px-4 py-2 lg:py-3 cursor-pointer"
              onClick={() => {
                setModalMode("new");
                setCodeId("");
                setShowCodeModal(true);
              }}
            >
              <span className="text-white text-sm lg:text-base">
                کد تخفیف جدید
              </span>
              <div className="w-4 h-4 mr-2 text-white">
                <Plus />
              </div>
            </button>
          </header>

          {/* Chatbots List */}
          <div className="bg-white rounded-3xl border border-grey-100 shadow-card w-full ">
            <div className="p-6 border-b border-grey-100">
              <h2 className="font-bold text-grey-900 text-xl">
                کدهای تعریف شده
              </h2>
            </div>

            <div className=" divide-grey-100 w-full ">
              <table className="w-full table-auto table-cell ">
                <thead>
                  <tr className="border-b border-grey-200 bg-grey-50">
                    <th className="px-3 py-2 text-right text-grey-600">کد</th>
                    <th className="px-3 py-2 text-right text-grey-600">
                      توضیحات
                    </th>
                    <th className="px-3 py-2 text-right text-grey-600">نوع</th>
                    <th className="px-3 py-2 text-right text-grey-600">
                      مقدار
                    </th>
                    <th className="px-3 py-2 text-right text-grey-600">فعال</th>
                    <th className="px-3 py-2 text-right text-grey-600">
                      تاریخ ایجاد
                    </th>
                    <th className="px-3 py-2 text-right text-grey-600">
                      تاریخ اعتبار
                    </th>
                    <th className="px-3 py-2 text-center text-grey-600">
                      عملیات
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {codes.map((code: any, index: number) => (
                    <tr
                      key={index}
                      className="border border-grey-100 hover:bg-grey-100 transition-colors"
                    >
                      <td className="px-3 py-2 ">
                        <span className="rounded-full bg-gray-100 py-1 px-3">
                          {code?.code}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-sm">{code?.description}</td>
                      <td className="px-3 py-2">
                        {code?.discount_type == "percentage" ? "درصد" : "مقدار"}
                      </td>
                      <td className="px-3 py-2">{code?.discount_value}</td>
                      <td className="px-3 py-2 ">
                        {code?.is_active == true ? (
                          <Check size={20} className="text-primary" />
                        ) : (
                          <X size={20} className="text-red-400" />
                        )}
                      </td>

                      {/* تاریخ */}
                      <td className="px-3 py-2">
                        <time
                          dateTime={code.created_at}
                          className="text-grey-600"
                        >
                          {new Date(code.created_at).toLocaleDateString(
                            "fa-IR"
                          )}
                        </time>
                      </td>
                      <td className="px-3 py-2">
                        <time
                          dateTime={code.valid_until}
                          className="text-grey-600"
                        >
                          {new Date(code.valid_until).toLocaleDateString(
                            "fa-IR"
                          )}
                        </time>
                      </td>

                      <td className="px-3 py-2">
                        {code.id && (
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => {
                                setModalMode(code?.is_active ? "edit" : "view");
                                handleCode(code.code);
                              }}
                              className="inline-flex cursor-pointer items-center justify-center p-2 hover:bg-grey-100 rounded-lg transition-colors"
                              type="button"
                            >
                              {code?.is_active == true ? (
                                <Edit
                                  size={20}
                                  className="text-primary cursor-pointer"
                                />
                              ) : (
                                <Eye
                                  size={20}
                                  className="text-primary cursor-pointer"
                                />
                              )}
                            </button>
                            {code?.is_active == true && (
                              <button
                                onClick={() => openConfirmModal(code.id)}
                                className="inline-flex cursor-pointer items-center justify-center p-2 hover:bg-grey-100 rounded-lg transition-colors"
                                type="button"
                              >
                                <div className="w-5 text-red-400 cursor-pointer">
                                  <Delete />
                                </div>
                              </button>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <CodeModal
          open={showCodeModal}
          codeId={codeId}
          onSaved={loadCodes}
          onClose={() => setShowCodeModal(false)}
          mode={modalMode}
        />
        <ConfirmModal
          isOpen={confirmModal.isOpen}
          onClose={closeConfirmModal}
          onConfirm={handleConfirmDelete}
          title=" کد تخفیف"
          message="آیا از غیر فعال کردن این کد تخفیف اطمینان دارید؟ این عمل قابل بازگشت نیست."
          confirmText="بله"
          cancelText="خیر"
          type="danger"
        />
      </main>
    </div>
  );
}
