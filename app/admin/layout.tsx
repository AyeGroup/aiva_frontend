"use client";

import { Menu } from "lucide-react";
import { AdminSidebar } from "./Adminsidebar";
import { useEffect, useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSidebarOpen(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="flex relative admin-panel">
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="absolute top-2 right-2 z-50"
        >
          <Menu />
        </button>
      )}

      {isSidebarOpen && (
        <AdminSidebar onClose={() => setIsSidebarOpen(false)} />
      )}

      <main className="flex-1 bg-[#f2f8f7]">{children}</main>
    </div>
  );
}
