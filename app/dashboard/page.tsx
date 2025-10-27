"use client";

import DashboardHome from "./components/dashboard-home";
import { JSX, useEffect } from "react";
import { Sidebar } from "./sidebar";
import { Tickets } from "./components/tickets";
import { Billing } from "./components/billing";
import { BotProvider } from "@/providers/BotProvider";
import { ChatbotManagement } from "./components/chatbot-management";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import PageLoader from "@/components/pageLoader";
import OnboardingWizard from "../onboarding/page";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, loading } = useAuth();

  const currentPage = (searchParams.get("tab") ?? "dashboard") as
    | "dashboard"
    | "chatbot-management"
    | "tickets"
    | "onboarding"
    | "billing";

  const pages: Record<string, JSX.Element> = {
    "chatbot-management": <ChatbotManagement />,
    tickets: <Tickets />,
    billing: <Billing />,
    dashboard: <DashboardHome />,
    onboarding: <OnboardingWizard />,
  };

  //authentication
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [loading, user, router]);
  if (loading) return <PageLoader/>;
  if (!user) return null;

  return (
    <BotProvider>
      <div className="flex min-h-screen">
        <Sidebar currentPage={currentPage} router={router} />

        <main className="flex-1 bg-gray-50">
          {pages[currentPage] || <DashboardHome />}
        </main>
      </div>
    </BotProvider>
  );
}
