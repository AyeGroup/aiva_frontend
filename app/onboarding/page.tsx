"use client";
import axiosInstance from "@/lib/axiosInstance";
import PageLoader from "@/components/pageLoader";
import { Card } from "@/components/card";
import { toast } from "sonner";
import { useBot } from "@/providers/BotProvider";
import { Button } from "@/components/button";
import { Header } from "@/components/header/header";
import { useAuth } from "@/providers/AuthProvider";
import { AivaWhite } from "@/public/icons/AppIcons";
import { API_ROUTES } from "@/constants/apiRoutes";
import { WizardStep1 } from "./steps/step1";
import { WizardStep2 } from "./steps/step2";
import { WizardStep3 } from "./steps/step3";
import { WizardStep4 } from "./steps/step4";
import { WizardStep5 } from "./steps/step5";
import { WizardStep6 } from "./steps/step6";
import { ChatPreview } from "./chat-preview";
import { onboardingData } from "./onboarding.data";
import { convertToPersian } from "@/utils/common";
import { englishToPersian } from "@/utils/number-utils";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BehaviorSettings, BotConfig } from "@/types/common";

export default function OnboardingWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { refreshBots, setCurrentBot } = useBot();
  const { user, loading } = useAuth();
  const { title, subtitle, steps } = onboardingData;
  const [currentStep, setCurrentStep] = useState(1);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const initialBehaviorSettings: BehaviorSettings = {
    k: 10,
    maxResponseLength: "medium",
    useGreeting: true,
    useEmojis: false,
    support_phone: "",
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
    active: true,
    behaviors: initialBehaviorSettings,
  });
  const totalSteps = steps.length;
  console.log("mina", id);

  useEffect(() => {
    // authentication
    if (!loading && !user) router.push("/auth/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (!user?.token) return;

    const fetchBotData = async () => {
      try {
        // ✅ اگر id وجود دارد و مقدار آن new نیست، از API بگیر
        if (id && id !== "new" && id.length > 3) {
          const response = await axiosInstance.get(
            `${API_ROUTES.BOTS.GET}${id}`
          );
          const hasApiData = response.data?.success && response.data?.data;

          if (hasApiData) {
            const botData = response.data.data;

            // لود سوالات متداول (FAQ)
            const response2 = await axiosInstance.get(API_ROUTES.FAQ(id));
            const faqs =
              response2.data?.success && Array.isArray(response2.data?.data)
                ? response2.data.data
                : [];

            const updatedBotConfig = { ...botData, faqs };

            setBotConfig(updatedBotConfig);
            setCurrentStep(response.data?.currentStep || 1);

            // ذخیره در localStorage برای دفعات بعد
            localStorage.setItem(
              "aiva-onboarding-data",
              JSON.stringify({
                botConfig: updatedBotConfig,
                currentStep: response.data?.currentStep || 1,
                timestamp: new Date().toISOString(),
              })
            );
            return; // خروج بعد از دریافت داده از API
          }
        } else if (!id) {
          const savedData = localStorage.getItem("aiva-onboarding-data");
          if (savedData) {
            const parsed = JSON.parse(savedData);
            setBotConfig(parsed.botConfig || botConfig);
            setCurrentStep(parsed.currentStep || 1);
          }
        } else {
          setCurrentStep(1);
        }
      } catch (error) {
        console.warn("خطا در دریافت داده‌های بات:", error);
        // اگر خطا رخ دهد، از localStorage استفاده کن
        const savedData = localStorage.getItem("aiva-onboarding-data");
        if (savedData) {
          const parsed = JSON.parse(savedData);
          setBotConfig(parsed.botConfig || botConfig);
          setCurrentStep(parsed.currentStep || 1);
        }
      }
    };

    fetchBotData();
  }, [user?.token, id]);

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

  const loadOnboardingData = async () => {
    try {
      const savedData = localStorage.getItem("aiva-onboarding-data");
      if (!savedData) return;

      const parsedData = JSON.parse(savedData);

      if (parsedData.botConfig?.uuid) {
        try {
          const response = await axiosInstance.get(
            `${API_ROUTES.BOTS.GET}${parsedData.botConfig.uuid}`
          );
          const hasApiData = response.data?.success && response.data?.data;

          setBotConfig(hasApiData ? response.data.data : parsedData.botConfig);
          setCurrentStep(
            response.data?.currentStep || parsedData.currentStep || 1
          );

          // console.log("1", response.data.data);
          const response2 = await axiosInstance.get(
            API_ROUTES.FAQ(parsedData.botConfig.uuid)
          );
          const faqs = response2.data?.success && response2.data?.data;
          // console.log("2", response2.data.data);
          const updatedBotConfig = {
            ...(hasApiData ? response.data.data : parsedData.botConfig),
            faqs: faqs,
          };

          setBotConfig(updatedBotConfig);
          // console.log("3", updatedBotConfig);

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
          console.warn("API fetch failed, using local data:", apiError);
          setBotConfig(parsedData.botConfig);
          setCurrentStep(parsedData.currentStep || 1);
        }
      } else {
        setBotConfig(parsedData.botConfig);
        setCurrentStep(1);
      }
    } catch (error) {
      console.warn("خطا در بارگذاری اطلاعات ذخیره شده:", error);
    }
  };

  const validateFields = (step: number) => {
    const newErrors: { [key: string]: string } = {};
    if (step === 1) {
      if (!botConfig.name?.trim()) newErrors.name = "نام دستیار الزامی است";
      if (!botConfig.language) newErrors.language = "زبان الزامی است";
      if (!botConfig.description?.trim())
        newErrors.description = "توضیحات الزامی است";
      if (!botConfig.guidelines)
        newErrors.guidelines = "دستورالعمل‌ها الزامی است";
    } else if (step === 2) {
      if (!botConfig.tone) newErrors.tone = "شخصیت الزامی است";
      if (!botConfig.primary_color)
        newErrors.primary_color = "رنگ اصلی الزامی است";
      if (!botConfig.accent_color)
        newErrors.accent_color = "رنگ پس زمینه الزامی است";
    }

    return newErrors;
  };

  //ذخیره استپ 5
  const saveBotBehavior = async () => {
    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append("uuid", botConfig.uuid);
      formData.append("k", String(botConfig.behaviors?.k) || "5");
      formData.append(
        "answer_length",
        String(botConfig.behaviors?.maxResponseLength) || "short"
      );
      formData.append(
        "greetings",
        String(botConfig.behaviors?.useGreeting) || "false"
      );
      formData.append(
        "use_emoji",
        String(botConfig.behaviors?.useEmojis) || "true"
      );
      formData.append(
        "support_phone",
        botConfig.behaviors?.support_phone || ""
      );
      const res = await axiosInstance.put(
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

  //ذخیره استپ 2
  const saveBotAppearance = async () => {
    const fieldErrors = validateFields(2);
    setErrors(fieldErrors);

    if (Object.keys(fieldErrors).length > 0) {
      const errorMessages = Object.values(fieldErrors).join("\r\n");

      toast.error(errorMessages, {
        duration: 5000,
        style: {
          whiteSpace: "pre-line",
          direction: "rtl",
          textAlign: "right",
        },
      });
      return;
    }

    setIsSaving(true);
    try {
      const formData = new FormData();

      formData.append("uuid", botConfig.uuid);
      formData.append("tone", botConfig.tone);
      formData.append("primary_color", botConfig.primary_color);
      formData.append("accent_color", botConfig.accent_color);
      formData.append("button_size", botConfig.button_size);
      formData.append("widget_position", botConfig.widget_position);
      if (logoFile) formData.append("logo", logoFile);

      const res = await axiosInstance.put(
        `${API_ROUTES.BOTS.SAVE}/${botConfig.uuid}`,
        formData
      );
      if (res.data.success) {
        //"http://localhost:8000/api/public/69887282-c486-4302-ab96-7995ad0f0cc5/logo"
        // if (logoFile) {
        // const path =
        // process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";
        // botConfig.logo_url = `${path}/public/${botConfig.uuid}/logo`;
        // }
        return true;
      } else return false;
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
    const fieldErrors = validateFields(1);
    setErrors(fieldErrors);

    if (Object.keys(fieldErrors).length > 0) {
      const errorMessages = Object.values(fieldErrors).join("\r\n");

      toast.error(errorMessages, {
        duration: 5000,
        style: { whiteSpace: "pre-line", direction: "rtl", textAlign: "right" },
      });
      return;
    }

    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append("uuid", botConfig.uuid);
      formData.append("name", botConfig.name);
      formData.append("language", botConfig.language);
      formData.append("description", botConfig.description);
      formData.append("guidelines", botConfig.guidelines);

      let res;
      if (botConfig.uuid) {
        // آپدیت چت بات
        res = await axiosInstance.put(
          `${API_ROUTES.BOTS.SAVE}${
            botConfig.uuid ? `/${botConfig.uuid}` : ""
          }`,
          formData
        );
        if (res.data.success) {
          await refreshBots();

          return true;
        } else {
          toast.error(res.data?.message || "خطا در ثبت اطلاعات");
          return false;
        }
      } else {
        // ثبت چت بات
        res = await axiosInstance.post(API_ROUTES.BOTS.SAVE, formData);
        if (res.data.success) {
          const newId = res.data.data?.uuid;
          // console.log("new id: ", newId);

          const updated = { ...botConfig, uuid: newId };
          setBotConfig(updated);
          localStorage.setItem("aiva-onboarding-data", JSON.stringify(updated));
          await refreshBots();
          setCurrentBot(updated);

          return newId;
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
      return false;
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
    if (currentStep == 1) {
      const uuid = await saveBotConfig();
      if (!uuid) return;
    } else if (currentStep == 2) {
      const isSaved = await saveBotAppearance();
      if (!isSaved) return;
    } else if (currentStep == 5) {
      const isSaved = await saveBotBehavior();
      if (!isSaved) return;
    }
    console.log("botConfig.uuid  :", botConfig.uuid);

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
    if (botConfig.uuid) setCurrentStep(step);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <WizardStep1 botConfig={botConfig} updateConfig={updateBotConfig} />
        );
      case 2:
        return (
          <WizardStep6
            botConfig={botConfig}
            updateConfig={updateBotConfig}
            errors={errors}
            logoFile={logoFile}
            setLogoFile={setLogoFile}
          />
        );

      case 3:
        return (
          <WizardStep2 botConfig={botConfig} updateConfig={updateBotConfig} />
        );
      case 4:
        return (
          <WizardStep4 botConfig={botConfig} updateConfig={updateBotConfig} />
        );
      case 5:
        return (
          <WizardStep3 botConfig={botConfig} updateConfig={updateBotConfig} />
        );
      case 6:
        return <WizardStep5 botConfig={botConfig} />;
      default:
        return (
          <WizardStep1 botConfig={botConfig} updateConfig={updateBotConfig} />
        );
    }
  };
  console.log("q id: ", id);
  if (loading) return <PageLoader />;
  if (!user) return null;

  return (
    <main className="onboarding-wizard min-h-screen bg-bg-app" dir="rtl">
      {!id && <Header currentPage="onboarding" isOnboarding={true} />}
      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Clean Minimal Header */}
        <div className="flex flex-col justify-center items-center mb-16">
          <div className="flex items-center justify-center w-14 h-14 bg-brand-primary rounded-xl shadow-lg mb-6">
            <div className="text-white w-7 h-7">
              <AivaWhite />
            </div>
          </div>

          <div className="text-grey-900 mb-4 font-bold text-lg text-center">
            {title}
          </div>
          <div className="text-grey-700 max-w-lg mx-auto text-center">
            {subtitle}
          </div>
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
                  // disabled={currentStep === 1}
                  icon="arrow-right"
                  iconPosition="right"
                  className={`${
                    currentStep == 1 ? "!invisible" : ""
                  } px-6 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  قبلی
                </Button>

                {/* Minimal Step Counter */}
                <div className="bg-white border border-grey-200 px-4 py-2 rounded-lg shadow-sm">
                  <span className="text-sm text-grey-700 font-medium">
                    {convertToPersian(String(currentStep))} از{" "}
                    {convertToPersian(String(totalSteps))}
                  </span>
                </div>
                {(!id || id === "new") && (
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
                  </Button>
                )}
              </div>
            </div>

            {/* Preview Sidebar */}
            <div className="lg:col-span-1">
              <div className="top-8  w-full h-[700px]">
                <ChatPreview currentStep={currentStep} botConfig={botConfig} />
              </div>
            </div>
          </div>
        </div>

        {/* Clean Exit Link */}
        <div className="text-center mt-16">
          <button
            onClick={() => {
              localStorage.removeItem("aiva-onboarding-data");
              router.push("/");
            }}
            className="text-grey-600 hover:text-grey-900 text-sm underline transition-colors font-medium cursor-pointer"
          >
            انصراف و بازگشت به صفحه اصلی
          </button>
        </div>
      </div>
    </main>
  );
}
