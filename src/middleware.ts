import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from "../routes";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const userStorageCookie = request.cookies.get("user-storage")?.value;

  let isAuthenticated = false;
  let user = null;

  if (userStorageCookie) {
    try {
      const parsedStorage = JSON.parse(userStorageCookie);
      isAuthenticated = parsedStorage.state.isAuthenticated;
      user = {
        user: parsedStorage.state.user,
        token: parsedStorage.state.user.token,
      };
    } catch (error) {
      console.error("Error parsing user-storage cookie:", error);
    }
  } else {
    console.log("No user-storage cookie found");
  }

  const isPublicRoute = publicRoutes.includes(path);
  const isAuthRoute = authRoutes.includes(path);

  if (isAuthRoute) {
    if (isAuthenticated) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, request.url));
    }
    return NextResponse.next();
  }

  if (!isAuthenticated && !isPublicRoute) {
    const signInUrl = new URL("/signin", request.url);
    signInUrl.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(signInUrl);
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-user", user ? JSON.stringify(user) : "");

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
