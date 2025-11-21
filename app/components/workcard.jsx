import React from "react";

export default function WorkCard({
  category,
  title,
  tags,
  description,
  image,
  variant = "light",
}) {
  const isLight = variant === "light";

  return (
    <div
      className={`w-full border-2 border-white/10 ${
        isLight ? "bg-light" : "bg-gradient-to-b from-gradientDark to-gradientLight"
      } rounded-3xl p-8 md:p-12`}
    >
      <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-12">
        {/* Text Content */}
        <div className="w-full h-96 flex justify-between flex-col flex-1 space-y-6">
          <div className="space-y-4">
            <p
              className={`text-xs font-medium tracking-wider uppercase ${
                isLight ? "text-gray-600" : "text-gray-400"
              }`}
            >
              {category}
            </p>
            <h2
              className={`text-4xl font-bold md:text-5xl ${
                isLight ? "text-black" : "text-white"
              }`}
            >
              {title}
            </h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className={`rounded-full px-4 py-1.5 text-sm ${
                    isLight
                      ? "border border-gray-800 text-gray-800"
                      : "border border-gray-400 text-gray-300"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <p
            className={`text-sm leading-relaxed ${
              isLight ? "text-gray-700" : "text-gray-400"
            } max-w-md`}
          >
            {description}
          </p>
        </div>

        {/* Image */}
        <div className="w-full flex-1 lg:w-auto">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-purple-800 to-black">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
