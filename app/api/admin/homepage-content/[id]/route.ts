import { NextResponse } from "next/server";
import { readBoolean, readString } from "@/lib/admin-crud";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin();
  if (authError) return authError;
  const { id } = await context.params;
  const body = await request.json() as Record<string, unknown>;
  const record = await prisma.homepageContent.update({
    where: { id },
    data: {
      key: readString(body, "key"),
      title: readString(body, "title"),
      content: readString(body, "content"),
      section: readString(body, "section", "homepage"),
      published: readBoolean(body, "published")
    }
  });
  return NextResponse.json(record);
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin();
  if (authError) return authError;
  const { id } = await context.params;
  await prisma.homepageContent.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
