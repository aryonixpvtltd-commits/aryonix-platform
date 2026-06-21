import { ArrowUpRight, Github, Instagram, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { footerCapabilities, footerLinks, services } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export function Footer() {
  const contactLinks = [
    { label: "Instagram", value: siteConfig.social.instagram.handle, href: siteConfig.social.instagram.href, icon: Instagram },
    { label: "GitHub", value: siteConfig.social.github.handle, href: siteConfig.social.github.href, icon: Github },
    { label: "Email", value: siteConfig.social.email.handle, href: siteConfig.social.email.href, icon: Mail },
    { label: "WhatsApp", value: siteConfig.social.whatsapp.handle, href: siteConfig.social.whatsapp.href, icon: MessageCircle }
  ];

  return (
    <footer className="relative overflow-hidden border-t border-line bg-[#020614]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/70 to-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(26,111,255,0.13),transparent_34%,rgba(77,163,255,0.06)_72%,transparent)]" />

      <div className="container-shell relative py-16">
        <div className="grid gap-10 border-b border-line pb-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <Logo />
            <h2 className="mt-8 max-w-4xl text-balance text-4xl font-semibold leading-[1] tracking-[-0.02em] text-text md:text-6xl">
              Digital presence, product systems and launch execution for ambitious businesses.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-white shadow-glow transition hover:bg-secondary"
            >
              Start Project <ArrowUpRight className="ml-2" size={17} />
            </Link>
            <a
              href={siteConfig.social.whatsapp.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-line bg-white/[0.055] px-5 text-sm font-semibold text-text transition hover:border-secondary/60 hover:bg-white/[0.09]"
            >
              Book Consultation <MessageCircle className="ml-2" size={17} />
            </a>
          </div>
        </div>

        <div className="grid gap-10 py-12 lg:grid-cols-[1.15fr_0.75fr_0.75fr_0.95fr]">
          <div>
            <p className="max-w-md text-sm leading-7 text-accent">
              ARYONIX is a premium technology studio for strategy-led websites, SaaS interfaces and business platforms that need to feel established from the first visit.
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
              <p className="mb-5 font-mono text-xs uppercase tracking-[0.24em] text-secondary">{group.title}</p>
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
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.24em] text-secondary">Services</p>
            <div className="grid gap-3">
              {services.slice(0, 6).map((service) => (
                <Link key={service.title} href="/services" className="text-sm text-accent transition hover:text-text">
                  {service.title}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 border-t border-line pt-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="flex flex-wrap gap-3">
            {contactLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-line bg-white/[0.035] px-3 text-sm text-accent transition hover:border-secondary/50 hover:text-text"
              >
                <item.icon className="text-secondary" size={15} />
                <span className="max-w-[180px] truncate">{item.value}</span>
              </a>
            ))}
          </div>
          <div className="text-xs text-accent lg:text-right">
            <p>© {new Date().getFullYear()} ARYONIX. All rights reserved.</p>
            <p className="mt-2 font-mono uppercase tracking-[0.22em]">Design. Develop. Deploy.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
