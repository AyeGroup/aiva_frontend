"use client";
import Header from "./components/Header";
import Section1 from "./components/Section1";
import Section2 from "./components/Section2";
import Section3 from "./components/Section3";
import Section4 from "./components/Section4";
import Section5 from "./components/Section5";
import Section6 from "./components/Section6";
import Section7 from "./components/Section7";
import Section8 from "./components/Section8";

export default function App() {
  return (
    <main className="landing-page min-h-screen bg-white">
      <Header />
      <Section6 />

      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      {/* داشتان موفقیت بدون دیتا */}
      {/* <Section5 />  */}
      {/* <Section7 /> */}
      {/* <Section8 /> */}
      {/* 
      <Section3WithAnimation />
      <Section4WithAnimation />
      <Section5WithAnimation />
      <Section6WithAnimation />
      <Section7WithAnimation />
      <Section8WithAnimation />
      <Section9WithAnimation />
      <Section10WithAnimation />
      <Section11WithAnimation />
      <Section12WithAnimation /> */}
    </main>
  );
}
