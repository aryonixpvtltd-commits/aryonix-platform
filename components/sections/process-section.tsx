"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { process } from "@/lib/content";

export function ProcessSection() {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="absolute left-1/2 top-24 h-80 w-80 -translate-x-1/2 rounded-full bg-secondary/10 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="container-shell">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.55 }}
          >
            <SectionHeading
              eyebrow="Process"
              title="Design • Develop • Deploy with a premium production rhythm."
              description="A clear workflow visualization for turning an idea into a polished, launched product without vague handoffs."
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="panel relative overflow-hidden rounded-2xl p-5"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/60 to-transparent" />
            <div className="flex items-center justify-between gap-4">
              {process.map((step, index) => (
                <div key={step.label} className="flex flex-1 items-center gap-3">
                  <div className="grid size-11 shrink-0 place-items-center rounded-xl border border-secondary/25 bg-primary/10 text-secondary shadow-[0_0_20px_rgba(26,111,255,0.12)]">
                    <step.icon size={19} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">Step {index + 1}</p>
                    <p className="truncate text-sm font-semibold text-text">{step.label}</p>
                  </div>
                  {index < process.length - 1 ? (
                    <ArrowRight className="hidden shrink-0 text-secondary/70 sm:block" size={18} />
                  ) : null}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="relative mt-14">
          <div className="absolute bottom-0 left-6 top-0 w-px bg-gradient-to-b from-transparent via-secondary/35 to-transparent lg:hidden" />
          <div className="absolute left-[12%] right-[12%] top-16 hidden h-px bg-white/10 lg:block" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute left-[12%] right-[12%] top-16 hidden h-px origin-left bg-gradient-to-r from-primary via-secondary to-primary shadow-[0_0_28px_rgba(77,163,255,0.55)] lg:block"
          />
          <div className="grid gap-5 lg:grid-cols-3">
          {process.map((step, index) => (
            <motion.article
              key={step.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="panel group relative min-h-[390px] overflow-hidden rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:border-secondary/45 hover:shadow-[0_0_42px_rgba(26,111,255,0.18)]"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/70 to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="absolute -right-16 -top-16 size-48 rounded-full bg-secondary/10 blur-3xl transition duration-500 group-hover:bg-secondary/20" />
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-primary/[0.08] to-transparent opacity-0 transition group-hover:opacity-100" />

              <div className="relative mb-12 flex items-center justify-between">
                <div className="grid size-12 place-items-center rounded-full border border-secondary/30 bg-background/70 font-mono text-sm text-secondary shadow-[0_0_24px_rgba(77,163,255,0.2)] backdrop-blur-md">
                  0{index + 1}
                </div>
                <motion.div
                  animate={{ y: [0, -5, 0], rotate: [0, 2, 0] }}
                  transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                  className="grid size-14 place-items-center rounded-2xl border border-secondary/25 bg-primary/10 text-secondary shadow-glow"
                >
                  <step.icon size={22} />
                </motion.div>
              </div>

              <div className="relative">
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-secondary">Step {index + 1}</p>
                <h3 className="mt-3 text-4xl font-semibold text-text">{step.label}</h3>
                <p className="mt-4 text-lg font-medium text-text/85">{step.title}</p>
                <p className="mt-3 text-sm leading-6 text-accent">{step.detail}</p>
              </div>

              <div className="relative mt-8 grid gap-2">
                {step.outputs.map((output) => (
                  <div
                    key={output}
                    className="flex items-center gap-3 rounded-xl border border-line bg-white/[0.035] px-3 py-2 text-sm text-accent transition group-hover:border-secondary/25 group-hover:bg-secondary/[0.055]"
                  >
                    <CheckCircle2 className="shrink-0 text-secondary" size={15} />
                    {output}
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
