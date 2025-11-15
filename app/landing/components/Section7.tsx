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

function Container() {
  return (
    <div
      className="h-[712px] overflow-clip relative shrink-0 w-[1431px]"
      data-name="Container"
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

function Header() {
  return (
    <motion.div
      className="content-stretch flex flex-col gap-[16px] h-[163px] items-end justify-center relative shrink-0 w-full"
      data-name="Header"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div
        className="content-stretch flex gap-[10px] items-center justify-end relative shrink-0 w-full"
        data-name="Heading 2"
      >
        <p
          className="  font-semibold leading-[36.4px] relative shrink-0 text-[28px] text-gray-900 text-nowrap text-right tracking-[-0.28px] whitespace-pre"
          dir="auto"
        >
          یک گفت‌وگوی نیمه‌شب، یک فروش واقعی!
        </p>
      </div>
      <div
        className="content-stretch flex gap-[10px] items-center justify-end relative shrink-0 w-full"
        data-name="Paragraph"
      >
        <p
          className=" font-medium leading-[30px] relative shrink-0 text-[16px] text-gray-600 text-right w-[548px]"
          dir="auto"
        >
          فروشگاه آنلاین‌کالا قبلاً مشکل داشت که مشتریان شبانه پاسخ نمی‌گرفتند و
          سفارش‌ها از دست می‌رفت. بعد از راه‌اندازی چت‌بات RagBuilder، حتی ساعت
          ۳ صبح هم مشتری‌ها می‌تونند سایز، رنگ و موجودی رو چک کنند.
        </p>
      </div>
    </motion.div>
  );
}

function Container6() {
  return (
    <div
      className="content-stretch flex gap-[20px] items-center justify-end relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="relative shrink-0" data-name="Container">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] items-start relative">
          <div
            className="box-border content-stretch flex gap-[18px] items-center justify-end px-px py-0 relative shrink-0 text-right w-[436px]"
            data-name="Heading 3"
          >
            <p className=" font-normal leading-[24px] relative shrink-0 text-[#65bcb6] text-[16px] w-[33px]">
              +۵۰٪
            </p>
            <p
              className=" font-medium leading-[30px] relative shrink-0 text-[22px] text-gray-900 text-nowrap whitespace-pre"
              dir="auto"
            >
              رشد تعامل شبانه
            </p>
          </div>
          <div
            className="h-[52px] relative shrink-0 w-[436px]"
            data-name="Paragraph"
          >
            <p
              className="absolute  font-medium leading-[26px] left-[440.16px] text-[16px] text-gray-600 text-right top-[-0.5px] translate-x-[-100%] w-[421px]"
              dir="auto"
            >
              در ۳ ماه اول، تعامل شبانه ۵۰٪ افزایش پیدا کرد و رضایت مشتری به ۹۷٪
              رسید.
            </p>
          </div>
        </div>
      </div>
      <div
        className="bg-[#e8f6f5] relative rounded-[16px] shrink-0 size-[56px]"
        data-name="Container"
      >
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[56px]">
          <Sec7_Icon6 />
        </div>
      </div>
    </div>
  );
}

function Article() {
  return (
    <motion.div
      className="bg-white relative rounded-[28px] shrink-0 w-full"
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
          <Container6 />
        </div>
      </div>
    </motion.div>
  );
}

function Button() {
  return (
    <motion.div
      className="bg-[#65bcb6] box-border content-stretch flex gap-[8px] h-[64px] items-center justify-center relative rounded-[20px] shadow-[0px_12px_28px_0px_rgba(101,188,182,0.35)] shrink-0 w-full cursor-pointer"
      data-name="Button"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.6 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Sec7_Icon7 />
      <div
        className="h-[24px] relative shrink-0 w-[128.688px]"
        data-name="Text"
      >
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[128.688px]">
          <p
            className="absolute  font-normal leading-[24px] left-0 text-[16px] text-nowrap text-white top-[-0.5px] whitespace-pre"
            dir="auto"
          >
            تست رایگان محصول
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function Container7() {
  return (
    <div
      className="basis-0 content-stretch flex flex-col gap-[32px] grow items-end min-h-px min-w-px relative shrink-0"
      data-name="Container"
    >
      <motion.div
        className="bg-[#e3f4f1] h-[36px] relative rounded-[1.67772e+07px] shrink-0 w-[160.797px]"
        data-name="Container"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <div
          className="absolute h-[20px] left-[16px] top-[8px] w-[112.797px]"
          data-name="Text"
        >
          <p
            className="absolute  font-medium leading-[20px] left-[56px] text-[#65bcb6] text-[14px] text-center text-nowrap top-0 translate-x-[-50%] whitespace-pre"
            dir="auto"
          >
            یک فروش بی نقص
          </p>
        </div>
        <div
          className="absolute bg-[#65bcb6] content-stretch flex flex-col items-start left-[136.8px] rounded-[1.67772e+07px] size-[8px] top-[14px]"
          data-name="Container"
        >
          <div
            className="bg-[#65bcb6] h-[8px] rounded-[1.67772e+07px] shrink-0 w-full"
            data-name="Container"
          />
        </div>
      </motion.div>
      <Header />
      <Article />
      <Button />
    </div>
  );
}

function Container8() {
  return (
    <motion.div
      className="absolute bg-[rgba(255,255,255,0.25)] h-[36px] left-[40px] rounded-[1.67772e+07px] top-[40px] w-[112.219px]"
      data-name="Container"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <Sec7_Icon8 />
      <div
        className="absolute h-[20px] left-[16px] top-[8px] w-[56.219px]"
        data-name="Text"
      >
        <p
          className="absolute  font-normal leading-[20px] left-0 text-[14px] text-white top-0 w-[57px]"
          dir="auto"
        >
          ۲:۳۰ صبح
        </p>
      </div>
    </motion.div>
  );
}

function Container9() {
  return (
    <motion.div
      className="absolute bg-white box-border content-stretch flex flex-col gap-[8px] h-[80px] items-start left-0 pb-0 pt-[16px] px-[20px] rounded-[24px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.08)] top-0 w-[158.766px]"
      data-name="Container"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
        <p
          className="absolute  font-normal leading-[24px] left-[119px] text-[16px] text-gray-900 text-right top-[-0.5px] translate-x-[-100%] w-[119px]"
          dir="auto"
        >
          سلام! XL موجوده؟
        </p>
      </div>
      <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
        <p className="absolute  font-normal leading-[16px] left-0 text-[12px] text-gray-500 text-nowrap top-[-0.5px] whitespace-pre">
          ۲:۳۰
        </p>
      </div>
    </motion.div>
  );
}

function Container10() {
  return (
    <div
      className="bg-[#65bcb6] relative rounded-[4px] shrink-0 size-[8px]"
      data-name="Container"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[8px]" />
    </div>
  );
}

function Container12() {
  return (
    <div
      className="basis-0 bg-[#65bcb6] grow h-[8px] min-h-px min-w-px relative rounded-[4px] shrink-0"
      data-name="Container"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[8px] w-full" />
    </div>
  );
}

function Container13() {
  return (
    <div
      className="basis-0 grow h-[8px] min-h-px min-w-px relative shrink-0"
      data-name="Container"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[6px] h-[8px] items-start relative w-full">
        {[...Array(2).keys()].map((_, i) => (
          <Container10 key={i} />
        ))}
        <Container12 />
      </div>
    </div>
  );
}

function Container14() {
  return (
    <motion.div
      className="absolute bg-[rgba(255,255,255,0.9)] box-border content-stretch flex h-[40px] items-center left-[428px] px-[20px] py-0 rounded-[24px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.08)] top-[96px] w-[76px]"
      data-name="Container"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.7 }}
    >
      <Container13 />
    </motion.div>
  );
}

function Container15() {
  return (
    <div
      className="absolute h-[136px] left-[40px] top-[108px] w-[504px]"
      data-name="Container"
    >
      <Container9 />
      <Container14 />
    </div>
  );
}

function Container16() {
  return (
    <div
      className="absolute h-[520px] left-0 top-0 w-[584px]"
      data-name="Container"
    />
  );
}

function Article1() {
  return (
    <motion.div
      className="bg-[#ffa18e] h-[520px] overflow-clip relative rounded-[32px] shadow-[0px_20px_60px_0px_rgba(255,161,142,0.25)] shrink-0 w-[584px]"
      data-name="Article"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Container8 />
      <Container15 />
      <Container16 />
    </motion.div>
  );
}

function CaseStudy() {
  return (
    <div
      className="absolute box-border content-stretch flex gap-[64px] h-[711px] items-center justify-center left-0 p-[64px] top-[0.63px] w-[1431px]"
      data-name="CaseStudy"
    >
      <Container7 />
      <Article1 />
    </div>
  );
}

export default function Section7() {
  return (
    <div
      className="bg-white content-stretch flex flex-col gap-[10px] items-start relative w-full min-h-[712px]"
      data-name="Section7"
    >
      <Container />
      <CaseStudy />
    </div>
  );
}
