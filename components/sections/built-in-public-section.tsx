"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, GitBranch, Github, Instagram, Radio } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/lib/site";

const channels = [
  {
    label: "Instagram",
    handle: "@aryonix.in",
    href: siteConfig.social.instagram.href,
    icon: Instagram,
    copy: "Visual progress, service breakdowns, launch stories and brand direction shared as public-facing proof."
  },
  {
    label: "GitHub",
    handle: "aryonixpvtltd-commits",
    href: siteConfig.social.github.href,
    icon: Github,
    copy: "Engineering presence, repository activity and development momentum visible through the company GitHub."
  }
];

export function BuiltInPublicSection() {
  return (
    <section className="relative overflow-hidden bg-surface/35 py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/60 to-transparent" />
      <div className="absolute right-0 top-16 h-80 w-80 rounded-full bg-primary/12 blur-3xl" />
      <div className="container-shell relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.55 }}
        >
          <SectionHeading
            eyebrow="Built in Public"
            title="Progress you can actually see."
            description="ARYONIX actively shares development progress, design direction and project momentum in public, creating more credibility and transparency before a client ever books a call."
          />
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          {channels.map((channel, index) => (
            <motion.a
              key={channel.label}
              href={channel.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              className="panel group relative min-h-[260px] overflow-hidden rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:border-secondary/50 hover:shadow-[0_0_34px_rgba(26,111,255,0.22)]"
            >
              <div className="absolute -right-12 -top-12 size-36 rounded-full bg-primary/10 blur-2xl transition group-hover:bg-primary/20" />
              <div className="relative flex h-full flex-col">
                <div className="flex items-center justify-between">
                  <div className="grid size-12 place-items-center rounded-xl border border-secondary/25 bg-primary/10 text-secondary shadow-glow">
                    <channel.icon size={24} />
                  </div>
                  <ArrowUpRight className="text-accent transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-secondary" size={19} />
                </div>
                <p className="mt-8 font-mono text-xs uppercase tracking-[0.22em] text-secondary">
                  {channel.label}
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-text">{channel.handle}</h3>
                <p className="mt-4 text-sm leading-6 text-accent">{channel.copy}</p>
                <div className="mt-auto pt-8">
                  <div className="flex items-center gap-3 rounded-xl border border-line bg-white/[0.035] px-3 py-2 text-sm text-accent">
                    {channel.label === "GitHub" ? <GitBranch size={16} /> : <Radio size={16} />}
                    Public progress channel
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
