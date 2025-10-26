import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Helper function to validate JWT token format and expiry
function isValidToken(token: string): boolean {
  try {
    // Basic JWT format validation (header.payload.signature)
    const parts = token.split(".");
    if (parts.length !== 3) {
      return false;
    }

    // Decode payload to check expiry
    const payloadPart = parts[1];
    if (!payloadPart) {
      return false;
    }

    const payload = JSON.parse(atob(payloadPart));

    // Check if token has expired
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // Protected routes that require authentication
  if (pathname.startsWith("/dashboard")) {
    if (!token || !isValidToken(token)) {
      const response = NextResponse.redirect(new URL("/login", req.url));
      // Clear invalid token
      if (token && !isValidToken(token)) {
        response.cookies.delete("token");
      }
      return response;
    }
  }

  // Redirect to appropriate dashboard if already logged in and trying to access auth pages
  if ((pathname === "/login" || pathname === "/register") && token && isValidToken(token)) {
    // Try to decode the token to get the user's role
    try {
      const parts = token.split(".");
      const payloadPart = parts[1];
      if (payloadPart) {
        const payload = JSON.parse(atob(payloadPart));
        const redirectPath = payload.role === "ARTIST" ? "/dashboard/artist" : "/dashboard/venue";
        return NextResponse.redirect(new URL(redirectPath, req.url));
      }
    } catch (error) {
      // If we can't decode, just redirect to artist dashboard as default
      return NextResponse.redirect(new URL("/dashboard/artist", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
