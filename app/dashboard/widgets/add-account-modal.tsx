import React, { useState } from "react";
import { X, User } from "lucide-react";
import { Button } from "@/components/button";
import { Input } from "@/components/input";

interface Account {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  type: "personal" | "team";
  members?: number;
}

interface AddAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (account: Omit<Account, "id">) => void;
}

export function AddAccountModal({
  isOpen,
  onClose,
}: // onAdd,
AddAccountModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "member",
    type: "personal" as "personal" | "team",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

      // onAdd({
      //   name: formData.name.trim(),
      //   email: formData.email.trim(),
      //   role: formData.role
      // });

      // Reset form
      setFormData({
        name: "",
        email: "",
        role: "member",
        type: "personal",
      });

      onClose();
    } catch (error) {
      console.error("Error adding account:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed  inset-0 bg-black/50 flex items-center justify-center z-9999 ">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4  ">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-grey-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-brand-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-grey-900">
                افزودن اکانت جدید
              </h2>
              <p className="text-sm text-grey-500">
                اکانت کاربری جدید به سیستم اضافه کنید
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-grey-100 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-grey-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-grey-700 mb-2">
              نام کامل
            </label>
            <Input
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="نام و نام خانوادگی را وارد کنید"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-grey-700 mb-2">
              ایمیل
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="آدرس ایمیل را وارد کنید"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-grey-700 mb-2">
              نوع اکانت
            </label>
            <select
              value={formData.type}
              onChange={(e) => handleChange("type", e.target.value)}
              className="w-full px-4 py-3 border-2 border-grey-200 rounded-xl bg-white text-grey-700 transition-all duration-200 focus:border-brand-primary focus:bg-brand-primary/5 focus:outline-none"
              disabled={isSubmitting}
            >
              <option value="personal">شخصی</option>
              <option value="team">تیمی</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-grey-700 mb-2">
              نقش کاربری
            </label>
            <select
              value={formData.role}
              onChange={(e) => handleChange("role", e.target.value)}
              className="w-full px-4 py-3 border-2 border-grey-200 rounded-xl bg-white text-grey-700 transition-all duration-200 focus:border-brand-primary focus:bg-brand-primary/5 focus:outline-none"
              disabled={isSubmitting}
            >
              {formData.type === "team" ? (
                <>
                  <option value="owner">مالک</option>
                  <option value="admin">مدیر</option>
                  <option value="member">عضو</option>
                </>
              ) : (
                <>
                  <option value="admin">مدیر</option>
                  <option value="member">عضو</option>
                  <option value="viewer">مشاهده‌گر</option>
                </>
              )}
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              لغو
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={
                isSubmitting || !formData.name.trim() || !formData.email.trim()
              }
              className="flex-1"
            >
              {isSubmitting ? "در حال افزودن..." : "افزودن اکانت"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
