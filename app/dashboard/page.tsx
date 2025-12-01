"use client";

import ActiveUsers from "./components/activeusers";
import DashboardHome from "./components/dashboard-home";
import OnboardingWizard from "../onboarding/page";
import { Menu } from "lucide-react";
import { Sidebar } from "./sidebar";
import { Tickets } from "./components/tickets";
import { Upgrade } from "./components/upgrade";
import { Billing } from "./components/billing";
import { useAuth } from "@/providers/AuthProvider";
import { ChatbotManagement } from "./components/chatbot-management";
import { JSX, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const currentPage = (searchParams.get("tab") ?? "dashboard-home") as
    | "dashboard-home"
    | "chatbot-management"
    | "tickets"
    | "onboarding"
    | "activeusers"
    | "billing"
    | "upgrade";

  const pages: Record<string, JSX.Element> = {
    "chatbot-management": <ChatbotManagement />,
    tickets: <Tickets />,
    billing: <Billing />,
    upgrade: <Upgrade />,
    dashboard: <DashboardHome />,
    onboarding: <OnboardingWizard />,
    activeusers: <ActiveUsers />,
  };

  //authentication
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [loading, user, router]);

  return (
    <div className="flex min-h-screen relative">
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className="absolute top-0 right-0 z-50 bg-gray-100 shadow p-2 rounded-md"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      {/* ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}   */}
      <div
        className={`
          fixed top-0 right-0 h-full z-40
          transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "hidden"}
          lg:static 
          lg:translate-x-0
          lg:z-10
        `}
        style={{ width: "256px" }}
      >
        <Sidebar
          currentPage={currentPage}
          router={router}
          onCloseُSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      </div>

      {/* <div className={`${isSidebarOpen ? "block" : "hidden"} lg:block`}>
        <Sidebar currentPage={currentPage} router={router} />
      </div> */}

      <main className="flex-1 bg-gray-50">
        {pages[currentPage] || <DashboardHome />}
      </main>
    </div>
  );
}
