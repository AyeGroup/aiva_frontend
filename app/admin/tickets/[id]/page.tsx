"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import { API_ROUTES } from "@/constants/apiRoutes";
import { Ticket } from "@/types/common";
import PageLoader from "@/components/pageLoader";
import { ViewTicketDetail } from "../TicketView";
import { Back } from "@/public/icons/AppIcons";

export default function TicketDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const loadTicket = async () => {
      try {
        // const res = await axiosInstance.patch(API_ROUTES.ADMIN.TICKET(id));
        
        const payload = {
          ticket_id: id,
        };

        const res = await axiosInstance.patch(
          API_ROUTES.ADMIN.TICKET(id),
          payload
        );

        setTicket(res.data.data);
      } finally {
        setLoading(false);
      }
    };

    loadTicket();
  }, [id]);

  if (loading) return <PageLoader />;

  if (!ticket) return null;

  return (
    <div className="w-full">
      <header className="px-6 py-6 border-b flex items-center gap-4">
        <button
          onClick={() => router.push("/admin/tickets")}
          className="flex items-center gap-2 text-grey-700"
        >
          <Back />
          بازگشت
        </button>
      </header>

      <ViewTicketDetail
        ticket={ticket}
        onClose={() => router.push("/admin/tickets")}
      />
    </div>
  );
}
