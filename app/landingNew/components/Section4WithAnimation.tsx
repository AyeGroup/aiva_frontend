"use client";
import { motion } from "motion/react";
import svgPaths from "../svg/svg-sayy2jojyo";

function Icon() {
  return (
    <motion.div 
      className="absolute left-[114.48px] size-[64px] top-[273.4px]" 
      data-name="Icon"
      initial={{ opacity: 0, rotate: 0 }}
      animate={{ opacity: 0.25, rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 64 64">
        <g id="Icon">
          <path d={svgPaths.p398aad80} id="Vector" stroke="var(--stroke-0, #65BCB6)" strokeWidth="5.33333" />
          <path d={svgPaths.p353faf00} id="Vector_2" stroke="var(--stroke-0, #65BCB6)" strokeWidth="5.33333" />
          <path d={svgPaths.p30688b00} id="Vector_3" stroke="var(--stroke-0, #65BCB6)" strokeWidth="5.33333" />
        </g>
      </svg>
    </motion.div>
  );
}

function Icon1() {
  return (
    <motion.div 
      className="absolute left-[1231.91px] size-[56px] top-[1083.17px]" 
      data-name="Icon"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.3, scale: [0.8, 1.2, 0.8] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 56 56">
        <g id="Icon">
          <path d={svgPaths.p243372c0} id="Vector" stroke="var(--stroke-0, #FFA18E)" strokeWidth="4.66667" />
          <path d={svgPaths.p20d96b40} fill="var(--fill-0, #FFA18E)" id="Vector_2" opacity="0.904215" />
        </g>
      </svg>
    </motion.div>
  );
}

function Icon2() {
  return (
    <motion.div 
      className="absolute left-[71.55px] size-[256px] top-[80px]" 
      data-name="Icon"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 0.15, y: [0, -20, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 256 256">
        <g id="Icon">
          <path d={svgPaths.peb9ee00} id="Vector" opacity="0.488634" stroke="var(--stroke-0, #4460F7)" strokeWidth="2.56" />
          <path d={svgPaths.p23cf3300} id="Vector_2" opacity="0.676054" stroke="var(--stroke-0, #B07CC6)" strokeWidth="2.56" />
        </g>
      </svg>
    </motion.div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-[1047px] size-[384px] top-[1134.89px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 384 384">
        <g clipPath="url(#clip0_0_6379)" id="Icon" opacity="0.12">
          <g id="Vector"></g>
        </g>
        <defs>
          <clipPath id="clip0_0_6379">
            <rect fill="white" height="384" width="384" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Icon4() {
  return (
    <motion.div 
      className="absolute left-[1168.35px] size-[48px] top-[455.66px]" 
      data-name="Icon"
      initial={{ opacity: 0, rotate: 0 }}
      animate={{ opacity: 0.3, rotate: [0, 180, 360] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Icon">
          <path d={svgPaths.p2a07c3d0} fill="var(--fill-0, #FFA18E)" id="Vector" />
        </g>
      </svg>
    </motion.div>
  );
}

function Icon5() {
  return (
    <motion.div 
      className="absolute left-[286.19px] size-[40px] top-[1099.17px]" 
      data-name="Icon"
      initial={{ opacity: 0, rotate: 0 }}
      animate={{ opacity: 0.3, rotate: [0, -180, -360] }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Icon">
          <path d={svgPaths.p3c9a0100} fill="var(--fill-0, #52D4A0)" id="Vector" />
        </g>
      </svg>
    </motion.div>
  );
}

function Icon6() {
  return (
    <motion.div 
      className="absolute h-[1518.89px] left-0 top-0 w-[1431px]" 
      data-name="Icon"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.25 }}
      transition={{ duration: 1 }}
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1431 1519">
        <g clipPath="url(#clip0_0_6754)" id="Icon">
          <path d={svgPaths.p86d9ba0} id="Vector" stroke="var(--stroke-0, #B07CC6)" strokeWidth="2.74718" />
        </g>
        <defs>
          <clipPath id="clip0_0_6754">
            <rect fill="white" height="1518.89" width="1431" />
          </clipPath>
        </defs>
      </svg>
    </motion.div>
  );
}

function Container() {
  return (
    <div className="h-[1264px] overflow-clip relative shrink-0 w-[1431px]" data-name="Container">
      <Icon />
      <Icon1 />
      <Icon2 />
      <Icon3 />
      <Icon4 />
      <Icon5 />
      <Icon6 />
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[1252px] relative shrink-0 w-[1431px]" data-name="Container">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1431 1252">
        <g id="Container">
          <motion.g 
            id="Icon" 
            opacity="0.25"
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d={svgPaths.p296d4380} fill="var(--fill-0, white)" id="Vector" />
          </motion.g>
          <motion.g 
            id="Icon_2" 
            opacity="0.5"
            animate={{ 
              rotate: [0, 360]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            <path d={svgPaths.p3a24a440} id="Vector_2" stroke="var(--stroke-0, #F9DB8D)" strokeWidth="1.6" />
            <path d={svgPaths.p1042a380} id="Vector_3" stroke="var(--stroke-0, #F9DB8D)" strokeWidth="1.6" />
            <path d={svgPaths.p1f645500} id="Vector_4" stroke="var(--stroke-0, #F9DB8D)" strokeWidth="1.6" />
          </motion.g>
          <motion.g 
            id="Icon_3" 
            opacity="0.36"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.36, 0.5, 0.36]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d={svgPaths.p17d8bf00} id="Vector_5" stroke="var(--stroke-0, #F0E4E1)" strokeWidth="1.92" />
          </motion.g>
          <motion.g 
            clipPath="url(#clip0_0_6412)" 
            id="Icon_4" 
            opacity="0.25"
            animate={{ 
              x: [0, 10, 0]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M214.648 1191.89H414.648" id="Vector_6" stroke="var(--stroke-0, #65BCB6)" strokeDasharray="4 4" strokeWidth="2" />
          </motion.g>
          <motion.path 
            d={svgPaths.pbbf0d80} 
            fill="var(--fill-0, white)" 
            fillOpacity="0.5" 
            id="Vector_7"
            animate={{ 
              y: [0, -15, 0]
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path 
            d={svgPaths.p3641a020} 
            fill="var(--fill-0, white)" 
            fillOpacity="0.5" 
            id="Vector_8" 
            opacity="0.45"
            animate={{ 
              scale: [1, 1.08, 1]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path 
            d="M1362 569L1054 703.798" 
            id="Vector_9" 
            stroke="var(--stroke-0, #65BCB6)" 
            strokeDasharray="4 4" 
            strokeOpacity="0.18" 
            strokeWidth="10"
            animate={{ 
              strokeDashoffset: [0, 20, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </g>
        <defs>
          <clipPath id="clip0_0_6412">
            <rect fill="white" height="8" transform="translate(214.648 1190.89)" width="192" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[20px] relative shrink-0 w-[77.555px]" data-name="Text">
      <p className="absolute font-['Vazirmatn:Medium',sans-serif] font-medium leading-[20px] left-[39px] text-[#65bcb6] text-[14px] text-center text-nowrap top-0 translate-x-[-50%] whitespace-pre" dir="auto">
        صنایع مختلف
      </p>
    </div>
  );
}

function Container2() {
  return <div className="bg-[#65bcb6] h-[8px] rounded-[1.67772e+07px] shrink-0 w-full" data-name="Container" />;
}

function Container3() {
  return (
    <div className="bg-[#65bcb6] content-stretch flex flex-col items-start relative rounded-[1.67772e+07px] shrink-0 size-[8px]" data-name="Container">
      <Container2 />
    </div>
  );
}

function Container4() {
  return (
    <motion.div 
      className="bg-white box-border content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative rounded-[1.67772e+07px] shrink-0" 
      data-name="Container"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Text />
      <Container3 />
    </motion.div>
  );
}

function Heading2() {
  return (
    <motion.div 
      className="h-[57.594px] relative shrink-0 w-[1232px]" 
      data-name="Heading 2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
    >
      <p className="absolute font-['Vazirmatn:ExtraBold',sans-serif] font-extrabold leading-[57.6px] left-[616.27px] text-[48px] text-center text-nowrap text-white top-[-1px] tracking-[-0.96px] translate-x-[-50%] whitespace-pre" dir="auto">
        آیوا برای چه کسب‌وکارهایی مناسب است؟
      </p>
    </motion.div>
  );
}

function Paragraph() {
  return (
    <motion.div 
      className="content-stretch flex h-[28.797px] items-start relative shrink-0 w-[672px]" 
      data-name="Paragraph"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
    >
      <p className="basis-0 font-['Vazirmatn:Regular',sans-serif] font-normal grow leading-[28.8px] min-h-px min-w-px relative shrink-0 text-[18px] text-center text-gray-600" dir="auto">
        چت‌بات هوشمند برای صنایع مختلف با کاربردهای تخصصی
      </p>
    </motion.div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center justify-center relative shrink-0 w-[1232px]" data-name="Header">
      <Container4 />
      <Heading2 />
      <Paragraph />
    </div>
  );
}

function Tab() {
  return (
    <div className="h-[48px] relative rounded-[20px] shrink-0 w-[136.57px]" data-name="Tab">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[48px] relative w-[136.57px]">
        <p className="absolute font-['Vazirmatn:Medium',sans-serif] font-medium leading-[24px] left-[24px] text-[16px] text-gray-500 text-nowrap top-[11.5px] whitespace-pre" dir="auto">
          براساس کاربرد
        </p>
      </div>
    </div>
  );
}

function Tab1() {
  return (
    <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative rounded-[20px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)] shrink-0" data-name="Tab">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[48px] relative w-full">
        <p className="absolute font-['Vazirmatn:SemiBold',sans-serif] font-semibold leading-[24px] left-[24px] text-[16px] text-gray-900 text-nowrap top-[11.5px] whitespace-pre" dir="auto">
          براساس صنعت
        </p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <motion.div 
      className="absolute bg-gray-100 box-border content-stretch flex gap-[4px] h-[56px] items-start left-[468.98px] pb-0 pt-[4px] px-[4px] rounded-[24px] top-0 w-[294.047px]" 
      data-name="Container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Tab />
      <Tab1 />
    </motion.div>
  );
}

function Icon11() {
  return (
    <div className="absolute left-[1240px] size-[24px] top-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_0_6635)" id="Icon" opacity="0.3">
          <path d={svgPaths.p3f995c80} fill="var(--fill-0, #65BCB6)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_0_6635">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Icon12() {
  return (
    <div className="absolute left-[-32px] size-[24px] top-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_0_5992)" id="Icon" opacity="0.3">
          <path d={svgPaths.p3f995c80} fill="var(--fill-0, #00AA66)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_0_5992">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TabList() {
  return (
    <div className="h-[56px] relative shrink-0 w-[1232px]" data-name="Tab List">
      <Container5 />
      <Icon11 />
      <Icon12 />
    </div>
  );
}

// Industry Cards
function Article({ icon, title, description, color, delay }: { icon: React.ReactNode; title: string; description: string; color: string; delay: number }) {
  return (
    <motion.div 
      className="bg-white h-[203px] overflow-clip relative rounded-[16px] shrink-0 w-[293px]" 
      data-name="Article"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="absolute left-[229px] size-[64px] top-0" data-name="Icon">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 64 64">
          <g clipPath="url(#clip0_article)" id="Icon" opacity="0.05">
            <path d={svgPaths.p37ddc40} fill={`var(--fill-0, ${color})`} id="Vector" />
          </g>
          <defs>
            <clipPath id="clip0_article">
              <rect fill="white" height="64" width="64" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div className="absolute left-[213px] rounded-[16px] size-[56px] top-[24px]" data-name="Container">
        {icon}
      </div>
      <div className="absolute content-stretch flex flex-col gap-[8px] items-start left-[24px] top-[100px] w-[245px]" data-name="Container">
        <div className="h-[23.805px] relative shrink-0 w-full" data-name="Heading 3">
          <p className="absolute font-['Vazirmatn:SemiBold',sans-serif] font-semibold leading-[23.811px] text-[17.008px] text-gray-900 text-nowrap text-right top-[0.5px] whitespace-pre" dir="auto" style={{ right: '0' }}>
            {title}
          </p>
        </div>
        <div className="relative shrink-0 w-full" data-name="Paragraph">
          <p className="font-['Vazirmatn:Medium',sans-serif] font-medium leading-[23.8px] text-[14px] text-gray-600 text-right top-[-0.5px]" dir="auto">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function Icon14() {
  return (
    <div className="absolute left-[14px] size-[28px] top-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p25534680} id="Vector" stroke="var(--stroke-0, #EA580C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.p35741280} id="Vector_2" stroke="var(--stroke-0, #EA580C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.p149e4500} id="Vector_3" stroke="var(--stroke-0, #EA580C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d="M22.1667 5.83333L14 14" id="Vector_4" stroke="var(--stroke-0, #EA580C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Icon16() {
  return (
    <div className="absolute left-[14px] size-[28px] top-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p2685f600} id="Vector" stroke="var(--stroke-0, #52D4A0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.p2a4a9380} id="Vector_2" stroke="var(--stroke-0, #52D4A0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.p20f72960} id="Vector_3" stroke="var(--stroke-0, #52D4A0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Icon18() {
  return (
    <div className="absolute left-[14px] size-[28px] top-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p2d278480} id="Vector" stroke="var(--stroke-0, #DB2777)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d="M23.3333 2.33333V7" id="Vector_2" stroke="var(--stroke-0, #DB2777)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d="M25.6667 4.66667H21" id="Vector_3" stroke="var(--stroke-0, #DB2777)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.p1076900} id="Vector_4" stroke="var(--stroke-0, #DB2777)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Icon20() {
  return (
    <div className="absolute left-[14px] size-[28px] top-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p3d881300} id="Vector" stroke="var(--stroke-0, #E67E7E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.p8784800} id="Vector_2" stroke="var(--stroke-0, #E67E7E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d="M8.16667 24.5H19.8333" id="Vector_3" stroke="var(--stroke-0, #E67E7E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d="M14 3.5V24.5" id="Vector_4" stroke="var(--stroke-0, #E67E7E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.p31531f10} id="Vector_5" stroke="var(--stroke-0, #E67E7E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Icon22() {
  return (
    <div className="absolute left-[14px] size-[28px] top-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p618b200} id="Vector" stroke="var(--stroke-0, #0D9488)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.p383fc000} id="Vector_2" stroke="var(--stroke-0, #0D9488)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Icon24() {
  return (
    <div className="absolute left-[14px] size-[28px] top-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p27e9100} id="Vector" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d="M25.6667 11.6667V18.6667" id="Vector_2" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.pc2e7900} id="Vector_3" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Icon26() {
  return (
    <div className="absolute left-[14px] size-[28px] top-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p16ba480} id="Vector" stroke="var(--stroke-0, #6366F1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d="M2.33333 11.6667H25.6667" id="Vector_2" stroke="var(--stroke-0, #6366F1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Icon28() {
  return (
    <div className="absolute left-[14px] size-[28px] top-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p12cc5000} id="Vector" stroke="var(--stroke-0, #0891B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d="M17.5 21H10.5" id="Vector_2" stroke="var(--stroke-0, #0891B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.p3a5ba480} id="Vector_3" stroke="var(--stroke-0, #0891B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.pa689e00} id="Vector_4" stroke="var(--stroke-0, #0891B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.p26ea4300} id="Vector_5" stroke="var(--stroke-0, #0891B2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Icon30() {
  return (
    <div className="absolute left-[14px] size-[28px] top-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p1e4bec00} id="Vector" stroke="var(--stroke-0, #E11D48)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d="M14 9.33333V24.5" id="Vector_2" stroke="var(--stroke-0, #E11D48)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.p281fe780} id="Vector_3" stroke="var(--stroke-0, #E11D48)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.pfde8840} id="Vector_4" stroke="var(--stroke-0, #E11D48)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Icon32() {
  return (
    <div className="absolute left-[14px] size-[28px] top-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p1a3063b0} id="Vector" stroke="var(--stroke-0, #65A30D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.p309e840} id="Vector_2" stroke="var(--stroke-0, #65A30D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Icon34() {
  return (
    <div className="absolute left-[14px] size-[28px] top-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p11690d80} id="Vector" stroke="var(--stroke-0, #F59E0B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.p34f92680} id="Vector_2" stroke="var(--stroke-0, #F59E0B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Icon36() {
  return (
    <div className="absolute left-[14px] size-[28px] top-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p151d7c00} id="Vector" stroke="var(--stroke-0, #DC2626)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container66() {
  const industries = [
    {
      icon: <Icon14 />,
      title: "مواد غذایی/رستوران‌ها",
      description: "سفارش گیری سریع، پیشنهاد برای رژیم‌ها، پیگیری وضعیت سفارش",
      color: "#EA580C",
      delay: 0.4
    },
    {
      icon: <Icon16 />,
      title: "فروشگاه‌های آنلاین",
      description: "راهنمای خرید، وضعیت سفارش، سبد هوشمند، تحلیل مشتری برای افزایش فروش",
      color: "#52D4A0",
      delay: 0.45
    },
    {
      icon: <Icon18 />,
      title: "آرایش و بهداشت",
      description: "پیشنهاد محصول شخصی‌سازی‌شده، رسیدگی به سفارشات، توصیه مراقبت پوستی",
      color: "#DB2777",
      delay: 0.5
    },
    {
      icon: <Icon20 />,
      title: "خدمات حقوقی و مشاوره‌ای",
      description: "پاسخ هوشمند به سوالات، ارجاع به وکلای تخصصی، جمع‌آوری اطلاعات اولیه پرونده",
      color: "#E67E7E",
      delay: 0.55
    },
    {
      icon: <Icon22 />,
      title: "منابع انسانی و اداری",
      description: "پاسخ به سؤالات کارکنان، اعلام مرخصی، گزارش حضور، فرم‌های داخلی",
      color: "#0D9488",
      delay: 0.6
    },
    {
      icon: <Icon24 />,
      title: "آموزش و آموزشگاه‌ها",
      description: "راهنمای ثبت‌نام، آموزش هوشمند، حل تمرین، پاسخ به سؤالات درس، تدریس تعاملی",
      color: "#7C3AED",
      delay: 0.65
    },
    {
      icon: <Icon26 />,
      title: "خدمات مالی و بانکی",
      description: "توضیح مراحل دریافت وام، مشاوره افتتاح حساب، مشاوره امور مالی",
      color: "#6366F1",
      delay: 0.7
    },
    {
      icon: <Icon28 />,
      title: "حمل‌ونقل و لجستیک",
      description: "وضعیت مرسوله، اعلام زمان‌بندی تحویل، پاسخ به سوالات مشتری",
      color: "#0891B2",
      delay: 0.75
    },
    {
      icon: <Icon30 />,
      title: "حوزه‌های سرگرمی و محتوا",
      description: "بازی، آزمون، گفت‌وگوهای تعاملی، معرفی رویداد",
      color: "#E11D48",
      delay: 0.8
    },
    {
      icon: <Icon32 />,
      title: "بیمه و خدمات پس از فروش",
      description: "پاسخ به سوالات پوشش بیمه‌ای، ثبت خسارت، پیگیری وضعیت",
      color: "#65A30D",
      delay: 0.85
    },
    {
      icon: <Icon34 />,
      title: "املاک و مستغلات",
      description: "جستجوی ملک، فیلتر شرایط، هماهنگی بازدید",
      color: "#F59E0B",
      delay: 0.9
    },
    {
      icon: <Icon36 />,
      title: "سلامت و پزشکی",
      description: "غربالگری اولیه، پرسش علائم، زمان‌بندی و پیگیری نوبت",
      color: "#DC2626",
      delay: 0.95
    }
  ];

  return (
    <div className="absolute gap-[20px] grid grid-cols-[repeat(4,_minmax(0px,_1fr))] grid-rows-[repeat(3,_minmax(0px,_1fr))] h-[674px] left-0 overflow-clip top-[-0.39px] w-[1307px]" data-name="Container">
      {industries.map((industry, index) => (
        <Article 
          key={index}
          icon={industry.icon}
          title={industry.title}
          description={industry.description}
          color={industry.color}
          delay={industry.delay}
        />
      ))}
    </div>
  );
}

function TabPanel() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] h-[673.992px] items-center justify-center relative shrink-0 w-full" data-name="Tab Panel">
      <Container66 />
    </div>
  );
}

function Paragraph13() {
  return (
    <motion.div 
      className="h-[22.508px] relative shrink-0 w-[1232px]" 
      data-name="Paragraph"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.1 }}
    >
      <p className="absolute font-['Vazirmatn:Regular',sans-serif] font-normal leading-[22.512px] left-[616.61px] text-[15.008px] text-center text-gray-600 text-nowrap top-[-0.5px] translate-x-[-50%] whitespace-pre" dir="auto">
        صنعت شما در لیست نبود؟ آیوا برای هر کسب‌وکاری قابل تنظیم است.
      </p>
    </motion.div>
  );
}

function Icon37() {
  return (
    <div className="relative size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d="M3.75 9H14.25" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M9 3.75L14.25 9L9 14.25" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[24px] relative shrink-0 w-[85.578px]" data-name="Text">
      <p className="absolute font-['Vazirmatn:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-nowrap text-white top-[-0.5px] whitespace-pre" dir="auto">
        مشاوره رایگان
      </p>
    </div>
  );
}

function Button() {
  return (
    <motion.div 
      className="bg-[#65bcb6] box-border content-stretch flex gap-[12px] items-center overflow-clip px-[58px] py-[12px] relative rounded-[12px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 cursor-pointer" 
      data-name="Button"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1.2 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg]">
          <Icon37 />
        </div>
      </div>
      <Text1 />
    </motion.div>
  );
}

function Icon38() {
  return (
    <motion.div 
      className="absolute left-[592px] size-[48px] top-[-32px]" 
      data-name="Icon"
      initial={{ opacity: 0, rotate: 0 }}
      animate={{ opacity: 0.05, rotate: [0, 360] }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Icon">
          <path d={svgPaths.p2a07c3d0} fill="var(--fill-0, #65BCB6)" id="Vector" />
        </g>
      </svg>
    </motion.div>
  );
}

function Container67() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Paragraph13 />
      <Button />
      <Icon38 />
    </div>
  );
}

function Container68() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[59px] items-center justify-center left-0 p-[64px] top-0 w-[1431px]" data-name="Container">
      <Header />
      <TabList />
      <TabPanel />
      <Container67 />
    </div>
  );
}

function HowItWorks() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex flex-col from-[#65bcb6] gap-[10px] h-[1288px] items-start left-0 to-[#ecf5f4] top-[-0.37px]" data-name="HowItWorks">
      <Container1 />
      <Container68 />
    </div>
  );
}

export default function Section4WithAnimation() {
  return (
    <div className="bg-gradient-to-b content-stretch flex flex-col from-[#ffffff] gap-[10px] items-center relative w-full h-[1288px] to-[#ffffff] via-50% via-[#f9fafb]" data-name="Section">
      <Container />
      <HowItWorks />
    </div>
  );
}
