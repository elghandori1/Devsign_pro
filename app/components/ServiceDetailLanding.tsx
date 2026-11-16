import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  CircleGauge,
  Code2,
  Database,
  LayoutTemplate,
  Search,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { serializeJsonLd } from "@/app/lib/serializeJsonLd";
import type { Locale } from "@/i18n-config";

export type ServiceCard = { title: string; text: string };
export type ServiceLandingContent = {
  breadcrumb: { label: string; home: string; services: string; current: string };
  hero: {
    eyebrow: string;
    heading: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    price: string;
    priceNote: string;
    promise: string[];
    imageAlt: string;
    imageCaption: string;
  };
  problems: { eyebrow: string; heading: string; description: string; items: string[] };
  definition: { eyebrow: string; heading: string; answer: string; note: string };
  deliverables: { eyebrow: string; heading: string; description: string; items: ServiceCard[] };
  choices: { eyebrow: string; heading: string; description: string; items: ServiceCard[] };
  process: { eyebrow: string; heading: string; description: string; steps: ServiceCard[] };
  considerations: { eyebrow: string; heading: string; description: string; items: string[] };
  bridge: { heading: string; description: string; href: string; label: string };
  useCases: { eyebrow: string; heading: string; items: ServiceCard[] };
  faq: { eyebrow: string; heading: string; items: { q: string; a: string }[] };
  related: { heading: string; items: { title: string; href: string; label: string }[] };
  cta: { heading: string; description: string; button: string };
};

type Props = {
  locale: Locale;
  image: string;
  schema: unknown;
  landing: ServiceLandingContent;
  headingId: string;
  scopeId: string;
};

const DELIVERABLE_ICONS = [
  LayoutTemplate,
  Smartphone,
  Search,
  CircleGauge,
  ShieldCheck,
  Database,
  Code2,
] as const;

export default function ServiceDetailLanding({
  locale,
  image,
  schema,
  landing,
  headingId,
  scopeId,
}: Props) {
  return (
    <main className="bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
      />

      <section
        aria-labelledby={headingId}
        className="relative overflow-hidden border-b border-border hero-section-light"
      >
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,color-mix(in_srgb,var(--primary)_14%,transparent),transparent_34%),radial-gradient(circle_at_88%_74%,color-mix(in_srgb,var(--primary)_9%,transparent),transparent_30%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:py-20">
          <nav
            aria-label={landing.breadcrumb.label}
            className="mb-8 text-sm text-muted-foreground"
          >
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link
                  href={`/${locale}`}
                  className="inline-flex min-h-11 min-w-11 items-center hover:text-primary"
                >
                  {landing.breadcrumb.home}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href={`/${locale}/services`}
                  className="inline-flex min-h-11 items-center hover:text-primary"
                >
                  {landing.breadcrumb.services}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-foreground">
                {landing.breadcrumb.current}
              </li>
            </ol>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.75fr)] lg:gap-16">
            <header>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                {landing.hero.eyebrow}
              </p>
              <h1
                id={headingId}
                className="mt-4 max-w-4xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl"
              >
                {landing.hero.heading}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {landing.hero.description}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 font-semibold text-primary">
                  {landing.hero.price}
                </span>
                <span className="text-sm text-muted-foreground">
                  {landing.hero.priceNote}
                </span>
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  {landing.hero.primaryCta}
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
                <a
                  href={`#${scopeId}`}
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border bg-card px-6 py-3 font-semibold transition hover:border-primary/40 hover:text-primary"
                >
                  {landing.hero.secondaryCta}
                </a>
              </div>
              <ul className="mt-7 grid gap-3 text-sm sm:grid-cols-3">
                {landing.hero.promise.map((item) => (
                  <li key={item} className="flex gap-2 leading-relaxed">
                    <CheckCircle2
                      className="mt-0.5 size-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </header>

            <figure className="mx-auto w-full max-w-lg">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-black/10">
                <Image
                  src={image}
                  alt={landing.hero.imageAlt}
                  fill
                  priority
                  quality={76}
                  sizes="(max-width: 1024px) 92vw, 38vw"
                  className="object-cover"
                />
                <figcaption className="absolute inset-x-4 bottom-4 rounded-xl border border-white/20 bg-black/75 px-4 py-3 text-center text-sm font-medium text-white backdrop-blur-sm">
                  {landing.hero.imageCaption}
                </figcaption>
              </div>
            </figure>
          </div>
        </div>
      </section>

      <section aria-labelledby={`${headingId}-problems`} className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
          <header className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              {landing.problems.eyebrow}
            </p>
            <h2 id={`${headingId}-problems`} className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              {landing.problems.heading}
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              {landing.problems.description}
            </p>
          </header>
          <ul className="mt-9 grid gap-x-8 md:grid-cols-2">
            {landing.problems.items.map((item) => (
              <li key={item} className="flex gap-3 border-t border-border py-5">
                <Search className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                <span className="font-medium leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby={`${headingId}-definition`} className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-7 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[0.62fr_1.38fr] lg:gap-16">
          <header>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              {landing.definition.eyebrow}
            </p>
            <h2 id={`${headingId}-definition`} className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              {landing.definition.heading}
            </h2>
          </header>
          <div>
            <p className="text-lg font-medium leading-relaxed sm:text-xl">
              {landing.definition.answer}
            </p>
            <p className="mt-5 border-l-2 border-primary pl-4 leading-relaxed text-muted-foreground">
              {landing.definition.note}
            </p>
          </div>
        </div>
      </section>

      <section
        id={scopeId}
        aria-labelledby={`${headingId}-deliverables`}
        className="scroll-mt-24 border-b border-border"
      >
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
          <header className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              {landing.deliverables.eyebrow}
            </p>
            <h2 id={`${headingId}-deliverables`} className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              {landing.deliverables.heading}
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              {landing.deliverables.description}
            </p>
          </header>
          <ul className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {landing.deliverables.items.map((item, index) => {
              const Icon = DELIVERABLE_ICONS[index] ?? Code2;
              return (
                <li key={item.title} className="rounded-2xl border border-border bg-card p-6 sm:p-7">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary" aria-hidden="true">
                    <Icon size={21} />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{item.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby={`${headingId}-choices`} className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
          <header className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{landing.choices.eyebrow}</p>
            <h2 id={`${headingId}-choices`} className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{landing.choices.heading}</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">{landing.choices.description}</p>
          </header>
          <ul className="mt-9 grid gap-5 md:grid-cols-3">
            {landing.choices.items.map((item) => (
              <li key={item.title} className="rounded-2xl border border-border bg-background p-6">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby={`${headingId}-process`} className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
          <header className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{landing.process.eyebrow}</p>
            <h2 id={`${headingId}-process`} className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{landing.process.heading}</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">{landing.process.description}</p>
          </header>
          <ol className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {landing.process.steps.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-border bg-card p-6">
                <span className="text-sm font-semibold text-primary" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-5 text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby={`${headingId}-considerations`} className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <header>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{landing.considerations.eyebrow}</p>
            <h2 id={`${headingId}-considerations`} className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{landing.considerations.heading}</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">{landing.considerations.description}</p>
          </header>
          <ul className="divide-y divide-border border-y border-border">
            {landing.considerations.items.map((item) => (
              <li key={item} className="flex gap-3 py-5">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                <span className="font-medium leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-label={landing.bridge.heading} className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="flex flex-col justify-between gap-6 rounded-2xl border border-primary/25 bg-primary/5 p-6 sm:flex-row sm:items-center sm:p-8">
            <div className="max-w-3xl">
              <h2 className="text-xl font-semibold sm:text-2xl">{landing.bridge.heading}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{landing.bridge.description}</p>
            </div>
            <Link href={`/${locale}${landing.bridge.href}`} className="inline-flex min-h-12 shrink-0 items-center gap-2 font-semibold text-primary hover:underline">
              {landing.bridge.label}<ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby={`${headingId}-use-cases`} className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
          <header className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{landing.useCases.eyebrow}</p>
            <h2 id={`${headingId}-use-cases`} className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{landing.useCases.heading}</h2>
          </header>
          <ul className="mt-9 grid gap-5 md:grid-cols-2">
            {landing.useCases.items.map((item) => (
              <li key={item.title} className="rounded-2xl border border-border bg-background p-6 sm:p-7">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby={`${headingId}-faq`} className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 sm:py-20 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <header>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{landing.faq.eyebrow}</p>
            <h2 id={`${headingId}-faq`} className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{landing.faq.heading}</h2>
          </header>
          <div>
            {landing.faq.items.map((item, index) => (
              <details key={item.q} open={index === 0} className="group border-t border-border first:border-t-0">
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-base font-semibold leading-snug sm:text-lg">{item.q}</h3>
                  <ChevronDown className="size-5 shrink-0 text-primary transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="pb-5 text-sm leading-relaxed text-muted-foreground sm:text-base">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby={`${headingId}-related`} className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <h2 id={`${headingId}-related`} className="text-2xl font-bold tracking-tight sm:text-3xl">{landing.related.heading}</h2>
          <ul className="mt-7 grid gap-4 md:grid-cols-3">
            {landing.related.items.map((item) => (
              <li key={item.href}>
                <Link href={`/${locale}${item.href}`} className="group flex h-full flex-col rounded-2xl border border-border bg-background p-5 transition hover:border-primary/35">
                  <span className="font-semibold leading-relaxed">{item.title}</span>
                  <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-primary">
                    {item.label}<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby={`${headingId}-cta`} className="px-4 py-12 sm:px-6 sm:py-20">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-border hero-section-light px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
          <div className="absolute right-0 top-0 size-72 translate-x-1/3 -translate-y-1/3 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
          <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <h2 id={`${headingId}-cta`} className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{landing.cta.heading}</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{landing.cta.description}</p>
            </div>
            <Link href={`/${locale}/contact`} className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:brightness-110">
              {landing.cta.button}<ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
