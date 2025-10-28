"use client";

import React from "react";
 
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Ticket } from "@/types/common";

interface Props {
  tickets: Ticket[];
  selectedTicketId: string | null;
  onSelect: (id: string) => void;
  onCreate: () => void;
}

export function TicketList({
  tickets,
  selectedTicketId,
  onSelect,
  onCreate,
}: Props) {
  return (
    <div className="w-full md:w-80 flex flex-col gap-4">
      <Button variant="secondary" onClick={onCreate}>
        + ایجاد تیکت جدید
      </Button>
      <div className="flex flex-col gap-2 overflow-y-auto max-h-[600px]">
        {tickets.map((ticket) => (
          <Card
            key={ticket.id}
            className={`p-4 cursor-pointer ${
              ticket.id === selectedTicketId
                ? "border-2 border-brand-primary"
                : ""
            }`}
            onClick={() => onSelect(ticket.id)}
          >
            <h4 className="font-bold">{ticket.title}</h4>
            <p className="text-sm text-gray-500 truncate">
              {ticket.description}
            </p>
            <p className="text-xs text-gray-400">اولویت: {ticket.priority}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
