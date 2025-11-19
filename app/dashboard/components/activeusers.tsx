"use client";
import axiosInstance from "@/lib/axiosInstance";
import PageLoader from "@/components/pageLoader";
import { User } from "@/public/icons/AppIcons";
import { useBot } from "@/providers/BotProvider";
import { useAuth } from "@/providers/AuthProvider";
import { API_ROUTES } from "@/constants/apiRoutes";
import { ChatbotSelector } from "../chatbot-selector";
import { convertToPersian } from "@/utils/common";
import { useEffect, useState } from "react";
import { ChatHistory } from "./chat-history";

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

  // تابع دریافت کاربران فعال با درنظر گرفتن صفحه فعلی
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
    <div className="w-full mx-auto p-6">
      <div className="mb-8 flex items-center justify-between">
        <header>
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
        <div className="flex w-full gap-8 ">
          <div className="w-1/2">
            <div className="flex flex-col mt-4 gap-4">
              {users.map((user, index) => {
                const color = colors[index % colors.length];
                return (
                  <button
                    key={user.user_id}
                    onClick={() => setUsername(user.user_id)}
                    className="relative bg-white cursor-pointer rounded-lg mt-4 pb-3 p-8 text-right shadow-sm hover-lift"
                  >
                    <div
                      className="absolute -top-4 right-1 transform -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-md text-white font-bold"
                      style={{ background: color }}
                    >
                      <div className="w-4 h-4">
                        <User />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-grey-900 my-2  truncate">
                        کاربر شماره{" "}
                        {convertToPersian(index + 1 + (page - 1) * 10)}
                      </h4>

                      <p className="flex text-sm text-grey-500 gap-1">
                        {convertToPersian(user.session_count)}
                        <span>گفتگو</span>
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* صفحه بندی */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={handlePrevPage}
                disabled={!hasPrev}
                className={`px-4 py-2 rounded-md ${
                  hasPrev
                    ? "bg-gray-200 hover:bg-gray-300"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                صفحه قبلی
              </button>
              <span className="text-gray-700 font-medium">
                صفحه {convertToPersian(page)} از {convertToPersian(totalPages)}
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
                صفحه بعدی
              </button>
            </div>
          </div>
          <div className="w-1/2 rounded-lg p-4">
            <ChatHistory username={username} />
          </div>
        </div>
      )}
    </div>
  );
}
