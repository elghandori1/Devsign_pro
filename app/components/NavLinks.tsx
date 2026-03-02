// components/NavLinks.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Locale } from "@/i18n-config";

type NavLinksProps = {
  lang: Locale;
  t: {
    home: string;
    about: string;
    Services: string;
    portfolio: string;
    Contact: string;
  };
};

export default function NavLinks({ lang, t }: NavLinksProps) {
  const pathname = usePathname();

  // Helper to check if a path is active
  const isActive = (path: string) => {
    // Normalize paths: ensure they start with /{lang}
    const fullPath = `/${lang}${path}`;
    return pathname === fullPath;
  };
const locale = lang;
  const navItems = [
    { href: "", label: t.home },
    { href: "/about", label: t.about },
    { href: "/services", label: t.Services },
    { href: "/portfolio", label: t.portfolio },
    { href: "/contact", label: t.Contact },
  ];

  return (
   <div dir={locale === "ar" ? "rtl" : "ltr"}  className="hidden md:flex items-center gap-8 text-sm font-medium">
  {navItems.map((item) => {
    const fullHref = `/${lang}${item.href}`;
    const active = isActive(item.href);

    return (
      <Link
        key={item.href}
        href={fullHref}
        className={`transition-colors relative hover:text-blue-500 dark:hover:text-blue-400 ${
          active ? "text-blue-500 dark:text-blue-400" : "text-foreground"
        }`}
      >
        {item.label}
        {active && (
          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 dark:bg-blue-400 rounded-full" />
        )}
      </Link>
    );
  })}
</div>
  );
}