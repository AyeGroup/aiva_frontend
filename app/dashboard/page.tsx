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

 

  // if (loading) return <PageLoader />;
  // if (!user) return null;

  return (
    <div className="flex min-h-screen relative">
      {/* <Sidebar currentPage={currentPage} router={router} /> */}
      {/* Toggle Button (Mobile + Desktop) */}
      <button
        onClick={() => setIsSidebarOpen((prev) => !prev)}
        className="absolute top-0 right-0 z-50 bg-red-400 shadow p-2 rounded-md lg:hidden"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <div className={`${isSidebarOpen ? "block" : "hidden"} lg:block`}>
        <Sidebar currentPage={currentPage} router={router} />
      </div>
      <main className="flex-1 bg-gray-50">
        {pages[currentPage] || <DashboardHome />}
      </main>
    </div>
  );
}
