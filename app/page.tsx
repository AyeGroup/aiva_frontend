"use client";

import React, {
  useState,
  useEffect,
  Suspense,
  lazy,
  useMemo,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { ErrorBoundary } from "@/components/error-boundary";
import { Header } from "@/components/header/header";
import { PageType } from "@/types/common";

// Lazy load components to improve initial bundle size
const LandingPage = lazy(() => import("@/app/landingPage/landing"));
const OnboardingWizard = lazy(() => import("@/app/onboarding/onboarding"));
const Dashboard = lazy(() => import("@/app/dashboard/dashboard"));
const ChatbotManagement = lazy(
  () => import("@/app/dashboard/chatbot-management")
);
const Tickets = lazy(() => import("@/app/dashboard/tickets"));
const Login = lazy(() => import("@/app/auth/login"));
const OTPVerification = lazy(() => import("@/app/auth/otp-verification"));
const Signup = lazy(() => import("@/app/auth/signup"));
const ChatHistoryDemo = lazy(() => import("@/app/demo/chat-history-demo"));

export default function App() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<PageType>("landing");

  const navigate = useCallback((page: PageType) => {
    try {
      setCurrentPage(page);
      const url = page === "landing" ? "/" : `/${page}`;
      window.history.pushState({}, "", url);
    } catch (error) {
      console.error("Navigation error:", error);
      setCurrentPage("landing");
      window.history.pushState({}, "", "/");
    }
  }, []);

  // const navigate = useCallback(
  //   (page: PageType) => {
  //     setCurrentPage(page);

  //     switch (page) {
  //       case "landing":
  //         router.push("/"); // باقی می‌ماند
  //         break;
  //       case "login":
  //         router.push("/auth/login"); // مسیر رسمی
  //         break;
  //       case "signup":
  //         router.push("/auth/signup"); // مسیر رسمی
  //         break;
  //       // ... بقیه صفحات مهم
  //       default:
  //         router.push("/");
  //     }
  //   },
  //   [router]
  // );

  const appContext = useMemo(
    () => ({
      navigate,
      currentPage,
    }),
    [navigate, currentPage]
  );

  useEffect(() => {
    const handlePopState = () => {
      try {
        const path = window.location.pathname;
        if (path === "/") setCurrentPage("landing");
        else if (path === "/signup") setCurrentPage("signup");
        else if (path === "/dashboard") setCurrentPage("dashboard");
        else if (path === "/chatbot-management")
          setCurrentPage("chatbot-management");
        else if (path === "/consultation") setCurrentPage("consultation");
        else if (path === "/demo") setCurrentPage("demo");
        else if (path === "/tickets") setCurrentPage("tickets");
        else if (path === "/login") setCurrentPage("login");
        else if (path === "/otp-verification")
          setCurrentPage("otp-verification");
        // else if (path === "/register") setCurrentPage("register");
        else setCurrentPage("landing");
      } catch (error) {
        console.error("Error handling navigation:", error);
        setCurrentPage("landing");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const PageLoader = () => (
    <div className="min-h-screen flex items-center justify-center">
      <div
        className="space-y-4"
        style={{ animation: "none", transition: "none" }}
      >
        <div className="h-8 bg-gray-200 rounded w-48 mx-auto"></div>
        <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
        <div
          className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full mx-auto"
          style={{ animation: "none" }}
        ></div>
      </div>
    </div>
  );

  const renderPage = () => {
    switch (currentPage) {
      case "landing":
        return (
          <Suspense fallback={<PageLoader />}>
            <LandingPage onNavigate={navigate} />
          </Suspense>
        );
      case "signup":
        return (
          <Suspense fallback={<PageLoader />}>
            <OnboardingWizard onNavigate={navigate} />
          </Suspense>
        );
      case "dashboard":
        return (
          <Suspense fallback={<PageLoader />}>
            <Dashboard onNavigate={navigate} />
          </Suspense>
        );
      case "chatbot-management":
        return (
          <Suspense fallback={<PageLoader />}>
            <ChatbotManagement onNavigate={navigate} />
          </Suspense>
        );
      case "tickets":
        return (
          <Suspense fallback={<PageLoader />}>
            <Tickets onNavigate={navigate} />
          </Suspense>
        );
      case "login":
        return (
          <Suspense fallback={<PageLoader />}>
            <Login onNavigate={navigate} />
          </Suspense>
        );
      case "otp-verification":
        return (
          <Suspense fallback={<PageLoader />}>
            <OTPVerification onNavigate={navigate} phoneNumber="09123456789" />
          </Suspense>
        );

      case "consultation":
        return (
          <Suspense fallback={<PageLoader />}>
            <LandingPage onNavigate={navigate} />
          </Suspense>
        );
      case "demo":
        return (
          <Suspense fallback={<PageLoader />}>
            <ChatHistoryDemo />
          </Suspense>
        );
      default:
        return (
          <Suspense fallback={<PageLoader />}>
            <LandingPage onNavigate={navigate} />
          </Suspense>
        );
    }
  };

  return (
    <ErrorBoundary>
      <div className="app-shell" dir="rtl">
        <div className="app-content">
          {currentPage !== "dashboard" &&
            currentPage !== "chatbot-management" &&
            currentPage !== "tickets" &&
            currentPage !== "login" &&
            currentPage !== "otp-verification" &&
            currentPage !== "signup" && (
              <ErrorBoundary>
                <Header currentPage={currentPage} onNavigate={navigate} />
              </ErrorBoundary>
            )}
          <ErrorBoundary>{renderPage()}</ErrorBoundary>
        </div>
      </div>
    </ErrorBoundary>
  );
}
