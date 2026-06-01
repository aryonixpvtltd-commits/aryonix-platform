import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { projectInclude, updateProject } from "@/lib/portfolio-data";
import { validateProjectPayload } from "@/lib/portfolio-validation";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { id } = await context.params;
  const project = await prisma.project.findUnique({
    where: { id },
    include: projectInclude
  });

  if (!project) {
    return NextResponse.json({ error: "Project not found." }, { status: 404 });
  }

  return NextResponse.json(project);
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { id } = await context.params;
  const body = await request.json();
  const result = validateProjectPayload(body);

  if (!result.ok) {
    return NextResponse.json({ errors: result.errors }, { status: 422 });
  }

  const project = await updateProject(id, result.data);
  return NextResponse.json(project);
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { id } = await context.params;
  await prisma.project.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
