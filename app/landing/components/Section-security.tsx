import { ReactNode } from "react";
import svgPaths from "../svg/svg-r3t5kzv1q8";

 
interface CardData {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
  color: {
    primary: string;
    background: string;
    blur: string;
  };
}

// Decorative background icons
const BackgroundIcon1 = () => (
  <div className="absolute h-[235px] left-[1195px] top-[94.21px] w-[236px]">
    <svg
      className="block size-full"
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 236 235"
    >
      <g opacity="0.3">
        <path d={svgPaths.p3846b740} fill="#65BCB6" opacity="0.338314" />
      </g>
    </svg>
  </div>
);

const BackgroundIcon2 = () => (
  <div className="absolute inset-[68.23%_91.33%_17.04%_1.89%]">
    <svg
      className="block size-full"
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 97 97"
    >
      <g opacity="0.3">
        <path d={svgPaths.p115b5980} fill="#4460F7" opacity="0.484419" />
      </g>
    </svg>
  </div>
);

const BackgroundIcon3 = () => (
  <div className="absolute h-[626px] left-[358px] top-8 w-[748px]">
    <svg
      className="block size-full"
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 748 626"
    >
      <g opacity="0.3">
        <path
          d={svgPaths.p35387cf0}
          stroke="#65BCB6"
          strokeDasharray="10 5"
          strokeWidth="2"
        />
        <path d={svgPaths.pa663600} stroke="#4460F7" strokeDasharray="5 10" />
      </g>
    </svg>
  </div>
);

const BackgroundIcon4 = () => (
  <div className="absolute h-32 left-0 top-[576.39px] w-[1431px]">
    <svg
      className="block size-full"
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 1431 128"
    >
      <g clipPath="url(#clip0_0_5888)" opacity="0.25">
        <path d={svgPaths.p158cd200} stroke="#B07CC6" strokeWidth="2.47095" />
      </g>
      <defs>
        <clipPath id="clip0_0_5888">
          <rect fill="white" height="128" width="1431" />
        </clipPath>
      </defs>
    </svg>
  </div>
);

const BackgroundDecorations = () => (
  <div className="absolute h-[686px] left-0 overflow-clip top-[0.24px] w-[1431px]">
    <BackgroundIcon1 />
    <div className="absolute h-[658.391px] left-0 overflow-clip top-0 w-[1431px]">
      <BackgroundIcon2 />
    </div>
    <BackgroundIcon3 />
    <BackgroundIcon4 />
  </div>
);

const SecurityIcon = () => (
  <div className="h-8 overflow-clip relative shrink-0 w-full">
    <div className="absolute inset-[8.33%_12.5%_66.67%_12.5%]">
      <div className="absolute inset-[-20.83%_-6.94%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 28 12"
        >
          <path
            d={svgPaths.pc8da00}
            stroke="#4460F7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.33333"
          />
        </svg>
      </div>
    </div>
    <div className="absolute inset-[20.83%_12.5%_8.33%_12.5%]">
      <div className="absolute inset-[-7.35%_-6.94%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 28 26"
        >
          <path
            d={svgPaths.p74e3540}
            stroke="#4460F7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.33333"
          />
        </svg>
      </div>
    </div>
    <div className="absolute bottom-[37.5%] left-[12.5%] right-[12.5%] top-1/2">
      <div className="absolute inset-[-41.67%_-6.94%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 28 8"
        >
          <path
            d={svgPaths.p14b88480}
            stroke="#4460F7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.33333"
          />
        </svg>
      </div>
    </div>
  </div>
);

const WebsiteIcon = () => (
  <div className="h-8 overflow-clip relative shrink-0 w-full">
    <div className="absolute inset-[16.67%_10.06%_57.98%_64.58%]">
      <div className="absolute inset-[-20.539%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 12 12"
        >
          <path
            d={svgPaths.p20f36e80}
            stroke="#FFCE4D"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.33333"
          />
        </svg>
      </div>
    </div>
    <div className="absolute inset-[8.33%_12.5%_51.67%_47.5%]">
      <div className="absolute inset-[-13.021%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 17 17"
        >
          <path
            d={svgPaths.p20aa3980}
            stroke="#FFCE4D"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.33333"
          />
        </svg>
      </div>
    </div>
    <div className="absolute inset-[41.67%_45.83%_12.5%_8.33%]">
      <div className="absolute inset-[-11.364%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 18 18"
        >
          <path
            d={svgPaths.p37841100}
            stroke="#FFCE4D"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.33333"
          />
        </svg>
      </div>
    </div>
  </div>
);

const AccessIcon = () => (
  <div className="h-[32px] overflow-clip relative shrink-0 w-full">
    <div className="absolute inset-[8.33%_16.67%_8.32%_16.67%]">
      <div className="absolute inset-[-6.25%_-7.81%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 25 30"
        >
          <path
            d={svgPaths.pd1bd800}
            stroke="#78E2E2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.33333"
          />
        </svg>
      </div>
    </div>
    <div className="absolute inset-[41.67%_37.5%]">
      <div className="absolute inset-[-31.25%_-20.83%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 12 9"
        >
          <path
            d={svgPaths.p125ec1a0}
            stroke="#78E2E2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.33333"
          />
        </svg>
      </div>
    </div>
  </div>
);

const DataIcon = () => (
  <div className="h-[32px] overflow-clip relative shrink-0 w-full">
    <div className="absolute inset-[45.83%_12.5%_8.33%_12.5%]">
      <div className="absolute inset-[-11.36%_-6.94%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 28 18"
        >
          <path
            d={svgPaths.p2b2eef00}
            stroke="#FF8970"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.33333"
          />
        </svg>
      </div>
    </div>
    <div className="absolute inset-[8.33%_29.17%_54.17%_29.17%]">
      <div className="absolute inset-[-13.89%_-12.5%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 17 16"
        >
          <path
            d={svgPaths.p9e19500}
            stroke="#FF8970"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.33333"
          />
        </svg>
      </div>
    </div>
  </div>
);

interface FeatureCardProps {
  data: CardData;
}

const FeatureCard = ({ data }: FeatureCardProps) => (
  <article className=" relative rounded-3xl border-2 bg-gray-100 lg:bg-white border-transparent p-4 lg:p-0">
    {/* Content */}
    <div className="flex flex-col gap-3 items-start">
      <div
        className="flex items-center justify-center  rounded-2xl p-3 "
        style={{ backgroundColor: data.color.background }}
      >
        <div className="relative shrink-0 size-8">
          <div className="bg-clip-padding border-0 border-transparent border-solid box-border content-stretch flex flex-col items-start relative size-8">
            {data.icon}
          </div>
        </div>
      </div>{" "}
      <h3
        className="font-medium leading-[30px] text-xl text-right w-full"
        style={{ color: data.color.primary }}
      >
        {data.title}
      </h3>
      <p className="font-medium leading-[26px] text-gray-500 text-right w-full">
        {data.description}
      </p>
    </div>

    {/* Bottom accent line */}
    <div
      className="absolute h-1 left-72 rounded-[2] top-[318px] w-0"
      style={{ backgroundColor: data.color.primary }}
    />
  </article>
);

const SectionHeader = () => (
  <header className="content-stretch flex flex-col gap-6 items-center justify-center relative shrink-0 w-full">
    {/* Badge */}
    <div className="bg-[#e3f4f1] box-border content-stretch flex gap-2 items-center justify-center px-4 py-2 relative rounded-xl shrink-0">
      <div className="bg-[#65bcb6]   rounded-full  size-2"></div>
      <p className="font-medium leading-5 relative shrink-0 text-[#65bcb6] text-[14px] text-center text-nowrap whitespace-pre">
        امنیت آیوا
      </p>
    </div>

    {/* Title */}
    <h2 className="font-extrabold  text-2xl lg:text-3xl text-center text-gray-900 tracking-[-0.96px]">
      امنیت و اعتماد
    </h2>

    {/* Description */}
    <p className="font-normal   text-center text-gray-600  ">
      داده‌های شما با بالاترین استانداردهای امنیتی محافظت می‌شود
    </p>
  </header>
);

export default function SecuritySection() {
  const features: CardData[] = [
    {
      id: "security-standards",
      icon: <SecurityIcon />,
      title: "استانداردهای امنیتی سازمانی",
      description:
        "APIهای امن و احراز هویت قوی، هر تعامل از آپلود تا مکالمه را محافظت می‌کند",
      color: {
        primary: "#4460f7",
        background: "rgba(68,96,247,0.08)",
        blur: "#4460f7",
      },
    },
    {
      id: "website-security",
      icon: <WebsiteIcon />,
      title: "امن برای وب‌سایت شما",
      description:
        "ویجت قابل نصب ما به صورت ایمن یکپارچه می‌شود، بدون اینکه امنیت سایت یا حریم خصوصی بازدیدکنندگان شما را به خطر بیندازد",
      color: {
        primary: "#ffce4d",
        background: "rgba(255,206,77,0.08)",
        blur: "#ffce4d",
      },
    },
    {
      id: "access-control",
      icon: <AccessIcon />,
      title: "کنترل کامل دسترسی‌ها",
      description:
        "مجوزهای تیمی به شما اجازه می‌دهد دقیقاً مشخص کنید چه کسانی می‌توانند بخش‌های مختلف چت‌بات را مشاهده، ویرایش یا مدیریت کنند",
      color: {
        primary: "#78e2e2",
        background: "rgba(120,226,226,0.08)",
        blur: "#78e2e2",
      },
    },
    {
      id: "data-ownership",
      icon: <DataIcon />,
      title: "داده‌های شما متعلق به خودتان",
      description:
        "معماری پایگاه داده جداگانه تضمین می‌کند دانش کسب‌وکار، مکالمات مشتریان و اسناد حساس شما کاملاً جدا و امن باقی بمانند",
      color: {
        primary: "#ff8970",
        background: "rgba(255,137,112,0.08)",
        blur: "#ff8970",
      },
    },
  ];

  return (
    <section id="Security" className="bg-white relative size-full py-5">
      {/* Background decorations */}
      <BackgroundDecorations />

      {/* Main content */}
      <div className=" flex flex-col gap-16 items-start px-12 lg:p-24">
        <SectionHeader />

        {/* Feature cards grid */}
        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full bg-white rounded-lg z-20 p-4 lg:p-1 ">
          {features.map((feature) => (
            <FeatureCard key={feature.id} data={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
