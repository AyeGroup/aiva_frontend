"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { cubicBezier } from "motion/react";
import { convertToPersian } from "@/utils/common";
import { useState, useEffect } from "react";
import {
  Sec3_Icon4,
  Sec3_Icon5,
  Sec3_Icon6,
  Sec3_Icon8,
} from "@/public/icons/landing";

// Constants
const STEP_INTERVAL = 3000; // ms
const TOTAL_STEPS = 4;
const STEPS_DATA = [
  {
    step: 0,
    color: "#65BCB6",
    icon: <Sec3_Icon8 />,
    title: "ثبت‌نام",
    description: "حساب کاربری خود را در کمتر از ۳۰ ثانیه ایجاد کنید",
    duration: "۳۰ ثانیه",
  },
  {
    step: 1,
    color: "#52D4A0",
    icon: <Sec3_Icon6 />,
    title: "آموزش",
    description: "منابع و اطلاعات کسب‌وکار خود را آپلود کنید",
    duration: "۲ دقیقه",
  },
  {
    step: 2,
    color: "#ffa18e",
    icon: <Sec3_Icon5 />,
    title: "شخصی‌سازی",
    description: "ظاهر و رفتار چت‌بات را مطابق برند خود تنظیم کنید",
    duration: "۵ دقیقه",
  },
  {
    step: 3,
    color: "#B07CC6",
    icon: <Sec3_Icon4 />,
    title: "راه‌اندازی",
    description: "چت‌بات را روی وب‌سایت یا اپلیکیشن خود نصب کنید",
    duration: "۲ دقیقه",
  },
];

const PROGRESS_WIDTHS = [225, 450, 675, 900];
const TAB_COLORS = ["#65BCB6", "#52D4A0", "#ffa18e", "#B07CC6"];

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: cubicBezier(0.25, 0.1, 0.25, 1),
    },
  },
};

// ============ Header Component ============
function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col justify-center text-center gap-4 sm:gap-6 lg:gap-8 w-full px-4"
    >
      {/* Badge */}
      <div className="flex items-center justify-center rounded-3xl bg-[rgba(101,188,182,0.08)] border border-[rgba(101,188,182,0.15)] py-2 px-3 mx-auto gap-2">
        <div className="bg-[#65bcb6] rounded-full w-2 h-2 flex-shrink-0" />
        <span className="text-[#65bcb6] text-xs sm:text-sm whitespace-nowrap">
          فرآیند ساده
        </span>
      </div>

      {/* Title */}
      <p className="font-extrabold text-2xl sm:text-3xl lg:text-4xl text-gray-900">
        آیوا را در ۴ مرحله ساده راه‌اندازی کنید
      </p>

      {/* Subtitle */}
      <p className="text-center text-gray-600 text-sm sm:text-base">
        از ثبت‌نام تا اولین گفت‌وگو، تنها چند دقیقه فاصله دارید
      </p>
    </motion.div>
  );
}

// ============ Article/Card Component ============
interface ArticleProps {
  isActive: boolean;
  icon: React.ReactNode;
  color: string;
  step: number;
  title: string;
  description: string;
  duration: string;
}

function Article({
  isActive,
  icon,
  color,
  step,
  title,
  description,
  duration,
}: ArticleProps) {
  const containerBg = isActive ? "bg-white" : "bg-neutral-50";
  const borderWidth = isActive ? 2 : 1;
  const borderColor = isActive ? color : "#E5E7EB";
  const shadow = isActive
    ? `0px 24px 48px rgba(0,0,0,0.12), 0px 0px 0px 2px ${color}`
    : "none";

  return (
    <div
      className={`basis-0 grow min-h-px min-w-px relative rounded-2xl shrink-0 transition-all duration-500 ${containerBg}`}
      data-name="Article"
      style={{
        borderWidth: borderWidth,
        borderColor: borderColor,
        borderStyle: "solid",
        boxShadow: shadow,
      }}
    >
      <div className="flex flex-col items-center overflow-clip rounded-2xl w-full">
        <div className="flex flex-col items-center gap-7 pb-px pt-8 px-4 w-full relative">
          {/* Icon */}

          <div className="h-16 relative shrink-0 w-60">
            <div
              className="absolute flex items-center justify-center left-[88px] rounded-xl size-16 top-0"
              style={{ backgroundColor: "rgba(101,188,182,0.1)", color }}
            >
              {icon}
            </div>

            <div
              className={`w-6 h-6 rounded-full text-sm shadow-[0px_4px_12px_0px_rgba(0,0,0,0.2)]  p-1 font-semibold text-white flex justify-center items-center`}
              style={{ backgroundColor: color }}
            >
              {convertToPersian(step + 1)}
            </div>
          </div>

          {/* Content */}
          <div className="h-[141.188px] relative shrink-0 w-60">
            <h3 className="absolute h-6 left-1/2 top-0 -translate-x-1/2 text-center text-gray-900 font-normal leading-6">
              {title}
            </h3>
            <p className="absolute h-[51.188px] left-1/2 top-8 -translate-x-1/2 text-center text-gray-500 font-normal leading-[25.6px] w-[228px]">
              {description}
            </p>

            {/* Duration */}
            <div
              className="absolute bg-gray-100 h-[42px] left-[70.77px] rounded-full top-[99.19px] flex items-center justify-center"
              style={{ color }}
            >
              <div className="flex items-center py-2 px-4 rounded-full bg-gray-100">
                <div
                  className={`w-2 h-2 rounded-full ml-2`}
                  style={{ backgroundColor: color }}
                ></div>
                {duration}
              </div>
            </div>
          </div>

          <motion.div
            className="h-[3px] rounded-bl-6 rounded-br-6 shrink-0 w-full transition-colors duration-500"
            style={{
              backgroundColor: isActive ? color : "#e5e7eb",
            }}
          />
        </div>
      </div>
    </div>
  );
}
// ============ Cards Container ============
function Card({ activeStep }: { activeStep: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.1, delayChildren: 0.1 },
        },
      }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 w-full px-4"
    >
      {STEPS_DATA.map(({ step, ...props }) => (
        <motion.div key={step} variants={cardVariants}>
          <Article isActive={activeStep === step} step={step} {...props} />
        </motion.div>
      ))}
    </motion.div>
  );
}

// ============ Progress Indicator ============
function ProgressBar({ activeStep }: { activeStep: number }) {
  return (
    <motion.div
      className="h-1 rounded-full"
      style={{ backgroundColor: TAB_COLORS[activeStep] }}
      animate={{ width: `${((activeStep + 1) / TOTAL_STEPS) * 100}%` }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    />
  );
}

function ProgressIndicators({ activeStep }: { activeStep: number }) {
  return (
    <div className="flex gap-2 items-center justify-center px-4">
      {TAB_COLORS.map((color, index) => (
        <motion.div
          key={index}
          className="rounded-md transition-all duration-500"
          animate={{
            flex: activeStep === index ? 1.5 : 1,
            height: activeStep === index ? 12 : 12,
          }}
          style={{
            backgroundColor: activeStep === index ? color : "#e5e7eb",
          }}
        />
      ))}
    </div>
  );
}

function Progression({ activeStep }: { activeStep: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
      className="flex flex-col gap-4 items-center justify-center w-full px-4"
    >
      <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
        <ProgressBar activeStep={activeStep} />
      </div>
      <ProgressIndicators activeStep={activeStep} />
    </motion.div>
  );
}

// ============ CTA Section ============
function CTASection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
      className="flex flex-col items-center justify-center w-full gap-6 px-4"
    >
      {/* CTA Text */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-center text-sm sm:text-base">
        <span>کل فرآیند کمتر از</span>
        <span className="text-[#65bcb6] font-bold">۱۰ دقیقه</span>
        <span>زمان می‌برد</span>
      </div>

      {/* CTA Button */}
      <Link href="/onboarding">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#65bcb6] hover:bg-[#58aaa5] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl lg:rounded-2xl font-semibold text-sm sm:text-base transition-colors"
        >
          شروع رایگان
        </motion.button>
      </Link>
    </motion.div>
  );
}

// ============ Main Section ============
export default function Section3() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % TOTAL_STEPS);
    }, STEP_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      id="launch"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full flex flex-col gap-8 sm:gap-12 lg:gap-16 py-12 sm:py-16 lg:py-16 px-10 lg:p-24"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-8 sm:gap-10 lg:gap-16 w-full">
        <Header />
        <Card activeStep={activeStep} />
        <Progression activeStep={activeStep} />
        <CTASection />
      </div>
    </motion.section>
  );
}
