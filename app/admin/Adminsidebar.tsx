"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import PageLoader from "@/components/pageLoader";
import { useAuth } from "@/providers/AuthProvider";
import { User, LogOut, ArrowLeft } from "lucide-react";
import { convertToPersian } from "@/utils/common";

interface SidebarItemProps {
  label: string;
  href: string;
  active: boolean;
}

function SidebarItem({ label, href, active }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className="relative block w-full px-4 py-3 text-center text-grey-900 hover:bg-white/30 transition-colors"
    >
      {active && (
        <span className="absolute left-6 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-brand-secondary" />
      )}
      <span className={`text-lg ${active ? "font-bold" : "font-normal"}`}>
        {label}
      </span>
    </Link>
  );
}

interface AdminSidebarProps {
  onClose?: () => void;
}

export function AdminSidebar({ onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  /* ---------------- Active Helpers ---------------- */

  const isExactActive = (path: string) => pathname === path;

  const isSectionActive = (path: string) =>
    pathname === path || pathname.startsWith(path + "/");

  /* ---------------- Actions ---------------- */

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------------- Render ---------------- */

  return (
    <aside
      className="w-64 flex flex-col h-screen relative"
      style={{ backgroundColor: "#F5E6D3" }}
    >
      {/* Close button (mobile) */}
      <button
        onClick={onClose}
        className="absolute top-4 left-4 text-gray-700 hover:text-black"
      >
        ✕
      </button>

      {/* User Info */}
      <div className="px-6 py-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white"
            style={{ backgroundColor: "#FFA18E" }}
          >
            <User />
          </div>
          <p className="text-grey-900 font-semibold">
            {user?.name || user?.phone || "کاربر"}
          </p>
        </div>
      </div>

      {loading && <PageLoader />}

      {/* Navigation */}
      <nav className="flex-1 py-1">
        {/* ✅ Parent route → exact match */}
        <SidebarItem
          label="میزکار"
          href="/admin"
          active={isExactActive("/admin")}
        />

        {/* ✅ Section routes → prefix match */}
        <SidebarItem
          label="کاربران"
          href="/admin/users"
          active={isSectionActive("/admin/users")}
        />

        <SidebarItem
          label="چت‌بات‌ها"
          href="/admin/chatbots"
          active={isSectionActive("/admin/transactchatbotsions")}
        />
        <SidebarItem
          label="مالی"
          href="/admin/transactions"
          active={isSectionActive("/admin/transactions")}
        />
        <SidebarItem
          label="تیکت‌ها"
          href="/admin/tickets"
          active={isSectionActive("/admin/tickets")}
        />

        <SidebarItem
          label="کد تخفیف"
          href="/admin/discount"
          active={isSectionActive("/admin/discount")}
        />
      </nav>

      {/* Bottom actions */}
      <div className="px-6 py-4 border-t border-white/30 space-y-2">
        {/* <Link
          href="/"
          className="flex items-center gap-3 text-grey-600 hover:text-grey-900 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          بازگشت به سایت
        </Link> */}

        <button
          onClick={handleLogout}
          disabled={isLoading}
          className="flex items-center gap-3 text-grey-600 hover:text-grey-900 text-sm"
        >
          <LogOut className="w-4 h-4" />
          خروج
        </button>
      </div>

      {/* Footer */}
      <div className="px-6 py-2 border-t border-white/30">
        <div className="flex items-center gap-2">
          <Image src="/logo.webp" width={32} height={32} alt="آیوا" priority />
          <div>
            <h2 className="text-grey-900 font-semibold text-sm">آیوا</h2>
            <p className="text-grey-500 text-xs">دستیار هوشمند</p>
          </div>
        </div>
        <div className="text-xs text-gray-500 mt-1">
                 نسخه {convertToPersian(process.env.APP_VERSION || "")}
       
          {/* نسخه {convertToPersian(process.env.NEXT_PUBLIC_APP_VERSION || "")} */}
        </div>
      </div>
    </aside>
  );
}
