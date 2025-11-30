"use client";
import React, { useEffect, useState } from "react";
import PageLoader from "@/components/pageLoader";
import axiosInstance from "@/lib/axiosInstance";
import { Card } from "@/components/card";
import { toast } from "sonner";
import { useAuth } from "@/providers/AuthProvider";
import { API_ROUTES } from "@/constants/apiRoutes";
import { StatusBadge } from "../status-badge";
import { Ticket, ViewType } from "@/types/common";
import { convertToPersian } from "@/utils/common";
import { ViewTicketDetail } from "../TicketView";
import { CreateTicketView } from "../TicketCreate";
import {
  Back,
  Plus,
  TicketAll,
  TicketClose,
  TicketOpen,
  TicketPend,
  TicketTitle,
} from "@/public/icons/AppIcons";

export function Tickets() {
  const [view, setView] = useState<ViewType>("list");
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const filteredTickets = tickets.filter((ticket) => {
    if (filterStatus !== "all" && ticket.status !== filterStatus) return false;
    if (filterPriority !== "all" && ticket.priority !== filterPriority)
      return false;
    return true;
  });

  const stats = {
    total: tickets.length,
    open: tickets.filter((t) => t.status === "open").length,
    pending: tickets.filter((t) => t.status === "in_progress").length,
    closed: tickets.filter((t) => t.status === "closed").length,
    high: tickets.filter((t) => t.priority === "high").length,
  };

  const { user, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user?.token) return;

    const fetchTicket = async () => {
      await loadTicket();
    };

    fetchTicket();
  }, [user?.token]);

  const loadTicket = async () => {
    setIsLoading(true);

    try {
      const response = await axiosInstance.get(API_ROUTES.TICKETS.LIST);
      setTickets(response.data.data);
      console.log("ticket list: ", response.data.data);
    } catch (apiError: any) {
      console.warn("API fetch failed, using local data:", apiError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-bg-shell">
      <div className="flex h-screen">
        {/* Main Content */}
        {(isLoading || loading) && <PageLoader />}
        <main className="flex-1 overflow-hidden">
          <div className="h-full flex flex-col">
            {/* Header */}
            <header className="shrink-0 bg-bg-surface border-b border-border-soft px-8 py-6">
              <div className="flex items-start justify-between">
                <div className="text-right">
                  <h1 className="text-grey-900 mb-2"> تیکت‌های پشتیبانی</h1>
                  <p className="text-grey-600">
                    مدیریت و پیگیری درخواست‌های پشتیبانی
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  {view === "list" && (
                    <button
                      type="button"
                      className="bg-brand-primary text-white px-6 py-3 rounded-xl hover:bg-brand-primary/90 font-medium flex items-center gap-2"
                      title="ایجاد تیکت جدید"
                      onClick={() => setView("create")}
                    >
                      <div className="text-white w-4 h-4">
                        <Plus />
                      </div>
                      تیکت جدید
                    </button>
                  )}

                  {view !== "list" && (
                    <button
                      type="button"
                      className="bg-grey-200 text-grey-700 px-6 py-3 rounded-xl hover:bg-grey-300 font-medium flex items-center gap-2"
                      title="بازگشت به لیست تیکت‌ها"
                      onClick={() => {
                        setView("list");
                        setSelectedTicketId(null);
                      }}
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

            {/* Stats Cards - Only show in list view */}
            {view === "list" && (
              <section className="shrink-0 bg-white border-b border-grey-300">
                <div className="px-8 py-9">
                  <div className="gap-6 grid grid-cols-[repeat(4,_minmax(0px,_1fr))] w-full">
                    {/* کل تیکت‌ها */}
                    <div className="bg-white relative rounded-[20px]">
                      <div
                        className="overflow-clip rounded-[inherit] size-full  cursor-pointer"
                        onClick={() => setFilterStatus("all")}
                      >
                        <div className="p-6 flex flex-col gap-8 w-full">
                          <div className="flex gap-4 items-center justify-start w-full">
                            <div className="bg-brand-primary/10 rounded-2xl size-14 flex items-center justify-center">
                              <div className="w-7 h-7 text-primary">
                                <TicketAll />
                              </div>
                            </div>
                            <div className="flex-1 flex flex-col gap-2 items-start justify-center">
                              <p className="text-grey-600">کل تیکت‌ها</p>
                              <p
                                className="text-brand-primary"
                                style={{ fontFamily: "Vazirmatn" }}
                              >
                                {convertToPersian(stats.total)}
                              </p>
                            </div>
                          </div>
                          <div className="bg-grey-100 h-1 flex items-end justify-center overflow-clip rounded-full w-full">
                            <div className="bg-brand-primary h-1 rounded-full w-full"></div>
                          </div>
                        </div>
                      </div>
                      <div
                        aria-hidden="true"
                        className="absolute border-2 border-grey-300 border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)]"
                      />
                    </div>

                    {/* تیکت‌های باز */}
                    <div className="bg-white relative rounded-[20px]">
                      <div
                        className="flex flex-col items-start justify-center overflow-clip rounded-[inherit] size-full cursor-pointer"
                        onClick={() => setFilterStatus("open")}
                      >
                        <div className="p-6 flex flex-col gap-8 items-start justify-center w-full">
                          <div className="flex gap-4 items-center justify-start w-full">
                            <div className="bg-danger/10 rounded-2xl size-14 flex items-center justify-center">
                              <div className="w-7 h-7 text-danger">
                                <TicketOpen />
                              </div>
                            </div>
                            <div className="flex-1 flex flex-col gap-2 items-start justify-center">
                              <p className="text-grey-600">تیکت‌های باز</p>
                              <p
                                className="text-danger"
                                style={{ fontFamily: "Vazirmatn" }}
                              >
                                {convertToPersian(stats.open)}
                              </p>
                            </div>
                          </div>
                          <div className="bg-grey-100 h-1 relative rounded-full w-full">
                            <div className="overflow-clip rounded-[inherit] size-full">
                              <div
                                className="flex flex-col h-1 items-start w-full"
                                style={{
                                  paddingLeft: `${
                                    stats.total > 0
                                      ? 100 - (stats.open / stats.total) * 100
                                      : 100
                                  }%`,
                                }}
                              >
                                <div className="bg-danger h-1 rounded-full w-full"></div>
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

                    {/* در انتظار */}
                    <div className="bg-white relative rounded-[20px]">
                      <div
                        className="overflow-clip rounded-[inherit] size-full cursor-pointer"
                        onClick={() => setFilterStatus("pending")}
                      >
                        <div className="p-6 flex flex-col gap-8 w-full">
                          <div className="flex gap-4 items-center justify-start w-full">
                            <div className="bg-warning/10 rounded-2xl size-14 flex items-center justify-center">
                              <div className="w-7 h-7 text-secondary">
                                <TicketPend />
                              </div>
                            </div>
                            <div className="flex-1 flex flex-col gap-2 items-start justify-center">
                              <p className="text-grey-600">در حال بررسی</p>
                              <p
                                className="text-warning"
                                style={{ fontFamily: "Vazirmatn" }}
                              >
                                {convertToPersian(stats.pending)}
                              </p>
                            </div>
                          </div>
                          <div className="bg-grey-100 h-1 relative rounded-full w-full">
                            <div className="overflow-clip rounded-[inherit] size-full">
                              <div
                                className="flex flex-col h-1 items-start w-full"
                                style={{
                                  paddingLeft: `${
                                    stats.total > 0
                                      ? 100 -
                                        (stats.pending / stats.total) * 100
                                      : 100
                                  }%`,
                                }}
                              >
                                <div className="bg-warning h-1 rounded-full w-full"></div>
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

                    {/* حل شده */}
                    <div className="bg-white relative rounded-[20px]">
                      <div
                        className="overflow-clip rounded-[inherit] size-full cursor-pointer"
                        onClick={() => setFilterStatus("closed")}
                      >
                        <div className="p-6 flex flex-col gap-8 w-full">
                          <div className="flex gap-4 items-center justify-start w-full">
                            <div className="bg-accentGreen/10 rounded-2xl size-14 flex items-center justify-center">
                              <div className="w-7 h-7 text-accentGreen">
                                <TicketClose />
                              </div>
                            </div>
                            <div className="flex-1 flex flex-col gap-2 items-start justify-center">
                              <p className="text-grey-600">بسته شده</p>
                              <p
                                className="text-accentGreen"
                                style={{ fontFamily: "Vazirmatn" }}
                              >
                                {convertToPersian(stats.closed)}
                              </p>
                            </div>
                          </div>
                          <div className="bg-grey-100 h-1 relative rounded-full w-full">
                            <div className="overflow-clip rounded-[inherit] size-full">
                              <div
                                className="flex flex-col h-1 items-start w-full"
                                style={{
                                  paddingLeft: `${
                                    stats.total > 0
                                      ? 100 - (stats.closed / stats.total) * 100
                                      : 100
                                  }%`,
                                }}
                              >
                                <div className="bg-accentGreen h-1 rounded-full w-full"></div>
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
                  </div>
                </div>
              </section>
            )}

            {/* Tickets List - Only show in list view */}
            {view === "list" && (
              <section className="flex-1 overflow-y-auto">
                <div className="p-8">
                  {filteredTickets.length > 0 ? (
                    <div className="space-y-4">
                      {filteredTickets.map((ticket) => {
                        const badgeStatus =
                          ticket.status === "open"
                            ? "error"
                            : ticket.status === "in_progress"
                            ? "pending"
                            : "success";

                        return (
                          <Card
                            key={ticket.id}
                            className="p-6 hover:shadow-hover border border-border-soft cursor-pointer group transition-all"
                            onClick={() => {
                              console.log("wwww");
                              setSelectedTicketId(ticket.id);
                              setView("view");
                            }}
                          >
                            <div className="space-y-3">
                              <div className="flex items-center justify-between gap-6">
                                {/* شناسه تیکت */}
                                <div className="shrink-0">
                                  <div className="px-4 py-2 bg-brand-primary/10 rounded-lg">
                                    <span className="text-brand-primary font-mono text-xs">
                                      {ticket.id}
                                    </span>
                                  </div>
                                </div>

                                {/* عنوان تیکت */}
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-grey-900 group-hover:text-brand-primary transition-colors text-right">
                                    {ticket.title}
                                  </h3>
                                </div>

                                {/* زمان آخرین بروزرسانی */}
                                <div className="shrink-0 flex items-center gap-2 text-grey-500">
                                  <div className="w-4 h-4">
                                    <TicketPend />
                                  </div>
                                  <span className="text-sm">
                                    {(() => {
                                      const date = new Date(ticket.updated_at);
                                      const faDate = date.toLocaleDateString(
                                        "fa-IR",
                                        {
                                          year: "numeric",
                                          month: "2-digit",
                                          day: "2-digit",
                                        }
                                      );
                                      const faTime = date.toLocaleTimeString(
                                        "fa-IR",
                                        {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                        }
                                      );
                                      return `${faDate} - ${faTime}`;
                                    })()}
                                  </span>
                                </div>

                                {/* آیکون فلش */}
                                <div className="shrink-0">
                                  <div className="w-5 h-5 text-gray-500">
                                    <Back />
                                  </div>
                                </div>
                              </div>

                              {/* وضعیت، اولویت و دسته‌بندی */}
                              <div className="flex items-center gap-3 pr-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-grey-500">
                                    وضعیت:
                                  </span>
                                  <StatusBadge status={badgeStatus} />
                                </div>

                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-grey-500">
                                    اولویت:
                                  </span>
                                  <span
                                    className={`px-3 py-1 rounded-lg text-xs ${
                                      ticket.priority === "urgent"
                                        ? "bg-red-100 text-red-700"
                                        : ticket.priority === "high"
                                        ? "bg-orange-100 text-orange-700"
                                        : ticket.priority === "medium"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-blue-100 text-blue-700"
                                    }`}
                                  >
                                    {ticket.priority === "urgent"
                                      ? "اورژانسی"
                                      : ticket.priority === "high"
                                      ? "بالا"
                                      : ticket.priority === "medium"
                                      ? "متوسط"
                                      : "پایین"}
                                  </span>
                                </div>

                                {/* دسته‌بندی */}
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-grey-500">
                                    دسته‌بندی:
                                  </span>
                                  <span className="px-3 py-1 rounded-lg text-xs bg-grey-100 text-grey-700">
                                    {ticket.category === "technical"
                                      ? "فنی"
                                      : ticket.category === "financial"
                                      ? "مالی"
                                      : "عمومی"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  ) : (
                    /* Empty State */
                    <div className="text-center py-16">
                      <div className="w-24 h-24 bg-grey-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <div className="w-12 h-12 text-grey-400">
                          <TicketAll />
                        </div>
                      </div>
                      <h3 className="text-grey-900 mb-2">هیچ تیکتی یافت نشد</h3>
                      <p className="text-grey-600 mb-6 max-w-md mx-auto">
                        {filterStatus !== "all" || filterPriority !== "all"
                          ? "برای این فیلتر تیکتی وجود ندارد. فیلترها را تغییر دهید."
                          : "هنوز تیکت پشتیبانی‌ای ایجاد نکرده‌اید."}
                      </p>

                      {filterStatus !== "all" || filterPriority !== "all" ? (
                        <button
                          onClick={() => {
                            setFilterStatus("all");
                            setFilterPriority("all");
                          }}
                          className="px-6 py-3 bg-grey-100 text-grey-700 rounded-xl hover:bg-grey-200 font-medium"
                        >
                          نمایش همه تیکت‌ها
                        </button>
                      ) : (
                        <button
                          className="px-6 py-3 bg-brand-primary text-white rounded-xl hover:bg-brand-primary/90 font-medium"
                          onClick={() => setView("create")}
                        >
                          + ایجاد اولین تیکت
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Create Ticket View */}
            {view === "create" && (
              <CreateTicketView
                onSubmit={(newTicket) => {
                  setTickets([...tickets, newTicket]);
                  setSelectedTicketId(newTicket.id);
                  setView("view");
                  toast.success("تیکت جدید با موفقیت ایجاد شد");
                }}
              />
            )}

            {/* View Ticket Detail */}
            {view === "view" && selectedTicketId && (
              <ViewTicketDetail
                ticket={tickets.find((t) => t.id === selectedTicketId)!}
                onClose={() => {
                  setView("list");
                  setSelectedTicketId(null);
                }}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
