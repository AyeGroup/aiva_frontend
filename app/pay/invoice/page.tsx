"use client";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/card";
import { toast } from "sonner";
import { Button } from "@/components/button";
import { useRouter } from "next/navigation";
import {
  Download,
  ArrowRight,
  CheckCircle,
  Receipt,
  Calendar,
  CreditCard,
} from "lucide-react";

interface InvoiceData {
  invoiceId: string;
  plan: {
    name: string;
    color: string;
    billingPeriod: "monthly" | "yearly";
  };
  basePrice: number;
  discountAmount: number;
  discountPercent: number;
  taxAmount: number;
  totalPrice: number;
  paymentDate: string;
  status: string;
  officialInvoice?: {
    companyName: string;
    economicCode: string;
    nationalId: string;
  } | null;
}

export function Invoice() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const invoiceId = localStorage.getItem("lastInvoiceId");
    if (invoiceId) {
      const data = localStorage.getItem(`invoice-${invoiceId}`);
      if (data) {
        setInvoiceData(JSON.parse(data));
      } else {
        router.push("/dashboard?tab=billing");
      }
    } else {
      router.push("/dashboard?tab=billing");
    }
  }, []);

  if (!invoiceData) {
    return null;
  }

  const formatNumber = (num: number) => {
    return num.toLocaleString("fa-IR");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const handleDownload = () => {
    toast.success("فاکتور در حال دانلود است");
    // In a real app, this would generate and download a PDF
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-grey-50 py-12 px-4" dir="rtl">
      <main className="max-w-4xl mx-auto" role="main">
        {/* Header */}
        <header className="mb-8 no-print">
          <button
            onClick={() => router.push("/dashboard?tab=billing")}
            className="flex items-center gap-2 text-grey-600 hover:text-grey-900 transition-colors mb-4"
            title="بازگشت به صفحه مالی"
          >
            <ArrowRight className="w-5 h-5" />
            <span>بازگشت به صفحه مالی</span>
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-grey-900 mb-2 text-right">فاکتور پرداخت</h1>
              <p className="text-grey-600 text-right">
                شماره فاکتور: {invoiceData.invoiceId}
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                size="md"
                onClick={handlePrint}
                title="چاپ فاکتور"
              >
                🖨️ چاپ
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={handleDownload}
                title="دانلود فاکتور"
              >
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  <span>دانلود PDF</span>
                </div>
              </Button>
            </div>
          </div>
        </header>

        <Card className="p-8 invoice-content">
          {/* Invoice Header */}
          <div className="flex items-start justify-between mb-8 pb-8 border-b-2 border-grey-200">
            <div>
              <h2 className="text-grey-900 mb-2">چت‌بات فروشگاه</h2>
              <p className="text-grey-600 text-sm">
                سامانه هوشمند مدیریت چت‌بات
              </p>
              <p className="text-grey-600 text-sm mt-2">
                📧 info@chatbot.ir
                <br />
                📞 021-12345678
                <br />
                🌐 www.chatbot.ir
              </p>
            </div>
            <div className="text-left">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white shadow-lg mb-4"
                style={{
                  background: `linear-gradient(135deg, ${invoiceData.plan.color} 0%, ${invoiceData.plan.color}dd 100%)`,
                }}
              >
                <CheckCircle className="w-5 h-5" />
                <span>پرداخت شده</span>
              </div>
              <p className="text-grey-600 text-sm">شماره فاکتور</p>
              <p className="text-grey-900">{invoiceData.invoiceId}</p>
            </div>
          </div>

          {/* Customer & Payment Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-grey-900 mb-3 flex items-center gap-2">
                <Receipt className="w-5 h-5" />
                {invoiceData.officialInvoice ? "اطلاعات شرکت" : "اطلاعات مشتری"}
              </h3>
              <div className="space-y-2 text-sm">
                {invoiceData.officialInvoice ? (
                  <>
                    <p className="text-grey-600">
                      نام شرکت: {invoiceData.officialInvoice.companyName}
                    </p>
                    <p className="text-grey-600">
                      کد اقتصادی: {invoiceData.officialInvoice.economicCode}
                    </p>
                    <p className="text-grey-600">
                      شناسه ملی: {invoiceData.officialInvoice.nationalId}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-grey-600">نام: کاربر محترم</p>
                    <p className="text-grey-600">ایمیل: user@example.com</p>
                    <p className="text-grey-600">شماره تماس: 09123456789</p>
                  </>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-grey-900 mb-3 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                اطلاعات پرداخت
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-grey-600">
                  تاریخ: {formatDate(invoiceData.paymentDate)}
                </p>
                <p className="text-grey-600">روش پرداخت: درگاه بانکی</p>
                <p className="text-grey-600">وضعیت: پرداخت موفق</p>
                {invoiceData.officialInvoice && (
                  <p className="text-grey-600">نوع فاکتور: رسمی</p>
                )}
              </div>
            </div>
          </div>

          {/* Invoice Items */}
          <div className="mb-8">
            <h3 className="text-grey-900 mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              جزئیات سفارش
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-grey-200">
                    <th className="text-right py-3 px-4 text-grey-900">شرح</th>
                    <th className="text-center py-3 px-4 text-grey-900">
                      دوره
                    </th>
                    <th className="text-left py-3 px-4 text-grey-900">
                      مبلغ (تومان)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-grey-100">
                    <td className="py-4 px-4 text-grey-900">
                      اشتراک پلن {invoiceData.plan.name}
                    </td>
                    <td className="py-4 px-4 text-grey-600 text-center">
                      {invoiceData.plan.billingPeriod === "monthly"
                        ? "ماهانه"
                        : "سالانه"}
                    </td>
                    <td className="py-4 px-4 text-grey-900 text-left">
                      {formatNumber(invoiceData.basePrice)}
                    </td>
                  </tr>
                  {invoiceData.discountPercent > 0 && (
                    <tr className="border-b border-grey-100">
                      <td className="py-4 px-4 text-green-700">
                        تخفیف ({invoiceData.discountPercent}%)
                      </td>
                      <td className="py-4 px-4"></td>
                      <td className="py-4 px-4 text-green-700 text-left">
                        -{formatNumber(invoiceData.discountAmount)}
                      </td>
                    </tr>
                  )}
                  <tr className="border-b border-grey-100">
                    <td className="py-4 px-4 text-grey-600">
                      مالیات بر ارزش افزوده (۱۰%)
                    </td>
                    <td className="py-4 px-4"></td>
                    <td className="py-4 px-4 text-grey-900 text-left">
                      +{formatNumber(invoiceData.taxAmount)}
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-grey-300">
                    <td className="py-4 px-4 text-grey-900">جمع کل</td>
                    <td className="py-4 px-4"></td>
                    <td className="py-4 px-4 text-left">
                      <span
                        className="text-grey-900"
                        style={{
                          fontSize: "1.5rem",
                          background: `linear-gradient(135deg, ${invoiceData.plan.color} 0%, ${invoiceData.plan.color}aa 100%)`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {formatNumber(invoiceData.totalPrice)} تومان
                      </span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Footer Notes */}
          <div className="pt-6 border-t border-grey-200">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
              <h4 className="text-blue-900 mb-2">📌 توجه:</h4>
              <ul className="text-blue-800 text-sm space-y-1 mr-4">
                <li>
                  • این فاکتور به صورت الکترونیکی صادر شده و نیازی به مهر و امضا
                  ندارد
                </li>
                {invoiceData.officialInvoice && (
                  <li>
                    • این فاکتور به صورت رسمی صادر شده و قابل استفاده برای امور
                    مالیاتی است
                  </li>
                )}
                <li>• اشتراک شما به صورت خودکار تمدید می‌شود</li>
                <li>• امکان لغو اشتراک در هر زمان وجود دارد</li>
              </ul>
            </div>

            <div className="text-center text-grey-500 text-sm">
              <p>با تشکر از اعتماد شما به چت‌بات فروشگاه</p>
              <p className="mt-2">این فاکتور به صورت خودکار تولید شده است</p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
