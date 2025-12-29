"use client";
import React, { useEffect, useState } from "react";
import LoadingModal from "../../../components/LoadingModal";
import axiosInstance from "@/lib/axiosInstance";
import TreeViewContainer from "@/components/TreeViewContainer";
import { Input } from "@/components/input";
import { toast } from "sonner";
import { Button } from "@/components/button";
import { Checkbox } from "@/components/checkbox";
import { LayoutRow } from "@/public/icons/dashboard";
import { API_ROUTES } from "@/constants/apiRoutes";
import { TreeNodeType } from "@/types/common";
import { buildSitemapTree } from "@/utils/buildSitemapTree";
import { Tick } from "@/public/icons/AppIcons";

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
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!chatbot) return;
    setTree([]);
    setSelectedUrl([]);
  }, [chatbot]);

  const handleCrawl = async () => {
    console.log("handleCrawl");

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
      // const allurls = [
      //   {
      //     url: "https://aia-ai.com/chatbots",
      //     title: "فروش چت‌بات‌ها",
      //   },
      //   {
      //     url: "https://aia-ai.com/chatbots/chat-gpt",
      //     title: "خرید اکانت Chat GPT پلاس",
      //   },
      //   {
      //     url: "https://aia-ai.com/pdf-courses",
      //     title: "جزوات آموزشی",
      //   },
      //   {
      //     url: "https://aia-ai.com/courses",
      //     title: "دوره‌های آموزشی",
      //   },
      //   {
      //     url: "https://aia-ai.com/webinar",
      //     title: "وبینار هوش مصنوعی",
      //   },
      //   {
      //     url: "https://aia-ai.com/my-account",
      //     title: "ورود / عضویت",
      //   },
      //   {
      //     url: "https://aia-ai.com/courses-2",
      //     title:
      //       "دوره‌های آموزشیبه روز‌ترین دانش و مهارت‌ها را از متخصصان این حوزه بیاموزید.",
      //   },
      //   {
      //     url: "https://aia-ai.com/product/%d9%85%d8%a8%d8%a7%d8%ad%d8%ab-%d9%be%db%8c%d8%b4%d8%b1%d9%81%d8%aa%d9%87-%d8%af%d8%b1-%da%a9%d8%a7%d8%b1-%d8%a8%d8%a7-%d9%85%d8%af%d9%84%d9%87%d8%a7%db%8c-%d8%b2%d8%a8%d8%a7%d9%86%db%8c",
      //     title: null,
      //   },
      //   {
      //     url: "https://aia-ai.com/product/%d8%a2%d8%b4%d9%86%d8%a7%db%8c%db%8c-%d8%a8%d8%a7-%da%a9%d8%aa%d8%a7%d8%a8%d8%ae%d8%a7%d9%86%d9%87-numpy",
      //     title: null,
      //   },
      //   {
      //     url: "https://aia-ai.com/product/gpt-%da%86%da%af%d9%88%d9%86%d9%87-%d9%85%d8%aa%d9%88%d9%84%d8%af-%d8%b4%d8%af%d8%9f",
      //     title: null,
      //   },
      //   {
      //     url: "https://aia-ai.com/product/%d9%85%da%a9%d8%a7%d9%86%db%8c%d8%b2%d9%85-%d8%aa%d9%88%d8%ac%d9%87-%da%86%da%af%d9%88%d9%86%d9%87-%d8%a8%d9%87-%d9%88%d8%ac%d9%88%d8%af-%d8%a2%d9%85%d8%af%d8%9f",
      //     title: null,
      //   },
      //   {
      //     url: "https://aia-ai.com/product/%d9%be%d8%b1%d8%af%d8%a7%d8%b2%d8%b4-%d8%aa%d8%b5%d9%88%db%8c%d8%b1-%d9%88-%d8%a8%db%8c%d9%86%d8%a7%db%8c%db%8c-%d9%85%d8%a7%d8%b4%db%8c%d9%86",
      //     title: null,
      //   },
      //   {
      //     url: "https://aia-ai.com/product/%d8%b3%db%8c%d8%b3%d8%aa%d9%85%d9%87%d8%a7%db%8c-%d8%aa%d9%88%d8%b5%db%8c%d9%87%da%af%d8%b1",
      //     title: null,
      //   },
      //   {
      //     url: "https://aia-ai.com/product/%d9%be%d8%b1%d8%af%d8%a7%d8%b2%d8%b4-%d8%b5%d9%88%d8%aa",
      //     title: null,
      //   },
      //   {
      //     url: "https://aia-ai.com/product/pandas",
      //     title: null,
      //   },
      //   {
      //     url: "https://aia-ai.com/course/%d8%ad%d9%84-%d8%aa%d9%85%d8%b1%db%8c%d9%86-%d8%af%d8%b1%d9%88%d8%b3-%d8%b3%d8%b1%d9%88%db%8c%d8%b3-%d8%a8%d8%a7-%d9%87%d9%88%d8%b4-%d9%85%d8%b5%d9%86%d9%88%d8%b9%db%8c",
      //     title: null,
      //   },
      //   {
      //     url: "https://aia-ai.com/course-category/webinar",
      //     title: "کاربردی",
      //   },
      //   {
      //     url: "https://aia-ai.com/course/%d9%85%d8%a8%d8%a7%d8%ad%d8%ab-%d9%be%db%8c%d8%b4%d8%b1%d9%81%d8%aa%d9%87-%d8%af%d8%b1-%d9%be%d8%b1%d8%af%d8%a7%d8%b2%d8%b4-%d8%b2%d8%a8%d8%a7%d9%86-%d8%b7%d8%a8%db%8c%d8%b9%db%8c",
      //     title: null,
      //   },
      //   {
      //     url: "https://aia-ai.com/course-category/natural-language-processing",
      //     title: "پردازش زبان طبیعی",
      //   },
      //   {
      //     url: "https://aia-ai.com/course/%d8%aa%d9%86%d8%b8%db%8c%d9%85-%d9%87%d8%a7%db%8c%d9%be%d8%b1%d9%be%d8%a7%d8%b1%d8%a7%d9%85%d8%aa%d8%b1%d9%87%d8%a7%db%8c-%d8%af%d8%b1-%d8%b4%d8%a8%da%a9%d9%87%d9%87%d8%a7%db%8c-%d8%b9%d9%85",
      //     title: null,
      //   },
      //   {
      //     url: "https://aia-ai.com/course-category/deep-learning",
      //     title: "یادگیری عمیق",
      //   },
      //   {
      //     url: "https://aia-ai.com/course/%da%86%d8%aa-%d8%a8%d8%a7%d8%aa",
      //     title: null,
      //   },
      //   {
      //     url: "https://aia-ai.com/wp-content/uploads/2024/11/IMG_20241125_095507.png",
      //     title: null,
      //   },
      //   {
      //     url: "https://aia-ai.com/webinar/management-and-ai-webinars/وبینار-هوش-مصنوعی-صنعتی-از-تئوری-تا-عمل",
      //     title: "مشاهده وبینار",
      //   },
      //   {
      //     url: "https://aia-ai.com/wp-content/uploads/2024/11/IMG_20241118_162949.jpg",
      //     title: null,
      //   },
      //   {
      //     url: "https://aia-ai.com/course/انجام-یک-پایان-نامه-از-صفر-تا-صد",
      //     title: "مشاهده وبینار",
      //   },
      //   {
      //     url: "https://aia-ai.com/wp-content/uploads/2024/09/photo_2024-09-29_20-05-25.jpg",
      //     title: null,
      //   },
      //   {
      //     url: "https://aia-ai.com/webinar/management-and-ai-webinars/وبینار-نقش-هوش-مصنوعی-در-کسب-و-کارها-و-م",
      //     title: "مشاهده وبینار",
      //   },
      //   {
      //     url: "https://aia-ai.com/subject-cat/basic-mathematics-of-intelligence",
      //     title: "ریاضیات پایه هوش",
      //   },
      //   {
      //     url: "https://aia-ai.com/subject-cat/machine-learning",
      //     title: "یادگیری ماشین",
      //   },
      //   {
      //     url: "https://aia-ai.com/subject-cat/deep-learning",
      //     title: "یادگیری عمیق",
      //   },
      //   {
      //     url: "https://aia-ai.com/subject-cat/natural-language-processing",
      //     title: "پردازش زبان طبیعی",
      //   },
      //   {
      //     url: "https://aia-ai.com/subject-cat/image-processing-and-machine-vision",
      //     title: "پردازش تصویر و بینایی ماشین",
      //   },
      // ];
      // console.log("allurls: ", allurls);

      if (allurls.length === 0) {
        toast.error("لینکی یافت نشد");
        return;
      }
      // setAllUrl(allurls);
      const tree = buildSitemapTree(allurls);
      console.log("tree: ", tree);
      setTree(tree);
      toast.success("لینک‌ها دریافت شد");
    } catch (err: any) {
      console.error("خطا در دریافت لینک‌ها:", err);
      const backendMessage = "";
      // err.response?.data?.message ||
      // err.response?.data?.error ||
      // err.response?.data?.msg;
      toast.error(backendMessage || "خطا در دریافت لینک‌ها");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!chatbot?.uuid) return;
    try {
      const selectedUrl = getSelectedUrls(tree, checkedMap);
      if (selectedUrl.length === 0) {
        toast.error("لطفاً حداقل یک لینک را انتخاب کنید.");
        return;
      }

      const res = await axiosInstance.post(
        API_ROUTES.BOTS.CRAWL_BATCH(chatbot.uuid),
        { urls: selectedUrl }
      );

      if (!res.data?.success) {
        toast.error("خطا در دریافت لینک‌ها");
        return;
      }

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
  const getSelectedUrls = (
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
      onClick={() => onClose(false)}
    >
      {loading && (
        <LoadingModal
          show={loading}
          message="در حال بررسی لینک‌ها... لطفاً منتظر بمانید. این عملیات ممکن است کمی طول بکشد."
        />
      )}
      {/* {loading && <PageLoader />} */}
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
                className="px-12 py-3 my-3 min-w-40 shadow-lg hover:shadow-xl w-fit"
              >
                {loading ? "در حال بررسی..." : "بررسی"}
              </Button>
              <Button
                variant="secondary"
                onClick={() => onClose(false)}
                disabled={loading}
                className="px-12 py-3 min-w-40 shadow-lg hover:shadow-xl"
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
                {/* <TreeViewContainer data={tree} /> */}
                <TreeViewContainer
                  data={tree}
                  checkedMap={checkedMap}
                  onToggle={(id, checked) =>
                    setCheckedMap((prev) => ({ ...prev, [id]: checked }))
                  }
                />
                {/* {allUrl.map((link: any, index: number) => (
                  <label
                    key={index}
                    dir="ltr"
                    className="flex items-center gap-2 cursor-pointer text-left"
                  >
                    <input
                      type="checkbox"
                      checked={selectedUrl.includes(link.url)}
                      onChange={() => toggleSelectUrl(link.url)}
                      className="w-4 h-4"
                    />
                    <span className="truncate">
                      {decodeURIComponent(link.url)}
                    </span>
                  </label>
                ))} */}
              </div>
              <div className="text-sm">
                <Checkbox
                  id="select-all"
                  label="انتخاب همه"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </div>
              {/* دکمه در وسط */}
              <div className="w-full flex justify-center">
                <Button
                  variant="primary"
                  onClick={handleSave}
                  className="mt-2 px-12 py-3 min-w-40 shadow-lg hover:shadow-xl"
                >
                  ثبت انتخاب‌ها
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
