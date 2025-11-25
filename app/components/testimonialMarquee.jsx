import { cn } from "@/lib/utils";
import Marquee from "@/app/components/ui/marquee";
import { FaStar } from "react-icons/fa";
import Image from "next/image";

const reviews = [
  {
    name: "Maria Alvarez",
    role: "CTO - NovaRetail Solutions",
    body: "ExploreCyber’s penetration test uncovered critical flaws we didn’t even know existed. Their report was clear, prioritized, and helped us fix issues in days — not weeks..",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "James O’Neil",
    role: "Head of IT Operations",
    body: "Fast, efficient and friendly. ExploreCyber gave us an actionable roadmap to strengthen our cloud posture — excellent ROI.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "Aisha Rahman",
    role: "Product Manager",
    body: "Their web-app security review saved us from a potentially costly breach. The team were professional and the remediation guidance was superb.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Daniel Kim",
    role: "CEO",
    body: "We engaged ExploreCyber for a one-off audit and ended up signing a long-term servicing contract. High quality and trustworthy.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Priya Desai",
    role: "Head of Compliance",
    body: "Their combined vulnerability assessment and compliance checklist made our audit painless. Clear evidence and excellent communication.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    role: "CTO",
    body: "ExploreCyber’s penetration test uncovered critical flaws we didn’t even know existed. Their report was clear, prioritized, and helped us fix issues in days — not weeks.",
    img: "https://avatar.vercel.sh/james",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img, name, role, body }) => {
  return (
    <figure
      className={cn(
        "from-gradientLight to-gradientDark relative h-full w-96 cursor-pointer overflow-hidden rounded-xl bg-gradient-to-t p-4",
      )}
    >
      <div
        className="absolute inset-0 rounded-xl p-[1.5px]"
        style={{
          background: `linear-gradient(to bottom, rgba(248, 51, 60, 0.7) , rgba(248, 51, 60, 0) 70%)`,
        }}
      >
        <div className="from-gradientLight to-gradientDark h-full w-full rounded-xl bg-gradient-to-b"></div>
      </div>
      <div className="relative z-10">
        <div className="flex flex-row items-center gap-2">
          <Image
            className="rounded-full"
            width={32}
            height={32}
            alt={name}
            src={img}
            loading="lazy"
            sizes="32px"
          />
          <div className="mb-4 flex w-full items-center justify-between">
            <div className="flex flex-col">
              <figcaption className="text-sm font-medium text-white">
                {name}
              </figcaption>
              <p className="text-xs font-medium text-white/40">{role}</p>
            </div>
            <div className="flex items-center gap-1">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <FaStar key={i} className="h-4 w-4 text-[#4B4B67]" />
                ))}
            </div>
          </div>
        </div>
        <blockquote className="mt-2 text-sm">{body}</blockquote>
      </div>
    </figure>
  );
};

export default function testimonialMarquee() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:50s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:50s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>
      <div className="from-dark pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
      <div className="from-dark pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
    </div>
  );
}
