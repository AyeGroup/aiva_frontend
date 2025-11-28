"use client";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/card";
import { toast } from "sonner";
import { Button } from "@/components/button";
import { convertToPersian } from "@/utils/common";
import { useRouter, useSearchParams } from "next/navigation";
import { Download, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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

export default function Invoice() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [returnUrl, setReturnUrl] = useState<string | null>(null);

  useEffect(() => {
    const storedUrl = localStorage.getItem("returnUrl");
    setReturnUrl(storedUrl);
  }, []);

  const handleBack = () => {
    router.push(returnUrl || "/dashboard?tab=billing");
  };

  useEffect(() => {
    const status = searchParams.get("status");

    // 🟢 بررسی وضعیت پرداخت
    if (!status) {
      toast.error("اطلاعات پرداخت نامعتبر است");
      router.push("/dashboard?tab=billing");
      return;
    }

    if (status === "failed") {
      toast.error("پرداخت ناموفق بود ❌");
      router.push("/pay/fail");
      return;
    }

    if (status === "success") {
      toast.success("پرداخت با موفقیت انجام شد 🎉");
    }

    // 🧾 بارگذاری داده فاکتور از localStorage
    const invoiceId = localStorage.getItem("lastInvoiceId");
    if (invoiceId) {
      const data = localStorage.getItem(`invoice-${invoiceId}`);
      if (data) {
        setInvoiceData(JSON.parse(data));
      } else {
        toast.error("اطلاعات فاکتور یافت نشد");
        router.push("/dashboard?tab=billing");
      }
    } else {
      toast.error("فاکتور یافت نشد");
      // router.push("/dashboard?tab=billing");
    }

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-grey-600">
        در حال بارگذاری اطلاعات فاکتور...
      </div>
    );
  }

  // اگر وضعیت پرداخت موفق نیست، فاکتور نمایش داده نمی‌شود
  const status = searchParams.get("status");
  if (status !== "success" || !invoiceData) {
    return null;
  }

  const handleDownload = async () => {
    try {
      toast.info("در حال آماده‌سازی فایل PDF...");

      const invoiceElement = document.querySelector(".invoice-content");
      if (!invoiceElement) {
        toast.error("محتوای فاکتور یافت نشد");
        return;
      }

      // گرفتن snapshot از بخش فاکتور
      const canvas = await html2canvas(invoiceElement as HTMLElement, {
        scale: 2, // کیفیت بالاتر
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");

      // تنظیم ابعاد PDF
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

      // نام فایل با شماره فاکتور
      const filename = `invoice-${invoiceData?.invoiceId || "payment"}.pdf`;
      pdf.save(filename);

      toast.success("فاکتور با موفقیت دانلود شد 🎉");
    } catch (err) {
      console.error(err);
      toast.error("خطا در تولید فایل PDF");
    }
  };
  const handlePrint = () => window.print();

  const trackingCode = searchParams.get("tracking");

  return (
    <div className="min-h-screen bg-grey-50 py-12 px-4">
      <main className="max-w-2xl mx-auto" role="main">
        {/* Header */}
        <header className="mb-8 no-print flex justify-between items-center">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-grey-600 hover:text-grey-900 transition-colors mb-4 cursor-pointer font-medium border-none outline-0"
            title="بازگشت "
          >
            <ArrowRight className="w-5 h-5" />
            <span>بازگشت</span>
          </button>
          <div className="flex items-center justify-end">
            <div className="flex gap-3">
              <Button
                variant="secondary"
                size="md"
                onClick={handlePrint}
                title="چاپ فاکتور"
              >
                🖨️ چاپ
              </Button>
              {/* <Button
                variant="primary"
                size="md"
                onClick={handleDownload}
                title="دانلود فاکتور"
              >
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  <span>دانلود PDF</span>
                </div>
              </Button> */}
            </div>
          </div>
        </header>

        {/* ✅ تمام استایل‌ها و ساختار اصلی حفظ شده */}
        <Card className="p-8 invoice-content">
          {/* Invoice Header */}
          <div className="flex flex-col items-center justify-center gap-6 py-8 border-b-2 border-grey-200">
            <h1 className="text-grey-900 font-bold text-right">
              پرداخت با موفقیت انجام شد.
            </h1>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white shadow-lg mb-4 bg-primary">
              <CheckCircle className="w-5 h-5" />
              <div>کد پیگیری: {convertToPersian(trackingCode || "  ")}</div>
            </div>
          </div>
          <div>
            <div className="flex mt-4">
              <Image
                src="/logo.png"
                alt="آیوا"
                width={30}
                height={30}
                priority
              />
              <h2 className="font-bold text-grey-900 m-1">
                آیوا{" "}
                <span className="text-grey-600 font-medium text-sm">
                  دستیار هوشمند{" "}
                </span>
              </h2>
            </div>

            <p className="flex flex-col gap-2 text-grey-600 text-sm mt-2 mr-6">
              <a href="tel:09903202903" className=" " title="تماس با پشتیبانی">
                📞 ۰۹۹۰۳۲۰۲۹۰۳
              </a>
              <Link
                href="/"
                className="flex items-center gap-3 hover:opacity-90 transition"
              >
                🌐 ragbuilder.aia-ai.com
              </Link>
            </p>
          </div>
        </Card>
      </main>
    </div>
  );
}
