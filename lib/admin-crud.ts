import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";

export async function withAdmin<T>(handler: () => Promise<T>) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const result = await handler();
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Admin operation failed." }, { status: 500 });
  }
}

export function readString(body: Record<string, unknown>, key: string, fallback = "") {
  return typeof body[key] === "string" ? body[key].trim() : fallback;
}

export function readBoolean(body: Record<string, unknown>, key: string, fallback = true) {
  return typeof body[key] === "boolean" ? body[key] : fallback;
}
