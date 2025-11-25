"use client";

import React, { useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import CaseStudyCard from "./casestudycard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function CaseStudy() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const paginationRef = useRef(null);

  const caseStudies = [
    {
      catergory: "SAAS",
      title: "Project Atlas Shield",
      description:
        "A fast-scaling SaaS company hired us to perform a deep penetration test.",
      keyWorks: [
        "Broken access control (IDOR)",
        "SQL injection through a vulnerable API endpoint",
        "Weak JWT token signing key",
      ],
      outcome:
        "After implementing our remediation plan, the platform eliminated all critical risks and successfully passed investor due-diligence ",
      imageUrl: "/images/cs1.png",
    },
    {
      catergory: "E-Commerce",
      title: "Project CommerceGuard",
      description:
        "A growing e-commerce business suffered from suspicious admin logins and bot-driven attacks. Our Advanced Defense package revealed",
      keyWorks: [
        "Brute-force login vulnerability",
        "Server directory exposure leaking sensitive paths",
        "Payment-page validation flaws",
      ],
      outcome:
        "The fixes significantly strengthened their checkout security and reduced fraudulent activities.",
      imageUrl: "/images/cs2.png",
    },
    {
      catergory: "SAAS",
      title: "Project SentinelFlow",
      description:
        "A SaaS platform kept experiencing unusual traffic spikes and automated probing.",
      keyWorks: [
        "Continuous vulnerability monitoring",
        "Monthly advisory & security compliance meetings",
        "Incident response simulations with senior leadership",
      ],
      outcome:
        "Their audit readiness improved dramatically, and they avoided major downtime or data exposure incidents.",
      imageUrl: "/images/cs3.png",
    },
  ];

  return (
    <section className="section mx relative container">
      <p className="mb-4 text-base uppercase md:text-xl">Case Studies</p>
      <h2 className="heading-md mb-12 w-[70%]">
        How We Secure Businesses in the Real World
      </h2>
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        autoHeight={true}
        spaceBetween={2}
        slidesPerView={1}
        initialSlide={1}
        centeredSlides={false}
        breakpoints={{
          768: {
            slidesPerView: 1.2,
            centeredSlides: true,
          },
        }}
        // FIX: use null during render
        navigation={{ prevEl: null, nextEl: null }}
        pagination={{ el: null, clickable: true }}
        onSwiper={(swiper) => {
          setTimeout(() => {
            if (prevRef.current && nextRef.current) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }

            if (paginationRef.current) {
              swiper.params.pagination.el = paginationRef.current;
              swiper.pagination.init();
              swiper.pagination.render();
              swiper.pagination.update();
            }
          }, 0);
        }}
        onSlideChange={() => {}}
      >
        {caseStudies.map((caseStudy, index) => (
          <SwiperSlide key={index} className="!h-auto">
            <CaseStudyCard
              category={caseStudy.catergory}
              title={caseStudy.title}
              description={caseStudy.description}
              keyWorks={caseStudy.keyWorks}
              outcome={caseStudy.outcome}
              imageUrl={caseStudy.imageUrl}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation + Pagination container — pagination centered between buttons */}
      <div className="mx-auto mt-4 flex w-fit items-center justify-center gap-4">
        <button
          ref={prevRef}
          aria-label="Previous slide"
          className="custom-prev bg-gradientLight cursor-pointer rounded-full p-2 focus:outline-none"
        >
          <IoIosArrowBack size={28} />
        </button>

        {/* pagination element sits between buttons and is centered */}
        <div
          ref={paginationRef}
          className="my-pagination flex cursor-pointer items-center justify-center"
        ></div>

        <button
          ref={nextRef}
          aria-label="Next slide"
          className="custom-next bg-gradientLight cursor-pointer rounded-full p-2 focus:outline-none"
        >
          <IoIosArrowForward size={28} />
        </button>
      </div>
    </section>
  );
}
