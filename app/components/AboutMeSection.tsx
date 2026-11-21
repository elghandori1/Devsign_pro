import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Locale } from "@/i18n-config";
import AboutMeImageSlider from "./AboutMeImageSlider";

interface AboutMeTranslations {
  sectionLabel: string;
  highlight: string;
  paragraph1: string;
  paragraph2: string;
  cta: string;
  secondaryCta?: string;
  marketLink?: {
    intro: string;
    label: string;
    href: string;
  };
}

interface AboutMeSectionProps {
  translations: AboutMeTranslations;
  locale: Locale;
  headingId?: string;
}

export default function AboutMeSection({
  translations,
  locale,
  headingId = "about-heading",
}: AboutMeSectionProps) {
  return (
    <div className="px-4 pb-10 pt-14 sm:px-6 sm:pb-14 sm:pt-16 lg:pt-20">
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto mb-10 max-w-4xl text-center sm:mb-12">
          <h2
            id={headingId}
            className="text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl"
          >
            {translations.sectionLabel}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base lg:text-lg">
            {translations.highlight}
          </p>
        </header>

        <div className="grid overflow-hidden rounded-3xl border border-border bg-card shadow-sm lg:grid-cols-[0.8fr_1.2fr]">
          <AboutMeImageSlider locale={locale} />

          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">
            <p className="text-base leading-relaxed text-foreground sm:text-lg">
              {translations.paragraph1}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {translations.paragraph2}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={`/${locale}/about`}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                {translations.cta}
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              {translations.secondaryCta ? (
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/35 hover:text-primary"
                >
                  {translations.secondaryCta}
                </Link>
              ) : null}
            </div>
            {translations.marketLink ? (
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                {translations.marketLink.intro}{" "}
                <Link
                  href={`/${locale}${translations.marketLink.href}`}
                  className="inline-flex min-h-11 items-center gap-1 font-semibold text-primary underline decoration-primary/35 underline-offset-4 hover:decoration-primary sm:min-h-0"
                >
                  {translations.marketLink.label}
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
