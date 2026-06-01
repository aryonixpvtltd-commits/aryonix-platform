import {
  ArrowUpRight,
  Brush,
  Code2,
  Database,
  Gauge,
  GitBranch,
  LayoutDashboard,
  LockKeyhole,
  Palette,
  Rocket,
  ShieldCheck,
  Sparkles,
  Wrench,
  Zap
} from "lucide-react";

export const trustedSignals = [
  "Startup Launches",
  "Founder Brands",
  "Business Websites",
  "SaaS Platforms",
  "Portfolio Systems",
  "Product Teams"
];

export const services = [
  {
    title: "Web Design",
    description:
      "High-trust websites with sharp layouts, responsive interaction states and brand systems that feel established from the first screen.",
    metric: "Brand-first",
    icon: Brush
  },
  {
    title: "Full Stack Development",
    description:
      "Production-ready apps with clean APIs, secure data flows, dashboards and scalable code foundations.",
    metric: "App-ready",
    icon: Code2
  },
  {
    title: "UI/UX Design",
    description:
      "Interface architecture, user journeys, wireframes, prototypes and design systems built around business outcomes.",
    metric: "UX systems",
    icon: Palette
  },
  {
    title: "Business Websites",
    description:
      "Premium company sites that communicate credibility, explain the offer clearly and convert serious visitors.",
    metric: "Lead-focused",
    icon: LayoutDashboard
  },
  {
    title: "Portfolio Websites",
    description:
      "Distinct creator and professional portfolios with case-study storytelling, editorial pacing and optimized media.",
    metric: "Story-led",
    icon: Sparkles
  },
  {
    title: "Website Maintenance",
    description:
      "Ongoing performance tuning, content updates, security checks, backups and support after launch.",
    metric: "Always-on",
    icon: Wrench
  }
];

export const projects = [
  {
    title: "Smart Health Portal",
    category: "Healthcare Platform",
    description:
      "A diagnostic and safety portal with patient login, vitals capture, symptom screening, admin monitoring, patient management, alerts and health analytics.",
    result: "Patient + admin workflows",
    accent: "from-teal-300 to-cyan-700",
    stack: ["HTML", "CSS", "JavaScript", "Dashboard UX", "Responsive UI"],
    live: "/demos/smart-health-portal.html",
    github: "https://github.com/aryonixpvtltd-commits",
    screenshot: "/portfolio/smart-health-01.png",
    screenshots: [
      "/portfolio/smart-health-01.png",
      "/portfolio/smart-health-02.png",
      "/portfolio/smart-health-03.png",
      "/portfolio/smart-health-04.png",
      "/portfolio/smart-health-05.png",
      "/portfolio/smart-health-06.png",
      "/portfolio/smart-health-07.png",
      "/portfolio/smart-health-08.png"
    ]
  },
  {
    title: "Power Machine Pro",
    category: "Fitness SaaS",
    description:
      "A gym management platform for membership plans, biometric-style attendance flows, live admin dashboards, member portals and operational reporting.",
    result: "Live gym operations",
    accent: "from-red-400 to-orange-700",
    stack: ["HTML", "CSS", "JavaScript", "Admin Portal", "Membership UX"],
    live: "/demos/powermachinepro.html",
    github: "https://github.com/aryonixpvtltd-commits",
    screenshot: "/portfolio/power-machine-01.png",
    screenshots: [
      "/portfolio/power-machine-01.png",
      "/portfolio/power-machine-02.png",
      "/portfolio/power-machine-03.png",
      "/portfolio/power-machine-04.png",
      "/portfolio/power-machine-05.png",
      "/portfolio/power-machine-06.png",
      "/portfolio/power-machine-07.png"
    ]
  }
];

export const process = [
  {
    label: "Design",
    title: "Strategy, UX and visual direction",
    detail:
      "We translate the business goal into page architecture, user flows, content priority and a premium interface system.",
    icon: Palette,
    outputs: ["UX map", "Visual system", "Responsive prototype"]
  },
  {
    label: "Develop",
    title: "Full-stack production build",
    detail:
      "We build reusable components, API routes, authentication, dashboards and data models with performance budgets from day one.",
    icon: GitBranch,
    outputs: ["Next.js app", "API layer", "Auth and data"]
  },
  {
    label: "Deploy",
    title: "Launch, measure and improve",
    detail:
      "We ship the product, connect measurement, optimize Core Web Vitals and keep the system ready for future growth.",
    icon: Rocket,
    outputs: ["Production launch", "SEO setup", "Optimization loop"]
  }
];

export const reasons = [
  {
    title: "Senior-level execution",
    description: "Strategy, design and engineering decisions are handled as one product system.",
    icon: ShieldCheck
  },
  {
    title: "Performance-first builds",
    description: "Fast pages, clean bundles, image discipline and Core Web Vitals awareness.",
    icon: Gauge
  },
  {
    title: "Premium visual craft",
    description: "Sharp typography, subtle motion, precise spacing and a brand-grade interface.",
    icon: Sparkles
  },
  {
    title: "Platform-ready architecture",
    description: "Auth, dashboards, data models and admin surfaces are planned for real operations.",
    icon: Database
  },
  {
    title: "Secure client workflows",
    description: "Role-based access patterns and private client portals for delivery visibility.",
    icon: LockKeyhole
  },
  {
    title: "Launch momentum",
    description: "Clear delivery phases from first concept to deployment and iteration.",
    icon: Zap
  }
];

export const testimonials = [
  {
    quote:
      "Aryonix took our rough idea and turned it into a polished business platform that actually feels premium.",
    name: "Aarav Mehta",
    role: "Founder, Finora",
    signal: "Business platform"
  },
  {
    quote:
      "The delivery felt structured, fast and deliberate. Every screen had a business reason behind it.",
    name: "Ishita Rao",
    role: "Product Lead",
    signal: "SaaS dashboard"
  },
  {
    quote:
      "Their design taste and engineering clarity made our brand look far more established from day one.",
    name: "Rohan Kulkarni",
    role: "Creator",
    signal: "Portfolio system"
  }
];

export const stats = [
  { value: "95+", label: "Lighthouse target", detail: "Performance-led builds from the first sprint" },
  { value: "6", label: "Core services", detail: "Design, development, UI/UX, sites and care" },
  { value: "3", label: "Delivery phases", detail: "Design, develop and deploy without chaos" },
  { value: "24/7", label: "Platform mindset", detail: "Built for reliability after the launch" }
];

export const footerLinks = [
  {
    title: "Studio",
    links: [
      { label: "Services", href: "/services" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" }
    ]
  },
  {
    title: "Platform",
    links: [
      { label: "Client Login", href: "/login" },
      { label: "Register", href: "/register" },
      { label: "Client Dashboard", href: "/dashboard" },
      { label: "Admin", href: "/admin" }
    ]
  }
];

export const footerCapabilities = [
  { label: "Next.js", icon: Code2 },
  { label: "MongoDB", icon: Database },
  { label: "NextAuth", icon: LockKeyhole },
  { label: "Cloudinary", icon: ArrowUpRight }
];
