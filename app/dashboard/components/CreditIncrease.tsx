import React, { useEffect, useState } from "react";
import PageLoader from "@/components/pageLoader";
import axiosInstance from "@/lib/axiosInstance";
import { Card } from "@/components/card";
import { Modal } from "../widgets/modal";
import { toast } from "sonner";
import { Button } from "@/components/button";
import { useRouter } from "next/navigation";
import { API_ROUTES } from "@/constants/apiRoutes";
import { PaymentMethod } from "@/types/common";
import { PAYMENT_PURPOSE } from "@/constants/plans";
import { CreditCard, MessageCircle, Wallet } from "lucide-react";

interface CreditIncreaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedChatbot: any;
  onSuccessWalletPayment?: () => void;
}

export const CreditIncreaseModal: React.FC<CreditIncreaseModalProps> = ({
  isOpen,
  onClose,
  selectedChatbot,
  onSuccessWalletPayment,
}) => {
  const [credit, setCredit] = useState<string>("");
  const [invoice, setInvoice] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("online");
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [isLoadingWallet, setIsLoadingWallet] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        setIsLoadingWallet(true);
        const res = await axiosInstance.get(API_ROUTES.FINANCIAL.WALLET);
        const data = res?.data;

        if (data?.success) {
          // موجودی به تومان است، پس به ریال تبدیل می‌کنیم
          setWalletBalance((data?.data?.wallet_balance || 0) * 10);
        }
      } catch (err: any) {
        console.error("خطا در دریافت موجودی کیف پول:", err);
      } finally {
        setIsLoadingWallet(false);
      }
    };

    fetchWalletBalance();
  }, []);

  const handleFactor = async () => {
    if (!credit || Number(credit) < 1000) {
      toast.error("لطفاً مبلغ معتبر وارد کنید (حداقل ۱۰۰۰ تومان)");
      return;
    }
    console.log("chat", selectedChatbot?.chatbot_uuid);
    const creditNumber = Number(credit);
    if (isNaN(creditNumber) || creditNumber <= 0) {
      throw new Error("مبلغ وارد شده معتبر نیست");
    }
    try {
      setIsLoading(true);
      const invoicePayload = {
        purpose: PAYMENT_PURPOSE.BALANCE_INCREASE,
        chatbot_uuid: selectedChatbot?.chatbot_uuid,
        amount_irr: Math.floor(creditNumber * 10),
        // amount_irr: credit,
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
    console.log("chat", selectedChatbot);
    const creditNumber = Number(credit);
    if (isNaN(creditNumber) || creditNumber <= 0) {
      throw new Error("مبلغ وارد شده معتبر نیست");
    }
    try {
      setIsLoading(true);
      const res = await axiosInstance.post(API_ROUTES.PAYMENT.INITIATE, {
        purpose: PAYMENT_PURPOSE.BALANCE_INCREASE,
        chatbot_uuid: selectedChatbot?.chatbot_uuid,
        amount_irr: Math.floor(creditNumber * 10),
        use_wallet: paymentMethod === "wallet",
      });

      const data = res.data;
      console.log("initiate data:", data);
      if (!data.success) {
        toast.error(data.message || "خطا در پرداخت");
        return;
      }
      const invoiceId = data.data.invoice_id;
      localStorage.setItem("lastInvoiceId", invoiceId);
      localStorage.setItem(`invoice-${invoiceId}`, JSON.stringify(data.data));
      console.log("paymentMethod  :", paymentMethod === "wallet");

      if (paymentMethod === "wallet") {
        toast.success(data.message || "پرداخت با موفقیت از کیف پول انجام شد");
        onSuccessWalletPayment?.(); 
        onClose();
        router.push("/dashboard?tab=billing");
      } else {
        toast.success("فاکتور با موفقیت ایجاد شد. در حال انتقال به درگاه...");
        router.push(data.data.gateway_url);
      }
    } catch (err: any) {
      const serverMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "خطا در پرداخت";
      toast.error(serverMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const finalAmount = invoice?.total_amount_irr || 0;
  const canPayWithWallet = walletBalance >= finalAmount;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`افزایش اعتبار - ${selectedChatbot?.chatbot_name}`}
      size="xs"
    >
      {isLoading && <PageLoader />}

      <div className="space-y-4 ">
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
              <span>تومان</span>
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
          <div>
            <div className="p-4 rounded-xl border-2 border-[#65bcb6] bg-linear-to-br from-[#65bcb6]/5 to-[#65bcb6]/10">
              <div className="flex items-center gap-2 mb-3">
                <MessageCircle
                  style={{ width: "18px", height: "18px", color: "#65bcb6" }}
                />
                <span className="text-grey-900">فاکتور صادر شد</span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-grey-600">مبلغ پایه</span>
                  {/* <span>{0} ريال</span> */}
                  <span>
                    {/* {(invoice?.base_amount_irr || 0).toLocaleString("fa-IR")}{" "}
                  ريال */}
                    {((invoice?.base_amount_irr || 0) / 10).toLocaleString(
                      "fa-IR"
                    )}{" "}
                    تومان
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
                    {/* {(invoice?.tax_amount_irr || 0).toLocaleString("fa-IR")} ريال */}
                    {((invoice?.tax_amount_irr || 0) / 10).toLocaleString(
                      "fa-IR"
                    )}{" "}
                    تومان
                  </span>
                </div>

                <div className="flex justify-between pt-2 border-t border-[#65bcb6]">
                  <span className="font-semibold">قابل پرداخت</span>
                  <span className="text-[#65bcb6] font-bold">
                    {/* {invoice?.total_amount_irr.toLocaleString("fa-IR")} ريال */}
                    {((invoice?.total_amount_irr || 0) / 10).toLocaleString(
                      "fa-IR"
                    )}{" "}
                    تومان
                  </span>
                </div>
              </div>
            </div>
            <div className=" mt-4">
              <Card className="p-6">
                <h2 className="text-grey-900 mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" /> روش پرداخت
                </h2>
                <div className="space-y-3">
                  {/* کیف پول */}
                  <div
                    onClick={() =>
                      canPayWithWallet && setPaymentMethod("wallet")
                    }
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      paymentMethod === "wallet"
                        ? "border-[#65BCB6] bg-[rgba(101,188,182,0.05)]"
                        : "border-grey-200 hover:border-grey-300"
                    } ${
                      !canPayWithWallet ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            paymentMethod === "wallet"
                              ? "border-[#65BCB6] bg-[#65BCB6]"
                              : "border-grey-300"
                          }`}
                        >
                          {paymentMethod === "wallet" && (
                            <div className="w-2.5 h-2.5 rounded-full bg-white" />
                          )}
                        </div>
                        <Wallet className="w-5 h-5 text-grey-600" />
                        <div>
                          <p className="text-grey-900 font-medium">کیف پول</p>
                          <p className="text-grey-500 text-sm">
                            موجودی:{" "}
                            {isLoadingWallet
                              ? "..."
                              : (walletBalance / 10).toLocaleString(
                                  "fa-IR"
                                )}{" "}
                            تومان
                          </p>
                        </div>
                      </div>
                      {!canPayWithWallet && (
                        <span className="text-red-500 text-sm">
                          موجودی ناکافی
                        </span>
                      )}
                    </div>
                  </div>

                  {/* پرداخت آنلاین */}
                  <div
                    onClick={() => setPaymentMethod("online")}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      paymentMethod === "online"
                        ? "border-[#65BCB6] bg-[rgba(101,188,182,0.05)]"
                        : "border-grey-200 hover:border-grey-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          paymentMethod === "online"
                            ? "border-[#65BCB6] bg-[#65BCB6]"
                            : "border-grey-300"
                        }`}
                      >
                        {paymentMethod === "online" && (
                          <div className="w-2.5 h-2.5 rounded-full bg-white" />
                        )}
                      </div>
                      <CreditCard className="w-5 h-5 text-grey-600" />
                      <div>
                        <p className="text-grey-900 font-medium">
                          پرداخت آنلاین
                        </p>
                        <p className="text-grey-500 text-sm">
                          پرداخت با کارت بانکی
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* دکمه‌ها */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {!invoice ? (
            <Button
              onClick={handleFactor}
              className="  bg-[#65bcb6] text-white py-2.5 rounded-xl"
            >
              صدور فاکتور
            </Button>
          ) : (
            <Button
              onClick={handleProceedToPayment}
              className="  bg-[#65bcb6] text-white py-2.5 rounded-xl"
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
