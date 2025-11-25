import Marquee from "react-fast-marquee";

export default function LogoCloud() {
  const logos = [
    "fexco.png",
    "1stSourceBank.png",
    "colpatria.png",
    "kbc.png",
    "firstHorizon.png",
  ];

  return (
    <section className="section container mb-12">
      <Marquee gradient gradientColor="#01010c" pauseOnHover>
        {logos.map((logo, index) => (
          <img
            key={index}
            src={`/logos/${logo}`}
            alt={`Logo of ${logo}`}
            loading="lazy"
            className="ml-20"
          />
        ))}
      </Marquee>
    </section>
  );
}
