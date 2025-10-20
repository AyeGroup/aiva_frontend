"use client";
import axios from "axios";
import PageLoader from "@/components/pageLoader";
import { Card } from "@/components/card";
import { toast } from "sonner";
import { Button } from "@/components/button";
import { Header } from "@/components/header/header";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { AivaWhite } from "@/public/icons/AppIcons";
import { API_ROUTES } from "@/constants/apiRoutes";
import { WizardStep1 } from "./steps/step1";
import { WizardStep2 } from "./steps/step2";
import { WizardStep3 } from "./steps/step3";
import { WizardStep4 } from "./steps/step4";
import { WizardStep5 } from "./steps/step5";
import { ChatPreview } from "./chat-preview";
import { onboardingData } from "./onboarding.data";
import { englishToPersian } from "@/utils/number-utils";
import { useState, useEffect } from "react";
import { BehaviorSettings, BotConfig } from "@/types/common";

export default function OnboardingWizard() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const { title, subtitle, steps } = onboardingData;
  const [currentStep, setCurrentStep] = useState(1);
  const [lastStep, setLastStep] = useState(0);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const initialBehaviorSettings: BehaviorSettings = {
    k: 5,
    maxResponseLength: "short",
    useGreeting: true,
    useEmojis: false,
    // useSupport: true,
    phone: "",
  };
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
    reranker_enabled: "",
    llm_model: "",
    llm_api_key: "",
    primary_color: "#65BCB6",
    accent_color: "#65BCB6",
    knowledge: [],
    faqs: [],
    logo_url: "",
    status: true,
    behaviors: initialBehaviorSettings,
  });
  const totalSteps = steps.length;

  //  بارگذاری اطلاعات ذخیره‌شده
  useEffect(() => {
    const loadOnboardingData = async () => {
      try {
        const savedData = localStorage.getItem("aiva-onboarding-data");
        if (!savedData) return;

        const parsedData = JSON.parse(savedData);
        // if (parsedData.botConfig?.uuid) setUuid(parsedData.botConfig.uuid);

        if (parsedData.botConfig?.uuid) {
          try {
            const response = await axios.get(
              `${API_ROUTES.BOTS.GET}${parsedData.botConfig.uuid}`,
              {
                withCredentials: true,
                headers: {
                  Authorization: `Bearer ${user?.token}`,
                },
              }
            );

            console.log("BotConfig: ", response.data.data);
            const hasApiData = response.data?.success && response.data?.data;

            setBotConfig(
              hasApiData ? response.data.data : parsedData.botConfig
            );
            setCurrentStep(
              response.data?.currentStep || parsedData.currentStep || 1
            );

            // ذخیره فقط اگر داده جدید اومده
            if (hasApiData) {
              localStorage.setItem(
                "aiva-onboarding-data",
                JSON.stringify({
                  botConfig: response.data.data,
                  currentStep:
                    response.data?.currentStep || parsedData.currentStep || 1,
                })
              );
            }
          } catch (apiError: any) {
            // ✅ بررسی خطای 401
            if (apiError.response?.status === 401) {
              console.warn("Unauthorized - redirecting to login...");
              // localStorage.removeItem("aiva-onboarding-data");
              router.push("/auth/login");
              return;
            }

            console.warn("API fetch failed, using local data:", apiError);
            setBotConfig(parsedData.botConfig);
            setCurrentStep(parsedData.currentStep || 1);
          }
        } else {
          setBotConfig(parsedData.botConfig);
          setCurrentStep(parsedData.currentStep || 1);
        }
      } catch (error) {
        console.warn("خطا در بارگذاری اطلاعات ذخیره شده:", error);
      }
    };

    if (user?.token) loadOnboardingData();
  }, [user?.token]);

  //   ذخیره‌ی داده‌ها
  useEffect(() => {
    if (!botConfig) return;
    const dataToSave = {
      botConfig,
      currentStep,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("aiva-onboarding-data", JSON.stringify(dataToSave));
  }, [botConfig, currentStep]);

  //   چک ورود کاربر
  useEffect(() => {
    if (!loading && !user) router.push("/auth/login");
  }, [user, loading, router]);

  const validateFields = () => {
    console.log("call validateFields ");

    const newErrors: { [key: string]: string } = {};
    if (!botConfig.name?.trim()) newErrors.name = "نام دستیار الزامی است";
    if (!botConfig.language) newErrors.language = "زبان الزامی است";
    if (!botConfig.tone) newErrors.tone = "شخصیت الزامی است";
    if (!botConfig.primary_color)
      newErrors.primary_color = "رنگ اصلی الزامی است";
    if (!botConfig.accent_color)
      newErrors.accent_color = "رنگ پس زمینه الزامی است";

    return newErrors;
  };

  //ذخیره استپ 4
  const saveBotBehavior = async () => {
    setIsSaving(true);
    try {
      // if (
      //   botConfig.behaviors.useSupport === true &&
      //   botConfig.behaviors.phone.trim().length < 3
      // ) {
      //   toast.info("شماره پشتیبانی را وارد کنید");
      //   return;
      // }
      console.log("behavior", botConfig.behaviors);
      const formData = new FormData();
      formData.append("uuid", botConfig.uuid);
      formData.append("k", String(botConfig.behaviors.k));
      formData.append(
        "answer_length",
        String(botConfig.behaviors.maxResponseLength)
      );
      formData.append("greetings", String(botConfig.behaviors.useGreeting));
      formData.append("use_emoji", String(botConfig.behaviors.useEmojis));

      formData.append("support_phone", botConfig.behaviors.phone);
      console.log("formdata", formData);
      const res = await axios.put(
        `${API_ROUTES.BOTS.SAVE}/${botConfig.uuid}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      if (res.data.success) return true;
      else return false;
    } catch (error: any) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || "خطایی در ذخیره تنظیمات رخ داده است.";

      toast.info(errorMessage);

      return false;
    } finally {
      setIsSaving(false);
    }
  };

  //ذخیره استپ 1
  const saveBotConfig = async () => {
    const fieldErrors = validateFields();
    console.log("fieldErrors", fieldErrors);
    console.log("logofile", logoFile);
    setErrors(fieldErrors);

    if (Object.keys(fieldErrors).length > 0) {
      const errorMessages = Object.values(fieldErrors).join("\r\n");

      toast.error(errorMessages, {
        duration: 5000,
        style: { whiteSpace: "pre-line", direction: "rtl", textAlign: "right" },
      });
      // toast.error("اطلاعات را کامل کنید ");
      return;
    }

    setIsSaving(true);
    try {
      console.log("botConfig", botConfig);
      const formData = new FormData();
      formData.append("uuid", botConfig.uuid);
      formData.append("name", botConfig.name);
      formData.append("language", botConfig.language);
      formData.append("tone", botConfig.tone);
      formData.append("primary_color", botConfig.primary_color);
      formData.append("accent_color", botConfig.accent_color);
      formData.append("button_size", botConfig.button_size);
      formData.append("widget_position", botConfig.widget_position);
      if (logoFile) {
        formData.append("logo", logoFile);
      }
      let res;
      if (botConfig.uuid) {
        // آپدیت چت بات
        res = await axios.put(
          `${API_ROUTES.BOTS.SAVE}${
            botConfig.uuid ? `/${botConfig.uuid}` : ""
          }`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        if (res.data.success) return true;
        else toast.error(res.data?.message || "خطا در ثبت اطلاعات");
      } else {
        // ثبت چت بات
        res = await axios.post(API_ROUTES.BOTS.SAVE, formData, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        if (res.data.success) {
          botConfig.uuid = res.data.data.uuid;
          console.log("uuid", res.data.data.uuid);
          localStorage.setItem(
            "aiva-onboarding-data",
            JSON.stringify(botConfig)
          );
          setLastStep(1);

          return true;
        } else {
          toast.error(res.data?.message || "خطا در ثبت اطلاعات");

          return false;
        }
      }
    } catch (err: any) {
      toast.error(
        "خطا در ثبت اطلاعات: " + (err.response?.data?.message || err.message)
      );

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
    console.log("call nextStep ", currentStep);
    if (currentStep == 1) {
      const isSaved = await saveBotConfig();
      console.log("Bot saved:", isSaved);
      if (!isSaved) return;
    }
    if (currentStep == 4) {
      const isSaved = await saveBotBehavior();
      console.log("behavior saved:", isSaved);
      if (!isSaved) return;
    }
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // اتمام و رفتن به داشبورد
      localStorage.removeItem("aiva-onboarding-data");
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
            <AivaWhite />
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
                        flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 text-sm font-medium  shadow-sm
                        ${
                          isActive
                            ? "text-white shadow-lg border-2"
                            : isCompleted
                            ? "bg-secondary text-secondary  cursor-pointer hover:scale-105 shadow-md"
                            : "bg-white border-grey-400 text-grey-600  hover:text-brand-primary"
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
                          fill="white"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        englishToPersian(String(stepNumber))
                      )}
                    </button>

                    <p
                      className={`mt-3 text-sm text-center font-medium whitespace-nowrap ${
                        isActive
                          ? "text-brand-primary"
                          : isCompleted
                          ? "text-secondary"
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
                  icon="arrow-right"
                  iconPosition="right"
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
                  icon={currentStep < totalSteps ? "arrow-left" : "check"}
                  iconPosition="left"
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
