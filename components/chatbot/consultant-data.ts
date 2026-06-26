import {
  Bot,
  BriefcaseBusiness,
  Building2,
  Code2,
  Layout,
  Palette,
  Rocket,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Wrench
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ConsultantScreen =
  | "welcome"
  | "chat"
  | "services"
  | "pricing"
  | "portfolio"
  | "estimator"
  | "estimate"
  | "lead"
  | "success";

export type ChatMessage = {
  id: number;
  role: "assistant" | "user";
  text: string;
};

export type Qualification = {
  projectType: string;
  pages: string;
  booking: string;
  payment: string;
  admin: string;
};

export type Recommendation = {
  packageName: string;
  budget: string;
  timeline: string;
  technologies: string[];
  summary: string;
  leadScore: number;
  projects: string[];
};

export type LeadForm = {
  name: string;
  business: string;
  email: string;
  phone: string;
  budget: string;
  timeline: string;
  projectDetails: string;
};

export const emptyQualification: Qualification = {
  projectType: "",
  pages: "",
  booking: "",
  payment: "",
  admin: ""
};

export const emptyLeadForm: LeadForm = {
  name: "",
  business: "",
  email: "",
  phone: "",
  budget: "",
  timeline: "",
  projectDetails: ""
};

export const welcomeCards: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
  type: string;
}> = [
  { title: "Business Website", description: "Generate leads and build trust.", icon: BriefcaseBusiness, type: "Business" },
  { title: "Portfolio Website", description: "Present work with authority.", icon: Layout, type: "Portfolio" },
  { title: "Ecommerce Store", description: "Sell products through a premium storefront.", icon: ShoppingBag, type: "Ecommerce" },
  { title: "Mobile App", description: "Plan a focused product experience.", icon: Smartphone, type: "Mobile App" },
  { title: "AI Automation", description: "Automate repetitive business workflows.", icon: Bot, type: "AI Automation" },
  { title: "UI/UX Design", description: "Create a refined interface system.", icon: Palette, type: "UI/UX Design" }
];

export const suggestedQuestions = [
  "How much does a website cost?",
  "Show your recent work",
  "How long does development take?",
  "Book a free consultation",
  "Talk to a human"
] as const;

export const estimatorSteps: Array<{
  key: keyof Qualification;
  question: string;
  options: string[];
}> = [
  {
    key: "projectType",
    question: "What type of business are we building for?",
    options: ["Business", "Restaurant", "Gym", "Portfolio", "Startup", "Real Estate", "Clinic", "Agency"]
  },
  {
    key: "pages",
    question: "How much content should the first version include?",
    options: ["Landing Page", "5 Pages", "10 Pages", "Custom"]
  },
  {
    key: "booking",
    question: "Do customers need to book appointments or consultations?",
    options: ["Yes", "No"]
  },
  {
    key: "payment",
    question: "Should the website accept online payments?",
    options: ["Yes", "No"]
  },
  {
    key: "admin",
    question: "Do you need an admin dashboard to manage content or leads?",
    options: ["Yes", "No"]
  }
];

export const serviceCards: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  { title: "Strategy & UX", description: "Positioning, journeys, content hierarchy and conversion planning.", icon: Rocket },
  { title: "Web Design", description: "Premium responsive interfaces tailored to the brand and audience.", icon: Palette },
  { title: "Full-stack Development", description: "Next.js platforms, APIs, databases and secure business workflows.", icon: Code2 },
  { title: "Ecommerce", description: "Product discovery, payments, admin controls and growth-ready storefronts.", icon: ShoppingBag },
  { title: "AI Automation", description: "Practical assistants and workflow automation for repetitive operations.", icon: Sparkles },
  { title: "Ongoing Support", description: "Performance, content updates, refinements and post-launch maintenance.", icon: Wrench }
];

export const pricingCards = [
  {
    name: "Starter",
    price: "From ₹15k",
    timeline: "7-14 days",
    features: ["Landing page", "Responsive build", "Contact form", "Basic SEO"]
  },
  {
    name: "Business",
    price: "From ₹35k",
    timeline: "2-4 weeks",
    features: ["Up to 7 pages", "Lead capture", "SEO setup", "CMS-ready structure"],
    popular: true
  },
  {
    name: "Premium",
    price: "From ₹75k",
    timeline: "4-7 weeks",
    features: ["Custom UI/UX", "Advanced motion", "Admin dashboard", "Integrations"]
  },
  {
    name: "Enterprise",
    price: "Custom scope",
    timeline: "6+ weeks",
    features: ["Web applications", "Authentication", "APIs & database", "Scalable architecture"]
  }
];

export const portfolioCards = [
  {
    title: "Student Toolkit",
    industry: "Education",
    image: "/portfolio/student-toolkit-hero.png",
    technologies: ["Next.js", "TypeScript", "Tailwind"],
    liveUrl: "https://student-toolkit-two.vercel.app/",
    caseStudyUrl: "/portfolio/student-toolkit"
  },
  {
    title: "Neural City AQI",
    industry: "Civic Data",
    image: "/portfolio/aqi-dashboard-hero.png",
    technologies: ["Next.js", "Recharts", "Data UI"],
    liveUrl: "https://neural-city-aqi-dashboard.vercel.app/",
    caseStudyUrl: "/portfolio/neural-city-aqi-dashboard"
  },
  {
    title: "Academic GPA Calculator",
    industry: "Education",
    image: "/portfolio/academic-gpa-cgpa-calculator.png",
    technologies: ["React", "TypeScript", "Form UX"],
    liveUrl: "https://academic-gpa-cgpa-calculator.vercel.app/",
    caseStudyUrl: "/portfolio/academic-gpa-cgpa-calculator"
  },
  {
    title: "Figma React Assignment",
    industry: "Agency",
    image: "/portfolio/figma-react-assignment-hero.png",
    technologies: ["React", "Responsive UI", "Vercel"],
    liveUrl: "https://figma-react-assignment-mocha.vercel.app/",
    caseStudyUrl: "/portfolio/figma-react-assignment"
  }
];

export function createRecommendation(qualification: Qualification): Recommendation {
  const featureCount = [qualification.booking, qualification.payment, qualification.admin].filter((value) => value === "Yes").length;
  const isApp = ["Mobile App", "AI Automation"].includes(qualification.projectType);
  const isCommerce = qualification.projectType === "Ecommerce" || qualification.payment === "Yes";
  const isLarge = qualification.pages === "10 Pages" || qualification.pages === "Custom";
  const selectedTechnologies = [
    qualification.booking === "Yes" ? "Booking integration" : "",
    qualification.payment === "Yes" ? "Payment gateway" : "",
    qualification.admin === "Yes" ? "Admin dashboard" : ""
  ].filter(Boolean);

  if (isApp || featureCount >= 3) {
    return {
      packageName: "Enterprise Custom Build",
      budget: "₹1.2L – ₹3L+",
      timeline: "6-12 weeks",
      technologies: ["Next.js", "TypeScript", "MongoDB", "Authentication", "API integrations", ...selectedTechnologies],
      summary: "A custom product scope is the right fit because this project combines multiple business workflows and administration needs.",
      leadScore: 94,
      projects: ["Student Toolkit", "Neural City AQI"]
    };
  }

  if (isCommerce || isLarge || featureCount >= 2) {
    return {
      packageName: "Premium Website",
      budget: "₹75k – ₹1.5L",
      timeline: "4-7 weeks",
      technologies: ["Next.js", "TypeScript", "MongoDB", ...selectedTechnologies],
      summary: "This needs a premium custom website with stronger content depth, operational features and scalable architecture.",
      leadScore: 86,
      projects: ["Student Toolkit", "Figma React Assignment"]
    };
  }

  if (qualification.pages === "5 Pages" || featureCount === 1) {
    return {
      packageName: "Business Website",
      budget: "₹35k – ₹70k",
      timeline: "2-4 weeks",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB lead capture", ...selectedTechnologies],
      summary: "The Business package provides the right balance of credibility, lead generation and room to grow.",
      leadScore: 76,
      projects: ["Figma React Assignment", "Academic GPA Calculator"]
    };
  }

  return {
    packageName: "Starter Website",
    budget: "₹15k – ₹35k",
    timeline: "7-14 days",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    summary: "A focused starter build will establish a strong online presence quickly without unnecessary complexity.",
    leadScore: 66,
    projects: ["Figma React Assignment", "Academic GPA Calculator"]
  };
}

export function buildConversationSummary(qualification: Qualification, recommendation: Recommendation) {
  return `${qualification.projectType} project with ${qualification.pages.toLowerCase()}; booking: ${qualification.booking}; payments: ${qualification.payment}; admin dashboard: ${qualification.admin}. Recommended ${recommendation.packageName} at ${recommendation.budget} with a ${recommendation.timeline} timeline.`;
}

export const businessTypeIcons: Record<string, LucideIcon> = {
  Business: BriefcaseBusiness,
  Restaurant: Building2,
  Gym: Rocket,
  Portfolio: Layout,
  Startup: Sparkles,
  "Real Estate": Building2,
  Clinic: Building2,
  Agency: Palette
};
