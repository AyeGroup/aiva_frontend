import { Input } from "@/components/input";
import { useState } from "react";
import { ToggleSmall } from "@/components/toggleSmall";
import { onboardingData } from "../onboarding.data";
import { GenericSelector } from "@/components/selector";
import { StepBigStar, StepUser } from "@/public/icons/AppIcons";
import { BotConfig, SelectorItem } from "@/types/common";
import { FormInput, InfoIcon, LockIcon } from "lucide-react";

interface WizardStep1Props {
  botConfig: BotConfig;
  updateConfig: (updates: Partial<BotConfig>) => void;
}

export function WizardStep1({ botConfig, updateConfig }: WizardStep1Props) {
  type GuidelineCategory = keyof typeof onboardingData.GroupGuidelines;
  const canEditRequiredFields = false;

  // const categories = Object.keys(
    // onboardingData.GroupGuidelines
  // ) as GuidelineCategory[];

  // const [activeTab, setActiveTab] = useState<GuidelineCategory>(categories[0]);

  const languageOptions: SelectorItem[] = onboardingData.languages
    // .filter((lang) => !lang.disabled)
    .map((lang) => ({
      value: lang.code,
      disabled: lang.disabled,
      label: lang.name,
      id: lang.code,  
    }));

  return (
    <div
      className="space-y-8 bg-bg-surface px-5 py-4 border-2 border-brand-primary/20 rounded-xl shadow-lg "
 
    >
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
            <label className="block text-grey-900 mb-3">
              توضیحات کلی دستیار
              <span className="text-brand-primary ml-1">*</span>
            </label>
            <textarea
              value={botConfig.description}
              onChange={(e) => updateConfig({ description: e.target.value })}
              rows={3}
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
        ? "!border-red-400"
        : ""
    }`}
            />

            <span className="text-xs m-r2 mb-2">
              در این قسمت، توضیحات کلی دستیار خود را وارد کنید. هرچه توضیحات
              دقیق‌تر باشد، دقت پاسخ‌ها بیشتر خواهد شد.
            </span>
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
              placeholder={`با لحن دوستانه و محترمانه صحبت کنید.
پاسخ‌ها را کوتاه و مفید بدهید.
هرگز قیمت اعلام نکنید - مشتری را به شماره تماس هدایت کنید.
اگر محصولی نداریم، با عذرخواهی اعلام کنید.
فقط درباره محصولات فروشگاه صحبت کنید.`}
              rows={3}
              className={`w-full px-4 py-3 border border-border-soft rounded-lg 
    focus:outline-none focus:ring-2 focus:ring-brand-primary/20 
    focus:border-brand-primary resize-none whitespace-pre-wrap
    text-base placeholder:text-sm placeholder:text-gray-400
    ${
      !botConfig.guidelines || botConfig.guidelines.length === 0
        ? "!border-red-400"
        : ""
    }`}
            />

            <div className="text-xs mr-3 ">
              در این بخش، دستورالعمل‌ها، قوانین، مقررات و بایدها و نبایدهای سایت
              را بنویسید. این اطلاعات تأثیر زیادی در کیفیت پاسخ‌ها دارند، پس با
              دقت پر کنید.
            </div>
          </div>

          {/* <div className=" ">
            <div className="text-grey-900 font-normal mb-3">
              فیلدهای ضروری ورود کاربران 
            </div>
            <div className="flex items-center gap-10 m-4">
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
          </div> */}

          <div className="py-3">
            <div className="text-grey-900 font-normal mb-3 flex items-center gap-2">
              <FormInput className="text-primary" /> فیلدهای ضروری ورود کاربران
              {!canEditRequiredFields && (
                <div className="flex items-center -mt-2 gap-1 text-xs text-grey-500">
                  <InfoIcon className="w-3 h-3" />
                  <span>این قابلیت مخصوص پلن Pro است</span>
                </div>
              )}
            </div>

            <div
              className={`flex items-center gap-10 m-4 ${
                !canEditRequiredFields ? "opacity-50" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <ToggleSmall
                  label="نام"
                  checked={botConfig.require_user_name}
                  onChange={() =>
                    canEditRequiredFields &&
                    updateConfig({
                      require_user_name: !botConfig.require_user_name,
                    })
                  }
                  disabled={!canEditRequiredFields}
                />
                {!canEditRequiredFields && (
                  <LockIcon
                    className="w-4 h-4 text-grey-500"
                    // title="فقط در پلن Pro"
                  />
                )}
              </div>

              <div className="flex items-center gap-2">
                <ToggleSmall
                  label="تلفن"
                  checked={botConfig.require_user_phone}
                  onChange={() =>
                    canEditRequiredFields &&
                    updateConfig({
                      require_user_phone: !botConfig.require_user_phone,
                    })
                  }
                  disabled={!canEditRequiredFields}
                />
                {!canEditRequiredFields && (
                  <LockIcon
                    className="w-4 h-4 text-grey-500"
                    // title="فقط در پلن Pro"
                  />
                )}
              </div>

              <div className="flex items-center gap-2">
                <ToggleSmall
                  label="ایمیل"
                  checked={botConfig.require_user_email}
                  onChange={() =>
                    canEditRequiredFields &&
                    updateConfig({
                      require_user_email: !botConfig.require_user_email,
                    })
                  }
                  disabled={!canEditRequiredFields}
                />
                {!canEditRequiredFields && (
                  <LockIcon
                    className="w-4 h-4 text-grey-500"

                    // title="فقط در پلن Pro"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
