"use client";

import { useState } from "react";
import LogoImage from "@/public/logo.svg";
import Image from "next/image";
import Button from "./button";
import Link from "next/link";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/#about" },
    { label: "Services", href: "/#services" },
    { label: "Works", href: "/#works" },
    { label: "Contact", href: "/#contact" },
  ];

  const closeMenu = () => setOpen(false);

  /** Mobile menu slide container */
  const menuContainer = {
    hidden: { opacity: 0, y: -20, height: 0 },
    show: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: {
        duration: 0.20,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      height: 0,
      transition: { duration: 0.22, ease: "easeIn" },
    },
  };

  /** Stagger animation for list */
  const listParent = {
    hidden: {},
    show: {
      transition: {
        delayChildren: 0.10, // after menu slides down
        staggerChildren: 0.1, // slower, smoother
      },
    },
  };

  /** Each link comes from left */
  const listItem = {
    hidden: { opacity: 0, x: -20 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.25, ease: "easeOut" },
    },
  };

  /** Button comes LAST — after links finish */
  const buttonVariant = {
    hidden: { opacity: 0, x: -20 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.25,
        ease: "easeOut",
        delay: navLinks.length * 0.12 + 0,
        // (links stagger time + little delay)
      },
    },
  };

  return (
    <header className="mx fixed inset-0 z-99 mx-auto mt-6 h-fit w-full max-w-screen-lg">
      <nav className="from-gradientLight to-gradientDark border-light/13 flex items-center justify-between gap-10 rounded-xl border-2 bg-gradient-to-b px-3 py-3">
        {/* Logo */}
        <Image className="w-28" src={LogoImage} alt="" />

        {/* Desktop Links */}
        <ul className="hidden items-center justify-center gap-6 md:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                className="hover:text-accent transition-all duration-300"
                href={link.href}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Button */}
        <div className="hidden md:flex">
          <Button href="/#contact">Get Started</Button>
        </div>

        {/* Mobile Toggle */}
        <button className="text-3xl md:hidden" onClick={() => setOpen(!open)}>
          {open ? <HiX /> : <HiOutlineMenuAlt3 />}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuContainer}
            initial="hidden"
            animate="show"
            exit="exit"
            className="from-gradientLight to-gradientDark border-light/13 mt-3 w-full rounded-xl border-2 bg-gradient-to-b px-5 py-8 md:hidden"
          >
            <motion.ul
              variants={listParent}
              initial="hidden"
              animate="show"
              className="flex-center flex-col  gap-6"
            >
              {navLinks.map((link) => (
                <motion.li key={link.label} variants={listItem}>
                  <Link
                    onClick={closeMenu}
                    className="hover:text-accent text-lg transition-all duration-300"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>

            {/* Button loads LAST */}
            <motion.div
              variants={buttonVariant}
              initial="hidden"
              animate="show"
              className="mt-5 flex-center"
            >
              <Button href="#contact" onClick={closeMenu}>
                Get Started
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
