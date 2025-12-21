"use client";

import Link from "next/link";
import Image from "next/image";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const currentPage = (searchParams.get("tab") ?? "dashboard-home") as
    | "dashboard-home"
    | "chatbot-management"
    | "tickets"
    | "onboarding"
    | "activeusers"
    | "billing";

  const pages: Record<string, JSX.Element> = {
    "chatbot-management": <ChatbotManagement />,
    tickets: <Tickets />,
    billing: <Billing />,
    dashboard: <DashboardHome />,
    onboarding: <OnboardingWizard />,
    activeusers: <ActiveUsers />,
  };

  useEffect(() => {
    const checkScreenSize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      setIsSidebarOpen(desktop);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [loading, user, router]);

  return (
    <div className="flex w-full min-h-screen">
      {!isDesktop && !isSidebarOpen && (
        <div className="w-full fixed top-0 left-0  z-50 bg-white shadow-sm px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/logo.webp"
              alt="لوگوی آیوا"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <div className="text-right leading-tight">
              <p className="text-base text-gray-900 font-semibold">آیوا</p>
              <p className="text-xs text-gray-600">دستیار هوشمند</p>
            </div>
          </Link>

          {/* Menu Button */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="bg-secondary/10 shadow p-2 ml-4 rounded-md hover:bg-secondary/20 transition-colors z-999"
            aria-label="باز کردن منو"
          >
            <Menu className="w-6 h-6 text-secondary" />
          </button>
        </div>
      )}

      {isDesktop && !isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="absolute top-10 right-8 bg-secondary/10 shadow p-2 ml-4 rounded-md hover:bg-secondary/20 transition-colors z-999"
        >
          <Menu className="w-6 h-6 text-secondary" />
        </button>
      )}

      {!isDesktop && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 right-0 h-full z-40
          transition-transform duration-300 ease-in-out
          bg-white shadow-xl
          ${isSidebarOpen ? "block" : "hidden"}
          lg:static 
  
          lg:shadow-none
        `}
        style={{ width: "256px" }}
      >
        <Sidebar
          currentPage={currentPage}
          router={router}
          onCloseSidebar={() => {
            // if (!isDesktop) {
            setIsSidebarOpen(false);
            // }
          }}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 pt-16 lg:pt-0 ">
        {pages[currentPage] || <DashboardHome />}
      </main>
    </div>
  );
}
