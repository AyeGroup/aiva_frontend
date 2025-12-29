import React, { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { API_ROUTES } from "@/constants/apiRoutes";
import { PlanImage } from "@/public/icons/landing";
import { getFaNameByCode, getPlanIcon, getPlanNameById, translateFeature } from "@/constants/plans";
import axios from "axios";

const mapFeatures = (plan: any): { text: string; enabled: boolean }[] => {
  return [
    ...plan.features.map((f: string) => ({
      text: translateFeature(f),
      enabled: true,
    })),
    {
      text: `${plan.upload_char_limit.toLocaleString("fa-IR")} کاراکتر  `,
      enabled: true,
    },
  ];
};

const pricingPlans: any[] = [
  {
    id: "starter",
    name: "آغازین",
    nameEn: "رایگان",
    price: "۱۵۰,۰۰۰",
    color: "#0891B2",
    bgColor: "#e7f5f3",
    // icon: <RocketIcon className="w-7 h-7" />,
    icon: getPlanIcon("FREE"),

    features: [
      "۵۰ پیام ماهانه",
      "اتصال وب‌سایت به سایت",
      "ورود با ایمیل یا OTP",
      "منابع دانش پیشرفته",
    ],
    buttonText: "شروع رایگان",
    buttonVariant: "secondary",
  },
  {
    id: "basic",
    name: "پایه",
    nameEn: "Basic",
    price: "۷۵۰,۰۰۰",
    color: "#52D4A0",
    bgColor: "#e9faf2",
    // icon: <DiamondIcon className="w-7 h-7" />,
    icon: getPlanIcon("BASIC"),
    features: [
      "۱۰۰۰ پیام ماهانه",
      "ابزاری اختصاصی چت‌بات",
      "آپلود تا ۱۰ فایل / PDF/Word/Excel/CSV",
      "داشبورد مدیریت چندمنبعتر",
      "آمار پایه",
      "گزارش مصرف Credit/دینار/ماهانه",
    ],
    buttonText: "ارتقاء به پایه",
    buttonVariant: "secondary",
  },
  {
    id: "medium",
    name: "متوسط",
    nameEn: "Medium",
    price: "۱,۸۵۰,۰۰۰",
    color: "#65BCB6",
    bgColor: "#e3f3f0",
    // icon: <StarIcon className="w-7 h-7" />,
    icon: getPlanIcon("MEDIUM"),

    features: [
      "۳۰۰۰ پیام ماهانه",
      "تعیین رفتار چت‌بات",
      "کدنگاری عمومی",
      "اتصال به پیام‌رسان‌ها (واتساپ، تلگرام، اینستاگرام)",
      "آپلود تا ۵۰ فایل",
      "آنالیتیکس پیشرفته",
      "یکپار همگی",
    ],
    isPopular: true,
    buttonText: "پلن محبوب کسب‌وکارها",
    buttonVariant: "primary",
  },

  {
    id: "advanced",
    name: "پیشرفته",
    nameEn: "Advance",
    price: "۶,۵۵۵,۰۰۰",
    color: "#7C3AED",
    bgColor: "#f0edfc",
    // icon: <CrownIcon className="w-7 h-7" />,
    icon: getPlanIcon("ADVANCE"),
    features: [
      "۱۰۰۰۰ پیام ماهانه",
      "انتخاب مدل GPT 4o (سانتاکس)",
      "اتصال به Google Drive/ و Dropbox",
      "اتصال به CRM",
      "امکان خرید اشتراک برای کاربران",
      "گزارش مصرف Credit/دینار/ماهانه",
      "کنترل نقش کاربران",
      "پشتیبانی تلفنی اختصاصی",
    ],
    buttonText: "شروع با امکانات کامل",
    buttonVariant: "secondary",
  },
  {
    id: "enterprise",
    name: "شخصی سازی",
    nameEn: "Enterprise",
    price: "توافقی",
    color: "#6366F1",
    bgColor: "#ebeffc",
    // icon: <DocumentIcon className="w-7 h-7" />,
    icon: getPlanIcon("ENTERPRISE"),
    features: [
      "پیام نامحدود و منابع دانش نامحدود",
      "API اختصاصی و اتوماسیون (Zapier، Make)",
      "امنیت پیشرفته و رمزنگاری سازمانی",
      "آموزش و Onboarding اختصاصی",
      "SLA 99.95%",
      "مشاوره پیاده‌سازی و مدیر موفقیت مشتری",
    ],
    buttonText: "تماس با مشاور",
    buttonVariant: "secondary",
  },
];

// PricingCard Component
const PricingCard = ({ plan, index }: { plan: any; index: number }) => {
  const isPriceNumeric = plan.id === "enterprise" || plan.id === "advanced";
  const router = useRouter();
  const handlePlan = () => {
    router.push("/dashboard?tab=billing");
  };
  return (
    <div className="bg-white rounded-3xl border-2 overflow-hidden border-gray-300 shadow-sm relative h-full flex flex-col">
      {/* Popular Badge */}
      {isPriceNumeric ? (
        <div
          className="absolute right-0 opacity-20 size-32 top-0"
          data-name="Pricing"
          style={{
            backgroundImage:
              "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 128 128\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -18.102 -18.102 0 128 0)\\'><stop stop-color=\\'rgba(99,102,241,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(74,77,181,0.75)\\' offset=\\'0.175\\'/><stop stop-color=\\'rgba(50,51,121,0.5)\\' offset=\\'0.35\\'/><stop stop-color=\\'rgba(25,26,60,0.25)\\' offset=\\'0.525\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0.7\\'/></radialGradient></defs></svg>')",
          }}
        />
      ) : (
        <div
          className="absolute right-0 opacity-20 size-32 top-0"
          style={{
            backgroundImage:
              "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 128 128\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -18.102 -18.102 0 128 0)\\'><stop stop-color=\\'rgba(82,212,160,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(62,159,120,0.75)\\' offset=\\'0.175\\'/><stop stop-color=\\'rgba(41,106,80,0.5)\\' offset=\\'0.35\\'/><stop stop-color=\\'rgba(21,53,40,0.25)\\' offset=\\'0.525\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0.7\\'/></radialGradient></defs></svg>')",
          }}
        />
      )}

      <div className="p-6 lg:p-8 flex flex-col h-full">
        {/* Header */}
        <div className="flex flex-row lg:flex-col justify-start lg:justify-between items-center lg:items-start mb-6  gap-3 lg:gap-0">
          <div className="flex justify-between">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                backgroundColor: pricingPlans[index].bgColor,
                color: pricingPlans[index].color,
              }}
            >
              {pricingPlans[index].icon}
            </div>
            {plan.isPopular && (
              <div
                className="px-4 py-2 h-fit rounded-full shadow-lg text-white text-sm font-medium whitespace-nowrap"
                style={{ backgroundColor: plan.color }}
              >
                ⭐ محبوب‌ترین
              </div>
            )}
          </div>
          <div className=" ">
            <h3 className="text-gl font-medium text-gray-900 text-right mb-2 mt-0 lg:mt-5">
              {/* {pricingPlans[index].name}
               */}
              {getPlanNameById(index)}
            </h3>
            <p className="text-xs text-gray-500 text-right">
              {plan.description}
            </p>
          </div>
        </div>

        {/* Price */}
        <div className="border-b border-gray-100 pb-6 mb-2 lg:mb-6">
          <div className="flex items-center justify-start gap-8">
            <div
              className="text-2xl font-semibold"
              style={{
                color: plan.isPopular ? plan.color : "#111827",
              }}
            >
              {plan?.price_monthly_irr === 0
                ? "رایگان"
                : (plan?.price_monthly_irr / 10).toLocaleString("fa-IR")}
            </div>

            {plan?.price_monthly_irr !== 0 && (
              <div className="flex flex-row lg:flex-col items-center">
                <span className="text-sm text-gray-500">تومان</span>
                <span className="text-xs text-gray-400">/ ماه</span>
              </div>
            )}
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-3 mb-4 lg:mb-8 flex-1">
          {mapFeatures(plan).map((feature, index) => (
            <li key={index} className="flex items-start gap-3 text-right">
              <div className="w-5 h-5 text-primary bg-primary/20  rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
              </div>
              <span className="text-base text-gray-700 flex-1">
                {feature.text}
              </span>
            </li>
          ))}
        </ul>

        {/* Button */}
        <button
          onClick={handlePlan}
          className={`w-full py-3 lg:py-4 px-6 cursor-pointer rounded-xl text-lg font-normal transition-all ${
            plan.buttonVariant === "primary"
              ? "text-white shadow-md hover:shadow-lg"
              : "bg-white border-2 hover:shadow-md"
          }`}
          style={
            plan.buttonVariant === "primary"
              ? { backgroundColor: plan.color }
              : { borderColor: "#65BCB6", color: "#65BCB6" }
          }
        >
          {/* {plan.buttonText} */}
          {pricingPlans[index].buttonText}
        </button>
      </div>
    </div>
  );
};

// Main Pricing Component
export default function PricingPage() {
  const [plans, setPlans] = useState<any[]>([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const res = await axios.get(API_ROUTES.PAYMENT.PRICING);
        const allPlans = res.data?.data?.subscription_plans ?? [];
        setPlans(allPlans);
      } catch (apiError: any) {
        console.warn("API fetch failed:", apiError);
      }
    };

    fetchAllData();
  }, []);

  return (
    <div className="lg:min-h-screen py-16 px-12 lg:px-24" id="pricing">
      <PlanImage />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 lg:mb-16 space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-[#65BCB6]" />
            <span className="text-sm font-medium text-[#65BCB6]">
              پلن های خرید
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight">
            پلنی که با کسب‌وکارت همساز باشه انتخاب کن
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            از رایگان شروع کن یا با پلن‌های حرفه‌ای، کسب‌وکارت رو به سطح جدیدی
            ببر
          </p>
        </div>

        <div className="px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
