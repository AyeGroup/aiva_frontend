// Refactored Section7 with improved responsive behavior
"use client";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Sec7_Icon5,
  Sec7_Icon6,
  Sec7_Icon7,
  Sec7_Icon8,
} from "@/public/icons/landing";

function Interaction() {
  return (
    <motion.div
      className="bg-white relative rounded-2xl my-3 w-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="absolute inset-0 rounded-2xl border-2 border-[#e8f6f5] shadow-md pointer-events-none" />

      <div className="flex flex-col items-end p-6">
        <div className="flex gap-4 items-center w-full justify-end flex-wrap">
          <div className="bg-[#e8f6f5] rounded-lg size-14 flex items-center justify-center">
            <Sec7_Icon6 />
          </div>

          <div className="flex flex-col gap-2 text-right max-w-full">
            <div className="flex gap-4 items-center">
              <p className="text-[20px] md:text-[22px] font-medium text-gray-900 whitespace-nowrap">
                رشد تعامل شبانه
              </p>
              <p className="text-[16px] text-[#65bcb6]">۵۰٪+</p>
            </div>

            <p className="text-gray-600 leading-6 text-[15px] md:text-[16px] max-w-xs md:max-w-md">
              در ۳ ماه اول، تعامل شبانه ۵۰٪ افزایش پیدا کرد و رضایت مشتری به ۹۷٪
              رسید.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Button() {
  return (
    <Link href="/onboarding" className="block w-full">
      <motion.div
        className="bg-[#65bcb6] text-white flex gap-2 items-center justify-center rounded-lg shadow-lg p-4 w-full cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Sec7_Icon7 />
        تست رایگان محصول
      </motion.div>
    </Link>
  );
}

function ThreeDots() {
  return <div className="bg-[#65bcb6] rounded-[4px] size-[8px]" />;
}

function ChatSample() {
  return (
    <div className="h-full w-full">
      <motion.div
        className="bg-[#ffa18e] p-6 gap-y-8 md:p-10 rounded-3xl shadow-xl flex flex-col h-full"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* بخش اول */}
        <div className="flex items-center text-sm text-white rounded-full bg-white/20 px-5 py-2 w-fit mr-auto">
          <div className="ml-2 w-4 h-4">
            <Sec7_Icon8 />
          </div>
          <span>۲:۳۰ صبح</span>
        </div>

        {/* پیام 1 */}
        <div className="bg-white text-right text-gray-900 rounded-3xl py-4 px-6 my-4 w-fit max-w-[85%] mr-auto">
          سلام! XL موجوده؟
          <div className="text-xs text-gray-500 mt-2 text-left">۲:۳۰</div>
        </div>

        {/* تایپینگ */}
        <div className="flex justify-start my-4 w-full">
          <div className="flex gap-2 bg-white p-3 rounded-3xl shadow-sm">
            {[0, 1, 2].map((i) => (
              <ThreeDots key={i} />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function PerfectSale() {
  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <div className="bg-[#e3f4f1] py-2 px-5 rounded-3xl w-fit mx-auto md:mx-0">
          <div className="flex items-center gap-2 text-primary text-sm font-medium">
            <div className="bg-primary w-2 h-2 rounded-full"></div>
            <span>یک فروش بی نقص</span>
          </div>
        </div>

        <h3 className="font-semibold mt-6 text-xl md:text-2xl text-gray-900 text-right">
          یک گفت‌وگوی نیمه‌شب، یک فروش واقعی!
        </h3>

        <p className="text-gray-600 leading-7 text-right mt-4 text-[15px] md:text-[16px]">
          فروشگاه آنلاین‌کالا قبلاً مشکل داشت که مشتریان شبانه پاسخ نمی‌گرفتند و
          سفارش‌ها از دست می‌رفت. بعد از راه‌اندازی چت‌بات RagBuilder، حتی ساعت
          ۳ صبح هم مشتری‌ها می‌تونند سایز، رنگ و موجودی را چک کنند.
        </p>
      </motion.div>

      <Interaction />
      <Button />
    </div>
  );
}

export default function Section7() {
  return (
    <div id="Interaction" className="bg-white py-5 px-8 lg:px-24 flex flex-col gap-3 w-full">
      <Sec7_Icon5 />

      <div className="w-full flex flex-col-reverse md:flex-row gap-8 items-stretch justify-center p-6 md:p-14">
        <div className="w-full md:w-1/2">
          <ChatSample />
        </div>

        <div className="w-full md:w-1/2">
          <PerfectSale />
        </div>
      </div>
    </div>
  );
}
