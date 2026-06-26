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
    slug: "figma-react-assignment",
    title: "Figma React Assignment",
    category: "Agency Website",
    description:
      "A polished React implementation of an editorial agency website with premium spacing, service storytelling, testimonials and a clean conversion path.",
    problem: "The design needed to feel close to a real agency landing page while staying responsive, readable and faithful to the Figma direction.",
    solution: "ARYONIX translated the visual system into a sharp React experience with large typography, service sections, proof blocks and smooth page rhythm.",
    results: "The finished site demonstrates front-end execution, design fidelity and a client-ready agency presentation style.",
    result: "Editorial agency landing page",
    accent: "from-violet-300 to-blue-700",
    stack: ["React", "TypeScript", "Responsive UI", "Vercel"],
    live: "https://figma-react-assignment-mocha.vercel.app/",
    github: "https://github.com/aryonixpvtltd-commits/figma-react-assignment",
    screenshot: "/portfolio/figma-react-assignment-hero.png",
    screenshots: [
      "/portfolio/figma-react-assignment-hero.png",
      "/portfolio/figma-react-assignment-process.png",
      "/portfolio/figma-react-assignment-team.png",
      "/portfolio/figma-react-assignment-case.png",
      "/portfolio/figma-react-assignment-services.png",
      "/portfolio/figma-react-assignment-testimonials.png",
      "/portfolio/figma-react-assignment-footer.png"
    ]
  },
  {
    slug: "neural-city-aqi-dashboard",
    title: "Neural City AQI Dashboard",
    category: "Civic Data Dashboard",
    description:
      "A responsive public-data dashboard for comparing Indian city AQI, ranking pollution levels and explaining dataset methodology clearly.",
    problem: "Air-quality data can be difficult to scan when rankings, categories, comparisons and methodology are separated.",
    solution: "ARYONIX built a clear dashboard with city rankings, AQI cards, chart comparison, dataset notes and responsive data layouts.",
    results: "The dashboard turns environmental data into a presentation-ready civic insight surface for citizens and municipal stakeholders.",
    result: "Civic analytics surface",
    accent: "from-emerald-300 to-cyan-700",
    stack: ["Next.js", "TypeScript", "Recharts", "Data Visualization", "Vercel"],
    live: "https://neural-city-aqi-dashboard.vercel.app/",
    github: "https://github.com/aryonixpvtltd-commits/neural-city-aqi-dashboard",
    screenshot: "/portfolio/aqi-dashboard-hero.png",
    screenshots: [
      "/portfolio/aqi-dashboard-hero.png",
      "/portfolio/aqi-dashboard-ranking.png",
      "/portfolio/aqi-dashboard-methodology.png"
    ]
  },
  {
    slug: "academic-gpa-cgpa-calculator",
    title: "Academic GPA & CGPA Calculator",
    category: "Education Tool",
    description:
      "A student-focused GPA and CGPA calculator with grading-scale selection, semester inputs, validation and instant academic results.",
    problem: "Students need fast grade planning, but many calculators are cluttered, unclear on mobile or missing university-specific grading context.",
    solution: "ARYONIX designed a focused calculator flow with clean inputs, browser-saved entries and readable result cards.",
    results: "The tool gives students a faster way to estimate semester GPA, cumulative CGPA and percentage with confidence.",
    result: "Academic calculation flow",
    accent: "from-sky-300 to-blue-700",
    stack: ["React", "TypeScript", "Tailwind CSS", "Form UX"],
    live: "https://academic-gpa-cgpa-calculator.vercel.app/",
    github: "https://github.com/aryonixpvtltd-commits/academic-gpa-cgpa-calculator",
    screenshot: "/portfolio/academic-gpa-cgpa-calculator.png",
    screenshots: ["/portfolio/academic-gpa-cgpa-calculator.png"]
  },
  {
    slug: "student-toolkit",
    title: "Student Toolkit",
    category: "Student Productivity",
    description:
      "A premium academic dashboard with CGPA, attendance, percentage, study planner and exam countdown tools in one student workspace.",
    problem: "Students often jump between separate calculators and planners, which makes academic tracking scattered and repetitive.",
    solution: "ARYONIX built a dark, responsive toolkit with five focused utilities, instant result cards, copy actions and clean tool navigation.",
    results: "The final toolkit feels fast, modern and practical for everyday academic planning without login friction.",
    result: "Five-tool academic workspace",
    accent: "from-teal-300 to-emerald-800",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Client-side Tools"],
    live: "https://student-toolkit-two.vercel.app/",
    github: "https://github.com/aryonixpvtltd-commits/student-toolkit",
    screenshot: "/portfolio/student-toolkit-hero.png",
    screenshots: [
      "/portfolio/student-toolkit-hero.png",
      "/portfolio/student-toolkit-tools.png",
      "/portfolio/student-toolkit-cgpa.png",
      "/portfolio/student-toolkit-attendance.png",
      "/portfolio/student-toolkit-percentage.png",
      "/portfolio/student-toolkit-study-planner.png",
      "/portfolio/student-toolkit-countdown.png",
      "/portfolio/student-toolkit-trust.png",
      "/portfolio/student-toolkit-about.png",
      "/portfolio/student-toolkit-faq.png"
    ]
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
      { label: "Cost Estimator", href: "/estimate" },
      { label: "Website Analyzer", href: "/analyzer" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" }
    ]
  },
  {
    title: "Operations",
    links: [
      { label: "Start Project", href: "/contact" },
      { label: "Get Estimate", href: "/estimate" },
      { label: "Analyze Website", href: "/analyzer" },
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
