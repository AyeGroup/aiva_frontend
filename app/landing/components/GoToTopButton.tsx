"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function GoToTopButton() {
  const [show, setShow] = useState(false);

  // وقتی اسکرول می‌کنیم نمایش داده می‌شود
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // اسکرول نرم به بالا
  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={goTop}
      className={`
        fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg
        bg-primary text-white transition-all duration-500
        flex items-center justify-center
        ${
          show
            ? "opacity-100 translate-y-0"
            : "opacity-0 pointer-events-none translate-y-5"
        }
      `}
    >
      <ArrowUp size={22} />
    </button>
  );
}
