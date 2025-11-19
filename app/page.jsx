import Hero from "./components/hero";
import LogoCloud from "./components/logocloud";
import About from "./components/about";
import Services from "./components/services";
import Cta from "./components/cta";
import Footer from "./components/footer";

export default function Home() {
  return (
   <main>
     <Hero/>
     <LogoCloud/>
     <About/>
     <Services/>
     <Cta/>
     <Footer/>
   </main>
  );
}
