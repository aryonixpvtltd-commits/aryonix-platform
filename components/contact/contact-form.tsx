"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  async function submitContact(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("submitting");
    setMessage("");

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      company: String(formData.get("company") ?? ""),
      budget: String(formData.get("budget") ?? ""),
      message: String(formData.get("message") ?? "")
    };

    const response = await fetch("/api/enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json().catch(() => ({}));

    if (response.ok) {
      form.reset();
      setStatus("success");
      setMessage(data.message ?? "Enquiry sent. Aryonix will respond with the next step.");
      return;
    }

    setStatus("error");
    setMessage(data.errors?.join(" ") ?? "Something went wrong. Please use email or WhatsApp for now.");
  }

  return (
    <form onSubmit={submitContact} className="panel grid gap-4 rounded-2xl p-5 sm:p-6">
      {["Name", "Email", "Company", "Project Budget"].map((label) => (
        <label key={label} className="grid gap-2 text-sm font-medium text-text">
          {label}
          <input
            required={label === "Name" || label === "Email"}
            type={label === "Email" ? "email" : "text"}
            name={label === "Project Budget" ? "budget" : label.toLowerCase()}
            className="h-12 rounded-xl border border-line bg-white/[0.04] px-4 text-sm text-text outline-none focus:border-secondary"
          />
        </label>
      ))}
      <label className="grid gap-2 text-sm font-medium text-text">
        Project Brief
        <textarea
          required
          name="message"
          rows={6}
          minLength={20}
          placeholder="Tell us what you want to build, your timeline, goals and any must-have features."
          className="rounded-xl border border-line bg-white/[0.04] p-4 text-sm text-text outline-none focus:border-secondary"
        />
      </label>
      {message ? (
        <p
          className={`rounded-xl border px-4 py-3 text-sm ${
            status === "success"
              ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-100"
              : "border-red-400/30 bg-red-400/10 text-red-100"
          }`}
        >
          {message}
        </p>
      ) : null}
      <Button type="submit" disabled={status === "submitting"} className="mt-2">
        {status === "submitting" ? "Sending..." : "Send Enquiry"}
        <Send className="ml-2" size={16} />
      </Button>
    </form>
  );
}
