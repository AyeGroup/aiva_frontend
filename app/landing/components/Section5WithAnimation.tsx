"use client";
import { motion } from "motion/react";
import { useState } from "react";
import svgPaths from "../svg/svg-4hsgpptxrd";
import navSvgPaths from "../svg/svg-9zbz1ttp0b";
import imgImage from "@/public/images/man.png";

function Icon() {
  return (
    <motion.div 
      className="absolute left-[1260.52px] size-[56px] top-[160.44px]" 
      data-name="Icon"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.3, scale: [0.8, 1.1, 0.8] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 56 56">
        <g id="Icon" opacity="0.3">
          <path d={svgPaths.p3a25ed00} fill="var(--fill-0, #FFA18E)" id="Vector" opacity="0.395785" />
        </g>
      </svg>
    </motion.div>
  );
}

function Icon1() {
  return (
    <motion.div 
      className="absolute left-[143.09px] size-[48px] top-[700.75px]" 
      data-name="Icon"
      initial={{ opacity: 0, rotate: 0 }}
      animate={{ opacity: 0.3, rotate: [0, 360] }}
      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Icon" opacity="0.3">
          <path d={svgPaths.p5b7a40} fill="var(--fill-0, #52D4A0)" id="Vector" opacity="0.530523" />
        </g>
      </svg>
    </motion.div>
  );
}

function Icon2() {
  return (
    <motion.div 
      className="absolute h-[256px] left-0 top-0 w-[1431px]" 
      data-name="Icon"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.25 }}
      transition={{ duration: 1 }}
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1431 256">
        <g clipPath="url(#clip0_0_6310)" id="Icon" opacity="0.25">
          <path d={svgPaths.p3f133b80} id="Vector" stroke="var(--stroke-0, #FFA18E)" strokeWidth="2.47095" />
        </g>
        <defs>
          <clipPath id="clip0_0_6310">
            <rect fill="white" height="256" width="1431" />
          </clipPath>
        </defs>
      </svg>
    </motion.div>
  );
}

function Icon3() {
  return (
    <motion.div 
      className="absolute left-[114.48px] size-[80px] top-[80px]" 
      data-name="Icon"
      initial={{ opacity: 0, rotate: 0 }}
      animate={{ opacity: 0.25, rotate: [0, 360] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 80 80">
        <g id="Icon" opacity="0.25">
          <path d={svgPaths.p2138fe00} id="Vector" stroke="var(--stroke-0, #65BCB6)" strokeWidth="2.4" />
        </g>
      </svg>
    </motion.div>
  );
}

function Icon4() {
  return (
    <motion.div 
      className="absolute left-[1195.28px] size-[64px] top-[877.64px]" 
      data-name="Icon"
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 0.25, y: [0, -10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 64 64">
        <g id="Icon" opacity="0.25">
          <path d={svgPaths.p3027dc00} fill="var(--fill-0, #FFA18E)" id="Vector" />
        </g>
      </svg>
    </motion.div>
  );
}

function Icon5() {
  return (
    <motion.div 
      className="absolute left-[71.55px] size-[56px] top-[534.82px]" 
      data-name="Icon"
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 0.25, scale: [1, 1.15, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 56 56">
        <g id="Icon" opacity="0.25">
          <path d={svgPaths.p3a95a700} id="Vector" stroke="var(--stroke-0, #65BCB6)" strokeWidth="1.12" />
        </g>
      </svg>
    </motion.div>
  );
}

function Icon6() {
  return (
    <div className="absolute h-[1069.64px] left-0 top-0 w-[1431px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1431 1070">
        <g clipPath="url(#clip0_0_6844)" id="Icon" opacity="0.12">
          <g id="Vector"></g>
        </g>
        <defs>
          <clipPath id="clip0_0_6844">
            <rect fill="white" height="1069.64" width="1431" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Icon7() {
  return (
    <div className="absolute h-[192px] left-0 top-[877.64px] w-[1431px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1431 192">
        <g clipPath="url(#clip0_0_6884)" id="Icon" opacity="0.15">
          <g id="Vector"></g>
        </g>
        <defs>
          <clipPath id="clip0_0_6884">
            <rect fill="white" height="192" width="1431" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute h-[1069.64px] left-0 overflow-clip top-0 w-[1431px]" data-name="Container">
      <Icon />
      <Icon1 />
      <Icon2 />
      <Icon3 />
      <Icon4 />
      <Icon5 />
      <Icon6 />
      <Icon7 />
    </div>
  );
}

function Text() {
  return (
    <div className="absolute h-[20px] left-[16px] top-[8px] w-[112.797px]" data-name="Text">
      <p className="absolute font-['Vazirmatn:Medium',sans-serif] font-medium leading-[20px] left-[56.5px] text-[#65bcb6] text-[14px] text-center text-nowrap top-0 translate-x-[-50%] whitespace-pre" dir="auto">
        داستان‌های موفقیت
      </p>
    </div>
  );
}

function Container1() {
  return <div className="bg-[#65bcb6] h-[8px] rounded-[1.67772e+07px] shrink-0 w-full" data-name="Container" />;
}

function Container2() {
  return (
    <div className="absolute bg-[#65bcb6] content-stretch flex flex-col items-start left-[136.8px] rounded-[1.67772e+07px] size-[8px] top-[14px]" data-name="Container">
      <Container1 />
    </div>
  );
}

function Container3() {
  return (
    <motion.div 
      className="bg-[#e3f4f1] h-[36px] relative rounded-[1.67772e+07px] shrink-0 w-[160.797px]" 
      data-name="Container"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Text />
      <Container2 />
    </motion.div>
  );
}

function Heading2() {
  return (
    <motion.div 
      className="h-[57.594px] relative shrink-0 w-full" 
      data-name="Heading 2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
    >
      <p className="absolute font-['Vazirmatn:ExtraBold',sans-serif] font-extrabold leading-[57.6px] left-[615.84px] text-[48px] text-center text-gray-900 text-nowrap top-[-1px] tracking-[-0.96px] translate-x-[-50%] whitespace-pre" dir="auto">
        کسب‌وکارهایی که با آیوا اتوماسیون و رشد را تجربه کردند
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
        نتایج واقعی از برندهای مختلف
      </p>
    </motion.div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center justify-center relative shrink-0 w-[1250px]" data-name="Header">
      <Container3 />
      <Heading2 />
      <Paragraph />
    </div>
  );
}

// Tab Components for Navigation
function TabAmazon({ isActive, onClick }: { isActive?: boolean; onClick?: () => void }) {
  if (isActive) {
    return (
      <motion.div 
        className="h-[48px] relative shrink-0 cursor-pointer w-[119.29px]"
        data-name="Tab"
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute bg-[#65bcb6] content-stretch flex items-center justify-center left-[71.29px] rounded-[1.67772e+07px] size-[48px] top-0">
          <svg className="size-[28px]" fill="none" viewBox="0 0 28 28">
            <path d={navSvgPaths.p3d33f9c0} stroke="white" strokeLinecap="round" strokeWidth="2.91667" />
            <path d="M23.3333 21L25.6667 22.75" stroke="white" strokeLinecap="round" strokeWidth="2.33333" />
          </svg>
        </div>
        <div className="absolute h-[22.5px] left-0 top-[12.75px]">
          <p className="font-['Vazirmatn:SemiBold',sans-serif] font-semibold leading-[22.5px] text-[15px] text-gray-800 text-nowrap">Amazon</p>
        </div>
        <motion.div 
          className="absolute bg-[#65bcb6] h-[2px] left-0 rounded-[1.67772e+07px] top-[54px] w-[119.29px]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: 'left' }}
        />
      </motion.div>
    );
  }
  
  return (
    <motion.div 
      className="content-stretch flex gap-[12px] h-[48px] items-center opacity-40 relative shrink-0 cursor-pointer"
      data-name="Tab"
      onClick={onClick}
      whileHover={{ scale: 1.05, opacity: 1 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 0.4, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="basis-0 grow h-[22.5px] min-h-px min-w-px relative shrink-0">
        <p className="font-['Vazirmatn:SemiBold',sans-serif] font-semibold leading-[22.5px] text-[15px] text-gray-800 text-nowrap">Amazon</p>
      </div>
      <div className="bg-gray-100 relative rounded-[1.67772e+07px] shrink-0 size-[48px]">
        <div className="content-stretch flex items-center justify-center relative size-[48px]">
          <svg className="size-[28px]" fill="none" viewBox="0 0 28 28">
            <path d={navSvgPaths.p3d33f9c0} stroke="#65BCB6" strokeLinecap="round" strokeWidth="2.91667" />
            <path d="M23.3333 21L25.6667 22.75" stroke="#65BCB6" strokeLinecap="round" strokeWidth="2.33333" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

function TabAdidas({ isActive, onClick }: { isActive?: boolean; onClick?: () => void }) {
  if (isActive) {
    return (
      <motion.div 
        className="h-[48px] relative shrink-0 cursor-pointer w-[106.578px]"
        data-name="Tab"
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
      >
        <div className="absolute bg-[#65bcb6] content-stretch flex items-center justify-center left-[58.578px] rounded-[1.67772e+07px] size-[48px] top-0">
          <svg className="size-[28px]" fill="none" viewBox="0 0 28 28">
            <path d={navSvgPaths.p14560df0} fill="white" />
            <path d={navSvgPaths.pa43e00} fill="white" />
            <path d={navSvgPaths.pb98cdf2} fill="white" />
          </svg>
        </div>
        <div className="absolute h-[22.5px] left-0 top-[12.75px]">
          <p className="font-['Vazirmatn:SemiBold',sans-serif] font-semibold leading-[22.5px] text-[15px] text-gray-800 text-nowrap">Adidas</p>
        </div>
        <motion.div 
          className="absolute bg-[#65bcb6] h-[2px] left-0 rounded-[1.67772e+07px] top-[54px] w-[106.578px]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: 'left' }}
        />
      </motion.div>
    );
  }
  
  return (
    <motion.div 
      className="content-stretch flex gap-[12px] h-[48px] items-center opacity-40 relative shrink-0 cursor-pointer"
      data-name="Tab"
      onClick={onClick}
      whileHover={{ scale: 1.05, opacity: 1 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 0.4, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 }}
    >
      <div className="h-[22.5px] relative shrink-0">
        <p className="font-['Vazirmatn:SemiBold',sans-serif] font-semibold leading-[22.5px] text-[15px] text-gray-800 text-nowrap">Adidas</p>
      </div>
      <div className="basis-0 bg-gray-100 grow h-[48px] min-h-px min-w-px relative rounded-[1.67772e+07px] shrink-0">
        <div className="content-stretch flex h-[48px] items-center justify-center relative w-full">
          <svg className="size-[28px]" fill="none" viewBox="0 0 28 28">
            <path d={navSvgPaths.p14560df0} fill="#65BCB6" />
            <path d={navSvgPaths.pa43e00} fill="#65BCB6" />
            <path d={navSvgPaths.pb98cdf2} fill="#65BCB6" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

function TabMicrosoft({ isActive, onClick }: { isActive?: boolean; onClick?: () => void }) {
  if (isActive) {
    return (
      <motion.div 
        className="h-[48px] relative shrink-0 cursor-pointer w-[125.164px]"
        data-name="Tab"
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="absolute bg-[#65bcb6] content-stretch flex items-center justify-center left-[77.164px] rounded-[1.67772e+07px] size-[48px] top-0">
          <svg className="size-[28px]" fill="none" viewBox="0 0 28 28">
            <path d={navSvgPaths.p183c6380} fill="white" />
            <path d={navSvgPaths.p31e6ae00} fill="white" />
            <path d={navSvgPaths.p2b0a0400} fill="white" />
            <path d={navSvgPaths.p2050b00} fill="white" />
          </svg>
        </div>
        <div className="absolute h-[22.5px] left-0 top-[12.75px]">
          <p className="font-['Vazirmatn:SemiBold',sans-serif] font-semibold leading-[22.5px] text-[15px] text-gray-800 text-nowrap">Microsoft</p>
        </div>
        <motion.div 
          className="absolute bg-[#65bcb6] h-[2px] left-0 rounded-[1.67772e+07px] top-[54px] w-[125.164px]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: 'left' }}
        />
      </motion.div>
    );
  }
  
  return (
    <motion.div 
      className="content-stretch flex gap-[12px] h-[48px] items-center opacity-40 relative shrink-0 cursor-pointer"
      data-name="Tab"
      onClick={onClick}
      whileHover={{ scale: 1.05, opacity: 1 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 0.4, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <div className="basis-0 grow h-[22.5px] min-h-px min-w-px relative shrink-0">
        <p className="font-['Vazirmatn:SemiBold',sans-serif] font-semibold leading-[22.5px] text-[15px] text-gray-800 text-nowrap">Microsoft</p>
      </div>
      <div className="bg-gray-100 relative rounded-[1.67772e+07px] shrink-0 size-[48px]">
        <div className="content-stretch flex items-center justify-center relative size-[48px]">
          <svg className="size-[28px]" fill="none" viewBox="0 0 28 28">
            <path d={navSvgPaths.p183c6380} fill="#65BCB6" />
            <path d={navSvgPaths.p31e6ae00} fill="#65BCB6" />
            <path d={navSvgPaths.p2b0a0400} fill="#65BCB6" />
            <path d={navSvgPaths.p2050b00} fill="#65BCB6" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

function TabZara({ isActive, onClick }: { isActive?: boolean; onClick?: () => void }) {
  if (isActive) {
    return (
      <motion.div 
        className="h-[48px] relative shrink-0 cursor-pointer w-[90.305px]"
        data-name="Tab"
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        <div className="absolute bg-[#65bcb6] content-stretch flex items-center justify-center left-[42.305px] rounded-[1.67772e+07px] size-[48px] top-0">
          <svg className="size-[28px]" fill="none" viewBox="0 0 28 28">
            <path d={navSvgPaths.p13584f80} fill="white" />
          </svg>
        </div>
        <div className="absolute h-[22.5px] left-0 top-[12.75px]">
          <p className="font-['Vazirmatn:SemiBold',sans-serif] font-semibold leading-[22.5px] text-[15px] text-gray-800 text-nowrap">Zara</p>
        </div>
        <motion.div 
          className="absolute bg-[#65bcb6] h-[2px] left-0 rounded-[1.67772e+07px] top-[54px] w-[90.305px]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: 'left' }}
        />
      </motion.div>
    );
  }
  
  return (
    <motion.div 
      className="content-stretch flex gap-[12px] h-[48px] items-center opacity-40 relative shrink-0 cursor-pointer"
      data-name="Tab"
      onClick={onClick}
      whileHover={{ scale: 1.05, opacity: 1 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 0.4, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
    >
      <div className="h-[22.5px] relative shrink-0">
        <p className="font-['Vazirmatn:SemiBold',sans-serif] font-semibold leading-[22.5px] text-[15px] text-gray-800 text-nowrap">Zara</p>
      </div>
      <div className="basis-0 bg-gray-100 grow h-[48px] min-h-px min-w-px relative rounded-[1.67772e+07px] shrink-0">
        <div className="content-stretch flex h-[48px] items-center justify-center relative w-full">
          <svg className="size-[28px]" fill="none" viewBox="0 0 28 28">
            <path d={navSvgPaths.p13584f80} fill="#65BCB6" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

function TabStarbucks({ isActive, onClick }: { isActive?: boolean; onClick?: () => void }) {
  if (isActive) {
    return (
      <motion.div 
        className="h-[48px] relative shrink-0 cursor-pointer w-[127.922px]"
        data-name="Tab"
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="absolute bg-[#65bcb6] content-stretch flex items-center justify-center left-[79.922px] rounded-[1.67772e+07px] size-[48px] top-0">
          <svg className="size-[28px]" fill="none" viewBox="0 0 28 28">
            <path d={navSvgPaths.p1fa66600} stroke="white" strokeWidth="2.33333" />
            <path d={navSvgPaths.p1835bb70} fill="white" />
            <path d={navSvgPaths.p38a2f6f0} stroke="white" strokeLinecap="round" strokeWidth="1.75" />
            <path d={navSvgPaths.p21e85058} stroke="white" strokeLinecap="round" strokeWidth="1.75" />
          </svg>
        </div>
        <div className="absolute h-[22.5px] left-0 top-[12.75px]">
          <p className="font-['Vazirmatn:SemiBold',sans-serif] font-semibold leading-[22.5px] text-[15px] text-gray-800 text-nowrap">Starbucks</p>
        </div>
        <motion.div 
          className="absolute bg-[#65bcb6] h-[2px] left-0 rounded-[1.67772e+07px] top-[54px] w-[127.922px]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: 'left' }}
        />
      </motion.div>
    );
  }
  
  return (
    <motion.div 
      className="content-stretch flex gap-[12px] h-[48px] items-center opacity-40 relative shrink-0 cursor-pointer"
      data-name="Tab"
      onClick={onClick}
      whileHover={{ scale: 1.05, opacity: 1 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 0.4, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div className="basis-0 grow h-[22.5px] min-h-px min-w-px relative shrink-0">
        <p className="font-['Vazirmatn:SemiBold',sans-serif] font-semibold leading-[22.5px] text-[15px] text-gray-800 text-nowrap">Starbucks</p>
      </div>
      <div className="bg-gray-100 relative rounded-[1.67772e+07px] shrink-0 size-[48px]">
        <div className="content-stretch flex items-center justify-center relative size-[48px]">
          <svg className="size-[28px]" fill="none" viewBox="0 0 28 28">
            <path d={navSvgPaths.p1fa66600} stroke="#65BCB6" strokeWidth="2.33333" />
            <path d={navSvgPaths.p1835bb70} fill="#65BCB6" />
            <path d={navSvgPaths.p38a2f6f0} stroke="#65BCB6" strokeLinecap="round" strokeWidth="1.75" />
            <path d={navSvgPaths.p21e85058} stroke="#65BCB6" strokeLinecap="round" strokeWidth="1.75" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

function TabApple({ isActive, onClick }: { isActive?: boolean; onClick?: () => void }) {
  if (isActive) {
    return (
      <motion.div 
        className="h-[48px] relative shrink-0 cursor-pointer w-[98.852px]"
        data-name="Tab"
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
      >
        <div className="absolute bg-[#65bcb6] content-stretch flex items-center justify-center left-[50.852px] rounded-[1.67772e+07px] size-[48px] top-0">
          <svg className="size-[28px]" fill="none" viewBox="0 0 28 28">
            <path d={navSvgPaths.p12eec480} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
            <path d={navSvgPaths.p361bf100} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          </svg>
        </div>
        <div className="absolute h-[22.5px] left-0 top-[12.75px]">
          <p className="font-['Vazirmatn:SemiBold',sans-serif] font-semibold leading-[22.5px] text-[15px] text-gray-800 text-nowrap">Apple</p>
        </div>
        <motion.div 
          className="absolute bg-[#65bcb6] h-[2px] left-0 rounded-[1.67772e+07px] top-[54px] w-[98.852px]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: 'left' }}
        />
      </motion.div>
    );
  }
  
  return (
    <motion.div 
      className="content-stretch flex gap-[12px] h-[48px] items-center opacity-40 relative shrink-0 cursor-pointer"
      data-name="Tab"
      onClick={onClick}
      whileHover={{ scale: 1.05, opacity: 1 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 0.4, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
    >
      <div className="h-[22.5px] relative shrink-0">
        <p className="font-['Vazirmatn:SemiBold',sans-serif] font-semibold leading-[22.5px] text-[15px] text-gray-800 text-nowrap">Apple</p>
      </div>
      <div className="basis-0 bg-gray-100 grow h-[48px] min-h-px min-w-px relative rounded-[1.67772e+07px] shrink-0">
        <div className="content-stretch flex h-[48px] items-center justify-center relative w-full">
          <svg className="size-[28px]" fill="none" viewBox="0 0 28 28">
            <path d={navSvgPaths.p12eec480} stroke="#65BCB6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
            <path d={navSvgPaths.p361bf100} stroke="#65BCB6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

function TabNike({ isActive, onClick }: { isActive?: boolean; onClick?: () => void }) {
  return (
    <motion.div 
      className="h-[48px] relative shrink-0 cursor-pointer"
      data-name="Tab"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <div className={`absolute ${isActive ? 'bg-[#65bcb6]' : 'bg-gray-100'} content-stretch flex items-center justify-center left-[42.35px] rounded-[1.67772e+07px] size-[48px] top-0 transition-colors duration-300`}>
        <svg className="size-[28px]" fill="none" viewBox="0 0 28 28">
          <path d={navSvgPaths.p3982a5f0} fill={isActive ? "white" : "#65BCB6"} />
        </svg>
      </div>
      <div className="absolute h-[22.5px] left-0 top-[12.75px]">
        <p className="font-['Vazirmatn:SemiBold',sans-serif] font-semibold leading-[22.5px] text-[15px] text-gray-800 text-nowrap">Nike</p>
      </div>
      {isActive && (
        <motion.div 
          className="absolute bg-[#65bcb6] h-[2px] left-0 rounded-[1.67772e+07px] top-[54px] w-[90.352px]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: 'left' }}
        />
      )}
    </motion.div>
  );
}

function Navigation({ activeBrand, setActiveBrand }: { activeBrand: string; setActiveBrand: (brand: string) => void }) {
  return (
    <motion.div 
      className="content-stretch flex gap-[12px] items-center justify-center relative shrink-0" 
      data-name="Navigation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <TabAmazon isActive={activeBrand === 'amazon'} onClick={() => setActiveBrand('amazon')} />
      <TabAdidas isActive={activeBrand === 'adidas'} onClick={() => setActiveBrand('adidas')} />
      <TabMicrosoft isActive={activeBrand === 'microsoft'} onClick={() => setActiveBrand('microsoft')} />
      <TabZara isActive={activeBrand === 'zara'} onClick={() => setActiveBrand('zara')} />
      <TabStarbucks isActive={activeBrand === 'starbucks'} onClick={() => setActiveBrand('starbucks')} />
      <TabApple isActive={activeBrand === 'apple'} onClick={() => setActiveBrand('apple')} />
      <TabNike isActive={activeBrand === 'nike'} onClick={() => setActiveBrand('nike')} />
    </motion.div>
  );
}

function Heading3({ brand }: { brand: string }) {
  const brandNames: Record<string, string> = {
    nike: "Nike",
    amazon: "Amazon",
    adidas: "Adidas",
    microsoft: "Microsoft",
    zara: "Zara",
    starbucks: "Starbucks",
    apple: "Apple"
  };

  return (
    <motion.div 
      className="relative shrink-0 w-full" 
      data-name="Heading 3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      key={brand}
    >
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[549px] py-0 relative w-full">
          <p className="font-['Vazirmatn:Medium',sans-serif] font-medium leading-[30px] relative shrink-0 text-[22px] text-center text-gray-900 text-nowrap whitespace-pre" dir="auto">
            {brandNames[brand] || "Nike"}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function Paragraph1({ category }: { category: string }) {
  return (
    <motion.div 
      className="relative shrink-0 w-full" 
      data-name="Paragraph"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.45 }}
      key={category}
    >
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[518px] py-0 relative w-full">
          <p className="font-['Vazirmatn:Medium',sans-serif] font-medium leading-[26px] relative shrink-0 text-[16px] text-center text-gray-500 text-nowrap whitespace-pre" dir="auto">
            {category}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function Container4({ brand }: { brand: string }) {
  const brandCategories: Record<string, string> = {
    nike: "ورزش و کفش",
    amazon: "تجارت الکترونیک",
    adidas: "ورزش و پوشاک",
    microsoft: "فناوری و نرم‌افزار",
    zara: "مد و پوشاک",
    starbucks: "رستوران و کافی‌شاپ",
    apple: "فناوری و محصولات الکترونیک"
  };

  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[60px] items-center justify-center relative shrink-0 w-full" data-name="Container">
      <Heading3 brand={brand} />
      <Paragraph1 category={brandCategories[brand] || "ورزش و کفش"} />
    </div>
  );
}

function Icon8() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[29.17%_8.33%_45.83%_66.67%]" data-name="Vector">
        <div className="absolute inset-[-16.667%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
            <path d={svgPaths.p1efb2580} id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.17%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-10%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 8">
            <path d={svgPaths.p137d8f80} id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute bg-[rgba(239,68,68,0.1)] box-border content-stretch flex flex-col h-[28px] items-start left-[302px] pb-0 pt-[6px] px-[12px] rounded-[1.67772e+07px] top-[26px] w-[40px]" data-name="Container">
      <Icon8 />
    </div>
  );
}

function Article({ icon, badge, value, title, description, delay }: { icon: React.ReactNode; badge: React.ReactNode; value: string; title: string; description: string; delay: number }) {
  return (
    <motion.div 
      className="basis-0 bg-white grow h-full min-h-px min-w-px relative rounded-[16px] shrink-0" 
      data-name="Article"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      {badge}
      <div className="absolute h-[40px] left-[26px] top-[70px] w-[316px]" data-name="Paragraph">
        <p className="absolute font-['Vazirmatn:Bold',sans-serif] font-bold leading-[40px] left-0 text-[40px] text-gray-900 text-nowrap top-[-0.5px] tracking-[-0.8px] whitespace-pre" dir="auto">
          {value}
        </p>
      </div>
      <div className="absolute content-stretch flex h-[28px] items-start left-[26px] top-[122px] w-[316px]" data-name="Heading 4">
        <p className="basis-0 font-['Vazirmatn:Medium',sans-serif] font-medium grow leading-[28px] min-h-px min-w-px relative shrink-0 text-[18px] text-gray-900" dir="auto">
          {title}
        </p>
      </div>
      <div className="absolute h-[26px] left-[26px] top-[158px] w-[316px]" data-name="Paragraph">
        <p className="absolute font-['Vazirmatn:Medium',sans-serif] font-medium leading-[26px] left-0 text-[14px] text-gray-600 text-nowrap top-0 whitespace-pre" dir="auto">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

function Icon9() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[45.83%_8.33%_29.17%_66.67%]" data-name="Vector">
        <div className="absolute inset-[-16.667%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
            <path d={svgPaths.p34ed8500} id="Vector" stroke="var(--stroke-0, #3B82F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.17%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-10%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 8">
            <path d={svgPaths.p1c8b9680} id="Vector" stroke="var(--stroke-0, #3B82F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute bg-[rgba(59,130,246,0.1)] box-border content-stretch flex flex-col h-[28px] items-start left-[302px] pb-0 pt-[6px] px-[12px] rounded-[1.67772e+07px] top-[26px] w-[40px]" data-name="Container">
      <Icon9 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[29.17%_8.33%_45.83%_66.67%]" data-name="Vector">
        <div className="absolute inset-[-16.667%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
            <path d={svgPaths.p1efb2580} id="Vector" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.17%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-10%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 8">
            <path d={svgPaths.p137d8f80} id="Vector" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute bg-[rgba(16,185,129,0.1)] box-border content-stretch flex flex-col h-[28px] items-start left-[302px] pb-0 pt-[6px] px-[12px] rounded-[1.67772e+07px] top-[26px] w-[40px]" data-name="Container">
      <Icon10 />
    </div>
  );
}

function Container8({ brand }: { brand: string }) {
  const brandStats: Record<string, Array<{
    badge: React.ReactNode;
    badgeContent: React.ReactNode;
    value: string;
    title: string;
    description: string;
    delay: number;
  }>> = {
    nike: [
      {
        badge: <div aria-hidden="true" className="absolute border-2 border-[rgba(239,68,68,0.2)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]" />,
        badgeContent: <Container5 />,
        value: "۴٫۹/۵",
        title: "رضایت مشتریان",
        description: "از تجربه خرید و پشتیبانی",
        delay: 0.5
      },
      {
        badge: <div aria-hidden="true" className="absolute border-2 border-[rgba(59,130,246,0.2)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]" />,
        badgeContent: <Container6 />,
        value: "-۳۵٪",
        title: "کاهش مرجوعی",
        description: "راهنمایی دقیق سایز کفش",
        delay: 0.55
      },
      {
        badge: <div aria-hidden="true" className="absolute border-2 border-[rgba(16,185,129,0.2)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]" />,
        badgeContent: <Container7 />,
        value: "+۱۲۰٪",
        title: "افزایش نرخ تبدیل",
        description: "با پاسخ‌گویی سریع و دقیق",
        delay: 0.6
      }
    ],
    amazon: [
      {
        badge: <div aria-hidden="true" className="absolute border-2 border-[rgba(239,68,68,0.2)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]" />,
        badgeContent: <Container5 />,
        value: "۴٫۷/۵",
        title: "رضایت خریداران",
        description: "از تجربه خرید آنلاین",
        delay: 0.5
      },
      {
        badge: <div aria-hidden="true" className="absolute border-2 border-[rgba(59,130,246,0.2)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]" />,
        badgeContent: <Container6 />,
        value: "-۴۲٪",
        title: "کاهش پرسش",
        description: "پاسخ خودکار به سوالات محصول",
        delay: 0.55
      },
      {
        badge: <div aria-hidden="true" className="absolute border-2 border-[rgba(16,185,129,0.2)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]" />,
        badgeContent: <Container7 />,
        value: "+۸۵٪",
        title: "افزایش فروش",
        description: "با پیشنهادات هوشمند",
        delay: 0.6
      }
    ],
    adidas: [
      {
        badge: <div aria-hidden="true" className="absolute border-2 border-[rgba(239,68,68,0.2)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]" />,
        badgeContent: <Container5 />,
        value: "۴٫۸/۵",
        title: "رضایت ورزشکاران",
        description: "از مشاوره تخصصی محصولات",
        delay: 0.5
      },
      {
        badge: <div aria-hidden="true" className="absolute border-2 border-[rgba(59,130,246,0.2)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]" />,
        badgeContent: <Container6 />,
        value: "-۳۸٪",
        title: "کاهش تماس",
        description: "راهنمایی آنلاین محصولات ورزشی",
        delay: 0.55
      },
      {
        badge: <div aria-hidden="true" className="absolute border-2 border-[rgba(16,185,129,0.2)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]" />,
        badgeContent: <Container7 />,
        value: "+۹۵٪",
        title: "افزایش تعامل",
        description: "با راهنمای ورزشی شخصی‌سازی",
        delay: 0.6
      }
    ],
    microsoft: [
      {
        badge: <div aria-hidden="true" className="absolute border-2 border-[rgba(239,68,68,0.2)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]" />,
        badgeContent: <Container5 />,
        value: "۴٫۶/۵",
        title: "رضایت کاربران",
        description: "از پشتیبانی فنی سریع",
        delay: 0.5
      },
      {
        badge: <div aria-hidden="true" className="absolute border-2 border-[rgba(59,130,246,0.2)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]" />,
        badgeContent: <Container6 />,
        value: "-۵۵٪",
        title: "کاهش تیکت",
        description: "حل خودکار مشکلات رایج",
        delay: 0.55
      },
      {
        badge: <div aria-hidden="true" className="absolute border-2 border-[rgba(16,185,129,0.2)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]" />,
        badgeContent: <Container7 />,
        value: "+۷۵٪",
        title: "افزایش بهره‌وری",
        description: "تیم پشتیبانی با آیوا",
        delay: 0.6
      }
    ],
    zara: [
      {
        badge: <div aria-hidden="true" className="absolute border-2 border-[rgba(239,68,68,0.2)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]" />,
        badgeContent: <Container5 />,
        value: "۴٫۷/۵",
        title: "رضایت مشتریان",
        description: "از مشاوره استایل آنلاین",
        delay: 0.5
      },
      {
        badge: <div aria-hidden="true" className="absolute border-2 border-[rgba(59,130,246,0.2)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]" />,
        badgeContent: <Container6 />,
        value: "-۴۰٪",
        title: "کاهش مرجوعی",
        description: "با راهنمای سایز هوشمند",
        delay: 0.55
      },
      {
        badge: <div aria-hidden="true" className="absolute border-2 border-[rgba(16,185,129,0.2)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]" />,
        badgeContent: <Container7 />,
        value: "+۱۱۰٪",
        title: "افزایش فروش",
        description: "با پیشنهاد ست لباس",
        delay: 0.6
      }
    ],
    starbucks: [
      {
        badge: <div aria-hidden="true" className="absolute border-2 border-[rgba(239,68,68,0.2)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]" />,
        badgeContent: <Container5 />,
        value: "۴٫۹/۵",
        title: "رضایت مشتریان",
        description: "از سفارش سریع و آسان",
        delay: 0.5
      },
      {
        badge: <div aria-hidden="true" className="absolute border-2 border-[rgba(59,130,246,0.2)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]" />,
        badgeContent: <Container6 />,
        value: "-۴۵٪",
        title: "کاهش زمان انتظار",
        description: "با سفارش پیش از ورود",
        delay: 0.55
      },
      {
        badge: <div aria-hidden="true" className="absolute border-2 border-[rgba(16,185,129,0.2)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]" />,
        badgeContent: <Container7 />,
        value: "+۱۳۰٪",
        title: "افزایش سفارشات",
        description: "با پیشنهادات شخصی‌سازی",
        delay: 0.6
      }
    ],
    apple: [
      {
        badge: <div aria-hidden="true" className="absolute border-2 border-[rgba(239,68,68,0.2)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]" />,
        badgeContent: <Container5 />,
        value: "۴٫۸/۵",
        title: "رضایت کاربران",
        description: "از تجربه خرید محصولات",
        delay: 0.5
      },
      {
        badge: <div aria-hidden="true" className="absolute border-2 border-[rgba(59,130,246,0.2)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]" />,
        badgeContent: <Container6 />,
        value: "-۵۰٪",
        title: "کاهش پرسش",
        description: "مشاوره فنی هوشمند محصول",
        delay: 0.55
      },
      {
        badge: <div aria-hidden="true" className="absolute border-2 border-[rgba(16,185,129,0.2)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]" />,
        badgeContent: <Container7 />,
        value: "+۱۰۰٪",
        title: "افزایش رضایت",
        description: "با پشتیبانی ۲۴/۷",
        delay: 0.6
      }
    ]
  };

  const stats = brandStats[brand] || brandStats.nike;

  return (
    <div className="content-stretch flex gap-[20px] h-[210px] items-start relative shrink-0 w-full" data-name="Container">
      {stats.map((stat, index) => (
        <motion.div 
          key={index}
          className="basis-0 bg-white grow h-full min-h-px min-w-px relative rounded-[16px] shrink-0" 
          data-name="Article"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: stat.delay, ease: "easeOut" }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          {stat.badge}
          {stat.badgeContent}
          <div className="absolute h-[40px] left-[26px] top-[70px] w-[316px]" data-name="Paragraph">
            <p className="absolute font-['Vazirmatn:Bold',sans-serif] font-bold leading-[40px] left-0 text-[40px] text-gray-900 text-nowrap top-[-0.5px] tracking-[-0.8px] whitespace-pre" dir="auto">
              {stat.value}
            </p>
          </div>
          <div className="absolute content-stretch flex h-[28px] items-start left-[26px] top-[122px] w-[316px]" data-name="Heading 4">
            <p className="basis-0 font-['Vazirmatn:Medium',sans-serif] font-medium grow leading-[28px] min-h-px min-w-px relative shrink-0 text-[18px] text-gray-900" dir="auto">
              {stat.title}
            </p>
          </div>
          <div className="absolute h-[26px] left-[26px] top-[158px] w-[316px]" data-name="Paragraph">
            <p className="absolute font-['Vazirmatn:Medium',sans-serif] font-medium leading-[26px] left-0 text-[14px] text-gray-600 text-nowrap top-0 whitespace-pre" dir="auto">
              {stat.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function Component2222221() {
  return (
    <motion.div 
      className="absolute h-[365px] left-[856px] top-[327.37px] w-[499px]" 
      data-name="222222 1"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 499 365">
        <g id="222222 1">
          <path d={svgPaths.p23b59480} fill="var(--fill-0, #C4D7D4)" id="Vector" />
          <path d={svgPaths.p12d62480} fill="var(--fill-0, #B2C9C6)" id="Vector_2" />
          <path d={svgPaths.pac21f80} fill="var(--fill-0, #CFD3A3)" id="Vector_3" />
          <path d={svgPaths.p4bc0d80} fill="var(--fill-0, #C4C695)" id="Vector_4" />
          <path d={svgPaths.p7f96f00} fill="var(--fill-0, #C4C695)" id="Vector_5" />
          <path d={svgPaths.p18b39f00} fill="var(--fill-0, #C4C695)" id="Vector_6" />
          <path d={svgPaths.p123ac280} fill="var(--fill-0, #C4C695)" id="Vector_7" />
          <path d={svgPaths.p3d279a80} fill="var(--fill-0, #C4C695)" id="Vector_8" />
          <path d={svgPaths.p212c8ef0} fill="var(--fill-0, #C4D7D4)" id="Vector_9" />
          <path d={svgPaths.p114bc100} fill="var(--fill-0, #CFD3A3)" id="Vector_10" />
          <path d={svgPaths.p18b49f00} fill="var(--fill-0, #C4C695)" id="Vector_11" />
          <path d={svgPaths.p2d285400} fill="var(--fill-0, #B2C9C6)" id="Vector_12" />
          <path d={svgPaths.p2d79d280} fill="var(--fill-0, #A9C6D3)" id="Vector_13" />
          <path d={svgPaths.p38f73500} fill="var(--fill-0, #93B5C1)" id="Vector_14" />
          <path d={svgPaths.paef5300} fill="var(--fill-0, #A1BAB0)" id="Vector_15" />
          <path d={svgPaths.p36524580} fill="var(--fill-0, #93B5C1)" id="Vector_16" />
          <path d={svgPaths.p3f0afc40} fill="var(--fill-0, #A9C6D3)" id="Vector_17" />
          <path d={svgPaths.p35984c00} fill="var(--fill-0, #93B5C1)" id="Vector_18" />
          <path d={svgPaths.p3839c00} fill="var(--fill-0, #A9C6D3)" id="Vector_19" />
          <path d={svgPaths.p12af61f2} fill="var(--fill-0, #93B5C1)" id="Vector_20" />
          <path d={svgPaths.p2be9d100} fill="var(--fill-0, #93B5C1)" id="Vector_21" />
          <path d={svgPaths.p36c22b80} fill="var(--fill-0, #B2C9C6)" id="Vector_22" />
          <path d={svgPaths.p116d4600} fill="var(--fill-0, #F7B686)" id="Vector_23" />
          <path d={svgPaths.p13836600} fill="var(--fill-0, #69A1C4)" id="Vector_24" />
          <path d={svgPaths.p38d42c80} fill="var(--fill-0, #69A1C4)" id="Vector_25" />
          <path d={svgPaths.pf8c4b40} fill="var(--fill-0, #F7B686)" id="Vector_26" />
          <path d={svgPaths.p2c6c2670} fill="var(--fill-0, #56335B)" id="Vector_27" />
          <path d={svgPaths.p22b2a00} fill="var(--fill-0, #F7B686)" id="Vector_28" />
          <path d={svgPaths.p1a397bc0} fill="var(--fill-0, #2F1A31)" id="Vector_29" />
          <path d={svgPaths.p9694280} fill="var(--fill-0, #060633)" id="Vector_30" />
          <path d={svgPaths.p2eb1b500} fill="var(--fill-0, #060633)" id="Vector_31" />
          <path d={svgPaths.p16721bc0} fill="var(--fill-0, #060633)" id="Vector_32" />
          <path d={svgPaths.p1784cc00} fill="var(--fill-0, #060633)" id="Vector_33" />
          <path d={svgPaths.p41d9880} fill="var(--fill-0, #56335B)" id="Vector_34" />
          <path d={svgPaths.p34314d00} fill="var(--fill-0, #F7B686)" id="Vector_35" />
          <path d={svgPaths.p2f960680} fill="var(--fill-0, #56335B)" id="Vector_36" />
          <path d={svgPaths.p31479500} fill="var(--fill-0, white)" id="Vector_37" />
          <path d={svgPaths.p1beb8e00} fill="var(--fill-0, #2F1A31)" id="Vector_38" />
          <path d={svgPaths.pb15b5f0} fill="var(--fill-0, white)" id="Vector_39" />
          <path d={svgPaths.p5e9eb00} fill="var(--fill-0, white)" id="Vector_40" />
          <path d={svgPaths.p249ce500} fill="var(--fill-0, #F7B686)" id="Vector_41" />
          <path d={svgPaths.p254a1500} fill="var(--fill-0, #F7B686)" id="Vector_42" />
          <path d={svgPaths.p19b81180} fill="var(--fill-0, #F7B686)" id="Vector_43" />
          <path d={svgPaths.p39c94c80} fill="var(--fill-0, #F7B686)" id="Vector_44" />
          <path d={svgPaths.pe65adb0} fill="var(--fill-0, #FFA18E)" id="Vector_45" />
          <path d={svgPaths.p276e9980} fill="var(--fill-0, #FFA18E)" id="Vector_46" />
          <path d={svgPaths.p2d41080} fill="var(--fill-0, #F7B686)" id="Vector_47" />
          <path d={svgPaths.p39ca2b80} fill="var(--fill-0, #FFA18E)" id="Vector_48" />
          <path d={svgPaths.pb310400} fill="var(--fill-0, #FFA18E)" id="Vector_49" />
          <path d={svgPaths.pa90c200} fill="var(--fill-0, #FFA18E)" id="Vector_50" />
          <path d={svgPaths.p2db06680} fill="var(--fill-0, #FFA18E)" id="Vector_51" />
          <path d={svgPaths.p1d1cfc80} fill="var(--fill-0, #2F1A31)" id="Vector_52" />
          <path d={svgPaths.p2521b500} fill="var(--fill-0, #F7B686)" id="Vector_53" />
          <path d={svgPaths.pe0a9a00} fill="var(--fill-0, #FFA18E)" id="Vector_54" />
          <path d={svgPaths.p3a957a80} fill="var(--fill-0, #FFA18E)" id="Vector_55" />
          <path d={svgPaths.p1f36ce00} fill="var(--fill-0, #FFA18E)" id="Vector_56" />
          <path d={svgPaths.p13084900} fill="var(--fill-0, #F7B686)" id="Vector_57" />
          <path d={svgPaths.p19090700} fill="var(--fill-0, #FFA18E)" id="Vector_58" />
          <motion.path 
            d={svgPaths.p1a508d00} 
            fill="var(--fill-0, #EDF9F7)" 
            id="Vector_59"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <path d={svgPaths.p132ca700} fill="var(--fill-0, #EDF9F7)" id="Vector_60" />
          <path d={svgPaths.pd26aff0} fill="var(--fill-0, #EDF9F7)" id="Vector_61" />
          <path d={svgPaths.p1ce2c600} fill="var(--fill-0, #EDF9F7)" id="Vector_62" />
          <path d={svgPaths.p1c7a03f0} fill="var(--fill-0, #EDF9F7)" id="Vector_63" />
          <path d={svgPaths.p1db4d600} fill="var(--fill-0, #EDF9F7)" id="Vector_64" />
          <path d={svgPaths.p208a7fc0} fill="var(--fill-0, #79A39B)" id="Vector_65" />
          <path d={svgPaths.p1dfe5600} fill="var(--fill-0, #79A39B)" id="Vector_66" />
          <path d={svgPaths.p9015b00} fill="var(--fill-0, #EDF9F7)" id="Vector_67" />
          <path d={svgPaths.p3a452c00} fill="var(--fill-0, #EDF9F7)" id="Vector_68" />
          <path d={svgPaths.p388961f0} fill="var(--fill-0, #EDF9F7)" id="Vector_69" />
          <path d={svgPaths.pc29c6f0} fill="var(--fill-0, #EDF9F7)" id="Vector_70" />
          <path d={svgPaths.p1638c980} fill="var(--fill-0, #65BCB6)" id="Vector_71" />
          <path d={svgPaths.p11f20d00} fill="var(--fill-0, #EDF9F7)" id="Vector_72" />
          <path d={svgPaths.p2771b480} fill="var(--fill-0, #EDF9F7)" id="Vector_73" />
          <path d={svgPaths.p325cac00} fill="var(--fill-0, #EDF9F7)" id="Vector_74" />
          <path d={svgPaths.pac22970} fill="var(--fill-0, #EDF9F7)" id="Vector_75" />
          <path d={svgPaths.p214e6e00} fill="var(--fill-0, #EDF9F7)" id="Vector_76" />
          <path d={svgPaths.p29c98a00} fill="var(--fill-0, #EDF9F7)" id="Vector_77" />
          <path d={svgPaths.p36494980} fill="var(--fill-0, #79A39B)" id="Vector_78" />
          <path d={svgPaths.p24f5000} fill="var(--fill-0, #79A39B)" id="Vector_79" />
          <path d={svgPaths.p19d87b00} fill="var(--fill-0, #EDF9F7)" id="Vector_80" />
          <path d={svgPaths.p30ceda00} fill="var(--fill-0, #EDF9F7)" id="Vector_81" />
          <path d={svgPaths.p7882c00} fill="var(--fill-0, #EDF9F7)" id="Vector_82" />
          <path d={svgPaths.p1d630600} fill="var(--fill-0, #EDF9F7)" id="Vector_83" />
          <path d={svgPaths.p2ba62e00} fill="var(--fill-0, #2F1A31)" id="Vector_84" />
          <path d={svgPaths.p2dfcd640} fill="var(--fill-0, #FFA18E)" id="Vector_85" />
          <path d={svgPaths.p4653100} fill="var(--fill-0, white)" id="Vector_86" />
          <path d={svgPaths.p26e2d800} fill="var(--fill-0, #2F1A31)" id="Vector_87" />
          <path d={svgPaths.p3605ed00} fill="var(--fill-0, #FFA18E)" id="Vector_88" />
          <path d={svgPaths.p4ab7100} fill="var(--fill-0, white)" id="Vector_89" />
          <path d={svgPaths.p2aec8e80} fill="var(--fill-0, #2F1A31)" id="Vector_90" />
          <path d={svgPaths.p144a4b00} fill="var(--fill-0, #65BCB6)" id="Vector_91" />
          <path d={svgPaths.p1d573980} fill="var(--fill-0, white)" id="Vector_92" />
          <path d={svgPaths.pfc136f0} fill="var(--fill-0, #F9D780)" id="Vector_93" />
          <path d={svgPaths.p3625fe80} fill="var(--fill-0, #F9D780)" id="Vector_94" />
          <path d={svgPaths.p1f852340} fill="var(--fill-0, #F9D780)" id="Vector_95" />
          <path d={svgPaths.p1145b200} fill="var(--fill-0, #81B3CC)" id="Vector_96" />
          <path d={svgPaths.p2df7f900} fill="var(--fill-0, #FCC67E)" id="Vector_97" />
          <path d={svgPaths.p3c0ada00} fill="var(--fill-0, #81B3CC)" id="Vector_98" />
          <path d={svgPaths.p339fbb00} fill="var(--fill-0, #FCC67E)" id="Vector_99" />
        </g>
      </svg>
    </motion.div>
  );
}

function Paragraph8({ text }: { text: string }) {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Vazirmatn:Medium',sans-serif] font-medium leading-[29.25px] relative shrink-0 text-[18px] text-gray-700 text-right w-[700px]" dir="auto">{`"${text}"`}</p>
    </div>
  );
}

function Quote({ quote }: { quote: string }) {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0 w-full" data-name="Quote">
      <Paragraph8 text={quote} />
    </div>
  );
}

function Paragraph9({ name }: { name: string }) {
  return (
    <div className="h-[26px] relative shrink-0 w-[645px]" data-name="Paragraph">
      <p className="absolute font-['Vazirmatn:Medium',sans-serif] font-medium leading-[26px] left-[645px] text-[16px] text-gray-900 text-nowrap text-right top-0 translate-x-[-100%] whitespace-pre" dir="auto">
        {name}
      </p>
    </div>
  );
}

function Paragraph10({ role, company }: { role: string; company: string }) {
  return (
    <div className="h-[26px] relative shrink-0 w-[645px]" data-name="Paragraph">
      <p className="absolute font-['Vazirmatn:Medium',sans-serif] font-medium leading-[26px] left-[645px] text-[14px] text-gray-500 text-right top-0 translate-x-[-100%] w-[220px]" dir="auto">
        {role} • {company}
      </p>
    </div>
  );
}

function Cite({ name, role, company }: { name: string; role: string; company: string }) {
  return (
    <div className="content-stretch flex flex-col items-end justify-center relative shrink-0 w-full" data-name="Cite">
      <Paragraph9 name={name} />
      <Paragraph10 role={role} company={company} />
    </div>
  );
}

function Container9({ quote, name, role, company }: { quote: string; name: string; role: string; company: string }) {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-full items-end justify-center min-h-px min-w-px relative shrink-0" data-name="Container">
      <Quote quote={quote} />
      <Cite name={name} role={role} company={company} />
    </div>
  );
}

function Image({ src }: { src: string }) {
  return (
    <div className="h-[74px] relative shrink-0 w-full" data-name="Image (عکس رضا محمدی)">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={src} />
    </div>
  );
}

function Container10({ brand }: { brand: string }) {
  const brandImages: Record<string, string> = {
    // nike: imgImage,
    amazon: "https://images.unsplash.com/photo-1675663351050-89949e051c38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBleGVjdXRpdmUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjI1NDM3OTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    adidas: "https://images.unsplash.com/photo-1651684215020-f7a5b6610f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwcHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MXx8fHwxNzYyNTEwNDU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    microsoft: "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MjQ0NjE1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    zara: "https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGhlYWRzaG90fGVufDF8fHx8MTc2MjUxNTI1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    starbucks: "https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MjQ5OTMyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    apple: "https://images.unsplash.com/photo-1752859951149-7d3fc700a7ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYyNDU2Mzg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  };

  return (
    <div className="relative rounded-[1.67772e+07px] shrink-0 size-[80px]" data-name="Container">
      <div className="box-border content-stretch flex flex-col items-start overflow-clip p-[3px] relative rounded-[inherit] size-[80px]">
        {/* <Image src={brandImages[brand] || imgImage} /> */}
      </div>
      <div aria-hidden="true" className="absolute border-[#65bcb6] border-[3px] border-solid inset-0 pointer-events-none rounded-[1.67772e+07px]" />
    </div>
  );
}

function Container11({ quote, name, role, company, brand }: { quote: string; name: string; role: string; company: string; brand: string }) {
  return (
    <div className="basis-0 content-stretch flex gap-[24px] grow items-center justify-end min-h-px min-w-px relative shrink-0 w-full" data-name="Container">
      <Container9 quote={quote} name={name} role={role} company={company} />
      <Container10 brand={brand} />
    </div>
  );
}

function Container12({ quote, name, role, company, brand }: { quote: string; name: string; role: string; company: string; brand: string }) {
  return (
    <motion.div 
      className="absolute bg-white box-border content-stretch flex flex-col h-[179px] items-center justify-center left-0 px-[40px] py-[24px] rounded-[16px] top-[382.81px] w-[884px]" 
      data-name="Container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
      key={company}
    >
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]" />
      <Container11 quote={quote} name={name} role={role} company={company} brand={brand} />
    </motion.div>
  );
}

function TabPanel({ brand }: { brand: string }) {
  const brandQuotes: Record<string, { quote: string; name: string; role: string; company: string }> = {
    nike: {
      quote: "با آیوا، مشتریان می‌تونند سایز مناسب رو پیدا کنند و سوالاتشون فوراً جواب داده میشه. تجربه خرید آنلاین کاملاً متحول شد.",
      name: "آرش احمدی",
      role: "مدیر تجربه مشتری",
      company: "Nike"
    },
    amazon: {
      quote: "آیوا به ما کمک کرد تا حجم عظیمی از سوالات محصولات رو به صورت خودکار پاسخ بدیم و تجربه خرید مشتریان رو بهبود ببخشیم.",
      name: "سارا کریمی",
      role: "مدیر خدمات مشتری",
      company: "Amazon"
    },
    adidas: {
      quote: "با مشاوره تخصصی آیوا، ورزشکاران می‌تونند بهترین محصول رو متناسب با نیازشون انتخاب کنند. رضایت مشتریان به شکل قابل توجهی افزایش یافت.",
      name: "رضا محمودی",
      role: "مدیر فروش دیجیتال",
      company: "Adidas"
    },
    microsoft: {
      quote: "آیوا پشتیبانی فنی ما رو متحول کرد. حل خودکار مشکلات رایج باعث شد تیم ما روی مسائل پیچیده‌تر تمرکز کنه.",
      name: "مهدی رضایی",
      role: "مدیر پشتیبانی فنی",
      company: "Microsoft"
    },
    zara: {
      quote: "مشتریان ما حالا می‌تو��ند با کمک آیوا ست‌های لباس مناسب پیدا کنن و راهنمایی سایز دریافت کنن. فروش به شکل چشمگیری افزایش یافت.",
      name: "نگار امینی",
      role: "مدیر تجارت الکترونیک",
      company: "Zara"
    },
    starbucks: {
      quote: "با آیوا، مشتریان می‌تونن قبل از رسیدن به کافی‌شاپ سفارش بدن و پیشنهادات شخصی‌سازی شده دریافت کنن. تجربه خرید کاملاً تغییر کرد.",
      name: "امیر حسینی",
      role: "مدیر تجربه دیجیتال",
      company: "Starbucks"
    },
    apple: {
      quote: "آیوا به مشتریان ما کمک می‌کنه تا بهترین محصول اپل رو برای نیازشون پیدا کنن. مشاوره فنی هوشمند باعث کاهش قابل توجه پرسش‌ها شد.",
      name: "علی موسوی",
      role: "مدیر خدمات مشتری",
      company: "Apple"
    }
  };

  const quoteData = brandQuotes[brand] || brandQuotes.nike;

  return (
    <div className="content-stretch flex flex-col gap-[48px] h-[621px] items-center relative shrink-0 w-full" data-name="Tab Panel">
      <Container4 brand={brand} />
      <Container8 brand={brand} key={brand} />
      <Component2222221 />
      <Container12 quote={quoteData.quote} name={quoteData.name} role={quoteData.role} company={quoteData.company} brand={brand} />
    </div>
  );
}

function Container13() {
  const [activeBrand, setActiveBrand] = useState('nike'); // Nike به عنوان پیش‌فرض

  return (
    <div className="content-stretch flex flex-col gap-[56px] h-[950px] items-center justify-center relative shrink-0 w-full" data-name="Container">
      <Header />
      <Navigation activeBrand={activeBrand} setActiveBrand={setActiveBrand} />
      <TabPanel brand={activeBrand} />
    </div>
  );
}

function Features() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-center justify-center left-0 overflow-clip p-[64px] top-[-0.37px] w-[1431px]" data-name="Features">
      <Container13 />
    </div>
  );
}

export default function Section5WithAnimation() {
  return (
    <div className="bg-gradient-to-b from-[#f9fafb] relative w-full h-[1069.64px] to-[#ffffff]" data-name="Section">
      <Container />
      <Features />
    </div>
  );
}
