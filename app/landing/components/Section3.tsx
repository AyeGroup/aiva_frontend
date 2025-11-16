"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { cubicBezier } from "motion/react";
import { useState, useEffect } from "react";
import { Sec7_Icon, Sec7_Icon1, Sec7_Icon2, Sec7_Icon3, Sec7_Icon4, Sec7_Icon5, Sec7_Icon6, Sec7_Icon8 } from "@/public/icons/landing";


function CardContainer() {
  return (
    <div className="  relative   w-full">
      <Sec7_Icon />
      <Sec7_Icon1 />
      <Sec7_Icon2 />
      <Sec7_Icon3 />
    </div>
  );
}

function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col justify-center text-center gap-8 w-full"
    >
      <div className="flex items-center justify-center rounded-3xl bg-[rgba(101,188,182,0.08)] border border-[rgba(101,188,182,0.15)] py-2 px-3 mx-auto">
        <div className="bg-primary rounded-full w-2 h-2 ml-3"></div>
        <span className="text-primary">فرآیند ساده</span>
      </div>
      <p className="font-extrabold text-center text-gray-900">
        آیوا را در ۴ مرحله ساده راه‌اندازی کنید
      </p>
      <p className="text-center text-gray-600">
        از ثبت‌نام تا اولین گفت‌وگو، تنها چند دقیقه فاصله دارید
      </p>
    </motion.div>
  );
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: cubicBezier(0.25, 0.1, 0.25, 1), // ✅ درست و معادل ease قبلی
    },
  },
};

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
              {step + 1}
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

const articlesData = [
  {
    step: 0,
    color: "#65BCB6",
    icon: <Sec7_Icon8 />,
    title: "ثبت‌نام",
    description: "حساب کاربری خود را در کمتر از ۳۰ ثانیه ایجاد کنید",
    duration: "۳۰ ثانیه",
  },
  {
    step: 1,
    color: "#52D4A0",
    icon: <Sec7_Icon6 />,
    title: "آموزش",
    description: "منابع و اطلاعات کسب‌وکار خود را آپلود کنید",
    duration: "2 دقیقه",
  },
  {
    step: 2,
    color: "#ffa18e",
    icon: <Sec7_Icon5 />,
    title: "شخصی‌سازی",
    description: "ظاهر و رفتار چت‌بات را مطابق برند خود تنظیم کنید",
    duration: "5 دقیقه",
  },
  {
    step: 3,
    color: "#B07CC6",
    icon: <Sec7_Icon4 />,
    title: "راه‌اندازی",
    description: "چت‌بات را روی وب‌سایت یا اپلیکیشن خود نصب کنید",
    duration: "۲ دقیقه",
  },
];

function Card({ activeStep }: { activeStep: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
          },
        },
      }}
      className="flex gap-6 items-center justify-center w-full relative shrink-0 px-8"
    >
      {articlesData.map(({ step, ...props }) => (
        <motion.div key={step} variants={cardVariants}>
          <Article isActive={activeStep === step} step={step} {...props} />
        </motion.div>
      ))}
    </motion.div>
  );
}

// Timeline
function Container27() {
  return (
    <div className="absolute bg-gray-200 h-0.5 right-0 rounded-[1px] top-0 w-[900px]" />
  );
}

function Container28({ activeStep }: { activeStep: number }) {
  const progressColors = ["#65BCB6", "#52D4A0", "#ffa18e", "#B07CC6"];
  const progressWidths = [225, 450, 675, 900];

  return (
    <motion.div
      className="absolute h-0.5 right-0 rounded-[1px] top-0"
      style={{
        backgroundColor: progressColors[activeStep],
        boxShadow: `0px 0px 12px 0px ${progressColors[activeStep]}66`,
      }}
      animate={{
        width: progressWidths[activeStep],
      }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
    />
  );
}

function Container29({ activeStep }: { activeStep: number }) {
  return (
    <div className="h-0.5 relative shrink-0 w-[900px]">
      <Container27 />
      <Container28 activeStep={activeStep} />
    </div>
  );
}

function TabList({ activeStep }: { activeStep: number }) {
  // ترتیب رنگ‌ها از راست به چپ: ثبت‌نام، آموزش، شخصی‌سازی، راه‌اندازی
  const tabColors = ["#65BCB6", "#52D4A0", "#ffa18e", "#B07CC6"];

  return (
    <div
      className="content-stretch flex gap-3 h-3 items-center justify-center relative shrink-0 w-[1232px]"
      data-name="Tab List"
    >
      {[0, 1, 2, 3].map((index) => (
        <div
          key={index}
          className={`relative rounded-[6px] shrink-0 transition-all duration-500 ${
            activeStep === index
              ? "w-8 h-3 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.15)]"
              : "size-3 bg-gray-200"
          }`}
          style={{
            backgroundColor:
              activeStep === index ? tabColors[index] : undefined,
          }}
          data-name="Tab"
        >
          <div className="bg-clip-padding border-0 border-transparent border-solid box-border size-full" />
        </div>
      ))}
    </div>
  );
}

function Liner({ activeStep }: { activeStep: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
      className="content-stretch flex flex-col gap-6 items-center justify-center relative shrink-0 w-full"
      data-name="liner"
    >
      <Container29 activeStep={activeStep} />
      <TabList activeStep={activeStep} />
    </motion.div>
  );
}

function CTA() {
  return (
    <div className="content-stretch flex gap-3 items-center ">
      <span> کل فرآیند کمتر از</span>
      <span className=" text-[#65bcb6] font-bold"> ۱۰ دقیقه</span>
      <span> زمان می‌برد</span>
    </div>
  );
}

function Button() {
  return (
    <Link href="/onboarding"  >
      <div
        className="bg-[#65bcb6] cursor-pointer rounded-2xl text-white px-8 py-4 inline-block text-center"
        data-name="Button"
      >
        شروع رایگان
      </div>  
    </Link>
  );
}

function ContainerFooter() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
      className="relative shrink-0 w-full"
    >
      <div className="flex flex-col items-center justify-center w-full gap-6">
        <CTA />
        <Button />
      </div>
    </motion.div>
  );
}

export default function Section3() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3000); // تغییر هر 3 ثانیه

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className=" content-stretch flex flex-col gap-2 p-10 items-start relative w-full"
    >
      <CardContainer />

      <div className="box-border flex flex-col gap-[58px] items-center justify-center p-16 w-full">
        <Header />
        <Card activeStep={activeStep} />
        <Liner activeStep={activeStep} />
        <ContainerFooter />
      </div>
    </motion.div>
  );
}
