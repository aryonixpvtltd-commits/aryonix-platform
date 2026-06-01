import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { projectInclude } from "@/lib/portfolio-data";

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const project = await prisma.project.findUnique({
    where: { slug },
    include: projectInclude
  });

  if (!project || !project.published) {
    return NextResponse.json({ error: "Project not found." }, { status: 404 });
  }

  return NextResponse.json(project);
}
