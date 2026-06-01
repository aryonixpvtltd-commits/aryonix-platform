import { NextResponse } from "next/server";
import { readBoolean, readString } from "@/lib/admin-crud";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;
  return NextResponse.json(await prisma.socialLink.findMany({ orderBy: { platform: "asc" } }));
}

export async function POST(request: Request) {
  const authError = await requireAdmin();
  if (authError) return authError;
  const body = await request.json() as Record<string, unknown>;
  const platform = readString(body, "platform");
  const label = readString(body, "label");
  const handle = readString(body, "handle");
  const href = readString(body, "href");
  if (!platform || !label || !handle || !href) return NextResponse.json({ errors: ["Platform, label, handle and URL are required."] }, { status: 422 });
  const link = await prisma.socialLink.upsert({
    where: { platform },
    update: { label, handle, href, published: readBoolean(body, "published") },
    create: { platform, label, handle, href, published: readBoolean(body, "published") }
  });
  return NextResponse.json(link, { status: 201 });
}
