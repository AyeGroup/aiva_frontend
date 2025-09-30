import { NavItem } from "../../types/common";
import { Button } from "@/components/button";
import { headerData } from "./header.data";
import "@/styles/header.css";

import { PageType } from "@/types/common";


interface HeaderProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const { logo, navigation, authButtons } = headerData;

  return (
    <header
      className={`header w-full transition-all duration-300 ${
        currentPage === "landing"
          ? "bg-transparent absolute top-0 left-0 right-0 z-50"
          : "bg-white/95 backdrop-blur-sm border-b border-border-soft shadow-sm"
      }`}
      role="banner"
      style={{
        borderRadius:
          currentPage !== "landing"
            ? "0 0 var(--radius-xl) var(--radius-xl)"
            : "0",
      }}
    >
      <div className="container mx-auto px-4 lg:px-6 py-4 lg:py-5">
        <div className="flex items-center justify-between">
          {/* لوگو */}
          <div className="flex items-center">
            <button
              onClick={() => onNavigate("landing")}
              title={logo.title}
              className="flex items-center gap-3 hover:opacity-80 animate-soft group"
              aria-label="برگشت به صفحه اصلی"
            >
              {logo.image ? (
                <img
                  src=""
                  // src={logo.image}
                  alt={logo.alt}
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
          </div>

          {/* ناوبری اصلی - Desktop */}
          <nav
            className="hidden md:flex items-center gap-8"
            role="navigation"
            aria-label="منوی اصلی"
          >
            <ul className="flex items-center gap-6">
              {navigation.map((item: NavItem) => (
                <li key={item.id}>
                  {item.href.startsWith("#") ? (
                    <a
                      href={item.href}
                      title={item.title}
                      className="text-grey-600 hover:text-brand-primary animate-soft py-3 px-2 relative group text-body-large"
                      aria-current={item.href === "/" ? "page" : undefined}
                    >
                      {item.title}
                      {item.badge && (
                        <span className="absolute -top-1 -right-1 bg-danger text-white text-xs px-2 py-1 rounded-full">
                          {item.badge}
                        </span>
                      )}
                      {/* خط زیرین hover */}
                      <span
                        className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-primary animate-soft group-hover:w-full"
                        style={{ borderRadius: "var(--radius-xs)" }}
                      ></span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        if (item.href === "/components") {
                          onNavigate("components");
                        } else if (item.href === "/docs") {
                          onNavigate("landing"); // یا هر صفحه دیگری که دارید
                        }
                      }}
                      title={item.title}
                      className="text-grey-600 hover:text-brand-primary animate-soft py-3 px-2 relative group text-body-large"
                    >
                      {item.title}
                      {item.badge && (
                        <span className="absolute -top-1 -right-1 bg-danger text-white text-xs px-2 py-1 rounded-full">
                          {item.badge}
                        </span>
                      )}
                      {/* خط زیرین hover */}
                      <span
                        className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-primary animate-soft group-hover:w-full"
                        style={{ borderRadius: "var(--radius-xs)" }}
                      ></span>
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* دکمه‌های احراز هویت */}
          <div className="flex items-center gap-2 lg:gap-3">
            <Button
              variant={
                authButtons.login.variant as
                  | "primary"
                  | "secondary"
                  | "tertiary"
              }
              size="md"
              title={authButtons.login.title}
              onClick={() => onNavigate("login")}
              className="hidden sm:inline-flex text-sm lg:text-base px-3 lg:px-4 py-2"
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
              title={authButtons.signup.title}
              onClick={() => onNavigate("signup")}
              icon="arrow-right"
              iconPosition="right"
              className="hidden sm:inline-flex text-sm lg:text-base px-4 lg:px-6 py-2 "
            >
              {authButtons.signup.text}
            </Button>

            {/* Mobile CTA button */}
            <Button
              variant="primary"
              size="sm"
              title={authButtons.signup.title}
              onClick={() => onNavigate("signup")}
              icon="arrow-right"
              iconPosition="right"
              className="sm:hidden text-xs px-3 py-2 "
            >
              شروع
            </Button>

            {/* دکمه منوی موبایل */}
            <button
              type="button"
              className="md:hidden flex items-center justify-center w-9 h-9 lg:w-11 lg:h-11 rounded-xl border border-border-soft/50 hover:bg-white/50 hover:border-brand-primary/30 animate-soft backdrop-blur-sm"
              title="باز کردن منوی موبایل"
              aria-label="منوی موبایل"
              aria-expanded="false"
            >
              <div className="flex flex-col gap-1">
                <span className="w-4 h-0.5 bg-grey-700 animate-soft rounded-full"></span>
                <span className="w-4 h-0.5 bg-grey-700 animate-soft rounded-full"></span>
                <span className="w-4 h-0.5 bg-grey-700 animate-soft rounded-full"></span>
              </div>
            </button>
          </div>
        </div>

        {/* منوی موبایل - پنهان به صورت پیش‌فرض */}
        <nav
          className="mobile-menu hidden md:hidden mt-4 pb-4 border-t border-border"
          role="navigation"
          aria-label="منوی موبایل"
        >
          <ul className="space-y-2 pt-4">
            {navigation.map((item: NavItem) => (
              <li key={`mobile-${item.id}`}>
                {item.href.startsWith("#") ? (
                  <a
                    href={item.href}
                    title={item.title}
                    className="block py-2 px-4 text-foreground hover:bg-accent hover:text-primary rounded-md transition-colors"
                    aria-current={item.href === "/" ? "page" : undefined}
                  >
                    <span className="flex items-center justify-between">
                      {item.title}
                      {item.badge && (
                        <span className="bg-destructive text-destructive-foreground text-xs px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      if (item.href === "/components") {
                        onNavigate("components");
                      } else if (item.href === "/docs") {
                        onNavigate("landing");
                      }
                    }}
                    title={item.title}
                    className="block w-full text-right py-2 px-4 text-foreground hover:bg-accent hover:text-primary rounded-md transition-colors"
                  >
                    <span className="flex items-center justify-between">
                      {item.title}
                      {item.badge && (
                        <span className="bg-destructive text-destructive-foreground text-xs px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </span>
                  </button>
                )}
              </li>
            ))}
            <li className="pt-2 space-y-2">
              <button
                onClick={() => onNavigate("login")}
                title={authButtons.login.title}
                className="block w-full text-center py-2 px-4 border border-border rounded-md hover:bg-accent transition-colors"
              >
                {authButtons.login.text}
              </button>
              <button
                onClick={() => onNavigate("signup")}
                title={authButtons.signup.title}
                className="block w-full text-center py-2 px-4 rounded-md hover:opacity-90 transition-colors text-white"
                style={{ backgroundColor: "var(--brand-primary)" }}
              >
                {authButtons.signup.text}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
