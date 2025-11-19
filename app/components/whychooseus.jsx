import Image from "next/image";
import React from "react";
import { FaCheck } from "react-icons/fa";
import benefitsImage from "@/public/images/whychooseus.png"

const benefits = [
  "Actionable reports your team understands",
  "Continuous protection, zero downtime risks",
  "Strengthen systems with expert guidance",
];

export default function WhyChooseUs() {
  return (
    <section className="section mx container flex flex-col lg:flex-row lg:items-center lg:justify-center lg:gap-16">
      <div className="w-full lg:w-[45%]">
        <p className="mb-2 text-base uppercase md:text-xl">Why choose us</p>
        <h2 className="heading-md mb-2">Security done right. No shortcuts</h2>
        <p className="description mb-10">
          {" "}
          We test, detect, and strengthen your entire ecosystem. Find flaws. Fix
          weaknesses. Stay ahead
        </p>

        <hr />

        <div className="mt-4">
          {benefits.map((benefit, index) => (
            <div className="mb-3 flex items-center gap-2 text-sm">
              <div
                key={index}
                className="bg-accent flex-center h-8 w-8 rounded-full"
              >
                <FaCheck size={12} color="#01010c" />
              </div>
              {benefit}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full lg:w-[55%]">
        <Image
          quality={100}
          src={benefitsImage}
          alt="why choose us section image"
        />
      </div>
    </section>
  );
}
