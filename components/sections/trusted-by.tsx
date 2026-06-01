"use client";

import { motion } from "framer-motion";
import { trustedSignals } from "@/lib/content";

export function TrustedBy() {
  return (
    <section className="relative border-y border-line bg-surface/35 py-10">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/60 to-transparent" />
      <div className="container-shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="max-w-xs font-mono text-xs uppercase tracking-[0.24em] text-accent"
          >
            Trusted operating modes for serious digital products
          </motion.p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:flex lg:gap-3">
            {trustedSignals.map((signal, index) => (
              <motion.div
                key={signal}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
                className="rounded-xl border border-line bg-white/[0.04] px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-text/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
              >
                {signal}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
