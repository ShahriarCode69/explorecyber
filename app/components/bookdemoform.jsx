"use client";

import { useState } from "react";
import { getNames } from "country-list";
import { FaShieldAlt, FaChevronDown } from "react-icons/fa";
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

  const SCRIPT_URL = process.env.NEXT_PUBLIC_BOOK_DEMO_FORM_SCRIPT;

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
    setForm((p) => ({ ...p, [name]: value }));
  };

  const validateForm = () => {
    if (!form.fullName.trim())
      return (toast.error("Please enter your full name"), false);
    if (form.fullName.trim().length < 2)
      return (toast.error("Name must be at least 2 characters"), false);
    if (!form.phone.trim())
      return (toast.error("Please enter your phone number"), false);

    const phoneDigits = form.phone.replace(/\D/g, "");
    if (phoneDigits.length < 7)
      return (toast.error("Phone must have at least 7 digits"), false);
    if (phoneDigits.length > 15)
      return (toast.error("Phone is too long"), false);

    if (!form.email.trim()) return (toast.error("Please enter email"), false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email))
      return (toast.error("Enter a valid email"), false);

    if (!form.company.trim()) return (toast.error("Enter your company"), false);
    if (!form.country) return (toast.error("Select your country"), false);
    if (!form.service) return (toast.error("Select a service"), false);
    if (!form.demoDate) return (toast.error("Select a demo date"), false);
    if (!form.demoTime) return (toast.error("Select a demo time"), false);
    if (!form.contactMethod)
      return (toast.error("Select contact method"), false);

    if (form.message && form.message.length > 1000) {
      return (
        toast.error(`Message too long (${form.message.length}/1000)`),
        false
      );
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("sending");
    const loadingToast = toast.loading("Submitting your request...");

    try {
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error(`HTTP error ${response.status}`);

      const data = await response.json();
      toast.dismiss(loadingToast);

      if (data.status === "success") {
        toast.success("🎉 Your request has been submitted successfully!");
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
        setTimeout(() => setStatus(null), 3000);
      } else throw new Error(data.message);
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error(err.message || "Something went wrong");
      setTimeout(() => setStatus(null), 3000);
    }
  };

  const countries = getNames().sort((a, b) => a.localeCompare(b));

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

  const today = new Date().toISOString().split("T")[0];

  return (
    <div>
      <Toaster position="bottom-center" />

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
              className="w-full rounded-lg border border-white/20 bg-white/5 p-3 text-white"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone / WhatsApp *"
              value={form.phone}
              onChange={handleChange}
              disabled={status === "sending"}
              className="w-full rounded-lg border border-white/20 bg-white/5 p-3 text-white"
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
              className="basis-[50%] rounded-lg border border-white/20 bg-white/5 p-3 text-white"
            />

            <input
              type="text"
              name="company"
              placeholder="Company Name *"
              value={form.company}
              onChange={handleChange}
              disabled={status === "sending"}
              className="basis-[50%] rounded-lg border border-white/20 bg-white/5 p-3 text-white"
            />
          </div>

          {/* Country Dropdown */}
          <div className="relative">
            <select
              name="country"
              value={form.country}
              onChange={handleChange}
              disabled={status === "sending"}
              className="w-full appearance-none rounded-lg border border-white/20 bg-white/5 p-3 pr-10 text-white"
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
            <FaChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-white/60" />
          </div>

          {/* Service Dropdown */}
          <div className="relative">
            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              disabled={status === "sending"}
              className="w-full appearance-none rounded-lg border border-white/20 bg-white/5 p-3 pr-10 text-white"
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
            <FaChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-white/60" />
          </div>

          {/* Demo Date + Time */}
          <div className="flex flex-col gap-2 sm:flex-row">
            {/* Date */}
            <input
              type="date"
              name="demoDate"
              value={form.demoDate}
              onChange={handleChange}
              min={today}
              disabled={status === "sending"}
              className="w-full rounded-lg border border-white/20 bg-white/5 p-3 text-white sm:basis-[50%]"
              style={{ colorScheme: "dark" }}
            />

            {/* Time Dropdown */}
            <div className="relative w-full sm:basis-[50%]">
              <select
                name="demoTime"
                value={form.demoTime}
                onChange={handleChange}
                disabled={status === "sending"}
                className="w-full appearance-none rounded-lg border border-white/20 bg-white/5 p-3 pr-10 text-white"
              >
                <option value="" className="bg-[#1a1a2e]">
                  Select Time *
                </option>
                {timeSlots.map((t) => (
                  <option key={t} value={t} className="bg-[#1a1a2e]">
                    {t}
                  </option>
                ))}
              </select>
              <FaChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-white/60" />
            </div>
          </div>

          {/* Contact Method Dropdown */}
          <div className="relative">
            <select
              name="contactMethod"
              value={form.contactMethod}
              onChange={handleChange}
              disabled={status === "sending"}
              className="w-full appearance-none rounded-lg border border-white/20 bg-white/5 p-3 pr-10 text-white"
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
            <FaChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-white/60" />
          </div>

          {/* Message */}
          <textarea
            name="message"
            placeholder="Message (Optional)"
            value={form.message}
            onChange={handleChange}
            disabled={status === "sending"}
            className="rounded-lg border border-white/20 bg-white/5 p-3 text-white"
            rows="4"
          />

          <div className="text-right text-sm text-white/40">
            {form.message.length}/1000 characters
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={status === "sending"}
            className="from-accent to-primary relative flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-gradient-to-br via-[#941891] px-5 py-3 font-medium text-white transition-all hover:-translate-y-1"
          >
            {status === "sending" ? "Activating..." : "Activate Shield"}
            <FaShieldAlt className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
