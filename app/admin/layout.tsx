"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { AdminSidebar } from "./Adminsidebar";
import { JSX } from "react";
import AdminUsers from "./users/page";
import Home from "./page";
import { AdminTickets } from "./tickets/page";

export default function AdminLayout() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = (searchParams.get("tab") ?? "home") as
    | "home"
    | "users"
    | "tickets"
    | "billing";
  const pages: Record<string, JSX.Element> = {
    users: <AdminUsers />,
    tickets: <AdminTickets />,
    home: <Home />,
  };
  return (
    <div className="flex min-h-screen m-0 p-0">
      <AdminSidebar
        currentPage={currentPage}
        router={router}
        // onClose={() => setIsSidebarOpen(false)}
      />
      <main className="flex-1 bg-gray-50 p-3">{pages[currentPage]}</main>
    </div>
  );
}
