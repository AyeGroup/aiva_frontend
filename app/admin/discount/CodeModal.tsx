"use client";

import PageLoader from "@/components/pageLoader";
import axiosInstance from "@/lib/axiosInstance";
import { Tick } from "@/public/icons/AppIcons";
import { Input } from "@/components/input";
import { toast } from "sonner";
import { Button } from "@/components/button";
import { API_ROUTES } from "@/constants/apiRoutes";
import { GenericSelector } from "@/components/selector";
import { useEffect, useState } from "react";
import { discountType, discountUsageType } from "@/constants/common";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";
import DatePicker from "react-multi-date-picker";
import persian_fa from "react-date-object/locales/persian_fa";
import persian from "react-date-object/calendars/persian";

export interface CodeForm {
  id: string;
  code: string;
  discount_type: string;
  discount_value: string;
  description: string;
  usage_type: string;
  valid_until: string ;
  max_discount_amount: string | null;
  max_total_uses: string | null;
}

interface CodeModalProps {
  open: boolean;
  codeId: number;
  onClose: () => void;
  onSaved: () => void;
}

export function CodeModal({ open, codeId, onClose, onSaved }: CodeModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dateFromTemp, setDateFromTemp] = useState("");

  const [form, setForm] = useState<CodeForm>({
    id: "",
    code: "",
    discount_type: "percentage",
    discount_value: "",
    max_discount_amount: "",
    valid_until: "",
    usage_type: "time_limited",
    description: "",
    max_total_uses: "",
  });

  useEffect(() => {
    console.log("codeid: ", codeId);
    if (!codeId || codeId < 1) return;
    const fetchCode = async () => {
      await loadCode(codeId);
    };

    fetchCode();
  }, [codeId]);

  const loadCode = async (id: number) => {
    setIsLoading(true);

    try {
      const response = await axiosInstance.get(
        API_ROUTES.ADMIN.DISCOUNT(String(id))
      );
      setForm(response.data.data);
      console.log("codes: ", response.data.data);
    } catch (apiError: any) {
      console.warn("API fetch failed, using local data:", apiError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();

      await axiosInstance.put(API_ROUTES.ADMIN.DISCOUNT_CREATE, formData);
      toast.success("اطلاعات با موفقیت ذخیره شد.");
      onSaved();
      onClose();
    } catch (err) {
      toast.error("خطا در ذخیره اطلاعات. لطفاً دوباره تلاش کنید.");
      console.error("Error saving profile:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      {isLoading && <PageLoader />}
      <DialogContent className="max-w-md z-999 max-h-screen overflow-auto">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-2">
              <div className="rounded-full w-6 text-primary bg-gray-100">
                <Tick />
              </div>
              کد تخفیف
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 space-y-2 ">
          <div>
            <label className="block mb-1 text-sm">کد</label>
            <Input
              value={form.code || ""}
              maxLength={20}
              onChange={(e) => setForm((p) => ({ ...p, code: e.target.value }))}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">توضیحات</label>
            <Input
              value={form.description || ""}
              onChange={(e) =>
                setForm((p) => ({ ...p, description: e.target.value }))
              }
              maxLength={128}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">نوع استفاده</label>
            <GenericSelector
              items={discountUsageType}
              selectedValue={form.usage_type}
              onSelect={(value) =>
                setForm((p) => ({ ...p, usage_type: value }))
              }
              showIndicator
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">نوع</label>
            <GenericSelector
              items={discountType}
              selectedValue={form.discount_type}
              onSelect={(value) =>
                setForm((p) => ({ ...p, discount_type: value }))
              }
              showIndicator
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">مقدار</label>
            <Input
              value={form.discount_value || ""}
              onChange={(e) =>
                setForm((p) => ({ ...p, discount_value: e.target.value }))
              }
              maxLength={10}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">حداکثر مبلغ تخفیف </label>
            <Input
              value={form.max_discount_amount || ""}
              onChange={(e) =>
                setForm((p) => ({ ...p, max_discount_amount: e.target.value }))
              }
              maxLength={12}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">تاریخ اعتبار</label>
            <DatePicker
              value={dateFromTemp ? new Date(dateFromTemp) : ""}
              onChange={(val) =>
                setForm((p) => ({
                  ...p,
                  valid_until: val?.toDate?.()?.toISOString?.() || "",
                }))
              }
              calendar={persian}
              locale={persian_fa}
              inputClass="flex-1 px-4 py-4 rounded-4xl border border-2 border-[#65bcb6] focus:outline-none transition-colors text-md w-full"
              placeholder="انتخاب "
              calendarPosition="top-right"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">حداکثر تعداد استفاده</label>
            <Input
              value={form.max_total_uses || ""}
              onChange={(e) =>
                setForm((p) => ({ ...p, max_total_uses: e.target.value }))
              }
              maxLength={5}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="tertiary" onClick={onClose}>
            لغو
          </Button>
          <Button onClick={handleSave} disabled={isSubmitting}>
            {isSubmitting ? "ذخیره..." : "ذخیره تغییرات"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
