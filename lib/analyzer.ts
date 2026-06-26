import { isValidEmail, normalizeEmail } from "@/lib/auth-validation";

export type AnalyzerResult = {
  designScore: number;
  mobileScore: number;
  seoScore: number;
  speedScore: number;
  suggestions: string[];
};

export function analyzeWebsite(url: string): AnalyzerResult {
  const normalized = url.toLowerCase();
  const seed = Array.from(normalized).reduce((total, character) => total + character.charCodeAt(0), 0);
  const score = (offset: number) => 62 + ((seed + offset) % 29);
  return {
    designScore: score(3),
    mobileScore: score(11),
    seoScore: score(19),
    speedScore: score(27),
    suggestions: [
      "Clarify the first-screen value proposition and primary call to action.",
      "Improve mobile spacing, tap targets and typography hierarchy.",
      "Strengthen metadata, heading structure and service-page search intent.",
      "Compress large media and defer non-critical scripts for faster loading.",
      "Add stronger trust proof, project results and conversion-focused contact paths."
    ]
  };
}

export function validateAnalyzerLead(input: unknown) {
  const body = typeof input === "object" && input !== null ? input as Record<string, unknown> : {};
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = normalizeEmail(typeof body.email === "string" ? body.email.trim() : "");
  const phone = typeof body.phone === "string" ? body.phone.trim().replace(/[^\d+]/g, "") : "";
  const websiteUrl = typeof body.websiteUrl === "string" ? body.websiteUrl.trim() : "";
  const errors: string[] = [];
  if (name.length < 2) errors.push("Name is required.");
  if (!isValidEmail(email)) errors.push("A valid email is required.");
  if (phone && !/^\+?\d{10,15}$/.test(phone)) errors.push("Phone number is invalid.");
  try {
    const parsed = new URL(websiteUrl);
    if (!["http:", "https:"].includes(parsed.protocol)) errors.push("Use a valid website URL.");
  } catch {
    errors.push("Use a valid website URL.");
  }
  if (errors.length) return { ok: false as const, errors };
  return { ok: true as const, data: { name, email, phone: phone || undefined, websiteUrl, ...analyzeWebsite(websiteUrl) } };
}
