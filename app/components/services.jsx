import React from "react";

export default function Services() {
  const services = [
    {
      icon: "pentest.svg",
      label: "Penetration Testing",
    },
    {
      icon: "websecurity.svg",
      label: "Web Testing",
    },
    {
      icon: "appsecurity.svg",
      label: "App Security",
    },
    {
      icon: "cloud.svg",
      label: "Cloud Security",
    },
    {
      icon: "network.svg",
      label: "Network Security",
    },
    {
      icon: "soc.svg",
      label: "SOC Monitoring",
    },
    {
      icon: "management.svg",
      label: "Compliance Management",
    },
    {
      icon: "response.svg",
      label: "Incident Response",
    },
  ];

  return (
    <section className='h-auto bg-[url("/backgrounds/serviceBg.png")] bg-cover bg-center pb-12'>
      <div className="mx section mx-auto w-full max-w-screen-xl">
        <p className="mb-4 text-center text-base uppercase md:text-xl">
          About Us
        </p>
        <h2 className="heading-sm mx-auto mb-12 max-w-[30ch] text-center">
          Protect Your Business with Our Cutting-Edge Cybersecurity Solutions
        </h2>

        <div
          className="grid h-auto grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-4"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className={`from-gradientLight to-gradientDark // Mobile: (full width of the 1-col grid) // Tablet (md): (2 cards across) // Desktop (lg): (4 cards across) relative col-span-1 col-span-2 row-span-3 rounded-md bg-gradient-to-b p-12 text-xl font-bold text-white md:col-span-2 lg:col-span-1`}
            >
              <div
                className="absolute inset-0 rounded-md p-[1.5px]"
                style={{
                  background: `linear-gradient(to bottom, rgba(248, 51, 60, 0.7) , rgba(248, 51, 60, 0) 70%)`,
                }}
              >
                <div className="from-gradientLight to-gradientDark h-full w-full rounded-md bg-gradient-to-b"></div>
              </div>
              <div className="relative z-10">
                <div className="mb-4 inline-flex h-15 w-15 items-center justify-center rounded-md bg-gradient-to-b from-[#F8333C] to-[#780005] p-3">
                  <img
                    src={`/icons/${service.icon}`}
                    alt={`Icon of ${service.icon}`}
                  />
                </div>
                <p className="w-12">{service.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
