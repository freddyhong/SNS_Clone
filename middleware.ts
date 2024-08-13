import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface Routes {
  [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
  "/login": true,
  "/create-account": true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  console.log(session);
  const exists = publicOnlyUrls[request.nextUrl.pathname];
  if (!session.id && !exists) {
    return Response.redirect(new URL("/login", request.url));
  }
}
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
