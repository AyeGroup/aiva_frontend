"use client";
import svgPaths from "../svg/svg-361u53sh5d";
import svgPaths2 from "../svg/svg-2ojg9bngif";
import { motion } from "motion/react";
import { AnimatedChat } from "./AnimatedChat";

function BackgroundIcon() {
  return (
    <motion.div
      className="absolute left-[214.65px] size-20 top-[831px]"
      data-name="Icon"
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, 0, -5, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 80 80"
      >
        <g id="Icon" opacity="0.3">
          <path
            d="M40 8L72 72H8L40 8Z"
            fill="var(--fill-0, #B07CC6)"
            id="Vector"
          />
        </g>
      </svg>
    </motion.div>
  );
}

function BackgroundIcon1() {
  return (
    <div
      className="absolute h-[400px] left-[849px] top-[375px] w-[600px]"
      data-name="Icon"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 600 400"
      >
        <defs>
          <clipPath id="clip0_0_6266">
            <rect fill="white" height="400" width="600" />
          </clipPath>
        </defs>
        <g clipPath="url(#clip0_0_6266)" id="Icon" opacity="0.25">
          <motion.g
            animate={{
              x: [0, 15, 0, -15, 0],
              y: [0, -10, 0, 10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <path
              d={svgPaths2.p81e7400}
              id="Vector"
              stroke="#65BCB6"
              strokeWidth="2"
            />
          </motion.g>
          <motion.g
            animate={{
              x: [0, -15, 0, 15, 0],
              y: [0, 10, 0, -10, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <path
              d={svgPaths2.p27f4bc00}
              id="Vector_2"
              stroke="#FFA18E"
              strokeWidth="2"
            />
          </motion.g>
        </g>
      </svg>
    </div>
  );
}

function BackgroundIcon2() {
  return (
    <motion.div
      className="absolute left-[1282px] size-24 top-[19px]"
      data-name="Icon"
      animate={{
        rotate: [0, 360],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 96 96"
      >
        <g id="Icon" opacity="0.3">
          <path
            d={svgPaths2.p283c7e80}
            fill="var(--fill-0, #65BCB6)"
            id="Vector"
          />
        </g>
      </svg>
    </motion.div>
  );
}

function BackgroundIcon3() {
  return (
    <motion.div
      className="absolute left-[913px] size-[64px] top-[142px]"
      data-name="Icon"
      animate={{
        rotate: [0, -10, 0, 10, 0],
        y: [0, -15, 0, 15, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 64 64"
      >
        <g clipPath="url(#clip0_0_6908)" id="Icon" opacity="0.3">
          <path
            d={svgPaths2.pff02b00}
            fill="var(--fill-0, #FFA18E)"
            id="Vector"
          />
        </g>
        <defs>
          <clipPath id="clip0_0_6908">
            <rect fill="white" height="64" width="64" />
          </clipPath>
        </defs>
      </svg>
    </motion.div>
  );
}

function BackgroundDecorations() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      data-name="BackgroundDecorations"
    >
      <BackgroundIcon />
      <BackgroundIcon1 />
      <BackgroundIcon2 />
      <BackgroundIcon3 />
    </div>
  );
}

export default function Section1() {
  return (
    <div
      className="content-stretch flex flex-col gap-2.5 items-center justify-center relative w-full"
      id="Section1"
    >
      <div className="bg-white relative shrink-0 w-full" id="Hero">
        <BackgroundDecorations />
        <div className="flex flex-col items-end justify-center overflow-clip rounded-[inherit] size-full">
          <div className="box-border content-stretch bg-green-400 flex flex-col gap-2.5 items-end justify-center px-10 py-20  w-full">
            <div
              className="  bg-red-500 flex gap-16 items-center relative  w-full"
              data-name="Container"
            >
              <div
                className="basis-0 content-stretch flex flex-col gap-8 grow items-end min-h-px min-w-px relative shrink-0 bg "
                data-name="Container"
              >
                <div
                  className="bg-[#e3f4f1] h-9 relative rounded-[1.67772e+07px] shrink-0 w-[228.953px]"
                  data-name="Container"
                >
                  <div
                    className="absolute h-5 left-4 top-2 w-[180.953px]"
                    data-name="Text"
                  >
                    <p
                      className="absolute  font-medium leading-5 left-[181px] text-[#65bcb6] text-[14px] text-nowrap text-right top-0 -translate-x-full whitespace-pre"
                      dir="auto"
                    >
                      جدیدترین فناوری هوش مصنوعی
                    </p>
                  </div>
                  <div
                    className="absolute bg-[#65bcb6] content-stretch flex flex-col items-start left-[204.95px] rounded-[1.67772e+07px] size-2 top-3.5"
                    data-name="Container"
                  >
                    <div
                      className="bg-[#65bcb6] h-2 rounded-[1.67772e+07px] shrink-0 w-full"
                      data-name="Container"
                    />
                  </div>
                </div>
                <div
                  className="h-[267.188px] relative shrink-0 w-full"
                  data-name="Header"
                >
                  <div
                    className="absolute h-[147.188px] left-0 top-0 w-[584px]"
                    data-name="Heading 1"
                  >
                    <p
                      className="absolute   font-extrabold leading-[73.6px] left-[584.43px] text-[64px] text-gray-900 text-right top-[0.5px] tracking-[-1.28px] -translate-x-full w-[526px]"
                      dir="auto"
                    >
                      دستیار هوشمند برای هر وب‌سایتی
                    </p>
                  </div>
                  <div
                    className="absolute h-24 left-2 top-[171.19px] w-xl"
                    data-name="Paragraph"
                  >
                    <p
                      className="absolute  font-normal leading-8 left-[576.39px] text-5 text-gray-600 text-right top-[-0.5px] -translate-x-full w-[550px]"
                      dir="auto"
                    >
                      آیوا در چند دقیقه به سایت شما وصل می‌شود، بر اساس محتوای
                      شما آموزش می‌بیند، به فارسی و چندزبان پاسخ می‌دهد و
                      سرنخ‌های فروش را جمع می‌کند.
                    </p>
                  </div>
                </div>
                <div
                  className="h-[45px] relative shrink-0 w-full"
                  data-name="Container"
                >
                  <div
                    aria-hidden="true"
                    className="absolute border-[1px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none"
                  />
                  <div
                    className="absolute content-stretch flex gap-2 h-5 items-center left-[409.66px] top-[25px] w-[174.336px]"
                    data-name="Container"
                  >
                    <div
                      className="basis-0 grow h-5 min-h-px min-w-px relative shrink-0"
                      data-name="Text"
                    >
                      <div className="bg-clip-padding border-0 border-transparent border-solid box-border h-5 relative w-full">
                        <p
                          className="absolute   font-normal leading-5 left-[151px] text-[14px] text-gray-500 text-right top-0 -translate-x-full w-[151px]"
                          dir="auto"
                        >
                          بیش از ۱۰۰۰ کسب‌وکار فعال
                        </p>
                      </div>
                    </div>
                    <div className="relative shrink-0 size-4" data-name="Icon">
                      <svg
                        className="block size-full"
                        fill="none"
                        preserveAspectRatio="none"
                        viewBox="0 0 16 16"
                      >
                        <g id="Icon">
                          <path
                            d={svgPaths.p39be50}
                            id="Vector"
                            stroke="var(--stroke-0, #6B7280)"
                            strokeWidth="1.33333"
                          />
                        </g>
                      </svg>
                    </div>
                  </div>
                  <div
                    className="absolute content-stretch flex gap-2 h-5 items-center left-[211.81px] top-[25px] w-[173.859px]"
                    data-name="Container"
                  >
                    <div
                      className="basis-0 grow h-5 min-h-px min-w-px relative shrink-0"
                      data-name="Text"
                    >
                      <div className="bg-clip-padding border-0 border-transparent border-solid box-border h-5 relative w-full">
                        <p
                          className="absolute  font-normal leading-5 left-[150px] text-[14px] text-gray-500 text-right top-0 -translate-x-full w-[150px]"
                          dir="auto"
                        >
                          راه‌اندازی در کمتر از ۵ دقیقه
                        </p>
                      </div>
                    </div>
                    <div className="relative shrink-0 size-4" data-name="Icon">
                      <svg
                        className="block size-full"
                        fill="none"
                        preserveAspectRatio="none"
                        viewBox="0 0 16 16"
                      >
                        <g id="Icon">
                          <path
                            d={svgPaths.p39be50}
                            id="Vector"
                            stroke="var(--stroke-0, #6B7280)"
                            strokeWidth="1.33333"
                          />
                        </g>
                      </svg>
                    </div>
                  </div>
                  <div
                    className="absolute content-stretch flex gap-2 h-5 items-center left-[82.83px] top-[25px] w-[104.977px]"
                    data-name="Container"
                  >
                    <div
                      className="basis-0 grow h-5 min-h-px min-w-px relative shrink-0"
                      data-name="Text"
                    >
                      <div className="bg-clip-padding border-0 border-transparent border-solid box-border h-5 relative w-full">
                        <p
                          className="absolute  font-normal leading-5 left-[81px] text-[14px] text-gray-500 text-right top-0 -translate-x-full w-[81px]"
                          dir="auto"
                        >
                          پشتیبانی ۲۴/۷
                        </p>
                      </div>
                    </div>
                    <div className="relative shrink-0 size-4" data-name="Icon">
                      <svg
                        className="block size-full"
                        fill="none"
                        preserveAspectRatio="none"
                        viewBox="0 0 16 16"
                      >
                        <g id="Icon">
                          <path
                            d={svgPaths.p39be50}
                            id="Vector"
                            stroke="var(--stroke-0, #6B7280)"
                            strokeWidth="1.33333"
                          />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="content-stretch flex flex-col gap-2.5 items-start relative shrink-0 w-[584px]"
                data-name="Container"
              >
                <div
                  className="bg-white relative rounded-2xl shrink-0 w-full"
                  data-name="Container"
                >
                  <div
                    aria-hidden="true"
                    className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-2xl shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
                  />
                  <div className="size-full">
                    <div className="box-border content-stretch flex flex-col gap-2.5 items-start pb-[25px] pt-8 px-[25px] relative w-full">
                      <AnimatedChat />
                      <div
                        className="absolute bg-[#65bcb6] box-border content-stretch flex flex-col h-9 items-center left-[485px] px-4 py-2 rounded-5 shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)] top-[-11px] w-[110px]"
                        data-name="Container"
                      >
                        <div
                          className="content-stretch flex gap-2 h-5 items-center justify-end relative shrink-0 w-full"
                          data-name="Container"
                        >
                          <div
                            className="relative shrink-0 w-[56.875px]"
                            data-name="Text"
                          >
                            <div className="bg-clip-padding border-0 border-transparent border-solid box-border content-stretch flex gap-2.5 items-center justify-center relative w-[56.875px]">
                              <p
                                className="  font-semibold leading-5 relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre"
                                dir="auto"
                              >
                                پیش نمایش
                              </p>
                            </div>
                          </div>
                          <div
                            className="bg-white relative rounded-[1.67772e+07px] shrink-0 size-2"
                            data-name="Container"
                          >
                            <div className="bg-clip-padding border-0 border-transparent border-solid box-border size-2" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="absolute bg-yellow-400 bg-linear-to-b from-[#65bcb6] h-[239px] left-[1374px] opacity-20 to-[rgba(0,0,0,0)] top-[165px] w-1"
              data-name="Container"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
