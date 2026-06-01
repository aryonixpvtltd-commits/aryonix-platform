import { NextResponse } from "next/server";
import { readBoolean, readString } from "@/lib/admin-crud";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin();
  if (authError) return authError;
  const { id } = await context.params;
  const body = await request.json() as Record<string, unknown>;
  const testimonial = await prisma.testimonial.update({
    where: { id },
    data: {
      quote: readString(body, "quote"),
      name: readString(body, "name"),
      role: readString(body, "role"),
      company: readString(body, "company") || undefined,
      rating: typeof body.rating === "number" ? body.rating : 5,
      published: readBoolean(body, "published")
    }
  });
  return NextResponse.json(testimonial);
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin();
  if (authError) return authError;
  const { id } = await context.params;
  await prisma.testimonial.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
