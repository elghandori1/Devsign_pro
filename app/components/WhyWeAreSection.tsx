"use client";

import { Locale } from "@/i18n-config";
import { CheckCircle2 } from "lucide-react";

interface Reason {
  title: string;
  description: string;
}

interface WhyWeAreTranslations {
  title: string;
  subtitle: string;
  description: string;
  reasons: Reason[];
}

interface WhyWeAreSectionProps {
  translations: WhyWeAreTranslations;
  locale: Locale;
}

export default function WhyWeAreSection({ translations, locale }: WhyWeAreSectionProps) {
  if (!translations?.reasons?.length) return null;
  const isRtl = locale === "ar";

  return (
    <section
      className="py-2 transition-colors duration-300"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Intro Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-md sm:text-lg text-muted-foreground leading-relaxed italic mb-8">
            &ldquo;{translations.description}&rdquo;
          </p>
          <h3 className="text-gray-600 font-bold uppercase tracking-widest text-sm">
            {translations.subtitle}
          </h3>
        </div>

        {/* Reasons Grid - Simple and Normal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {translations.reasons.map((reason, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl border border-border bg-card/50 hover:bg-card hover:border-primary/30 transition-all duration-300 shadow-sm"
            >
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                  <CheckCircle2 className="w-6 h-6 text-primary group-hover:text-white" />
                </div>
                
                <div>
                  <h3 className="font-bold text-foreground mb-2 text-lg leading-tight">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}