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
      }, index * 2000);

      timeouts.push(timeout);
    });

    return () => timeouts.forEach((t) => clearTimeout(t));
  }, []);

  return (
    <div className="w-full h-full bg-white border min-h-full rounded-2xl relative flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex flex-col px-4 py-3 bg-gradient-to-r from-[#65BCB6] to-[#FFA18E] rounded-t-2xl">
        <span className="font-medium text-white text-right">آیوا</span>
        <span className="text-sm text-white text-right opacity-90">
          دستیار هوشمند
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-[rgba(227,243,240,0.2)]">
        <AnimatePresence>
          {messages.map((message) => {
            if (!visibleMessages.includes(message.id)) return null;

            const isBot = message.type === "bot";
            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`flex ${isBot ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`p-3 rounded-lg shadow max-w-[80%] border border-gray-200 ${
                    isBot ? "bg-white text-gray-700" : "bg-[#65bcb6] text-white"
                  }`}
                >
                  {message.text}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
