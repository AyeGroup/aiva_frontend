"use client";
import { motion } from "motion/react";
import svgPaths from "../svg/svg-65vfizetex";
import Pricing10 from "./Pricing";

// Background decorative icons component
function BackgroundContainer() {
  return (
    <div className="absolute h-[1831.39px] left-0 overflow-clip top-0 w-full pointer-events-none">
      {/* Various decorative background icons */}
      <div className="absolute left-[135.8px] size-[72.567px] top-[272.28px] opacity-25">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 73 73">
          <g id="Icon">
            <path d={svgPaths.p1cbe1b00} stroke="#FFA18E" strokeWidth="6.04728" />
            <path d="M21.1655 21.1658H21.1957" stroke="#FFA18E" strokeWidth="6.04728" />
          </g>
        </svg>
      </div>

      <div className="absolute left-[1231.91px] size-[56px] top-[1317.55px] opacity-30">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 56 56">
          <g id="Icon">
            <path d="M28 2.33301V53.6663" stroke="#52D4A0" strokeWidth="4.66667" />
            <path d={svgPaths.p1d61d980} stroke="#52D4A0" strokeWidth="4.66667" />
          </g>
        </svg>
      </div>

      <div className="absolute left-[114.48px] size-[64px] top-[274.7px] opacity-25">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 64 64">
          <g id="Icon">
            <path d={svgPaths.p17e3d400} stroke="#52D4A0" strokeWidth="1.28" />
          </g>
        </svg>
      </div>

      <div className="absolute left-[1207.91px] size-[80px] top-[1385.12px] opacity-25">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 80 80">
          <g id="Icon">
            <path d="M40 8L72 40L40 72L8 40L40 8Z" stroke="#B07CC6" strokeWidth="1.6" />
          </g>
        </svg>
      </div>

      <div className="absolute left-[1120.35px] size-[96px] top-[640.98px] opacity-15">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 96 96">
          <g id="Icon">
            <path d={svgPaths.p3853cd80} stroke="#4460F7" strokeWidth="1.92" />
            <path d={svgPaths.p71ba400} stroke="#4460F7" strokeWidth="1.44" />
          </g>
        </svg>
      </div>

      <div className="absolute h-[128px] left-0 top-0 w-full opacity-25">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1431 128">
          <g clipPath="url(#clip_section8_top)">
            <path d={svgPaths.pa67000} stroke="#65BCB6" strokeWidth="5" />
          </g>
          <defs>
            <clipPath id="clip_section8_top">
              <rect fill="white" height="128" width="1431" />
            </clipPath>
          </defs>
        </svg>
      </div>

      <div className="absolute h-[160px] left-0 bottom-[160px] w-full opacity-25">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1431 160">
          <g clipPath="url(#clip_section8_bottom)">
            <path d={svgPaths.paee7380} stroke="#FFA18E" strokeWidth="10" />
          </g>
          <defs>
            <clipPath id="clip_section8_bottom">
              <rect fill="white" height="160" width="1431" />
            </clipPath>
          </defs>
        </svg>
      </div>

      <div className="absolute left-[71.55px] size-[128px] top-[1153.98px] opacity-15">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 128 128">
          <g id="Icon">
            <path d={svgPaths.p16dae400} stroke="#FFA18E" strokeDasharray="6.4 6.4" strokeWidth="1.28" />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default function Section8() {
  return (
    <div className="relative w-full bg-gradient-to-b from-[rgba(235,242,254,0.8)] via-[#ffffff] via-50% to-[rgba(235,242,254,0.8)]" style={{ minHeight: '1832px' }}>
      <BackgroundContainer />
      
      <motion.div 
        className="relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Pricing10 />
      </motion.div>
    </div>
  );
}
