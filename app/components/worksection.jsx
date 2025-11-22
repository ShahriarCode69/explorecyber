import WorkCard from "./workcard";

export default function WorkSection() {
  const projects = [
    {
      category: "RETAIL & E-COMMERCE",
      title: "Korba",
      tags: ["Web design", "Development"],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.",
      image:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop",
      variant: "light",
    },
    {
      category: "FEATURED WORK",
      title: "TrailHive",
      tags: ["Concept design", "Brand identity"],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor.",
      image:
        "https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=800&h=600&fit=crop",
      variant: "dark",
    },
    {
      category: "TECHNOLOGY & INNOVATION",
      title: "NexaCore",
      tags: ["UI/UX Design", "Web App"],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.",
      image:
        "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&h=600&fit=crop",
      variant: "light",
    },
  ];

  return (
    <div id="works" className="mx section bg-dark container p-4 md:p-8">
      <p className="mb-4 text-center text-base uppercase md:text-xl">
        Our Works
      </p>
      <h2 className="heading-sm mx-auto mb-12 max-w-[30ch] text-center">
        Protect Your Business with Our Cutting-Edge Cybersecurity Solutions
      </h2>
      <div className="space-y-6">
        {projects.map((project, index) => (
          <WorkCard
            key={index}
            category={project.category}
            title={project.title}
            tags={project.tags}
            description={project.description}
            image={project.image}
            variant={index % 2 === 0 ? "light" : "dark"}
          />
        ))}
      </div>
    </div>
  );
}
