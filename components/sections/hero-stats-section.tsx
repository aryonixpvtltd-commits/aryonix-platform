"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const heroStats = [
  {
    value: 95,
    suffix: "+",
    label: "Lighthouse Target",
    detail: "Performance-first delivery"
  },
  {
    value: 6,
    suffix: "",
    label: "Core Services",
    detail: "Design, development and care"
  },
  {
    value: 3,
    suffix: "x",
    label: "Studio Workflow",
    detail: "Design. Develop. Deploy."
  },
  {
    value: 24,
    suffix: "/7",
    label: "Platform Mindset",
    detail: "Built for reliability"
  }
];

function CountUp({
  value,
  suffix
}: {
  value: number;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 1200;
    const start = performance.now();
    let frame = 0;

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
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

export function HeroStatsSection() {
  return (
    <section className="relative -mt-10 pb-16">
      <div className="container-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="panel relative overflow-hidden rounded-2xl"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/70 to-transparent" />
          <div className="absolute left-1/2 top-0 h-32 w-80 -translate-x-1/2 bg-primary/15 blur-3xl" />
          <div className="grid divide-y divide-line sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {heroStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="relative p-6 md:p-7"
              >
                <p className="text-4xl font-semibold tracking-[-0.02em] text-text md:text-5xl">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-3 text-sm font-semibold text-text/85">{stat.label}</p>
                <p className="mt-2 text-sm leading-6 text-accent">{stat.detail}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
