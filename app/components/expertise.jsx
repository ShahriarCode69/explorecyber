import React from "react";

export default function Expertise() {
  const certifications = [
    "ceh.svg",
    "offensivesecurity.svg",
    "cisa.svg",
    "crest.svg",
    "cism.svg",
  ];

  return (
    <section className='h-auto bg-[url("/backgrounds/expertise.png")] bg-cover bg-center pb-32'>
      <div className="section mx container">
        <p className="mb-4 text-center text-base uppercase md:text-xl">
          Our services
        </p>
        <h2 className="heading-sm mx-auto mb-4 max-w-[30ch] text-center">
          Our security qualifications
        </h2>
        <p className="description mx-auto text-center">
          Our London based team of ethical hackers and penetration testing
          service experts possess the skills and experience to identify the
          latest threats.
        </p>

        <div className="mt-12 flex justify-center">
          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((certificate, index) => (
              <img
                key={index}
                src={`/images/${certificate}`}
                alt=""
                className="object-contain"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
