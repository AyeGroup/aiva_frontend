import { Card } from "@/components/card";
import { Button } from "@/components/button";
import { ChatHistoryCard } from "@/components/chat-history-card";
import { MessageSquare, ArrowLeft } from "lucide-react";

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

export function RecentChats() {
  const recentChats: ChatData[] = [
    {
      userId: "1",
      userName: "آریا محمدی",
      status: "completed",
      unreadCount: 0,
      lastActivity: "2024-01-20T10:25:00Z",
      messages: [
        {
          id: "1",
          type: "user",
          content: "سلام، مشکلی در سایت دارم",
          timestamp: "2024-01-20T10:20:00Z",
        },
        {
          id: "2",
          type: "bot",
          content: "سلام! چه مشکلی دارید؟ لطفاً بیشتر توضیح دهید.",
          timestamp: "2024-01-20T10:21:00Z",
        },
        {
          id: "3",
          type: "user",
          content: "نمی‌تونم وارد حسابم بشم",
          timestamp: "2024-01-20T10:22:00Z",
        },
        {
          id: "4",
          type: "bot",
          content:
            "لطفاً ایمیل خود را چک کنید. لینک بازیابی رمز عبور ارسال کردم.",
          timestamp: "2024-01-20T10:23:00Z",
        },
        {
          id: "5",
          type: "user",
          content: "ممنون از راهنماییتون، مشکلم حل شد!",
          timestamp: "2024-01-20T10:25:00Z",
        },
      ],
    },
    {
      userId: "2",
      userName: "سارا احمدی",
      status: "active",
      unreadCount: 2,
      lastActivity: "2024-01-20T10:30:00Z",
      messages: [
        {
          id: "6",
          type: "user",
          content: "آیا امکان ارسال به شهرستان دارید؟",
          timestamp: "2024-01-20T10:25:00Z",
        },
        {
          id: "7",
          type: "bot",
          content: "بله، به تمام شهرهای ایران ارسال داریم.",
          timestamp: "2024-01-20T10:26:00Z",
        },
        {
          id: "8",
          type: "user",
          content:
            "من از تهران هستم و می‌خوام محصولتون رو برای خواهرم که اصفهان زندگی می‌کنه سفارش بدم.",
          timestamp: "2024-01-20T10:28:00Z",
        },
        {
          id: "9",
          type: "user",
          content: "ممنون می‌شم راهنمایی کنید.",
          timestamp: "2024-01-20T10:30:00Z",
        },
      ],
    },
    {
      userId: "3",
      userName: "علی رضایی",
      status: "active",
      unreadCount: 1,
      lastActivity: "2024-01-20T10:15:00Z",
      messages: [
        {
          id: "10",
          type: "user",
          content: "راهنمایی برای تنظیمات حساب می‌خواهم",
          timestamp: "2024-01-20T10:10:00Z",
        },
        {
          id: "11",
          type: "bot",
          content: "حتماً کمکتان می‌کنم. کدام بخش تنظیمات؟",
          timestamp: "2024-01-20T10:11:00Z",
        },
        {
          id: "12",
          type: "user",
          content: "لطفاً با پشتیبانی تماس بگیرم؟",
          timestamp: "2024-01-20T10:15:00Z",
        },
      ],
    },
  ];

  const handleChatClick = (chatId: string) => {
    console.log(`کلیک روی چت ${chatId}`);
    // اینجا می‌تونید منطق باز کردن چت کامل را اضافه کنید
  };

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

        <Button variant="tertiary" size="md">
          مشاهده همه
          <ArrowLeft className="w-4 h-4 mr-2" />
        </Button>
      </div>

      <div className="space-y-4">
        {recentChats.map((chat) => (
          <ChatHistoryCard
            key={chat.userId}
            userId={chat.userId}
            userName={chat.userName}
            userAvatar={chat.userAvatar}
            messages={chat.messages}
            status={chat.status}
            unreadCount={chat.unreadCount}
            lastActivity={chat.lastActivity}
            onClick={() => handleChatClick(chat.userId)}
          />
        ))}
      </div>
    </Card>
  );
}
