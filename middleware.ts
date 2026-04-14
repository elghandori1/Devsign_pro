// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { i18n } from "./i18n-config";

const STATIC_PATH_PATTERN = /^\/(_next|favicon|logo|images|cover)/;
const LOCALE_PATH_PATTERN = new RegExp(`^/(${i18n.locales.join('|')})(/|$)`);

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  if (STATIC_PATH_PATTERN.test(pathname)) {
    return NextResponse.next();
  }

  const pathnameHasValidLocale = LOCALE_PATH_PATTERN.test(pathname);
  if (!pathnameHasValidLocale) {
    const newUrl = new URL(`/${i18n.defaultLocale}${pathname}`, request.url);
    return NextResponse.rewrite(newUrl); 
  }
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-url', request.url);
  
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    // Exclude API routes, Next static/image assets, and global static files
    '/((?!api|_next/static|_next/image|favicon.ico|favicon-96x96.png|favicon.svg|apple-touch-icon.png|web-app-manifest-192x192.png|web-app-manifest-512x512.png|robots.txt|sitemap.xml|site.webmanifest|logo|cover).*)',
  ],
};