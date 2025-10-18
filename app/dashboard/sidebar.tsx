import React, { useState } from "react";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { ChevronDown, User, LogOut, ArrowLeft } from "lucide-react";
import { AddChatbotModal } from "./add-chatbot-modal";
import { AddAccountModal } from "./add-account-modal";
import aivaLogo from "@/public/logo.png";
import sidebarImage from "@/public/ea78c89f3bbc3688a1b735ffbbc5ab4b48f59a00.png";
import { PageType } from "@/types/common";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
// import sidebarImage from "figma:asset/ea78c89f3bbc3688a1b735ffbbc5ab4b48f59a00.png";

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
      className="w-full text-center px-6 py-4 text-grey-900 hover:bg-white/30 transition-colors duration-200 relative"
    >
      {active && (
        <div className="absolute left-6 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-brand-secondary"></div>
      )}
      <span className={`text-lg mr-6 ${active ? "font-bold" : "font-normal"}`}>
        {label}
      </span>
    </button>
  );
}

interface SidebarProps {
  currentPage?: PageType;
}

export function Sidebar({ currentPage = "dashboard" }: SidebarProps) {
  const router = useRouter();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddAccountModalOpen, setIsAddAccountModalOpen] = useState(false);
  const [websites, setWebsites] = useState<Website[]>([]);
  const { logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddWebsite = (newWebsite: Omit<Website, "id">) => {
    const website: Website = {
      ...newWebsite,
      id: Date.now().toString(),
    };
    setWebsites((prev) => [...prev, website]);
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      logout();
      // if (!res.success) {
      //   toast.error(res.message);
      //   if (res.status === 403) {
      //     router.push(`/auth/verification?phone=${identity}`);
      //     return;
      //   }
      // }
      // toast.success("ورود موفق!");
      // console.log("redirecting dashboard ...");
      // router.push("/");
    } catch (err) {
      console.log(err);
      // toast.error("خطا در ورود");
    } finally {
      setIsLoading(false);
    }
  };
  const handleAddAccount = (newAccount: Omit<Account, "id">) => {
    const account: Account = {
      ...newAccount,
      id: Date.now().toString(),
    };
    console.log("New account added:", account);
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
            ع
          </div>
          <div className="text-center">
            <p className="text-grey-900 font-semibold">علی احمدی</p>
          </div>
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-4">
        <SidebarItem
          label="میزکار"
          active={currentPage === "dashboard"}
          // onClick={() => onNavigate("dashboard")}
        />
        <SidebarItem
          label="مدیریت چت بات"
          active={currentPage === "chatbot-management"}
          // onClick={() => onNavigate("chatbot-management")}
        />
        <SidebarItem
          label="تیکت"
          active={currentPage === "tickets"}
          // onClick={() => onNavigate("tickets")}
        />
        <SidebarItem label="پروفایل" />
        <SidebarItem label="مالی" />
      </nav>

      {/* Bottom Actions */}
      <div className="px-6 py-4 border-t border-white/30 space-y-2">
        <button
          onClick={() => router.push("/")}
          className="w-full flex items-center gap-3 px-0 py-2 text-grey-600 hover:text-grey-900 transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>بازگشت به سایت</span>
        </button>

        <button
          className="w-full flex items-center gap-3 px-0 py-2 text-grey-600 hover:text-grey-900 transition-colors text-sm"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          <span>خروج</span>
        </button>
      </div>

      {/* Footer - Logo & Brand */}
      <div className="px-6 py-6 border-t border-white/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
            <ImageWithFallback
              src=""
              // src=""
              alt="آیوا - دستیار هوشمند"
              className="w-8 h-8 object-cover"
            />
          </div>
          <div className="text-right">
            <h2 className="text-grey-900 font-semibold text-sm">آیوا</h2>
            <p className="text-grey-500 text-xs">دستیار هوشمند</p>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddChatbotModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddWebsite}
      />

      <AddAccountModal
        isOpen={isAddAccountModalOpen}
        onClose={() => setIsAddAccountModalOpen(false)}
        onAdd={handleAddAccount}
      />
    </aside>
  );
}
