"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Globe2, Loader2, SearchCheck, Sparkles } from "lucide-react";
import { analyzeWebsite, type AnalyzerResult } from "@/lib/analyzer";

type FormState = {
  name: string;
  email: string;
  phone: string;
  websiteUrl: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  websiteUrl: ""
};

export function WebsiteAnalyzer() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [result, setResult] = useState<AnalyzerResult | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function update(key: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
    if (key === "websiteUrl") {
      setResult(value ? analyzeWebsite(value) : null);
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/analyzer-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus("error");
        setMessage(data.errors?.join(" ") ?? "Could not save analyzer lead.");
        return;
      }

      setResult({
        designScore: data.lead.designScore,
        mobileScore: data.lead.mobileScore,
        seoScore: data.lead.seoScore,
        speedScore: data.lead.speedScore,
        suggestions: data.lead.suggestions
      });
      setStatus("success");
      setMessage("Website report saved. ARYONIX can now review the opportunity and follow up.");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again or contact ARYONIX on WhatsApp.");
    }
  }

  return (
    <section className="relative min-h-screen overflow-hidden pt-32">
      <div className="grid-mask absolute inset-0 opacity-45" />
      <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
      <div className="container-shell relative pb-24">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/[0.08] px-4 py-2 text-sm font-semibold text-secondary">
              <SearchCheck size={16} /> Free Website Analyzer
            </div>
            <h1 className="mt-6 text-balance text-5xl font-semibold leading-[0.94] tracking-[-0.03em] text-text md:text-7xl">
              Find what is slowing your website growth.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-accent">
              Enter a website URL and get a premium demo audit with design, mobile, SEO and speed opportunities. The report is saved for the ARYONIX admin team.
            </p>
          </div>

          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="panel rounded-[28px] p-5 md:p-7"
          >
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ["name", "Name"],
                ["email", "Email"],
                ["phone", "Phone"],
                ["websiteUrl", "Website URL"]
              ].map(([key, label]) => (
                <label key={key} className="grid gap-2 text-sm font-medium text-text">
                  {label}
                  <input
                    value={form[key as keyof FormState]}
                    onChange={(event) => update(key as keyof FormState, event.target.value)}
                    type={key === "email" ? "email" : key === "websiteUrl" ? "url" : "text"}
                    required={key !== "phone"}
                    placeholder={key === "websiteUrl" ? "https://example.com" : ""}
                    className="h-12 rounded-xl border border-line bg-white/[0.04] px-4 text-sm outline-none focus:border-secondary"
                  />
                </label>
              ))}
            </div>

            <button type="submit" disabled={status === "loading"} className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-white shadow-glow transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-70">
              {status === "loading" ? <Loader2 className="mr-2 animate-spin" size={16} /> : <Sparkles className="mr-2" size={16} />}
              {status === "loading" ? "Analyzing..." : "Analyze Website"}
            </button>

            {message ? (
              <p className={`mt-4 rounded-xl border px-4 py-3 text-sm leading-6 ${status === "error" ? "border-red-400/30 bg-red-500/10 text-red-100" : "border-emerald-400/30 bg-emerald-500/10 text-emerald-100"}`}>
                {message}
              </p>
            ) : null}
          </motion.form>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[0.65fr_0.35fr]">
          <div className="panel rounded-[28px] p-5 md:p-7">
            <div className="flex items-center gap-3">
              <Globe2 className="text-secondary" />
              <h2 className="text-2xl font-semibold text-text">Demo analysis report</h2>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <Score label="Design" value={result?.designScore ?? 78} />
              <Score label="Mobile" value={result?.mobileScore ?? 82} />
              <Score label="SEO" value={result?.seoScore ?? 74} />
              <Score label="Speed" value={result?.speedScore ?? 79} />
            </div>
            <div className="mt-6 grid gap-3">
              {(result?.suggestions ?? [
                "Improve above-the-fold clarity with a stronger headline, proof point and CTA.",
                "Compress large images and make sure key sections lazy load on mobile.",
                "Add service schema, better metadata and internal links for SEO authority."
              ]).map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-line bg-white/[0.035] p-4 text-sm leading-6 text-accent">
                  <CheckCircle2 className="mt-1 shrink-0 text-secondary" size={17} />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="panel rounded-[28px] p-5 md:p-7">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-secondary">Next Step</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-text">Let ARYONIX improve this website.</h2>
            <p className="mt-4 text-sm leading-7 text-accent">
              We turn audit gaps into better UX, faster pages, SEO-ready architecture and stronger lead capture.
            </p>
            <a href="/contact" className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-white shadow-glow transition hover:bg-secondary">
              Book Improvement Call <ArrowRight className="ml-2" size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Score({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-line bg-white/[0.04] p-5">
      <p className="text-xs uppercase tracking-[0.18em] text-accent">{label}</p>
      <p className="mt-4 text-4xl font-semibold text-text">{value}</p>
      <div className="mt-4 h-2 rounded-full bg-white/[0.08]">
        <div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
