"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2, Paperclip, Send, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type FormStatus = "idle" | "submitting" | "success" | "error";

const budgetOptions = [
  "Exploring scope",
  "Under Rs. 25,000",
  "Rs. 25,000 - Rs. 75,000",
  "Rs. 75,000 - Rs. 1,50,000",
  "Rs. 1,50,000+"
];

const projectTypes = [
  "Starter Website",
  "Business Website",
  "Premium Custom Website",
  "E-commerce Website",
  "Custom Quote",
  "Portfolio Website",
  "UI/UX Design",
  "Maintenance / Improvements"
];

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const [attachmentLabel, setAttachmentLabel] = useState("Attach reference files");

  async function submitContact(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("submitting");
    setMessage("");

    const formData = new FormData(form);
    const files = formData
      .getAll("attachments")
      .filter((file): file is File => file instanceof File && file.name.length > 0)
      .slice(0, 5);
    const brief = String(formData.get("message") ?? "").trim();
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      company: String(formData.get("company") ?? "").trim(),
      projectType: String(formData.get("projectType") ?? "").trim(),
      budget: String(formData.get("budget") ?? "").trim(),
      timeline: String(formData.get("timeline") ?? "").trim(),
      referenceWebsite: String(formData.get("referenceWebsite") ?? "").trim(),
      fileNames: files.map((file) => `${file.name} (${Math.ceil(file.size / 1024)} KB)`),
      message: brief
    };
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email);
    const validReference = !payload.referenceWebsite || /^https?:\/\/.+\..+/.test(payload.referenceWebsite);

    if (payload.name.length < 2 || !validEmail || !payload.projectType || brief.length < 20 || !validReference) {
      setStatus("error");
      setMessage("Please add your name, a valid email, project type, optional reference URL with https://, and a project brief of at least 20 characters.");
      return;
    }

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        form.reset();
        setAttachmentLabel("Attach reference files");
        setStatus("success");
        setMessage(data.message ?? "Enquiry sent. ARYONIX will respond with the next step.");
        return;
      }

      setStatus("error");
      setMessage(data.errors?.join(" ") ?? "Something went wrong. Please use email or WhatsApp for now.");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again or message ARYONIX directly on WhatsApp.");
    }
  }

  return (
    <form noValidate onSubmit={submitContact} className="panel grid gap-4 rounded-2xl p-5 sm:p-6">
      <AnimatePresence>
        {status === "success" ? (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-[#020614]/82 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-success-title"
          >
            <motion.div
              initial={{ y: 24, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 16, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-md rounded-2xl border border-emerald-300/25 bg-[#061026] p-6 text-center shadow-[0_34px_120px_rgba(0,0,0,0.5)]"
            >
              <button
                type="button"
                onClick={() => {
                  setStatus("idle");
                  setMessage("");
                }}
                className="absolute right-4 top-4 grid size-9 place-items-center rounded-xl border border-line bg-white/[0.04] text-accent hover:text-text"
                aria-label="Close success message"
              >
                <X size={16} />
              </button>
              <span className="mx-auto grid size-14 place-items-center rounded-2xl border border-emerald-300/30 bg-emerald-400/12 text-emerald-200">
                <CheckCircle2 size={28} />
              </span>
              <h2 id="contact-success-title" className="mt-6 text-2xl font-semibold text-text">
                Enquiry received.
              </h2>
              <p className="mt-3 text-sm leading-7 text-accent">
                {message || "ARYONIX will review your brief and respond with the next step."}
              </p>
              <Button
                type="button"
                className="mt-6 w-full"
                onClick={() => {
                  setStatus("idle");
                  setMessage("");
                }}
              >
                Continue
              </Button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-text">
          Name
          <input
            required
            name="name"
            autoComplete="name"
            className="h-12 rounded-xl border border-line bg-white/[0.04] px-4 text-sm text-text outline-none focus:border-secondary"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-text">
          Email
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            className="h-12 rounded-xl border border-line bg-white/[0.04] px-4 text-sm text-text outline-none focus:border-secondary"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-text">
          Company
          <input
            name="company"
            autoComplete="organization"
            className="h-12 rounded-xl border border-line bg-white/[0.04] px-4 text-sm text-text outline-none focus:border-secondary"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-text">
          Project Type
          <select required name="projectType" className="h-12 rounded-xl border border-line bg-[#05091f] px-4 text-sm text-text outline-none focus:border-secondary">
            <option value="">Select project type</option>
            {projectTypes.map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-text">
          Project Budget
          <select name="budget" className="h-12 rounded-xl border border-line bg-[#05091f] px-4 text-sm text-text outline-none focus:border-secondary">
            {budgetOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium text-text">
          Timeline
          <input
            name="timeline"
            placeholder="Example: 2-4 weeks"
            className="h-12 rounded-xl border border-line bg-white/[0.04] px-4 text-sm text-text outline-none placeholder:text-accent/60 focus:border-secondary"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-text">
          Reference Website
          <input
            name="referenceWebsite"
            type="url"
            inputMode="url"
            placeholder="https://example.com"
            className="h-12 rounded-xl border border-line bg-white/[0.04] px-4 text-sm text-text outline-none placeholder:text-accent/60 focus:border-secondary"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-text">
          File Upload
          <span className="flex h-12 items-center gap-3 rounded-xl border border-dashed border-secondary/35 bg-white/[0.04] px-4 text-sm text-accent transition focus-within:border-secondary">
            <Paperclip className="shrink-0 text-secondary" size={17} />
            <span className="min-w-0 truncate">{attachmentLabel}</span>
            <input
              name="attachments"
              type="file"
              multiple
              className="sr-only"
              accept=".png,.jpg,.jpeg,.webp,.pdf,.doc,.docx"
              onChange={(event) => {
                const count = event.currentTarget.files?.length ?? 0;
                setAttachmentLabel(count ? `${count} file${count > 1 ? "s" : ""} selected` : "Attach reference files");
              }}
            />
          </span>
        </label>
      </div>

      <label className="grid gap-2 text-sm font-medium text-text">
        Project Brief
        <textarea
          required
          name="message"
          rows={6}
          minLength={20}
          placeholder="Tell us what you want to build, who it is for, must-have features, and what a successful launch should achieve."
          className="rounded-xl border border-line bg-white/[0.04] p-4 text-sm text-text outline-none placeholder:text-accent/60 focus:border-secondary"
        />
      </label>

      {message && status === "error" ? (
        <div
          role="status"
          aria-live="polite"
          className="flex gap-3 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-100"
        >
          <AlertCircle className="mt-0.5 shrink-0" size={17} />
          <span>{message}</span>
        </div>
      ) : null}

      <Button type="submit" disabled={status === "submitting"} className="mt-2 h-12">
        {status === "submitting" ? (
          <>
            <Loader2 className="mr-2 animate-spin" size={16} />
            Sending Enquiry...
          </>
        ) : (
          <>
            Send Enquiry
            <Send className="ml-2" size={16} />
          </>
        )}
      </Button>
    </form>
  );
}
