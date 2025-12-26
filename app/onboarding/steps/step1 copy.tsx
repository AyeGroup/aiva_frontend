import { Input } from "@/components/input";
import { useState } from "react";
import { FormInput } from "lucide-react";
import { ToggleSmall } from "@/components/toggleSmall";
import { TextTamplate } from "@/public/icons/dashboard";
import { onboardingData } from "../onboarding.data";
import { GenericSelector } from "@/components/selector";
import { StepBigStar, StepUser } from "@/public/icons/AppIcons";
import { BotConfig, SelectorItem } from "@/types/common";

interface WizardStep1Props {
  botConfig: BotConfig;
  updateConfig: (updates: Partial<BotConfig>) => void;
}

export function WizardStep1({ botConfig, updateConfig }: WizardStep1Props) {
  const TEMPLATE_PLACEHOLDER = "__placeholder__";
  const [selectedTemplate, setSelectedTemplate] =
    useState<string>(TEMPLATE_PLACEHOLDER);

  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [editableText, setEditableText] = useState("");
  type TemplateItem = {
    label: string;
    value: string;
    text: string;
  };

  const templatesPrompt = [
    {
      value: "1",
      label: "آموزشی",
      text: "متن آموزشی",
    },
    {
      value: "2",
      label: "خدماتی",
      text: "متن خدماتی",
    },
    {
      value: "3",
      label: "مالی",
      text: "متن مالی",
    },
  ];

  const templates = [
    {
      value: "1",
      label: "آموزشی",
      text: "تمرکز پاسخ‌ها روی محصولات، قیمت، موجودی و نحوه ارسال باشد.هیچ قولی درباره تخفیف یا مناطق ویژه نده مگر در وب‌سایت رسمی ثبت شده باشد.در پاسخ‌ها، برند و لحن فروشگاه را حفظ کن؛ لحن فروش باید صمیمی ولی دقیق باشد.هرجا کاربر محصولی را جست، پیشنهاد محصولات مرتبط یا جایگزین بده.از درخواست اطلاعات پرداخت یا رمز کارت پرهیز کن.",
    },
    {
      value: "2",
      label: "خدماتی",
      text: "پاسخ‌ها باید بر پایه‌ی اطلاعات رسمی دوره‌ها، شهریه و سرفصل‌ها باشند.از قول دادن درباره قبولی یا تضمین نتایج آموزشی پرهیز کن.لحن چت‌بات آموزشی باید محترمانه، دوستانه و انگیزشی باشد.هرجا کاربر درباره کلاس پرسید، مسیر ثبت‌نام یا رزرو را واضح توضیح بده.اگر کاربر زمان کلاس را خواست، تنها از تقویم رسمی مؤسسه نقل کن.",
    },
    {
      value: "3",
      label: "مالی",
      text: "فقط بر اساس راهنمای فنی رسمی پاسخ بده، هیچ تحلیل شخصی نکن.در صورت نیاز به تماس انسانی، شماره پشتیبانی را معرفی کن ولی مکالمه را محترمانه ببند.هنگام توضیح خطا یا مشکل، کوتاه و مرحله‌به‌مرحله توضیح بده.از پاسخ‌های خشن یا مسئولیت‌زدا پرهیز کن. همیشه کمک‌کننده باش.اگر کاربر ناراضی بود، پیام آرام‌کننده و همدلانه بده.",
    },
  ];

  const TEMPLATE_OPTIONS: TemplateItem[] = templates.map((t, i) => ({
    label: t.label ?? `قالب ${i + 1}`,
    value: String(i),
    text: t.text,
  }));
  const TEMPLATE_OPTIONS_WITH_PLACEHOLDER = [
    {
      label: "انتخاب قالب آماده",
      value: "__placeholder__",
      disabled: true,
    },
    ...TEMPLATE_OPTIONS,
  ];

  console.log("TEMPLATE_OPTIONS", TEMPLATE_OPTIONS);

  const handleSelectTemplate = (value: string) => {
    const template = TEMPLATE_OPTIONS.find((t) => t.value === value);
    if (!template) return;

    setSelectedTemplate(value);
    setEditableText(template.text);
    setIsTemplateModalOpen(true);
  };
  const resetTemplateSelector = () => {
    setSelectedTemplate(TEMPLATE_PLACEHOLDER);
  };

  const addTemplateToDescription = (text: string) => {
    updateConfig({
      description: text,
    });
  };

  const addTemplateToGuidelines = (text: string) => {
    updateConfig({
      guidelines: botConfig.guidelines
        ? botConfig.guidelines + "\n" + text
        : text,
    });
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
    <div className="w-full m-0 space-y-8   px-5 py-4 border-2 border-brand-primary/20 rounded-xl shadow-lg ">
      {/* Header */}
      <div className="flex items-start gap-4 px-0 py-3">
        <div className="w-16 h-16 bg-brand-primary/10 rounded-xl flex items-center justify-center shrink-0">
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

      <div className="space-y-1 flex-col">
        <div className="space-y-6">
          <div className="flex   items-center gap-3">
            <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center">
              <StepUser />
            </div>
            <h3 className="text-grey-900">اطلاعات پایه</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                    ? "border-red-300!"
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
              <GenericSelector
                items={languageOptions}
                selectedValue={botConfig.language}
                onSelect={(value) => {
                  updateConfig({ language: value });
                }}
                showIndicator={true}
              />
            </div>
          </div>
        </div>

        {/* Personality Section */}
        <div className="space-y-4">
          <div className="form-group">
            <div className="flex flex-col lg:flex-row items-center justify-start lg:justify-between">
              <label className="block text-grey-900 mb-3">
                توضیحات کلی دستیار
                <span className="text-brand-primary ml-1">*</span>
              </label>
              <div className="flex items-center gap-3 py-2">
                <GenericSelector
                  items={TEMPLATE_OPTIONS_WITH_PLACEHOLDER}
                  selectedValue={selectedTemplate ?? TEMPLATE_OPTIONS[0]?.value}
                  onSelect={(value) => {
                    if (value === "__placeholder__") return;
                    handleSelectTemplate(value);
                  }}
                  showIndicator
                />
              </div>
            </div>
            <textarea
              value={botConfig.description}
              onChange={(e) => updateConfig({ description: e.target.value })}
              rows={6}
              placeholder={`شما دستیار فروش فروشگاه خانه آرام هستید.
ما لوازم خانگی برقی مانند یخچال، ماشین لباسشویی و مایکروویو می‌فروشیم.
محصولات ما گارانتی ۱۸ ماهه دارند و ارسال رایگان برای خرید بالای ۵ میلیون تومان.
شماره تماس: ۰۲۱-۱۲۳۴۵۶۷۸`}
              className={`w-full px-4 py-3 border border-border-soft rounded-lg 
    focus:outline-none focus:ring-2 focus:ring-brand-primary/20 
    focus:border-brand-primary resize-none whitespace-pre-wrap
    text-base placeholder:text-sm placeholder:text-gray-400
    ${
      !botConfig.description || botConfig.description.length === 0
        ? "border-red-300!"
        : ""
    }`}
            />

            <span className="text-xs m-r2 mb-2">
              در این قسمت، توضیحات کلی دستیار خود را وارد کنید. هرچه توضیحات
              دقیق‌تر باشد، دقت پاسخ‌ها بیشتر خواهد شد.
            </span>
          </div>

          <div className="form-group">
            <div className="flex flex-col lg:flex-row items-center justify-start lg:justify-between">
              <label className="block text-grey-900 mb-3">
                دستورالعمل‌ها
                <span className="text-brand-primary ml-1">*</span>
              </label>
              <div className="flex items-center gap-3">
                <GenericSelector
                  items={TEMPLATE_OPTIONS_WITH_PLACEHOLDER}
                  selectedValue={selectedTemplate ?? TEMPLATE_OPTIONS[0]?.value}
                  onSelect={(value) => {
                    if (value === "__placeholder__") return;
                    handleSelectTemplate(value);
                  }}
                  showIndicator
                />
              </div>
            </div>

            <textarea
              id="welcomeMessage"
              value={botConfig.guidelines}
              onChange={(e) => updateConfig({ guidelines: e.target.value })}
              placeholder={`با لحن دوستانه و محترمانه صحبت کنید.
پاسخ‌ها را کوتاه و مفید بدهید.
هرگز قیمت اعلام نکنید - مشتری را به شماره تماس هدایت کنید.
اگر محصولی نداریم، با عذرخواهی اعلام کنید.
فقط درباره محصولات فروشگاه صحبت کنید.`}
              rows={6}
              className={`w-full px-4 py-3 border border-border-soft rounded-lg 
    focus:outline-none focus:ring-2 focus:ring-brand-primary/20 
    focus:border-brand-primary resize-none whitespace-pre-wrap
    text-base placeholder:text-sm placeholder:text-gray-400
    ${
      !botConfig.guidelines || botConfig.guidelines.length === 0
        ? "border-red-300!"
        : ""
    }`}
            />

            <div className="text-xs mr-3 ">
              در این بخش، دستورالعمل‌ها، قوانین، مقررات و بایدها و نبایدهای سایت
              را بنویسید. این اطلاعات تأثیر زیادی در کیفیت پاسخ‌ها دارند، پس با
              دقت پر کنید.
            </div>
          </div>

          <div className="p-4 rounded-xl border-2 border-primary/20 ">
            <div className="flex gap-2 text-grey-900 font-normal mb-3">
              <FormInput className="text-primary" />
              فیلدهای ضروری ورود کاربران
            </div>
            <div className="text-sm text-gray-600 mr-3 ">
              فیلدهای ضروری که در ابتدای چت از کاربران دریافت می‌شود.
            </div>
            <div className="flex  flex-col lg:flex-row justify-start lg:items-center gap-3 lg:gap-12 m-2 lg:m-4">
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
                label="تلفن"
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
        </div>
      </div>
      {isTemplateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-lg rounded-xl bg-white p-5 shadow-lg">
            <h3 className="mb-3 text-sm font-semibold text-gray-800">
              ویرایش قالب
            </h3>

            <textarea
              value={editableText}
              onChange={(e) => setEditableText(e.target.value)}
              rows={6}
              className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />

            <div className="mt-4 flex justify-end gap-2">
              <button
                className="rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                onClick={() => {
                  setIsTemplateModalOpen(false);
                  resetTemplateSelector();
                }}
              >
                انصراف
              </button>

              <button
                className="rounded-lg bg-brand-primary px-4 py-2 text-sm text-white hover:opacity-90"
                onClick={() => {
                  addTemplateToDescription(editableText);
                  setIsTemplateModalOpen(false);
                  resetTemplateSelector();
                }}
              >
                افزودن به متن
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
