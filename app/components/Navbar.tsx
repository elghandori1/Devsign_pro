// components/Navbar.tsx
import Link from "next/link";
import { Phone } from "lucide-react";
import { Locale } from "@/i18n-config";
import LanguageSwitcher from "./LanguageSwitcher";
import { getDictionary } from "@/app/lib/dictionary";
import { ThemeToggle } from "./ThemeToggle";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import infos from "@/app/dictionaries/global.json";

type NavbarProps = {
  locale: Locale;
};

const CALL_LABEL: Record<Locale, string> = {
  en: "Call",
  fr: "Appeler le",
};

export default async function Navbar({ locale }: NavbarProps) {
const fullDictionary = await getDictionary(locale);
  const t = fullDictionary.navbar;

  return (
    <nav dir="ltr" className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6">
        <Link href={`/${locale}`} className="flex min-h-11 items-center gap-2 font-bold text-xl tracking-tight text-foreground hover:opacity-80 transition-opacity">
          <span>Devsignpro</span>
        </Link>
        <div className="hidden md:block">
          <NavLinks locale={locale} t={t} />
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <a
            href={infos.phoneNumberLink}
            aria-label={`${CALL_LABEL[locale]} ${infos.phoneNumberDisplay}`}
            className="inline-flex size-11 items-center justify-center gap-2 rounded-full border border-primary/25 bg-primary/10 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 lg:w-auto lg:px-3.5"
          >
            <Phone size={15} aria-hidden="true" />
            <span className="hidden lg:inline whitespace-nowrap">
              {infos.phoneNumberDisplay}
            </span>
          </a>
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher currentLocale={locale} />
            <ThemeToggle />
          </div>
          <div className="md:hidden">
            <MobileMenu locale={locale} t={t} />
          </div>
        </div>
      </div>
    </nav>
  );
}
