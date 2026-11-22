// proxy.ts
import { NextRequest, NextResponse } from "next/server";
import { i18n } from "./i18n-config";

const STATIC_PATH_PATTERN = /^\/(_next|favicon|logo|images|cover|CV|llms)/;
const LOCALE_PATH_PATTERN = new RegExp(`^/(${i18n.locales.join('|')})(/|$)`);

/**
 * Picks the visitor's language for a link without a locale (e.g. a shared
 * "devsignpro.com" link). English-first browsers get /en; everyone else,
 * including crawlers that send no Accept-Language, gets French (default).
 */
function preferredLocale(request: NextRequest) {
  const header = request.headers.get("accept-language") ?? "";
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().toLowerCase().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return { lang: tag.split("-")[0], q: q ? Number(q.trim().slice(2)) || 0 : 1 };
    })
    .filter((entry) => entry.lang && entry.q > 0)
    .sort((a, b) => b.q - a.q);
  const match = ranked.find((entry) => (i18n.locales as string[]).includes(entry.lang));
  return match ? match.lang : i18n.defaultLocale;
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (STATIC_PATH_PATTERN.test(pathname)) {
    return NextResponse.next();
  }

  const pathnameHasValidLocale = LOCALE_PATH_PATTERN.test(pathname);
  if (!pathnameHasValidLocale) {
    const newUrl = request.nextUrl.clone();
    newUrl.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
    // Temporary redirect: the target depends on the browser language, so it
    // must not be cached as permanent. Canonicals and hreflang stay on the
    // /fr and /en URLs, with x-default pointing to French.
    const response = NextResponse.redirect(newUrl, 307);
    response.headers.set("Vary", "Accept-Language");
    return response;
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
    '/((?!api|_next/static|_next/image|favicon\\.ico|favicon\\.png|favicon-.*\\.png|apple-touch-icon\\.png|mstile-.*\\.png|web-app-manifest-.*\\.png|browserconfig\\.xml|robots\\.txt|sitemap\\.xml|llms\\.txt|llms-full\\.txt|site\\.webmanifest|indexnow-key\\.txt|[a-f0-9]{32}\\.txt|logo|cover|CV|images).*)',
  ],
};
