import React, { useState } from "react";
import PageLoader from "@/components/pageLoader";
import axiosInstance from "@/lib/axiosInstance";
import { Modal } from "@/app/dashboard/widgets/modal";
import { toast } from "sonner";
import { Button } from "@/components/button";
import { API_ROUTES } from "@/constants/apiRoutes";

interface WalletIncreaseModalProps {
  isOpen: boolean;
  id: string;
  onClose: () => void;
  onSuccess: () => void;
}

export const WalletIncreaseAdmin: React.FC<WalletIncreaseModalProps> = ({
  isOpen,
  id,
  onClose,
  onSuccess,
}) => {
  const [credit, setCredit] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFactor = async () => {
    if (!credit || Number(credit) < 1000) {
      toast.error("لطفاً مبلغ معتبر وارد کنید (حداقل ۱۰۰۰۰۰ تومان)");
      return;
    }
    const creditNumber = Number(credit);
    if (isNaN(creditNumber) || creditNumber <= 0) {
      throw new Error("مبلغ وارد شده معتبر نیست");
    }
    try {
      setIsLoading(true);

      const res = await axiosInstance.put(
        API_ROUTES.ADMIN.USER_SAVE(String(id)),
        { wallet_balance: credit },
      );
      const data = res.data;
      if (!data.success) {
        toast.error(data.message || "خطا در ایجاد فاکتور");
        return;
      }

      toast.success("اطلاعات ثبت شد");
      onClose();
      onSuccess();
    } catch (err: any) {
      toast.error(err.message || "خطا در اتصال به سرور");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title=" موجودی کیف پول"
      className="w-80"
    >
      {isLoading && <PageLoader />}

      <div className="space-y-4">
        <div>
          <div className="flex text-grey-900 gap-2">
            کد کاربر
            <span className="input-required">{id}</span>
          </div>
          <div className="flex items-center gap-4">
            <label htmlFor="message-count" className="block text-grey-900 mb-2">
              مبلغ موجودی
              <span className="input-required">*</span>
            </label>
            <input
              id="message-count"
              type="text"
              inputMode="numeric"
              value={
                credit
                  ? Number(credit.replace(/,/g, "")).toLocaleString("fa-IR")
                  : ""
              }
              onChange={(e) => {
                let val = e.target.value;
                // تبدیل فارسی به انگلیسی
                val = val.replace(/[۰-۹]/g, (d) =>
                  String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)),
                );
                // فقط عدد
                val = val.replace(/\D/g, "");
                setCredit(val);
              }}
              className=" px-4 py-2.5 rounded-xl border border-grey-200 focus:border-[#65bcb6] focus:outline-none transition-colors text-right"
              placeholder="مثال: ۱۰۰٬۰۰۰"
            />
            <span>تومان</span>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <Button
            onClick={handleFactor}
            className="flex-1 bg-[#65bcb6] text-white py-2.5 rounded-xl"
          >
            ثبت
          </Button>

          <Button
            variant="secondary"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl"
          >
            انصراف
          </Button>
        </div>
      </div>
    </Modal>
  );
};
