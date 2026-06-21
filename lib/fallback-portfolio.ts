import type { PortfolioRecord } from "@/components/portfolio/portfolio-types";

export const fallbackPortfolioProjects: PortfolioRecord[] = [
  {
    id: "figma-react-assignment",
    title: "Figma React Assignment",
    slug: "figma-react-assignment",
    summary: "Editorial React agency website with premium typography, service storytelling and conversion sections.",
    description:
      "A polished React implementation of an agency website direction, built around large editorial type, smooth page rhythm, services, testimonials and a clean contact path.",
    challenge:
      "The build needed to feel close to a real agency landing page while staying responsive, readable and faithful to the provided design direction.",
    solution:
      "ARYONIX translated the visual system into a sharp React experience with structured sections, strong typography and reusable interface patterns.",
    impact:
      "The finished site demonstrates design fidelity, front-end execution and a client-ready presentation style for agency work.",
    year: 2026,
    client: "ARYONIX Lab",
    category: { id: "agency-website", name: "Agency Website", slug: "agency-website" },
    coverImage: "/portfolio/figma-react-assignment-hero.png",
    liveUrl: "https://figma-react-assignment-mocha.vercel.app/",
    githubUrl: "https://github.com/aryonixpvtltd-commits/figma-react-assignment",
    techStack: ["React", "TypeScript", "Responsive UI", "Vercel"],
    screenshots: [
      { url: "/portfolio/figma-react-assignment-hero.png", alt: "Figma React Assignment hero screenshot" },
      { url: "/portfolio/figma-react-assignment-process.png", alt: "Figma React Assignment process section screenshot" },
      { url: "/portfolio/figma-react-assignment-team.png", alt: "Figma React Assignment team and trust screenshot" },
      { url: "/portfolio/figma-react-assignment-case.png", alt: "Figma React Assignment case study screenshot" },
      { url: "/portfolio/figma-react-assignment-services.png", alt: "Figma React Assignment services screenshot" },
      { url: "/portfolio/figma-react-assignment-testimonials.png", alt: "Figma React Assignment testimonials screenshot" },
      { url: "/portfolio/figma-react-assignment-footer.png", alt: "Figma React Assignment footer screenshot" }
    ]
  },
  {
    id: "neural-city-aqi-dashboard",
    title: "Neural City AQI Dashboard",
    slug: "neural-city-aqi-dashboard",
    summary: "Public-data AQI dashboard for city rankings, pollution categories and methodology notes.",
    description:
      "A responsive civic-data dashboard that helps users compare Indian city AQI values, scan rankings and understand the dataset behind the view.",
    challenge:
      "Air-quality information needs to be easy to compare across cities while still explaining categories, methodology and data context.",
    solution:
      "ARYONIX built a clean dashboard with city health cards, ranking tables, chart comparison and clear dataset explanation blocks.",
    impact:
      "The dashboard turns air-quality data into a more usable public insight surface for citizens, presentations and municipal thinking.",
    year: 2026,
    client: "ARYONIX Lab",
    category: { id: "civic-data-dashboard", name: "Civic Data Dashboard", slug: "civic-data-dashboard" },
    coverImage: "/portfolio/aqi-dashboard-hero.png",
    liveUrl: "https://neural-city-aqi-dashboard.vercel.app/",
    githubUrl: "https://github.com/aryonixpvtltd-commits/neural-city-aqi-dashboard",
    techStack: ["Next.js", "TypeScript", "Recharts", "Data Visualization", "Vercel"],
    screenshots: [
      { url: "/portfolio/aqi-dashboard-hero.png", alt: "Neural City AQI Dashboard hero screenshot" },
      { url: "/portfolio/aqi-dashboard-ranking.png", alt: "Neural City AQI Dashboard city ranking screenshot" },
      { url: "/portfolio/aqi-dashboard-methodology.png", alt: "Neural City AQI Dashboard methodology screenshot" }
    ]
  },
  {
    id: "academic-gpa-cgpa-calculator",
    title: "Academic GPA & CGPA Calculator",
    slug: "academic-gpa-cgpa-calculator",
    summary: "Student GPA and CGPA calculator with grading scales, validation and instant result panels.",
    description:
      "A focused academic calculator that helps students estimate semester GPA, cumulative CGPA and percentage using clear inputs and university grading context.",
    challenge:
      "Students need fast grade planning, but many calculators are cluttered, unclear on mobile or missing grading-scale context.",
    solution:
      "ARYONIX designed a direct calculation workflow with readable forms, grading-scale selection, browser-saved entries and result cards.",
    impact:
      "The tool gives students a simpler way to plan academic performance and understand grade outcomes across devices.",
    year: 2026,
    client: "ARYONIX Lab",
    category: { id: "education-tool", name: "Education Tool", slug: "education-tool" },
    coverImage: "/portfolio/academic-gpa-cgpa-calculator.png",
    liveUrl: "https://academic-gpa-cgpa-calculator.vercel.app/",
    githubUrl: "https://github.com/aryonixpvtltd-commits/academic-gpa-cgpa-calculator",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Form UX"],
    screenshots: [
      { url: "/portfolio/academic-gpa-cgpa-calculator.png", alt: "Academic GPA and CGPA Calculator screenshot" }
    ]
  },
  {
    id: "student-toolkit",
    title: "Student Toolkit",
    slug: "student-toolkit",
    summary: "Premium academic toolkit with CGPA, attendance, percentage, study planner and countdown tools.",
    description:
      "A dark, polished academic workspace that combines everyday student calculators and planning utilities into one responsive interface.",
    challenge:
      "Students often jump between separate calculators and planners, which makes academic tracking scattered and repetitive.",
    solution:
      "ARYONIX built a focused toolkit with five utilities, instant result cards, privacy-first client-side calculations and clean tool navigation.",
    impact:
      "The final toolkit feels fast, modern and practical for daily academic planning without login friction.",
    year: 2026,
    client: "ARYONIX Lab",
    category: { id: "student-productivity", name: "Student Productivity", slug: "student-productivity" },
    coverImage: "/portfolio/student-toolkit-hero.png",
    liveUrl: "https://student-toolkit-two.vercel.app/",
    githubUrl: "https://github.com/aryonixpvtltd-commits/student-toolkit",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Client-side Tools"],
    screenshots: [
      { url: "/portfolio/student-toolkit-hero.png", alt: "Student Toolkit hero screenshot" },
      { url: "/portfolio/student-toolkit-tools.png", alt: "Student Toolkit tools section screenshot" },
      { url: "/portfolio/student-toolkit-cgpa.png", alt: "Student Toolkit CGPA calculator screenshot" },
      { url: "/portfolio/student-toolkit-attendance.png", alt: "Student Toolkit attendance calculator screenshot" },
      { url: "/portfolio/student-toolkit-percentage.png", alt: "Student Toolkit percentage calculator screenshot" },
      { url: "/portfolio/student-toolkit-study-planner.png", alt: "Student Toolkit study planner screenshot" },
      { url: "/portfolio/student-toolkit-countdown.png", alt: "Student Toolkit countdown planner screenshot" },
      { url: "/portfolio/student-toolkit-trust.png", alt: "Student Toolkit trust section screenshot" },
      { url: "/portfolio/student-toolkit-about.png", alt: "Student Toolkit about section screenshot" },
      { url: "/portfolio/student-toolkit-faq.png", alt: "Student Toolkit FAQ screenshot" }
    ]
  }
];

export function getFallbackPortfolioProject(slug: string) {
  return fallbackPortfolioProjects.find((project) => project.slug === slug) ?? null;
}
