"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Instagram, Plus } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/lib/site";

const slides = Array.from({ length: 8 }, (_, index) => ({
  src: `/instagram/slide${index + 1}.jpg`,
  alt: `ARYONIX Instagram carousel slide ${index + 1}`,
  label: `${String(index + 1).padStart(2, "0")}/08`
}));

export function InstagramShowcase() {
  return (
    <section className="relative overflow-hidden bg-surface/35 py-28" id="instagram">
      <div className="grid-mask absolute inset-0 opacity-40" />
      <div className="absolute left-1/2 top-24 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute -right-24 bottom-16 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
      <div className="container-shell relative">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.64fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.55 }}
          >
            <SectionHeading
              eyebrow="Instagram"
              title="Follow The Build Journey"
              description="See how ARYONIX designs, develops and deploys products in public."
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="panel relative overflow-hidden rounded-2xl p-5"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/70 to-transparent" />
            <div className="absolute -right-10 -top-10 size-32 rounded-full bg-primary/20 blur-3xl" />
            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:flex-col lg:items-start xl:flex-row xl:items-center">
              <div className="flex items-center gap-3">
                <div className="grid size-12 place-items-center rounded-xl border border-secondary/30 bg-primary/10 text-secondary shadow-glow">
                  <Instagram size={22} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text">@aryonix.in</p>
                  <p className="text-xs text-accent">Design. Develop. Deploy.</p>
                </div>
              </div>
              <Button href={siteConfig.instagram}>
                Follow @aryonix.in <Plus className="ml-2" size={16} />
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="mt-12">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {slides.map((slide, index) => (
              <motion.a
                key={slide.src}
                href={siteConfig.instagram}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.04 }}
                className={`panel group relative block overflow-hidden rounded-2xl p-2 transition duration-300 hover:-translate-y-1 hover:border-secondary/45 hover:shadow-[0_0_42px_rgba(26,111,255,0.18)] ${
                  index === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""
                }`}
                aria-label={`Open Aryonix Instagram slide ${index + 1}`}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#030716]">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.025]"
                    sizes={index === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/65 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                  <div className="absolute left-4 top-4 rounded-full border border-line bg-background/55 px-3 py-1 font-mono text-[11px] tracking-[0.18em] text-secondary backdrop-blur-md">
                    {slide.label}
                  </div>
                  <div className="absolute right-4 top-4 rounded-full border border-line bg-background/55 px-3 py-1 text-[11px] font-semibold text-accent backdrop-blur-md">
                    Latest carousel
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-white/12 bg-background/55 p-3 opacity-0 backdrop-blur-md transition group-hover:opacity-100">
                    <span className="text-sm font-semibold text-text">@aryonix.in</span>
                    <ArrowUpRight className="text-secondary" size={17} />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mt-8 grid gap-4 md:grid-cols-3"
        >
          {[
            ["Latest carousel previews", "Service stories designed for swipe-through discovery."],
            ["Built in public", "Design, development and launch progress shared with clarity."],
            ["Live Instagram CTA", "Visitors can jump directly to @aryonix.in and follow the studio."]
          ].map(([title, copy]) => (
            <div key={title} className="panel rounded-2xl p-5 transition hover:border-secondary/40 hover:bg-white/[0.055]">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-secondary">{title}</p>
              <p className="mt-3 text-sm leading-6 text-accent">{copy}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
