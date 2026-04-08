import { getDictionary } from "@/app/lib/dictionary";
import { Locale, i18n } from "@/i18n-config";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  ArrowLeft, ArrowRight, Sparkles, CheckCircle2,
  Bot, BarChart3, RefreshCw, ShieldCheck, Layers, Cpu,
} from "lucide-react";
import { buildPageMetadata } from "@/app/lib/buildPageMetadata";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const data = dict.pages.services_page.services.systems;

  return buildPageMetadata({
    locale,
    title: `${data.title} | Devsign`,
    description: data.description,
    route: "/services/business-systems",
    keywords: [
      "business automation Morocco",
      "AI-powered systems",
      "workflow automation",
      "custom dashboards",
      "AI integration Morocco",
    ],
  });
}

const USE_CASE_ICONS = [Bot, BarChart3, RefreshCw, ShieldCheck];
const BENEFIT_ICONS = [RefreshCw, ShieldCheck, Layers];

export default async function BusinessSystemsPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const svc = dict.pages.services_page;
  const data = svc.services.systems;
  const ui = svc ?? {};
  const isRtl = locale === "ar";
  const Arr = isRtl ? ArrowRight : ArrowLeft;
  const ArrFwd = isRtl ? ArrowLeft : ArrowRight;
  const fwdClass = isRtl ? "rotate-180" : "";

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.title,
    description: data.description,
    provider: { "@type": "Organization", name: "Devsign" },
    serviceType: "Business Automation & AI Integration",
    areaServed: { "@type": "Country", name: "Morocco" },
    offers: { "@type": "Offer", availability: "https://schema.org/InStock" },
  };

  return (
    <main dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* ── 1. HERO ── */}
      <section className="relative overflow-hidden hero-section-light border-b border-border">
        {/* grid texture — more techy feel for automation */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right,currentColor 1px,transparent 1px),linear-gradient(to bottom,currentColor 1px,transparent 1px)",
            backgroundSize: "32px 32px",
          }}
          aria-hidden="true"
        />
        <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 right-0 w-72 h-72 bg-primary/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          {/* breadcrumb */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center gap-1.5 text-sm font-medium
                         text-muted-foreground hover:text-primary transition-colors
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
            >
              <Arr size={15} aria-hidden="true" />
              {svc.title}
            </Link>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* text */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary
                              border border-primary/20 px-4 py-2 rounded-full text-sm font-medium">
                <Sparkles size={13} aria-hidden="true" />
                {data.subtitle}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]">
                {data.title}
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {data.description}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed border-l-2 border-primary/30
                            pl-4 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-4 italic">
                {data.longDescription}
              </p>

              {/* feature pills */}
              <div className="flex flex-wrap gap-2">
                {data.features.map((f: string, i: number) => (
                  <span key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium
                               rounded-full border border-border bg-card text-foreground
                               hover:border-primary/30 hover:bg-primary/5 transition-all">
                    <CheckCircle2 size={11} className="text-primary" aria-hidden="true" />
                    {f}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col xs:flex-row sm:flex-row gap-3 pt-2">
                <Link href={`/${locale}/contact`}
                  className="group inline-flex items-center justify-center gap-2
                             px-7 py-3.5 rounded-xl bg-primary text-primary-foreground
                             font-semibold text-sm sm:text-base
                             hover:opacity-90 active:scale-95 transition-all
                             shadow-lg shadow-primary/25
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  {svc.cta_btn}
                  <ArrFwd size={16} className={`${fwdClass} group-hover:translate-x-0.5 transition-transform`} aria-hidden="true" />
                </Link>
                <Link href={`/${locale}/portfolio`}
                  className="inline-flex items-center justify-center gap-2
                             px-7 py-3.5 rounded-xl border border-border bg-card
                             text-foreground font-semibold text-sm sm:text-base
                             hover:border-primary/30 hover:bg-muted/50
                             active:scale-95 transition-all
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  {ui.viewPortfolio ?? "See our work"}
                </Link>
              </div>
            </div>

            {/* hero image */}
            <div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl
                            aspect-[4/3]">
              <Image
                src={data.image}
                alt={`${data.title} — dashboard and automation system`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              {/* floating stat badge on image */}
              <div className="absolute bottom-4 left-4 rtl:left-auto rtl:right-4
                              flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl
                              bg-background/90 backdrop-blur-sm border border-border shadow-lg">
                <Cpu className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                <span className="text-xs font-semibold text-foreground whitespace-nowrap">
                  AI-Powered Automation
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. IMPACT STATS ── */}
      {data.stats?.length > 0 && (
        <section className="border-b border-border bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
            <h2 className="text-center text-sm font-semibold text-muted-foreground uppercase
                           tracking-widest mb-8">
              {ui.statsTitle ?? "The impact of automation"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              {data.stats.map((s: { value: string; label: string }, i: number) => (
                <div key={i} className="text-center">
                  <div className="text-4xl sm:text-5xl font-bold text-primary mb-1">{s.value}</div>
                  <div className="text-sm text-muted-foreground leading-snug">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 3. WHAT WE CAN AUTOMATE ── */}
      {data.useCases?.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
              {ui.useCasesTitle ?? "What we can automate for you"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
              {data.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {data.useCases.map((uc: { title: string; text: string }, i: number) => {
              const Icon = USE_CASE_ICONS[i % USE_CASE_ICONS.length];
              return (
                <div key={i}
                  className="group flex gap-4 p-5 sm:p-6 rounded-2xl border border-border bg-card
                             hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5
                             transition-all duration-300 relative overflow-hidden">
                  {/* hover shimmer */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent
                                  via-primary/40 to-transparent opacity-0 group-hover:opacity-100
                                  transition-opacity" aria-hidden="true" />

                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center
                                  shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground mb-1.5 text-base leading-snug">
                      {uc.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{uc.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── 4. WHAT YOU'LL GAIN ── */}
      {data.benefits?.length > 0 && (
        <section className="border-y border-border bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
            <div className="text-center mb-10 sm:mb-14">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
                {"What you'll gain"}
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                {data.longDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {data.benefits.map((b: { title: string; text: string }, i: number) => {
                const Icon = BENEFIT_ICONS[i % BENEFIT_ICONS.length];
                return (
                  <div key={i}
                    className="group relative p-5 sm:p-6 rounded-2xl border border-border bg-card
                               hover:border-primary/30 hover:shadow-xl hover:-translate-y-0.5
                               transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent
                                    via-primary/40 to-transparent opacity-0 group-hover:opacity-100
                                    transition-opacity" aria-hidden="true" />
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center
                                    mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 text-base">{b.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{b.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── 5. HOW IT WORKS ── */}
      {data.process?.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
              {"How it works"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 relative">
            {/* connector line desktop */}
            <div className="hidden md:block absolute top-7 left-[16.66%] right-[16.66%]
                            h-px border-t border-dashed border-border" aria-hidden="true" />

            {data.process.map((p: { step: string; title: string; text: string }, i: number) => (
              <div key={i} className="flex flex-col items-center text-center gap-4">
                <div className="relative w-14 h-14 rounded-2xl bg-card border border-primary/20
                                flex items-center justify-center z-10 shrink-0">
                  <span className="text-lg font-bold text-primary">{p.step}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2 text-base">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── 6. TECH STACK ── */}
      {data.techStack?.length > 0 && (
        <section className="border-y border-border bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            <h2 className="text-center text-sm font-semibold text-muted-foreground uppercase
                           tracking-widest mb-8">
              {ui.techTitle ?? "Technologies we work with"}
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {data.techStack.map((tech: string, i: number) => (
                <span key={i}
                  className="px-4 py-2 rounded-xl border border-border bg-card text-sm
                             font-medium text-foreground hover:border-primary/30
                             hover:bg-primary/5 transition-all font-mono">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 7. CTA ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="relative rounded-2xl border border-primary/20 bg-card overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent
                          to-primary/10 pointer-events-none" />
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-80 bg-primary/10
                          rounded-full blur-3xl pointer-events-none" />

          <div className="relative text-center py-12 sm:py-16 px-5 sm:px-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary
                            border border-primary/20 px-3 py-1.5 rounded-full text-xs font-medium mb-6">
              <Bot size={12} aria-hidden="true" />
              {data.subtitle}
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4
                           max-w-2xl mx-auto leading-tight">
              {svc.ctat_title}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed text-base sm:text-lg">
              {svc.cta_desc}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href={`/${locale}/contact`}
                className="group inline-flex items-center justify-center gap-2
                           px-8 py-3.5 rounded-xl bg-primary text-primary-foreground
                           font-semibold text-sm sm:text-base
                           hover:opacity-90 active:scale-95 transition-all
                           shadow-lg shadow-primary/20
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                {svc.cta_btn}
                <ArrFwd size={16} className={`${fwdClass} group-hover:translate-x-0.5 transition-transform`} aria-hidden="true" />
              </Link>
              <Link href={`/${locale}/portfolio`}
                className="inline-flex items-center justify-center gap-2
                           px-8 py-3.5 rounded-xl border border-border bg-background
                           text-foreground font-semibold text-sm sm:text-base
                           hover:border-primary/30 hover:bg-muted/50
                           active:scale-95 transition-all
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                {ui.viewPortfolio ?? "See our work"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}