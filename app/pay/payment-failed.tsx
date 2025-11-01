"use client";
import React from "react";
import { Card } from "@/components/card";
import { Button } from "@/components/button";
import { PageType } from "@/types/common";
import {
  XCircle,
  ArrowRight,
  RefreshCw,
  Phone,
  AlertTriangle,
} from "lucide-react";
import { useRouter } from "next/navigation";


export default function PaymentFailed() {
    const router = useRouter();
  
  const handleTryAgain = () => {
    router.push("payment-gateway");
  };

  const handleBackToCheckout = () => {
    router.push("checkout");
  };

  const handleBackToBilling = () => {
    router.push("billing");
  };

  const commonReasons = [
    "موجودی کافی در حساب وجود ندارد",
    "اطلاعات کارت به درستی وارد نشده است",
    "رمز دوم کارت اشتباه است",
    "محدودیت تراکنش روزانه کارت",
    "مشکل در ارتباط با بانک",
  ];

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 py-12 px-4 flex items-center justify-center"
      dir="rtl"
    >
      <main className="max-w-2xl w-full" role="main">
        <Card className="p-8 text-center relative overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-red-100 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-red-100 rounded-full blur-3xl opacity-50 translate-x-1/2 translate-y-1/2" />

          {/* Failed Icon */}
          <div className="relative mb-6">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-red-600 text-white shadow-2xl animate-shake">
              <XCircle className="w-12 h-12" />
            </div>
          </div>

          <h1 className="text-grey-900 mb-3">پرداخت ناموفق بود</h1>
          <p className="text-grey-600 mb-8">
            متأسفانه پرداخت شما با موفقیت انجام نشد. لطفاً دوباره تلاش کنید.
          </p>

          {/* Error Message */}
          <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 text-right">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-700 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-red-900 mb-2">دلایل احتمالی خطا:</h3>
                <ul className="space-y-2 text-red-700 text-sm">
                  {commonReasons.map((reason, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-red-500">•</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Button
              variant="primary"
              size="lg"
              onClick={handleTryAgain}
              title="تلاش مجدد"
            >
              <div className="flex items-center justify-center gap-2">
                <RefreshCw className="w-5 h-5" />
                <span>تلاش مجدد</span>
              </div>
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={handleBackToCheckout}
              title="ویرایش فاکتور"
            >
              <div className="flex items-center justify-center gap-2">
                <ArrowRight className="w-5 h-5" />
                <span>ویرایش فاکتور</span>
              </div>
            </Button>
          </div>

          <button
            onClick={handleBackToBilling}
            className="text-grey-600 hover:text-grey-900 transition-colors text-sm"
            title="بازگشت به صفحه مالی"
          >
            بازگشت به صفحه مالی
          </button>

          {/* Help Section */}
          <div className="mt-8 pt-6 border-t border-grey-200">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-3 text-right">
                <Phone className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-blue-900 mb-1">نیاز به کمک دارید؟</h4>
                  <p className="text-blue-800 text-sm mb-2">
                    تیم پشتیبانی ما آماده کمک به شماست
                  </p>
                  <div className="text-blue-700 text-sm space-y-1">
                    <p>📞 تلفن: 021-12345678</p>
                    <p>📧 ایمیل: support@chatbot.ir</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </main>

      <style>{`
        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          10%, 30%, 50%, 70%, 90% {
            transform: translateX(-5px);
          }
          20%, 40%, 60%, 80% {
            transform: translateX(5px);
          }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
