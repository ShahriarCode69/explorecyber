import React from "react";
import Button from "./button";

export default function Cta() {
  return (
    <section className='relative h-auto bg-[url("/backgrounds/ctaBg.png")] bg-cover bg-center'>
      <div className="section mx flex-center z-20 container flex-col p-22">
        <h2 className="heading-xl z-20">2200</h2>
        <h4 className="heading-sm mb-4 text-center">
          Number of Cyber Attacks Per Day
        </h4>
        <p className="description mb-8 text-center">
          It's Happening 39 Seconds On Average. Need help with your security
          problem? No worries !!!
        </p>

        <Button href="#contact">Contact Us</Button>
      </div>
      <div className="absolute top-0 -left-5 z-10 h-32 w-32 rounded-full bg-[#A604F257] blur-[70px]"></div>
      <div className="absolute top-20 right-180 z-10 h-32 w-32 rounded-full bg-[#763AF578] blur-[70px]"></div>
      <div className="absolute -right-0 bottom-0 z-10 h-32 w-56 rounded-full bg-[#763AF558] blur-[70px]"></div>
    </section>
  );
}
