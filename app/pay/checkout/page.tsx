"use client"
import React, { useState, useEffect } from "react";
import { Card } from "@/components/card";
import { toast } from "sonner";
import { Input } from "@/components/input";
import { Toaster } from "../../../components/ui/sonner";
import { Checkbox } from "@/components/checkbox";
import { useRouter } from "next/navigation";
import { ArrowRight, Tag, Receipt, CreditCard, Building2 } from "lucide-react";

interface SelectedPlan {
  id: string;
  name: string;
  price: string;
  description: string;
  color: string;
  billingPeriod: "monthly" | "yearly";
}

export default function Checkout() {
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan | null>(null);
  const [requestOfficialInvoice, setRequestOfficialInvoice] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [economicCode, setEconomicCode] = useState("");
  const [nationalId, setNationalId] = useState("");
  const router = useRouter();

  useEffect(() => {
    const planData = localStorage.getItem("selectedPlan");
    if (planData) {
      setSelectedPlan(JSON.parse(planData));
    } else {
      router.push("billing");
    }
  }, []);

  if (!selectedPlan) {
    return null;
  }

  // محاسبات فاکتور
  const basePrice = parseInt(selectedPlan.price.replace(/,/g, "")); // مبلغ پایه
  const discountAmount = (basePrice * appliedDiscount) / 100; // مقدار تخفیف
  const priceAfterDiscount = basePrice - discountAmount; // قیمت بعد از تخفیف
  const taxRate = 10; // نرخ مالیات 10 درصد
  const taxAmount = (priceAfterDiscount * taxRate) / 100; // مالیات 10% از قیمت (بعد از تخفیف)
  const totalPrice = priceAfterDiscount + taxAmount; // مبلغ کل = قیمت بعد از تخفیف + مالیات

  const handleApplyDiscount = () => {
    // Mock discount codes
    const discountCodes: { [key: string]: number } = {
      WELCOME20: 20,
      SAVE10: 10,
      SPECIAL15: 15,
      FIRSTBUY: 25,
    };

    const discount = discountCodes[discountCode.toUpperCase()];
    if (discount) {
      setAppliedDiscount(discount);
      toast.success(`کد تخفیف ${discount}% اعمال شد`);
    } else {
      toast.error("کد تخفیف نامعتبر است");
    }
  };

  const handleProceedToPayment = () => {
    console.log("handleProceedToPayment called");

    // بررسی اطلاعات فاکتور رسمی
    if (requestOfficialInvoice) {
      if (!companyName.trim()) {
        toast.error("لطفاً نام شرکت را وارد کنید");
        return;
      }
      if (!economicCode.trim()) {
        toast.error("لطفاً کد اقتصادی را وارد کنید");
        return;
      }
      if (!nationalId.trim()) {
        toast.error("لطفاً شناسه ملی را وارد کنید");
        return;
      }
    }

    // ذخیره اطلاعات فاکتور
    const invoiceData = {
      plan: selectedPlan,
      basePrice,
      discountAmount,
      discountPercent: appliedDiscount,
      taxAmount,
      totalPrice,
      date: new Date().toISOString(),
      officialInvoice: requestOfficialInvoice
        ? {
            companyName,
            economicCode,
            nationalId,
          }
        : null,
    };

    console.log("Invoice Data:", invoiceData);
    localStorage.setItem("invoiceData", JSON.stringify(invoiceData));

    console.log("Navigating to payment-gateway");
    router.push("payment-gateway");
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString("fa-IR");
  };

  return (
    <div className="min-h-screen bg-grey-50 py-12 px-4" dir="rtl">
      <main className="max-w-4xl mx-auto" role="main">
        {/* Header */}
        <header className="mb-8">
          <button
            onClick={() => router.push("billing")}
            className="flex items-center gap-2 text-grey-600 hover:text-grey-900 transition-colors mb-4"
            title="بازگشت به صفحه مالی"
          >
            <ArrowRight className="w-5 h-5" />
            <span>بازگشت به پلن‌ها</span>
          </button>
          <h1 className="text-grey-900 mb-2 text-right">تکمیل خرید</h1>
          <p className="text-grey-600 text-right">مشخصات سفارش و پرداخت</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Plan Details */}
            <section aria-labelledby="plan-details-heading">
              <Card className="p-6">
                <h2
                  id="plan-details-heading"
                  className="text-grey-900 mb-4 flex items-center gap-2"
                >
                  <Receipt className="w-5 h-5" />
                  جزئیات پلن انتخابی
                </h2>
                <div
                  className="p-6 rounded-2xl mb-4"
                  style={{
                    background: `linear-gradient(135deg, ${selectedPlan.color}10 0%, ${selectedPlan.color}05 100%)`,
                    borderRight: `4px solid ${selectedPlan.color}`,
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-grey-900 mb-1 text-right">
                        پلن {selectedPlan.name}
                      </h3>
                      <p className="text-grey-600 text-sm mb-3">
                        {selectedPlan.description}
                      </p>
                    </div>
                    <div className="text-left">
                      <p className="text-grey-900">
                        {selectedPlan.price} تومان
                      </p>
                      <p className="text-grey-500 text-sm">
                        {selectedPlan.billingPeriod === "monthly"
                          ? "هر ماه"
                          : "هر سال"}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </section>

            {/* Discount Code */}
            <section aria-labelledby="discount-heading">
              <Card className="p-6">
                <h2
                  id="discount-heading"
                  className="text-grey-900 mb-4 flex items-center gap-2"
                >
                  <Tag className="w-5 h-5" />
                  کد تخفیف
                </h2>
                <div className="flex gap-3">
                  <Input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="کد تخفیف خود را وارد کنید"
                    className="flex-1"
                    disabled={appliedDiscount > 0}
                  />
                  <button
                    onClick={handleApplyDiscount}
                    disabled={!discountCode || appliedDiscount > 0}
                    title="اعمال کد تخفیف"
                    className="px-6 py-3 rounded-xl border-2 border-[#65BCB6] text-[#65BCB6] bg-white hover:bg-[rgba(101,188,182,0.08)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[rgba(101,188,182,0.25)] whitespace-nowrap"
                    type="button"
                  >
                    {appliedDiscount > 0 ? "✓ اعمال شد" : "اعمال کد"}
                  </button>
                </div>
                {appliedDiscount > 0 && (
                  <div className="mt-3 p-3 rounded-xl bg-green-50 border border-green-200 flex items-center gap-2">
                    <span className="text-green-700 text-sm">
                      🎉 تخفیف {appliedDiscount}% با موفقیت اعمال شد
                    </span>
                    <button
                      onClick={() => {
                        setAppliedDiscount(0);
                        setDiscountCode("");
                        toast.info("کد تخفیف حذف شد");
                      }}
                      className="mr-auto text-red-600 hover:text-red-700 text-sm"
                      title="حذف کد تخفیف"
                    >
                      حذف
                    </button>
                  </div>
                )}
                <div className="mt-4 p-4 rounded-xl bg-blue-50 border border-blue-200">
                  <p className="text-blue-900 text-sm mb-2">
                    💡 کدهای تخفیف نمونه:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["WELCOME20", "SAVE10", "SPECIAL15", "FIRSTBUY"].map(
                      (code) => (
                        <button
                          key={code}
                          onClick={() => setDiscountCode(code)}
                          className="px-3 py-1 rounded-lg bg-white text-blue-700 text-xs hover:bg-blue-100 transition-colors border border-blue-200"
                          title={`استفاده از کد ${code}`}
                          disabled={appliedDiscount > 0}
                        >
                          {code}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </Card>
            </section>
          </div>

          {/* Right Column - Invoice Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-6">
              <h2 className="text-grey-900 mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                خلاصه فاکتور
              </h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-grey-200">
                <div className="flex justify-between items-center">
                  <span className="text-grey-600">مبلغ پایه</span>
                  <span className="text-grey-900">
                    {selectedPlan.price} تومان
                  </span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex justify-between items-center text-green-600">
                    <span>تخفیف ({appliedDiscount}%)</span>
                    <span>-{formatNumber(discountAmount)} تومان</span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-grey-600 text-right">
                    مالیات بر ارزش افزوده ({taxRate}%)
                  </span>
                  <span className="text-grey-900">
                    +{formatNumber(taxAmount)} تومان
                  </span>
                </div>
              </div>

              {/* Official Invoice Request */}
              <div className="mb-6 pb-6 border-b border-grey-200">
                <Checkbox
                  id="official-invoice"
                  label="درخواست صدور فاکتور رسمی"
                  checked={requestOfficialInvoice}
                  onChange={setRequestOfficialInvoice}
                />

                {requestOfficialInvoice && (
                  <div className="mt-4 space-y-3 p-4 rounded-xl bg-blue-50 border border-blue-200">
                    <div className="flex items-center gap-2 text-blue-900 mb-3">
                      <Building2 className="w-5 h-5" />
                      <span className="text-sm">اطلاعات شرکت</span>
                    </div>
                    <Input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="نام شرکت"
                      label="نام شرکت"
                      required
                    />
                    <Input
                      type="text"
                      value={economicCode}
                      onChange={(e) => setEconomicCode(e.target.value)}
                      placeholder="کد اقتصادی (11 رقمی)"
                      label="کد اقتصادی"
                      maxLength={11}
                      required
                    />
                    <Input
                      type="text"
                      value={nationalId}
                      onChange={(e) => setNationalId(e.target.value)}
                      placeholder="شناسه ملی (11 رقمی)"
                      label="شناسه ملی"
                      maxLength={11}
                      required
                    />
                    <p className="text-xs text-blue-700 mt-2">
                      💡 فاکتور رسمی با مشخصات شرکت شما صادر خواهد شد
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mb-6 p-4 rounded-xl bg-gradient-to-br from-grey-50 to-white border-2 border-grey-200">
                <span className="text-grey-900 text-right">
                  مبلغ قابل پرداخت
                </span>
                <span
                  className="text-grey-900"
                  style={{
                    fontSize: "1.5rem",
                    background: `linear-gradient(135deg, ${selectedPlan.color} 0%, ${selectedPlan.color}aa 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {formatNumber(totalPrice)} تومان
                </span>
              </div>

              <button
                onClick={handleProceedToPayment}
                title="ادامه به درگاه پرداخت"
                className="w-full py-4 rounded-2xl bg-gradient-to-br from-[#65BCB6] to-[#5AA8A2] text-white hover:from-[#5AA8A2] hover:to-[#4E9690] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[rgba(101,188,182,0.25)]"
                type="button"
              >
                <div className="flex items-center justify-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  <span>پرداخت امن</span>
                </div>
              </button>

              <div className="mt-4 text-center">
                <p className="text-grey-500 text-xs">
                  🔒 پرداخت از طریق درگاه امن بانکی
                </p>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Toaster position="top-center" dir="rtl" />

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
