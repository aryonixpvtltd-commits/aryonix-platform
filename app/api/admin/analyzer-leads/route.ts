import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;
  return NextResponse.json(await prisma.analyzerLead.findMany({ orderBy: { createdAt: "desc" } }));
}
