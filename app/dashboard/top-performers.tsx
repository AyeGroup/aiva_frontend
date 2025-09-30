import { Card } from "@/components/card";
import { Crown, TrendingUp, MessageSquare } from "lucide-react";

interface PerformerData {
  id: string;
  category: string;
  metric: string;
  value: string;
  rank: number;
  trend: "up" | "down" | "stable";
}

export function TopPerformers() {
  const performers: PerformerData[] = [
    {
      id: "1",
      category: "محبوب‌ترین سؤال",
      metric: "قیمت محصولات",
      value: "234 پرسش",
      rank: 1,
      trend: "up",
    },
    {
      id: "2",
      category: "بهترین پاسخ",
      metric: "راهنمای خرید",
      value: "4.9/5 امتیاز",
      rank: 2,
      trend: "up",
    },
    {
      id: "3",
      category: "بیشترین مکالمه",
      metric: "پشتیبانی فنی",
      value: "156 مکالمه",
      rank: 3,
      trend: "stable",
    },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-3 h-3 text-success" />;
      case "down":
        return (
          <TrendingUp className="w-3 h-3 text-danger transform rotate-180" />
        );
      default:
        return <div className="w-3 h-3 bg-grey-400 rounded-full" />;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-brand-tertiary text-white";
      case 2:
        return "bg-grey-300 text-grey-700";
      case 3:
        return "bg-brand-primary/20 text-brand-primary";
      default:
        return "bg-grey-100 text-grey-600";
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-brand-tertiary/10 rounded-lg flex items-center justify-center">
          <Crown className="w-5 h-5 text-brand-tertiary" />
        </div>
        <div>
          <h3 className="text-grey-900">برترین‌ها</h3>
          <p className="text-grey-600 text-body-small">محبوب‌ترین موضوعات</p>
        </div>
      </div>

      <div className="space-y-4">
        {performers.map((performer) => (
          <div
            key={performer.id}
            className="flex items-center gap-3 p-3 rounded-lg border border-border-soft hover:bg-bg-soft-mint/30 transition-colors"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm ${getRankColor(
                performer.rank
              )}`}
            >
              {performer.rank}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-grey-900 font-medium truncate">
                {performer.metric}
              </p>
              <p className="text-grey-500 text-body-small">
                {performer.category}
              </p>
            </div>

            <div className="text-left">
              <div className="flex items-center gap-1 mb-1">
                {getTrendIcon(performer.trend)}
                <span className="text-grey-900 text-body-small font-medium">
                  {performer.value}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 pt-4 border-t border-border-soft">
        <div className="flex items-center justify-between text-body-small">
          <div className="flex items-center gap-2 text-grey-600">
            <MessageSquare className="w-4 h-4" />
            <span>کل موضوعات فعال</span>
          </div>
          <span className="text-grey-900 font-medium">24 موضوع</span>
        </div>
      </div>
    </Card>
  );
}
