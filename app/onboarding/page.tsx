"use client";
import axios from "axios";
import PageLoader from "@/components/pageLoader";
import { Card } from "@/components/card";
import { Button } from "@/components/button";
import { Header } from "@/components/header/header";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { BotConfig } from "@/types/common";
import { API_ROUTES } from "@/constants/apiRoutes";
import { WizardStep1 } from "./steps/step1";
import { WizardStep2 } from "./steps/step2";
import { WizardStep3 } from "./steps/step3";
import { WizardStep4 } from "./steps/step4";
import { WizardStep5 } from "./steps/step5";
import { ChatPreview } from "./chat-preview";
import { onboardingData } from "./onboarding.data";
import { useState, useEffect } from "react";
import { Alert } from "@/components/ui/alert";

export default function OnboardingWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [uuid, setUuid] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [botConfig, setBotConfig] = useState<BotConfig>({
    uuid: "",
    name: "",
    description: "",
    guidelines: "",
    language: "persian",
    tone: "دوستانه",
    color: "",
    button_size: "small",
    widget_position: "bottom_right",
    answer_length: "",
    support_phone: "",
    use_emoji: "",
    greetings: "",
    k: "",
    reranker_enabled: "",
    llm_model: "",
    llm_api_key: "",
    primary_color: "",
    accent_color: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const { user, loading } = useAuth();
  const { title, subtitle, steps } = onboardingData;
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const totalSteps = steps.length;

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const loadOnboardingData = async () => {
      try {
        const savedData = localStorage.getItem("aiva-onboarding-data");

        // If no saved data, do nothing
        if (!savedData) return;

        const parsedData = JSON.parse(savedData);

        // Always set UUID from saved data if available
        if (parsedData.botConfig?.uuid) {
          setUuid(parsedData.botConfig.uuid);
        }

        // If we have a UUID, fetch from API, otherwise use local storage
        if (parsedData.botConfig?.uuid) {
          try {
            const response = await axios.get(API_ROUTES.BOTS.GET, {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${user?.token}`,
              },
            });

            if (
              response.data.success === true &&
              (!response.data.data || response.data.data.length === 0)
            ) {
              console.log("BOTS data", response.data.data?.length);
              setBotConfig(response.data.botConfig || parsedData.botConfig);
              setCurrentStep(
                response.data.currentStep || parsedData.currentStep || 1
              );
            } else {
              // If API has data, use local storage as fallback
              setBotConfig(parsedData.botConfig || botConfig);
              setCurrentStep(parsedData.currentStep || 1);
            }
          } catch (apiError) {
            console.warn("API fetch failed, using local data:", apiError);
            // Fallback to local storage if API call fails
            setBotConfig(parsedData.botConfig || botConfig);
            setCurrentStep(parsedData.currentStep || 1);
          }
        } else {
          // No UUID, use local storage data
          setBotConfig(parsedData.botConfig || botConfig);
          setCurrentStep(parsedData.currentStep || 1);
        }
      } catch (error) {
        console.warn("خطا در بارگذاری اطلاعات ذخیره شده:", error);
      }
    };

    loadOnboardingData();
  }, [user?.token]); // Added dependency

  // Save data to localStorage whenever botConfig or currentStep changes
  useEffect(() => {
    const dataToSave = {
      botConfig,
      currentStep,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("aiva-onboarding-data", JSON.stringify(dataToSave));
  }, [botConfig, currentStep]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  const validateFields = () => {
    console.log("call validateFields ");

    const newErrors: { [key: string]: string } = {};
    if (!botConfig.name?.trim()) newErrors.name = "نام دستیار الزامی است";
    if (!botConfig.language) newErrors.language = "زبان الزامی است";
    if (!botConfig.tone) newErrors.tone = "شخصیت الزامی است";
    if (!botConfig.primary_color)
      newErrors.primary_color = "رنگ اصلی الزامی است";
    return newErrors;
  };

  const saveBotConfig = async () => {
    const fieldErrors = validateFields();
    console.log("fieldErrors", fieldErrors);
    console.log("logofile", logoFile);
    setErrors(fieldErrors);

    if (Object.keys(fieldErrors).length > 0) {
      // Alert("اطلاعات را کامل کنید ");
      return;
    }

    setIsSaving(true);
    try {
      console.log("botConfig", botConfig);
      const formData = new FormData();
      formData.append("name", botConfig.name);
      formData.append("language", botConfig.language);
      formData.append("tone", botConfig.tone);
      formData.append("primary_color", botConfig.primary_color);
      formData.append("accent_color", botConfig.accent_color);
      formData.append("button_size", botConfig.button_size);
      // formData.append("widget_position", botConfig.widget_position);
      // formData.append("logo", botConfig.logo);
      if (logoFile) {
        formData.append("logo", logoFile); // 📂 فایل لوگو اینجا اضافه می‌شود
      }
      const res = await axios.post(API_ROUTES.BOTS.SAVE, formData, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      console.log("bot save:", res.data);
      if (res.data.success) {
        setUuid(res.data.data.uuid);
        console.log("uuid", res.data.data.uuid);
        return true;
      } else {
        setUuid("");
        return false;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const updateBotConfig = (updates: Partial<BotConfig>) => {
    setBotConfig((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const nextStep = async () => {
    console.log("call nextStep ");

    const isSaved = await saveBotConfig();
    console.log("Bot saved:", isSaved);
    if (!isSaved) return;
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // اتمام و رفتن به داشبورد
      localStorage.removeItem("aiva-onboarding-data");
      // onNavigate("dashboard");
      router.push("/dashboard");
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
          <WizardStep1
            botConfig={botConfig}
            updateConfig={updateBotConfig}
            errors={errors}
            logoFile={logoFile}
            setLogoFile={setLogoFile}
          />
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
        return <WizardStep5 botConfig={botConfig} />;
      // return <WizardStep5 botConfig={botConfig} onNavigate={onNavigate} />;
      default:
        return (
          <WizardStep1
            botConfig={botConfig}
            updateConfig={updateBotConfig}
            logoFile={logoFile}
            setLogoFile={setLogoFile}
          />
        );
    }
  };

  if (loading)
    return (
      <div>
        <PageLoader />
      </div>
    );
  if (!user) return null;

  return (
    <main className="onboarding-wizard min-h-screen bg-bg-app" dir="rtl">
      <Header currentPage="onboarding" />
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
                  {isSaving
                    ? "در حال ذخیره..."
                    : currentStep === totalSteps
                    ? "اتمام و شروع"
                    : "بعدی"}

                  {/* {currentStep === totalSteps ? "اتمام و شروع" : "بعدی"} */}
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
              // onNavigate("landing");
              // elham
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
