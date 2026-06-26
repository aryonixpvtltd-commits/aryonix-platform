import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { isAIKnowledgeType } from "@/lib/knowledge/knowledge";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{ id: string }>;
};

function readPatchBody(body: Record<string, unknown>) {
  const data: {
    type?: string;
    title?: string;
    content?: string;
    isActive?: boolean;
  } = {};
  const errors: string[] = [];

  if ("type" in body) {
    const type = typeof body.type === "string" ? body.type.trim() : "";
    if (!isAIKnowledgeType(type)) errors.push("Choose a valid knowledge type.");
    else data.type = type;
  }

  if ("title" in body) {
    const title = typeof body.title === "string" ? body.title.trim() : "";
    if (title.length < 2) errors.push("Title must be at least 2 characters.");
    else if (title.length > 140) errors.push("Title is too long.");
    else data.title = title;
  }

  if ("content" in body) {
    const content = typeof body.content === "string" ? body.content.trim() : "";
    if (content.length < 10) errors.push("Content must be at least 10 characters.");
    else if (content.length > 6000) errors.push("Content is too long.");
    else data.content = content;
  }

  if ("isActive" in body) {
    if (typeof body.isActive !== "boolean") errors.push("Active state must be true or false.");
    else data.isActive = body.isActive;
  }

  return { data, errors };
}

export async function PATCH(request: Request, context: RouteContext) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { id } = await context.params;
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ errors: ["Invalid request body."] }, { status: 400 });
  }

  const result = readPatchBody(body as Record<string, unknown>);
  if (result.errors.length) {
    return NextResponse.json({ errors: result.errors }, { status: 400 });
  }

  const entry = await prisma.aIKnowledge.update({
    where: { id },
    data: result.data
  });

  return NextResponse.json(entry);
}

export async function DELETE(_request: Request, context: RouteContext) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { id } = await context.params;
  await prisma.aIKnowledge.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
