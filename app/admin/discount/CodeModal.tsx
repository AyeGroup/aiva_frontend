"use client";

import persian from "react-date-object/calendars/persian";
import PageLoader from "@/components/pageLoader";
import DatePicker from "react-multi-date-picker";
import persian_fa from "react-date-object/locales/persian_fa";
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

export interface CodeForm {
  id: string;
  code: string;
  discount_type: string;
  discount_value: string;
  description: string;
  usage_type: string;
  valid_until: string;
  max_discount_amount: string | null;
  max_total_uses: string | null;
}

interface CodeModalProps {
  open: boolean;
  codeId: string;
  mode?: string;
  onClose: () => void;
  onSaved: () => void;
}

export function CodeModal({
  open,
  codeId,
  mode = "new",
  onClose,
  onSaved,
}: CodeModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
  const [valid, setValid] = useState<CodeForm>({
    id: "",
    code: "",
    discount_type: "",
    discount_value: "",
    max_discount_amount: "",
    valid_until: "",
    usage_type: "",
    description: "",
    max_total_uses: "",
  });

  useEffect(() => {
    console.log("codeid: ", codeId);
    console.log("mode: ", mode);
    if (!codeId || codeId =="" || mode == "new") return;
    const fetchCode = async () => {
      await loadCode(codeId);
    };

    fetchCode();
  }, [codeId]);

  const loadCode = async (id: string) => {
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

  const validateForm = (): boolean => {
    let isValid = true;
    if (!form.code || form.code.trim() === "") {
      setValid((p) => ({ ...p, code: "این فیلد ضروری است" }));
      isValid = false;
    }
    if (!form.description || form.description.trim() === "") {
      setValid((p) => ({ ...p, description: "این فیلد ضروری است" }));
      isValid = false;
    }
    if (!form.usage_type) {
      setValid((p) => ({ ...p, usage_type: "این فیلد ضروری است" }));
      isValid = false;
    }
    if (!form.discount_type) {
      setValid((p) => ({ ...p, discount_type: "این فیلد ضروری است" }));
      isValid = false;
    }
    if (!form.discount_value) {
      setValid((p) => ({ ...p, discount_value: "این فیلد ضروری است" }));
      isValid = false;
    }
    if (form.max_discount_amount && isNaN(Number(form.max_discount_amount))) {
      setValid((p) => ({
        ...p,
        max_discount_amount: "مقدار را صحیح وارد کنید",
      }));
      isValid = false;
    }
    if (form.max_total_uses && isNaN(Number(form.max_total_uses))) {
      setValid((p) => ({ ...p, max_total_uses: "مقدار را صحیح وارد کنید" }));
      isValid = false;
    }
    if (!form.valid_until && form.discount_type === "time_limited") {
      setValid((p) => ({ ...p, valid_until: "مقدار را صحیح وارد کنید" }));
      isValid = false;
    }
    return isValid;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      setIsSubmitting(true);
      await axiosInstance.post(API_ROUTES.ADMIN.DISCOUNT_CREATE, form);
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
            <label className="block mb-1 text-sm">
              کد<span className="text-red-400 text-sm">*</span>
            </label>
            <Input
              value={form.code || ""}
              maxLength={20}
              disabled={mode == "view"}
              onChange={(e) => setForm((p) => ({ ...p, code: e.target.value }))}
            />
            {valid.code && (
              <span className="text-red-400 text-xs">{valid.code}</span>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm">
              توضیحات<span className="text-red-400 text-sm">*</span>
            </label>
            <Input
              value={form.description || ""}
              disabled={mode == "view"}
              onChange={(e) =>
                setForm((p) => ({ ...p, description: e.target.value }))
              }
              maxLength={128}
            />
            {valid.description && (
              <span className="text-red-400 text-xs">{valid.description}</span>
            )}
          </div>
          <div>
            <label className="block mb-1 text-sm">
              نوع استفاده<span className="text-red-400 text-sm">*</span>
            </label>
            <GenericSelector
              items={discountUsageType}
              selectedValue={form.usage_type}
              disabled={mode == "view"}
              onSelect={(value) =>
                setForm((p) => ({ ...p, usage_type: value }))
              }
              showIndicator
              className="border-2 border-primary rounded-3xl w-full"
            />
            {valid.usage_type && (
              <span className="text-red-400 text-xs">{valid.usage_type}</span>
            )}
          </div>
          <div>
            <label className="block mb-1 text-sm">
              نوع<span className="text-red-400 text-sm">*</span>
            </label>
            <GenericSelector
              items={discountType}
              selectedValue={form.discount_type}
              disabled={mode == "view"}
              onSelect={(value) =>
                setForm((p) => ({ ...p, discount_type: value }))
              }
              showIndicator
              className="border-2 border-primary rounded-3xl w-full"
            />
            {valid.discount_type && (
              <span className="text-red-400 text-xs">
                {valid.discount_type}
              </span>
            )}
          </div>
          <div>
            <label className="block mb-1 text-sm">
              مقدار<span className="text-red-400 text-sm">*</span>
            </label>
            <Input
              value={form.discount_value || ""}
              onChange={(e) =>
                setForm((p) => ({ ...p, discount_value: e.target.value }))
              }
              disabled={mode == "view"}
              maxLength={10}
            />
            {valid.discount_value && (
              <span className="text-red-400 text-xs">
                {valid.discount_value}
              </span>
            )}
          </div>
          <div>
            <label className="block mb-1 text-sm">حداکثر مبلغ تخفیف </label>
            <Input
              value={form.max_discount_amount || ""}
              disabled={mode == "view"}
              onChange={(e) =>
                setForm((p) => ({ ...p, max_discount_amount: e.target.value }))
              }
              maxLength={12}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">تاریخ اعتبار</label>
            <DatePicker
              value={form.valid_until}
              onChange={(val) =>
                setForm((p) => ({
                  ...p,
                  valid_until: val?.toDate?.()?.toISOString?.() || "",
                }))
              }
              calendar={persian}
              disabled={mode == "view"}
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
              disabled={mode == "view"}
              onChange={(e) =>
                setForm((p) => ({ ...p, max_total_uses: e.target.value }))
              }
              maxLength={5}
            />
          </div>
        </div>
        {(mode == "edit" || mode == "new") && (
          <DialogFooter>
            <Button variant="tertiary" onClick={onClose}>
              لغو
            </Button>
            <Button onClick={handleSave} disabled={isSubmitting}>
              {isSubmitting ? "ذخیره..." : "ذخیره تغییرات"}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
