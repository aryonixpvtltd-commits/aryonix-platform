"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Clock3, IndianRupee, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { SectionHeading } from "@/components/section-heading";
import { services } from "@/lib/content";
import { Button } from "@/components/ui/button";

type Service = (typeof services)[number];

function ServiceModal({
  service,
  onClose
}: {
  service: Service | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!service) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
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
          className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-background/82 px-4 py-8 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onMouseDown={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-modal-title"
        >
          <motion.div
            className="panel relative w-full max-w-5xl overflow-hidden rounded-2xl border-secondary/30 p-0 shadow-[0_0_80px_rgba(26,111,255,0.22)]"
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 14 }}
            transition={{ duration: 0.26, ease: "easeOut" }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary to-transparent" />
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-secondary/16 blur-3xl" />
            <div className="absolute -bottom-28 left-10 h-72 w-72 rounded-full bg-primary/14 blur-3xl" />

            <div className="relative grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
              <div className="border-b border-line p-6 sm:p-8 lg:border-b-0 lg:border-r">
                <div className="flex items-start justify-between gap-5">
                  <div className="grid size-14 place-items-center rounded-2xl border border-secondary/30 bg-primary/12 text-secondary shadow-[0_0_34px_rgba(26,111,255,0.2)]">
                    <service.icon size={26} />
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="grid size-10 place-items-center rounded-xl border border-line bg-white/[0.04] text-accent transition hover:border-secondary/60 hover:text-text"
                    aria-label="Close service details"
                  >
                    <X size={18} />
                  </button>
                </div>

                <p className="mt-8 font-mono text-xs uppercase tracking-[0.24em] text-secondary">
                  {service.metric}
                </p>
                <h2 id="service-modal-title" className="mt-4 text-4xl font-semibold text-text sm:text-5xl">
                  {service.title}
                </h2>
                <p className="mt-5 text-sm leading-7 text-accent sm:text-base sm:leading-8">
                  {service.detailedDescription}
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-line bg-white/[0.04] p-4">
                    <div className="flex items-center gap-2 text-secondary">
                      <Clock3 size={17} />
                      <span className="text-sm font-semibold text-text">Timeline</span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-accent">{service.timeline}</p>
                  </div>
                  <div className="rounded-2xl border border-line bg-white/[0.04] p-4">
                    <div className="flex items-center gap-2 text-secondary">
                      <IndianRupee size={17} />
                      <span className="text-sm font-semibold text-text">Pricing</span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-accent">{service.pricing}</p>
                  </div>
                </div>

                <Button href="/contact" className="mt-8 w-full sm:w-auto">
                  Start Project <ArrowUpRight className="ml-2" size={16} />
                </Button>
              </div>

              <div className="relative grid gap-6 p-6 sm:p-8">
                <div>
                  <div className="mb-4 flex items-center gap-2">
                    <Sparkles className="text-secondary" size={18} />
                    <h3 className="text-xl font-semibold text-text">Key features</h3>
                  </div>
                  <div className="grid gap-3">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex gap-3 rounded-xl border border-line bg-white/[0.035] p-3">
                        <CheckCircle2 className="mt-0.5 shrink-0 text-secondary" size={17} />
                        <p className="text-sm leading-6 text-accent">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="rounded-2xl border border-line bg-white/[0.04] p-5">
                    <h3 className="text-lg font-semibold text-text">Technologies used</h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {service.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-full border border-secondary/20 bg-secondary/[0.07] px-3 py-1 text-xs text-accent"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-line bg-white/[0.04] p-5">
                    <h3 className="text-lg font-semibold text-text">Ideal clients</h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {service.idealClients.map((client) => (
                        <span
                          key={client}
                          className="rounded-full border border-line bg-white/[0.04] px-3 py-1 text-xs text-accent"
                        >
                          {client}
                        </span>
                      ))}
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

export function ServicesSection() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <section className="relative overflow-hidden py-24" id="services">
      <div className="absolute left-0 top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute right-0 bottom-16 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
      <div className="container-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.55 }}
        >
          <SectionHeading
            eyebrow="Services"
            title="Premium digital services for brands that need serious execution."
            description="ARYONIX combines visual craft, full-stack engineering and launch discipline to create websites and platforms that feel refined, fast and built for growth."
          />
        </motion.div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="panel group relative min-h-[300px] overflow-hidden rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:border-secondary/50 hover:shadow-[0_0_38px_rgba(26,111,255,0.22)]"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/70 to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="absolute -right-12 -top-12 size-36 rounded-full bg-primary/10 blur-2xl transition group-hover:bg-primary/20" />
              <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-primary/10 to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="relative flex h-full flex-col">
                <div className="mb-8 flex items-center justify-between">
                  <div className="grid size-[52px] place-items-center rounded-xl border border-secondary/25 bg-primary/10 text-secondary shadow-[0_0_34px_rgba(26,111,255,0.18)]">
                    <service.icon size={24} />
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-secondary/85">
                    {service.metric}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-text">{service.title}</h3>
                <p className="mt-4 text-sm leading-6 text-accent">{service.description}</p>
                <div className="mt-auto pt-8">
                  <button
                    type="button"
                    onClick={() => setSelectedService(service)}
                    className="mb-5 inline-flex h-10 items-center justify-center rounded-xl border border-line bg-white/[0.04] px-4 text-sm font-semibold text-accent transition hover:border-secondary/60 hover:bg-primary/10 hover:text-text"
                  >
                    Learn More <ArrowUpRight className="ml-2" size={15} />
                  </button>
                  <div className="h-1 rounded-full bg-white/10">
                    <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-primary to-secondary opacity-70 transition group-hover:w-full" />
                  </div>
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
