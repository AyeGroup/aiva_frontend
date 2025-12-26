"use client";
import React, { useEffect, useState } from "react";
import PageLoader from "@/components/pageLoader";
import axiosInstance from "@/lib/axiosInstance";
import ChatbotDetailModal from "../widgets/ChatbotDetailModal";
import { toast } from "sonner";
import { useBot } from "@/providers/BotProvider";
import { Switch } from "@/components/switch";
import { useAuth } from "@/providers/AuthProvider";
import { BotConfig } from "@/types/common";
import { useRouter } from "next/navigation";
import { API_ROUTES } from "@/constants/apiRoutes";
import { ConfirmModal } from "@/components/ConfirmModal";
import { convertToPersian } from "@/utils/common";
import {
  Edit3,
  Trash2,
  Eye,
  MoreVertical,
  MessageSquare,
  Plus,
} from "lucide-react";

export function ChatbotManagement() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const { refreshBots } = useBot();
  const [chatbots, setChatbots] = useState<BotConfig[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedChatbot, setSelectedChatbot] = useState<BotConfig | null>(
    null
  );
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    id: string | null;
  }>({
    isOpen: false,
    id: null,
  });
  const [confirmActiveModal, setConfirmActiveModal] = useState<{
    isOpen: boolean;
    id: string | null;
    newStatus: boolean | null;
  }>({ isOpen: false, id: null, newStatus: null });

  useEffect(() => {
    if (!user?.token) return;
    const fetchChatbots = async () => {
      await loadChatbots();
    };

    fetchChatbots();
  }, [user?.token]);

  //handle size
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".chatbot-menu-container")) {
        setOpenMenuId(null);
      }
    };

    if (openMenuId) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuId]);

  const loadChatbots = async () => {
    setIsLoading(true);

    try {
      const response = await axiosInstance.get(API_ROUTES.BOTS.LIST);
      setChatbots(response.data.data);

      const response1 = await axiosInstance.get(
        API_ROUTES.BOTS.SESSION_COUNT_COVER
      );
      setSessions(response1.data.data.chatbots);
    } catch (apiError: any) {
      console.warn("API fetch failed, using local data:", apiError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActive = async (id: string, active: boolean) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      // formData.append("uuid", id);
      formData.append("active", String(active));

      const res = await axiosInstance.put(API_ROUTES.BOTS.EDIT(id), formData);

      if (res.data.success) {
        await loadChatbots();
        toast.success("وضعیت جدید چت بات با موفقیت ثبت شد");
      } else {
        toast.error("خطا در تغییر وضعیت چت بات");
        console.warn("⚠️ Unexpected response while removing item:", res.data);
      }
    } catch (error: any) {
      toast.error("خطا در تغییر وضعیت چت بات");
      console.error("Failed to remove item:", error);
    } finally {
      setIsLoading(false);
      setConfirmModal({ isOpen: false, id: null });
    }
  };

  const handleConfirmActive = async () => {
    if (confirmActiveModal.id && confirmActiveModal.newStatus !== null) {
      await handleActive(confirmActiveModal.id, confirmActiveModal.newStatus);
      closeConfirmActiveModal();
    }
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.delete(API_ROUTES.BOTS.EDIT(id));

      if (res.data.success) {
        await loadChatbots();
        await refreshBots();
        toast.success("چت بات با موفقیت حذف شد");
      } else {
        toast.error("خطا در حذف چت بات");
        console.warn("⚠️ Unexpected response while removing item:", res.data);
      }
    } catch (error: any) {
      toast.error("خطا در حذف چت بات");
      console.error("Failed to remove item:", error);
    } finally {
      setIsLoading(false);
      setConfirmModal({ isOpen: false, id: null });
    }
  };

  const openConfirmModal = (id: string) => {
    setConfirmModal({ isOpen: true, id });
  };

  const closeConfirmModal = () => {
    setConfirmModal({ isOpen: false, id: null });
  };

  const openConfirmActiveModal = (id: string, newStatus: boolean) => {
    setConfirmActiveModal({ isOpen: true, id, newStatus });
  };

  const closeConfirmActiveModal = () => {
    setConfirmActiveModal({ isOpen: false, id: null, newStatus: null });
  };

  const handleConfirmDelete = () => {
    if (confirmModal.id) {
      handleDelete(confirmModal.id);
    }
  };

  return (
    <div
      className="lg:h-screen w-full overflow-hidden"
      style={{ background: "#FFFFFF" }}
    >
      <main className="flex-1 p-6 overflow-y-auto h-screen">
        {(isLoading || loading) && <PageLoader />}
        <div className="max-w-7xl mx-auto pb-8">
          {/* Page Header */}
          <header className="flex items-center justify-between mb-8">
            <div className="text-right">
              <h1 className="text-grey-900 mb-0 mr-2 lg:mr-10 text-2xl lg:text-3xl font-bold">
                مدیریت چت‌بات‌ها
              </h1>
              <p className="text-grey-600 mr-2 lg:mr-10">
                مدیریت و ویرایش چت‌بات‌ها
              </p>
            </div>

            <button
              className="flex bg-primary rounded-sm white px-2 lg:px-4 py-2 lg:py-3 cursor-pointer"
              onClick={() => {
                router.push("/dashboard?tab=onboarding&id=new");
              }}
            >
              <span className="text-white text-sm lg:text-base">
                افزودن چت‌بات جدید
              </span>
              <div className="w-4 h-4 mr-2 text-white">
                <Plus />
              </div>
            </button>
          </header>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 overflow-hidden">
            <div className="relative flex flex-col items-center justify-center bg-white rounded-2xl p-6 border border-grey-100 shadow-card  ">
              <div className="absolute -top-1 right-5 w-20 h-20 rounded-full bg-primary/10"></div>
              <div className="absolute -bottom-3 -left-1 w-20 h-20 rounded-full bg-primary/5"></div>

              <div className="flex items-center justify-between mb-4   ">
                <div className="w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-grey-900 mb-1">
                {convertToPersian(chatbots.length)}
              </h3>
              <p className="text-grey-600 text-sm text-left">کل چت بات‌ها</p>
            </div>
            <div className="relative flex flex-col items-center justify-center bg-white rounded-2xl p-6 border border-grey-100 shadow-card    ">
              <div className="absolute -top-1 right-5 w-20 h-20 rounded-full bg-success/10"></div>
              <div className="absolute -bottom-3 -left-1 w-20 h-20 rounded-full bg-success/5"></div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-success rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-grey-900 mb-1 text-left">
                {convertToPersian(
                  chatbots.filter((bot) => bot.active === true).length
                )}
              </h3>
              <p className="text-grey-600 text-sm text-left">چت بات فعال</p>
            </div>

            <div className="relative flex flex-col items-center justify-center bg-white rounded-2xl p-6 border border-grey-100 shadow-card    ">
              <div className="absolute -top-1 right-5 w-20 h-20 rounded-full bg-secondary/10"></div>
              <div className="absolute -bottom-3 -left-1 w-20 h-20 rounded-full bg-secondary/5"></div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-brand-secondary rounded-xl flex items-center justify-center">
                  <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-grey-900 mb-1 text-left">
                {convertToPersian(
                  Object.values(sessions).reduce((sum, count) => sum + count, 0)
                )}
              </h3>
              <p className="text-grey-600 text-sm text-left">گفتگوها</p>
            </div>
          </div>

          {/* Chatbots List */}
          <div className="bg-white rounded-3xl border border-grey-100 shadow-card w-full ">
            <div className="p-6 border-b border-grey-100">
              <h2 className="font-bold text-grey-900 text-xl">
                لیست چت بات‌ها
              </h2>
            </div>

            <div className="divide-y divide-grey-100 w-full ">
              {chatbots.map((chatbot) => (
                <div
                  key={chatbot.uuid}
                  className="p-3 lg:p-6 hover:bg-grey-50/50 transition-colors"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 items-center   w-full ">
                    <div className="flex items-center m-0 gap-4 grow ">
                      <div
                        className="w-4 h-4 rounded-full shrink-0"
                        style={{ backgroundColor: chatbot.primary_color }}
                      />

                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-grey-900 text-lg">
                            {chatbot.name}
                          </h3>
                        </div>

                        {chatbot.description && (
                          <p className="text-grey-500 text-sm line-clamp-1">
                            {chatbot.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 m-0 lg:gap-6 w-full justify-between lg:justify-end">
                      <div className="text-center">
                        <p className="text-lg font-bold text-grey-900">
                          {convertToPersian(
                            sessions?.[chatbot?.uuid as any] || "0"
                          )}
                        </p>
                        <p className="text-xs text-grey-500">گفتگو </p>
                      </div>

                      <div className="text-center">
                        <p className="text-sm font-medium text-grey-700">
                          {new Date(
                            chatbot?.updated_at ?? ""
                          ).toLocaleDateString("fa-IR")}
                        </p>
                        <p className="text-xs text-grey-500">آخرین بروزرسانی</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="rounded-3xl border text-sm p-2 border-gray-200">
                          <Switch
                            checked={chatbot.active}
                            onCheckedChange={() =>
                              openConfirmActiveModal(
                                chatbot.uuid,
                                !chatbot.active
                              )
                            }
                          />
                        </div>

                        <div className="chatbot-menu-container">
                          <button
                            type="button"
                            onClick={() =>
                              setOpenMenuId(
                                openMenuId === chatbot.uuid
                                  ? null
                                  : chatbot.uuid
                              )
                            }
                            className="chatbot-menu-button"
                            title="منوی عملیات"
                            aria-label="منوی عملیات"
                            aria-expanded={openMenuId === chatbot.uuid}
                            aria-haspopup="true"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {openMenuId === chatbot.uuid && (
                            <div className="chatbot-dropdown-menu" role="menu">
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedChatbot(chatbot);
                                  setShowDetailModal(true);
                                  setOpenMenuId(null);
                                }}
                                className="chatbot-menu-item"
                                title="جزئیات بیشتر"
                                role="menuitem"
                              >
                                <Eye className="w-4 h-4" />
                                <span>جزئیات بیشتر</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setOpenMenuId(null);
                                  router.push(
                                    `/dashboard?tab=onboarding&id=${chatbot.uuid}`
                                  );
                                }}
                                className="chatbot-menu-item"
                                title="ویرایش"
                                role="menuitem"
                              >
                                <Edit3 className="w-4 h-4" />
                                <span>ویرایش</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  openConfirmModal(chatbot.uuid);
                                  setOpenMenuId(null);
                                }}
                                className="chatbot-menu-item chatbot-menu-item-danger"
                                title="حذف"
                                role="menuitem"
                              >
                                <Trash2 className="w-4 h-4" />
                                <span>حذف</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <ConfirmModal
          isOpen={confirmActiveModal.isOpen}
          onClose={closeConfirmActiveModal}
          onConfirm={handleConfirmActive}
          title={
            confirmActiveModal.newStatus
              ? "فعال کردن چت بات"
              : "غیرفعال کردن چت بات"
          }
          message={`آیا مطمئن هستید که می‌خواهید این چت بات را ${
            confirmActiveModal.newStatus ? "فعال" : "غیرفعال"
          } کنید؟`}
          confirmText="بله، تایید"
          cancelText="لغو"
          type={confirmActiveModal.newStatus ? "success" : "warning"}
        />
        <ChatbotDetailModal
          chatbot={selectedChatbot}
          show={showDetailModal}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedChatbot(null);
          }}
        />

        <ConfirmModal
          isOpen={confirmModal.isOpen}
          onClose={closeConfirmModal}
          onConfirm={handleConfirmDelete}
          title="حذف چت بات"
          message="آیا از حذف این چت بات اطمینان دارید؟ این عمل قابل بازگشت نیست."
          confirmText="بله، حذف کن"
          cancelText="لغو"
          type="danger"
        />
      </main>
    </div>
  );
}
