import {
  SecSart_Icon0,
  SecSart_Icon1,
  SecSart_Icon10,
  SecSart_Icon11,
  SecSart_Icon12,
  SecSart_Icon2,
  SecSart_Icon3,
  SecSart_Icon4,
  SecSart_Icon5,
  SecSart_Icon6,
  SecSart_Icon7,
  SecSart_Icon8,
  SecSart_Icon9,
} from "@/public/icons/landing";
import Link from "next/link";

function ContainerBg() {
  return (
    <div className="h-[500px] w-full">
      <SecSart_Icon0 />
      <SecSart_Icon1 />
      <SecSart_Icon2 />
      <SecSart_Icon3 />
      <SecSart_Icon11 />
      <SecSart_Icon12 />
      <SecSart_Icon4 />
      <SecSart_Icon5 />
      <SecSart_Icon6 />
      <SecSart_Icon7 />
      <SecSart_Icon8 />
      <SecSart_Icon9 />
      <SecSart_Icon10 />
    </div>
  );
}
export default function SectionStarting() {
  return (
    <div className="relative size-full" id="starting">
      <div className="w-full bg-[#65bcb6]  flex flex-col gap-2 h-[500px] items-center justify-center p-24 relative">
        <ContainerBg />
        <p className="font-semibold text-4xl text-center text-white">
          آماده شروع هستید؟
        </p>
        <p className="font-medium  my-8 text-[rgba(255,255,255,0.95)] text-center text-nowrap  ">
          آیوا را رایگان امتحان کنید و تفاوت را در همان روز اول احساس کنید
        </p>
        <div className="flex gap-8">
          <Link
            href="/onboarding"
            className=" font-normal bg-white rounded-sm relative shrink-0 text-[#2d3748] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] py-4 px-6 text-nowrap whitespace-pre"
          >
            شروع رایگان
          </Link>

          <Link
            href="#"
            className="border-2 border-[rgba(255,255,255,0.3)] text-white rounded-sm bg-[rgba(255,255,255,0.1)] py-4 px-6 "
          >
            مشاوره رایگان
          </Link>
        </div>
      </div>
    </div>
  );
}
