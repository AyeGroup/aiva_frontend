"use client";
import PageLoader from "@/components/pageLoader";
import ProgressStatCard from "@/components/ProgressStatCard";
import StatCard from "@/components/stat-card";
import { API_ROUTES } from "@/constants/apiRoutes";
import axiosInstance from "@/lib/axiosInstance";
import { useAuth } from "@/providers/AuthProvider";
import {
  DashChats,
  TicketAll,
  TicketClose,
  TicketOpen,
  TicketPend,
} from "@/public/icons/AppIcons";
import { User, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [stats, setsStats] = useState<any>(null);
  const { user, loading } = useAuth(); // یا هر منبع اطلاعات

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(API_ROUTES.ADMIN.STATISTICS);
        if (response.status == 200 && response.data) {
          setData(response.data.data);
          // console.log("data", response.data);
        }
      } catch (error) {
        console.error("Error fetching bots:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [user]);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/auth/login");
      } else if (user.role !== "admin") {
        router.push("/");
      }
    }
  }, [user, loading, router]);

  const calculatePercentage = (part: number, total: number): number => {
    return total > 0 ? (part / total) * 100 : 0;
  };

  if (loading) return <PageLoader />;

  if (!user || user.role !== "admin") return null;

  return (
    <div className="lg:h-screen w-full overflow-hidden">
      <header className="flex items-center justify-between bg-bg-surface border-b border-border-soft px-6 lg:px-8 py-6">
        <div className="text-right">
          <h1 className="text-grey-900 mb-0 mr-1 lg:mr-10 text-2xl lg:text-3xl font-bold">
            پنل مدیریت
          </h1>
        </div>
      </header>
      <main className="flex-1 p-6 lg:px-12 overflow-y-auto h-screen ">
        {isLoading && <PageLoader />}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div
            className={`group bg-white backdrop-blur-lg rounded-2xl p-4 border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105  overflow-hidden relative`}
          >
            <div
              className={`absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full -translate-y-2 translate-x-2`}
            ></div>

            <div className="relative text-center">
              <div className="flex justify-center item-center mb-3">
                <div
                  className={`w-10 h-10  rounded-xl flex items-center justify-center shadow-lg bg-primary transition-all duration-300  `}
                >
                  <User className="w-4 h-4 text-white" />
                </div>
              </div>
              <div
                className={`text-lg font-black text-grey-900 mb-1 transition-colors text-center`}
              >
                کاربران
              </div>
              <div
                className="font-medium text-center leading-tight"
                style={{ color: "#A6A6A6" }}
              >
                {data?.all_users_count || ""}
              </div>
            </div>
          </div>
          <div className="group bg-white backdrop-blur-lg rounded-2xl p-4 border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden relative">
            <div
              className={`absolute top-0 right-0 w-20 h-20 bg-secondary/10 rounded-full -translate-y-2 translate-x-2`}
            ></div>

            <div className="relative text-center">
              <div className="flex justify-center item-center mb-3">
                <div className="w-10 h-10  rounded-xl flex items-center justify-center shadow-lg bg-secondary transition-all duration-300 ">
                  <div className="w-4 h-4 text-white">
                    <DashChats />
                  </div>
                </div>
              </div>
              <div
                className={`text-lg font-black text-grey-900 mb-1 transition-colors text-center`}
              >
                چت‌بات‌ها
              </div>
              <div className="font-medium text-center leading-tight "></div>
            </div>
          </div>

          <div className="group bg-white backdrop-blur-lg rounded-2xl p-4 border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105  overflow-hidden relative">
            <div
              className={`absolute top-0 right-0 w-20 h-20 bg-brand-purple/10 rounded-full -translate-y-2 translate-x-2`}
            ></div>

            <div className="relative text-center">
              <div className="flex justify-center item-center mb-3">
                <div className="w-10 h-10  rounded-xl flex items-center justify-center shadow-lg bg-brand-purple transition-all duration-300">
                  <Users className="w-4 h-4 text-white" />
                </div>
              </div>
              <div
                className={`text-lg font-black text-grey-900 mb-1 transition-colors text-center`}
              >
                کاربران چت‌بات‌ها
              </div>
              <div className="font-medium text-center leading-tight">
                {data?.all_chatbots_count || ""}
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 py-9">
          <div className="gap-6 grid  grid-cols-2 lg:grid-cols-4 w-full">
            <StatCard
              title="کل تیکت‌ها"
              count={stats?.total}
              icon={<TicketAll />}
              bgColor="bg-brand-primary/10"
              textColor="text-primary"
              progressColor="bg-brand-primary"
            />

            <ProgressStatCard
              title="تیکت‌های باز"
              count={stats?.open}
              icon={<TicketOpen />}
              bgColor="bg-danger/10"
              textColor="text-danger"
              progressColor="bg-danger"
              percentage={calculatePercentage(stats?.open, stats?.total)}
            />

            <ProgressStatCard
              title="در حال بررسی"
              count={stats?.pending}
              icon={<TicketPend />}
              bgColor="bg-warning/10"
              textColor="text-warning"
              progressColor="bg-warning"
              percentage={calculatePercentage(stats?.pending, stats?.total)}
            />

            <ProgressStatCard
              title="بسته شده"
              count={stats?.closed}
              icon={<TicketClose />}
              bgColor="bg-secondary/10"
              textColor="text-secondary"
              progressColor="bg-secondary"
              percentage={calculatePercentage(stats?.closed, stats?.total)}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
