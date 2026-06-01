import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { isValidEmail, normalizeEmail, validatePassword } from "@/lib/auth-validation";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? normalizeEmail(body.email) : "";
    const password = typeof body.password === "string" ? body.password : "";

    const errors: string[] = [];

    if (name.length < 2) errors.push("Name is required.");
    if (!isValidEmail(email)) errors.push("A valid email is required.");
    errors.push(...validatePassword(password));

    if (errors.length) {
      return NextResponse.json({ errors }, { status: 422 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json(
        { errors: ["An account already exists for this email."] },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: "CLIENT"
      }
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { errors: ["Unable to create account right now."] },
      { status: 500 }
    );
  }
}
