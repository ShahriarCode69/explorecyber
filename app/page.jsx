"use client"

import Hero from "./components/hero";
import LogoCloud from "./components/logocloud";
import About from "./components/about";
import Services from "./components/services";
import Cta from "./components/cta";
import Footer from "./components/footer";
import WhyChooseUs from "./components/whychooseus";
import Expertise from "./components/expertise";
import Testimonials from "./components/testimonials";
import Contact from "./components/contact";
import FAQSection from "./components/faqsection";
import WhenSection from "./components/whensection";
import WorkSection from "./components/worksection";
import CaseStudy from "./components/casestudy";
import { useEffect } from "react";
import Lenis from "lenis"

export default function Home() {

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time, any) {
      lenis.raf(time);
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  return (
   <main>
     <Hero/>
     <LogoCloud/>
     <About/>
     <Services/>
     <WhyChooseUs/>
     <WorkSection/>
     <CaseStudy/>
     <Testimonials/>
     <Expertise/>
     <WhenSection/>
     
     <FAQSection/>
     <Cta/>
     <Contact/>
   </main>
  );
}
