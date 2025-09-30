import { Card } from "@/components/card";
import { Button } from "@/components/button";
import {
  Globe,
  Smartphone,
  MessageCircle,
  Mail,
  Plus,
  ExternalLink,
} from "lucide-react";

interface Channel {
  id: string;
  name: string;
  type: "website" | "mobile" | "social" | "email";
  status: "active" | "inactive" | "setup";
  url?: string;
  stats: {
    conversations: number;
    users: number;
  };
}

export function ChannelsPanel() {
  const channels: Channel[] = [
    {
      id: "1",
      name: "وب‌سایت اصلی",
      type: "website",
      status: "active",
      url: "example.com",
      stats: {
        conversations: 892,
        users: 654,
      },
    },
    {
      id: "2",
      name: "اپلیکیشن موبایل",
      type: "mobile",
      status: "setup",
      stats: {
        conversations: 0,
        users: 0,
      },
    },
    {
      id: "3",
      name: "تلگرام",
      type: "social",
      status: "inactive",
      stats: {
        conversations: 156,
        users: 89,
      },
    },
    {
      id: "4",
      name: "پشتیبانی ایمیل",
      type: "email",
      status: "active",
      url: "support@example.com",
      stats: {
        conversations: 234,
        users: 187,
      },
    },
  ];

  const getChannelIcon = (type: string) => {
    switch (type) {
      case "website":
        return Globe;
      case "mobile":
        return Smartphone;
      case "social":
        return MessageCircle;
      case "email":
        return Mail;
      default:
        return Globe;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success/10 text-success border-success/20";
      case "inactive":
        return "bg-grey-100 text-grey-500 border-grey-200";
      case "setup":
        return "bg-warning/10 text-warning border-warning/20";
      default:
        return "bg-grey-100 text-grey-500 border-grey-200";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "فعال";
      case "inactive":
        return "غیرفعال";
      case "setup":
        return "در حال راه‌اندازی";
      default:
        return "نامشخص";
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-secondary/10 rounded-lg flex items-center justify-center">
            <Globe className="w-5 h-5 text-brand-secondary" />
          </div>
          <div>
            <h3 className="text-grey-900">کانال‌های ارتباطی</h3>
            <p className="text-grey-600 text-body-small">
              مدیریت نقاط تماس با کاربران
            </p>
          </div>
        </div>

        <Button>
          <Plus className="w-4 h-4 ml-2" />
          کانال جدید
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {channels.map((channel) => {
          const IconComponent = getChannelIcon(channel.type);

          return (
            <div
              key={channel.id}
              className="p-4 border border-border-soft rounded-lg hover:bg-bg-soft-mint/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-grey-100 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-4 h-4 text-grey-600" />
                  </div>
                  <div>
                    <h4 className="text-grey-900 font-medium">
                      {channel.name}
                    </h4>
                    {channel.url && (
                      <p className="text-grey-500 text-xs ltr flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" />
                        {channel.url}
                      </p>
                    )}
                  </div>
                </div>

                <span
                  className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(
                    channel.status
                  )}`}
                >
                  {getStatusLabel(channel.status)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-kpi text-grey-900">
                    {channel.stats.conversations.toLocaleString("fa-IR")}
                  </p>
                  <p className="text-grey-600 text-body-small">مکالمات</p>
                </div>
                <div>
                  <p className="text-kpi text-grey-900">
                    {channel.stats.users.toLocaleString("fa-IR")}
                  </p>
                  <p className="text-grey-600 text-body-small">کاربران</p>
                </div>
              </div>

              {channel.status === "setup" && (
                <div className="mt-3 pt-3 border-t border-border-soft">
                  <Button variant="secondary" className="w-full">
                    تکمیل راه‌اندازی
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-6 pt-4 border-t border-border-soft">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-kpi text-success">
              {channels.filter((c) => c.status === "active").length}
            </p>
            <p className="text-grey-600 text-body-small">فعال</p>
          </div>
          <div>
            <p className="text-kpi text-warning">
              {channels.filter((c) => c.status === "setup").length}
            </p>
            <p className="text-grey-600 text-body-small">راه‌اندازی</p>
          </div>
          <div>
            <p className="text-kpi text-grey-500">
              {channels.filter((c) => c.status === "inactive").length}
            </p>
            <p className="text-grey-600 text-body-small">غیرفعال</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
