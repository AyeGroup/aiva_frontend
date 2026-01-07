"use client";
import { Input } from "@/components/input";
import { useState } from "react";
import { FormInput } from "lucide-react";
import { StepBigStar } from "@/public/icons/AppIcons";
import { ToggleSmall } from "@/components/toggleSmall";
import { TemplateModal } from "../TemplateModal";
import { onboardingData } from "../onboarding.data";
import { GenericSelector } from "@/components/selector";
import { BotConfig, SelectorItem } from "@/types/common";
import { useBot } from "@/providers/BotProvider";
import { prompt_templates, templates } from "../templates.data";

type TemplateTarget = "description" | "guidelines" | null;
const TEMPLATE_PLACEHOLDER = "__placeholder__";

export function WizardStep1({
  botConfig,
  updateConfig,
}: {
  botConfig: BotConfig;
  updateConfig: (updates: Partial<BotConfig>) => void;
}) {
  const [selectedTemplate, setSelectedTemplate] =
    useState<string>(TEMPLATE_PLACEHOLDER);
  const [templateTarget, setTemplateTarget] = useState<TemplateTarget>(null);
  const [nameMessage, setNameMessage] = useState("");
  const [editableText, setEditableText] = useState("");
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const { bots } = useBot();

  const TEMPLATE_OPTIONS = templates.map((t, i) => ({
    label: t.label,
    value: String(i),
    text: t.text,
  }));

  const PROMPT_TEMPLATE_OPTIONS = prompt_templates.map((t, i) => ({
    label: t.label,
    value: String(i),
    text: t.text,
  }));

  const TEMPLATE_OPTIONS_PLACEHOLDER = [
    {
      label: "انتخاب قالب آماده",
      value: TEMPLATE_PLACEHOLDER,
      disabled: true,
    },
    ...TEMPLATE_OPTIONS,
  ];

  const PROMPT_TEMPLATE_OPTIONS_PLACEHOLDER = [
    {
      label: "انتخاب قالب آماده",
      value: TEMPLATE_PLACEHOLDER,
      disabled: true,
    },
    ...PROMPT_TEMPLATE_OPTIONS,
  ];
  /* -------------------- Helpers -------------------- */
  const resetTemplateFlow = () => {
    setSelectedTemplate(TEMPLATE_PLACEHOLDER);
    setTemplateTarget(null);
    setEditableText("");
  };

  const handleSelectTemplate = (value: string, target: TemplateTarget) => {
    if (value === TEMPLATE_PLACEHOLDER) return;

    const template = TEMPLATE_OPTIONS.find((t) => t.value === value);
    if (!template) return;

    setSelectedTemplate(value);
    setTemplateTarget(target);
    setEditableText(template.text);
    setIsTemplateModalOpen(true);
  };
  const handleSelectPromptTemplate = (
    value: string,
    target: TemplateTarget
  ) => {
    if (value === TEMPLATE_PLACEHOLDER) return;

    const template = PROMPT_TEMPLATE_OPTIONS.find((t) => t.value === value);
    if (!template) return;

    setSelectedTemplate(value);
    setTemplateTarget(target);
    setEditableText(template.text);
    setIsTemplateModalOpen(true);
  };

  const checkName = (name: string) => {
    if (!name.trim()) return false;
    setNameMessage("");
    const exists = bots.some((bot) => bot.name === name);

    if (exists) setNameMessage("نام دستیار تکراری است");
  };

  const handleConfirmTemplate = () => {
    if (templateTarget === "description") {
      updateConfig({ description: editableText });
    }

    if (templateTarget === "guidelines") {
      updateConfig({
        guidelines: botConfig.guidelines
          ? botConfig.guidelines + "\n" + editableText
          : editableText,
      });
    }

    setIsTemplateModalOpen(false);
    resetTemplateFlow();
  };

  const languageOptions: SelectorItem[] = onboardingData.languages.map(
    (lang) => ({
      value: lang.code,
      disabled: lang.disabled,
      label: lang.name,
      id: lang.code,
    })
  );

  return (
    <div className="w-full space-y-8 px-5 py-4 border-2 border-brand-primary/20 rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex items-start gap-4 py-3">
        <div className="w-16 h-16 bg-brand-primary/10 rounded-xl flex items-center justify-center">
          <StepBigStar />
        </div>
        <div>
          <h2 className="text-lg font-bold text-grey-900">
            تنظیمات اولیه دستیار
          </h2>
          <p className="text-grey-600">
            شخصیت و ویژگی‌های پایه چت‌بات خود را تعریف کنید
          </p>
        </div>
      </div>

      {/* Base Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block mb-3">نام دستیار</label>
          <Input
            value={botConfig.name}
            onChange={(e) => {
              checkName(e.target.value);
              updateConfig({ name: e.target.value });
            }}
          />
          {nameMessage && (
            <div className="text-xs text-secondary mt-1 mr-2">
              {nameMessage}
            </div>
          )}
          <div></div>
        </div>

        <div>
          <label className="block mb-3">زبان پیش‌فرض</label>
          <GenericSelector
            items={languageOptions}
            selectedValue={botConfig.language}
            onSelect={(value) => updateConfig({ language: value })}
            showIndicator
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label>توضیحات کلی دستیار</label>
          <GenericSelector
            items={TEMPLATE_OPTIONS_PLACEHOLDER}
            selectedValue={selectedTemplate}
            onSelect={(value) => handleSelectTemplate(value, "description")}
            showIndicator
          />
        </div>

        <textarea
          value={botConfig.description}
          onChange={(e) => updateConfig({ description: e.target.value })}
          rows={6}
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* Guidelines */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label>دستورالعمل‌ها</label>
          <GenericSelector
            items={PROMPT_TEMPLATE_OPTIONS_PLACEHOLDER}
            selectedValue={selectedTemplate}
            onSelect={(value) =>
              handleSelectPromptTemplate(value, "guidelines")
            }
            showIndicator
          />
        </div>

        <textarea
          value={botConfig.guidelines}
          onChange={(e) => updateConfig({ guidelines: e.target.value })}
          rows={6}
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* Required Fields */}
      <div className="p-4 rounded-xl border-2 border-primary/20">
        <div className="flex gap-2 mb-3">
          <FormInput className="text-secondary" />
          فیلدهای ضروری
        </div>

        <div className="flex gap-6">
          <ToggleSmall
            label="نام"
            checked={botConfig.require_user_name}
            onChange={() =>
              updateConfig({
                require_user_name: !botConfig.require_user_name,
              })
            }
          />
          <ToggleSmall
            label="موبایل"
            checked={botConfig.require_user_phone}
            onChange={() =>
              updateConfig({
                require_user_phone: !botConfig.require_user_phone,
              })
            }
          />
          <ToggleSmall
            label="ایمیل"
            checked={botConfig.require_user_email}
            onChange={() =>
              updateConfig({
                require_user_email: !botConfig.require_user_email,
              })
            }
          />
        </div>
      </div>

      {/* Modal */}
      <TemplateModal
        open={isTemplateModalOpen}
        title={
          templateTarget === "guidelines"
            ? "ویرایش قالب دستورالعمل"
            : "ویرایش قالب توضیحات"
        }
        value={editableText}
        onChange={setEditableText}
        onCancel={() => {
          setIsTemplateModalOpen(false);
          resetTemplateFlow();
        }}
        onConfirm={handleConfirmTemplate}
      />
    </div>
  );
}
