"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { Card } from "@/components/card";
import { Input } from "@/components/input";
import { toast } from "sonner";
import { useBot } from "@/providers/BotProvider";
import { Button } from "@/components/button";
import { useAuth } from "@/providers/AuthProvider";
import { API_ROUTES } from "@/constants/apiRoutes";
import { StatusBadge } from "../status-badge";
import { ChatbotSelector } from "../chatbot-selector";
import { Ticket, ViewType } from "@/types/common";

 

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
    pending: tickets.filter((t) => t.status === "pending").length,
    closed: tickets.filter((t) => t.status === "closed").length,
    high: tickets.filter((t) => t.priority === "high").length,
  };
  const { user, loading } = useAuth();
  const { bots, currentBot, setCurrentBot } = useBot();
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

  // const handleSubmit = async (ticketData: typeof formData) => {
  //   setIsLoading(true);
  //   try {
  //     const response = await axiosInstance.post(API_ROUTES.TICKETS.CREATE, {
  //       ...ticketData,
  //       status: "open",
  //     });
  //     const newTicket: Ticket = response.data.data;
  //     setTickets((prev) => [...prev, newTicket]);
  //     setSelectedTicketId(newTicket.id);
  //     setView("view");
  //     toast.success("تیکت جدید با موفقیت ارسال شد");
  //   } catch (error) {
  //     toast.error("ارسال تیکت با مشکل مواجه شد");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const getStatusConfig = (status: string) => {
    const configs = {
      open: {
        bg: "bg-danger/10",
        text: "text-danger",
        border: "border-danger/20",
        label: "باز",
        icon: (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
          </svg>
        ),
      },
      pending: {
        bg: "bg-warning/10",
        text: "text-warning",
        border: "border-warning/20",
        label: "در انتظار",
        icon: (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
        ),
      },
      closed: {
        bg: "bg-success/10",
        text: "text-success",
        border: "border-success/20",
        label: "بسته",
        icon: (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        ),
      },
    };
    return configs[status as keyof typeof configs];
  };

  const getPriorityConfig = (priority: string) => {
    const configs = {
      high: {
        bg: "bg-sharp-rose/10",
        text: "text-sharp-rose",
        border: "border-sharp-rose/20",
        label: "بالا",
        icon: "🔴",
      },
      medium: {
        bg: "bg-sharp-amber/10",
        text: "text-sharp-amber",
        border: "border-sharp-amber/20",
        label: "متوسط",
        icon: "🟡",
      },
      low: {
        bg: "bg-sharp-emerald/10",
        text: "text-sharp-emerald",
        border: "border-sharp-emerald/20",
        label: "پایین",
        icon: "🟢",
      },
    };
    return configs[priority as keyof typeof configs];
  };

  const getCategoryConfig = (category: string) => {
    const configs = {
      technical: {
        icon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ),
        bg: "bg-brand-indigo/10",
        text: "text-brand-indigo",
        label: "فنی",
      },
      billing: {
        icon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
          </svg>
        ),
        bg: "bg-brand-emerald/10",
        text: "text-brand-emerald",
        label: "مالی",
      },
      general: {
        icon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
        ),
        bg: "bg-brand-coral/10",
        text: "text-brand-coral",
        label: "عمومی",
      },
    };
    return configs[category as keyof typeof configs];
  };

  return (
    <div className="h-screen overflow-hidden bg-bg-shell" dir="rtl">
      <div className="flex h-screen">
        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          <div className="h-full flex flex-col">
            {/* Header */}
            <header className="flex-shrink-0 bg-bg-surface border-b border-border-soft px-8 py-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-brand-purple/10 rounded-xl flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-brand-purple"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                      </svg>
                    </div>
                    <div>
                      <h1 className="text-grey-900 text-right">
                        تیکت‌های پشتیبانی
                      </h1>
                      <p className="text-grey-600 text-sm">
                        مدیریت و پیگیری درخواست‌های پشتیبانی
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <ChatbotSelector />

                  {view === "list" && (
                    <button
                      type="button"
                      className="bg-brand-primary text-white px-6 py-3 rounded-xl hover:bg-brand-primary/90 font-medium flex items-center gap-2"
                      title="ایجاد تیکت جدید"
                      onClick={() => setView("create")}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                      </svg>
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
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                      بازگشت
                    </button>
                  )}
                </div>
              </div>
            </header>

            {/* Stats Cards - Only show in list view */}
            {view === "list" && (
              <section className="flex-shrink-0 bg-white border-b border-grey-300">
                <div className="px-8 py-9">
                  <div className="gap-6 grid grid-cols-[repeat(4,_minmax(0px,_1fr))] w-full">
                    {/* کل تیکت‌ها */}
                    <div className="bg-white relative rounded-[20px]">
                      <div className="overflow-clip rounded-[inherit] size-full">
                        <div className="p-6 flex flex-col gap-8 w-full">
                          <div className="flex gap-4 items-center justify-start w-full">
                            <div className="bg-brand-primary/10 rounded-2xl size-14 flex items-center justify-center">
                              <svg
                                className="size-7"
                                fill="none"
                                viewBox="0 0 28 28"
                              >
                                <path
                                  d="M10.5 14H17.5M10.5 18.6667H17.5M19.8333 24.5H8.16667C7.54783 24.5 6.95434 24.2542 6.51675 23.8166C6.07917 23.379 5.83333 22.7855 5.83333 22.1667V5.83333C5.83333 5.2145 6.07917 4.621 6.51675 4.18342C6.95434 3.74583 7.54783 3.5 8.16667 3.5H14.6837C14.9931 3.50007 15.2898 3.62303 15.5085 3.84183L21.8248 10.1582C22.0436 10.3769 22.1666 10.6736 22.1667 10.983V22.1667C22.1667 22.7855 21.9208 23.379 21.4832 23.8166C21.0457 24.2542 20.4522 24.5 19.8333 24.5Z"
                                  stroke="#65BCB6"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2.33333"
                                />
                              </svg>
                            </div>
                            <div className="flex-1 flex flex-col gap-2 items-start justify-center">
                              <p className="text-grey-600">کل تیکت‌ها</p>
                              <p
                                className="text-brand-primary"
                                style={{ fontFamily: "Vazirmatn" }}
                              >
                                {String(stats.total).replace(
                                  /\d/g,
                                  (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]
                                )}
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
                      <div className="flex flex-col items-start justify-center overflow-clip rounded-[inherit] size-full">
                        <div className="p-6 flex flex-col gap-8 items-start justify-center w-full">
                          <div className="flex gap-4 items-center justify-start w-full">
                            <div className="bg-danger/10 rounded-2xl size-14 flex items-center justify-center">
                              <svg
                                className="size-7"
                                fill="none"
                                viewBox="0 0 28 28"
                              >
                                <path
                                  d="M14 9.33333V14M14 18.6667H14.0117M24.5 14C24.5 15.3789 24.2284 16.7443 23.7007 18.0182C23.1731 19.2921 22.3996 20.4496 21.4246 21.4246C20.4496 22.3996 19.2921 23.1731 18.0182 23.7007C16.7443 24.2284 15.3789 24.5 14 24.5C12.6211 24.5 11.2557 24.2284 9.98182 23.7007C8.70791 23.1731 7.55039 22.3996 6.57538 21.4246C5.60036 20.4496 4.82694 19.2921 4.29927 18.0182C3.77159 16.7443 3.5 15.3789 3.5 14C3.5 11.2152 4.60625 8.54451 6.57538 6.57538C8.54451 4.60625 11.2152 3.5 14 3.5C16.7848 3.5 19.4555 4.60625 21.4246 6.57538C23.3938 8.54451 24.5 11.2152 24.5 14Z"
                                  stroke="#EF4444"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2.33333"
                                />
                              </svg>
                            </div>
                            <div className="flex-1 flex flex-col gap-2 items-start justify-center">
                              <p className="text-grey-600">تیکت‌های باز</p>
                              <p
                                className="text-danger"
                                style={{ fontFamily: "Vazirmatn" }}
                              >
                                {String(stats.open).replace(
                                  /\d/g,
                                  (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]
                                )}
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
                      <div className="overflow-clip rounded-[inherit] size-full">
                        <div className="p-6 flex flex-col gap-8 w-full">
                          <div className="flex gap-4 items-center justify-start w-full">
                            <div className="bg-warning/10 rounded-2xl size-14 flex items-center justify-center">
                              <svg
                                className="size-7"
                                fill="none"
                                viewBox="0 0 28 28"
                              >
                                <path
                                  d="M14 9.33333V14L17.5 17.5M24.5 14C24.5 15.3789 24.2284 16.7443 23.7007 18.0182C23.1731 19.2921 22.3996 20.4496 21.4246 21.4246C20.4496 22.3996 19.2921 23.1731 18.0182 23.7007C16.7443 24.2284 15.3789 24.5 14 24.5C12.6211 24.5 11.2557 24.2284 9.98182 23.7007C8.70791 23.1731 7.55039 22.3996 6.57538 21.4246C5.60036 20.4496 4.82694 19.2921 4.29927 18.0182C3.77159 16.7443 3.5 15.3789 3.5 14C3.5 11.2152 4.60625 8.54451 6.57538 6.57538C8.54451 4.60625 11.2152 3.5 14 3.5C16.7848 3.5 19.4555 4.60625 21.4246 6.57538C23.3938 8.54451 24.5 11.2152 24.5 14Z"
                                  stroke="#F59E0B"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2.33333"
                                />
                              </svg>
                            </div>
                            <div className="flex-1 flex flex-col gap-2 items-start justify-center">
                              <p className="text-grey-600">در حال بررسی</p>
                              <p
                                className="text-warning"
                                style={{ fontFamily: "Vazirmatn" }}
                              >
                                {String(stats.pending).replace(
                                  /\d/g,
                                  (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]
                                )}
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
                      <div className="overflow-clip rounded-[inherit] size-full">
                        <div className="p-6 flex flex-col gap-8 w-full">
                          <div className="flex gap-4 items-center justify-start w-full">
                            <div className="bg-[#52d4a0]/10 rounded-2xl size-14 flex items-center justify-center">
                              <svg
                                className="size-7"
                                fill="none"
                                viewBox="0 0 28 28"
                              >
                                <path
                                  d="M10.5 14L12.8333 16.3333L17.5 11.6667M24.5 14C24.5 15.3789 24.2284 16.7443 23.7007 18.0182C23.1731 19.2921 22.3996 20.4496 21.4246 21.4246C20.4496 22.3996 19.2921 23.1731 18.0182 23.7007C16.7443 24.2284 15.3789 24.5 14 24.5C12.6211 24.5 11.2557 24.2284 9.98182 23.7007C8.70791 23.1731 7.55039 22.3996 6.57538 21.4246C5.60036 20.4496 4.82694 19.2921 4.29927 18.0182C3.77159 16.7443 3.5 15.3789 3.5 14C3.5 11.2152 4.60625 8.54451 6.57538 6.57538C8.54451 4.60625 11.2152 3.5 14 3.5C16.7848 3.5 19.4555 4.60625 21.4246 6.57538C23.3938 8.54451 24.5 11.2152 24.5 14Z"
                                  stroke="#52D4A0"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2.33333"
                                />
                              </svg>
                            </div>
                            <div className="flex-1 flex flex-col gap-2 items-start justify-center">
                              <p className="text-grey-600">بسته شده</p>
                              <p
                                className="text-[#52d4a0]"
                                style={{ fontFamily: "Vazirmatn" }}
                              >
                                {String(stats.closed).replace(
                                  /\d/g,
                                  (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]
                                )}
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
                                <div className="bg-[#52d4a0] h-1 rounded-full w-full"></div>
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
                        // تبدیل status تیکت به فرمت StatusBadge component
                        const badgeStatus =
                          ticket.status === "open"
                            ? "error"
                            : ticket.status === "pending"
                            ? "pending"
                            : "success";

                        return (
                          <Card
                            key={ticket.id}
                            className="p-6 hover:shadow-hover border border-border-soft cursor-pointer group transition-all"
                            onClick={() => {
                              setSelectedTicketId(ticket.id);
                              setView("view");
                            }}
                          >
                            <div className="space-y-3">
                              <div className="flex items-center justify-between gap-6">
                                {/* شناسه تیکت */}
                                <div className="flex-shrink-0">
                                  <div className="px-4 py-2 bg-brand-primary/10 rounded-lg">
                                    <span className="text-brand-primary font-mono text-[12px]">
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
                                <div className="flex-shrink-0 flex items-center gap-2 text-grey-500">
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                  <span className="text-sm">
                                    {ticket.updatedAt}
                                  </span>
                                </div>

                                {/* آیکون فلش */}
                                <div className="flex-shrink-0">
                                  <svg
                                    className="w-5 h-5 text-grey-400 group-hover:text-brand-primary transition-colors"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M15 19l-7-7 7-7"
                                    />
                                  </svg>
                                </div>
                              </div>

                              {/* وضعیت، اولویت و دسته‌بندی */}
                              <div className="flex items-center gap-3 pr-2">
                                {/* وضعیت */}
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-grey-500">
                                    وضعیت:
                                  </span>
                                  <StatusBadge status={badgeStatus} />
                                </div>

                                {/* اولویت */}
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
                                      : ticket.category === "billing"
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
                        <svg
                          className="w-12 h-12 text-grey-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
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

      {/* Toast Notifications */}
      {/* <Toaster 
        position="top-center"
        richColors
        dir="rtl"
        toastOptions={{
          style: {
            fontFamily: 'Vazirmatn, sans-serif',
            direction: 'rtl',
            textAlign: 'right'
          }
        }}
      /> */}
    </div>
  );
}

// Create Ticket Component
function CreateTicketView({
  onSubmit,
}: {
  onSubmit: (ticket: Ticket) => void;
}) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "general" as "technical" | "billing" | "general",
    priority: "medium" as "low" | "medium" | "high",
  });

  const handleSubmit = async(e: React.FormEvent) => {

    //  setIsLoading(true);
    try {
      const response = await axiosInstance.post(API_ROUTES.TICKETS.CREATE, 
       formData 
       );
      const newTicket: Ticket = response.data.data;
      // setTickets((prev) => [...prev, newTicket]);
      // setSelectedTicketId(newTicket.id);
      // setView("view");
      toast.success("تیکت جدید با موفقیت ارسال شد");
    } catch (error) {
      toast.error("ارسال تیکت با مشکل مواجه شد");
    } finally {
      // setIsLoading(false);
    }



    // e.preventDefault();

    // if (!formData.title || !formData.content) {
    //   toast.error("لطفاً تمام فیلدهای الزامی را پر کنید");
    //   return;
    // }

    // const ticketNumber = String(Date.now()).slice(-3).padStart(3, "0");
    // const currentDate = new Date();
    // const persianDate = currentDate.toLocaleDateString("fa-IR");
    // const persianTime = currentDate.toLocaleTimeString("fa-IR", {
    //   hour: "2-digit",
    //   minute: "2-digit",
    // });

    // const newTicket: Ticket = {
    //   id: `TKT-2024-${ticketNumber}`,
    //   title: formData.title,
    //   content: formData.content,
    //   category: formData.category,
    //   priority: formData.priority,
    //   status: "open",
    //   createdAt: persianDate,
    //   updatedAt: `${persianDate} - ${persianTime}`,
    //   replies: [],
    // };

    // onSubmit(newTicket);
  };

  return (
    <section className="flex-1 overflow-y-auto bg-bg-shell">
      <div className="max-w-4xl mx-auto p-8">
        <Card className="p-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
            className="space-y-6"
          >
            <div className="space-y-4">
              {/* Title */}
              <Input
                label="عنوان تیکت"
                required
                placeholder="عنوان کوتاه و واضح از مشکل یا درخواست شما"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />

              {/* Description */}
              <div className="input-container">
                <label className="input-label">
                  توضیحات تکمیلی
                  <span className="input-required">*</span>
                </label>
                <textarea
                  className="input-base input-default input-medium min-h-[150px] resize-none"
                  placeholder="لطفاً مشکل یا درخواست خود را به طور کامل توضیح دهید..."
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  required
                />
              </div>

              {/* Category & Priority */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="input-container">
                  <label className="input-label">دسته‌بندی</label>
                  <select
                    className="input-base input-default input-medium"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as any,
                      })
                    }
                  >
                    <option value="general">عمومی</option>
                    <option value="technical">فنی</option>
                    <option value="billing">مالی</option>
                  </select>
                </div>

                <div className="input-container">
                  <label className="input-label">اولویت</label>
                  <select
                    className="input-base input-default input-medium"
                    value={formData.priority}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        priority: e.target.value as any,
                      })
                    }
                  >
                    <option value="low">پایین</option>
                    <option value="medium">متوسط</option>
                    <option value="high">بالا</option>
                    <option value="urgent">اورژانسی</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-4">
              <Button
                variant="primary"
                size="lg"
                title="ارسال تیکت"
                type="submit"
               
              >
                ارسال تیکت
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
}

// View Ticket Detail Component
function ViewTicketDetail({
  ticket,
  onClose,
}: {
  ticket: Ticket;
  onClose: () => void;
}) {
  const [replyText, setReplyText] = useState("");

  const getStatusConfig = (status: string) => {
    const configs = {
      open: {
        bg: "bg-danger/10",
        text: "text-danger",
        border: "border-danger/20",
        label: "باز",
        icon: (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
          </svg>
        ),
      },
      pending: {
        bg: "bg-warning/10",
        text: "text-warning",
        border: "border-warning/20",
        label: "در انتظار",
        icon: (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93z" />
          </svg>
        ),
      },
      closed: {
        bg: "bg-success/10",
        text: "text-success",
        border: "border-success/20",
        label: "بسته شده",
        icon: (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        ),
      },
    };
    return configs[status as keyof typeof configs];
  };

  const getPriorityConfig = (priority: string) => {
    const configs = {
      low: {
        bg: "bg-grey-100",
        text: "text-grey-600",
        border: "border-grey-200",
        label: "پایین",
        icon: "⬇️",
      },
      medium: {
        bg: "bg-warning/10",
        text: "text-warning",
        border: "border-warning/20",
        label: "متوسط",
        icon: "➡️",
      },
      high: {
        bg: "bg-danger/10",
        text: "text-danger",
        border: "border-danger/20",
        label: "بالا",
        icon: "⬆️",
      },
    };
    return configs[priority as keyof typeof configs];
  };

  const statusConfig = getStatusConfig(ticket.status);
  const priorityConfig = getPriorityConfig(ticket.priority);

  const handleSendReply = () => {
    if (!replyText.trim()) return;

    toast.success("پاسخ شما ارسال شد");
    setReplyText("");
  };

  return (
    <section className="flex-1 overflow-y-auto bg-bg-shell">
      <div className="max-w-5xl mx-auto p-8">
        <div className="space-y-6">
          {/* Ticket Header Card */}
          <Card className="p-8">
            <div className="space-y-6">
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="px-4 py-2 bg-brand-primary/10 rounded-lg">
                      <span className="text-brand-primary font-mono">
                        {ticket.id}
                      </span>
                    </div>
                    <h2 className="text-grey-900">{ticket.title}</h2>
                    <StatusBadge
                      status={
                        ticket.status === "open"
                          ? "error"
                          : ticket.status === "pending"
                          ? "pending"
                          : "success"
                      }
                      className="mr-auto"
                    />
                  </div>
                  <p className="text-grey-600 text-right leading-relaxed">
                    {ticket.content}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-6 pt-4 border-t border-border-soft text-sm text-grey-600">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>آخرین بروزرسانی: {ticket.updatedAt}</span>
                </div>

                <div className="flex items-center gap-4">
                  {/* اولویت */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-grey-500">اولویت:</span>
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
                    <span className="text-xs text-grey-500">دسته‌بندی:</span>
                    <span className="px-3 py-1 rounded-lg text-xs bg-grey-100 text-grey-700">
                      {ticket.category === "technical"
                        ? "فنی"
                        : ticket.category === "billing"
                        ? "مالی"
                        : "عمومی"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Conversation Thread */}
          <Card className="p-6">
            <h3 className="text-grey-900 mb-4 text-right">تاریخچه مکالمات</h3>
            {ticket.replies && ticket.replies.length > 0 ? (
              <div className="space-y-4">
                {ticket.replies.map((reply) => (
                  <div
                    key={reply.id}
                    className={`p-4 rounded-xl ${
                      reply.role === "user"
                        ? "bg-brand-primary/5 border border-brand-primary/10"
                        : "bg-grey-50 border border-grey-200"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            reply.role === "user"
                              ? "bg-brand-primary text-white"
                              : "bg-grey-300 text-grey-700"
                          }`}
                        >
                          {reply.author.charAt(0)}
                        </div>
                        <span className="font-medium text-grey-900">
                          {reply.author}
                        </span>
                      </div>
                      <span className="text-xs text-grey-500">
                        {reply.timestamp}
                      </span>
                    </div>
                    <p className="text-grey-700 text-right leading-relaxed mr-10">
                      {reply.message}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-grey-500">
                <svg
                  className="w-12 h-12 mx-auto mb-3 text-grey-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <p>هنوز پاسخی ثبت نشده است</p>
              </div>
            )}
          </Card>

          {/* Reply Form */}
          <Card className="p-6">
            <h3 className="text-grey-900 mb-4 text-right">پاسخ جدید</h3>
            <div className="space-y-4">
              <textarea
                className="input-base input-default input-medium min-h-[120px] resize-none w-full"
                placeholder="پاسخ خود را بنویسید..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <Button
                variant="primary"
                size="md"
                title="ارسال پاسخ"
                onClick={handleSendReply}
              >
                ارسال پاسخ
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
