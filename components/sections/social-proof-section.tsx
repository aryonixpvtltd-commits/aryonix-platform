"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { SocialCards } from "@/components/social/social-cards";

export function SocialProofSection() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="grid-mask absolute inset-0 opacity-35" />
      <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="container-shell relative grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.55 }}
        >
          <SectionHeading
            eyebrow="Official Channels"
            title="Connect With ARYONIX"
            description="Follow, inspect, message or start a direct project conversation through the official Aryonix company channels."
          />
          <div className="mt-8 rounded-2xl border border-line bg-white/[0.04] p-5">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-secondary">
              Verified studio presence
            </p>
            <p className="mt-3 text-sm leading-6 text-accent">
              Instagram for brand proof, GitHub for engineering presence, email
              for formal enquiries and WhatsApp for fast discovery.
            </p>
          </div>
        </motion.div>
        <SocialCards />
      </div>
    </section>
  );
}
