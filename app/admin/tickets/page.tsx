"use client";

import React, { useEffect, useState, useCallback } from "react";
import PageLoader from "@/components/pageLoader";
import axiosInstance from "@/lib/axiosInstance";
import TableTicket from "./tableTicket";
import { useAuth } from "@/providers/AuthProvider";
import { API_ROUTES } from "@/constants/apiRoutes";
import { Ticket } from "@/types/common";
import { convertNumbersToPersian } from "@/utils/common";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { Refresh } from "@/public/icons/AppIcons";
import { GenericSelector } from "@/components/selector";
import {
  CATEGORY_OPTIONS,
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
} from "@/constants/common";
import { ProfileModal } from "../users/ProfileModal";
import { Button } from "@/components/button";

export default function AdminTickets() {
  const { loading } = useAuth();

  const searchParams = useSearchParams();
  const userId = searchParams.get("id") ?? undefined;

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // filters
  const [status, setStatus] = useState<string>("all");
  const [priority, setPriority] = useState<string>("all");
  const [category, setCategory] = useState<string>("all");

  // pagination
  const [page, setPage] = useState(1);
  const [limit] = useState(3);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);

  const [openProfile, setOpenProfile] = useState(false);
  const [profileId, setProfileId] = useState<number>();

  const loadTickets = useCallback(
    async (pageNumber: number = 1) => {
      setIsLoading(true);
      try {
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
  }, [loading]);

  // pagination handlers
  const handleNextPage = () => {
    if (hasNext) loadTickets(page + 1);
  };

  const handlePrevPage = () => {
    if (hasPrev) loadTickets(page - 1);
  };

  const handleSetPage = (p: number) => {
    if (p !== page) loadTickets(p);
  };

  // ✅ فقط با دکمه جستجو
  const handleSearch = () => {
    setPage(1);
    loadTickets(1);
  };

  const handleRefresh = () => {
    setStatus("all");
    setPriority("all");
    setCategory("all");
    setPage(1);
    loadTickets(1);
  };

  return (
    <div className="h-screen overflow-y-auto w-full">
      {(isLoading || loading) && <PageLoader />}

      <header className="bg-bg-surface border-b px-6 py-6 flex justify-between">
        {userId ? (
          <div className="flex flex-col">
            <div className="font-medium ">تیکت‌های کاربر</div>
            <div className="flex items-center gap-2 mt-2 text-sm">
              <div className="font-medium ">کد:</div>

              {userId}
              <button
                className="flex items-center cursor-pointer text-primary font-medium gap-2 border border-primary rounded-2xl px-4 py-1"
                onClick={() => {
                  setOpenProfile(true);
                  setProfileId(userId ? Number(userId) : undefined);
                }}
              >
                مشاهده پروفایل
                <Eye size={14} />
              </button>
            </div>
          </div>
        ) : (
          <h1 className="text-grey-900 mb-0 mr-1 lg:mr-10 text-2xl lg:text-3xl font-bold">
            مدیریت تیکت‌ها
          </h1>
        )}

        {/* <button
          type="button"
          className="bg-brand-primary text-white px-3 py-2 lg:px-6 lg:py-3 rounded-xl hover:bg-brand-primary/90 font-medium flex items-center gap-2"
          title="ایجاد تیکت جدید"
          onClick={() => router.push("/admin/tickets/create")}
        >
          <div className="text-white w-4 h-4">
            <Plus />
          </div>
          تیکت جدید
        </button> */}
      </header>

      <main className="p-6 ">
        <div className="flex justify-between gap-4 items-center p-2  pb-4">
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
                className="border border-primary rounded-xl bg-white "
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

          <div className="flex items-center">
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? "در حال جستجو..." : "جستجو"}
            </Button>
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
          {/* <button onClick={handleRefresh} disabled={isLoading} className="mr-3">
            <div className="w-6 text-primary">
              <Refresh />
            </div>
          </button> */}
        </div>
        <div className="bg-white rounded-xl border border-grey-100 shadow-card w-full p-4">
          {/* <div className="space-y-4 lg:hidden  mt-4">
            {tickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                onBackClick={() => router.push(`/admin/tickets/${ticket.id}`)}
              />
            ))}
          </div> */}
          <div className=" mt-4">
            <TableTicket data={tickets} showUserCol={userId ? false : true} />
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
      {profileId && (
        <ProfileModal
          open={openProfile}
          id={profileId}
          data={null}
          onClose={() => setOpenProfile(false)}
        />
      )}
    </div>
  );
}
