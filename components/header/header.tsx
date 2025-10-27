import Image from "next/image";
import { Button } from "../button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { headerData } from "./header.data";
import { NavItem, PageType } from "../../types/common";
import { useAuth } from "@/providers/AuthProvider";

interface HeaderProps {
  currentPage: PageType;
  isOnboarding?: boolean;
  isEditingChatbot?: boolean;
  onBackFromEdit?: () => void;
}

export function Header({
  currentPage,
  isOnboarding = false,
  isEditingChatbot = false,
  onBackFromEdit,
}: HeaderProps) {
  const { logo, navigation, authButtons } = headerData;
  const router = useRouter();
  const { user } = useAuth();

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
          {/* لوگو - فقط در حالت عادی نمایش داده می‌شود */}
          {/* {!isEditingChatbot && !isOnboarding && ( */}
            <div className="flex items-center">
              <button
                onClick={() => router.push("/landing")}
                title={logo.title}
                className="flex items-center gap-3 hover:opacity-80 animate-soft group"
                aria-label="برگشت به صفحه اصلی"
              >
                {/* تصویر لوگو */}
                {logo.image ? (
                  <Image
                    src="/logo.png"
                    width={50}
                    height={40}
                    alt="Logo"
                    style={{ width: "auto", height: "40px" }}
                  />
                ) : (
                  <div className="h-8 w-8 lg:h-10 lg:w-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                    <span className="text-white text-sm lg:text-lg">
                      {logo.text?.charAt(0)}
                    </span>
                  </div>
                )}

                {/* متن لوگو */}
                <div className="flex flex-col gap-0.5">
                  <span className="text-grey-900 group-hover:text-brand-primary transition-colors leading-none text-right">
                    {logo.text}
                  </span>
                  <span className="hidden sm:block text-grey-600 text-xs leading-none">
                    دستیار هوشمند
                  </span>
                </div>
              </button>
            </div>
           {/* )} */}

          {/* منوی ناوبری اصلی - فقط در دسکتاپ */}
          {!isEditingChatbot && !isOnboarding && (
            <nav
              className="hidden lg:flex items-center gap-0.5"
              role="navigation"
              aria-label="منوی اصلی"
            >
              <ul className="flex items-center gap-0.5">
                {navigation.map((item: NavItem) => {
                  // تعیین active بودن آیتم
                  const isActive =
                    item.href === "/"
                      ? currentPage === "landing"
                      : item.href.startsWith("#")
                      ? false
                      : currentPage === item.id;

                  return (
                    <li key={item.id} className="relative group">
                      <a
                        href={item.href}
                        title={item.description || item.title}
                        className={`relative flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 hover:bg-white/60 ${
                          isActive
                            ? "text-brand-primary bg-white/50"
                            : "text-grey-700 hover:text-brand-primary"
                        }`}
                        aria-current={isActive ? "page" : undefined}
                        onClick={(e) => {
                          e.preventDefault();

                          // لینک به صفحه اصلی
                          if (item.href === "/") {
                            router.push("/landing");
                            window.scrollTo({ top: 0, behavior: "smooth" });
                            return;
                          }

                          // لینک‌های anchor
                          if (
                            currentPage !== "landing" &&
                            item.href.startsWith("#")
                          ) {
                            router.push("/landing");
                            setTimeout(() => {
                              const section = document.querySelector(item.href);
                              if (section) {
                                section.scrollIntoView({
                                  behavior: "smooth",
                                  block: "start",
                                });
                              }
                            }, 300);
                          } else if (item.href.startsWith("#")) {
                            const section = document.querySelector(item.href);
                            if (section) {
                              section.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                              });
                            }
                          }
                        }}
                      >
                        <span className="text-sm">{item.title}</span>
                        {item.badge && (
                          <span
                            className="px-1.5 py-0.5 rounded-md text-white text-[10px] leading-none"
                            style={{ backgroundColor: "var(--sharp-coral)" }}
                            aria-label="جدید"
                          >
                            {item.badge}
                          </span>
                        )}
                      </a>

                      {/* Tooltip - نمایش توضیحات در hover */}
                      {item.description && (
                        <div
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-2 bg-grey-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none"
                          role="tooltip"
                        >
                          {item.description}
                          <div
                            className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-grey-900 rotate-45"
                            aria-hidden="true"
                          ></div>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}

          {/* دکمه‌های احراز هویت */}
          <div
            className={`flex items-center gap-2 lg:gap-3 ${
              isEditingChatbot || isOnboarding ? "w-full" : ""
            }`}
          >
            {isEditingChatbot ? (
              // فقط دکمه بازگشت برای ویرایش چت‌بات
              <Button
                variant="secondary"
                size="md"
                title="برگشت به مدیریت چت‌بات‌ها"
                onClick={() => {
                  if (onBackFromEdit) {
                    onBackFromEdit();
                  }
                }}
                className="text-sm lg:text-base px-4 lg:px-6 py-2"
              >
                <ArrowLeft className="w-5 h-5 ml-2" />
                <span>برگشت</span>
              </Button>
            ) : isOnboarding ? (
              <></>
              //  <Button
              //   variant="secondary"
              //   size="md"
              //   title="برگشت به مدیریت چت‌بات‌ها"
              //   onClick={() => router.push("/chatbot-management")}
              //   className="text-sm lg:text-base px-4 lg:px-6 py-2"
              // >
              //   <ArrowLeft className="w-5 h-5 ml-2" />
              //   <span>برگشت</span>
              // </Button>
            ) : (
              // دکمه‌های ورود و ثبت‌نام برای صفحات عادی
              <>
                <Button
                  variant={
                    authButtons.login.variant as
                      | "primary"
                      | "secondary"
                      | "tertiary"
                  }
                  size="md"
                  title={authButtons.login.title}
                  onClick={() => router.push("/dashboard")}
                  // onClick={() => router.push("/auth/login")}
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
                  onClick={() => router.push("/onboarding")}
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
                  onClick={() => router.push("/auth/register")}
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
              </>
            )}
          </div>
        </div>

        {/* منوی موبایل - پنهان به صورت پیش‌فرض */}
        <nav
          className="mobile-menu hidden md:hidden mt-4 pb-4 border-t border-border"
          role="navigation"
          aria-label="منوی موبایل"
        >
          <ul className="space-y-2 pt-4">
            {navigation.map((item: NavItem) => {
              const isActive =
                item.href === "/"
                  ? currentPage === "landing"
                  : currentPage === item.id;

              return (
                <li key={`mobile-${item.id}`}>
                  <a
                    href={item.href}
                    title={item.description || item.title}
                    className={`block py-3 px-4 rounded-xl transition-colors ${
                      isActive
                        ? "bg-white/80 text-brand-primary"
                        : "text-grey-700 hover:bg-white/60 hover:text-brand-primary"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                    onClick={(e) => {
                      e.preventDefault();

                      // لینک به صفحه اصلی
                      if (item.href === "/") {
                        router.push("/landing");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        return;
                      }

                      // لینک‌های anchor
                      if (
                        currentPage !== "landing" &&
                        item.href.startsWith("#")
                      ) {
                        router.push("/landing");
                        setTimeout(() => {
                          const section = document.querySelector(item.href);
                          if (section) {
                            section.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                          }
                        }, 300);
                      } else if (item.href.startsWith("#")) {
                        const section = document.querySelector(item.href);
                        if (section) {
                          section.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                        }
                      }
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <span>{item.title}</span>
                        {item.description && (
                          <span className="text-xs text-grey-500">
                            {item.description}
                          </span>
                        )}
                      </div>
                      {item.badge && (
                        <span
                          className="text-white text-xs px-2 py-0.5 rounded-md leading-none"
                          style={{ backgroundColor: "var(--sharp-coral)" }}
                          aria-label="جدید"
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </a>
                </li>
              );
            })}
            <li className="pt-4 space-y-3 border-t border-border-soft/30 mt-4">
              <button
                onClick={() => router.push("/auth/login")}
                title={authButtons.login.title}
                className="block w-full text-center py-3 px-4 border-2 border-brand-primary/20 rounded-xl hover:bg-white/60 transition-all duration-200 text-grey-700 hover:text-brand-primary"
              >
                {authButtons.login.text}
              </button>
              <button
                onClick={() => router.push("/auth/register")}
                title={authButtons.signup.title}
                className="block w-full text-center py-3 px-4 rounded-xl hover:opacity-90 transition-all duration-200 text-white shadow-md hover:shadow-lg"
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
