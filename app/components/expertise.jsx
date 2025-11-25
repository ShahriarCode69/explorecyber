"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Expertise() {
  const STAGGER_DELAY = 0.12;

  const certifications = [
    "ceh.svg",
    "offensivesecurity.svg",
    "cisa.svg",
    "crest.svg",
    "cism.svg",
  ];

  const itemVariants = {
    hidden: (i) => ({
      opacity: 0,
      y: (i % 2 === 0 ? -1 : 1) * 90,
      scale: 0.9,
    }),
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 20 },
    },
  };

  return (
    <section className='h-auto bg-[url("/backgrounds/expertise.png")] bg-cover bg-center pb-32'>
      <div className="section mx container">
        <p className="mb-4 text-center text-base uppercase md:text-xl">
          Expertise
        </p>
        <h2 className="heading-sm mx-auto mb-4 max-w-[30ch] text-center">
          Our security qualifications
        </h2>
        <p className="description mx-auto text-center">
          Our expert team of ethical hackers and penetration testing service
          experts possess the skills and experience to identify the latest
          threats. enhance it
        </p>

        <div className="mt-12 flex justify-center">
          <motion.div
            className="flex flex-wrap justify-center gap-4 md:gap-6"
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: STAGGER_DELAY,
                  delayChildren: STAGGER_DELAY / 2,
                },
              },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-200px 0px" }}
          >
            {certifications.map((certificate, index) => (
              <motion.img
                key={index}
                src={`/images/${certificate}`}
                alt={certificate.replace(".svg", "")}
                className="object-contain"
                variants={itemVariants}
                custom={index}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
