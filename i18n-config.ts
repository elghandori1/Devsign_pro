// i18n-config.ts
// `ar` remains in the content-locale type only so legacy component branches can
// be removed incrementally without weakening the public routing contract.
// The active locale list below is the single source of truth for generated URLs.
export type ActiveLocale = "en" | "fr";
export type LanguageType = ActiveLocale | "ar";

type i18nType = {
  defaultLocale: ActiveLocale;
  locales: LanguageType[];
};

export const i18n: i18nType = {
  defaultLocale: "en",
  locales: ["en", "fr"],
};

export type Locale = (typeof i18n)['locales'][number];

/** BCP 47 tags for <html lang>, hreflang and schema.org inLanguage. */
export function localeToBcp47(locale: Locale): "en" | "fr-FR" | "ar" {
  if (locale === "en") return "en";
  if (locale === "ar") return "ar";
  return "fr-FR";
}
