import Header from "../landing/components/Header";
import Footer from "../landing/components/Footer";
import PhoneAndCustomer1 from "../landing/components/PhoneAndCustomer1";
import { convertToPersian } from "@/utils/common";
import { Mail, MapPin, Phone } from "lucide-react";

const SectionHeader = () => (
  <div className="w-full flex flex-col justify-start gap-8 py-16 px-40">
    <div className="absolute h-5/12 w-1/3 left-16 top-32 ">
      <PhoneAndCustomer1 />
    </div>
    {/* Title */}
    <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
      تماس با ما
    </h2>

    {/* Subtitle */}
    <p className="text-gray-600  max-w-xl text-lg mr-3">
      با ما در ارتباط باشید:
    </p>

    <div className="flex justify-start items-center gap-2 mr-3">
      <MapPin size={20} className="text-gray-300" />
      <span>تهران، آزادی، خیابان صادقی، پلاک ۳۳</span>
    </div>

    <div className="flex justify-start items-center gap-2 mr-3">
      <Phone size={20} className="text-gray-300" />
      <a href="tel:09903202903" className="hover:text-gray-100 transition">
        {convertToPersian("09903202903")}
      </a>
    </div>

    <div className="flex justify-start items-center gap-2 mr-3">
      <Mail size={20} className="text-gray-300" />
      <a
        href="mailto:info@ayehgroup.com"
        className="hover:text-gray-100 transition"
      >
        info@ayehgroup.com
      </a>
    </div>
  </div>
);

export default function Contact() {
  return (
    <main id="contact" className="landing-page">
      <Header />
      <SectionHeader />
      <Footer />
    </main>
  );
}
