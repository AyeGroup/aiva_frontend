"use client";

import React, { useEffect, useState, useCallback } from "react";
import PageLoader from "@/components/pageLoader";
import axiosInstance from "@/lib/axiosInstance";
import TableTicket from "./tableTicket";
import TicketCard from "./TicketCard";
import { useAuth } from "@/providers/AuthProvider";
import { API_ROUTES } from "@/constants/apiRoutes";
import { Ticket } from "@/types/common";
import { convertNumbersToPersian } from "@/utils/common";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Plus, Refresh } from "@/public/icons/AppIcons";
import { GenericSelector } from "@/components/selector";
import {
  CATEGORY_OPTIONS,
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
} from "@/constants/common";

export default function AdminTickets() {
  const { loading } = useAuth();
  const router = useRouter();
  // const params = useParams();

  // const userId = params?.id as string | undefined;
const searchParams = useSearchParams();
const userId = searchParams.get("id") ?? undefined;


  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<string>("all");
  const [priority, setPriority] = useState<string>("all");
  const [category, setCategory] = useState<string>("all");

  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);

  const loadTickets = useCallback(
    async (pageNumber: number = 1) => {
      setIsLoading(true);
      try {
        console.log("userid",userId)
        const response = await axiosInstance.get(API_ROUTES.ADMIN.TICKETS, {
          params: {
            page: pageNumber,
            limit,
            ...(userId && { user_id: userId }),
            ...(status !== "all" && { status }),
            ...(priority !== "all" && { priority }),
            ...(category !== "all" && { category }),
          },
        });

        const data = response.data.data;

        setTickets(data.items);

        setPage(data.page);
        setTotalItems(data.total_items);
        setTotalPages(data.total_pages);
        setHasNext(data.has_next);
        setHasPrev(data.has_prev);
      } catch (error) {
        console.error("Load tickets failed:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [userId, limit, status, priority, category],
  );

  useEffect(() => {
    if (!loading) {
      loadTickets(1);
    }
  }, [loading, status, priority, category]);

  const handleNextPage = () => {
    if (hasNext) {
      loadTickets(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (hasPrev) {
      loadTickets(page - 1);
    }
  };

  const handleSetPage = (p: number) => {
    if (p !== page) {
      loadTickets(p);
    }
  };

    const handleRefresh = () => {
      setPage(1);
      loadTickets(1);
      setPriority("all");
      setStatus("all");
      setCategory("all");
    };

  return (
    <div className="h-screen overflow-y-auto w-full">
      {(isLoading || loading) && <PageLoader />}

      <header className="bg-bg-surface border-b px-6 py-6 flex justify-between">
        <h1 className="text-2xl font-bold">
          {userId ? "تیکت‌های کاربر" : "مدیریت تیکت‌ها"}
        </h1>

        <button
          type="button"
          className="bg-brand-primary text-white px-3 py-2 lg:px-6 lg:py-3 rounded-xl hover:bg-brand-primary/90 font-medium flex items-center gap-2"
          title="ایجاد تیکت جدید"
          onClick={() => router.push("/admin/tickets/create")}
        >
          <div className="text-white w-4 h-4">
            <Plus />
          </div>
          تیکت جدید
        </button>
      </header>

      <main className="p-6 ">
        <div className="bg-white rounded-xl border border-grey-100 shadow-card w-full p-4">
          <div className="flex justify-between gap-4 items-center border-b border-primary/50 p-2  pb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                وضعیت
                <GenericSelector
                  items={STATUS_OPTIONS}
                  selectedValue={status}
                  onSelect={(value) => {
                    setPage(1);
                    setStatus(value);
                  }}
                  showIndicator
                  className="border border-primary rounded-xl "
                />
              </div>
              <div className="flex items-center gap-1">
                اولویت
                <GenericSelector
                  items={PRIORITY_OPTIONS}
                  selectedValue={priority}
                  onSelect={(value) => {
                    setPage(1);
                    setPriority(value);
                  }}
                  showIndicator
                  className="border border-primary rounded-xl bg-white"
                />
              </div>
              <div className="flex items-center gap-1">
                دسته
                <GenericSelector
                  items={CATEGORY_OPTIONS}
                  selectedValue={category}
                  onSelect={(value) => {
                    setPage(1);
                    setCategory(value);
                  }}
                  showIndicator
                  className="border border-primary rounded-xl bg-white"
                />
              </div>
            </div>

            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="mr-3"
            >
              <div className="w-6 text-primary">
                <Refresh />
              </div>
            </button>
          </div>

          <div className="space-y-4 lg:hidden  mt-4">
            {tickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                onBackClick={() => router.push(`/admin/tickets/${ticket.id}`)}
              />
            ))}
          </div>
          <div className="hidden lg:block mt-4">
            <TableTicket data={tickets} />
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center mt-6 px-3 py-4 gap-6">
              {/* Prev */}
              <button
                onClick={handlePrevPage}
                disabled={!hasPrev || isLoading}
                className={`text-secondary text-sm flex items-center ${
                  !hasPrev ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <ChevronRight />
                قبلی
              </button>

              {/* Pages */}
              <div className="flex items-center gap-3">
                {Array.from({ length: totalPages }, (_, index) => {
                  const p = index + 1;
                  return (
                    <button
                      key={p}
                      onClick={() => handleSetPage(p)}
                      className={`px-3 py-1 text-sm rounded-full border ${
                        page === p ? "border-primary" : "border-transparent"
                      }`}
                    >
                      {convertNumbersToPersian(p)}
                    </button>
                  );
                })}
              </div>

              {/* Next */}
              <button
                onClick={handleNextPage}
                disabled={!hasNext || isLoading}
                className={`text-secondary text-sm flex items-center ${
                  !hasNext ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                بعدی
                <ChevronLeft />
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
