import { NextResponse } from "next/server";
import { readString } from "@/lib/admin-crud";
import { requireAdmin } from "@/lib/admin-auth";
import { isEnquiryStatus } from "@/lib/enquiry-validation";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { id } = await context.params;
  const body = await request.json() as Record<string, unknown>;
  const status = readString(body, "status", "NEW");

  if (!isEnquiryStatus(status)) {
    return NextResponse.json(
      { errors: ["Invalid enquiry status."] },
      { status: 422 }
    );
  }

  const enquiry = await prisma.enquiry.update({
    where: { id },
    data: { status }
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
