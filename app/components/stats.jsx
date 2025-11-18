import React from "react";
import Image from "next/image";

const StatsCard = ({ icon, number, label }) => {
  return (
    <div className="from-gradientLight to-gradientDark relative h-44 overflow-hidden rounded-lg bg-gradient-to-b px-4 py-2 shadow-lg transition-shadow duration-300 hover:shadow-xl">
      {/* Stats Content - Top */}
      <div
        className="absolute inset-0 rounded-lg p-[1.5px]"
        style={{
          background: `linear-gradient(to bottom, rgba(248, 51, 60, 0.7) , rgba(248, 51, 60, 0) 70%)`,
        }}
      >
        <div className="from-gradientLight to-gradientDark h-full w-full rounded-lg bg-gradient-to-b"></div>
      </div>
      <div className="absolute right-4 bottom-4 z-10 text-right">
        <h2 className="mb-2 text-4xl font-bold">{number}</h2>
        <p className="font-medium">{label}</p>
      </div>

      {/* Icon - Bottom with absolute positioning */}
      <div className="absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 transform">
        <Image
          src={`/icons/${icon}`}
          alt={label}
          width={120}
          height={120}
          className="object-contain"
        />
      </div>
    </div>
  );
};

const StatsCardColumn = () => {
  const statsData = [
    {
      icon: "lock.svg",
      number: "99.9%",
      label: "accuraccy",
    },
    {
      icon: "target.svg",
      number: "500+",
      label: "targets pentested",
    },
    {
      icon: "people.svg",
      number: "150+",
      label: "happy clients",
    },
    {
      icon: "monitor.svg",
      number: "24/7",
      label: "monitoring service",
    },
  ];

  return (
    <div className="section container mx">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
          {statsData.map((stat, index) => (
            <StatsCard
              key={index}
              icon={stat.icon}
              number={stat.number}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsCardColumn;
