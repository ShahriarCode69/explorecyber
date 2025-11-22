"use client"

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

export default function CaseStudyCarousel({ children }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
    skipSnaps: false,
    dragFree: false,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full py-10">
      {/* Viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-10">
          {React.Children.map(children, (_, index) => (
            <div className="flex-[0_0_80%] md:flex-[0_0_70%] lg:flex-[0_0_60%] xl:flex-[0_0_55%]">
              {children[index]}
            </div>
          ))}
        </div>
      </div>

      {/* Dot Pagination */}
      <div className="mt-8 flex justify-center gap-3">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi && emblaApi.scrollTo(index)}
            className={`h-3 w-3 rounded-full transition ${
              index === selectedIndex ? "bg-red-600" : "bg-gray-500"
            }`}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-4 flex justify-center gap-6">
        <button
          onClick={scrollPrev}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1A1A1A] text-lg text-white shadow"
        >
          ‹
        </button>

        <button
          onClick={scrollNext}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1A1A1A] text-lg text-white shadow"
        >
          ›
        </button>
      </div>
    </div>
  );
}
