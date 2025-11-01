"use client";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/card";
import { Button } from "@/components/button";
import { useRouter } from "next/navigation";
import { CheckCircle, ArrowRight, Receipt } from "lucide-react";

export default function PaymentSuccess() {
  const [countdown, setCountdown] = useState(10);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("billing");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleViewInvoice = () => {
    router.push("invoice");
  };

  const handleBackToBilling = () => {
    router.push("billing");
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 py-12 px-4 flex items-center justify-center"
      dir="rtl"
    >
      <main className="max-w-2xl w-full" role="main">
        <Card className="p-8 text-center relative overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-green-100 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-green-100 rounded-full blur-3xl opacity-50 translate-x-1/2 translate-y-1/2" />

          {/* Success Icon */}
          <div className="relative mb-6">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shadow-2xl animate-bounce-slow">
              <CheckCircle className="w-12 h-12" />
            </div>
            {/* Ripple Effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-green-500 opacity-20 animate-ping" />
            </div>
          </div>

          <h1 className="text-grey-900 mb-3">پرداخت موفقیت‌آمیز بود! 🎉</h1>
          <p className="text-grey-600 mb-8">
            پرداخت شما با موفقیت انجام شد و پلن جدید شما فعال گردید.
          </p>

          {/* Success Message */}
          <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
            <div className="space-y-3 text-right">
              <div className="flex items-center gap-3 text-green-700">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span>اشتراک شما با موفقیت فعال شد</span>
              </div>
              <div className="flex items-center gap-3 text-green-700">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span>ایمیل تأیید برای شما ارسال شد</span>
              </div>
              <div className="flex items-center gap-3 text-green-700">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span>فاکتور در بخش سوابق خرید قابل مشاهده است</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Button
              variant="primary"
              size="lg"
              onClick={handleViewInvoice}
              title="مشاهده فاکتور"
            >
              <div className="flex items-center justify-center gap-2">
                <Receipt className="w-5 h-5" />
                <span>مشاهده فاکتور</span>
              </div>
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={handleBackToBilling}
              title="بازگشت به صفحه مالی"
            >
              <div className="flex items-center justify-center gap-2">
                <ArrowRight className="w-5 h-5" />
                <span>بازگشت به صفحه مالی</span>
              </div>
            </Button>
          </div>

          {/* Auto Redirect Notice */}
          {countdown > 0 && (
            <p className="text-grey-500 text-sm">
              بازگشت خودکار به صفحه مالی در {countdown} ثانیه...
            </p>
          )}
        </Card>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-grey-600 text-sm">
            در صورت بروز مشکل با پشتیبانی تماس بگیرید
          </p>
        </div>
      </main>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
