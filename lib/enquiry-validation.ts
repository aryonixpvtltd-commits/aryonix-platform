import { isValidEmail, normalizeEmail } from "@/lib/auth-validation";

export type EnquiryPayload = {
  name: string;
  email: string;
  company?: string;
  budget?: string;
  message: string;
};

function readText(body: Record<string, unknown>, key: string) {
  return typeof body[key] === "string" ? body[key].trim() : "";
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
  const budget = readText(body, "budget");
  const message = readText(body, "message");
  const errors: string[] = [];

  if (name.length < 2) errors.push("Name is required.");
  if (!isValidEmail(email)) errors.push("A valid email is required.");
  if (message.length < 20) errors.push("Project brief must be at least 20 characters.");
  if (company.length > 120) errors.push("Company name is too long.");
  if (budget.length > 80) errors.push("Budget value is too long.");

  if (errors.length) return { ok: false, errors };

  return {
    ok: true,
    data: {
      name,
      email,
      company: company || undefined,
      budget: budget || undefined,
      message
    }
  };
}
