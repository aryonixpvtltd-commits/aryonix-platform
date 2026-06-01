"use client";

import { motion, useInView } from "framer-motion";
import { Clock3, Code2, LayoutDashboard, Smartphone } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const portfolioStats = [
  {
    value: 20,
    suffix: "+",
    label: "Projects",
    detail: "Premium websites, dashboards and product experiences.",
    icon: LayoutDashboard
  },
  {
    value: 100,
    suffix: "%",
    label: "Responsive",
    detail: "Built mobile-first across real screen sizes.",
    icon: Smartphone
  },
  {
    value: 24,
    suffix: "/7",
    label: "Support",
    detail: "Reliable after-launch help for serious brands.",
    icon: Clock3
  },
  {
    value: 5,
    suffix: "+",
    label: "Technologies",
    detail: "Modern stacks selected for speed and scale.",
    icon: Code2
  }
];

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 1250;
    const start = performance.now();
    let frame = 0;

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));

      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export function PortfolioStatsSection() {
  return (
    <section className="relative overflow-hidden bg-surface/35 pb-20">
      <div className="absolute left-1/2 top-0 h-32 w-[70%] -translate-x-1/2 rounded-full bg-secondary/10 blur-3xl" />
      <div className="container-shell">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="panel relative overflow-hidden rounded-2xl"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/70 to-transparent" />
          <div className="absolute -right-20 top-0 size-56 rounded-full bg-primary/15 blur-3xl" />
          <div className="grid divide-y divide-line sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {portfolioStats.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="group relative min-h-[220px] p-6 transition duration-300 hover:bg-white/[0.035] md:p-7"
                >
                  <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-secondary/60 to-transparent opacity-0 transition group-hover:opacity-100" />
                  <div className="mb-8 flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-xl border border-secondary/25 bg-primary/10 text-secondary transition group-hover:scale-105 group-hover:shadow-glow">
                      <Icon size={20} />
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                      0{index + 1}
                    </span>
                  </div>
                  <p className="text-5xl font-semibold tracking-[-0.03em] text-text md:text-6xl">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-4 text-base font-semibold text-text/90">{stat.label}</p>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-accent">{stat.detail}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
