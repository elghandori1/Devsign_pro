// components/AboutMeSection.tsx
import { Locale } from "@/i18n-config";
import Link from "next/link";
import AboutMeImageSlider from "./AboutMeImageSlider";

interface AboutMeTranslations {
  sectionLabel?: string;
  highlight: string;
  paragraph1: string;
  paragraph2: string;
  cta: string;
}

interface AboutMeSectionProps {
  translations: AboutMeTranslations;
  locale: Locale;
}

const ABOUT_IMAGES = [
  "/images/about/profile1.png",
  "/images/about/profile2.jpg",
  "/images/about/profile3.jpg",
  "/images/about/profile4.jpg",
  "/images/about/profile5.jpg",
];

export default function AboutMeSection({
  translations,
  locale,
}: AboutMeSectionProps) {
  const isRtl = locale === "ar";

  return (
    <div
      className="relative pt-4 pb-8 sm:pb-10 overflow-hidden"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-muted/20 to-transparent"
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12">
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto text-center leading-relaxed mb-12 sm:mb-14">
            {translations.highlight}
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* ── Image Slider (Client Component) ── */}
          <AboutMeImageSlider images={ABOUT_IMAGES} locale={locale} />
          {/* ── Text Content ── */}
          <div className={isRtl ? "text-right" : "text-left"}>
            <p className="text-sm sm:text-base lg:text-lg text-foreground leading-relaxed mb-4 sm:mb-6">
              {translations.paragraph1}
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed mb-6 sm:mb-10 max-w-xl">
              {translations.paragraph2}
            </p>
            <Link
              href={`/${locale}/about`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg hover:shadow-primary/40 hover:-translate-y-1 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              {translations.cta}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}