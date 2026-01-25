"use client";

import React, { useState } from "react";
import { Eye } from "lucide-react";

import { Card } from "@/components/card";
import { Back } from "@/public/icons/AppIcons";
import { Ticket } from "@/types/common";
import { formatDateTime } from "@/utils/common";
import { StatusBadge } from "@/app/dashboard/widgets/status-badge";
import {
  getCategoryLabel,
  getPriorityLabel,
  getPriorityStyles,
} from "@/constants/common";
import { ProfileModal } from "../users/ProfileModal";


interface TicketCardProps {
  ticket: Ticket;
  onBackClick?: () => void;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket, onBackClick }) => {
  const [openProfile, setOpenProfile] = useState(false);

  return (
    <Card className="p-4 hover:shadow-hover border border-border-soft transition">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex justify-between items-center gap-4">
          <div className="px-3 py-1 bg-brand-primary/10 rounded-lg">
            <span className="text-brand-primary font-mono text-xs">
              {ticket.id}
            </span>
          </div>

          <h3 className="flex-1 text-grey-900">{ticket.title}</h3>

          <span className="text-sm text-grey-500">
            {formatDateTime(ticket.updated_at)}
          </span>

          {onBackClick && (
            <div
              className="cursor-pointer text-primary w-6"
              onClick={onBackClick}
            >
              <Back />
            </div>
          )}
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center gap-2">
            وضعیت:
            <StatusBadge status={ticket.status} />
          </div>

          <div className="flex items-center gap-2">
            اولویت:
            <span
              className={`px-2 py-1 rounded ${getPriorityStyles(
                ticket.priority,
              )}`}
            >
              {getPriorityLabel(ticket.priority)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            دسته:
            <span className="bg-grey-100 px-2 py-1 rounded">
              {getCategoryLabel(ticket.category)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            کاربر:
            <span className="bg-grey-100 px-2 py-1 rounded">
              {ticket.user?.phone ?? "-"}
            </span>
            {ticket.user && (
              <Eye
                size={14}
                className="cursor-pointer text-primary"
                onClick={() => setOpenProfile(true)}
              />
            )}
          </div>
        </div>

        {/* Profile Modal */}
        {ticket.user && (
          <ProfileModal
            open={openProfile}
            data={ticket.user}
            onClose={() => setOpenProfile(false)}
          />
        )}
      </div>
    </Card>
  );
};

export default TicketCard;
