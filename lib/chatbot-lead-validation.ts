import { isValidEmail, normalizeEmail } from "@/lib/auth-validation";

export type ChatbotLeadPayload = {
  name: string;
  business?: string;
  phone: string;
  email: string;
  businessType: string;
  budget: string;
  timeline?: string;
  requirement: string;
  conversationSummary?: string;
  leadScore?: number;
  estimatedPackage?: string;
  requirements: string[];
};

function readText(body: Record<string, unknown>, key: string) {
  return typeof body[key] === "string" ? body[key].trim() : "";
}

function readRequirements(body: Record<string, unknown>) {
  return Array.isArray(body.requirements)
    ? body.requirements
        .filter((value): value is string => typeof value === "string")
        .map((value) => value.trim())
        .filter(Boolean)
        .slice(0, 12)
    : [];
}

export function validateChatbotLead(input: unknown): {
  ok: true;
  data: ChatbotLeadPayload;
} | {
  ok: false;
  errors: string[];
} {
  const body = typeof input === "object" && input !== null ? input as Record<string, unknown> : {};
  const name = readText(body, "name");
  const business = readText(body, "business");
  const phone = readText(body, "phone").replace(/[^\d+]/g, "");
  const email = normalizeEmail(readText(body, "email"));
  const businessType = readText(body, "businessType");
  const budget = readText(body, "budget");
  const timeline = readText(body, "timeline");
  const requirement = readText(body, "requirement");
  const conversationSummary = readText(body, "conversationSummary");
  const estimatedPackage = readText(body, "estimatedPackage");
  const requirements = readRequirements(body);
  const leadScore = typeof body.leadScore === "number" && Number.isInteger(body.leadScore)
    ? body.leadScore
    : undefined;
  const errors: string[] = [];

  if (name.length < 2 || name.length > 80) errors.push("Enter a valid name.");
  if (business.length > 120) errors.push("Business name is too long.");
  if (!/^\+?\d{10,15}$/.test(phone)) errors.push("Enter a valid phone number.");
  if (!isValidEmail(email)) errors.push("Enter a valid email address.");
  if (businessType.length < 2 || businessType.length > 100) errors.push("Select or enter your business type.");
  if (budget.length < 2 || budget.length > 80) errors.push("Select a project budget.");
  if (timeline.length > 80) errors.push("Timeline is too long.");
  if (requirement.length < 15 || requirement.length > 1600) {
    errors.push("Tell us a little more about your requirement.");
  }
  if (conversationSummary.length > 1600) errors.push("Conversation summary is too long.");
  if (estimatedPackage.length > 100) errors.push("Estimated package is too long.");
  if (leadScore !== undefined && (leadScore < 0 || leadScore > 100)) errors.push("Lead score is invalid.");
  if (requirements.some((value) => value.length > 120)) errors.push("A requirement value is too long.");

  if (errors.length) return { ok: false, errors };

  return {
    ok: true,
    data: {
      name,
      business: business || undefined,
      phone,
      email,
      businessType,
      budget,
      timeline: timeline || undefined,
      requirement,
      conversationSummary: conversationSummary || undefined,
      leadScore,
      estimatedPackage: estimatedPackage || undefined,
      requirements
    }
  };
}
