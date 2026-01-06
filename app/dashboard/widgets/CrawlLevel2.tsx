"use client";
import React, { useEffect, useState } from "react";
import LoadingModal from "../../../components/LoadingModal";
import axiosInstance from "@/lib/axiosInstance";
import TreeViewContainer from "@/components/TreeViewContainer";
import { Tick } from "@/public/icons/AppIcons";
import { Input } from "@/components/input";
import { toast } from "sonner";
import { Button } from "@/components/button";
import { Checkbox } from "@/components/checkbox";
import { API_ROUTES } from "@/constants/apiRoutes";
import { TreeNodeType } from "@/types/common";
import { buildSitemapTree } from "@/utils/buildSitemapTree";

interface ChatbotDetailModalProps {
  show: boolean;
  chatbot?: { uuid: string };
  onClose: (success?: boolean) => void;
}

export default function CrawlLevel2({
  show,
  chatbot,
  onClose,
}: ChatbotDetailModalProps) {
  const [url, setUrl] = useState<string>("");
  const [tree, setTree] = useState<TreeNodeType[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [selectedUrl, setSelectedUrl] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!chatbot) return;
    setTree([]);
    setSelectedUrl([]);
  }, [chatbot]);

  const handleCrawl = async () => {
    if (!url) return;
    if (!chatbot?.uuid) return;
    setTree([]);
    setLoading(true);

    try {
      const formData = new URLSearchParams();
      formData.append("url", url);

      const res = await axiosInstance.post(
        API_ROUTES.BOTS.CRAWL_DISCOVER(chatbot!.uuid),
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log("response: ", res);

      if (!res.data?.success) {
        toast.error("خطا در دریافت لینک‌ها");
        return;
      }

      const allurls = res.data?.data?.discovered_links || [];

      if (allurls.length === 0) {
        toast.error("لینکی یافت نشد");
        return;
      }

      const tree = buildSitemapTree(allurls);
      console.log("tree: ", tree);
      setTree(tree);
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
    const selectedUrl = getSelectedUrls(tree, checkedMap);
    if (selectedUrl.length === 0) {
      toast.error("لطفاً حداقل یک لینک را انتخاب کنید.");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await axiosInstance.post(
        API_ROUTES.BOTS.CRAWL_BATCH(chatbot.uuid),
        { urls: selectedUrl }
      );

      if (!res.data?.success) {
        toast.error("خطا در دریافت لینک‌ها");
        return;
      }

      setIsSubmitting(false);
      toast.success("لینک‌ها ثبت شدند");
      onClose(true);
    } catch (err: any) {
      const backendMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.response?.data?.msg;
      if (backendMessage) {
        toast.error(backendMessage);
      } else {
        toast.error("خطا در ذخیره اطلاعات. لطفاً دوباره تلاش کنید.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValidUrl = (value: string) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };
  const hasCheckedChild = (
    node: TreeNodeType,
    checkedMap: Record<string, boolean>
  ): boolean => {
    if (!node.children || node.children.length === 0) return false;

    return node.children.some(
      (child) => checkedMap[child.id] || hasCheckedChild(child, checkedMap)
    );
  };

  const getSelectedUrls = (
    nodes: TreeNodeType[],
    checkedMap: Record<string, boolean>
  ): string[] => {
    let result: string[] = [];

    nodes.forEach((node) => {
      const isChecked = checkedMap[node.id];
      const hasChildChecked = hasCheckedChild(node, checkedMap);

      // ✅ فقط اگر:
      // - خود نود انتخاب شده
      // - لینک داشته باشد
      // - و فرزند انتخاب‌شده نداشته باشد (leaf یا انتخاب نهایی)
      if (isChecked && node.url && !hasChildChecked) {
        result.push(node.url);
      }

      if (node.children && node.children.length > 0) {
        result = result.concat(getSelectedUrls(node.children, checkedMap));
      }
    });

    return result;
  };

  const getSelectedUrls1 = (
    nodes: TreeNodeType[],
    checkedMap: Record<string, boolean>
  ): string[] => {
    let result: string[] = [];

    nodes.forEach((node) => {
      if (node.url && checkedMap[node.id]) {
        result.push(node.url);
      }
      if (node.children && node.children.length > 0) {
        result = result.concat(getSelectedUrls(node.children, checkedMap));
      }
    });

    return result;
  };

  const handleSelectAll = (value: boolean) => {
    setSelectAll(value);
    const newMap: Record<string, boolean> = {};

    const checkAllNodes = (nodes: TreeNodeType[]) => {
      nodes.forEach((node) => {
        if (node.url) newMap[node.id] = value;
        if (node.children && node.children.length > 0)
          checkAllNodes(node.children);
      });
    };

    checkAllNodes(tree);
    setCheckedMap(newMap);
    setSelectAll(value);
  };

  if (!show) return null;

  return (
    <div
      className=" fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      // onClick={() => onClose(false)}
    >
      {loading && (
        <LoadingModal
          show={loading}
          message="در حال بررسی لینک‌ها... لطفاً منتظر بمانید. این عملیات ممکن است کمی طول بکشد."
        />
      )}
      <div
        className="bg-white max-h-[95vh] rounded-3xl max-w-2xl w-full overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full font-semibold items-center justify-center p-4 text-white bg-primary">
          خزش وب‌سایت سطح ۲
        </div>
        <div className="flex w-full flex-col justify-center gap-4 p-6">
          <div className="flex flex-col items-center justify-start border-b border-gray-200 ">
            <div className="w-full flex items-center">
              <label className="text-gray-900 m-2 whitespace-nowrap">
                آدرس وب <span className="text-red-500">*</span>
              </label>
              <div className="flex-1">
                <Input
                  id="url"
                  type="url"
                  value={url}
                  autoComplete="url"
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/about"
                  className="w-full text-left!"
                  dir="ltr"
                />
                <span className="text-gray-500 text-sm my-1">
                  آدرس وب‌سایت با فرمت https://example.com وارد شود
                </span>
              </div>
            </div>
            <div className=" flex items-center justify-center gap-4">
              <Button
                variant="primary"
                onClick={handleCrawl}
                disabled={!url || !isValidUrl(url) || loading}
                className="px-12 py-3 my-3 min-w-40 shadow-lg hover:shadow-xl w-fit cursor-pointer"
              >
                {loading ? "در حال بررسی..." : "بررسی"}
              </Button>
              <Button
                variant="secondary"
                onClick={() => onClose(false)}
                disabled={loading}
                className="px-12 py-3 min-w-40 shadow-lg hover:shadow-xl cursor-pointer"
              >
                انصراف
              </Button>
            </div>
          </div>

          {tree && tree.length > 0 && (
            <div className="flex flex-col items-start border-gray-200 p-4 gap-4">
              <div className="w-full font-medium mb-2  flex items-center justify-between">
                <div>لینک‌های دریافت شده:</div>
                <div className="flex items-center gap-1">
                  <div className="w-5 h-5 text-primary">
                    <Tick />
                  </div>
                  <span className="font-light text-sm text-matn">
                    تعداد: {tree.length.toLocaleString("fa-IR")}
                  </span>
                </div>
              </div>

              {/* لیست URLها */}
              <div className="flex flex-col gap-2 max-h-64 overflow-y-auto border rounded-lg p-2 w-full  bg-gray-50">
                <TreeViewContainer
                  data={tree}
                  checkedMap={checkedMap}
                  onToggle={(id, checked) =>
                    setCheckedMap((prev) => ({ ...prev, [id]: checked }))
                  }
                />
              </div>
              <div className="text-sm">
                <Checkbox
                  id="select-all"
                  label="انتخاب همه"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </div>
              <div className="w-full flex justify-center items-center gap-2">
                <Button
                  variant="primary"
                  disabled={isSubmitting}
                  onClick={handleSave}
                  className="mt-2 px-12 py-3 min-w-40 shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? "منتظر بمانید ..." : " ثبت انتخاب‌ها"}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => onClose(false)}
                  disabled={loading}
                  className="mt-2 px-12 py-3 min-w-40 shadow-lg hover:shadow-xl"
                  
                >
                  بستن
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
