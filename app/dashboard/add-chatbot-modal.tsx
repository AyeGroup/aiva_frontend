import React, { useState } from "react";
import { Dialog } from "@/components/dialog";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import {
  X,
  Plus,
  Globe,
  Palette,
  CheckCircle,
  MessageCircle,
  Trash2,
  HelpCircle,
} from "lucide-react";
import { toast } from "sonner";
import "@/styles/components.css";

interface QAPair {
  id: string;
  question: string;
  answer: string;
}

interface Website {
  id: string;
  name: string;
  url: string;
  color: string;
  qaData?: QAPair[];
}

interface AddChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (website: Omit<Website, "id">) => void;
}

export function AddChatbotModal({
  isOpen,
  onClose,
  onAdd,
}: AddChatbotModalProps) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [selectedColor, setSelectedColor] = useState("#65bcb6");
  const [qaData, setQAData] = useState<QAPair[]>([
    {
      id: "1",
      question: "ساعات کاری شما چیست?",
      answer: "ما هر روز از ساعت ۸ صبح تا ۱۰ شب آماده خدمات‌رسانی هستیم.",
    },
  ]);
  const [errors, setErrors] = useState<{
    name?: string;
    url?: string;
    qa?: string;
  }>({});

  // Prevent body scroll when modal is open - Hook must be called before any early returns
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [isOpen]);

  const colorOptions = [
    "#65bcb6", // brand primary
    "#FFA18E", // brand secondary
    "#b07cc6", // purple
    "#52d4a0", // emerald
    "#e67e7e", // coral
    "#f59e0b", // amber
    "#6366f1", // indigo
    "#dc2626", // crimson
    "#ea580c", // orange
    "#65a30d", // lime
    "#0891b2", // cyan
    "#db2777", // pink
    "#7c3aed", // violet
    "#0d9488", // teal
    "#e11d48", // rose
  ];

  const validateForm = () => {
    const newErrors: { name?: string; url?: string; qa?: string } = {};

    if (!name.trim()) {
      newErrors.name = "نام چت بات اجباری است";
    }

    if (!url.trim()) {
      newErrors.url = "آدرس وب‌سایت اجباری است";
    } else if (
      !/^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.([a-zA-Z]{2,}|[a-zA-Z]{2,}\.[a-zA-Z]{2,})$/.test(
        url.trim()
      )
    ) {
      newErrors.url = "فرمت آدرس صحیح نیست (مثال: example.com)";
    }

    // Validate QA data - at least one complete pair is required
    const validQAs = qaData.filter(
      (qa) => qa.question.trim() && qa.answer.trim()
    );
    if (validQAs.length === 0) {
      newErrors.qa = "حداقل یک جفت سوال و جواب کامل اجباری است";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onAdd({
        name: name.trim(),
        url: url.trim(),
        color: selectedColor,
        qaData: qaData.filter((qa) => qa.question.trim() && qa.answer.trim()),
      });

      // Show success toast
      toast.success("چت بات جدید با موفقیت ایجاد شد!", {
        description: `چت بات ${name.trim()} برای ${url.trim()} آماده است`,
        icon: <CheckCircle className="w-4 h-4" />,
        duration: 3000,
      });

      // Reset form
      setName("");
      setUrl("");
      setSelectedColor("#65bcb6");
      setQAData([
        {
          id: "1",
          question: "ساعات کاری شما چیست?",
          answer: "ما هر روز از ساعت ۸ صبح تا ۱۰ شب آماده خدمات‌رسانی هستیم.",
        },
      ]);
      setErrors({});
      onClose();
    }
  };

  const handleClose = () => {
    setName("");
    setUrl("");
    setSelectedColor("#65bcb6");
    setQAData([
      {
        id: "1",
        question: "ساعات کاری شما چیست?",
        answer: "ما هر روز از ساعت ۸ صبح تا ۱۰ شب آماده خدمات‌رسانی هستیم.",
      },
    ]);
    setErrors({});
    onClose();
  };

  const addQAPair = () => {
    const newQA: QAPair = {
      id: Date.now().toString(),
      question: "",
      answer: "",
    };
    setQAData((prev) => [...prev, newQA]);
  };

  const removeQAPair = (id: string) => {
    if (qaData.length > 1) {
      setQAData((prev) => prev.filter((qa) => qa.id !== id));
    }
  };

  const updateQAPair = (
    id: string,
    field: "question" | "answer",
    value: string
  ) => {
    setQAData((prev) =>
      prev.map((qa) => (qa.id === id ? { ...qa, [field]: value } : qa))
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center add-chatbot-modal"
      style={{ isolation: "isolate" }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm z-[9998]"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative add-chatbot-modal-content bg-white rounded-3xl p-8 max-w-lg w-full mx-4 shadow-2xl border border-grey-200 z-[9999]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center">
              <Plus className="w-6 h-6 text-brand-primary" />
            </div>
            <div>
              <h2 className="text-grey-900 font-semibold text-xl">
                افزودن چت بات هوشمند
              </h2>
              <p className="text-grey-500 text-sm">
                چت بات جدید با سوالات و پاسخ‌های اختصاصی ایجاد کنید
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-lg hover:bg-grey-100 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-grey-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div className={`space-y-2 form-field ${errors.name ? "error" : ""}`}>
            <Label
              htmlFor="chatbot-name"
              className="text-grey-700 font-medium flex items-center gap-2"
            >
              <Globe className="w-4 h-4" />
              نام چت بات
            </Label>
            <Input
              id="chatbot-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثال: فروشگاه آنلاین"
              className={`w-full p-3 rounded-xl border transition-colors text-right ${
                errors.name
                  ? "border-danger focus:border-danger"
                  : "border-grey-200 focus:border-brand-primary"
              }`}
            />
            {errors.name && (
              <p className="text-danger text-sm text-right">{errors.name}</p>
            )}
          </div>

          {/* URL Field */}
          <div className={`space-y-2 form-field ${errors.url ? "error" : ""}`}>
            <Label
              htmlFor="chatbot-url"
              className="text-grey-700 font-medium flex items-center gap-2"
            >
              <Globe className="w-4 h-4" />
              آدرس وب‌سایت
            </Label>
            <Input
              id="chatbot-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="example.com"
              className={`url-field w-full p-3 rounded-xl border transition-colors text-left ltr ${
                errors.url
                  ? "border-danger focus:border-danger"
                  : "border-grey-200 focus:border-brand-primary"
              }`}
              dir="ltr"
            />
            {errors.url && (
              <p className="text-danger text-sm text-right">{errors.url}</p>
            )}
          </div>

          {/* Color Selection */}
          <div className="space-y-3">
            <Label className="text-grey-700 font-medium flex items-center gap-2">
              <Palette className="w-4 h-4" />
              رنگ چت بات
            </Label>
            <div className="grid grid-cols-5 gap-3 color-grid">
              {colorOptions.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`w-12 h-12 rounded-xl transition-all duration-200 border-2 ${
                    selectedColor === color
                      ? "border-grey-900 scale-110 shadow-lg"
                      : "border-grey-200 hover:border-grey-300 hover:scale-105"
                  }`}
                  style={{ backgroundColor: color }}
                >
                  {selectedColor === color && (
                    <div className="w-full h-full rounded-lg flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full shadow-sm" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Q&A Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-grey-700 font-medium flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  سوالات و پاسخ‌های متداول
                </Label>
                <button
                  type="button"
                  onClick={addQAPair}
                  className="flex items-center gap-2 px-3 py-1.5 text-brand-primary hover:bg-brand-primary/5 rounded-lg transition-colors text-sm"
                >
                  <Plus className="w-4 h-4" />
                  افزودن سوال
                </button>
              </div>
              <p className="text-grey-500 text-xs">
                چت بات شما با این سوالات و پاسخ‌ها آموزش داده خواهد شد
              </p>
            </div>

            <div className="space-y-4 max-h-60 overflow-y-auto">
              {qaData.map((qa, index) => (
                <div
                  key={qa.id}
                  className="bg-grey-50 rounded-xl p-4 space-y-3 border border-grey-100"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-grey-600 text-sm font-medium">
                      سوال {index + 1}
                    </span>
                    {qaData.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeQAPair(qa.id)}
                        className="text-danger hover:bg-danger/10 rounded-lg p-1 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Input
                      value={qa.question}
                      onChange={(e) =>
                        updateQAPair(qa.id, "question", e.target.value)
                      }
                      placeholder="سوال مورد نظر را وارد کنید..."
                      className="w-full p-3 rounded-lg border border-grey-200 focus:border-brand-primary transition-colors text-right"
                    />

                    <textarea
                      value={qa.answer}
                      onChange={(e) =>
                        updateQAPair(qa.id, "answer", e.target.value)
                      }
                      placeholder="پاسخ مربوط به این سوال را وارد کنید..."
                      className="w-full p-3 rounded-lg border border-grey-200 focus:border-brand-primary transition-colors text-right resize-none h-20"
                    />
                  </div>
                </div>
              ))}
            </div>

            {errors.qa && (
              <p className="text-danger text-sm text-right">{errors.qa}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 form-actions">
            <Button
              type="button"
              onClick={handleClose}
              className="flex-1 bg-grey-100 text-grey-700 hover:bg-grey-200 rounded-xl py-3 font-medium transition-colors"
            >
              انصراف
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-brand-primary text-white hover:bg-brand-primary/90 rounded-xl py-3 font-medium transition-colors shadow-md hover:shadow-lg success-feedback"
            >
              ایجاد چت بات
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
