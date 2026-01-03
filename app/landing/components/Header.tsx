"use client";
import { useAuth } from "@/providers/AuthProvider";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const menuItems = [
  { label: "خانه", href: "/" },
  { label: "ویژگی‌ها", href: "/#features" },
  { label: "نحوه کار", href: "/#launch" },
  { label: "قیمت‌گذاری", href: "/#pricing" },
  { label: "سوالات متداول", href: "/#faq" },
  { label: "درباره آیوا", href: "/#about" },
  { label: "تماس با ما", href: "/contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading } = useAuth();
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const router = useRouter();

  const handleOnboarding = () => {
    console.log("handleOnboarding");
    localStorage.setItem("alogUrl", "/onboarding");
    router.push("/onboarding");
  };
  
  const handleOnboardingMobile = () => {
    console.log("handleOnboarding");
    localStorage.setItem("alogUrl", "/onboarding");
    closeMenu()
    router.push("/onboarding");
  };

  return (
    <header className="bg-white border-gray-200">
      <div className="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Image
            src="/logo.webp"
            alt="لوگوی آیوا"
            width={40}
            height={40}
            className="sm:w-12 sm:h-12 w-10 h-10"
          />
          <div className="text-right leading-tight">
            <p className="text-base sm:text-lg text-gray-900 font-semibold">
              آیوا
            </p>
            <p className="text-xs sm:text-sm text-gray-600">دستیار هوشمند</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          {menuItems.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="px-3 py-2 rounded-2xl transition-all duration-200 text-sm whitespace-nowrap text-gray-700 hover:text-[#65bcb6]"
               
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {!loading && user ? (
            <a
              href="/dashboard"
              className="flex items-center gap-2 bg-[#65bcb6] text-white px-3 sm:px-4 py-2 rounded-sm shadow hover:bg-[#58aaa5] transition text-sm sm:text-base whitespace-nowrap"
            >
              حساب کاربری
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                <path
                  d="M3.75 9H14.25M9 3.75L14.25 9L9 14.25"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
            </a>
          ) : (
            <>
              <a
                href="/auth/login"
                className="text-[#65bcb6] text-sm sm:text-base whitespace-nowrap"
              >
                ورود
              </a>
              <button
                // href="/onboarding"
                onClick={handleOnboarding}
                className="flex items-center gap-2 bg-[#65bcb6] text-white px-3 sm:px-4 py-2 rounded-sm shadow hover:bg-[#58aaa5] transition text-sm sm:text-base whitespace-nowrap"
              >
                شروع رایگان
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M3.75 9H14.25M9 3.75L14.25 9L9 14.25"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Mobile Auth + Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <a href="/auth/login" className="text-[#65bcb6] text-sm">
            ورود
          </a>
          <button
            onClick={toggleMenu}
            className="p-2 text-gray-700 hover:text-[#65bcb6] transition"
            aria-label="Toggle menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {isOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden bg-gray-100 shadow border-t border-gray-200 px-4 py-4 flex flex-col gap-2">
          {menuItems.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={closeMenu}
              className="px-4 py-3 rounded-lg transition-all duration-200 text-right text-gray-700 hover:bg-gray-100 hover:text-[#65bcb6]"
             
            >
              {label}
            </a>
          ))}
          <button
            onClick={handleOnboardingMobile}
            className="flex items-center w-fit justify-end gap-2 bg-[#65bcb6] text-white px-4 py-3 rounded-lg shadow hover:bg-[#58aaa5] transition mt-2"
          >
            شروع رایگان
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <path
                d="M3.75 9H14.25M9 3.75L14.25 9L9 14.25"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        </nav>
      )}
    </header>
  );
}
