"use client";

import React, { useEffect, useState } from "react";
// import { CreateTicketForm, Ticket } from "./CreateTicketForm";
// import { TicketList } from "./TicketList";
// import { TicketView } from "./TicketView";
import axiosInstance from "@/lib/axiosInstance";
import { API_ROUTES } from "@/constants/apiRoutes";
import { toast } from "sonner";
import { Ticket } from "@/types/common";
import { TicketList } from "../TicketList";
import { CreateTicketForm } from "../TicketCreate";
import { TicketView } from "../TicketView";

export function Tickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [view, setView] = useState<"list" | "create" | "view">("list");

  const selectedTicket = tickets.find((t) => t.id === selectedTicketId) || null;

  const fetchTickets = async () => {
    try {
      const response = await axiosInstance.get(API_ROUTES.TICKETS.LIST);
      setTickets(response.data.data);
    } catch (err) {
      console.error("خطا در دریافت تیکت‌ها:", err);
      toast.error("دریافت تیکت‌ها با مشکل مواجه شد");
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* لیست تیکت‌ها */}
      <TicketList
        tickets={tickets}
        selectedTicketId={selectedTicketId}
        onSelect={(id) => {
          setSelectedTicketId(id);
          setView("view");
        }}
        onCreate={() => setView("create")}
      />

      {/* بخش محتوا */}
      <div className="flex-1">
        {view === "create" && (
          <CreateTicketForm
            onSubmit={(newTicket) => {
              setTickets([newTicket, ...tickets]);
              setSelectedTicketId(newTicket.id);
              setView("view");
            }}
          />
        )}
        {view === "view" && selectedTicket && (
          <TicketView ticket={selectedTicket} onBack={() => setView("list")} />
        )}
      </div>
    </div>
  );
}
