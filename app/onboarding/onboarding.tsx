import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/design/_components/Card/card";
import { WizardStep1 } from "./steps/step1";
import { WizardStep2 } from "./steps/step2";
import { WizardStep3 } from "./steps/step3";
import { WizardStep4 } from "./steps/step4";
import { WizardStep5 } from "./steps/step5";
import { ChatPreview } from "./chat-preview";
import { onboardingData } from "./onboarding.data";
import "./onboarding.css";

type PageType = "landing" | "signup" | "dashboard" | "consultation";

interface OnboardingWizardProps {
  onNavigate: (page: PageType) => void;
}

export interface BotConfig {
  name: string;
  description: string;
  language: string;
  tone: string;
  color: string;
  welcomeMessage: string;
  fallbackMessage: string;
  knowledge: Array<{
    id: string;
    type: "faq" | "document" | "url" | "text";
    title: string;
    content?: string;
    url?: string;
  }>;
  branding: {
    logo?: string;
    position: "bottom-right" | "bottom-left";
    size: "small" | "medium" | "large";
  };
  behaviors?: {
    responseStyle: "concise" | "detailed" | "helpful";
    maxResponseLength: number;
    useEmojis: boolean;
    escalationTriggers: string[];
    autoGreeting: boolean;
    contextMemory: boolean;
    privacyMode: boolean;
    responseDelay: number;
  };
}

export function OnboardingWizard({ onNavigate }: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [botConfig, setBotConfig] = useState<BotConfig>({
    name: "آیوا",
    description: "",
    language: "fa",
    tone: "friendly",
    color: "#4CA7A5",
    welcomeMessage: "سلام! چطور می‌تونم کمکتون کنم؟",
    fallbackMessage:
      "متأسفانه نمی‌تونم پاسخ این سؤال رو بدم. لطفاً با پشتیبانی تماس بگیرید.",
    knowledge: [],
    branding: {
      position: "bottom-right",
      size: "medium",
    },
    behaviors: {
      responseStyle: "helpful",
      maxResponseLength: 300,
      useEmojis: true,
      escalationTriggers: ["پشتیبانی", "مدیر", "شکایت"],
      autoGreeting: true,
      contextMemory: true,
      privacyMode: false,
      responseDelay: 1000,
    },
  });

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("aiva-onboarding-data");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setBotConfig(parsedData.botConfig || botConfig);
        setCurrentStep(parsedData.currentStep || 1);
      } catch (error) {
        console.warn("خطا در بارگذاری اطلاعات ذخیره شده:", error);
      }
    }
  }, []);

  // Save data to localStorage whenever botConfig or currentStep changes
  useEffect(() => {
    const dataToSave = {
      botConfig,
      currentStep,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("aiva-onboarding-data", JSON.stringify(dataToSave));
  }, [botConfig, currentStep]);

  const { title, subtitle, steps } = onboardingData;
  const totalSteps = steps.length;

  const updateBotConfig = (updates: Partial<BotConfig>) => {
    setBotConfig((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding and go to dashboard
      localStorage.removeItem("aiva-onboarding-data"); // Clear saved data on completion
      onNavigate("dashboard");
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <WizardStep1 botConfig={botConfig} updateConfig={updateBotConfig} />
        );
      case 2:
        return (
          <WizardStep2 botConfig={botConfig} updateConfig={updateBotConfig} />
        );
      case 3:
        return (
          <WizardStep4 botConfig={botConfig} updateConfig={updateBotConfig} />
        );
      case 4:
        return (
          <WizardStep3 botConfig={botConfig} updateConfig={updateBotConfig} />
        );
      case 5:
        return <WizardStep5 botConfig={botConfig} onNavigate={onNavigate} />;
      default:
        return (
          <WizardStep1 botConfig={botConfig} updateConfig={updateBotConfig} />
        );
    }
  };

  return (
    <main className="onboarding-wizard min-h-screen bg-bg-app" dir="rtl">
      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Clean Minimal Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-brand-primary rounded-xl shadow-lg mb-6">
            <svg
              className="w-7 h-7 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.36L2 22l5.64-1.05C9.96 21.64 11.46 22 13 22h6c1.1 0 2-.9 2-2V12c0-5.52-4.48-10-10-10z" />
            </svg>
          </div>

          <h1 className="text-grey-900 mb-4 font-bold text-[20px]">{title}</h1>
          <p className="text-grey-700 max-w-lg mx-auto">{subtitle}</p>
        </div>

        {/* Ultra Clean Progress */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="relative max-w-4xl mx-auto m-[0px] pt-[0px] pr-[0px] pb-[16px] pl-[0px]">
            {/* Background Line */}
            <div className="h-2 bg-grey-300 rounded-full" />

            {/* Progress Fill - New Gradient */}
            <div
              className="absolute top-0 right-0 h-2 rounded-full transition-all duration-500 ease-out shadow-sm"
              style={{
                width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
                background: "var(--sharp-primary)",
              }}
            />

            {/* Step Dots */}
            <div className="relative flex items-center justify-between mt-8 px-4">
              {steps.map((step, index) => {
                const stepNumber = index + 1;
                const isActive = stepNumber === currentStep;
                const isCompleted = stepNumber < currentStep;

                return (
                  <div
                    key={step.id}
                    className="flex flex-col items-center min-w-[120px] flex-1"
                  >
                    <button
                      onClick={() => goToStep(stepNumber)}
                      className={`
                        flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 text-sm font-medium border-2 shadow-sm
                        ${
                          isActive
                            ? "text-white border-brand-primary shadow-lg"
                            : isCompleted
                            ? "bg-success text-white border-success cursor-pointer hover:scale-105 shadow-md"
                            : "bg-white border-grey-400 text-grey-600 hover:border-brand-primary hover:text-brand-primary"
                        }
                      `}
                      style={
                        isActive ? { background: "var(--sharp-primary)" } : {}
                      }
                      disabled={stepNumber > currentStep + 1}
                    >
                      {isCompleted ? (
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        stepNumber
                      )}
                    </button>

                    <p
                      className={`mt-3 text-sm text-center font-medium whitespace-nowrap ${
                        isActive
                          ? "text-brand-primary"
                          : isCompleted
                          ? "text-success"
                          : "text-grey-600"
                      }`}
                    >
                      {step.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Step Content */}
            <div className="lg:col-span-2">
              <Card className="p-8 border border-grey-200 bg-white rounded-xl shadow-lg">
                <div className="animate-soft">{renderCurrentStep()}</div>
              </Card>

              {/* Clean Navigation */}
              <div className="flex items-center justify-between mt-8">
                <Button
                  variant="tertiary"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  icon="arrow-left"
                  iconPosition="left"
                  className="px-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  قبلی
                </Button>

                {/* Minimal Step Counter */}
                <div className="bg-white border border-grey-200 px-4 py-2 rounded-lg shadow-sm">
                  <span className="text-sm text-grey-700 font-medium">
                    {currentStep} از {totalSteps}
                  </span>
                </div>

                <Button
                  variant="primary"
                  onClick={nextStep}
                  icon={currentStep < totalSteps ? "arrow-right" : "check"}
                  iconPosition="right"
                  className="px-6 shadow-md"
                >
                  {currentStep === totalSteps ? "اتمام و شروع" : "بعدی"}
                </Button>
              </div>
            </div>

            {/* Preview Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <ChatPreview botConfig={botConfig} currentStep={currentStep} />
              </div>
            </div>
          </div>
        </div>

        {/* Clean Exit Link */}
        <div className="text-center mt-16">
          <button
            onClick={() => {
              localStorage.removeItem("aiva-onboarding-data"); // Clear saved data on cancel
              onNavigate("landing");
            }}
            className="text-grey-600 hover:text-grey-900 text-sm underline transition-colors font-medium"
          >
            انصراف و بازگشت به صفحه اصلی
          </button>
        </div>
      </div>
    </main>
  );
}
