"use client";
import { redirect } from "next/navigation";
import CreateTicketForm from "../CreateTicketForm";

export default function CreateTicketPage() {
  return (
    <CreateTicketForm
      onSubmit={() => {
        redirect("/admin/tickets");
      }}
    />
  );
}
