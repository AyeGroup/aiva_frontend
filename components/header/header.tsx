"use client";
import { Button } from "@/components/button";
import { headerData } from "./header.data";
import Image from "next/image";
import { PageType } from "@/types/common";
import { useRouter } from "next/navigation";
import "@/styles/header.css";
import { User } from "@/public/icons/AppIcons";
import { useAuth } from "@/providers/AuthProvider";

interface HeaderProps {
  currentPage: PageType;
}

export function Header({ currentPage }: HeaderProps) {
  const { logo, navigation, authButtons } = headerData;
  const router = useRouter();
  const { user, loading } = useAuth();

  return (
    <header
      className={`header w-full transition-all duration-300 ${
        currentPage === "landing"
          ? "bg-transparent absolute top-0 left-0 right-0 z-50"
          : "bg-white/95 backdrop-blur-sm border-b border-border-soft shadow-sm"
      }`}
      role="banner"
    >
      <div className="container mx-auto px-4 lg:px-6 py-4 lg:py-5 flex items-center justify-between">
        {/* لوگو */}
        <button
          onClick={() => router.push("/")}
          title={logo.title}
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 animate-soft group"
        >
          {logo.image ? (
            <Image
              src={logo.image}
              alt={logo.alt}
              height={48}
              className="h-10 lg:h-12 w-auto"
            />
          ) : (
            <div className="h-8 w-8 lg:h-10 lg:w-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <span className="text-white text-sm lg:text-lg font-bold">
                {logo.text?.charAt(0)}
              </span>
            </div>
          )}
          {logo.text && (
            <span className="hidden sm:block text-grey-900 text-lg lg:text-xl font-semibold">
              {logo.text}
            </span>
          )}
        </button>

        {/* ناوبری اصلی */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navigation.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => router.push(item.href)}
                  title={item.title}
                  className="text-grey-600 hover:text-brand-primary animate-soft py-3 px-2 relative group text-body-large"
                >
                  {item.title}
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 bg-danger text-white text-xs px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  <span
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-primary animate-soft group-hover:w-full"
                    style={{ borderRadius: "var(--radius-xs)" }}
                  ></span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* دکمه‌های احراز هویت */}
        {currentPage !== "onboarding" ? (
          <div className="flex items-center gap-2 lg:gap-3">
            <Button
              variant={
                authButtons.login.variant as
                  | "primary"
                  | "secondary"
                  | "tertiary"
              }
              size="md"
              onClick={() => router.push("/dashboard")}
            >
              {authButtons.login.text}
            </Button>
            <Button
              variant={
                authButtons.signup.variant as
                  | "primary"
                  | "secondary"
                  | "tertiary"
              }
              size="md"
              onClick={() => router.push("/onboarding")}
            >
              {authButtons.signup.text}
            </Button>
          </div>
        ) : (
          <div className="flex items-center">
            <div className="w-6 h-6 text-primary">
              <User />
            </div>
            <div className="text-sm mr-2">{user?.phone || "کاربر جدید"} </div> 
          </div>
        )}
      </div>
    </header>
  );
}
