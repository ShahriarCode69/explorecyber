import React from "react";
import CyberSecurityForm from "./cybersecurityform";
import Image from "next/image";
import contactForm from "@/public/images/contactForm.webp";

export default function Contact() {
  return (
    <section
      id="contact"
      className="section relative mx-auto w-full max-w-5xl px-4"
    >
      {/* Create stacking context for the main card */}
      <div className="relative z-10">
        <h2 className="heading-sm mx-auto mb-14 max-w-[30ch] text-center">
          Get in touch
        </h2>

        <div className="relative z-10 flex flex-col gap-8 rounded-xl bg-white/4 p-4 sm:p-6 lg:flex-row lg:items-stretch">
          {/* Form */}
          <div className="w-full flex-shrink-0 lg:flex-1">
            <CyberSecurityForm />
          </div>

          {/* Image section */}
          <div className="relative min-h-[400px] w-full flex-shrink-0 overflow-hidden rounded-lg lg:min-h-0 lg:flex-1">
            <div className="absolute inset-0">
              <Image
                src={contactForm}
                alt="Contact"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 from-35% to-transparent"></div>

              <div className="absolute bottom-4 left-4 z-10 flex max-w-[30ch] flex-col gap-3 text-white sm:bottom-6 sm:left-6 sm:gap-4">
                <h3 className="text-xl font-semibold sm:text-2xl">
                  Contact Us
                </h3>
                <p className="text-sm sm:text-base">
                  128 City Road London, EC1V 2NX, United Kingdom
                </p>
                <p className="text-sm sm:text-base">info@exploreitsms.com</p>
                <p className="text-sm sm:text-base">+447546415849</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blobs UNDER the card */}
      <div className="absolute top-0 -left-5 z-0 h-32 w-32 rounded-full bg-[#A604F2] blur-[100px] opacity-30"></div>
      <div className="absolute bottom-0 -left-20 z-0 h-32 w-32 rounded-full bg-[#763AF5] blur-[100px] opacity-30"></div>
      <div className="absolute top-20 -right-0 z-0 h-32 w-56 rounded-full bg-[#763AF5] blur-[80px] opacity-30"></div>
    </section>
  );
}
