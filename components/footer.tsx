import Link from "next/link";
import { Github, Instagram, Mail, MessageCircle } from "lucide-react";
import { Logo } from "@/components/logo";
import { footerCapabilities, footerLinks } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export function Footer() {
  const contactLinks = [
    { label: "Instagram", value: siteConfig.social.instagram.handle, href: siteConfig.social.instagram.href, icon: Instagram },
    { label: "GitHub", value: siteConfig.social.github.handle, href: siteConfig.social.github.href, icon: Github },
    { label: "Email", value: siteConfig.social.email.handle, href: siteConfig.social.email.href, icon: Mail },
    { label: "WhatsApp", value: siteConfig.social.whatsapp.handle, href: siteConfig.social.whatsapp.href, icon: MessageCircle }
  ];

  return (
    <footer className="relative overflow-hidden border-t border-line bg-surface/60 py-14">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/60 to-transparent" />
      <div className="absolute -right-20 top-0 size-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="container-shell relative grid gap-10 lg:grid-cols-[1.25fr_0.9fr_0.9fr_1.1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-md text-sm leading-6 text-accent">
            Premium technology studio building high-performance websites,
            SaaS platforms and digital products for ambitious businesses.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {footerCapabilities.map((item) => (
              <span key={item.label} className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.04] px-3 py-1.5 text-xs text-accent">
                <item.icon size={13} />
                {item.label}
              </span>
            ))}
          </div>
        </div>
        {footerLinks.map((group) => (
          <div key={group.title}>
            <p className="mb-4 text-sm font-semibold text-text">{group.title}</p>
            <div className="grid gap-3">
              {group.links.map((item) => (
                <Link key={item.href} href={item.href} className="text-sm text-accent transition hover:text-text">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
        <div>
          <p className="mb-4 text-sm font-semibold text-text">Social Presence</p>
          <div className="grid gap-3 text-sm text-accent">
            {contactLinks.map((item) => (
              <a
                key={item.label}
                className="group inline-flex items-center gap-3 rounded-xl border border-transparent py-1 transition hover:border-line hover:bg-white/[0.035] hover:px-3 hover:text-text"
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              >
                <item.icon className="text-secondary transition group-hover:scale-110" size={16} />
                <span className="min-w-0 truncate">{item.value}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="container-shell relative mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-accent md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} ARYONIX. All rights reserved.</p>
        <p className="font-mono uppercase tracking-[0.22em]">Design. Develop. Deploy.</p>
      </div>
    </footer>
  );
}
