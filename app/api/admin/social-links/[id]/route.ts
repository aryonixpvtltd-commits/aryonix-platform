import { NextResponse } from "next/server";
import { readBoolean, readString } from "@/lib/admin-crud";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin();
  if (authError) return authError;
  const { id } = await context.params;
  const body = await request.json() as Record<string, unknown>;
  const link = await prisma.socialLink.update({
    where: { id },
    data: {
      platform: readString(body, "platform"),
      label: readString(body, "label"),
      handle: readString(body, "handle"),
      href: readString(body, "href"),
      published: readBoolean(body, "published")
    }
  });
  return NextResponse.json(link);
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin();
  if (authError) return authError;
  const { id } = await context.params;
  await prisma.socialLink.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
