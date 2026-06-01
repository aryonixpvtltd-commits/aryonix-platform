"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { services } from "@/lib/content";

export function ServicesSection() {
  return (
    <section className="relative overflow-hidden py-24" id="services">
      <div className="absolute left-0 top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute right-0 bottom-16 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
      <div className="container-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.55 }}
        >
          <SectionHeading
            eyebrow="Services"
            title="Premium digital services for brands that need serious execution."
            description="ARYONIX combines visual craft, full-stack engineering and launch discipline to create websites and platforms that feel refined, fast and built for growth."
          />
        </motion.div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="panel group relative min-h-[300px] overflow-hidden rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:border-secondary/50 hover:shadow-[0_0_38px_rgba(26,111,255,0.22)]"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/70 to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="absolute -right-12 -top-12 size-36 rounded-full bg-primary/10 blur-2xl transition group-hover:bg-primary/20" />
              <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-primary/10 to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="relative flex h-full flex-col">
                <div className="mb-8 flex items-center justify-between">
                  <div className="grid size-[52px] place-items-center rounded-xl border border-secondary/25 bg-primary/10 text-secondary shadow-[0_0_34px_rgba(26,111,255,0.18)]">
                    <service.icon size={24} />
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-secondary/85">
                    {service.metric}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-text">{service.title}</h3>
                <p className="mt-4 text-sm leading-6 text-accent">{service.description}</p>
                <div className="mt-auto pt-8">
                  <Link
                    href="/services"
                    className="mb-5 inline-flex h-10 items-center justify-center rounded-xl border border-line bg-white/[0.04] px-4 text-sm font-semibold text-accent transition hover:border-secondary/60 hover:bg-primary/10 hover:text-text"
                  >
                    Learn More <ArrowUpRight className="ml-2" size={15} />
                  </Link>
                  <div className="h-1 rounded-full bg-white/10">
                    <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-primary to-secondary opacity-70 transition group-hover:w-full" />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
