"use client";
import Header from "./components/Header";
import Section1WithAnimation from "./components/Section1WithAnimation";
import Section2WithAnimation from "./components/Section2WithAnimation";
import Section3WithAnimation from "./components/Section3WithAnimation";
import Section4WithAnimation from "./components/Section4WithAnimation";
import Section5WithAnimation from "./components/Section5WithAnimation";
import Section6WithAnimation from "./components/Section6WithAnimation";
import Section7WithAnimation from "./components/Section7WithAnimation";
import Section8WithAnimation from "./components/Section8WithAnimation";
import Section9WithAnimation from "./components/Section9WithAnimation";
import Section10WithAnimation from "./components/Section10WithAnimation";
import Section11WithAnimation from "./components/Section11WithAnimation";
import Section12WithAnimation from "./components/Section12WithAnimation";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Section1WithAnimation id="Section1" />
      <Section2WithAnimation />
      <Section3WithAnimation />
      <Section4WithAnimation />
      <Section5WithAnimation />
      <Section6WithAnimation />
      <Section7WithAnimation />
      <Section8WithAnimation />
      <Section9WithAnimation />
      <Section10WithAnimation />
      <Section11WithAnimation id="section8" />
      <Section12WithAnimation />
    </div>
  );
}
