"use client";

import { motion } from "framer-motion";
import { Github, Instagram, Mail, MessageCircle, type LucideIcon } from "lucide-react";
import { siteConfig } from "@/lib/site";

const iconMap: Record<string, LucideIcon> = {
  Instagram,
  GitHub: Github,
  Email: Mail,
  WhatsApp: MessageCircle
};

const socialItems = [
  {
    ...siteConfig.social.instagram,
    description: "Follow the studio's latest visual systems, launches and carousel posts."
  },
  {
    ...siteConfig.social.github,
    description: "Explore Aryonix repositories, technical direction and engineering presence."
  },
  {
    ...siteConfig.social.email,
    description: "Send project briefs, collaboration details and business enquiries."
  },
  {
    ...siteConfig.social.whatsapp,
    description: "Start a direct conversation for fast project discovery and next steps."
  }
];

export function SocialCards({
  compact = false
}: {
  compact?: boolean;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {socialItems.map((item, index) => {
        const Icon = iconMap[item.label];

        return (
          <motion.a
            key={item.label}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noreferrer" : undefined}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: index * 0.05 }}
            className="panel group relative overflow-hidden rounded-2xl p-5 transition duration-300 hover:-translate-y-1 hover:border-secondary/50 hover:shadow-[0_0_34px_rgba(26,111,255,0.22)]"
          >
            <div className="absolute -right-10 -top-10 size-28 rounded-full bg-primary/10 blur-2xl transition group-hover:bg-primary/20" />
            <div className="relative flex items-start gap-4">
              <div className="grid size-12 shrink-0 place-items-center rounded-xl border border-secondary/25 bg-primary/10 text-secondary transition group-hover:scale-105">
                <Icon size={23} />
              </div>
              <div className="min-w-0">
                <p className="text-lg font-semibold text-text">{item.label}</p>
                <p className="mt-1 truncate text-sm text-secondary">{item.handle}</p>
                {!compact ? (
                  <p className="mt-4 text-sm leading-6 text-accent">{item.description}</p>
                ) : null}
              </div>
            </div>
          </motion.a>
        );
      })}
    </div>
  );
}
