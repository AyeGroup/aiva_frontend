export default function LoginPage() {
  return (
    <form className="space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-800">ورود</h2>
      <input
        type="email"
        placeholder="ایمیل"
        className="w-full border px-3 py-2 rounded-lg"
      />
      <input
        type="password"
        placeholder="رمز عبور"
        className="w-full border px-3 py-2 rounded-lg"
      />
      <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
        ورود
      </button>
    </form>
  );
}
