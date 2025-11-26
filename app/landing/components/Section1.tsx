"use client";
import svgPaths2 from "../svg/svg-2ojg9bngif";
import { Tik } from "@/public/icons/landing";
import { motion } from "motion/react";
import { AnimatedChat } from "./AnimatedChat";


function BackgroundDecorations2() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      data-name="BackgroundDecorations"
    >
      {/* <BackgroundIcon /> */}
      <BackgroundIcon1 />
      <BackgroundIcon2 />
      <BackgroundIcon3 />
    </div>
  );
}

function BackgroundIcon() {
  return (
    <motion.div
      className="absolute left-[214.65px] size-[80px] top-0"
      data-name="Icon"
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, 0, -5, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 80 80"
      >
        <g id="Icon" opacity="0.3">
          <path
            d="M40 8L72 72H8L40 8Z"
            fill="var(--fill-0, #B07CC6)"
            id="Vector"
          />
        </g>
      </svg>
    </motion.div>
  );
}

function BackgroundIcon1() {
  return (
    <div
      className="absolute h-[400px] left-1 top-0 w-[600px]"
      data-name="Icon"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 600 400"
      >
        <defs>
          <clipPath id="clip0_0_6266">
            <rect fill="white" height="400" width="600" />
          </clipPath>
        </defs>
        <g clipPath="url(#clip0_0_6266)" id="Icon" opacity="0.25">
          <motion.g
            animate={{
              x: [0, 15, 0, -15, 0],
              y: [0, -10, 0, 10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <path
              d={svgPaths2.p81e7400}
              id="Vector"
              stroke="#65BCB6"
              strokeWidth="2"
            />
          </motion.g>
          <motion.g
            animate={{
              x: [0, -15, 0, 15, 0],
              y: [0, 10, 0, -10, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <path
              d={svgPaths2.p27f4bc00}
              id="Vector_2"
              stroke="#FFA18E"
              strokeWidth="2"
            />
          </motion.g>
        </g>
      </svg>
    </div>
  );
}

function BackgroundIcon2() {
  return (
    <motion.div
      className="absolute left-[1282px] size-[96px] top-[19px]"
      data-name="Icon"
      animate={{
        rotate: [0, 360],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 96 96"
      >
        <g id="Icon" opacity="0.3">
          <path
            d={svgPaths2.p283c7e80}
            fill="var(--fill-0, #65BCB6)"
            id="Vector"
          />
        </g>
      </svg>
    </motion.div>
  );
}

function BackgroundIcon3() {
  return (
    <motion.div
      className="absolute left-[913px] size-[64px] top-[142px]"
      data-name="Icon"
      animate={{
        rotate: [0, -10, 0, 10, 0],
        y: [0, -15, 0, 15, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 64 64"
      >
        <g clipPath="url(#clip0_0_6908)" id="Icon" opacity="0.3">
          <path
            d={svgPaths2.pff02b00}
            fill="var(--fill-0, #FFA18E)"
            id="Vector"
          />
        </g>
        <defs>
          <clipPath id="clip0_0_6908">
            <rect fill="white" height="64" width="64" />
          </clipPath>
        </defs>
      </svg>
    </motion.div>
  );
}
function BackgroundDecorations() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Triangle - Bottom Left */}
      <motion.div
        className="absolute left-[5%] sm:left-[18%] -bottom-[50%] sm:top-[80%] w-12 sm:w-20 h-12 sm:h-20"
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg fill="none" viewBox="0 0 80 80" className="w-full h-full">
          <g opacity="0.3">
            <path d="M40 8L72 72H8L40 8Z" fill="#B07CC6" />
          </g>
        </svg>
      </motion.div>

      {/* Center SVG Paths - Hidden on small screens */}
      <div className="hidden sm:block absolute left-2/3 top-2/3 w-96 sm:w-[600px] h-64 sm:h-[400px] -translate-x-1/2 -translate-y-1/2">
        <svg fill="none" viewBox="0 0 600 400" className="w-full h-full">
          <defs>
            <clipPath id="clip0">
              <rect width="600" height="400" fill="white" />
            </clipPath>
          </defs>
          <g clipPath="url(#clip0)" opacity="0.25">
            <motion.path
              d={svgPaths2.p81e7400}
              stroke="#65BCB6"
              strokeWidth="2"
              animate={{ x: [0, 15, 0, -15, 0], y: [0, -10, 0, 10, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.path
              d={svgPaths2.p27f4bc00}
              stroke="#FFA18E"
              strokeWidth="2"
              animate={{ x: [0, -15, 0, 15, 0], y: [0, 10, 0, -10, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
          </g>
        </svg>
      </div>

      {/* Rotating Circle - Top Right - Hidden on mobile */}
      <motion.div
        className="hidden sm:block absolute right-[5%] sm:right-[15%] top-[5%] sm:-top-1 w-16 sm:w-24 h-16 sm:h-24"
        animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <svg fill="none" viewBox="0 0 96 96" className="w-full h-full">
          <g opacity="0.3">
            <path
              d="M48 86.4C69.2077 86.4 86.4 69.2077 86.4 48C86.4 26.7923 69.2077 9.6 48 9.6C26.7923 9.6 9.6 26.7923 9.6 48C9.6 69.2077 26.7923 86.4 48 86.4Z"
              fill="#65BCB6"
            />
          </g>
        </svg>
      </motion.div>

      {/* Animated Shape - Center Left - Hidden on mobile */}
      <motion.div
        className="hidden sm:block absolute left-1/2 top-1/5 w-12 sm:w-16 h-12 sm:h-16 -translate-x-1/2"
        animate={{
          rotate: [0, -10, 0, 10, 0],
          y: [0, -15, 0, 15, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg fill="none" viewBox="0 0 64 64" className="w-full h-full">
          <g clipPath="url(#clip0_0_6908)" opacity="0.3">
            <path d={svgPaths2.pff02b00} fill="#FFA18E" />
          </g>
          <defs>
            <clipPath id="clip0_0_6908">
              <rect width="64" height="64" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </motion.div>
    </div>
  );
}
interface StatItemProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  text: string;
}

function StatItem({ icon: Icon, text }: StatItemProps) {
  return (
    <div className="flex items-center gap-2 justify-end text-gray-500 text-xs sm:text-sm">
      <Icon />
      <span>{text}</span>
    </div>
  );
}

export default function Section1() {
  return (
    <section
      id="intro"
      className="w-full relative flex justify-center items-center px-4 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-24 overflow-hidden"
    >
      <BackgroundDecorations />

      <div className="container mx-auto flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10 relative z-10">
        {/* Left Column - 7/12 on desktop */}
        <div className="w-full lg:w-7/12 flex flex-col gap-6 sm:gap-8">
          {/* Badge */}
          <div>
            <div className="bg-[#e3f4f1] rounded-full inline-flex items-center gap-2 px-3 sm:px-4 py-2">
              <div className="h-2 w-2 bg-[#65bcb6] rounded-full shrink-0" />
              <div className="text-[#65bcb6] text-xs sm:text-sm font-medium whitespace-nowrap">
                جدیدترین فناوری هوش مصنوعی
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-4 sm:space-y-5 lg:pr-24 lg:pl-8">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 text-right leading-tight">
                دستیار هوشمند برای هر وب‌سایتی
              </h1>
            </div>
            <p className="text-gray-600 text-sm sm:text-base lg:text-base text-right leading-relaxed">
              آیوا در چند دقیقه به سایت شما وصل می‌شود، بر اساس محتوای شما آموزش
              می‌بیند، به فارسی و چندزبان پاسخ می‌دهد و سرنخ‌های فروش را جمع
              می‌کند.
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-gray-200">
            <StatItem icon={Tik} text="بیش از ۱۰۰۰ کسب‌وکار فعال" />
            <StatItem icon={Tik} text="راه‌اندازی در کمتر از ۵ دقیقه" />
            <StatItem icon={Tik} text="پشتیبانی ۲۴/۷" />
          </div>
        </div>

        {/* Right Column - 5/12 on desktop */}
        <div className="w-full lg:w-5/12">
          <div className="relative">
            {/* Preview Badge */}
            <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 z-20">
              <div className="flex items-center gap-2 bg-[#65bcb6] text-white text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-full shadow-lg">
                <div className="bg-white rounded-full w-2 h-2 shrink-0" />
                <span className="whitespace-nowrap">پیش نمایش</span>
              </div>
            </div>

            {/* Chat Component */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-5 overflow-hidden">
              <AnimatedChat />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
