"use client";

import React, { useState } from "react";
import { Card } from "@/components/card";
import { toast } from "sonner";
import { Button } from "@/components/button";
import { Ticket } from "@/types/common";
import { StatusBadge } from "./status-badge";
import { TicketPend, User } from "@/public/icons/AppIcons";
import axiosInstance from "@/lib/axiosInstance";
import { API_ROUTES } from "@/constants/apiRoutes";
import PageLoader from "@/components/pageLoader";
import { getCategoryLabel } from "@/constants/common";

interface Props {
  ticket: Ticket;
  onClose: () => void;
}

export function ViewTicketDetail({ ticket, onClose }: Props) {
  const [replyText, setReplyText] = useState("");
  const [thisTicket, setThisTicket] = useState<Ticket>(ticket);

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

  const statusConfig = getStatusConfig(thisTicket.status);
  const priorityConfig = getPriorityConfig(thisTicket.priority);
  const [isLoading, setIsLoading] = useState(false);

  const loadTicket = async () => {
    setIsLoading(true);

    try {
      const response = await axiosInstance.get(API_ROUTES.TICKETS.GET(thisTicket.id));
      setThisTicket(response.data.data);
      console.log("ticket list: ", response.data.data);
    } catch (apiError: any) {
      console.warn("API fetch failed, using local data:", apiError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendReply = async () => {
    if (!replyText.trim()) return;

    setIsLoading(true);
    try {
      const response = await axiosInstance.post(
        API_ROUTES.TICKETS.ADD_MESSAGE(thisTicket.id),
        { content: replyText }
      );
      // const newTicket: Ticket = response.data.data;
      await loadTicket();
      toast.success("پاسخ شما ارسال شد");
      setReplyText("");
    } catch (error) {
      toast.error("ارسال تیکت با مشکل مواجه شد");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex-1 overflow-y-auto bg-bg-shell">
      <div className="max-w-5xl mx-auto p-8">
        {isLoading && <PageLoader />}
        <div className="space-y-6">
          {/* Ticket Header Card */}
          <Card className="p-8">
            <div className="space-y-6">
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="px-4 py-2 bg-brand-primary/10 rounded-lg">
                      <span className="text-brand-primary font-mono">
                        {thisTicket.id}
                      </span>
                    </div>
                    <h2 className="text-grey-900">{thisTicket.title}</h2>
                    <StatusBadge
                      status={
                        thisTicket.status === "open"
                          ? "error"
                          : thisTicket.status === "in_progress"
                          ? "pending"
                          : "success"
                      }
                      className="mr-auto"
                    />
                  </div>
                  <p className="text-grey-600 text-right leading-relaxed">
                    {thisTicket.messages &&
                      thisTicket.messages.length > 0 &&
                      thisTicket.messages[0].content}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-6 pt-4 border-t border-border-soft text-sm text-grey-600">
                <div className="flex items-center gap-2">
                  {/* <svg
                    className=""
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
                  </svg> */}
                  <div className="w-4 h-4">
                    <TicketPend />
                  </div>
                  <span>
                    آخرین بروزرسانی:{" "}
                    {(() => {
                      const date = new Date(thisTicket.updated_at);
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
                    })()}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  {/* اولویت */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-grey-500">اولویت:</span>
                    <span
                      className={`px-3 py-1 rounded-lg text-xs ${
                        thisTicket.priority === "urgent"
                          ? "bg-red-100 text-red-700"
                          : thisTicket.priority === "high"
                          ? "bg-orange-100 text-orange-700"
                          : thisTicket.priority === "medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {thisTicket.priority === "urgent"
                        ? "اورژانسی"
                        : thisTicket.priority === "high"
                        ? "بالا"
                        : thisTicket.priority === "medium"
                        ? "متوسط"
                        : "پایین"}
                    </span>
                  </div>

                  {/* دسته‌بندی */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-grey-500">دسته‌بندی:</span>

                    <span className="px-3 py-1 rounded-lg text-xs bg-grey-100 text-grey-700">
                      {getCategoryLabel(thisTicket.category)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Conversation Thread */}
          <Card className="p-6">
            <h3 className="text-grey-900 mb-4 text-right">تاریخچه مکالمات</h3>
            {thisTicket.messages && thisTicket.messages.length > 0 ? (
              <div className="space-y-4">
                {thisTicket.messages.slice(1).map((reply) => (
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
                          {/* {reply?.author?.charAt(0)} */}
                          <div className="w-4 h-4">
                            <User />
                          </div>
                        </div>
                        <span className="font-medium text-grey-900">
                          {/* {reply?.author} */}
                          {reply.role === "user" ? "شما" : "تیم پشتیبانی"}
                        </span>
                      </div>
                      <span className="text-xs text-grey-500">
                        {(() => {
                          const date = new Date(reply.created_at);
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
                        })()}
                      </span>
                    </div>
                    <p className="text-grey-700 text-right leading-relaxed mr-10">
                      {reply.content}
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
              <div className="text-left">
                <Button
                  variant="primary"
                  size="md"
                  title="ارسال پاسخ"
                  onClick={handleSendReply}
                >
                  ارسال پاسخ
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
