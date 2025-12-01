import { useRouter } from "next/navigation";

export default function NewUserIntro() {
  const router = useRouter();

  return (
    <div className="flex w-full items-center justify-center m-7">
      <button
        onClick={() => router.push("/onboarding")}
        className="px-8 py-4 font-bold cursor-pointer rounded-md transition-all duration-200   bg-white text-brand-primary shadow-sm"
      >
        اولین بات خود را بسازید
      </button>
    </div>
  );
}
