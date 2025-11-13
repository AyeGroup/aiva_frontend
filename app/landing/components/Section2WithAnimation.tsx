"use client";
import { motion } from "motion/react";
import svgPaths from "../svg/svg-jdf94yeg6v";
import PhoneAndCustomer1 from "./PhoneAndCustomer1";

function Icon() {
  return (
    <motion.div 
      className="absolute left-[114.48px] size-[64px] top-[196.73px]" 
      data-name="Icon"
      animate={{
        y: [0, -20, 0],
        x: [0, 10, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 64 64">
        <g id="Icon" opacity="0.25">
          <path d={svgPaths.p152db200} id="Vector" stroke="var(--stroke-0, #65BCB6)" strokeWidth="5.33333" />
          <path d={svgPaths.p2ad26680} id="Vector_2" opacity="0.952107" stroke="var(--stroke-0, #65BCB6)" strokeWidth="5.33333" />
        </g>
      </svg>
    </motion.div>
  );
}

function Icon1() {
  return (
    <motion.div 
      className="absolute left-[1231.91px] size-[56px] top-[927.67px]" 
      data-name="Icon"
      animate={{
        rotate: [0, 180, 360],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 56 56">
        <g id="Icon" opacity="0.25">
          <path d={svgPaths.p19d60f80} id="Vector" stroke="var(--stroke-0, #FFA18E)" strokeWidth="4.66667" />
          <path d={svgPaths.p77b1b80} id="Vector_2" stroke="var(--stroke-0, #FFA18E)" strokeWidth="4.66667" />
          <path d={svgPaths.p1ebcb6be} id="Vector_3" stroke="var(--stroke-0, #FFA18E)" strokeWidth="4.66667" />
        </g>
      </svg>
    </motion.div>
  );
}

function Icon2() {
  return (
    <motion.div 
      className="absolute left-[1168.35px] size-[48px] top-[524.62px]" 
      data-name="Icon"
      animate={{
        y: [0, 15, 0],
        rotate: [0, -5, 5, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Icon" opacity="0.3">
          <path d={svgPaths.p1f337080} fill="var(--fill-0, #4460F7)" id="Vector" />
          <path d="M24 32V24" id="Vector_2" stroke="var(--stroke-0, white)" strokeWidth="4" />
          <path d="M24 16H24.02" id="Vector_3" opacity="0.904215" stroke="var(--stroke-0, white)" strokeWidth="4" />
        </g>
      </svg>
    </motion.div>
  );
}

function Icon3() {
  return (
    <motion.div 
      className="absolute left-[171.72px] size-[40px] top-[1074.83px]" 
      data-name="Icon"
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 90, 0],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Icon" opacity="0.3">
          <path d={svgPaths.p19a01780} id="Vector" stroke="var(--stroke-0, #B07CC6)" strokeWidth="3.33333" />
          <path d={svgPaths.p15663e00} id="Vector_2" stroke="var(--stroke-0, #B07CC6)" strokeWidth="3.33333" />
          <path d={svgPaths.p3911f600} id="Vector_3" stroke="var(--stroke-0, #B07CC6)" strokeWidth="3.33333" />
        </g>
      </svg>
    </motion.div>
  );
}

function Container() {
  return (
    <div className="absolute h-[1256px] left-0 overflow-clip top-0 w-[1431px]" data-name="Container">
      <Icon />
      <Icon1 />
      <Icon2 />
      <Icon3 />
    </div>
  );
}

function Text() {
  return (
    <div className="absolute h-[20px] left-[16px] top-[8px] w-[51.953px]" data-name="Text">
      <p className="absolute font-['Vazirmatn:Medium',sans-serif] font-medium leading-[20px] left-[26.5px] text-[#65bcb6] text-[14px] text-center text-nowrap top-0 translate-x-[-50%] whitespace-pre" dir="auto">
        درباره آیوا
      </p>
    </div>
  );
}

function Container1() {
  return <div className="bg-[#65bcb6] h-[8px] rounded-[1.67772e+07px] shrink-0 w-full" data-name="Container" />;
}

function Container2() {
  return (
    <div className="absolute bg-[#65bcb6] content-stretch flex flex-col items-start left-[75.95px] rounded-[1.67772e+07px] size-[8px] top-[14px]" data-name="Container">
      <Container1 />
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-[#e3f4f1] h-[36px] relative rounded-[1.67772e+07px] shrink-0 w-[99.953px]" data-name="Container">
      <Text />
      <Container2 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[503px] py-0 relative shrink-0" data-name="Heading 2">
      <p className="font-['Vazirmatn:ExtraBold',sans-serif] font-extrabold leading-[57.6px] relative shrink-0 text-[48px] text-center text-gray-900 text-nowrap tracking-[-0.96px] whitespace-pre" dir="auto">
        آیوا چیست؟
      </p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[111px] py-0 relative shrink-0" data-name="Paragraph">
      <p className="font-['Vazirmatn:Regular',sans-serif] font-normal leading-[28.8px] relative shrink-0 text-[18px] text-center text-gray-600 w-[449px]" dir="auto">
        چت‌بات هوشمند مبتنی بر AI که کسب‌وکار شما را متحول می‌کند
      </p>
    </div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center justify-center relative shrink-0 w-full" data-name="Header">
      <Container3 />
      <Heading2 />
      <Paragraph />
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute bg-clip-text font-['Vazirmatn:Black',sans-serif] font-black leading-[48px] left-[120.04px] text-[32px] text-center text-gray-900 text-nowrap top-0 translate-x-[-50%] whitespace-pre" style={{ WebkitTextFillColor: "transparent", backgroundImage: "linear-gradient(90deg, rgb(17, 24, 39) 0%, rgb(17, 24, 39) 100%), linear-gradient(144.782deg, rgb(101, 188, 182) 0%, rgb(82, 212, 160) 100%)" }}>
        ۲۴/۷
      </p>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Vazirmatn:Medium',sans-serif] font-medium leading-[21px] left-[120.25px] text-[14px] text-center text-gray-500 text-nowrap top-[-0.5px] translate-x-[-50%] whitespace-pre" dir="auto">
        در دسترس
      </p>
    </div>
  );
}

function Container6() {
  return (
    <div className="basis-0 bg-white grow h-full min-h-px min-w-px relative rounded-[24px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[24px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start pb-px pt-[25px] px-[25px] relative size-full">
          <Container4 />
          <Container5 />
        </div>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute bg-clip-text font-['Vazirmatn:Black',sans-serif] font-black leading-[48px] left-[120.15px] text-[32px] text-center text-gray-900 top-0 translate-x-[-50%] w-[101px]" dir="auto" style={{ WebkitTextFillColor: "transparent", backgroundImage: "linear-gradient(90deg, rgb(17, 24, 39) 0%, rgb(17, 24, 39) 100%), linear-gradient(154.581deg, rgb(101, 188, 182) 0%, rgb(82, 212, 160) 100%)" }}>{`< ۱ ثانیه`}</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Vazirmatn:Medium',sans-serif] font-medium leading-[21px] left-[120.27px] text-[14px] text-center text-gray-500 text-nowrap top-[-0.5px] translate-x-[-50%] whitespace-pre" dir="auto">
        زمان پاسخ
      </p>
    </div>
  );
}

function Container9() {
  return (
    <div className="basis-0 bg-white grow h-full min-h-px min-w-px relative rounded-[24px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[24px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start pb-px pt-[25px] px-[25px] relative size-full">
          <Container7 />
          <Container8 />
        </div>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute bg-clip-text font-['Vazirmatn:Black',sans-serif] font-black leading-[48px] left-[120.36px] text-[32px] text-center text-gray-900 text-nowrap top-0 translate-x-[-50%] whitespace-pre" style={{ WebkitTextFillColor: "transparent", backgroundImage: "linear-gradient(90deg, rgb(17, 24, 39) 0%, rgb(17, 24, 39) 100%), linear-gradient(138.366deg, rgb(101, 188, 182) 0%, rgb(82, 212, 160) 100%)" }}>
        ۹۷٪
      </p>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Vazirmatn:Medium',sans-serif] font-medium leading-[21px] left-[120.38px] text-[14px] text-center text-gray-500 text-nowrap top-[-0.5px] translate-x-[-50%] whitespace-pre" dir="auto">
        رضایت مشتریان
      </p>
    </div>
  );
}

function Container12() {
  return (
    <div className="basis-0 bg-white grow h-full min-h-px min-w-px relative rounded-[24px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[24px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start pb-px pt-[25px] px-[25px] relative size-full">
          <Container10 />
          <Container11 />
        </div>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute bg-clip-text font-['Vazirmatn:Black',sans-serif] font-black leading-[48px] left-[120.37px] text-[32px] text-center text-gray-900 top-0 translate-x-[-50%] w-[72px]" style={{ WebkitTextFillColor: "transparent", backgroundImage: "linear-gradient(90deg, rgb(17, 24, 39) 0%, rgb(17, 24, 39) 100%), linear-gradient(146.31deg, rgb(101, 188, 182) 0%, rgb(82, 212, 160) 100%)" }}>
        +۱۰۰۰
      </p>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Vazirmatn:Medium',sans-serif] font-medium leading-[21px] left-[120.2px] text-[14px] text-center text-gray-500 text-nowrap top-[-0.5px] translate-x-[-50%] whitespace-pre" dir="auto">
        کسب‌وکار فعال
      </p>
    </div>
  );
}

function Container15() {
  return (
    <div className="basis-0 bg-white grow h-full min-h-px min-w-px relative rounded-[24px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[24px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start pb-px pt-[25px] px-[25px] relative size-full">
          <Container13 />
          <Container14 />
        </div>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex gap-[12px] h-[127px] items-start relative shrink-0 w-full" data-name="Container">
      <Container6 />
      <Container9 />
      <Container12 />
      <Container15 />
    </div>
  );
}

// Feature cards components
function Icon4() {
  return (
    <div className="absolute left-[313.66px] size-[80px] top-px" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 80 80">
        <g clipPath="url(#clip0_0_6630)" id="Icon" opacity="0.25">
          <path d={svgPaths.p30db0400} fill="var(--fill-0, #FFA18E)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_0_6630">
            <rect fill="white" height="80" width="80" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute left-[14px] size-[28px] top-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g clipPath="url(#clip0_0_6208)" id="Icon">
          <path d={svgPaths.p14dfe880} id="Vector" stroke="var(--stroke-0, #FFA18E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.91667" />
          <path d={svgPaths.p1aefb400} id="Vector_2" stroke="var(--stroke-0, #FFA18E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.91667" />
        </g>
        <defs>
          <clipPath id="clip0_0_6208">
            <rect fill="white" height="28" width="28" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute bg-[rgba(255,161,142,0.08)] left-[313.66px] rounded-[16px] size-[56px] top-[25px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,161,142,0.14)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Icon5 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[25.195px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Vazirmatn:Bold',sans-serif] font-bold leading-[25.2px] left-[345.38px] text-[18px] text-gray-900 text-nowrap text-right top-[-0.5px] translate-x-[-100%] whitespace-pre" dir="auto">
        یکپارچه‌سازی آسان
      </p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[47.594px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Vazirmatn:Medium',sans-serif] font-medium leading-[23.8px] left-[344.92px] text-[14px] text-gray-500 text-right top-[-0.5px] translate-x-[-100%] w-[306px]" dir="auto">
        به راحتی با وب‌سایت، واتساپ، تلگرام، اینستاگرام و سایر پلتفرم‌ها یکپارچه شوید
      </p>
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[84.789px] items-start left-[25px] top-[101px] w-[344.664px]" data-name="Container">
      <Heading3 />
      <Paragraph1 />
    </div>
  );
}

function Article() {
  return (
    <div className="bg-white h-[210.789px] relative rounded-[16px] shrink-0 w-[394.664px]" data-name="Article">
      <div className="h-[210.789px] overflow-clip relative rounded-[inherit] w-[394.664px]">
        <Icon4 />
        <Container19 />
        <Container20 />
      </div>
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

// Similar pattern for other cards - I'll create simplified versions
function Article1() {
  return (
    <div className="bg-white h-[210.789px] relative rounded-[16px] shrink-0 w-[394.664px]" data-name="Article">
      <div className="h-[210.789px] overflow-clip relative rounded-[inherit] w-[394.664px]">
        <div className="absolute left-[313.66px] size-[80px] top-px">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 80 80">
            <g clipPath="url(#clip1)" id="Icon" opacity="0.25">
              <path d={svgPaths.p30db0400} fill="var(--fill-0, #52D4A0)" id="Vector" />
            </g>
            <defs>
              <clipPath id="clip1">
                <rect fill="white" height="80" width="80" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="absolute bg-[rgba(82,212,160,0.08)] left-[313.66px] rounded-[16px] size-[56px] top-[25px]">
          <div aria-hidden="true" className="absolute border-2 border-[rgba(82,212,160,0.14)] border-solid inset-0 pointer-events-none rounded-[16px]" />
          <div className="absolute left-[14px] size-[28px] top-[14px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
              <g clipPath="url(#clip2)" id="Icon">
                <path d={svgPaths.p1fa66600} id="Vector" stroke="var(--stroke-0, #52D4A0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.91667" />
                <path d={svgPaths.p1d189680} id="Vector_2" stroke="var(--stroke-0, #52D4A0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.91667" />
                <path d="M2.33333 14H25.6667" id="Vector_3" stroke="var(--stroke-0, #52D4A0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.91667" />
              </g>
              <defs>
                <clipPath id="clip2">
                  <rect fill="white" height="28" width="28" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
        <div className="absolute content-stretch flex flex-col gap-[12px] h-[84.789px] items-start left-[25px] top-[101px] w-[344.664px]">
          <div className="h-[25.195px] relative shrink-0 w-full">
            <p className="absolute font-['Vazirmatn:Bold',sans-serif] font-bold leading-[25.2px] left-[345.34px] text-[18px] text-gray-900 text-nowrap text-right top-[-0.5px] translate-x-[-100%] whitespace-pre" dir="auto">
              پشتیبانی چندزبانه
            </p>
          </div>
          <div className="h-[47.594px] relative shrink-0 w-full">
            <p className="absolute font-['Vazirmatn:Medium',sans-serif] font-medium leading-[23.8px] left-[345.3px] text-[14px] text-gray-500 text-right top-[-0.5px] translate-x-[-100%] w-[316px]" dir="auto">
              به فارسی، انگلیسی و بیش از ۵۰ زبان دیگر با مشتریان خود گفت‌وگو کنید
            </p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Article2() {
  return (
    <div className="bg-white h-[210.789px] relative rounded-[16px] shrink-0 w-[394.664px]" data-name="Article">
      <div className="h-[210.789px] overflow-clip relative rounded-[inherit] w-[394.664px]">
        <div className="absolute left-[313.66px] size-[80px] top-px">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 80 80">
            <g clipPath="url(#clip3)" id="Icon" opacity="0.25">
              <path d={svgPaths.p30db0400} fill="var(--fill-0, #65BCB6)" id="Vector" />
            </g>
            <defs>
              <clipPath id="clip3">
                <rect fill="white" height="80" width="80" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="absolute bg-[rgba(101,188,182,0.08)] left-[313.66px] rounded-[16px] size-[56px] top-[25px]">
          <div aria-hidden="true" className="absolute border-2 border-[rgba(101,188,182,0.14)] border-solid inset-0 pointer-events-none rounded-[16px]" />
          <div className="absolute left-[14px] size-[28px] top-[14px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
              <g clipPath="url(#clip4)" id="Icon">
                <path d="M14 21V5.83333" id="Vector" stroke="var(--stroke-0, #65BCB6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.91667" />
                <path d={svgPaths.p3536b5c0} id="Vector_2" stroke="var(--stroke-0, #65BCB6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.91667" />
                <path d={svgPaths.pf30d500} id="Vector_3" stroke="var(--stroke-0, #65BCB6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.91667" />
                <path d={svgPaths.p395f4600} id="Vector_4" stroke="var(--stroke-0, #65BCB6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.91667" />
                <path d={svgPaths.p3fb109e0} id="Vector_5" stroke="var(--stroke-0, #65BCB6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.91667" />
                <path d={svgPaths.pcb4cbe0} id="Vector_6" stroke="var(--stroke-0, #65BCB6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.91667" />
                <path d={svgPaths.p164ec400} id="Vector_7" stroke="var(--stroke-0, #65BCB6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.91667" />
                <path d={svgPaths.p1031f00} id="Vector_8" stroke="var(--stroke-0, #65BCB6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.91667" />
              </g>
              <defs>
                <clipPath id="clip4">
                  <rect fill="white" height="28" width="28" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
        <div className="absolute content-stretch flex flex-col gap-[12px] h-[84.789px] items-start left-[25px] top-[101px] w-[344.664px]">
          <div className="h-[25.195px] relative shrink-0 w-full">
            <p className="absolute font-['Vazirmatn:Bold',sans-serif] font-bold leading-[25.2px] left-[344.84px] text-[18px] text-gray-900 text-nowrap text-right top-[-0.5px] translate-x-[-100%] whitespace-pre" dir="auto">
              یادگیری هوشمند
            </p>
          </div>
          <div className="h-[47.594px] relative shrink-0 w-full">
            <p className="absolute font-['Vazirmatn:Medium',sans-serif] font-medium leading-[23.8px] left-[344.8px] text-[14px] text-gray-500 text-right top-[-0.5px] translate-x-[-100%] w-[342px]" dir="auto">
              آیوا از محتوای وب‌سایت، فایل‌ها و مستندات شما یاد می‌گیرد و پاسخ‌های دقیق و شخصی‌سازی شده ارائه می‌دهد
            </p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Article3() {
  return (
    <div className="bg-white h-[210.789px] relative rounded-[16px] shrink-0 w-[394.664px]" data-name="Article">
      <div className="h-[210.789px] overflow-clip relative rounded-[inherit] w-[394.664px]">
        <div className="absolute left-[313.66px] size-[80px] top-px">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 80 80">
            <g clipPath="url(#clip5)" id="Icon" opacity="0.25">
              <path d={svgPaths.p30db0400} fill="var(--fill-0, #FF8970)" id="Vector" />
            </g>
            <defs>
              <clipPath id="clip5">
                <rect fill="white" height="80" width="80" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="absolute bg-[rgba(255,137,112,0.08)] left-[313.66px] rounded-[16px] size-[56px] top-[25px]">
          <div aria-hidden="true" className="absolute border-2 border-[rgba(255,137,112,0.14)] border-solid inset-0 pointer-events-none rounded-[16px]" />
          <div className="absolute left-[14px] size-[28px] top-[14px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
              <g id="Icon">
                <path d={svgPaths.p1a3063b0} id="Vector" stroke="var(--stroke-0, #FF8970)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.91667" />
              </g>
            </svg>
          </div>
        </div>
        <div className="absolute content-stretch flex flex-col gap-[12px] h-[60.992px] items-start left-[25px] top-[101px] w-[344.664px]">
          <div className="h-[25.195px] relative shrink-0 w-full">
            <p className="absolute font-['Vazirmatn:Bold',sans-serif] font-bold leading-[25.2px] left-[345.11px] text-[18px] text-gray-900 text-nowrap text-right top-[-0.5px] translate-x-[-100%] whitespace-pre" dir="auto">
              امنیت بالا
            </p>
          </div>
          <div className="h-[23.797px] relative shrink-0 w-full">
            <p className="absolute font-['Vazirmatn:Medium',sans-serif] font-medium leading-[23.8px] left-[344.86px] text-[14px] text-gray-500 text-nowrap text-right top-[-0.5px] translate-x-[-100%] whitespace-pre" dir="auto">
              داده‌های شما با بالاترین استانداردهای امنیتی محافظت می‌شود
            </p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Article4() {
  return (
    <div className="bg-white h-[210.789px] relative rounded-[16px] shrink-0 w-[394.664px]" data-name="Article">
      <div className="h-[210.789px] overflow-clip relative rounded-[inherit] w-[394.664px]">
        <div className="absolute left-[313.66px] size-[80px] top-px">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 80 80">
            <g clipPath="url(#clip6)" id="Icon" opacity="0.25">
              <path d={svgPaths.p30db0400} fill="var(--fill-0, #4460F7)" id="Vector" />
            </g>
            <defs>
              <clipPath id="clip6">
                <rect fill="white" height="80" width="80" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="absolute bg-[rgba(68,96,247,0.08)] left-[313.66px] rounded-[16px] size-[56px] top-[25px]">
          <div aria-hidden="true" className="absolute border-2 border-[rgba(68,96,247,0.14)] border-solid inset-0 pointer-events-none rounded-[16px]" />
          <div className="absolute left-[14px] size-[28px] top-[14px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
              <g clipPath="url(#clip7)" id="Icon">
                <path d={svgPaths.p1fa66600} id="Vector" stroke="var(--stroke-0, #4460F7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.91667" />
                <path d={svgPaths.p190dabf0} id="Vector_2" stroke="var(--stroke-0, #4460F7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.91667" />
                <path d={svgPaths.p2a9abe70} id="Vector_3" stroke="var(--stroke-0, #4460F7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.91667" />
              </g>
              <defs>
                <clipPath id="clip7">
                  <rect fill="white" height="28" width="28" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
        <div className="absolute content-stretch flex flex-col gap-[12px] h-[84.789px] items-start left-[25px] top-[101px] w-[344.664px]">
          <div className="h-[25.195px] relative shrink-0 w-full">
            <p className="absolute font-['Vazirmatn:Bold',sans-serif] font-bold leading-[25.2px] left-[344.88px] text-[18px] text-gray-900 text-nowrap text-right top-[-0.5px] translate-x-[-100%] whitespace-pre" dir="auto">
              جمع‌آوری سرنخ
            </p>
          </div>
          <div className="h-[47.594px] relative shrink-0 w-full">
            <p className="absolute font-['Vazirmatn:Medium',sans-serif] font-medium leading-[23.8px] left-[345.29px] text-[14px] text-gray-500 text-right top-[-0.5px] translate-x-[-100%] w-[312px]" dir="auto">
              اطلاعات مشتریان بالقوه را به صورت هوشمند جمع‌آوری و مدیریت کنید
            </p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Article5() {
  return (
    <div className="bg-white h-[210.789px] relative rounded-[16px] shrink-0 w-[394.664px]" data-name="Article">
      <div className="h-[210.789px] overflow-clip relative rounded-[inherit] w-[394.664px]">
        <div className="absolute left-[313.66px] size-[80px] top-px">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 80 80">
            <g clipPath="url(#clip8)" id="Icon" opacity="0.25">
              <path d={svgPaths.p30db0400} fill="var(--fill-0, #B07CC6)" id="Vector" />
            </g>
            <defs>
              <clipPath id="clip8">
                <rect fill="white" height="80" width="80" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="absolute bg-[rgba(176,124,198,0.08)] left-[313.66px] rounded-[16px] size-[56px] top-[25px]">
          <div aria-hidden="true" className="absolute border-2 border-[rgba(176,124,198,0.14)] border-solid inset-0 pointer-events-none rounded-[16px]" />
          <div className="absolute left-[14px] size-[28px] top-[14px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
              <g id="Icon">
                <path d={svgPaths.pb26ca00} id="Vector" stroke="var(--stroke-0, #B07CC6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.91667" />
                <path d="M21 19.8333V10.5" id="Vector_2" stroke="var(--stroke-0, #B07CC6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.91667" />
                <path d="M15.1667 19.8333V5.83333" id="Vector_3" stroke="var(--stroke-0, #B07CC6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.91667" />
                <path d="M9.33333 19.8333V16.3333" id="Vector_4" stroke="var(--stroke-0, #B07CC6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.91667" />
              </g>
            </svg>
          </div>
        </div>
        <div className="absolute content-stretch flex flex-col gap-[12px] h-[84.789px] items-start left-[25px] top-[101px] w-[344.664px]">
          <div className="h-[25.195px] relative shrink-0 w-full">
            <p className="absolute font-['Vazirmatn:Bold',sans-serif] font-bold leading-[25.2px] left-[345.23px] text-[18px] text-gray-900 text-nowrap text-right top-[-0.5px] translate-x-[-100%] whitespace-pre" dir="auto">
              تحلیل و گزارش‌گیری
            </p>
          </div>
          <div className="h-[47.594px] relative shrink-0 w-full">
            <p className="absolute font-['Vazirmatn:Medium',sans-serif] font-medium leading-[23.8px] left-[345.46px] text-[14px] text-gray-500 text-right top-[-0.5px] translate-x-[-100%] w-[320px]" dir="auto">
              آمار کامل از گفت‌وگوها، رضایت مشتریان و عملکرد چت‌بات دریافت کنید
            </p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Cards() {
  return (
    <div className="content-start flex flex-wrap gap-[24px] items-start relative shrink-0 w-[814px]" data-name="Cards">
      <Article />
      <Article1 />
      <Article2 />
      <Article3 />
      <Article4 />
      <Article5 />
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex gap-[76px] items-center justify-end overflow-clip relative shrink-0 w-[1317px]" data-name="Container">
      <div className="absolute h-[567px] left-[-134px] top-[57px] w-[731px]">
        <PhoneAndCustomer1 />
      </div>
      <Cards />
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex flex-col gap-[75px] items-center overflow-clip relative shrink-0 w-full" data-name="Container">
      <Header />
      <Container16 />
      <Container41 />
    </div>
  );
}

function About() {
  return (
    <div className="relative shrink-0 w-full" data-name="About">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center p-[64px] relative w-full">
          <Container42 />
        </div>
      </div>
    </div>
  );
}

export default function Section2WithAnimation() {
  return (
    <div className="bg-[rgba(255,228,222,0.45)] content-stretch flex flex-col gap-[10px] items-center justify-center relative w-full" data-name="Section2">
      <Container />
      <About />
    </div>
  );
}
