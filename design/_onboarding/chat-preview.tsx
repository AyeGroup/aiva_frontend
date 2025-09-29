import { useState, useEffect } from 'react';
import { BotConfig } from './onboarding';
import { onboardingData } from './onboarding.data';
// import aivaLogo from "/logo.png";

interface ChatPreviewProps {
  botConfig: BotConfig;
  currentStep: number;
}

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export function ChatPreview({ botConfig, currentStep }: ChatPreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Sample conversations based on current step
  const getSampleMessages = (step: number): Message[] => {
    const base: Message[] = [
      {
        id: '1',
        text: botConfig.welcomeMessage,
        isBot: true,
        timestamp: new Date()
      }
    ];

    if (step >= 2) {
      base.push({
        id: '2',
        text: 'محصولات شما چه هستند؟',
        isBot: false,
        timestamp: new Date()
      });
      
      if (botConfig.knowledge.length > 0) {
        base.push({
          id: '3',
          text: 'ما خدمات مختلفی ارائه می‌دهیم. می‌توانم اطلاعات دقیق‌تری درباره هر کدام بدهم.',
          isBot: true,
          timestamp: new Date()
        });
      } else {
        base.push({
          id: '3',
          text: 'پس از اضافه کردن پایگاه دانش، می‌توانم پاسخ‌های دقیق‌تری بدهم.',
          isBot: true,
          timestamp: new Date()
        });
      }
    }

    if (step >= 4) {
      base.push({
        id: '4',
        text: 'چطور می‌تونم سفارش بدم؟',
        isBot: false,
        timestamp: new Date()
      });
      
      base.push({
        id: '5',
        text: 'می‌توانید از طریق سایت ما سفارش دهید یا با شماره پشتیبانی تماس بگیرید.',
        isBot: true,
        timestamp: new Date()
      });
    }

    return base;
  };

  useEffect(() => {
    const newMessages = getSampleMessages(currentStep);
    setMessages(newMessages);
  }, [currentStep, botConfig.welcomeMessage, botConfig.knowledge.length]);

  // Get current tone example
  const currentTone = onboardingData.tones.find(t => t.id === botConfig.tone);

  // Simulate typing when bot sends message
  const simulateTyping = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 1500);
  };

  useEffect(() => {
    if (isOpen && messages.length > 0) {
      simulateTyping();
    }
  }, [isOpen]);

  return (
    <div className="chat-preview-container">
      {/* Preview Header */}
      <div className="mb-4">
        <h3 className="text-grey-900 mb-2">پیش‌نمایش زنده</h3>
        <p className="text-grey-600 text-sm">
          تغییرات شما فوراً در چت‌بات اعمال می‌شود
        </p>
      </div>

      {/* Mobile Mockup */}
      <div className="relative flex items-center justify-center">
        {/* Enhanced Phone Frame - Larger Size */}
        {/* Real-size Website Preview */}
        <div
          className="w-full max-w-6xl mx-auto relative overflow-hidden rounded-2xl shadow-xl border border-grey-200"
          style={{
            height: "700px",
            background: "var(--sharp-emerald)",
            opacity: 0.1,
          }}
        >
          {/* Enhanced fake website content */}
          <div className="p-8 space-y-6">
            {/* Header simulation */}
            <div className="flex items-center justify-between">
              <div className="h-6 bg-grey-200 rounded w-32"></div>
              <div className="flex gap-4">
                <div className="h-4 bg-grey-100 rounded w-16"></div>
                <div className="h-4 bg-grey-100 rounded w-20"></div>
                <div className="h-4 bg-grey-100 rounded w-18"></div>
              </div>
            </div>

            {/* Main content simulation */}
            <div className="space-y-4">
              <div className="h-8 bg-grey-200 rounded w-3/4"></div>
              <div className="h-5 bg-grey-100 rounded w-1/2"></div>
              <div className="h-32 bg-grey-100 rounded-lg"></div>

              <div className="grid grid-cols-3 gap-6">
                <div className="h-24 bg-grey-100 rounded-lg"></div>
                <div className="h-24 bg-grey-100 rounded-lg"></div>
                <div className="h-24 bg-grey-100 rounded-lg"></div>
              </div>

              <div className="space-y-3">
                <div className="h-4 bg-grey-100 rounded w-full"></div>
                <div className="h-4 bg-grey-100 rounded w-4/5"></div>
                <div className="h-4 bg-grey-100 rounded w-3/5"></div>
                <div className="h-4 bg-grey-100 rounded w-2/3"></div>
              </div>
            </div>
          </div>

          {/* Modern Chat Widget */}
          <div
            className={`absolute transition-all duration-300 ${
              botConfig.branding.position === "bottom-left"
                ? "bottom-8 left-8"
                : "bottom-8 right-8"
            }`}
          >
            {/* Modern Chat Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`
                relative flex items-center justify-center transition-all duration-300 shadow-xl hover:shadow-2xl
                ${
                  botConfig.branding.size === "small"
                    ? "w-14 h-14"
                    : botConfig.branding.size === "large"
                    ? "w-20 h-20"
                    : "w-16 h-16"
                }
                rounded-2xl hover:scale-105 group
              `}
              style={{ backgroundColor: botConfig.color }}
            >
              {!isOpen ? (
                <svg
                  className="w-7 h-7 text-white transition-transform group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}

              {/* Modern Notification Badge */}
              <div
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center shadow-lg animate-pulse"
                style={{ background: "var(--sharp-coral)" }}
              >
                <span className="text-white text-xs font-bold">1</span>
              </div>
            </button>

            {/* Modern Chat Window */}
            {isOpen && (
              <div className="absolute bottom-24 right-0 w-96 h-[500px] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 flex flex-col overflow-hidden animate-soft">
                {/* Modern Chat Header */}
                <div
                  className="relative p-4 text-white flex items-center gap-4 backdrop-blur-sm"
                  style={{
                    background: `linear-gradient(135deg, ${botConfig.color} 0%, ${botConfig.color}ee 100%)`,
                    height: "80px",
                    width: "300px",
                  }}
                >
                  {/* Bot Avatar */}
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg overflow-hidden">
                    <img
                      src="/logo.png"
                      alt="آیوا"
                      className="w-10 h-10 object-cover"
                    />
                  </div>

                  {/* Bot Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold truncate text-lg text-right">
                      {botConfig.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <p className="text-sm opacity-90 text-right">
                        آنلاین و آماده پاسخ
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="w-10 h-10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105"
                      title="بستن"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Modern Messages Area */}
                <div
                  className="flex-1 p-6 space-y-4 overflow-y-auto"
                  style={{ background: "var(--sharp-cyan)", opacity: 0.05 }}
                >
                  {messages.map((message, index) => (
                    <div
                      key={message.id}
                      className={`flex items-end gap-3 ${
                        message.isBot ? "justify-start" : "justify-end"
                      }`}
                      style={{
                        animationDelay: `${index * 0.1}s`,
                      }}
                    >
                      {/* Bot Avatar for Bot Messages */}
                      {message.isBot && (
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm mb-1 overflow-hidden"
                          style={{ backgroundColor: `${botConfig.color}20` }}
                        >
                          <img
                            src="/logo.png"
                            alt="آیوا"
                            className="w-6 h-6 object-cover"
                          />
                        </div>
                      )}

                      {/* Message Bubble */}
                      <div
                        className={`
                          max-w-[75%] px-4 py-3 text-sm leading-relaxed shadow-sm
                          ${
                            message.isBot
                              ? "bg-white border border-grey-100 text-grey-800 rounded-2xl rounded-bl-md"
                              : "text-white rounded-2xl rounded-br-md"
                          }
                        `}
                        style={
                          !message.isBot
                            ? {
                                background: `linear-gradient(135deg, ${botConfig.color} 0%, ${botConfig.color}dd 100%)`,
                              }
                            : {}
                        }
                      >
                        {message.text}

                        {/* Message Time */}
                        <div
                          className={`text-xs mt-1 opacity-70 ${
                            message.isBot ? "text-grey-500" : "text-white/70"
                          }`}
                        >
                          {new Date().toLocaleTimeString("fa-IR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Modern Typing Indicator */}
                  {isTyping && (
                    <div className="flex items-end gap-3 justify-start">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm mb-1 overflow-hidden"
                        style={{ backgroundColor: `${botConfig.color}20` }}
                      >
                        <img
                          src="/logo.png"
                          alt="آیوا"
                          className="w-6 h-6 object-cover"
                        />
                      </div>
                      <div className="bg-white border border-grey-100 px-5 py-3 rounded-2xl rounded-bl-md shadow-sm">
                        <div className="flex gap-1">
                          <div
                            className="w-2 h-2 rounded-full animate-bounce"
                            style={{ backgroundColor: `${botConfig.color}60` }}
                          ></div>
                          <div
                            className="w-2 h-2 rounded-full animate-bounce"
                            style={{
                              backgroundColor: `${botConfig.color}60`,
                              animationDelay: "0.1s",
                            }}
                          ></div>
                          <div
                            className="w-2 h-2 rounded-full animate-bounce"
                            style={{
                              backgroundColor: `${botConfig.color}60`,
                              animationDelay: "0.2s",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Modern Input Area */}
                <div className="p-4 bg-white/80 backdrop-blur-sm border-t border-grey-100">
                  <div className="flex items-center gap-3">
                    <button className="w-10 h-10 text-grey-400 hover:text-grey-600 rounded-xl hover:bg-grey-100 flex items-center justify-center transition-all duration-200">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                        />
                      </svg>
                    </button>

                    <input
                      type="text"
                      placeholder="پیام خود را بنویسید..."
                      className="flex-1 px-4 py-3 bg-grey-50 border border-grey-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                      style={
                        {
                          "--tw-ring-color": `${botConfig.color}40`,
                        } as React.CSSProperties
                      }
                      disabled
                    />

                    <button
                      className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:opacity-50"
                      style={{ backgroundColor: botConfig.color }}
                      disabled
                    >
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex items-center gap-2 mt-3">
                    <button className="text-xs px-3 py-1.5 bg-grey-100 hover:bg-grey-200 rounded-full text-grey-600 transition-colors">
                      👋 سلام
                    </button>
                    <button className="text-xs px-3 py-1.5 bg-grey-100 hover:bg-grey-200 rounded-full text-grey-600 transition-colors">
                      💡 راهنمایی
                    </button>
                    <button className="text-xs px-3 py-1.5 bg-grey-100 hover:bg-grey-200 rounded-full text-grey-600 transition-colors">
                      📞 تماس
                    </button>
                  </div>
                </div>

                {/* Powered by */}
                <div className="px-4 py-2 text-center">
                  <p className="text-xs text-grey-400">
                    راه‌اندازی شده با{" "}
                    <span className="font-medium text-brand-primary">آیوا</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Preview Instruction - Clean & Minimal */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
            💬 کلیک کنید تا چت‌بات را ببینید
          </div>
        </div>
      </div>
    </div>
  );
}