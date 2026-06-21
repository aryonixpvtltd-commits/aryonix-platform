"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ArrowUpRight, ExternalLink, Github, Images, ShieldCheck, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/lib/content";

export function PortfolioShowcase() {
  const [category, setCategory] = useState("All");
  const categories = ["All", ...Array.from(new Set(projects.map((project) => project.category)))];
  const visible = useMemo(
    () => projects.filter((project) => category === "All" || project.category === category),
    [category]
  );

  return (
    <section className="relative overflow-hidden bg-surface/35 py-28" id="portfolio">
      <div className="absolute left-1/2 top-0 h-px w-[86%] -translate-x-1/2 bg-gradient-to-r from-transparent via-secondary/60 to-transparent" />
      <div className="absolute right-0 top-12 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
      <div className="absolute -left-24 bottom-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="container-shell">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.78fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.55 }}
          >
            <SectionHeading
              eyebrow="Portfolio"
              title="Real Aryonix builds that prove the studio can ship."
              description="Explore working demo products with screenshots, live previews, source links and the technology decisions behind each build."
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="panel grid gap-3 rounded-2xl p-4 sm:grid-cols-3"
          >
            {[
              ["4", "Live demos"],
              ["21", "Product screens"],
              ["100%", "Built by Aryonix"]
            ].map(([value, label]) => (
              <div key={label} className="rounded-xl border border-line bg-white/[0.04] p-4">
                <div className="text-2xl font-semibold text-text">{value}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.18em] text-accent">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-10 flex flex-wrap items-center justify-between gap-4"
        >
          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-xl border px-4 py-2 text-sm transition duration-200 ${
                  category === item
                    ? "border-secondary bg-primary/20 text-text shadow-[0_0_26px_rgba(26,111,255,0.25)]"
                    : "border-line bg-white/[0.04] text-accent hover:border-secondary/50 hover:text-text"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-secondary/25 bg-primary/10 px-4 py-2 text-sm text-accent">
            <ShieldCheck size={16} className="text-secondary" />
            Live previews available
          </div>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {visible.map((project, index) => (
            <motion.article
              key={project.title}
              layout
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="panel group relative overflow-hidden rounded-2xl"
            >
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${project.accent}`} />
              <div className="absolute -right-16 top-16 size-48 rounded-full bg-secondary/10 blur-3xl transition duration-500 group-hover:bg-secondary/20" />
              <Link href={project.live} target="_blank" className="block">
                <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-[#05091f]">
                  {project.screenshot ? (
                    <Image
                      src={project.screenshot}
                      alt={`${project.title} screenshot`}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover object-top opacity-90 transition duration-700 group-hover:scale-[1.045] group-hover:opacity-100"
                    />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-30`} />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
                  <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-white/15 bg-background/60 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-secondary backdrop-blur-md">
                      {project.category}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-background/60 px-3 py-1 text-xs text-accent backdrop-blur-md">
                      <Images size={14} />
                      {project.screenshots?.length ?? 1} screens
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-secondary">{project.result}</p>
                      <h3 className="mt-2 text-2xl font-semibold text-text sm:text-3xl">{project.title}</h3>
                    </div>
                    <span className="hidden size-11 place-items-center rounded-xl border border-secondary/30 bg-primary/15 text-text backdrop-blur-md transition group-hover:-translate-y-1 group-hover:translate-x-1 sm:grid">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>
                </div>
              </Link>
              <div className="p-6">
                <p className="text-sm leading-6 text-accent">{project.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-secondary/20 bg-secondary/[0.06] px-3 py-1 text-xs text-accent shadow-[0_0_18px_rgba(26,111,255,0.08)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <Link
                    href={project.live}
                    target="_blank"
                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-secondary/40 bg-primary/15 px-4 py-2 text-center text-sm font-semibold text-text transition hover:-translate-y-0.5 hover:bg-primary/25 hover:shadow-[0_0_24px_rgba(26,111,255,0.25)]"
                  >
                    Learn More <ExternalLink className="ml-2" size={16} />
                  </Link>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-line bg-white/[0.04] px-4 py-2 text-center text-sm font-semibold text-accent transition hover:-translate-y-0.5 hover:border-secondary/50 hover:text-text"
                  >
                    GitHub <Github className="ml-2" size={16} />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="panel mt-6 flex flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-xl border border-secondary/30 bg-primary/15 text-secondary">
              <Sparkles size={19} />
            </span>
            <div>
              <p className="font-semibold text-text">Trust-building proof, not placeholder work.</p>
              <p className="text-sm text-accent">Every project includes real screenshots, a live demo and a public GitHub destination.</p>
            </div>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-line bg-white/[0.04] px-4 py-2 text-sm font-semibold text-accent transition hover:border-secondary/50 hover:text-text"
          >
            Open Full Portfolio <ArrowUpRight className="ml-2" size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
