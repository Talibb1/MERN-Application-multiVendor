import { NextResponse, type NextRequest } from "next/server";

const authPaths: string[] = ["/signin", "/signup", "/forgot-password"];
const protectedPaths: string[] = [
  "/dashboard",
  "/Leads",
  "/settings",
  "/profile",
  "/account",
];

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get("isAuth")?.value === "true";
  const url = request.nextUrl.clone();

  if (isAuthenticated && authPaths.includes(url.pathname)) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (!isAuthenticated && protectedPaths.includes(url.pathname)) {
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next|.*\\..*).*)",
    "/signin",
    "/signup",
    "/forgot-password",
    "/dashboard",
    "/profile",
    "/security",
    "/account",
    "/Leads",
    "/Contacts",
    "/Settings",
  ],
};
