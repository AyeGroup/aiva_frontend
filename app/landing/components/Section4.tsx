"use client";
import svgPaths from "../svg/svg-sayy2jojyo";
import { motion } from "motion/react";
import { useState } from "react";
import {
  Amoozesh,
  Bazaryabi,
  Icon14,
  Icon16,
  Icon18,
  Icon20,
  Icon22,
  Icon24,
  Icon26,
  Icon28,
  Icon30,
  Icon32,
  Icon34,
  Icon36,
  Icon37,
  Icon38,
  Khadamat,
  Moshavere,
  Poshtibani,
  Sazmani,
} from "@/public/icons/landing";

interface TabPanelProps {
  activeTab: "usage" | "industry";
}
interface TabListProps {
  activeTab: "industry" | "usage";
  setActiveTab: React.Dispatch<React.SetStateAction<"industry" | "usage">>;
}

function Header() {
  return (
    <div className="content-stretch w-full flex flex-col gap-6 items-center justify-center relative">
      <motion.div
        className="bg-white flex gap-2 items-center justify-center px-4 py-2 rounded-sm  "
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="bg-[#65bcb6] h-2 w-2 rounded-full" />
        <div className=" font-medium text-[#65bcb6] text-sm">صنایع مختلف</div>
      </motion.div>
      <motion.div
        className="flex justify-center items-center text-center"
        data-name="Heading 2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      >
        <p className="font-extrabold text-4xl text-center  text-white  ">
          آیوا برای چه کسب‌وکارهایی مناسب است؟
        </p>
      </motion.div>
      <motion.div
        className="content-stretch flex   items-start relative shrink-0 "
        data-name="Paragraph"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        <p className=" font-normal   leading-[28.8px]    text-lg text-center text-gray-600">
          چت‌بات هوشمند برای صنایع مختلف با کاربردهای تخصصی
        </p>
      </motion.div>
    </div>
  );
}

function TabList({ activeTab, setActiveTab }: TabListProps) {
  return (
    <motion.div className="flex items-center w-full justify-center my-3">
      <div className="w-fit flex p-1  bg-gray-100   rounded-xl">
        {/* Tab 2 */}
        <div
          onClick={() => setActiveTab("industry")}
          className={`h-12 relative rounded-xl shrink-0   cursor-pointer grow transition-all
            ${activeTab === "industry" ? "bg-white shadow" : ""}`}
        >
          <div className="h-12 relative flex items-center px-6">
            <p
              className={`font-medium text-4 whitespace-nowrap transition-all
                ${
                  activeTab === "industry" ? "text-gray-900" : "text-gray-500"
                }`}
            >
              براساس صنعت
            </p>
          </div>
        </div>
        <div
          onClick={() => setActiveTab("usage")}
          className={`h-12 relative rounded-xl shrink-0   cursor-pointer transition-all
            ${activeTab === "usage" ? "bg-white shadow" : ""}`}
        >
          <div className="h-12 relative flex items-center px-6">
            <p
              className={`font-medium text-4 whitespace-nowrap transition-all
                ${activeTab === "usage" ? "text-gray-900" : "text-gray-500"}`}
            >
              براساس کاربرد
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Article({
  icon,
  title,
  description,
  color,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      className="bg-white rounded-lg relative flex flex-col justify-between p-4 overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      {/* Absolute SVG background icon */}
      <div className="w-20 h-20 absolute top-0 -right-5 ">
        <svg
          className="w-full h-full  "
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 64 64"
        >
          <g clipPath="url(#clip0_article)" id="Icon" opacity="0.1">
            <path
              d={svgPaths.p37ddc40}
              fill={`var(--fill-0, ${color})`}
              id="Vector"
            />
          </g>
          <defs>
            <clipPath id="clip0_article">
              <rect fill="white" height="48" width="48" />
            </clipPath>
          </defs>
        </svg>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 items-start">
        {/* Icon on the right */}

        <div className="w-14 h-14 mt-4 mr-4">{icon}</div>

        <p className="font-semibold text-lg text-gray-900 text-right wrap-break-word">
          {title}
        </p>
        <p className="font-medium leading-[1.4rem] text-sm text-gray-600 text-right wrap-break-word">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

const USAGES_DATA = [
  {
    icon: <Poshtibani />,
    title: "پشتیبانی و ارتباط با مشتری",
    description:
      "چت‌بات در هر ساعت پاسخگوی سوالات تکراری، وضعیت سفارش و راهنمایی کاربران است.",
    color: "#EA580C",
    delay: 0.4,
  },
  {
    icon: <Bazaryabi />,
    title: "فروش و بازاریابی",
    description:
      "همراه خریدار از مرحله معرفی محصول تا نهایی‌سازی خرید با گفتگوهای هوشمند.",
    color: "#52D4A0",
    delay: 0.45,
  },
  {
    icon: <Khadamat />,
    title: "خدمات پس از فروش",
    description:
      "بررسی گارانتی، ثبت درخواست پشتیبانی و اطلاع‌رسانی وضعیت تعمیر یا تعویض به‌صورت خودکار",
    color: "#DB2777",
    delay: 0.5,
  },
  {
    icon: <Amoozesh />,
    title: "آموزش و راهنمایی",
    description:
      "چت‌بات می‌تواند مفاهیم آموزشی، راهنمای نرم‌افزار یا پاسخ تست‌ها را توضیح دهد.",
    color: "#E67E7E",
    delay: 0.55,
  },
  {
    icon: <Sazmani />,
    title: "منابع انسانی و سازمانی",
    description:
      "پاسخ سریع به سوالات کارکنان درباره مرخصی، حقوق، فرآیندها و فرم‌های داخلی",
    color: "#0D9488",
    delay: 0.6,
  },
  {
    icon: <Moshavere />,
    title: "مشاوره و خدمات تخصصی",
    description:
      "دریافت اطلاعات از کاربر، تحلیل نیاز و ارجاع هوشمند به مشاور یا واحد حرفه‌ای مربوطه",
    color: "#7C3AED",
    delay: 0.65,
  },
  {
    icon: <Icon26 />,
    title: "خدمات مالی و بانکی",
    description: "توضیح مراحل دریافت وام، مشاوره افتتاح حساب، مشاوره امور مالی",
    color: "#6366F1",
    delay: 0.7,
  },
];

const INDUSTRIES_DATA = [
  {
    icon: <Icon14 />,
    title: "مواد غذایی/رستوران‌ها",
    description: "سفارش گیری سریع، پیشنهاد برای رژیم‌ها، پیگیری وضعیت سفارش",
    color: "#EA580C",
    delay: 0.4,
  },
  {
    icon: <Icon16 />,
    title: "فروشگاه‌های آنلاین",
    description:
      "راهنمای خرید، وضعیت سفارش، سبد هوشمند، تحلیل مشتری برای افزایش فروش",
    color: "#52D4A0",
    delay: 0.45,
  },
  {
    icon: <Icon18 />,
    title: "آرایش و بهداشت",
    description:
      "پیشنهاد محصول شخصی‌سازی‌شده، رسیدگی به سفارشات، توصیه مراقبت پوستی",
    color: "#DB2777",
    delay: 0.5,
  },
  {
    icon: <Icon20 />,
    title: "خدمات حقوقی و مشاوره‌ای",
    description:
      "پاسخ هوشمند به سوالات، ارجاع به وکلای تخصصی، جمع‌آوری اطلاعات اولیه پرونده",
    color: "#E67E7E",
    delay: 0.55,
  },
  {
    icon: <Icon22 />,
    title: "منابع انسانی و اداری",
    description:
      "پاسخ به سؤالات کارکنان، اعلام مرخصی، گزارش حضور، فرم‌های داخلی",
    color: "#0D9488",
    delay: 0.6,
  },
  {
    icon: <Icon24 />,
    title: "آموزش و آموزشگاه‌ها",
    description:
      "راهنمای ثبت‌نام، آموزش هوشمند، حل تمرین، پاسخ به سؤالات درس، تدریس تعاملی",
    color: "#7C3AED",
    delay: 0.65,
  },
  {
    icon: <Icon26 />,
    title: "خدمات مالی و بانکی",
    description: "توضیح مراحل دریافت وام، مشاوره افتتاح حساب، مشاوره امور مالی",
    color: "#6366F1",
    delay: 0.7,
  },
  {
    icon: <Icon28 />,
    title: "حمل‌ونقل و لجستیک",
    description: "وضعیت مرسوله، اعلام زمان‌بندی تحویل، پاسخ به سوالات مشتری",
    color: "#0891B2",
    delay: 0.75,
  },
  {
    icon: <Icon30 />,
    title: "حوزه‌های سرگرمی و محتوا",
    description: "بازی، آزمون، گفت‌وگوهای تعاملی، معرفی رویداد",
    color: "#E11D48",
    delay: 0.8,
  },
  {
    icon: <Icon32 />,
    title: "بیمه و خدمات پس از فروش",
    description: "پاسخ به سوالات پوشش بیمه‌ای، ثبت خسارت، پیگیری وضعیت",
    color: "#65A30D",
    delay: 0.85,
  },
  {
    icon: <Icon34 />,
    title: "املاک و مستغلات",
    description: "جستجوی ملک، فیلتر شرایط، هماهنگی بازدید",
    color: "#F59E0B",
    delay: 0.9,
  },
  {
    icon: <Icon36 />,
    title: "سلامت و پزشکی",
    description: "غربالگری اولیه، پرسش علائم، زمان‌بندی و پیگیری نوبت",
    color: "#DC2626",
    delay: 0.95,
  },
];

function ContainerUsage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 w-full px-4">
      {USAGES_DATA.map((use, index) => (
        <Article key={index} {...use} />
      ))}
    </div>
  );
}

function ContainerIndustry() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 w-full px-4">
      {INDUSTRIES_DATA.map((industry, index) => (
        <Article key={index} {...industry} />
      ))}
    </div>
  );
}

function TabPanel({ activeTab }: TabPanelProps) {
  return (
    <div className=" flex flex-col gap-2.5   items-center justify-centerw-full">
      {activeTab === "industry" ? <ContainerIndustry /> : <ContainerUsage />}
    </div>
  );
}

function ContainerFooter() {
  return (
    <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6 items-center mt-8 sm:mt-10 lg:mt-12 w-full px-4">
      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl">
          صنعت شما در لیست نبود؟ آیوا برای هر کسب‌وکاری قابل تنظیم است.
        </p>
      </motion.div>

      {/* Button */}
      <motion.a
        href="tel:09903202903"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="bg-[#65bcb6] hover:bg-[#58aaa5] text-white flex items-center gap-2 sm:gap-3 px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-colors shadow-md hover:shadow-lg whitespace-nowrap"
      >
        {/* Icon - Rotated */}
        <div className="flex-shrink-0 rotate-180">
          <Icon37 />
        </div>
        <span>مشاوره رایگان</span>
      </motion.a>

      {/* Decorative Icon */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-2 sm:mt-3"
      >
        <Icon38 />
      </motion.div>
    </div>
  );
}

function Container() {
  return (
    <div className=" pointer-events-none w-full absolute z-10 top-0 left-0 overflow-clip">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 1431 1252"
      >
        <g id="Container">
          {/* Icon */}
          <motion.g
            id="Icon"
            opacity="0.25"
            animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d={svgPaths.p296d4380} fill="white" />
          </motion.g>

          {/* Icon_2 */}
          <motion.g
            id="Icon_2"
            opacity="0.5"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            <path d={svgPaths.p3a24a440} stroke="#F9DB8D" strokeWidth="1.6" />
            <path d={svgPaths.p1042a380} stroke="#F9DB8D" strokeWidth="1.6" />
            <path d={svgPaths.p1f645500} stroke="#F9DB8D" strokeWidth="1.6" />
          </motion.g>

          {/* Icon_3 */}
          <motion.g
            id="Icon_3"
            opacity="0.36"
            animate={{ scale: [1, 1.1, 1], opacity: [0.36, 0.5, 0.36] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d={svgPaths.p17d8bf00} stroke="#F0E4E1" strokeWidth="1.92" />
          </motion.g>

          {/* Icon_4 */}
          <motion.g
            id="Icon_4"
            clipPath="url(#clip0)"
            opacity="0.25"
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <path
              d="M214.648 1191.89H414.648"
              stroke="#65BCB6"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          </motion.g>

          {/* Floating shapes */}
          <motion.path
            d={svgPaths.pbbf0d80}
            fill="white"
            fillOpacity="0.5"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.path
            d={svgPaths.p3641a020}
            fill="white"
            fillOpacity="0.5"
            opacity="0.45"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.path
            d="M1362 569L1054 703.798"
            stroke="#65BCB6"
            strokeWidth="10"
            strokeDasharray="4 4"
            strokeOpacity="0.18"
            animate={{ strokeDashoffset: [0, 20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </g>

        <defs>
          <clipPath id="clip0">
            <rect width="192" height="8" fill="white" x="214.648" y="1190.89" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export default function Section4() {
  const [activeTab, setActiveTab] = useState<"industry" | "usage">("industry");

  return (
    <div
      id="crafts"
      className=" w-full flex flex-col relative  bg-linear-to-b from-[#ffffff] gap-2.5 items-center to-[#ffffff] via-50% via-[#f9fafb]"
    >
      <div className="  ">
        <Container />
      </div>

      <div className="bg-linear-to-b w-full m-0 content-stretch flex flex-col from-[#65bcb6] gap-2.5 items-start to-[#ecf5f4] justify-center lg:px-24 px-14 py-10 relative z-0">
        <Header />
        <TabList activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabPanel activeTab={activeTab} />
        <ContainerFooter />
      </div>
    </div>
  );
}
