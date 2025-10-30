import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

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

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // Check for NextAuth session (for OAuth users)
  const nextAuthToken = await getToken({ 
    req, 
    secret: process.env.NEXTAUTH_SECRET 
  });

  // User is authenticated if they have either:
  // 1. A valid JWT token (email/password auth)
  // 2. A NextAuth session (OAuth auth)
  const isAuthenticated = (token && isValidToken(token)) || !!nextAuthToken;

  // Get user's role
  let userRole: string | null = null;
  
  if (nextAuthToken?.role) {
    userRole = nextAuthToken.role as string;
  } else if (token) {
    try {
      const parts = token.split(".");
      const payloadPart = parts[1];
      if (payloadPart) {
        const payload = JSON.parse(atob(payloadPart));
        userRole = payload.role;
      }
    } catch (error) {
      // Can't decode token
    }
  }

  // Protected routes that require authentication
  if (pathname.startsWith("/dashboard")) {
    if (!isAuthenticated) {
      const response = NextResponse.redirect(new URL("/login", req.url));
      // Clear invalid token if it exists
      if (token && !isValidToken(token)) {
        response.cookies.delete("token");
      }
      return response;
    }

    // Check if user is accessing the correct dashboard based on their role
    if (userRole) {
      const isArtistRoute = pathname.startsWith("/dashboard/artist");
      const isVenueRoute = pathname.startsWith("/dashboard/venue");
      const isBookingsRoute = pathname.startsWith("/dashboard/bookings");

      // If accessing artist dashboard but user is a venue
      if (isArtistRoute && userRole === "VENUE") {
        console.warn("VENUE user tried to access artist dashboard, redirecting...");
        return NextResponse.redirect(new URL("/dashboard/venue", req.url));
      }

      // If accessing venue dashboard but user is an artist
      if (isVenueRoute && userRole === "ARTIST") {
        console.warn("ARTIST user tried to access venue dashboard, redirecting...");
        return NextResponse.redirect(new URL("/dashboard/artist", req.url));
      }

      // Bookings page is accessible to both, but redirect to their own dashboard if accessing directly
      if (isBookingsRoute) {
        // Bookings is fine for both roles
      }
    }
  }

  // Redirect to appropriate dashboard if already logged in and trying to access auth pages
  if ((pathname === "/login" || pathname === "/register") && isAuthenticated) {
    // Try to determine the user's role
    let redirectPath = "/dashboard/artist"; // default

    // Check if user has role in NextAuth token
    if (nextAuthToken?.role) {
      redirectPath = nextAuthToken.role === "ARTIST" ? "/dashboard/artist" : "/dashboard/venue";
    } else if (token) {
      // Try to decode the JWT token to get the user's role
      try {
        const parts = token.split(".");
        const payloadPart = parts[1];
        if (payloadPart) {
          const payload = JSON.parse(atob(payloadPart));
          redirectPath = payload.role === "ARTIST" ? "/dashboard/artist" : "/dashboard/venue";
        }
      } catch (error) {
        // If we can't decode, just use default
      }
    }

    return NextResponse.redirect(new URL(redirectPath, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
