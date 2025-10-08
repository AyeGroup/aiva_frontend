import { Card } from "@/components/card";
import { Button } from "@/components/button";
import {
  Plus,
  Settings,
  FileText,
  BarChart3,
  Users,
  MessageSquare,
} from "lucide-react";

export function QuickActions() {
  const actions = [
    {
      id: "add-knowledge",
      title: "اضافه کردن دانش",
      description: "محتوا و اطلاعات جدید",
      icon: Plus,
      color: "brand-primary",
      action: () => console.log("Add knowledge"),
    },
    {
      id: "chat-settings",
      title: "تنظیمات چت",
      description: "شخصی‌سازی و پیکربندی",
      icon: Settings,
      color: "brand-secondary",
      action: () => console.log("Chat settings"),
    },
    {
      id: "view-reports",
      title: "گزارش‌ها",
      description: "آمار تفصیلی عملکرد",
      icon: BarChart3,
      color: "brand-tertiary",
      action: () => console.log("View reports"),
    },
    {
      id: "manage-users",
      title: "مدیریت کاربران",
      description: "مشاهده و مدیریت",
      icon: Users,
      color: "success",
      action: () => console.log("Manage users"),
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "brand-primary":
        return "bg-brand-primary/10 text-brand-primary border-brand-primary/20";
      case "brand-secondary":
        return "bg-brand-secondary/10 text-brand-secondary border-brand-secondary/20";
      case "brand-tertiary":
        return "bg-brand-tertiary/10 text-brand-tertiary border-brand-tertiary/20";
      case "success":
        return "bg-success/10 text-success border-success/20";
      default:
        return "bg-grey-100 text-grey-600 border-grey-200";
    }
  };

  return (
    <Card className="p-6 mb-8 bg-gradient-to-l from-bg-soft-mint to-bg-soft-rose">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-grey-900 mb-2">اقدامات سریع</h2>
          <p className="text-grey-600 text-body-small">
            دسترسی آسان به امکانات پرکاربرد
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-success" />
          </div>
          <span className="text-success text-body-small font-medium">فعال</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => {
          const IconComponent = action.icon;
          const colorClasses = getColorClasses(action.color);

          return (
            <button
              key={action.id}
              onClick={action.action}
              className="p-4 bg-white rounded-xl border-2 border-transparent hover:border-current transition-all duration-200 hover:scale-105 hover:shadow-md group text-right"
            >
              <div
                className={`w-12 h-12 rounded-lg ${colorClasses} border-2 mb-3 flex items-center justify-center group-hover:scale-110 transition-transform`}
              >
                <IconComponent className="w-6 h-6" />
              </div>

              <h3 className="text-grey-900 mb-1 font-medium">{action.title}</h3>
              <p className="text-grey-600 text-body-small">
                {action.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Status Indicator */}
      <div className="mt-6 pt-4 border-t border-white/50">
        <div className="flex items-center justify-between text-body-small">
          <div className="flex items-center gap-2 text-grey-600">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span>دستیار آیوا فعال است</span>
          </div>
          <div className="text-grey-500">آخرین بروزرسانی: ۵ دقیقه پیش</div>
        </div>
      </div>
    </Card>
  );
}
