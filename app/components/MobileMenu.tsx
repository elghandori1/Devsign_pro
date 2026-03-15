"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Locale } from "@/i18n-config";
import LanguageSwitcher from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";

type MobileMenuProps = {
  lang: Locale;
  t: {
    home: string;
    about: string;
    Services: string;
    portfolio: string;
    Contact: string;
  };
};

export default function MobileMenu({ lang, t }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "", label: t.home },
    { href: "/services", label: t.Services },
    { href: "/about", label: t.about },
    { href: "/portfolio", label: t.portfolio },
    { href: "/contact", label: t.Contact },
  ];

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center justify-center w-10 h-10 rounded-lg text-foreground hover:bg-muted transition-colors"
      >
        <Menu className="w-6 h-6" />
      </button>

      <div
        className={`fixed inset-0 z-[100] bg-background transition-all duration-300 ease-in-out ${open ? "translate-x-0 opacity-100 visible" : "translate-x-full opacity-0 invisible"
          }`}
      >
        <div className="flex flex-col h-full w-full px-6 py-4">

          {/* Header row */}
          <div className="flex items-center justify-between h-16 border-b border-border">
            <span className="font-bold text-lg text-foreground tracking-tight">Devsign</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center w-10 h-10 rounded-lg text-foreground hover:bg-muted transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 flex flex-col py-8 px-2 space-y-2 bg-card rounded-md shadow-sm">
            {navItems.map((item) => {
              const fullHref = item.href === "" ? `/${lang}` : `/${lang}${item.href}`;
              const active = pathname === fullHref || (pathname === `/${lang}` && item.href === "");

              return (
                <Link
                  key={item.href}
                  href={fullHref}
                  className={`flex items-center justify-between p-4 text-xl font-semibold rounded-xl transition-all border-b border-blue-500/30 ${active
                      ? "bg-primary text-primary-foreground shadow-md border-blue-500"
                      : "text-foreground hover:bg-muted"
                    }`}
                >
                  {item.label}
                  {active && <div className="w-2 h-2 rounded-full bg-primary-foreground animate-pulse" />}
                </Link>
              );
            })}
          </nav>

          <div className="pb-10 pt-2 border-t border-border">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between bg-card p-5 rounded-2xl border border-border shadow-sm">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-card-foreground">Language & Theme</span>
                </div>
                <div className="flex items-center gap-3">
                  <LanguageSwitcher currentLocale={lang} />
                  <div className="w-[1px] h-6 bg-border" />
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}