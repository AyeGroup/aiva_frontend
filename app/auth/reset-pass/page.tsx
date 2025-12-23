"use client";

import { useSearchParams } from "next/navigation";
import ResetPassClient from "./ResetPassClient";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token")||"test";

  if (!token) {
    return <div className="text-center text-red-500">لینک نامعتبر است</div>;
  }

  return <ResetPassClient token={token} />;
}
