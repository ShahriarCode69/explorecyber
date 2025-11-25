"use client";
import { motion, useInView, animate, useMotionValue } from "framer-motion";
import React, { useEffect, useRef } from "react";
import Image from "next/image";

// Animated Number with Framer Motion
const AnimatedNumber = ({ value, suffix = "", decimals = 0 }) => {
  const ref = useRef(null);
  const spanRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });

  const motionValue = useMotionValue(0);

  useEffect(() => {
    if (isInView) {
      animate(motionValue, value, {
        duration: 1.5,
        ease: "easeOut",
      });
    }
  }, [isInView, motionValue, value]);

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
}, [motionValue, decimals]);


  return (
    <h2
      ref={ref}
      className="mb-2 flex items-baseline justify-end text-4xl font-bold"
    >
      <span ref={spanRef}>0</span>
      {suffix && (
        <span className="ml-1 text-2xl leading-none font-semibold">
          {suffix}
        </span>
      )}
    </h2>
  );
};
