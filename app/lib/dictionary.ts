// app/lib/dictionary.ts
import "server-only";
import { cache } from "react";
import { Locale, i18n } from "@/i18n-config";

const dictionaries = {
  en: () => import("@/app/dictionaries/en.json").then((module) => module.default),
  fr: () => import("@/app/dictionaries/fr.json").then((module) => module.default),
  ar: () => import("@/app/dictionaries/ar.json").then((module) => module.default),
};

export const getDictionary = cache(async (locale: Locale) => {
  const validLocale = i18n.locales.includes(locale) ? locale : i18n.defaultLocale;
  const loadDict = dictionaries[validLocale] || dictionaries[i18n.defaultLocale];
  
  return loadDict();
});