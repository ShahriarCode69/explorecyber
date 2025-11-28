import React from 'react'

export default function About() {
	return (
    <section id="about" className="section mx container flex flex-col gap-12">
      <div className="flex flex-col gap-4 md:gap-6">
        <p className="text-base uppercase md:text-xl">About Us</p>
        <h2 className="heading-md">
          “We detect and fix threats{" "}
          <span className="text-light/38">before hackers strike</span> — fast
          and reliable”
        </h2>
      </div>
      <div className="flex items-center gap-3">
        <img src="/founder.png" alt="founder image" className="w-16" />
        <div>
          <span className="text-xl font-bold">Azmain Mahtab</span>
          <p>Founder</p>
        </div>
      </div>
    </section>
  );
}
