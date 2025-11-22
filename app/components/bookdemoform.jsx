"use client";

import { useState } from "react";
import { getNames } from "country-list";
import { FaShieldAlt } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import Button from "./button";

export default function BookDemoForm() {


  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    company: "",
    country: "",
    service: "",
    demoDate: "",
    demoTime: "",
    contactMethod: "",
    message: "",
  });

  const [status, setStatus] = useState(null);

  // Replace with YOUR Apps Script Web App URL:
  const SCRIPT_URL = process.env.NEXT_PUBLIC_BOOK_DEMO_FORM_SCRIPT;

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Real-time validation for phone field
    if (name === "phone") {
      // Only allow numbers, spaces, +, -, (, )
      const phoneRegex = /^[\d\s\+\-\(\)]*$/;
      if (!phoneRegex.test(value)) {
        toast.error(
          "Phone number can only contain numbers and symbols (+, -, (, ))",
        );
        return;
      }
    }

    setForm((p) => ({ ...p, [name]: value }));
  };

  // Comprehensive validation
  const validateForm = () => {
    // Check required fields
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

    // Phone validation - must contain at least some digits
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
      toast.error("Please select your country");
      return false;
    }

    if (!form.service) {
      toast.error("Please select a service of interest");
      return false;
    }

    if (!form.demoDate) {
      toast.error("Please select a demo date");
      return false;
    }

    if (!form.demoTime) {
      toast.error("Please select a demo time");
      return false;
    }

    if (!form.contactMethod) {
      toast.error("Please select your preferred contact method");
      return false;
    }

    // Message length validation (if provided)
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

    // Client-side validation
    if (!validateForm()) {
      return;
    }

    setStatus("sending");

    // Show loading toast
    const loadingToast = toast.loading("Submitting your request...");

    try {
      // Send only form data, no extra fields
      console.log("Sending data:", form);

      const response = await fetch(SCRIPT_URL, {
        redirect: "follow",
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(form),
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      if (data.status === "success") {
        setStatus("success");

        // Show success toast
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
          demoDate: "",
          demoTime: "",
          contactMethod: "",
          message: "",
        });

        // Reset status after delay
        setTimeout(() => setStatus(null), 3000);
      } else {
        throw new Error(data.message || "Submission failed");
      }
    } catch (err) {
      console.error("Error submitting form:", err);

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      setStatus("error");

      // Show specific error toast
      if (
        err.message.includes("Failed to fetch") ||
        err.message.includes("NetworkError")
      ) {
        toast.error(
          "❌ Network error. Please check your internet connection and try again.",
          {
            duration: 6000,
          },
        );
      } else if (err.message.includes("HTTP error")) {
        toast.error("❌ Server error. Please try again later.", {
          duration: 6000,
        });
      } else {
        toast.error(
          `❌ ${err.message || "Something went wrong. Please try again."}`,
          {
            duration: 6000,
          },
        );
      }

      // Reset error status after delay
      setTimeout(() => setStatus(null), 3000);
    }
  };

  const countries = getNames().sort((a, b) => a.localeCompare(b));

  // Generate 24-hour times in 30-minute intervals
  const timeSlots = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      const period = hour >= 12 ? "PM" : "AM";
      const minuteStr = minute.toString().padStart(2, "0");
      timeSlots.push(
        `${hour12.toString().padStart(2, "0")}:${minuteStr} ${period}`,
      );
    }
  }

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split("T")[0];

  return (
    <div>
      {/* Toast Container */}
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#141426",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)",
          },
          success: {
            iconTheme: {
              primary: "#10B981",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#EF4444",
              secondary: "#fff",
            },
          },
        }}
      />

      <div className="mx-auto w-full max-w-xl">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name *"
              value={form.fullName}
              onChange={handleChange}
              required
              disabled={status === "sending"}
              className="w-full rounded-lg border border-white/20 bg-white/5 p-3 text-white transition-all placeholder:text-white/60 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:outline-none disabled:opacity-50"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone / WhatsApp *"
              value={form.phone}
              onChange={handleChange}
              required
              disabled={status === "sending"}
              className="w-full rounded-lg border border-white/20 bg-white/5 p-3 text-white transition-all placeholder:text-white/60 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:outline-none disabled:opacity-50"
            />
          </div>

          <div className="flex w-full flex-col gap-2 sm:flex-row">
            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={form.email}
              onChange={handleChange}
              required
              disabled={status === "sending"}
              className="basis-[50%] rounded-lg border border-white/20 bg-white/5 p-3 text-white transition-all placeholder:text-white/60 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:outline-none disabled:opacity-50"
            />
            <input
              type="text"
              name="company"
              placeholder="Company Name *"
              value={form.company}
              onChange={handleChange}
              required
              disabled={status === "sending"}
              className="basis-[50%] rounded-lg border border-white/20 bg-white/5 p-3 text-white transition-all placeholder:text-white/60 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:outline-none disabled:opacity-50"
            />
          </div>

          {/* Country */}
          <select
            name="country"
            value={form.country}
            onChange={handleChange}
            required
            disabled={status === "sending"}
            className="rounded-lg border border-white/20 bg-white/5 p-3 text-white transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:outline-none disabled:opacity-50"
            style={{ color: form.country ? "#fff" : "rgba(255,255,255,0.6)" }}
          >
            <option value="" className="bg-[#1a1a2e]">
              Select Your Country *
            </option>

            {countries.map((country) => (
              <option key={country} value={country} className="bg-[#1a1a2e]">
                {country}
              </option>
            ))}
          </select>

          {/* Service of Interest */}
          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            required
            disabled={status === "sending"}
            className="rounded-lg border border-white/20 bg-white/5 p-3 text-white transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:outline-none disabled:opacity-50"
            style={{ color: form.service ? "#fff" : "rgba(255,255,255,0.6)" }}
          >
            <option value="" className="bg-[#1a1a2e]">
              Service of Interest *
            </option>
            <option value="Penetration Testing" className="bg-[#1a1a2e]">
              Penetration Testing
            </option>
            <option value="Web Security" className="bg-[#1a1a2e]">
              Web Security
            </option>
            <option value="App Security" className="bg-[#1a1a2e]">
              App Security
            </option>
            <option value="Cloud Security" className="bg-[#1a1a2e]">
              Cloud Security
            </option>
            <option value="Network Security" className="bg-[#1a1a2e]">
              Network Security
            </option>
            <option value="SOC Monitoring" className="bg-[#1a1a2e]">
              SOC Monitoring
            </option>
            <option value="Compliance Management" className="bg-[#1a1a2e]">
              Compliance Management
            </option>
            <option value="Incident Response" className="bg-[#1a1a2e]">
              Incident Response
            </option>
          </select>

          {/* Demo Date and Time */}
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="w-full sm:basis-[50%]">
              <input
                type="date"
                name="demoDate"
                value={form.demoDate}
                onChange={handleChange}
                min={today}
                required
                disabled={status === "sending"}
                className="w-full rounded-lg border border-white/20 bg-white/5 p-3 text-white transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:outline-none disabled:opacity-50"
                style={{ colorScheme: "dark" }}
              />
            </div>

            <select
              name="demoTime"
              value={form.demoTime}
              onChange={handleChange}
              required
              disabled={status === "sending"}
              className="w-full rounded-lg border border-white/20 bg-white/5 p-3 text-white transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:outline-none disabled:opacity-50 sm:basis-[50%]"
              style={{
                color: form.demoTime ? "#fff" : "rgba(255,255,255,0.6)",
              }}
            >
              <option value="" className="bg-[#1a1a2e]">
                Select Time *
              </option>
              {timeSlots.map((time) => (
                <option key={time} value={time} className="bg-[#1a1a2e]">
                  {time}
                </option>
              ))}
            </select>
          </div>

          {/* Preferred Contact Method */}
          <select
            name="contactMethod"
            value={form.contactMethod}
            onChange={handleChange}
            required
            disabled={status === "sending"}
            className="rounded-lg border border-white/20 bg-white/5 p-3 text-white transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:outline-none disabled:opacity-50"
            style={{
              color: form.contactMethod ? "#fff" : "rgba(255,255,255,0.6)",
            }}
          >
            <option value="" className="bg-[#1a1a2e]">
              Preferred Contact Method *
            </option>
            <option value="Phone Call" className="bg-[#1a1a2e]">
              Phone Call
            </option>
            <option value="WhatsApp" className="bg-[#1a1a2e]">
              WhatsApp
            </option>
            <option value="Email" className="bg-[#1a1a2e]">
              Email
            </option>
          </select>

          {/* Message (optional) */}
          <textarea
            name="message"
            placeholder="Message (Optional)"
            value={form.message}
            onChange={handleChange}
            disabled={status === "sending"}
            className="rounded-lg border border-white/20 bg-white/5 p-3 text-white transition-all placeholder:text-white/60 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:outline-none disabled:opacity-50"
            rows="4"
          />
          <div className="text-right text-sm text-white/40">
            {form.message.length}/1000 characters
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={status === "sending"}
            className="flex-center from-accent to-primary before:border-light/25 relative h-fit w-full cursor-pointer gap-2 rounded-lg bg-gradient-to-br via-[#941891] px-5 py-3 font-medium text-white transition-all transition-transform duration-200 before:absolute before:inset-0 before:rounded-lg before:border-3 before:transition-all before:duration-200 before:content-[''] hover:-translate-y-1"
          >
            {status === "sending" ? "Activating..." : "Activate Shield"}
            <FaShieldAlt className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
