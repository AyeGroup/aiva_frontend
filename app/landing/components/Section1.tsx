"use client";
import svgPaths2 from "../svg/svg-2ojg9bngif";
import { motion } from "motion/react";
import { AnimatedChat } from "./AnimatedChat";
import { Tik } from "@/public/icons/landing";

function BackgroundDecorations() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        className="absolute left-[18%] top-[80%] w-20 h-20"
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg fill="none" viewBox="0 0 80 80" className="w-full h-full">
          <g opacity="0.3">
            <path d="M40 8L72 72H8L40 8Z" fill="#B07CC6" />
          </g>
        </svg>
      </motion.div>

      <div className="absolute left-[50%] top-[50%] w-[600px] h-[400px]">
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

      <motion.div
        className="absolute right-[15%] top-[10%] w-24 h-24"
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

      <motion.div
        className="absolute left-[50%] top-[35%] w-16 h-16"
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

export default function Section1() {
  return (
    <section id="intro" className="w-full   flex justify-center items-center px-16 pt-24 pb-10">
      <BackgroundDecorations />

      <div className="container mx-auto flex flex-col lg:flex-row gap-10">
        {/* ستون چپ 7/12 */}
        <div className="lg:w-7/12 flex flex-col gap-8 ">
          <div>
            <div className="bg-[#e3f4f1] rounded-full inline-flex items-center gap-2 px-4 py-2">
              <div className="h-2 w-2 bg-[#65bcb6] rounded-full" />
              <div className="text-[#65bcb6] text-sm font-medium">
                جدیدترین فناوری هوش مصنوعی
              </div>
            </div>
          </div>

          <div className="space-y-5 pr-24 pl-8">
            <div>
              <h1 className="text-5xl  font-extrabold text-gray-900 text-right">
                دستیار هوشمند برای هر وب‌سایتی
              </h1>
            </div>
            <p className="text-gray-600 text-right leading-8">
              آیوا در چند دقیقه به سایت شما وصل می‌شود، بر اساس محتوای شما آموزش
              می‌بیند، به فارسی و چندزبان پاسخ می‌دهد و سرنخ‌های فروش را جمع
              می‌کند.
            </p>
          </div>
          <div className="flex items-center justify-center pt-8 gap-4 border-t border-gray-200">
            <div className="flex items-center gap-2 justify-end text-gray-500 text-sm">
              <Tik />
              <span>بیش از ۱۰۰۰ کسب‌وکار فعال</span>
            </div>
            <div className="flex items-center gap-2 justify-end text-gray-500 text-sm">
              <Tik />
              <span>راه‌اندازی در کمتر از ۵ دقیقه</span>
            </div>
            <div className="flex items-center gap-2 justify-end text-gray-500 text-sm">
              <Tik />
              <span>پشتیبانی ۲۴/۷</span>
            </div>
          </div>
        </div>

        {/* ستون چپ */}
        <div className="lg:w-5/12 rounded-2xl shadow-lg relative border border-gray-200">
          {/* دکمه پیش نمایش */}
          <div className="absolute -top-6 -right-6 z-10">
            <div className="flex items-center gap-2 bg-[#65bcb6] text-white text-sm m-1 px-4 py-2 rounded-full shadow">
              <div className="bg-white rounded-full w-2 h-2"></div>
              پیش نمایش
            </div>
          </div>

          {/* محتوا */}
          <div className="p-5">
            <AnimatedChat />
          </div>
        </div>
      </div>
    </section>
  );
}
