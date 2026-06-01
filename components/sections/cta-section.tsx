"use client";

import { motion } from "framer-motion";
import { ArrowRight, Instagram, Mail, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

const contactCards = [
  {
    label: "Email",
    value: siteConfig.email,
    href: siteConfig.social.email.href,
    icon: Mail
  },
  {
    label: "WhatsApp",
    value: siteConfig.social.whatsapp.handle,
    href: siteConfig.social.whatsapp.href,
    icon: MessageCircle
  },
  {
    label: "Instagram",
    value: siteConfig.social.instagram.handle,
    href: siteConfig.social.instagram.href,
    icon: Instagram
  }
];

export function CtaSection() {
  return (
    <section className="relative overflow-hidden pb-24 pt-8">
      <div className="absolute left-1/2 top-0 h-72 w-[70%] -translate-x-1/2 rounded-full bg-secondary/10 blur-3xl" />
      <div className="container-shell">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="panel relative overflow-hidden rounded-2xl p-6 md:p-10 lg:p-12"
        >
          <div className="grid-mask absolute inset-0 opacity-45" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/80 to-transparent" />
          <div className="absolute right-0 top-0 h-80 w-80 bg-primary/25 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 h-48 w-96 bg-secondary/10 blur-3xl" />
          <div className="absolute -right-20 bottom-10 hidden aspect-square w-80 rounded-full border border-secondary/20 bg-[radial-gradient(circle,rgba(77,163,255,0.14),transparent_62%)] lg:block" />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-secondary/25 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                <Sparkles size={14} />
                Start Project
              </div>
              <h2 className="mt-6 text-balance text-4xl font-semibold tracking-[-0.02em] text-text md:text-6xl">
                Ready to Build Something Great?
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-accent">
                Let&apos;s turn your idea into a high-performance digital product.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/contact" className="h-12 px-6">
                  Start Project <ArrowRight className="ml-2" size={17} />
                </Button>
                <Button href={siteConfig.social.whatsapp.href} variant="secondary" className="h-12 px-6">
                  Book a Consultation <MessageCircle className="ml-2" size={17} />
                </Button>
              </div>
            </div>

            <div className="grid gap-3">
              {contactCards.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    initial={{ opacity: 0, x: 18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.45, delay: 0.12 + index * 0.06 }}
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-white/[0.045] p-4 backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-secondary/45 hover:bg-secondary/[0.07] hover:shadow-[0_0_30px_rgba(26,111,255,0.16)]"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-secondary/25 bg-primary/10 text-secondary transition group-hover:shadow-glow">
                        <Icon size={19} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs uppercase tracking-[0.18em] text-accent">{item.label}</p>
                        <p className="truncate text-sm font-semibold text-text">{item.value}</p>
                      </div>
                    </div>
                    <ArrowRight className="shrink-0 text-secondary transition group-hover:translate-x-1" size={17} />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
