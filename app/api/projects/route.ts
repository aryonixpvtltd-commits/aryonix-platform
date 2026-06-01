import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { createProject, listProjects } from "@/lib/portfolio-data";
import { validateProjectPayload } from "@/lib/portfolio-validation";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const projects = await listProjects({
    search: searchParams.get("search") ?? undefined,
    category: searchParams.get("category") ?? undefined,
    includeDrafts: searchParams.get("drafts") === "true"
  });

  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const body = await request.json();
  const result = validateProjectPayload(body);

  if (!result.ok) {
    return NextResponse.json({ errors: result.errors }, { status: 422 });
  }

  const existing = await prisma.project.findUnique({
    where: { slug: result.data.slug }
  });

  if (existing) {
    return NextResponse.json(
      { errors: ["A project with this slug already exists."] },
      { status: 409 }
    );
  }

  const project = await createProject(result.data);

  return NextResponse.json(project, { status: 201 });
}
