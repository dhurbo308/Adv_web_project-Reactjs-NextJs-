import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const hasSession = req.cookies.has("connect.sid"); // Express-session cookie

  const url = req.nextUrl.clone();

  if (req.nextUrl.pathname.startsWith("/seller") && !hasSession) {
    url.pathname = "/seller/login";
    return NextResponse.redirect(url);
  }

  if (req.nextUrl.pathname.startsWith("/admin") && !hasSession) {
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
