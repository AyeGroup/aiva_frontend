"use client";
import Header from "./components/Header";
import Section3WithAnimation from "./components/Section3WithAnimation";
import Section4WithAnimation from "./components/Section4WithAnimation";
import Section5WithAnimation from "./components/Section5WithAnimation";
import Section6WithAnimation from "./components/Section6WithAnimation";
import Section7WithAnimation from "./components/Section7WithAnimation";
import Section8WithAnimation from "./components/Section8";
import Section9WithAnimation from "./components/Section9WithAnimation";
import Section10WithAnimation from "./components/Section10WithAnimation";
import Section11WithAnimation from "./components/Section11WithAnimation";
import Section12WithAnimation from "./components/Section12WithAnimation";

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
      {/* <main className="landing-page min-h-screen bg-white"> */}
      <Header />
      <Section8 />

      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <Section7 />
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
