import React from "react";

const CaseStudyCard = ({
  category = "SAAS",
  title = "Project Atlas Shield",
  description = "A fast-loading SaaS company meant up to perform a deep presentation test.",
  keyWorks = [
    "Browers access control (IDOR)",
    "SQL injection through a vulnerable API endpoint",
    "Weak JWT token signing key",
  ],
  outcome = "After impressing our penetration test reports for the platform, eliminated all critical risks and successfully passed investor due-diligence",
  imageUrl = null,
}) => {
  return (
    <div className="mx-auto w-full p-4">
      <div className="bg-light h-full overflow-hidden rounded-3xl">
        <div className="grid h-full items-stretch gap-0 md:grid-cols-[50%_50%]">
          {/* Left */}
          <div className="flex h-full flex-col justify-between p-8 md:p-10">
            <div>
              <div className="mb-3 text-sm font-medium tracking-wide text-gray-600">
                {category}
              </div>

              <h2 className="mb-4 text-3xl leading-tight font-bold text-gray-900 md:text-4xl">
                {title}
              </h2>

              <p className="mb-6 text-sm leading-relaxed text-gray-600">
                {description}
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                Key Works Done
              </h3>
              <ul className="space-y-2">
                {keyWorks.map((work, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mt-0.5 mr-2 text-gray-400">•</span>
                    <span className="text-sm leading-relaxed text-gray-700">
                      {work}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 rounded-xl bg-gray-50 p-4">
              <p className="text-sm leading-relaxed text-gray-700">{outcome}</p>
            </div>
          </div>

          {/* Right */}
          <div className="relative flex h-full items-center justify-center p-0 md:p-10">
            <img
              src={imageUrl}
              alt={title}
              className="h-full w-full object-cover md:rounded-3xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyCard;
