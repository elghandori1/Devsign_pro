// components/NavLinks.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Locale } from "@/i18n-config";

type NavLinksProps = {
  locale: Locale;
  t: {
    home: string;
    about: string;
    Services: string;
    portfolio: string;
    Contact: string;
  };
};

export default function NavLinks({ locale, t }: NavLinksProps) {
  const pathname = usePathname();

  // Helper to check if a path is active
  const isActive = (path: string) => {
    const fullPath = `/${locale}${path}`;
    return pathname === fullPath;
  };

  const navItems = [
    { href: "", label: t.home },
    { href: "/services", label: t.Services },
    { href: "/about", label: t.about },
    { href: "/portfolio", label: t.portfolio },
    { href: "/contact", label: t.Contact },
  ];

  return (
   <div dir={locale === "ar" ? "rtl" : "ltr"}  className="hidden md:flex items-center gap-8 text-sm font-medium">
  {navItems.map((item) => {
    const fullHref = `/${locale}${item.href}`;
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