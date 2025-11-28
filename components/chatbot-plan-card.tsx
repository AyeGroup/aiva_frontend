import React from "react";
import {
  TrendingUp,
  Calendar,
  MessageCircle,
  FileText,
  AlertCircle,
} from "lucide-react";
import { Button } from "./button";
// import { Button } from '../Button/button';

export interface ChatbotPlanCardProps {
  chatbotName: string;
  planName: string;
  planColor: string;
  totalCredit: number;
  usedCredit: number;
  totalFileChars: number;
  usedFileChars: number;
  expiryDate: string;
  daysLeft: number;
  onUpgrade?: () => void;
}

export function ChatbotPlanCard({
  chatbotName,
  planName,
  planColor,
  totalCredit,
  usedCredit,
  totalFileChars,
  usedFileChars,
  expiryDate,
  daysLeft,
  onUpgrade,
}: ChatbotPlanCardProps) {
  // محاسبه درصد باقیمانده (نه استفاده شده!)
  const creditRemainingPercentage = Math.round(
    ((totalCredit - usedCredit) / totalCredit) * 100
  );
  const fileRemainingPercentage = Math.round(
    ((totalFileChars - usedFileChars) / totalFileChars) * 100
  );

  // تعیین رنگ بر اساس درصد باقیمانده
  const getCreditColor = (remainingPercentage: number): string => {
    if (remainingPercentage <= 10) return "#FF6B6B"; // قرمز - کم مانده
    if (remainingPercentage <= 30) return "#FFA18E"; // نارنجی - هشدار
    return planColor; // رنگ پلن - وضعیت خوب
  };

  const creditColor = getCreditColor(creditRemainingPercentage);
  const fileColor = getCreditColor(fileRemainingPercentage);

  // تعیین رنگ تاریخ انقضا
  const expiryColor = daysLeft <= 10 ? "#FF6B6B" : "#65bcb6";

  // تعیین وضعیت بر اساس درصد باقیمانده
  const getStatusBadge = () => {
    // استفاده از کمترین درصد بین credit و file
    const minPercentage = Math.min(
      creditRemainingPercentage,
      fileRemainingPercentage
    );

    if (minPercentage <= 10) {
      return {
        color: "#FF6B6B",
        bgColor: "#FF6B6B15",
        borderColor: "#FF6B6B30",
        icon: true,
      };
    } else if (minPercentage <= 30) {
      return {
        color: "#FFA18E",
        bgColor: "#FFA18E15",
        borderColor: "#FFA18E30",
        icon: false,
      };
    } else {
      return {
        color: planColor,
        bgColor: `${planColor}15`,
        borderColor: `${planColor}30`,
        icon: false,
      };
    }
  };

  const statusBadge = getStatusBadge();

  // ایجاد نمودار دایره‌ای SVG بهبود یافته
  const CircularProgress = ({
    percentage,
    color,
    size = 140,
    strokeWidth = 12,
  }: {
    percentage: number;
    color: string;
    size?: number;
    strokeWidth?: number;
  }) => {
    const radius = (size - strokeWidth * 2) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;
    const center = size / 2;

    // ایجاد gradient ID یکتا
    const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;

    // رنگ روشن‌تر برای gradient
    const lighterColor = `${color}80`;

    return (
      <svg width={size} height={size} className="circular-progress">
        <defs>
          {/* Gradient برای افکت زیباتر */}
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={lighterColor} stopOpacity="0.8" />
          </linearGradient>

          {/* فیلتر سایه نرم */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* دایره پس‌زمینه خارجی - برای depth */}
        <circle
          cx={center}
          cy={center}
          r={radius + 4}
          fill="none"
          stroke="#F3F4F6"
          strokeWidth={strokeWidth + 4}
          opacity="0.5"
        />

        {/* دایره پس‌زمینه اصلی */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          className="circular-progress-bg"
        />

        {/* دایره پیشرفت با gradient و انیمیشن */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="circular-progress-fill"
          filter="url(#glow)"
          style={{
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
            transition: "stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />

        {/* دایره داخلی برای افکت بیشتر */}
        <circle
          cx={center}
          cy={center}
          r={radius - strokeWidth - 4}
          fill="white"
          stroke={`${color}20`}
          strokeWidth="2"
          className="circular-progress-inner"
        />

        {/* درصد در مرکز */}
        <text
          x="50%"
          y="45%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="circular-progress-text"
          style={{
            fill: color,
            fontSize: "28px",
            fontWeight: "bold",
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
          }}
        >
          {percentage}%
        </text>

        {/* متن کوچک زیر درصد */}
        <text
          x="50%"
          y="62%"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fill: "#6B7280",
            fontSize: "12px",
          }}
        >
          باقیمانده
        </text>
      </svg>
    );
  };

  return (
    <article
      className="chatbot-plan-card"
      style={{
        borderColor: `${planColor}40`,
      }}
    >
      {/* Header با رنگ پلن */}
      <header
        className="chatbot-plan-card-header"
        style={{
          background: `linear-gradient(135deg, ${planColor}15 0%, ${planColor}05 100%)`,
          borderRight: `4px solid ${planColor}`,
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center animate-pulse-slow"
              style={{ backgroundColor: `${planColor}20` }}
            >
              <MessageCircle className="w-6 h-6" style={{ color: planColor }} />
            </div>
            <div>
              <h3 className="text-grey-900 text-right">{chatbotName}</h3>
              <span
                className="inline-block px-3 py-1 rounded-full text-sm text-white mt-1"
                style={{ backgroundColor: planColor }}
              >
                {planName}
              </span>
            </div>
          </div>

          {/* نمایش وضعیت اعتبار */}
          <div
            className={`status-badge flex items-center gap-2 px-4 py-2 rounded-xl ${
              statusBadge.icon ? "animate-pulse-slow" : ""
            }`}
            style={{
              backgroundColor: statusBadge.bgColor,
              border: `2px solid ${statusBadge.borderColor}`,
            }}
          >
            {statusBadge.icon && (
              <AlertCircle
                className="w-5 h-5"
                style={{ color: statusBadge.color }}
              />
            )}
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: statusBadge.color }}
            ></span>
            <span
              className="text-sm"
              style={{ color: statusBadge.color, fontWeight: "600" }}
            >
              {daysLeft} روز مانده
            </span>
          </div>
        </div>
      </header>

      {/* بخش نمودارها */}
      <div className="chatbot-plan-card-body">
        <div className="grid grid-cols-2 gap-6">
          {/* نمودار اعتبار پیام */}
          <div className="flex flex-col items-center gap-4">
            <CircularProgress
              percentage={creditRemainingPercentage}
              color={creditColor}
              size={140}
              strokeWidth={12}
            />
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <MessageCircle
                  className="w-5 h-5"
                  style={{ color: creditColor }}
                />
                <span className="text-grey-700">اعتبار پیام</span>
              </div>
              <div className="text-grey-900">
                <span className="text-xl" style={{ color: creditColor }}>
                  {(totalCredit - usedCredit).toLocaleString("fa-IR")}
                </span>
                <span className="text-grey-500 mr-1">
                  / {totalCredit.toLocaleString("fa-IR")}
                </span>
              </div>
              <div className="text-xs text-grey-500 mt-2 flex items-center justify-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-grey-400"></span>
                {usedCredit.toLocaleString("fa-IR")} استفاده شده
              </div>
            </div>
          </div>

          {/* نمودار کاراکتر فایل */}
          <div className="flex flex-col items-center gap-4">
            <CircularProgress
              percentage={fileRemainingPercentage}
              color={fileColor}
              size={140}
              strokeWidth={12}
            />
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <FileText className="w-5 h-5" style={{ color: fileColor }} />
                <span className="text-grey-700">کاراکتر فایل</span>
              </div>
              <div className="text-grey-900">
                <span className="text-xl" style={{ color: fileColor }}>
                  {((totalFileChars - usedFileChars) / 1000).toLocaleString(
                    "fa-IR"
                  )}
                  K
                </span>
                <span className="text-grey-500 mr-1">
                  / {(totalFileChars / 1000).toLocaleString("fa-IR")}K
                </span>
              </div>
              <div className="text-xs text-grey-500 mt-2 flex items-center justify-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-grey-400"></span>
                {(usedFileChars / 1000).toLocaleString("fa-IR")}K استفاده شده
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="chatbot-plan-card-footer">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-grey-600">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">
              انقضا: <span className="text-grey-900">{expiryDate}</span>
            </span>
            <span
              className="text-sm px-2 py-1 rounded-lg"
              style={{
                backgroundColor: `${expiryColor}15`,
                color: expiryColor,
              }}
            >
              {daysLeft} روز مانده
            </span>
          </div>

          {onUpgrade && (
            <Button
              variant="primary"
              size="sm"
              title="ارتقای پلن"
              onClick={onUpgrade}
            >
              <TrendingUp className="w-4 h-4 ml-1" />
              ارتقا پلن
            </Button>
          )}
        </div>
      </footer>
    </article>
  );
}
