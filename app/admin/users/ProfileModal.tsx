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
  data: any;
  onClose: () => void;
}

export function ProfileModal({ open, data, onClose }: EditProfileModalProps) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!open || !data) return;
    // const imageUrl = URL.createObjectURL(data?.user_logo);
    // setPreview(imageUrl ?? null);
    setPreview(null);
  }, [open, data]);

  if (!open || !data) return;
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
          <div className="flex items-end justify-start gap-4 ">
            {preview && (
              <Image
                src={preview}
                width={80}
                height={80}
                alt="پروفایل"
                className="rounded-3xl object-cover border"
              />
            )}
          </div>

          <div className="flex items-center gap-2">
            <label className="block mb-1 text-sm">ایمیل</label>
            <label className="block mb-1 text-primary"> {data?.email}</label>
          </div>
          <div className="flex items-center gap-2">
            <label className="block mb-1 text-sm">موبایل</label>
            <label className="block mb-1 text-primary"> {data?.phone}</label>
          </div>
          <div className="flex items-center gap-2">
            <label className="block mb-1 text-sm">نام و نام خانوادگی</label>
            <label className="block mb-1 text-primary">{data?.full_name}</label>
          </div>

          <div className="flex items-center gap-2">
            <label className="block mb-1 text-sm">نام شرکت</label>
            <label className="block mb-1 text-primary">
              {data?.company_name}
            </label>
          </div>

          <div className="flex items-center gap-2">
            <label className="block mb-1 text-sm">سمت</label>
            <label className="block mb-1 text-primary">
              {data?.company_role}
            </label>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
