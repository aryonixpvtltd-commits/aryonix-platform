"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Code2, Layers3, Play, Rocket, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 26 }).map((_, index) => (
        <motion.span
          key={index}
          className="absolute size-1 rounded-full bg-secondary/70"
          style={{
            left: `${(index * 37) % 100}%`,
            top: `${(index * 23) % 100}%`
          }}
          animate={{
            y: [0, -18, 0],
            opacity: [0.15, 0.8, 0.15]
          }}
          transition={{
            duration: 4 + (index % 5),
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.12
          }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  return (
    <section className="relative min-h-[92vh] overflow-hidden pt-32 sm:pt-36">
      <div className="grid-mask absolute inset-0" />
      <Particles />
      <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/25 blur-3xl" />
      <div className="container-shell relative grid items-center gap-12 pb-20 pt-12 lg:grid-cols-[0.92fr_1.08fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-[680px] lg:max-w-[610px]"
        >
          <div className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-line bg-white/[0.05] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-secondary sm:text-xs sm:tracking-[0.22em]">
            Design • Develop • Deploy
          </div>
          <h1 className="max-w-[12.2ch] text-4xl font-semibold leading-[1.03] text-text sm:text-5xl md:max-w-[13.2ch] md:text-7xl lg:max-w-[13.6ch]">
            We Engineer Digital Experiences That Move Businesses Forward.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-accent">
            ARYONIX designs, develops and deploys premium websites, SaaS
            platforms and digital products built for growth.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact">
              Start Project <ArrowRight className="ml-2" size={17} />
            </Button>
            <Button href="/portfolio" variant="secondary">
              <Play className="mr-2" size={16} /> View Portfolio
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              "Fast Delivery",
              "Mobile First",
              "SEO Optimized",
              "Modern Tech Stack"
            ].map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.045] px-3 py-2 text-xs font-medium text-accent backdrop-blur-md"
              >
                <Check className="text-secondary" size={14} />
                {item}
              </span>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotateX: 8 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
          className="relative"
          onMouseMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;
            setParallax({ x, y });
          }}
          onMouseLeave={() => setParallax({ x: 0, y: 0 })}
        >
          <div className="absolute inset-8 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute -right-8 top-10 size-44 rounded-full bg-secondary/20 blur-3xl" />
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotateX: 4 - parallax.y * 8,
              rotateY: -7 + parallax.x * 10
            }}
            transition={{
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              rotateX: { duration: 0.25 },
              rotateY: { duration: 0.25 }
            }}
            style={{ transformStyle: "preserve-3d" }}
            className="panel relative overflow-hidden rounded-2xl p-3 shadow-[0_30px_120px_rgba(0,0,0,0.42)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(77,163,255,.22),transparent_32%),linear-gradient(135deg,rgba(255,255,255,.08),transparent_42%)]" />
            <div className="relative min-h-[520px] overflow-hidden rounded-xl border border-line bg-[#020614] p-4 sm:p-5">
              <div className="grid-mask absolute inset-0 opacity-55" />
              <motion.div
                className="absolute left-1/2 top-24 h-52 w-52 -translate-x-1/2 rounded-full bg-primary/25 blur-3xl"
                style={{
                  x: parallax.x * 24,
                  y: parallax.y * 20
                }}
              />
              <div className="relative mb-5 flex items-center justify-between rounded-xl border border-line bg-white/[0.045] px-4 py-3 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-red-400/80" />
                  <span className="size-2.5 rounded-full bg-yellow-300/80" />
                  <span className="size-2.5 rounded-full bg-green-400/80" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                  aryonix.studio/live
                </span>
              </div>

              <div className="relative grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                <motion.div
                  style={{
                    x: parallax.x * -10,
                    y: parallax.y * -8
                  }}
                  className="rounded-2xl border border-secondary/25 bg-background/55 p-5 backdrop-blur-xl"
                >
                  <div className="mb-8 flex items-center justify-between">
                    <div className="grid size-14 place-items-center rounded-xl border border-secondary/35 bg-primary/15 text-secondary shadow-glow">
                      <Layers3 size={26} />
                    </div>
                    <span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-100">
                      Live Build
                    </span>
                  </div>
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-secondary">
                    Product System
                  </p>
                  <h3 className="mt-3 text-3xl font-semibold leading-tight text-text">
                    Design, code and launch telemetry in one command center.
                  </h3>
                  <div className="mt-6 grid gap-3">
                    {[
                      ["UX System", "94%"],
                      ["Frontend", "97%"],
                      ["Launch QA", "91%"]
                    ].map(([label, value]) => (
                      <div key={label}>
                        <div className="mb-2 flex justify-between text-xs text-accent">
                          <span>{label}</span>
                          <span className="font-mono text-secondary">{value}</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                            style={{ width: value }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  style={{
                    x: parallax.x * 14,
                    y: parallax.y * 10
                  }}
                  className="grid gap-4"
                >
                  <div className="rounded-2xl border border-line bg-white/[0.045] p-4 backdrop-blur-xl">
                    <div className="mb-4 flex items-center justify-between">
                      <p className="font-mono text-xs uppercase tracking-[0.2em] text-secondary">
                        Deploy Pipeline
                      </p>
                      <Rocket className="text-secondary" size={18} />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {["Design", "Develop", "Deploy"].map((item, index) => (
                        <div key={item} className="rounded-xl border border-line bg-background/50 p-3">
                          <p className="font-mono text-[10px] text-accent">0{index + 1}</p>
                          <p className="mt-4 text-sm font-semibold text-text">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      { label: "Core Web Vitals", value: "95+", icon: ShieldCheck },
                      { label: "Components", value: "48", icon: Code2 }
                    ].map((metric) => (
                      <div key={metric.label} className="rounded-2xl border border-line bg-white/[0.045] p-4 backdrop-blur-xl">
                        <metric.icon className="text-secondary" size={20} />
                        <p className="mt-8 text-3xl font-semibold text-text">{metric.value}</p>
                        <p className="mt-1 text-xs text-accent">{metric.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-line bg-[#04071a]/80 p-4 font-mono text-xs leading-6 text-accent shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                    <p><span className="text-secondary">const</span> studio = &quot;ARYONIX&quot;;</p>
                    <p><span className="text-secondary">await</span> design.develop.deploy();</p>
                    <p className="text-emerald-200">status: production_ready</p>
                  </div>
                </motion.div>
              </div>

              <motion.div
                style={{
                  x: parallax.x * 28,
                  y: parallax.y * 18
                }}
                className="absolute bottom-5 left-5 right-5 rounded-2xl border border-secondary/25 bg-background/65 p-4 backdrop-blur-xl"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-secondary">
                      Client Preview
                    </p>
                    <p className="mt-1 text-sm text-text">Premium interface ready for handoff.</p>
                  </div>
                  <div className="flex -space-x-2">
                    {["D", "U", "A"].map((item) => (
                      <span key={item} className="grid size-8 place-items-center rounded-full border border-line bg-primary/20 text-xs font-bold text-text">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
