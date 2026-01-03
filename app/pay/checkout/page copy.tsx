"use client";
import React, { useState, useEffect } from "react";
import PageLoader from "@/components/pageLoader";
import axiosInstance from "@/lib/axiosInstance";
import { Card } from "@/components/card";
import { toast } from "sonner";
import { Input } from "@/components/input";
import { Checkbox } from "@/components/checkbox";
import { useRouter } from "next/navigation";
import { API_ROUTES } from "@/constants/apiRoutes";
import { convertToPersian } from "@/utils/common";
import { ArrowRight, Tag, Receipt, CreditCard } from "lucide-react";
import {
  getFaNameByCode,
  getPlanIdByCode,
  PAYMENT_PURPOSE,
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
  const [nationalId, setNationalId] = useState("");
  const [discountMessage, setDiscountMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [invoice, setInvoice] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPlanAndInvoice = async () => {
      const planData = localStorage.getItem("selectedPlan");
      if (!planData) {
        router.push("/dashboard?tab=billing");
        return;
      }

      const parsed = JSON.parse(planData);
      setSelectedPlan(parsed);
      // console.log("parsed", parsed);
      // discount_code:"dis101",
      // use_wallet:"false",
      try {
        setIsLoading(true);
        const invoicePayload = {
          purpose: PAYMENT_PURPOSE.SUBSCRIPTION_PURCHASE,
          subscription_type: parsed.periods,
          subscription_plan: getPlanIdByCode(parsed.plan),

          amount_irr:
            parsed.periods === "monthly"
              ? parsed.price_monthly_irr
              : parsed.price_yearly_irr,
          chatbot_uuid: parsed?.billingBot?.uuid,
        };

        const res = await axiosInstance.post(
          API_ROUTES.PAYMENT.FACTOR,
          invoicePayload
        );
        const data = res?.data;
        if (!data.success) {
          toast.error(data.message || "خطا در ایجاد فاکتور");
          return;
        }

        // فاکتور را در state ذخیره کنید
        setInvoice(data.data);
      } catch (err: any) {
        const serverMessage = err?.response?.data?.message;
        // console.log("a", serverMessage);
        if (serverMessage == "Downgrading subscription is not allowed") {
          toast.error("تغییر اشتراک به سطح پایین‌تر مجاز نیست.");
          const returnUrl = localStorage.getItem("returnUrl");
          if (returnUrl) {
            localStorage.removeItem("returnUrl");
            router.push(returnUrl);
          }
          return;
        } else toast.error(serverMessage || "خطا در ایجاد فاکتور");
      } finally {
        setIsLoading(false);
        setIsPlanLoaded(true);
      }
    };

    fetchPlanAndInvoice();
  }, [router]);

 
  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) {
      toast.error("کد تخفیف را وارد کنید");
      return;
    }

    if (!selectedPlan || !invoice) {
      toast.error("اطلاعات فاکتور نامعتبر است");
      return;
    }

    try {
      setIsLoading(true);

      // 1️⃣ اعتبارسنجی کد تخفیف
      const validateRes = await axiosInstance.post(
        API_ROUTES.FINANCIAL.DISCOUNT_VALIDATE,
        {
          code: discountCode,
          amount: invoice.base_amount_irr,
        }
      );

      const validateData = validateRes.data;
      console.log("validateData", validateData);

      if (!validateData?.success || validateData?.data?.is_valid !== true) {
        setDiscountMessage(validateData?.message || "کد تخفیف نامعتبر است");
        return;
      }

      //   ساخت مجدد فاکتور با کد تخفیف
      const invoicePayload = {
        purpose: PAYMENT_PURPOSE.SUBSCRIPTION_PURCHASE,
        subscription_type: selectedPlan.periods,
        subscription_plan: getPlanIdByCode(selectedPlan.plan),
        amount_irr:
          selectedPlan.periods === "monthly"
            ? selectedPlan.price_monthly_irr
            : selectedPlan.price_yearly_irr,
        chatbot_uuid: selectedPlan?.billingBot?.uuid,
        discount_code: discountCode,
      };
      console.log("invoicePayload", invoicePayload);
      const invoiceRes = await axiosInstance.post(
        API_ROUTES.PAYMENT.FACTOR,
        invoicePayload
      );

      const invoiceData = invoiceRes.data;

      if (!invoiceData?.success) {
        toast.error(invoiceData?.message || "خطا در اعمال کد تخفیف");
        return;
      }

      // 3️⃣ ست کردن فاکتور جدید
      setInvoice(invoiceData.data);

      // 4️⃣ فقط برای UI
      const discountPercent = invoiceData.data.discount_amount || 0;
      // validateData?.data?.discount_details?.discount_value || 0;

      setAppliedDiscount(discountPercent);
      setDiscountMessage("کد تخفیف با موفقیت اعمال شد");
    } catch (err: any) {
      setDiscountMessage(
        err?.response?.data?.message || "خطا در اعمال کد تخفیف"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleProceedToPayment = async () => {
    if (!selectedPlan) {
      toast.error("طرح انتخاب شده معتبر نیست");
      return;
    }

    if (requestOfficialInvoice) {
      if (!companyName.trim()) return toast.error("نام شرکت الزامی است");
      if (!nationalId.trim()) return toast.error("شناسه ملی الزامی است");
    }
    // console.log("invoice",invoice)
    try {
      setIsLoading(true);

      const invoicePayload = {
        purpose: invoice?.purpose,
        company_name: companyName,
        national_id: nationalId,
        amount_irr: invoice?.total_amount_irr,
        chatbot_uuid: invoice?.chatbot_uuid,
        subscription_plan: getPlanIdByCode(invoice?.subscription_plan),
        subscription_type: invoice?.subscription_type,
        description: invoice.description,
        discount_code: discountCode,
        use_wallet: false,
      };

      const res = await axiosInstance.post(
        API_ROUTES.PAYMENT.INITIATE,
        invoicePayload
      );
      const data = res.data;

      if (!data.success) {
        toast.error(data.message || "خطا در ایجاد فاکتور");
        return;
      }

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

  if (!isPlanLoaded) return <PageLoader />;

  return (
    <div className="min-h-screen bg-grey-50 py-12 px-4">
      <main className="max-w-4xl mx-auto">
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
                        {/* {(invoice?.base_amount_irr || "").toLocaleString(
                          "fa-IR"
                        )}{" "} */}
                        {((invoice?.base_amount_irr || 0) / 10).toLocaleString(
                          "fa-IR"
                        )}{" "}
                        تومان
                      </p>
                      <p className="text-grey-500 text-sm">
                        {SUBSCRIPTION_TYPES[selectedPlan.billingPeriod]}
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
                {discountMessage && (
                  <div className="text-sm mr-3 mt-1 text-secondary">
                    {discountMessage}
                  </div>
                )}
              </Card>
            </section>
            {/* نوع پرداخت */}
            <section>
              <Card className="p-6">
               {/* کیف پول */}

               {/* آنلاین */}
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
                  <span>
                    {/* {(invoice?.base_amount_irr || "").toLocaleString("fa-IR")}{" "}
                    ريال */}
                    {((invoice?.base_amount_irr || 0) / 10).toLocaleString(
                      "fa-IR"
                    )}{" "}
                    تومان
                  </span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between items-center text-green-600">
                    <span>تخفیف </span>
                    <span>
                      -
                      {((invoice?.discount_amount || 0) / 10).toLocaleString(
                        "fa-IR"
                      )}{" "}
                      تومان
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span>
                    مالیات ({convertToPersian(invoice?.tax_percentage || "")}%)
                  </span>
                  <span>
                    {/* {(invoice?.tax_amount_irr || "").toLocaleString("fa-IR")}{" "}
                    ريال */}
                    {((invoice?.tax_amount_irr || 0) / 10).toLocaleString(
                      "fa-IR"
                    )}{" "}
                    تومان
                  </span>
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
                      value={nationalId}
                      onChange={(e) => setNationalId(e.target.value)}
                      placeholder="شناسه ملی"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mb-6 p-4 rounded-xl bg-linear-to-br from-grey-50 to-white border-2 border-grey-200">
                <span>مبلغ قابل پرداخت</span>
                <span className="text-xl font-bold text-[#65BCB6]">
                  {/* {(invoice?.total_amount_irr || "").toLocaleString("fa-IR")}{" "}
                  ريال */}
                  {((invoice?.final_amount_irr || 0) / 10).toLocaleString(
                    "fa-IR"
                  )}{" "}
                  تومان
                </span>
              </div>

              <button
                onClick={handleProceedToPayment}
                disabled={isLoading || !selectedPlan}
                className="w-full py-4 rounded-2xl cursor-pointer bg-linear-to-br from-[#65BCB6] to-[#5AA8A2] text-white hover:from-[#5AA8A2] hover:to-[#4E9690] transition-all duration-300 shadow-lg"
              >
                {isLoading ? "در حال پردازش..." : "پرداخت "}
              </button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
