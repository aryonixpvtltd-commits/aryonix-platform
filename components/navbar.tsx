"use client";

import { Github, Instagram, LayoutDashboard, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

const sectionNav = [
  { label: "Home", href: "/", section: "home" },
  { label: "Services", href: "/#services", section: "services" },
  { label: "Pricing", href: "/#pricing", section: "pricing" },
  { label: "Portfolio", href: "/#portfolio", section: "portfolio" },
  { label: "Process", href: "/#process", section: "process" },
  { label: "Contact", href: "/contact", section: "contact" }
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const socials = [
    { label: "GitHub", href: siteConfig.social.github.href, icon: Github },
    { label: "Instagram", href: siteConfig.social.instagram.href, icon: Instagram }
  ];

  const activeKey = useMemo(() => {
    if (pathname === "/contact") return "contact";
    if (pathname === "/portfolio" || pathname.startsWith("/portfolio/")) return "portfolio";
    if (pathname === "/services") return "services";
    if (pathname === "/about") return "about";
    return activeSection;
  }, [activeSection, pathname]);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 18);
      if (pathname !== "/") return;

      const sections = sectionNav
        .map((item) => item.section)
        .filter((section) => document.getElementById(section));

      const current = sections.reduce((active, section) => {
        const element = document.getElementById(section);
        if (!element) return active;
        const rect = element.getBoundingClientRect();
        return rect.top <= 160 ? section : active;
      }, "home");

      setActiveSection(current);
    }

    function handleHashChange() {
      const hash = window.location.hash.replace("#", "");
      if (hash) setActiveSection(hash);
    }

    handleScroll();
    handleHashChange();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className={cn("fixed inset-x-0 z-40 transition-all duration-300", scrolled ? "top-2" : "top-4")}>
      <div className="container-shell">
        <nav
          className={cn(
            "flex h-16 items-center justify-between rounded-2xl border px-4 transition-all duration-300 md:px-5",
            scrolled
              ? "border-secondary/25 bg-[#05091f]/78 shadow-[0_18px_70px_rgba(0,0,0,0.42)] backdrop-blur-2xl"
              : "panel"
          )}
        >
          <Logo />
          <div className="hidden items-center gap-1 lg:flex">
            {sectionNav.map((item) => {
              const active = activeKey === item.section;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    if (item.href.startsWith("/#")) setActiveSection(item.section);
                  }}
                  className={cn(
                    "rounded-xl px-4 py-2 text-sm transition",
                    active
                      ? "bg-secondary/[0.12] text-text shadow-[inset_0_0_0_1px_rgba(77,163,255,0.26)]"
                      : "text-accent hover:bg-white/[0.06] hover:text-text"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/about"
              className={cn(
                "rounded-xl px-4 py-2 text-sm transition",
                activeKey === "about"
                  ? "bg-secondary/[0.12] text-text shadow-[inset_0_0_0_1px_rgba(77,163,255,0.26)]"
                  : "text-accent hover:bg-white/[0.06] hover:text-text"
              )}
              aria-current={activeKey === "about" ? "page" : undefined}
            >
              About
            </Link>
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
            className="grid size-10 place-items-center rounded-xl border border-line bg-white/[0.035] text-text lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>

        {open ? (
          <div className="panel mt-3 overflow-hidden rounded-2xl p-3 shadow-[0_24px_90px_rgba(0,0,0,0.48)] lg:hidden">
            <div className="grid gap-1">
              {[...sectionNav, { label: "About", href: "/about", section: "about" }].map((item) => {
                const active = activeKey === item.section;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      if (item.href.startsWith("/#")) setActiveSection(item.section);
                      setOpen(false);
                    }}
                    className={cn(
                      "rounded-xl px-4 py-3 text-sm transition",
                      active ? "bg-secondary/[0.12] text-text" : "text-accent hover:bg-white/[0.06] hover:text-text"
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
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
            <div className="mt-3 grid gap-2">
              <Button href="/contact" onClick={() => setOpen(false)}>
                Start Project
              </Button>
              <Button href="/admin-login" variant="secondary" onClick={() => setOpen(false)}>
                <LayoutDashboard className="mr-2" size={16} />
                Admin Login
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
