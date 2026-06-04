import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/admin-session";

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");
  const isAdminApiRoute = pathname.startsWith("/api/admin");

  if (isAdminRoute || isAdminApiRoute) {
    const adminToken = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    const hasAdminSession = await verifyAdminSessionToken(adminToken);

    if (!hasAdminSession) {
      if (isAdminApiRoute) {
        return NextResponse.json({ error: "Admin access required." }, { status: 401 });
      }

      return NextResponse.redirect(new URL("/admin-login", request.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"]
};
