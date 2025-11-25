"use client";

import { useState } from "react";
import { getNames } from "country-list";
import { FaShieldAlt, FaChevronDown } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

export default function CyberSecurityForm() {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    company: "",
    country: "",
    service: "",
    contactMethod: "",
    bestTime: "",
    message: "",
  });

  const [status, setStatus] = useState(null);

  const SCRIPT_URL = process.env.NEXT_PUBLIC_CONTACT_FORM_SCRIPT;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const phoneRegex = /^[\d\s\+\-\(\)]*$/;
      if (!phoneRegex.test(value)) {
        toast.error(
          "Phone number can only contain numbers and symbols (+, -, (, ))",
        );
        return;
      }
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!form.fullName.trim()) {
      toast.error("Please enter your full name");
      return false;
    }

    if (form.fullName.trim().length < 2) {
      toast.error("Name must be at least 2 characters long");
      return false;
    }

    if (!form.phone.trim()) {
      toast.error("Please enter your phone number");
      return false;
    }

    const phoneDigits = form.phone.replace(/\D/g, "");
    if (phoneDigits.length < 7) {
      toast.error("Please enter a valid phone number (minimum 7 digits)");
      return false;
    }

    if (phoneDigits.length > 15) {
      toast.error("Phone number is too long (maximum 15 digits)");
      return false;
    }

    if (!form.email.trim()) {
      toast.error("Please enter your email address");
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (!form.company.trim()) {
      toast.error("Please enter your company/organization name");
      return false;
    }

    if (!form.country) {
      toast.error("Please select your country/timezone");
      return false;
    }

    if (!form.service) {
      toast.error("Please select a service of interest");
      return false;
    }

    if (!form.contactMethod) {
      toast.error("Please select your preferred contact method");
      return false;
    }

    if (!form.bestTime) {
      toast.error("Please select the best time to reach you");
      return false;
    }

    if (form.message && form.message.length > 1000) {
      toast.error(
        `Message is too long (${form.message.length}/1000 characters)`,
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Check if SCRIPT_URL is configured
    if (!SCRIPT_URL || SCRIPT_URL === "undefined") {
      toast.error(
        "❌ Form is not configured. Please add NEXT_PUBLIC_CONTACT_FORM_SCRIPT to your .env file",
      );
      console.error(
        "SCRIPT_URL is undefined. Add this to your .env.local file:",
      );
      console.error(
        "NEXT_PUBLIC_CONTACT_FORM_SCRIPT=your_google_apps_script_url",
      );
      return;
    }

    setStatus("sending");

    const loadingToast = toast.loading("Submitting your request...");

    try {
      const dataToSend = {
        ...form,
        origin: window.location.origin,
        timestamp: new Date().toISOString(),
      };

      console.log("Submitting to:", SCRIPT_URL);

      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify(dataToSend),
      });

      // With no-cors mode, we can't read the response, so assume success
      toast.dismiss(loadingToast);

      setStatus("success");

      toast.success(
        "🎉 Your request has been submitted successfully! We'll contact you soon.",
        {
          duration: 5000,
          style: {
            background: "#10B981",
            color: "#fff",
          },
        },
      );

      // Reset form
      setForm({
        fullName: "",
        phone: "",
        email: "",
        company: "",
        country: "",
        service: "",
        contactMethod: "",
        bestTime: "",
        message: "",
      });

      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.dismiss(loadingToast);

      setStatus("error");

      toast.error(
        "❌ Failed to submit. Please check the console and verify your SCRIPT_URL is correct.",
        { duration: 6000 },
      );

      setTimeout(() => setStatus(null), 3000);
    }
  };

  const countries = getNames().sort((a, b) => a.localeCompare(b));

  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour12 = i === 0 ? 12 : i > 12 ? i - 12 : i;
    const period = i >= 12 ? "PM" : "AM";
    return `${hour12.toString().padStart(2, "0")}:00 ${period}`;
  });

  return (
    <div className="">
      <Toaster
        position="bottom"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#141426",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)",
          },
          success: {
            iconTheme: { primary: "#10B981", secondary: "#fff" },
          },
          error: {
            iconTheme: { primary: "#EF4444", secondary: "#fff" },
          },
        }}
      />

      <div className="mx-auto w-full max-w-xl">
        <div className="flex flex-col gap-2">
          {/* Name + Phone */}
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name *"
              value={form.fullName}
              onChange={handleChange}
              disabled={status === "sending"}
              className="w-full rounded-lg border border-white/20 bg-white/5 p-3 text-white transition-all placeholder:text-white/60 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone / WhatsApp *"
              value={form.phone}
              onChange={handleChange}
              disabled={status === "sending"}
              className="w-full rounded-lg border border-white/20 bg-white/5 p-3 text-white transition-all placeholder:text-white/60 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          {/* Email + Company */}
          <div className="flex w-full flex-col gap-2 sm:flex-row">
            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={form.email}
              onChange={handleChange}
              disabled={status === "sending"}
              className="basis-[50%] rounded-lg border border-white/20 bg-white/5 p-3 text-white transition-all placeholder:text-white/60 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
            <input
              type="text"
              name="company"
              placeholder="Company Name *"
              value={form.company}
              onChange={handleChange}
              disabled={status === "sending"}
              className="basis-[50%] rounded-lg border border-white/20 bg-white/5 p-3 text-white transition-all placeholder:text-white/60 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          {/* Country */}
          <div className="relative">
            <select
              name="country"
              value={form.country}
              onChange={handleChange}
              disabled={status === "sending"}
              className="w-full appearance-none rounded-lg border border-white/20 bg-white/5 p-3 pr-10 text-white transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              style={{
                color: form.country ? "#fff" : "rgba(255,255,255,0.6)",
              }}
            >
              <option value="" className="bg-[#141426]">
                Select Your Country *
              </option>

              {countries.map((country) => (
                <option key={country} value={country} className="bg-[#141426]">
                  {country}
                </option>
              ))}
            </select>

            <FaChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-white/60" />
          </div>

          {/* Service */}
          <div className="relative">
            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              disabled={status === "sending"}
              className="w-full appearance-none rounded-lg border border-white/20 bg-white/5 p-3 pr-10 text-white transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              style={{
                color: form.service ? "#fff" : "rgba(255,255,255,0.6)",
              }}
            >
              <option value="" className="bg-[#141426]">
                Service of Interest *
              </option>
              <option value="Penetration Testing" className="bg-[#141426]">
                Penetration Testing
              </option>
              <option value="Web Security" className="bg-[#141426]">
                Web Security
              </option>
              <option value="App Security" className="bg-[#141426]">
                App Security
              </option>
              <option value="Cloud Security" className="bg-[#141426]">
                Cloud Security
              </option>
              <option value="Network Security" className="bg-[#141426]">
                Network Security
              </option>
              <option value="SOC Monitoring" className="bg-[#141426]">
                SOC Monitoring
              </option>
              <option value="Compliance Management" className="bg-[#141426]">
                Compliance Management
              </option>
              <option value="Incident Response" className="bg-[#141426]">
                Incident Response
              </option>
            </select>

            <FaChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-white/60" />
          </div>

          {/* Contact Method */}
          <div className="relative">
            <select
              name="contactMethod"
              value={form.contactMethod}
              onChange={handleChange}
              disabled={status === "sending"}
              className="w-full appearance-none rounded-lg border border-white/20 bg-white/5 p-3 pr-10 text-white transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              style={{
                color: form.contactMethod ? "#fff" : "rgba(255,255,255,0.6)",
              }}
            >
              <option value="" className="bg-[#141426]">
                Preferred Contact Method *
              </option>
              <option value="Phone Call" className="bg-[#141426]">
                Phone Call
              </option>
              <option value="WhatsApp" className="bg-[#141426]">
                WhatsApp
              </option>
              <option value="Email" className="bg-[#141426]">
                Email
              </option>
            </select>

            <FaChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-white/60" />
          </div>

          {/* Best Time */}
          <div className="relative">
            <select
              name="bestTime"
              value={form.bestTime}
              onChange={handleChange}
              disabled={status === "sending"}
              className="w-full appearance-none rounded-lg border border-white/20 bg-white/5 p-3 pr-10 text-white transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              style={{
                color: form.bestTime ? "#fff" : "rgba(255,255,255,0.6)",
              }}
            >
              <option value="" className="bg-[#141426]">
                Best Time to Reach You *
              </option>
              {hours.map((h) => (
                <option key={h} value={h} className="bg-[#141426]">
                  {h}
                </option>
              ))}
            </select>

            <FaChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-white/60" />
          </div>

          {/* Message */}
          <textarea
            name="message"
            placeholder="Message (Optional)"
            value={form.message}
            onChange={handleChange}
            disabled={status === "sending"}
            className="rounded-lg border border-white/20 bg-white/5 p-3 text-white transition-all placeholder:text-white/60 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            rows="4"
          />
          <div className="text-right text-sm text-white/40">
            {form.message.length}/1000 characters
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={status === "sending"}
            className="relative flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 px-5 py-3 font-medium text-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            {status === "sending" ? (
              <>
                <svg
                  className="h-5 w-5 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Activating...
              </>
            ) : (
              <>
                Activate Shield
                <FaShieldAlt className="h-5 w-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
