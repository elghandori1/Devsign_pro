// components/Navbar.tsx
import Link from "next/link";
import { Locale } from "@/i18n-config";
import LanguageSwitcher from "./LanguageSwitcher";
import { getDictionary } from "@/app/lib/dictionary";
import { ThemeToggle } from "./ThemeToggle";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";

type NavbarProps = {
  lang: Locale;
};

export default async function Navbar({ lang }: NavbarProps) {
const fullDictionary = await getDictionary(lang);
  const t = fullDictionary.navbar;

  return (
    <nav dir="ltr" className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6">
        <Link href={`/${lang}`} className="flex items-center gap-2 font-bold text-xl tracking-tight text-foreground hover:opacity-80 transition-opacity">
          <span>Devsign</span>
        </Link>
        <div className="hidden md:block">
          <NavLinks lang={lang} t={t} />
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher currentLocale={lang} />
            <ThemeToggle />
          </div>
          <div className="md:hidden">
            <MobileMenu lang={lang} t={t} />
          </div>
        </div>
      </div>
    </nav>
  );
}