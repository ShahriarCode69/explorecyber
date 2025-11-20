import React from "react";
import TestimonialMarquee from "./testimonialMarquee";

export default function Testimonials() {
  return (
    <section className="section mx container">
      <h2 className="heading-sm mx-auto mb-14 max-w-[30ch] text-center">
        What Our Clients Say About Staying Secure
      </h2>
      <TestimonialMarquee />
    </section>
  );
}
