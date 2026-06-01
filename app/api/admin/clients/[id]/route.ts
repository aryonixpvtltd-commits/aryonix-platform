import { NextResponse } from "next/server";
import { readString } from "@/lib/admin-crud";
import { isValidEmail, normalizeEmail } from "@/lib/auth-validation";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { id } = await context.params;
  const body = await request.json() as Record<string, unknown>;
  const name = readString(body, "name");
  const email = normalizeEmail(readString(body, "email"));

  if (name.length < 2 || !isValidEmail(email)) {
    return NextResponse.json({ errors: ["Valid name and email are required."] }, { status: 422 });
  }

  const user = await prisma.user.update({
    where: { id },
    data: { name, email },
    select: { id: true, name: true, email: true, role: true, createdAt: true }
  });

  return NextResponse.json(user);
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { id } = await context.params;
  await prisma.user.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
