"use client";

import Image from "next/image";
import axiosInstance from "@/lib/axiosInstance";
import { Check, CheckCheck, TicketCheck, User, X } from "lucide-react";
import { Input } from "@/components/input";
import { toast } from "sonner";
import { Button } from "@/components/button";
import { API_ROUTES } from "@/constants/apiRoutes";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";
import { Tick } from "@/public/icons/AppIcons";

export interface ProfileForm {
  full_name: string | null;
  company_name: string | null;
  company_role: string | null;
  user_logo_url: string | null;
  user_logo_file: File | null;
}

interface EditProfileModalProps {
  open: boolean;
  data: any;
  onClose: () => void;
  onSaved: () => void;
}

export function EditProfileModal({
  open,
  data,
  onClose,
  onSaved,
}: EditProfileModalProps) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<ProfileForm>({
    full_name: "",
    company_name: "",
    company_role: "",
    user_logo_url: null,
    user_logo_file: null,
  });

  useEffect(() => {
    if (!open || !data) return;
    // console.log("data", data);
    setForm({
      full_name: data.full_name ?? "",
      company_name: data.company_name ?? "",
      company_role: data.company_role ?? "",
      user_logo_url: data.user_logo_url ?? null,
      user_logo_file: null,
    });

    setPreview(data.user_logo_url ?? null);
  }, [open, data]);

  // Upload Logo
  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = 1 * 1024 * 1024; // 3MB
    if (file.size > maxSize) {
      toast.warning("حجم فایل نباید بیشتر از یک مگابایت باشد  ");
      e.target.value = "";
      return;
    }

    const allowedTypes = ["image/png", "image/jpeg", "image/svg+xml"];
    if (!allowedTypes.includes(file.type)) {
      toast.warning("فقط فایل‌های PNG، JPG یا SVG مجاز هستند");
      e.target.value = "";
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setForm((prev) => ({
      ...prev,
      user_logo_file: file,
    }));
    setPreview(previewUrl);
  };

  // Save changes
  const handleSave = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("full_name", form.full_name || "");
      formData.append("company_name", form.company_name || "");
      formData.append("company_role", form.company_role || "");

      // Only send file if user selected new file
      if (form.user_logo_file) {
        formData.append("logo", form.user_logo_file);
      }

      await axiosInstance.put(API_ROUTES.USER.UPDATE, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("اطلاعات با موفقیت ذخیره شد.");
      onSaved();
      onClose();
    } catch (err) {
      toast.error("خطا در ذخیره اطلاعات. لطفاً دوباره تلاش کنید.");
      console.error("Error saving profile:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md z-999 max-h-screen overflow-auto">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-2">
              <div className="rounded-full p-1 bg-gray-100">
                <User className="text-primary" />
              </div>
              حساب کاربری
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="gap-4 space-y-2">
          <div className="bg-gray-100 rounded-lg p-4">
            <div className="flex items-end justify-start gap-4 ">
              <label className="block mb-1 text-sm">عکس پروفایل</label>
              {preview && (
                <Image
                  src={preview}
                  width={80}
                  height={80}
                  alt="پروفایل"
                  className="rounded-3xl object-cover border"
                />
              )}

              <div onClick={() => fileInputRef.current?.click()}>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".png,.jpg,.jpeg,.svg"
                  className="hidden"
                  onChange={handleLogoUpload}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="cursor-pointer px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary/90 text-sm"
                >
                  انتخاب فایل
                </button>
              </div>
            </div>
            <p className="text-grey-500 text-xs mt-4">
              PNG، JPG یا SVG • حداکثر یک مگابایت
            </p>
          </div>

          <div className="flex items-center gap-2">
            {data?.email_verified ? (
              <Check className="text-primary" width={16}>
                <title>ایمیل تأیید شده است</title>
              </Check>
            ) : (
              <X className="text-secondary" width={16}>
                <title>ایمیل تأیید نشده است</title>
              </X>
            )}

            <label className="block mb-1 text-sm">ایمیل</label>
            <label className="block mb-1 text-primary"> {data?.email}</label>
          </div>
          <div className="flex items-center gap-2">
            {data?.phone_verified ? (
              <Check className="text-primary" width={16}>
                <title>موبایل تأیید شده است</title>
              </Check>
            ) : (
              <X className="text-secondary" width={16}>
                <title>موبایل تأیید نشده است</title>
              </X>
            )}

            <label className="block mb-1 text-sm">موبایل</label>
            <label className="block mb-1 text-primary"> {data?.phone}</label>
          </div>
          {/* Full name */}
          <div>
            <label className="block mb-1 text-sm">نام و نام خانوادگی</label>
            <Input
              value={form.full_name || ""}
              onChange={(e) =>
                setForm((p) => ({ ...p, full_name: e.target.value }))
              }
            />
          </div>

          {/* Company */}
          <div>
            <label className="block mb-1 text-sm">نام شرکت</label>
            <Input
              value={form.company_name || ""}
              onChange={(e) =>
                setForm((p) => ({ ...p, company_name: e.target.value }))
              }
            />
          </div>

          {/* Role */}
          <div>
            <label className="block mb-1 text-sm">سمت</label>
            <Input
              value={form.company_role || ""}
              onChange={(e) =>
                setForm((p) => ({ ...p, company_role: e.target.value }))
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="tertiary" onClick={onClose}>
            لغو
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "ذخیره..." : "ذخیره تغییرات"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
