"use client";
import axiosInstance from "@/lib/axiosInstance";
import PageLoader from "@/components/pageLoader";
import { User } from "@/public/icons/AppIcons";
import { useBot } from "@/providers/BotProvider";
import { useAuth } from "@/providers/AuthProvider";
import { API_ROUTES } from "@/constants/apiRoutes";
import { ChatHistory } from "./chat-history";
import { ChatbotSelector } from "../widgets/chatbot-selector";
import { convertToPersian } from "@/utils/common";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ActiveUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [username, setUsername] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const { currentBot } = useBot();
  const { user, loading } = useAuth();

  const colors = ["#e19f87", "#65bcb6", "#52d4a0", "#b07cc6", "#f9c74f"];

  useEffect(() => {
    const fetchActiveUsers = async () => {
      if (!currentBot) return;
      setIsLoading(true);

      try {
        const response = await axiosInstance.get(
          API_ROUTES.STATISTIC.ACTIVE_USERS_PAGINATED(currentBot?.uuid, page)
        );

        const data = response.data.data;
        setUsers(data.items || []);
        setTotalPages(data.total_pages || 1);
        setHasNext(data.has_next);
        setHasPrev(data.has_prev);
      } catch (error) {
        console.error("❌ خطا در دریافت داده کاربران:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActiveUsers();
  }, [user, currentBot, page]);

  const handleNextPage = () => {
    if (hasNext) setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (hasPrev) setPage((prev) => prev - 1);
  };

  if (loading || isLoading) return <PageLoader />;

  return (
    <div className="w-full mx-auto p-4 sm:p-6">
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <header className="mb-2 sm:mb-0">
          <h1 className="text-grey-900 font-medium text-right text-lg sm:text-xl">
            کاربران فعال
          </h1>
        </header>
        <div className="mt-2 sm:mt-0">
          <ChatbotSelector />
        </div>
      </div>

      {users.length === 0 ? (
        <p className="text-gray-600">هیچ کاربر فعالی یافت نشد.</p>
      ) : (
        <div className="flex flex-col lg:flex-row w-full gap-6 lg:gap-8">
          {/* لیست کاربران */}
          <div className="w-full lg:w-1/2 flex flex-col mt-4 gap-4">
            {users.map((user, index) => {
              const color = colors[index % colors.length];
              return (
                <button
                  key={index}
                  onClick={() => {
                    console.log("name:", user.user_id);
                    setUsername(user.user_id);
                  }}
                  className="relative bg-white cursor-pointer rounded-lg pb-3 p-6 text-right shadow-sm hover-lift"
                >
                  <div
                    className="absolute -top-4 right-1 w-10 h-10 rounded-full flex items-center justify-center shadow-md text-white font-bold"
                    style={{ background: color }}
                  >
                    <div className="w-4 h-4">
                      <User />
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-3 flex-wrap">
                    <ul className="flex-col font-bold text-grey-900 my-2 truncate">
                      <li>{user.email ? `ایمیل: ${user.email}` : ""}</li>
                      <li> {user.name ? `نام: ${user.name}` : ""}</li>
                      <li> {user.phone ? `تلفن: ${user.phone}` : ""}</li>
                    </ul>

                    <p className="flex text-sm text-grey-500 gap-1">
                      {convertToPersian(user.session_count)}
                      <span>گفتگو</span>
                    </p>
                  </div>
                </button>
              );
            })}

            {/* صفحه‌بندی */}
            {totalPages && totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-6 flex-wrap">
                <button
                  onClick={handlePrevPage}
                  disabled={!hasPrev}
                  className={`px-4 py-2 rounded-md ${
                    hasPrev
                      ? "bg-gray-200 hover:bg-gray-300"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <ChevronRight />
                </button>
                <span className="text-gray-500">
                  <span className="text-primary font-semibold ml-1">
                    {convertToPersian(page)}
                  </span>
                  از {convertToPersian(totalPages)}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={!hasNext}
                  className={`px-4 py-2 rounded-md ${
                    hasNext
                      ? "bg-gray-200 hover:bg-gray-300"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <ChevronLeft />
                </button>
              </div>
            )}
          </div>

          {/* تاریخچه چت */}
          <div className="w-full lg:w-1/2 rounded-lg p-4 mt-6 lg:mt-0">
            <ChatHistory username={username} />
          </div>
        </div>
      )}
    </div>
  );
}
