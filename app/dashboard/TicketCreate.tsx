"use client";

import React, { useState } from "react";
import PageLoader from "@/components/pageLoader";
import axiosInstance from "@/lib/axiosInstance";
import { Card } from "@/components/card";
import { toast } from "sonner";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { API_ROUTES } from "@/constants/apiRoutes";
import { Ticket, TicketCategory, TicketPriority } from "@/types/common";

interface Props {
  onSubmit: (ticket: Ticket) => void;
}

export function CreateTicketView({ onSubmit }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "general" as TicketCategory,
    priority: "medium" as TicketPriority,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(
        API_ROUTES.TICKETS.CREATE,
        formData
      );
       const newTicket: Ticket = response.data.data;

       toast.success("تیکت جدید با موفقیت ارسال شد");
       onSubmit(newTicket); 

      // const newTicket: Ticket = response.data.data;
      // clear
      // setTickets((prev) => [...prev, newTicket]);
      // setSelectedTicketId(newTicket.id);
      // setView("view");
      // toast.success("تیکت جدید با موفقیت ارسال شد");
    } catch (error) {
      toast.error("ارسال تیکت با مشکل مواجه شد");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex-1 overflow-y-auto bg-bg-shell">
      {isLoading && <PageLoader />}
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
                        category: e.target.value as TicketCategory,
                      })
                    }
                  >
                    <option value="general">عمومی</option>
                    <option value="technical">فنی</option>
                    <option value="financial">مالی</option>
                    <option value="others">سایر</option>
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
                        priority: e.target.value as TicketPriority,
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
