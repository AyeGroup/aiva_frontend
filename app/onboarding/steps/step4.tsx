import axiosInstance from "@/lib/axiosInstance";
import PageLoader from "@/components/pageLoader";
import { toast } from "sonner";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { API_ROUTES } from "@/constants/apiRoutes";
import { BotConfig, FAQ } from "@/types/common";
import { useState, useEffect } from "react";
import { HelpCircle, Trash2, Edit3, Save, X } from "lucide-react";

interface WizardStep4Props {
  botConfig: BotConfig;
  updateConfig: (updates: Partial<BotConfig>) => void;
}

export function WizardStep4({ botConfig, updateConfig }: WizardStep4Props) {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });
  const [isloading, setIsLoading] = useState(false);
  const botId = botConfig.uuid;

  //  گرفتن لیست سوالات  در ابتدای فرم
  useEffect(() => {
    const loadFaqs = async () => {
      await fetchFaqs();
    };
    loadFaqs();
  }, []);

  //   آپدیت botConfig
  useEffect(() => {
    if (!faqs || faqs.length === 0) return;

    updateConfig({
      faqs: faqs.map((f) => ({
        id: f.id,
        question: f.question,
        answer: f.answer,
      })),
    });
  }, [faqs]);

  const fetchFaqs = async () => {
    if (!botId) return;
    try {
      setIsLoading(true);
      const res = await axiosInstance.get(API_ROUTES.FAQ(botId));
      setFaqs(res.data.data || []);
    } catch (err) {
      console.error("خطا در دریافت FAQها:", err);
    } finally {
      setIsLoading(false);
    }
  };

  //   افزودن
  const addFaq = async () => {
    if (!newFaq.question.trim() || !newFaq.answer.trim()) return;
    setIsLoading(true);

    try {
      const payload = {
        question: newFaq.question,
        answer: newFaq.answer,
      };
      const res = await axiosInstance.post(API_ROUTES.FAQ(botId), payload);

      if (res.status === 200 || res.status === 201) {
        await fetchFaqs();
        setNewFaq({ question: "", answer: "" });
        toast.success("پرسش و پاسخ با موفقیت افزوده شد.");
      } else {
        toast.error(`خطا در ثبت اطلاعات:  (${res.status})`);
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message;
      toast.error("خطا در ثبت اطلاعات: " + errorMessage);

      console.error("خطا در افزودن FAQ:", err.response || err);
    } finally {
      setIsLoading(false);
    }
  };

  //   شروع ویرایش
  const startEdit = (id: string) => {
    setFaqs((prev) =>
      prev.map((f) => (f.id === id ? { ...f, isEditing: true } : f))
    );
  };

  //   ویرایش
  const saveEdit = async (id: string, question: string, answer: string) => {
    setIsLoading(true);
    try {
      await axiosInstance.put(`${API_ROUTES.FAQ(botId)}/${id}`, {
        question,
        answer,
      });
      await fetchFaqs();
      toast.success("ویرایش پرسش و پاسخ با موفقیت انجام شد.");
    } catch (err: any) {
      toast.error("خطا در ویرایش: تغییرات اعمال نشد.");
      console.error("خطا در ویرایش FAQ:", err.response || err);
    } finally {
      setIsLoading(false);
    }
  };

  //   حذف  
  const deleteFaq = async (id: string) => {
    setIsLoading(true);

    try {
      await axiosInstance.delete(`${API_ROUTES.FAQ(botId)}/${id}`);
      await fetchFaqs();
      // setFaqs((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      console.error("خطا در حذف FAQ:", err);
    } finally {
      setIsLoading(false);
    }
  };

  //   لغو ویرایش
  const cancelEdit = (id: string) => {
    setFaqs((prev) =>
      prev.map((f) => (f.id === id ? { ...f, isEditing: false } : f))
    );
  };

  //   سوالات پیشنهادی
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

  const addSuggestedQuestion = (question: string) => {
    setNewFaq({ ...newFaq, question });
  };

  return (
    <div className="space-y-8 bg-bg-surface p-6 border-2 border-brand-primary/20 rounded-xl shadow-lg">
      {isloading && <PageLoader />}
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-brand-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
          <HelpCircle className="w-8 h-8 text-brand-secondary" />
        </div>
        <div className="flex-1">
          <h2 className="text-grey-900 mb-2 text-[24px] font-bold text-right">
            سوالات متداول
          </h2>
          <p className="text-grey-600 text-right">
            پرسش‌های متداول مرتبط با کسب‌وکار خود را در این بخش درج نمایید. این
            محتوا به‌صورت خودکار در پنل گفتگوی آنلاین کاربر نمایش داده خواهد شد.
          </p>
        </div>
      </div>

      {/* فرم افزودن سؤال */}
      <div className="bg-bg-soft-mint rounded-xl border-2 border-dashed border-brand-primary/30 p-6">
        <div className="space-y-4">
          <textarea
            placeholder="سؤال خود را بنویسید..."
            value={newFaq.question}
            onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
            rows={3}
            className="w-full p-3 border border-border-soft rounded-lg bg-bg-surface resize-none"
          />
          <textarea
            placeholder="پاسخ کامل سؤال..."
            value={newFaq.answer}
            onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
            rows={4}
            className="w-full p-3 border border-border-soft rounded-lg bg-bg-surface resize-none"
          />
          <div className="flex justify-center mt-4">
            <Button
              variant="primary"
              icon="plus"
              onClick={addFaq}
              disabled={!newFaq.question.trim() || !newFaq.answer.trim()}
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

      {/* لیست سوالات */}
      {faqs.length > 0 ? (
        <div className="space-y-3">
          {faqs.map((faq) => (
            <div key={faq.id}>
              {faq.isEditing ? (
                <EditFaqForm
                  faq={faq}
                  onSave={saveEdit}
                  onCancel={cancelEdit}
                />
              ) : (
                <div className="bg-bg-surface border border-border-soft rounded-lg p-4 relative">
                  <div className="flex justify-start mb-2">
                    <div className="bg-brand-primary text-white px-3 py-2 rounded-lg">
                      {faq.question}
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-grey-100 text-grey-900 px-3 py-2 rounded-lg">
                      {faq.answer}
                    </div>
                  </div>

                  <div className="absolute top-2 left-2 flex gap-1 opacity-60 hover:opacity-100">
                    <button
                      onClick={() => startEdit(faq.id)}
                      title="ویرایش"
                      className="p-1 hover:text-brand-primary"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteFaq(faq.id)}
                      title="حذف"
                      className="p-1 hover:text-danger"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-grey-500 py-12">
          هنوز سوالی اضافه نکرده‌اید
        </div>
      )}
    </div>
  );
}

//   فرم ویرایش
interface EditFaqFormProps {
  faq: FAQ;
  onSave: (id: string, question: string, answer: string) => void;
  onCancel: (id: string) => void;
}

function EditFaqForm({ faq, onSave, onCancel }: EditFaqFormProps) {
  const [question, setQuestion] = useState(faq.question);
  const [answer, setAnswer] = useState(faq.answer);

  const handleSave = () => {
    if (question.trim() && answer.trim()) onSave(faq.id, question, answer);
  };

  return (
    <div className="space-y-4 bg-bg-surface p-4 border rounded-lg">
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
        <Button onClick={() => onCancel(faq.id)} variant="secondary">
          <X className="w-4 h-4" /> انصراف
        </Button>
        <Button onClick={handleSave} variant="primary">
          <Save className="w-4 h-4" /> ذخیره
        </Button>
      </div>
    </div>
  );
}
