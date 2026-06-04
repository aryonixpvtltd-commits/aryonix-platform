import { NextResponse } from "next/server";
import { isValidEmail, normalizeEmail } from "@/lib/auth-validation";
import { readString, withAdmin } from "@/lib/admin-crud";
import { prisma } from "@/lib/prisma";

export async function GET() {
  return withAdmin(() =>
    prisma.user.findMany({
      where: { role: "CLIENT" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        clientProjects: { select: { id: true, title: true, status: true, progress: true } },
        invoices: { select: { id: true, amount: true, status: true } }
      },
      orderBy: { createdAt: "desc" }
    })
  );
}

export async function POST(request: Request) {
  const authError = await import("@/lib/admin-auth").then((mod) => mod.requireAdmin());
  if (authError) return authError;

  const body = await request.json() as Record<string, unknown>;
  const name = readString(body, "name");
  const email = normalizeEmail(readString(body, "email"));
  const errors = [
    ...(name.length < 2 ? ["Client name is required."] : []),
    ...(!isValidEmail(email) ? ["Valid client email is required."] : [])
  ];

  if (errors.length) return NextResponse.json({ errors }, { status: 422 });

  const user = await prisma.user.create({
    data: { name, email, role: "CLIENT" },
    select: { id: true, name: true, email: true, role: true, createdAt: true }
  });

  return NextResponse.json(user, { status: 201 });
}
