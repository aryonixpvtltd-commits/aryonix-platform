export function getDatabaseHostname() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) return "missing";

  try {
    return new URL(databaseUrl).hostname;
  } catch {
    return "invalid-url";
  }
}

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;

  try {
    return JSON.stringify(error);
  } catch {
    return "Unknown error";
  }
}
