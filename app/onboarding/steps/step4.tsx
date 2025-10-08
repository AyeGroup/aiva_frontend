import { useState } from "react";
// import { BotConfig } from "../page";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { HelpCircle, Plus, Trash2, Edit3, Save, X } from "lucide-react";
import { BotConfig } from "@/types/common";

interface WizardStep4Props {
  botConfig: BotConfig;
  updateConfig: (updates: Partial<BotConfig>) => void;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  isEditing?: boolean;
}

export function WizardStep4({ botConfig, updateConfig }: WizardStep4Props) {
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: "1",
      question: "ساعات کاری شما چیست؟",
      answer: "ما از ساعت ۹ صبح تا ۶ بعدازظهر همه روزه در خدمت شما هستیم.",
    },
    {
      id: "2",
      question: "چگونه می‌توانم سفارش دهم؟",
      answer:
        "می‌توانید از طریق سایت، تلفن یا حضور در فروشگاه سفارش خود را ثبت کنید.",
    },
  ]);

  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });

  const suggestedQuestions = [
    "محصولات شما چه هستند؟",
    "هزینه ارسال چقدر است؟",
    "آیا تخفیف ویژه دارید؟",
    "چگونه با شما تماس بگیرم؟",
    "آیا گارانتی دارید؟",
    "مدت زمان ارسال چقدر است؟",
    "آیا پرداخت اقساطی دارید؟",
    "چگونه مرجوع کنم؟",
  ];

  const addFaq = () => {
    if (newFaq.question.trim() && newFaq.answer.trim()) {
      const faq: FAQ = {
        id: Date.now().toString(),
        question: newFaq.question.trim(),
        answer: newFaq.answer.trim(),
      };

      const updatedFaqs = [...faqs, faq];
      setFaqs(updatedFaqs);
      setNewFaq({ question: "", answer: "" });

      // Update bot config
    //  elham
      // updateConfig({
      //   knowledge: [
      //     ...botConfig.knowledge.filter((item) => item.type !== "faq"),
      //     ...updatedFaqs.map((faq) => ({
      //       id: faq.id,
      //       type: "faq" as const,
      //       title: faq.question,
      //       content: faq.answer,
      //     })),
      //   ],
      // });
    }
  };

  const deleteFaq = (id: string) => {
    const updatedFaqs = faqs.filter((faq) => faq.id !== id);
    setFaqs(updatedFaqs);

    // Update bot config
    // elham
    // updateConfig({
    //   knowledge: [
    //     ...botConfig.knowledge.filter((item) => item.type !== "faq"),
    //     ...updatedFaqs.map((faq) => ({
    //       id: faq.id,
    //       type: "faq" as const,
    //       title: faq.question,
    //       content: faq.answer,
    //     })),
    //   ],
    // });
  };

  const startEdit = (id: string) => {
    setFaqs(
      faqs.map((faq) => (faq.id === id ? { ...faq, isEditing: true } : faq))
    );
  };

  const saveEdit = (id: string, question: string, answer: string) => {
    const updatedFaqs = faqs.map((faq) =>
      faq.id === id
        ? {
            ...faq,
            question: question.trim(),
            answer: answer.trim(),
            isEditing: false,
          }
        : faq
    );
    setFaqs(updatedFaqs);

    // Update bot config
  // elham
    // updateConfig({
    //   knowledge: [
    //     ...botConfig.knowledge.filter((item) => item.type !== "faq"),
    //     ...updatedFaqs.map((faq) => ({
    //       id: faq.id,
    //       type: "faq" as const,
    //       title: faq.question,
    //       content: faq.answer,
    //     })),
    //   ],
    // });
  };

  const cancelEdit = (id: string) => {
    setFaqs(
      faqs.map((faq) => (faq.id === id ? { ...faq, isEditing: false } : faq))
    );
  };

  const addSuggestedQuestion = (question: string) => {
    setNewFaq({ ...newFaq, question });
  };

  return (
    <div className="space-y-8 bg-bg-surface px-[20px] py-[16px] border-2 border-brand-primary/20 rounded-xl shadow-lg pt-[8px] pr-[20px] pb-[16px] pl-[20px]">
      {/* Header */}
      <div className="flex items-start gap-4 px-[0px] py-[12px]">
        <div className="w-16 h-16 bg-brand-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
          <HelpCircle className="w-8 h-8 text-brand-secondary" />
        </div>
        <div className="flex-1">
          <h2 className="text-grey-900 mb-2 text-right text-[24px] font-bold">
            سوالات متداول
          </h2>
          <p className="text-grey-600 text-right">
            سوالات و پاسخ‌های رایج کسب‌وکارتان را اضافه کنید
          </p>
        </div>
      </div>

      <div className="space-y-6 px-[0px] p-[0px]">
        {/* Add New FAQ Form */}
        <div className="bg-bg-soft-mint rounded-xl border-2 border-dashed border-brand-primary/30 pt-[16px] pr-[24px] pb-[24px] pl-[24px]">
          <div className="space-y-4 px-[12px] py-[0px]">
            {/* Question Input */}
            <div>
              <textarea
                placeholder="سؤال خود را بنویسید..."
                value={newFaq.question}
                onChange={(e) =>
                  setNewFaq({ ...newFaq, question: e.target.value })
                }
                rows={3}
                className="w-full p-3 border border-border-soft rounded-lg bg-bg-surface resize-none"
              />
            </div>

            {/* Answer Input */}
            <div>
              <textarea
                placeholder="پاسخ کاملی برای این سؤال بنویسید..."
                value={newFaq.answer}
                onChange={(e) =>
                  setNewFaq({ ...newFaq, answer: e.target.value })
                }
                rows={4}
                className="w-full p-3 border border-border-soft rounded-lg bg-bg-surface resize-none"
              />
            </div>

            {/* Add Button */}
            <div className="flex justify-center mt-6">
              <Button
                // variant="primary"
                // size="md"
                // icon="plus"
                // iconPosition="right"
                onClick={addFaq}
                disabled={!newFaq.question.trim() || !newFaq.answer.trim()}
                title="افزودن سؤال جدید"
                className="px-8 py-3"
              >
                افزودن سؤال
              </Button>
            </div>
          </div>
        </div>

        {/* Suggested Questions */}
        <div>
          <h3 className="text-grey-900 mb-3 text-right">سوالات پیشنهادی</h3>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => addSuggestedQuestion(question)}
                className="px-3 py-2 bg-bg-surface border border-border-soft rounded-lg text-body-small text-grey-700 hover:border-brand-primary hover:text-brand-primary transition-colors text-[14px]"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ List by Category */}
        {faqs.length > 0 && (
          <div className="space-y-6">
            {/* Section Title */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center">
                <HelpCircle className="w-4 h-4 text-brand-primary" />
              </div>
              <h3 className="text-grey-900">سوالات ساخته شده</h3>
              <div className="h-px bg-border-soft flex-1" />
              <span className="text-grey-500 text-body-small">
                {faqs.length} سوال
              </span>
            </div>

            <div className="space-y-3">
              {faqs.map((faq) => (
                <div key={faq.id}>
                  {faq.isEditing ? (
                    <div className="bg-bg-surface border border-border-soft rounded-lg p-4">
                      <EditFaqForm
                        faq={faq}
                        onSave={saveEdit}
                        onCancel={cancelEdit}
                      />
                    </div>
                  ) : (
                    <div className="space-y-2 bg-bg-surface border border-border-soft rounded-xl p-3 relative">
                      {/* Chat History Style */}
                      <div className="space-y-2 p-[0px] m-[0px]">
                        {/* User Question - Right Side */}
                        <div className="flex justify-end">
                          <div className="max-w-[40%] bg-brand-primary text-white px-2.5 py-1.5 rounded-xl rounded-br-md">
                            <p className="text-body-small leading-relaxed">
                              {faq.question}
                            </p>
                          </div>
                        </div>

                        {/* Bot Answer - Left Side */}
                        <div className="flex justify-start">
                          <div className="max-w-[40%] bg-grey-100 text-grey-900 px-2.5 py-1.5 rounded-xl rounded-bl-md">
                            <p className="text-body-small leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons - Top Right */}
                      <div className="absolute top-2 right-2 flex items-center gap-1 opacity-50 hover:opacity-100">
                        <button
                          onClick={() => startEdit(faq.id)}
                          className="p-1 text-grey-400 hover:text-brand-primary hover:bg-brand-primary/10 rounded"
                          title="ویرایش"
                        >
                          <Edit3 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => deleteFaq(faq.id)}
                          className="p-1 text-grey-400 hover:text-danger hover:bg-danger/10 rounded"
                          title="حذف"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {faqs.length === 0 && (
          <div className="text-center py-12">
            <HelpCircle className="w-12 h-12 text-grey-400 mx-auto mb-4" />
            <h3 className="text-grey-900 mb-2">هنوز سوالی اضافه نکرده‌اید</h3>
            <p className="text-grey-600">اولین سوال متداول خود را اضافه کنید</p>
          </div>
        )}
      </div>
    </div>
  );
}

interface EditFaqFormProps {
  faq: FAQ;
  onSave: (id: string, question: string, answer: string) => void;
  onCancel: (id: string) => void;
}

function EditFaqForm({ faq, onSave, onCancel }: EditFaqFormProps) {
  const [question, setQuestion] = useState(faq.question);
  const [answer, setAnswer] = useState(faq.answer);

  const handleSave = () => {
    if (question.trim() && answer.trim()) {
      onSave(faq.id, question, answer);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-grey-700 mb-2">سؤال</label>
        <Input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-grey-700 mb-2">پاسخ</label>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={4}
          className="w-full p-3 border border-border-soft rounded-lg bg-bg-surface resize-none"
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button
          // variant="tertiary"
          onClick={() => onCancel(faq.id)}
          className="flex items-center gap-2"
        >
          <X className="w-4 h-4" />
          انصراف
        </Button>
        <Button
          // variant="primary"
          onClick={handleSave}
          disabled={!question.trim() || !answer.trim()}
          className="flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          ذخیره
        </Button>
      </div>
    </div>
  );
}
