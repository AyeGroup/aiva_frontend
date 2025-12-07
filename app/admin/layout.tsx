"use client";
import { AdminSidebar } from "./Adminsidebar";
import { JSX, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Home from "./page";
import AdminUsers from "./users/page";
import AdminChatbots from "./chatbots/page";
import AdminTickets from "./tickets/page";
import AdminBilling from "./billing/page";
import { Menu } from "lucide-react";

export default function AdminLayout() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const currentPage = (searchParams.get("tab") ?? "home") as
    | "home"
    | "users"
    | "tickets"
    | "billing";
  const pages: Record<string, JSX.Element> = {
    users: <AdminUsers />,
    chatbots: <AdminChatbots />,
    tickets: <AdminTickets />,
    billing: <AdminBilling />,
    home: <Home />,
  };

  useEffect(() => {
    const checkScreenSize = () => {
      const desktop = window.innerWidth >= 1024;
      // setIsDesktop(desktop);
      setIsSidebarOpen(desktop);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="flex min-h-screen m-0 p-0 relative">
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="absolute top-2 right-2 bg-secondary/10 shadow p-2 ml-4 rounded-md hover:bg-secondary/20 transition-colors z-999"
          aria-label="باز کردن منو"
        >
          <Menu className="w-6 h-6 text-secondary" />
        </button>
      )}
      {isSidebarOpen && (
        <AdminSidebar
          currentPage={currentPage}
          router={router}
          onClose={() => setIsSidebarOpen(false)}
        />
      )}

      <main className="flex-1 bg-gray-50 p-5">{pages[currentPage]}</main>
    </div>
  );
}
