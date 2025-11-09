import { motion } from "motion/react";
import svgPaths from "../svg/svg-gcyltdwgwo";
import bgSvgPaths from "../svg/svg-kdb7ct6mks";

function BackgroundIcon() {
  return (
    <div className="absolute h-full left-0 top-0 w-full" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1431 1403">
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
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1431 192">
        <g id="Icon">
          <path d={bgSvgPaths.pbac4500} fill="var(--fill-0, #B07CC6)" id="Vector" opacity="0.5" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundContainer() {
  return (
    <div className="absolute inset-0 overflow-clip" data-name="Container" style={{
      background: 'linear-gradient(180deg, #F3F4F6 0%, #E9D5F5 50%, #C084D6 100%)'
    }}>
      <BackgroundIcon />
      <BackgroundWave />
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0" data-name="Text">
      <p className="font-['Vazirmatn:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#65bcb6] text-[14px] text-center text-nowrap whitespace-pre" dir="auto">
        ویژگی های آیوا
      </p>
    </div>
  );
}

function Container1() {
  return <div className="bg-[#65bcb6] rounded-[1.67772e+07px] shrink-0 size-[8px]" data-name="Container" />;
}

function Container2() {
  return (
    <div className="bg-[#65bcb6] content-stretch flex gap-[10px] items-center relative rounded-[1.67772e+07px] shrink-0" data-name="Container">
      <Container1 />
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative rounded-[1.67772e+07px] shrink-0" data-name="Container">
      <Text />
      <Container2 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[57.594px] relative shrink-0 w-[1232px]" data-name="Heading 2">
      <p className="absolute font-['Vazirmatn:ExtraBold',sans-serif] font-extrabold leading-[57.6px] left-[616.71px] text-[48px] text-center text-gray-900 text-nowrap top-[-1px] tracking-[-0.96px] translate-x-[-50%] whitespace-pre" dir="auto">
        پشتیبانی سریع‌تر، ارزان‌تر و بدون خستگی؛
      </p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex h-[28.797px] items-start relative shrink-0 w-[768px]" data-name="Paragraph">
      <p className="basis-0 font-['Vazirmatn:Regular',sans-serif] font-normal grow leading-[28.8px] min-h-px min-w-px relative shrink-0 text-[18px] text-center text-gray-600" dir="auto">
        پشتیبانی انسانی گران و خسته‌کننده است، اما بات آیوا همیشه آماده‌است.
      </p>
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
      <Container3 />
      <Heading2 />
      <Paragraph />
    </motion.div>
  );
}

// Row 1: پاسخ فوری vs تلفن روی انتظار
function Icon2() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p27520040} id="Vector" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-[rgba(16,185,129,0.1)] relative rounded-[16px] shrink-0 size-[64px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(16,185,129,0.15)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center p-[2px] relative size-[64px]">
        <Icon2 />
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Vazirmatn:Medium',sans-serif] font-medium leading-[30px] left-[452.13px] text-[22px] text-gray-900 text-nowrap text-right top-[-0.5px] translate-x-[-100%] whitespace-pre" dir="auto">
        پاسخ فوری
      </p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[26px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Vazirmatn:Medium',sans-serif] font-medium leading-[26px] left-[452.84px] text-[15.008px] text-gray-600 text-right top-[-1px] translate-x-[-100%] w-[219px]" dir="auto">
        چت‌بات در کمتر از ۳ ثانیه پاسخ میده
      </p>
    </div>
  );
}

function Container5() {
  return (
    <div className="basis-0 grow h-[64px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[64px] items-start relative w-full">
        <Heading3 />
        <Paragraph1 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex gap-[20px] h-[64px] items-start left-[34px] top-[46px] w-[536px]" data-name="Container">
      <Container4 />
      <Container5 />
    </div>
  );
}

function Text1() {
  return (
    <div className="basis-0 grow h-[18px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] relative w-full">
        <p className="absolute font-['Vazirmatn:SemiBold',sans-serif] font-semibold leading-[18px] left-0 text-[12px] text-nowrap text-white top-[-0.5px] whitespace-pre" dir="auto">
          راه‌حل
        </p>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p3de7e600} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute bg-emerald-500 box-border content-stretch flex gap-[6px] h-[26px] items-center left-[26px] px-[12px] py-0 rounded-[1.67772e+07px] shadow-[0px_2px_8px_0px_rgba(16,185,129,0.2)] top-[-8px] w-[72.547px]" data-name="Container">
      <Text1 />
      <Icon3 />
    </div>
  );
}

function Article() {
  return (
    <div className="[grid-area:1_/_1] bg-white relative rounded-[16px] shrink-0" data-name="Article">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(16,185,129,0.2)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]" />
      <Container6 />
      <Container7 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Vazirmatn:Medium',sans-serif] font-medium leading-[30px] left-[452.84px] text-[22px] text-gray-900 text-nowrap text-right top-[-0.5px] translate-x-[-100%] whitespace-pre" dir="auto">
        تلفن روی انتظار
      </p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[26px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Vazirmatn:Medium',sans-serif] font-medium leading-[26px] left-[452.02px] text-[15.008px] text-gray-600 text-nowrap text-right top-[-1px] translate-x-[-100%] whitespace-pre" dir="auto">
        مشتری ده دقیقه منتظر میمونه تا کسی جواب بده
      </p>
    </div>
  );
}

function Container8() {
  return (
    <div className="basis-0 grow h-[64px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[64px] items-start relative w-full">
        <Heading4 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p1efd0200} id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div className="bg-[rgba(239,68,68,0.1)] relative rounded-[16px] shrink-0 size-[64px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(239,68,68,0.15)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center p-[2px] relative size-[64px]">
        <Icon4 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex gap-[20px] h-[64px] items-start left-[34px] top-[46px] w-[536px]" data-name="Container">
      <Container8 />
      <Container9 />
    </div>
  );
}

function Text2() {
  return (
    <div className="basis-0 grow h-[18px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] relative w-full">
        <p className="absolute font-['Vazirmatn:SemiBold',sans-serif] font-semibold leading-[18px] left-0 text-[12px] text-nowrap text-white top-[-0.5px] whitespace-pre" dir="auto">
          مشکل
        </p>
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M10.5 3.5L3.5 10.5" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M3.5 3.5L10.5 10.5" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute bg-red-500 box-border content-stretch flex gap-[6px] h-[26px] items-center left-[503.11px] px-[12px] py-0 rounded-[1.67772e+07px] shadow-[0px_2px_8px_0px_rgba(239,68,68,0.2)] top-[-8px] w-[74.891px]" data-name="Container">
      <Text2 />
      <Icon5 />
    </div>
  );
}

function Article1() {
  return (
    <div className="[grid-area:1_/_2] bg-white relative rounded-[16px] shrink-0" data-name="Article">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(239,68,68,0.2)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]" />
      <Container10 />
      <Container11 />
    </div>
  );
}

function Container12() {
  return (
    <motion.div 
      className="gap-[24px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[144px] relative shrink-0 w-full" 
      data-name="Container"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Article />
      <Article1 />
    </motion.div>
  );
}

// Row 2: پاسخ یکنواخت و دقیق vs پاسخ متفاوت هر بار
function Icon6() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p2979bb00} id="Vector" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container13() {
  return (
    <div className="bg-[rgba(16,185,129,0.1)] relative rounded-[16px] shrink-0 size-[64px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(16,185,129,0.15)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center p-[2px] relative size-[64px]">
        <Icon6 />
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Vazirmatn:Medium',sans-serif] font-medium leading-[30px] left-[452.9px] text-[22px] text-gray-900 text-nowrap text-right top-[-0.5px] translate-x-[-100%] whitespace-pre" dir="auto">
        پاسخ یکنواخت و دقیق
      </p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[26px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Vazirmatn:Medium',sans-serif] font-medium leading-[26px] left-[452.59px] text-[15.008px] text-gray-600 text-nowrap text-right top-[-1px] translate-x-[-100%] whitespace-pre" dir="auto">
        همیشه همون اطلاعات صحیح، بدون تناقض
      </p>
    </div>
  );
}

function Container14() {
  return (
    <div className="basis-0 grow h-[64px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[64px] items-start relative w-full">
        <Heading5 />
        <Paragraph3 />
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute content-stretch flex gap-[20px] h-[64px] items-start left-[34px] top-[46px] w-[536px]" data-name="Container">
      <Container13 />
      <Container14 />
    </div>
  );
}

function Text3() {
  return (
    <div className="basis-0 grow h-[18px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] relative w-full">
        <p className="absolute font-['Vazirmatn:SemiBold',sans-serif] font-semibold leading-[18px] left-0 text-[12px] text-nowrap text-white top-[-0.5px] whitespace-pre" dir="auto">
          راه‌حل
        </p>
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p3de7e600} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute bg-emerald-500 box-border content-stretch flex gap-[6px] h-[26px] items-center left-[26px] px-[12px] py-0 rounded-[1.67772e+07px] shadow-[0px_2px_8px_0px_rgba(16,185,129,0.2)] top-[-8px] w-[72.547px]" data-name="Container">
      <Text3 />
      <Icon7 />
    </div>
  );
}

function Article2() {
  return (
    <div className="[grid-area:1_/_1] bg-white relative rounded-[16px] shrink-0" data-name="Article">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(16,185,129,0.2)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]" />
      <Container15 />
      <Container16 />
    </div>
  );
}

function Heading6() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Vazirmatn:Medium',sans-serif] font-medium leading-[30px] left-[452.84px] text-[22px] text-gray-900 text-nowrap text-right top-[-0.5px] translate-x-[-100%] whitespace-pre" dir="auto">
        پاسخ متفاوت هر بار
      </p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[26px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Vazirmatn:Medium',sans-serif] font-medium leading-[26px] left-[452.02px] text-[15.008px] text-gray-600 text-right top-[-1px] translate-x-[-100%] w-[297px]" dir="auto">
        هر پشتیبان یه جور جواب میده٬ مشتری گیج میشه
      </p>
    </div>
  );
}

function Container17() {
  return (
    <div className="basis-0 grow h-[64px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[64px] items-start relative w-full">
        <Heading6 />
        <Paragraph4 />
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p27a3200} id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p3c1b880} id="Vector_2" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p16bbf900} id="Vector_3" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p2ee517c0} id="Vector_4" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container18() {
  return (
    <div className="bg-[rgba(239,68,68,0.1)] relative rounded-[16px] shrink-0 size-[64px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(239,68,68,0.15)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center p-[2px] relative size-[64px]">
        <Icon8 />
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute content-stretch flex gap-[20px] h-[64px] items-start left-[34px] top-[46px] w-[536px]" data-name="Container">
      <Container17 />
      <Container18 />
    </div>
  );
}

function Text4() {
  return (
    <div className="basis-0 grow h-[18px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] relative w-full">
        <p className="absolute font-['Vazirmatn:SemiBold',sans-serif] font-semibold leading-[18px] left-0 text-[12px] text-nowrap text-white top-[-0.5px] whitespace-pre" dir="auto">
          مشکل
        </p>
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M10.5 3.5L3.5 10.5" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M3.5 3.5L10.5 10.5" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute bg-red-500 box-border content-stretch flex gap-[6px] h-[26px] items-center left-[503.11px] px-[12px] py-0 rounded-[1.67772e+07px] shadow-[0px_2px_8px_0px_rgba(239,68,68,0.2)] top-[-8px] w-[74.891px]" data-name="Container">
      <Text4 />
      <Icon9 />
    </div>
  );
}

function Article3() {
  return (
    <div className="[grid-area:1_/_2] bg-white relative rounded-[16px] shrink-0" data-name="Article">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(239,68,68,0.2)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]" />
      <Container19 />
      <Container20 />
    </div>
  );
}

function Container21() {
  return (
    <motion.div 
      className="gap-[24px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[144px] relative shrink-0 w-full" 
      data-name="Container"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Article2 />
      <Article3 />
    </motion.div>
  );
}

// Row 3: هزینه ثابت و کم vs هزینه بالای پرسنل
function Icon10() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.pa89ed00} id="Vector" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p20493380} id="Vector_2" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container22() {
  return (
    <div className="bg-[rgba(16,185,129,0.1)] relative rounded-[16px] shrink-0 size-[64px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(16,185,129,0.15)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center p-[2px] relative size-[64px]">
        <Icon10 />
      </div>
    </div>
  );
}

function Heading7() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Vazirmatn:Medium',sans-serif] font-medium leading-[30px] left-[452.44px] text-[22px] text-gray-900 text-nowrap text-right top-[-0.5px] translate-x-[-100%] whitespace-pre" dir="auto">
        هزینه ثابت و کم
      </p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[26px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Vazirmatn:Medium',sans-serif] font-medium leading-[26px] left-[452.28px] text-[15.008px] text-gray-600 text-nowrap text-right top-[-1px] translate-x-[-100%] whitespace-pre" dir="auto">
        پلان‌های آیوا از چند هزار تومان شروع می‌شن
      </p>
    </div>
  );
}

function Container23() {
  return (
    <div className="basis-0 grow h-[64px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[64px] items-start relative w-full">
        <Heading7 />
        <Paragraph5 />
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute content-stretch flex gap-[20px] h-[64px] items-start left-[34px] top-[46px] w-[536px]" data-name="Container">
      <Container22 />
      <Container23 />
    </div>
  );
}

function Text5() {
  return (
    <div className="basis-0 grow h-[18px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] relative w-full">
        <p className="absolute font-['Vazirmatn:SemiBold',sans-serif] font-semibold leading-[18px] left-0 text-[12px] text-nowrap text-white top-[-0.5px] whitespace-pre" dir="auto">
          راه‌حل
        </p>
      </div>
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p3de7e600} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute bg-emerald-500 box-border content-stretch flex gap-[6px] h-[26px] items-center left-[26px] px-[12px] py-0 rounded-[1.67772e+07px] shadow-[0px_2px_8px_0px_rgba(16,185,129,0.2)] top-[-8px] w-[72.547px]" data-name="Container">
      <Text5 />
      <Icon11 />
    </div>
  );
}

function Article4() {
  return (
    <div className="[grid-area:1_/_1] bg-white relative rounded-[16px] shrink-0" data-name="Article">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(16,185,129,0.2)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]" />
      <Container24 />
      <Container25 />
    </div>
  );
}

function Heading8() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Vazirmatn:Medium',sans-serif] font-medium leading-[30px] left-[452.21px] text-[22px] text-gray-900 text-nowrap text-right top-[-0.5px] translate-x-[-100%] whitespace-pre" dir="auto">
        هزینه بالای پرسنل
      </p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[26px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Vazirmatn:Medium',sans-serif] font-medium leading-[26px] left-[452.74px] text-[15.008px] text-gray-600 text-right top-[-1px] translate-x-[-100%] w-[298px]" dir="auto">
        حقوق پشتیبان از ۳ تا ۲ میلیون تومان شروع میشه
      </p>
    </div>
  );
}

function Container26() {
  return (
    <div className="basis-0 grow h-[64px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[64px] items-start relative w-full">
        <Heading8 />
        <Paragraph6 />
      </div>
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d="M16 2.66667V29.3333" id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p30e9cc00} id="Vector_2" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container27() {
  return (
    <div className="bg-[rgba(239,68,68,0.1)] relative rounded-[16px] shrink-0 size-[64px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(239,68,68,0.15)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center p-[2px] relative size-[64px]">
        <Icon12 />
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute content-stretch flex gap-[20px] h-[64px] items-start left-[34px] top-[46px] w-[536px]" data-name="Container">
      <Container26 />
      <Container27 />
    </div>
  );
}

function Text6() {
  return (
    <div className="basis-0 grow h-[18px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] relative w-full">
        <p className="absolute font-['Vazirmatn:SemiBold',sans-serif] font-semibold leading-[18px] left-0 text-[12px] text-nowrap text-white top-[-0.5px] whitespace-pre" dir="auto">
          مشکل
        </p>
      </div>
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M10.5 3.5L3.5 10.5" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M3.5 3.5L10.5 10.5" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute bg-red-500 box-border content-stretch flex gap-[6px] h-[26px] items-center left-[503.11px] px-[12px] py-0 rounded-[1.67772e+07px] shadow-[0px_2px_8px_0px_rgba(239,68,68,0.2)] top-[-8px] w-[74.891px]" data-name="Container">
      <Text6 />
      <Icon13 />
    </div>
  );
}

function Article5() {
  return (
    <div className="[grid-area:1_/_2] bg-white relative rounded-[16px] shrink-0" data-name="Article">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(239,68,68,0.2)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]" />
      <Container28 />
      <Container29 />
    </div>
  );
}

function Container30() {
  return (
    <motion.div 
      className="gap-[24px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[144px] relative shrink-0 w-full" 
      data-name="Container"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Article4 />
      <Article5 />
    </motion.div>
  );
}

// Row 4: بدون هزینه اضافی vs هزینه بالای بیمه و مالیات
function Icon14() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.pa89ed00} id="Vector" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p20493380} id="Vector_2" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container31() {
  return (
    <div className="bg-[rgba(16,185,129,0.1)] relative rounded-[16px] shrink-0 size-[64px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(16,185,129,0.15)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center p-[2px] relative size-[64px]">
        <Icon14 />
      </div>
    </div>
  );
}

function Heading9() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Vazirmatn:Medium',sans-serif] font-medium leading-[30px] left-[452.6px] text-[22px] text-gray-900 text-nowrap text-right top-[-0.5px] translate-x-[-100%] whitespace-pre" dir="auto">
        بدون هزینه اضافی
      </p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[26px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Vazirmatn:Medium',sans-serif] font-medium leading-[26px] left-[452.3px] text-[15.008px] text-gray-600 text-nowrap text-right top-[-1px] translate-x-[-100%] whitespace-pre" dir="auto">
        این هزینه‌ها با پلن‌های آیوا قابل مقایسه نیست
      </p>
    </div>
  );
}

function Container32() {
  return (
    <div className="basis-0 grow h-[64px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[64px] items-start relative w-full">
        <Heading9 />
        <Paragraph7 />
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute content-stretch flex gap-[20px] h-[64px] items-start left-[34px] top-[46px] w-[536px]" data-name="Container">
      <Container31 />
      <Container32 />
    </div>
  );
}

function Text7() {
  return (
    <div className="basis-0 grow h-[18px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] relative w-full">
        <p className="absolute font-['Vazirmatn:SemiBold',sans-serif] font-semibold leading-[18px] left-0 text-[12px] text-nowrap text-white top-[-0.5px] whitespace-pre" dir="auto">
          راه‌حل
        </p>
      </div>
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p3de7e600} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute bg-emerald-500 box-border content-stretch flex gap-[6px] h-[26px] items-center left-[26px] px-[12px] py-0 rounded-[1.67772e+07px] shadow-[0px_2px_8px_0px_rgba(16,185,129,0.2)] top-[-8px] w-[72.547px]" data-name="Container">
      <Text7 />
      <Icon15 />
    </div>
  );
}

function Article6() {
  return (
    <div className="[grid-area:1_/_1] bg-white relative rounded-[16px] shrink-0" data-name="Article">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(16,185,129,0.2)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]" />
      <Container33 />
      <Container34 />
    </div>
  );
}

function Heading10() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Vazirmatn:Medium',sans-serif] font-medium leading-[30px] left-[452.73px] text-[22px] text-gray-900 text-nowrap text-right top-[-0.5px] translate-x-[-100%] whitespace-pre" dir="auto">
        هزینه بالای بیمه و مالیات
      </p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[26px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Vazirmatn:Medium',sans-serif] font-medium leading-[26px] left-[452.94px] text-[15.008px] text-gray-600 text-nowrap text-right top-[-1px] translate-x-[-100%] whitespace-pre" dir="auto">
        بیمه و مالیات نیروی انسانی هزینه‌های پنهان قابل‌توجهی ایجاد می‌کنه
      </p>
    </div>
  );
}

function Container35() {
  return (
    <div className="basis-0 grow h-[64px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[64px] items-start relative w-full">
        <Heading10 />
        <Paragraph8 />
      </div>
    </div>
  );
}

function Icon16() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p37a10d80} id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p29027680} id="Vector_2" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M16 23.3333V8.66667" id="Vector_3" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container36() {
  return (
    <div className="bg-[rgba(239,68,68,0.1)] relative rounded-[16px] shrink-0 size-[64px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(239,68,68,0.15)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center p-[2px] relative size-[64px]">
        <Icon16 />
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute content-stretch flex gap-[20px] h-[64px] items-start left-[34px] top-[46px] w-[536px]" data-name="Container">
      <Container35 />
      <Container36 />
    </div>
  );
}

function Text8() {
  return (
    <div className="basis-0 grow h-[18px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] relative w-full">
        <p className="absolute font-['Vazirmatn:SemiBold',sans-serif] font-semibold leading-[18px] left-0 text-[12px] text-nowrap text-white top-[-0.5px] whitespace-pre" dir="auto">
          مشکل
        </p>
      </div>
    </div>
  );
}

function Icon17() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M10.5 3.5L3.5 10.5" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M3.5 3.5L10.5 10.5" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container38() {
  return (
    <div className="absolute bg-red-500 box-border content-stretch flex gap-[6px] h-[26px] items-center left-[503.11px] px-[12px] py-0 rounded-[1.67772e+07px] shadow-[0px_2px_8px_0px_rgba(239,68,68,0.2)] top-[-8px] w-[74.891px]" data-name="Container">
      <Text8 />
      <Icon17 />
    </div>
  );
}

function Article7() {
  return (
    <div className="[grid-area:1_/_2] bg-white relative rounded-[16px] shrink-0" data-name="Article">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(239,68,68,0.2)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]" />
      <Container37 />
      <Container38 />
    </div>
  );
}

function Container39() {
  return (
    <motion.div 
      className="gap-[24px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[144px] relative shrink-0 w-full" 
      data-name="Container"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Article6 />
      <Article7 />
    </motion.div>
  );
}

// Row 5: همیشه آماده vs خستگی و استرس
function Icon18() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d="M16 8V16L21.3333 18.6667" id="Vector" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p1dee4500} id="Vector_2" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container40() {
  return (
    <div className="bg-[rgba(16,185,129,0.1)] relative rounded-[16px] shrink-0 size-[64px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(16,185,129,0.15)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center p-[2px] relative size-[64px]">
        <Icon18 />
      </div>
    </div>
  );
}

function Heading11() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Vazirmatn:Medium',sans-serif] font-medium leading-[30px] left-[452.7px] text-[22px] text-gray-900 text-nowrap text-right top-[-0.5px] translate-x-[-100%] whitespace-pre" dir="auto">
        همیشه آماده
      </p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[26px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Vazirmatn:Medium',sans-serif] font-medium leading-[26px] left-[452.88px] text-[15.008px] text-gray-600 text-right top-[-1px] translate-x-[-100%] w-[240px]" dir="auto">
        چت‌بات ۲۴/۷ با همون انرژی پاسخ می‌ده
      </p>
    </div>
  );
}

function Container41() {
  return (
    <div className="basis-0 grow h-[64px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[64px] items-start relative w-full">
        <Heading11 />
        <Paragraph9 />
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="absolute content-stretch flex gap-[20px] h-[64px] items-start left-[34px] top-[46px] w-[536px]" data-name="Container">
      <Container40 />
      <Container41 />
    </div>
  );
}

function Text9() {
  return (
    <div className="basis-0 grow h-[18px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] relative w-full">
        <p className="absolute font-['Vazirmatn:SemiBold',sans-serif] font-semibold leading-[18px] left-0 text-[12px] text-nowrap text-white top-[-0.5px] whitespace-pre" dir="auto">
          راه‌حل
        </p>
      </div>
    </div>
  );
}

function Icon19() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p3de7e600} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container43() {
  return (
    <div className="absolute bg-emerald-500 box-border content-stretch flex gap-[6px] h-[26px] items-center left-[26px] px-[12px] py-0 rounded-[1.67772e+07px] shadow-[0px_2px_8px_0px_rgba(16,185,129,0.2)] top-[-8px] w-[72.547px]" data-name="Container">
      <Text9 />
      <Icon19 />
    </div>
  );
}

function Article8() {
  return (
    <div className="[grid-area:1_/_1] bg-white relative rounded-[16px] shrink-0" data-name="Article">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(16,185,129,0.2)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]" />
      <Container42 />
      <Container43 />
    </div>
  );
}

function Heading12() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Vazirmatn:Medium',sans-serif] font-medium leading-[30px] left-[452.17px] text-[22px] text-gray-900 text-nowrap text-right top-[-0.5px] translate-x-[-100%] whitespace-pre" dir="auto">
        خستگی و استرس
      </p>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="h-[26px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Vazirmatn:Medium',sans-serif] font-medium leading-[26px] left-[452.96px] text-[15.008px] text-gray-600 text-nowrap text-right top-[-1px] translate-x-[-100%] whitespace-pre" dir="auto">
        پشتیبان انسانی بعد از ساعت‌ها پاسخگویی خسته میشه
      </p>
    </div>
  );
}

function Container44() {
  return (
    <div className="basis-0 grow h-[64px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[64px] items-start relative w-full">
        <Heading12 />
        <Paragraph10 />
      </div>
    </div>
  );
}

function Icon20() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p27a3200} id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p2ee517c0} id="Vector_2" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p2f67b7f0} id="Vector_3" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p2b361400} id="Vector_4" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container45() {
  return (
    <div className="bg-[rgba(239,68,68,0.1)] relative rounded-[16px] shrink-0 size-[64px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(239,68,68,0.15)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center p-[2px] relative size-[64px]">
        <Icon20 />
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="absolute content-stretch flex gap-[20px] h-[64px] items-start left-[34px] top-[46px] w-[536px]" data-name="Container">
      <Container44 />
      <Container45 />
    </div>
  );
}

function Text10() {
  return (
    <div className="basis-0 grow h-[18px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] relative w-full">
        <p className="absolute font-['Vazirmatn:SemiBold',sans-serif] font-semibold leading-[18px] left-0 text-[12px] text-nowrap text-white top-[-0.5px] whitespace-pre" dir="auto">
          مشکل
        </p>
      </div>
    </div>
  );
}

function Icon21() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M10.5 3.5L3.5 10.5" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M3.5 3.5L10.5 10.5" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container47() {
  return (
    <div className="absolute bg-red-500 box-border content-stretch flex gap-[6px] h-[26px] items-center left-[503.11px] px-[12px] py-0 rounded-[1.67772e+07px] shadow-[0px_2px_8px_0px_rgba(239,68,68,0.2)] top-[-8px] w-[74.891px]" data-name="Container">
      <Text10 />
      <Icon21 />
    </div>
  );
}

function Article9() {
  return (
    <div className="[grid-area:1_/_2] bg-white relative rounded-[16px] shrink-0" data-name="Article">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(239,68,68,0.2)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]" />
      <Container46 />
      <Container47 />
    </div>
  );
}

function Container48() {
  return (
    <motion.div 
      className="gap-[24px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[144px] relative shrink-0 w-full" 
      data-name="Container"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <Article8 />
      <Article9 />
    </motion.div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] h-[848px] items-start relative shrink-0 w-full" data-name="Container">
      <Container12 />
      <Container21 />
      <Container30 />
      <Container39 />
      <Container48 />
    </div>
  );
}

function BoldText() {
  return (
    <div className="absolute content-stretch flex h-[25px] items-start left-[373.98px] top-[0.5px] w-[32.297px]" data-name="Bold Text">
      <p className="font-['Vazirmatn:Bold',sans-serif] font-bold leading-[26px] relative shrink-0 text-[16px] text-gray-900 text-nowrap text-right whitespace-pre" dir="auto">
        نکته:
      </p>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="h-[26px] relative shrink-0 w-full" data-name="Paragraph">
      <BoldText />
      <p className="absolute font-['Vazirmatn:Medium',sans-serif] font-medium leading-[26px] left-[374px] text-[16px] text-gray-900 text-nowrap text-right top-[-0.5px] translate-x-[-100%] whitespace-pre" dir="auto">
        با آیوا، تیم پشتیبانی شما روی مشکلات پیچیده تمرکز می‌کنه
      </p>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="h-[26px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Vazirmatn:Medium',sans-serif] font-medium leading-[26px] left-[406.91px] text-[14px] text-gray-600 text-nowrap text-right top-0 translate-x-[-100%] whitespace-pre" dir="auto">
        و کارهای تکراری رو به چت‌بات هوشمند واگذار می‌کنید
      </p>
    </div>
  );
}

function Container50() {
  return (
    <div className="basis-0 grow h-[56px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[56px] items-start relative w-full">
        <Paragraph11 />
        <Paragraph12 />
      </div>
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[30px] relative shrink-0 w-[20px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[30px] relative w-[20px]">
        <p className="absolute font-['Vazirmatn:Regular',sans-serif] font-normal leading-[30px] left-[20px] text-[20px] text-gray-900 text-nowrap text-right top-[-0.5px] translate-x-[-100%] whitespace-pre">💡</p>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="bg-[rgba(101,188,182,0.1)] relative rounded-[24px] shrink-0 size-[40px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(101,188,182,0.2)] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center p-px relative size-[40px]">
        <Text11 />
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="content-stretch flex gap-[12px] h-[56px] items-start relative shrink-0 w-full" data-name="Container">
      <Container50 />
      <Container51 />
    </div>
  );
}

function Container53() {
  return (
    <motion.div 
      className="bg-white box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[32px] py-[28px] relative rounded-[16px] shrink-0 w-[526.273px]" 
      data-name="Container"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <div aria-hidden="true" className="absolute border-2 border-[rgba(101,188,182,0.2)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]" />
      <Container52 />
    </motion.div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-center relative shrink-0 w-full">
      <Container49 />
      <Container53 />
    </div>
  );
}

function Container54() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-center justify-center relative shrink-0 w-full" data-name="Container">
      <Header />
      <Frame4 />
    </div>
  );
}

function Comparison() {
  return (
    <div className="relative box-border content-stretch flex flex-col items-center justify-center overflow-clip p-[64px] w-full z-10" data-name="Comparison">
      <Container54 />
    </div>
  );
}

export default function Section6WithAnimation() {
  return (
    <div className="relative w-full min-h-[1402px]" data-name="Section">
      <BackgroundContainer />
      <Comparison />
    </div>
  );
}
