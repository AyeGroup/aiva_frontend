import React, { useState } from "react";
import { Sidebar } from "./sidebar";
import {
  Edit3,
  Trash2,
  Settings,
  Eye,
  Copy,
  MoreVertical,
  Palette,
  MessageSquare,
  Upload,
  Save,
  X,
  Plus,
} from "lucide-react";
import { onboardingData } from "../onboarding/onboarding.data";
import { Card } from "@/components/card";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Select } from "@/components/select";
import { Switch } from "@/components/ui/switch";
import { PageType } from "@/types/common";

 

interface ChatbotManagementProps {
  onNavigate: (page: PageType) => void;
}

interface KnowledgeSource {
  id: string;
  type: "faq" | "document" | "url" | "text";
  title: string;
  content: string;
  url?: string;
}

interface Chatbot {
  id: string;
  name: string;
  url: string;
  status: "active" | "inactive" | "draft";
  lastUpdated: string;
  conversationsToday: number;
  responseRate: number;
  color: string;
  description?: string;
  language: string;
  tone: string;
  welcomeMessage: string;
  fallbackMessage: string;
  branding: {
    logo?: string;
    position: "bottom-right" | "bottom-left";
    size: "small" | "medium" | "large";
  };
  knowledgeBase: KnowledgeSource[];
  responseSettings: {
    sourceOnly: boolean;
    showSource: boolean;
    showContactInfo: boolean;
    email?: string;
    phoneNumber?: string;
  };
}

export default function ChatbotManagement( ) {
  const [chatbots, setChatbots] = useState<Chatbot[]>([
    {
      id: "1",
      name: "وب‌سایت اصلی",
      url: "example.com",
      status: "active",
      lastUpdated: "۱۴۰۳/۰۶/۳۰",
      conversationsToday: 245,
      responseRate: 94,
      color: "#65bcb6",
      description: "چت بات اصلی وب‌سایت شرکت",
      language: "fa",
      tone: "friendly",
      welcomeMessage: "سلام! خوشحالم که می‌تونم کمکتون کنم 😊",
      fallbackMessage:
        "متأسفانه نمی‌تونم پاسخ این سؤال رو بدم. لطفاً با پشتیبانی تماس بگیرید.",
      branding: {
        position: "bottom-right",
        size: "medium",
      },
      knowledgeBase: [
        {
          id: "1",
          type: "faq",
          title: "سؤالات متداول",
          content:
            "سؤال: محصولات شما چیست؟\nپاسخ: ما محصولات نرم‌افزاری ارائه می‌دهیم",
        },
      ],
      responseSettings: {
        sourceOnly: true,
        showSource: true,
        showContactInfo: true,
        email: "support@example.com",
        phoneNumber: "۰۲۱-۱۲۳۴۵۶۷۸",
      },
    },
    {
      id: "2",
      name: "فروشگاه آنلاین",
      url: "shop.example.com",
      status: "active",
      lastUpdated: "۱۴۰۳/۰۶/۲۹",
      conversationsToday: 156,
      responseRate: 89,
      color: "#FFA18E",
      description: "پاسخگویی به سوالات فروش و خرید",
      language: "fa",
      tone: "professional",
      welcomeMessage: "با سلام. چگونه می‌توانم به شما کمک کنم؟",
      fallbackMessage: "برای اطلاعات بیشتر با فروش تماس بگیرید.",
      branding: {
        position: "bottom-right",
        size: "large",
      },
      knowledgeBase: [],
      responseSettings: {
        sourceOnly: false,
        showSource: false,
        showContactInfo: true,
        email: "sales@example.com",
        phoneNumber: "۰۲۱-۸۷۶۵۴۳۲۱",
      },
    },
    {
      id: "3",
      name: "وبلاگ شرکت",
      url: "blog.example.com",
      status: "inactive",
      lastUpdated: "۱۴۰۳/۰۶/۲۵",
      conversationsToday: 0,
      responseRate: 0,
      color: "#b07cc6",
      description: "راهنمایی در مورد مقالات و محتوا",
      language: "fa",
      tone: "casual",
      welcomeMessage: "سلاام! چه خبر؟ چی می‌تونم برات بکنم؟",
      fallbackMessage: "ببخشید، نمی‌دونم! بزودی یاد می‌گیرم.",
      branding: {
        position: "bottom-left",
        size: "small",
      },
      knowledgeBase: [],
      responseSettings: {
        sourceOnly: true,
        showSource: false,
        showContactInfo: false,
        email: "blog@example.com",
      },
    },
    {
      id: "4",
      name: "پشتیبانی فنی",
      url: "support.example.com",
      status: "draft",
      lastUpdated: "۱۴۰۳/۰۶/۲۸",
      conversationsToday: 0,
      responseRate: 0,
      color: "#52d4a0",
      description: "در حال توسعه - پشتیبانی فنی",
      language: "fa",
      tone: "expert",
      welcomeMessage:
        "با توجه به سؤال شما، پاسخ دقیق این موضوع عبارت است از...",
      fallbackMessage: "لطفاً سؤال خود را دقیق‌تر مطرح کنید.",
      branding: {
        position: "bottom-right",
        size: "medium",
      },
      knowledgeBase: [],
      responseSettings: {
        sourceOnly: true,
        showSource: true,
        showContactInfo: true,
        email: "tech@example.com",
        phoneNumber: "۰۲۱-۵۵۵۱۲۳۴",
      },
    },
  ]);

  const [selectedChatbot, setSelectedChatbot] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Chatbot>>({});
  const [activeTab, setActiveTab] = useState<
    "basic" | "knowledge" | "design" | "messages"
  >("basic");
  const [newKnowledgeItem, setNewKnowledgeItem] = useState<
    Partial<KnowledgeSource>
  >({
    type: "faq",
    title: "",
    content: "",
  });

  const handleEdit = (chatbot: Chatbot) => {
    setEditMode(chatbot.id);
    setEditForm({
      ...chatbot,
      responseSettings: chatbot.responseSettings || {
        sourceOnly: false,
        showSource: false,
        showContactInfo: false,
      },
    });
    setActiveTab("basic");
  };

  const handleSaveEdit = () => {
    if (editMode && editForm) {
      setChatbots((prev) =>
        prev.map((bot) =>
          bot.id === editMode
            ? { ...bot, ...editForm, lastUpdated: "۱۴۰۳/۰۶/۳۰" }
            : bot
        )
      );
      setEditMode(null);
      setEditForm({});
      setActiveTab("basic");
    }
  };

  const handleCancelEdit = () => {
    setEditMode(null);
    setEditForm({});
    setActiveTab("basic");
  };

  const addKnowledgeItem = () => {
    if (
      newKnowledgeItem.title &&
      newKnowledgeItem.content &&
      editForm.knowledgeBase
    ) {
      const updatedKnowledge = [
        ...editForm.knowledgeBase,
        {
          ...newKnowledgeItem,
          id: Date.now().toString(),
        } as KnowledgeSource,
      ];

      setEditForm((prev) => ({
        ...prev,
        knowledgeBase: updatedKnowledge,
      }));

      setNewKnowledgeItem({
        type: "faq",
        title: "",
        content: "",
      });
    }
  };

  const removeKnowledgeItem = (id: string) => {
    setEditForm((prev) => ({
      ...prev,
      knowledgeBase: prev.knowledgeBase?.filter((item) => item.id !== id) || [],
    }));
  };

  const getSizeInPx = (size: string) => {
    switch (size) {
      case "small":
        return 50;
      case "medium":
        return 60;
      case "large":
        return 70;
      default:
        return 60;
    }
  };

  const toggleStatus = (id: string) => {
    setChatbots((prev) =>
      prev.map((bot) =>
        bot.id === id
          ? {
              ...bot,
              status:
                bot.status === "active"
                  ? "inactive"
                  : ("active" as "active" | "inactive"),
            }
          : bot
      )
    );
  };

  const deleteChatbot = (id: string) => {
    setChatbots((prev) => prev.filter((bot) => bot.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "#22C55E";
      case "inactive":
        return "#EF4444";
      case "draft":
        return "#F59E0B";
      default:
        return "#6B7280";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "فعال";
      case "inactive":
        return "غیرفعال";
      case "draft":
        return "پیش‌نویس";
      default:
        return "نامشخص";
    }
  };

  return (
    <div className="h-screen overflow-hidden" style={{ background: "#FFFFFF" }}>
      <div className="flex h-screen">
        {/* Sidebar */}
        {/* <Sidebar   currentPage="chatbot-management" /> */}

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto h-screen">
          <div className="max-w-7xl mx-auto pb-8">
            {/* Page Header */}
            <header className="mb-8">
              <div className="text-right">
                <h1 className="text-grey-900 mb-2">مدیریت چت بات‌ها</h1>
                <p className="text-grey-600">
                  مدیریت و ویرایش تمام چت بات‌های آیوا
                </p>
              </div>
            </header>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 border border-grey-100 shadow-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center">
                    <Settings className="w-6 h-6 text-brand-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-grey-900 mb-1">
                  {chatbots.length}
                </h3>
                <p className="text-grey-600 text-sm">کل چت بات‌ها</p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-grey-100 shadow-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                    <Eye className="w-6 h-6 text-success" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-grey-900 mb-1">
                  {chatbots.filter((bot) => bot.status === "active").length}
                </h3>
                <p className="text-grey-600 text-sm">چت بات فعال</p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-grey-100 shadow-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-brand-secondary/10 rounded-xl flex items-center justify-center">
                    <span className="font-bold text-brand-secondary">💬</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-grey-900 mb-1">
                  {chatbots.reduce(
                    (sum, bot) => sum + bot.conversationsToday,
                    0
                  )}
                </h3>
                <p className="text-grey-600 text-sm">گفتگوهای امروز</p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-grey-100 shadow-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-brand-accent/10 rounded-xl flex items-center justify-center">
                    <span className="font-bold text-brand-accent">📊</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-grey-900 mb-1">
                  {Math.round(
                    chatbots.reduce((sum, bot) => sum + bot.responseRate, 0) /
                      chatbots.length
                  )}
                  %
                </h3>
                <p className="text-grey-600 text-sm">میانگین پاسخگویی</p>
              </div>
            </div>

            {/* Chatbots List */}
            <div className="bg-white rounded-3xl border border-grey-100 shadow-card overflow-hidden">
              <div className="p-6 border-b border-grey-100">
                <h2 className="font-bold text-grey-900 text-xl">
                  لیست چت بات‌ها
                </h2>
              </div>

              <div className="divide-y divide-grey-100">
                {chatbots.map((chatbot) => (
                  <div
                    key={chatbot.id}
                    className="p-6 hover:bg-grey-50/50 transition-colors"
                  >
                    {editMode === chatbot.id ? (
                      // Advanced Edit Mode
                      <div className="space-y-6">
                        {/* Edit Header */}
                        <div className="flex items-center justify-between pb-4 border-b border-grey-200">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center">
                              <Edit3 className="w-5 h-5 text-brand-primary" />
                            </div>
                            <div>
                              <h3 className="font-bold text-grey-900 text-lg">
                                ویرایش چت بات: {chatbot.name}
                              </h3>
                              <p className="text-grey-600 text-sm">
                                تنظیمات کامل چت بات خود را مدیریت کنید
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={handleCancelEdit}
                            className="p-2 text-grey-500 hover:text-grey-700 hover:bg-grey-100 rounded-lg transition-all"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Tabs */}
                        <div className="flex space-x-1 bg-grey-100 p-1 rounded-xl">
                          {[
                            {
                              id: "basic",
                              label: "تنظیمات پایه",
                              icon: Settings,
                            },
                            {
                              id: "knowledge",
                              label: "پایگاه دانش",
                              icon: MessageSquare,
                            },
                            { id: "design", label: "طراحی", icon: Palette },
                            {
                              id: "messages",
                              label: "پیام‌ها",
                              icon: MessageSquare,
                            },
                          ].map((tab) => (
                            <button
                              key={tab.id}
                              onClick={() => setActiveTab(tab.id as any)}
                              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                                activeTab === tab.id
                                  ? "bg-white text-brand-primary shadow-sm"
                                  : "text-grey-600 hover:text-grey-900"
                              }`}
                            >
                              <tab.icon className="w-4 h-4" />
                              {tab.label}
                            </button>
                          ))}
                        </div>

                        {/* Tab Content */}
                        <div className="min-h-[400px]">
                          {activeTab === "basic" && (
                            <div className="space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <label className="block text-sm font-medium text-grey-700 mb-2">
                                    نام چت بات{" "}
                                    <span className="text-brand-primary">
                                      *
                                    </span>
                                  </label>
                                  <Input
                                    value={editForm.name || ""}
                                    onChange={(e) =>
                                      setEditForm((prev) => ({
                                        ...prev,
                                        name: e.target.value,
                                      }))
                                    }
                                    placeholder="نام چت بات را وارد کنید"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-grey-700 mb-2">
                                    آدرس وب‌سایت
                                  </label>
                                  <Input
                                    value={editForm.url || ""}
                                    onChange={(e) =>
                                      setEditForm((prev) => ({
                                        ...prev,
                                        url: e.target.value,
                                      }))
                                    }
                                    placeholder="example.com"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-grey-700 mb-2">
                                  توضیحات
                                </label>
                                <textarea
                                  value={editForm.description || ""}
                                  onChange={(e) =>
                                    setEditForm((prev) => ({
                                      ...prev,
                                      description: e.target.value,
                                    }))
                                  }
                                  rows={3}
                                  className="w-full px-4 py-3 border border-grey-200 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all resize-none"
                                  placeholder="توضیح کوتاهی از کاربرد این چت بات..."
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <label className="block text-sm font-medium text-grey-700 mb-2">
                                    زبان
                                  </label>
                                  <Select
                                    value={editForm.language || ""}
                                    onValueChange={(value) =>
                                      setEditForm((prev) => ({
                                        ...prev,
                                        language: value,
                                      }))
                                    }
                                    placeholder="زبان را انتخاب کنید"
                                  >
                                    {onboardingData.languages.map((lang) => (
                                      <option key={lang.code} value={lang.code}>
                                        {lang.name} ({lang.native})
                                      </option>
                                    ))}
                                  </Select>
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-grey-700 mb-2">
                                    لحن گفتگو
                                  </label>
                                  <Select
                                    value={editForm.tone || ""}
                                    onValueChange={(value) =>
                                      setEditForm((prev) => ({
                                        ...prev,
                                        tone: value,
                                      }))
                                    }
                                    placeholder="لحن را انتخاب کنید"
                                  >
                                    {onboardingData.tones.map((tone) => (
                                      <option key={tone.id} value={tone.id}>
                                        {tone.name}
                                      </option>
                                    ))}
                                  </Select>
                                </div>
                              </div>
                            </div>
                          )}

                          {activeTab === "knowledge" && (
                            <div className="space-y-6">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium text-grey-900">
                                  پایگاه دانش چت بات
                                </h4>
                                <span className="text-sm text-grey-600">
                                  {editForm.knowledgeBase?.length || 0} آیتم
                                </span>
                              </div>

                              {/* Add New Knowledge Item */}
                              <Card className="p-4 bg-grey-50">
                                <h5 className="font-medium text-grey-900 mb-4">
                                  افزودن دانش جدید
                                </h5>
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <Select
                                      value={newKnowledgeItem.type || "faq"}
                                      onValueChange={(value) =>
                                        setNewKnowledgeItem((prev) => ({
                                          ...prev,
                                          type: value as any,
                                        }))
                                      }
                                    >
                                      {onboardingData.knowledgeTypes.map(
                                        (type) => (
                                          <option key={type.id} value={type.id}>
                                            {type.title}
                                          </option>
                                        )
                                      )}
                                    </Select>
                                    <Input
                                      placeholder="عنوان"
                                      value={newKnowledgeItem.title || ""}
                                      onChange={(e) =>
                                        setNewKnowledgeItem((prev) => ({
                                          ...prev,
                                          title: e.target.value,
                                        }))
                                      }
                                    />
                                  </div>
                                  <textarea
                                    placeholder="محتوا..."
                                    value={newKnowledgeItem.content || ""}
                                    onChange={(e) =>
                                      setNewKnowledgeItem((prev) => ({
                                        ...prev,
                                        content: e.target.value,
                                      }))
                                    }
                                    rows={3}
                                    className="w-full px-4 py-3 border border-grey-200 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all resize-none"
                                  />
                                  <Button
                                    onClick={addKnowledgeItem}
                                    disabled={
                                      !newKnowledgeItem.title ||
                                      !newKnowledgeItem.content
                                    }
                                    // size="small"
                                  >
                                    <Plus className="w-4 h-4 ml-2" />
                                    افزودن
                                  </Button>
                                </div>
                              </Card>

                              {/* Existing Knowledge Items */}
                              <div className="space-y-3">
                                {editForm.knowledgeBase?.map((item) => (
                                  <Card key={item.id} className="p-4">
                                    <div className="flex items-start justify-between">
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                          <span className="px-2 py-1 bg-brand-primary/10 text-brand-primary text-xs rounded-lg">
                                            {
                                              onboardingData.knowledgeTypes.find(
                                                (t) => t.id === item.type
                                              )?.title
                                            }
                                          </span>
                                          <h6 className="font-medium text-grey-900">
                                            {item.title}
                                          </h6>
                                        </div>
                                        <p className="text-grey-600 text-sm line-clamp-2">
                                          {item.content}
                                        </p>
                                      </div>
                                      <button
                                        onClick={() =>
                                          removeKnowledgeItem(item.id)
                                        }
                                        className="p-1 text-grey-400 hover:text-danger hover:bg-danger/10 rounded transition-all"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </Card>
                                ))}
                              </div>
                            </div>
                          )}

                          {activeTab === "design" && (
                            <div className="grid lg:grid-cols-2 gap-6">
                              <div className="space-y-6">
                                {/* Color Selection */}
                                <Card className="p-4">
                                  <h5 className="font-medium text-grey-900 mb-4">
                                    رنگ اصلی
                                  </h5>
                                  <div className="grid grid-cols-4 gap-3">
                                    {onboardingData.colors.map(
                                      (colorOption) => (
                                        <button
                                          key={colorOption.value}
                                          onClick={() =>
                                            setEditForm((prev) => ({
                                              ...prev,
                                              color: colorOption.value,
                                            }))
                                          }
                                          className={`relative w-full aspect-square rounded-lg transition-all duration-200 ${
                                            editForm.color === colorOption.value
                                              ? "ring-2 ring-grey-400 ring-offset-2 scale-105"
                                              : "hover:scale-105"
                                          }`}
                                          style={{
                                            backgroundColor: colorOption.value,
                                          }}
                                          title={colorOption.name}
                                        >
                                          {editForm.color ===
                                            colorOption.value && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                              <svg
                                                className="w-5 h-5 text-white"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                              >
                                                <path
                                                  fillRule="evenodd"
                                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                  clipRule="evenodd"
                                                />
                                              </svg>
                                            </div>
                                          )}
                                        </button>
                                      )
                                    )}
                                  </div>
                                </Card>

                                {/* Position & Size */}
                                <Card className="p-4">
                                  <h5 className="font-medium text-grey-900 mb-4">
                                    موقعیت و اندازه
                                  </h5>
                                  <div className="space-y-4">
                                    <div>
                                      <label className="block text-sm text-grey-700 mb-2">
                                        موقعیت
                                      </label>
                                      <div className="grid grid-cols-2 gap-2">
                                        {onboardingData.positionOptions.map(
                                          (position) => (
                                            <button
                                              key={position.id}
                                              onClick={() =>
                                                setEditForm((prev) => ({
                                                  ...prev,
                                                  branding: {
                                                    ...prev.branding!,
                                                    position:
                                                      position.id as any,
                                                  },
                                                }))
                                              }
                                              className={`p-3 rounded-lg border-2 transition-all text-sm ${
                                                editForm.branding?.position ===
                                                position.id
                                                  ? "border-brand-primary bg-brand-primary/5"
                                                  : "border-grey-200 hover:border-brand-primary/50"
                                              }`}
                                            >
                                              {position.name}
                                            </button>
                                          )
                                        )}
                                      </div>
                                    </div>

                                    <div>
                                      <label className="block text-sm text-grey-700 mb-2">
                                        اندازه
                                      </label>
                                      <div className="space-y-2">
                                        {onboardingData.sizeOptions.map(
                                          (sizeOption) => (
                                            <button
                                              key={sizeOption.id}
                                              onClick={() =>
                                                setEditForm((prev) => ({
                                                  ...prev,
                                                  branding: {
                                                    ...prev.branding!,
                                                    size: sizeOption.id as any,
                                                  },
                                                }))
                                              }
                                              className={`w-full p-3 rounded-lg border-2 transition-all text-sm flex items-center justify-between ${
                                                editForm.branding?.size ===
                                                sizeOption.id
                                                  ? "border-brand-primary bg-brand-primary/5"
                                                  : "border-grey-200 hover:border-brand-primary/50"
                                              }`}
                                            >
                                              <span>{sizeOption.name}</span>
                                              <div
                                                className="rounded-full flex items-center justify-center text-white text-xs"
                                                style={{
                                                  backgroundColor:
                                                    editForm.color,
                                                  width: `${
                                                    getSizeInPx(sizeOption.id) /
                                                    3
                                                  }px`,
                                                  height: `${
                                                    getSizeInPx(sizeOption.id) /
                                                    3
                                                  }px`,
                                                }}
                                              >
                                                💬
                                              </div>
                                            </button>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </Card>
                              </div>

                              {/* Live Preview */}
                              <Card className="p-4">
                                <h5 className="font-medium text-grey-900 mb-4">
                                  پیش‌نمایش زنده
                                </h5>
                                <div className="relative bg-white border rounded-lg p-4 min-h-[300px]">
                                  {/* Chat Preview */}
                                  <div className="space-y-3">
                                    <div className="flex justify-start">
                                      <div
                                        className="max-w-xs p-3 rounded-lg text-white text-sm"
                                        style={{
                                          backgroundColor: editForm.color,
                                        }}
                                      >
                                        {editForm.welcomeMessage}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Chat Button */}
                                  <div
                                    className={`absolute rounded-full shadow-lg flex items-center justify-center text-white font-medium ${
                                      editForm.branding?.position ===
                                      "bottom-right"
                                        ? "bottom-4 left-4"
                                        : "bottom-4 right-4"
                                    }`}
                                    style={{
                                      backgroundColor: editForm.color,
                                      width: `${getSizeInPx(
                                        editForm.branding?.size || "medium"
                                      )}px`,
                                      height: `${getSizeInPx(
                                        editForm.branding?.size || "medium"
                                      )}px`,
                                      fontSize: `${
                                        getSizeInPx(
                                          editForm.branding?.size || "medium"
                                        ) / 3
                                      }px`,
                                    }}
                                  >
                                    💬
                                  </div>
                                </div>
                              </Card>
                            </div>
                          )}

                          {activeTab === "messages" && (
                            <div className="space-y-6">
                              {/* Header Section */}
                              <div className="bg-brand-primary/5 border border-brand-primary/20 rounded-xl p-4 mb-6">
                                <div className="flex items-start gap-3">
                                  <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <MessageSquare className="w-4 h-4 text-brand-primary" />
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-grey-900 mb-2">
                                      تنظیمات پاسخگویی
                                    </h4>
                                    <p className="text-grey-600 text-sm leading-relaxed">
                                      این تنظیمات نحوه پاسخ‌گویی و رفتار چت‌بات
                                      شما را کنترل می‌کند و کیفیت تعاملات با
                                      کاربران را بهبود می‌دهد. پیام‌های مناسب
                                      باعث تجربه بهتر کاربران می‌شود.
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-grey-700 mb-2">
                                  پیام خوش‌آمدگویی{" "}
                                  <span className="text-brand-primary">*</span>
                                </label>
                                <textarea
                                  value={editForm.welcomeMessage || ""}
                                  onChange={(e) =>
                                    setEditForm((prev) => ({
                                      ...prev,
                                      welcomeMessage: e.target.value,
                                    }))
                                  }
                                  rows={3}
                                  className="w-full px-4 py-3 border border-grey-200 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all resize-none"
                                  placeholder="سلام! چطور می‌تونم کمکتون کنم؟"
                                />
                                <p className="text-grey-500 mt-1 text-sm">
                                  اولین پیامی که کاربران می‌بینند
                                </p>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-grey-700 mb-2">
                                  پیام عدم درک سؤال
                                </label>
                                <textarea
                                  value={editForm.fallbackMessage || ""}
                                  onChange={(e) =>
                                    setEditForm((prev) => ({
                                      ...prev,
                                      fallbackMessage: e.target.value,
                                    }))
                                  }
                                  rows={3}
                                  className="w-full px-4 py-3 border border-grey-200 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all resize-none"
                                  placeholder="متأسفانه نمی‌تونم پاسخ این سؤال رو بدم."
                                />
                                <p className="text-grey-500 mt-1 text-sm">
                                  زمانی که دستیار نمی‌تواند پاسخ دهد
                                </p>
                              </div>

                              {/* Response Settings */}
                              <Card className="p-6 border-2 border-brand-primary/20 bg-brand-primary/5">
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="w-8 h-8 bg-brand-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Settings className="w-4 h-4 text-brand-primary" />
                                  </div>
                                  <h5 className="font-medium text-grey-900">
                                    تنظیمات پاسخگویی
                                  </h5>
                                </div>

                                <div className="space-y-6">
                                  {/* Source Only Setting */}
                                  <div className="flex items-center justify-between">
                                    <div className="flex-1 ml-4">
                                      <h6 className="font-medium text-grey-900 mb-1">
                                        فقط از منابع پاسخ دهد
                                      </h6>
                                      <p className="text-grey-600 text-sm">
                                        چت‌بات تنها بر اساس اطلاعات پایگاه دانش
                                        پاسخ دهد
                                      </p>
                                    </div>
                                    <Switch
                                      checked={
                                        editForm.responseSettings?.sourceOnly ||
                                        false
                                      }
                                      onCheckedChange={(checked) =>
                                        setEditForm((prev) => ({
                                          ...prev,
                                          responseSettings: {
                                            ...prev.responseSettings!,
                                            sourceOnly: checked,
                                          },
                                        }))
                                      }
                                    />
                                  </div>

                                  {/* Show Source Setting */}
                                  <div className="flex items-center justify-between">
                                    <div className="flex-1 ml-4">
                                      <h6 className="font-medium text-grey-900 mb-1">
                                        نمایش منبع پاسخ
                                      </h6>
                                      <p className="text-grey-600 text-sm">
                                        منبع اطلاعات در انتهای پاسخ نمایش داده
                                        شود
                                      </p>
                                    </div>
                                    <Switch
                                      checked={
                                        editForm.responseSettings?.showSource ||
                                        false
                                      }
                                      onCheckedChange={(checked) =>
                                        setEditForm((prev) => ({
                                          ...prev,
                                          responseSettings: {
                                            ...prev.responseSettings!,
                                            showSource: checked,
                                          },
                                        }))
                                      }
                                    />
                                  </div>

                                  {/* Show Contact Info Setting */}
                                  <div className="flex items-center justify-between">
                                    <div className="flex-1 ml-4">
                                      <h6 className="font-medium text-grey-900 mb-1">
                                        نمایش اطلاعات تماس
                                      </h6>
                                      <p className="text-grey-600 text-sm">
                                        ایمیل و شماره تماس در پایان گفتگو نمایش
                                        داده شود
                                      </p>
                                    </div>
                                    <Switch
                                      checked={
                                        editForm.responseSettings
                                          ?.showContactInfo || false
                                      }
                                      onCheckedChange={(checked) =>
                                        setEditForm((prev) => ({
                                          ...prev,
                                          responseSettings: {
                                            ...prev.responseSettings!,
                                            showContactInfo: checked,
                                          },
                                        }))
                                      }
                                    />
                                  </div>

                                  {/* Contact Information Inputs */}
                                  {editForm.responseSettings
                                    ?.showContactInfo && (
                                    <div className="pt-4 border-t border-brand-primary/20 space-y-4">
                                      <div>
                                        <label className="block text-sm font-medium text-grey-700 mb-2">
                                          ایمیل پشتیبانی
                                        </label>
                                        <Input
                                          type="email"
                                          value={
                                            editForm.responseSettings?.email ||
                                            ""
                                          }
                                          onChange={(e) =>
                                            setEditForm((prev) => ({
                                              ...prev,
                                              responseSettings: {
                                                ...prev.responseSettings!,
                                                email: e.target.value,
                                              },
                                            }))
                                          }
                                          placeholder="support@company.com"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-sm font-medium text-grey-700 mb-2">
                                          شماره تماس
                                        </label>
                                        <Input
                                          value={
                                            editForm.responseSettings
                                              ?.phoneNumber || ""
                                          }
                                          onChange={(e) =>
                                            setEditForm((prev) => ({
                                              ...prev,
                                              responseSettings: {
                                                ...prev.responseSettings!,
                                                phoneNumber: e.target.value,
                                              },
                                            }))
                                          }
                                          placeholder="۰۲۱-۱۲۳۴۵۶۷۸"
                                        />
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </Card>

                              {/* Message Preview */}
                              <Card className="p-4 bg-grey-50">
                                <h5 className="font-medium text-grey-900 mb-4">
                                  پیش‌نمایش پیام‌ها
                                </h5>
                                <div className="space-y-3">
                                  <div className="flex justify-start">
                                    <div
                                      className="max-w-xs p-3 rounded-lg text-white text-sm"
                                      style={{
                                        backgroundColor: editForm.color,
                                      }}
                                    >
                                      {editForm.welcomeMessage ||
                                        "پیام خوش‌آمدگویی"}
                                    </div>
                                  </div>
                                  <div className="flex justify-end">
                                    <div className="max-w-xs p-3 rounded-lg bg-grey-200 text-grey-900 text-sm">
                                      سؤال نامشخص از کاربر
                                    </div>
                                  </div>
                                  <div className="flex justify-start">
                                    <div
                                      className="max-w-xs p-3 rounded-lg text-white text-sm"
                                      style={{
                                        backgroundColor: editForm.color,
                                      }}
                                    >
                                      {editForm.fallbackMessage ||
                                        "پیام عدم درک"}
                                    </div>
                                  </div>
                                </div>
                              </Card>
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-4 border-t border-grey-200">
                          <Button
                            onClick={handleSaveEdit}
                            className="bg-brand-primary text-white"
                          >
                            <Save className="w-4 h-4 ml-2" />
                            ذخیره تغییرات
                          </Button>
                          <Button
                            onClick={handleCancelEdit}
                            variant="secondary"
                          >
                            انصراف
                          </Button>
                        </div>
                      </div>
                    ) : (
                      // View Mode
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {/* Status Indicator */}
                          <div
                            className="w-4 h-4 rounded-full flex-shrink-0"
                            style={{ backgroundColor: chatbot.color }}
                          />

                          {/* Chatbot Info */}
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-bold text-grey-900 text-lg">
                                {chatbot.name}
                              </h3>
                              <span
                                className="px-3 py-1 rounded-full text-xs font-medium"
                                style={{
                                  backgroundColor: `${getStatusColor(
                                    chatbot.status
                                  )}15`,
                                  color: getStatusColor(chatbot.status),
                                }}
                              >
                                {getStatusText(chatbot.status)}
                              </span>
                            </div>
                            <p className="text-grey-600 text-sm mb-1">
                              {chatbot.url}
                            </p>
                            {chatbot.description && (
                              <p className="text-grey-500 text-sm">
                                {chatbot.description}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Stats and Actions */}
                        <div className="flex items-center gap-6">
                          {/* Stats */}
                          <div className="text-center">
                            <p className="text-lg font-bold text-grey-900">
                              {chatbot.conversationsToday}
                            </p>
                            <p className="text-xs text-grey-500">گفتگو امروز</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-bold text-grey-900">
                              {chatbot.responseRate}%
                            </p>
                            <p className="text-xs text-grey-500">نرخ پاسخ</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-medium text-grey-700">
                              {chatbot.lastUpdated}
                            </p>
                            <p className="text-xs text-grey-500">
                              آخرین بروزرسانی
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEdit(chatbot)}
                              className="p-2 text-grey-600 hover:text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-all"
                              title="ویرایش"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => toggleStatus(chatbot.id)}
                              className={`p-2 rounded-lg transition-all ${
                                chatbot.status === "active"
                                  ? "text-danger hover:bg-danger/10"
                                  : "text-success hover:bg-success/10"
                              }`}
                              title={
                                chatbot.status === "active"
                                  ? "غیرفعال کردن"
                                  : "فعال کردن"
                              }
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => deleteChatbot(chatbot.id)}
                              className="p-2 text-grey-600 hover:text-danger hover:bg-danger/10 rounded-lg transition-all"
                              title="حذف"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>

                            <div className="w-px h-6 bg-grey-200 mx-1" />

                            <button
                              className="p-2 text-grey-600 hover:text-grey-900 hover:bg-grey-100 rounded-lg transition-all"
                              title="تنظیمات بیشتر"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Add New Chatbot Button */}
              <div className="p-6 border-t border-grey-100 bg-grey-50/30">
                <button className="w-full p-4 border-2 border-dashed border-brand-primary/30 rounded-xl text-brand-primary hover:border-brand-primary/50 hover:bg-brand-primary/5 transition-all flex items-center justify-center gap-3">
                  <div className="w-8 h-8 bg-brand-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-brand-primary font-bold text-lg">
                      +
                    </span>
                  </div>
                  <span className="font-medium">افزودن چت بات جدید</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
