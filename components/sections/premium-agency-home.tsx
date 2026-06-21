"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Code2,
  Gem,
  Layers3,
  MessageCircle,
  Sparkles,
  Target,
  X,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { process as agencyProcess, projects, services, testimonials } from "@/lib/content";
import { siteConfig } from "@/lib/site";

type Service = (typeof services)[number];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 }
};

const sectionViewport = { once: true, margin: "-110px" };

const trustIndicators = [
  "Startup focused",
  "Fast delivery",
  "Mobile first",
  "SEO optimized"
];

const trustFeatures = [
  { title: "Startup Focused", detail: "Built for founders who need clarity, momentum and a credible first impression.", icon: Target },
  { title: "Fast Delivery", detail: "Lean production rhythm with clean checkpoints and practical launch discipline.", icon: Zap },
  { title: "Mobile First", detail: "Every core section, form and modal is shaped for smaller screens before handoff.", icon: Layers3 },
  { title: "SEO Optimized", detail: "Metadata, semantic structure and performance-minded implementation from the start.", icon: Sparkles },
  { title: "Scalable Solutions", detail: "Next.js, reusable components, API routes and database workflows that can grow.", icon: Code2 },
  { title: "Ongoing Support", detail: "Post-launch help for content updates, refinements, fixes and expansion.", icon: CheckCircle2 }
];

const pricingPackages = [
  {
    name: "Starter Website",
    detail: "A focused launch package for founders and personal brands that need a premium first impression quickly.",
    features: ["Landing Page", "Mobile Responsive", "Contact Form"],
    bestFor: "Portfolio, campaign or early startup launch"
  },
  {
    name: "Business Website",
    detail: "A multi-page brand presence with search-ready structure, scalable content and business-grade controls.",
    features: ["Multi-page Website", "SEO Setup", "Admin Panel"],
    bestFor: "Service businesses, agencies and growing brands"
  },
  {
    name: "Custom Web Application",
    detail: "A tailored product build for teams that need real workflows, authenticated users and backend systems.",
    features: ["Custom Features", "Database", "Authentication", "API Integration"],
    bestFor: "SaaS, dashboards, portals and internal tools"
  }
];

function SectionHeader({
  label,
  title,
  description,
  align = "left"
}: {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={sectionViewport}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className={align === "center" ? "mx-auto max-w-4xl text-center" : "max-w-4xl"}
    >
      <p className="font-mono text-xs uppercase tracking-[0.34em] text-secondary">{label}</p>
      <h2 className="mt-5 text-balance text-4xl font-semibold leading-[0.98] tracking-[-0.02em] text-text md:text-6xl">
        {title}
      </h2>
      {description ? (
        <p className={align === "center" ? "mx-auto mt-6 max-w-2xl text-base leading-8 text-accent md:text-lg" : "mt-6 max-w-2xl text-base leading-8 text-accent md:text-lg"}>
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}

function ChromeFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-line bg-[#061026]/80 shadow-[0_34px_120px_rgba(0,0,0,0.42)] backdrop-blur-2xl ${className}`}>
      <div className="flex h-12 items-center justify-between border-b border-line bg-white/[0.045] px-4">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-[#ff6b6b]" />
          <span className="size-2.5 rounded-full bg-[#ffd166]" />
          <span className="size-2.5 rounded-full bg-[#06d6a0]" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent/70">
          aryonix.agency/system
        </span>
      </div>
      {children}
    </div>
  );
}

function ServiceModal({ service, onClose }: { service: Service | null; onClose: () => void }) {
  const modalProcess = useMemo(
    () => [
      "Discovery call and positioning audit",
      "UX architecture and visual direction",
      "Responsive build with production components",
      "QA, launch support and handoff documentation"
    ],
    []
  );

  const deliverables = useMemo(
    () => [
      "Premium responsive interface",
      "Reusable section and component system",
      "Conversion-ready page structure",
      "Deployment-ready implementation",
      "Admin or content handoff where needed"
    ],
    []
  );

  useEffect(() => {
    if (!service) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [service, onClose]);

  return (
    <AnimatePresence>
      {service ? (
        <motion.div
          className="fixed inset-0 z-50 overflow-y-auto bg-[#020614]/92 backdrop-blur-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-modal-heading"
        >
          <motion.div
            className="min-h-screen"
            initial={{ y: 34, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div className="sticky top-0 z-10 border-b border-line bg-[#020614]/78 backdrop-blur-xl">
              <div className="container-shell flex min-h-20 items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-secondary/35 bg-primary/15 text-secondary shadow-glow">
                    <service.icon size={23} />
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-secondary">Service details</p>
                    <p className="truncate text-lg font-semibold text-text">{service.title}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-white/[0.045] text-accent transition hover:border-secondary/60 hover:text-text"
                  aria-label="Close service details"
                >
                  <X size={19} />
                </button>
              </div>
            </div>

            <div className="container-shell py-10 md:py-14">
              <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="lg:sticky lg:top-28 lg:self-start">
                  <p className="font-mono text-xs uppercase tracking-[0.34em] text-secondary">{service.metric}</p>
                  <h2 id="service-modal-heading" className="mt-5 text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.02em] text-text md:text-7xl">
                    {service.title}
                  </h2>
                  <p className="mt-7 text-base leading-8 text-accent md:text-lg">
                    {service.detailedDescription}
                  </p>
                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-line bg-white/[0.045] p-5">
                      <Clock3 className="text-secondary" size={20} />
                      <p className="mt-5 text-sm font-semibold text-text">Timeline</p>
                      <p className="mt-2 text-sm leading-6 text-accent">{service.timeline}</p>
                    </div>
                    <div className="rounded-2xl border border-line bg-white/[0.045] p-5">
                      <Target className="text-secondary" size={20} />
                      <p className="mt-5 text-sm font-semibold text-text">Best for</p>
                      <p className="mt-2 text-sm leading-6 text-accent">{service.idealClients.slice(0, 3).join(", ")}</p>
                    </div>
                  </div>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Button href="/contact" className="h-12 px-6">
                      Start Project <ArrowRight className="ml-2" size={17} />
                    </Button>
                    <Button href={siteConfig.social.whatsapp.href} variant="secondary" className="h-12 px-6">
                      Book Call <MessageCircle className="ml-2" size={17} />
                    </Button>
                  </div>
                </div>

                <div className="grid gap-5">
                  <div className="rounded-2xl border border-line bg-white/[0.04] p-5 md:p-7">
                    <h3 className="text-2xl font-semibold text-text">Service Overview</h3>
                    <p className="mt-4 text-sm leading-7 text-accent md:text-base md:leading-8">
                      ARYONIX packages this service as a premium engagement: strategy first, high-fidelity interface design, clean implementation and launch-ready delivery.
                    </p>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="rounded-2xl border border-line bg-white/[0.04] p-5 md:p-7">
                      <h3 className="text-2xl font-semibold text-text">Key benefits</h3>
                      <div className="mt-5 grid gap-3">
                        {service.features.map((feature) => (
                          <div key={feature} className="flex gap-3 text-sm leading-6 text-accent">
                            <CheckCircle2 className="mt-1 shrink-0 text-secondary" size={17} />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-line bg-white/[0.04] p-5 md:p-7">
                      <h3 className="text-2xl font-semibold text-text">Technologies</h3>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {service.technologies.map((technology) => (
                          <span key={technology} className="rounded-full border border-secondary/25 bg-secondary/[0.075] px-3 py-1.5 text-xs font-medium text-accent">
                            {technology}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="rounded-2xl border border-line bg-white/[0.04] p-5 md:p-7">
                      <h3 className="text-2xl font-semibold text-text">Process</h3>
                      <div className="mt-5 grid gap-4">
                        {modalProcess.map((item, index) => (
                          <div key={item} className="grid grid-cols-[42px_1fr] gap-3">
                            <span className="grid size-10 place-items-center rounded-xl border border-secondary/25 bg-primary/12 font-mono text-xs text-secondary">
                              0{index + 1}
                            </span>
                            <p className="pt-2 text-sm leading-6 text-accent">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-line bg-white/[0.04] p-5 md:p-7">
                      <h3 className="text-2xl font-semibold text-text">Deliverables</h3>
                      <div className="mt-5 grid gap-3">
                        {deliverables.map((item) => (
                          <div key={item} className="flex items-center gap-3 rounded-xl border border-line bg-white/[0.035] px-3 py-2 text-sm text-accent">
                            <Sparkles className="shrink-0 text-secondary" size={15} />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-28" id="home">
      <div className="absolute inset-0 grid-mask opacity-45" />
      <div className="absolute inset-x-0 top-0 h-[34rem] bg-[linear-gradient(110deg,rgba(26,111,255,0.28),transparent_36%,rgba(77,163,255,0.12)_72%,transparent)]" />
      <div className="container-shell relative grid min-h-[calc(100vh-7rem)] items-center gap-12 pb-20 pt-10 lg:grid-cols-[1.02fr_0.98fr]">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <h1 className="text-balance text-5xl font-semibold leading-[0.94] tracking-[-0.03em] text-text md:text-7xl xl:text-[6.85rem]">
            ARYONIX builds premium digital systems for ambitious brands.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-accent md:text-xl md:leading-9">
            Strategy, interface design, full-stack engineering and launch execution in one calm, high-craft agency workflow.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact" className="h-12 px-6">
              Start Project <ArrowRight className="ml-2" size={17} />
            </Button>
            <Button href={siteConfig.social.whatsapp.href} variant="secondary" className="h-12 px-6">
              WhatsApp Us <MessageCircle className="ml-2" size={17} />
            </Button>
            <Button href="#portfolio" variant="secondary" className="h-12 px-6">
              View Case Studies <ArrowUpRight className="ml-2" size={17} />
            </Button>
          </div>
          <div className="mt-5 inline-flex max-w-full items-center gap-3 rounded-2xl border border-secondary/25 bg-secondary/[0.075] px-4 py-3 text-sm text-accent backdrop-blur-xl">
            <CheckCircle2 className="shrink-0 text-secondary" size={18} />
            <span>Trusted for fast-moving startup and business website launches.</span>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {trustIndicators.map((item) => (
              <div key={item} className="flex items-center gap-3 border-l border-secondary/40 bg-white/[0.035] px-4 py-3 text-sm text-accent backdrop-blur-md">
                <CheckCircle2 className="shrink-0 text-secondary" size={17} />
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 28 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.08, ease: "easeOut" }}
          className="relative"
        >
          <ChromeFrame>
            <div className="relative min-h-[560px] overflow-hidden p-5 md:p-6">
              <div className="absolute inset-0 bg-[linear-gradient(150deg,rgba(26,111,255,0.2),transparent_40%),linear-gradient(35deg,rgba(77,163,255,0.12),transparent_55%)]" />
              <div className="relative grid gap-4">
                <div className="rounded-2xl border border-secondary/25 bg-[#020614]/70 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-secondary">Agency command</p>
                      <h2 className="mt-4 max-w-md text-4xl font-semibold leading-tight text-text">
                        Design, code and launch aligned in one operating system.
                      </h2>
                    </div>
                    <span className="hidden size-16 place-items-center rounded-2xl border border-secondary/30 bg-primary/15 text-secondary sm:grid">
                      <Layers3 size={28} />
                    </span>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {["Strategy", "Interface", "Launch"].map((item, index) => (
                    <motion.div
                      key={item}
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 4, delay: index * 0.35, repeat: Infinity, ease: "easeInOut" }}
                      className="rounded-2xl border border-line bg-white/[0.055] p-4 backdrop-blur-xl"
                    >
                      <p className="font-mono text-[10px] text-secondary">0{index + 1}</p>
                      <p className="mt-9 text-lg font-semibold text-text">{item}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
                  <div className="rounded-2xl border border-line bg-white/[0.05] p-5">
                    <Gem className="text-secondary" size={22} />
                    <p className="mt-16 text-3xl font-semibold leading-tight text-text">Premium build bar</p>
                    <p className="mt-3 text-sm leading-6 text-accent">Luxury agency presentation without fake vanity metrics.</p>
                  </div>
                  <div className="rounded-2xl border border-line bg-[#020614]/72 p-5 font-mono text-xs leading-7 text-accent">
                    <p><span className="text-secondary">const</span> partner = &quot;ARYONIX&quot;;</p>
                    <p><span className="text-secondary">await</span> strategy.design.build.launch();</p>
                    <p className="text-emerald-200">status: enterprise_ready</p>
                    <div className="mt-6 space-y-3">
                      {["Brand system", "Product UX", "Production QA"].map((item) => (
                        <div key={item}>
                          <div className="mb-1 flex justify-between">
                            <span>{item}</span>
                            <span className="text-secondary">ready</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-white/10">
                            <div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ChromeFrame>
        </motion.div>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="relative border-y border-line bg-white/[0.025] py-20" id="trust">
      <div className="container-shell">
        <SectionHeader
          label="Trust indicators"
          title="Built for serious launches, not vanity metrics."
          description="ARYONIX focuses on the practical signals startups and businesses actually need: speed, mobile polish, search visibility, scalability and support."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {trustFeatures.map((item, index) => (
          <motion.div
            key={item.title}
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={sectionViewport}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="bg-[#050b20]/95 p-6"
          >
            <item.icon className="text-secondary" size={22} />
            <h3 className="mt-8 text-2xl font-semibold text-text">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-accent">{item.detail}</p>
          </motion.div>
        ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <section className="relative overflow-hidden py-28" id="services">
      <div className="container-shell">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <SectionHeader
            label="Services"
            title="Premium services shaped for serious business outcomes."
            description="Every engagement is packaged around strategy, aesthetic authority, responsive execution and a clean path to launch."
          />
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={sectionViewport}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="rounded-2xl border border-line bg-white/[0.04] p-5 backdrop-blur-xl"
          >
            <p className="text-lg leading-8 text-text/90">
              ARYONIX is built for founders and businesses that need more than a pretty page: positioning, UX, engineering and launch discipline working as one system.
            </p>
          </motion.div>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={sectionViewport}
              transition={{ duration: 0.52, delay: index * 0.04 }}
              className="group min-h-[360px] bg-[#050b20]/95 p-6 transition duration-300 hover:bg-[#071333]"
            >
              <div className="flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-[52px] place-items-center rounded-xl border border-secondary/25 bg-primary/12 text-secondary shadow-[0_0_30px_rgba(26,111,255,0.18)]">
                    <service.icon size={24} />
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-secondary/80">{service.metric}</span>
                </div>
                <h3 className="mt-10 text-3xl font-semibold leading-tight tracking-[-0.015em] text-text">{service.title}</h3>
                <p className="mt-5 text-sm leading-7 text-accent">{service.description}</p>
                <div className="mt-auto pt-8">
                  <button
                    type="button"
                    onClick={() => setSelectedService(service)}
                    className="inline-flex h-11 items-center justify-center rounded-xl border border-secondary/35 bg-primary/10 px-4 text-sm font-semibold text-text transition hover:border-secondary hover:bg-primary/20"
                  >
                    Learn More <ArrowUpRight className="ml-2" size={16} />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
      <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
    </section>
  );
}

function PricingSection() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-white/[0.025] py-28" id="pricing">
      <div className="container-shell">
        <SectionHeader
          label="Pricing"
          title="Simple packages for clear buying decisions."
          description="Start with the engagement level that matches your current business stage. Every package is scoped through a quote before work begins."
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {pricingPackages.map((item, index) => (
            <motion.article
              key={item.name}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={sectionViewport}
              transition={{ duration: 0.55, delay: index * 0.06 }}
              className={`rounded-2xl border p-6 backdrop-blur-xl ${
                index === 1
                  ? "border-secondary/45 bg-primary/[0.13] shadow-glow"
                  : "border-line bg-[#050b20]/88"
              }`}
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-secondary">{item.bestFor}</p>
              <h3 className="mt-6 text-3xl font-semibold text-text">{item.name}</h3>
              <p className="mt-4 text-sm leading-7 text-accent">{item.detail}</p>
              <div className="mt-8 grid gap-3">
                {item.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 rounded-xl border border-line bg-white/[0.035] px-3 py-2 text-sm text-accent">
                    <CheckCircle2 className="shrink-0 text-secondary" size={16} />
                    {feature}
                  </div>
                ))}
              </div>
              <Button href="/contact" className="mt-8 h-12 w-full">
                Get Quote <ArrowRight className="ml-2" size={17} />
              </Button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioSection() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-white/[0.025] py-28" id="portfolio">
      <div className="container-shell">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <SectionHeader
            label="Case studies"
            title="Portfolio systems with the weight of real product thinking."
            description="Each project is presented as proof of interface craft, workflow clarity and production execution."
          />
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={sectionViewport}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="rounded-2xl border border-line bg-white/[0.04] p-5 text-lg leading-8 text-text/90"
          >
            Real project surfaces with screenshots, descriptions, stack decisions, live demos and GitHub proof paths.
          </motion.div>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={sectionViewport}
              transition={{ duration: 0.58, delay: index * 0.08 }}
              className="group overflow-hidden rounded-2xl border border-line bg-[#050b20]/85 backdrop-blur-xl"
            >
              <Link href={`/portfolio/${project.slug}`} className="block">
                <div className="relative aspect-[16/10] overflow-hidden bg-[#020614]">
                  {project.screenshot ? (
                    <Image
                      src={project.screenshot}
                      alt={`${project.title} screenshot`}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover object-top opacity-[0.88] transition duration-700 group-hover:scale-[1.035] group-hover:opacity-100"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020614] via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-secondary">{project.category}</p>
                    <h3 className="mt-3 text-3xl font-semibold text-text md:text-4xl">{project.title}</h3>
                  </div>
                </div>
              </Link>
              <div className="p-6">
                <p className="text-sm leading-7 text-accent">{project.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span key={item} className="rounded-full border border-secondary/20 bg-secondary/[0.06] px-3 py-1 text-xs text-accent">
                      {item}
                    </span>
                  ))}
                </div>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Button href={`/portfolio/${project.slug}`} className="h-11">
                    View Case Study <ArrowUpRight className="ml-2" size={16} />
                  </Button>
                  <Button href={project.live} variant="secondary" className="h-11">
                    Live Demo <ArrowUpRight className="ml-2" size={16} />
                  </Button>
                  <Button href={project.github} variant="secondary" className="h-11">
                    GitHub <Code2 className="ml-2" size={16} />
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="relative overflow-hidden py-28" id="process">
      <div className="container-shell">
        <SectionHeader
          label="Process"
          title="A calm production timeline from first idea to live platform."
          description="The work is staged so strategy, design, engineering and launch never drift apart."
          align="center"
        />
        <div className="relative mt-16">
          <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-secondary/0 via-secondary/45 to-secondary/0 md:block lg:left-1/2" />
          <motion.div
            className="absolute left-6 top-0 hidden w-px origin-top bg-gradient-to-b from-primary via-secondary to-primary shadow-[0_0_28px_rgba(77,163,255,0.55)] md:block lg:left-1/2"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={sectionViewport}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
          <div className="grid gap-6">
            {agencyProcess.map((step, index) => (
              <motion.article
                key={step.label}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={sectionViewport}
                transition={{ duration: 0.58, delay: index * 0.06 }}
                className="relative grid gap-5 md:grid-cols-[72px_1fr] lg:grid-cols-[1fr_88px_1fr]"
              >
                <div className={`${index % 2 === 1 ? "lg:col-start-3" : "lg:col-start-1"} rounded-2xl border border-line bg-white/[0.04] p-6 backdrop-blur-xl`}>
                  <p className="font-mono text-xs uppercase tracking-[0.26em] text-secondary">0{index + 1} / {step.label}</p>
                  <h3 className="mt-4 text-3xl font-semibold text-text">{step.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-accent">{step.detail}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {step.outputs.map((item) => (
                      <span key={item} className="rounded-full border border-line bg-white/[0.035] px-3 py-1 text-xs text-accent">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="absolute left-0 top-6 hidden md:static md:grid md:size-14 md:place-items-center md:rounded-2xl md:border md:border-secondary/35 md:bg-primary/15 md:text-secondary md:shadow-glow lg:col-start-2">
                  <step.icon size={22} />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-white/[0.025] py-28" id="testimonials">
      <div className="container-shell">
        <SectionHeader
          label="Trust"
          title="Premium delivery should feel structured, sharp and quietly confident."
          description="ARYONIX presents work with the confidence of a senior agency: clear decisions, strong visuals and technical handoff discipline."
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.figure
              key={testimonial.name}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={sectionViewport}
              transition={{ duration: 0.54, delay: index * 0.06 }}
              className="rounded-2xl border border-line bg-[#050b20]/88 p-6 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="grid size-12 place-items-center rounded-xl border border-secondary/25 bg-primary/12 text-lg font-semibold text-secondary">
                  {testimonial.name.slice(0, 1)}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">{testimonial.signal}</span>
              </div>
              <blockquote className="mt-10 text-xl leading-9 text-text/95">
                &quot;{testimonial.quote}&quot;
              </blockquote>
              <figcaption className="mt-8 border-t border-line pt-5">
                <p className="font-semibold text-text">{testimonial.name}</p>
                <p className="mt-1 text-sm text-accent">{testimonial.role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="relative overflow-hidden py-28" id="contact">
      <div className="container-shell">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={sectionViewport}
          transition={{ duration: 0.65 }}
          className="relative overflow-hidden rounded-2xl border border-secondary/30 bg-[linear-gradient(135deg,rgba(26,111,255,0.26),rgba(5,11,32,0.9)_42%,rgba(77,163,255,0.13))] p-6 shadow-[0_38px_140px_rgba(0,0,0,0.48)] md:p-12"
        >
          <div className="grid-mask absolute inset-0 opacity-35" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_0.68fr] lg:items-end">
            <div>
              <Sparkles className="text-secondary" size={28} />
              <h2 className="mt-7 max-w-4xl text-balance text-4xl font-semibold leading-[0.98] tracking-[-0.02em] text-text md:text-7xl">
                Ready to make ARYONIX-level craft the first thing your customers feel?
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-accent md:text-lg">
                Start with a focused conversation. Leave with a sharper product direction, a clean execution path and a website that looks built for serious budgets.
              </p>
            </div>
            <div className="grid gap-3">
              <Button href="/contact" className="h-[52px] px-6">
                Start Project <ArrowRight className="ml-2" size={17} />
              </Button>
              <Button href={siteConfig.social.whatsapp.href} variant="secondary" className="h-[52px] px-6">
                Book Consultation <MessageCircle className="ml-2" size={17} />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function PremiumAgencyHome() {
  return (
    <>
      <HeroSection />
      <TrustSection />
      <ServicesSection />
      <PricingSection />
      <PortfolioSection />
      <ProcessSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
