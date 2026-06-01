import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { validatePassword } from "@/lib/auth-validation";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const token = typeof body.token === "string" ? body.token : "";
    const password = typeof body.password === "string" ? body.password : "";
    const errors = validatePassword(password);

    if (!token || errors.length) {
      return NextResponse.json(
        { errors: token ? errors : ["Reset token is required."] },
        { status: 422 }
      );
    }

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { tokenHash }
    });

    if (!resetToken || resetToken.used || resetToken.expires < new Date()) {
      return NextResponse.json(
        { errors: ["This reset link is invalid or expired."] },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await prisma.$transaction([
      prisma.user.update({
        where: { email: resetToken.email },
        data: { passwordHash }
      }),
      prisma.passwordResetToken.update({
        where: { id: resetToken.id },
        data: { used: true }
      }),
      prisma.passwordResetToken.updateMany({
        where: {
          email: resetToken.email,
          used: false,
          expires: { lt: new Date() }
        },
        data: { used: true }
      })
    ]);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { errors: ["Unable to reset password right now."] },
      { status: 500 }
    );
  }
}
