"use client";
import { useEffect } from "react";
import AppShell from "@/components/shell/AppShell";
import NProgress from "nprogress";

export default function Page() {
  useEffect(() => {
    // Start progress when page starts loading
    NProgress.start();

    // Complete after component mounts
    const timer = setTimeout(() => {
      NProgress.done();
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return <AppShell page="landing" />;
}

// "use client";

// import React, { Suspense, lazy } from "react";
// import { useRouter } from "next/navigation";
// import { Header } from "@/components/header/header";
// import { PageType } from "@/types/common";

// const LandingPage = lazy(() => import("@/app/landing/page"));
// const OnboardingWizard = lazy(() => import("@/app/onboarding/page"));
// const Dashboard = lazy(() => import("@/app/dashboard/page"));
// const ChatbotManagement = lazy(
//   () => import("@/app/dashboard/chatbot-management")
// );
// const Tickets = lazy(() => import("@/app/dashboard/tickets"));
// const Login = lazy(() => import("@/app/auth/login/page"));
// const OTPVerification = lazy(() => import("@/app/auth/verification/page"));
// const ChatHistoryDemo = lazy(
//   () => import("@/app/onboarding/demo/chat-history-demo")
// );

// // Loader برای صفحات lazy
// const PageLoader = () => (
//   <div className="min-h-screen flex items-center justify-center">
//     <div className="space-y-4">
//       <div className="h-8 bg-gray-200 rounded w-48 mx-auto"></div>
//       <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
//       <div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full mx-auto animate-spin"></div>
//     </div>
//   </div>
// );

// interface AppShellProps {
//   page: PageType;
// }

// export default function AppShell({ page }: AppShellProps) {
//   const router = useRouter();

//   const renderPage = () => {
//     switch (page) {
//       case "landing":
//         return <LandingPage />;
//       case "register":
//         return <OnboardingWizard />;
//       case "dashboard":
//         return <Dashboard />;
//       // case "chatbot-management":
//       //   return <ChatbotManagement />;
//       case "tickets":
//         return <Tickets />;
//       case "login":
//         return <Login />;
//       case "otp-verification":
//         return <OTPVerification />;
//       case "demo":
//         return <ChatHistoryDemo />;
//       default:
//         return <LandingPage />;
//     }
//   };

//   // Header فقط در صفحات مشخص نمایش داده شود
//   const showHeader = ![
//     "dashboard",
//     "onboarding",
//     // "chatbot-management",
//     // "tickets",
//     // "otp-verification",
//     // "register",
//   ].includes(page);

//   return (
//     <div className="app-shell" dir="rtl">
//       {showHeader && <Header currentPage={page} />}
//       <Suspense fallback={<PageLoader />}>{renderPage()}</Suspense>
//     </div>
//   );
// }
