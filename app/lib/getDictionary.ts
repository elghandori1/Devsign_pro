// /app/lib/getDictionary.ts
import "server-only";
import en from "@/app/dictionaries/en.json";
import fr from "@/app/dictionaries/fr.json";
import { Locale } from "@/i18n-config";

export async function getDictionary(locale: Locale) {
  switch (locale) {
    case "fr": return fr;
    default: return en;
  }
}