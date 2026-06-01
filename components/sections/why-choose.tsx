"use client";

import { motion } from "framer-motion";
import { Code2, Gauge, Palette, ShieldCheck, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

const reasons = [
  {
    number: "01",
    title: "Premium Design",
    description: "Modern interfaces that create strong first impressions.",
    stat: "Brand-grade",
    signal: "Visual systems",
    icon: Palette
  },
  {
    number: "02",
    title: "Full Stack Expertise",
    description: "From frontend to backend, we build complete solutions.",
    stat: "End-to-end",
    signal: "Apps + APIs",
    icon: Code2
  },
  {
    number: "03",
    title: "Performance Focused",
    description: "Fast loading, SEO-friendly and optimized for growth.",
    stat: "95+",
    signal: "Lighthouse target",
    icon: Gauge
  },
  {
    number: "04",
    title: "Long-Term Support",
    description: "We don't disappear after deployment.",
    stat: "After launch",
    signal: "Care + iteration",
    icon: ShieldCheck
  }
];

const stats = [
  { value: "4", label: "Core strengths" },
  { value: "15", label: "Real portfolio screens" },
  { value: "24/7", label: "Platform mindset" }
];

export function WhyChoose() {
  return (
    <section className="relative overflow-hidden bg-surface/35 py-28">
      <div className="grid-mask absolute inset-0 opacity-50" />
      <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

      <div className="container-shell">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.55 }}
            className="relative"
          >
            <SectionHeading
              eyebrow="Why Choose Aryonix"
              title="Premium execution for teams that need the website to feel trusted from day one."
              description="ARYONIX combines sharp visual design, full-stack engineering and launch support into one focused technology studio."
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="panel rounded-2xl p-4"
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-secondary">Studio standard</p>
                <p className="mt-1 text-sm text-accent">Design, build, deploy and support.</p>
              </div>
              <span className="grid size-11 place-items-center rounded-xl border border-secondary/30 bg-primary/15 text-secondary shadow-glow">
                <Sparkles size={18} />
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {stats.map((item) => (
                <div key={item.label} className="rounded-xl border border-line bg-white/[0.04] p-4">
                  <div className="text-2xl font-semibold text-text">{item.value}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.16em] text-accent">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;

            return (
              <motion.article
                key={reason.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="panel group relative min-h-[310px] overflow-hidden rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:border-secondary/45 hover:shadow-[0_0_42px_rgba(26,111,255,0.18)]"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/70 to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="absolute -right-16 -top-16 size-44 rounded-full bg-secondary/10 blur-3xl transition duration-500 group-hover:bg-secondary/20" />
                <div className="relative flex items-start justify-between gap-4">
                  <span className="font-mono text-sm text-secondary">{reason.number}</span>
                  <span className="grid size-11 place-items-center rounded-xl border border-secondary/25 bg-primary/10 text-secondary transition duration-300 group-hover:scale-105 group-hover:shadow-glow">
                    <Icon size={21} />
                  </span>
                </div>

                <div className="relative mt-16">
                  <p className="text-xl font-semibold text-text">{reason.title}</p>
                  <p className="mt-3 text-sm leading-6 text-accent">{reason.description}</p>
                </div>

                <div className="relative mt-8 rounded-xl border border-line bg-white/[0.04] p-4">
                  <div className="text-lg font-semibold text-text">{reason.stat}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.16em] text-accent">{reason.signal}</div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
