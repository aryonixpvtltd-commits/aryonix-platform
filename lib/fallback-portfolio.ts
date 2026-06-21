import type { PortfolioRecord } from "@/components/portfolio/portfolio-types";

export const fallbackPortfolioProjects: PortfolioRecord[] = [
  {
    id: "student-toolkit",
    title: "Student Toolkit",
    slug: "student-toolkit",
    summary: "Study planner, notes, tasks and academic utilities in one focused workspace.",
    description:
      "A student productivity interface built around fast planning, useful academic utilities and a calm responsive experience for everyday study workflows.",
    challenge:
      "Students often jump between notes, planners, calculators and reminders, which makes their academic workflow fragmented.",
    solution:
      "ARYONIX shaped a consolidated toolkit concept with clear modules for planning, notes and tasks, supported by a dark polished interface system.",
    impact:
      "The result presents a credible student-first product direction that can expand into reminders, dashboard widgets and academic utilities.",
    year: 2026,
    client: "Aryonix Lab",
    category: { id: "student-productivity", name: "Student Productivity", slug: "student-productivity" },
    coverImage: "/portfolio/student-toolkit.svg",
    liveUrl: "/demos/student-toolkit.html",
    githubUrl: "https://github.com/aryonixpvtltd-commits",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Responsive UI"],
    screenshots: [{ url: "/portfolio/student-toolkit.svg", alt: "Student Toolkit project screenshot" }]
  },
  {
    id: "cgpa-calculator",
    title: "CGPA Calculator",
    slug: "cgpa-calculator",
    summary: "Responsive academic calculator with clear semester inputs and instant CGPA output.",
    description:
      "A clean calculator experience designed for students who need quick GPA and CGPA planning without interface clutter.",
    challenge:
      "Academic calculators often feel utilitarian and confusing on mobile, especially when forms expand across multiple semesters.",
    solution:
      "ARYONIX designed a direct calculation flow with readable inputs, strong validation states and a polished results panel.",
    impact:
      "The interface makes academic grade planning easier to understand and more trustworthy on desktop and mobile.",
    year: 2026,
    client: "Aryonix Lab",
    category: { id: "education-tool", name: "Education Tool", slug: "education-tool" },
    coverImage: "/portfolio/cgpa-calculator.svg",
    liveUrl: "/demos/cgpa-calculator.html",
    githubUrl: "https://github.com/aryonixpvtltd-commits",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Form UX"],
    screenshots: [{ url: "/portfolio/cgpa-calculator.svg", alt: "CGPA Calculator project screenshot" }]
  },
  {
    id: "aqi-dashboard",
    title: "AQI Dashboard",
    slug: "aqi-dashboard",
    summary: "Civic-tech air-quality dashboard for city rankings, AQI categories and export-ready data.",
    description:
      "A data-rich dashboard concept for scanning city AQI, understanding pollution severity and comparing civic air-quality patterns.",
    challenge:
      "Public air-quality data needs to be readable, fast and responsible across both visual dashboards and dense mobile layouts.",
    solution:
      "ARYONIX structured a civic-tech experience with ranking cards, category context, comparison views and export-oriented workflows.",
    impact:
      "The dashboard direction supports practical environmental awareness with a premium product-level interface.",
    year: 2026,
    client: "Aryonix Lab",
    category: { id: "civic-data", name: "Civic Data Dashboard", slug: "civic-data-dashboard" },
    coverImage: "/portfolio/aqi-dashboard.svg",
    liveUrl: "/demos/aqi-dashboard.html",
    githubUrl: "https://github.com/aryonixpvtltd-commits",
    techStack: ["Next.js", "TypeScript", "Recharts", "CSV Export", "Responsive Data UI"],
    screenshots: [{ url: "/portfolio/aqi-dashboard.svg", alt: "AQI Dashboard project screenshot" }]
  },
  {
    id: "aryonix-platform",
    title: "Aryonix Platform",
    slug: "aryonix-platform",
    summary: "The ARYONIX production platform with public pages, admin workflows, uploads and enquiries.",
    description:
      "A premium agency platform combining marketing pages, portfolio management, Cloudinary uploads, MongoDB enquiries and protected admin operations.",
    challenge:
      "A premium agency needs more than a landing page: it needs an operational system for proof, leads and ongoing content management.",
    solution:
      "ARYONIX built a Next.js platform with public-facing trust sections, project management, upload workflows and admin enquiry tracking.",
    impact:
      "The platform gives the agency a stronger public presence and a practical backend for managing inbound business.",
    year: 2026,
    client: "ARYONIX",
    category: { id: "agency-platform", name: "Agency Platform", slug: "agency-platform" },
    coverImage: "/portfolio/aryonix-platform.svg",
    liveUrl: "/",
    githubUrl: "https://github.com/aryonixpvtltd-commits",
    techStack: ["Next.js 15", "TypeScript", "MongoDB", "Prisma", "Cloudinary"],
    screenshots: [{ url: "/portfolio/aryonix-platform.svg", alt: "Aryonix Platform project screenshot" }]
  }
];

export function getFallbackPortfolioProject(slug: string) {
  return fallbackPortfolioProjects.find((project) => project.slug === slug) ?? null;
}
