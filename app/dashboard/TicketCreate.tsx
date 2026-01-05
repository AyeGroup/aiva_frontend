"use client";

import React, { useState } from "react";
import PageLoader from "@/components/pageLoader";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "sonner";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { API_ROUTES } from "@/constants/apiRoutes";
import { GenericSelector } from "@/components/selector";
import { getCategoryLabel, getPriorityLabel } from "@/constants/common";
import {
  SelectorItem,
  Ticket,
  TicketCategory,
  TicketPriority,
} from "@/types/common";

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
  const CATEGORY_ITEMS: SelectorItem[] = [
    { value: "general", label: getCategoryLabel("general") },
    { value: "technical", label: getCategoryLabel("technical") },
    { value: "financial", label: getCategoryLabel("financial") },
    { value: "others", label: getCategoryLabel("others") },
  ];
  const PRIORITY_ITEMS: SelectorItem[] = [
    { value: "urgent", label: getPriorityLabel("urgent") },
    { value: "high", label: getPriorityLabel("high") },
    { value: "medium", label: getPriorityLabel("medium") },
    { value: "low", label: getPriorityLabel("low") },
  ];
  const [errors, setErrors] = useState<{
    title?: string;
    content?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};

    if (!formData.title.trim()) {
      newErrors.title = "عنوان تیکت الزامی است";
    }

    if (!formData.content.trim()) {
      newErrors.content = "توضیحات تیکت الزامی است";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const response = await axiosInstance.post(
        API_ROUTES.TICKETS.CREATE,
        formData
      );

      const newTicket: Ticket = response.data.data;
      toast.success("تیکت جدید با موفقیت ارسال شد");
      onSubmit(newTicket);
    } catch (error: any) {
      const backendMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "ارسال تیکت با مشکل مواجه شد";

      toast.error(backendMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex-1  bg-bg-shell">
      {isLoading && <PageLoader />}
      <div className="max-w-4xl mx-auto p-8">
        <div
          className="animate-soft border shadow-low rounded-2xl p-8 lg:p-4shadow-low 
        bg-bg-surface border-border-soft card-hover "
        >
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
                placeholder="عنوان کوتاه و واضح از مشکل یا درخواست شما"
                value={formData.title}
                maxLength={64}
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value });
                  if (errors.title) {
                    setErrors({ ...errors, title: undefined });
                  }
                }}
                className={
                  errors.title ? "border-red-500! focus:border-red-500" : ""
                }
              />

              {errors.title && (
                <p className="text-xs text-red-500 mr-2">{errors.title}</p>
              )}

              {/* Description */}
              <div className="input-container">
                <label className="input-label">
                  توضیحات تکمیلی
                  <span className="input-required">*</span>
                </label>

                <textarea
                  
                  className={`input-base input-default input-medium h-[150px] resize-none overflow-y-auto ${
                    errors.content ? "border-red-500! focus:border-red-500" : ""
                  }`}
                  placeholder="لطفاً مشکل یا درخواست خود را به طور کامل توضیح دهید..."
                  value={formData.content}
                  maxLength={1000}
                  onChange={(e) => {
                    setFormData({ ...formData, content: e.target.value });
                    if (errors.content) {
                      setErrors({ ...errors, content: undefined });
                    }
                  }}
                />
                <div className="mt-1 flex justify-between text-xs">
                  <span
                    className={`${
                      formData.content.length === 1000
                        ? "text-red-500"
                        : "text-gray-400"
                    }`}
                  >
                    {formData.content.length === 1000 &&
                      "حداکثر تعداد کاراکتر مجاز ۱۰۰۰ کاراکتر است"}
                  </span>

                  <span className="text-gray-400">
                    {formData.content.length} / 1000
                  </span>
                </div>
                {errors.content && (
                  <p className="text-xs text-red-500 mr-2">{errors.content}</p>
                )}
              </div>

              {/* Category & Priority */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* <div className="input-container overflow-visible"> */}
                <div className=" flex items-center gap-2">
                  <label className="input-label">دسته‌بندی</label>

                  <GenericSelector
                    items={CATEGORY_ITEMS}
                    selectedValue={formData.category}
                    disabled={false}
                    onSelect={(value) =>
                      setFormData({
                        ...formData,
                        category: value as TicketCategory,
                      })
                    }
                    showIndicator={true}
                  />
                </div>

                <div className=" flex items-center gap-2">
                  <label className="input-label">اولویت</label>
                  <GenericSelector
                    items={PRIORITY_ITEMS}
                    selectedValue={formData.priority}
                    disabled={false}
                    onSelect={(value) =>
                      setFormData({
                        ...formData,
                        priority: value as TicketPriority,
                      })
                    }
                    showIndicator={true}
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-center gap-3 pt-4">
              <Button
                variant="primary"
                size="lg"
                title="ارسال تیکت"
                type="submit"
                className="cursor-pointer"
              >
                ارسال تیکت
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
