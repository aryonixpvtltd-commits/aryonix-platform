import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

export async function requireAdmin() {
  if (process.env.NODE_ENV !== "production" && process.env.SKIP_ADMIN_AUTH === "true") {
    return null;
  }

  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json(
      { error: "Admin access required." },
      { status: 403 }
    );
  }

  return null;
}
