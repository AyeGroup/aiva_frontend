"use client";

import Image from "next/image";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";
import axiosInstance from "@/lib/axiosInstance";
import { API_ROUTES } from "@/constants/apiRoutes";

export interface ProfileForm {
  id: string | null;
  phone: string | null;
  email: string | null;
  full_name: string | null;
  company_name: string | null;
  company_role: string | null;
  user_logo_url: string | null;
  user_logo_file: File | null;
}

interface EditProfileModalProps {
  open: boolean;
  data?: ProfileForm | null;
  id?: number;
  onClose: () => void;
}

export function ProfileModal({
  open,
  data,
  id,
  onClose,
}: EditProfileModalProps) {
  const [profileData, setProfileData] = useState<ProfileForm | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    // 1️⃣ اگر data وجود داشت
    if (data) {
      setProfileData(data);
      setPreview(data.user_logo_url ?? null);
      return;
    }

    // 2️⃣ اگر data نبود ولی id وجود داشت → گرفتن از بک
    if (id) {
      fetchProfileById(id);
    }
  }, [open, data, id]);

  const fetchProfileById = async (id: number) => {
    try {
      setLoading(true);

      const response = await axiosInstance.get(API_ROUTES.ADMIN.USER_PROFILE(String(id)) )    ;
        const data = response.data.data.profile;
      setProfileData(data);
      setPreview(data?.user_logo_url ?? null);
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

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

        {loading && (
          <div className="text-center text-sm text-muted-foreground">
            در حال دریافت اطلاعات...
          </div>
        )}

        {!loading && profileData && (
          <div className="gap-4 space-y-2">
            {preview && (
              <Image
                src={preview}
                width={80}
                height={80}
                alt="پروفایل"
                className="rounded-3xl object-cover border"
              />
            )}

            <Field label="ایمیل" value={profileData.email} />
            <Field label="موبایل" value={profileData.phone} />
            <Field label="نام و نام خانوادگی" value={profileData.full_name} />
            <Field label="نام شرکت" value={profileData.company_name} />
            <Field label="سمت" value={profileData.company_role} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* کامپوننت کوچک برای تمیزتر شدن JSX */
function Field({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm">{label}</label>
      <span className="text-primary">{value}</span>
    </div>
  );
}
