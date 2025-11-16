"use client";
import { motion } from "motion/react";
import bgSvgPaths from "../svg/svg-kdb7ct6mks";
import {
  Sec6_Icon10,
  Sec6_Icon12,
  Sec6_Icon13,
  Sec6_Icon14,
  Sec6_Icon15,
  Sec6_Icon16,
  Sec6_Icon18,
  Sec6_Icon2,
  Sec6_Icon20,
  Sec6_Icon3,
  Sec6_Icon4,
  Sec6_Icon6,
  Sec6_Icon7,
  Sec6_Icon8,
  Sec6_Icon9,
} from "@/public/icons/landing";

function BackgroundIcon() {
  return (
    <div className="absolute h-full left-0 top-0 w-full" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 1431 1403"
      >
        <g clipPath="url(#clip0_section6_bg)" id="Icon">
          <g id="Vector"></g>
        </g>
        <defs>
          <clipPath id="clip0_section6_bg">
            <rect fill="white" height="1402.39" width="1431" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function BackgroundWave() {
  return (
    <div className="absolute h-[192px] left-0 bottom-0 w-full" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 1431 192"
      >
        <g id="Icon">
          <path
            d={bgSvgPaths.pbac4500}
            fill="var(--fill-0, #B07CC6)"
            id="Vector"
            opacity="0.5"
          />
        </g>
      </svg>
    </div>
  );
}

function BackgroundContainer() {
  return (
    <div
      className="absolute inset-0 overflow-clip"
      data-name="Container"
      style={{
        background:
          "linear-gradient(180deg, #F3F4F6 0%, #E9D5F5 50%, #C084D6 100%)",
      }}
    >
      <BackgroundIcon />
      <BackgroundWave />
    </div>
  );
}

function Header() {
  return (
    <motion.div
      className="content-stretch flex flex-col gap-[24px] items-center justify-center relative shrink-0 w-[1296px]"
      data-name="Header"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div
        className="bg-white box-border content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative rounded-[1.67772e+07px] shrink-0"
        data-name="Container"
      >
        <div
          className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0"
          data-name="Text"
        >
          <p
            className=" font-medium leading-[20px] relative shrink-0 text-[#65bcb6] text-[14px] text-center text-nowrap whitespace-pre"
            dir="auto"
          >
            ویژگی های آیوا
          </p>
        </div>
        <div
          className="bg-[#65bcb6] content-stretch flex gap-[10px] items-center relative rounded-[1.67772e+07px] shrink-0"
          data-name="Container"
        >
          <div
            className="bg-[#65bcb6] rounded-[1.67772e+07px] shrink-0 size-[8px]"
            data-name="Container"
          />
        </div>
      </div>
      <div
        className="h-[57.594px] relative shrink-0 w-[1232px]"
        data-name="Heading 2"
      >
        <p
          className="absolute  font-extrabold leading-[57.6px] left-[616.71px] text-[48px] text-center text-gray-900 text-nowrap top-[-1px] tracking-[-0.96px] translate-x-[-50%] whitespace-pre"
          dir="auto"
        >
          پشتیبانی سریع‌تر، ارزان‌تر و بدون خستگی؛
        </p>
      </div>
      <div
        className="content-stretch flex h-[28.797px] items-start relative shrink-0 w-[768px]"
        data-name="Paragraph"
      >
        <p
          className="basis-0  font-normal grow leading-[28.8px] min-h-px min-w-px relative shrink-0 text-[18px] text-center text-gray-600"
          dir="auto"
        >
          پشتیبانی انسانی گران و خسته‌کننده است، اما بات آیوا همیشه آماده‌است.
        </p>
      </div>
    </motion.div>
  );
}

type ArticleProps = {
  id?: number;
  title: string;
  desc: string;
  type: "problem" | "solution" | string;
  Icon: React.ElementType;
};

function ArticleItem({ title, desc, type, Icon }: ArticleProps) {
  const isSolution = type === "solution";

  return (
    <div
      className={`flex flex-col gap-3 p-5 pt-8 rounded-2xl shadow w-full
      ${
        isSolution
          ? "border border-green-300 bg-white"
          : "border border-red-300 bg-white"
      }`}
    >
      {!isSolution ? (
        <div className="absolute -top-4 px-2 right-6 rounded-xl flex items-center justify-center bg-red-500 p-1">
          <Sec6_Icon13 />
          <span className="text-xs text-white mr-1">مشکل</span>
        </div>
      ) : (
        <div className="absolute -top-4 px-2 rounded-xl left-6 flex items-center justify-center bg-emerald-500 p-1">
          <Sec6_Icon15 />
          <span className="text-xs text-white mr-1">راه‌حل</span>
        </div>
      )}

      <div
        className={`flex items-center gap-3 relative ${
          isSolution ? "justify-between" : "justify-start"
        }`}
      >
        {!isSolution && (
          <div className="bg-[rgba(239,68,68,0.1)] border-2 border-[rgba(239,68,68,0.15)] rounded-lg p-3">
            <Icon />
          </div>
        )}
        <div className="flex flex-col">
          <div className="font-bold text-lg ml-20">{title}</div>
          <p className="text-sm opacity-80">{desc}</p>
        </div>
        {isSolution && (
          <div className="bg-[rgba(16,185,129,0.1)] border-2 border-[rgba(16,185,129,0.2)] rounded-lg p-3">
            <Icon />
          </div>
        )}
      </div>
    </div>
  );
}

function ContainerMain() {
  const problemData: ArticleProps[] = [
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

  const solutionData: ArticleProps[] = [
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
      title: "هزینه ثابت و کم",
      desc: "پلان‌های آیوا از چند هزار تومان شروع می‌شن",
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

  const paired = problemData.map((p, index) => ({
    problem: p,
    solution: solutionData[index],
  }));

  return (
    <motion.div
      className="flex flex-col gap-4 w-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.45, delay: 0.08 }}
    >
      {paired.map((row, i) => (
        <div className="flex w-full gap-5" key={i}>
          <ArticleItem
            title={row.problem.title}
            desc={row.problem.desc}
            type="problem"
            Icon={row.problem.Icon}
          />
          <ArticleItem
            title={row.solution.title}
            desc={row.solution.desc}
            type="solution"
            Icon={row.solution.Icon}
          />
        </div>
      ))}
    </motion.div>
  );
}

function Footer() {
  return (
    <motion.div
      className="bg-white box-border flex mb-4  items-center justify-center p-5 rounded-lg "
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <div className="flex gap-4">
        <div className="text-base rounded-full border-[rgba(101,188,182,0.2)] p-3 bg-[rgba(101,188,182,0.1)] ">
          💡
        </div>

        <div className="flex flex-col">
          <p className="font-medium leading-[26px]   text-gray-900 text-nowrap text-right ">
            نکته: با آیوا، تیم پشتیبانی شما روی مشکلات پیچیده تمرکز می‌کنه
          </p>
          <p className="font-medium leading-[26px] text-sm text-gray-600 text-nowrap text-right ">
            و کارهای تکراری رو به چت‌بات هوشمند واگذار می‌کنید
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Section6() {
  return (
    <div className="relative w-full ">
      <BackgroundContainer />
      <div
        className="relative box-border content-stretch flex flex-col items-center justify-center overflow-clip p-16 w-full z-10"
        data-name="Comparison"
      >
        <div
          className="content-stretch flex flex-col gap-20 items-center justify-center relative shrink-0 w-full"
          data-name="Container"
        >
          <Header />
          <div className="content-stretch flex flex-col gap-10 items-center relative shrink-0 w-full">
            <div
              className="content-stretch flex flex-col gap-8   items-start relative shrink-0 w-full"
              data-name="Container"
            >
              <ContainerMain />
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
