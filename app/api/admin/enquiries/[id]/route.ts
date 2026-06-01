import { NextResponse } from "next/server";
import { readString } from "@/lib/admin-crud";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { id } = await context.params;
  const body = await request.json() as Record<string, unknown>;
  const enquiry = await prisma.enquiry.update({
    where: { id },
    data: { status: readString(body, "status", "NEW") }
  });
  return NextResponse.json(enquiry);
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { id } = await context.params;
  await prisma.enquiry.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
