"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { CodeModal } from "./CodeModal";
import { useRouter } from "next/navigation";
import { API_ROUTES } from "@/constants/apiRoutes";
import { ConfirmModal } from "@/components/ConfirmModal";
import { CodeItem } from "@/types/common";
import PageLoader from "@/components/pageLoader";
import axiosInstance from "@/lib/axiosInstance";
import TableSort from "./tableSort";

export default function Discount() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [codeId, setCodeId] = useState("");
  const [modalMode, setModalMode] = useState("new");
  const [codes, setCodes] = useState<CodeItem[]>([]); // Assume this state is managed here
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

  const handleEditClick = (code: CodeItem) => {
    // setModalMode("edit");
    // handleCode(code.code);
    console.log("Editing:", code.code);
  };

  const handleViewClick = (code: CodeItem) => {
    // setModalMode("view");
    // handleCode(code.code);
    console.log("Viewing:", code.code);
  };

  const handleDeleteClick = (id: number) => {
    // openConfirmModal(id);
    console.log("Deleting ID:", id);
  };

  return (
    <div className="lg:h-screen w-full overflow-hidden">
      <header className="flex items-center justify-between bg-bg-surface border-b border-border-soft px-6 lg:px-8 py-6">
        <div className="text-right">
          <h1 className="text-grey-900 mb-0 mr-1 lg:mr-10 text-2xl lg:text-3xl font-bold">
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
          <span className="text-white text-sm lg:text-base">کد تخفیف جدید</span>
          <div className="w-4 h-4 mr-2 text-white">
            <Plus />
          </div>
        </button>
      </header>
      <main className="flex-1 p-6 overflow-y-auto h-screen">
        {(isLoading || loading) && <PageLoader />}
        <div className="max-w-7xl mx-auto pb-8">
          {/* Page Header */}

          {/* Chatbots List */}
          <div className="bg-white rounded-3xl border border-grey-100 shadow-card w-full ">
            <div className="p-6 border-b border-grey-100">
              <h2 className="font-bold text-grey-900 text-xl">
                کدهای تعریف شده
              </h2>
            </div>

            <TableSort
              codes={codes}
              onEdit={handleEditClick}
              onView={handleViewClick}
              onDelete={handleDeleteClick}
            />
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
