"use client"

import React from "react";
import LogoImage from "@/public/logo.svg";
import Image from "next/image";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { motion } from "framer-motion";

export default function Footer() {
  const footerLinks = [
    {
      label: "Terms & Conditions",
    },
    {
      label: "Refund Policy",
    },
    {
      label: "Privacy Policy",
    },
  ];

	const socialLinks = [
    {
      id: 1,
      icon: <FaFacebookF size={18} />,
      href: "https://facebook.com",
    },
    {
      id: 2,
      icon: <FaLinkedinIn size={18} />,
      href: "https://linkedin.com",
    },
    {
      id: 3,
      icon: <FaXTwitter size={18} />,
      href: "https://x.com",
    },
  ];

  return (
    <footer className="section mx container">
      <div className="mb-14 flex flex-col items-center justify-between gap-12 md:flex-row">
        <a href="#">
          <Image className="w-50" src={LogoImage} alt="" />
        </a>
        <ul className="flex flex-col items-center gap-10 md:flex-row">
          {footerLinks.map((link, index) => (
            <li key={index} className="text-lg uppercase">
              <a href="#">{link.label}</a>
            </li>
          ))}
        </ul>
      </div>
      <hr />
      <div className="mt-12 mb-2 flex flex-col items-center justify-between gap-12 md:flex-row">
        <p className="text-center uppercase md:text-left">
          © {new Date().getFullYear()} Explore Cyber • All Rights Reserved
        </p>
        <div className="flex items-center gap-4">
          {socialLinks.map((item) => (
            <motion.a
              key={item.id}
							href="#"
              className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-gray-300"
              whileHover="hover"
              initial="initial"
            >
              {/* Background Swipe */}
              <motion.span
                className="from-accent to-primary absolute inset-0 rounded-full bg-gradient-to-br via-[#7a24a8]"
                variants={{
                  initial: { x: "-100%" },
                  hover: { x: "0%", transition: { duration: 0.35 } },
                }}
              />

              {/* Icon */}
              <span className="relative z-10 text-white">{item.icon}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
