import Image from "next/image";
import React from "react";
import { PiShieldCheckeredFill } from "react-icons/pi";

export default function WhenSection() {
  const whenPoints = [
    "Making significant changes to infrastructure",
    "Launching new products and services",
    "Undergoing a business merger or acquisitio",
    "Preparing for compliance with security standards",
    "Bidding for large commercial",
    "Utilising and/or developing custom applications",
  ];

  return (
    <section className="section mx container">
      <div className="grid auto-rows-auto grid-cols-5 gap-2 md:gap-3">
        {/* div1 */}
        <div className="relative col-span-5 rounded-md bg-[#07071665] p-8 sm:col-span-3 sm:row-span-6">
          {/* Gradient Border */}
          <div
            className="absolute inset-0 -z-10 rounded-md p-[1.5px]"
            style={{
              background: `linear-gradient(to bottom, rgba(248, 51, 60, 0.7), rgba(248, 51, 60, 0) 70%)`,
            }}
          >
            <div className="from-dark h-full w-full rounded-md bg-gradient-to-b to-transparent"></div>
          </div>

          {/* Background Image */}
          <Image
            fill
            src="/backgrounds/whenBg.png"
            className="absolute inset-0 -z-30 rounded-md object-cover object-center"
            alt="When Section Background"
          />

          {/* Content */}
          <ul className="relative z-10">
            {whenPoints.map((whenPoint, index) => (
              <div key={index} className="mb-4 flex items-center gap-4 p-2">
                •<li className="text-2xl">{whenPoint}</li>
              </div>
            ))}
          </ul>
        </div>

        {/* div2 */}
        <div className="col-span-5 rounded-md bg-gray-400 sm:col-span-2 sm:col-start-4 sm:row-span-2">
          <a
            href="#contact"
            className="flex-center from-accent to-primary py-4 before:border-light/25 relative h-full w-full cursor-pointer rounded-md bg-gradient-to-br via-[#941891] text-2xl font-medium text-white before:absolute before:inset-0 before:rounded-lg before:border-3 before:content-['']"
          >
            Verify System Security
          </a>
        </div>

        {/* div3 */}
        <div className="from-gradientDark to-gradientLight relative col-span-5 rounded-md bg-gradient-to-b sm:col-span-2 sm:col-start-4 sm:row-span-4 sm:row-start-3">
          <div
            className="absolute inset-0 rounded-md p-[1.5px]"
            style={{
              background: `linear-gradient(to bottom, rgba(248, 51, 60, 0.7) , rgba(248, 51, 60, 0) 70%)`,
            }}
          >
            <div className="from-gradientLight to-gradientDark h-full w-full rounded-md bg-gradient-to-b"></div>
          </div>
          <div className="relative z-10 flex w-full flex-col items-center justify-between p-8">
            <PiShieldCheckeredFill size={200} />
            <h3 className="self-end text-right text-[33px] font-semibold">
              One weakness is all it takes{" "}
              <span className="font-light">— find it first</span>
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
