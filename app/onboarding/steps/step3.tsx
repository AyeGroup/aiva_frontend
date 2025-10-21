import { Input } from "@/components/input";
import { useState } from "react";
import { BehaviorSettings, BotConfig } from "@/types/common";
import { Settings, MessageSquare, Shield } from "lucide-react";
import ToggleSetting from "@/components/toggle-setting";
import ThreeLevelSlider from "@/components/ThreeLevelSlider";

interface WizardStep3Props {
  botConfig: BotConfig;
  updateConfig: (updates: Partial<BotConfig>) => void;
}
const AnswerLength=[ "short","medium","long"]
  

export function WizardStep3({ botConfig, updateConfig }: WizardStep3Props) {
  const [behaviors, setBehaviors] = useState<BehaviorSettings>({
    k: 10,
    maxResponseLength: "medium",
    useGreeting: false,
    useEmojis: true,
    // useSupport: false,
    phone: "",
  });

  const [sliderValue, setSliderValue] = useState(10);

  const handleBehaviorChange = (key: keyof BehaviorSettings, value: any) => {
    const updated = { ...behaviors, [key]: value };
    setBehaviors(updated);
    updateConfig({ behaviors: updated });
    // console.log("beha",key,value)
  };

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
        <h3 className="text-grey-900 font-semibold flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-brand-primary" />
          میزان انطباق پاسخ با اسناد
        </h3>
        <ThreeLevelSlider value={sliderValue} onChange={setSliderValue} />
      </div>

      {/* Response Length */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-5 h-5 text-brand-primary" />
          <h3 className="text-grey-900">حداکثر طول پاسخ</h3>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {AnswerLength.map((length) => (
            <button
              key={length}
              onClick={() => handleBehaviorChange("maxResponseLength", length)}
              className={`p-4 rounded-lg border-2 transition-all ${
                behaviors.maxResponseLength === String(length)
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
        <h3 className="text-grey-900 flex items-center gap-3">
          <Shield className="w-5 h-5 text-brand-primary" />
          تنظیمات پیشرفته
        </h3>

        <div className="space-y-3">
          {/* Auto Greeting */}
          <ToggleSetting
            label="خوشامدگویی خودکار"
            description="پیام خوشامد به صورت خودکار نمایش یابد"
            value={behaviors.useGreeting}
            onToggle={() =>
              handleBehaviorChange("useGreeting", !behaviors.useGreeting)
            }
          />

          {/* Use Emojis */}
          <ToggleSetting
            label="استفاده از ایموجی"
            description="ایموجی در پاسخ‌ها استفاده شود"
            value={behaviors.useEmojis}
            onToggle={() =>
              handleBehaviorChange("useEmojis", !behaviors.useEmojis)
            }
          />

          {/* Fallback to Support */}
          {/* <ToggleSetting
            label="انتقال به پشتیبانی"
            description="اگر پاسخی نیافت، کاربر به پشتیبانی راهنمایی شود"
            value={behaviors.useSupport}
            onToggle={() =>
              handleBehaviorChange("useSupport", !behaviors.useSupport)
            }
          /> */}
        </div>
        <div className="flex justify-between items-center ">
          <div className="flex items-center text-gray-900">
            شماره تماس
            <span className="text-gray-400 text-xs pr-2">اختیاری</span>
          </div>
          <Input
            id="phone"
            type="text"
            numeric={true}
            inputMode="numeric"
            value={behaviors.phone}
            onChange={(e) => handleBehaviorChange("phone", e.target.value)}
            placeholder="شماره پشتیبانی را وارد کنید"
            className="w-full text-sm rounded-2xl p-4 border !bg-white text-grey-900 placeholder-grey-500 transition-all focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:outline-none ltr  border-grey-300 focus:border-brand-primary !text-center"
            maxLength={16}
          />
          {/* <Input></Input> */}
        </div>
      </div>
    </div>
  );
}

// ✅ Reusable toggle switch component
