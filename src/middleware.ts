import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(function middleware(request: NextRequestWithAuth) {
  if (request.nextUrl.pathname.startsWith("/admin-example") && request.nextauth.token?.role !== "admin" && request.nextauth.token?.role !== "demo") {
    return NextResponse.rewrite(new URL("/denied", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/history/")) {
    const path = request.nextUrl.pathname.split("/").filter(Boolean);
    if (path[1] !== request.nextauth.token?.username) {
      return NextResponse.rewrite(new URL("/not-found", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/review/")) {
    const path = request.nextUrl.pathname.split("/").filter(Boolean);
    if (path[1] !== request.nextauth.token?.username) {
      return NextResponse.rewrite(new URL("/not-found", request.url));
    }
  }
});

export const config = {
  matcher: [
    "/admin-example/:path*",
    "/user-example/:path*",
    "/booking/:path*",
    "/history/:path*",
    "/password/:path*",
    "/profile/:path*",
    "/questionnaire/:path*",
    "/review/:path*",
  ],
};
