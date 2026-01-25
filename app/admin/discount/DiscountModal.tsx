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
import { discountType, DiscountUsageType, discountUsageType } from "@/constants/common";
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

  user_id?: string;
  user_phone?: string;
}

interface CodeModalProps {
  open: boolean;
  codeId: string;
  mode?: "new" | "edit" | "view";
  onClose: () => void;
  onSaved: () => void;
}

export function DiscountModal({
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
    description: "",
    usage_type: "time_limited",
    valid_until: "",
    max_discount_amount: "",
    max_total_uses: "",
    user_id: "",
    user_phone: "",
  });

  const [valid, setValid] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!codeId || mode === "new") return;
    loadCode(codeId);
  }, [codeId]);

  const loadCode = async (id: string) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get(
        API_ROUTES.ADMIN.DISCOUNT(String(id))
      );
      setForm(res.data.data);
    } catch (e) {
      toast.error("خطا در دریافت اطلاعات");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserByPhone = async () => {
    if (!form.user_phone) return;

    try {
      const res = await axiosInstance.get(
        API_ROUTES.ADMIN.USER_BY_PHONE(form.user_phone)
      );

      setForm((p) => ({
        ...p,
        user_id: res.data.data.id,
      }));

      toast.success("کاربر یافت شد");
    } catch {
      toast.error("کاربری با این شماره یافت نشد");
      setForm((p) => ({ ...p, user_id: "" }));
    }
  };

  const validateForm = (): boolean => {
    let ok = true;
    const errors: Record<string, string> = {};

    if (!form.code) {
      errors.code = "این فیلد ضروری است";
      ok = false;
    }

    if (!form.description) {
      errors.description = "این فیلد ضروری است";
      ok = false;
    }

    if (!form.discount_value) {
      errors.discount_value = "این فیلد ضروری است";
      ok = false;
    }

    if (
      form.usage_type === "specific_user" &&
      (!form.user_id || !form.user_phone)
    ) {
      toast.error("لطفاً کاربر معتبر انتخاب کنید");
      ok = false;
    }

    setValid(errors);
    return ok;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      await axiosInstance.post(API_ROUTES.ADMIN.DISCOUNT_CREATE, form);
      toast.success("اطلاعات با موفقیت ذخیره شد");
      onSaved();
      onClose();
    } catch {
      toast.error("خطا در ذخیره اطلاعات");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

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

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm">کد *</label>
            <Input
              value={form.code}
              disabled={mode === "view"}
              onChange={(e) => setForm((p) => ({ ...p, code: e.target.value }))}
            />
            {valid.code && (
              <span className="text-xs text-red-400">{valid.code}</span>
            )}
          </div>

          <div>
            <label className="text-sm">توضیحات *</label>
            <Input
              value={form.description}
              disabled={mode === "view"}
              onChange={(e) =>
                setForm((p) => ({ ...p, description: e.target.value }))
              }
            />
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

          {form.usage_type === DiscountUsageType.USER_SPECIFIC && (
            <>
              <div>
                <label className="text-sm">شماره تلفن کاربر *</label>
                <Input
                  value={form.user_phone}
                  disabled={mode === "view"}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, user_phone: e.target.value }))
                  }
                  onBlur={fetchUserByPhone}
                  placeholder="09xxxxxxxxx"
                />
              </div>

              <div>
                <label className="text-sm">شناسه کاربر</label>
                <Input value={form.user_id} disabled />
              </div>
            </>
          )}

          <div>
            <label className="text-sm">مقدار *</label>
            <Input
              value={form.discount_value}
              disabled={mode === "view"}
              onChange={(e) =>
                setForm((p) => ({ ...p, discount_value: e.target.value }))
              }
            />
          </div>

          <div>
            <label className="text-sm">حداکثر مبلغ تخفیف</label>
            <Input
              value={form.max_discount_amount || ""}
              disabled={mode === "view"}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  max_discount_amount: e.target.value,
                }))
              }
            />
          </div>

          <div>
            <label className="text-sm">تاریخ اعتبار</label>
            <DatePicker
              value={form.valid_until}
              disabled={mode === "view"}
              calendar={persian}
              locale={persian_fa}
              onChange={(val) =>
                setForm((p) => ({
                  ...p,
                  valid_until: val?.toDate?.()?.toISOString() || "",
                }))
              }
              inputClass="w-full px-4 py-3 rounded-xl border"
            />
          </div>

          <div>
            <label className="text-sm">حداکثر تعداد استفاده</label>
            <Input
              value={form.max_total_uses || ""}
              disabled={mode === "view"}
              onChange={(e) =>
                setForm((p) => ({ ...p, max_total_uses: e.target.value }))
              }
            />
          </div>
        </div>

        {(mode === "new" || mode === "edit") && (
          <DialogFooter>
            <Button variant="tertiary" onClick={onClose}>
              لغو
            </Button>
            <Button onClick={handleSave} disabled={isSubmitting}>
              {isSubmitting ? "ذخیره..." : "ذخیره"}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
