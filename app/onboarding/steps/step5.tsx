"use client";

import Image from "next/image";
import axiosInstance from "@/lib/axiosInstance";
import PageLoader from "@/components/pageLoader";
import { useAuth } from "@/providers/AuthProvider";
import { Install } from "@/public/icons/AppIcons";
import { BotConfig } from "@/types/common";
import { useRouter } from "next/navigation";
import { API_ROUTES } from "@/constants/apiRoutes";
import { useEffect, useState } from "react";
import {
  Copy,
  Download,
  Globe,
  CheckCircle2,
  BarChart3,
  HelpCircle,
} from "lucide-react";

interface WizardStep5Props {
  botConfig: BotConfig;
}

export function WizardStep5({ botConfig }: WizardStep5Props) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [installCode, setInstallCode] = useState("");
  // const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const { user, loading } = useAuth();

  useEffect(() => {
    const fetchCode = async () => {
      try {
        setIsLoading(true);
        const res = await axiosInstance.get(
          API_ROUTES.BOTS.GET_EMBED(botConfig.uuid),
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        // console.log("step 5 code", res.data?.data?.embed_script);
        setInstallCode(res.data?.data?.embed_script || "");
      } catch (err) {
        console.error("خطا در دریافت کد نصب:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCode();
  }, [botConfig.uuid]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(installCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-brand-primary/20 shadow overflow-hidden">
      <div className="p-7 space-y-8">
        {/* Header Section */}
        <div className="flex gap-4 px-0 py-3 items-center justify-start ">
          <div className=" w-12 h-12 bg-success/10 rounded-2xl flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-success" />
          </div>
          <div className="text-2xl font-bold text-grey-900 text-right ">
            تبریک! آیوا آماده نصب و راه اندازی است
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 bg-blend-overlay border-2 rounded-2xl border-[#d1d5db] p-6 bg-linear-to-b from-[#E3F3F082] to-[#FBF4F4] gap-4">
          {loading || (isloading && <PageLoader />)}
          <div className="bg-primary/10  rounded-2xl border border-primary p-6 ">
            <div className="flex items-center justify-start gap-2 mb-5">
              <div className="w-6 h-6 text-primary">
                <Image
                  src="/logo.png"
                  height={64}
                  width={64}
                  alt="آیوا"
                  className="w-8 h-8 object-cover rounded-full"
                />
              </div>
              <div className="font-semibold  text-grey-900">خلاصه تنظیمات</div>
            </div>

            <div className="grid grid-cols-2 gap-y-3">
              {/* نام دستیار */}
              <div className=" text-grey-600 pl-5">نام دستیار:</div>
              <div className="flex  items-center">
                <div
                  className="size-2 ml-2 rounded-full"
                  style={{ backgroundColor: botConfig.primary_color }}
                ></div>
                <span className="text-[16px] font-medium text-grey-900">
                  {botConfig.name}
                </span>
              </div>
              <div className=" text-grey-600 pl-5">زبان :</div>

              {/* زبان */}
              <div className="flex items-center">
                <div
                  className="size-2 ml-2 rounded-full"
                  style={{ backgroundColor: botConfig.primary_color }}
                ></div>
                <span className="text-[16px] font-medium text-grey-900">
                  {botConfig.language}
                </span>
              </div>

              {/* تعداد منابع دانش */}
              <div className=" text-grey-600 pl-5"> منابع دانش :</div>
              <div className="flex  items-center">
                <div
                  className="size-2 ml-2 rounded-full"
                  style={{ backgroundColor: botConfig.primary_color }}
                ></div>
                <span className="text-[16px] font-medium text-grey-900">
                  {botConfig.knowledge?.length || 0}
                </span>
              </div>
            </div>
          </div>
          <div className="bg-primary/10  rounded-2xl border border-primary p-6 ">
            <div className="flex items-center justify-start gap-2 mb-5">
              <div className="w-6 h-6 text-primary">
                <Install />
              </div>
              <div className="font-semibold  text-grey-900">نصب در سایت</div>
            </div>
            <div className="bg-white border-2 border-brand-primary rounded-[20px] h-[120px] relative flex items-center justify-center">
              <div className="flex flex-col items-center text-center">
                <Globe className="w-[24px] h-[24px] text-brand-primary mb-[6px]" />
                <p className="text-[16px] text-grey-900 mb-[4px]">
                  HTML/JavaScript
                </p>
                <p className="text-[16px] text-grey-600">برای اکثر سایت‌ها</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border-2 border-[#d1d5db] p-6 rounded-2xl">
          <div className=" mb-8">کد نصب</div>

          <div className="space-y-6">
            <div className="space-y-3">
              <div className="relative">
                <div className="bg-brand-secondary rounded-2xl p-4 pr-24 h-56 overflow-hidden">
                  <div className="text-white text-sm leading-6 font-mono ltr text-left">
                    {installCode}
                  </div>
                </div>

                <div className="absolute top-3 right-4 flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]"
                    title="کپی کردن کد"
                  >
                    {copied ? (
                      <CheckCircle2 className="w-[16px] h-[16px] text-success" />
                    ) : (
                      <Copy className="w-[16px] h-[16px] text-brand-primary" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Installation Guide */}
            <div className="space-y-[12px]">
              <p className="text-[16px] text-grey-900 text-right">
                راهنمای نصب - HTML/JavaScript
              </p>

              <ol className="space-y-[8px]">
                {[
                  "کد را کپی کنید",
                  "فایل HTML سایت خود را باز کنید",
                  "کد را در بخش <head> یا قبل از </body> قرار دهید",
                  "فایل را ذخیره و آپلود کنید",
                  "سایت خود را بررسی کنید",
                ].map((step, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-sm text-right"
                  >
                    <span className=" flex items-center justify-center text-white bg-primary rounded-full   size-6">
                      {index + 1}
                    </span>
                    <span className="  text-grey-700 flex-1">{step}</span>
                  </li>
                ))}
              </ol>

              <div className="bg-brand-tertiary/10 border border-brand-tertiary/20 rounded-[20px] p-[17px] h-[82px]">
                <p className="text-[16px] text-brand-tertiary leading-[24px] text-right">
                  💡 نکته: پس از نصب، ممکن است تا چند دقیقه طول بکشد تا دستیار
                  در سایت شما فعال شود.
                </p>
              </div>
            </div>
          </div>
        </div>{" "}
        {/* Next Steps Cards */}
        <div className="grid grid-cols-2 gap-6">
          {/* Dashboard Card */}
          <div className="bg-white rounded-[20px] border-2 border-grey-300 p-[24px] flex flex-col gap-[16px] items-center justify-start">
            <div className="flex items-center gap-[12px]">
              <BarChart3 className="w-[20px] h-[20px] text-brand-primary" />
              <span className="text-[16px] text-grey-900">مرحله بعد</span>
            </div>
            <p className="text-[16px] text-grey-600 text-center leading-[24px]">
              مدیریت و بهبود عملکرد دستیار از طریق داشبورد
            </p>
            <button
              onClick={() => router.push("dashboard")}
              className="bg-brand-primary rounded-[12px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] h-[48px] w-full flex items-center justify-center text-white text-[16px]"
              title="رفتن به داشبورد"
            >
              رفتن به داشبورد
            </button>
          </div>

          {/* Support Card */}
          <div className="bg-white rounded-[20px] border-2 border-grey-300 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)] p-[24px] flex flex-col gap-[16px]">
            <div className="flex items-center gap-[12px]">
              <HelpCircle className="w-[20px] h-[20px] text-brand-tertiary" />
              <span className="text-[16px] text-grey-900">پشتیبانی</span>
            </div>
            <div className="flex-1">
              <p className="text-[16px] text-grey-600 text-right leading-[24px]">
                تیم پشتیبانی آیوا آماده کمک به شماست
              </p>
            </div>
            <button
              className="bg-white border-2 border-brand-primary rounded-[12px] h-[52px] w-full flex items-center justify-center text-brand-primary text-[16px]"
              title="تماس با پشتیبانی"
            >
              تماس با پشتیبانی
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
