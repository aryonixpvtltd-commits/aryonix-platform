import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { isEstimatorLeadStatus } from "@/lib/estimator";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin();
  if (authError) return authError;
  const { id } = await context.params;
  const body = await request.json() as Record<string, unknown>;
  if (!isEstimatorLeadStatus(body.status)) {
    return NextResponse.json({ errors: ["Invalid lead status."] }, { status: 422 });
  }
  return NextResponse.json(await prisma.estimatorLead.update({
    where: { id },
    data: { status: body.status }
  }));
}
