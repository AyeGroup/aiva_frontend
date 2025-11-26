"use client";

import { motion } from "motion/react";
import { useState, FC, ReactNode, useMemo } from "react";
import svgPaths from "../svg/svg-4hsgpptxrd";
import navSvgPaths from "../svg/svg-9zbz1ttp0b";
import CustomerIcon from "./CustomerIcon";
import Image from "next/image";

// ============ TYPES ============
interface BrandData {
  quote: string;
  name: string;
  role: string;
  company: string;
  image: string;
}

interface StatData {
  value: string;
  title: string;
  description: string;
}

interface BrandConfig {
  id: string;
  label: string;
  iconPaths: string[];
  delay: number;
  stats: StatData[];
  quoteData: BrandData;
  category: string;
}

// ============ BRAND CONFIGURATION ============
const BRANDS_CONFIG: Record<string, BrandConfig> = {
  nike: {
    id: "nike",
    label: "Nike",
    iconPaths: [navSvgPaths.p3982a5f0],
    delay: 0.3,
    category: "ورزش و کفش",
    stats: [
      {
        value: "۴٫۹/۵",
        title: "رضایت مشتریان",
        description: "از تجربه خرید و پشتیبانی",
      },
      {
        value: "-۳۵٪",
        title: "کاهش مرجوعی",
        description: "راهنمایی دقیق سایز کفش",
      },
      {
        value: "+۱۲۰٪",
        title: "افزایش نرخ تبدیل",
        description: "با پاسخ‌گویی سریع و دقیق",
      },
    ],
    quoteData: {
      quote:
        "با آیوا، مشتریان می‌تونند سایز مناسب رو پیدا کنند و سوالاتشون فوراً جواب داده میشه. تجربه خرید آنلاین کاملاً متحول شد.",
      name: "آرش احمدی",
      role: "مدیر تجربه مشتری",
      company: "Nike",
      image: "/images/samplecustomer.jpg",
    },
  },
  amazon: {
    id: "amazon",
    label: "Amazon",
    iconPaths: [navSvgPaths.p3d33f9c0],
    delay: 0,
    category: "تجارت الکترونیک",
    stats: [
      {
        value: "۴٫۷/۵",
        title: "رضایت خریداران",
        description: "از تجربه خرید آنلاین",
      },
      {
        value: "-۴۲٪",
        title: "کاهش پرسش",
        description: "پاسخ خودکار به سوالات محصول",
      },
      {
        value: "+۸۵٪",
        title: "افزایش فروش",
        description: "با پیشنهادات هوشمند",
      },
    ],
    quoteData: {
      quote:
        "آیوا به ما کمک کرد تا حجم عظیمی از سوالات محصولات رو به صورت خودکار پاسخ بدیم و تجربه خرید مشتریان رو بهبود ببخشیم.",
      name: "سارا کریمی",
      role: "مدیر خدمات مشتری",
      company: "Amazon",
      image: "/images/samplecustomer.jpg",
    },
  },
  adidas: {
    id: "adidas",
    label: "Adidas",
    iconPaths: [
      navSvgPaths.p14560df0,
      navSvgPaths.pa43e00,
      navSvgPaths.pb98cdf2,
    ],
    delay: 0.05,
    category: "ورزش و پوشاک",
    stats: [
      {
        value: "۴٫۸/۵",
        title: "رضایت ورزشکاران",
        description: "از مشاوره تخصصی محصولات",
      },
      {
        value: "-۳۸٪",
        title: "کاهش تماس",
        description: "راهنمایی آنلاین محصولات ورزشی",
      },
      {
        value: "+۹۵٪",
        title: "افزایش تعامل",
        description: "با راهنمای ورزشی شخصی‌سازی",
      },
    ],
    quoteData: {
      quote:
        "با مشاوره تخصصی آیوا، ورزشکاران می‌تونند بهترین محصول رو متناسب با نیازشون انتخاب کنند. رضایت مشتریان به شکل قابل توجهی افزایش یافت.",
      name: "رضا محمودی",
      role: "مدیر فروش دیجیتال",
      company: "Adidas",
      image: "/images/samplecustomer.jpg",
    },
  },
  microsoft: {
    id: "microsoft",
    label: "Microsoft",
    iconPaths: [
      navSvgPaths.p183c6380,
      navSvgPaths.p31e6ae00,
      navSvgPaths.p2b0a0400,
      navSvgPaths.p2050b00,
    ],
    delay: 0.1,
    category: "فناوری و نرم‌افزار",
    stats: [
      {
        value: "۴٫۶/۵",
        title: "رضایت کاربران",
        description: "از پشتیبانی فنی سریع",
      },
      {
        value: "-۵۵٪",
        title: "کاهش تیکت",
        description: "حل خودکار مشکلات رایج",
      },
      {
        value: "+۷۵٪",
        title: "افزایش بهره‌وری",
        description: "تیم پشتیبانی با آیوا",
      },
    ],
    quoteData: {
      quote:
        "آیوا پشتیبانی فنی ما رو متحول کرد. حل خودکار مشکلات رایج باعث شد تیم ما روی مسائل پیچیده‌تر تمرکز کنه.",
      name: "مهدی رضایی",
      role: "مدیر پشتیبانی فنی",
      company: "Microsoft",
      image: "/images/samplecustomer.jpg",
    },
  },
  zara: {
    id: "zara",
    label: "Zara",
    iconPaths: [navSvgPaths.p13584f80],
    delay: 0.15,
    category: "مد و پوشاک",
    stats: [
      {
        value: "۴٫۷/۵",
        title: "رضایت مشتریان",
        description: "از مشاوره استایل آنلاین",
      },
      {
        value: "-۴۰٪",
        title: "کاهش مرجوعی",
        description: "با راهنمای سایز هوشمند",
      },
      {
        value: "+۱۱۰٪",
        title: "افزایش فروش",
        description: "با پیشنهاد ست لباس",
      },
    ],
    quoteData: {
      quote:
        "مشتریان ما حالا می‌تونند با کمک آیوا ست‌های لباس مناسب پیدا کنن و راهنمایی سایز دریافت کنن. فروش به شکل چشمگیری افزایش یافت.",
      name: "نگار امینی",
      role: "مدیر تجارت الکترونیک",
      company: "Zara",
      image: "/images/samplecustomer.jpg",
    },
  },
  starbucks: {
    id: "starbucks",
    label: "Starbucks",
    iconPaths: [
      navSvgPaths.p1fa66600,
      navSvgPaths.p1835bb70,
      navSvgPaths.p38a2f6f0,
      navSvgPaths.p21e85058,
    ],
    delay: 0.2,
    category: "رستوران و کافی‌شاپ",
    stats: [
      {
        value: "۴٫۹/۵",
        title: "رضایت مشتریان",
        description: "از سفارش سریع و آسان",
      },
      {
        value: "-۴۵٪",
        title: "کاهش زمان انتظار",
        description: "با سفارش پیش از ورود",
      },
      {
        value: "+۱۳۰٪",
        title: "افزایش سفارشات",
        description: "با پیشنهادات شخصی‌سازی",
      },
    ],
    quoteData: {
      quote:
        "با آیوا، مشتریان می‌تونن قبل از رسیدن به کافی‌شاپ سفارش بدن و پیشنهادات شخصی‌سازی شده دریافت کنن. تجربه خرید کاملاً تغییر کرد.",
      name: "امیر حسینی",
      role: "مدیر تجربه دیجیتال",
      company: "Starbucks",
      image: "/images/samplecustomer.jpg",
    },
  },
  apple: {
    id: "apple",
    label: "Apple",
    iconPaths: [navSvgPaths.p12eec480, navSvgPaths.p361bf100],
    delay: 0.25,
    category: "فناوری و محصولات الکترونیک",
    stats: [
      {
        value: "۴٫۸/۵",
        title: "رضایت کاربران",
        description: "از تجربه خرید محصولات",
      },
      {
        value: "-۵۰٪",
        title: "کاهش پرسش",
        description: "مشاوره فنی هوشمند محصول",
      },
      {
        value: "+۱۰۰٪",
        title: "افزایش رضایت",
        description: "با پشتیبانی ۲۴/۷",
      },
    ],
    quoteData: {
      quote:
        "آیوا به مشتریان ما کمک می‌کنه تا بهترین محصول اپل رو برای نیازشون پیدا کنن. مشاوره فنی هوشمند باعث کاهش قابل توجه پرسش‌ها شد.",
      name: "علی موسوی",
      role: "مدیر خدمات مشتری",
      company: "Apple",
      image: "/images/samplecustomer.jpg",
    },
  },
};

const BRAND_ORDER = [
  "amazon",
  "adidas",
  "microsoft",
  "zara",
  "starbucks",
  "apple",
  "nike",
];

// ============ DECORATIVE ICONS ============
const DecorativeIcons: FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
    <motion.div
      className="absolute size-14 left-[1260.52px] top-[160.44px]"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.3, scale: [0.8, 1.1, 0.8] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 56 56"
        aria-hidden="true"
      >
        <path d={svgPaths.p3a25ed00} fill="#FFA18E" opacity="0.395785" />
      </svg>
    </motion.div>

    <motion.div
      className="absolute size-12 left-[143.09px] top-[700.75px]"
      initial={{ opacity: 0, rotate: 0 }}
      animate={{ opacity: 0.3, rotate: [0, 360] }}
      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 48 48"
        aria-hidden="true"
      >
        <path d={svgPaths.p5b7a40} fill="#52D4A0" opacity="0.530523" />
      </svg>
    </motion.div>

    <motion.div
      className="absolute size-20 left-[114.48px] top-[80px]"
      initial={{ opacity: 0, rotate: 0 }}
      animate={{ opacity: 0.25, rotate: [0, 360] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 80 80"
        aria-hidden="true"
      >
        <path d={svgPaths.p2138fe00} stroke="#65BCB6" strokeWidth="2.4" />
      </svg>
    </motion.div>

    <motion.div
      className="absolute size-16 right-[235.72px] bottom-20"
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 0.25, y: [0, -10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 64 64"
        aria-hidden="true"
      >
        <path d={svgPaths.p3027dc00} fill="#FFA18E" />
      </svg>
    </motion.div>

    <motion.div
      className="absolute size-14 left-[71.55px] top-[534.82px]"
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 0.25, scale: [1, 1.15, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 56 56"
        aria-hidden="true"
      >
        <path d={svgPaths.p3a95a700} stroke="#65BCB6" strokeWidth="1.12" />
      </svg>
    </motion.div>
  </div>
);

// ============ BADGE COMPONENTS ============

type BadgeColor = "error" | "info" | "success";

interface BadgeProps {
  type: BadgeColor;
}

const Badge: FC<BadgeProps> = ({ type }) => {
  const colorMap: Record<BadgeColor, { stroke: string; bg: string }> = {
    error: {
      stroke: "#EF4444",
      bg: "rgba(239, 68, 68, 0.1)",
    },
    info: {
      stroke: "#3B82F6",
      bg: "rgba(59, 130, 246, 0.1)",
    },
    success: {
      stroke: "#10B981",
      bg: "rgba(16, 185, 129, 0.1)",
    },
  };

  const { stroke, bg } = colorMap[type];

  return (
    <div
      className="absolute bg-opacity-10 flex items-center left-[26px] top-[26px] px-3 py-1.5 rounded-full"
      style={{ backgroundColor: bg }}
      aria-hidden="true"
    >
      <div className="h-4 overflow-clip relative shrink-0 w-full">
        <div
          className="absolute inset-[29.17%_8.33%_45.83%_66.67%]"
          data-name="Vector"
        >
          <div className="absolute inset-[-16.667%]">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 6 6"
            >
              <path
                d={svgPaths.p1efb2580}
                id="Vector"
                stroke={stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.33333"
              />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[29.17%_8.33%]" data-name="Vector">
          <div className="absolute inset-[-10%_-5%]">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 15 8"
            >
              <path
                d={svgPaths.p137d8f80}
                id="Vector"
                stroke={stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.33333"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============ ICON SVG ============
const IconSVG: FC<{ paths: string[]; stroke?: boolean }> = ({
  paths,
  stroke = false,
}) => (
  <svg
    className="size-7"
    fill={stroke ? "none" : "currentColor"}
    viewBox="0 0 28 28"
  >
    {paths.map((path, i) => (
      <path
        key={i}
        d={path}
        fill={stroke ? "none" : "currentColor"}
        stroke={stroke ? "currentColor" : "none"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke ? "2.33333" : undefined}
      />
    ))}
  </svg>
);

// ============ TAB COMPONENT ============
interface TabProps {
  isActive: boolean;
  onClick: () => void;
  label: string;
  iconPaths: string[];
  delay: number;
  stroke?: boolean;
}

const Tab: FC<TabProps> = ({
  isActive,
  onClick,
  label,
  iconPaths,
  delay,
  stroke = false,
}) => {
  return (
    <motion.button
      onClick={onClick}
      className={`h-12 flex items-center gap-2 shrink-0 cursor-pointer transition-all duration-300 ${
        isActive ? "opacity-100" : "opacity-40 hover:opacity-100"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: isActive ? 1 : 0.4, y: 0 }}
      transition={{ duration: 0.4, delay }}
      aria-pressed={isActive}
    >
      <div
        className={`rounded-full p-2.5 flex-shrink-0 transition-colors duration-300 ${
          isActive ? "bg-primary text-white" : "bg-gray-100 text-primary"
        }`}
      >
        <IconSVG paths={iconPaths} stroke={stroke} />
      </div>
      <span className="font-semibold text-sm text-gray-800 whitespace-nowrap">
        {label}
      </span>
      {isActive && (
        <motion.div
          className="absolute bottom-[-8px] left-0 h-0.5 bg-primary rounded-full w-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: "left" }}
        />
      )}
    </motion.button>
  );
};

// ============ HEADER ============
const Header: FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.8 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="flex flex-col justify-center text-center gap-4 md:gap-6 w-full px-4"
  >
    <div className="inline-flex items-center justify-center gap-2 rounded-2xl md:rounded-3xl bg-primary/8 border border-primary/15 py-2 px-3 mx-auto">
      <div className="bg-primary rounded-full w-1.5 h-1.5" />
      <span className="text-primary text-xs md:text-sm font-medium">
        داستان‌های موفقیت
      </span>
    </div>
    <h2 className="font-extrabold text-xl md:text-3xl lg:text-4xl text-gray-900">
      کسب‌وکارهایی که با آیوا اتوماسیون و رشد را تجربه کردند
    </h2>
    <p className="text-gray-600 text-sm md:text-base">
      نتایج واقعی از برندهای مختلف
    </p>
  </motion.div>
);

// ============ NAVIGATION ============
const Navigation: FC<{
  activeBrand: string;
  setActiveBrand: (brand: string) => void;
}> = ({ activeBrand, setActiveBrand }) => (
  <motion.div
    className="flex gap-2 md:gap-4 lg:gap-6 items-center my-8 md:my-12 justify-center flex-wrap relative"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.3 }}
  >
    {BRAND_ORDER.map((brandId) => {
      const brand = BRANDS_CONFIG[brandId];
      const hasStroke = brand.iconPaths.length > 1;
      return (
        <Tab
          key={brand.id}
          isActive={activeBrand === brand.id}
          onClick={() => setActiveBrand(brand.id)}
          label={brand.label}
          iconPaths={brand.iconPaths}
          delay={brand.delay}
          stroke={hasStroke}
        />
      );
    })}
  </motion.div>
);

// ============ STAT CARD ============
interface StatCardProps {
  stat: StatData;
  type: BadgeColor;
  delay: number;
}

const StatCard: FC<StatCardProps> = ({ stat, type, delay }) => (
  <motion.div
    className="bg-white rounded-lg md:rounded-2xl p-4 md:p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    whileHover={{ y: -2, transition: { duration: 0.2 } }}
  >
    <div className="  bg-[rgba(239,68,68,0.1)] box-border content-stretch flex flex-col h-7 items-start  pb-0 pt-1.5 px-3 rounded-[1.67772e+07px]  top-[26px] w-10">
      <Badge type={type} />
    </div>
    <div className="pt-6 md:pt-8">
      <p className="text-2xl md:text-3xl font-bold text-gray-900 leading-none">
        {stat.value}
      </p>
      <h4 className="text-sm md:text-base font-semibold text-gray-900 mt-3">
        {stat.title}
      </h4>
      <p className="text-xs md:text-sm text-gray-500 mt-1 line-clamp-2">
        {stat.description}
      </p>
    </div>
  </motion.div>
);

// ============ STATS GRID ============
const StatsGrid: FC<{ brand: string }> = ({ brand }) => {
  const config = BRANDS_CONFIG[brand];
  const badgeTypes: BadgeColor[] = ["error", "info", "success"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full">
      {config.stats.map((stat, i) => (
        <StatCard
          key={i}
          stat={stat}
          type={badgeTypes[i]}
          delay={0.5 + i * 0.05}
        />
      ))}
    </div>
  );
};

// ============ QUOTE CARD ============
const QuoteCard: FC<{ brand: string }> = ({ brand }) => {
  const config = BRANDS_CONFIG[brand];
  const { quote, name, role, company, image } = config.quoteData;

  return (
    <motion.div
      className="bg-white rounded-lg md:rounded-2xl p-4 md:p-8 border border-gray-200 shadow-sm w-full"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
      key={company}
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-4 md:gap-8 items-center">
        <div className="">
          <Image
            src={image}
            alt={name}
            width={80}
            height={80}
            className="object-cover w-20 h-20  rounded-full border-2 shadow border-primary "
          />
        </div>

        <div className="flex flex-col items-start text-right md:text-right order-2  ">
          <blockquote className="mb-4">
            <p className="text-gray-700 text-sm md:text-base leading-relaxed italic">
              {quote}
            </p>
          </blockquote>

          <div className="flex flex-col items-start  ">
            <p className="font-semibold text-gray-900 text-sm md:text-base">
              {name}
            </p>
            <p className="text-xs md:text-sm text-gray-500 mt-0.5">
              {role} • {company}
            </p>
          </div>
        </div>
        {/* Right Column - Rounded Image */}
      </div>
    </motion.div>
  );
};

// ============ BRAND INFO ============
const BrandInfo: FC<{ brand: string }> = ({ brand }) => {
  const config = BRANDS_CONFIG[brand];

  return (
    <motion.div
      className="text-center space-y-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      key={brand}
    >
      <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
        {config.label}
      </h3>
      <p className="text-sm md:text-base text-gray-500">{config.category}</p>
    </motion.div>
  );
};

// ============ MAIN SECTION ============
export default function SuccessStoriesSection() {
  const [activeBrand, setActiveBrand] = useState("nike");

  return (
    <section className="relative w-full bg-linear-to-b from-gray-50 to-white pt-12 md:pt-16 lg:pt-20 px-8 md:px-12 lg:px-20 pb-8 md:pb-0 overflow-hidden">
      <DecorativeIcons />

      <div className="relative z-10 flex flex-col gap-6 items-center max-w-full">
        <Header />
        <Navigation activeBrand={activeBrand} setActiveBrand={setActiveBrand} />

        <motion.div
          className="flex flex-col gap-8 md:gap-12 w-full items-center"
          key={activeBrand}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <BrandInfo brand={activeBrand} />
          <StatsGrid brand={activeBrand} />
          <div className="grid grid-cols-1 items-center lg:grid-cols-[4fr_6fr]">
            <CustomerIcon />
            <QuoteCard brand={activeBrand} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
