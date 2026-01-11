"use client";
import PageLoader from "@/components/pageLoader";
import axiosInstance from "@/lib/axiosInstance";
import NewUserIntro from "../widgets/NewUserIntro";
import { useBot } from "@/providers/BotProvider";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { BarChart3 } from "lucide-react";
import { API_ROUTES } from "@/constants/apiRoutes";
import { RecentChats } from "../widgets/recent-chats";
import { StatsDrawer } from "../widgets/stats-drawer";
import { HeatmapChart } from "@/components/heatmap-chart";
import { UpgradeBanner } from "../widgets/upgrade-banner";
import { ActivityChart } from "@/components/activity-chart";
import { GenericSelector } from "@/components/selector";
import { ChatbotSelector } from "../widgets/chatbot-selector";
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

export default function Dashboard() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const { bots, currentBot, botLoading } = useBot();
  const [isNew, setIsNew] = useState<boolean>(true);
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
  const [isStatsDrawerOpen, setIsStatsDrawerOpen] = useState(false);
  const colors = ["#e19f87", "#65bcb6", "#52d4a0", "#b07cc6", "#f9c74f"];
  const currentData = chartType === "users" ? usersData : chatsData;
  const chartColor =
    chartType === "users" ? "var(--brand-primary)" : "var(--brand-secondary)";
  const TIME_RANGES = [
    { value: "7d", label: "۷ روز اخیر", disable: false },
    { value: "30d", label: "۳۰ روز اخیر", disable: false },
    { value: "90d", label: "۹۰ روز اخیر", disable: false },
  ];
  const myColors = {
    primary: {
      bg: "bg-brand-primary/10",
      bgLight: "bg-brand-primary/5",
      icon: "bg-sharp-primary",
      hover: "group-hover:shadow-brand-primary/30",
      text: "group-hover:text-brand-primary",
    },
    secondary: {
      bg: "bg-brand-secondary/10",
      bgLight: "bg-brand-secondary/5",
      icon: "bg-sharp-secondary",
      hover: "group-hover:shadow-brand-secondary/30",
      text: "group-hover:text-brand-secondary",
    },
    accent: {
      bg: "bg-brand-accent/10",
      bgLight: "bg-brand-accent/5",
      icon: "bg-sharp-accent",
      hover: "group-hover:shadow-brand-accent/30",
      text: "group-hover:text-brand-accent",
    },
    emerald: {
      bg: "bg-brand-emerald/10",
      bgLight: "bg-brand-emerald/5",
      icon: "bg-sharp-emerald",
      hover: "group-hover:shadow-brand-emerald/30",
      text: "group-hover:text-brand-emerald",
    },
    success: {
      bg: "bg-success/10",
      bgLight: "bg-success/5",
      icon: "bg-success",
      hover: "group-hover:shadow-success/30",
      text: "group-hover:text-success",
    },
    purple: {
      bg: "bg-brand-purple/10",
      bgLight: "bg-brand-purple/5",
      icon: "bg-sharp-violet",
      hover: "group-hover:shadow-brand-purple/30",
      text: "group-hover:text-brand-purple",
    },
  };

  const stats = [
    {
      icon: DashUser,
      value: convertToPersian(statisticCover?.active_users || "0"),
      label: "کاربران فعال",
      colorScheme: "primary",
      rotate: 1,
    },
    {
      icon: DashChats,
      value: convertToPersian(statisticCover?.conversations_today || "0"),
      label: "گفتگوهای امروز",
      colorScheme: "secondary",
      rotate: -1,
    },
    {
      icon: DashMints,
      value: convertToPersian(statisticCover?.avg_duration_minutes || "0"),
      label: " متوسط گفتگو",
      desc: "(دقیقه)",
      colorScheme: "accent",
      rotate: 1,
    },
    {
      icon: DashTime,
      value: convertToPersian(statisticCover?.avg_response_time_seconds || "0"),
      label: "متوسط زمان پاسخ ",
      desc: "(ثانیه)",
      colorScheme: "emerald",
      rotate: -1,
    },
    // {
    //   icon: DashRate,
    //   value: convertToPersian(statisticCover?.satisfaction_rate || "0"),
    //   label: "نرخ رضایت کاربران",
    //   colorScheme: "success",
    //   rotate: 1,
    // },
    {
      icon: DashMsg,
      value: convertToPersian(statisticCover?.messages_per_conversation || "0"),
      label: "پیام در هر گفتگو",
      colorScheme: "purple",
      rotate: -1,
    },
  ];

  useEffect(() => {
    if (botLoading) return;

    if (bots === undefined || !bots || bots.length === 0) {
      setIsNew(true);
    } else {
      setIsNew(false);
    }
  }, [bots, botLoading]);

  //statistic cover

  useEffect(() => {
    if (!user || !currentBot?.uuid) return;

    const fetchAllData = async () => {
      setIsLoading(true);

      try {
        // Fetch all statistics in parallel
        const [
          userTrendRes,
          sessionTrendRes,
          activeUsersRes,
          recentSessionRes,
          faqListRes,
          coverRes,
        ] = await Promise.allSettled([
          fetchUserTrend(timeRange),
          fetchSessionTrend(timeRange),
          fetchActiveUsers(),
          fetchRecentSession(),
          fetchFaqList(),
          fetchStatisticCover(), // new wrapper for your cover API
        ]);

        const results = [
          userTrendRes,
          sessionTrendRes,
          activeUsersRes,
          recentSessionRes,
          faqListRes,
          coverRes,
        ];

        results.forEach((r, i) => {
          if (r.status === "rejected") {
            console.error(`Error in promise ${i}`, r.reason);
          }
        });
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [currentBot?.uuid, user, timeRange]);

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

      results.forEach((r, i) => {
        if (r.status === "rejected") {
          console.error(`Error in promise ${i}`, r.reason);
        }
      });
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStatisticCover = async () => {
    const response = await axiosInstance.get(
      API_ROUTES.STATISTIC.GET_COVER(currentBot!.uuid)
    );
    if (response.status === 200) {
      setStatisticCover(response.data.data);
    }
  };

  const fetchUserTrend = async (days: string) => {
    // console.log("fetchUserTrend ");
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
    // console.log("fetchSessionTrend ");
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
    // console.log("fetchActiveUsers ");
    if (!currentBot) return;
    try {
      const response = await axiosInstance.get(
        API_ROUTES.STATISTIC.ACTIVE_USERS(currentBot?.uuid)
      );
      setActiveUsers(response.data.data);
      // console.log("au", response.data.data);
    } catch (error) {
      console.error("  خطا در دریافت داده کاربران:", error);
    }
  };

  const fetchFaqList = async () => {
    // console.log("fetchFaqList ");
    if (!currentBot) return;
    try {
      const response = await axiosInstance.get(
        API_ROUTES.STATISTIC.FAQ_LIST(currentBot?.uuid)
      );
      setFaqList(response.data.data);
    } catch (error) {
      console.error("  خطا در دریافت داده کاربران:", error);
    }
  };

  const fetchRecentSession = async () => {
    // console.log("fetchRecentSession ");
    setRecentSession([]);
    if (!currentBot) return;
    try {
      const response = await axiosInstance.get(
        API_ROUTES.STATISTIC.RECCENT_SESSION(currentBot?.uuid)
      );
      setRecentSession(response.data.data);
    } catch (error) {
      console.error("  خطا در دریافت داده کاربران:", error);
    }
  };

  const handleTimeRangeChange = async (value: string) => {
    // console.log("handleTimeRangeChange ");
    setIsChartLoading(true);
    await fetchSessionTrend(value);
    await fetchUserTrend(value);
    setIsChartLoading(false);
  };

  const handleChatClick = async () => {};

  if (loading || botLoading) {
    return <PageLoader />;
  }

  if (!user) {
    return null;
  }

  if (!botLoading && isNew === true) {
    return <NewUserIntro />;
  }

  return (
    <div className="h-screen w-full bg-white z-0!" style={{ zIndex: 0 }}>
      {/* overflow-hidden */}
      <div className="flex h-screen">
        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto h-screen">
          {(loading || isLoading) && <PageLoader />}
          <div className="max-w-7xl mx-auto pb-8">
            {/* Page Header */}
            <header className="flex flex-col lg:flex-row text-right lg:items-center justify-start lg:justify-between w-full mb-6">
              <h1 className="text-right text-grey-900 mb-4 lg:mb-0 mr-2 lg:mr-10 text-3xl font-bold">
                میزکار
              </h1>

              <div className="flex gap-3 justify-between lg:justify-end ">
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
                </button>
                <ChatbotSelector />
              </div>
            </header>

            {/* آمار کلیدی امروز */}
            <div className="w-full z-0! stats-hero-section bg-[#E3F4F1] p-8 rounded-3xl border-2 border-white/50 shadow-xl backdrop-blur-sm mb-8">
              <div className="flex flex-col lg:flex-row items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-grey-900">
                  📊 آمار کلیدی
                </h2>
                <p className="text-[rgba(166,166,166,1)] text-sm">
                  نگاهی سریع به عملکرد چت‌بات
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {stats.map((stat, index) => {
                  const scheme =
                    myColors[stat.colorScheme as keyof typeof myColors];
                  const rotateClass =
                    stat.rotate > 0 ? "hover:rotate-1" : "hover:-rotate-1";
                  const Icon = stat.icon;

                  return (
                    <div
                      key={index}
                      className={`group bg-white/80 overflow-hidden backdrop-blur-lg rounded-2xl p-4 border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 ${rotateClass} relative`}
                    >
                      <div
                        className={`absolute top-0 right-0 w-20 h-20 ${scheme.bg} rounded-full -translate-y-2 translate-x-2`}
                      ></div>
                      <div
                        className={`absolute bottom-0 left-0 w-16 h-16 ${scheme.bgLight} rounded-full translate-y-2 -translate-x-2`}
                      ></div>

                      <div className="relative text-center">
                        <div className="flex justify-center mb-3">
                          <div
                            className={`w-10 h-10 ${scheme.icon} rounded-xl flex items-center justify-center shadow-lg ${scheme.hover} transition-all duration-300 group-hover:scale-110`}
                          >
                            <div className="w-4 h-4 text-white">
                              <Icon />
                            </div>
                          </div>
                        </div>
                        <div
                          className={`text-[24px] font-black text-grey-900 mb-1 ${scheme.text} transition-colors text-center`}
                        >
                          {stat.value}
                        </div>
                        <div
                          className="text-[14px] font-medium text-center leading-tight"
                          style={{ color: "#A6A6A6" }}
                        >
                          {stat.label}
                          <span className="text-xs font-extralight mr-0.5">
                            {stat.desc}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* نمودار تعداد کاربران و گفتگوها  */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
              <div>
                <div className="flex m-1 lg:m-4 mt-7 gap-3 items-center justify-between ">
                  <div className="flex items-center gap-2 bg-grey-100 rounded-lg p-1">
                    <button
                      onClick={() => setChartType("users")}
                      className={`px-1 lg:px-2 py-1 rounded-md transition-all duration-200 ${
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
                      className={`px-1 lg:px-2 py-1 rounded-md transition-all duration-200 ${
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
                    className="border border-gray-200 rounded-3xl"
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

            {/* فعال‌ترین کاربران*/}

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
                  {activeUsers && activeUsers.length > 0 ? (
                    //  && activeUsers.length > 3
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
                  ) : (
                    <div className="text-secondary font-bold">
                      کاربری یافت نشد
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* مکالمات اخیر  */}

              <RecentChats data={recentSession} onChatClick={handleChatClick} />

              {/*  سوالات متداول */}

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
                          {convertToPersian(faq?.count.toString() || "0")} کلیک
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* تماس با ما  */}
                <UpgradeBanner />
              </div>
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
