"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { DiscountModal } from "./DiscountModal";
import { useRouter } from "next/navigation";
import { API_ROUTES } from "@/constants/apiRoutes";
import { ConfirmModal } from "@/components/ConfirmModal";
import { CodeItem } from "@/types/common";
import PageLoader from "@/components/pageLoader";
import axiosInstance from "@/lib/axiosInstance";
import TableDiscount from "./tableDiscount";
import { ToggleSmall } from "@/components/toggleSmall";
import { convertNumbersToPersian } from "@/utils/common";
// import { convertNumbersToPersian } from "@/utils/number";

export default function Discount() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [codeId, setCodeId] = useState("");
  const [modalMode, setModalMode] = useState<
    "new" | "edit" | "view" | undefined
  >("new");

  const [activeOnly, setActiveOnly] = useState(true);
  const [codes, setCodes] = useState<CodeItem[]>([]);

  // ===== Pagination =====
  const [page, setPage] = useState(1);
  const [limit] = useState(100);
  const [total, setTotal] = useState(0);

  const skip = (page - 1) * limit;
  const totalPages = Math.ceil(total / limit);
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

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

    loadCodes();
  }, [user?.token, page, activeOnly]);

  const loadCodes = async () => {
    setIsLoading(true);
    setCodes([]);

    try {
      const response = await axiosInstance.get(API_ROUTES.ADMIN.DISCOUNTS, {
        params: {
          skip,
          limit,
          active_only: activeOnly,
        },
      });

      setCodes(response?.data?.data || []);
      setTotal(response?.data?.total || 0);
    } catch (error: any) {
      toast.error("خطا در دریافت لیست کدهای تخفیف");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // ===== Pagination handlers =====
  const handleNextPage = () => {
    if (hasNext) setPage((p) => p + 1);
  };

  const handlePrevPage = () => {
    if (hasPrev) setPage((p) => p - 1);
  };

  const handleSetPage = (p: number) => {
    if (p !== page) setPage(p);
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.delete(
        API_ROUTES.ADMIN.DISCOUNT_DELETE(id),
      );

      if (res.data.success) {
        await loadCodes();
        toast.success("کد تخفیف با موفقیت غیرفعال شد");
      } else {
        toast.error("خطا در حذف کد تخفیف");
      }
    } catch (error: any) {
      toast.error("خطا در حذف کد تخفیف");
    } finally {
      setIsLoading(false);
      setConfirmModal({ isOpen: false, id: null });
    }
  };

  const handleEditClick = (code: CodeItem) => {
    setModalMode("edit");
    setCodeId(code.code);
    setShowCodeModal(true);
  };

  const handleViewClick = (code: CodeItem) => {
    setModalMode("view");
    setCodeId(code.code);
    setShowCodeModal(true);
  };

  const handleDeleteClick = (id: number) => {
    setConfirmModal({ isOpen: true, id: String(id) });
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
        <div className="m-2">
          <ToggleSmall
            label="فقط فعال‌ها"
            checked={activeOnly}
            onChange={() => {
              setPage(1);
              setActiveOnly(!activeOnly);
            }}
          />
        </div>

        {(isLoading || loading) && <PageLoader />}

        <div className="mx-auto pb-8">
          <div className="bg-white rounded-xl border border-grey-100 shadow-card w-full">
            <TableDiscount
              codes={codes}
              onEdit={handleEditClick}
              onView={handleViewClick}
              onDelete={handleDeleteClick}
            />
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center mt-6 px-3 py-4 gap-6">
              <button
                onClick={handlePrevPage}
                disabled={!hasPrev || isLoading}
                className={`text-secondary text-sm flex items-center ${
                  !hasPrev ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <ChevronRight />
                قبلی
              </button>

              <div className="flex items-center gap-3">
                {Array.from({ length: totalPages }, (_, index) => {
                  const p = index + 1;
                  return (
                    <button
                      key={p}
                      onClick={() => handleSetPage(p)}
                      className={`px-3 py-1 text-sm rounded-full border ${
                        page === p ? "border-primary" : "border-transparent"
                      }`}
                    >
                      {convertNumbersToPersian(p)}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleNextPage}
                disabled={!hasNext || isLoading}
                className={`text-secondary text-sm flex items-center ${
                  !hasNext ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                بعدی
                <ChevronLeft />
              </button>
            </div>
          )}
        </div>

        <DiscountModal
          open={showCodeModal}
          codeId={codeId}
          onSaved={loadCodes}
          onClose={() => setShowCodeModal(false)}
          mode={modalMode}
        />

        <ConfirmModal
          isOpen={confirmModal.isOpen}
          onClose={() => setConfirmModal({ isOpen: false, id: null })}
          onConfirm={() => confirmModal.id && handleDelete(confirmModal.id)}
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
