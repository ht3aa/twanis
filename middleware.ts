import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("accessToken")?.value;


  if (
    request.nextUrl.pathname === "/user/login" ||
    request.nextUrl.pathname === "/user/register" ||
    request.nextUrl.pathname === "/"
  ) {
    return NextResponse.next();
  } else {
    if (!currentUser) {
      return NextResponse.redirect("http://localhost:3000/user/login");
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
