export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-center text-primary">
          ثبت‌نام
        </h1>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="نام کاربری"
            className="w-full rounded-md border border-gray-300 p-2"
          />
          <input
            type="email"
            placeholder="ایمیل"
            className="w-full rounded-md border border-gray-300 p-2"
          />
          <input
            type="password"
            placeholder="رمز عبور"
            className="w-full rounded-md border border-gray-300 p-2"
          />
          <button
            type="submit"
            className="w-full rounded-md bg-primary p-2 text-white hover:bg-blue-700"
          >
            ثبت‌نام
          </button>
        </form>
      </div>
    </div>
  );
}
