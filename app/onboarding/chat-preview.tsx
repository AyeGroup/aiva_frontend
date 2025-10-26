import Image from "next/image";
import { BotConfig } from "@/types/common";
import { API_BASE_URL } from "@/config";
import { onboardingData } from "./onboarding.data";
import { Delete, SendMessage } from "@/public/icons/AppIcons";
import { useState, useEffect, useRef } from "react";

interface ChatPreviewProps {
  botConfig: BotConfig;
  currentStep: number;
}

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  type?: string;
}

export function ChatPreview({ botConfig, currentStep }: ChatPreviewProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [isTyping, setIsTyping] = useState(false);
  const [showFaqs, setShowFaqs] = useState(true);
  const [currentResponse, setCurrentResponse] = useState("");

  const [selectedKnowledgeItem, setSelectedKnowledgeItem] = useState<
    string | null
  >(null);

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

  const handleClear = () => {
    // پاک کردن تمام پیام‌ها
    setMessages([]);

    // بازگرداندن FAQها به حالت اولیه
    setShowFaqs(true);

    // بازنشانی متن ورودی
    setInputText("");

    // اگر آیتم دانش انتخاب شده بود، بازنشانی شود
    setSelectedKnowledgeItem(null);
  };

  const handleFaqClick = (faq: any) => {
    // پنهان کردن دکمه‌ها
    setShowFaqs(false);

    // افزودن پیام کاربر
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: faq.question,
      isBot: false,
      timestamp: new Date(),
    };

    // افزودن پاسخ بات
    const botResponse: Message = {
      id: `bot-${Date.now()}`,
      text: faq.answer || "پاسخی برای این سؤال ثبت نشده است.",
      isBot: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage, botResponse]);
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
          (botConfig.behaviors?.useGreeting && currentTone?.example) ||
          "سلام! چطور می‌تونم کمکتون کنم؟",
        isBot: true,
        timestamp: new Date(),
      },
    ];

    return base;
  };

  useEffect(() => {
    const newMessages = getSampleMessages(currentStep);
    setMessages(newMessages);
    setSelectedKnowledgeItem(null); // Reset selection when step changes
  }, [currentStep, botConfig.llm_model.length]);

  // Get current tone example
  const currentTone = onboardingData.tones.find((t) => t.id === botConfig.tone);

  // Simulate typing when bot sends message
  // const simulateTyping = () => {
  //   setIsTyping(true);
  //   setTimeout(() => {
  //     setIsTyping(false);
  //   }, 1500);
  // };

  // useEffect(() => {
  //   if (messages.length > 0) {
  //     simulateTyping();
  //   }
  // }, [messages]);

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

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // بازنشانی ارتفاع
      textarea.style.height = Math.min(textarea.scrollHeight, 80) + "px"; // حداکثر حدود ۲ خط
    }
  };
  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputText,
      isBot: false,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    setInputText("");
    setIsTyping(true); // شروع تایپ بات

    await callChatbotAPIWithSSE(inputText);

    setIsTyping(false); // پایان تایپ بعد از دریافت کامل پاسخ
  };

  const handleSend1 = async () => {
    console.log("send", inputText);
    if (!inputText.trim()) return;

    // افزودن پیام کاربر
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputText,
      isBot: false,
      timestamp: new Date(),
    };
    console.log("send", userMessage);

    setMessages((prev) => [...prev, userMessage]);

    console.log("message", messages);
    // پاک کردن input و شروع پاسخ
    const messageToSend = inputText;
    setInputText("");

    await callChatbotAPIWithSSE(messageToSend);
  };

  async function callChatbotAPIWithSSE(message: string) {
    const apiUrl = `${API_BASE_URL}/public/${botConfig.uuid}/chat`;

    const requestData = {
      username: "user_g8vy8p_1761286442729_t5356acc3",
      display_name: "user_g8vy8p_1761286442729_t5356acc3",
      message,
      session_id: "sess-1761286450408-user_g8vy8p_1761286442729_t5356acc3",
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("text/event-stream")) {
        const receivedData = await handleSSEStream(response);
        // اگر هیچ داده‌ای دریافت نشد
        if (!receivedData) {
          setMessages((prev) => [
            ...prev,
            {
              id: crypto.randomUUID(),
              text: "پاسخ مناسبی از سرور دریافت نشد.",
              isBot: true,
              timestamp: new Date(),
            },
          ]);
        }
      } else {
        const data = await response.json();
        const botMessage =
          data.answer ||
          data.response ||
          data.message ||
          "متأسفانه نتوانستم درخواست شما را پردازش کنم.";

        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            text: botMessage,
            isBot: true,
            timestamp: new Date(),
          },
        ]);
        setShowFaqs(false); // مهم: بعد از اولین پاسخ بات FAQها حذف شوند
      }
    } catch (error: any) {
      console.error("Chatbot API error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          text: "پاسخی از سرور دریافت نشد.",
          isBot: true,
          timestamp: new Date(),
        },
      ]);
    }
  }
  async function handleSSEStream(response: Response) {
    const reader = response.body?.getReader();
    const decoder = new TextDecoder("utf-8");

    if (!reader) return false;

    let accumulatedText = "";
    let receivedAnyData = false;
    let botMessageId: string | null = null;

    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (!line.startsWith("data:")) continue;

          const raw = line.replace("data:", "").trim();
          if (!raw) continue;

          try {
            const parsed = JSON.parse(raw);

            if (parsed.type === "token" && parsed.data) {
              receivedAnyData = true;
              accumulatedText += parsed.data;

              if (!botMessageId) {
                botMessageId = `bot-${Date.now()}`;
                setMessages((prev) => [
                  ...prev,
                  {
                    id: botMessageId!,
                    text: accumulatedText,
                    isBot: true,
                    timestamp: new Date(),
                  },
                ]);
              } else {
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === botMessageId ? { ...m, text: accumulatedText } : m
                  )
                );
              }
            } else if (parsed.type === "done") {
              setIsTyping(false); // پایان تایپ وقتی SSE تمام شد
              return receivedAnyData;
            }
          } catch {
            continue;
          }
        }
      }
    } catch (err) {
      console.error("Stream read error:", err);
      setIsTyping(false); // در صورت خطا هم تایپ را خاموش کن
    }

    setIsTyping(false);
    return receivedAnyData;
  }

  async function handleSSEStream1(response: Response) {
    const reader = response.body?.getReader();
    const decoder = new TextDecoder("utf-8");

    if (!reader) return false;

    let accumulatedText = "";
    let receivedAnyData = false;
    let botMessageId: string | null = null;

    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (!line.startsWith("data:")) continue;

          const raw = line.replace("data:", "").trim();
          if (!raw) continue;

          try {
            const parsed = JSON.parse(raw);

            if (parsed.type === "token" && parsed.data) {
              receivedAnyData = true;
              accumulatedText += parsed.data;

              // فقط وقتی داده داریم پیام ایجاد یا آپدیت می‌شود
              if (!botMessageId) {
                botMessageId = `bot-${Date.now()}`;
                setMessages((prev) => [
                  ...prev,
                  {
                    id: botMessageId!,
                    text: accumulatedText,
                    isBot: true,
                    timestamp: new Date(),
                  },
                ]);
              } else {
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === botMessageId ? { ...m, text: accumulatedText } : m
                  )
                );
              }
            } else if (parsed.type === "done") {
              return receivedAnyData;
            }
          } catch {
            continue;
          }
        }
      }
    } catch (err) {
      console.error("Stream read error:", err);
    }

    return receivedAnyData;
  }

  // Get tone-based styling
  const getToneStyles = (tone: string) => {
    const styles = {
      friendly: {
        messageClass: "rounded-2xl",
        headerStyle: "rounded-t-2xl",
        emoji: "😊",
      },
      professional: {
        messageClass: "rounded-lg",
        headerStyle: "rounded-t-lg",
        emoji: "💼",
      },
      casual: {
        messageClass: "rounded-3xl",
        headerStyle: "rounded-t-3xl",
        emoji: "😎",
      },
      expert: {
        messageClass: "rounded-lg",
        headerStyle: "rounded-t-lg",
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
          <h3 className="text-grey-900">پیش‌نمایش </h3>
          {/* <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-sharp-emerald rounded-full animate-pulse"></div>
            <span className="text-sharp-emerald text-sm font-medium">فعال</span>
          </div> */}
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
              style={{ backgroundColor: botConfig.primary_color }}
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
          key={`${botConfig.primary_color}-${botConfig.name}-${botConfig.widget_position}-${botConfig.button_size}`}
          className="absolute inset-0 bg-brand-primary/10 rounded-2xl opacity-0 pointer-events-none z-50"
        ></div>

        {/* Live Chat Widget - Centered */}
        <div>
          <div className="sticky top-0">
            {/* Chat Widget Container */}
            <div
              className="w-full bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-grey-200 flex flex-col overflow-hidden"
              // style={{ height: "700px" }}
              style={{
                height: "600px",
                background: `linear-gradient(135deg, white 0%, ${botConfig.accent_color}33 100%)`,
              }}
            >
              {/* Chat Header */}
              <div
                className={`relative p-4 text-white flex items-center gap-4 backdrop-blur-sm ${toneStyles.headerStyle}`}
                style={{
                  background: `linear-gradient(135deg, ${botConfig.primary_color} 0%, ${botConfig.primary_color}ee 100%)`,
                  height: "80px",
                }}
              >
                {/* Bot Avatar */}
                <div className=" bg-white/20  rounded-full flex items-center justify-center p-1  overflow-hidden">
                  <Image
                    src={botConfig.logo_url || "/logo.png"}
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
                <div className="w-5 g-5 text-white" onClick={handleClear}>
                  <Delete />
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-grey-50">
                {messages.map((message) => (
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
                        style={{
                          backgroundColor: `${botConfig.primary_color}20`,
                        }}
                      >
                        <Image
                          src={botConfig.logo_url || "/logo.png"}
                          height={64}
                          width={64}
                          alt="آیوا"
                          className="w-6 h-6 object-cover"
                        />
                      </div>
                    )}

                    {/* Message Bubble */}
                    <div
                      className={`max-w-[75%] px-4 py-3 text-sm leading-relaxed shadow-sm text-right ${
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
                      }`}
                      style={
                        !message.isBot
                          ? {
                              background: botConfig.primary_color,
                            }
                          : {}
                      }
                      dir="rtl"
                    >
                      {message.text}
                      <div
                        className={`text-xs mt-1 opacity-70 text-right ${
                          message.isBot ? "text-grey-500" : "text-white/70"
                        }`}
                      >
                        {new Date(message.timestamp).toLocaleTimeString(
                          "fa-IR",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex items-end gap-3 justify-start">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm mb-1 overflow-hidden"
                      style={{
                        backgroundColor: `${botConfig.primary_color}20`,
                      }}
                    >
                      <Image
                        src={botConfig.logo_url || "/logo.png"}
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
                          style={{
                            backgroundColor: `${botConfig.primary_color}60`,
                          }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full animate-bounce"
                          style={{
                            backgroundColor: `${botConfig.primary_color}60`,
                            animationDelay: "0.1s",
                          }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full animate-bounce"
                          style={{
                            backgroundColor: `${botConfig.primary_color}60`,
                            animationDelay: "0.2s",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* FAQ Buttons */}
              {showFaqs && botConfig.faqs && botConfig.faqs.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 my-4">
                  {botConfig.faqs.map((faq) => (
                    <button
                      key={faq.id}
                      onClick={() => handleFaqClick(faq)}
                      className="text-xs px-3 py-1.5 bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary rounded-full max-w-[200px] truncate"
                    >
                      {faq.question}
                    </button>
                  ))}
                </div>
              )}
              {/* Input Area */}
              <div className="px-4 bg-white/80 backdrop-blur-sm border-t border-grey-100">
                {/* {botConfig.llm_model.length > 0 && currentStep >= 2 && (
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-2">
                      {botConfig.knowledge &&
                        botConfig.knowledge.map((item) => {
                          const icon =
                            item.type === "qa_pair"
                              ? "❓"
                              : item.type === "file"
                              ? "📄"
                              : item.type === "website"
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
                        })}

                      {Number(botConfig.behaviors?.maxResponseLength) > 3 && (
                        <button className="text-xs px-3 py-1.5 bg-grey-100 hover:bg-grey-200 rounded-full text-grey-600">
                          +{Number(botConfig.behaviors.maxResponseLength) - 3}{" "}
                          بیشتر
                        </button>
                      )}
                    </div>
                  </div>
                )} */}

                {/* Default Quick Actions - Only show if no knowledge base */}
                {/* {(botConfig.knowledge.length === 0 || currentStep < 2) && ( */}
                {(!botConfig.behaviors?.maxResponseLength ||
                  botConfig.behaviors?.maxResponseLength === "small" ||
                  currentStep < 2) && (
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

                <div className="flex items-center pb-4 gap-3">
                  <textarea
                    ref={textareaRef}
                    value={inputText}
                    disabled={currentStep == 1}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    rows={1}
                    placeholder="پیام خود را بنویسید..."
                    className="flex-1 px-4 py-3 bg-grey-50 border border-grey-200 rounded-2xl text-sm resize-none max-h-[80px] overflow-y-auto outline-none focus:outline-none focus:ring-0 focus:border-grey-300 scrollbar-none"
                    style={{
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                  />

                  <button
                    className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-md disabled:opacity-50"
                    style={{ backgroundColor: botConfig.primary_color }}
                    disabled={currentStep == 1}
                    onClick={handleSend}
                  >
                    <SendMessage />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
