import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { authSecret } from "@/lib/auth-secret";

export default withAuth(
  function middleware(request) {
    const role = request.nextauth.token?.role;
    const { pathname } = request.nextUrl;
    const isAdminRoute = pathname.startsWith("/admin");
    const isClientRoute = pathname.startsWith("/dashboard");

    if (isAdminRoute && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (isClientRoute && role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    if (isClientRoute && role !== "CLIENT") {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => Boolean(token)
    },
    pages: {
      signIn: "/login"
    },
    secret: authSecret
  }
);

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"]
};
