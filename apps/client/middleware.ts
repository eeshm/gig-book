// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(req: NextRequest) {
//     const token = req.cookies.get("token")?.value;
//     const url = req.nextUrl.pathname;

//     if(!token && url.startsWith("/dashboard")){
//         return NextResponse.redirect(new URL("/login", req.url));
//     }
//     if(token && (url === "/login" || url === "/register")){
//         return NextResponse.redirect(new URL("/dashboard", req.url));
//     }
//     return NextResponse.next();
// }

// export const config = {
//     matcher: ["/dashboard/:path*","/login","/register"],
// };
export function middleware() {
    // Middleware is currently disabled.
    return;
}