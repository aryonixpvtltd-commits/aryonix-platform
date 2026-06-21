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
    icon: Brush,
    detailedDescription:
      "Aryonix web design is built for founders, startups and local businesses that need a website to feel credible the moment a visitor lands. The work starts with positioning: what the customer should understand first, what makes the offer trustworthy, and which sections must guide them toward action. From there, we design a premium interface system with sharp typography, responsive spacing, conversion-focused calls to action and motion that supports the message instead of distracting from it. Every page is planned for mobile, tablet and desktop so the experience feels intentional everywhere. We avoid generic agency templates and instead create a design direction that matches the brand, industry and goal of the business. The result is a website that looks modern, loads cleanly, explains the offer fast and gives visitors confidence to enquire, book or buy.",
    features: [
      "Homepage and inner page design direction",
      "Responsive desktop, tablet and mobile layouts",
      "Conversion-focused section structure",
      "Brand-aligned typography, spacing and visuals",
      "Interactive states for buttons, cards and forms"
    ],
    technologies: ["Figma", "Next.js", "Tailwind CSS", "Framer Motion", "Responsive Design"],
    idealClients: ["Startups", "Local businesses", "Founder-led brands", "Service companies"],
    timeline: "1-2 weeks for a focused website design system",
    pricing: "Starting at ₹15,000"
  },
  {
    title: "Full Stack Development",
    description:
      "Production-ready apps with clean APIs, secure data flows, dashboards and scalable code foundations.",
    metric: "App-ready",
    icon: Code2,
    detailedDescription:
      "Full Stack Development is for businesses that need more than a static website. Aryonix builds complete digital products with frontend interfaces, backend APIs, database models, admin dashboards and deployment-ready architecture. The process begins by mapping the product workflow: users, roles, forms, data, permissions, content and operational screens. We then build a clean Next.js application with reusable components, server routes and Prisma-backed data models where needed. The focus is not just making features work, but making the system maintainable, understandable and ready for future expansion. Dashboards are designed with real operational use in mind, so admins can manage projects, enquiries, content or records without digging through code. We also pay attention to validation, error states, loading states and performance from the start. The result is a product foundation that can launch quickly while still feeling reliable and professional.",
    features: [
      "Frontend and backend implementation",
      "API routes with validation and error handling",
      "MongoDB and Prisma data models",
      "Admin dashboards and management flows",
      "Deployment-ready production structure"
    ],
    technologies: ["Next.js", "React", "TypeScript", "Node.js", "Prisma", "MongoDB"],
    idealClients: ["SaaS founders", "Dashboard products", "Internal tools", "Businesses with data workflows"],
    timeline: "3-6 weeks depending on product scope",
    pricing: "Custom Quote"
  },
  {
    title: "UI/UX Design",
    description:
      "Interface architecture, user journeys, wireframes, prototypes and design systems built around business outcomes.",
    metric: "UX systems",
    icon: Palette,
    detailedDescription:
      "Aryonix UI/UX Design focuses on making digital products easy to understand, attractive to use and aligned with business goals. Before visuals, we clarify the journey: what the user wants, what the business needs, where friction appears and which actions matter most. The work can include wireframes, product flows, dashboard layouts, mobile screens, component systems and polished high-fidelity interfaces. We design for clarity first, then layer in visual craft through hierarchy, spacing, contrast, interaction feedback and motion cues. This is especially useful for startups, SaaS products, admin panels and service platforms where the user must complete tasks without confusion. Every decision is made to reduce cognitive load and make the product feel premium, fast and trustworthy. The final output gives developers a clear blueprint and gives stakeholders a product experience they can review before engineering begins.",
    features: [
      "User journey and screen flow planning",
      "Wireframes and high-fidelity UI screens",
      "Dashboard and product interface systems",
      "Reusable component and layout patterns",
      "Prototype-ready interaction planning"
    ],
    technologies: ["Figma", "Design Systems", "Prototyping", "Responsive UX", "Accessibility Basics"],
    idealClients: ["SaaS products", "Mobile-first tools", "Dashboards", "Early-stage product teams"],
    timeline: "1-3 weeks based on number of screens",
    pricing: "Starting at ₹12,000"
  },
  {
    title: "Business Websites",
    description:
      "Premium company sites that communicate credibility, explain the offer clearly and convert serious visitors.",
    metric: "Lead-focused",
    icon: LayoutDashboard,
    detailedDescription:
      "Business Websites are built for companies that need a serious online presence, not just a digital brochure. Aryonix structures these websites around trust, clarity and lead generation. We define the offer, organize the services, highlight proof, add strong calls to action and create a visual system that makes the company feel established. This service is ideal for agencies, consultants, local service providers, B2B companies, clinics, gyms, educators and professional brands. Pages can include home, services, about, portfolio, testimonials, FAQs and contact sections. The design is premium and conversion-aware, but still easy for visitors to scan. We also make sure the site performs well on mobile, because many business enquiries start from phones. The final website helps visitors understand what you do, why they should trust you and how to contact you without friction.",
    features: [
      "Business-focused homepage structure",
      "Service pages and conversion sections",
      "Trust signals, testimonials and proof blocks",
      "Contact and enquiry form integration",
      "SEO-friendly page structure"
    ],
    technologies: ["Next.js", "Tailwind CSS", "React", "SEO Metadata", "Analytics-ready Structure"],
    idealClients: ["Service businesses", "Consultants", "B2B companies", "Local companies"],
    timeline: "2-4 weeks for a complete business website",
    pricing: "Starting at ₹20,000"
  },
  {
    title: "Portfolio Websites",
    description:
      "Distinct creator and professional portfolios with case-study storytelling, editorial pacing and optimized media.",
    metric: "Story-led",
    icon: Sparkles,
    detailedDescription:
      "Portfolio Websites are designed to make a person, studio or brand look memorable and professionally credible. Aryonix builds portfolios that go beyond a simple gallery by shaping the story behind the work: who you are, what you build, what problems you solve and why clients or employers should trust you. The structure can include a strong hero, featured work, project detail pages, skills, timeline, testimonials, social links and a direct contact path. Visual style is tailored to the personality of the creator while keeping the interface polished and easy to navigate. For designers, developers, freelancers, creators and students, a portfolio should feel like proof of taste and execution. We optimize screenshots, project cards and case study layouts so your work is easy to inspect. The result is a portfolio that feels premium, personal and built to create opportunities.",
    features: [
      "Personal brand and hero direction",
      "Featured project showcase",
      "Case study or project detail pages",
      "Skills, social links and contact sections",
      "Optimized media and responsive galleries"
    ],
    technologies: ["Next.js", "React", "Tailwind CSS", "Image Optimization", "Framer Motion"],
    idealClients: ["Developers", "Designers", "Freelancers", "Creators", "Students"],
    timeline: "1-3 weeks depending on project depth",
    pricing: "Starting at ₹10,000"
  },
  {
    title: "Website Maintenance",
    description:
      "Ongoing performance tuning, content updates, security checks, backups and support after launch.",
    metric: "Always-on",
    icon: Wrench,
    detailedDescription:
      "Website Maintenance keeps your website healthy after launch so it does not slowly become outdated, broken or slow. Aryonix supports businesses with content updates, design refinements, bug fixes, dependency checks, performance improvements and small feature additions. This service is useful when you already have a website but need someone technical to keep it reliable without rebuilding everything every month. We can update service text, add new portfolio items, improve page speed, adjust forms, fix layout issues and keep the website aligned with new business goals. Maintenance also protects the brand experience: broken links, stale content and poor mobile behavior can reduce trust quickly. With ongoing support, your website remains usable, current and ready for campaigns, enquiries and customer visits. It is the calm, practical layer that keeps the digital presence working while you focus on the business.",
    features: [
      "Content updates and page refinements",
      "Bug fixes and responsive layout repairs",
      "Performance and image optimization",
      "Form, link and interaction checks",
      "Small feature improvements after launch"
    ],
    technologies: ["Next.js", "React", "Performance Audits", "SEO Checks", "Cloudinary"],
    idealClients: ["Existing website owners", "Growing businesses", "Content-heavy brands", "Launch-stage startups"],
    timeline: "Monthly support or task-based turnaround",
    pricing: "Starting at ₹5,000/month"
  }
];

export const projects = [
  {
    slug: "student-toolkit",
    title: "Student Toolkit",
    category: "Student Productivity",
    description:
      "A focused academic utility suite for planning study work, organizing notes, managing tasks and keeping student workflows in one clean interface.",
    result: "Student workflow hub",
    accent: "from-blue-300 to-cyan-700",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Responsive UI"],
    live: "/demos/student-toolkit.html",
    github: "https://github.com/aryonixpvtltd-commits",
    screenshot: "/portfolio/student-toolkit.svg",
    screenshots: ["/portfolio/student-toolkit.svg"]
  },
  {
    slug: "cgpa-calculator",
    title: "CGPA Calculator",
    category: "Education Tool",
    description:
      "A responsive academic calculator with clear semester inputs, validation states and fast CGPA output for students who need quick grade planning.",
    result: "Academic calculation flow",
    accent: "from-sky-300 to-blue-700",
    stack: ["React", "TypeScript", "Tailwind CSS", "Form UX"],
    live: "/demos/cgpa-calculator.html",
    github: "https://github.com/aryonixpvtltd-commits",
    screenshot: "/portfolio/cgpa-calculator.svg",
    screenshots: ["/portfolio/cgpa-calculator.svg"]
  },
  {
    slug: "aqi-dashboard",
    title: "AQI Dashboard",
    category: "Civic Data Dashboard",
    description:
      "A civic-tech air-quality dashboard for ranking cities, reading AQI categories, comparing pollution patterns and exporting clean data views.",
    result: "Civic analytics surface",
    accent: "from-emerald-300 to-cyan-700",
    stack: ["Next.js", "TypeScript", "Recharts", "CSV Export", "Responsive Data UI"],
    live: "/demos/aqi-dashboard.html",
    github: "https://github.com/aryonixpvtltd-commits",
    screenshot: "/portfolio/aqi-dashboard.svg",
    screenshots: ["/portfolio/aqi-dashboard.svg"]
  },
  {
    slug: "aryonix-platform",
    title: "Aryonix Platform",
    category: "Agency Platform",
    description:
      "The ARYONIX production platform with premium public pages, admin portfolio management, Cloudinary uploads, enquiries and MongoDB-backed workflows.",
    result: "Agency operating system",
    accent: "from-blue-400 to-indigo-700",
    stack: ["Next.js 15", "TypeScript", "MongoDB", "Prisma", "Cloudinary"],
    live: "/",
    github: "https://github.com/aryonixpvtltd-commits",
    screenshot: "/portfolio/aryonix-platform.svg",
    screenshots: ["/portfolio/aryonix-platform.svg"]
  }
];

export const process = [
  {
    label: "Discovery",
    title: "Discovery and project clarity",
    detail:
      "We clarify the business goal, target audience, project scope, constraints and success criteria before design begins.",
    icon: ShieldCheck,
    outputs: ["Goals", "Audience", "Scope"]
  },
  {
    label: "Strategy",
    title: "Positioning and experience strategy",
    detail:
      "We define the page architecture, conversion path, content priority and product decisions that make the experience feel focused.",
    icon: Gauge,
    outputs: ["UX map", "Content priority", "Conversion path"]
  },
  {
    label: "Design",
    title: "Premium UI direction",
    detail:
      "We create a high-trust interface system with responsive typography, visual hierarchy, motion cues and reusable components.",
    icon: Palette,
    outputs: ["Visual system", "Responsive layouts", "Interaction states"]
  },
  {
    label: "Development",
    title: "Production implementation",
    detail:
      "We build reusable Next.js components, API routes, database workflows, admin surfaces and performance-minded frontend code.",
    icon: GitBranch,
    outputs: ["Next.js app", "API layer", "Admin workflows"]
  },
  {
    label: "Testing",
    title: "QA and responsive testing",
    detail:
      "We test mobile, tablet, desktop, forms, modals, navigation, content states and deployment readiness before handoff.",
    icon: Code2,
    outputs: ["Responsive QA", "Form testing", "Build checks"]
  },
  {
    label: "Launch",
    title: "Deployment and SEO setup",
    detail:
      "We deploy the site, verify production behavior, tune metadata and make sure the final experience is ready for real visitors.",
    icon: Rocket,
    outputs: ["Production launch", "SEO setup", "Performance pass"]
  },
  {
    label: "Support",
    title: "Ongoing support and iteration",
    detail:
      "We keep the platform healthy after launch with content updates, improvements, troubleshooting and growth-focused refinements.",
    icon: Wrench,
    outputs: ["Maintenance", "Iteration", "Support"]
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
    title: "Operations",
    links: [
      { label: "Start Project", href: "/contact" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Services", href: "/services" },
      { label: "Admin Portal", href: "/admin-login" }
    ]
  }
];

export const footerCapabilities = [
  { label: "Next.js", icon: Code2 },
  { label: "MongoDB", icon: Database },
  { label: "Admin Portal", icon: LockKeyhole },
  { label: "Cloudinary", icon: ArrowUpRight }
];
