import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const privateRoutes = ["/add-car", "/my-bookings", "/my-cars"];

export default async function proxy(request) {
  const { pathname } = request.nextUrl;

  if (privateRoutes.some((route) => pathname.startsWith(route))) {
    let session;
    try {
      session = await auth.api.getSession({
        headers: await headers(),
      });
    } catch (error) {
      console.error("Proxy session check failed:", error);
      return NextResponse.next();
    }

    // console.log("[proxy] Session found for:", pathname, session?.user?.email);

    if (!session) {
      // console.log("[proxy] No session, redirecting to /login from:", pathname);
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
}

export const config = {
  matcher: ["/add-car/:path*", "/my-bookings/:path*", "/my-cars/:path*"],
};
