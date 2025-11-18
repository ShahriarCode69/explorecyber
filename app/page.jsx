import Hero from "./components/hero";
import LogoCloud from "./components/logocloud";
import About from "./components/about";
import Services from "./components/services";
import Cta from "./components/cta";

export default function Home() {
  return (
   <main>
     <Hero/>
     <LogoCloud/>
     <About/>
     <Services/>
     <Cta/>
   </main>
  );
}
