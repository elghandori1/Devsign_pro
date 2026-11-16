// app/lib/dictionary.ts
import "server-only";
import { cache } from "react";
import { ActiveLocale, Locale, i18n } from "@/i18n-config";

const dictionaries = {
  en: () => import("@/app/dictionaries/en.json").then((module) => module.default),
  fr: () => import("@/app/dictionaries/fr.json").then((module) => module.default),
};

export const getDictionary = cache(async (locale: Locale) => {
  const validLocale: ActiveLocale = i18n.locales.includes(locale as ActiveLocale)
    ? (locale as ActiveLocale)
    : i18n.defaultLocale;
  const loadDict = dictionaries[validLocale];
  
  return loadDict();
});
