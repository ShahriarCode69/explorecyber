import Hero from "./components/hero";
import LogoCloud from "./components/logocloud";
import About from "./components/about";
import Services from "./components/services";

export default function Home() {
  return (
   <main>
     <Hero/>
     <LogoCloud/>
     <About/>
     <Services/>
   </main>
  );
}
