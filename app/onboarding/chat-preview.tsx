import { useState, useEffect } from "react";
// import { BotConfig } from "./page";
import { onboardingData } from "./onboarding.data";
import aivaLogo from "@/public/logo.png";
import Image from "next/image";
import { BotConfig } from "@/types/common";

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
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedKnowledgeItem, setSelectedKnowledgeItem] = useState<
    string | null
  >(null);

  // Get tone-based responses
  const getToneBasedResponses = (tone: string) => {
    const responses = {
      friendly: {
        productInfo:
          "البته! ما خدمات مختلفی داریم 😊 برای اطلاعات دقیق‌تر خوشحال می‌شم راهنماییتون کنم!",
        orderHelp:
          "آره حتماً! می‌تونید از سایت ما سفارش بدید یا اگر سؤالی داشتید باهام چت کنید 🛒",
        noKnowledge: "هنوز داده‌ای بهم ندادید، ولی خوشحال می‌شم کمکتون کنم! 😊",
        fallback: "ببخشید، این رو نمی‌دونم. کمی صبر کنین تا یاد بگیرم!",
      },
      professional: {
        productInfo:
          "ما طیف کاملی از خدمات را ارائه می‌دهیم. لطفاً زمینه مورد نظر خود را مشخص کنید.",
        orderHelp:
          "برای ثبت سفارش، می‌توانید از وب‌سایت ما اقدام کنید یا با واحد فروش تماس بگیرید.",
        noKnowledge:
          "پس از تکمیل پایگاه دانش، قادر به ارائه پاسخ‌های دقیق‌تر خواهم بود.",
        fallback:
          "متأسفانه اطلاعات کافی در این زمینه ندارم. لطفاً با متخصصان ما تماس بگیرید.",
      },
      casual: {
        productInfo:
          "اوه خب! چیزای خوبی داریم 😄 بگو دنبال چی هستی تا بهتر کمکت کنم!",
        orderHelp: "راحته! برو سایت و سفارش بده، یا اگر گیر کردی بهم بگو!",
        noKnowledge: "هنوز چیزی یاد نداده‌ن بهم! ولی بزودی حرف‌حسابی می‌شم 😎",
        fallback: "آخ! این رو نمی‌دونم 🤔 بزودی یاد می‌گیرم ولی!",
      },
      expert: {
        productInfo:
          "بر اساس تحلیل نیازهای شما، می‌توانم راهکارهای مناسب را ارائه دهم. دقیقاً به دنبال چه نوع محصولی هستید؟",
        orderHelp:
          "فرآیند سفارش‌گیری ما شامل مراحل ثبت، بررسی، تأیید و ارسال است. کدام مرحله نیاز به توضیح دارد؟",
        noKnowledge:
          "سیستم نیاز به ورود داده‌های تخصصی دارد تا بتواند پاسخ‌های مبتنی بر دانش ارائه دهد.",
        fallback:
          "این موضوع خارج از حوزه تخصصی فعلی من است. لطفاً با کارشناس مربوطه مشورت کنید.",
      },
    };

    return responses[tone as keyof typeof responses] || responses.friendly;
  };

  // Handle knowledge item click
  const handleKnowledgeClick = (item: any) => {
    setSelectedKnowledgeItem(item.id);

    // Add user question
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: item.title,
      isBot: false,
      timestamp: new Date(),
    };

    // Add bot response
    const botResponse: Message = {
      id: `bot-${Date.now()}`,
      text:
        item.content || item.url || "این موضوع در پایگاه دانش ما ثبت شده است.",
      isBot: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage, botResponse]);

    // Simulate typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  };

  // Sample conversations based on current step and tone
  const getSampleMessages = (step: number): Message[] => {
    const toneResponses = getToneBasedResponses(botConfig.tone);

    const base: Message[] = [
      {
        id: "1",
        text:
          botConfig.greetings ||
          currentTone?.example ||
          "سلام! چطور می‌تونم کمکتون کنم؟",
        isBot: true,
        timestamp: new Date(),
      },
    ];

    if (step >= 2 && botConfig.llm_model.length > 0) {
      // if (step >= 2 && botConfig.knowledge.length > 0) {
      base.push({
        id: "2",
        text: "سوال‌های متداول را می‌بینم!",
        isBot: false,
        timestamp: new Date(),
      });

      base.push({
        id: "3",
        text: "بله! از دکمه‌های زیر می‌توانید سوال‌های رایج را انتخاب کنید.",
        isBot: true,
        timestamp: new Date(),
      });
    } else if (step >= 2) {
      base.push({
        id: "2",
        text: "محصولات شما چه هستند؟",
        isBot: false,
        timestamp: new Date(),
      });

      base.push({
        id: "3",
        text: toneResponses.noKnowledge,
        isBot: true,
        timestamp: new Date(),
      });
    }

    return base;
  };

  useEffect(() => {
    const newMessages = getSampleMessages(currentStep);
    setMessages(newMessages);
    setSelectedKnowledgeItem(null); // Reset selection when step changes
  }, [currentStep, botConfig.greetings, botConfig.llm_model.length]);
  // }, [currentStep, botConfig.greetings, botConfig.knowledge.length]);

  // Get current tone example
  const currentTone = onboardingData.tones.find((t) => t.id === botConfig.tone);

  // Simulate typing when bot sends message
  const simulateTyping = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 1500);
  };

  useEffect(() => {
    if (messages.length > 0) {
      simulateTyping();
    }
  }, [messages]);

  const chatButtonSize =
    botConfig.button_size === "small"
      ? "50px"
      : botConfig.button_size === "large"
      ? "70px"
      : "60px";
  const chatButtonFontSize =
    botConfig.button_size === "small"
      ? "16px"
      : botConfig.button_size === "large"
      ? "24px"
      : "20px";

  // Get tone-based styling
  const getToneStyles = (tone: string) => {
    const styles = {
      friendly: {
        messageClass: "rounded-2xl",
        headerStyle: "rounded-2xl",
        emoji: "😊",
      },
      professional: {
        messageClass: "rounded-lg",
        headerStyle: "rounded-lg",
        emoji: "💼",
      },
      casual: {
        messageClass: "rounded-3xl",
        headerStyle: "rounded-3xl",
        emoji: "😎",
      },
      expert: {
        messageClass: "rounded-lg",
        headerStyle: "rounded-lg",
        emoji: "🎓",
      },
    };

    return styles[tone as keyof typeof styles] || styles.friendly;
  };

  const toneStyles = getToneStyles(botConfig.tone);

  return (
    <div className="chat-preview-container">
      {/* Enhanced Preview Header with Live Indicator */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-grey-900">پیش‌نمایش زنده</h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-sharp-emerald rounded-full animate-pulse"></div>
            <span className="text-sharp-emerald text-sm font-medium">فعال</span>
          </div>
        </div>

        {/* Current Settings Display */}
        <div className="flex items-center gap-4 mb-2">
          {currentTone && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-grey-500">لحن:</span>
              <span className="text-xs px-2 py-1 bg-brand-primary/10 text-brand-primary rounded-full">
                {currentTone.name}
              </span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <span className="text-xs text-grey-500">رنگ:</span>
            <div
              className="w-3 h-3 rounded-full border border-grey-200"
              style={{ backgroundColor: botConfig.color }}
            ></div>
          </div>
        </div>

        <p className="text-grey-600 text-sm text-right">
          تغییرات شما بلافاصله در چت‌بات نمایش داده می‌شود
        </p>
      </div>

      {/* Single Column Layout: Live Chat Only */}
      <div className="max-w-md mx-auto relative">
        {/* Update Flash Effect Overlay */}
        <div
          key={`${botConfig.color}-${botConfig.name}-${botConfig.widget_position}-${botConfig.button_size}`}
          className="absolute inset-0 bg-brand-primary/10 rounded-2xl opacity-0 pointer-events-none z-50"
        ></div>

        {/* Live Chat Widget - Centered */}
        <div>
          <div className="sticky top-0">
            {/* Chat Widget Container */}
            <div
              className="w-full bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-grey-200 flex flex-col overflow-hidden"
              style={{ height: "700px" }}
            >
              {/* Chat Header */}
              <div
                className={`relative p-4 text-white flex items-center gap-4 backdrop-blur-sm ${toneStyles.headerStyle}`}
                style={{
                  background: `linear-gradient(135deg, ${botConfig.color} 0%, ${botConfig.color}ee 100%)`,
                  height: "80px",
                }}
              >
                {/* Bot Avatar */}
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden border-2 border-white/30">
                  <Image
                    src="/logo.png"
                    height={64}
                    width={64}
                    alt="آیوا"
                    className="w-8 h-8 object-cover rounded-full"
                  />
                </div>

                {/* Bot Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 justify-start">
                    <h4 className="font-semibold truncate text-lg">
                      {botConfig.name}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 mt-1 justify-start">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <p className="text-sm opacity-90">آنلاین و آماده پاسخ</p>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-grey-50">
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className={`flex items-end gap-3 ${
                      message.isBot ? "justify-start" : "justify-end"
                    }`}
                  >
                    {/* Bot Avatar for Bot Messages */}
                    {message.isBot && (
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm mb-1 overflow-hidden"
                        style={{ backgroundColor: `${botConfig.color}20` }}
                      >
                        <Image
                          src="/logo.png"
                          height={64}
                          width={64}
                          alt="آیوا"
                          className="w-6 h-6 object-cover"
                        />
                      </div>
                    )}

                    {/* Message Bubble */}
                    <div
                      className={`
                        max-w-[75%] px-4 py-3 text-sm leading-relaxed shadow-sm text-right
                        ${
                          message.isBot
                            ? `bg-white border border-grey-100 text-grey-800 ${
                                toneStyles.messageClass
                              } ${
                                toneStyles.messageClass === "rounded-2xl"
                                  ? "rounded-bl-md"
                                  : toneStyles.messageClass === "rounded-3xl"
                                  ? "rounded-bl-xl"
                                  : "rounded-bl-sm"
                              }`
                            : `text-white ${toneStyles.messageClass} ${
                                toneStyles.messageClass === "rounded-2xl"
                                  ? "rounded-br-md"
                                  : toneStyles.messageClass === "rounded-3xl"
                                  ? "rounded-br-xl"
                                  : "rounded-br-sm"
                              }`
                        }
                      `}
                      style={
                        !message.isBot
                          ? {
                              background: `linear-gradient(135deg, ${botConfig.color} 0%, ${botConfig.color}dd 100%)`,
                            }
                          : {}
                      }
                      dir="rtl"
                    >
                      {message.isBot
                        ? currentTone?.example || message.text
                        : message.text}

                      {/* Message Time */}
                      <div
                        className={`text-xs mt-1 opacity-70 text-right ${
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

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex items-end gap-3 justify-start">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm mb-1 overflow-hidden"
                      style={{ backgroundColor: `${botConfig.color}20` }}
                    >
                      <Image
                        src="/logo.png"
                        height={64}
                        width={64}
                        alt="آیوا"
                        className="w-6 h-6 object-cover"
                      />
                    </div>
                    <div
                      className={`bg-white border border-grey-100 px-5 py-3 shadow-sm ${
                        toneStyles.messageClass
                      } ${
                        toneStyles.messageClass === "rounded-2xl"
                          ? "rounded-bl-md"
                          : toneStyles.messageClass === "rounded-3xl"
                          ? "rounded-bl-xl"
                          : "rounded-bl-sm"
                      }`}
                    >
                      <div className="flex gap-1 items-center">
                        <span className="text-xs text-grey-500 ml-2">
                          {toneStyles.emoji}
                        </span>
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

              {/* Input Area */}
              <div className="p-4 bg-white/80 backdrop-blur-sm border-t border-grey-100">
                {/* Knowledge Base Quick Actions */}
                {botConfig.llm_model.length > 0 && currentStep >= 2 && (
                  // elham
                  // {botConfig.knowledge.length > 0 && currentStep >= 2 && (
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-2">
                      {/* elham */}
                      {/* {botConfig.knowledge.slice(0, 3).map((item) => {
                        const icon =
                          item.type === "faq"
                            ? "❓"
                            : item.type === "document"
                            ? "📄"
                            : item.type === "url"
                            ? "🔗"
                            : "📝";

                        return (
                          <button
                            key={item.id}
                            onClick={() => handleKnowledgeClick(item)}
                            className={`text-xs px-3 py-1.5 bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary rounded-full max-w-[200px] truncate ${toneStyles.messageClass}`}
                            title={item.title}
                          >
                            {icon} {item.title}
                          </button>
                        );
                      })} */}

                      {Number(botConfig.answer_length) > 3 && (
                        <button className="text-xs px-3 py-1.5 bg-grey-100 hover:bg-grey-200 rounded-full text-grey-600">
                          +{Number(botConfig.answer_length) - 3} بیشتر
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Default Quick Actions - Only show if no knowledge base */}
                {/* {(botConfig.knowledge.length === 0 || currentStep < 2) && ( */}
                {(Number(botConfig.answer_length) === 0 || currentStep < 2) && (
                  <div className="flex items-center gap-2 mb-3">
                    {botConfig.tone === "friendly" && (
                      <>
                        <button className="text-xs px-3 py-1.5 bg-grey-100 hover:bg-grey-200 rounded-full text-grey-600">
                          👋 سلام
                        </button>
                        <button className="text-xs px-3 py-1.5 bg-grey-100 hover:bg-grey-200 rounded-full text-grey-600">
                          😊 کمک
                        </button>
                        <button className="text-xs px-3 py-1.5 bg-grey-100 hover:bg-grey-200 rounded-full text-grey-600">
                          💬 چت
                        </button>
                      </>
                    )}
                    {botConfig.tone === "professional" && (
                      <>
                        <button className="text-xs px-3 py-1.5 bg-grey-100 hover:bg-grey-200 rounded-lg text-grey-600">
                          📋 خدمات
                        </button>
                        <button className="text-xs px-3 py-1.5 bg-grey-100 hover:bg-grey-200 rounded-lg text-grey-600">
                          📞 تماس
                        </button>
                        <button className="text-xs px-3 py-1.5 bg-grey-100 hover:bg-grey-200 rounded-lg text-grey-600">
                          💼 مشاوره
                        </button>
                      </>
                    )}
                    {botConfig.tone === "casual" && (
                      <>
                        <button className="text-xs px-3 py-1.5 bg-grey-100 hover:bg-grey-200 rounded-2xl text-grey-600">
                          🤙 هـــی
                        </button>
                        <button className="text-xs px-3 py-1.5 bg-grey-100 hover:bg-grey-200 rounded-2xl text-grey-600">
                          🤔 چیکار کنم؟
                        </button>
                        <button className="text-xs px-3 py-1.5 bg-grey-100 hover:bg-grey-200 rounded-2xl text-grey-600">
                          🔥 باحاله!
                        </button>
                      </>
                    )}
                    {botConfig.tone === "expert" && (
                      <>
                        <button className="text-xs px-3 py-1.5 bg-grey-100 hover:bg-grey-200 rounded-lg text-grey-600">
                          🎓 تحلیل
                        </button>
                        <button className="text-xs px-3 py-1.5 bg-grey-100 hover:bg-grey-200 rounded-lg text-grey-600">
                          📊 داده‌ها
                        </button>
                        <button className="text-xs px-3 py-1.5 bg-grey-100 hover:bg-grey-200 rounded-lg text-grey-600">
                          🔬 بررسی
                        </button>
                      </>
                    )}
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <button className="w-10 h-10 text-grey-400 hover:text-grey-600 rounded-xl hover:bg-grey-100 flex items-center justify-center">
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
                    className="flex-1 px-4 py-3 bg-grey-50 border border-grey-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:border-transparent"
                    disabled
                  />

                  <button
                    className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-md disabled:opacity-50"
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
              </div>

              {/* Powered by */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
