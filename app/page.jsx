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

export default function Home() {
  return (
   <main>
     <Hero/>
     <LogoCloud/>
     <About/>
     <Services/>
     <WhyChooseUs/>
     <Expertise/>
     <Testimonials/>
     <FAQSection/>
     <Cta/>
     <Contact/>
     <Footer/>
   </main>
  );
}
