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