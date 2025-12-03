"use client";
import { Input } from "@/components/input";
import { BotConfig } from "@/types/common";
import { Settings, MessageSquare, Shield } from "lucide-react";
import ToggleSetting from "@/components/toggle-setting";
import ThreeLevelSlider from "@/components/ThreeLevelSlider";
import LockFeature from "../LockFeature";
import { useFeatureAccess } from "@/providers/PricingContext";

interface WizardStep3Props {
  botConfig: BotConfig;
  updateConfig: (updates: Partial<BotConfig>) => void;
}
const AnswerLength = ["short", "medium", "long"];

export function WizardStep3({ botConfig, updateConfig }: WizardStep3Props) {
  const can_advanced_stats = useFeatureAccess(botConfig.uuid,"advanced_stats");

  return (
    <div className="space-y-8 bg-bg-surface px-5 py-4 border-2 border-brand-primary/20 rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex items-start gap-4 py-3">
        <div className="w-16 h-16 bg-brand-primary/10 rounded-xl flex items-center justify-center">
          <Settings className="w-8 h-8 text-brand-primary" />
        </div>
        <div className="flex-1 text-right">
          <h2 className="text-grey-900 mb-2 text-[24px] font-bold">
            تنظیمات پاسخ‌گویی
          </h2>

          <p className="text-grey-600">
            رفتار و قوانین پاسخ‌گویی چت‌بات خود را تنظیم کنید
          </p>
        </div>
      </div>

      {/* Response Style */}
      <div className="space-y-4">
        <div className="flex">
          <h3 className="text-grey-900 font-semibold flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-brand-primary" />
            میزان انطباق پاسخ با اسناد
          </h3>
          {!can_advanced_stats && <LockFeature feature="advanced_stats" />}
        </div>

        <div
          className={`  ${
            can_advanced_stats ? "" : "pointer-events-none opacity-50"
          }`}
        >
          <ThreeLevelSlider
            value={botConfig.k}
            onChange={(val) => {
              updateConfig({ k: val });
            }}
          />
        </div>
      </div>

      {/* Response Length */}
      <div className="space-y-4">
        <div className="flex">
          <h3 className="text-grey-900 font-semibold flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-brand-primary" />
            حداکثر طول پاسخ
          </h3>
          {!can_advanced_stats && <LockFeature feature="advanced_stats" />}
        </div>

        <div
          className={`grid grid-cols-3 gap-4 ${
            can_advanced_stats ? "" : "pointer-events-none opacity-50"
          }`}
        >
          {AnswerLength.map((length) => (
            <button
              key={length}
              onClick={() => updateConfig({ answer_length: length })}
              className={`p-4 rounded-lg border-2 transition-all ${
                botConfig.answer_length === String(length)
                  ? "border-brand-primary bg-brand-primary/5"
                  : "border-border-soft hover:border-brand-primary/50"
              }`}
            >
              <div className="text-center text-grey-600 text-body-small">
                {length === "short"
                  ? "کوتاه"
                  : length === "medium"
                  ? "متوسط"
                  : "بلند"}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Settings */}
      <div className="space-y-4">
        <div className="flex">
          <h3 className="text-grey-900 font-semibold flex items-center gap-2">
            <Shield className="w-5 h-5 text-brand-primary" />
            تنظیمات پیشرفته
          </h3>
          {!can_advanced_stats && <LockFeature feature="advanced_stats" />}
        </div>
        {/* Auto Greeting */}
        <div
          className={`space-y-3 ${
            can_advanced_stats ? "" : "pointer-events-none opacity-50"
          }`}
        >
          <ToggleSetting
            label="خوشامدگویی خودکار"
            description="پیام خوشامد به صورت خودکار نمایش یابد"
            value={botConfig.greetings}
            onToggle={() => updateConfig({ greetings: !botConfig.greetings })}
          />

          <ToggleSetting
            label="استفاده از ایموجی"
            description="ایموجی در پاسخ‌ها استفاده شود"
            value={botConfig.use_emoji}
            onToggle={() => updateConfig({ use_emoji: !botConfig.use_emoji })}
          />
        </div>
        <div
          className={`flex justify-between items-center ${
            can_advanced_stats ? "" : "pointer-events-none opacity-50"
          }`}
        >  <div className="flex items-center text-gray-900">
            شماره تماس
            <span className="text-gray-400 text-xs pr-2">اختیاری</span>
          </div>
          <Input
            id="phone"
            type="text"
            numeric={true}
            inputMode="numeric"
            value={botConfig.support_phone || ""}
            onChange={
              (e) => updateConfig({ support_phone: e.target.value })
              // handleBehaviorChange("support_phone", e.target.value)
            }
            placeholder="شماره پشتیبانی را وارد کنید"
            className="w-full text-sm rounded-2xl p-4 border bg-white! text-grey-900 placeholder-grey-500 transition-all focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:outline-none ltr  border-grey-300 focus:border-brand-primary text-center!"
            maxLength={16}
          />
        </div>
      </div>
    </div>
  );
}
