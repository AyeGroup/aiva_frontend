import Image from "next/image";
import { useState, useEffect } from "react";
import { useBot } from "@/providers/BotProvider";
import { API_ROUTES } from "@/constants/apiRoutes";
import axiosInstance from "@/lib/axiosInstance";
import { ThumbsUp, ThumbsDown } from "lucide-react";

interface ChatHistoryProps {
  username: string;
}

export function ChatHistory({ username }: ChatHistoryProps) {
  console.log("ChatHistory");
  const { currentBot } = useBot();
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    console.log("useEffect");
    if (!currentBot) return;
    if (!username) return;

    const parts = username.split(":");
    const section2 = parts.length > 1 ? parts[1] : username;

    const fetchActiveUsers = async () => {
      try {
        const response = await axiosInstance.get(
          API_ROUTES.PUBLIC.HISTORY(currentBot.uuid),
          { params: { username: section2 } }
        );

        const data = response.data.data;
        console.log("histr", data);
        setHistory(data || []);
      } catch (error) {
        console.error("❌ خطا در دریافت داده کاربران:", error);
      } finally {
      }
    };
    fetchActiveUsers();
  }, [currentBot, username]);

  function MessageFeedbackView({
    feedback,
  }: {
    feedback?: "like" | "dislike" | null;
  }) {
    if (!feedback) return null;

    return (
      <div className="flex items-center gap-2 mt-2">
        <ThumbsUp
          size={16}
          className={feedback === "like" ? "text-green-600" : "text-gray-300"}
        />
        <ThumbsDown
          size={16}
          className={feedback === "dislike" ? "text-red-600" : "text-gray-300"}
        />
      </div>
    );
  }

  if (!currentBot) return;

  return (
    <div className="chat-preview-container">
      {/* Single Column Layout: Live Chat Only */}
      <div className="max-w-md mx-auto ">
        <div
          key={`${currentBot.primary_color}-${currentBot.name}-${currentBot.widget_position}-${currentBot.button_size}`}
          className="absolute inset-0 bg-brand-primary/10 rounded-2xl opacity-0 pointer-events-none z-50"
        ></div>

        <div>
          <div className="sticky top-0">
            <div
              className="w-full bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-grey-200 flex flex-col overflow-hidden"
              style={{
                height: "600px",
                background: `linear-gradient(135deg, white 0%, ${currentBot.accent_color}33 100%)`,
              }}
            >
              {/* Chat Header */}
              <div
                className=" p-4 text-white flex items-center gap-4 backdrop-blur-sm "
                style={{
                  background: `linear-gradient(135deg, ${currentBot.primary_color} 0%, ${currentBot.primary_color}ee 100%)`,
                  height: "80px",
                }}
              >
                {/* Bot Avatar */}
                <div className=" bg-white/20  rounded-full flex items-center justify-center p-1  overflow-hidden">
                  <Image
                    src={currentBot.logo_url || "/logo.webp"}
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
                      {currentBot.name}
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
                {history.map((message, index) => (
                  <div
                    key={index}
                    className={`flex items-end gap-3 ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {/* Message Bubble */}
                    <div
                      className={`max-w-[75%] px-4 py-3 text-sm leading-relaxed shadow-sm rounded-sm ${
                        message.role === "user"
                          ? `text-white`
                          : `bg-white text-grey-800`
                      }`}
                      style={
                        message.role === "user"
                          ? {
                              background: currentBot.primary_color,
                            }
                          : {}
                      }
                    >
                      {message.content}
                      {message.role === "user" && (
                        <MessageFeedbackView feedback={message.feedback} />
                      )}
                      <div
                        className={`text-xs mt-1 opacity-70 ${
                          message.role === "user"
                            ? "text-white/70"
                            : "text-grey-500"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
