import { Card } from "@/components/card";
import {
  MessageSquare,
  Users,
  Star,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: "messages" | "users" | "star" | "check";
}

export function StatsCard({
  label,
  value,
  change,
  trend,
  icon,
}: StatsCardProps) {
  const isPositive = trend === "up";

  const getIcon = () => {
    switch (icon) {
      case "messages":
        return MessageSquare;
      case "users":
        return Users;
      case "star":
        return Star;
      case "check":
        return CheckCircle2;
      default:
        return MessageSquare;
    }
  };

  const getIconColor = () => {
    switch (icon) {
      case "messages":
        return "text-brand-primary bg-brand-primary/10";
      case "users":
        return "text-brand-secondary bg-brand-secondary/10";
      case "star":
        return "text-brand-tertiary bg-brand-tertiary/10";
      case "check":
        return "text-success bg-success/10";
      default:
        return "text-brand-primary bg-brand-primary/10";
    }
  };

  const IconComponent = getIcon();
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <Card className="p-6 hover:shadow-md transition-all duration-200 cursor-pointer group">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${getIconColor()} group-hover:scale-110 transition-transform`}
        >
          <IconComponent className="w-6 h-6" />
        </div>

        <div
          className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
            isPositive
              ? "bg-success/10 text-success"
              : "bg-danger/10 text-danger"
          }`}
        >
          <TrendIcon className="w-3 h-3" />
          <span className="ltr">{change}</span>
        </div>
      </div>

      <div>
        <p className="text-grey-500 text-body-small mb-2">{label}</p>
        <p className="text-kpi text-grey-900 ltr">{value}</p>
      </div>
    </Card>
  );
}
