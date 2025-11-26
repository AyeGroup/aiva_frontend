"use client";

import Link from "next/link";
import Image from "next/image";
import { convertToPersian } from "@/utils/common";
import { MapPin, Phone, Mail } from "lucide-react";

const Container = () => {
  return (
    <div className="opacity-50 relative size-full">
      <div className="absolute left-0 top-0 w-full h-24">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 1431 96"
          aria-hidden="true"
        >
          <g clipPath="url(#clip0_0_5662)" id="Icon" opacity="0.15">
            <path
              d="M0 47.9996C238.5 28.7996 477 28.7996 715.5 47.9996C954 67.1996 1192.5 67.1996 1431 47.9996"
              id="Vector"
              stroke="var(--stroke-0, #65BCB6)"
              strokeWidth="2.13991"
            />
          </g>
          <defs>
            <clipPath id="clip0_0_5662">
              <rect fill="white" height="96" width="1431" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default function Footer() {
  return (
    <footer className="relative w-full px-10 bg-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Container />
      </div>

      {/* Footer Content */}
      <div className="relative z-10 w-full flex flex-col items-center px-4 sm:px-6 md:px-8 lg:px-20 pt-4">
        {/* Main Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-6 sm:gap-8 md:gap-10 lg:gap-12 py-8 md:py-12 text-gray-400 w-full">
          {/* Logo & Description */}
          <div className="text-right col-span-1 sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 justify-start">
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt="آیوا"
                  width={40}
                  height={40}
                  priority
                />
                <span className="text-white font-semibold text-lg sm:text-xl">
                  آیوا
                </span>
              </Link>
            </div>
            <p className="text-gray-400 leading-6 text-right text-sm sm:text-base mt-2">
              هوشمندترین چت‌بات برای کسب‌وکار شما
            </p>
          </div>

          {/* Description */}
          <div className="text-justify lg:pt-10 col-span-1 sm:col-span-2 lg:col-span-3 text-sm sm:text-base">
            <p className="leading-6">
              خلاقیت یا آفرینندگی توان ساختن یا خلق نمودن چیزی نو است، راهکاری
              نو برای حل یک مشکل، یک روش یا یک دستگاه نو، یا یک شیء یا فرم نو
              هنری. «خلاقیت بشر تعریفی از قابلیت‌های اقتصاد، زندگی، فناوری،
              صنایع نو، ثروت نو و کلیهٔ چیزهایی است که از یک اقتصاد خوب جریان
              می‌گیرند.
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-y-3 sm:gap-y-4 col-span-1 sm:col-span-2 lg:col-span-2">
            <div className="text-gray-100 text-base sm:text-lg font-semibold">
              تماس با ما
            </div>

            <div className="flex items-center gap-2 text-sm sm:text-base">
              <MapPin size={18} className="text-gray-300 flex-shrink-0" />
              <span className="text-right">
                تهران، آزادی، خیابان صادقی، پلاک ۳۳
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm sm:text-base">
              <Phone size={18} className="text-gray-300 flex-shrink-0" />
              <a
                href="tel:09903202903"
                className="hover:text-gray-100 transition duration-200"
              >
                {convertToPersian("09903202903")}
              </a>
            </div>

            <div className="flex items-center gap-2 text-sm sm:text-base">
              <Mail size={18} className="text-gray-300 flex-shrink-0" />
              <a
                href="mailto:info@ayehgroup.com"
                className="hover:text-gray-100 transition duration-200 break-all sm:break-normal"
              >
                info@ayehgroup.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-4 sm:mt-6 md:mt-8 w-full p-4 border-t border-gray-800 flex items-center justify-center">
          <div className="flex  items-center justify-center text-gray-500 text-xs sm:text-sm gap-1">
            <span>© ۲۰۲۵ تمام حقوق سایت متعلق به</span>
            <Link
              href="https://ayehgroup.com/"
              className="text-gray-400 hover:text-gray-100 transition duration-200 font-semibold mx-0.5"
            >
              گروه آیه
            </Link>
            <span>است.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
