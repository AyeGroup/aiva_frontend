import { useState } from "react";
import { BotConfig } from "../page";
import { Card } from "@/components/card";
import { Button } from "@/components/button";
import {
  Copy,
  Download,
  Globe,
  Code,
  CheckCircle2,
  ExternalLink,
  Settings,
  BarChart3,
} from "lucide-react";

import { PageType } from "@/types/common";

interface WizardStep5Props {
  botConfig: BotConfig;
  onNavigate: (page: PageType) => void;
}

export function WizardStep5({ botConfig, onNavigate }: WizardStep5Props) {
  const [copied, setCopied] = useState(false);
  const [deploymentMethod, setDeploymentMethod] = useState<
    "script" | "wordpress" | "shopify"
  >("script");

  const generateEmbedCode = () => {
    const config = {
      botId: `aiva_${Date.now()}`,
      name: botConfig.name,
      color: botConfig.color,
      position: botConfig.branding.position,
      size: botConfig.branding.size,
      welcomeMessage: botConfig.welcomeMessage,
      fallbackMessage: botConfig.fallbackMessage,
      language: botConfig.language,
      tone: botConfig.tone,
      knowledge: botConfig.knowledge.length,
    };

    return `<!-- Aiva Chatbot Integration -->
<script>
  window.AivaConfig = ${JSON.stringify(config, null, 2)};
  (function() {
    var script = document.createElement('script');
    script.src = 'https://cdn.aiva.ai/widget/v1/aiva-widget.js';
    script.async = true;
    document.head.appendChild(script);
  })();
</script>
<!-- End Aiva Chatbot Integration -->`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateEmbedCode());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const downloadConfig = () => {
    const config = {
      botConfig,
      embedCode: generateEmbedCode(),
      createdAt: new Date().toISOString(),
      version: "1.0.0",
    };

    const blob = new Blob([JSON.stringify(config, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `aiva-bot-${botConfig.name.replace(/\s+/g, "-")}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getInstructions = () => {
    switch (deploymentMethod) {
      case "wordpress":
        return {
          title: "WordPress",
          steps: [
            "وارد پنل مدیریت WordPress خود شوید",
            "به بخش Appearance > Theme Editor بروید",
            "فایل functions.php یا header.php را انتخاب کنید",
            "کد را قبل از تگ </head> قرار دهید",
            "تغییرات را ذخیره کنید",
          ],
        };
      case "shopify":
        return {
          title: "Shopify",
          steps: [
            "به Admin panel فروشگاه Shopify خود بروید",
            "از منو Online Store > Themes را انتخاب کنید",
            "روی Actions > Edit code کلیک کنید",
            "فایل theme.liquid را باز کنید",
            "کد را قبل از </head> قرار دهید و ذخیره کنید",
          ],
        };
      default:
        return {
          title: "HTML/JavaScript",
          steps: [
            "کد را کپی کنید",
            "فایل HTML سایت خود را باز کنید",
            "کد را در بخش <head> یا قبل از </body> قرار دهید",
            "فایل را ذخیره و آپلود کنید",
            "سایت خود را بررسی کنید",
          ],
        };
    }
  };

  const instructions = getInstructions();

  return (
    <div
      className="space-y-8 bg-bg-surface px-[20px] py-[16px] border-2 border-brand-primary/20 rounded-xl shadow-lg pt-[8px] pr-[20px] pb-[16px] pl-[20px]"
      dir="rtl"
    >
      {/* Header */}
      <div className="flex items-start gap-4 px-[0px] py-[12px]">
        <div className="w-16 h-16 bg-success/10 rounded-xl flex items-center justify-center flex-shrink-0">
          <CheckCircle2 className="w-8 h-8 text-success" />
        </div>
        <div className="flex-1">
          <h2 className="text-grey-900 mb-2 text-right text-[24px] font-bold">
            تبریک! آیوا آماده است 🎉
          </h2>
          <p className="text-grey-600 text-right">
            چت‌بات شما با موفقیت ساخته شد و آماده نصب در سایت است
          </p>

          <div className="bg-gradient-to-l from-success/5 to-brand-secondary/5 rounded-2xl p-4 border border-success/20 mt-6">
            <div className="flex items-center gap-3">
              <svg
                className="w-6 h-6 text-success"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-success font-medium">
                همه چیز آماده! حالا وقت نصب است
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bot Summary */}
      <Card className="p-6 bg-gradient-to-br from-bg-soft-mint to-bg-soft-rose">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-grey-900 mb-4">خلاصه تنظیمات</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-grey-600">نام دستیار:</span>
                <span className="text-grey-900 font-medium">
                  {botConfig.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-grey-600">زبان:</span>
                <span className="text-grey-900 font-medium">فارسی</span>
              </div>
              <div className="flex justify-between">
                <span className="text-grey-600">تعداد منابع دانش:</span>
                <span className="text-grey-900 font-medium">
                  {botConfig.knowledge.length} مورد
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-grey-600">موقعیت نمایش:</span>
                <span className="text-grey-900 font-medium">
                  {botConfig.branding.position === "bottom-right"
                    ? "پایین راست"
                    : "پایین چپ"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="w-24 h-24 bg-white rounded-xl shadow-md flex items-center justify-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl"
                  style={{ backgroundColor: botConfig.color }}
                >
                  {botConfig.name.charAt(0)}
                </div>
              </div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-success rounded-full border-2 border-white"></div>
            </div>
          </div>
        </div>
      </Card>

      {/* Deployment Options */}
      <Card className="p-6">
        <h3 className="text-grey-900 mb-6 flex items-center gap-2">
          <Code className="w-5 h-5 text-brand-primary" />
          نصب در سایت
        </h3>

        {/* Method Selection */}
        <div className="grid md:grid-cols-3 gap-3 mb-6">
          {[
            {
              id: "script",
              title: "HTML/JavaScript",
              desc: "برای اکثر سایت‌ها",
              icon: Globe,
            },
            {
              id: "wordpress",
              title: "WordPress",
              desc: "پلاگین اختصاصی",
              icon: Globe,
            },
            {
              id: "shopify",
              title: "Shopify",
              desc: "فروشگاه آنلاین",
              icon: Globe,
            },
          ].map((method) => {
            const IconComponent = method.icon;
            return (
              <button
                key={method.id}
                onClick={() => setDeploymentMethod(method.id as any)}
                className={`p-4 rounded-lg border-2 transition-all text-center ${
                  deploymentMethod === method.id
                    ? "border-brand-primary bg-bg-soft-rose"
                    : "border-border-soft hover:border-brand-primary/50"
                }`}
              >
                <IconComponent className="w-6 h-6 mx-auto mb-2 text-brand-primary" />
                <h4 className="text-grey-900 mb-1">{method.title}</h4>
                <p className="text-grey-600 text-body-small">{method.desc}</p>
              </button>
            );
          })}
        </div>

        {/* Code Section */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-grey-900 mb-3">کد نصب</h4>
            <div className="relative">
              <pre className="bg-grey-900 text-white p-4 rounded-lg overflow-x-auto text-sm leading-relaxed max-h-64">
                <code className="ltr text-left">{generateEmbedCode()}</code>
              </pre>

              <div className="absolute top-3 left-3 flex gap-2">
                <Button
                  // variant="tertiary"
                  size="sm"
                  onClick={copyToClipboard}
                  title="کپی کردن کد نصب"
                  className="bg-white/10 text-white hover:bg-white/20"
                >
                  {copied ? (
                    <CheckCircle2 className="w-4 h-4 ml-1 text-success" />
                  ) : (
                    <Copy className="w-4 h-4 ml-1" />
                  )}
                  {copied ? "کپی شد!" : "کپی"}
                </Button>

                <Button
                  // variant="tertiary"
                  size="sm"
                  onClick={downloadConfig}
                  title="دانلود فایل تنظیمات"
                  className="bg-white/10 text-white hover:bg-white/20"
                >
                  <Download className="w-4 h-4 ml-1" />
                  دانلود
                </Button>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-grey-900 mb-3">
              راهنمای نصب - {instructions.title}
            </h4>
            <ol className="space-y-2">
              {instructions.steps.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-brand-primary text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-grey-700 text-body-small">{step}</span>
                </li>
              ))}
            </ol>

            <div className="mt-6 p-4 bg-brand-tertiary/10 border border-brand-tertiary/20 rounded-lg">
              <p className="text-brand-tertiary text-body-small">
                💡 نکته: پس از نصب، ممکن است تا ۱۰ دقیقه طول بکشد تا دستیار در
                سایت شما فعال شود.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Next Steps */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-grey-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-brand-secondary" />
            مرحله بعد
          </h3>
          <p className="text-grey-600 mb-4 text-body-small">
            با رفتن به داشبورد می‌توانید عملکرد دستیار را مشاهده و تنظیمات را
            بهبود دهید.
          </p>
          <Button
            // variant="primary"
            // size="md"
            onClick={() => onNavigate("dashboard")}
            title="ورود به داشبورد مدیریت"
            className="w-full"
          >
            رفتن به داشبورد
          </Button>
        </Card>

        <Card className="p-6">
          <h3 className="text-grey-900 mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-brand-tertiary" />
            تنظیمات بیشتر
          </h3>
          <p className="text-grey-600 mb-4 text-body-small">
            بعداً می‌توانید تنظیمات دستیار را تغییر دهید، دانش جدید اضافه کنید و
            عملکرد را بهبود دهید.
          </p>
          <div className="space-y-2">
            <Button
              // variant="tertiary"
              size="sm"
              title="مشاهده راهنمای کامل"
              className="w-full"
            >
              <ExternalLink className="w-4 h-4 ml-2" />
              راهنمای کامل
            </Button>
            <Button
              // variant="tertiary"
              size="sm"
              title="تماس با تیم پشتیبانی"
              className="w-full"
            >
              تماس با پشتیبانی
            </Button>
          </div>
        </Card>
      </div>

      {/* Success Animation */}
      <div className="text-center py-8">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-success/10 border border-success/20 rounded-full">
          <CheckCircle2 className="w-5 h-5 text-success" />
          <span className="text-success font-medium">
            آیوا با موفقیت راه‌اندازی شد!
          </span>
        </div>
      </div>
    </div>
  );
}
