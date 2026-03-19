import { Locale } from "@/i18n-config";
import AboutMeSectionAnimated from "./AboutMeSectionAnimated";

interface AboutMeTranslations {
  sectionLabel?: string;
  subtitle: string;
  highlight: string;
  paragraph1: string;
  paragraph2: string;
  cta: string;
}

interface AboutMeSectionProps {
  translations: AboutMeTranslations;
  locale: Locale;
}

export default function AboutMeSection({
  translations,
  locale,
}: AboutMeSectionProps) {
  const isRtl = locale === "ar";

  return (
    <section
      id="about"
      className="relative pt-4 pb-8 sm:pb-10 overflow-hidden"
      dir={isRtl ? "rtl" : "ltr"}
      aria-labelledby="about-subtitle"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-muted/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-14">
          <h3
            id="about-subtitle"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-[1.2] text-foreground"
          >
            {translations.subtitle}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70 mt-2">
              {translations.highlight}
            </span>
          </h3>
        </div>

        <AboutMeSectionAnimated
          paragraph1={translations.paragraph1}
          paragraph2={translations.paragraph2}
          cta={translations.cta}
          locale={locale}
        />
      </div>
    </section>
  );
}