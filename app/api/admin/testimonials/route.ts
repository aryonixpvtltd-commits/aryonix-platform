import { NextResponse } from "next/server";
import { readBoolean, readString } from "@/lib/admin-crud";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;
  return NextResponse.json(await prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } }));
}

export async function POST(request: Request) {
  const authError = await requireAdmin();
  if (authError) return authError;
  const body = await request.json() as Record<string, unknown>;
  const quote = readString(body, "quote");
  const name = readString(body, "name");
  const role = readString(body, "role");
  if (!quote || !name || !role) return NextResponse.json({ errors: ["Quote, name and role are required."] }, { status: 422 });
  const testimonial = await prisma.testimonial.create({
    data: {
      quote,
      name,
      role,
      company: readString(body, "company") || undefined,
      rating: typeof body.rating === "number" ? body.rating : 5,
      published: readBoolean(body, "published")
    }
  });
  return NextResponse.json(testimonial, { status: 201 });
}
