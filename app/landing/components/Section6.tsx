"use client";
import { motion } from "motion/react";
import bgSvgPaths from "../svg/svg-kdb7ct6mks";
import {
  Sec6_Icon10,
  Sec6_Icon12,
  Sec6_Icon13,
  Sec6_Icon15,
  Sec6_Icon16,
  Sec6_Icon18,
  Sec6_Icon2,
  Sec6_Icon20,
  Sec6_Icon4,
  Sec6_Icon6,
  Sec6_Icon8,
} from "@/public/icons/landing";

// ============ Background Components ============
function BackgroundContainer() {
  return (
    <div
      className="absolute inset-0 overflow-clip"
      style={{
        background:
          "linear-gradient(180deg, #F3F4F6 0%, #E9D5F5 50%, #C084D6 100%)",
      }}
    >
      {/* Background SVG */}
      <svg
        className="absolute inset-0 w-full h-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 1431 1403"
      >
        <g clipPath="url(#clip0_section6_bg)">
          <g id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_section6_bg">
            <rect fill="white" height="1402.39" width="1431" />
          </clipPath>
        </defs>
      </svg>

      {/* Wave SVG */}
      <svg
        className="absolute bottom-0 left-0 w-full h-32 sm:h-40 lg:h-48"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 1431 192"
      >
        <g id="Icon">
          <path
            d={bgSvgPaths.pbac4500}
            fill="var(--fill-0, #B07CC6)"
            opacity="0.5"
          />
        </g>
      </svg>
    </div>
  );
}

// ============ Header Component ============
function Header() {
  return (
    <motion.div
      className="flex flex-col gap-4 sm:gap-6 lg:gap-8 items-center justify-center w-full px-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-white rounded-full px-3 sm:px-4 py-2 border border-[rgba(101,188,182,0.15)]">
        <div className="w-2 h-2 rounded-full bg-[#65bcb6] shrink-0" />
        <p className="text-xs sm:text-sm font-medium text-[#65bcb6] whitespace-nowrap">
          ویژگی‌های آیوا
        </p>
      </div>

      {/* Title */}
      <div className="text-center max-w-3xl">
        <h1 className="font-extrabold text-lg lg:text-2xl   text-gray-900 leading-tight">
          پشتیبانی سریع‌تر، ارزان‌تر و بدون خستگی
        </h1>
      </div>

      {/* Subtitle */}
      <p className="text-sm sm:text-base lg:text-lg text-center text-gray-600 max-w-2xl">
        پشتیبانی انسانی پرهزینه و خسته‌کننده است، اما بات آیوا همیشه آماده‌است.
      </p>
    </motion.div>
  );
}

// ============ Article Item Component ============
interface ArticleProps {
  id?: number;
  title: string;
  desc: string;
  type: "problem" | "solution";
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

function ArticleItem({ title, desc, type, Icon }: ArticleProps) {
  const isSolution = type === "solution";
  const bgColor = isSolution ? "bg-emerald-50" : "bg-red-50";
  const borderColor = isSolution ? "border-emerald-200" : "border-red-200";
  const badgeBg = isSolution ? "bg-emerald-500" : "bg-red-500";
  const iconBg = isSolution
    ? "bg-[rgba(16,185,129,0.1)] border-emerald-300"
    : "bg-[rgba(239,68,68,0.1)] border-red-300";
  const BadgeIcon = isSolution ? Sec6_Icon15 : Sec6_Icon13;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.4 }}
      className={`relative flex flex-col gap-3 p-4 sm:p-5 lg:p-6 rounded-lg sm:rounded-xl lg:rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] w-full ${bgColor} ${borderColor}`}
    >
      {/* Badge */}
      <div
        className={`absolute -top-3 sm:-top-4 flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full ${badgeBg} shadow-md`}
        style={{ [isSolution ? "left" : "right"]: "1.5rem" }}
      >
        <BadgeIcon />
        <span className="text-xs font-semibold text-white whitespace-nowrap">
          {isSolution ? "راه‌حل" : "مشکل"}
        </span>
      </div>

      {/* Content */}
      <div className="flex items-start gap-3 pt-2">
        {/* Icon */}
        <div className={`shrink-0 p-2 sm:p-3 rounded-lg flex items-center justify-center  border-2 ${iconBg}`}>
          <div className="w-5 h-5 sm:w-6 sm:h-6 ">
            <Icon />
          </div>
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-sm sm:text-base lg:text-lg text-gray-900 text-right">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 text-right mt-1 leading-relaxed">
            {desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ============ Problem/Solution Data ============
const PROBLEM_DATA: ArticleProps[] = [
  {
    id: 1,
    title: "تلفن روی انتظار",
    desc: "مشتری ده دقیقه منتظر میمونه تا کسی جواب بده",
    type: "problem",
    Icon: Sec6_Icon4,
  },
  {
    id: 2,
    title: "پاسخ متفاوت هر بار",
    desc: "هر پشتیبان یه جور جواب میده",
    type: "problem",
    Icon: Sec6_Icon8,
  },
  {
    id: 3,
    title: "هزینه بالای پرسنل",
    desc: "حقوق پشتیبان بالاست",
    type: "problem",
    Icon: Sec6_Icon12,
  },
  {
    id: 4,
    title: "هزینه بیمه و مالیات",
    desc: "هزینه‌های پنهان زیاد میشه",
    type: "problem",
    Icon: Sec6_Icon16,
  },
  {
    id: 5,
    title: "خستگی و استرس",
    desc: "پشتیبان انسانی خسته میشه",
    type: "problem",
    Icon: Sec6_Icon20,
  },
];

const SOLUTION_DATA: ArticleProps[] = [
  {
    id: 1,
    title: "پاسخ فوری",
    desc: "چت‌بات در کمتر از ۳ ثانیه پاسخ میده",
    type: "solution",
    Icon: Sec6_Icon2,
  },
  {
    id: 2,
    title: "پاسخ یکنواخت و دقیق",
    desc: "همیشه همون اطلاعات صحیح، بدون تناقض",
    type: "solution",
    Icon: Sec6_Icon6,
  },
  {
    id: 3,
    title: "هزینه  کاملا مقرون به صرفه",
    desc: "پلن های آیوا کاملا متناسب با کسب و کار شما به صورت اقتصادی تدوین شدن",
    type: "solution",
    Icon: Sec6_Icon10,
  },
  {
    id: 4,
    title: "بدون هزینه اضافی",
    desc: "این هزینه‌ها با پلن‌های آیوا قابل مقایسه نیست",
    type: "solution",
    Icon: Sec6_Icon10,
  },
  {
    id: 5,
    title: "همیشه آماده",
    desc: "چت‌بات ۲۴/۷ با همون انرژی پاسخ می‌ده",
    type: "solution",
    Icon: Sec6_Icon18,
  },
];

// ============ Comparison Grid ============
function ComparisonGrid() {
  return (
    <motion.div
      className="flex flex-col gap-3 sm:gap-4 lg:gap-5 w-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {PROBLEM_DATA.map((problem, index) => (
        <div
          key={index}
          className="grid grid-cols-1 mt-8 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-5"
        >
          <ArticleItem {...problem} />
          <ArticleItem {...SOLUTION_DATA[index]} />
        </div>
      ))}
    </motion.div>
  );
}

// ============ Footer Note ============
function FooterNote() {
  return (
    <motion.div
      className="bg-white border border-[rgba(101,188,182,0.2)] rounded-lg sm:rounded-xl p-4 sm:p-5 lg:p-6 mt-6 sm:mt-8 lg:mt-10 w-fit"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex gap-3 sm:gap-4">
        {/* Icon */}
        <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[rgba(101,188,182,0.1)] flex items-center justify-center text-lg sm:text-xl">
          💡
        </div>

        {/* Text */}
        <div className="flex flex-col gap-1 text-right">
          <p className="font-semibold text-sm sm:text-base text-gray-900">
            نکته: با آیوا، تیم پشتیبانی شما روی مشکلات پیچیده تمرکز می‌کنه
          </p>
          <p className="text-xs sm:text-sm text-gray-600">
            و کارهای تکراری رو به چت‌بات هوشمند واگذار می‌کنید
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ============ Main Section ============
export default function Section6() {
  return (
    <section
      id="features"
      className="relative w-full overflow-hidden px-8 md:px-12 lg:px-20"
    >
      <BackgroundContainer />

      <div className="relative z-10 flex flex-col items-center justify-center w-full py-12 sm:py-16 lg:py-24 px-4">
        <div className="max-w-6xl mx-auto w-full flex flex-col gap-8 sm:gap-12 lg:gap-16">
          {/* Header */}
          <Header />

          {/* Comparison Grid */}
          <div className="w-full">
            <ComparisonGrid />
            <div className="flex justify-center ">
              <FooterNote />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
