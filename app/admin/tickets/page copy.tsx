"use client";

import React, { useEffect, useState, useCallback } from "react";
import PageLoader from "@/components/pageLoader";
import axiosInstance from "@/lib/axiosInstance";
import ProgressStatCard from "@/components/ProgressStatCard";
import StatCard from "@/components/stat-card";
import TableTicket from "./tableTicket";
import TicketCard from "./TicketCard";
import { useAuth } from "@/providers/AuthProvider";
import { API_ROUTES } from "@/constants/apiRoutes";
import { Ticket, TicketStatus } from "@/types/common";
import { convertNumbersToPersian } from "@/utils/common";
import { useRouter, useParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Plus,
  TicketAll,
  TicketClose,
  TicketOpen,
  TicketPend,
} from "@/public/icons/AppIcons";

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
  const [pageSize] = useState(2);
  const [total, setTotal] = useState(0);

  const totalPages = Math.ceil(total / pageSize);

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
        setTotal(data.pagination?.total ?? 1);
      } catch (error) {
        console.error("Load tickets failed:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [pageSize, userId],
  );

  useEffect(() => {
    if (!loading) {
      loadTickets(1);
    }
  }, [loading]);

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
  const handleSetPage = (page: number) => {
    setPage(page);
    loadTickets(page);
  };
  const handleNextPage = () => {
    if (page < totalPages) {
      loadTickets(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      loadTickets(page - 1);
    }
  };

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
        <div className="space-y-4 lg:hidden">
          {filteredTickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onBackClick={() => router.push(`/admin/tickets/${ticket.id}`)}
            />
          ))}
        </div>
        <div className="hidden lg:block">
          <TableTicket data={filteredTickets} />
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center mt-6 px-3 py-4 gap-6">
            {/* Previous Page */}
            <button
              onClick={handlePrevPage}
              disabled={page === 1 || isLoading}
              className={`text-secondary text-sm flex items-center cursor-pointer ${page === 1 ? "opacity-50" : ""}`}
            >
              <ChevronRight />
              قبلی
            </button>

            {/* Numeric Pagination */}
            <div className="flex items-center gap-3">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handleSetPage(index + 1)}
                  className={`px-3 py-1 text-sm border-secondary rounded-full ${page === index + 1 ? "border " : "border-none"}`}
                >
                  {convertNumbersToPersian(index + 1)}
                </button>
              ))}
            </div>

            {/* Next Page */}
            <button
              onClick={handleNextPage}
              disabled={page === totalPages || isLoading}
              className={`text-secondary text-sm flex items-center cursor-pointer ${page === totalPages ? "opacity-50" : ""}`}
            >
              بعدی
              <ChevronLeft />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
