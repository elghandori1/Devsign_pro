// i18n-config.ts
export type LanguageType = "en" | "fr" | "ar";

type i18nType = {
  defaultLocale: LanguageType;
  locales: LanguageType[];
};

export const i18n: i18nType = {
  defaultLocale: "en",
  locales: ["en", "fr", "ar"],
};

export type Locale = (typeof i18n)['locales'][number];

/** BCP 47 tags for <html lang> and schema.org inLanguage. */
export function localeToBcp47(locale: Locale): "en-US" | "fr-MA" | "ar-MA" {
  if (locale === "en") return "en-US";
  if (locale === "ar") return "ar-MA";
  return "fr-MA";
}