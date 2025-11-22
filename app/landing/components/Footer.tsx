import Link from "next/link";
import Image from "next/image";
import { convertToPersian } from "@/utils/common";
import { MapPin, Phone, Mail } from "lucide-react";

function Container() {
  return (
    <div className="opacity-50 relative size-full" >
      <div className="absolute left-0 top-0 w-full" >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 1431 96"
        >
          <g clipPath="url(#clip0_0_5662)" id="Icon" opacity="0.15">
            <path
              d="M0 47.9996C238.5 28.7996 477 28.7996 715.5 47.9996C954 67.1996 1192.5 67.1996 1431 47.9996"
              id="Vector"
              stroke="var(--stroke-0, #65BCB6)"
              strokeWidth="2.13991"
            />
          </g>
          <defs>
            <clipPath id="clip0_0_5662">
              <rect fill="white" height="96" width="1431" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <div className="relative w-full bg-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0  pointer-events-none">
        <Container />
      </div>

      {/* Footer Content */}
      <div className=" w-full h-full flex flex-col items-center justify-center px-20 pt-4">
        <div className="grid grid-cols-7 gap-12 py-8 text-gray-400">
          {/* Logo & Description */}
          <div className=" text-right col-span-2">
            <div className="flex items-center gap-2 justify-start">
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt="آیوا"
                  width={40}
                  height={40}
                  priority
                />
                <span className="text-white font-semibold text-xl">آیوا</span>
              </Link>
            </div>
            <p className="text-gray-400 leading-6 text-right">
              هوشمندترین چت‌بات برای کسب‌وکار شما
            </p>
          </div>
          <div className="items-end flex pt-2 text-justify col-span-3">
            خلاقیت یا آفرینندگی توان ساختن یا خلق نمودن چیزی نو است، راهکاری نو
            برای حل یک مشکل، یک روش یا یک دستگاه نو، یا یک شیء یا فرم نو هنری.
            «خلاقیت بشر تعریفی از قابلیت‌های اقتصاد، زندگی، فناوری، صنایع نو،
            ثروت نو و کلیهٔ چیزهایی است که از یک اقتصاد خوب جریان می‌گیرند.
          </div>
          <div className="flex flex-col gap-y-4 justify-end col-span-2">
            <div className="text-gray-100 text-lg mb-1">تماس با ما</div>

            <div className="flex justify-start items-center gap-2">
              <MapPin size={20} className="text-gray-300" />
              <span>تهران، آزادی، خیابان صادقی، پلاک ۳۳</span>
            </div>

            <div className="flex justify-start items-center gap-2">
              <Phone size={20} className="text-gray-300" />
              <a
                href="tel:09903202903"
                className="hover:text-gray-100 transition"
              >
                {convertToPersian("09903202903")}
              </a>
            </div>

            <div className="flex justify-start items-center gap-2">
              <Mail size={20} className="text-gray-300" />
              <a
                href="mailto:info@ayehgroup.com"
                className="hover:text-gray-100 transition"
              >
                info@ayehgroup.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-2 w-full p-4 border-t border-gray-800 flex items-center justify-center">
          <div className="flex items-center text-gray-500 text-sm">
            © ۲۰۲۵ تمام حقوق سایت متعلق به
            <Link
              href="https://ayehgroup.com/"
              className="mx-0.5 cursor-pointer"
            >
              <div>گروه آیه</div>
            </Link>
            است.
          </div>
        </div>
      </div>
    </div>
  );
}
