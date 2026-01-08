"use client";
import PageLoader from "@/components/pageLoader";
import { API_ROUTES } from "@/constants/apiRoutes";
import axiosInstance from "@/lib/axiosInstance";
import { useAuth } from "@/providers/AuthProvider";
import { DashChats } from "@/public/icons/AppIcons";
import { User, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>(null);
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

  if (loading) return <div><PageLoader/></div>;

    if (!user || user.role !== "admin") return null;


  // if (!user) {
  //   router.push("/auth/login");
  // }

  // if (user?.role !== "admin") {
  //   router.push("/dashboard");
  // }

  return (
    <div className="">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 mr-10">
        پنل مدیریت
      </h1>
      {isLoading && <PageLoader />}
      {/* آمار کلیدی امروز */}
      <div className="w-full z-0! stats-hero-section bg-[#E3F4F1] p-8 rounded-3xl border-2 border-white/50 shadow-xl backdrop-blur-sm mb-8">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-grey-900">📊 آمار کلیدی</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div
            className={`group bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105  relative`}
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
          <div className="group bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105  relative">
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

          <div className="group bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105  relative">
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
      </div>
    </div>
  );
}
