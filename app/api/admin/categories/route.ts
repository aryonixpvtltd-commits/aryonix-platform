import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { slugify } from "@/lib/portfolio-validation";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const body = await request.json();
  const name = typeof body.name === "string" ? body.name.trim() : "";

  if (name.length < 2) {
    return NextResponse.json(
      { errors: ["Category name is required."] },
      { status: 422 }
    );
  }

  const category = await prisma.projectCategory.upsert({
    where: { slug: slugify(name) },
    update: {
      name,
      description: typeof body.description === "string" ? body.description : undefined
    },
    create: {
      name,
      slug: slugify(name),
      description: typeof body.description === "string" ? body.description : undefined
    }
  });

  return NextResponse.json(category, { status: 201 });
}
