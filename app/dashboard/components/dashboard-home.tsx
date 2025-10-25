"use client";
import axiosInstance from "@/lib/axiosInstance";
import PageLoader from "@/components/pageLoader";
import { Select } from "@/components/select";
import { useAuth } from "@/providers/AuthProvider";
import { BotConfig } from "@/types/common";
import { API_ROUTES } from "@/constants/apiRoutes";
import { HeatmapChart } from "@/components/heatmap-chart";
import { DashboardCard } from "@/components/dashboard-card";
import { ActivityChart } from "@/components/activity-chart";
import { ColorShowcase } from "@/components/color-showcase";
import { convertToPersian } from "@/utils/common";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  DashChats,
  DashMints,
  DashMsg,
  DashRate,
  DashTime,
  DashUser,
} from "@/public/icons/AppIcons";

export default function Dashboard() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const [isNew, setIsNew] = useState(true);
  const [statisticCover, setStatisticCover] = useState<any>(null);
  const [currentBot, setCurrentBot] = useState<BotConfig | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [timeRange, setTimeRange] = useState("30d");
  const [chartType, setChartType] = useState<"users" | "chats">("users");
  const usersData = [
    { name: "شنبه", value: 45 },
    { name: "یکشنبه", value: 52 },
    { name: "دوشنبه", value: 38 },
    { name: "سه‌شنبه", value: 67 },
    { name: "چهارشنبه", value: 49 },
    { name: "پنج‌شنبه", value: 73 },
    { name: "جمعه", value: 41 },
  ];
  const chatsData = [
    { name: "شنبه", value: 123 },
    { name: "یکشنبه", value: 145 },
    { name: "دوشنبه", value: 98 },
    { name: "سه‌شنبه", value: 189 },
    { name: "چهارشنبه", value: 156 },
    { name: "پنج‌شنبه", value: 234 },
    { name: "جمعه", value: 167 },
  ];
  const currentData = chartType === "users" ? usersData : chatsData;
  const chartTitle = chartType === "users" ? "تحلیل کاربران" : "تحلیل گفتگوها";
  const chartColor =
    chartType === "users" ? "var(--brand-primary)" : "var(--brand-secondary)";
  const currentPage = pathname.split("/").pop();

  //Authentication
  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
      return;
    }
  }, [loading, user]);

  //statistic cover
  useEffect(() => {
    if (!user) return;
    if (!currentBot?.uuid) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(
          API_ROUTES.STATISTIC.GET_COVER(currentBot?.uuid)
        );
        if (response.status == 200 && response.data) {
          setStatisticCover(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching bots:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [user, currentBot]);

 
  //کاربر بات ثبت شده دارد؟
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(API_ROUTES.BOTS.GET, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        if (
          response.data.success &&
          response.data.data &&
          response.data.data.length > 0
        ) {
          setIsNew(false);
          setCurrentBot(response.data.data[0]);
          console.log("curret bot :", response.data.data[0]);
        } else setIsNew(true);
      } catch (error) {
        console.error("Error fetching bots:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="h-screen overflow-hidden bg-white">
      <div className="flex h-screen">
        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto h-screen">
          {loading || (isLoading && <PageLoader />)}
          <div className="max-w-7xl mx-auto pb-8">
            <div className="mb-8">
              {/* Page Header */}
              <header className="mb-6">
                <div className="text-right">
                  <h1 className="text-grey-900 mb-0 text-3xl font-bold">
                    میزکار
                  </h1>
                </div>
              </header>

              {/* Quick Stats */}
              {/* Enhanced Stats Hero Section */}
              {isNew && (
                <div className="flex w-full items-center justify-center m-7">
                  <button
                    onClick={() => router.push("onboarding")}
                    className="px-8 py-4 font-bold cursor-pointer rounded-md transition-all duration-200   bg-white text-brand-primary shadow-sm"
                  >
                    اولین بات خود را بسازید
                  </button>
                </div>
              )}
            </div>
            {!isNew && (
              <div className="stats-hero-section bg-[#E3F4F1] p-8 rounded-3xl border-2 border-white/50 shadow-xl backdrop-blur-sm mb-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-grey-900 text-[20px]">
                    📊 آمار کلیدی امروز
                  </h2>
                  <p className="text-[rgba(166,166,166,1)] text-[14px]">
                    نگاهی سریع به عملکرد چت‌بات در ۲۴ ساعت گذشته
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {/* Primary Stat - Enhanced */}
                  <div className="group relative overflow-hidden bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:rotate-1">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-brand-primary/10 rounded-full -translate-y-2 translate-x-2"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-brand-primary/5 rounded-full translate-y-2 -translate-x-2"></div>

                    <div className="relative z-10 text-center">
                      <div className="flex justify-center mb-3">
                        <div className="w-10 h-10 bg-sharp-primary rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-brand-primary/30 transition-all duration-300 group-hover:scale-110">
                          <div className="w-4 h-4 text-white">
                            <DashUser />
                          </div>
                        </div>
                      </div>
                      <div className="text-[24px] font-black text-grey-900 mb-1 group-hover:text-brand-primary transition-colors text-center">
                        {convertToPersian(statisticCover?.active_users || "0")}
                      </div>
                      <div
                        className="text-[14px] font-medium text-center leading-tight"
                        style={{ color: "#A6A6A6" }}
                      >
                        کاربران فعال
                      </div>
                    </div>
                  </div>

                  {/* Conversations Stat */}
                  <div className="group relative overflow-hidden bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-rotate-1">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-brand-secondary/10 rounded-full -translate-y-2 translate-x-2"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-brand-secondary/5 rounded-full translate-y-2 -translate-x-2"></div>

                    <div className="relative z-10 text-center">
                      <div className="flex justify-center mb-3">
                        <div className="w-10 h-10 bg-sharp-secondary rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-brand-secondary/30 transition-all duration-300 group-hover:scale-110">
                          <div className="w-4 h-4 text-white">
                            <DashChats />
                          </div>
                        </div>
                      </div>
                      <div className="text-[24px] font-black text-grey-900 mb-1 group-hover:text-brand-secondary transition-colors text-center">
                        {convertToPersian(
                          statisticCover?.conversations_today || "0"
                        )}
                      </div>
                      <div
                        className="text-[14px] font-medium text-center leading-tight"
                        style={{ color: "#A6A6A6" }}
                      >
                        گفتگوهای امروز
                      </div>
                    </div>
                  </div>

                  {/* Duration Stat */}
                  <div className="group relative overflow-hidden bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:rotate-1">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-brand-accent/10 rounded-full -translate-y-2 translate-x-2"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-brand-accent/5 rounded-full translate-y-2 -translate-x-2"></div>

                    <div className="relative z-10 text-center">
                      <div className="flex justify-center mb-3">
                        <div className="w-10 h-10 bg-sharp-accent rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-brand-accent/30 transition-all duration-300 group-hover:scale-110">
                          <div className="w-4 h-4 text-white">
                            <DashMints />
                          </div>
                        </div>
                      </div>
                      <div className="text-[24px] font-black text-grey-900 mb-1 group-hover:text-brand-accent transition-colors text-center">
                        {convertToPersian(
                          statisticCover?.avg_duration_minutes || "0"
                        )}
                      </div>
                      <div
                        className="text-[14px] font-medium text-center leading-tight"
                        style={{ color: "#A6A6A6" }}
                      >
                        دقیقه متوسط گفتگو
                      </div>
                    </div>
                  </div>

                  {/* Response Time */}
                  <div className="group relative overflow-hidden bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-rotate-1">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-brand-emerald/10 rounded-full -translate-y-2 translate-x-2"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-brand-emerald/5 rounded-full translate-y-2 -translate-x-2"></div>

                    <div className="relative z-10 text-center">
                      <div className="flex justify-center mb-3">
                        <div className="w-10 h-10 bg-sharp-emerald rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-brand-emerald/30 transition-all duration-300 group-hover:scale-110">
                          <div className="w-4 h-4 text-white">
                            <DashTime />
                          </div>
                        </div>
                      </div>
                      <div className="text-[24px] font-black text-grey-900 mb-1 group-hover:text-brand-emerald transition-colors text-center">
                        {convertToPersian(
                          statisticCover?.avg_response_time_seconds || "0"
                        )}
                      </div>
                      <div
                        className="text-[14px] font-medium text-center leading-tight"
                        style={{ color: "#A6A6A6" }}
                      >
                        زمان پاسخ متوسط
                      </div>
                    </div>
                  </div>

                  {/* Success Rate */}
                  <div className="group relative overflow-hidden bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:rotate-1">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-success/10 rounded-full -translate-y-2 translate-x-2"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-success/5 rounded-full translate-y-2 -translate-x-2"></div>

                    <div className="relative z-10 text-center">
                      <div className="flex justify-center mb-3">
                        <div className="w-10 h-10 bg-success rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-success/30 transition-all duration-300 group-hover:scale-110">
                          <div className="w-4 h-4 text-white">
                            <DashRate />
                          </div>
                        </div>
                      </div>
                      <div className="text-[24px] font-black text-grey-900 mb-1 group-hover:text-success transition-colors text-center">
                        {convertToPersian(
                          statisticCover?.satisfaction_rate || "0"
                        )}
                      </div>
                      <div
                        className="text-[14px] font-medium text-center leading-tight"
                        style={{ color: "#A6A6A6" }}
                      >
                        نرخ رضایت کاربران
                      </div>
                    </div>
                  </div>

                  {/* Messages Count */}
                  <div className="group relative overflow-hidden bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-rotate-1">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-brand-purple/10 rounded-full -translate-y-2 translate-x-2"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-brand-purple/5 rounded-full translate-y-2 -translate-x-2"></div>

                    <div className="relative z-10 text-center">
                      <div className="flex justify-center mb-3">
                        <div className="w-10 h-10 bg-sharp-violet rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-brand-purple/30 transition-all duration-300 group-hover:scale-110">
                          <div className="w-4 h-4 text-white">
                            <DashMsg />
                          </div>
                        </div>
                      </div>
                      <div className="text-[24px] font-black text-grey-900 mb-1 group-hover:text-brand-purple transition-colors text-center">
                        {convertToPersian(
                          statisticCover?.messages_per_conversation || "0"
                        )}
                      </div>
                      <div
                        className="text-[14px] font-medium text-center leading-tight"
                        style={{ color: "#A6A6A6" }}
                      >
                        پیام در هر گفتگو
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Insights */}
              </div>
            )}

            {/* Main Content Row - 50-50 Layout */}
            {!isNew && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Activity Chart - 50% */}
                <div>
                  <DashboardCard size="xl" variant="borderless">
                    <div className="flex items-center justify-between mt-[0px] mr-[0px] mb-[16px] ml-[0px]">
                      {/* Toggle Switch as Title */}
                      <div className="flex items-center gap-2 bg-grey-100 rounded-lg p-1">
                        <button
                          onClick={() => setChartType("users")}
                          className={`px-3 py-1.5 rounded-md transition-all duration-200 ${
                            chartType === "users"
                              ? "bg-white text-brand-primary shadow-sm"
                              : "hover:text-grey-900"
                          }`}
                          style={{
                            fontSize: "16px",
                            fontWeight: "normal",
                            color:
                              chartType === "users" ? undefined : "#BFBFBF",
                          }}
                        >
                          تعداد کاربران
                        </button>
                        <button
                          onClick={() => setChartType("chats")}
                          className={`px-3 py-1.5 rounded-md transition-all duration-200 ${
                            chartType === "chats"
                              ? "bg-white text-brand-secondary shadow-sm"
                              : "hover:text-grey-900"
                          }`}
                          style={{
                            fontSize: "16px",
                            fontWeight: "normal",
                            color:
                              chartType === "chats" ? undefined : "#BFBFBF",
                          }}
                        >
                          تعداد گفتگوها
                        </button>
                      </div>

                      <Select
                        value={timeRange}
                        onValueChange={setTimeRange}
                        placeholder="انتخاب بازه زمانی"
                        // size="small"
                        className="min-w-[120px]"
                      >
                        <option value="1d">امروز</option>
                        <option value="7d">۷ روز اخیر</option>
                        <option value="30d">۳۰ روز اخیر</option>
                        <option value="90d">۹۰ روز اخیر</option>
                      </Select>
                    </div>
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2 px-[12px] py-[0px]">
                        <p className="text-body-small text-[rgba(166,166,166,1)] text-[14px]">
                          {chartType === "users"
                            ? "تعداد کاربران فعال در هر روز"
                            : "تعداد گفتگوهای انجام شده در هر روز"}
                        </p>
                      </div>
                    </div>
                    <ActivityChart
                      data={currentData}
                      height={200}
                      color={chartColor}
                    />
                  </DashboardCard>
                </div>

                {/* Heatmap Chart - 50% */}
                <div>
                  <HeatmapChart
                    botId={currentBot?.uuid || ""}
                    title="ساعات فعالیت چت‌بات"
                    subtitle="نمودار حرارتی استفاده در طول هفته"
                  />
                </div>
              </div>
            )}

            {/* Channels Row */}
            {!isNew && (
              <div className="relative mb-8">
                {/* Header Text */}
                <div className="flex justify-end mb-4 ml-auto w-fit">
                  <div className="text-right">
                    <h3 className="font-bold text-grey-900 mb-1">
                      فعال ترین کاربران
                    </h3>
                  </div>
                </div>

                {/* Active Users Container */}
                <div
                  className="glass-effect rounded-[var(--radius-card)] p-6 mt-"
                  style={{
                    background: "#FEF9F6",
                    border: "2px solid transparent",
                    backgroundClip: "padding-box",
                  }}
                >
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-[0px] mt-[12px] mr-[0px] mb-[0px] ml-[0px]">
                    {/* User 1 */}
                    <div className="relative bg-white rounded-lg p-4 pt-8 text-center shadow-sm hover-lift">
                      <div
                        className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center shadow-md text-white font-bold"
                        style={{
                          background: "#e19f87",
                        }}
                      >
                        م
                      </div>
                      <h4 className="font-bold text-grey-900 mb-2 mt-2">
                        محمد احمدی
                      </h4>
                      <p className="text-2xl font-semibold text-grey-900">
                        ۱۲۳
                      </p>
                      <p className="text-body-small text-grey-500">گفتگو</p>
                    </div>

                    {/* User 2 */}
                    <div className="relative bg-white rounded-lg p-4 pt-8 text-center shadow-sm hover-lift">
                      <div
                        className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center shadow-md text-white font-bold"
                        style={{
                          background: "#65bcb6",
                        }}
                      >
                        ز
                      </div>
                      <h4 className="font-bold text-grey-900 mb-2 mt-2">
                        زهرا کریمی
                      </h4>
                      <p className="text-2xl font-semibold text-grey-900">۹۸</p>
                      <p className="text-body-small text-grey-500">گفتگو</p>
                    </div>

                    {/* User 3 */}
                    <div className="relative bg-white rounded-lg p-4 pt-8 text-center shadow-sm hover-lift">
                      <div
                        className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center shadow-md text-white font-bold"
                        style={{
                          background: "#52d4a0",
                        }}
                      >
                        ع
                      </div>
                      <h4 className="font-bold text-grey-900 mb-2 mt-2">
                        علی رضایی
                      </h4>
                      <p className="text-2xl font-semibold text-grey-900">۸۷</p>
                      <p className="text-body-small text-grey-500">گفتگو</p>
                    </div>

                    {/* User 4 - Enhanced Card */}
                    <div className="relative bg-white rounded-lg p-4 pt-8 text-center shadow-sm hover-lift">
                      <div
                        className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center shadow-md text-white font-bold"
                        style={{
                          background: "#b07cc6",
                        }}
                      >
                        ف
                      </div>
                      <h4 className="font-bold text-grey-900 mb-2 mt-2">
                        فاطمه حسینی
                      </h4>
                      <p className="text-2xl font-semibold text-grey-900">۷۲</p>
                      <p className="text-body-small text-grey-500">گفتگو</p>
                    </div>

                    {/* More Users Button */}
                    <div
                      className="relative rounded-lg p-4 shadow-sm hover-lift cursor-pointer flex items-center justify-center"
                      style={{
                        background: "#FF8970",
                        border: "1px solid #FF8970",
                      }}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <h4 className="font-bold text-[14px] text-[rgba(255,255,255,1)]">
                          مشاهده همه
                        </h4>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="text-white"
                        >
                          <path d="M8 6l6 6-6 6V6z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Active Users Section */}
            {!isNew && <div className="mb-8">{/* <ActiveUsers /> */}</div>}
            {!isNew && (
              <div className="mb-8">
                <ColorShowcase />
              </div>
            )}

            {!isNew && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* <RecentChats /> */}
                <div className="flex flex-col gap-6">
                  {/* Placeholder for removed card */}
                  <div className="bg-white rounded-lg p-6 shadow-card">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-grey-900">سوالات متداول</h3>
                      <div className="w-8 h-8 bg-bg-soft-mint rounded-full flex items-center justify-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="text-brand-primary"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
                        </svg>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-grey-600">سوالات فنی</span>
                        <span className="text-brand-primary font-medium">
                          {convertToPersian("245")} کلیک
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-grey-600">راهنمای خرید</span>
                        <span className="text-brand-primary font-medium">
                          {convertToPersian("184")} کلیک
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-grey-600">پشتیبانی</span>
                        <span className="text-brand-primary font-medium">
                          {convertToPersian("142")} کلیک
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-grey-600">قیمت گذاری</span>
                        <span className="text-brand-primary font-medium">
                          {convertToPersian("98")} کلیک
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* <UpgradeBanner /> */}
                </div>
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
            fontFamily: "Vazirmatn, sans-serif",
            direction: "rtl",
            textAlign: "right",
          },
        }}
      /> */}
    </div>
  );
}
