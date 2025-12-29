"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Section1 from "./components/Section1";
import Section2 from "./components/Section2";
import Section3 from "./components/Section3";
import Section4 from "./components/Section4";
import Section5 from "./components/Section5";
import Section6 from "./components/Section6";
import Section7 from "./components/Section7";
import Section8 from "./components/Section8";
import SectionFAQ from "./components/Section-faq";
import GoToTopButton from "./components/GoToTopButton";
import SectionSecurity from "./components/Section-security";
import SectionStarting from "./components/Section-starting";

export default function LandingClient() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const element = document.getElementById(id);

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
      }
    }
  }, [pathname]);

  return (
    <main className="landing-page min-h-screen bg-white">
      <Header />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      {/* <Section5 /> */}
      <Section6 />
      <Section7 />
      <Section8 />
      <SectionSecurity />
      <SectionFAQ />
      <SectionStarting />
      <Footer />
      <GoToTopButton />
    </main>
  );
}
