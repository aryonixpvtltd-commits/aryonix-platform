"use client";

import { Github, Instagram, LayoutDashboard, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { siteConfig } from "@/lib/site";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const socials = [
    { label: "GitHub", href: siteConfig.social.github.href, icon: Github },
    { label: "Instagram", href: siteConfig.social.instagram.href, icon: Instagram }
  ];

  return (
    <header className="fixed inset-x-0 top-4 z-40">
      <div className="container-shell">
        <nav className="panel flex h-16 items-center justify-between rounded-2xl px-4 md:px-5">
          <Logo />
          <div className="hidden items-center gap-1 lg:flex">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-4 py-2 text-sm text-accent transition hover:bg-white/[0.06] hover:text-text"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="hidden items-center gap-3 lg:flex">
            <div className="flex items-center gap-2 border-r border-line pr-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="grid size-10 place-items-center rounded-xl border border-line bg-white/[0.035] text-accent transition duration-200 hover:-translate-y-0.5 hover:border-secondary/60 hover:bg-primary/10 hover:text-text hover:shadow-[0_0_24px_rgba(26,111,255,0.25)]"
                >
                  <social.icon size={17} />
                </a>
              ))}
            </div>
            <Button href="/admin-login" variant="secondary" className="px-3">
              <LayoutDashboard className="mr-2" size={16} />
              Admin
            </Button>
            <Button href="/contact">Start Project</Button>
          </div>
          <button
            className="grid size-10 place-items-center rounded-xl border border-line text-text lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle navigation"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
        {open ? (
          <div className="panel mt-3 grid gap-2 rounded-2xl p-3 lg:hidden">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm text-accent hover:bg-white/[0.06] hover:text-text"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-white/[0.04] px-4 py-3 text-sm text-accent hover:border-secondary/50 hover:text-text"
                >
                  <social.icon size={16} />
                  {social.label}
                </a>
              ))}
            </div>
            <Button href="/contact" className="mt-2">
              Start Project
            </Button>
            <Button href="/admin-login" variant="secondary" className="mt-1">
              <LayoutDashboard className="mr-2" size={16} />
              Admin Login
            </Button>
          </div>
        ) : null}
      </div>
    </header>
  );
}
