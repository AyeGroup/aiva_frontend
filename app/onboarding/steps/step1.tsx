import { Input } from "@/components/input";
import { Select } from "@/components/select";
import { BotConfig } from "@/types/common";
import { onboardingData } from "../onboarding.data";
import { StepBigStar, StepUser } from "@/public/icons/AppIcons";
import { useState } from "react";

interface WizardStep1Props {
  botConfig: BotConfig;
   updateConfig: (updates: Partial<BotConfig>) => void;
}

export function WizardStep1({
  botConfig,
  updateConfig,
}: WizardStep1Props) {
  const [newItem, setNewItem] = useState("");
  return (
    <div
      className="space-y-8 bg-bg-surface px-5 py-4 border-2 border-brand-primary/20 rounded-xl shadow-lg "
      dir="rtl"
    >
      {/* Header */}
      <div className="flex items-start gap-4 px-0 py-3">
        <div className="w-16 h-16 bg-brand-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
          <StepBigStar />
        </div>
        <div className="flex-1">
          <h2 className="text-grey-900 mb-2 text-right text-lg font-bold">
            تنظیمات اولیه دستیار
          </h2>
          <p className="text-grey-600 text-right">
            شخصیت و ویژگی‌های پایه چت‌بات خود را تعریف کنید
          </p>
        </div>
      </div>

      <div className="space-y-1">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
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
                className={`w-full ${
                  !botConfig.name || botConfig.name.length == 0
                    ? "!border-red-400"
                    : ""
                }`}
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
                className={`w-full text-gray-800 ${
                  !botConfig.language ? "!border-red-400" : ""
                }`}
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
        </div>

        {/* Personality Section */}
        <div className="space-y-4">
          <div className="form-group">
            <label className="block text-grey-900 mb-3">
              توضیحات
              <span className="text-brand-primary ml-1">*</span>
            </label>
            <Input
              type="text"
              value={botConfig.description}
              onChange={(e) => updateConfig({ description: e.target.value })}
              placeholder="مثال: این ربات در سایت فروش عینک استفاده می شود"
              className={`w-full ${
                !botConfig.description || botConfig.description.length == 0
                  ? "!border-red-400"
                  : ""
              }`}
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="welcomeMessage"
              className="block text-grey-900 mb-3"
            >
              دستورالعمل‌ها <span className="text-brand-primary ml-1">*</span>
            </label>
            <textarea
              id="welcomeMessage"
              value={botConfig.guidelines}
              onChange={(e) => updateConfig({ guidelines: e.target.value })}
              placeholder="قوانین و مقررات را بنویسید"
              rows={3}
              className={`w-full px-4 py-3 border border-border-soft rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary resize-none ${
                !botConfig.guidelines || botConfig.guidelines.length == 0
                  ? "!border-red-400"
                  : ""
              }`}
            />
          </div>
          <div className="mt-4">
            <p className="text-grey-700 mb-3 text-body-small text-right text-[14px]">
              دستورالعمل‌های پیشنهادی
            </p>
            <div className="flex flex-wrap gap-2">
              {onboardingData.sampleGuidlines.map((content, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    updateConfig({
                      guidelines: botConfig.guidelines
                        ? botConfig.guidelines + "\n" + content
                        : content,
                    });
                  }}
                  className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-full border border-grey-200 hover:bg-brand-primary hover:text-white hover:border-brand-primary text-grey-700 text-body-small group"
                >
                  <svg
                    className="w-3 h-3 text-brand-primary group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="text-[13px] leading-tight">{content}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
