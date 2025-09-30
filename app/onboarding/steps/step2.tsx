import { useState } from "react";
import { BotConfig } from "../onboarding";
import { onboardingData } from "../onboarding.data";
import { Card } from "@/components/Card";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import {
  Plus,
  FileText,
  Link,
  HelpCircle,
  Type,
  Trash2,
  Upload,
} from "lucide-react";

interface WizardStep2Props {
  botConfig: BotConfig;
  updateConfig: (updates: Partial<BotConfig>) => void;
}

interface KnowledgeItem {
  id: string;
  type: "faq" | "document" | "url" | "text";
  title: string;
  content?: string;
  url?: string;
}

export function WizardStep2({ botConfig, updateConfig }: WizardStep2Props) {
  const [selectedType, setSelectedType] = useState<string>("");
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState<Partial<KnowledgeItem>>({});

  const getIcon = (type: string) => {
    switch (type) {
      case "faq":
        return HelpCircle;
      case "document":
        return FileText;
      case "url":
        return Link;
      case "text":
        return Type;
      default:
        return Type;
    }
  };

  const startAdding = (type: string) => {
    setSelectedType(type);
    setIsAdding(true);
    // setNewItem({ type: type as any, title: '', content: '' });
    //elham
  };

  const cancelAdding = () => {
    setIsAdding(false);
    setSelectedType("");
    setNewItem({});
  };

  const saveItem = () => {
    if (newItem.title && (newItem.content || newItem.url)) {
      const item: KnowledgeItem = {
        id: Date.now().toString(),
        type: newItem.type as any,
        title: newItem.title,
        content: newItem.content,
        url: newItem.url,
      };

      updateConfig({
        knowledge: [...botConfig.knowledge, item],
      });

      cancelAdding();
    }
  };

  const removeItem = (id: string) => {
    updateConfig({
      knowledge: botConfig.knowledge.filter((item) => item.id !== id),
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file and get content
      setNewItem((prev) => ({
        ...prev,
        title: file.name,
        content: `محتوای فایل ${file.name} (در نسخه واقعی، محتوا از فایل استخراج می‌شود)`,
      }));
    }
  };

  return (
    <div
      className="space-y-8 bg-bg-surface px-[20px] py-[16px] border-2 border-brand-primary/20 rounded-xl shadow-lg pt-[8px] pr-[20px] pb-[16px] pl-[20px]"
      dir="rtl"
    >
      {/* Header */}
      <div className="flex items-start gap-4 px-[0px] py-[12px]">
        <div className="w-16 h-16 bg-brand-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
          <svg
            className="w-8 h-8 text-brand-primary"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex-1">
          <h2 className="text-grey-900 mb-2 text-right text-[24px] font-bold">
            پایگاه دانش دستیار
          </h2>
          <p className="text-grey-600 text-right">
            اطلاعات و محتوای کسب‌وکار خود را برای پاسخ‌های دقیق‌تر اضافه کنید
          </p>
        </div>
      </div>

      {/* Sample Questions Section */}
      <div className="space-y-4 mb-8"></div>

      {/* Knowledge Type Selection */}
      {!isAdding && (
        <div className="bg-bg-soft-mint border-2 border-brand-primary/20 rounded-xl p-6 mb-8">
          <h3 className="text-grey-900 mb-6 flex items-center gap-3">
            <div className="w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center">
              <span className="text-white text-sm">📚</span>
            </div>
            انواع محتوای قابل اضافه
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {onboardingData.knowledgeTypes.map((type) => {
              const IconComponent = getIcon(type.id);

              return (
                <Card
                  key={type.id}
                  className="p-6 cursor-pointer border-2 border-brand-primary/30 bg-bg-surface hover:border-brand-primary hover:shadow-lg group"
                  onClick={() => startAdding(type.id)}
                >
                  <div className="text-right">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center">
                        <IconComponent className="w-7 h-7 text-brand-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-grey-900 mb-1">آدرس وب</h3>
                        <p className="text-grey-600 text-body-small">
                          صفحات سایت یا منابع آنلاین
                        </p>
                      </div>
                    </div>

                    <div className="bg-brand-primary/5 rounded-xl p-4 border border-brand-primary/20">
                      <div className="flex items-center justify-between">
                        <span className="text-grey-700 text-sm">شروع کنید</span>
                        <div className="flex items-center gap-2 text-brand-primary">
                          <Plus className="w-4 h-4" />
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Add New Item Form */}
      {isAdding && (
        <Card className="p-6 border-2 border-brand-primary/30 bg-bg-soft-mint shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-grey-900">
              {
                onboardingData.knowledgeTypes.find((t) => t.id === selectedType)
                  ?.title
              }
            </h3>
            <Button
              // variant="tertiary"
              // size="small"
              onClick={cancelAdding}
            >
              انصراف
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-grey-900 mb-2 text-right">
                سؤال
                <span className="text-brand-primary mr-1">*</span>
              </label>
              <Input
                type="text"
                value={newItem.title || ""}
                onChange={(e) =>
                  setNewItem((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="عنوان مناسب برای این محتوا"
                className="w-full"
              />
            </div>

            {selectedType === "faq" && (
              <div>
                {/* سوالات پیشنهادی */}

                <label className="block text-grey-900 mb-2 text-right">
                  سؤال و پاسخ
                  <span className="text-brand-primary mr-1">*</span>
                </label>
                <textarea
                  value={newItem.content || ""}
                  onChange={(e) =>
                    setNewItem((prev) => ({ ...prev, content: e.target.value }))
                  }
                  placeholder="سؤال: محصولات شما چه هستند؟
پاسخ: ما انواع مختلفی از محصولات ارائه می‌دهیم شامل..."
                  rows={6}
                  className="w-full px-4 py-3 border border-border-soft rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors resize-none"
                />

                {/* سوالات پیشنهادی */}
                <div className="mt-4">
                  <p className="text-grey-700 mb-3 text-body-small text-right text-[14px]">
                    سوالات پیشنهادی
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {onboardingData.sampleQuestions
                      .slice(0, -2)
                      .map((question, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => {
                            setNewItem((prev) => ({
                              ...prev,
                              title: question,
                              content: `سؤال: ${question}\nپاسخ: [پاسخ خود را اینجا بنویسید]`,
                            }));
                          }}
                          className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-full border border-grey-200 hover:bg-brand-primary hover:text-white hover:border-brand-primary text-grey-700 text-body-small group"
                        >
                          <svg
                            className="w-3 h-3 text-brand-primary group-hover:text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          <span className="text-[13px] leading-tight">
                            {question}
                          </span>
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {selectedType === "text" && (
              <div>
                <label className="block text-grey-900 mb-2">
                  محتوا
                  <span className="text-brand-primary mr-1">*</span>
                </label>
                <textarea
                  value={newItem.content || ""}
                  onChange={(e) =>
                    setNewItem((prev) => ({ ...prev, content: e.target.value }))
                  }
                  placeholder="اطلاعات مفصل درباره کسب‌وکار، محصولات، خدمات یا سایر موضوعات مرتبط..."
                  rows={8}
                  className="w-full px-4 py-3 border border-border-soft rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors resize-none"
                />
              </div>
            )}

            {selectedType === "url" && (
              <div>
                <label className="block text-grey-900 mb-2">
                  آدرس وب
                  <span className="text-brand-primary mr-1">*</span>
                </label>
                <Input
                  type="url"
                  value={newItem.url || ""}
                  onChange={(e) =>
                    setNewItem((prev) => ({ ...prev, url: e.target.value }))
                  }
                  placeholder="https://example.com/about"
                  className="w-full"
                />
                <p className="text-grey-500 mt-2 text-body-small">
                  محتوای این صفحه به‌صورت خودکار استخراج و به دانش دستیار اضافه
                  خواهد شد
                </p>
              </div>
            )}

            {selectedType === "document" && (
              <div>
                <label className="block text-grey-900 mb-2">آپلود فایل</label>
                <div className="border-2 border-dashed border-grey-300 rounded-lg p-8 text-center">
                  <Upload className="w-8 h-8 text-grey-400 mx-auto mb-4" />
                  <p className="text-grey-600 mb-4">
                    فایل خود را اینجا بکشید یا کلیک کنید
                  </p>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,.txt"
                    className="hidden"
                    id="file-upload"
                  />
                  <Button
                    variant="secondary"
                    // size="small"
                    onClick={() =>
                      document.getElementById("file-upload")?.click()
                    }
                  >
                    انتخاب فایل
                  </Button>
                  <p className="text-grey-500 mt-2 text-body-small">
                    پشتیبانی از فرمت‌های PDF، Word و متن ساده
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-6 mt-8 pt-6 border-t border-border-soft">
            <Button
              // variant="tertiary"
              onClick={cancelAdding}
              className="px-8 py-3 min-w-[120px]"
            >
              انصراف
            </Button>
            <Button
              // variant="primary"
              onClick={saveItem}
              disabled={!newItem.title || (!newItem.content && !newItem.url)}
              className="px-12 py-3 min-w-[160px] shadow-lg hover:shadow-xl"
            >
              ذخیره سؤال
            </Button>
          </div>
        </Card>
      )}

      {/* Existing Knowledge Items */}
      {botConfig.knowledge.length > 0 && (
        <div className="bg-bg-soft-teal border-2 border-brand-primary/20 rounded-xl p-6 space-y-4">
          <h3 className="text-grey-900 flex items-center gap-3">
            <div className="w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center">
              <span className="text-white text-sm">✅</span>
            </div>
            دانش اضافه شده ({botConfig.knowledge.length})
          </h3>

          <div className="space-y-3">
            {botConfig.knowledge.map((item) => {
              const IconComponent = getIcon(item.type);

              return (
                <Card
                  key={item.id}
                  className="p-4 border-2 border-brand-primary/10 bg-bg-surface shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 border border-brand-primary/20">
                        <IconComponent className="w-4 h-4 text-brand-primary" />
                      </div>

                      <div className="flex-1 min-w-0 text-right">
                        <h4 className="text-grey-900 mb-1">{item.title}</h4>

                        {item.content && (
                          <p className="text-grey-500 text-body-small truncate">
                            {item.content.length > 100
                              ? `${item.content.substring(0, 100)}...`
                              : item.content}
                          </p>
                        )}
                        {item.url && (
                          <p className="text-brand-primary text-body-small truncate">
                            {item.url}
                          </p>
                        )}
                      </div>
                    </div>

                    <Button
                      // variant="tertiary"
                      // size="small"
                      onClick={() => removeItem(item.id)}
                      className="text-danger hover:bg-danger/10 flex-shrink-0 border border-danger/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {botConfig.knowledge.length === 0 && !isAdding && (
        <Card className="p-8 text-center border-2 border-dashed border-brand-primary/30 bg-bg-soft-mint">
          <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-brand-primary/20">
            <FileText className="w-8 h-8 text-brand-primary" />
          </div>
          <h3 className="text-grey-900 mb-2">هنوز دانشی اضافه نشده است</h3>
          <p className="text-grey-600 max-w-md mx-auto mb-6">
            برای شروع، یکی از انواع محتوا را انتخاب کنید و اطلاعات مربوط به
            کسب‌وکار خود را اضافه کنید
          </p>
        </Card>
      )}

      {/* Tips */}
      <Card className="p-6 bg-bg-soft-peach border-2 border-brand-secondary/30 shadow-lg">
        <h4 className="text-grey-900 mb-3 flex items-center gap-2">
          <div className="w-6 h-6 bg-brand-secondary rounded-full flex items-center justify-center border border-brand-secondary/20">
            <span className="text-white text-sm">💡</span>
          </div>
          نکات مفید
        </h4>
        <ul className="space-y-2 text-grey-700 text-body-small">
          <li className="flex items-start gap-2 p-2 bg-bg-surface rounded-lg border border-brand-secondary/10">
            <span className="text-brand-secondary">•</span>
            هرچه اطلاعات بیشتری اضافه کنید، دستیار پاسخ‌های دقیق‌تری می‌دهد
          </li>
          <li className="flex items-start gap-2 p-2 bg-bg-surface rounded-lg border border-brand-secondary/10">
            <span className="text-brand-secondary">•</span>
            سؤالات متداول مشتریان را حتماً اضافه کنید
          </li>
          <li className="flex items-start gap-2 p-2 bg-bg-surface rounded-lg border border-brand-secondary/10">
            <span className="text-brand-secondary">•</span>
            می‌توانید بعد از راه‌اندازی نیز اطلاعات جدید اضافه کنید
          </li>
        </ul>
      </Card>
    </div>
  );
}
