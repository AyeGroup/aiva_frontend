"use client";

import React, { useEffect, useState, useCallback } from "react";
import PageLoader from "@/components/pageLoader";
import axiosInstance from "@/lib/axiosInstance";
import { Card } from "@/components/card";
import { useAuth } from "@/providers/AuthProvider";
import { StatusBadge } from "@/app/dashboard/widgets/status-badge";
import { API_ROUTES } from "@/constants/apiRoutes";
import { Ticket, TicketStatus } from "@/types/common";
import { convertToPersian } from "@/utils/common";
import { getCategoryLabel, getPriorityLabel } from "@/constants/common";
import {
  Back,
  Plus,
  TicketAll,
  TicketClose,
  TicketOpen,
  TicketPend,
} from "@/public/icons/AppIcons";
import { Eye } from "lucide-react";
import { ProfileModal } from "../users/ProfileModal";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/button";
// import { StatCard } from "@/components/stat-card";
import ProgressStatCard from "@/components/ProgressStatCard";
import StatCard from "@/components/stat-card";

const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return `${date.toLocaleDateString("fa-IR")} - ${date.toLocaleTimeString(
    "fa-IR",
    { hour: "2-digit", minute: "2-digit" }
  )}`;
};

const getPriorityStyles = (priority: string): string => {
  const styles: Record<string, string> = {
    urgent: "bg-red-100 text-red-700",
    high: "bg-orange-100 text-orange-700",
    medium: "bg-yellow-100 text-yellow-700",
    low: "bg-blue-100 text-blue-700",
  };
  return styles[priority] || "";
};

/* ================================
  Ticket Card
================================ */
const TicketCard: React.FC<{
  ticket: Ticket;
  onClick: () => void;
}> = ({ ticket, onClick }) => {
  const [openProfile, setOpenProfile] = useState(false);

  return (
    <Card className="p-4 hover:shadow-hover border border-border-soft transition">
      <div className="space-y-3">
        <div className="flex justify-between items-center gap-4">
          <div className="px-3 py-1 bg-brand-primary/10 rounded-lg">
            <span className="text-brand-primary font-mono text-xs">
              {ticket.id}
            </span>
          </div>

          <h3 className="flex-1 text-grey-900">{ticket.title}</h3>

          <span className="text-sm text-grey-500">
            {formatDateTime(ticket.updated_at)}
          </span>

          <div className="cursor-pointer" onClick={onClick}>
            <Back />
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="flex items-center gap-2 text-xs">
            وضعیت:
            <StatusBadge status={ticket.status} />
          </div>

          <div className="flex items-center gap-2 text-xs">
            اولویت:
            <span
              className={`px-2 py-1 rounded ${getPriorityStyles(
                ticket.priority
              )}`}
            >
              {getPriorityLabel(ticket.priority)}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            دسته:
            <span className="bg-grey-100 px-2 py-1 rounded">
              {getCategoryLabel(ticket.category)}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            کاربر:
            <span className="bg-grey-100 px-2 py-1 rounded">
              {ticket.user?.phone}
            </span>
            <Eye
              size={14}
              className="cursor-pointer text-primary"
              onClick={() => setOpenProfile(true)}
            />
          </div>
        </div>

        <ProfileModal
          open={openProfile}
          data={ticket.user}
          onClose={() => setOpenProfile(false)}
        />
      </div>
    </Card>
  );
};

/* ================================
  Main Component
================================ */
export default function AdminTickets() {
  const { loading } = useAuth();
  const router = useRouter();
  const params = useParams();

  // ✅ userId اختیاری
  const userId = params?.id as string | undefined;

  type TicketStatusFilter = TicketStatus | "all";

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filterStatus, setFilterStatus] = useState<TicketStatusFilter>("all");
  const [isLoading, setIsLoading] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [total, setTotal] = useState(0);

  const totalPages = Math.ceil(total / pageSize);

  /* ================================
    Load Tickets (Backend Pagination)
  ================================ */
  const loadTickets = useCallback(
    async (pageNumber: number = 1) => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(API_ROUTES.ADMIN.TICKETS, {
          params: {
            page: pageNumber,
            page_size: pageSize,
            ...(userId && { user_id: userId }),  
          },
        });

        const data = response.data.data;
        setTickets(data.items);
        setPage(data.pagination?.page ?? 1);
        setTotal(data.pagination?.total ??1);
      } catch (error) {
        console.error("Load tickets failed:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [pageSize, userId]
  );

  useEffect(() => {
    if (!loading) {
      loadTickets(1);
    }
  }, [loading]);

  /* ================================
    Derived data
  ================================ */
  const filteredTickets =
    filterStatus === "all"
      ? tickets
      : tickets.filter((t) => t.status === filterStatus);

  const stats = {
    total: tickets.length,
    open: tickets.filter((t) => t.status === "open").length,
    pending: tickets.filter((t) => t.status === "in_progress").length,
    closed: tickets.filter((t) => t.status === "closed").length,
  };

  const calculatePercentage = (part: number, total: number): number => {
    return total > 0 ? (part / total) * 100 : 0;
  };

  /* ================================
    Render
  ================================ */
  return (
    <div className="h-screen overflow-y-auto w-full">
      {(isLoading || loading) && <PageLoader />}

      <header className="bg-bg-surface border-b px-6 py-6 flex justify-between">
        <h1 className="text-2xl font-bold">
          {userId ? "تیکت‌های کاربر" : "مدیریت تیکت‌ها"}
        </h1>

        <button
          type="button"
          className="bg-brand-primary text-white px-3 py-2 lg:px-6 lg:py-3 rounded-xl hover:bg-brand-primary/90 font-medium flex items-center gap-2"
          title="ایجاد تیکت جدید"
          onClick={() => router.push("/admin/tickets/create")}
        >
          <div className="text-white w-4 h-4">
            <Plus />
          </div>
          تیکت جدید
        </button>
      </header>

      <main className="p-6 space-y-6">
        {/* Stats */}

        <div className="px-8 py-9">
          <div className="gap-6 grid  grid-cols-2 lg:grid-cols-4 w-full">
            <StatCard
              title="کل تیکت‌ها"
              count={stats.total}
              icon={<TicketAll />}
              bgColor="bg-brand-primary/10"
              textColor="text-primary"
              progressColor="bg-brand-primary"
              onClick={() => setFilterStatus("all")}
            />

            <ProgressStatCard
              title="تیکت‌های باز"
              count={stats.open}
              icon={<TicketOpen />}
              bgColor="bg-danger/10"
              textColor="text-danger"
              progressColor="bg-danger"
              percentage={calculatePercentage(stats.open, stats.total)}
              onClick={() => setFilterStatus("open")}
            />

            <ProgressStatCard
              title="در حال بررسی"
              count={stats.pending}
              icon={<TicketPend />}
              bgColor="bg-warning/10"
              textColor="text-warning"
              progressColor="bg-warning"
              percentage={calculatePercentage(stats.pending, stats.total)}
              onClick={() => setFilterStatus("in_progress")}
            />

            <ProgressStatCard
              title="بسته شده"
              count={stats.closed}
              icon={<TicketClose />}
              bgColor="bg-secondary/10"
              textColor="text-secondary"
              progressColor="bg-secondary"
              percentage={calculatePercentage(stats.closed, stats.total)}
              onClick={() => setFilterStatus("closed")}
            />
          </div>
        </div>

        {/* List */}
        <div className="space-y-4">
          {filteredTickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onClick={() => router.push(`/admin/tickets/${ticket.id}`)}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center pt-6 border-t">
            <span className="text-sm text-grey-600">
              صفحه {page} از {totalPages} | مجموع {convertToPersian(total)}
            </span>
            <div className="flex gap-2">
              <Button
                // variant="outline"
                disabled={page === 1}
                onClick={() => loadTickets(page - 1)}
              >
                قبلی
              </Button>
              <Button
                // variant="outline"
                disabled={page === totalPages}
                onClick={() => loadTickets(page + 1)}
              >
                بعدی
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
