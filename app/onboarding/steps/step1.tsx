import Image from "next/image";
import { Card } from "@/components/card";
import { Input } from "@/components/input";
import { Select } from "@/components/select";
import { BotConfig } from "@/types/common";
import { ColorWheel } from "@/components/color-wheel";
import { onboardingData } from "../onboarding.data";
import { useState, useEffect } from "react";
import {
  StepBigStar,
  StepChatButton,
  StepCheck,
  StepColor,
  StepLogin,
  StepMessage,
  StepStar,
  StepUpload,
  StepUser,
} from "@/public/icons/AppIcons";

interface WizardStep1Props {
  botConfig: BotConfig;
  updateConfig: (updates: Partial<BotConfig>) => void;
}

export function WizardStep1({ botConfig, updateConfig }: WizardStep1Props) {
  const [selectedTone, setSelectedTone] = useState(botConfig.tone);
  const [isColorWheelOpen, setIsColorWheelOpen] = useState(false);

  useEffect(() => {
    setSelectedTone(botConfig.tone);
  }, [botConfig.tone]);

  const handleToneChange = (toneId: string) => {
    console.log("tone", toneId);
    setSelectedTone(toneId);
    updateConfig({ tone: toneId });
  };

  return (
    <div
      className="space-y-8 bg-bg-surface px-[20px] py-[16px] border-2 border-brand-primary/20 rounded-xl shadow-lg pt-[8px] pr-[20px] pb-[16px] pl-[20px]"
      dir="rtl"
    >
      {/* Header */}
      <div className="flex items-start gap-4 px-[0px] py-[12px]">
        <div className="w-16 h-16 bg-brand-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
          <StepBigStar />
        </div>
        <div className="flex-1">
          <h2 className="text-grey-900 mb-2 text-right text-[24px] font-bold">
            تنظیمات اولیه دستیار
          </h2>
          <p className="text-grey-600 text-right">
            شخصیت و ویژگی‌های پایه چت‌بات خود را تعریف کنید
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Basic Information Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center">
              <StepUser />
            </div>
            <h3 className="text-grey-900">اطلاعات پایه</h3>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Bot Name */}
            <div className="form-group">
              <label className="block text-grey-900 mb-3">
                نام دستیار
                <span className="text-brand-primary ml-1">*</span>
              </label>
              <Input
                type="text"
                value={botConfig.name}
                onChange={(e) => updateConfig({ name: e.target.value })}
                placeholder="مثال: آیوا، ربات مشاور"
                className="w-full"
              />
            </div>

            {/* Language Selection */}
            <div className="form-group">
              <label className="block text-grey-900 mb-3">
                زبان پیش‌فرض
                <span className="text-brand-primary ml-1">*</span>
              </label>
              <Select
                value={botConfig.language}
                onValueChange={(value) => updateConfig({ language: value })}
                placeholder="زبان را انتخاب کنید"
              >
                {onboardingData.languages.map((lang) => (
                  <option
                    key={lang.code}
                    value={lang.code}
                    disabled={lang.disabled}
                  >
                    {lang.name} ({lang.native})
                  </option>
                ))}
              </Select>
            </div>
          </div>

          {/* Description */}
        </div>

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
          <div className="grid grid-cols-2 gap-3">
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
                <div className="flex items-start gap-2" dir="rtl">
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

          {/* Color Selection */}
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-brand-primary/10 rounded-lg flex items-center justify-center">
                <StepColor />
              </div>
              <h4 className="text-grey-900 text-sm">رنگ اصلی چت‌بات</h4>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {onboardingData.colors.slice(0, -1).map((color) => (
                <button
                  key={color.value}
                  type="button"
                  title={`انتخاب رنگ ${color.name}`}
                  onClick={() => updateConfig({ color: color.value })}
                  className={`
                    relative w-full h-14 rounded-2xl border-3 
                    ${
                      botConfig.color === color.value
                        ? "ring-4 ring-grey-900/20 border-grey-900 shadow-lg scale-105"
                        : "border-white hover:border-grey-300 hover:scale-102 shadow-md"
                    }
                  `}
                  style={{ backgroundColor: color.value }}
                >
                  {botConfig.color === color.value && (
                    <>
                      {/* Outer ring for better visibility */}
                      <div className="absolute -inset-1 bg-grey-900 rounded-2xl opacity-20 -z-10"></div>

                      {/* Inner checkmark with better contrast */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                          <StepCheck />
                        </div>
                      </div>
                    </>
                  )}
                </button>
              ))}

              {/* Custom Color Picker Button */}
              <button
                type="button"
                title="انتخاب رنگ کاستوم"
                onClick={() => setIsColorWheelOpen(true)}
                className={`
                  relative w-full h-14 rounded-2xl border-3 overflow-hidden
                  hover:scale-102 shadow-md
                  ${
                    !onboardingData.colors.some(
                      (c) => c.value === botConfig.color
                    )
                      ? "ring-4 ring-brand-primary/20 border-brand-primary shadow-lg scale-105"
                      : "border-white hover:border-grey-300"
                  }
                `}
                style={{
                  background:
                    "conic-gradient(from 0deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080, #ff0000)",
                }}
              >
                {!onboardingData.colors.some(
                  (c) => c.value === botConfig.color
                ) ? (
                  <>
                    {/* Outer ring for better visibility */}
                    <div className="absolute -inset-1 bg-brand-primary rounded-2xl opacity-20 -z-10"></div>

                    {/* Inner checkmark with better contrast */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                        <svg
                          className="w-4 h-4 text-brand-primary"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm rounded-2xl"></div>
                )}
              </button>
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

          <div className="grid grid-cols-2 gap-6">
            {/* Chat Button Size */}
            <div className="form-group">
              <label className="block text-grey-900 mb-3">
                اندازه دکمه چت
                <span className="text-brand-primary ml-1">*</span>
              </label>
              <div className="grid grid-cols-1 gap-2">
                {onboardingData.sizeOptions.map((size) => (
                  <div
                    key={size.id}
                    className={`
                      p-3 cursor-pointer border-2
                      ${
                        botConfig.button_size === size.id
                          ? "border-brand-primary bg-brand-primary/5 shadow-md"
                          : "border-border-soft hover:border-brand-primary/30"
                      }
                    `}
                    onClick={() => updateConfig({ button_size: size.id })}
                  >
                    <div className="flex items-center gap-3" dir="rtl">
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
                        <p className="text-grey-600 text-xs">
                          {size.description}
                        </p>
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
                          style={{ backgroundColor: botConfig.color }}
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
              <div className="grid grid-cols-1 gap-2">
                {onboardingData.positionOptions.map((position) => (
                  <Card
                    key={position.id}
                    className={`
                      p-3 cursor-pointer border-2
                      ${
                        botConfig.widget_position === position.id
                          ? "border-brand-primary bg-brand-primary/5 shadow-md"
                          : "border-border-soft hover:border-brand-primary/30"
                      }
                    `}
                    onClick={() =>
                      updateConfig({ widget_position: position.id })
                    }

                    // onClick={() =>
                    //   updateConfig({
                    //     branding: {
                    //       ...botConfig.branding,
                    //       position: position.id as
                    //         | "bottom-right"
                    //         | "bottom-left",
                    //     },
                    //   })
                    // }
                  >
                    <div className="flex items-center gap-3" dir="rtl">
                      <div
                        className={`
                        w-4 h-4 rounded-full border-2 flex items-center justify-center
                        ${
                          botConfig.widget_position === position.id
                            ? "border-brand-primary bg-brand-primary"
                            : "border-grey-300"
                        }
                      `}
                      >
                        {botConfig.widget_position === position.id && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>

                      <div className="flex-1 text-right">
                        <h4 className="text-grey-900 text-sm font-medium">
                          {position.name}
                        </h4>
                        <p className="text-grey-600 text-xs">
                          {position.description}
                        </p>
                      </div>

                      {/* Position Preview */}
                      <div className="relative w-12 h-8 bg-grey-100 rounded border overflow-hidden">
                        <div
                          className={`absolute w-3 h-3 rounded-full ${
                            position.id === "bottom-right"
                              ? "bottom-0.5 right-0.5"
                              : "bottom-0.5 left-0.5"
                          }`}
                          style={{ backgroundColor: botConfig.color }}
                        ></div>
                      </div>
                    </div>
                  </Card>
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
            <h3 className="text-grey-900">لوگوی شرکت (اختیاری)</h3>
          </div>

          <Card className="p-4 !border-0 hover:bg-grey-50 cursor-pointer">
            <div className="text-center">
              {botConfig.logo ? (
                <div className="space-y-3">
                  <div className="w-16 h-16 mx-auto bg-grey-100 rounded-lg flex items-center justify-center overflow-hidden">
                    <Image
                      src={botConfig.logo}
                      alt="لوگوی انتخاب شده"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-grey-700 text-sm">لوگو آپلود شده</p>
                  <div className="flex gap-2 justify-center">
                    <button
                      type="button"
                      onClick={() => updateConfig({ logo: undefined })}
                      className="px-3 py-1 text-xs bg-danger/10 text-danger rounded-lg hover:bg-danger/20"
                    >
                      حذف
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        // In real implementation, this would open file picker
                        const newLogo = prompt("آدرس لوگوی جدید را وارد کنید:");
                        if (newLogo) {
                          updateConfig({
                            logo: newLogo,
                          });
                        }
                      }}
                      className="px-3 py-1 text-xs bg-brand-primary/10 text-brand-primary rounded-lg hover:bg-brand-primary/20"
                    >
                      تغییر
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-grey-200 rounded-lg flex items-center justify-center mx-auto">
                    <StepUpload />
                  </div>
                  <div>
                    <p className="text-grey-700 text-sm mb-1">
                      آپلود لوگوی شرکت
                    </p>
                    <p className="text-grey-500 text-xs">
                      PNG، JPG یا SVG • حداکثر ۲ مگابایت
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      // In real implementation, this would open file picker
                      const logoUrl = prompt(
                        "آدرس لوگو را وارد کنید (برای تست):"
                      );
                      if (logoUrl) {
                        updateConfig({ logo: logoUrl });
                      }
                    }}
                    className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary/90 text-sm"
                  >
                    انتخاب فایل
                  </button>
                </div>
              )}
            </div>
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

        {/* Custom Messages Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-brand-coral/10 rounded-lg flex items-center justify-center">
              <StepMessage />
            </div>
            <h3 className="text-grey-900">پیام‌های سفارشی</h3>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Welcome Message */}
            {/* Messages - Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label
                  htmlFor="welcomeMessage"
                  className="block text-grey-900 mb-3"
                >
                  پیام خوش‌آمدگویی
                  <span className="text-brand-primary ml-1">*</span>
                </label>
                <textarea
                  id="welcomeMessage"
                  value={botConfig.greetings}
                  onChange={(e) => updateConfig({ greetings: e.target.value })}
                  placeholder="سلام! چطور می‌تونم کمکتون کنم؟"
                  rows={3}
                  className="w-full px-4 py-3 border border-border-soft rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary resize-none"
                />
                <p className="text-grey-500 mt-2 text-body-small text-right">
                  اولین پیامی که کاربران می‌بینند
                </p>
              </div>

              <div className="form-group">
                <label
                  htmlFor="fallbackMessage"
                  className="block text-grey-900 mb-3"
                >
                  پیام عدم درک سؤال
                </label>
                <textarea
                  id="fallbackMessage"
                  value={botConfig.k}
                  onChange={(e) => updateConfig({ k: e.target.value })}
                  placeholder="متأسفانه نمی‌تونم پاسخ این سؤال رو بدم. لطفاً با پشتیبانی تماس بگیرید."
                  rows={3}
                  className="w-full px-4 py-3 border border-border-soft rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary resize-none"
                />
                <p className="text-grey-500 mt-2 text-body-small text-right">
                  زمانی که دستیار نمی‌تواند پاسخ دهد
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Info */}
      </div>

      {/* Color Wheel Modal */}
      <ColorWheel
        selectedColor={botConfig.color}
        onColorChange={(color) => updateConfig({ color })}
        onClose={() => setIsColorWheelOpen(false)}
        isOpen={isColorWheelOpen}
      />
    </div>
  );
}
