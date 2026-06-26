import { isValidEmail, normalizeEmail } from "@/lib/auth-validation";

export type EnquiryPayload = {
  name: string;
  email: string;
  company?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  referenceWebsite?: string;
  fileNames: string[];
  message: string;
};

export const enquiryStatuses = [
  "NEW",
  "CONTACTED",
  "PROPOSAL_SENT",
  "NEGOTIATION",
  "WON",
  "LOST"
] as const;

export type EnquiryStatus = (typeof enquiryStatuses)[number];

export function isEnquiryStatus(value: unknown): value is EnquiryStatus {
  return typeof value === "string" && enquiryStatuses.includes(value as EnquiryStatus);
}

export function formatEnquiryStatus(value: string) {
  return value
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function readText(body: Record<string, unknown>, key: string) {
  return typeof body[key] === "string" ? body[key].trim() : "";
}

function readFileNames(body: Record<string, unknown>) {
  const files = body.fileNames;

  if (!Array.isArray(files)) return [];

  return files
    .filter((file): file is string => typeof file === "string")
    .map((file) => file.trim())
    .filter(Boolean)
    .slice(0, 5);
}

export function validateEnquiryPayload(input: unknown): {
  ok: true;
  data: EnquiryPayload;
} | {
  ok: false;
  errors: string[];
} {
  const body = typeof input === "object" && input !== null ? input as Record<string, unknown> : {};
  const name = readText(body, "name");
  const email = normalizeEmail(readText(body, "email"));
  const company = readText(body, "company");
  const projectType = readText(body, "projectType");
  const budget = readText(body, "budget");
  const timeline = readText(body, "timeline");
  const referenceWebsite = readText(body, "referenceWebsite");
  const fileNames = readFileNames(body);
  const message = readText(body, "message");
  const errors: string[] = [];

  if (name.length < 2) errors.push("Name is required.");
  if (!isValidEmail(email)) errors.push("A valid email is required.");
  if (message.length < 20) errors.push("Project brief must be at least 20 characters.");
  if (company.length > 120) errors.push("Company name is too long.");
  if (projectType.length > 80) errors.push("Project type value is too long.");
  if (budget.length > 80) errors.push("Budget value is too long.");
  if (timeline.length > 80) errors.push("Timeline value is too long.");
  if (referenceWebsite.length > 180) errors.push("Reference website is too long.");
  if (fileNames.some((file) => file.length > 160)) errors.push("Attachment file name is too long.");

  if (errors.length) return { ok: false, errors };

  return {
    ok: true,
    data: {
      name,
      email,
      company: company || undefined,
      projectType: projectType || undefined,
      budget: budget || undefined,
      timeline: timeline || undefined,
      referenceWebsite: referenceWebsite || undefined,
      fileNames,
      message
    }
  };
}
