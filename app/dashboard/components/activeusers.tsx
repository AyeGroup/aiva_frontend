"use client";
import axiosInstance from "@/lib/axiosInstance";
import PageLoader from "@/components/pageLoader";
import { useBot } from "@/providers/BotProvider";
import { useAuth } from "@/providers/AuthProvider";
import { API_ROUTES } from "@/constants/apiRoutes";
import { useEffect, useState } from "react";
import { ChatbotSelector } from "../chatbot-selector";
import { convertToPersian } from "@/utils/common";
import { User } from "@/public/icons/AppIcons";

 
export default function ActiveUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentBot } = useBot();
  const { user, loading } = useAuth();
  const colors = ["#e19f87", "#65bcb6", "#52d4a0", "#b07cc6", "#f9c74f"];

  useEffect(() => {
    const fetchActiveUsers = async () => {
      if (!currentBot) return;
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(
          API_ROUTES.STATISTIC.ACTIVE_USERS(currentBot?.uuid)
        );
        setUsers(response.data.data);
      } catch (error) {
        console.error("  خطا در دریافت داده کاربران:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchActiveUsers();
  }, [user, currentBot]);

  if (loading || isLoading) return <PageLoader />;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* <h1 className="text-2xl font-bold mb-6 text-gray-900">کاربران فعال</h1> */}
      <div className="mb-8 flex items-center justify-between">
        <header className="">
          <h1 className="text-grey-900 mb-2 font-medium text-right">
            کاربران فعال
          </h1>
        </header>
        <div>
          <ChatbotSelector />
        </div>
      </div>
      {users.length === 0 ? (
        <p className="text-gray-600">هیچ کاربر فعالی یافت نشد.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-4 gap-4">
          {users.map((user, index) => {
            const color = colors[index % colors.length]; 
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

       
        </div>
      )}
    </div>
  );
}
