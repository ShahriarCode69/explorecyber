"use client";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function LenisProvider({ children }) {
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const lenis = new Lenis({
      smooth: !prefersReducedMotion,
      smoothTouch: true,
      duration: 0.8, // Lower = less CPU usage, still smooth
      lerp: 0.08, // GPU-friendly smoothing
      // Use built-in easing (much lighter)
      easing: (t) => t,
    });

    let frame;

    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    // Start RAF loop only when page is visible
    const start = () => {
      if (!frame) frame = requestAnimationFrame(raf);
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = null;
    };

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stop();
      else start();
    });

    start();

    return () => {
      stop();
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
