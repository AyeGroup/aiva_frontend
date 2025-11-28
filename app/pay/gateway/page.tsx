"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, XCircle } from "lucide-react";

export default function PaymentGateway() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePayment = (success: boolean) => {
    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      const invoiceData = localStorage.getItem("invoiceData");

      if (success) {
        // Generate invoice ID
        const invoiceId = `INV-${Date.now()}`;
        localStorage.setItem("lastInvoiceId", invoiceId);

        if (invoiceData) {
          localStorage.setItem(
            `invoice-${invoiceId}`,
            JSON.stringify({
              ...JSON.parse(invoiceData),
              invoiceId,
              status: "success",
              paymentDate: new Date().toISOString(),
            })
          );
        }

        router.push("/pay/success");
      } else {
        router.push("/pay/failed");
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-grey-50 flex items-center justify-center py-12 px-4">
      <main className="max-w-2xl w-full" role="main">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          {/* Header */}
          <header className="mb-8 text-center">
            <h1 className="text-grey-900 mb-2">درگاه پرداخت</h1>
            <p className="text-grey-600">
              برای تست، یکی از گزینه‌های زیر را انتخاب کنید
            </p>
          </header>

          {/* Payment Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Success Button */}
            <button
              onClick={() => handlePayment(true)}
              disabled={loading}
              className="p-8 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
              title="شبیه‌سازی پرداخت موفق"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                  <CheckCircle className="w-12 h-12" />
                </div>
                <h2 className="text-white text-xl">پرداخت موفق</h2>
                <p className="text-white/80 text-sm text-center">
                  کلیک کنید برای شبیه‌سازی پرداخت موفقیت‌آمیز
                </p>
              </div>
            </button>

            {/* Failed Button */}
            <button
              onClick={() => handlePayment(false)}
              disabled={loading}
              className="p-8 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
              title="شبیه‌سازی پرداخت ناموفق"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                  <XCircle className="w-12 h-12" />
                </div>
                <h2 className="text-white text-xl">پرداخت ناموفق</h2>
                <p className="text-white/80 text-sm text-center">
                  کلیک کنید برای شبیه‌سازی پرداخت ناموفق
                </p>
              </div>
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#65BCB6]/10 text-[#65BCB6] border border-[#65BCB6]/20">
                <div className="w-5 h-5 border-3 border-[#65BCB6] border-t-transparent rounded-full animate-spin" />
                <span>در حال پردازش...</span>
              </div>
            </div>
          )}

          {/* Back Button */}
          <button
            onClick={() => router.push("/pay/checkout")}
            disabled={loading}
            className="mt-8 w-full py-3 rounded-xl text-grey-600 hover:text-grey-900 hover:bg-grey-50 transition-colors disabled:opacity-50"
            type="button"
            title="بازگشت به صفحه فاکتور"
          >
            بازگشت به فاکتور
          </button>
        </div>
      </main>
    </div>
  );
}
