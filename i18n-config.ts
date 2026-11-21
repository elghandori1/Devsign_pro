// i18n-config.ts
export type ActiveLocale = "en" | "fr";
export type LanguageType = ActiveLocale;

type i18nType = {
  defaultLocale: ActiveLocale;
  locales: ActiveLocale[];
};

export const i18n: i18nType = {
  defaultLocale: "en",
  locales: ["en", "fr"],
};

export type Locale = (typeof i18n)['locales'][number];

/** BCP 47 tags for <html lang>, hreflang and schema.org inLanguage. */
export function localeToBcp47(locale: Locale): "en" | "fr-FR" {
  return locale === "en" ? "en" : "fr-FR";
}
