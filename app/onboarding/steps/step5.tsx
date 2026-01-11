"use client";

import Image from "next/image";
import PageLoader from "@/components/pageLoader";
import LockFeature from "../LockFeature";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "sonner";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { useAuth } from "@/providers/AuthProvider";
import { Install } from "@/public/icons/AppIcons";
import { BotConfig } from "@/types/common";
import { useRouter } from "next/navigation";
import { API_ROUTES } from "@/constants/apiRoutes";
import { useFeatureAccess } from "@/providers/PricingContext";
import { useEffect, useState } from "react";
import { Copy, Globe, CheckCircle2, BarChart3, HelpCircle } from "lucide-react";

interface WizardStep5Props {
  botConfig: BotConfig;
  activeSubscription: number;
}

export function WizardStep5({ botConfig, activeSubscription }: WizardStep5Props) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [installCode, setInstallCode] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [baleToken, setBaleToken] = useState<string>("");
  const [knowledgeCount, setKnowledgeCount] = useState<number>(0);
  const [isBaleEditing, setIsBaleEditing] = useState(!botConfig?.bale_enabled);
  const { loading } = useAuth();
  // console.log("aaa", botConfig.knowledge);
  console.log("step5 subsc: ", activeSubscription);

  useEffect(() => {
    const fetchCode = async () => {
      try {
        setIsLoading(true);
        const res = await axiosInstance.get(
          API_ROUTES.BOTS.GET_EMBED(botConfig.uuid)
        );
        setInstallCode(res.data?.data?.embed_script || "");
      } catch (err) {
        console.error("خطا در دریافت کد نصب:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCode();
  }, [botConfig.uuid]);

  useEffect(() => {
    if (!botConfig.uuid) return;

    loadQaCount();
  }, [botConfig.uuid]);

  const copyToClipboard = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(installCode);
      } else {
        // fallback: create hidden textarea
        const textArea = document.createElement("textarea");
        textArea.value = installCode;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const getLanguageTitle = (value: string) => {
    if (value == "arabic") return "عربی";
    else if (value == "turkish") return "ترکی";
    else if (value == "english") return "انگلیسی";
    else return "فارسی";
  };

  const handleBaleLink = async () => {
    if (!baleToken || baleToken.length === 0) return;
    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append("uuid", botConfig.uuid);
      formData.append("bale_token", baleToken);
      console.log("1", formData);
      const res = await axiosInstance.put(
        `${API_ROUTES.BOTS.SAVE}/${botConfig.uuid}`,
        formData
      );
      console.log("2", res);
      if (res.data.success) {
        toast.success("اطلاعات ثبت شد");
        setIsBaleEditing(true);
      } else toast.error("خطا در ثبت اطلاعات");
    } catch (error: any) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || "خطایی در ذخیره رخ داده است.";

      toast.info(errorMessage);

      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const loadQaCount = async () => {
    setIsLoading(true);
    setKnowledgeCount(0);
    try {
      try {
        const response = await axiosInstance.get(
          API_ROUTES.KNOWLEDGE.DOCUMENT(botConfig.uuid)
        );

        const data =
          response?.data?.data?.filter((item: any) => item.status === "done")
            .length ?? 0;

        // console.log("dat", data);
        setKnowledgeCount(data);
      } catch (apiError: any) {
        console.warn("API fetch failed, using local data:", apiError);
      }
    } catch (error) {
      console.warn("خطا در بارگذاری اطلاعات ذخیره شده:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const { allowed: canBaleIntegration, loading: canBaleIntegrationLoading } =
    useFeatureAccess(
      botConfig?.uuid,
      "bale_integration",
      activeSubscription ?? 0
    );
  if (canBaleIntegrationLoading) return <PageLoader />;

  return (
    <div className="bg-white w-full rounded-2xl border-2 border-brand-primary/20 shadow overflow-hidden">
      <div className="p-7 space-y-8 cursor-default">
        {/* Header Section */}
        <div className="flex gap-4 px-0 py-3 items-center justify-start ">
          <div className=" w-12 h-12 bg-success/10 rounded-2xl flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-success" />
          </div>
          <div className="text-2xl font-bold text-grey-900 text-right ">
            تبریک! آیوا آماده نصب و راه اندازی است
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-blend-overlay border-2 rounded-2xl border-[#d1d5db] p-6 bg-linear-to-b from-[#E3F3F082] to-[#FBF4F4] gap-4 ">
          {loading || (isloading && <PageLoader />)}
          <div className="bg-primary/10  rounded-2xl border border-primary p-6 ">
            <div className="flex items-center justify-start gap-2 mb-5">
              <div className="w-6 h-6 text-primary">
                <Image
                  src="/logo.webp"
                  height={64}
                  width={64}
                  alt="آیوا"
                  priority
                  className="w-8 h-8 object-cover rounded-full"
                />
              </div>
              <div className="font-semibold  text-grey-900">خلاصه تنظیمات</div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex justify-start items-center">
                <div
                  className="size-2 ml-2 rounded-full"
                  style={{ backgroundColor: botConfig.primary_color }}
                ></div>
                <div className=" text-grey-600 pl-2">نام دستیار:</div>
                <span className="text-base font-medium text-grey-900">
                  {botConfig.name}
                </span>
              </div>

              <div className="flex justify-start items-center">
                <div
                  className="size-2 ml-2 rounded-full"
                  style={{ backgroundColor: botConfig.primary_color }}
                ></div>
                <div className=" text-grey-600 pl-2">زبان:</div>
                <span className="text-base font-medium text-grey-900">
                  {getLanguageTitle(botConfig.language)}
                </span>
              </div>

              <div className="flex justify-start items-center">
                <div
                  className="size-2 ml-2 rounded-full"
                  style={{ backgroundColor: botConfig.primary_color }}
                ></div>
                <div className=" text-grey-600 pl-2"> منابع دانش:</div>
                <span className="text-base font-medium text-grey-900">
                  {(knowledgeCount || 0).toLocaleString("fa-IR")}
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
                <Globe className="w-6 h-6 text-brand-primary mb-1.5" />
                <p className="text-base text-grey-900 mb-1">HTML/JavaScript</p>
                <p className="text-base text-grey-600">برای اکثر سایت‌ها</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bale */}
        <div className="border-2 border-[#d1d5db] p-6 rounded-2xl">
          <div className="flex gap-2 m-2 items-center">
            <Image src="/icons/bale.svg" alt="bale" width={16} height={16} />
            بله
            {!canBaleIntegration && <LockFeature feature="bale_integration" />}
          </div>

          <div
            className={`flex flex-col gap-3 transition ${
              !canBaleIntegration ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            {botConfig.bale_enabled && !isBaleEditing ? (
              <div className="flex items-center justify-between p-4 border rounded-2xl bg-gray-100">
                <div className="text-gray-700 text-sm">
                  توکن ربات بله ثبت شده است
                </div>

                <button
                  onClick={() => setIsBaleEditing(true)}
                  className="text-brand-primary text-sm underline cursor-pointer"
                >
                  ویرایش
                </button>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row justify-between items-center gap-3">
                <div className="flex  items-center text-gray-900">
                  توکن ربات بله را وارد کنید
                </div>
                <Input
                  id="bale_code"
                  type="text"
                  value={baleToken || ""}
                  onChange={(e) => setBaleToken(e.target.value)}
                  className="w-full text-left text-sm rounded-2xl p-4 border bg-white text-grey-900"
                  maxLength={200}
                />
              </div>
            )}
            {isBaleEditing && (
              <div className="flex items-center gap-4 justify-end mt-4">
                <Button
                  variant="primary"
                  onClick={handleBaleLink}
                  icon="arrow-right"
                  iconPosition="right"
                  disabled={!canBaleIntegration}
                  className="px-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? "در حال ثبت" : "ثبت"}
                </Button>

                {/* دکمه کنسل */}
                <Button
                  variant="tertiary"
                  size="sm"
                  onClick={() => {
                    setIsBaleEditing(false);
                    setBaleToken(botConfig.bale_token || "");
                  }}
                >
                  انصراف
                </Button>
              </div>
            )}

            {/* {isBaleEditing && (
              <div className="text-left mt-4">
                <Button
                  variant="primary"
                  onClick={handleBaleLink}
                  icon="arrow-right"
                  iconPosition="right"
                  disabled={!bale_integration}
                  className="px-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? "در حال ثبت" : "ثبت"}
                </Button>
              </div>
            )} */}
          </div>
        </div>

        {/* کد نصب */}
        <div className="border-2 border-[#d1d5db] p-6 rounded-2xl">
          <div className=" mb-8">کد نصب</div>

          <div className="space-y-6">
            <div className="space-y-3">
              <div className="relative">
                <div className="bg-brand-secondary rounded-2xl p-4 pr-12 lg:pr-12 h-56 overflow-y-auto">
                  <div className="text-white text-sm leading-6 font-mono ltr text-left break-all">
                    {installCode}
                  </div>
                </div>

                <div className="absolute top-3 right-2 flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]  cursor-pointer"
                    title="کپی کردن کد"
                  >
                    {copied ? (
                      <CheckCircle2 className="w-4 h-4 text-success" />
                    ) : (
                      <Copy className="w-4 h-4 text-brand-primary" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-[12px]">
              <p className="text-base text-grey-900 text-right">
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
                      {(index + 1).toLocaleString("fa-IR")}
                    </span>
                    <span className="  text-grey-700 flex-1">{step}</span>
                  </li>
                ))}
              </ol>

              <div className="bg-brand-tertiary/10 border border-brand-tertiary/20 rounded-lg p-3">
                <p className="text-base text-brand-tertiary leading-6 text-right">
                  💡 نکته: پس از نصب، ممکن است تا چند دقیقه طول بکشد تا دستیار
                  در سایت شما فعال شود.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-[20px] border-2 border-grey-300 p-6 flex flex-col gap-4 items-center justify-start">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-5 h-5 text-brand-primary" />
              <span className="text-base text-grey-900">مرحله بعد</span>
            </div>
            <p className="text-base text-grey-600 text-center leading-6">
              مدیریت و بهبود عملکرد دستیار از طریق داشبورد
            </p>
            <button
              onClick={() => router.push("dashboard")}
              className="bg-brand-primary rounded-sm shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] h-12 w-full flex items-center justify-center text-white text-base  cursor-pointer"
              title="رفتن به داشبورد"
            >
              رفتن به داشبورد
            </button>
          </div>

          {/* Support Card */}
          <div className="bg-white rounded-[20px] border-2 border-grey-300 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)] p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-brand-tertiary" />
              <span className="text-base text-grey-900">پشتیبانی</span>
            </div>
            <div className="flex-1">
              <p className="text-base text-grey-600 text-right leading-6">
                تیم پشتیبانی آیوا آماده کمک به شماست
              </p>
            </div>
            {/* <a
              href="tel:09903202903"
              className="bg-white border-2 border-brand-primary rounded-sm h-12 w-full flex items-center justify-center text-brand-primary text-base  cursor-pointer"
              title="تماس با پشتیبانی"
            >
              ۰۹۹۰۳۲۰۲۹۰۳
            </a> */}
            {/* موبایل */}
            <a
              href="tel:09903202903"
              className="md:hidden bg-white border-2 border-brand-primary rounded-sm h-12 w-full flex items-center justify-center text-brand-primary text-base"
            >
              ۰۹۹۰۳۲۰۲۹۰۳
            </a>

            {/* دسکتاپ */}
            <a
              href="/contact"
              className="hidden md:flex bg-white border-2 border-brand-primary rounded-sm h-12 w-full items-center justify-center text-brand-primary text-base"
            >
              ۰۹۹۰۳۲۰۲۹۰۳
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
