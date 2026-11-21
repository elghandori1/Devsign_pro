import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Gauge,
  MousePointerClick,
  SearchX,
  type LucideIcon,
} from "lucide-react";
import type { Locale } from "@/i18n-config";

interface ProblemItem {
  title: string;
  description: string;
}

interface CustomerProblemsContent {
  eyebrow: string;
  heading: string;
  introduction: string;
  items: ProblemItem[];
  solutionTitle: string;
  solutionDescription: string;
  cta: string;
  secondaryCta: string;
}

interface CustomerProblemsSectionProps {
  content: CustomerProblemsContent;
  locale: Locale;
}

const ICONS: LucideIcon[] = [SearchX, MousePointerClick, Gauge, Bot];

export default function CustomerProblemsSection({
  content,
  locale,
}: CustomerProblemsSectionProps) {
  return (
    <section
      className="relative isolate overflow-hidden border-b border-border/70 py-16 sm:py-20 lg:py-24"
      aria-labelledby="customer-problems-heading"
    >
      <div
        className="absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            {content.eyebrow}
          </p>
          <h2
            id="customer-problems-heading"
            className="mt-3 text-[1.35rem] font-bold leading-[1.2] tracking-tight text-foreground sm:text-3xl lg:text-4xl"
          >
            {content.heading}
          </h2>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {content.introduction}
          </p>
        </div>

        <ul className="mt-10 grid list-none gap-4 p-0 sm:mt-12 sm:grid-cols-2 lg:gap-5">
          {content.items.map((item, index) => {
            const Icon = ICONS[index % ICONS.length];

            return (
              <li key={item.title} className="flex">
                <article className="group flex w-full gap-4 rounded-2xl border border-border bg-card/70 p-5 shadow-sm transition-colors duration-300 hover:border-primary/35 hover:bg-card sm:gap-5 sm:p-6">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground sm:h-12 sm:w-12"
                    aria-hidden="true"
                  >
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold leading-snug text-foreground sm:text-lg">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
                      {item.description}
                    </p>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 flex flex-col gap-5 rounded-2xl border border-primary/20 bg-primary/[0.06] p-5 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:p-6 lg:p-7">
          <div className="max-w-3xl">
            <h3 className="text-lg font-bold text-foreground sm:text-xl">
              {content.solutionTitle}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {content.solutionDescription}
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Link
              href={`/${locale}/services/technical-seo`}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {content.cta}
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link
              href={`/${locale}/services/seo-content-optimization`}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-primary/25 bg-background px-5 py-3 text-sm font-semibold text-primary transition-colors hover:border-primary/50 hover:bg-primary/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {content.secondaryCta}
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
