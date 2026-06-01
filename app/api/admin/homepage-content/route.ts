import { NextResponse } from "next/server";
import { readBoolean, readString } from "@/lib/admin-crud";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;
  return NextResponse.json(await prisma.homepageContent.findMany({ orderBy: { section: "asc" } }));
}

export async function POST(request: Request) {
  const authError = await requireAdmin();
  if (authError) return authError;
  const body = await request.json() as Record<string, unknown>;
  const key = readString(body, "key");
  const title = readString(body, "title");
  const content = readString(body, "content");
  const section = readString(body, "section", "homepage");
  if (!key || !title || !content) return NextResponse.json({ errors: ["Key, title and content are required."] }, { status: 422 });
  const record = await prisma.homepageContent.upsert({
    where: { key },
    update: { title, content, section, published: readBoolean(body, "published") },
    create: { key, title, content, section, published: readBoolean(body, "published") }
  });
  return NextResponse.json(record, { status: 201 });
}
