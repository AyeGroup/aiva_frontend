"use client";

import React, {
  useState,
  useEffect,
  Suspense,
  lazy,
  useMemo,
  useCallback,
} from "react";
import { ErrorBoundary } from "../design/_components/ErrorBoundary/error-boundary";
import { Header } from "../design/_header/header";

// Lazy load components to improve initial bundle size
const LandingPage = lazy(() =>
  import("../design/_landingPage/landing").then((module) => ({
    default: module.LandingPage,
  }))
);
const OnboardingWizard = lazy(() =>
  import("../design/_onboarding/onboarding").then((module) => ({
    default: module.OnboardingWizard,
  }))
);
const Dashboard = lazy(() =>
  import("../design/_dashboard/dashboard").then((module) => ({
    default: module.Dashboard,
  }))
);
const ChatbotManagement = lazy(() =>
  import("../design/_dashboard/chatbot-management").then((module) => ({
    default: module.ChatbotManagement,
  }))
);
const Tickets = lazy(() =>
  import("../design/_dashboard/tickets").then((module) => ({
    default: module.Tickets,
  }))
);
const Login = lazy(() =>
  import("../design/_auth/login").then((module) => ({ default: module.Login }))
);
const OTPVerification = lazy(() =>
  import("../design/_auth/otp-verification").then((module) => ({
    default: module.OTPVerification,
  }))
);
const Signup = lazy(() =>
  import("../design/_auth/signup").then((module) => ({
    default: module.Signup,
  }))
);
const ChatHistoryDemo = lazy(() =>
  import("../design/_demo/chat-history-demo").then((module) => ({
    default: module.ChatHistoryDemo,
  }))
);

type PageType =
  | "landing"
  | "signup"
  | "dashboard"
  | "consultation"
  | "demo"
  | "chatbot-management"
  | "tickets"
  | "login"
  | "otp-verification"
  | "register";

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("landing");

  // Simple router with error handling and memoization
  const navigate = useCallback((page: PageType) => {
    try {
      setCurrentPage(page);
      // Update URL without full reload
      const url = page === "landing" ? "/" : `/${page}`;
      window.history.pushState({}, "", url);
    } catch (error) {
      console.error("Navigation error:", error);
      // Fallback navigation
      setCurrentPage("landing");
      window.history.pushState({}, "", "/");
    }
  }, []);

  // Global navigation context (memoized)
  const appContext = useMemo(
    () => ({
      navigate,
      currentPage,
    }),
    [navigate, currentPage]
  );

  // Handle browser back/forward with error handling
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
        else if (path === "/register") setCurrentPage("register");
        else setCurrentPage("landing"); // fallback
      } catch (error) {
        console.error("Error handling navigation:", error);
        setCurrentPage("landing"); // fallback
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Loading component for lazy-loaded pages - NO ANIMATIONS
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
      case "register":
        return (
          <Suspense fallback={<PageLoader />}>
            <Signup onNavigate={navigate} />
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
            currentPage !== "register" && (
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
