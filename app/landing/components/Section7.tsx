"use client";
import {
  Sec7_Icon,
  Sec7_Icon1,
  Sec7_Icon2,
  Sec7_Icon3,
  Sec7_Icon4,
  Sec7_Icon5,
  Sec7_Icon6,
  Sec7_Icon7,
  Sec7_Icon8,
} from "@/public/icons/landing";
import { motion } from "motion/react";
import Link from "next/link";

function Container() {
  return (
    <div
    // className="h-[712px] overflow-clip relative shrink-0 w-[1431px]"
    // data-name="Container"
    >
      <Sec7_Icon />
      <Sec7_Icon1 />
      <Sec7_Icon2 />
      <Sec7_Icon3 />
      <Sec7_Icon4 />
      <Sec7_Icon5 />
    </div>
  );
}

function Interaction() {
  return (
    <motion.div
      className="bg-white relative rounded-[28px] shrink-0 my-3 w-full"
      data-name="Article"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div
        aria-hidden="true"
        className="absolute border-2 border-[#e8f6f5] border-solid inset-0 pointer-events-none rounded-[28px] shadow-[0px_8px_30px_0px_rgba(0,0,0,0.08)]"
      />
      <div className="flex flex-col items-end justify-center size-full">
        <div className="box-border content-stretch flex flex-col items-end justify-center p-[36px] relative w-full">
          <div className="content-stretch flex gap-5 items-center justify-end relative shrink-0 w-full">
            <div className="bg-[#e8f6f5] rounded-lg shrink-0 size-14">
              <div className="bg-clip-padding border-0 border-transparent border-solid box-border content-stretch flex items-center justify-center relative size-14">
                <Sec7_Icon6 />
              </div>
            </div>
            <div>
              <div className="bg-clip-padding border-0 border-transparent border-solid box-border content-stretch flex flex-col gap-2 items-start  ">
                <div className="box-border content-stretch flex gap-[18px] items-center justify-end px-px py-0   text-right ">
                  <p className=" font-medium leading-[30px] relative shrink-0 text-[22px] text-gray-900 text-nowrap whitespace-pre">
                    رشد تعامل شبانه
                  </p> 
                  <p className=" font-normal leading-6 relative shrink-0 text-[#65bcb6] text-[16px] ">
                   ۵۰٪+
                  </p>
                </div>
                <div
                  className="h-[52px] relative shrink-0 w-[436px]"
                  data-name="Paragraph"
                >
                  <p className="absolute  font-medium leading-[26px] left-[440.16px] text-[16px] text-gray-600 text-right top-[-0.5px] translate-x-[-100%] w-[421px]">
                    در ۳ ماه اول، تعامل شبانه ۵۰٪ افزایش پیدا کرد و رضایت مشتری
                    به ۹۷٪ رسید.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Button() {
  return (
    <Link href="/onboarding">
      <motion.div
        className="bg-[#65bcb6] box-border text-white flex gap-2 items-center justify-center rounded-lg shadow-[0px_12px_28px_0px_rgba(101,188,182,0.35)] p-4 w-full cursor-pointer"
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
  return (
    <div
      className="bg-[#65bcb6] relative rounded-[4px] shrink-0 size-[8px]"
      data-name="Container"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[8px]" />
    </div>
  );
}

function ChatSample() {
  return (
    <div className="h-full">
      {" "}
      {/* مهم */}
      <motion.div
        className="bg-[#ffa18e] h-full items-stretch p-10 rounded-3xl shadow-[0px_20px_60px_0px_rgba(255,161,142,0.25)] flex flex-col"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* بخش اول - چپ */}
        <div className="flex items-center text-sm text-white rounded-full bg-[#ffffff33] px-6 py-3 my-3 w-fit mr-auto">
          <div className="text-white w-4 h-4 ml-3">
            <Sec7_Icon8 />
          </div>
          <span>۲:۳۰ صبح</span>
        </div>

        {/* بخش دوم - چپ */}
        <div className="text-gray-900 bg-white rounded-3xl py-4 px-7 my-4 text-right w-fit mr-auto">
          سلام! XL موجوده؟
          <div className="p-3 text-xs text-gray-500 whitespace-pre text-left">
            ۲:۳۰
          </div>
        </div>

        {/* بخش سوم - راست */}
        <div className="flex justify-end bg-white my-6 p-4 rounded-4xl w-fit ml-auto">
          <div className="flex gap-2 h-2 w-fit">
            {[...Array(3).keys()].map((_, i) => (
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
    <div>
      <motion.div
        className=" "
        data-name="Container"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <div className="bg-[#e3f4f1] py-2 px-6 rounded-3xl w-fit ">
          <div className="flex items-center justify-start gap-2 font-medium text-primary text-sm text-center text-nowrap ">
            <div className="bg-primary rounded-full w-2 h-2"></div>
            <span>یک فروش بی نقص</span>
          </div>
        </div>
        <div className="font-semibold m-8 text-2xl text-gray-900 text-nowrap text-right whitespace-pre">
          یک گفت‌وگوی نیمه‌شب، یک فروش واقعی!
        </div>
        <div className=" font-medium leading-[30px] relative shrink-0   text-gray-600 text-right  ">
          فروشگاه آنلاین‌کالا قبلاً مشکل داشت که مشتریان شبانه پاسخ نمی‌گرفتند و
          سفارش‌ها از دست می‌رفت. بعد از راه‌اندازی چت‌بات RagBuilder، حتی ساعت
          ۳ صبح هم مشتری‌ها می‌تونند سایز، رنگ و موجودی رو چک کنند.
        </div>
      </motion.div>
      <Interaction />

      <Button />
    </div>
  );
}

function CaseStudy() {
  return (
    <div className="w-full min-h-80 gap-8 flex items-stretch justify-center p-14">
      <div className="w-full">
        <ChatSample />
      </div>

      <div className="w-full">
        <PerfectSale />
      </div>
    </div>
  );
}

export default function Section7() {
  return (
    <div
      className="bg-white content-stretch flex flex-col gap-2.5 items-start relative w-full min-h-[712px]"
      id="Interaction"
    >
      <Container />
      <CaseStudy />
    </div>
  );
}
