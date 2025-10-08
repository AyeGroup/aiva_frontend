import React from "react";
import { ChatHistoryCard } from "@/components/chat-history-card";

const sampleChats = [
  {
    userId: "1",
    userName: "محمد احمدی",
    status: "active" as const,
    unreadCount: 3,
    lastActivity: "2024-01-20T10:30:00Z",
    messages: [
      {
        id: "1",
        type: "user" as const,
        content: "سلام، سوال درباره قیمت محصول جدید دارم",
        timestamp: "2024-01-20T10:25:00Z",
      },
      {
        id: "2",
        type: "bot" as const,
        content:
          "سلام! خوش آمدید. لطفاً نام محصول مورد نظرتان را بفرمایید تا راهنمایی‌تان کنم.",
        timestamp: "2024-01-20T10:26:00Z",
      },
      {
        id: "3",
        type: "user" as const,
        content: "محصول X را می‌خواهم. آیا تخفیف ویژه‌ای دارید؟",
        timestamp: "2024-01-20T10:28:00Z",
      },
      {
        id: "4",
        type: "bot" as const,
        content:
          "بله، در حال حاضر تخفیف ۲۰٪ برای محصول X داریم. آیا مایل به خرید هستید؟",
        timestamp: "2024-01-20T10:29:00Z",
      },
      {
        id: "5",
        type: "user" as const,
        content: "عالی! چطور می‌تونم سفارش بدم؟",
        timestamp: "2024-01-20T10:30:00Z",
      },
    ],
  },
  {
    userId: "2",
    userName: "زهرا کریمی",
    status: "completed" as const,
    unreadCount: 0,
    lastActivity: "2024-01-20T09:15:00Z",
    messages: [
      {
        id: "6",
        type: "user" as const,
        content: "مشکل در پرداخت آنلاین دارم",
        timestamp: "2024-01-20T09:10:00Z",
      },
      {
        id: "7",
        type: "bot" as const,
        content: "متأسفم که مشکل دارید. لطفاً کد خطا را برایم ارسال کنید.",
        timestamp: "2024-01-20T09:11:00Z",
      },
      {
        id: "8",
        type: "user" as const,
        content: "کد خطا: PAY_ERROR_401",
        timestamp: "2024-01-20T09:12:00Z",
      },
      {
        id: "9",
        type: "bot" as const,
        content: "مشکل حل شد. لطفاً دوباره تلاش کنید.",
        timestamp: "2024-01-20T09:15:00Z",
      },
    ],
  },
  {
    userId: "3",
    userName: "علی رضایی",
    status: "active" as const,
    unreadCount: 1,
    lastActivity: "2024-01-20T08:45:00Z",
    messages: [
      {
        id: "10",
        type: "user" as const,
        content: "راهنمایی برای تنظیمات حساب کاربری می‌خواهم",
        timestamp: "2024-01-20T08:40:00Z",
      },
      {
        id: "11",
        type: "bot" as const,
        content: "حتماً! به بخش تنظیمات بروید و روی پروفایل کلیک کنید.",
        timestamp: "2024-01-20T08:42:00Z",
      },
      {
        id: "12",
        type: "user" as const,
        content: "متشکرم، الان امتحان می‌کنم",
        timestamp: "2024-01-20T08:45:00Z",
      },
    ],
  },
  {
    userId: "4",
    userName: "فاطمه حسینی",
    status: "completed" as const,
    unreadCount: 0,
    lastActivity: "2024-01-20T07:30:00Z",
    messages: [
      {
        id: "13",
        type: "user" as const,
        content: "پیگیری سفارش ارسال شده",
        timestamp: "2024-01-20T07:25:00Z",
      },
      {
        id: "14",
        type: "bot" as const,
        content:
          "سفارش شما در مرحله ارسال است و تا ۲ روز آینده تحویل خواهد شد.",
        timestamp: "2024-01-20T07:30:00Z",
      },
    ],
  },
];

export default function ChatHistoryDemo() {
  return (
    <div
      style={{
        padding: "2rem",
        background: "var(--bg-app)",
        minHeight: "100vh",
        direction: "rtl",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          background: "white",
          padding: "2rem",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-md)",
        }}
      >
        <h1
          style={{
            marginBottom: "2rem",
            color: "var(--grey-900)",
            textAlign: "center",
          }}
        >
          💬 نمونه دیزاین Chat History
        </h1>

        <div
          style={{
            display: "grid",
            gap: "1.5rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          }}
        >
          {sampleChats.map((chat) => (
            <ChatHistoryCard
              key={chat.userId}
              userId={chat.userId}
              userName={chat.userName}
              messages={chat.messages}
              status={chat.status}
              unreadCount={chat.unreadCount}
              lastActivity={chat.lastActivity}
              onClick={() => console.log(`کلیک روی چت ${chat.userName}`)}
            />
          ))}
        </div>

        <div
          style={{
            marginTop: "2rem",
            padding: "1rem",
            background: "var(--bg-soft-mint)",
            borderRadius: "var(--radius-sm)",
            fontSize: "var(--text-body-small)",
            color: "var(--grey-700)",
          }}
        >
          <h3 style={{ marginBottom: "1rem", color: "var(--grey-900)" }}>
            ✨ ویژگی‌های طراحی:
          </h3>
          <ul style={{ margin: 0, paddingRight: "1.5rem" }}>
            <li>نمایش timeline کامل مکالمه</li>
            <li>تشخیص پیام کاربر vs آیوا</li>
            <li>وضعیت فعال/تکمیل شده</li>
            <li>شمارش پیام‌های جدید</li>
            <li>قابلیت باز/بسته کردن</li>
            <li>دکمه مشاهده کامل</li>
            <li>طراحی ریسپانسیو</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
