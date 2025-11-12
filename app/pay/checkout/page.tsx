"use client";
import React, { useState, useEffect } from "react";
import PageLoader from "@/components/pageLoader";
import axiosInstance from "@/lib/axiosInstance";
import { Card } from "@/components/card";
import { toast } from "sonner";
import { Input } from "@/components/input";
import { useBot } from "@/providers/BotProvider";
import { Checkbox } from "@/components/checkbox";
import { useRouter } from "next/navigation";
import { API_ROUTES } from "@/constants/apiRoutes";
import { convertToEnglish, convertToPersian } from "@/utils/common";
import { ArrowRight, Tag, Receipt, CreditCard } from "lucide-react";
import {
  getFaNameByCode,
  getPlanIdByCode,
  PLAN_COLORS,
  SUBSCRIPTION_TYPES,
} from "@/constants/plans";

export default function Checkout() {
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [requestOfficialInvoice, setRequestOfficialInvoice] = useState(false);
  const [isPlanLoaded, setIsPlanLoaded] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [economicCode, setEconomicCode] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { currentBot } = useBot();

  useEffect(() => {
    const planData = localStorage.getItem("selectedPlan");
    console.log("planData", planData);

    if (planData) {
      const parsed = JSON.parse(planData);
      setSelectedPlan(parsed);
      console.log("checkout Plan:", parsed);
    } else {
      router.push("/dashboard?tab=billing");
    }

    setIsPlanLoaded(true);
  }, [router]);

  const basePrice = selectedPlan
    ? parseInt(
        convertToEnglish(
          selectedPlan.period === "yearly"
            ? selectedPlan.price_yearly_irr
            : selectedPlan.price_monthly_irr
        ).replace(/,/g, ""),
        10
      )
    : 0;
  console.log("basePrice", basePrice);

  const discountAmount = (basePrice * appliedDiscount) / 100;
  const priceAfterDiscount = basePrice - discountAmount;
  const taxRate = 10;
  const taxAmount = (priceAfterDiscount * taxRate) / 100;
  const totalPrice = priceAfterDiscount + taxAmount;

  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) return;
    toast.info("کد تخفیف نامعتبر است");
    return;
    try {
      setIsLoading(true);

      // ارسال درخواست با axios
      const res = await axiosInstance.post(API_ROUTES.PAYMENT.DISCOUNT, {
        code: discountCode,
      });

      // axios به‌صورت پیش‌فرض داده را در res.data قرار می‌دهد
      const data = res.data;

      // بررسی درصد تخفیف بازگشتی
      if (!data?.percent) {
        throw new Error(data?.message || "کد تخفیف نامعتبر است");
      }

      setAppliedDiscount(data.percent);
      toast.success(`کد تخفیف ${data.percent}% اعمال شد`);
    } catch (err: any) {
      const message =
        err.response?.data?.message || err.message || "خطا در بررسی کد تخفیف";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  // official_invoice: requestOfficialInvoice
  //   ? {
  //       company_name: companyName,
  //       economic_code: economicCode,
  //       national_id: nationalId,
  //     }
  //   : null,

  // purpose: TRANSACTION_TYPE.BUY_SUBSCRIPTION,

  // ---- ایجاد فاکتور و هدایت به درگاه ----
  const handleProceedToPayment = async () => {
    if (!selectedPlan) {
      toast.error("طرح انتخاب شده معتبر نیست");
      return;
    }

    if (requestOfficialInvoice) {
      if (!companyName.trim()) return toast.error("نام شرکت الزامی است");
      if (!economicCode.trim()) return toast.error("کد اقتصادی الزامی است");
      if (!nationalId.trim()) return toast.error("شناسه ملی الزامی است");
    }

    try {
      setIsLoading(true);

      const invoicePayload = {
        purpose: "subscription_purchase",
        // purpose:TRANSACTION_TYPE.BUY_SUBSCRIPTION,

        amount_irr: totalPrice,
        chatbot_uuid: currentBot?.uuid,
        subscription_plan: getPlanIdByCode(selectedPlan.plan),
        subscription_type: selectedPlan.period,
        description: selectedPlan.description,
      };
console.log("ALI",invoicePayload)
      const res = await axiosInstance.post(
        API_ROUTES.PAYMENT.INITIATE,
        invoicePayload
      );
      const data = res.data;

      if (!data.success) {
        toast.error(data.message || "خطا در ایجاد فاکتور");
        return;
      }

      // ✅ فاکتور را قبل از ریدایرکت در localStorage ذخیره کن
      const invoiceId = data.data.invoice_id;
      localStorage.setItem("lastInvoiceId", invoiceId);
      localStorage.setItem(`invoice-${invoiceId}`, JSON.stringify(data.data));

      toast.success("فاکتور با موفقیت ایجاد شد. در حال انتقال به درگاه...");
      router.push(data.data.gateway_url);
    } catch (err: any) {
      toast.error(err.message || "خطا در اتصال به درگاه پرداخت");
    } finally {
      setIsLoading(false);
    }
  };



  if (!isPlanLoaded) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen bg-grey-50 py-12 px-4" dir="rtl">
      <main className="max-w-4xl mx-auto">
        {/* {isPlanLoaded && <PageLoader />} */}
        {/* header */}
        <header className="mb-8">
          <button
            onClick={() => router.push("/dashboard?tab=billing")}
            className="flex items-center gap-2 text-grey-600 hover:text-grey-900 transition-colors mb-4"
          >
            <ArrowRight className="w-5 h-5" />
            <span>بازگشت به پلن‌ها</span>
          </button>
          <h1 className="text-grey-900 mb-2 text-right">تکمیل خرید</h1>
          <p className="text-grey-600 text-right">مشخصات سفارش و پرداخت</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ستون چپ */}
          <div className="lg:col-span-2 space-y-6">
            {/* جزئیات پلن */}
            <section>
              <Card className="p-6">
                <h2 className="text-grey-900 mb-4 flex items-center gap-2">
                  <Receipt className="w-5 h-5" /> جزئیات پلن انتخابی
                </h2>
                <div
                  className="p-6 rounded-2xl mb-4"
                  style={{
                    background: `linear-gradient(135deg, ${
                      PLAN_COLORS[selectedPlan.plan]
                    }10 0%, ${PLAN_COLORS[selectedPlan.plan]}05 100%)`,
                    borderRight: `4px solid ${PLAN_COLORS[selectedPlan.plan]}`,
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-grey-900 mb-1">
                        پلن {getFaNameByCode(selectedPlan.plan)}
                      </h3>
                      <p className="text-grey-600 text-sm mb-3">
                        {selectedPlan.description}
                      </p>
                    </div>
                    <div className="text-left">
                      <p className="text-grey-900">
                        {basePrice.toLocaleString("fa-IR")} تومان
                      </p>
                      <p className="text-grey-500 text-sm">
                        {SUBSCRIPTION_TYPES[selectedPlan.period]}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </section>

            {/* کد تخفیف */}
            <section>
              <Card className="p-6">
                <h2 className="text-grey-900 mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5" /> کد تخفیف
                </h2>
                <div className="flex gap-3">
                  <Input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="کد تخفیف خود را وارد کنید"
                    disabled={appliedDiscount > 0 || isLoading}
                    className="flex-1"
                  />
                  <button
                    onClick={handleApplyDiscount}
                    disabled={!discountCode || appliedDiscount > 0 || isLoading}
                    className="px-6 py-3 rounded-xl border-2 border-[#65BCB6] text-[#65BCB6] bg-white hover:bg-[rgba(101,188,182,0.08)] disabled:opacity-50 transition-all duration-300"
                    type="button"
                  >
                    {isLoading
                      ? "..."
                      : appliedDiscount > 0
                      ? "✓ اعمال شد"
                      : "اعمال کد"}
                  </button>
                </div>
              </Card>
            </section>
          </div>

          {/* ستون راست */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-6">
              <h2 className="text-grey-900 mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5" /> خلاصه فاکتور
              </h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-grey-200">
                <div className="flex justify-between items-center">
                  <span className="text-grey-600">مبلغ پایه</span>
                  <span>{basePrice.toLocaleString("fa-IR")} تومان</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between items-center text-green-600">
                    <span>تخفیف ({appliedDiscount}%)</span>
                    <span>-{discountAmount.toLocaleString("fa-IR")} تومان</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span>مالیات ({convertToPersian(taxRate)}%)</span>
                  <span>{taxAmount.toLocaleString("fa-IR")} تومان</span>
                </div>
              </div>

              {/* درخواست فاکتور رسمی */}
              <div className="mb-6 pb-6 border-b border-grey-200">
                <Checkbox
                  id="official-invoice"
                  label="درخواست صدور فاکتور رسمی"
                  checked={requestOfficialInvoice}
                  onChange={setRequestOfficialInvoice}
                />

                {requestOfficialInvoice && (
                  <div className="mt-4 space-y-3 p-4 rounded-xl bg-blue-50 border border-blue-200">
                    <Input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="نام شرکت"
                      label="نام شرکت"
                    />
                    <Input
                      type="text"
                      value={economicCode}
                      onChange={(e) => setEconomicCode(e.target.value)}
                      placeholder="کد اقتصادی"
                    />
                    <Input
                      type="text"
                      value={nationalId}
                      onChange={(e) => setNationalId(e.target.value)}
                      placeholder="شناسه ملی"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mb-6 p-4 rounded-xl bg-gradient-to-br from-grey-50 to-white border-2 border-grey-200">
                <span>مبلغ قابل پرداخت</span>
                <span className="text-xl font-bold text-[#65BCB6]">
                  {/* {totalPrice} تومان */}
                  {totalPrice.toLocaleString("fa-IR")} تومان
                </span>
              </div>

              <button
                onClick={handleProceedToPayment}
                disabled={isLoading || !selectedPlan}
                className="w-full py-4 rounded-2xl bg-gradient-to-br from-[#65BCB6] to-[#5AA8A2] text-white hover:from-[#5AA8A2] hover:to-[#4E9690] transition-all duration-300 shadow-lg"
              >
                {isLoading ? "در حال پردازش..." : "پرداخت امن"}
              </button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
