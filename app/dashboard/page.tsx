"use client";

import { useSearchParams, useRouter } from "next/navigation";
import DashboardHome from "./components/dashboard-home";
// import ChatbotManagement from "./components/chatbot-management";
import { ChatbotManagement } from "./components/chatbot-management";
import { Sidebar } from "./sidebar";
import { BotProvider } from "@/providers/BotProvider";
import Tickets from "./components/tickets";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // currentPage از query مشخص میشه
  const currentPage = (searchParams.get("tab") ?? "dashboard") as
    | "dashboard"
    | "chatbot-management"
    | "tickets";

  return (
    <BotProvider>
      <div className="flex min-h-screen">
        <Sidebar currentPage={currentPage} router={router} />

        <main className="flex-1 bg-gray-50">
          {currentPage === "chatbot-management" ? (
            <ChatbotManagement />
          ) : currentPage === "tickets" ? (
            <div><Tickets/></div>
          ) : (
            <DashboardHome />
          )}
        </main>
      </div>
    </BotProvider>
  );
}
