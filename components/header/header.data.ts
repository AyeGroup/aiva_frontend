import { NavItem } from "../../types/common";
import aivaLogo from "@/public/logo.png";

// اطلاعات هدر آیوا
export const headerData = {
  logo: {
    image: aivaLogo,
    text: "آیوا",
    title: "برگشت به صفحه اصلی",
    alt: "لوگوی آیوا - دستیار هوشمند وب‌سایت",
  },

  navigation: [
    {
      id: "home",
      title: "خانه",
      href: "/",
      icon: "home",
      description: "بازگشت به صفحه اصلی",
    },
    {
      id: "features",
      title: "ویژگی‌ها",
      href: "#features",
      icon: "star",
      description: "قابلیت‌ها و امکانات پیشرفته آیوا",
      badge: "جدید",
    },
    {
      id: "how-it-works",
      title: "نحوه کار",
      href: "#launch",
      icon: "zap",
      description: "آیوا چگونه کسب‌وکار شما را تقویت می‌کند",
    },
    {
      id: "case-study",
      title: "نمونه کارها",
      href: "#case-study",
      icon: "briefcase",
      description: "داستان‌های موفقیت مشتریان ما",
    },
    {
      id: "pricing",
      title: "قیمت‌گذاری",
      href: "#pricing",
      icon: "dollar-sign",
      description: "پلن‌های مناسب برای هر کسب‌وکاری",
    },
    {
      id: "faq",
      title: "سوالات متداول",
      href: "#faq",
      icon: "help-circle",
      description: "پاسخ سوالات رایج",
    },
    {
      id: "blog",
      title: "بلاگ",
      href: "#footer",
      icon: "book-open",
      description: "مقالات و آموزش‌های کاربردی",
    },
    {
      id: "contact",
      title: "تماس با ما",
      href: "#final-cta",
      icon: "mail",
      description: "ارتباط با تیم پشتیبانی",
    },
  ] as NavItem[],

  authButtons: {
    login: {
      text: "ورود",
      href: "/dashboard",
      title: "ورود به حساب کاربری",
      variant: "tertiary",
    },
    signup: {
      text: "شروع رایگان",
      href: "/onboarding",
      title: "ثبت‌نام رایگان و شروع استفاده از آیوا",
      variant: "primary",
    },
  },
};

// متادیتا برای SEO
export const headerMeta = {
  siteName: "آیوا",
  tagline: "دستیار هوشمند برای هر وب‌سایتی",
  author: "تیم آیوا",
  language: "fa-IR",
};
