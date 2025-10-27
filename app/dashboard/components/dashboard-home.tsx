"use client";
import axiosInstance from "@/lib/axiosInstance";
import PageLoader from "@/components/pageLoader";
import { Select } from "@/components/select";
import { useBot } from "@/providers/BotProvider";
import { useAuth } from "@/providers/AuthProvider";
import { API_ROUTES } from "@/constants/apiRoutes";
import { RecentChats } from "../recent-chats";
import { HeatmapChart } from "@/components/heatmap-chart";
import { UpgradeBanner } from "../upgrade-banner";
import { ActivityChart } from "@/components/activity-chart";
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
  Faqs,
  User,
} from "@/public/icons/AppIcons";

export default function Dashboard() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const [isNew, setIsNew] = useState(true);
  const [statisticCover, setStatisticCover] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isChartLoading, setIsChartLoading] = useState(false);
  const [usersData, setUsersData] = useState<any[]>([]);
  const [chatsData, setChatsData] = useState<any[]>([]);
  const [activeUsers, setActiveUsers] = useState<any[]>([]);
  const [recentSession, setRecentSession] = useState<any[]>([]);
  const [faqList, setFaqList] = useState<any[]>([]);
  const [timeRange, setTimeRange] = useState("7d");
  const [chartType, setChartType] = useState<"users" | "chats">("users");
  const TIME_RANGES = [
    { value: "7d", label: "۷ روز اخیر" },
    { value: "30d", label: "۳۰ روز اخیر" },
    { value: "90d", label: "۹۰ روز اخیر" },
  ];
  const colors = ["#e19f87", "#65bcb6", "#52d4a0", "#b07cc6", "#f9c74f"];
  const currentData = chartType === "users" ? usersData : chatsData;
  const chartColor =
    chartType === "users" ? "var(--brand-primary)" : "var(--brand-secondary)";

  const chartTitle = chartType === "users" ? "تحلیل کاربران" : "تحلیل گفتگوها";
  const currentPage = pathname.split("/").pop();
  const { currentBot, setCurrentBot, bots } = useBot();

  //Authentication
  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
      return;
    }
  }, [loading, user]);

  // user has a bot
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
          // setCurrentBot(response.data.data[0]);
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

  //call statistics api
  useEffect(() => {
    if (!user || !currentBot) return;

    fetchUserTrend(timeRange);
    fetchSessionTrend(timeRange);
    fetchActiveUsers();
    fetchRecentSession();
    fetchFaqList();
  }, [user, currentBot, timeRange]);

  const fetchUserTrend = async (days: string) => {
    if (!currentBot) return;
    try {
      const response = await axiosInstance.get(
        API_ROUTES.STATISTIC.USERS(currentBot?.uuid),
        { params: { days: days.replace("d", "") } }
      );
      const formattedData = response.data.data.map((d: any) => ({
        name: new Date(d.time ?? "").toLocaleDateString("fa-IR"),
        value: d.value + 3,
      }));

      setUsersData(formattedData);
    } catch (error) {
      console.error("  خطا در دریافت داده کاربران:", error);
    }
  };

  const fetchSessionTrend = async (days: string) => {
    if (!currentBot) return;
    try {
      const response = await axiosInstance.get(
        API_ROUTES.STATISTIC.USERS(currentBot?.uuid),
        { params: { days: days.replace("d", "") } }
      );
      const formattedData = response.data.data.map((d: any) => ({
        name: new Date(d.time ?? "").toLocaleDateString("fa-IR"),
        value: d.value + 3,
      }));

      setChatsData(formattedData);
    } catch (error) {
      console.error("  خطا در دریافت داده کاربران:", error);
    }
  };

  const fetchActiveUsers = async () => {
    if (!currentBot) return;
    try {
      const response = await axiosInstance.get(
        API_ROUTES.STATISTIC.ACTIVE_USERS(currentBot?.uuid)
      );
      setActiveUsers(response.data.data);
      // console.log("user", response.data.data);
    } catch (error) {
      console.error("  خطا در دریافت داده کاربران:", error);
    }
  };

  const fetchFaqList = async () => {
    if (!currentBot) return;
    try {
      const response = await axiosInstance.get(
        API_ROUTES.STATISTIC.FAQ_LIST(currentBot?.uuid)
      );
      setFaqList(response.data.data);

      // console.log("setFaqList", response.data.data);
    } catch (error) {
      console.error("  خطا در دریافت داده کاربران:", error);
    }
  };

  const fetchRecentSession = async () => {
    if (!currentBot) return;
    try {
      const response = await axiosInstance.get(
        API_ROUTES.STATISTIC.RECCENT_SESSION(currentBot?.uuid)
      );
      setRecentSession(response.data.data);

      console.log("RecentSession", response.data.data);
    } catch (error) {
      console.error("  خطا در دریافت داده کاربران:", error);
    }
  };

  const handleTimeRangeChange = async (value: string) => {
    setIsChartLoading(true);
    await fetchSessionTrend(value);
    await fetchUserTrend(value);
    setIsChartLoading(false);
  };

  const handleChatClick = async () => {};

  return (
    <div className="h-screen  bg-white !z-0" style={{ zIndex: 0 }}>
      {/* overflow-hidden */}
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

            {/* آمار کلیدی امروز */}
            {!isNew && (
              <div className=" !z-0 stats-hero-section bg-[#E3F4F1] p-8 rounded-3xl border-2 border-white/50 shadow-xl backdrop-blur-sm mb-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-grey-900 text-[20px]">
                    📊 آمار کلیدی امروز
                  </h2>
                  <p className="text-[rgba(166,166,166,1)] text-[14px]">
                    نگاهی سریع به عملکرد چت‌بات در ۲۴ ساعت گذشته
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {/* Primary Stat - Enhanced overflow-hidden*/}
                  <div className="group relative  bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:rotate-1">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-brand-primary/10 rounded-full -translate-y-2 translate-x-2"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-brand-primary/5 rounded-full translate-y-2 -translate-x-2"></div>

                    <div className="relative text-center">
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
                  <div className="group relative  bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-rotate-1">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-brand-secondary/10 rounded-full -translate-y-2 translate-x-2"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-brand-secondary/5 rounded-full translate-y-2 -translate-x-2"></div>

                    <div className="relative  text-center">
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

                  {/* Duration Stat overflow-hidden*/}
                  <div className="group relative  bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:rotate-1">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-brand-accent/10 rounded-full -translate-y-2 translate-x-2"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-brand-accent/5 rounded-full translate-y-2 -translate-x-2"></div>

                    <div className="relative  text-center">
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

                  {/* Response Time overflow-hidden*/}
                  <div className="group relative  bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-rotate-1">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-brand-emerald/10 rounded-full -translate-y-2 translate-x-2"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-brand-emerald/5 rounded-full translate-y-2 -translate-x-2"></div>

                    <div className="relative  text-center">
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

                  {/* Success Rate overflow-hidden*/}
                  <div className="group relative  bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:rotate-1">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-success/10 rounded-full -translate-y-2 translate-x-2"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-success/5 rounded-full translate-y-2 -translate-x-2"></div>

                    <div className="relative  text-center">
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

                  {/* Messages Count overflow-hidden*/}
                  <div className="group relative  bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-rotate-1">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-brand-purple/10 rounded-full -translate-y-2 translate-x-2"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-brand-purple/5 rounded-full translate-y-2 -translate-x-2"></div>

                    <div className="relative text-center">
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

            {/* نمودار تعداد کاربران و گفتگوها  */}
            {!isNew && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
                <div>
                  <div className="flex m-4 mt-7 items-center justify-between ">
                    <div className="flex items-center gap-2 bg-grey-100 rounded-lg p-1">
                      <button
                        onClick={() => setChartType("users")}
                        className={`px-2 py-1 rounded-md transition-all duration-200 ${
                          chartType === "users"
                            ? "bg-white text-brand-primary shadow-sm"
                            : "hover:text-grey-900"
                        }`}
                        style={{
                          fontSize: "14px",
                          fontWeight: "normal",
                          color: chartType === "users" ? undefined : "#BFBFBF",
                        }}
                      >
                        تعداد کاربران
                      </button>
                      <button
                        onClick={() => setChartType("chats")}
                        className={`px-2 py-1 rounded-md transition-all duration-200 ${
                          chartType === "chats"
                            ? "bg-white text-brand-secondary shadow-sm"
                            : "hover:text-grey-900"
                        }`}
                        style={{
                          fontSize: "14px",
                          fontWeight: "normal",
                          color: chartType === "chats" ? undefined : "#BFBFBF",
                        }}
                      >
                        تعداد گفتگوها
                      </button>
                    </div>

                    <Select
                      value={timeRange}
                      onValueChange={(value) => {
                        setTimeRange(value);
                        handleTimeRangeChange(value);
                      }}
                      placeholder="انتخاب بازه زمانی"
                      size="small"
                      disabled={isChartLoading}
                      className="min-w-[120px]"
                    >
                      {TIME_RANGES.map((range) => (
                        <option key={range.value} value={range.value}>
                          {range.label}
                        </option>
                      ))}
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
                </div>
                {/* نمودار حرارتی */}
                <div>
                  <HeatmapChart
                    botId={currentBot?.uuid || ""}
                    title="ساعات فعالیت چت‌بات"
                    subtitle="نمودار حرارتی استفاده در طول هفته"
                  />
                </div>
              </div>
            )}

            {/* فعال‌ترین کاربران*/}
            {!isNew && (
              <div className="relative mb-8">
                {/* Header Text */}
                <div className="flex justify-end mb-4 ml-auto w-fit">
                  <div className="text-right">
                    <h3 className="font-bold text-grey-900 mb-1">
                      فعال‌ترین کاربران
                    </h3>
                  </div>
                </div>

                {/* Active Users Container */}
                <div
                  className="glass-effect rounded-[var(--radius-card)] p-6"
                  style={{
                    background: "#FEF9F6",
                    border: "2px solid transparent",
                    backgroundClip: "padding-box",
                  }}
                >
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-4 gap-4">
                    {activeUsers.map((user, index) => {
                      const color = colors[index % colors.length]; // انتخاب رنگ به ترتیب
                      return (
                        <div
                          key={index}
                          className="relative bg-white rounded-lg p-4 pt-8 text-center shadow-sm hover-lift"
                        >
                          <div
                            className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center shadow-md text-white font-bold"
                            style={{ background: color }}
                          >
                            {/* {user.name.charAt(0)} */}
                            <div className="w-4 h-4">
                              <User />
                            </div>
                          </div>

                          <h4
                            className="font-bold text-grey-900 mb-2 mt-2 truncate"
                            // title={user.name}
                          >
                            {/* {user.name} */}
                            کاربر شماره {convertToPersian(index + 1)}
                          </h4>

                          <p className="text-2xl font-semibold text-grey-900">
                            {convertToPersian(user.session_count)}
                          </p>
                          <p className="text-body-small text-grey-500">گفتگو</p>
                        </div>
                      );
                    })}

                    {/* More Users Button */}
                    {activeUsers && activeUsers.length > 4 && (
                      <div
                        className="relative rounded-lg p-4 shadow-sm hover-lift cursor-pointer flex items-center justify-center"
                        style={{
                          background: "#FF8970",
                          border: "1px solid #FF8970",
                        }}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <h4 className="font-bold text-[14px] text-white">
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
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* مکالمات اخیر  */}
              {!isNew && (
                <RecentChats
                  data={recentSession}
                  onChatClick={handleChatClick}
                />
              )}
              {/*  سوالات متداول */}
              {!isNew && (
                <div className="flex flex-col gap-6">
                  {/* Placeholder for removed card */}
                  <div className="bg-white rounded-lg p-6 shadow-card">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-grey-900">سوالات متداول</h3>
                      <div className="w-8 h-8 bg-bg-soft-mint rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 text-white">
                          <Faqs />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {faqList.map((faq, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-grey-600">{faq.question}</span>
                          <span className="text-brand-primary font-medium">
                            {convertToPersian(faq?.count.toString() || "0")}{" "}
                            کلیک
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* تماس با ما  */}
                  <UpgradeBanner />
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
