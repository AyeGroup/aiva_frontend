"use client";
import React, { useEffect, useState } from "react";
import PageLoader from "@/components/pageLoader";
import axiosInstance from "@/lib/axiosInstance";
import { Card } from "@/components/card";
import { toast } from "sonner";
import { useAuth } from "@/providers/AuthProvider";
import { StatusBadge } from "@/app/dashboard/widgets/status-badge";
import { API_ROUTES } from "@/constants/apiRoutes";
import { Ticket, TicketStatus, ViewType } from "@/types/common";
import { convertToPersian } from "@/utils/common";
import { CreateTicketView } from "@/app/dashboard/TicketCreate";
import { getCategoryLabel, getPriorityLabel } from "@/constants/common";
import {
  Back,
  Plus,
  TicketAll,
  TicketClose,
  TicketOpen,
  TicketPend,
} from "@/public/icons/AppIcons";
import { ViewTicketDetail } from "./TicketView";

interface TicketStats {
  total: number;
  open: number;
  pending: number;
  closed: number;
  high: number;
}

interface StatCardConfig {
  title: string;
  count: number;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
  progressColor: string;
  onClick: () => void;
}

// Helper functions
const calculatePercentage = (part: number, total: number): number => {
  return total > 0 ? (part / total) * 100 : 0;
};

const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  const faDate = date.toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const faTime = date.toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${faDate} - ${faTime}`;
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

const getBadgeStatus = (status: string): "error" | "pending" | "success" => {
  if (status === "open") return "error";
  if (status === "in_progress") return "pending";
  return "success";
};

// Sub-components
const StatCard: React.FC<StatCardConfig> = ({
  title,
  count,
  icon,
  bgColor,
  textColor,
  progressColor,
  onClick,
}) => (
  <div className="bg-white relative rounded-[20px]">
    <div
      className="overflow-clip rounded-[inherit] size-full cursor-pointer"
      onClick={onClick}
    >
      <div className="p-6 flex flex-col gap-8 w-full">
        <div className="flex gap-4 items-center justify-start w-full">
          <div
            className={`${bgColor} rounded-2xl size-14 flex items-center justify-center`}
          >
            <div className={`w-7 h-7 ${textColor}`}>{icon}</div>
          </div>
          <div className="flex-1 flex flex-col gap-2 items-start justify-center">
            <p className="text-grey-600">{title}</p>
            <p className={textColor} style={{ fontFamily: "Vazirmatn" }}>
              {convertToPersian(count)}
            </p>
          </div>
        </div>
        <div className="bg-grey-100 h-1 flex items-end justify-center overflow-clip rounded-full w-full">
          <div className={`${progressColor} h-1 rounded-full w-full`}></div>
        </div>
      </div>
    </div>
    <div
      aria-hidden="true"
      className="absolute border-2 border-grey-300 border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)]"
    />
  </div>
);

const ProgressStatCard: React.FC<StatCardConfig & { percentage: number }> = ({
  title,
  count,
  icon,
  bgColor,
  textColor,
  progressColor,
  onClick,
  percentage,
}) => (
  <div className="bg-white relative rounded-[20px]">
    <div
      className="overflow-clip rounded-[inherit] size-full cursor-pointer"
      onClick={onClick}
    >
      <div className="p-6 flex flex-col gap-8 w-full">
        <div className="flex gap-4 items-center justify-start w-full">
          <div
            className={`${bgColor} rounded-2xl size-14 flex items-center justify-center`}
          >
            <div className={`w-7 h-7 ${textColor}`}>{icon}</div>
          </div>
          <div className="flex-1 flex flex-col gap-2 items-start justify-center">
            <p className="text-grey-600">{title}</p>
            <p className={textColor} style={{ fontFamily: "Vazirmatn" }}>
              {convertToPersian(count)}
            </p>
          </div>
        </div>
        <div className="bg-grey-100 h-1 relative rounded-full w-full">
          <div className="overflow-clip rounded-[inherit] size-full">
            <div
              className="flex flex-col h-1 items-start w-full"
              style={{ paddingLeft: `${100 - percentage}%` }}
            >
              <div className={`${progressColor} h-1 rounded-full w-full`}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      aria-hidden="true"
      className="absolute border-2 border-grey-300 border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)]"
    />
  </div>
);

const TicketCard: React.FC<{
  ticket: Ticket;
  onClick: () => void;
}> = ({ ticket, onClick }) => {
  const badgeStatus = getBadgeStatus(ticket.status);

  return (
    <Card
      className="p-3 lg:p-6 hover:shadow-hover border border-border-soft cursor-pointer group transition-all"
      onClick={onClick}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-6">
          <div className="">
            <div className="px-4 py-2 bg-brand-primary/10 rounded-lg">
              <span className="text-brand-primary font-mono text-xs">
                {ticket.id}
              </span>
            </div>
          </div>

          <div className="flex-1  ">
            <h3 className="text-grey-900 group-hover:text-brand-primary transition-colors text-right">
              {ticket.title}
            </h3>
          </div>

          <div className="flex items-center gap-1 lg:gap-2 text-grey-500">
            <div className="w-4 h-4">
              <TicketPend />
            </div>
            <span className="text-sm">{formatDateTime(ticket.updated_at)}</span>
          </div>

          <div className="flex items-center ">
            <div className="w-5 h-5 text-gray-500">
              <Back />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 items-center gap-1 lg:gap-3 lg:pr-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-grey-500">وضعیت:</span>
            <StatusBadge status={badgeStatus} />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-grey-500">اولویت:</span>
            <span
              className={`px-3 py-1 rounded-lg text-xs ${getPriorityStyles(
                ticket.priority
              )}`}
            >
              {getPriorityLabel(ticket.priority)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-grey-500">دسته‌بندی:</span>
            <span className="px-3 py-1 rounded-lg text-xs bg-grey-100 text-grey-700">
              {getCategoryLabel(ticket.category)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

const EmptyState: React.FC<{
  hasFilters: boolean;
  onClearFilters: () => void;
  onCreateTicket: () => void;
}> = ({ hasFilters, onClearFilters, onCreateTicket }) => (
  <div className="text-center py-16">
    <div className="w-24 h-24 bg-grey-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <div className="w-12 h-12 text-grey-400">
        <TicketAll />
      </div>
    </div>
    <h3 className="text-grey-900 mb-2">هیچ تیکتی یافت نشد</h3>
    <p className="text-grey-600 mb-6 max-w-md mx-auto">
      {hasFilters
        ? "برای این فیلتر تیکتی وجود ندارد. فیلترها را تغییر دهید."
        : "هنوز تیکت پشتیبانی‌ای ایجاد نکرده‌اید."}
    </p>

    {hasFilters ? (
      <button
        onClick={onClearFilters}
        className="px-6 py-3 bg-grey-100 text-grey-700 rounded-xl hover:bg-grey-200 font-medium"
      >
        نمایش همه تیکت‌ها
      </button>
    ) : (
      <button
        className="px-6 py-3 bg-brand-primary text-white rounded-xl hover:bg-brand-primary/90 font-medium"
        onClick={onCreateTicket}
      >
        + ایجاد اولین تیکت
      </button>
    )}
  </div>
);

// Main component
export default function AdminTickets() {
  const [view, setView] = useState<ViewType>("list");
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  // const [filterStatus, setFilterStatus] = useState<string>("all");
    type TicketStatusFilter = TicketStatus | "all";
  
    const [filterPriority, setFilterPriority] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState<TicketStatusFilter>("all");

  const { user, loading } = useAuth();

  // Computed values
  // const filteredTickets = tickets.filter((ticket) => {
  //   if (filterStatus !== "all" && ticket.status !== filterStatus) return false;
  //   if (filterPriority !== "all" && ticket.priority !== filterPriority)
  //     return false;
  //   return true;
  // });
  const filteredTickets = tickets.filter((ticket) => {
    if (filterStatus !== "all" && ticket.status !== filterStatus) return false;
    if (filterPriority !== "all" && ticket.priority !== filterPriority)
      return false;
    return true;
  });

  const stats: TicketStats = {
    total: tickets.length,
    open: tickets.filter((t) => t.status === "open").length,
    pending: tickets.filter((t) => t.status === "in_progress").length,
    closed: tickets.filter((t) => t.status === "closed").length,
    high: tickets.filter((t) => t.priority === "high").length,
  };

  const hasActiveFilters = filterStatus !== "all" || filterPriority !== "all";

  // Effects
  useEffect(() => {
    if (!user?.token) return;
    loadTickets();
  }, [user?.token]);

  // Handlers
  const loadTickets = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(API_ROUTES.ADMIN.TICKETS);
      setTickets(response.data.data);
      // console.log("ticket list ", response.data.data);
    } catch (apiError: any) {
      console.warn("API fetch failed, using local data:", apiError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTicket = () => setView("create");

  const handleBackToList = async () => {
    setView("list");
    setSelectedTicketId(null);
    await loadTickets();
  };

  const handleTicketClick = (ticketId: string) => {
    console.log("wwww");
    setSelectedTicketId(ticketId);
    setView("view");
  };

  const handleTicketCreated = (newTicket: Ticket) => {
    setTickets([...tickets, newTicket]);
    setSelectedTicketId(newTicket.id);
    setView("view");
    toast.success("تیکت جدید با موفقیت ایجاد شد");
  };

  const handleClearFilters = () => {
    setFilterStatus("all");
    setFilterPriority("all");
  };

  // Render helpers
  const renderHeader = () => (
    <header className="bg-bg-surface border-b border-border-soft px-6 lg:px-8 py-6">
      <div className="flex items-center lg:items-start justify-between">
        <div className="text-right">
          <h1 className="text-grey-900 mb-0 mr-1 lg:mr-10 text-2xl lg:text-3xl font-bold">
            تیکت‌های پشتیبانی
          </h1>
          <p className="text-grey-600 mr-1 lg:mr-10 ">
            مدیریت و پیگیری درخواست‌های پشتیبانی
          </p>
        </div>

        <div className="flex items-center gap-4">
          {view === "list" ? (
            <button
              type="button"
              className="bg-brand-primary text-white px-3 py-2 lg:px-6 lg:py-3 rounded-xl hover:bg-brand-primary/90 font-medium flex items-center gap-2"
              title="ایجاد تیکت جدید"
              onClick={handleCreateTicket}
            >
              <div className="text-white w-4 h-4">
                <Plus />
              </div>
              تیکت جدید
            </button>
          ) : (
            <button
              type="button"
              className="bg-grey-200 text-grey-700 px-6 py-3 rounded-xl hover:bg-grey-300 font-medium flex items-center gap-2"
              title="بازگشت به لیست تیکت‌ها"
              onClick={handleBackToList}
            >
              <div className="w-4 h-4">
                <Back />
              </div>
              بازگشت
            </button>
          )}
        </div>
      </div>
    </header>
  );

  const renderStatsCards = () => (
    <section className=" bg-white border-b border-grey-300">
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
            bgColor="bg-accentGreen/10"
            textColor="text-accentGreen"
            progressColor="bg-accentGreen"
            percentage={calculatePercentage(stats.closed, stats.total)}
            onClick={() => setFilterStatus("closed")}
          />
        </div>
      </div>
    </section>
  );

  const renderTicketsList = () => (
    <section className="flex-col w-full">
      <div className="p-3 lg:p-8">
        {filteredTickets.length > 0 ? (
          <div className="space-y-4">
            {filteredTickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                onClick={() => handleTicketClick(ticket.id)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            hasFilters={hasActiveFilters}
            onClearFilters={handleClearFilters}
            onCreateTicket={handleCreateTicket}
          />
        )}
      </div>
    </section>
  );

  return (
    <div className="h-screen overflow-y-auto w-full bg-bg-shell">
      {(isLoading || loading) && <PageLoader />}

      <main className="w-full">
        {renderHeader()}

        <div className="w-full">
          {view === "list" ? (
            <>
              {renderStatsCards()}
              {renderTicketsList()}
            </>
          ) : view === "create" ? (
            <CreateTicketView onSubmit={handleTicketCreated} />
          ) : view === "view" && selectedTicketId ? (
            (() => {
              const selectedTicket = tickets.find(
                (t) => t.id === selectedTicketId
              );
              return selectedTicket ? (
                <ViewTicketDetail
                  ticket={selectedTicket}
                  onClose={handleBackToList}
                />
              ) : null;
            })()
          ) : null}
        </div>
      </main>
    </div>
  );
}
