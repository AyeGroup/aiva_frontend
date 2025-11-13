import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  id: number;
  type: "bot" | "user";
  text: string;
}

const messages: Message[] = [
  {
    id: 1,
    type: "bot",
    text: "سلام! من آیوا هستم، دستیار هوشمند این وب‌سایت. چطور می‌تونم کمکتون کنم؟",
  },
  {
    id: 2,
    type: "user",
    text: "سیاست مرجوعی تون چیه؟",
  },
  {
    id: 3,
    type: "bot",
    text: "تا ۷ روز کاری امکان برگشت کالا وجود داره. فقط به شرطی که کالا در شرایط اولیه و با برچسب اصلی باشه.",
  },
  {
    id: 4,
    type: "user",
    text: "هزینه ارسال به تهران چنده؟",
  },
];

export function AnimatedChat() {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    messages.forEach((message, index) => {
      const timeout = setTimeout(() => {
        setVisibleMessages((prev) => [...prev, message.id]);
      }, index * 2000); // هر پیام با 2 ثانیه تاخیر

      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, []);

  return (
    <div
      className="bg-white h-[403px] relative rounded-[16px] shrink-0 w-[534px]"
      data-name="AnimatedChatDemo"
    >
      <div className="content-stretch flex flex-col h-[403px] items-start overflow-clip relative rounded-[inherit] w-[534px]">
        <div
          className="h-[72px] relative shrink-0 w-full bg-gradient-to-r from-[#65BCB6] to-[#FFA18E]"
          data-name="Container"
        >
          <div className="size-full">
            <div className="box-border content-stretch flex flex-col h-[72px] items-start pb-0 pl-[441.227px] pr-[16px] pt-[16px] relative w-full">
              <div
                className="content-stretch flex flex-col h-[40px] items-start relative shrink-0 w-full"
                data-name="Container"
              >
                <div
                  className="h-[24px] relative shrink-0 w-full"
                  data-name="Container"
                >
                  <p
                    className="absolute font-['Vazirmatn:Medium',sans-serif] font-medium leading-[24px] left-[74.77px] text-[16px] text-nowrap text-right text-white top-[-0.5px] translate-x-[-100%] whitespace-pre"
                    dir="auto"
                  >
                    آیوا
                  </p>
                </div>
                <div
                  className="h-[16px] opacity-90 relative shrink-0 w-full"
                  data-name="Container"
                >
                  <p
                    className="absolute font-['Vazirmatn:Regular',sans-serif] font-normal leading-[16px] left-0 text-[12px] text-nowrap text-white top-[-0.5px] whitespace-pre"
                    dir="auto"
                  >
                    دستیار هوشمند
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="bg-[rgba(227,243,240,0.2)] h-[331px] relative shrink-0 w-full"
          data-name="Container"
        >
          <div className="overflow-clip rounded-[inherit] size-full">
            <div className="box-border content-stretch flex flex-col gap-[12px] h-[331px] items-start p-[12px] relative w-full overflow-y-auto">
              <AnimatePresence>
                {messages.map((message) => {
                  if (!visibleMessages.includes(message.id)) return null;

                  if (message.type === "bot") {
                    return (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative shrink-0 w-full"
                        data-name="Card1"
                      >
                        <div className="flex flex-row items-center justify-end overflow-clip rounded-[inherit] size-full">
                          <div className="box-border content-stretch flex gap-[10px] items-center justify-end px-[10px] py-0 relative w-full">
                            <div
                              className="bg-white box-border content-stretch flex gap-[10px] items-center justify-center p-[12px] relative rounded-[24px] shrink-0"
                              data-name="Container"
                            >
                              <div
                                aria-hidden="true"
                                className="absolute border border-gray-300 border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]"
                              />
                              <p
                                className="font-['Vazirmatn:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-gray-700 text-right max-w-[330px]"
                                dir="auto"
                              >
                                {message.text}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  } else {
                    return (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative shrink-0 w-full"
                        data-name="Card1"
                      >
                        <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                          <div className="box-border content-stretch flex gap-[10px] items-center px-[10px] py-0 relative w-full">
                            <div
                              className="bg-[#65bcb6] box-border content-stretch flex gap-[10px] items-center justify-center p-[12px] relative rounded-[24px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0"
                              data-name="Container"
                            >
                              <p
                                className="font-['Vazirmatn:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-right text-white"
                                dir="auto"
                              >
                                {message.text}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  }
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute border border-gray-300 border-solid inset-0 pointer-events-none rounded-[16px]"
      />
    </div>
  );
}
