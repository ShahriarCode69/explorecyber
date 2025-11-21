"use client";

import { useState } from "react";
import { FaShieldAlt } from "react-icons/fa";
import Button from "./button";
import toast, { Toaster } from "react-hot-toast";

export default function CyberSecurityForm() {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    company: "",
    country: "",
    service: "",
    contactMethod: "",
    bestTime: "",
    message: "",
  });

  const [status, setStatus] = useState(null);

  // Replace with YOUR Apps Script Web App URL:
  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwVW6FqdamShT9FDKblD8oftaFP3fLoeP_Er_39yVyU7RG1NlEwKNVhVZqlodE0b8fQ6Q/exec";

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
      // Add origin for CSRF protection
      const dataToSend = {
        ...form,
        origin: window.location.origin,
        timestamp: new Date().toISOString(),
      };

      const response = await fetch(SCRIPT_URL, {
        redirect: "follow",
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(dataToSend),
      });

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
          company: "",
          country: "",
          service: "",
          contactMethod: "",
          bestTime: "",
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

  // Generate 24-hour times
  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0");
    return `${hour}:00`;
  });

  return (
    <div className="">
      {/* Toast Container */}
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
        <div onSubmit={handleSubmit} className="flex flex-col gap-2">
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

          {/* Company */}
          <input
            type="text"
            name="company"
            placeholder="Company / Organization Name *"
            value={form.company}
            onChange={handleChange}
            required
            disabled={status === "sending"}
            className="rounded-lg border border-white/20 bg-white/5 p-3 text-white transition-all placeholder:text-white/60 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:outline-none disabled:opacity-50"
          />

          {/* Country / Timezone */}
          <select
            name="country"
            value={form.country}
            onChange={handleChange}
            required
            disabled={status === "sending"}
            className="rounded-lg border border-white/20 bg-white/5 p-3 text-white transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:outline-none disabled:opacity-50"
            style={{ color: form.country ? "#fff" : "rgba(255,255,255,0.6)" }}
          >
            <option value="" className="bg-gradientLight outline-none">
              Country / Time Zone *
            </option>
            <option value="USA (EST)" className="bg-gradientLight">
              USA (EST)
            </option>
            <option value="USA (PST)" className="bg-gradientLight">
              USA (PST)
            </option>
            <option value="UK (GMT)" className="bg-gradientLight">
              UK (GMT)
            </option>
            <option value="Europe (CET)" className="bg-gradientLight">
              Europe (CET)
            </option>
            <option value="Australia (AEST)" className="bg-gradientLight">
              Australia (AEST)
            </option>
            <option value="Canada (EST)" className="bg-gradientLight">
              Canada (EST)
            </option>
            <option value="UAE (GST)" className="bg-gradientLight">
              UAE (GST)
            </option>
            <option value="Asia (GMT+6)" className="bg-gradientLight">
              Asia (GMT+6)
            </option>
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
            <option value="" className="bg-gradientLight">
              Service of Interest *
            </option>
            <option value="Penetration Testing" className="bg-gradientLight">
              Penetration Testing
            </option>
            <option value="Security Audit" className="bg-gradientLight">
              Security Audit
            </option>
            <option value="Vulnerability Assessment" className="bg-gradientLight">
              Vulnerability Assessment
            </option>
            <option value="SOC Monitoring" className="bg-gradientLight">
              SOC Monitoring
            </option>
            <option value="Malware Protection Setup" className="bg-gradientLight">
              Malware Protection Setup
            </option>
            <option value="Full Cyber Security Package" className="bg-gradientLight">
              Full Cyber Security Package
            </option>
          </select>

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
            <option value="" className="bg-gradientLight">
              Preferred Contact Method *
            </option>
            <option value="Phone Call" className="bg-gradientLight">
              Phone Call
            </option>
            <option value="WhatsApp" className="bg-gradientLight">
              WhatsApp
            </option>
            <option value="Email" className="bg-gradientLight">
              Email
            </option>
            <option value="Telegram" className="bg-gradientLight">
              Telegram
            </option>
          </select>

          {/* Best Time to Reach */}
          <select
            name="bestTime"
            value={form.bestTime}
            onChange={handleChange}
            required
            disabled={status === "sending"}
            className="rounded-lg border border-white/20 bg-white/5 p-3 text-white transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:outline-none disabled:opacity-50"
            style={{ color: form.bestTime ? "#fff" : "rgba(255,255,255,0.6)" }}
          >
            <option value="" className="bg-gradientLight">
              Best Time to Reach You *
            </option>
            {hours.map((h) => (
              <option key={h} value={h} className="bg-gradientLight">
                {h}
              </option>
            ))}
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
          <Button
            onClick={handleSubmit}
            disabled={status === "sending"}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r py-3 font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === "sending" ? "Activating..." : "Activate Shield"}
            <FaShieldAlt className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
