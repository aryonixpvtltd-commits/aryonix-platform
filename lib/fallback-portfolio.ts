import type { PortfolioRecord } from "@/components/portfolio/portfolio-types";

export const fallbackPortfolioProjects: PortfolioRecord[] = [
  {
    id: "smart-health",
    title: "Smart Health Portal",
    slug: "smart-health-portal",
    summary: "Diagnostic and safety portal with patient vitals, symptom screening and admin alerts.",
    description:
      "Healthcare dashboard experience for patient safety checks, vitals review, symptom triage and admin monitoring.",
    challenge:
      "Healthcare teams need fast, readable intake flows that separate safe checks from urgent alerts without overwhelming the user.",
    solution:
      "Aryonix designed a focused patient portal and admin command center with clear vitals inputs, symptom chips, risk states and alert views.",
    impact:
      "The demo shows a complete safety workflow from login to patient monitoring, making the product useful as a credible healthcare platform prototype.",
    year: 2026,
    client: "Aryonix Lab",
    category: { id: "healthcare", name: "Healthcare Platform", slug: "healthcare-platform" },
    coverImage: "/portfolio/smart-health-01.png",
    liveUrl: "/demos/smart-health-portal.html",
    githubUrl: "https://github.com/aryonixpvtltd-commits",
    techStack: ["HTML", "CSS", "JavaScript", "Dashboard UX", "Responsive UI"],
    screenshots: [
      { url: "/portfolio/smart-health-01.png", alt: "Smart Health login screen" },
      { url: "/portfolio/smart-health-02.png", alt: "Smart Health patient vitals screen" },
      { url: "/portfolio/smart-health-03.png", alt: "Smart Health symptom selection screen" },
      { url: "/portfolio/smart-health-04.png", alt: "Smart Health admin login screen" },
      { url: "/portfolio/smart-health-05.png", alt: "Smart Health admin overview" },
      { url: "/portfolio/smart-health-06.png", alt: "Smart Health patient management table" },
      { url: "/portfolio/smart-health-07.png", alt: "Smart Health alerts screen" },
      { url: "/portfolio/smart-health-08.png", alt: "Smart Health analytics screen" }
    ]
  },
  {
    id: "power-machine",
    title: "Power Machine Pro",
    slug: "power-machine-pro",
    summary: "Gym management platform with membership plans, attendance workflows and admin portals.",
    description:
      "Fitness SaaS experience for live gym operations, memberships, attendance logs, member dashboards and admin control.",
    challenge:
      "A gym needs a sharper operational product than a static website: live attendance, memberships, renewals and admin visibility.",
    solution:
      "Aryonix built a dark, high-energy SaaS interface with member and admin portals, pricing plans, attendance flows and operating dashboards.",
    impact:
      "The project demonstrates full product thinking for a real local business workflow, from marketing to operations and member self-service.",
    year: 2026,
    client: "Aryonix Lab",
    category: { id: "fitness-saas", name: "Fitness SaaS", slug: "fitness-saas" },
    coverImage: "/portfolio/power-machine-01.png",
    liveUrl: "/demos/powermachinepro.html",
    githubUrl: "https://github.com/aryonixpvtltd-commits",
    techStack: ["HTML", "CSS", "JavaScript", "Admin Portal", "Membership UX"],
    screenshots: [
      { url: "/portfolio/power-machine-01.png", alt: "Power Machine Pro homepage" },
      { url: "/portfolio/power-machine-02.png", alt: "Power Machine Pro feature overview" },
      { url: "/portfolio/power-machine-03.png", alt: "Power Machine Pro features grid" },
      { url: "/portfolio/power-machine-04.png", alt: "Power Machine Pro dashboard workflow" },
      { url: "/portfolio/power-machine-05.png", alt: "Power Machine Pro attendance log" },
      { url: "/portfolio/power-machine-06.png", alt: "Power Machine Pro membership plans" },
      { url: "/portfolio/power-machine-07.png", alt: "Power Machine Pro portals" }
    ]
  }
];

export function getFallbackPortfolioProject(slug: string) {
  return fallbackPortfolioProjects.find((project) => project.slug === slug) ?? null;
}
