"use client"

import React, { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What is ExploreCyber?",
      answer:
        "ExploreCyber is a cybersecurity division offering penetration testing, vulnerability assessments, continuous monitoring, and incident response services to help businesses stay protected from modern cyber threats.",
    },
    {
      question: "What industries do you work with?",
      answer:
        "We work with a diverse range of industries including finance, healthcare, retail, technology, government, and manufacturing. Our cybersecurity solutions are tailored to meet the specific compliance and security requirements of each sector.",
    },
    {
      question: "What services do you provide?",
      answer:
        "Our comprehensive services include penetration testing, vulnerability assessments, security audits, incident response, continuous monitoring, security consulting, compliance assessments, and custom cybersecurity solutions designed for your organization's needs.",
    },
    {
      question: "How long does a penetration test take?",
      answer:
        "The duration of a penetration test varies based on the scope and complexity of your systems. Typically, a standard penetration test takes 1-2 weeks, while more comprehensive assessments can take 3-4 weeks. We'll provide a detailed timeline during the initial consultation.",
    },
    {
      question: "Do you provide detailed reports?",
      answer:
        "Yes, we provide comprehensive reports that include executive summaries, detailed findings, risk ratings, evidence of vulnerabilities, and actionable remediation recommendations. All reports follow industry standards and can be customized to meet your compliance requirements.",
    },
    {
      question: "Do you offer ongoing monitoring?",
      answer:
        "Absolutely! We offer 24/7 continuous monitoring services to detect and respond to threats in real-time. Our monitoring solutions include threat detection, log analysis, intrusion detection, and automated alerting to keep your systems secure around the clock.",
    },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="bg-dark container section mx text-white">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 border-2 border-white/8 rounded-xl p-2 inline-flex items-center justify-center gap-2">
            <FaQuestionCircle className="text-2xl text-gray-400" />
            <span className="text-sm tracking-wider text-gray-400 uppercase">
              FAQS
            </span>
          </div>
          <h1 className="mb-4 text-4xl font-bold sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-400">
            Find questions and answers related to the design system,
            <br className="hidden sm:block" />
            purchase, updates, and support.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl border-2 border-white/8 bg-gradient-to-b from-transparent to-[#ABABAB]/6"
            >
              {/* Question Button */}
              <button
                onClick={() => toggleAccordion(index)}
                className="flex w-full items-center justify-between p-5 text-left transition-all duration-300"
              >
                <span className="pr-8 text-lg font-medium">{faq.question}</span>
                <div className="relative h-6 w-6 flex-shrink-0">
                  {/* Plus Icon */}
                  <div
                    className={`absolute inset-0 transition-all duration-300 ${
                      openIndex === index
                        ? "scale-0 rotate-90 opacity-0"
                        : "scale-100 rotate-0 opacity-100"
                    }`}
                  >
                    <svg
                      className="h-6 w-6 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                  {/* Minus Icon */}
                  <div
                    className={`absolute inset-0 transition-all duration-300 ${
                      openIndex === index
                        ? "scale-100 rotate-0 opacity-100"
                        : "scale-0 -rotate-90 opacity-0"
                    }`}
                  >
                    <svg
                      className="h-6 w-6 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 12H4"
                      />
                    </svg>
                  </div>
                </div>
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6 leading-relaxed text- text-gray-300">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
