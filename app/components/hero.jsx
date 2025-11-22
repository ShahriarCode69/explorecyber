import React from "react";
import Button from "./button";
import Stats from "./stats";
import Link from "next/link";

export default function Hero() {
  return (
    <section className='h-auto bg-[url("/backgrounds/heroBg.png")] bg-cover bg-bottom'>
      <div className="flex-center container flex-col gap-10 pt-48">
        <div className="flex-center flex-col text-center">
          <h1 className="heading-xl leading-5">
            Securing Today, <br /> Defending Tomorrow
          </h1>
          <p className="description mt-4">
            Elite cybersecurity solutions protecting your digital infrastructure
            from evolving threats. We secure what matters most.
          </p>
        </div>
        <div className="flex gap-3">
          <Button href="/bookdemo">Book A Demo</Button>
          <Button href="#services">
            Explore Services
          </Button>
        </div>
      </div>
      <Stats />
    </section>
  );
}
