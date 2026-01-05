"use client";
import PhoneAndCustomer1 from "./PhoneAndCustomer1";
import {
  Sec2_Icon,
  Sec2_Icon1,
  Sec2_Icon2,
  Sec2_Icon3,
  Sec2_IconAmniat,
  Sec2_IconPoshtibani,
  Sec2_IconSarNakh,
  Sec2_IconTahlil,
  Sec2_IconYadgiri,
  Sec2_IconYekparche,
} from "@/public/icons/landing";

function BackgroundDecorations() {
  return (
    <div className="absolute inset-0 overflow-clip pointer-events-none">
      <Sec2_Icon />
      <Sec2_Icon1 />
      <Sec2_Icon2 />
      <Sec2_Icon3 />
    </div>
  );
}

function Header() {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 items-center justify-center w-full px-4">
      {/* Badge */}
      <div className="flex items-center justify-center rounded-3xl bg-[#e7f3f1] border border-[rgba(101,188,182,0.15)] py-2 px-4">
        <div className="bg-[#65bcb6] rounded-full w-2 h-2 ml-3 shrink-0" />
        <span className="text-[#65bcb6] text-xs sm:text-sm whitespace-nowrap">
          درباره آیوا
        </span>
      </div>

      {/* Title */}
      <h2 className="font-extrabold text-2xl sm:text-3xl lg:text-4xl text-center text-gray-900">
        آیوا چیست؟
      </h2>

      {/* Subtitle */}
      <p className="text-center text-gray-600 text-sm sm:text-base max-w-2xl">
        چت‌بات هوشمند مبتنی بر AI که کسب‌وکار شما را متحول می‌کند.
      </p>
    </div>
  );
}

const articlesData = [
  {
    title: "یکپارچه‌سازی آسان",
    description:
      "به راحتی با وب‌سایت، واتساپ، تلگرام، اینستاگرام و سایر پلتفرم‌ها یکپارچه شوید.",
    bgColor: "#FFA18E",
    iconBgColor: "rgba(255,161,142,0.08)",
    IconComponent: Sec2_IconYekparche,
  },
  {
    title: "پشتیبانی چندزبانه",
    description:
      "به فارسی، انگلیسی و بیش از ۵۰ زبان دیگر با مشتریان خود گفت‌وگو کنید.",
    bgColor: "#52D4A0",
    iconBgColor: "rgba(82,212,160,0.08)",
    IconComponent: Sec2_IconPoshtibani,
  },
  {
    title: "یادگیری هوشمند",
    description:
      "آیوا از محتوای وب‌سایت، فایل‌ها و مستندات شما یاد می‌گیرد و پاسخ‌های دقیق و شخصی‌سازی شده ارائه می‌دهد.",
    bgColor: "#65BCB6",
    iconBgColor: "rgba(101,188,182,0.08)",
    IconComponent: Sec2_IconYadgiri,
  },
  {
    title: "امنیت بالا",
    description: "داده‌های شما با بالاترین استانداردهای امنیتی محافظت می‌شود.",
    bgColor: "#FFA18E",
    iconBgColor: "rgba(255,137,112,0.08)",
    IconComponent: Sec2_IconAmniat,
  },
  {
    title: "جمع‌آوری سرنخ",
    description:
      "اطلاعات مشتریان بالقوه را به صورت هوشمند جمع‌آوری و مدیریت کنید.",
    bgColor: "#4460F7",
    iconBgColor: "rgba(68,96,247,0.08)",
    IconComponent: Sec2_IconSarNakh,
  },
  {
    title: "تحلیل و گزارش‌گیری",
    description:
      "آمار کامل از گفت‌وگوها، رضایت مشتریان و عملکرد چت‌بات دریافت کنید.",
    bgColor: "#B07CC6",
    iconBgColor: "rgba(176,124,198,0.08)",
    IconComponent: Sec2_IconTahlil,
  },
];

interface ArticleProps {
  title: string;
  description: string;
  bgColor?: string;
  iconBgColor?: string;
  IconComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

function Article({
  title,
  description,
  bgColor,
  iconBgColor,
  IconComponent,
}: ArticleProps) {
  return (
    <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-sm flex flex-col overflow-hidden p-4 sm:p-6">
      {/* Background Icon Circle */}
      <div className="absolute top-0 right-0 opacity-25 pointer-events-none">
        <IconCircle color={bgColor || "#52D4A0"} />
      </div>

      {/* Icon Badge */}
      <div
        className="relative z-10 w-fit border-2 rounded-sm p-2 mb-4"
        style={{
          borderColor: `${bgColor}44`,
          backgroundColor: iconBgColor,
          color: bgColor,
        }}
      >
        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-right">
        <h3 className="text-base sm:text-lg font-bold text-gray-900">
          {title}
        </h3>
        <p className="mt-2 text-gray-500 text-sm sm:text-base leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

interface IconCircleProps {
  color?: string;
}

function IconCircle({ color }: IconCircleProps) {
  return (
    <svg
      className="w-16 h-16 sm:w-20 sm:h-20"
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 80 80"
    >
      <g clipPath="url(#clip3)">
        <path
          d="M80 48C106.51 48 128 26.5097 128 0C128 -26.5097 106.51 -48 80 -48C53.4903 -48 32 -26.5097 32 0C32 26.5097 53.4903 48 80 48Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip3">
          <rect fill="white" height="80" width="80" />
        </clipPath>
      </defs>
    </svg>
  );
}

function ArticlesList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
      {articlesData.map((item, idx) => (
        <Article key={idx} {...item} />
      ))}
    </div>
  );
}

interface StatItemProps {
  value: string;
  label: string;
  gradient: string;
}

function StatItem({ value, label, gradient }: StatItemProps) {
  return (
    <div className="bg-white rounded-lg sm:rounded-2xl border border-gray-200 p-4 sm:p-6 flex flex-col gap-2 text-center">
      <p
        className="font-black text-xl sm:text-2xl lg:text-3xl bg-clip-text text-transparent"
        style={{ backgroundImage: gradient }}
      >
        {value}
      </p>
      <p className="font-medium text-xs sm:text-sm text-gray-500">{label}</p>
    </div>
  );
}

function StatsList() {
  const stats = [
    {
      value: "۲۴/۷",
      label: "در دسترس",
      gradient:
        "linear-gradient(90deg, rgb(17, 24, 39) 0%, rgb(17, 24, 39) 100%), linear-gradient(144.782deg, rgb(101, 188, 182) 0%, rgb(82, 212, 160) 100%)",
    },
    {
      value: "< ۱ ثانیه",
      label: "زمان پاسخ",
      gradient:
        "linear-gradient(90deg, rgb(17, 24, 39) 0%, rgb(17, 24, 39) 100%), linear-gradient(154.581deg, rgb(101, 188, 182) 0%, rgb(82, 212, 160) 100%)",
    },
    {
      value: "۹۷٪",
      label: "رضایت مشتریان",
      gradient:
        "linear-gradient(90deg, rgb(17, 24, 39) 0%, rgb(17, 24, 39) 100%), linear-gradient(138.366deg, rgb(101, 188, 182) 0%, rgb(82, 212, 160) 100%)",
    },
    {
      value: "+۱۰۰",
      label: "کسب‌وکار فعال",
      gradient:
        "linear-gradient(90deg, rgb(17, 24, 39) 0%, rgb(17, 24, 39) 100%), linear-gradient(146.31deg, rgb(101, 188, 182) 0%, rgb(82, 212, 160) 100%)",
    },
  ];

  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((stat, idx) => (
        <StatItem key={idx} {...stat} />
      ))}
    </div>
  );
}

export default function Section2() {
  return (
    <section
      id="about"
      className="relative w-full bg-[rgba(255,228,222,0.45)] overflow-hidden px-6 py-12 sm:py-16 lg:py-24"
    >
      <BackgroundDecorations />

      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 sm:px-8 lg:px-16">
        <div className="flex flex-col gap-8 sm:gap-12 lg:gap-16 items-center w-full max-w-7xl">
          {/* Header */}
          <Header />

          {/* Stats */}
          <StatsList />

          {/* Features Grid */}
          {/* <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-start">
             <div className="w-full">
              <ArticlesList />
            </div>

             <div className="w-full sm:w-96 mx-auto lg:mx-0 lg:w-auto shrink-0">
              <PhoneAndCustomer1 />
            </div>
          </div> */}

          <div className="grid grid-cols-1 lg:grid-cols-[60%,40%]  gap-16 items-center justify-end overflow-clip relative  ">
            <div className=" z-20 w-full lg:w-7/12">
              <ArticlesList />
            </div>
            <div className="lg:absolute w-full lg:h-8/12 h-72 lg:w-6/12 left-0 top-16 ">
              <PhoneAndCustomer1 />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
