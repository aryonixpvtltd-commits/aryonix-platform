import { companyKnowledge } from "@/lib/knowledge/company";
import { contactKnowledge } from "@/lib/knowledge/contact";
import { faqKnowledge } from "@/lib/knowledge/faq";
import { portfolioKnowledge } from "@/lib/knowledge/portfolio";
import { pricingDisclaimer, pricingKnowledge } from "@/lib/knowledge/pricing";
import { processKnowledge } from "@/lib/knowledge/process";
import { aiBehaviorPrompt } from "@/lib/knowledge/prompts";
import { serviceKnowledge } from "@/lib/knowledge/services";
import { techStackKnowledge } from "@/lib/knowledge/techstack";

export type KnowledgeEntrySeed = {
  type: string;
  title: string;
  content: string;
};

export const aiKnowledgeTypes = [
  "company",
  "service",
  "pricing",
  "faq",
  "portfolio",
  "process",
  "techstack",
  "contact",
  "custom"
] as const;

export type AIKnowledgeType = (typeof aiKnowledgeTypes)[number];

export function isAIKnowledgeType(value: unknown): value is AIKnowledgeType {
  return typeof value === "string" && aiKnowledgeTypes.includes(value as AIKnowledgeType);
}

export const staticKnowledgeEntries: KnowledgeEntrySeed[] = [
  {
    type: "company",
    title: companyKnowledge.title,
    content: `${companyKnowledge.content}\nPositioning: ${companyKnowledge.positioning}\nFacts: ${companyKnowledge.facts.join("; ")}`
  },
  ...serviceKnowledge.map((service) => ({
    type: "service",
    title: service.title,
    content: `${service.content}\nFeatures: ${service.features.join(", ")}`
  })),
  ...pricingKnowledge.map((item) => ({
    type: "pricing",
    title: item.title,
    content: `${item.range}. Timeline: ${item.timeline}. ${item.note} ${pricingDisclaimer}`
  })),
  ...faqKnowledge.map((item) => ({
    type: "faq",
    title: item.question,
    content: item.answer
  })),
  ...portfolioKnowledge.map((project) => ({
    type: "portfolio",
    title: project.title,
    content: `${project.category}. ${project.content} Tech stack: ${project.techStack.join(", ")}. Live: ${project.liveUrl}. GitHub: ${project.githubUrl}.`
  })),
  ...processKnowledge.map((item) => ({
    type: "process",
    title: item.step,
    content: item.content
  })),
  {
    type: "techstack",
    title: "ARYONIX technology stack",
    content: techStackKnowledge.join(", ")
  },
  {
    type: "contact",
    title: contactKnowledge.title,
    content: `${contactKnowledge.content} Phone: ${contactKnowledge.phone}. WhatsApp: ${contactKnowledge.whatsapp}. Email: ${contactKnowledge.email}. Location: ${contactKnowledge.location}.`
  }
];

export function buildStaticKnowledgeContext() {
  return staticKnowledgeEntries
    .map((entry) => `[${entry.type.toUpperCase()}] ${entry.title}\n${entry.content}`)
    .join("\n\n");
}

export function buildSystemPrompt(dynamicKnowledge: KnowledgeEntrySeed[] = []) {
  const dynamicContext = dynamicKnowledge.length
    ? dynamicKnowledge.map((entry) => `[ADMIN ${entry.type.toUpperCase()}] ${entry.title}\n${entry.content}`).join("\n\n")
    : "No admin-added knowledge entries are active yet.";

  return `${aiBehaviorPrompt}\n\nSTATIC ARYONIX KNOWLEDGE:\n${buildStaticKnowledgeContext()}\n\nACTIVE ADMIN KNOWLEDGE:\n${dynamicContext}`;
}
