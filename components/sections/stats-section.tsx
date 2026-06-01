"use client";

import { motion } from "framer-motion";
import { stats } from "@/lib/content";

export function StatsSection() {
  return (
    <section className="py-20">
      <div className="container-shell grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="panel relative overflow-hidden rounded-2xl p-6"
          >
            <div className="absolute right-0 top-0 size-24 rounded-full bg-primary/10 blur-2xl" />
            <p className="relative text-5xl font-semibold text-text">{stat.value}</p>
            <p className="relative mt-3 text-sm font-semibold text-text/85">{stat.label}</p>
            <p className="relative mt-3 text-sm leading-6 text-accent">{stat.detail}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
