import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/admin-session";

export async function requireAdmin() {
  if (process.env.NODE_ENV !== "production" && process.env.SKIP_ADMIN_AUTH === "true") {
    return null;
  }

  const cookieStore = await cookies();
  const adminToken = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (await verifyAdminSessionToken(adminToken)) {
    return null;
  }

  return NextResponse.json(
    { error: "Admin access required." },
    { status: 403 }
  );
}
