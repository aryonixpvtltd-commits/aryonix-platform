import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { isValidEmail, normalizeEmail } from "@/lib/auth-validation";
import { prisma } from "@/lib/prisma";

const RESET_TOKEN_MINUTES = 30;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? normalizeEmail(body.email) : "";

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { errors: ["A valid email is required."] },
        { status: 422 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      const token = crypto.randomBytes(32).toString("hex");
      const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
      const expires = new Date(Date.now() + RESET_TOKEN_MINUTES * 60 * 1000);

      await prisma.passwordResetToken.create({
        data: {
          email,
          tokenHash,
          expires
        }
      });

      if (process.env.NODE_ENV !== "production") {
        const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
        console.info(`Aryonix password reset link: ${baseUrl}/reset-password?token=${token}`);
      }
    }

    return NextResponse.json({
      ok: true,
      message: "If an account exists, a password reset link will be sent."
    });
  } catch {
    return NextResponse.json(
      { errors: ["Unable to process password reset right now."] },
      { status: 500 }
    );
  }
}
