import { getDictionary } from "@/app/lib/dictionary";
import { Locale, i18n } from "@/i18n-config";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Rocket,
  Shield,
  Zap,
  Code2,
  Globe,
  BoxIcon,
  Database,
} from "lucide-react";
import { buildPageMetadata } from "@/app/lib/buildPageMetadata";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const data = dict.pages.services_page.services.web;

  return buildPageMetadata({
    locale,
    title: `${data.title} | Devsign`,
    description: data.description,
    route: `/${locale}/${data.link}`,
    keywords: [
      "web development",
      "website design",
      "custom web development",
      "responsive design",
      "e-commerce development",
    ],
  });
}

export default async function WebDevelopmentPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const svc = dict.pages.services_page;
  const data = svc.services.web;
  const isRtl = locale === "ar";
  const Arr = isRtl ? ArrowRight : ArrowLeft;
  const ArrFwd = isRtl ? ArrowLeft : ArrowRight;

  // Schema.org structured data
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.title,
    description: data.description,
    provider: {
      "@type": "Organization",
      name: "Devsign",
      url: "https://devsign.com",
    },
    serviceType: "Web Development",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <main
      dir={isRtl ? "rtl" : "ltr"}
      className="min-h-screen bg-gradient-to-b from-background to-muted/20"
    >
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* ── 1. HERO SECTION ── */}
      <section className="relative overflow-hidden hero-section-light border-b border-border">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          {/* Breadcrumb */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center gap-1.5 text-sm font-medium
                         text-muted-foreground hover:text-primary transition-colors
                         focus:outline-none focus:ring-2 focus:ring-primary rounded-lg px-2 py-1"
              aria-label={svc.title}
            >
              <Arr size={15} aria-hidden="true" />
              <span>{svc.title}</span>
            </Link>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <div
                className="inline-flex items-center gap-2 bg-primary/10 text-primary
                              border border-primary/20 px-4 py-2 rounded-full text-sm font-medium"
              >
                <Sparkles size={14} aria-hidden="true" />
                <span>{data.subtitle}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-[1.1]">
                {data.title}
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                {data.description + " " + data.longDescription}
              </p>

              {/* Feature Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {data.features?.slice(0, 6).map((f: string, i: number) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium
                               rounded-full border border-border bg-card text-foreground
                               hover:border-primary/30 hover:bg-primary/5 transition-all"
                  >
                    <CheckCircle2
                      size={12}
                      className="text-primary"
                      aria-hidden="true"
                    />
                    {f}
                  </span>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href={`/${locale}/contact`}
                  className="group inline-flex items-center justify-center gap-2
                             px-8 py-4 rounded-xl bg-primary text-primary-foreground
                             font-semibold text-base hover:opacity-90 active:scale-95
                             transition-all shadow-lg shadow-primary/25
                             focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  {svc.cta_btn}
                  <ArrFwd
                    size={18}
                    className="group-hover:translate-x-1 transition-transform "
                    aria-hidden="true"
                  />
                </Link>
                <Link
                  href={`/${locale}/portfolio`}
                  className="group inline-flex items-center justify-center gap-2
                             px-8 py-4 rounded-xl border-2 border-border bg-card
                             text-foreground font-semibold text-base
                             hover:border-primary/40 hover:bg-muted/30
                             active:scale-95 transition-all
                             focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  {locale === "en"
                    ? "View Portfolio"
                    : locale === "ar"
                      ? "عرض الأعمال"
                      : "Voir mon portfolio"}
                  <ArrFwd
                    size={18}
                    className="group-hover:translate-x-1 transition-transform "
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div
              className="relative rounded-2xl overflow-hidden border border-border shadow-2xl
                            aspect-square lg:aspect-[4/3] bg-gradient-to-br from-primary/5 to-primary/10"
            >
              <Image
                src={data.image}
                alt={data.title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. WHAT'S INCLUDED ── */}
      {data.features?.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {locale === "en"
                ? "What's Included in Our"
                : locale === "ar"
                  ? "ما الذي يتضمنه"
                  : "Ce qui est inclus dans notre"}{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                {locale === "en"
                  ? "Web Development"
                  : locale === "ar"
                    ? "تطوير الويب"
                    : "Développement Web"}
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {locale === "en"
                ? "Comprehensive solutions tailored to your business needs"
                : locale === "ar"
                  ? "حلول شاملة مصممة حسب احتياجات عملك"
                  : "Solutions complètes adaptées aux besoins de votre entreprise"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.features.slice(0, 3).map((f: string, i: number) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 rounded-xl border border-border
                           bg-card hover:border-primary/40 hover:shadow-lg
                           hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <div
                  className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center
                                shrink-0 group-hover:bg-primary/20 transition-colors"
                >
                  <CheckCircle2
                    className="w-5 h-5 text-primary"
                    aria-hidden="true"
                  />
                </div>
                <span className="text-sm font-medium text-foreground">{f}</span>
              </div>
            ))}
          </div>
        </section>
      )}
      {data.benefits?.length > 0 && (
        <section className="border-y border-border bg-muted/10 ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                {locale === "en"
                  ? "What You'll Gain"
                  : locale === "ar"
                    ? "ما ستحصل عليه"
                    : "Ce que vous obtiendrez"}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {locale === "en"
                  ? "Transform your online presence with these key advantages"
                  : locale === "ar"
                    ? "حوّل وجودك الإلكتروني مع هذه المزايا الأساسية"
                    : "Transformez votre présence en ligne avec ces avantages clés"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.benefits.map(
                (b: { title: string; text: string }, i: number) => {
                  const icons = [Rocket, Shield, Database];
                  const Icon = icons[i % icons.length];
                  return (
                    <div
                      key={i}
                      className="group p-6 rounded-2xl border border-border bg-card
                               hover:border-primary/40 hover:shadow-xl hover:-translate-y-1
                               transition-all duration-300 relative overflow-hidden"
                    >
                      <div
                        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/0 
                                    via-primary to-primary/0 opacity-0 group-hover:opacity-100
                                    transition-opacity"
                        aria-hidden="true"
                      />

                      <div
                        className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center
                                    mb-5 group-hover:bg-primary/20 transition-colors"
                      >
                        <Icon className="w-6 h-6 text-primary" />
                      </div>

                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        {b.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {b.text}
                      </p>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── 4. PROCESS SECTION ── */}
      {data.process?.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {locale === "en"
                ? "Our Development Process"
                : locale === "ar"
                  ? "عملنا في التطوير"
                  : "Notre Processus de Développement"}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {locale === "en"
                ? "A systematic approach to deliver exceptional results"
                : locale === "ar"
                  ? "نهج منهجي لتقديم نتائج استثنائية"
                  : "Une approche systématique pour livrer des résultats exceptionnels"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.process.map(
              (p: { step: string; title: string; text: string }, i: number) => (
                <div key={i} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div
                      className="relative w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/30
                                  flex items-center justify-center mb-5 bg-card"
                    >
                      <span className="text-2xl font-bold text-primary">
                        {p.step}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {p.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {p.text}
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>
        </section>
      )}

      {/* ── 5. TECHNOLOGY STACK ── */}
      <section className="border-y border-border bg-muted/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {locale === "en"
                ? "Technologies We Use"
                : locale === "ar"
                  ? "التقنيات التي نستخدمها"
                  : "Technologies que nous utilisons"}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {locale === "en"
                ? "Cutting-edge tools for modern web solutions"
                : locale === "ar"
                  ? "أدوات متطورة لحلول الويب الحديثة"
                  : "Outils de pointe pour des solutions web modernes"}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[
              { name: "Next.js", icon:Code2  },
              { name: "TypeScript", icon: Shield },
              { name: "Tailwind", icon: Zap },
              { name: "Node.js", icon: Rocket },
              { name: "Express", icon:Globe  },
            ].map((tech, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-3 p-4 rounded-xl border border-border
                           bg-card hover:border-primary/40 hover:shadow-lg transition-all"
              >
                <tech.icon className="w-8 h-8 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CTA SECTION ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div
          className="relative rounded-3xl border border-primary/20 bg-gradient-to-br 
                        from-primary/5 via-card to-primary/10 overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent
                          to-primary/5 pointer-events-none"
          />
          <div
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-primary/10
                          rounded-full blur-3xl pointer-events-none animate-pulse"
          />

          <div className="relative text-center py-16 sm:py-20 px-6 sm:px-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 max-w-3xl mx-auto leading-tight">
              {svc.ctat_title}
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              {svc.cta_desc}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/contact`}
                className="group inline-flex items-center justify-center gap-2
                           px-10 py-4 rounded-xl bg-primary text-primary-foreground
                           font-semibold text-base sm:text-lg
                           hover:opacity-90 active:scale-95 transition-all
                           shadow-xl shadow-primary/30
                           focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                {locale === "en"
                  ? "Start Your Project"
                  : locale === "ar"
                    ? "ابدأ مشروعك"
                    : "Démarrez votre projet"}
                <ArrFwd
                  size={20}
                  className="group-hover:translate-x-1 transition-transform "
                  aria-hidden="true"
                />
              </Link>
              <Link
                href={`/${locale}/portfolio`}
                className="group inline-flex items-center justify-center gap-2
                           px-10 py-4 rounded-xl border-2 border-border bg-background
                           text-foreground font-semibold text-base sm:text-lg
                           hover:border-primary/40 hover:bg-muted/30
                           active:scale-95 transition-all
                           focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                {locale === "en"
                  ? "Explore Our Work"
                  : locale === "ar"
                    ? "اكتشف أعمالنا"
                    : "Découvrez notre travail"}
                <ArrFwd
                  size={18}
                  className="group-hover:translate-x-1 transition-transform "
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
