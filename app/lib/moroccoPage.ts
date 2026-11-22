// app/lib/moroccoPage.ts
// The Morocco market page uses a native-language URL in each locale, so the
// English slug matches English searches ("seo consultant morocco") and the
// French slug matches French ones ("consultant seo maroc").
export const MOROCCO_PAGE_PATHS = {
  fr: "/consultant-seo-developpeur-web-maroc",
  en: "/seo-consultant-web-developer-morocco",
} as const;

export type MoroccoLocale = keyof typeof MOROCCO_PAGE_PATHS;

/** Returns the Morocco page path in another locale, or null for any other page. */
export function moroccoPathFor(pathWithoutLocale: string, locale: string): string | null {
  const isMoroccoPage = Object.values(MOROCCO_PAGE_PATHS).some((path) => path === pathWithoutLocale);
  if (!isMoroccoPage) return null;
  return MOROCCO_PAGE_PATHS[locale as MoroccoLocale] ?? null;
}
