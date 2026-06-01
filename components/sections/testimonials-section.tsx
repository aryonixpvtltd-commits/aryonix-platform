"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { testimonials } from "@/lib/content";

export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-surface/35 py-24">
      <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="container-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.55 }}
        >
          <SectionHeading
            eyebrow="Testimonials"
            title="Premium delivery should feel calm, clear and deliberate."
            description="The result is not just a better-looking website. It is a sharper digital presence with technical foundations that can keep growing."
          />
        </motion.div>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.figure
              key={testimonial.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="panel relative rounded-2xl p-6"
            >
              <div className="mb-8 flex items-center justify-between">
                <div className="grid size-12 place-items-center rounded-xl border border-secondary/25 bg-primary/10 text-lg font-semibold text-secondary">
                  {testimonial.name.slice(0, 1)}
                </div>
                <span className="rounded-full border border-line bg-white/[0.04] px-3 py-1 text-xs text-accent">
                  {testimonial.signal}
                </span>
              </div>
              <blockquote className="text-lg leading-8 text-text/95">
                &quot;{testimonial.quote}&quot;
              </blockquote>
              <figcaption className="mt-8">
                <p className="font-semibold text-text">{testimonial.name}</p>
                <p className="text-sm text-accent">{testimonial.role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
