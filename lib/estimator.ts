import { isValidEmail, normalizeEmail } from "@/lib/auth-validation";

export const estimatorFeatures = [
  "Contact Form",
  "WhatsApp Button",
  "Booking System",
  "Payment Gateway",
  "Admin Dashboard",
  "Blog",
  "Ecommerce",
  "AI Chatbot",
  "SEO"
] as const;

export type EstimatorInput = {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  businessType: string;
  websiteType: string;
  pages: string;
  features: string[];
  designLevel: string;
  requestedTimeline: string;
  statedBudget: string;
};

export type EstimateResult = {
  estimatedPrice: string;
  estimatedTimeline: string;
  recommendedPackage: string;
  techStack: string[];
};

export const estimatorSteps = [
  { key: "businessType", title: "What kind of business are you building for?", options: ["Startup", "Local Business", "Agency", "Ecommerce", "Education", "Healthcare", "Real Estate", "Creator"] },
  { key: "websiteType", title: "What should we create?", options: ["Landing Page", "Business Website", "Portfolio", "Ecommerce Store", "Admin Dashboard", "Custom Web App"] },
  { key: "pages", title: "How much content should the first version include?", options: ["1 Page", "5 Pages", "10 Pages", "15+ Pages", "Custom"] },
  { key: "features", title: "Which capabilities matter?", options: estimatorFeatures },
  { key: "designLevel", title: "What design level fits the brand?", options: ["Clean & Essential", "Premium Custom", "Luxury Editorial", "Product UI System"] },
  { key: "requestedTimeline", title: "When do you want to launch?", options: ["1-2 Weeks", "3-4 Weeks", "1-2 Months", "Flexible"] },
  { key: "statedBudget", title: "What investment range are you considering?", options: ["₹15k – ₹30k", "₹30k – ₹60k", "₹60k – ₹1.2L", "₹1.2L+", "Need Guidance"] }
] as const;

export function calculateEstimate(input: Pick<EstimatorInput, "websiteType" | "pages" | "features" | "designLevel" | "requestedTimeline">): EstimateResult {
  let score = 0;
  score += { "Landing Page": 1, "Business Website": 3, Portfolio: 2, "Ecommerce Store": 7, "Admin Dashboard": 8, "Custom Web App": 10 }[input.websiteType] ?? 2;
  score += { "1 Page": 0, "5 Pages": 2, "10 Pages": 4, "15+ Pages": 6, Custom: 5 }[input.pages] ?? 0;
  score += input.features.reduce((total, feature) => total + ({
    "Contact Form": 0.5,
    "WhatsApp Button": 0.5,
    "Booking System": 2,
    "Payment Gateway": 3,
    "Admin Dashboard": 4,
    Blog: 1.5,
    Ecommerce: 4,
    "AI Chatbot": 3,
    SEO: 1.5
  }[feature] ?? 0), 0);
  score += { "Clean & Essential": 0, "Premium Custom": 2, "Luxury Editorial": 4, "Product UI System": 5 }[input.designLevel] ?? 0;
  if (input.requestedTimeline === "1-2 Weeks") score += 2;

  if (score >= 18) {
    return {
      estimatedPrice: "₹1.2L – ₹3L+",
      estimatedTimeline: "8-14 weeks",
      recommendedPackage: "Enterprise Custom Build",
      techStack: ["Next.js", "TypeScript", "MongoDB", "Prisma", "Authentication", "API integrations"]
    };
  }
  if (score >= 11) {
    return {
      estimatedPrice: "₹70k – ₹1.5L",
      estimatedTimeline: "4-8 weeks",
      recommendedPackage: "Premium Custom Website",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "Admin workflows"]
    };
  }
  if (score >= 5) {
    return {
      estimatedPrice: "₹35k – ₹70k",
      estimatedTimeline: "2-4 weeks",
      recommendedPackage: "Business Website",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "SEO", "Lead capture"]
    };
  }
  return {
    estimatedPrice: "₹15k – ₹35k",
    estimatedTimeline: "7-14 days",
    recommendedPackage: "Starter Website",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"]
  };
}

function readText(body: Record<string, unknown>, key: string) {
  return typeof body[key] === "string" ? body[key].trim() : "";
}

function readArray(body: Record<string, unknown>, key: string, limit = 20) {
  return Array.isArray(body[key])
    ? body[key].filter((value): value is string => typeof value === "string").map((value) => value.trim()).filter(Boolean).slice(0, limit)
    : [];
}

export function validateEstimatorLead(input: unknown): { ok: true; data: EstimatorInput & EstimateResult } | { ok: false; errors: string[] } {
  const body = typeof input === "object" && input !== null ? input as Record<string, unknown> : {};
  const data: EstimatorInput = {
    name: readText(body, "name"),
    businessName: readText(body, "businessName"),
    email: normalizeEmail(readText(body, "email")),
    phone: readText(body, "phone").replace(/[^\d+]/g, ""),
    businessType: readText(body, "businessType"),
    websiteType: readText(body, "websiteType"),
    pages: readText(body, "pages"),
    features: readArray(body, "features"),
    designLevel: readText(body, "designLevel"),
    requestedTimeline: readText(body, "requestedTimeline"),
    statedBudget: readText(body, "statedBudget")
  };
  const errors: string[] = [];
  if (data.name.length < 2) errors.push("Name is required.");
  if (data.businessName.length < 2) errors.push("Business name is required.");
  if (!isValidEmail(data.email)) errors.push("A valid email is required.");
  if (!/^\+?\d{10,15}$/.test(data.phone)) errors.push("A valid phone number is required.");
  for (const key of ["businessType", "websiteType", "pages", "designLevel", "requestedTimeline", "statedBudget"] as const) {
    if (!data[key]) errors.push(`${key} is required.`);
  }
  if (data.features.length === 0) errors.push("Select at least one feature.");
  if (errors.length) return { ok: false, errors };
  return { ok: true, data: { ...data, ...calculateEstimate(data) } };
}

export const estimatorLeadStatuses = ["NEW", "CONTACTED", "PROPOSAL_SENT", "NEGOTIATION", "WON", "LOST"] as const;

export function isEstimatorLeadStatus(value: unknown): value is (typeof estimatorLeadStatuses)[number] {
  return typeof value === "string" && estimatorLeadStatuses.includes(value as (typeof estimatorLeadStatuses)[number]);
}
