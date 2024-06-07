import { NextRequest, NextResponse } from "next/server";

import { isValidAdminPassword } from "./core/util/auth/authUtils";

export async function middleware(req: NextRequest) {
  if (await isAuthenticated(req) === false) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic',
      },
    });
  }
}

export async function isAuthenticated(req: NextRequest) {
  const authHeader = req.headers.get("Authorization") ||
    req.headers.get("authorization");

  if (authHeader === null) {
    return false
  }

  const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64")
    .toString().split(":");

  return process.env.ADMIN_USERNAME === username &&
    (await isValidAdminPassword(password));
}

export const config = {
  matcher: "/admin/:path*",
}
