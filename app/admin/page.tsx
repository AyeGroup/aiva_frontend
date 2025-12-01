import { redirect } from "next/navigation";
// import { getUserFromToken } from "@/lib/auth"; // تابعی که خودت داری برای خواندن کوکی و decode JWT
import { useAuth } from "@/providers/AuthProvider";

export default   function AdminPage() {
   const {user} = useAuth();

   if (!user) {
    redirect("/auth/login");
  }

   if (user.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">پنل مدیریت</h1>

      <p className="text-gray-600 mb-6">
        به داشبورد مدیریت خوش آمدید. از منوی سمت چپ صفحات گزارش و مدیریت کاربران
        را انتخاب کنید.
      </p>

      {/* نمونه کارت‌ها */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-5">
          <h2 className="text-xl font-semibold mb-2">تعداد کاربران</h2>
          <p className="text-3xl font-bold text-blue-600">124</p>
        </div>

        <div className="bg-white shadow rounded-lg p-5">
          <h2 className="text-xl font-semibold mb-2">گزارش‌های جدید</h2>
          <p className="text-3xl font-bold text-green-600">12</p>
        </div>

        <div className="bg-white shadow rounded-lg p-5">
          <h2 className="text-xl font-semibold mb-2">بازدید امروز</h2>
          <p className="text-3xl font-bold text-purple-600">534</p>
        </div>
      </div>
    </div>
  );
}
