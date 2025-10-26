"use client";

import DashboardHome from "./components/dashboard-home";
import { JSX } from "react";
import { Sidebar } from "./sidebar";
import { Tickets } from "./components/tickets";
import { Billing } from "./components/billing";
import { BotProvider } from "@/providers/BotProvider";
import { ChatbotManagement } from "./components/chatbot-management";
import { useSearchParams, useRouter } from "next/navigation";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = (searchParams.get("tab") ?? "dashboard") as
    | "dashboard"
    | "chatbot-management"
    | "tickets"
    | "billing";

  const pages: Record<string, JSX.Element> = {
    "chatbot-management": <ChatbotManagement />,
    tickets: <Tickets />,
    billing: <Billing />,
    dashboard: <DashboardHome />,
  };

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
