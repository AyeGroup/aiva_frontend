import { useState } from "react";
import { Modal } from "@/components/Modal/modal";
import { Dropdown } from "@/components/Dropdown/dropdown";
import { Slider } from "@/components/Slider/slider";
import { Tooltip } from "@/components/Tooltip/tooltip";
import { Toggle } from "@/components/Toggle/toggle";
import { Tabs } from "@/components/Tabs/tabs";
import { Accordion } from "@/components/Accordion/accordion";

export function ComponentsShowcase() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState("");
  const [sliderValue, setSliderValue] = useState(50);
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  const dropdownOptions = [
    {
      value: "react",
      label: "React",
      icon: <span className="text-sharp-cyan">⚛️</span>,
    },
    {
      value: "vue",
      label: "Vue.js",
      icon: <span className="text-sharp-emerald">🟢</span>,
    },
    {
      value: "angular",
      label: "Angular",
      icon: <span className="text-sharp-crimson">🔺</span>,
    },
    {
      value: "svelte",
      label: "Svelte",
      icon: <span className="text-sharp-orange">🧡</span>,
      disabled: true,
    },
  ];

  const tabItems = [
    {
      id: "overview",
      label: "نمای کلی",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
        </svg>
      ),
      content: (
        <div className="space-y-4">
          <h3 className="text-brand-primary">نمای کلی کامپوننت‌ها</h3>
          <p className="text-grey-600">
            این مجموعه‌ای از کامپوننت‌های کاملاً کاستوم است که بدون استفاده از
            هیچ UI Kit خارجی توسعه یافته‌اند.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-bg-soft-mint rounded-xl">
              <h4 className="text-brand-primary mb-2">ویژگی‌های کلیدی</h4>
              <ul className="text-body-small text-grey-600 space-y-1">
                <li>✅ TypeScript کامل</li>
                <li>✅ Accessibility کامل</li>
                <li>✅ Semantic HTML</li>
                <li>✅ RTL Support</li>
              </ul>
            </div>
            <div className="p-4 bg-bg-soft-peach rounded-xl">
              <h4 className="text-brand-secondary mb-2">Design System</h4>
              <ul className="text-body-small text-grey-600 space-y-1">
                <li>🎨 سیستم رنگی یکپارچه</li>
                <li>📐 Typography منسجم</li>
                <li>🔄 Component-based</li>
                <li>📱 Responsive Design</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "interactive",
      label: "تعاملی",
      badge: "5",
      content: (
        <div className="space-y-6">
          <h3 className="text-brand-primary">کامپوننت‌های تعاملی</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4>Modal و Dropdown</h4>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2 bg-brand-primary text-white rounded-xl hover:bg-brand-primary/90"
                >
                  باز کردن Modal
                </button>
                <Tooltip content="این یک tooltip نمونه است">
                  <button className="px-4 py-2 bg-brand-secondary text-white rounded-xl hover:bg-brand-secondary/90">
                    Tooltip
                  </button>
                </Tooltip>
              </div>
            </div>

            <div className="space-y-4">
              <Dropdown
                label="انتخاب فریمورک"
                options={dropdownOptions}
                value={dropdownValue}
                onChange={setDropdownValue}
                searchable
                clearable
                placeholder="فریمورک موردنظر را انتخاب کنید"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "controls",
      label: "کنترل‌ها",
      content: (
        <div className="space-y-6">
          <h3 className="text-brand-primary">کنترل‌های فرم</h3>

          <div className="space-y-6">
            <Slider
              label="تنظیم مقدار"
              min={0}
              max={100}
              value={sliderValue}
              onChange={setSliderValue}
              showValue
              unit="%"
              marks={[
                { value: 0, label: "کم" },
                { value: 50, label: "متوسط" },
                { value: 100, label: "زیاد" },
              ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Toggle
                label="اعلان‌های ایمیل"
                description="دریافت اعلان‌ها از طریق ایمیل"
                checked={toggle1}
                onChange={setToggle1}
              />

              <Toggle
                label="حالت تاریک"
                description="استفاده از تم تاریک"
                checked={toggle2}
                onChange={setToggle2}
                color="secondary"
                size="lg"
              />
            </div>
          </div>
        </div>
      ),
    },
  ];

  const accordionItems = [
    {
      id: "setup",
      title: "نصب و راه‌اندازی",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
      content: (
        <div className="space-y-3">
          <p>
            برای شروع کار با این کامپوننت‌ها، کافی است فایل‌های TypeScript را
            import کنید:
          </p>
          <pre className="bg-grey-100 p-3 rounded-lg text-body-small ltr text-left">
            {`import { Modal } from './components/Modal/modal';
import { Dropdown } from './components/Dropdown/dropdown';`}
          </pre>
        </div>
      ),
    },
    {
      id: "customization",
      title: "سفارشی‌سازی",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
      ),
      content: (
        <div className="space-y-3">
          <p>تمام کامپوننت‌ها قابلیت سفارشی‌سازی کاملی دارند:</p>
          <ul className="list-disc list-inside space-y-2 text-grey-600">
            <li>تغییر رنگ‌ها از طریق props</li>
            <li>اندازه‌های مختلف (sm, md, lg)</li>
            <li>حالت‌های مختلف (variants)</li>
            <li>قابلیت disable و error</li>
          </ul>
        </div>
      ),
    },
    {
      id: "accessibility",
      title: "دسترسی‌پذیری",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z" />
        </svg>
      ),
      content: (
        <div className="space-y-3">
          <p>همه کامپوننت‌ها استانداردهای دسترسی‌پذیری را رعایت می‌کنند:</p>
          <ul className="list-disc list-inside space-y-2 text-grey-600">
            <li>ARIA labels و roles</li>
            <li>Keyboard navigation</li>
            <li>Focus management</li>
            <li>Screen reader support</li>
            <li>High contrast support</li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-bg-app p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center space-y-4">
          <h1 className="text-brand-primary">نمایشگاه کامپوننت‌های کاستوم</h1>
          <p className="text-grey-600 max-w-2xl mx-auto">
            مجموعه‌ای کامل از کامپوننت‌های React کاستوم که بدون استفاده از هیچ
            UI Kit خارجی طراحی شده‌اند. تمام کامپوننت‌ها از TypeScript،
            Accessibility و Design System یکپارچه استفاده می‌کنند.
          </p>
        </header>

        {/* Main Content */}
        <main className="space-y-8">
          {/* Tabs Section */}
          <section className="bg-bg-surface rounded-2xl p-6 shadow-card">
            <Tabs
              tabs={tabItems}
              activeTab={activeTab}
              onChange={setActiveTab}
              variant="pills"
              fullWidth
            />
          </section>

          {/* Accordion Section */}
          <section className="bg-bg-surface rounded-2xl p-6 shadow-card">
            <h2 className="text-brand-primary mb-6">سوالات متداول</h2>
            <Accordion
              items={accordionItems}
              variant="separated"
              allowMultiple
            />
          </section>

          {/* Color Showcase */}
          <section className="bg-bg-surface rounded-2xl p-6 shadow-card">
            <h2 className="text-brand-primary mb-6">پالت رنگی</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {[
                { name: "Primary", class: "bg-brand-primary" },
                { name: "Secondary", class: "bg-brand-secondary" },
                { name: "Accent", class: "bg-brand-accent" },
                { name: "Coral", class: "bg-brand-coral" },
                { name: "Emerald", class: "bg-brand-emerald" },
                { name: "Amber", class: "bg-brand-amber" },
                { name: "Indigo", class: "bg-brand-indigo" },
                { name: "Purple", class: "bg-brand-purple" },
              ].map((color) => (
                <Tooltip key={color.name} content={color.name}>
                  <div className="space-y-2 cursor-pointer">
                    <div
                      className={`w-full h-16 rounded-xl ${color.class} shadow-sm`}
                    />
                    <p className="text-caption text-grey-600 text-center">
                      {color.name}
                    </p>
                  </div>
                </Tooltip>
              ))}
            </div>
          </section>
        </main>

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="نمونه Modal"
          size="md"
        >
          <div className="space-y-4">
            <p>
              این یک مودال نمونه است که با کامپوننت کاملاً کاستوم ایجاد شده.
            </p>
            <div className="space-y-3">
              <h4 className="text-brand-primary">ویژگی‌های Modal:</h4>
              <ul className="list-disc list-inside space-y-1 text-grey-600">
                <li>Focus management اتوماتیک</li>
                <li>بستن با کلید Escape</li>
                <li>بستن با کلیک روی backdrop</li>
                <li>اندازه‌های مختلف</li>
                <li>Keyboard navigation</li>
              </ul>
            </div>
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-brand-primary text-white rounded-xl hover:bg-brand-primary/90"
              >
                بستن
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-border-soft rounded-xl hover:bg-grey-50"
              >
                انصراف
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
