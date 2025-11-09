import Container from "./Container-icons";
import { Instagram, Send, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <div className="relative w-full bg-gray-900" style={{ height: "381px" }}>
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <Container />
      </div>

      {/* Footer Content */}
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="w-full max-w-[1431px] mx-auto px-16 py-12">
          <div className="grid grid-cols-5 gap-8">
            {/* محصول */}
            <div className="col-span-1">
              <h3 className="text-white font-semibold mb-4 text-right" dir="rtl">محصول</h3>
              <ul className="space-y-3 text-right">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm" dir="rtl">ویژگی‌ها</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm" dir="rtl">قیمت‌گذاری</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm" dir="rtl">نمونه‌کارها</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm" dir="rtl">آموزش‌ها</a></li>
              </ul>
            </div>

            {/* منابع */}
            <div className="col-span-1">
              <h3 className="text-white font-semibold mb-4 text-right" dir="rtl">منابع</h3>
              <ul className="space-y-3 text-right">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm" dir="rtl">مستندات</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm" dir="rtl">راهنما</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm" dir="rtl">وبلاگ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm" dir="rtl">API</a></li>
              </ul>
            </div>

            {/* شرکت */}
            <div className="col-span-1">
              <h3 className="text-white font-semibold mb-4 text-right" dir="rtl">شرکت</h3>
              <ul className="space-y-3 text-right">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm" dir="rtl">درباره ما</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm" dir="rtl">تماس با ما</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm" dir="rtl">فرصت‌های شغلی</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm" dir="rtl">حریم خصوصی</a></li>
              </ul>
            </div>

            {/* پشتیبانی */}
            <div className="col-span-1">
              <h3 className="text-white font-semibold mb-4 text-right" dir="rtl">پشتیبانی</h3>
              <ul className="space-y-3 text-right">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm" dir="rtl">راهنمای استفاده</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm" dir="rtl">سوالات متداول</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm" dir="rtl">تیکت پشتیبانی</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm" dir="rtl">وضعیت سرویس</a></li>
              </ul>
            </div>

            {/* Logo & Description */}
            <div className="col-span-1 text-right">
              <div className="flex items-center gap-2 mb-4 flex-row-reverse justify-start">
                <div className="w-8 h-8 bg-gradient-to-br from-[#65BCB6] to-[#4460F7] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">آ</span>
                </div>
                <span className="text-white font-semibold text-xl" dir="rtl">آیوا</span>
              </div>
              <p className="text-gray-400 text-sm leading-6 text-right" dir="rtl">
                هوشمندترین چت‌بات برای کسب‌وکار شما
              </p>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 pt-8 border-t border-gray-800 flex items-center justify-between">
            <p className="text-gray-500 text-sm" dir="rtl">
              © ۲۰۲۴ آیوا. تمامی حقوق محفوظ است.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors flex items-center justify-center">
                <Instagram className="w-5 h-5 text-gray-400" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors flex items-center justify-center">
                <Send className="w-5 h-5 text-gray-400" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors flex items-center justify-center">
                <Linkedin className="w-5 h-5 text-gray-400" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors flex items-center justify-center">
                <Twitter className="w-5 h-5 text-gray-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
