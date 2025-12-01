"use client";
import axiosInstance from "@/lib/axiosInstance";
import PageLoader from "@/components/pageLoader";
import { useBot } from "@/providers/BotProvider";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { BarChart3 } from "lucide-react";
import { API_ROUTES } from "@/constants/apiRoutes";
import { RecentChats } from "../recent-chats";
import { StatsDrawer } from "../stats-drawer";
import { HeatmapChart } from "@/components/heatmap-chart";
import { UpgradeBanner } from "../upgrade-banner";
import { ActivityChart } from "@/components/activity-chart";
import { GenericSelector } from "@/components/selector";
import { ChatbotSelector } from "../chatbot-selector";
import { convertToPersian } from "@/utils/common";
import { useEffect, useState } from "react";
import {
  DashChats,
  DashMints,
  DashMsg,
  DashRate,
  DashTime,
  DashUser,
  Faqs,
  RightGo,
  User,
} from "@/public/icons/AppIcons";
import NewUserIntro from "../NewUserIntro";

export default function Dashboard() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const { bots, currentBot, botLoading } = useBot();
  const [isNew, setIsNew] = useState<boolean >(true);
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
  const colors = ["#e19f87", "#65bcb6", "#52d4a0", "#b07cc6", "#f9c74f"];
  const [isStatsDrawerOpen, setIsStatsDrawerOpen] = useState(false);
  const currentData = chartType === "users" ? usersData : chatsData;
  const chartColor =
    chartType === "users" ? "var(--brand-primary)" : "var(--brand-secondary)";
  const TIME_RANGES = [
    { value: "7d", label: "۷ روز اخیر", disable: false },
    { value: "30d", label: "۳۰ روز اخیر", disable: false },
    { value: "90d", label: "۹۰ روز اخیر", disable: false },
  ];

  // useEffect(() => {
  //   if (bots === undefined) return;

  //   if (!bots || bots.length === 0) {
  //     setIsNew(true);
  //   } else {
  //     setIsNew(false);
  //   }
  // }, [bots]);
  console.log("0");

  useEffect(() => {
    if (botLoading) return; // تا زمانی که useBot مشغول گرفتن داده‌هاست

    console.log("2");

    if (bots === undefined ||!bots || bots.length === 0) {
      setIsNew(true);
    } else {
      setIsNew(false);
    }
  }, [bots, botLoading]);

  //statistic cover
  useEffect(() => {
    if (!user) return;
    if (!currentBot?.uuid) return;
    console.log("3");

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
  }, [user, currentBot,botLoading]);

  useEffect(() => {
    if (!user || !currentBot?.uuid) return;
    fetchAllStatistics();
  }, [user?.id, currentBot?.uuid,botLoading]);

  const fetchAllStatistics = async () => {
    setIsLoading(true);

    try {
      const results = await Promise.allSettled([
        fetchUserTrend(timeRange),
        fetchSessionTrend(timeRange),
        fetchActiveUsers(),
        fetchRecentSession(),
        fetchFaqList(),
      ]);

      // اگر خواستی نتیجه خطاها را لاگ بگیری:
      results.forEach((r, i) => {
        if (r.status === "rejected") {
          console.error(`Error in promise ${i}`, r.reason);
        }
      });
    } catch (err) {
      // اینجا معمولاً اجرا نمی‌شود چون allSettled خطا پرتاب نمی‌کند
      console.error("Unexpected error:", err);
    } finally {
      setIsLoading(false);
      // console.log("isloading", isLoading);
    }
  };

  const fetchUserTrend = async (days: string) => {
    if (!currentBot) return;
    try {
      const response = await axiosInstance.get(
        API_ROUTES.STATISTIC.USERS(currentBot?.uuid),
        { params: { days: days.replace("d", "") } }
      );
      const formattedData = response.data.data.map((d: any) => ({
        name: new Date(d.time ?? "").toLocaleDateString("fa-IR"),
        value: d.value,
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
        API_ROUTES.STATISTIC.SESSION(currentBot?.uuid),
        { params: { days: days.replace("d", "") } }
      );
      const formattedData = response.data.data.map((d: any) => ({
        name: new Date(d.time ?? "").toLocaleDateString("fa-IR"),
        value: d.value,
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
    // console.log("fetchRecentSession", currentBot);
    setRecentSession([]);
    if (!currentBot) return;
    try {
      const response = await axiosInstance.get(
        API_ROUTES.STATISTIC.RECCENT_SESSION(currentBot?.uuid)
      );
      setRecentSession(response.data.data);

      // console.log("RecentSession", response.data.data);
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

  //   if (loading) return <PageLoader />;
  //   if (!user) return null;

  // if (loading || isNew === null) return <PageLoader />;

  // if (loading) return <PageLoader />;
  // if (!user) {
  //   router.push("/auth/login");
  //   return null;
  // }

  // // Show a different loader while checking if user has bots
  // if (isNew === null) {
  //   return <PageLoader />;
  // }

  // وضعیت‌های لودینگ اولیه
  if (loading || botLoading) {
    return <PageLoader />;
  }

  // اگر هنوز وضعیت کاربر مشخص نیست
  if (!user) {
    // router.push("/auth/login");
    return null;
  }

  // اگر هنوز bots بررسی نشده
  if (isNew === null) {
    return <PageLoader />;
  }

  // اگر کاربر کاملاً جدید است (هیچ باتی ندارد)
  if (isNew) {
    return <NewUserIntro />; // مثلاً صفحه ساخت بات جدید
  }
  console.log("4");

  return (
    <div className="h-screen  bg-white z-0!" style={{ zIndex: 0 }}>
      {/* overflow-hidden */}
      <div className="flex h-screen">
        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto h-screen">
          {(loading || isLoading) && <PageLoader />}
          <div className="max-w-7xl mx-auto pb-8">
            <div className="mb-8">
              {/* Page Header */}
              <header className="flex items-center justify-between w-full mb-6">
                <div className="text-right">
                  <h1 className="text-grey-900 mb-0 text-3xl font-bold">
                    میزکار
                  </h1>
                </div>

                <div className="flex gap-3 ">
                  <button
                    onClick={() => setIsStatsDrawerOpen(true)}
                    className="flex plans-trigger-special"
                    title="مشاهده پلن‌های پیشنهادی"
                    aria-label="باز کردن پنل پلن‌ها"
                  >
                    <span className="plans-trigger-icon">
                      <BarChart3 size={20} />
                    </span>
                    <span className="plans-trigger-text">پلن‌ها</span>
                    {/* <span className="plans-trigger-badge">جدید</span> */}
                  </button>
                  <ChatbotSelector />
                </div>
              </header>

              {/* {isNew && (
                <div className="flex w-full items-center justify-center m-7">
                  <button
                    onClick={() => router.push("/onboarding")}
                    className="px-8 py-4 font-bold cursor-pointer rounded-md transition-all duration-200   bg-white text-brand-primary shadow-sm"
                  >
                    اولین بات خود را بسازید
                  </button>
                </div>
              )} */}
            </div>

            {/* آمار کلیدی امروز */}
            {!isNew && (
              <div className=" z-0! stats-hero-section bg-[#E3F4F1] p-8 rounded-3xl border-2 border-white/50 shadow-xl backdrop-blur-sm mb-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-grey-900 text-[20px]">
                    📊 آمار کلیدی
                  </h2>
                  <p className="text-[rgba(166,166,166,1)] text-[14px]">
                    نگاهی سریع به عملکرد چت‌بات
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  <div className="group   bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:rotate-1">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-brand-primary/10 rounded-full -translate-y-2 translate-x-2"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-brand-primary/5 rounded-full translate-y-2 -translate-x-2"></div>

                    <div className=" text-center">
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
                  <div className="group    bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-rotate-1">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-brand-secondary/10 rounded-full -translate-y-2 translate-x-2"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-brand-secondary/5 rounded-full translate-y-2 -translate-x-2"></div>

                    <div className="   text-center">
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
                  <div className="group    bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:rotate-1">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-brand-accent/10 rounded-full -translate-y-2 translate-x-2"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-brand-accent/5 rounded-full translate-y-2 -translate-x-2"></div>

                    <div className="   text-center">
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
                  <div className="group    bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-rotate-1">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-brand-emerald/10 rounded-full -translate-y-2 translate-x-2"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-brand-emerald/5 rounded-full translate-y-2 -translate-x-2"></div>

                    <div className="   text-center">
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
                  <div className="group    bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:rotate-1">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-success/10 rounded-full -translate-y-2 translate-x-2"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-success/5 rounded-full translate-y-2 -translate-x-2"></div>

                    <div className="  text-center">
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
                  <div className="group   bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-rotate-1">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-brand-purple/10 rounded-full -translate-y-2 translate-x-2"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-brand-purple/5 rounded-full translate-y-2 -translate-x-2"></div>

                    <div className=" text-center">
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

                    <GenericSelector
                      items={TIME_RANGES}
                      selectedValue={timeRange}
                      disabled={isChartLoading}
                      onSelect={(value) => {
                        setTimeRange(value);
                        handleTimeRangeChange(value);
                      }}
                      showIndicator={true}
                    />
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2 px-3 py-0">
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
                  className="glass-effect rounded-card p-6"
                  style={{
                    background: "#FEF9F6",
                    border: "2px solid transparent",
                    backgroundClip: "padding-box",
                  }}
                >
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 gap-4">
                    {activeUsers.slice(0, 3).map((user, index) => {
                      const color = colors[index % colors.length];
                      return (
                        <div
                          key={index}
                          className="relative bg-white  rounded-lg p-4 pt-8 text-center shadow-sm hover-lift"
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
                          {user.name && (
                            <div className="truncate font-semibold">
                              {user.name}
                            </div>
                          )}
                          {/* <div className="">e_tanha@yahoo.com</div>
                          <div className="">09123262118 </div>{" "} */}
                          {user.email && (
                            <div className="truncate  font-semibold">
                              {user.email}
                            </div>
                          )}
                          {user.phone && (
                            <div className="truncate  font-semibold">
                              {user.phone}
                            </div>
                          )}
                          <p className=" mt-1 text-grey-900">
                            {convertToPersian(user.session_count)} گفتگو
                          </p>
                        </div>
                      );
                    })}

                    {/* More Users Button */}
                    {activeUsers && activeUsers.length > 3 && (
                      <div
                        className="relative rounded-lg p-4 shadow-sm hover-lift   flex items-center justify-center"
                        style={{
                          background: "#FF8970",
                          border: "1px solid #FF8970",
                        }}
                      >
                        <button
                          onClick={() =>
                            router.push("/dashboard?tab=activeusers")
                          }
                          className="flex cursor-pointer items-center justify-center gap-2"
                        >
                          <h4 className="font-bold text-sm text-white">
                            مشاهده همه
                          </h4>
                          <div className="w-4 h-4">
                            <RightGo />
                          </div>
                        </button>
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
          <StatsDrawer
            isOpen={isStatsDrawerOpen}
            onClose={() => setIsStatsDrawerOpen(false)}
          />
        </main>
      </div>
    </div>
  );
}
