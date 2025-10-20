"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import PageLoader from "@/components/pageLoader";
import { useAuth } from "@/providers/AuthProvider";
import { BotConfig } from "@/types/common";
import { useRouter } from "next/navigation";
import { API_ROUTES } from "@/constants/apiRoutes";
import {
  Edit3,
  Trash2,
  Settings,
  Eye,
  MoreVertical,
  Palette,
  MessageSquare,
  Save,
  X,
  Plus,
} from "lucide-react";
import { Toggle } from "@/components/toggle";
import { ToggleSmall } from "@/components/toggleSmall";

export function ChatbotManagement() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [chatbots, setChatbots] = useState<BotConfig[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedChatbot, setSelectedChatbot] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.token) return;
    const loadOnboardingData = async () => {
      setIsLoading(true);

      try {
        const response = await axiosInstance.get(API_ROUTES.BOTS.LIST, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        setChatbots(response.data.data);
        console.log("bot list: ", response.data);
      } catch (apiError: any) {
        // if (apiError.response?.status === 401) {
        //   console.warn("Unauthorized - redirecting to login...");
        //   router.push("/auth/login");
        //   return;
        // }
        console.warn("API fetch failed, using local data:", apiError);
      } finally {
        setIsLoading(false);
      }
    };

    loadOnboardingData();
  }, [user?.token]);

  const toggleStatus = (id: string) => {
    setChatbots((prev) =>
      prev.map((bot) =>
        bot.uuid === id ? { ...bot, status: !bot.status } : bot
      )
    );

    // Optionally, make an API call to save the new status
    // axiosInstance.put(`${API_ROUTES.BOTS.UPDATE_STATUS}/${id}`, { status: !currentStatus }, { headers: { Authorization: `Bearer ${user?.token}` } })
  };

  const deleteChatbot = (id: string) => {
    setChatbots((prev) => prev.filter((bot) => bot.uuid !== id));
  };

  return (
    <div className="h-screen overflow-hidden" style={{ background: "#FFFFFF" }}>
      <div className="flex h-screen">
        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto h-screen">
          {isLoading || (loading && <PageLoader />)}{" "}
          <div className="max-w-7xl mx-auto pb-8">
            {/* Page Header */}
            <header className="mb-8">
              <div className="text-right">
                <h1 className="text-grey-900 mb-2">مدیریت چت بات‌ها</h1>
                <p className="text-grey-600">
                  مدیریت و ویرایش تمام چت بات‌های آیوا
                </p>
              </div>
            </header>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 border border-grey-100 shadow-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center">
                    <Settings className="w-6 h-6 text-brand-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-grey-900 mb-1 text-left">
                  {chatbots.length}
                </h3>
                <p className="text-grey-600 text-sm text-left">کل چت بات‌ها</p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-grey-100 shadow-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                    <Eye className="w-6 h-6 text-success" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-grey-900 mb-1 text-left">
                  {chatbots.filter((bot) => bot.status === true).length}
                </h3>
                <p className="text-grey-600 text-sm text-left">چت بات فعال</p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-grey-100 shadow-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-brand-secondary/10 rounded-xl flex items-center justify-center">
                    <span className="font-bold text-brand-secondary">💬</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-grey-900 mb-1 text-left">
                  {/* {chatbots.reduce(
                    (sum, bot) => sum + bot.conversationsToday,
                    0
                  )} */}
                  0
                </h3>
                <p className="text-grey-600 text-sm text-left">
                  گفتگوهای امروز
                </p>
              </div>

              {/* <div className="bg-white rounded-2xl p-6 border border-grey-100 shadow-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-brand-accent/10 rounded-xl flex items-center justify-center">
                    <span className="font-bold text-brand-accent">📊</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-grey-900 mb-1">
                  {Math.round(
                    chatbots.reduce((sum, bot) => sum + bot.responseRate, 0) /
                      chatbots.length
                  )}
                  %
                </h3>
                <p className="text-grey-600 text-sm">میانگین پاسخگویی</p>
              </div> */}
            </div>

            {/* Chatbots List */}
            <div className="bg-white rounded-3xl border border-grey-100 shadow-card overflow-hidden">
              <div className="p-6 border-b border-grey-100">
                <h2 className="font-bold text-grey-900 text-xl">
                  لیست چت بات‌ها
                </h2>
              </div>

              <div className="divide-y divide-grey-100">
                {chatbots.map((chatbot) => (
                  <div
                    key={chatbot.uuid}
                    className="p-6 hover:bg-grey-50/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {/* Status Indicator */}
                        <div
                          className="w-4 h-4 rounded-full flex-shrink-0"
                          style={{ backgroundColor: chatbot.primary_color }}
                        />

                        {/* Chatbot Info */}
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-bold text-grey-900 text-lg">
                              {chatbot.name}
                            </h3>
                          </div>

                          {chatbot.description && (
                            <p className="text-grey-500 text-sm">
                              {chatbot.description}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Stats and Actions */}
                      <div className="flex items-center gap-6">
                        {/* Stats */}
                        <div className="text-center">
                          <p className="text-lg font-bold text-grey-900">
                            {chatbot.conversationsToday}
                          </p>
                          <p className="text-xs text-grey-500">گفتگو امروز</p>
                        </div>

                        <div className="text-center">
                          <p className="text-sm font-medium text-grey-700">
                            {chatbot.lastUpdated}
                          </p>
                          <p className="text-xs text-grey-500">
                            آخرین بروزرسانی
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <div className="rounded-3xl border text-sm p-2 border-gray-200">
                            <ToggleSmall
                              label={
                                chatbot.status ? "غیرفعال کردن" : "فعال کردن"
                              }
                              checked={chatbot.status}
                              onChange={() => toggleStatus(chatbot.uuid)}
                            />
                          </div>
                          <button
                            onClick={() => router.push("/onboarding")}
                            className="p-2 text-grey-600 hover:text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-all"
                            title="ویرایش"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteChatbot(chatbot.uuid)}
                            className="p-2 text-grey-600 hover:text-danger hover:bg-danger/10 rounded-lg transition-all"
                            title="حذف"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add New Chatbot Button */}
              <div className="p-6 border-t border-grey-100 bg-grey-50/30">
                <button className="w-full p-4 border-2 border-dashed border-brand-primary/30 rounded-xl text-brand-primary hover:border-brand-primary/50 hover:bg-brand-primary/5 transition-all flex items-center justify-center gap-3">
                  <div className="w-8 h-8 bg-brand-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-brand-primary font-bold text-lg">
                      +
                    </span>
                  </div>
                  <span className="font-medium">افزودن چت بات جدید</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
