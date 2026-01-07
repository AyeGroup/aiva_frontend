"use client";
import { Input } from "@/components/input";
import { useEffect } from "react";
import { BotConfig } from "@/types/common";
import { useFeatureAccess } from "@/providers/PricingContext";
import { Settings, MessageSquare, Shield } from "lucide-react";
import PageLoader from "@/components/pageLoader";
import LockFeature from "../LockFeature";
import ToggleSetting from "@/components/toggle-setting";
import ThreeLevelSlider from "@/components/ThreeLevelSlider";

interface WizardStep3Props {
  botConfig: BotConfig;
  updateConfig: (updates: Partial<BotConfig>) => void;
  onPermissionsChange?: (permissions: {
    canChatbotK: boolean;
    canChatbotEmoji: boolean;
    canChatbotGreetings: boolean;
    canChatbotanswerLength: boolean;
    canChatbotSupportPhone: boolean;
    canChoosing_llm: boolean;
  }) => void;
}
const AnswerLength = ["short", "medium", "long"];
const LlmModel = ["gpt-4o", "gpt-4o-mini"];

export function WizardStep3({
  botConfig,
  updateConfig,
  onPermissionsChange,
}: WizardStep3Props) {
  const { allowed: canChatbotK, loading: canChatbotKLoading } =
    useFeatureAccess(botConfig?.uuid, "chatbot_k");
  const {
    allowed: canChatbotanswerLength,
    loading: canChatbotanswerLengthLoading,
  } = useFeatureAccess(botConfig?.uuid, "chatbot_answer_length");
  const { allowed: canChatbotGreetings, loading: canChatbotGreetingsLoading } =
    useFeatureAccess(botConfig?.uuid, "chatbot_greetings");
  const { allowed: canChatbotEmoji, loading: canChatbotEmojiLoading } =
    useFeatureAccess(botConfig?.uuid, "chatbot_emoji");
  const {
    allowed: canChatbotSupportPhone,
    loading: canChatbotSupportPhoneLoading,
  } = useFeatureAccess(botConfig?.uuid, "chatbot_support_phone");

  const { allowed: canChoosing_llm, loading: canChoosing_llmLoading } =
    useFeatureAccess(botConfig?.uuid, "choosing_llm");

  useEffect(() => {
    if (
      onPermissionsChange &&
      !canChatbotKLoading &&
      !canChatbotEmojiLoading &&
      !canChatbotGreetingsLoading &&
      !canChatbotanswerLengthLoading &&
      !canChatbotSupportPhoneLoading &&
      !canChoosing_llmLoading
    ) {
      onPermissionsChange({
        canChatbotK,
        canChatbotEmoji,
        canChatbotGreetings,
        canChatbotanswerLength,
        canChatbotSupportPhone,
        canChoosing_llm,
      });
    }
  }, [
    canChatbotK,
    canChatbotEmoji,
    canChatbotGreetings,
    canChatbotanswerLength,
    canChatbotSupportPhone,
    onPermissionsChange,
    canChatbotKLoading,
    canChoosing_llm,
    canChoosing_llmLoading,
    canChatbotEmojiLoading,
    canChatbotGreetingsLoading,
    canChatbotanswerLengthLoading,
    canChatbotSupportPhoneLoading,
  ]);

  if (!botConfig.uuid) return null;
  if (
    canChatbotKLoading ||
    canChatbotEmojiLoading ||
    canChatbotGreetingsLoading ||
    canChatbotanswerLengthLoading ||
    canChoosing_llmLoading ||
    canChatbotSupportPhoneLoading
  )
    return <PageLoader />;
  console.log("canChoosing_llm", canChoosing_llm);
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

      {/* llm */}
      <div className="space-y-4">
        <div className="flex">
          <h3 className="text-grey-900 font-semibold flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-brand-primary" />
            مدل هوش مصنوعی
          </h3>
          {!canChoosing_llm && <LockFeature feature="choosing_llm" />}
        </div>

        <div
          className={`grid grid-cols-3 gap-4 ${
            canChoosing_llm ? "" : "pointer-events-none opacity-50"
          }`}
        >
          {LlmModel.map((model) => (
            <button
              key={model}
              onClick={() => updateConfig({ llm_model: model })}
              className={`p-4 rounded-lg border-2 transition-all ${
                botConfig.llm_model === String(model)
                  ? "border-brand-primary bg-brand-primary/5"
                  : "border-border-soft hover:border-brand-primary/50"
              }`}
            >
              <div className="text-center text-grey-600 text-body-small">
                {model === "gpt-4o" ? "دقیق" : "سریع"}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Response Style */}
      <div className="space-y-4 mt-4">
        <div className="flex">
          <h3 className="text-grey-900 font-semibold flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-brand-primary" />
            میزان انطباق پاسخ با اسناد
          </h3>
          {!canChatbotK && <LockFeature feature="chatbot_k" />}
        </div>

        <div
          className={`${canChatbotK ? "" : "pointer-events-none opacity-50"}`}
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
          {!canChatbotanswerLength && (
            <LockFeature feature="chatbot_answer_length" />
          )}
        </div>

        <div
          className={`grid grid-cols-3 gap-4 ${
            canChatbotanswerLength ? "" : "pointer-events-none opacity-50"
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
        </div>
        {/* Auto Greeting */}
        <div className="space-y-3">
          <div className="py-4">
            <div className="mr-32">
              {!canChatbotGreetings && (
                <LockFeature feature="chatbot_greetings" />
              )}
            </div>
            <ToggleSetting
              label="خوشامدگویی خودکار"
              description="پیام خوشامد به صورت خودکار نمایش یابد"
              value={botConfig.greetings}
              disabled={!canChatbotGreetings}
              onToggle={() => updateConfig({ greetings: !botConfig.greetings })}
            />
          </div>
          <div className="py-4">
            <div className="mr-28">
              {!canChatbotEmoji && <LockFeature feature="chatbot_emoji" />}
            </div>
            <ToggleSetting
              label="استفاده از ایموجی"
              description="ایموجی در پاسخ‌ها استفاده شود"
              disabled={!canChatbotEmoji}
              value={!botConfig.use_emoji}
              onToggle={() => updateConfig({ use_emoji: !botConfig.use_emoji })}
            />
          </div>
        </div>
        <div className="-mb-4 mr-28">
          {!canChatbotSupportPhone && (
            <LockFeature feature="chatbot_support_phone" />
          )}
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center text-gray-900">
            شماره تماس
            <span className="text-gray-400 text-xs pr-0.5 lg:pr-2">
              اختیاری
            </span>
          </div>

          <Input
            id="phone"
            type="text"
            disabled={!canChatbotSupportPhone}
            numeric={true}
            inputMode="numeric"
            value={botConfig.support_phone || ""}
            onChange={(e) => updateConfig({ support_phone: e.target.value })}
            placeholder="شماره پشتیبانی را وارد کنید"
            className="w-full text-sm rounded-2xl p-2 lg:p-4 border bg-white! text-grey-900 placeholder-grey-500 transition-all focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:outline-none ltr  border-grey-300 focus:border-brand-primary text-center!"
            maxLength={16}
          />
        </div>
      </div>
    </div>
  );
}
