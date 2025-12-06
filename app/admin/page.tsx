"use client";
import PageLoader from "@/components/pageLoader";
import { API_ROUTES } from "@/constants/apiRoutes";
import axiosInstance from "@/lib/axiosInstance";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(
          API_ROUTES.ADMIN.STATISTICS
        );
        if (response.status == 200 && response.data) {
          setData(response.data.data);
          console.log("data",response.data)
        }
      } catch (error) {
        console.error("Error fetching bots:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [user]);

  if (!user) {
    router.push("/auth/login");
  }

  if (user?.role !== "admin") {
    router.push("/dashboard");
  }

  return (
    <div className="">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">پنل مدیریت</h1>
      {isLoading && <PageLoader />}
      <p className="text-gray-600 mb-6">
        به داشبورد مدیریت خوش آمدید. از منوی سمت چپ صفحات گزارش و مدیریت کاربران
        را انتخاب کنید.
      </p>

      {/* نمونه کارت‌ها */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-5">
          <h2 className="text-xl font-semibold mb-2">تعداد کاربران</h2>
          <p className="text-3xl font-bold text-blue-600">124</p>
        </div>

        <div className="bg-white shadow rounded-lg p-5">
          <h2 className="text-xl font-semibold mb-2">گزارش‌های جدید</h2>
          <p className="text-3xl font-bold text-green-600">12</p>
        </div>

        <div className="bg-white shadow rounded-lg p-5">
          <h2 className="text-xl font-semibold mb-2">بازدید امروز</h2>
          <p className="text-3xl font-bold text-purple-600">534</p>
        </div>
      </div>
    </div>
  );
}
