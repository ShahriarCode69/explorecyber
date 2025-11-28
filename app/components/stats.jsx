"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { animate, useMotionValue, useInView } from "framer-motion";

/* -------------------------------------------
   Animated Number (Framer Motion)
-------------------------------------------- */
const AnimatedNumber = ({ value, suffix = "", decimals = 0 }) => {
  const ref = useRef(null); // element that triggers inView
  const numberRef = useRef(null); // the text node for displaying number
  const motionValue = useMotionValue(0);

  const isInView = useInView(ref, {
    once: true,
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
      className="mb-2 flex items-baseline justify-end text-4xl font-bold"
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

/* -------------------------------------------
   StatsCard Component
-------------------------------------------- */
const StatsCard = ({ icon, value, suffix, decimals = 0, label }) => {
  return (
    <div className="from-gradientLight to-gradientDark relative h-44 overflow-hidden rounded-lg bg-gradient-to-b px-4 py-2 shadow-lg transition-shadow duration-300 hover:shadow-xl">
      {/* Top gradient overlay */}
      <div
        className="absolute inset-0 rounded-lg p-[1.5px]"
        style={{
          background: `linear-gradient(to bottom, rgba(248, 51, 60, 0.7) , rgba(248, 51, 60, 0) 70%)`,
        }}
      >
        <div className="from-gradientLight to-gradientDark h-full w-full rounded-lg bg-gradient-to-b"></div>
      </div>

      {/* Text */}
      <div className="absolute right-4 bottom-4 z-10 text-right">
        <AnimatedNumber value={value} suffix={suffix} decimals={decimals} />
        <p className="font-medium">{label}</p>
      </div>

      {/* Background Icon */}
      <div className="absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 transform opacity-20">
        <Image
          src={`/icons/${icon}`}
          alt={label}
          width={120}
          height={120}
          className="object-contain"
        />
      </div>
    </div>
  );
};

/* -------------------------------------------
   StatsCardColumn (Main Component)
-------------------------------------------- */
const StatsCardColumn = () => {
  const statsData = [
    {
      icon: "lock.svg",
      value: 99.9,
      suffix: "%",
      decimals: 1,
      label: "accuracy",
    },
    {
      icon: "target.svg",
      value: 500,
      suffix: "+",
      label: "targets pentested",
    },
    {
      icon: "people.svg",
      value: 150,
      suffix: "+",
      label: "happy clients",
    },
    {
      icon: "monitor.svg",
      value: 24,
      suffix: "/7",
      label: "monitoring service",
    },
  ];

  return (
    <div className="section mx container">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
          {statsData.map((stat, index) => (
            <StatsCard
              key={index}
              icon={stat.icon}
              value={stat.value}
              suffix={stat.suffix}
              decimals={stat.decimals}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsCardColumn;
