import { NextResponse } from "next/server";

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  const isPublicPath = pathname === "/login" || pathname === "/register";
  const token = request.cookies.get("token")?.value || "";

  // ✅ Redirect logged-in users away from public pages
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  // ✅ Redirect unauthenticated users away from private pages
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ Allow the request
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/register", "/login", "/profile"],
};
