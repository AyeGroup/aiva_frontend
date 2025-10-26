import React, { useState } from "react";
 

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: "open" | "pending" | "closed";
  priority: "low" | "medium" | "high";
  category: "technical" | "billing" | "general";
  createdAt: string;
  updatedAt: string;
}

export default function Tickets() {
  const [tickets] = useState<Ticket[]>([
    {
      id: "1",
      title: "مشکل در اتصال چت‌بات به وب‌سایت",
      description: "چت‌بات در صفحه اصلی وب‌سایت نمایش داده نمی‌شود",
      status: "open",
      priority: "high",
      category: "technical",
      createdAt: "۱۴۰۳/۰۹/۱۵",
      updatedAt: "۱۴۰۳/۰۹/۱۶",
    },
    {
      id: "2",
      title: "سوال در مورد تعرفه‌های پریمیوم",
      description: "آیا امکان تغییر پلن در وسط ماه وجود دارد؟",
      status: "pending",
      priority: "medium",
      category: "billing",
      createdAt: "۱۴۰۳/۰۹/۱۴",
      updatedAt: "۱۴۰۳/۰۹/۱۵",
    },
    {
      id: "3",
      title: "درخواست ویژگی جدید",
      description: "امکان اضافه کردن فایل صوتی به پاسخ‌های چت‌بات",
      status: "closed",
      priority: "low",
      category: "general",
      createdAt: "۱۴۰۳/۰۹/۱۰",
      updatedAt: "۱۴۰۳/۰۹/۱۲",
    },
  ]);

  const getStatusBadge = (status: string) => {
    const styles = {
      open: { bg: "bg-sharp-crimson", text: "text-white", label: "باز" },
      pending: { bg: "bg-sharp-amber", text: "text-white", label: "در انتظار" },
      closed: { bg: "bg-sharp-emerald", text: "text-white", label: "بسته" },
    };
    const style = styles[status as keyof typeof styles];
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}
      >
        {style.label}
      </span>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const styles = {
      high: { bg: "bg-danger/10", text: "text-danger", label: "بالا" },
      medium: { bg: "bg-warning/10", text: "text-warning", label: "متوسط" },
      low: { bg: "bg-success/10", text: "text-success", label: "پایین" },
    };
    const style = styles[priority as keyof typeof styles];
    return (
      <span
        className={`px-2 py-1 rounded text-xs font-medium ${style.bg} ${style.text}`}
      >
        {style.label}
      </span>
    );
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      technical: "⚙️",
      billing: "💰",
      general: "💬",
    };
    return icons[category as keyof typeof icons] || "📝";
  };

  return (
    <div className="h-screen overflow-hidden" style={{ background: "#FFFFFF" }}>
      <div className="flex h-screen">
        {/* Sidebar */}
        {/* <Sidebar onNavigate={onNavigate} currentPage="tickets" /> */}
        {/* elham */}
        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto h-screen">
          <div className="max-w-7xl mx-auto pb-8">
            {/* Header */}
            <header className="mb-8">
              <div className="text-right">
                <h1 className="text-grey-900 mb-2">تیکت‌های پشتیبانی</h1>
                <p className="text-grey-600">
                  مدیریت درخواست‌ها و تیکت‌های پشتیبانی شما
                </p>
              </div>
            </header>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-xl p-4 border border-grey-200 shadow-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-grey-500 text-sm">کل تیکت‌ها</p>
                    <p className="text-2xl font-bold text-grey-900">۳</p>
                  </div>
                  <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📋</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 border border-grey-200 shadow-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-grey-500 text-sm">تیکت‌های باز</p>
                    <p className="text-2xl font-bold text-sharp-crimson">۱</p>
                  </div>
                  <div className="w-12 h-12 bg-sharp-crimson/10 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🔴</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 border border-grey-200 shadow-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-grey-500 text-sm">در انتظار پاسخ</p>
                    <p className="text-2xl font-bold text-sharp-amber">۱</p>
                  </div>
                  <div className="w-12 h-12 bg-sharp-amber/10 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">⏳</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 border border-grey-200 shadow-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-grey-500 text-sm">حل شده</p>
                    <p className="text-2xl font-bold text-sharp-emerald">۱</p>
                  </div>
                  <div className="w-12 h-12 bg-sharp-emerald/10 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">✅</span>
                  </div>
                </div>
              </div>
            </div>

            {/* New Ticket Button */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-grey-900">لیست تیکت‌ها</h2>
              <button className="bg-brand-primary text-white px-6 py-3 rounded-xl hover:bg-brand-primary/90 transition-colors font-medium">
                + تیکت جدید
              </button>
            </div>

            {/* Tickets List */}
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="bg-white rounded-xl p-6 border border-grey-200 shadow-card hover:shadow-hover transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-grey-100 rounded-lg flex items-center justify-center text-xl">
                        {getCategoryIcon(ticket.category)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-grey-900 mb-2">
                          {ticket.title}
                        </h3>
                        <p className="text-grey-600 text-sm line-clamp-2">
                          {ticket.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      {getStatusBadge(ticket.status)}
                      {getPriorityBadge(ticket.priority)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-grey-500 border-t border-grey-100 pt-4">
                    <div className="flex items-center gap-4">
                      <span>تیکت #{ticket.id}</span>
                      <span>ایجاد: {ticket.createdAt}</span>
                    </div>
                    <span>آخرین بروزرسانی: {ticket.updatedAt}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State (if no tickets) */}
            {tickets.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-grey-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">📋</span>
                </div>
                <h3 className="text-xl font-bold text-grey-900 mb-2">
                  هیچ تیکتی وجود ندارد
                </h3>
                <p className="text-grey-600 mb-6">
                  اولین تیکت پشتیبانی خود را ایجاد کنید
                </p>
                <button className="bg-brand-primary text-white px-6 py-3 rounded-xl hover:bg-brand-primary/90 transition-colors font-medium">
                  + ایجاد تیکت جدید
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Toast Notifications */}
      {/* <Toaster 
        position="top-center"
        richColors
        dir="rtl"
        toastOptions={{
          style: {
            fontFamily: 'Vazirmatn, sans-serif',
            direction: 'rtl',
            textAlign: 'right'
          }
        }}
      /> */}
    </div>
  );
}
