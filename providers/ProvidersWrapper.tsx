"use client";

import { BotProvider } from "@/providers/BotProvider";
import { PricingProvider } from "@/providers/PricingContext";
import { useAuth } from "@/providers/AuthProvider";

export default function ProvidersWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();

  if (loading) return children;

  // اگر ادمین است → Bot و Pricing نیاز نیست
  if (user?.role === "admin") {
    return <>{children}</>;
  }

  // کاربران عادی
  return (
    <BotProvider>
      <PricingProvider>{children}</PricingProvider>
    </BotProvider>
  );
}
