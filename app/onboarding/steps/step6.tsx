"use client ";

import Image from "next/image";
import PageLoader from "@/components/pageLoader";
import ColorPicker from "@/components/color-picker";
import LockFeature from "../LockFeature";
import axiosInstance from "@/lib/axiosInstance";
import { Card } from "@/components/card";
import { toast } from "sonner";
import { BotConfig } from "@/types/common";
import { API_ROUTES } from "@/constants/apiRoutes";
import { onboardingData } from "../onboarding.data";
import { useFeatureAccess } from "@/providers/PricingContext";
import { useState, useEffect, useRef } from "react";
import {
  Appearance,
  StepChatButton,
  StepColor,
  StepLogin,
  StepStar,
  StepUpload,
} from "@/public/icons/AppIcons";

const colorPalette1 = [
  "#ec4899",
  "#8b5cf6",
  "#22c55e",
  "#3b82f6",
  "#f5a623",
  "#4ca7a5",
  "#eb6e5b",
];

interface WizardStep6Props {
  botConfig: BotConfig;
  logoFile: File | null;
  errors?: { [key: string]: string };
  setLogoFile: (file: File | null) => void;
  updateConfig: (updates: Partial<BotConfig>) => void;
}

export function WizardStep6({
  botConfig,
  updateConfig,
  errors,
  setLogoFile,
}: WizardStep6Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedTone, setSelectedTone] = useState(botConfig.tone);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { allowed: canUploadLogo, loading: canUploadLogoLoading } =
    useFeatureAccess(botConfig?.uuid, "chatbot_logo");

  useEffect(() => {
    if (botConfig.logo_url) setPreview(botConfig.logo_url);
  }, [botConfig]);

  useEffect(() => {
    if (botConfig?.tone && botConfig.tone !== selectedTone) {
      setSelectedTone(botConfig.tone);
    }
  }, [botConfig?.tone]);

  const handleToneChange = (toneId: string) => {
    setSelectedTone(toneId);
    updateConfig({ tone: toneId });
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = 3 * 1024 * 1024; // 3MB
    if (file.size > maxSize) {
      toast.error("حجم فایل نباید بیشتر از ۳ مگابایت باشد  ");
      e.target.value = "";
      return;
    }

    const allowedTypes = ["image/png", "image/jpeg", "image/svg+xml"];
    if (!allowedTypes.includes(file.type)) {
      toast.warning("فقط فایل‌های PNG، JPG یا SVG مجاز هستند");
      e.target.value = "";
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    // به‌روزرسانی لوگو در state
    updateConfig({ logo_url: previewUrl });
    setLogoFile(file);
    //   نمایش پیش‌نمایش
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);

    // اگر uuid هنوز ساخته نشده نیازی به آپلود نیست
    if (!botConfig.uuid) return;

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await axiosInstance.post(
        API_ROUTES.BOTS.LOGO_UPLOAD(botConfig.uuid),
        formData
      );

      toast.success("فایل با موفقیت آپلود شد ✅");
      // console.log("Upload logo response:", res.data);
    } catch (err: any) {
      console.error("Upload failed:", err);
      toast.error(
        "خطا در آپلود فایل: " + (err.response?.data?.message || err.message)
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handlePrimaryColor = (color: string) => {
    updateConfig({ primary_color: color });
  };

  const handleDeleteLogo = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    try {
      setPreview(null);
      setLogoFile(null);

      const formData = new FormData();
      // ارسال مقدار خالی برای حذف لوگو
      formData.append(
        "file",
        new Blob([], { type: "application/octet-stream" })
      );
      formData.append("logo_path", "");

      const res = await axiosInstance.put(
        `${API_ROUTES.BOTS.SAVE}/${botConfig.uuid}`,
        formData
      );

      if (res.status !== 200 || !res.data.success) {
        toast.error("خطا در حذف فایل");
        return;
      }

      updateConfig({ logo_url: "" });
      toast.success("لوگو با موفقیت حذف شد");
    } catch (err) {
      console.error(err);
      toast.error("خطا در حذف فایل");
    }
  };

  const handleAccentColor = (color: string) => {
    updateConfig({ accent_color: color });
  };

  if (canUploadLogoLoading) return <PageLoader />;

  return (
    <div className="space-y-8 bg-bg-surface px-5 py-4 border-2 border-brand-primary/20 rounded-xl shadow-lg ">
      {/* Header */}
      <div className="flex items-start gap-4 px-0 py-3">
        {/* {loading && <PageLoader />} */}
        <div className="w-16 h-16 bg-brand-primary/10 rounded-xl flex items-center justify-center shrink-0">
          <div className="w-8 h-8 text-primary">
            <Appearance />
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-grey-900 mb-2 text-right text-lg font-bold">
            تنظیمات ظاهری دستیار
          </h2>
          <p className="text-grey-600 text-right">
            مشخصات ظاهری چت‌بات خود را تعریف کنید
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Personality Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-6 bg-brand-secondary/10 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-brand-secondary"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <h3 className="text-grey-900 text-base">شخصیت و ظاهر چت‌بات</h3>
          </div>

          {/* Tone Selection */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-3">
            {onboardingData.tones.map((tone: any) => (
              <div
                key={tone.id}
                className={`p-3 cursor-pointer border-2 rounded-lg transition
            ${
              selectedTone === tone.id
                ? "border-brand-primary bg-brand-primary/5 shadow-md"
                : "border-border-soft hover:border-brand-primary/30"
            }`}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleToneChange(String(tone.id));
                }}
              >
                <div className="flex items-start gap-2">
                  {/* دایره رادیو */}
                  <div
                    className={`
                w-4 h-4 rounded-full border-2 flex items-center justify-center mt-0.5
                ${
                  selectedTone === tone.id
                    ? "border-brand-primary bg-brand-primary"
                    : "border-grey-300"
                }
              `}
                  >
                    {selectedTone === tone.id && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>

                  {/* متن */}
                  <div className="flex-1 min-w-0 text-right">
                    <h4 className="text-grey-900 text-sm mb-1 font-bold">
                      {tone.name}
                    </h4>
                    <p className="text-grey-600 text-xs mb-2 text-[13px]">
                      {tone.description}
                    </p>
                    <div className="bg-white/70 p-2 rounded-lg border border-grey-100">
                      <p className="text-grey-700 text-xs italic text-right line-clamp-2 text-[13px]">
                        {tone.example}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* primary Color  */}
          <div className="mt-6 flex-col">
            <div className="flex items-center gap-2 mb-3 ">
              <div className="w-6 h-6 bg-brand-primary/10 rounded-lg flex items-center justify-center">
                <StepColor />
              </div>
              <h4 className="text-grey-900 text-sm font-bold">رنگ‌ چت‌بات</h4>
            </div>

            <div className="flex flex-col lg:flex-row w-full my-3 justify-between">
              <div className="flex flex-col gap-2 p-2">
                <div>رنگ انتخابی</div>
                <div className="flex items-center">
                  <div
                    className="relative rounded-full size-8"
                    style={{ backgroundColor: botConfig.primary_color }}
                  >
                    <div
                      aria-hidden="true"
                      className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-full shadow"
                    />
                  </div>
                  <input
                    type="text"
                    value={botConfig.primary_color}
                    onChange={(e) => handlePrimaryColor(e.target.value)}
                    placeholder="فرمت قابل قبول کد رنگ 6رقمی"
                    dir="ltr"
                    maxLength={7}
                    className={`w-32 p-2 mx-2 border-2 rounded-2xl  text-gray-900 bg-transparent outline-none  placeholder:text-gray-400 ${
                      errors?.primary_color
                        ? " border-red-500"
                        : " border-primary "
                    }`}
                  />
                </div>
              </div>
              <div>
                <ColorPicker
                  value={botConfig.primary_color}
                  onChange={handlePrimaryColor}
                  showAlpha={false}
                  presets={colorPalette1}
                />
              </div>
            </div>
          </div>

          {/* accent Color  */}
          <div className="mt-6 flex-col">
            <div className="flex items-center gap-2 mb-3 ">
              <div className="w-6 h-6 bg-brand-primary/10 rounded-lg flex items-center justify-center">
                <StepColor />
              </div>
              <h4 className="text-grey-900 text-sm font-bold">
                رنگ پس‌زمینه چت
              </h4>
            </div>

            <div className="flex   flex-col lg:flex-row  w-full  my-3 justify-between">
              <div className="flex flex-col gap-2 p-2">
                <div>رنگ انتخابی</div>
                <div className="flex items-center">
                  <div
                    className="relative rounded-full size-8"
                    style={{ backgroundColor: botConfig.accent_color }}
                  >
                    <div
                      aria-hidden="true"
                      className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-full shadow"
                    />
                  </div>
                  <input
                    type="text"
                    value={botConfig.accent_color}
                    onChange={(e) => handleAccentColor(e.target.value)}
                    placeholder="فرمت قابل قبول کد رنگ 6رقمی"
                    dir="ltr"
                    maxLength={7}
                    className={`w-32 p-2 mx-2 border-2 rounded-2xl  text-gray-900 bg-transparent outline-none  placeholder:text-gray-400 ${
                      errors?.accent_color
                        ? " border-red-500"
                        : " border-primary "
                    }`}
                  />
                </div>
              </div>
              <div>
                <ColorPicker
                  value={botConfig.accent_color}
                  onChange={handleAccentColor}
                  showAlpha={false}
                  presets={colorPalette1}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Chat Button Settings */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-brand-purple/10 rounded-lg flex items-center justify-center">
              <StepChatButton />
            </div>
            <h3 className="text-grey-900">تنظیمات دکمه چت</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-6">
            {/* Chat Button Size */}
            <div className="form-group">
              <label className="block text-grey-900 mb-3">
                اندازه دکمه چت
                <span className="text-brand-primary ml-1">*</span>
              </label>
              <div className="grid grid-cols-1 gap-1 lg:gap-2">
                {onboardingData.sizeOptions.map((size) => (
                  <div
                    key={size.id}
                    className={`
                      p-4 cursor-pointer border-2 rounded-3xl border-gray-200 shadow
                      
                    `}
                    onClick={() => updateConfig({ button_size: size.id })}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`
                        w-4 h-4 rounded-full border-2 flex items-center justify-center
                        ${
                          botConfig.button_size === size.id
                            ? "border-brand-primary bg-brand-primary"
                            : "border-grey-300"
                        }
                      `}
                      >
                        {botConfig.button_size === size.id && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>

                      <div className="flex-1 text-right">
                        <h4 className="text-grey-900 text-sm font-medium">
                          {size.name}
                        </h4>
                      </div>

                      {/* Size Preview */}
                      <div className="flex items-center justify-center">
                        <div
                          className={`bg-brand-primary rounded-full flex items-center justify-center ${
                            size.id === "small"
                              ? "w-8 h-8"
                              : size.id === "medium"
                              ? "w-10 h-10"
                              : "w-12 h-12"
                          }`}
                          style={{ backgroundColor: botConfig.primary_color }}
                        >
                          <svg
                            className={`text-white ${
                              size.id === "small"
                                ? "w-4 h-4"
                                : size.id === "medium"
                                ? "w-5 h-5"
                                : "w-6 h-6"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Button Position */}
            <div className="form-group">
              <label className="block text-grey-900 mb-3">
                موقعیت نمایش
                <span className="text-brand-primary ml-1">*</span>
              </label>
              <div className="grid grid-cols-1 gap-0 lg:gap-2">
                {onboardingData.positionOptions.map((position) => (
                  <button
                    key={position.id}
                    onClick={() =>
                      updateConfig({ widget_position: position.id })
                    }
                    className={`flex items-center gap-3 w-full text-right p-3 border-2 rounded-lg shadow-md transition
                      ${
                        botConfig.widget_position === position.id
                          ? "border-brand-primary bg-brand-primary/5"
                          : "border-grey-200 hover:border-brand-primary/40"
                      }`}
                  >
                    {/* دایره انتخاب */}
                    <div
                      className={`w-4 h-4 flex items-center justify-center rounded-full border-2 transition
                      ${
                        botConfig.widget_position === position.id
                          ? "border-brand-primary bg-brand-primary"
                          : "border-grey-300"
                      }`}
                    >
                      {botConfig.widget_position === position.id && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>

                    {/* توضیحات */}
                    <div className="flex-1 text-right">
                      <h4 className="text-grey-900 text-sm font-medium">
                        {position.name}
                      </h4>
                      <p className="text-grey-600 text-xs">
                        {position.description}
                      </p>
                    </div>

                    {/* پیش‌نمایش موقعیت */}
                    <div className="relative w-12 h-8 bg-grey-100 rounded border overflow-hidden">
                      <div
                        className={`absolute w-3 h-3 rounded-full transition
                          ${
                            position.id === "bottom_right"
                              ? "bottom-0.5 right-0.5"
                              : "bottom-0.5 left-0.5"
                          }`}
                        style={{ backgroundColor: botConfig.primary_color }}
                      ></div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Logo Upload Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-brand-emerald/10 rounded-lg flex items-center justify-center">
              <StepLogin />
            </div>
            <h3 className="text-grey-900 cursor-not-allowed ">لوگوی چت‌بات </h3>
            {!canUploadLogo && <LockFeature feature="chatbot_logo" />}
          </div>
          <Card
            disable={!canUploadLogo}
            className="p-4 border-0! hover:bg-grey-50  text-center"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".png,.jpg,.jpeg,.svg"
              className="hidden"
              onChange={handleFileSelect}
            />

            {preview ? (
              <div className="space-y-3">
                <div className="w-16 h-16 mx-auto bg-grey-100 rounded-lg flex items-center justify-center overflow-hidden">
                  <Image
                    src={preview}
                    alt="لوگوی انتخاب شده"
                    className="w-full h-full object-contain"
                    width={64}
                    height={64}
                    unoptimized
                  />
                </div>
                <p className="text-grey-700 text-sm">
                  {isUploading ? "در حال آپلود..." : "لوگو انتخاب شده"}
                </p>
                {!isUploading && (
                  <div className="flex gap-2 justify-center">
                    <button
                      type="button"
                      onClick={(e) => {
                        handleDeleteLogo(e);
                      }}
                      className="px-3 py-1 text-xs bg-danger/10 text-danger rounded-lg hover:bg-danger/20"
                    >
                      حذف
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                      className="px-3 py-1 text-xs bg-brand-primary/10 text-brand-primary rounded-lg hover:bg-brand-primary/20"
                    >
                      تغییر
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="w-12 h-12 bg-grey-200 rounded-lg flex items-center justify-center mx-auto">
                  <StepUpload />
                </div>
                <div>
                  <p className="text-grey-700 text-sm mb-1">آپلود لوگو</p>
                  <p className="text-grey-500 text-xs">
                    PNG، JPG یا SVG • حداکثر ۳ مگابایت
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="cursor-pointer px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary/90 text-sm"
                >
                  انتخاب فایل
                </button>
              </div>
            )}
          </Card>

          <div className="bg-bg-soft-mint p-3 rounded-lg">
            <div className="flex items-start gap-2">
              <StepStar />
              <p className="text-grey-600 text-xs">
                لوگو در کنار دکمه چت نمایش داده می‌شود و اعتماد کاربران را
                افزایش می‌دهد
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
