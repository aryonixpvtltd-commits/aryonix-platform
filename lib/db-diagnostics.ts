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

export function getPrismaErrorDiagnostics(error: unknown) {
  if (!error || typeof error !== "object") {
    return { name: "UnknownError", message: getErrorMessage(error) };
  }

  const record = error as Record<string, unknown>;

  return {
    name: typeof record.name === "string" ? record.name : "UnknownError",
    code: typeof record.code === "string" ? record.code : undefined,
    message: getErrorMessage(error),
    meta: record.meta
  };
}
