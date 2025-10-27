import axiosInstance from "@/lib/axiosInstance";
import PageLoader from "@/components/pageLoader";
import { Card } from "@/components/card";
import { Input } from "@/components/input";
import { toast } from "sonner";
import { Button } from "@/components/button";
import { useAuth } from "@/providers/AuthProvider";
import { API_ROUTES } from "@/constants/apiRoutes";
import { onboardingData } from "../onboarding.data";
import { convertToPersian } from "@/utils/common";
import { Info, Refresh, Tick } from "@/public/icons/AppIcons";
import { BotConfig, KnowledgeItem } from "@/types/common";
import { useEffect, useRef, useState } from "react";
import {
  FileText,
  Link,
  HelpCircle,
  Type,
  Trash2,
  Upload,
  Clock,
  CheckCircle,
  AlertTriangle,
  Edit2,
} from "lucide-react";

interface WizardStep2Props {
  botConfig: BotConfig;
  updateConfig: (updates: Partial<BotConfig>) => void;
}

export function WizardStep2({ botConfig, updateConfig }: WizardStep2Props) {
  const { user, loading } = useAuth();
  const [selectedType, setSelectedType] = useState<string>("");
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<KnowledgeItem | null>(null);
  const [newItem, setNewItem] = useState<Partial<KnowledgeItem>>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user?.token) loadOnboardingData();
  }, [user?.token]);

  const loadOnboardingData = async () => {
    try {
      const savedData = localStorage.getItem("aiva-onboarding-data");
      if (!savedData) return;

      const parsedData = JSON.parse(savedData);
      await loadQa(parsedData.botConfig?.uuid);
    } catch (error) {
      console.warn("خطا در بارگذاری اطلاعات ذخیره شده:", error);
    }
  };

  const loadQa = async (botUuid: string) => {
    if (!botUuid) return;
    setIsLoading(true);
    try {
      try {
        const response = await axiosInstance.get(
          API_ROUTES.KNOWLEDGE.DOCUMENT(botUuid),
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );

        botConfig.knowledge = response.data.data;
        // console.log("botConfig.knowledge: ", botConfig.knowledge);
      } catch (apiError: any) {
        console.warn("API fetch failed, using local data:", apiError);
      }
    } catch (error) {
      console.warn("خطا در بارگذاری اطلاعات ذخیره شده:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      const maxSize = 50 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        setSelectedFile(null);
        console.error("حجم فایل نباید بیشتر از ۵۰ مگابایت باشد  ");
        return;
      }
      const allowedTypes = [".pdf", ".doc", ".docx", ".txt"];
      const fileExtension = file.name
        .slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2)
        .toLowerCase();

      if (allowedTypes.includes(`.${fileExtension}`)) {
        setSelectedFile(file);
        // setNewItem()
        if (!newItem.title)
          setNewItem((prev) => ({ ...prev, title: file.name }));

        // console.log(`فایل انتخاب شد: ${file.name} (اندازه: ${file.size} بایت)`);
      } else {
        setSelectedFile(null);
        console.error(
          "فرمت فایل مجاز نیست. لطفاً PDF، DOC، DOCX یا TXT انتخاب کنید."
        );
      }
      // console.log("newItem", newItem);
    } else {
      setSelectedFile(null);
    }
  };

  function isValidUrl(url: string): boolean {
    try {
      const isValidUrl = /^https?:\/\/[^\s$.?#].[^\s]*$/i.test(url);
      if (!isValidUrl) return false;

      // new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  const saveItem = async () => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("type", selectedType);

      //ویرایش پرسش و پاسخ
      if (
        isEditing &&
        editingItem &&
        selectedType === "qa_pair" &&
        editingItem.qa_id
      ) {
        formData.append("question", newItem.title || "");
        formData.append("answer", newItem.content || "");

        const res = await axiosInstance.put(
          API_ROUTES.KNOWLEDGE.QA_EDIT(botConfig.uuid, editingItem.qa_id),
          formData
        );
        if (!res.data?.success) {
          toast.error("خطا در ویرایش اطلاعات!");
          return;
        }
        toast.success("اطلاعات ثبت شد");
        cancelEditing();
      }
      // ویرایش وبسایت و فایل
      else if (isEditing && editingItem) {
        formData.append("title", newItem.title || "");

        console.log("formData", formData);
        const res = await axiosInstance.put(
          API_ROUTES.KNOWLEDGE.DOCUMENT_EDIT(botConfig.uuid, editingItem.id),
          formData
        );

        if (!res.data?.success) {
          toast.error("خطا در ویرایش اطلاعات!");
          return;
        }
        toast.success("اطلاعات ثبت شد");

        cancelEditing();
      } else {
        // اضاافه کردن آیتم
        if (
          selectedType === "website" &&
          (!newItem.url || !isValidUrl(newItem.url))
        ) {
          toast.error("آدرس معتبر وارد کنید");
          return;
        }

        const apiPath =
          selectedType === "file"
            ? API_ROUTES.KNOWLEDGE.DOCUMENT(botConfig.uuid)
            : selectedType === "website"
            ? API_ROUTES.KNOWLEDGE.URL(botConfig.uuid)
            : API_ROUTES.KNOWLEDGE.QA_SAVE(botConfig.uuid);

        //  افزودن آیتم جدید
        if (selectedType === "file" && selectedFile) {
          formData.append("title", newItem.title || "");
          formData.append("file", selectedFile);
          formData.append("content", newItem.content || "");
        } else if (selectedType === "qa_pair") {
          formData.append("question", newItem.title || "");
          formData.append("answer", newItem.content || "");
        } else if (selectedType === "website") {
          formData.append("url", newItem.url || "");
          formData.append("title", newItem.title || "");
        }
        const res = await axiosInstance.post(apiPath, formData);

        if (!res.data?.success) {
          toast.error("خطا در ثبت آیتم جدید!");
          return;
        }
        toast.success("اطلاعات ثبت شد");

        cancelAdding();
        setSelectedFile(null);
      }
      await loadQa(botConfig.uuid);
    } catch (err) {
      console.error("  خطا در ذخیره آیتم:", err);
      toast.error("خطا در ذخیره اطلاعات. لطفاً دوباره تلاش کنید.");
    } finally {
      setIsLoading(false);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "faq":
        return HelpCircle;
      case "file":
        return FileText;
      case "website":
        return Link;
      case "qa_pair":
        return Type;
      default:
        return Type;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing":
        return Clock;
      case "queued":
        return Clock;
      case "done":
        return CheckCircle;
      case "error":
        return AlertTriangle;
      default:
        return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-brand-amber text-white";
      case "done":
        return "bg-success text-white";
      case "queued":
        return "bg-brand-amber text-white";
      case "error":
        return "bg-danger text-white";
      default:
        return "bg-grey-400 text-white";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "processing":
        return "در حال پردازش";
      case "queued":
        return "در صف بررسی";
      case "done":
        return "اعمال شده";
      case "failed":
        return "خطا";
      default:
        return "نامشخص";
    }
  };

  const startAdding = (type: string) => {
    // console.log("add type", type);
    setSelectedType(type);
    setIsAdding(true);
    setIsEditing(false);
    setNewItem({});
  };

  const cancelAdding = () => {
    setIsAdding(false);
    setSelectedType("");
    setNewItem({});
  };

  const startEditing = async (item: KnowledgeItem) => {
    try {
      setIsAdding(false);
      setIsEditing(true);
      setSelectedType(item.type);

      // console.log("start edit >> ", item);
      if (item.qa_id) {
        const apiPath =
          item.type === "qa_pair"
            ? API_ROUTES.KNOWLEDGE.QA_GET(botConfig.uuid, item?.qa_id)
            : API_ROUTES.KNOWLEDGE.DOCUMENT_EDIT(botConfig.uuid, item?.id);
        const response = await axiosInstance.get(apiPath, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });

        const myItem = response.data.data;
        myItem.content = response.data.data.answer;
        // console.log("read qa: ", response.data.data);
        // console.log("myitem: ", myItem);

        setEditingItem(myItem);
        setNewItem(myItem);
      } else {
        setEditingItem(item);
        setNewItem(item);
      }

      // console.log("focus");
      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 0);
    } catch (apiError: any) {
      console.error(apiError);
    }
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditingItem(null);
    setSelectedType("");
    setNewItem({});
  };

  const removeItem = async (item: KnowledgeItem) => {
    setIsLoading(true);
    console.log("ali",item)
    try {
      let res;
      if (item.type === "qa_pair" && item.qa_id) {
        res = await axiosInstance.delete(
          API_ROUTES.KNOWLEDGE.QA_EDIT(botConfig.uuid, item.qa_id)
        );
      } else if (item.type === "file" || item.type === "website") {
        res = await axiosInstance.delete(
          `${API_ROUTES.KNOWLEDGE.DOCUMENT(botConfig.uuid)}/${item.upload_id}`
        );
      } else {
        return;
      }

      if (res.data.success) {
        await loadQa(botConfig.uuid);
        toast.success("اطلاعات حذف شد");
      } else {
        toast.error("خطا در حذف اطلاعات");
        console.warn("⚠️ Unexpected response while removing item:", res.data);
      }
    } catch (error: any) {
      toast.error("خطا در حذف اطلاعات");
      console.error("  Failed to remove item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="space-y-8 bg-bg-surface px-[20px] py-[16px] border-2 border-brand-primary/20 rounded-xl shadow-lg pt-[8px] pr-[20px] pb-[16px] pl-[20px]"
      dir="rtl"
    >
      {/* Header */}
      <div className="flex items-start gap-4 px-[0px] py-[12px]">
        {(loading || isLoading) && <PageLoader />}
        <div className="w-16 h-16 bg-brand-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 ">
          <div className="w-8 h-8 text-brand-primary">
            <Tick />
          </div>
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

      {/* Important Notice */}
      <div className="bg-gradient-to-br from-brand-amber/10 to-sharp-amber/10 border-2 border-brand-amber/30 rounded-2xl mb-[32px] relative overflow-hidden mt-[0px] mr-[0px] ml-[0px] px-[24px] py-[12px]">
        {/* Background Pattern */}

        <div className="relative z-10">
          <div className="flex items-start gap-4 m-[0px]">
            <div className="w-12 h-12 bg-brand-amber rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <Info />
            </div>
            <div className="flex-1">
              <div className="bg-white/70 backdrop-blur-sm rounded-lg border border-brand-amber/20 text-base px-4 py-2">
                <p className="text-[rgba(245,158,11,1)] text-right leading-relaxed text-[14px]">
                  <span className="font-medium text-brand-amber text-[14px]">
                    پاسخ‌هایی که چت‌بات به کاربر می‌دهد برمبنای دانشی است که شما
                    اینجا وارد می‌کنید
                  </span>
                  ، لذا در اضافه کردن منابع دانشی دقت زیادی داشته باشید.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Processing Time Notice */}
      <div className="bg-gradient-to-br from-brand-primary/10 to-bg-soft-mint border-2 border-brand-primary/30 rounded-2xl mb-8 relative overflow-hidden py-2 px-6">
        <div className="relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="bg-white/70 backdrop-blur-sm rounded-lg border border-brand-primary/20 px-4  py-2">
                <p className="text-[rgba(101,188,182,1)] text-right leading-relaxed text-[14px]">
                  اعمال دانش جدید مقداری زمان نیاز دارد. پس از اضافه کردن هر
                  محتوا، دستیار بلافاصله قادر به پاسخگویی نخواهد بود و باید
                  منتظر تکمیل فرآیند پردازش باشید.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Knowledge Type Selection */}
      {!isAdding && !isEditing && (
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
                <div
                  key={type.id}
                  className="p-6 rounded-lg cursor-pointer border-2 border-brand-primary/30 bg-bg-surface hover:border-brand-primary hover:shadow-lg group"
                  onClick={() => {
                    // console.log("fired");
                    startAdding(type.id);
                  }}
                >
                  <div className="text-right">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center">
                        <IconComponent className="w-7 h-7 text-brand-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-grey-900 mb-1">{type.title}</h3>
                        <p className="text-grey-600 text-body-small text-[14px]">
                          {type.description}
                        </p>
                      </div>
                    </div>

                    <div className="bg-primary text-white rounded-xl p-4 border border-primary">
                      <div className="flex items-center justify-center">
                        شروع کنید
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add/Edit Item Form */}
      {(isAdding || isEditing) && (
        <Card className="p-6 border-2 border-brand-primary/30 bg-bg-soft-mint shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-grey-900">
              {isEditing
                ? "ویرایش "
                : onboardingData.knowledgeTypes.find(
                    (t) => t.id === selectedType
                  )?.title}
            </h3>
            <Button
              variant="tertiary"
              size="sm"
              onClick={isEditing ? cancelEditing : cancelAdding}
            >
              انصراف
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-grey-900 mb-2 text-right">
                {selectedType === "qa_pair" ? (
                  <div>
                    سؤال <span className="text-brand-primary mr-1">*</span>
                  </div>
                ) : (
                  "عنوان"
                )}
              </label>
              <Input
                ref={titleInputRef}
                type="text"
                value={newItem.title || ""}
                onChange={(e) =>
                  setNewItem((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="عنوان مناسب برای این محتوا"
                className="w-full !bg-white"
              />
            </div>

            {selectedType === "qa_pair" && (
              <div>
                <label className="block text-grey-900 mb-2 text-right">
                  پاسخ
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
                  className="w-full bg-white px-4 py-3 border border-border-soft rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors resize-none"
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
                              content: "",
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

            {selectedType === "qa_pair1" && (
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

            {selectedType === "website" && isAdding && (
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

            {selectedType === "file" && isAdding && (
              <div>
                <label className="block text-grey-900 mb-2">آپلود فایل</label>
                <div className="border-2 border-dashed border-grey-300 rounded-lg p-8 text-center">
                  {selectedFile ? (
                    <div>{selectedFile.name}</div>
                  ) : (
                    <div>
                      <Upload className="w-8 h-8 text-grey-400 mx-auto mb-4" />
                      <p className="text-grey-600 mb-4">
                        فایل خود را اینجا بکشید یا کلیک کنید
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,.txt"
                    className="hidden"
                    id="file-upload"
                  />
                  <Button
                    variant="secondary"
                    size="sm"
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
              variant="tertiary"
              onClick={isEditing ? cancelEditing : cancelAdding}
              className="px-8 py-3 min-w-[120px]"
            >
              انصراف
            </Button>
            <Button
              variant="primary"
              onClick={saveItem}
              disabled={!newItem.title}
              className="px-12 py-3 min-w-40 shadow-lg hover:shadow-xl"
            >
              {isEditing ? "ذخیره تغییرات" : "ذخیره  "}
            </Button>
          </div>
        </Card>
      )}

      {/* Existing Knowledge Items */}
      {botConfig?.knowledge && botConfig?.knowledge?.length > 0 && (
        <div className="bg-bg-soft-teal border-2 border-brand-primary/20 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-grey-900 flex items-center gap-3">
              <div className="w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✅</span>
              </div>
              دانش اضافه شده ({botConfig.knowledge.length})
            </h3>

            {/* Status Summary */}
            <div className="flex items-center gap-3">
              {botConfig.knowledge.filter((k) => k.status === "processing")
                .length > 0 && (
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-brand-amber"></div>
                  <span className="text-xs text-grey-600">
                    {convertToPersian(
                      botConfig.knowledge.filter(
                        (k) => k.status === "processing"
                      ).length
                    )}{" "}
                    در حال پردازش
                  </span>
                </div>
              )}
              {botConfig.knowledge.filter((k) => k.status === "done").length >
                0 && (
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-success"></div>
                  <span className="text-xs text-grey-600">
                    {convertToPersian(
                      botConfig.knowledge.filter((k) => k.status === "done")
                        .length
                    )}{" "}
                    اعمال شده
                  </span>
                </div>
              )}

              {botConfig.knowledge.filter((k) => k.status === "queued").length >
                0 && (
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-amber"></div>
                  <span className="text-xs text-grey-600">
                    {convertToPersian(
                      botConfig.knowledge.filter((k) => k.status === "queued")
                        .length
                    )}{" "}
                    در صف بررسی
                  </span>
                </div>
              )}

              {botConfig.knowledge.filter((k) => k.status === "failed").length >
                0 && (
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-danger"></div>
                  <span className="text-xs text-grey-600">
                    {convertToPersian(
                      botConfig.knowledge.filter((k) => k.status === "error")
                        .length
                    )}{" "}
                    خطا
                  </span>
                </div>
              )}
              <button
                className="cursor-pointer"
                onClick={() => loadQa(botConfig.uuid)}
              >
                <div className="w-6 h-6 text-primary hover:text-secondary">
                  <Refresh />
                </div>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {botConfig.knowledge.map((item, index) => {
              const IconComponent = getIcon(item.type);

              return (
                <Card
                  key={item.id ? item.id : index}
                  className="p-4 border-2 border-brand-primary/10 bg-bg-surface shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 border border-brand-primary/20">
                        <IconComponent className="w-4 h-4 text-brand-primary" />
                      </div>

                      <div className="flex-1 min-w-0 text-right">
                        <div className="flex items-center justify-between gap-3 mb-2">
                          <h4 className="text-grey-900 flex-1">{item.title}</h4>

                          {/* Status Tag */}
                          <div
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              item.status || ""
                            )}`}
                          >
                            {(() => {
                              const StatusIcon = getStatusIcon(
                                item?.status || ""
                              );
                              return <StatusIcon className="w-3 h-3" />;
                            })()}
                            <span>{getStatusText(item?.status || "")}</span>
                          </div>
                        </div>

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

                        {/* Created date */}
                        <p className="text-grey-400 text-xs mt-1">
                          {new Date(item?.created_at ?? "").toLocaleDateString(
                            "fa-IR"
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-1 flex-shrink-0 mr-2">
                      <button
                        onClick={() => startEditing(item)}
                        //elham
                        title="ویرایش محتوا"
                        className="w-8 h-8 rounded-full text-grey-500 hover:text-grey-700 flex items-center justify-center"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => removeItem(item)}
                        title="حذف محتوا"
                        className="w-8 h-8 rounded-full text-grey-500 hover:text-grey-700 flex items-center justify-center"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {botConfig.knowledge &&
        botConfig.knowledge?.length === 0 &&
        !isAdding &&
        !isEditing && (
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
        <h4 className="text-grey-900 mb-3 flex items-center gap-2 font-bold">
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
            می‌توانید بعد از راه‌اندازی نیز اطلاعات جدید اضافه کنید
          </li>

          <li className="flex items-start gap-2 p-2 bg-bg-surface rounded-lg border border-brand-amber/20">
            <Clock className="w-4 h-4 text-brand-amber flex-shrink-0 mt-0.5" />
            دانش جدید ابتدا «در حال بررسی» است و پس از پردازش «اعمال» می‌شود
          </li>

          <li className="flex items-start gap-2 p-2 bg-bg-surface rounded-lg border border-success/20">
            <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
            تنها محتوای «اعمال شده» در پاسخ‌های دستیار استفاده می‌شود
          </li>
        </ul>
      </Card>
    </div>
  );
}
