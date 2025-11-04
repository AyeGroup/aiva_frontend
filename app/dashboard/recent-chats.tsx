import { Card } from "@/components/card";
import { Button } from "@/components/button";
import { ChatHistoryCard } from "@/components/chat-history-card";
import { MessageSquare, ArrowLeft } from "lucide-react";
import { convertNumbersToPersian, convertToPersian } from "@/utils/common";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: string;
}

interface ChatData {
  userId: string;
  userName: string;
  userAvatar?: string;
  messages: Message[];
  status: "active" | "completed";
  unreadCount: number;
  lastActivity: string;
}

interface ApiMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  ts: number;
  feedback: any;
}

interface ApiChat {
  session_id: string;
  user_id: string;
  user_name: string;
  started_at: string | null;
  ended_at: string | null;
  message_count: number;
  messages: ApiMessage[];
}

interface RecentChatsProps {
  data: ApiChat[];
  onChatClick?: (chatId: string) => void;
  onViewAll?: () => void;
}

export function RecentChats({
  data,
  onChatClick,
  onViewAll,
}: RecentChatsProps) {
  // 🔹 تبدیل داده‌های خام بک‌اند به ساختار مناسب برای نمایش
  const chats: ChatData[] = data.map((chat) => {
    const lastMessage = chat.messages.at(-1);
    return {
      userId: chat.user_id,
      userName: chat.user_name,
      status: chat.ended_at ? "completed" : "active",
      unreadCount: 0, // در صورت نیاز می‌تونی از بک اضافه کنی
      lastActivity: lastMessage
        ? new Date(lastMessage.ts * 1000).toISOString()
        : new Date().toISOString(),
      messages: chat.messages.map((m) => ({
        id: m.id,
        type: m.role === "assistant" ? "bot" : "user",
        content: m.content,
        timestamp: new Date(m.ts * 1000).toISOString(),
      })),
    };
  });

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-primary/10 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-brand-primary" />
          </div>
          <div>
            <h3 className="text-grey-900 text-right">مکالمات اخیر</h3>
            <p className="text-grey-600 text-[14px]">
              آخرین تعاملات با کاربران
            </p>
          </div>
        </div>

        <Button variant="tertiary" size="md" onClick={onViewAll}>
          مشاهده همه
          <ArrowLeft className="w-4 h-4 mr-2" />
        </Button>
      </div>

      <div className="space-y-4">
        {chats.length > 0 ? (
          chats.map((chat, index) => (
            <ChatHistoryCard
              key={chat.userId}
              userId={chat.userId}
              userName={`کاربر ${convertToPersian(index + 1)}`}
              // userName={chat.userName}
              userAvatar={chat.userAvatar}
              messages={chat.messages}
              status={chat.status}
              unreadCount={chat.unreadCount}
              lastActivity={chat.lastActivity}
              // lastActivity={convertNumbersToPersian(chat.lastActivity)}
              onClick={() => onChatClick?.(chat.userId)}
            />
          ))
        ) : (
          <p className="text-center text-grey-500 text-sm py-6">
            هیچ مکالمه‌ای یافت نشد.
          </p>
        )}
      </div>
    </Card>
  );
}
