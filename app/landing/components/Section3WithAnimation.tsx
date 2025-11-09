import { motion } from "motion/react";
import { useState, useEffect } from "react";
import svgPaths from "../svg/svg-2dmtneq5en";

// Background decorative icons
function Icon() {
  return (
    <div className="absolute left-[1063.7px] size-[64px] top-[226.71px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 64 64">
        <g id="Icon" opacity="0.25">
          <path d={svgPaths.paab5900} id="Vector" stroke="var(--stroke-0, #52D4A0)" strokeWidth="5.33333" />
          <path d={svgPaths.p23cebf00} id="Vector_2" stroke="var(--stroke-0, #52D4A0)" strokeWidth="5.33333" />
        </g>
      </svg>
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[100.23px] size-[56px] top-[737.52px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 56 56">
        <g id="Icon" opacity="0.25">
          <path d={svgPaths.p7152400} fill="var(--fill-0, #FFA18E)" id="Vector" opacity="0.524085" />
        </g>
      </svg>
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-[187.94px] size-[48px] top-[510.11px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Icon" opacity="0.3">
          <path d="M10 24H38" id="Vector" stroke="var(--stroke-0, #4460F7)" strokeWidth="4" />
          <path d="M24 10L38 24L24 38" id="Vector_2" stroke="var(--stroke-0, #4460F7)" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-[1062.64px] size-[40px] top-[866.88px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Icon" opacity="0.3">
          <path d={svgPaths.p19a01780} id="Vector" stroke="var(--stroke-0, #65BCB6)" strokeWidth="3.33333" />
          <path d={svgPaths.p24376300} id="Vector_2" stroke="var(--stroke-0, #65BCB6)" strokeWidth="3.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[978px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <Icon />
      <Icon1 />
      <Icon2 />
      <Icon3 />
    </div>
  );
}

// Header components
function Text() {
  return <div className="absolute bg-[#65bcb6] left-[101.62px] rounded-[4px] size-[8px] top-[19px]" data-name="Text" />;
}

function Text1() {
  return (
    <div className="absolute h-[24px] left-[21px] top-[11px] w-[72.617px]" data-name="Text">
      <p className="absolute font-['Vazirmatn:SemiBold',sans-serif] font-semibold leading-[24px] left-[36px] text-[#65bcb6] text-center text-nowrap top-[-0.5px] tracking-[-0.16px] translate-x-[-50%] whitespace-pre" dir="auto">
        فرآیند ساده
      </p>
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-[rgba(101,188,182,0.08)] h-[46px] relative rounded-[100px] shrink-0 w-[130.617px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(101,188,182,0.15)] border-solid inset-0 pointer-events-none rounded-[100px]" />
      <Text />
      <Text1 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[57.594px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Vazirmatn:ExtraBold',sans-serif] font-extrabold leading-[57.6px] left-[616.04px] text-center text-gray-900 top-[-1px] tracking-[-0.96px] translate-x-[-50%] w-[709px]" dir="auto">
        آیوا را در ۴ مرحله ساده راه‌اندازی کنید
      </p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex h-[28.797px] items-start relative shrink-0 w-[600px]" data-name="Paragraph">
      <p className="basis-0 font-['Vazirmatn:Regular',sans-serif] font-normal grow leading-[28.8px] min-h-px min-w-px relative shrink-0 text-center text-gray-600" dir="auto">
        از ثبت‌نام تا اولین گفت‌وگو، تنها چند دقیقه فاصله دارید
      </p>
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
      className="content-stretch flex flex-col gap-[24px] items-center justify-center relative shrink-0 w-[1232px]" 
      data-name="Header"
    >
      <Container1 />
      <Heading2 />
      <Paragraph />
    </motion.div>
  );
}

// Step 4 - راه‌اندازی
function Icon4() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p1668d400} id="Vector" stroke="var(--stroke-0, #B07CC6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.p18e93240} id="Vector_2" stroke="var(--stroke-0, #B07CC6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.p1987b500} id="Vector_3" stroke="var(--stroke-0, #B07CC6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.p86b7780} id="Vector_4" stroke="var(--stroke-0, #B07CC6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute bg-[rgba(101,188,182,0.1)] content-stretch flex items-center justify-center left-[88px] rounded-[16px] size-[64px] top-0" data-name="Container">
      <Icon4 />
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[18px] relative shrink-0 w-[6.922px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] relative w-[6.922px]">
        <p className="absolute font-['Vazirmatn:ExtraBold',sans-serif] font-extrabold leading-[18px] left-0 text-nowrap text-white top-[-0.5px] whitespace-pre">4</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute bg-gray-300 box-border content-stretch flex items-center justify-center left-[220px] rounded-[14px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.12)] size-[28px] top-[-8px]" data-name="Container">
      <Text2 />
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[64px] relative shrink-0 w-[240px]" data-name="Container">
      <Container2 />
      <Container3 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[240px]" data-name="Heading 3">
      <p className="absolute font-['Vazirmatn:Regular',sans-serif] font-normal leading-[24px] left-[120.09px] text-center text-gray-900 text-nowrap top-[-0.5px] translate-x-[-50%] whitespace-pre" dir="auto">
        راه‌اندازی
      </p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute h-[51.188px] left-0 top-[32px] w-[240px]" data-name="Paragraph">
      <p className="absolute font-['Vazirmatn:Regular',sans-serif] font-normal leading-[25.6px] left-[120.38px] text-center text-gray-500 top-[-1px] translate-x-[-50%] w-[228px]" dir="auto">
        چت‌بات را روی وب‌سایت یا اپلیکیشن خود نصب کنید
      </p>
    </div>
  );
}

function Text3() {
  return <div className="absolute bg-gray-400 left-[75.45px] rounded-[3px] size-[6px] top-[18px]" data-name="Text" />;
}

function Text4() {
  return (
    <div className="absolute h-[24px] left-[17px] top-[9px] w-[50.453px]" data-name="Text">
      <p className="absolute font-['Vazirmatn:Bold',sans-serif] font-bold leading-[24px] left-[25.5px] text-center text-gray-500 top-[-0.5px] tracking-[-0.16px] translate-x-[-50%] w-[51px]" dir="auto">
        ۲ دقیقه
      </p>
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute bg-gray-100 h-[42px] left-[70.77px] rounded-[100px] top-[99.19px] w-[98.453px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[100px]" />
      <Text3 />
      <Text4 />
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[141.188px] relative shrink-0 w-[240px]" data-name="Container">
      <Heading3 />
      <Paragraph1 />
      <Container5 />
    </div>
  );
}

function Container7({ isActive }: { isActive: boolean }) {
  return (
    <motion.div 
      className="h-[3px] rounded-bl-[24px] rounded-br-[24px] shrink-0 w-full transition-colors duration-500" 
      style={{
        backgroundColor: isActive ? '#B07CC6' : '#e5e7eb'
      }}
      data-name="Container" 
    />
  );
}

function Article({ isActive }: { isActive: boolean }) {
  return (
    <div 
      className={`basis-0 grow min-h-px min-w-px relative rounded-[24px] shrink-0 transition-all duration-500 ${
        isActive ? 'bg-white' : 'bg-neutral-50'
      }`}
      data-name="Article"
    >
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[28px] items-center pb-px pt-[32px] px-[16px] relative w-full">
          <Container4 />
          <Container6 />
          <Container7 isActive={isActive} />
        </div>
      </div>
      <div 
        aria-hidden="true" 
        className={`absolute border-solid inset-0 pointer-events-none rounded-[24px] transition-all duration-500 ${
          isActive 
            ? 'border-[2px] border-[#B07CC6] shadow-[0px_24px_48px_0px_rgba(0,0,0,0.12),0px_0px_0px_2px_#B07CC6]' 
            : 'border border-gray-200'
        }`}
      />
    </div>
  );
}

// Step 3 - شخصی‌سازی
function Icon5() {
  return (
    <div className="relative shrink-0 size-[29.4px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="Icon">
          <path d={svgPaths.p18226e00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.45" />
          <path d={svgPaths.p3b126880} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.45" />
        </g>
      </svg>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute bg-[#ffa18e] content-stretch flex items-center justify-center left-[86.4px] rounded-[16px] size-[67.2px] top-[-1.6px]" data-name="Container">
      <Icon5 />
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[18px] relative shrink-0 w-[6.922px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] relative w-[6.922px]">
        <p className="absolute font-['Vazirmatn:ExtraBold',sans-serif] font-extrabold leading-[18px] left-0 text-nowrap text-white top-[-0.5px] whitespace-pre">3</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute bg-[#ffa18e] box-border content-stretch flex items-center justify-center left-[220px] rounded-[14px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.2)] size-[28px] top-[-8px]" data-name="Container">
      <Text5 />
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[64px] relative shrink-0 w-[240px]" data-name="Container">
      <Container8 />
      <Container9 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[240px]" data-name="Heading 3">
      <p className="absolute font-['Vazirmatn:Regular',sans-serif] font-normal leading-[24px] left-[120.38px] text-[#ffa18e] text-center text-nowrap top-[-0.5px] translate-x-[-50%] whitespace-pre" dir="auto">
        شخصی‌سازی
      </p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute h-[51.188px] left-0 top-[32px] w-[240px]" data-name="Paragraph">
      <p className="absolute font-['Vazirmatn:Regular',sans-serif] font-normal leading-[25.6px] left-[120.35px] text-center text-gray-500 top-[-1px] translate-x-[-50%] w-[212px]" dir="auto">
        ظاهر و رفتار چت‌بات را مطابق برند خود تنظیم کنید
      </p>
    </div>
  );
}

function Text6() {
  return <div className="absolute bg-[#ffa18e] left-[76.52px] rounded-[3px] size-[6px] top-[18px]" data-name="Text" />;
}

function Text7() {
  return (
    <div className="absolute h-[24px] left-[17px] top-[9px] w-[51.516px]" data-name="Text">
      <p className="absolute font-['Vazirmatn:Bold',sans-serif] font-bold leading-[24px] left-[26px] text-[#ffa18e] text-center top-[-0.5px] tracking-[-0.16px] translate-x-[-50%] w-[52px]" dir="auto">
        ۵ دقیقه
      </p>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute bg-[rgba(101,188,182,0.1)] h-[42px] left-[70.24px] rounded-[100px] top-[99.19px] w-[99.516px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#ffa18e] border-solid inset-0 pointer-events-none rounded-[100px]" />
      <Text6 />
      <Text7 />
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[141.188px] relative shrink-0 w-[240px]" data-name="Container">
      <Heading4 />
      <Paragraph2 />
      <Container11 />
    </div>
  );
}

function Container13({ isActive }: { isActive: boolean }) {
  return (
    <motion.div 
      className="h-[3px] rounded-bl-[24px] rounded-br-[24px] shrink-0 w-full transition-colors duration-500" 
      style={{
        backgroundColor: isActive ? '#ffa18e' : '#e5e7eb'
      }}
      data-name="Container" 
    />
  );
}

function Article1({ isActive }: { isActive: boolean }) {
  return (
    <div 
      className={`basis-0 grow min-h-px min-w-px relative rounded-[24px] shrink-0 transition-all duration-500 ${
        isActive ? 'bg-white' : 'bg-neutral-50'
      }`}
      data-name="Article"
    >
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[28px] items-center pb-px pt-[32px] px-[16px] relative w-full">
          <Container10 />
          <Container12 />
          <Container13 isActive={isActive} />
        </div>
      </div>
      <div 
        aria-hidden="true" 
        className={`absolute border-solid inset-0 pointer-events-none rounded-[24px] transition-all duration-500 ${
          isActive 
            ? 'border-[2px] border-[#ffa18e] shadow-[0px_24px_48px_0px_rgba(0,0,0,0.12),0px_0px_0px_2px_#ffa18e]' 
            : 'border border-gray-200'
        }`}
      />
    </div>
  );
}

// Step 2 - آموزش
function Icon6() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d="M14 3.5V17.5" id="Vector" stroke="var(--stroke-0, #52D4A0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.p1264cb00} id="Vector_2" stroke="var(--stroke-0, #52D4A0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.p1e686c20} id="Vector_3" stroke="var(--stroke-0, #52D4A0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute bg-[rgba(101,188,182,0.15)] content-stretch flex items-center justify-center left-[88px] rounded-[16px] size-[64px] top-0" data-name="Container">
      <Icon6 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p3de7e600} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" />
        </g>
      </svg>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute bg-[#52d4a0] box-border content-stretch flex items-center justify-center left-[220px] rounded-[14px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.2)] size-[28px] top-[-8px]" data-name="Container">
      <Icon7 />
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[64px] relative shrink-0 w-[240px]" data-name="Container">
      <Container14 />
      <Container15 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[240px]" data-name="Heading 3">
      <p className="absolute font-['Vazirmatn:Regular',sans-serif] font-normal leading-[24px] left-[120.25px] text-center text-gray-900 text-nowrap top-[-0.5px] translate-x-[-50%] whitespace-pre" dir="auto">
        آموزش
      </p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="absolute h-[51.188px] left-0 top-[32px] w-[240px]" data-name="Paragraph">
      <p className="absolute font-['Vazirmatn:Regular',sans-serif] font-normal leading-[25.6px] left-[120.44px] text-center text-gray-500 top-[-1px] translate-x-[-50%] w-[238px]" dir="auto">
        منابع و اطلاعات کسب‌وکار خود را آپلود کنید
      </p>
    </div>
  );
}

function Text8() {
  return <div className="absolute bg-[#52d4a0] left-[75.45px] rounded-[3px] size-[6px] top-[18px]" data-name="Text" />;
}

function Text9() {
  return (
    <div className="absolute h-[24px] left-[17px] top-[9px] w-[50.453px]" data-name="Text">
      <p className="absolute font-['Vazirmatn:Bold',sans-serif] font-bold leading-[24px] left-[25.5px] text-[#52d4a0] text-center top-[-0.5px] tracking-[-0.16px] translate-x-[-50%] w-[51px]" dir="auto">
        ۲ دقیقه
      </p>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute bg-[rgba(101,188,182,0.05)] h-[42px] left-[70.77px] rounded-[100px] top-[99.19px] w-[98.453px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(101,188,182,0.2)] border-solid inset-0 pointer-events-none rounded-[100px]" />
      <Text8 />
      <Text9 />
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[141.188px] relative shrink-0 w-[240px]" data-name="Container">
      <Heading5 />
      <Paragraph3 />
      <Container17 />
    </div>
  );
}

function Container19({ isActive }: { isActive: boolean }) {
  return (
    <motion.div 
      className="h-[3px] rounded-bl-[24px] rounded-br-[24px] shrink-0 w-full transition-colors duration-500" 
      style={{
        backgroundColor: isActive ? '#52D4A0' : '#e5e7eb'
      }}
      data-name="Container" 
    />
  );
}

function Article2({ isActive }: { isActive: boolean }) {
  return (
    <div 
      className={`basis-0 grow h-[296px] min-h-px min-w-px relative rounded-[24px] shrink-0 transition-all duration-500 ${
        isActive ? 'bg-white' : 'bg-neutral-50'
      }`}
      data-name="Article"
    >
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[28px] h-[296px] items-center pb-px pt-[32px] px-[16px] relative w-full">
          <Container16 />
          <Container18 />
          <Container19 isActive={isActive} />
        </div>
      </div>
      <div 
        aria-hidden="true" 
        className={`absolute border-solid inset-0 pointer-events-none rounded-[24px] transition-all duration-500 ${
          isActive 
            ? 'border-[2px] border-[#52D4A0] shadow-[0px_24px_48px_0px_rgba(0,0,0,0.12),0px_0px_0px_2px_#52D4A0]' 
            : 'border border-gray-200'
        }`}
      />
    </div>
  );
}

// Step 1 - ثبت‌نام
function Icon8() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p184ba090} id="Vector" stroke="var(--stroke-0, #65BCB6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.p5d36b00} id="Vector_2" stroke="var(--stroke-0, #65BCB6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d="M22.1667 9.33333V16.3333" id="Vector_3" stroke="var(--stroke-0, #65BCB6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d="M25.6667 12.8333H18.6667" id="Vector_4" stroke="var(--stroke-0, #65BCB6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute bg-[rgba(101,188,182,0.15)] content-stretch flex items-center justify-center left-[88px] rounded-[16px] size-[64px] top-0" data-name="Container">
      <Icon8 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p3de7e600} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" />
        </g>
      </svg>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute bg-[#65bcb6] box-border content-stretch flex items-center justify-center left-[220px] rounded-[14px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.2)] size-[28px] top-[-8px]" data-name="Container">
      <Icon9 />
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[64px] relative shrink-0 w-[240px]" data-name="Container">
      <Container20 />
      <Container21 />
    </div>
  );
}

function Heading6() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[240px]" data-name="Heading 3">
      <p className="absolute font-['Vazirmatn:Regular',sans-serif] font-normal leading-[24px] left-[120.2px] text-center text-gray-900 text-nowrap top-[-0.5px] translate-x-[-50%] whitespace-pre" dir="auto">
        ثبت‌نام
      </p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="absolute h-[51.188px] left-0 top-[32px] w-[240px]" data-name="Paragraph">
      <p className="absolute font-['Vazirmatn:Regular',sans-serif] font-normal leading-[25.6px] left-[120.28px] text-center text-gray-500 top-[-1px] translate-x-[-50%] w-[213px]" dir="auto">
        حساب کاربری خود را در کمتر از ۳۰ ثانیه ایجاد کنید
      </p>
    </div>
  );
}

function Text10() {
  return <div className="absolute bg-[#65bcb6] left-[75.46px] rounded-[3px] size-[6px] top-[18px]" data-name="Text" />;
}

function Text11() {
  return (
    <div className="absolute h-[24px] left-[17px] top-[9px] w-[50.461px]" data-name="Text">
      <p className="absolute font-['Vazirmatn:Bold',sans-serif] font-bold leading-[24px] left-[25.5px] text-[#65bcb6] text-center top-[-0.5px] tracking-[-0.16px] translate-x-[-50%] w-[51px]" dir="auto">
        ۳۰ ثانیه
      </p>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute bg-[rgba(101,188,182,0.05)] h-[42px] left-[70.77px] rounded-[100px] top-[99.19px] w-[98.461px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(101,188,182,0.2)] border-solid inset-0 pointer-events-none rounded-[100px]" />
      <Text10 />
      <Text11 />
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[141.188px] relative shrink-0 w-[240px]" data-name="Container">
      <Heading6 />
      <Paragraph4 />
      <Container23 />
    </div>
  );
}

function Container25({ isActive }: { isActive: boolean }) {
  return (
    <motion.div 
      className="h-[3px] rounded-bl-[24px] rounded-br-[24px] shrink-0 w-full transition-colors duration-500" 
      style={{
        backgroundColor: isActive ? '#65BCB6' : '#e5e7eb'
      }}
      data-name="Container" 
    />
  );
}

function Article3({ isActive }: { isActive: boolean }) {
  return (
    <div 
      className={`basis-0 grow h-[296px] min-h-px min-w-px relative rounded-[24px] shrink-0 transition-all duration-500 ${
        isActive ? 'bg-white' : 'bg-neutral-50'
      }`}
      data-name="Article"
    >
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[28px] h-[296px] items-center pb-px pt-[32px] px-[20px] relative w-full">
          <Container22 />
          <Container24 />
          <Container25 isActive={isActive} />
        </div>
      </div>
      <div 
        aria-hidden="true" 
        className={`absolute border-solid inset-0 pointer-events-none rounded-[24px] transition-all duration-500 ${
          isActive 
            ? 'border-[2px] border-[#65BCB6] shadow-[0px_24px_48px_0px_rgba(0,0,0,0.12),0px_0px_0px_2px_#65BCB6]' 
            : 'border border-gray-200'
        }`}
      />
    </div>
  );
}

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1]
    } 
  }
};

function Container26({ activeStep }: { activeStep: number }) {
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
            delayChildren: 0.1
          }
        }
      }}
      className="content-stretch flex gap-[24px] items-center justify-center relative shrink-0 w-full" 
      data-name="Container"
    >
      <motion.div variants={cardVariants}>
        <Article isActive={activeStep === 3} />
      </motion.div>
      <motion.div variants={cardVariants}>
        <Article1 isActive={activeStep === 2} />
      </motion.div>
      <motion.div variants={cardVariants}>
        <Article2 isActive={activeStep === 1} />
      </motion.div>
      <motion.div variants={cardVariants}>
        <Article3 isActive={activeStep === 0} />
      </motion.div>
    </motion.div>
  );
}

// Timeline
function Container27() {
  return <div className="absolute bg-gray-200 h-[2px] right-0 rounded-[1px] top-0 w-[900px]" data-name="Container" />;
}

function Container28({ activeStep }: { activeStep: number }) {
  // ترتیب رنگ‌ها از راست به چپ: ثبت‌نام، آموزش، شخصی‌سازی، راه‌اندازی
  const progressColors = ['#65BCB6', '#52D4A0', '#ffa18e', '#B07CC6'];
  const progressWidths = [225, 450, 675, 900]; // موقعیت‌های هر مرحله (هر کارت 225px عرض دارد)
  
  return (
    <motion.div 
      className="absolute h-[2px] right-0 rounded-[1px] top-0"
      style={{
        backgroundColor: progressColors[activeStep],
        boxShadow: `0px 0px 12px 0px ${progressColors[activeStep]}66`
      }}
      animate={{
        width: progressWidths[activeStep]
      }}
      transition={{
        duration: 0.5,
        ease: "easeInOut"
      }}
      data-name="Container" 
    />
  );
}

function Container29({ activeStep }: { activeStep: number }) {
  return (
    <div className="h-[2px] relative shrink-0 w-[900px]" data-name="Container">
      <Container27 />
      <Container28 activeStep={activeStep} />
    </div>
  );
}

function Tab() {
  return (
    <div className="bg-gray-200 relative rounded-[6px] shrink-0 size-[12px]" data-name="Tab">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[12px]" />
    </div>
  );
}

function Tab1() {
  return (
    <div className="bg-[#ffa18e] h-[12px] relative rounded-[6px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.15)] shrink-0 w-[32px]" data-name="Tab">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[12px] w-[32px]" />
    </div>
  );
}

function TabList({ activeStep }: { activeStep: number }) {
  // ترتیب رنگ‌ها از راست به چپ: ثبت‌نام، آموزش، شخصی‌سازی، راه‌اندازی
  const tabColors = ['#65BCB6', '#52D4A0', '#ffa18e', '#B07CC6'];
  
  return (
    <div className="content-stretch flex gap-[12px] h-[12px] items-center justify-center relative shrink-0 w-[1232px]" data-name="Tab List">
      {[0, 1, 2, 3].map((index) => (
        <div 
          key={index}
          className={`relative rounded-[6px] shrink-0 transition-all duration-500 ${
            activeStep === index 
              ? 'w-[32px] h-[12px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.15)]' 
              : 'size-[12px] bg-gray-200'
          }`}
          style={{
            backgroundColor: activeStep === index ? tabColors[index] : undefined
          }}
          data-name="Tab"
        >
          <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-full" />
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
      className="content-stretch flex flex-col gap-[24px] items-center justify-center relative shrink-0 w-full" 
      data-name="liner"
    >
      <Container29 activeStep={activeStep} />
      <TabList activeStep={activeStep} />
    </motion.div>
  );
}

// Bottom CTA section
function Text12() {
  return (
    <div className="h-[24px] relative shrink-0 w-[68.602px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[68.602px]">
        <p className="absolute font-['Vazirmatn:Regular',sans-serif] font-normal leading-[24px] left-[34.5px] text-center text-gray-500 text-nowrap top-[-0.5px] translate-x-[-50%] whitespace-pre" dir="auto">
          زمان می‌برد
        </p>
      </div>
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[25px] relative shrink-0 w-[54.016px]" data-name="Text">
      <p className="absolute font-['Vazirmatn:ExtraBold',sans-serif] font-extrabold leading-[24px] left-[27.5px] text-[#65bcb6] text-center top-0 tracking-[-0.32px] translate-x-[-50%] w-[55px]" dir="auto">
        ۱۰ دقیقه
      </p>
    </div>
  );
}

function Container30() {
  return (
    <div className="h-[46px] relative rounded-[12px] shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[46px] items-center justify-center p-[8px] relative">
        <Text13 />
      </div>
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[24px] relative shrink-0 w-[129.078px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[129.078px]">
        <p className="absolute font-['Vazirmatn:Regular',sans-serif] font-normal leading-[24px] left-[52px] text-center text-gray-500 text-nowrap top-[-0.5px] translate-x-[-50%] whitespace-pre" dir="auto">
          کل فرآیند کمتر از
        </p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex gap-[12px] h-[46px] items-center relative shrink-0" data-name="Container">
      <Text12 />
      <Container30 />
      <Text14 />
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[28px] relative shrink-0 w-[85.656px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[28px] items-start relative w-[85.656px]">
        <p className="font-['Vazirmatn:Regular',sans-serif] font-normal leading-[28px] relative shrink-0 text-nowrap text-white whitespace-pre" dir="auto">
          شروع رایگان
        </p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#65bcb6] box-border content-stretch flex h-[60px] items-center justify-center overflow-clip relative rounded-[12px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 w-[133.656px]" data-name="Button">
      <Text15 />
    </div>
  );
}

function Container32() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
      className="relative shrink-0 w-full" 
      data-name="Container"
    >
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[32px] items-center justify-center px-[470px] py-0 relative w-full">
          <Container31 />
          <Button />
        </div>
      </div>
    </motion.div>
  );
}

function Container33() {
  const [activeStep, setActiveStep] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3000); // تغییر هر 3 ثانیه
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[58px] items-center justify-center left-0 p-[64px] top-[-0.37px] w-[1419px]" data-name="Container">
      <Header />
      <Container26 activeStep={activeStep} />
      <Liner activeStep={activeStep} />
      <Container32 />
    </div>
  );
}

function Process() {
  return (
    <div className="absolute bg-gradient-to-b from-[#ffffff] h-[956px] left-0 overflow-clip to-[#ffffff] top-[-0.37px] via-50% via-[#f9fafb] w-[1431px]" data-name="Process">
      <Container33 />
    </div>
  );
}

export default function Section3WithAnimation() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="content-stretch flex flex-col gap-[10px] items-start relative w-full" 
      data-name="Section3"
    >
      <Container />
      <Process />
    </motion.div>
  );
}
