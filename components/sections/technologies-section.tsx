"use client";

import { motion } from "framer-motion";
import { Code2, Database, Hexagon, Layers3, Server, Triangle } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

const technologies = [
  { label: "Next.js", icon: Triangle },
  { label: "React", icon: Hexagon },
  { label: "TypeScript", icon: Code2 },
  { label: "Node.js", icon: Server },
  { label: "MongoDB", icon: Database },
  { label: "Prisma", icon: Layers3 }
];

export function TechnologiesSection() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute left-1/2 top-10 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="container-shell relative">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto text-center"
        >
          <SectionHeading
            eyebrow="Trusted Technologies"
            title="Built on a modern production stack."
            description="ARYONIX uses fast, reliable and scalable technologies for premium websites, SaaS platforms and digital products."
            className="mx-auto"
          />
        </motion.div>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {technologies.map((technology, index) => (
            <motion.div
              key={technology.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="panel group relative overflow-hidden rounded-2xl p-5 text-center transition duration-300 hover:-translate-y-1 hover:border-secondary/50 hover:shadow-[0_0_30px_rgba(26,111,255,0.22)]"
            >
              <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-secondary/70 to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="mx-auto grid size-12 place-items-center rounded-xl border border-secondary/25 bg-primary/10 text-secondary shadow-[0_0_24px_rgba(26,111,255,0.18)]">
                <technology.icon size={23} />
              </div>
              <p className="mt-4 text-sm font-semibold text-text">{technology.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
