// components/WhyWeAreSection.tsx
import { Locale } from "@/i18n-config";
import { CheckCircle2 } from "lucide-react";

interface Reason {
  title: string;
  description: string;
}

interface WhyWeAreTranslations {
  sectionLabel: string;
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
    <div
      className="pb-4 sm:pb-6 transition-colors duration-300"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* ── Intro ── */}
        <div className="text-center mb-8 sm:mb-10">
          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {translations.description}
          </p>
        </div>

        {/* ── Reason Cards ── */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 list-none p-0 m-0">
          {translations.reasons.map((reason, index) => (
            <li
              key={index}
              className="group p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-border bg-card/50 hover:bg-card hover:border-primary/30 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col gap-3 sm:gap-4">
                {/* Icon */}
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300 shrink-0"
                  aria-hidden="true"
                >
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-bold text-foreground mb-1.5 sm:mb-2 text-base sm:text-lg leading-tight">
                    {reason.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
