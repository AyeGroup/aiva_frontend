"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { AdminSidebar } from "./Adminsidebar";
import { JSX } from "react";
import AdminUsers from "./users/page";
import AdminTickets from "./tickets/page";

export default function AdminLayout() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = (searchParams.get("tab") ?? "dashboard-home") as
    | "dashboard-home"
    | "chatbot-management"
    | "tickets"
    | "activeusers"
    | "billing";
  const pages: Record<string, JSX.Element> = {
    users: <AdminUsers />,
    tickets: <AdminTickets />,
  };
  return (
    <div className="flex min-h-screen">
      <AdminSidebar
        currentPage={currentPage}
        router={router}
        // onClose={() => setIsSidebarOpen(false)}
      />
      <main className="flex-1 bg-gray-50">
        {pages[currentPage]  }
      </main>
      {/* <main className="flex-1 bg-gray-50 p-6"></main> */}
    </div>
  );
}
