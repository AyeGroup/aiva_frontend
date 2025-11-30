// components/sections/FAQ.tsx
import React from "react";
import {
  Shield,
  Clock,
  HelpCircle,
  FileText,
  Users,
  MessageSquare,
} from "lucide-react";
import {
  Faq_Icon0,
  Faq_Icon1,
  Faq_Icon2,
  Faq_Icon3,
  Faq_Icon4,
} from "@/public/icons/landing";

interface FAQItem {
  icon: React.ReactNode;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    icon: <Shield className="w-6 h-6 text-teal-500" />,
    question: "اطلاعات من امن هست؟",
    answer:
      "بله، تمام داده‌ها با رمزنگاری پیشرفته در سرورهای امن ذخیره می‌شوند و فقط شما به اون‌ها دسترسی دارید.",
  },
  {
    icon: <Clock className="w-6 h-6 text-teal-500" />,
    question: "چقدر طول می‌کشه تا راه‌اندازی بشه؟",
    answer:
      "کمتر از ۳۰ دقیقه! فقط فایل‌هایی آپلود کن، تنظیمات رو انجام بده و چت‌بات آماده‌ست.",
  },
  {
    icon: <HelpCircle className="w-6 h-6 text-teal-500" />,
    question: "آیا نیاز به دانش فنی دارم؟",
    answer:
      "خیر، رابط کاربری RagBuilder طوری طراحی شده که بدون هیچ دانش فنی بتوانید چت‌بات خود رو بسازید.",
  },
  {
    icon: <FileText className="w-6 h-6 text-teal-500" />,
    question: "چه فرمت‌هایی رو پشتیبانی می‌کنه؟",
    answer:
      "PDF, Word, Excel, CSV ساده، می‌تونید محتوای وب‌سایت خودتون رو هم اضافه کنید.",
  },
  {
    icon: <Users className="w-6 h-6 text-teal-500" />,
    question: "آیا می‌تونم چندین چت‌بات بسازم؟",
    answer:
      "بله، بسته به پلن انتخابی، می‌تونید چند چت‌بات مختلف برای بخش‌های مختلف کسب‌وکارتون بسازید.",
  },
  {
    icon: <MessageSquare className="w-6 h-6 text-teal-500" />,
    question: "آیا می‌تونم با پیام‌رسان‌ها متصلش کنم؟",
    answer:
      "در پلن‌های متوسط و بالاتر، می‌تونید به واتساپ، تلگرام و اینستاگرام متصل کنید.",
  },
];

const FAQCard: React.FC<FAQItem> = ({ icon, question, answer }) => {
  return (
    <article className="bg-white rounded-2xl border border-gray-200 p-6 relative">
      <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center">
        {icon}
      </div>

      <h3 className="text-base font-semibold text-gray-900 text-right mb-3 mt-5">
        {question}
      </h3>
      <p className="text-sm font-medium text-gray-600 text-right leading-relaxed">
        {answer}
      </p>
    </article>
  );
};

const BackgroundDecoration: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-[rgba(255,161,142,0.1)] overflow-hidden pointer-events-none">
      {/* Decorative elements - simplified */}
      <div className="absolute top-36 right-40 w-12 h-12 rounded-full bg-coral-200 opacity-30" />
      <div className="absolute bottom-48 left-44 w-10 h-10 rounded-full bg-teal-200 opacity-30" />
    </div>
  );
};

const FAQSection: React.FC = () => {
  return (
    <section id="faq" className="relative w-full min-h-screen">
      {/* Background */}
      <BackgroundDecoration />
      <Container />
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-8 py-16">
        {/* Header */}
        <header className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            سؤالات پرتکرار
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            پاسخ‌های سریع برای سؤالاتی که ممکنه داشته باشید
          </p>
        </header>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {faqData.map((item, index) => (
            <FAQCard key={index} {...item} />
          ))}
        </div>

        {/* Footer */}
        <footer className="text-center">
          <p className="text-base text-gray-600 mb-6">سؤال دیگری دارید؟</p>
          <div className="flex items-center justify-center gap-4">
            {/* <a
              href="/contact"
              className="flex items-center gap-2 text-base text-gray-700 hover:text-teal-600 transition-colors cursor-pointer"
            >
              <span>مستندات کامل</span>
              <span>←</span>
            </a> */}
            <a
              href="/contact"
              className="flex items-center gap-2 text-base text-gray-700 hover:text-teal-600 transition-colors cursor-pointer"
            >
              <span>تماس با پشتیبانی</span>
              <span>←</span>
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
};
function Container() {
  return (
    <div className="absolute bg-[rgba(255,161,142,0.1)] h-[868px] left-0 overflow-clip top-[0.24px] w-[1431px]">
      <Faq_Icon0 />
      <Faq_Icon1 />
      <Faq_Icon2 />
      <Faq_Icon3 />
      <Faq_Icon4 />
    </div>
  );
}
export default FAQSection;
