"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Locale, i18n } from "@/i18n-config";
import { useTheme } from "next-themes";

const localeLabels: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
  ar: "AR",
};

export default function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const [langOpen, setLangOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  const otherLocales = i18n.locales.filter((loc) => loc !== currentLocale);

  const toggleLanguage = (newLocale: Locale) => {
    const pathWithoutLocale = (pathname || '').replace(/^\/[a-z]{2}/, '');
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath);
    router.refresh();
    setLangOpen(false);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  let hoverTextColor = "hover:text-zinc-700";
  if (mounted) {
    const effectiveTheme =
      resolvedTheme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : resolvedTheme;

    hoverTextColor = effectiveTheme === "dark" 
      ? "hover:text-white" 
      : "hover:text-zinc-700";
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className={`flex items-center space-x-1 cursor-pointer text-zinc-500 ${hoverTextColor} transition-colors`}
        onClick={() => setLangOpen(!langOpen)}
      >
        <span className="text-sm font-medium uppercase">{currentLocale}</span>
        <svg
          className={`w-3 h-3 text-zinc-500 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {langOpen && (
        <div className="absolute top-full mt-2 right-0 min-w-[3.5rem] bg-[#050505] text-zinc-300 rounded-md shadow-xl z-50 border border-white/10 overflow-hidden">
          {otherLocales.map((loc) => (
            <button
              key={loc}
              onClick={() => toggleLanguage(loc)}
              className="block w-full text-center px-2 py-2 text-sm font-bold hover:bg-blue-500 hover:text-white transition-colors uppercase"
            >
              {localeLabels[loc]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}