import { Locale } from "@/i18n-config";
import WhyWeAreIntroAnimated from "./WhyWeAreIntroAnimated";
import WhyWeAreReasonsAnimated from "./WhyWeAreReasonsAnimated";

interface Reason {
  title: string;
  description: string;
}

interface WhyWeAreTranslations {
  sectionLabel: string;
  subtitle: string;
  description: string;
  reasons: Reason[];
}

interface WhyWeAreSectionProps {
  translations: WhyWeAreTranslations;
  locale: Locale;
}

export default function WhyWeAreSection({
  translations,
  locale,
}: WhyWeAreSectionProps) {
  if (!translations?.reasons?.length) return null;
  const isRtl = locale === "ar";

  return (
    <section
      id="why-us"
      className="py-4 sm:py-6 transition-colors duration-300"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <WhyWeAreIntroAnimated
          description={translations.description}
          subtitle={translations.subtitle}
        />
        <WhyWeAreReasonsAnimated reasons={translations.reasons} />
      </div>
    </section>
  );
}
