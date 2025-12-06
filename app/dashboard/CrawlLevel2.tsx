"use client";
import React, { useEffect, useState } from "react";
import PageLoader from "@/components/pageLoader";
import axiosInstance from "@/lib/axiosInstance";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { toast } from "sonner";
import { BotConfig } from "@/types/common";
import { API_ROUTES } from "@/constants/apiRoutes";

interface ChatbotDetailModalProps {
  show: boolean;
  chatbot?: { uuid: string };
  onClose: () => void;
}

export default function CrawlLevel2({
  show,
  chatbot,
  onClose,
}: ChatbotDetailModalProps) {
  const [url, setUrl] = useState<string>("");
  const [allUrl, setAllUrl] = useState<string[]>([]);
  const [selectedUrl, setSelectedUrl] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!chatbot) return;
    setAllUrl([]);
    setSelectedUrl([]);
  }, [chatbot]);

  const handleCrawl = async () => {
    if (!url) return;
    if (!chatbot?.uuid) return;
    setLoading(true);

    try {
      const res = await axiosInstance.post(
        API_ROUTES.BOTS.CRAWL_DISCOVER(chatbot!.uuid),
        { url: url }
      );

      if (!res.data?.success) {
        toast.error("خطا در دریافت لینک‌ها");
        return;
      }
      // فرض می‌کنیم لینک‌ها در res.data.urls هست
      setAllUrl(res.data.urls || []);
      toast.success("لینک‌ها دریافت شد");
    } catch (err: any) {
      console.error("خطا در دریافت لینک‌ها:", err);
      const backendMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.response?.data?.msg;
      toast.error(backendMessage || "خطا در دریافت لینک‌ها");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!chatbot?.uuid) return;
    if (selectedUrl.length === 0) {
      toast.error("لطفاً حداقل یک لینک را انتخاب کنید.");
      return;
    }
    const res = await axiosInstance.post(
      API_ROUTES.BOTS.CRAWL_BATCH(chatbot?.uuid),
      { urls: selectedUrl }
    );
    if (!res.data?.success) {
      toast.error("خطا در دریافت لینک‌ها");
      return;
    }

    // اینجا می‌تونید selectedUrl رو برای backend بفرستید
    console.log("لینک‌های انتخاب شده:", selectedUrl);
    toast.success("لینک‌ها ثبت شدند");
    onClose();
  };

  const toggleSelectUrl = (link: string) => {
    setSelectedUrl((prev) =>
      prev.includes(link) ? prev.filter((l) => l !== link) : [...prev, link]
    );
  };

  if (!show) return null;

  return (
    <div
      className=" fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      {loading && <PageLoader />}
      <div
        className="bg-white max-h-[95vh] rounded-3xl max-w-2xl w-full overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full font-semibold items-center justify-center p-4 text-white bg-primary">
          خزش وب‌سایت سطح 2
        </div>
        <div className="flex w-full flex-col justify-center gap-4 p-6">
          <div className="flex flex-col items-center justify-start border-b border-gray-200 ">
            <div className="w-full flex items-center">
              <label className="text-gray-900 m-2 whitespace-nowrap">
                آدرس وب <span className="text-blue-500">*</span>
              </label>
              <div className="flex-1">
                <Input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="آدرس وب"
                  className="w-full"
                />
              </div>
            </div>

            <Button
              variant="primary"
              onClick={handleCrawl}
              disabled={!url || loading}
              className="px-12 py-3 my-3 min-w-40 shadow-lg hover:shadow-xl w-fit"
            >
              {loading ? "در حال بررسی..." : "بررسی"}
            </Button>
          </div>

          {allUrl.length > 0 && (
            <div>
              <p className="font-semibold mb-2 text-right">
                لینک‌های دریافت شده:
              </p>
              <div className="flex flex-col gap-2 max-h-64 overflow-y-auto border rounded-lg p-2">
                {allUrl.map((link) => (
                  <label
                    key={link}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedUrl.includes(link)}
                      onChange={() => toggleSelectUrl(link)}
                      className="w-4 h-4"
                    />
                    <span className="truncate">{link}</span>
                  </label>
                ))}
              </div>
              <Button
                variant="primary"
                onClick={handleSave}
                className="mt-4 px-12 py-3 min-w-40 shadow-lg hover:shadow-xl"
              >
                ثبت انتخاب‌ها
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
