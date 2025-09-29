import React, { memo } from 'react';
// import aivaLogo from "/logo.png"

export const Footer = memo(function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = {
    product: {
      title: 'محصول',
      links: [
        { title: 'ویژگی‌ها', href: '#features' },
        { title: 'قیمت‌گذاری', href: '#pricing' },
        { title: 'امنیت', href: '#security' },
        { title: 'آپدیت‌ها', href: '/changelog' }
      ]
    },
    resources: {
      title: 'منابع',
      links: [
        { title: 'مستندات', href: '/docs' },
        { title: 'راهنمای API', href: '/api-docs' },
        { title: 'وضعیت سرویس', href: '/status' },
        { title: 'وبلاگ', href: '/blog' }
      ]
    },
    support: {
      title: 'پشتیبانی',
      links: [
        { title: 'مرکز راهنمایی', href: '/help' },
        { title: 'تماس با ما', href: '/contact' },
        { title: 'گزارش مشکل', href: '/report' },
        { title: 'درخواست ویژگی', href: '/feature-request' }
      ]
    },
    legal: {
      title: 'حقوقی',
      links: [
        { title: 'شرایط استفاده', href: '/terms' },
        { title: 'حریم خصوصی', href: '/privacy' },
        { title: 'قرارداد پردازش داده', href: '/dpa' },
        { title: 'کوکی‌ها', href: '/cookies' }
      ]
    }
  };

  return (
    <footer className="bg-card border-t border-border" role="contentinfo">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* برند و توضیح */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo.png"
                // src={aivaLogo}
                alt="لوگوی آیوا"
                className="w-8 h-8 object-cover"
              />
              <span className="font-medium text-lg">آیوا</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 text-right">
              دستیار هوشمند برای هر وب‌سایتی. پاسخ دقیق، فروش بیشتر.
            </p>

            {/* شبکه‌های اجتماعی */}
            <div className="flex items-center gap-4">
              <a
                href="https://twitter.com/aiwa"
                title="آیوا در توییتر"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="دنبال کردن آیوا در توییتر"
              >
                <span className="text-xl">🐦</span>
              </a>
              <a
                href="https://linkedin.com/company/aiwa"
                title="آیوا در لینکدین"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="دنبال کردن آیوا در لینکدین"
              >
                <span className="text-xl">💼</span>
              </a>
              <a
                href="https://github.com/aiwa"
                title="آیوا در گیت‌هاب"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="مشاهده پروژه‌های آیوا در گیت‌هاب"
              >
                <span className="text-xl">👨‍💻</span>
              </a>
            </div>
          </div>

          {/* لینک‌های فوتر */}
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key}>
              <h3 className="font-medium mb-4 text-right">{section.title}</h3>
              <nav>
                <ul className="space-y-3">
                  {section.links.map((link, index) => (
                    <li key={index} className="text-right">
                      <a
                        href={link.href}
                        title={link.title}
                        className="text-muted-foreground hover:text-primary transition-colors text-sm text-right"
                      >
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          ))}
        </div>

        {/* خط جداکننده */}
        <div className="border-t border-border my-8"></div>

        {/* حقوق کپی رایت */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div>© {currentYear} آیوا. تمامی حقوق محفوظ است.</div>

          <div className="flex items-center gap-6">
            <span>ساخته شده با ❤️ در ایران</span>
            <a
              href="/status"
              title="وضعیت سرویس آیوا"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>همه سیستم‌ها عملیاتی</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
});