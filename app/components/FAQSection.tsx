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

export default function FAQSection({ faqs }: FAQSectionProps) {
  if (!faqs?.length) return null;

  return (
    <div className="mx-auto max-w-3xl px-4 pb-10 sm:px-6 sm:pb-14">
      <ul className="space-y-3 sm:space-y-4 list-none p-0 m-0">
        {faqs.map((faq, idx) => (
          <li key={idx}>
            <details
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-colors duration-200 open:border-primary/30"
            >
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 p-4 text-sm font-semibold text-foreground transition-colors hover:bg-muted/30 sm:min-h-16 sm:gap-4 sm:p-5 sm:text-base">
                <span className="leading-snug">{faq.question}</span>
                <span
                  className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs text-primary transition-transform duration-200 group-open:rotate-180"
                  aria-hidden="true"
                >
                  ▼
                </span>
              </summary>
              <div className="border-t border-border/50 px-4 pb-4 pt-3 text-sm leading-relaxed text-muted-foreground sm:px-5 sm:pb-5 sm:pt-4 sm:text-base">
                {faq.answer}
              </div>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}
