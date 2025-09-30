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
      id: "features",
      title: "ویژگی‌ها",
      href: "#features",
      icon: "star",
    },
    {
      id: "pricing",
      title: "قیمت‌گذاری",
      href: "#pricing",
      icon: "dollar-sign",
    },
    {
      id: "docs",
      title: "مستندات",
      href: "/docs",
      icon: "book-open",
    },
    {
      id: "security",
      title: "امنیت",
      href: "#security",
      icon: "shield",
    },
    {
      id: "components",
      title: "کامپوننت‌ها",
      href: "/components",
      icon: "layers",
    },
  ] as NavItem[],

  authButtons: {
    login: {
      text: "ورود",
      href: "/login",
      title: "ورود به حساب کاربری",
      variant: "tertiary",
    },
    signup: {
      text: "شروع رایگان",
      href: "/signup",
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
