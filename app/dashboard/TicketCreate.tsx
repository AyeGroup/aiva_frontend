"use client";

import React, { useState } from "react";
import { Input } from "@/components/input";
import { Card } from "@/components/card";
import { Button } from "@/components/button";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";
import { API_ROUTES } from "@/constants/apiRoutes";
import { Ticket, TicketCategory, TicketPriority } from "@/types/common";



interface Props {
  onSubmit: (ticket: Ticket) => void;
}

export function CreateTicketForm({ onSubmit }: Props) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "general" as TicketCategory,
    priority: "medium" as TicketPriority,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      toast.error("لطفاً تمام فیلدهای الزامی را پر کنید");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axiosInstance.post(API_ROUTES.TICKETS.CREATE, {
        ...formData,
        status: "open",
      });
      onSubmit(response.data.data);
      setFormData({
        title: "",
        description: "",
        category: "general",
        priority: "medium",
      });
      toast.success("تیکت جدید با موفقیت ایجاد شد");
    } catch (err) {
      console.error(err);
      toast.error("ارسال تیکت با مشکل مواجه شد");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          label="عنوان"
          value={formData.title}
          required
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <div>
          <label className="block mb-1 font-medium">توضیحات</label>
          <textarea
            className="w-full p-2 border rounded-md min-h-[100px]"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">دسته‌بندی</label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value as TicketCategory,
                })
              }
              className="w-full p-2 border rounded-md"
            >
              <option value="general">عمومی</option>
              <option value="technical">فنی</option>
              <option value="billing">مالی</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">اولویت</label>
            <select
              value={formData.priority}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  priority: e.target.value as TicketPriority,
                })
              }
              className="w-full p-2 border rounded-md"
            >
              <option value="low">کم</option>
              <option value="medium">متوسط</option>
              <option value="high">زیاد</option>
              <option value="urgent">فوری</option>
            </select>
          </div>
        </div>
        <Button type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? "در حال ارسال..." : "ارسال تیکت"}
        </Button>
      </form>
    </Card>
  );
}
