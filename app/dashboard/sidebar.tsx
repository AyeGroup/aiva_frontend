"use client";

import React, { useState } from "react";
import PageLoader from "@/components/pageLoader";
import { useAuth } from "@/providers/AuthProvider";
import { PageType } from "@/types/common";
import { useRouter } from "next/navigation";
import { AddChatbotModal } from "./add-chatbot-modal";
import { AddAccountModal } from "./add-account-modal";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { User, LogOut, ArrowLeft } from "lucide-react";
import { useBot } from "@/providers/BotProvider";
import { ChatbotSelector } from "./chatbot-selector";

interface QAPair {
  id: string;
  question: string;
  answer: string;
}

interface Website {
  id: string;
  name: string;
  url: string;
  color: string;
  qaData?: QAPair[];
}

interface Account {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

interface SidebarItemProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function SidebarItem({ label, active = false, onClick }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full cursor-pointer text-center px-4 py-3 text-grey-900 hover:bg-white/30 transition-colors duration-200 relative"
    >
      {active && (
        <div className="absolute left-6 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-brand-secondary"></div>
      )}
      <span className={`text-lg   ${active ? "font-bold" : "font-normal"}`}>
        {label}
      </span>
    </button>
  );
}

interface SidebarProps {
  currentPage?: PageType;
  router: ReturnType<typeof useRouter>;
}

export function Sidebar({ currentPage = "dashboard-home", router }: SidebarProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddAccountModalOpen, setIsAddAccountModalOpen] = useState(false);
  const { user, loading, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // const { bots, currentBot, setCurrentBot } = useBot(); // ← دسترسی به بات‌ها
  const handleLogout = async () => {
    try {
      setIsLoading(true);
      logout();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <aside
      className="w-64 flex flex-col sticky top-0 h-screen"
      style={{ backgroundColor: "#F5E6D3" }}
    >
      {/* Header - User Profile */}
      <div className="px-6 py-6 text-center">
        <button
          onClick={() => setIsAddAccountModalOpen(true)}
          className="w-full flex flex-col items-center gap-3 group"
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
            style={{ backgroundColor: "#FFA18E" }}
          >
            <User />
          </div>
          <div className="text-center">
            <p className="text-grey-900 font-semibold">
              {user?.name || user?.phone || "کاربر"}
            </p>
          </div>
        </button>
      </div>

      {loading && <PageLoader />}

      {/* Bot Selector Dropdown */}
      <div className="px-4   text-lg font-bold flex justify-center items-center">
        {/* {bots && bots.length > 0 && (
          <>
            <label className="block   font-medium text-gray-700 m-1">
              چت‌بات
            </label>
          <ChatbotSelector/>
            
          </>
        )} */}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-1">
        <SidebarItem
          label="میزکار"
          active={currentPage === "dashboard-home"}
          onClick={() => router.push("/dashboard?tab=dashboard-home")}
        />
        <SidebarItem
          label="مدیریت چت‌بات"
          active={currentPage === "chatbot-management"}
          onClick={() => router.push("/dashboard?tab=chatbot-management")}
        />
        <SidebarItem
          label="پشتیبانی"
          active={currentPage === "tickets"}
          onClick={() => router.push("/dashboard?tab=tickets")}
        />
        {/* <SidebarItem label="پروفایل" /> */}
        <SidebarItem
          label="مالی"
          active={currentPage === "billing"}
          onClick={() => router.push("/dashboard?tab=billing")}
        />
      </nav>

      {/* Bottom Actions */}
      <div className="px-6 py-4 border-t border-white/30 space-y-2">
        <button
          onClick={() => router.push("/")}
          className="w-full flex items-center gap-3 px-0 py-2 text-grey-600 hover:text-grey-900 cursor-pointer transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>بازگشت به سایت</span>
        </button>

        <button
          className="w-full flex items-center gap-3 px-0 py-2 text-grey-600 hover:text-grey-900 transition-colors text-sm cursor-pointer"
          onClick={handleLogout}
          disabled={isLoading}
        >
          <LogOut className="w-4 h-4" />
          <span>خروج</span>
        </button>
      </div>

      {/* Footer */}
      <div className="px-6 py-2 border-t border-white/30">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
            <ImageWithFallback
              src="logo.png"
              alt="آیوا - دستیار هوشمند"
              className="w-8 h-8 object-cover"
            />
          </div>
          <div className="text-right">
            <h2 className="text-grey-900 font-semibold text-sm">آیوا</h2>
            <p className="text-grey-500 text-xs">دستیار هوشمند</p>
          </div>
        </div>
        <div className="text-xs text-gray-500 mt-1 mr-12">
          نسخه {process.env.NEXT_PUBLIC_APP_VERSION}
        </div>
      </div>

      {/* Modals */}
      <AddChatbotModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={() => {}}
      />
      <AddAccountModal
        isOpen={isAddAccountModalOpen}
        onClose={() => setIsAddAccountModalOpen(false)}
        onAdd={() => {}}
      />
    </aside>
  );
}
