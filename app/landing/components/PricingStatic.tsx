import React from "react";
import { Check } from "lucide-react";
import svgPaths from "../svg/svg-f338pva7p3";
import { useRouter } from "next/navigation";

// Pricing Plan Type
type PricingPlan = {
  id: string;
  name: string;
  nameEn: string;
  price: string;
  color: string;
  bgColor: string;
  icon: React.ReactNode;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
  buttonVariant: "primary" | "secondary";
};

// Icon Components
const RocketIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 28 28">
    <path
      d="M14 2.33333L25.6667 14L14 25.6667L2.33333 14L14 2.33333Z"
      stroke="currentColor"
      strokeWidth="2.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DiamondIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 28 28">
    <path
      d="M14 4.66667L21 11.6667L14 23.3333L7 11.6667L14 4.66667Z"
      stroke="currentColor"
      strokeWidth="2.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 28 28">
    <path
      d="M14 2.33333L17.5 12.25H28L19.75 18.0833L23.3333 28L14 21.5833L4.66667 28L8.25 18.0833L0 12.25H10.5L14 2.33333Z"
      stroke="currentColor"
      strokeWidth="2.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DocumentIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 28 28">
    <path
      d="M7 2.33333H21V25.6667H7V2.33333Z"
      stroke="currentColor"
      strokeWidth="2.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.6667 7H16.3333M11.6667 11.6667H16.3333M11.6667 16.3333H16.3333M11.6667 21H16.3333"
      stroke="currentColor"
      strokeWidth="2.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CrownIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 28 28">
    <path
      d="M2.33333 9.33333L7 14L14 7L21 14L25.6667 9.33333L23.3333 21H4.66667L2.33333 9.33333Z"
      stroke="currentColor"
      strokeWidth="2.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Pricing Plans Data
const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "آغازین",
    nameEn: "رایگان",
    price: "۱۵۰,۰۰۰",
    color: "#0891B2",
    bgColor: "#e7f5f3",
    icon: <RocketIcon className="w-7 h-7" />,
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
    icon: <DiamondIcon className="w-7 h-7" />,
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
    icon: <StarIcon className="w-7 h-7" />,
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
    icon: <CrownIcon className="w-7 h-7" />,
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
    icon: <DocumentIcon className="w-7 h-7" />,
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
const PricingCard = ({ plan }: { plan: PricingPlan }) => {
  const isPriceNumeric = plan.id === "enterprise" || plan.id === "advanced";
  const router = useRouter();
  const handlePlan = () => {
    router.push("http://localhost:3000/dashboard?tab=billing");
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

      <div className="p-8 flex flex-col h-full">
        {/* Header */}
        <div className="flex flex-col justify-between items-start mb-6">
          <div className="flex justify-between">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: plan.bgColor, color: plan.color }}
            >
              {plan.icon}
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
          <h3 className="text-gl font-medium text-gray-900 text-right mb-2 mt-5">
            {plan.name}
          </h3>
          <p className="text-xs text-gray-500 text-right">{plan.nameEn}</p>
        </div>

        {/* Price */}
        <div className="border-b border-gray-100 pb-6 mb-6">
          <div className="flex items-center justify-start gap-28 ">
            <div
              className="text-3xl font-semibold"
              style={{
                color: plan.isPopular ? plan.color : "#111827",
              }}
            >
              {plan.price}
            </div>
            <div className="flex flex-col ">
              <span className="text-sm text-gray-500">تومان</span>
              <span className="text-xs text-gray-400">/ ماه</span>
            </div>
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-3.5 mb-8 flex-1">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3 text-right">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ backgroundColor: plan.bgColor, color: plan.color }}
              >
                <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
              </div>
              <span className="text-base text-gray-700 flex-1">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Button */}
        <button
          onClick={handlePlan}
          className={`w-full py-4 px-6 cursor-pointer rounded-xl text-lg font-normal transition-all ${
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
          {plan.buttonText}
        </button>
      </div>
    </div>
  );
};

// Main Pricing Component
export default function PricingStatic() {
  return (
    <div className="min-h-screen py-16 px-24" id="pricing">
      <ComponentImage />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-[#65BCB6]" />
            <span className="text-sm font-medium text-[#65BCB6]">
              پلن های خرید
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            پلنی که با کسب‌وکارت همساز باشه انتخاب کن
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            از رایگان شروع کن یا با پلن‌های حرفه‌ای، کسب‌وکارت رو به سطح جدیدی
            ببر
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </div>
  );
}
function ComponentImage() {
  return (
    <div className="absolute w-1/3 left-0 bottom-10">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 472 524"
      >
        <g id="3333 1">
          <path
            d={svgPaths.pa006f00}
            fill="var(--fill-0, #FFE2B9)"
            id="Vector"
          />
          <path
            d={svgPaths.p26d43e00}
            fill="var(--fill-0, #FEDBAA)"
            id="Vector_2"
          />
          <path
            d={svgPaths.p2a022980}
            fill="var(--fill-0, #FEDBAA)"
            id="Vector_3"
          />
          <path
            d={svgPaths.p1d1d89f0}
            fill="var(--fill-0, #3E9896)"
            id="Vector_4"
          />
          <path
            d={svgPaths.p5695e00}
            fill="var(--fill-0, #80C4A4)"
            id="Vector_5"
          />
          <path
            d={svgPaths.p20268e00}
            fill="var(--fill-0, #FE9F73)"
            id="Vector_6"
          />
          <path
            d={svgPaths.p1a4e8580}
            fill="var(--fill-0, #ED7163)"
            id="Vector_7"
          />
          <path
            d={svgPaths.p1cd73ac0}
            fill="var(--fill-0, #D0F6FC)"
            id="Vector_8"
          />
          <path
            d={svgPaths.p3cd3eb80}
            fill="var(--fill-0, #0D93B2)"
            id="Vector_9"
          />
          <path
            d={svgPaths.pbd84f00}
            fill="var(--fill-0, #86C9D9)"
            id="Vector_10"
          />
          <path
            d={svgPaths.p16f00400}
            fill="var(--fill-0, #86C9D9)"
            id="Vector_11"
          />
          <path
            d={svgPaths.p2fb1f5f0}
            fill="var(--fill-0, #86C9D9)"
            id="Vector_12"
          />
          <path
            d={svgPaths.p18ed1300}
            fill="var(--fill-0, #20111D)"
            id="Vector_13"
          />
          <path
            d={svgPaths.p36be7d00}
            fill="var(--fill-0, #FE9F73)"
            id="Vector_14"
          />
          <path
            d={svgPaths.p10f1d900}
            fill="var(--fill-0, #FE9F73)"
            id="Vector_15"
          />
          <path
            d={svgPaths.p3745a300}
            fill="var(--fill-0, #F78A5E)"
            id="Vector_16"
          />
          <path
            d={svgPaths.p1027b500}
            fill="var(--fill-0, black)"
            id="Vector_17"
          />
          <path
            d={svgPaths.p1b0e5200}
            fill="var(--fill-0, #FE9F73)"
            id="Vector_18"
          />
          <path
            d={svgPaths.p116ac900}
            fill="var(--fill-0, #F78A5E)"
            id="Vector_19"
          />
          <path
            d={svgPaths.p3c61ea00}
            fill="var(--fill-0, black)"
            id="Vector_20"
          />
          <path
            d={svgPaths.p171ec320}
            fill="var(--fill-0, #FE9F73)"
            id="Vector_21"
          />
          <path
            d={svgPaths.p2c702300}
            fill="var(--fill-0, #FE9F73)"
            id="Vector_22"
          />
          <path
            d={svgPaths.p3e565500}
            fill="var(--fill-0, #F78A5E)"
            id="Vector_23"
          />
          <path
            d={svgPaths.p583e2b0}
            fill="var(--fill-0, black)"
            id="Vector_24"
          />
          <path
            d={svgPaths.pb1ba680}
            fill="var(--fill-0, black)"
            id="Vector_25"
          />
          <path
            d={svgPaths.p1c79fe80}
            fill="var(--fill-0, #F78A5E)"
            id="Vector_26"
          />
          <path
            d={svgPaths.p1c9d6e00}
            fill="var(--fill-0, black)"
            id="Vector_27"
          />
          <path
            d={svgPaths.p8b8ea00}
            fill="var(--fill-0, black)"
            id="Vector_28"
          />
          <path
            d={svgPaths.p6cabbb0}
            fill="var(--fill-0, black)"
            id="Vector_29"
          />
          <path
            d={svgPaths.p2a9c6a00}
            fill="var(--fill-0, #000100)"
            id="Vector_30"
          />
          <path
            d={svgPaths.p35a43780}
            fill="var(--fill-0, #000100)"
            id="Vector_31"
          />
          <path
            d={svgPaths.p1c6ba00}
            fill="var(--fill-0, black)"
            id="Vector_32"
          />
          <path
            d={svgPaths.p14e3e500}
            fill="var(--fill-0, #FE9F73)"
            id="Vector_33"
          />
          <path
            d={svgPaths.p188f2600}
            fill="var(--fill-0, #ED7163)"
            id="Vector_34"
          />
          <path
            d={svgPaths.p49d9340}
            fill="var(--fill-0, #D0F6FC)"
            id="Vector_35"
          />
          <path
            d={svgPaths.p1ff38f00}
            fill="var(--fill-0, #0D93B2)"
            id="Vector_36"
          />
          <path
            d={svgPaths.p3e617800}
            fill="var(--fill-0, #86C9D9)"
            id="Vector_37"
          />
          <path
            d={svgPaths.p239c0600}
            fill="var(--fill-0, #86C9D9)"
            id="Vector_38"
          />
          <path
            d={svgPaths.p28d1be00}
            fill="var(--fill-0, #86C9D9)"
            id="Vector_39"
          />
          <path
            d={svgPaths.p3fae9700}
            fill="var(--fill-0, #20111D)"
            id="Vector_40"
          />
          <path
            d={svgPaths.p187fa180}
            fill="var(--fill-0, #FE9F73)"
            id="Vector_41"
          />
          <path
            d={svgPaths.p31237c80}
            fill="var(--fill-0, #FE9F73)"
            id="Vector_42"
          />
          <path
            d={svgPaths.p876e200}
            fill="var(--fill-0, #F78A5E)"
            id="Vector_43"
          />
          <path
            d={svgPaths.p1cb1ab70}
            fill="var(--fill-0, black)"
            id="Vector_44"
          />
          <path
            d={svgPaths.p22527480}
            fill="var(--fill-0, #FE9F73)"
            id="Vector_45"
          />
          <path
            d={svgPaths.p166f5080}
            fill="var(--fill-0, #F78A5E)"
            id="Vector_46"
          />
          <path
            d={svgPaths.p279da129}
            fill="var(--fill-0, black)"
            id="Vector_47"
          />
          <path
            d={svgPaths.p1cc71200}
            fill="var(--fill-0, #FE9F73)"
            id="Vector_48"
          />
          <path
            d={svgPaths.p20cae1f0}
            fill="var(--fill-0, #FE9F73)"
            id="Vector_49"
          />
          <path
            d={svgPaths.p174dfb00}
            fill="var(--fill-0, #F78A5E)"
            id="Vector_50"
          />
          <path
            d={svgPaths.p2c855580}
            fill="var(--fill-0, black)"
            id="Vector_51"
          />
          <path
            d={svgPaths.p3bc2e330}
            fill="var(--fill-0, black)"
            id="Vector_52"
          />
          <path
            d={svgPaths.p3a5ad750}
            fill="var(--fill-0, #F78A5E)"
            id="Vector_53"
          />
          <path
            d={svgPaths.p362d970}
            fill="var(--fill-0, black)"
            id="Vector_54"
          />
          <path
            d={svgPaths.p3428c3c0}
            fill="var(--fill-0, black)"
            id="Vector_55"
          />
          <path
            d={svgPaths.p1df51e80}
            fill="var(--fill-0, black)"
            id="Vector_56"
          />
          <path
            d={svgPaths.p401c570}
            fill="var(--fill-0, #000100)"
            id="Vector_57"
          />
          <path
            d={svgPaths.p3f4c1ef0}
            fill="var(--fill-0, #000100)"
            id="Vector_58"
          />
          <path
            d={svgPaths.p1d1b0d80}
            fill="var(--fill-0, black)"
            id="Vector_59"
          />
          <path
            d={svgPaths.p1c7cff00}
            fill="var(--fill-0, #F7597F)"
            id="Vector_60"
          />
          <path
            d={svgPaths.p11f12e00}
            fill="var(--fill-0, #F86A8C)"
            id="Vector_61"
          />
          <path
            d={svgPaths.p6e6dac0}
            fill="var(--fill-0, white)"
            id="Vector_62"
          />
          <path
            d={svgPaths.p1562e600}
            fill="var(--fill-0, white)"
            id="Vector_63"
          />
          <path
            d={svgPaths.p34379800}
            fill="var(--fill-0, white)"
            id="Vector_64"
          />
          <path
            d={svgPaths.p1bdcc000}
            fill="var(--fill-0, white)"
            id="Vector_65"
          />
          <path
            d={svgPaths.p19dbd900}
            fill="var(--fill-0, white)"
            id="Vector_66"
          />
          <path
            d={svgPaths.p2531c800}
            fill="var(--fill-0, white)"
            id="Vector_67"
          />
          <path
            d={svgPaths.p1b452a80}
            fill="var(--fill-0, white)"
            id="Vector_68"
          />
          <path
            d={svgPaths.p3ace1f00}
            fill="var(--fill-0, white)"
            id="Vector_69"
          />
          <path
            d={svgPaths.p3d268480}
            fill="var(--fill-0, white)"
            id="Vector_70"
          />
          <path
            d={svgPaths.p4031f40}
            fill="var(--fill-0, white)"
            id="Vector_71"
          />
          <path
            d={svgPaths.p1e363780}
            fill="var(--fill-0, white)"
            id="Vector_72"
          />
          <path
            d={svgPaths.p6eb5800}
            fill="var(--fill-0, white)"
            id="Vector_73"
          />
          <path
            d={svgPaths.p263f400}
            fill="var(--fill-0, white)"
            id="Vector_74"
          />
          <path
            d={svgPaths.p33313a80}
            fill="var(--fill-0, white)"
            id="Vector_75"
          />
          <path
            d={svgPaths.p2671fc00}
            fill="var(--fill-0, white)"
            id="Vector_76"
          />
          <path
            d={svgPaths.p39153540}
            fill="var(--fill-0, white)"
            id="Vector_77"
          />
          <path
            d={svgPaths.p25c56900}
            fill="var(--fill-0, white)"
            id="Vector_78"
          />
          <path
            d={svgPaths.p35830e00}
            fill="var(--fill-0, white)"
            id="Vector_79"
          />
          <path
            d={svgPaths.p44091c0}
            fill="var(--fill-0, white)"
            id="Vector_80"
          />
          <path
            d={svgPaths.p397c3780}
            fill="var(--fill-0, white)"
            id="Vector_81"
          />
          <path
            d={svgPaths.p2883a4f0}
            fill="var(--fill-0, white)"
            id="Vector_82"
          />
          <path
            d={svgPaths.p2b065400}
            fill="var(--fill-0, white)"
            id="Vector_83"
          />
          <path
            d={svgPaths.p16d6ca00}
            fill="var(--fill-0, #FECC86)"
            id="Vector_84"
          />
          <path
            d={svgPaths.p163a3800}
            fill="var(--fill-0, #EFA348)"
            id="Vector_85"
          />
          <path
            d={svgPaths.pfd1800}
            fill="var(--fill-0, #EFA348)"
            id="Vector_86"
          />
          <path
            d={svgPaths.p1e6e1e00}
            fill="var(--fill-0, #EFA348)"
            id="Vector_87"
          />
          <path
            d={svgPaths.p38483b00}
            fill="var(--fill-0, #EFA348)"
            id="Vector_88"
          />
          <path
            d={svgPaths.p67aef80}
            fill="var(--fill-0, #EFA348)"
            id="Vector_89"
          />
          <path
            d={svgPaths.p1d109180}
            fill="var(--fill-0, #1D1D1B)"
            id="Vector_90"
          />
          <path
            d={svgPaths.p12186680}
            fill="var(--fill-0, white)"
            id="Vector_91"
          />
          <path
            d={svgPaths.p189637a0}
            fill="var(--fill-0, #5AB3BF)"
            id="Vector_92"
          />
          <path
            d={svgPaths.p34031900}
            fill="var(--fill-0, white)"
            id="Vector_93"
          />
          <path
            d={svgPaths.p343bcc80}
            fill="var(--fill-0, white)"
            id="Vector_94"
          />
          <path
            d={svgPaths.p215dce80}
            fill="var(--fill-0, white)"
            id="Vector_95"
          />
          <path
            d={svgPaths.p429e00}
            fill="var(--fill-0, #6095AB)"
            id="Vector_96"
          />
          <path
            d={svgPaths.p316475d2}
            fill="var(--fill-0, #6095AB)"
            id="Vector_97"
          />
          <path
            d={svgPaths.p34abe780}
            fill="var(--fill-0, #CC154A)"
            id="Vector_98"
          />
          <path
            d={svgPaths.p25994fc0}
            fill="var(--fill-0, #F7597F)"
            id="Vector_99"
          />
          <path
            d={svgPaths.p6158980}
            fill="var(--fill-0, #F7597F)"
            id="Vector_100"
          />
        </g>
      </svg>
    </div>
  );
}
