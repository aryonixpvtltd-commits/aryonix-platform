import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { isAIKnowledgeType } from "@/lib/knowledge/knowledge";
import { prisma } from "@/lib/prisma";

function readKnowledgeBody(body: Record<string, unknown>) {
  const type = typeof body.type === "string" ? body.type.trim() : "";
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const content = typeof body.content === "string" ? body.content.trim() : "";
  const isActive = typeof body.isActive === "boolean" ? body.isActive : true;

  const errors: string[] = [];
  if (!isAIKnowledgeType(type)) errors.push("Choose a valid knowledge type.");
  if (title.length < 2) errors.push("Title must be at least 2 characters.");
  if (content.length < 10) errors.push("Content must be at least 10 characters.");
  if (title.length > 140) errors.push("Title is too long.");
  if (content.length > 6000) errors.push("Content is too long.");

  return { data: { type, title, content, isActive }, errors };
}

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  const entries = await prisma.aIKnowledge.findMany({
    orderBy: [{ type: "asc" }, { updatedAt: "desc" }]
  });

  return NextResponse.json(entries);
}

export async function POST(request: Request) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ errors: ["Invalid request body."] }, { status: 400 });
  }

  const result = readKnowledgeBody(body as Record<string, unknown>);
  if (result.errors.length) {
    return NextResponse.json({ errors: result.errors }, { status: 400 });
  }

  const entry = await prisma.aIKnowledge.create({ data: result.data });
  return NextResponse.json(entry, { status: 201 });
}
