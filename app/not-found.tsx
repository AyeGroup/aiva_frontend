import Link from "next/link";
import Header from "./landing/components/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="flex my-20 flex-col items-center justify-center   text-center px-4">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">
          متاسفانه صفحه مورد نظر یافت نشد.
        </p>

<div className="flex gap-4">

        <Link
          href="/"
          className="cursor-pointer border-2 border-[rgba(255,255,255,0.3)] text-white rounded-sm bg-primary py-4 px-6"
          >
          بازگشت به خانه
        </Link>
        <Link
          href="/dashboard"
          className="cursor-pointer border-2 border-[rgba(255,255,255,0.3)] text-white rounded-sm bg-primary py-4 px-6"
          >
          بازگشت به داشبورد
        </Link>
      </div>
          </div>
    </>
  );
}
