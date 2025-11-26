import Image from "next/image";
import { BotConfig } from "@/types/common";
import { API_BASE_URL } from "@/config";
import { onboardingData } from "./onboarding.data";
import { Delete, SendMessage } from "@/public/icons/AppIcons";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/providers/AuthProvider";

interface ChatPreviewProps {
  botConfig: BotConfig;
  currentStep: number;
  isNew: boolean;
}

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  type?: string;
}

export function ChatPreview({
  botConfig,
  currentStep,
  isNew,
}: ChatPreviewProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [isTyping, setIsTyping] = useState(false);
  const [showFaqs, setShowFaqs] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  useEffect(() => {
    const newMessages = getGreetingMessages();
    if (botConfig.greetings) setMessages(newMessages);
  }, []);

  useEffect(() => {
    if (botConfig.greetings) {
      setMessages(getGreetingMessages());
      setShowFaqs(true);
    } else {
      setMessages((prev) =>
        prev.filter((msg) => !msg.id.startsWith("greeting"))
      );
    }
  }, [botConfig.greetings, botConfig.tone]);

  const handleClear = () => {
    setMessages([]);
    setShowFaqs(true);
    setInputText("");
    if (botConfig.greetings) setMessages(getGreetingMessages());
  };

  // console.log("pre bot",botConfig)

  const handleFaqClick = (faq: any) => {
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

  const getGreetingMessages = (): Message[] => {
    const base: Message[] = [
      {
        id: "greeting",
        text:
          botConfig?.greetings && currentTone?.example
            ? currentTone?.example
            : "سلام! چطور می‌تونم کمکتون کنم؟",
        isBot: true,
        timestamp: new Date(),
      },
    ];

    return base;
  };

  const currentTone = onboardingData.tones.find((t) => t.id === botConfig.tone);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 80) + "px";
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
    setIsTyping(true);

    await callChatbotAPIWithSSE(inputText);

    setIsTyping(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // هر وقت messages تغییر کرد، scroll کن

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
          Authorization: `Bearer ${user?.token}`,
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
              setIsTyping(false);
              return receivedAnyData;
            }
          } catch {
            continue;
          }
        }
      }
    } catch (err) {
      console.error("Stream read error:", err);
      setIsTyping(false);
    }

    setIsTyping(false);
    return receivedAnyData;
  }

  return (
    <div className="chat-preview-container">
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-grey-900">پیش‌نمایش </h3>
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

        <p className="text-grey-900 bg-white rounded-sm p-2 shadow text-sm text-right ">
          {/* تغییرات شما بلافاصله در چت‌بات نمایش داده می‌شود */}
          تغییرات را اعمال کرده و نتیجه را همین‌جا مشاهده کنید، تا تنظیمات
          دقیق‌تری ایجاد کنید.
        </p>
      </div>

      {/* Single Column Layout: Live Chat Only */}
      <div className="max-w-md mx-auto ">
        <div
          key={`${botConfig.primary_color}-${botConfig.name}-${botConfig.widget_position}-${botConfig.button_size}`}
          className="absolute inset-0 bg-brand-primary/10 rounded-2xl opacity-0 pointer-events-none z-50"
        ></div>

        <div>
          <div className="sticky top-0">
            <div
              className="w-full bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-grey-200 flex flex-col overflow-hidden"
              style={{
                height: "600px",
                background: `linear-gradient(135deg, white 0%, ${botConfig.accent_color}33 100%)`,
              }}
            >
              {/* Chat Header */}
              <div
                className=" p-4 text-white flex items-center gap-4 backdrop-blur-sm "
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
                    {/* Message Bubble */}
                    <div
                      className={`max-w-[75%] px-4 py-3 text-sm leading-relaxed shadow-sm text-right ${
                        message.isBot
                          ? `bg-white border border-grey-100 text-grey-800 rounded-sm`
                          : `text-white  rounded-sm`
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
                    <div ref={messagesEndRef} />
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex items-end gap-3 justify-start">
                    <div className="bg-white border border-grey-100 px-5 py-3 shadow-sm rounded-sm">
                      <div className="flex gap-1 items-center">
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
                <div className="flex items-center py-4 gap-3">
                  <textarea
                    ref={textareaRef}
                    value={inputText}
                    disabled={currentStep == 1 && isNew}
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
                    disabled={currentStep == 1 && isNew}
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
