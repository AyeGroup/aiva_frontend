"use client";

import Image from "next/image";
import axiosInstance from "@/lib/axiosInstance";
import { User } from "lucide-react";
import { Input } from "@/components/input";
import { toast } from "sonner";
import { Button } from "@/components/button";
import { API_ROUTES } from "@/constants/apiRoutes";
import { ChangeEvent, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";

export interface ProfileForm {
  full_name: string | null;
  company_name: string | null;
  company_role: string | null;
  user_logo_url: string | null;
  user_logo_file: File | null;
}

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
}

export function EditProfileModal({ open, onClose }: EditProfileModalProps) {
  const [loading, setLoading] = useState(false);
const [preview, setPreview] = useState<string | null>(null);

  const [form, setForm] = useState<ProfileForm>({
    full_name: "",
    company_name: "",
    company_role: "",
    user_logo_url: null,
    user_logo_file: null,
  });

  // Load data when modal opens
  useEffect(() => {
    if (!open) return;

    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(API_ROUTES.USER.PROFILE);
        const data = res.data.data;

        setForm({
          full_name: data.full_name || "",
          company_name: data.company_name || "",
          company_role: data.company_role || "",
          user_logo_url: data.user_logo_url || null,
          user_logo_file: null,
        });

     
       if (data.user_logo_url) {
         const imgRes = await axiosInstance.get(data.user_logo_url, {
           responseType: "blob",
         });

         const imageUrl = URL.createObjectURL(imgRes.data);
         setPreview(imageUrl);
       } else {
         setPreview(null);
       }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [open]);

  // Upload Logo
  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
  const previewUrl = URL.createObjectURL(file);

    // setForm((prev) => ({
    //   ...prev,
    //   user_logo_file: file,
    //   user_logo_url: URL.createObjectURL(file), // preview only
    // }));

     setForm((prev) => ({
       ...prev,
       user_logo_file: file,
     }));
  setPreview(previewUrl);

  };

  // Save changes
  const handleSave = async () => {
    try {
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

      onClose();
    } catch (err) {
      toast.error("خطا در ذخیره اطلاعات. لطفاً دوباره تلاش کنید.");
      console.error("Error saving profile:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md z-999">
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

        {loading ? (
          <div className="py-6 text-center">در حال بارگذاری...</div>
        ) : (
          <div className="space-y-4 py-2">
            {/* Logo */}
            <div>
              <label className="block mb-1 text-sm">عکس پروفایل</label>
              <div className="flex items-end gap-8 p-2">
                {form.user_logo_url && (
                  <Image
                    src={preview || "/images/default-avatar.jpg"}
                    width={80}
                    height={80}
                    alt="پروفایل"
                    className="rounded-3xl object-cover border"
                  />
                )}

                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                />
              </div>
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
        )}

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
