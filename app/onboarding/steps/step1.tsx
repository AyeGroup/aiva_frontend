import { Input } from "@/components/input";
import { FormInput } from "lucide-react";
import { ToggleSmall } from "@/components/toggleSmall";
import { onboardingData } from "../onboarding.data";
import { GenericSelector } from "@/components/selector";
import { StepBigStar, StepUser } from "@/public/icons/AppIcons";
import { BotConfig, SelectorItem } from "@/types/common";
import { TextTamplate } from "@/public/icons/dashboard";
import { useState } from "react";

interface WizardStep1Props {
  botConfig: BotConfig;
  updateConfig: (updates: Partial<BotConfig>) => void;
}

export function WizardStep1({ botConfig, updateConfig }: WizardStep1Props) {
  const templates = [
    {
      color: "text-primary",
      text: "شما دستیار فروش فروشگاه خانه آرام هستید. ما لوازم خانگی برقی مانند یخچال، ماشین لباسشویی و مایکروویو می‌فروشیم.محصولات ما گارانتی ۱۸ ماهه دارند و ارسال رایگان برای خرید بالای ۵ میلیون تومان.شماره تماس: ۰۲۱-۱۲۳۴۵۶۷۸",
    },
    // {
    //   color: "text-secondary",
    //   text: "",
    // },
    // {
    //   color: "text-[#52d4a0]",
    //   text:"",
    // },
  ];

  const templatesPrompt = [
    {
      color: "text-primary",
      text:   "تمرکز پاسخ‌ها روی محصولات، قیمت، موجودی و نحوه ارسال باشد.هیچ قولی درباره تخفیف یا مناطق ویژه نده مگر در وب‌سایت رسمی ثبت شده باشد.در پاسخ‌ها، برند و لحن فروشگاه را حفظ کن؛ لحن فروش باید صمیمی ولی دقیق باشد.هرجا کاربر محصولی را جست، پیشنهاد محصولات مرتبط یا جایگزین بده.از درخواست اطلاعات پرداخت یا رمز کارت پرهیز کن.",
    },
    {
      color: "text-secondary",
      text:"پاسخ‌ها باید بر پایه‌ی اطلاعات رسمی دوره‌ها، شهریه و سرفصل‌ها باشند.از قول دادن درباره قبولی یا تضمین نتایج آموزشی پرهیز کن.لحن چت‌بات آموزشی باید محترمانه، دوستانه و انگیزشی باشد.هرجا کاربر درباره کلاس پرسید، مسیر ثبت‌نام یا رزرو را واضح توضیح بده.اگر کاربر زمان کلاس را خواست، تنها از تقویم رسمی مؤسسه نقل کن.",
    },
    {
      color: "text-[#52d4a0]",
      text: "فقط بر اساس راهنمای فنی رسمی پاسخ بده، هیچ تحلیل شخصی نکن.در صورت نیاز به تماس انسانی، شماره پشتیبانی را معرفی کن ولی مکالمه را محترمانه ببند.هنگام توضیح خطا یا مشکل، کوتاه و مرحله‌به‌مرحله توضیح بده.از پاسخ‌های خشن یا مسئولیت‌زدا پرهیز کن. همیشه کمک‌کننده باش.اگر کاربر ناراضی بود، پیام آرام‌کننده و همدلانه بده.",
    },
  ];

  const addTemplateToDescription = (text: string) => {
    updateConfig({
      description: botConfig.description
        ? botConfig.description + "\n" + text
        : text,
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
              <div className="flex items-center gap-3">
                {templates.map((item, index) => (
                  <div
                    key={index}
                    className="relative group cursor-pointer"
                    onClick={() => addTemplateToDescription(item.text)}
                  >
                    <div className={`${item.color} w-6 h-6`}>
                      <TextTamplate />
                    </div>

                    {/* Tooltip */}
                    <div
                      className="absolute bottom-full mb-2 right-1/2 translate-x-1/2 
                              hidden group-hover:block
                              whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1
                              text-xs text-white shadow-lg z-10"
                    >
                      {item.text}
                    </div>
                  </div>
                ))}

                <span className="text-sm">:قالب آماده</span>
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
                {templatesPrompt.map((item, index) => (
                  <div
                    key={index}
                    className="relative group cursor-pointer"
                    onClick={() => addTemplateToGuidelines(item.text)}
                  >
                    <div className={`${item.color} w-6 h-6`}>
                      <TextTamplate />
                    </div>

                    {/* Tooltip */}
                    <div
                      className="absolute bottom-full mb-2 right-1/2 translate-x-1/2 
                              hidden group-hover:block
                              whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1
                              text-xs text-white shadow-lg z-10"
                    >
                      {item.text}
                    </div>
                  </div>
                ))}

                <span className="text-sm">:قالب آماده</span>
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
    </div>
  );
}
