export type ProjectPayload = {
  title: string;
  slug?: string;
  summary: string;
  description: string;
  challenge?: string;
  solution?: string;
  impact?: string;
  year?: number;
  client?: string;
  categoryId?: string;
  categoryName?: string;
  coverImage?: string;
  liveUrl?: string;
  githubUrl?: string;
  techStack: string[];
  featured?: boolean;
  published?: boolean;
  screenshots?: Array<{
    url: string;
    alt: string;
    order?: number;
  }>;
};

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function requiredString(value: unknown, field: string, errors: string[]) {
  if (typeof value !== "string" || value.trim().length < 2) {
    errors.push(`${field} is required.`);
    return "";
  }

  return value.trim();
}

function optionalString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : undefined;
}

function isSiteRelativePath(value: string) {
  return value.startsWith("/") && !value.startsWith("//") && !value.includes("\\");
}

function validateUrl(value: unknown, field: string, errors: string[]) {
  const text = optionalString(value);
  if (!text) return undefined;

  try {
    new URL(text);
    return text;
  } catch {
    errors.push(`${field} must be a valid URL.`);
    return undefined;
  }
}

function validateImageSource(value: unknown, field: string, errors: string[]) {
  const text = optionalString(value);
  if (!text) return undefined;

  if (isSiteRelativePath(text)) {
    return text;
  }

  return validateUrl(text, field, errors);
}

export function validateProjectPayload(input: unknown): {
  ok: true;
  data: ProjectPayload;
} | {
  ok: false;
  errors: string[];
} {
  const body = typeof input === "object" && input !== null ? input as Record<string, unknown> : {};
  const errors: string[] = [];

  const title = requiredString(body.title, "Title", errors);
  const summary = requiredString(body.summary, "Summary", errors);
  const description = requiredString(body.description, "Description", errors);
  const categoryId = optionalString(body.categoryId);
  const categoryName = optionalString(body.categoryName);

  if (!categoryId && !categoryName) {
    errors.push("Category is required.");
  }

  const techStack = Array.isArray(body.techStack)
    ? body.techStack.filter((item): item is string => typeof item === "string" && item.trim().length > 0).map((item) => item.trim())
    : typeof body.techStack === "string"
      ? body.techStack.split(",").map((item) => item.trim()).filter(Boolean)
      : [];

  if (techStack.length === 0) {
    errors.push("At least one technology is required.");
  }

  const coverImage = validateImageSource(body.coverImage, "Cover image", errors);
  const liveUrl = validateUrl(body.liveUrl, "Live demo", errors);
  const githubUrl = validateUrl(body.githubUrl, "GitHub", errors);

  const screenshots = Array.isArray(body.screenshots)
    ? body.screenshots
        .map((item, index) => {
          if (typeof item !== "object" || item === null) return null;
          const screenshot = item as Record<string, unknown>;
          const url = validateImageSource(screenshot.url, `Screenshot ${index + 1}`, errors);
          if (!url) return null;
          return {
            url,
            alt: optionalString(screenshot.alt) ?? `${title} screenshot ${index + 1}`,
            order: typeof screenshot.order === "number" ? screenshot.order : index
          };
        })
        .filter((item): item is { url: string; alt: string; order: number } => Boolean(item))
    : [];

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      title,
      slug: optionalString(body.slug) ?? slugify(title),
      summary,
      description,
      challenge: optionalString(body.challenge),
      solution: optionalString(body.solution),
      impact: optionalString(body.impact),
      year: typeof body.year === "number" ? body.year : undefined,
      client: optionalString(body.client),
      categoryId,
      categoryName,
      coverImage,
      liveUrl,
      githubUrl,
      techStack,
      featured: Boolean(body.featured),
      published: body.published !== false,
      screenshots
    }
  };
}
