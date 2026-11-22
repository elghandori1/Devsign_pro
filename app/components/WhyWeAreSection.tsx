import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Locale } from "@/i18n-config";

interface Reason {
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
}

interface WhyWeAreTranslations {
  sectionLabel: string;
  description: string;
  reasons: Reason[];
}

interface WhyWeAreSectionProps {
  translations: WhyWeAreTranslations;
  locale: Locale;
  headingId?: string;
}

export default function WhyWeAreSection({
  translations,
  locale,
  headingId = "why-us-heading",
}: WhyWeAreSectionProps) {
  if (!translations?.reasons?.length) return null;
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
            {translations.description}
          </p>
        </header>

        <ul className="m-0 grid list-none gap-4 p-0 sm:gap-6 lg:grid-cols-3">
          {translations.reasons.map((reason, index) => (
            <li key={reason.title} className="flex">
              <article className="group flex w-full flex-col rounded-2xl border border-border bg-card p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 sm:p-7">
                <div className="flex items-center justify-between">
                  <div
                    className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
                    aria-hidden="true"
                  >
                    <CheckCircle2 size={24} />
                  </div>
                  <span className="text-sm font-semibold tracking-[0.16em] text-primary" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold leading-snug text-foreground sm:text-xl">
                  {reason.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {reason.description}
                </p>
                {reason.href && reason.linkLabel ? (
                  <Link
                    href={`/${locale}${reason.href}`}
                    className="mt-auto inline-flex min-h-11 items-center gap-2 pt-4 text-sm font-semibold text-primary underline-offset-4 hover:underline"
                  >
                    {reason.linkLabel}
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                ) : null}
              </article>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
