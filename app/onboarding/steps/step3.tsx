import { useState } from "react";
import { BotConfig } from "@/types/common";
import {
  Settings,
  MessageSquare,
  UserCheck,
  Clock,
  Shield,
  Zap,
} from "lucide-react";

interface WizardStep3Props {
  botConfig: BotConfig;
  updateConfig: (updates: Partial<BotConfig>) => void;
}

interface BehaviorSettings {
  responseStyle: "concise" | "detailed" | "helpful";
  maxResponseLength: number;
  useEmojis: boolean;
  escalationTriggers: string[];
  autoGreeting: boolean;
  contextMemory: boolean;
  privacyMode: boolean;
  responseDelay: number;
}

export function WizardStep3({ botConfig, updateConfig }: WizardStep3Props) {
  const [behaviors, setBehaviors] = useState<BehaviorSettings>({
    responseStyle: "helpful",
    maxResponseLength: 300,
    useEmojis: true,
    escalationTriggers: ["پشتیبانی", "مدیر", "شکایت"],
    autoGreeting: true,
    contextMemory: true,
    privacyMode: false,
    responseDelay: 1000,
  });

  const [customTrigger, setCustomTrigger] = useState("");

  const responseStyles = [
    {
      id: "concise",
      title: "مختصر و مفید",
      description: "پاسخ‌های کوتاه و مستقیم",
      icon: <Zap className="w-5 h-5" />,
    },
    {
      id: "detailed",
      title: "جزئیات کامل",
      description: "پاسخ‌های توضیحی و کامل",
      icon: <MessageSquare className="w-5 h-5" />,
    },
    {
      id: "helpful",
      title: "راهنما و دوستانه",
      description: "پاسخ‌های کاربردی با پیشنهادات",
      icon: <UserCheck className="w-5 h-5" />,
    },
  ];

  const addEscalationTrigger = () => {
    if (
      customTrigger.trim() &&
      !behaviors.escalationTriggers.includes(customTrigger.trim())
    ) {
      setBehaviors((prev) => ({
        ...prev,
        escalationTriggers: [...prev.escalationTriggers, customTrigger.trim()],
      }));
      setCustomTrigger("");
    }
  };

  const removeEscalationTrigger = (trigger: string) => {
    setBehaviors((prev) => ({
      ...prev,
      escalationTriggers: prev.escalationTriggers.filter((t) => t !== trigger),
    }));
  };

  const handleBehaviorChange = (key: keyof BehaviorSettings, value: any) => {
    setBehaviors((prev) => ({ ...prev, [key]: value }));

    // Update bot config with behavior settings
    // updateConfig({
    //   behaviors: { ...behaviors, [key]: value },
    // });
    // elham
  };

  return (
    <div className="space-y-8 bg-bg-surface px-[20px] py-[16px] border-2 border-brand-primary/20 rounded-xl shadow-lg pt-[8px] pr-[20px] pb-[16px] pl-[20px]">
      {/* Header */}
      <div className="flex items-start gap-4 px-[0px] py-[12px]">
        <div className="w-16 h-16 bg-brand-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
          <Settings className="w-8 h-8 text-brand-primary" />
        </div>
        <div className="flex-1">
          <h2 className="text-grey-900 mb-2 text-right text-[24px] font-bold">
            تنظیمات پاسخ‌گویی
          </h2>
          <p className="text-grey-600 text-right">
            رفتار و قوانین پاسخ‌گویی چت‌بات خود را تنظیم کنید
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Response Style */}
        <div className="space-y-4">
          {/* elham */}
          {/* <RadioGroup
            name="responseStyle"
            value={behaviors.responseStyle}
            onChange={(value) => handleBehaviorChange("responseStyle", value)}
            options={responseStyles.map((style) => ({
              id: style.id,
              label: style.title,
              description: style.description,
              icon: style.icon,
            }))}
            layout="vertical"
          /> */}
        </div>

        {/* Response Length */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-5 h-5 text-brand-primary" />
            <h3 className="text-grey-900">حداکثر طول پاسخ</h3>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[150, 300, 500].map((length) => (
              <button
                key={length}
                onClick={() =>
                  handleBehaviorChange("maxResponseLength", length)
                }
                className={`p-4 rounded-lg border-2 transition-all ${
                  behaviors.maxResponseLength === length
                    ? "border-brand-primary bg-brand-primary/5"
                    : "border-border-soft hover:border-brand-primary/50"
                }`}
              >
                <div className="text-center">
                  <p className="text-grey-900 mb-1">{length} کاراکتر</p>
                  <p className="text-grey-600 text-body-small">
                    {length === 150
                      ? "کوتاه"
                      : length === 300
                      ? "متوسط"
                      : "بلند"}
                  </p>
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

          <div className="grid md:grid-cols-2 gap-4">
            {/* Auto Greeting */}
            <div className="p-4 rounded-lg border border-border-soft">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-grey-900 mb-1">خوشامدگویی خودکار</h4>
                  <p className="text-grey-600 text-body-small">
                    پیام خوشامد به صورت خودکار نمایش یابد
                  </p>
                </div>
                <button
                  onClick={() =>
                    handleBehaviorChange(
                      "autoGreeting",
                      !behaviors.autoGreeting
                    )
                  }
                  className={`w-12 h-6 rounded-full transition-colors ${
                    behaviors.autoGreeting ? "bg-brand-primary" : "bg-grey-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      behaviors.autoGreeting
                        ? "translate-x-6"
                        : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Context Memory */}
            <div className="p-4 rounded-lg border border-border-soft">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-grey-900 mb-1">حافظه مکالمه</h4>
                  <p className="text-grey-600 text-body-small">
                    پیام‌های قبلی کاربر در نظر گرفته شود
                  </p>
                </div>
                <button
                  onClick={() =>
                    handleBehaviorChange(
                      "contextMemory",
                      !behaviors.contextMemory
                    )
                  }
                  className={`w-12 h-6 rounded-full transition-colors ${
                    behaviors.contextMemory ? "bg-brand-primary" : "bg-grey-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      behaviors.contextMemory
                        ? "translate-x-6"
                        : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Use Emojis */}
            <div className="p-4 rounded-lg border border-border-soft">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-grey-900 mb-1">استفاده از ایموجی</h4>
                  <p className="text-grey-600 text-body-small">
                    ایموجی در پاسخ‌ه�� استفاده شود
                  </p>
                </div>
                <button
                  onClick={() =>
                    handleBehaviorChange("useEmojis", !behaviors.useEmojis)
                  }
                  className={`w-12 h-6 rounded-full transition-colors ${
                    behaviors.useEmojis ? "bg-brand-primary" : "bg-grey-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      behaviors.useEmojis ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Privacy Mode */}
            <div className="p-4 rounded-lg border border-border-soft">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-grey-900 mb-1">حالت حریم خصوصی</h4>
                  <p className="text-grey-600 text-body-small">
                    مکالمات ذخیره نشوند
                  </p>
                </div>
                <button
                  onClick={() =>
                    handleBehaviorChange("privacyMode", !behaviors.privacyMode)
                  }
                  className={`w-12 h-6 rounded-full transition-colors ${
                    behaviors.privacyMode ? "bg-warning" : "bg-grey-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      behaviors.privacyMode
                        ? "translate-x-6"
                        : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Response Delay */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-brand-primary" />
            <h3 className="text-grey-900">تاخیر پاسخ</h3>
          </div>
          <p className="text-grey-600 text-body-small text-right text-[14px]">
            زمان انتظار قبل از نمایش پاسخ (برای طبیعی‌تر به نظر رسیدن)
          </p>

          <div className="grid grid-cols-4 gap-3">
            {[500, 1000, 1500, 2000].map((delay) => (
              <button
                key={delay}
                onClick={() => handleBehaviorChange("responseDelay", delay)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  behaviors.responseDelay === delay
                    ? "border-brand-primary bg-brand-primary/5"
                    : "border-border-soft hover:border-brand-primary/50"
                }`}
              >
                <div className="text-center">
                  <p className="text-grey-900 text-body-small">
                    {delay / 1000}ثانیه
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
