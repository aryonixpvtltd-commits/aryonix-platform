"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock3,
  Download,
  IndianRupee,
  LoaderCircle,
  RotateCcw,
  Sparkles
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { calculateEstimate, estimatorSteps } from "@/lib/estimator";
import type { EstimatorInput } from "@/lib/estimator";
import { cn } from "@/lib/utils";

type Answers = Omit<EstimatorInput, "name" | "businessName" | "email" | "phone">;
type Contact = Pick<EstimatorInput, "name" | "businessName" | "email" | "phone">;

const initialAnswers: Answers = {
  businessType: "",
  websiteType: "",
  pages: "",
  features: [],
  designLevel: "",
  requestedTimeline: "",
  statedBudget: ""
};

const initialContact: Contact = { name: "", businessName: "", email: "", phone: "" };

export function WebsiteEstimator() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [contact, setContact] = useState<Contact>(initialContact);
  const [showConsultation, setShowConsultation] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const currentStep = estimatorSteps[step];
  const result = useMemo(() => calculateEstimate(answers), [answers]);

  function selectOption(value: string) {
    if (currentStep.key === "features") {
      setAnswers((current) => ({
        ...current,
        features: current.features.includes(value)
          ? current.features.filter((feature) => feature !== value)
          : [...current.features, value]
      }));
      return;
    }
    setAnswers((current) => ({ ...current, [currentStep.key]: value }));
  }

  function canContinue() {
    const value = answers[currentStep.key];
    return Array.isArray(value) ? value.length > 0 : Boolean(value);
  }

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const response = await fetch("/api/estimator-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...answers, ...contact })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(data.errors?.join(" ") ?? "Unable to save your estimate.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  }

  async function downloadProposal() {
    const { jsPDF } = await import("jspdf");
    const pdf = new jsPDF();
    pdf.setFillColor(4, 7, 26);
    pdf.rect(0, 0, 210, 297, "F");
    pdf.setTextColor(77, 163, 255);
    pdf.setFontSize(11);
    pdf.text("ARYONIX | DESIGN · DEVELOP · DEPLOY", 18, 20);
    pdf.setTextColor(232, 238, 255);
    pdf.setFontSize(27);
    pdf.text("Website Project Proposal", 18, 39);
    pdf.setFontSize(11);
    pdf.setTextColor(200, 212, 232);
    pdf.text(`Prepared for ${contact.name} · ${contact.businessName}`, 18, 50);
    pdf.setDrawColor(77, 163, 255);
    pdf.line(18, 58, 192, 58);

    const sections = [
      ["Recommended package", result.recommendedPackage],
      ["Estimated investment", result.estimatedPrice],
      ["Estimated timeline", result.estimatedTimeline],
      ["Business / website", `${answers.businessType} · ${answers.websiteType} · ${answers.pages}`],
      ["Features", answers.features.join(", ")],
      ["Technology", result.techStack.join(", ")],
      ["Next steps", "1. Free consultation  2. Scope confirmation  3. Design approval  4. Development and launch"]
    ];
    let y = 74;
    sections.forEach(([label, value]) => {
      pdf.setTextColor(77, 163, 255);
      pdf.setFontSize(10);
      pdf.text(label.toUpperCase(), 18, y);
      pdf.setTextColor(232, 238, 255);
      pdf.setFontSize(13);
      const lines = pdf.splitTextToSize(value, 174);
      pdf.text(lines, 18, y + 8);
      y += 19 + Math.max(0, lines.length - 1) * 6;
    });
    pdf.setTextColor(200, 212, 232);
    pdf.setFontSize(9);
    pdf.text("This estimate is indicative and will be finalized after discovery and scope confirmation.", 18, 278);
    pdf.text("aryonix.in · aryonixpvtltd@gmail.com · +91 9359368382", 18, 286);
    pdf.save(`ARYONIX-Proposal-${contact.businessName.replace(/\s+/g, "-")}.pdf`);
  }

  const finished = step >= estimatorSteps.length;

  return (
    <section className="relative min-h-screen overflow-hidden pt-32">
      <div className="grid-mask absolute inset-0 opacity-35" />
      <div className="container-shell relative pb-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-secondary">AI Website Cost Estimator</p>
            <h1 className="mt-5 text-balance text-4xl font-semibold text-text md:text-7xl">Plan the right website before spending blindly.</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-accent">Get an instant ARYONIX package recommendation, realistic investment range and delivery timeline.</p>
          </div>

          <div className="panel mt-12 overflow-hidden rounded-2xl">
            <div className="border-b border-line p-5">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-text">{finished ? "Your estimate" : `Step ${step + 1} of ${estimatorSteps.length}`}</p>
                <div className="flex gap-1">
                  {estimatorSteps.map((item, index) => (
                    <span key={item.key} className={cn("h-1.5 w-7 rounded-full", index <= step ? "bg-secondary" : "bg-white/10")} />
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 md:p-8">
              {!finished ? (
                <motion.div key={currentStep.key} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }}>
                  <h2 className="text-2xl font-semibold text-text md:text-4xl">{currentStep.title}</h2>
                  <div className={cn("mt-7 grid gap-3", currentStep.key === "features" ? "sm:grid-cols-3" : "sm:grid-cols-2")}>
                    {currentStep.options.map((option) => {
                      const selected = currentStep.key === "features"
                        ? answers.features.includes(option)
                        : answers[currentStep.key] === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => selectOption(option)}
                          className={cn(
                            "flex min-h-14 items-center justify-between rounded-xl border px-4 text-left text-sm font-semibold transition",
                            selected ? "border-secondary bg-primary/20 text-text shadow-glow" : "border-line bg-white/[0.035] text-accent hover:border-secondary/40 hover:text-text"
                          )}
                        >
                          {option}
                          {selected ? <Check size={17} className="text-secondary" /> : null}
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-8 flex justify-between">
                    <button type="button" disabled={step === 0} onClick={() => setStep((current) => current - 1)} className="inline-flex h-11 items-center gap-2 rounded-xl border border-line px-4 text-sm text-accent disabled:opacity-30">
                      <ArrowLeft size={16} /> Back
                    </button>
                    <button type="button" disabled={!canContinue()} onClick={() => setStep((current) => current + 1)} className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-white shadow-glow disabled:opacity-35">
                      Continue <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <ResultCard icon={Sparkles} label="Recommended Package" value={result.recommendedPackage} />
                    <ResultCard icon={IndianRupee} label="Estimated Price" value={result.estimatedPrice} />
                    <ResultCard icon={Clock3} label="Estimated Timeline" value={result.estimatedTimeline} />
                  </div>
                  <div className="mt-5 rounded-2xl border border-line bg-white/[0.035] p-5">
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-secondary">Suggested stack</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {result.techStack.map((technology) => <span key={technology} className="rounded-xl border border-line px-3 py-2 text-xs text-accent">{technology}</span>)}
                    </div>
                    <p className="mt-5 text-sm leading-7 text-accent">Selected features: {answers.features.join(", ")}.</p>
                  </div>

                  {!showConsultation ? (
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <button onClick={() => setShowConsultation(true)} className="h-12 rounded-xl bg-primary text-sm font-semibold text-white shadow-glow">Get Free Consultation</button>
                      <button onClick={() => { setStep(0); setAnswers(initialAnswers); }} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-line text-sm text-accent"><RotateCcw size={15} /> Start Again</button>
                    </div>
                  ) : (
                    <form onSubmit={submitLead} className="mt-6 rounded-2xl border border-secondary/25 bg-secondary/[0.04] p-5">
                      <h3 className="text-xl font-semibold text-text">Generate your ARYONIX proposal.</h3>
                      <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        {(["name", "businessName", "email", "phone"] as const).map((key) => (
                          <label key={key} className="grid gap-2 text-xs font-medium text-accent">
                            {{ name: "Name", businessName: "Business Name", email: "Email", phone: "Phone" }[key]}
                            <input required type={key === "email" ? "email" : key === "phone" ? "tel" : "text"} value={contact[key]} onChange={(event) => setContact((current) => ({ ...current, [key]: event.target.value }))} className="h-11 rounded-xl border border-line bg-[#05091f] px-3 text-sm text-text outline-none focus:border-secondary" />
                          </label>
                        ))}
                      </div>
                      {error ? <p className="mt-3 text-sm text-red-200">{error}</p> : null}
                      {status === "success" ? (
                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                          <button type="button" onClick={downloadProposal} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-white"><Download size={16} /> Download Proposal PDF</button>
                          <a href="/contact" className="inline-flex h-12 items-center justify-center rounded-xl border border-line text-sm font-semibold text-text">Continue to Consultation</a>
                        </div>
                      ) : (
                        <button disabled={status === "loading"} className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-white disabled:opacity-60">
                          {status === "loading" ? <LoaderCircle className="animate-spin" size={16} /> : null}
                          {status === "loading" ? "Saving estimate..." : "Save Estimate & Generate Proposal"}
                        </button>
                      )}
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultCard({ icon: Icon, label, value }: { icon: typeof Sparkles; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-line bg-white/[0.04] p-5">
      <Icon className="text-secondary" size={21} />
      <p className="mt-6 text-xs uppercase tracking-[0.16em] text-accent/60">{label}</p>
      <p className="mt-2 text-xl font-semibold text-text">{value}</p>
    </div>
  );
}
