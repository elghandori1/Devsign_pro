import { Locale } from "@/i18n-config";
import AboutMeSectionAnimated from "./AboutMeSectionAnimated";

interface AboutMeTranslations {
  sectionLabel?: string;
  subtitle: string;
  paragraph1: string;
  paragraph2: string;
  cta: string;
}

interface AboutMeSectionProps {
  translations: AboutMeTranslations;
  locale: Locale;
}

const ABOUT_IMAGE = "/images/md-ishak-raman-x45xE1P6Fe4-unsplash.jpg";

export default function AboutMeSection({ translations, locale }: AboutMeSectionProps) {
  const isRtl = locale === "ar";

  return (
    <section
      id="about"
      className="relative pt-4 pb-10 overflow-hidden"
      dir={isRtl ? "rtl" : "ltr"}
      aria-labelledby="about-subtitle"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-muted/20 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h3
            id="about-subtitle"
            className="text-gray-600 uppercase tracking-widest text-sm font-semibold"
          >
            {translations.subtitle}
          </h3>
        </div>
        <AboutMeSectionAnimated
          imageSrc={ABOUT_IMAGE}
          paragraph1={translations.paragraph1}
          paragraph2={translations.paragraph2}
          cta={translations.cta}
          locale={locale}
        />
      </div>
    </section>
  );
}
