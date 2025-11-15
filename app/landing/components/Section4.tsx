"use client";
import { motion } from "motion/react";
import svgPaths from "../svg/svg-sayy2jojyo";
import {
  Amoozesh,
  Bazaryabi,
  Icon0,
  Icon1,
  Icon11,
  Icon12,
  Icon14,
  Icon16,
  Icon18,
  Icon2,
  Icon20,
  Icon22,
  Icon24,
  Icon26,
  Icon28,
  Icon3,
  Icon30,
  Icon32,
  Icon34,
  Icon36,
  Icon37,
  Icon38,
  Icon4,
  Icon5,
  Icon6,
  Khadamat,
  Moshavere,
  Poshtibani,
  Sazmani,
} from "@/public/icons/landing";
import { useState } from "react";

interface TabPanelProps {
  activeTab: "usage" | "industry";
}
interface TabListProps {
  activeTab: "industry" | "usage";
  setActiveTab: React.Dispatch<React.SetStateAction<"industry" | "usage">>;
}

function Header() {
  return (
    <div
      className="content-stretch flex flex-col gap-6 items-center justify-center relative shrink-0 w-[1232px]"
      data-name="Header"
    >
      <motion.div
        className="bg-white box-border content-stretch flex gap-2 items-center px-4 py-2 relative rounded-sm shrink-0"
        data-name="Container"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="h-5 relative shrink-0 w-[77.555px]" data-name="Text">
          <p
            className="absolute  font-medium leading-5 left-[39px] text-[#65bcb6] text-[14px] text-center text-nowrap top-0 translate-x-[-50%] whitespace-pre"
            dir="auto"
          >
            صنایع مختلف
          </p>
        </div>
        <div
          className="bg-[#65bcb6] content-stretch flex flex-col items-start relative rounded-sm shrink-0 size-2"
          data-name="Container"
        >
          <div
            className="bg-[#65bcb6] h-2 rounded-sm shrink-0 w-full"
            data-name="Container"
          />
        </div>
      </motion.div>
      <motion.div
        className="h-[57.594px] relative shrink-0 w-[1232px]"
        data-name="Heading 2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      >
        <p
          className="absolute  font-extrabold leading-[57.6px] left-[616.27px] text-12 text-center text-nowrap text-white -top-1 tracking-[-0.96px] translate-x-[-50%] whitespace-pre"
          dir="auto"
        >
          آیوا برای چه کسب‌وکارهایی مناسب است؟
        </p>
      </motion.div>
      <motion.div
        className="content-stretch flex h-[28.797px] items-start relative shrink-0 w-2xl"
        data-name="Paragraph"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        <p
          className="basis-0  font-normal grow leading-[28.8px] min-h-px min-w-px relative shrink-0 text-[18px] text-center text-gray-600"
          dir="auto"
        >
          چت‌بات هوشمند برای صنایع مختلف با کاربردهای تخصصی
        </p>
      </motion.div>
    </div>
  );
}
function TabList({ activeTab, setActiveTab }: TabListProps) {
  return (
    <div className="h-14 relative shrink-0 w-[1232px]" data-name="Tab List">
      <motion.div
        className="absolute bg-gray-100 box-border content-stretch flex gap-1 h-14 items-start left-[468.98px] pb-0 pt-1 px-1 rounded-xl top-0 w-[294.047px]"
        data-name="Container"
      >
        {/* Tab 1 */}
        <div
          onClick={() => setActiveTab("usage")}
          className={`h-12 relative rounded-xl shrink-0 w-[136.57px] cursor-pointer transition-all
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

        {/* Tab 2 */}
        <div
          onClick={() => setActiveTab("industry")}
          className={`h-12 relative rounded-xl shrink-0 w-[136.57px] cursor-pointer grow transition-all
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
      </motion.div>
    </div>
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
      className="bg-white h-[203px] overflow-clip relative rounded-lg shrink-0 w-[293px]"
      data-name="Article"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="absolute left-[229px] size-16 top-0" data-name="Icon">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 64 64"
        >
          <g clipPath="url(#clip0_article)" id="Icon" opacity="0.05">
            <path
              d={svgPaths.p37ddc40}
              fill={`var(--fill-0, ${color})`}
              id="Vector"
            />
          </g>
          <defs>
            <clipPath id="clip0_article">
              <rect fill="white" height="64" width="64" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div
        className="absolute left-[213px] rounded-lg size-14 top-6"
        data-name="Container"
      >
        {icon}
      </div>
      <div
        className="absolute content-stretch flex flex-col gap-2 items-start left-6 top-[100px] w-[245px]"
        data-name="Container"
      >
        <div
          className="h-[23.805px] relative shrink-0 w-full"
          data-name="Heading 3"
        >
          <p
            className="absolute  font-semibold leading-[23.811px] text-[17.008px] text-gray-900 text-nowrap text-right top-[0.5px] whitespace-pre"
            dir="auto"
            style={{ right: "0" }}
          >
            {title}
          </p>
        </div>
        <div className="relative shrink-0 w-full" data-name="Paragraph">
          <p
            className=" font-medium leading-[23.8px] text-[14px] text-gray-600 text-right top-[-0.5px]"
            dir="auto"
          >
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function ContainerUsage() {
  const usages = [
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
      description:
        "توضیح مراحل دریافت وام، مشاوره افتتاح حساب، مشاوره امور مالی",
      color: "#6366F1",
      delay: 0.7,
    },
  ];

  return (
    <div
      className="absolute gap-5 grid grid-cols-[repeat(4,_minmax(0px,_1fr))] grid-rows-[repeat(3,_minmax(0px,_1fr))] h-[674px] left-0 overflow-clip top-[-0.39px] w-[1307px]"
      data-name="Container"
    >
      {usages.map((use, index) => (
        <Article
          key={index}
          icon={use.icon}
          title={use.title}
          description={use.description}
          color={use.color}
          delay={use.delay}
        />
      ))}
    </div>
  );
}

function ContainerIndustry() {
  const industries = [
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
      description:
        "توضیح مراحل دریافت وام، مشاوره افتتاح حساب، مشاوره امور مالی",
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

  return (
    <div
      className="absolute gap-5 grid grid-cols-4 grid-rows-3 h-[674px] left-0 overflow-clip top-[-0.39px] w-[1307px]"
      data-name="Container"
    >
      {industries.map((industry, index) => (
        <Article
          key={index}
          icon={industry.icon}
          title={industry.title}
          description={industry.description}
          color={industry.color}
          delay={industry.delay}
        />
      ))}
    </div>
  );
}

function TabPanel({ activeTab }: TabPanelProps) {
  return (
    <div className="content-stretch flex flex-col gap-2.5 h-[673.992px] items-center justify-center relative shrink-0 w-full">
      {activeTab === "industry" ? <ContainerIndustry /> : <ContainerUsage />}
    </div>
  );
}

 

function ContainerFooter() {
  return (
    <div
      className="content-stretch flex flex-col gap-5 items-center relative shrink-0 w-full"
      data-name="Container"
    >
      <motion.div
        className="h-[22.508px] relative shrink-0 w-[1232px]"
        data-name="Paragraph"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1 }}
      >
        <p
          className="absolute  font-normal leading-[22.512px] left-[616.61px] text-[15.008px] text-center text-gray-600 text-nowrap top-[-0.5px] translate-x-[-50%] whitespace-pre"
          dir="auto"
        >
          صنعت شما در لیست نبود؟ آیوا برای هر کسب‌وکاری قابل تنظیم است.
        </p>
      </motion.div>
      <motion.div
        className="bg-[#65bcb6] box-border content-stretch flex gap-3 items-center overflow-clip px-[58px] py-3 relative rounded-lg shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 cursor-pointer"
        data-name="Button"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center justify-center relative shrink-0">
          <div className="flex-none rotate-180">
            <Icon37 />
          </div>
        </div>
        <div className="h-6 relative shrink-0 w-[85.578px]" data-name="Text">
          <p
            className="absolute  font-normal leading-6 left-0 text-4 text-nowrap text-white top-[-0.5px] whitespace-pre"
            dir="auto"
          >
            مشاوره رایگان
          </p>
        </div>
      </motion.div>
      <Icon38 />
    </div>
  );
}

export default function Section4() {
  const [activeTab, setActiveTab] = useState<"industry" | "usage">("industry");

  return (
    <div
      className="bg-linear-to-b content-stretch flex flex-col from-[#ffffff] gap-2.5 items-center relative w-full h-[1288px] to-[#ffffff] via-50% via-[#f9fafb]"
      data-name="Section"
    >
      <div
        className="h-[1264px] overflow-clip relative shrink-0 w-[1431px]"
        data-name="Container"
      >
        <Icon0 />
        <Icon1 />
        <Icon2 />
        <Icon3 />
        <Icon4 />
        <Icon5 />
        <Icon6 />
      </div>
      <div
        className="absolute bg-gradient-to-b content-stretch flex flex-col from-[#65bcb6] gap-[10px] h-[1288px] items-start left-0 to-[#ecf5f4] top-[-0.37px]"
        data-name="HowItWorks"
      >
        <div
          className="h-[1252px] relative shrink-0 w-[1431px]"
          data-name="Container"
        >
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 1431 1252"
          >
            <g id="Container">
              <motion.g
                id="Icon"
                opacity="0.25"
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <path
                  d={svgPaths.p296d4380}
                  fill="var(--fill-0, white)"
                  id="Vector"
                />
              </motion.g>
              <motion.g
                id="Icon_2"
                opacity="0.5"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              >
                <path
                  d={svgPaths.p3a24a440}
                  id="Vector_2"
                  stroke="var(--stroke-0, #F9DB8D)"
                  strokeWidth="1.6"
                />
                <path
                  d={svgPaths.p1042a380}
                  id="Vector_3"
                  stroke="var(--stroke-0, #F9DB8D)"
                  strokeWidth="1.6"
                />
                <path
                  d={svgPaths.p1f645500}
                  id="Vector_4"
                  stroke="var(--stroke-0, #F9DB8D)"
                  strokeWidth="1.6"
                />
              </motion.g>
              <motion.g
                id="Icon_3"
                opacity="0.36"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.36, 0.5, 0.36],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <path
                  d={svgPaths.p17d8bf00}
                  id="Vector_5"
                  stroke="var(--stroke-0, #F0E4E1)"
                  strokeWidth="1.92"
                />
              </motion.g>
              <motion.g
                clipPath="url(#clip0_0_6412)"
                id="Icon_4"
                opacity="0.25"
                animate={{
                  x: [0, 10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <path
                  d="M214.648 1191.89H414.648"
                  id="Vector_6"
                  stroke="var(--stroke-0, #65BCB6)"
                  strokeDasharray="4 4"
                  strokeWidth="2"
                />
              </motion.g>
              <motion.path
                d={svgPaths.pbbf0d80}
                fill="var(--fill-0, white)"
                fillOpacity="0.5"
                id="Vector_7"
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.path
                d={svgPaths.p3641a020}
                fill="var(--fill-0, white)"
                fillOpacity="0.5"
                id="Vector_8"
                opacity="0.45"
                animate={{
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.path
                d="M1362 569L1054 703.798"
                id="Vector_9"
                stroke="var(--stroke-0, #65BCB6)"
                strokeDasharray="4 4"
                strokeOpacity="0.18"
                strokeWidth="10"
                animate={{
                  strokeDashoffset: [0, 20, 0],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            </g>
            <defs>
              <clipPath id="clip0_0_6412">
                <rect
                  fill="white"
                  height="8"
                  transform="translate(214.648 1190.89)"
                  width="192"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div
          className="absolute box-border content-stretch flex flex-col gap-[59px] items-center justify-center left-0 p-16 top-0 w-[1431px]"
          data-name="Container"
        >
          <Header />
          <TabList activeTab={activeTab} setActiveTab={setActiveTab} />

          <TabPanel activeTab={activeTab} />
          <ContainerFooter />
        </div>
      </div>
    </div>
  );
}
