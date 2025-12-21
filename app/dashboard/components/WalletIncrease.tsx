import React, { useState } from "react";
import PageLoader from "@/components/pageLoader";
import axiosInstance from "@/lib/axiosInstance";
import { Modal } from "../widgets/modal";
import { toast } from "sonner";
import { Button } from "@/components/button";
import { useRouter } from "next/navigation";
import { API_ROUTES } from "@/constants/apiRoutes";
import { MessageCircle } from "lucide-react";
import { TRANSACTION_TYPE } from "@/constants/plans";

interface WalletIncreaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WalletIncreaseModal: React.FC<WalletIncreaseModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [credit, setCredit] = useState<string>("");
  const [invoice, setInvoice] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleFactor = async () => {
    if (!credit || Number(credit) < 1000) {
      toast.error("لطفاً مبلغ معتبر وارد کنید (حداقل ۱۰۰۰۰ ريال)");
      return;
    }

    try {
      setIsLoading(true);
      const invoicePayload = {
        // purpose: TRANSACTION_TYPE.INCREASE_WALLET,
        purpose: "wallet_charge",
        amount_irr: credit,
      };

      const res = await axiosInstance.post(
        API_ROUTES.PAYMENT.FACTOR,
        invoicePayload
      );
      const data = res.data;
      if (!data.success) {
        toast.error(data.message || "خطا در ایجاد فاکتور");
        return;
      }

      setInvoice(data.data);
      toast.success("فاکتور با موفقیت ایجاد شد ✅");
    } catch (err: any) {
      toast.error(err.message || "خطا در اتصال به سرور");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProceedToPayment = async () => {
    if (!invoice) {
      toast.error("ابتدا فاکتور را ایجاد کنید");
      return;
    }

    try {
      setIsLoading(true);
      const res = await axiosInstance.post(API_ROUTES.PAYMENT.INITIATE, {
        purpose: "wallet_charge",

        // purpose: TRANSACTION_TYPE.INCREASE_BALANCE,
        amount_irr: credit,
      });

      const data = res.data;
      if (!data.success) {
        toast.error(data.message || "خطا در اتصال به درگاه");
        return;
      }

      const invoiceId = data.data.invoice_id;
      localStorage.setItem("lastInvoiceId", invoiceId);
      localStorage.setItem(`invoice-${invoiceId}`, JSON.stringify(data.data));

      toast.success("در حال انتقال به درگاه پرداخت...");
      router.push(data.data.gateway_url);
    } catch (err: any) {
      toast.error(err.message || "خطا در برقراری ارتباط با درگاه");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="افزایش موجودی کیف پول"
      size="xs"
    >
      {isLoading && <PageLoader />}

      <div className="space-y-4">
        {!invoice && (
          <>
            {/* مبلغ */}
            <div className="flex items-center gap-4">
              <label
                htmlFor="message-count"
                className="block text-grey-900 mb-2"
              >
                مبلغ:
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
                    String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))
                  );
                  // فقط عدد
                  val = val.replace(/\D/g, "");
                  setCredit(val);
                }}
                className="w-full px-4 py-2.5 rounded-xl border border-grey-200 focus:border-[#65bcb6] focus:outline-none transition-colors text-right"
                placeholder="مثال: ۱۰۰٬۰۰۰"
              />
              <span>ريال</span>
            </div>

            {/* دکمه‌های سریع */}
            <div className="flex flex-wrap gap-3 justify-center">
              {["100000", "200000", "500000", "1000000"].map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setCredit(amount)}
                  className={`px-4 py-1 rounded-full border transition-colors text-sm ${
                    credit === amount
                      ? "bg-[#65bcb6] text-white border-[#65bcb6]"
                      : "bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary border-transparent"
                  }`}
                >
                  {Number(amount).toLocaleString("fa-IR")}
                </button>
              ))}
            </div>
          </>
        )}
        {/* نمایش فاکتور */}
        {invoice && (
          <div className="p-4 rounded-xl border-2 border-[#65bcb6] bg-gradient-to-br from-[#65bcb6]/5 to-[#65bcb6]/10">
            <div className="flex items-center gap-2 mb-3">
              <MessageCircle
                style={{ width: "18px", height: "18px", color: "#65bcb6" }}
              />
              <span className="text-grey-900">فاکتور </span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-grey-600">مبلغ پایه</span>
                <span>
                  {(invoice?.base_amount_irr || 0).toLocaleString("fa-IR")}{" "}
                  ريال
                </span>
              </div>

              {invoice.discountPercent > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>تخفیف {invoice.discountPercent}%</span>
                  <span>-</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-grey-600">
                  مالیات {invoice.tax_percentage.toLocaleString("fa-IR")}٪
                </span>
                <span>
                  {(invoice?.tax_amount_irr || 0).toLocaleString("fa-IR")} ريال
                </span>
              </div>

              <div className="flex justify-between pt-2 border-t border-[#65bcb6]">
                <span className="font-semibold">قابل پرداخت</span>
                <span className="text-[#65bcb6] font-bold">
                  {invoice?.total_amount_irr.toLocaleString("fa-IR")} ريال
                </span>
              </div>
            </div>
          </div>
        )}

        {/* دکمه‌ها */}
        <div className="flex items-center gap-2 pt-2">
          {!invoice ? (
            <Button
              onClick={handleFactor}
              className="flex-1 bg-[#65bcb6] text-white py-2.5 rounded-xl"
            >
              صدور فاکتور
            </Button>
          ) : (
            <Button
              onClick={handleProceedToPayment}
              className="flex-1 bg-[#65bcb6] text-white py-2.5 rounded-xl"
            >
              پرداخت
            </Button>
          )}

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
