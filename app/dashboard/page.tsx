"use client";

import PageLoader from "@/components/pageLoader";
import ActiveUsers from "./components/activeusers";
import DashboardHome from "./components/dashboard-home";
import OnboardingWizard from "../onboarding/page";
import { Sidebar } from "./sidebar";
import { Tickets } from "./components/tickets";
import { Upgrade } from "./components/upgrade";
import { Billing } from "./components/billing";
import { useAuth } from "@/providers/AuthProvider";
import { JSX, useEffect, useState } from "react";
import { ChatbotManagement } from "./components/chatbot-management";
import { useSearchParams, useRouter } from "next/navigation";
import { Menu } from "lucide-react";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
      {/* <Sidebar currentPage={currentPage} router={router} /> */}
      {/* Toggle Button (Hamburger) */}
      <button
        onClick={() => setIsSidebarOpen((prev) => !prev)}
        className="absolute top-4 right-4 z-50 bg-white shadow p-2 rounded-md lg:hidden"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar Wrapper with Animation */}
      <div
        className={`
          fixed lg:static top-0 right-0 h-full z-40
          transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}
          lg:translate-x-0
        `}
        style={{ width: "256px" }}
      >
        <Sidebar
          currentPage={currentPage}
          router={router}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>
      <main className="flex-1 bg-gray-50">
        {pages[currentPage] || <DashboardHome />}
      </main>
    </div>
  );
}
