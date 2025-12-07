import { PricingProvider } from "@/providers/PricingContext";

// app/(protected)/layout.tsx
export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PricingProvider>{children}</PricingProvider>;
}
