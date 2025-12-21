import axiosInstance from "@/lib/axiosInstance";
import React, { useEffect, useState } from "react";
import { DAYS, paersianDay } from "@/constants/common";
import { useAuth } from "@/providers/AuthProvider";
import { API_ROUTES } from "@/constants/apiRoutes";
import { convertToPersian, utcHourToLocalTime } from "@/utils/common";
import PageLoader from "./pageLoader";

interface HeatmapChartProps {
  botId: string;
  title?: string;
  subtitle?: string;
}

const HOURS = Array.from({ length: 24 }, (_, i) => i);

export function HeatmapChart({
  botId,
  title = "ساعات فعالیت چت بات",
  subtitle = "توزیع حجم گفتگوها در ساعات مختلف هفته",
}: HeatmapChartProps) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [peakHour, setPeakHour] = useState("");
  const [peakDay, setPeakDay] = useState("");
  const [statisticHeatmap, setStatisticHeatmap] = useState<Record<
    string,
    number[]
  > | null>(null);

  useEffect(() => {
    if (!user || !botId) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(
          API_ROUTES.STATISTIC.HEATMAP(botId)
        );

        if (response.status === 200 && response.data?.data) {
          const { heatmap, peak_hour, most_active_day } = response.data.data;
          // console.log("heatmap",heatmap)
          setStatisticHeatmap(heatmap);
          const peak = utcHourToLocalTime(peak_hour);
          setPeakHour(peak);
          setPeakDay(paersianDay(most_active_day));
        }
      } catch (error) {
        console.error("Error fetching heatmap:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, botId]);

  const getColorForValue = (value: number) => {
    if (value <= 1) return { bg: "#E8FAFA", border: "#CCF4F4" };
    if (value <= 30) return { bg: "#B0EEEE", border: "#94E8E8" };
    if (value <= 45) return { bg: "#78E2E2", border: "#4CC3C3" };
    if (value <= 60) return { bg: "#F1B196", border: "#EE9E7C" };
    if (value <= 75) return { bg: "#E9936E", border: "#D6785B" };
    return { bg: "#C35E49", border: "#A94B3B" };
  };

  const englishDays = [
    "saturday",
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
  ];

  return (
    <div
      className="w-full bg-white border border-grey-200 shadow-card"
      style={{
        padding: "16px",
        borderRadius: "20px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
      }}
    >
      {isLoading && <PageLoader />}
      {title && (
        <div className="text-right mb-4 md:mb-6">
          <h3
            className="text-grey-900 mb-1"
            style={{ fontSize: "16px", fontWeight: "600" }}
          >
            {title}
          </h3>
          {subtitle && (
            <p
              className="text-grey-600"
              style={{ fontSize: "12px", lineHeight: "1.4" }}
            >
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* جدول اصلی با اسکرول افقی */}
      <div className="overflow-x-auto mb-4 md:mb-5 -mx-4 px-4 md:mx-0 md:px-0">
        <div
          className="flex flex-col w-fit"
          style={{ gap: "3px", fontSize: "11px" }}
        >
          {/* ردیف ساعت‌ها - عنوان‌ها دقیقاً بالای سلول‌ها */}
          <div className="flex items-start" style={{ gap: "3px" }}>
            <div style={{ width: "46px", flexShrink: 0 }}></div>
            <div className="flex" style={{ gap: "3px" }}>
              {HOURS.map((hour) => (
                <div
                  key={hour}
                  className="flex items-start justify-center text-grey-500"
                  style={{
                    width: "11px",
                    height: "16px",
                    fontSize: "10px",
                    fontWeight: "500",
                    paddingTop: "2px",
                  }}
                  title={`ساعت ${hour}:00`}
                >
                  {hour % 2 === 1 ? convertToPersian(hour) : ""}
                </div>
              ))}
            </div>
          </div>

          {/* روزها */}
          {DAYS.map((dayFa, dayIndex) => {
            const dayEn = englishDays[dayIndex];
            const hoursData = statisticHeatmap?.[dayEn] || [];

            return (
              <div
                key={dayIndex}
                className="flex items-center"
                style={{ gap: "3px" }}
              >
                <div
                  className="flex items-center justify-end text-grey-700 shrink-0 text-right"
                  style={{
                    width: "46px",
                    height: "22px",
                    fontSize: "11px",
                    fontWeight: "500",
                    paddingRight: "4px",
                  }}
                >
                  {dayFa}
                </div>
                <div className="flex" style={{ gap: "3px" }}>
                  {HOURS.map((hour) => {
                    const value = hoursData[hour] ?? 0;
                    const color = getColorForValue(value);

                    return (
                      <div
                        key={`${dayEn}-${hour}`}
                        className="cursor-pointer transition-all duration-150 hover:opacity-80"
                        style={{
                          width: "11px",
                          height: "22px",
                          backgroundColor: color.bg,
                          border: `1px solid ${color.border}`,
                          borderRadius: "3px",
                        }}
                        title={`${dayFa} - ساعت ${convertToPersian(
                          hour
                        )} | ${convertToPersian(value)} گفتگو`}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* آمار پایین */}
      <div
        className="flex flex-col sm:flex-row justify-around gap-4 sm:gap-0"
        style={{
          padding: "12px 16px",
          background: "rgba(255, 161, 142, 0.04)",
          borderRadius: "12px",
          border: "1px solid rgba(255, 161, 142, 0.08)",
        }}
      >
        <div className="text-center flex flex-col" style={{ gap: "2px" }}>
          <span
            className="text-grey-600"
            style={{ fontSize: "10px", fontWeight: "500" }}
          >
            پیک استفاده
          </span>
          <span
            style={{
              fontSize: "14px",
              color: "#0A0A0A",
              fontWeight: "700",
              direction: "ltr",
            }}
          >
            {convertToPersian(peakHour || "0")}
          </span>
        </div>
        <div className="text-center flex flex-col" style={{ gap: "2px" }}>
          <span
            className="text-grey-600"
            style={{ fontSize: "10px", fontWeight: "500" }}
          >
            فعال‌ترین روز
          </span>
          <span
            style={{
              fontSize: "14px",
              color: "#0A0A0A",
              fontWeight: "700",
              direction: "rtl",
            }}
          >
            {peakDay}
          </span>
        </div>
      </div>
    </div>
  );
}
