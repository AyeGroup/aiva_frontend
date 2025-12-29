"use client";
import Image from "next/image";
import PageLoader from "@/components/pageLoader";
import FloatSideMenu from "./FloatSideMenu";
import axiosInstance from "@/lib/axiosInstance";
import { Card } from "@/components/card";
import { toast } from "sonner";
import { useBot } from "@/providers/BotProvider";
import { Button } from "@/components/button";
import { useAuth } from "@/providers/AuthProvider";
import { BotConfig } from "@/types/common";
import { BarChart3 } from "lucide-react";
import { API_ROUTES } from "@/constants/apiRoutes";
import { headerData } from "@/components/header/header.data";
import { WizardStep1 } from "./steps/step1";
import { WizardStep2 } from "./steps/step2";
import { WizardStep3 } from "./steps/step3";
import { WizardStep4 } from "./steps/step4";
import { WizardStep5 } from "./steps/step5";
import { WizardStep6 } from "./steps/step6";
import { ChatPreview } from "./chat-preview";
import { StatsDrawer } from "../dashboard/widgets/stats-drawer";
import { onboardingData } from "./onboarding.data";
import { convertToPersian } from "@/utils/common";
import { englishToPersian } from "@/utils/number-utils";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getPlanCodeById, getPlanIcon, PlanCode } from "@/constants/plans";

export default function OnboardingWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const isNew = !id || id === "new";
  const { logo } = headerData;
  const { user, loading } = useAuth();
  const { title, subtitle, steps } = onboardingData;
  const { refreshBots, setCurrentBot } = useBot();
  const [currentStep, setCurrentStep] = useState(1);
  const [maxReachedStep, setMaxReachedStep] = useState(1);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isStatsDrawerOpen, setIsStatsDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSubscrp, setActiveSubscrp] = useState<PlanCode>("FREE");
  const totalSteps = steps.length;
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
    k: 10,
    answer_length: "medium",
    greetings: true,
    use_emoji: false,
    support_phone: "",
    bale_enabled: false,
    bale_token: "",
    require_user_phone: false,
    require_user_name: false,
    require_user_email: false,
  });

  //fix url in new mode
  useEffect(() => {
    const id = searchParams.get("id");
    if (id === "new") {
      router.replace("/dashboard?tab=onboarding");
    }
  }, []);

  // authentication
  useEffect(() => {
    if (!loading && !user) router.push("/auth/login");
  }, [user, loading, router]);

  // get data
  useEffect(() => {
    if (!user?.token) return;

    const fetchBotData = async () => {
      try {
        if (id && id !== "new" && id.length > 3) {
          const response = await axiosInstance.get(
            `${API_ROUTES.BOTS.GET}/${id}`
          );
          const hasApiData = response.data?.success && response.data?.data;

          if (hasApiData) {
            const botData = response.data.data;
            const response2 = await axiosInstance.get(API_ROUTES.BOTS.FAQ(id));
            const faqs =
              response2.data?.success && Array.isArray(response2.data?.data)
                ? response2.data.data
                : [];

            const updatedBotConfig = { ...botData, faqs };
            setBotConfig(updatedBotConfig);
            const apiCurrent = response.data?.currentStep || 1;
            setCurrentStep(apiCurrent);
            setMaxReachedStep(apiCurrent);

            localStorage.setItem(
              "aiva-onboarding-data",
              JSON.stringify({
                botConfig: updatedBotConfig,
                currentStep: apiCurrent,
                timestamp: new Date().toISOString(),
              })
            );
            return;
          }
        } else if (!id) {
          const savedData = localStorage.getItem("aiva-onboarding-data");
          if (savedData) {
            const parsed = JSON.parse(savedData);
            const savedTime = new Date(parsed.timestamp).getTime();
            const now = Date.now();
            const hoursPassed = (now - savedTime) / (1000 * 60 * 60);

            if (hoursPassed > 1) {
              // ⏳ اگر بیش از ۲۴ ساعت گذشته باشد، پاک کن
              localStorage.removeItem("aiva-onboarding-data");
              console.log("⚠️ داده قدیمی onboarding حذف شد (بیش از 24 ساعت)");
            } else {
              // ✅ داده معتبر است
              setBotConfig(parsed.botConfig || botConfig);
              const savedCurrent = parsed.currentStep || 1;
              setCurrentStep(savedCurrent);
              setMaxReachedStep(savedCurrent);
            }
          }
        } else {
          localStorage.removeItem("aiva-onboarding-data");
          setCurrentStep(1);
          setMaxReachedStep(1);
        }
      } catch (error) {
        console.warn("خطا در دریافت داده‌های بات:", error);
        const savedData = localStorage.getItem("aiva-onboarding-data");
        if (savedData) {
          const parsed = JSON.parse(savedData);
          const savedTime = new Date(parsed.timestamp).getTime();
          const now = Date.now();
          const hoursPassed = (now - savedTime) / (1000 * 60 * 60);
          if (hoursPassed <= 24) {
            setBotConfig(parsed.botConfig || botConfig);
            const savedCurrent = parsed.currentStep || 1;
            setCurrentStep(savedCurrent);
            setMaxReachedStep(savedCurrent);
          } else {
            localStorage.removeItem("aiva-onboarding-data");
          }
        }
      }
    };

    fetchBotData();
  }, [user?.token, id]);

  //get active subscription
  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let subsc: PlanCode = "FREE";
        if (id && id.length > 3) {
          const response = await axiosInstance.get(
            API_ROUTES.FINANCIAL.SUBSCRIPTION(id)
          );
          if (response && response.status === 200)
            subsc = getPlanCodeById(response.data.data.plan) ?? "FREE";
        }
        // console.log("bot id: ", id);
        console.log("active SUBSCRIPTION: ", subsc);
        setActiveSubscrp(subsc);
      } catch (error) {
        console.error("خطا در دریافت داده کاربران:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [user]);

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

   const [permissions, setPermissions] = useState({
     canChatbotK: false,
     canChatbotEmoji: false,
     canChatbotGreetings: false,
     canChatbotanswerLength: false,
     canChatbotSupportPhone: false,
   });

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
      console.log("step5 save: ", botConfig);

      // بررسی اینکه آیا حداقل یک permission وجود دارد
      const hasAnyPermission =
        permissions.canChatbotK ||
        permissions.canChatbotanswerLength ||
        permissions.canChatbotGreetings ||
        permissions.canChatbotEmoji ||
        permissions.canChatbotSupportPhone;

      // اگر هیچ permission نداشت، API کال نشود
      console.log("hasAnyPermission: ", hasAnyPermission);
      if (!hasAnyPermission) {
        console.log("No permissions available, skipping save");
        return true; // یا false بسته به منطق شما
      }

      const formData = new FormData();
      formData.append("uuid", botConfig.uuid);

      // فقط فیلدهایی که permission دارند را ارسال کنید
      if (permissions.canChatbotK) {
        formData.append("k", String(botConfig?.k) || "5");
      }

      if (permissions.canChatbotanswerLength) {
        formData.append(
          "answer_length",
          String(botConfig?.answer_length) || "short"
        );
      }

      if (permissions.canChatbotGreetings) {
        formData.append("greetings", String(botConfig?.greetings) || "false");
      }

      if (permissions.canChatbotEmoji) {
        formData.append("use_emoji", botConfig?.use_emoji ? "true" : "false");
      }

      if (permissions.canChatbotSupportPhone) {
        formData.append("support_phone", botConfig?.support_phone || "");
      }

      const res = await axiosInstance.put(
        `${API_ROUTES.BOTS.SAVE}/${botConfig.uuid}`,
        formData
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

  const saveBotBehavior1 = async () => {
    setIsSaving(true);

    // if (!can_advanced_stats) return true;
    try {
      console.log("step5 save: ", botConfig);
      const formData = new FormData();
      formData.append("uuid", botConfig.uuid);

      formData.append("k", String(botConfig?.k) || "5");
      formData.append(
        "answer_length",
        String(botConfig?.answer_length) || "short"
      );
      formData.append("greetings", String(botConfig?.greetings) || "false");
      formData.append("use_emoji", botConfig?.use_emoji ? "true" : "false");
      formData.append("support_phone", botConfig?.support_phone || "");

      const res = await axiosInstance.put(
        `${API_ROUTES.BOTS.SAVE}/${botConfig.uuid}`,
        formData
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

    const formData = new FormData();
    formData.append("uuid", botConfig.uuid || "");
    formData.append("name", botConfig.name);
    formData.append("language", botConfig.language);
    formData.append("description", botConfig.description);
    formData.append("guidelines", botConfig.guidelines);
    formData.append("require_user_email", String(botConfig.require_user_email));
    formData.append("require_user_name", String(botConfig.require_user_name));
    formData.append("require_user_phone", String(botConfig.require_user_phone));

    try {
      let res;

      if (botConfig.uuid) {
        // 🔹 تلاش برای آپدیت چت‌بات
        try {
          res = await axiosInstance.put(
            `${API_ROUTES.BOTS.SAVE}/${botConfig.uuid}`,
            formData
          );

          if (res.data.success) {
            await refreshBots();
            return true;
          } else {
            //here:
            toast.error(res.data?.message || "خطا در ثبت اطلاعات");
            return false;
          }
        } catch (err: any) {
          const status = err.response?.status;
          const msg = err.response?.data?.message || err.message || "";

          console.log("PUT error:", status, msg);

          // 🔸 اگر خطای 404 یا پیام مشابه داشت، بریم روی insert
          if (status === 404 || msg.toLowerCase().includes("not found")) {
            console.warn("Bot not found on backend. Trying insert...");
            try {
              res = await axiosInstance.post(API_ROUTES.BOTS.SAVE, formData);
              if (res.data.success) {
                const newId = res.data.data?.uuid;
                const updated = { ...botConfig, uuid: newId };
                setBotConfig(updated);
                localStorage.setItem(
                  "aiva-onboarding-data",
                  JSON.stringify(updated)
                );
                await refreshBots();
                setCurrentBot(updated);
                return newId;
              } else {
                toast.error(res.data?.message || "خطا در ثبت اطلاعات");
                return false;
              }
            } catch (insertErr: any) {
              toast.error(
                "خطا در ثبت مجدد اطلاعات: " +
                  (insertErr.response?.data?.message || insertErr.message)
              );
              console.error("Insert error:", insertErr);
              return false;
            }
          } else {
            // خطای دیگر غیر از 404
            toast.error("خطا در ثبت اطلاعات: " + msg);
            console.error(err);
            return false;
          }
        }
      } else {
        // 🟢 بدون UUID، مستقیم Insert
        try {
          res = await axiosInstance.post(API_ROUTES.BOTS.SAVE, formData);
          if (res.data.success) {
            const newId = res.data.data?.uuid;
            const updated = { ...botConfig, uuid: newId };
            setBotConfig(updated);
            localStorage.setItem(
              "aiva-onboarding-data",
              JSON.stringify(updated)
            );
            await refreshBots();
            setCurrentBot(updated);
            return newId;
          } else {
            toast.error(res.data?.message || "خطا در ثبت اطلاعات");
            return false;
          }
        } catch (err: any) {
          toast.error(
            "خطا در ثبت اطلاعات: " +
              (err.response?.data?.message || err.message)
          );
          console.error(err);
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
      // اگر uuid برگشت یعنی بات ذخیره شد؛ اما حتی اگر برنگشته هم ادامه بد
    } else if (currentStep == 2) {
      const isSaved = await saveBotAppearance();
      if (!isSaved) return;
    } else if (currentStep == 5) {
      const isSaved = await saveBotBehavior();
      if (!isSaved) return;
    }

    // Advance: مقدار جدید را محاسبه کن و maxReachedStep را ارتقا بده
    if (currentStep < totalSteps) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      setMaxReachedStep((prev) => Math.max(prev, newStep)); // <-- مهم
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
    if (botConfig.uuid) {
      setCurrentStep(step);
    } else {
      if (step <= maxReachedStep) setCurrentStep(step);
    }
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
        return <WizardStep2 botConfig={botConfig} />;
      case 4:
        return (
          <WizardStep4 botConfig={botConfig} updateConfig={updateBotConfig} />
        );
      case 5:
        return (
          <WizardStep3
            botConfig={botConfig}
            updateConfig={updateBotConfig}
            onPermissionsChange={setPermissions}
          />
        );
      case 6:
        return <WizardStep5 botConfig={botConfig} />;
      default:
        return (
          <WizardStep1 botConfig={botConfig} updateConfig={updateBotConfig} />
        );
    }
  };

  const saveCaption = () => {
    if (isSaving) return "در حال ذخیره...";

    if (isNew) {
      return currentStep === totalSteps ? "اتمام و شروع" : "بعدی";
    } else {
      if (currentStep === 1 || currentStep === 2 || currentStep === 5)
        return "ثبت";
      else return "بعدی";
    }
  };

  if (loading || isLoading) return <PageLoader />;
  if (!user) return null;
  const showButton = isNew || currentStep < totalSteps;

  return (
    <main className="onboarding-wizard h-screen overflow-y-auto bg-bg-app">
      <div className="container   mx-auto px-6 lg:pr-2 lg:pl-12 py-4 relative z-10">
        {/* Clean Minimal Header */}
        {isNew && <FloatSideMenu activePlan={activeSubscrp} />}
        <div className="flex justify-between items-center px-10">
          <div className="flex items-center ">
            <button
              onClick={() => router.push("/landing")}
              title={logo.title}
              className="flex items-center gap-3 hover:opacity-80 animate-soft group"
              aria-label="برگشت به صفحه اصلی"
            >
              {/* تصویر لوگو */}
              {logo.image ? (
                <Image
                  src="/logo.webp"
                  width={50}
                  height={40}
                  alt="Logo"
                  className="mt-1"
                  style={{ width: "auto", height: "40px" }}
                />
              ) : (
                <div className="h-8 w-8 lg:h-10 lg:w-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                  <span className="text-white text-sm lg:text-lg">
                    {logo.text?.charAt(0)}
                  </span>
                </div>
              )}

              {/* متن لوگو */}
              <div className="flex flex-col gap-0.5">
                <span className="text-grey-900 group-hover:text-brand-primary transition-colors leading-none text-right">
                  {logo.text}
                </span>
                <span className="hidden sm:block text-grey-600 text-xs leading-none">
                  دستیار هوشمند
                </span>
              </div>
            </button>
          </div>
          {!isNew && (
            <div className="">
              <button
                onClick={() => setIsStatsDrawerOpen(true)}
                className="plans-trigger-special"
                title="مشاهده پلن‌های پیشنهادی"
                aria-label="باز کردن پنل پلن‌ها"
              >
                <span className="plans-trigger-icon">
                  <BarChart3 size={20} />
                </span>
                <span className="plans-trigger-text">پلن‌ها</span>
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center items-center mb-10 -mt-4">
          <div className="flex items-center justify-center w-14 h-14 bg-brand-primary rounded-xl shadow-lg mb-6">
            <div className="text-white w-7 h-7">
              {/* <AivaWhite /> */}
              {getPlanIcon(activeSubscrp || "FREE")}
            </div>
          </div>

          <div className="text-grey-900 mb-4 font-bold text-lg text-center">
            {isNew ? title : "ویرایش چت‌بات"}
          </div>

          <div className="text-grey-700 mx-auto text-center">
            {isNew
              ? subtitle
              : "پس از اعمال تغییرات، کد نصب را مجدد در سایت خود قرار دهید."}
          </div>
        </div>
        {/* Ultra Clean Progress */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="relative max-w-4xl mx-auto m-0 p-0 pb-4">
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
                const isReached = stepNumber <= maxReachedStep; // <-- تغییر: reached به جای فقط completed

                return (
                  <div
                    key={step.id}
                    className="flex flex-col items-center flex-1  min-w-0  sm:min-w-[120px]  w-full sm:w-auto  "
                  >
                    <button
                      onClick={() => goToStep(stepNumber)}
                      className={`
        flex items-center justify-center
        w-10 h-10 sm:w-12 sm:h-12
        rounded-full text-sm font-medium shadow-sm
        transition-all duration-200
        ${
          isActive
            ? "text-white shadow-lg border-2"
            : isReached
            ? "bg-secondary text-secondary cursor-pointer hover:scale-105 shadow-md"
            : "bg-white border-grey-400 text-grey-600 hover:text-brand-primary"
        }
      `}
                      style={
                        isActive ? { background: "var(--sharp-primary)" } : {}
                      }
                      disabled={
                        botConfig.uuid ? false : !(stepNumber <= maxReachedStep)
                      }
                    >
                      {isReached && !isActive ? (
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
                      className={`
        mt-2 sm:mt-3
        text-xs sm:text-sm
        text-center font-medium
        ${
          isActive
            ? "text-brand-primary"
            : isReached
            ? "text-secondary"
            : "text-grey-600"
        }
      `}
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
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Step Content */}
            <div className="lg:col-span-2 ">
              <Card className="p-0 lg:p-8  border border-grey-200 bg-white rounded-xl shadow-lg">
                <div className="animate-soft">{renderCurrentStep()}</div>
              </Card>

              {/* Clean Navigation */}
              <div className="flex items-center justify-between mt-8">
                <Button
                  variant="tertiary"
                  onClick={prevStep}
                  icon="arrow-right"
                  iconPosition="right"
                  className={`${
                    currentStep == 1 ? "invisible!" : ""
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
                {showButton && (
                  <Button
                    variant="primary"
                    onClick={nextStep}
                    icon={currentStep < totalSteps ? "arrow-left" : "check"}
                    iconPosition="left"
                    className="px-6 shadow-md"
                  >
                    {saveCaption()}
                  </Button>
                )}
              </div>
            </div>

            {/* Preview Sidebar */}
            <div className="lg:col-span-1 ">
              <div className="top-8 sticky p-4 lg:p-1 w-full h-[800px]">
                <ChatPreview
                  currentStep={currentStep}
                  botConfig={botConfig}
                  isNew={isNew}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Clean Exit Link */}
        {!id && (
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
        )}
      </div>

      <StatsDrawer
        isOpen={isStatsDrawerOpen}
        onClose={() => setIsStatsDrawerOpen(false)}
        chatbot={botConfig}
      />
    </main>
  );
}
