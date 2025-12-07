"use client";

import React, { Suspense, lazy, useEffect } from "react";
import { Header } from "@/components/header/header";
import { PageType } from "@/types/common";

const LandingPage = lazy(() => import("@/app/landing/page"));
const OnboardingWizard = lazy(() => import("@/app/onboarding/page"));
const Dashboard = lazy(() => import("@/app/dashboard/page"));
const Checkout = lazy(() => import("@/app/pay/checkout/page"));
const Login = lazy(() => import("@/app/auth/login/page"));
const Register = lazy(() => import("@/app/auth/register/page"));
const OTPVerification = lazy(() => import("@/app/auth/verification/page"));

const PageLoader = () => {
 useEffect(() => {
   const handleChunkError = (event: any) => {
     if (event?.message?.includes("ChunkLoadError")) {
       console.warn("Chunk error → Refreshing page...");
       window.location.reload();
     }
   };

   window.addEventListener("error", handleChunkError);
   window.addEventListener("unhandledrejection", handleChunkError);

   return () => {
     window.removeEventListener("error", handleChunkError);
     window.removeEventListener("unhandledrejection", handleChunkError);
   };
 }, []);


 return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded w-48 mx-auto"></div>
        <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
        <div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full mx-auto animate-spin"></div>
      </div>
    </div>
  );
};

interface AppShellProps {
  page: PageType;
}

export default function AppShell({ page }: AppShellProps) {
  const renderPage = () => {
    switch (page) {
      case "landing":
        return <LandingPage />;
      case "onboarding":
        return <OnboardingWizard />;
      case "register":
        return <Register />;
      case "dashboard-home":
        return <Dashboard />;
      case "checkout":
        return <Checkout />;
      case "login":
        return <Login />;
      case "verification":
        return <OTPVerification />;

      default:
        return <LandingPage />;
    }
  };

  // const showHeader = ![
  //   "dashboard-home",
  //   "chatbot-management",
  //   "tickets",
  //   "login",
  //   "verification",
  //   "register",
  // ].includes(page);

  return (
    <div className="app-shell">
      {/* {showHeader && <Header currentPage={page} />} */}
      <Suspense fallback={<PageLoader />}>{renderPage()}</Suspense>
    </div>
  );
}
