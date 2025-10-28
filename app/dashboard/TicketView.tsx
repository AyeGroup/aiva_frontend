"use client";

import React from "react";
 
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Ticket } from "@/types/common";

interface Props {
  ticket: Ticket;
  onBack: () => void;
}

export function TicketView({ ticket, onBack }: Props) {
  return (
    <div className="space-y-4">
      <Button variant="secondary" onClick={onBack}>
        ← بازگشت
      </Button>

      <Card className="p-6">
        <h2 className="text-xl font-bold mb-2">{ticket.title}</h2>
        <p className="mb-2">{ticket.description}</p>
        <p className="text-sm text-gray-500">دسته‌بندی: {ticket.category}</p>
        <p className="text-sm text-gray-500">اولویت: {ticket.priority}</p>
        <p className="text-sm text-gray-500">وضعیت: {ticket.status}</p>
        <p className="text-xs text-gray-400">ایجاد شده: {ticket.createdAt}</p>
        <p className="text-xs text-gray-400">
          آخرین بروزرسانی: {ticket.updatedAt}
        </p>
      </Card>
    </div>
  );
}
