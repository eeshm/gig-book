// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(req: NextRequest) {
//   const token = req.cookies.get("token")?.value;
//   const { pathname } = req.nextUrl;

//   // Protected routes that require authentication
//   if (pathname.startsWith("/dashboard")) {
//     if (!token) {
//       return NextResponse.redirect(new URL("/login", req.url));
//     }
//   }

//   // Redirect to dashboard if already logged in and trying to access auth pages
//   if ((pathname === "/login" || pathname === "/register") && token) {
//     return NextResponse.redirect(new URL("/dashboard/artist", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/login", "/register"],
// };

// Currently, no middleware is implemented.
export function middleware() {
  return;
}