export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">داشبورد</h2>
        <nav className="space-y-3">
          <a href="/dashboard" className="block hover:text-blue-300">
            خانه
          </a>
          <a href="/dashboard/profile" className="block hover:text-blue-300">
            پروفایل
          </a>
          <a href="/dashboard/settings" className="block hover:text-blue-300">
            تنظیمات
          </a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  );
}
