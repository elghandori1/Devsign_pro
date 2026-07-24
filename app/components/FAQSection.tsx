// components/FAQSection.tsx
import { Locale } from "@/i18n-config";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
  locale: Locale;
}

export default function FAQSection({ faqs, locale }: FAQSectionProps) {
  if (!faqs?.length) return null;
  const isRtl = locale === "ar";

  return (
    <div
      className="max-w-3xl mx-auto px-4 sm:px-6"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <ul className="space-y-3 sm:space-y-4 list-none p-0 m-0">
        {faqs.map((faq, idx) => (
          <li key={idx}>
            <details
              className="group rounded-xl border border-border bg-card overflow-hidden open:border-primary/30 open:shadow-sm transition-colors duration-200"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer p-4 sm:p-5 text-sm sm:text-base font-semibold text-foreground list-none hover:bg-muted/30 transition-colors">
                <span className="leading-snug">{faq.question}</span>
                <span
                  className="shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs group-open:rotate-180 transition-transform duration-200"
                  aria-hidden="true"
                >
                  ▼
                </span>
              </summary>
              <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm sm:text-base text-muted-foreground leading-relaxed border-t border-border/50 pt-3 sm:pt-4">
                {faq.answer}
              </div>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}