"use client";

import React, { useEffect, useRef } from "react";
import { animate, useMotionValue, useInView } from "framer-motion";
import Button from "./button";

/* -------------------------------------------
   Animated Number (Framer Motion)
-------------------------------------------- */
const AnimatedNumber = ({
  value,
  suffix = "",
  decimals = 0,
  className = "",
}) => {
  const ref = useRef(null); // element that triggers inView
  const numberRef = useRef(null); // the text node for displaying number
  const motionValue = useMotionValue(0);

  const isInView = useInView(ref, {
    once: true,
    margin: "-150px 0px -150px 0px",
  });

  // Animate when in view
  useEffect(() => {
    if (isInView) {
      animate(motionValue, value, {
        duration: 1.6,
        ease: "easeOut",
      });
    }
  }, [isInView, motionValue, value]);

  // Update DOM text on change
  useEffect(() => {
    const unsubscribe = motionValue.on("change", (latest) => {
      if (numberRef.current) {
        numberRef.current.textContent = latest.toLocaleString(undefined, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        });
      }
    });
    return unsubscribe;
  }, [decimals, motionValue]);

  return (
    <h2
      ref={ref}
      className={`flex items-baseline justify-center text-4xl font-bold ${className}`}
    >
      <span ref={numberRef}>0</span>
      {suffix && (
        <span className="ml-1 text-2xl leading-none font-semibold">
          {suffix}
        </span>
      )}
    </h2>
  );
};

export default function Cta() {
  return (
    <section className='relative h-auto bg-[url("/backgrounds/ctaBg.png")] bg-cover bg-center'>
      <div className="section mx flex-center z-20 container flex-col p-22">
        <AnimatedNumber value={2200} className="heading-xl z-20" />
        <h4 className="heading-sm mb-4 text-center">
          Number of Cyber Attacks Per Day
        </h4>
        <p className="description mb-8 text-center">
          It&apos;s Happening 39 Seconds On Average. Need help with your security
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
