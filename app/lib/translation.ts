// /app/lib/translation.ts
import "server-only";
import { Locale, i18n } from "@/i18n-config";
import fs from "fs/promises";
import path from "path";

export default async function getTrans(locale: Locale) {
const validLocale = i18n.locales.includes(locale) ? locale : i18n.defaultLocale;
 
const filePath = path.join(process.cwd(), "app", "dictionaries", `${validLocale}.json`);
  try {
    const fileContents = await fs.readFile(filePath, "utf8");
        return JSON.parse(fileContents);
  } catch (error) {
    console.error(`Error loading translation file for ${validLocale}:`, error);
    return {}; 
  }
}