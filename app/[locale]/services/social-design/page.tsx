// /app/[locale]/services/social-design/page.tsx
import { getDictionary } from "@/app/lib/dictionary";
import { Locale, i18n } from "@/i18n-config";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  MousePointerClick,
  Palette,
  TrendingUp,
  Image as ImageIcon,
  MonitorPlay,
  MoreHorizontal,
  Brush,
  Layout,
} from "lucide-react";

import { buildPageMetadata, getBaseUrl } from "@/app/lib/buildPageMetadata";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const data = dict.pages.services_page.services.design;

    const keywords = locale
    ? [
     "social media ads",
      "ad design",
      "facebook ads",
      "instagram creatives",
      "conversion design",
      "ad campaign design"
      ]
    : locale === "ar"
      ? [
          "إعلانات وسائل التواصل الاجتماعي",
          "تصميم الإعلانات",
          "إعلانات فيسبوك",
          "تصاميم إنستغرام",
          "تصميم التحويل",
          "تصميم حملات الإعلانات"
        ]
      : [
          "social media ads",
          "ad design",
          "facebook ads",
          "instagram creatives",
          "conversion design",
          "ad campaign design"
        ];

  return buildPageMetadata({
    locale,
    title: `${data.title} | Devsign`,
    description: data.description,
    route: "/services/social-design",
    keywords: keywords
  });
}

// Icons for Design Benefits
const BENEFIT_ICONS = [MousePointerClick, Palette, TrendingUp];

// Helper to map string tools names to Icons
const getToolIcon = (toolName: string) => {
  const name = toolName.toLowerCase();
  if (name.includes("figma")) return Layout;
  if (name.includes("photoshop")) return ImageIcon;
  if (name.includes("illustrator")) return Brush;
  if (name.includes("canva")) return Palette;
  if (name.includes("after effects") || name.includes("effects")) return MonitorPlay;
  return MoreHorizontal;
};

export default async function SocialDesignPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const svc = dict.pages.services_page;
  const data = svc.services.design;
  const isRtl = locale === "ar";

  const Arr = isRtl ? ArrowRight : ArrowLeft;
  const ArrFwd = isRtl ? ArrowLeft : ArrowRight;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.title,
    description: data.description,
    image: data.image || `${getBaseUrl()}/og-image.jpg`,
    url: `${getBaseUrl()}/${locale}/services/social-design`,
    provider: {
      "@type": "Organization",
      name: "Devsign",
      url: "https://devsign.ma",
      telephone: "+212 7 78 00 00 06",
      email: "contact@devsign.ma",
    },
    serviceType: locale === "en" ? "Social Media Ad Design" : locale === "fr" ? "Conception de Publicités pour les Réseaux Sociaux" : "تصميم إعلانات وسائل التواصل الاجتماعي",
    areaServed: { "@type": "Country", name: "Morocco" },
    offers: { "@type": "Offer", availability: "https://schema.org/InStock" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${getBaseUrl()}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${getBaseUrl()}/${locale}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: data.title,
        item: `${getBaseUrl()}/${locale}/services/social-design`,
      },
    ],
  };

  return (
    <main dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── 1. HERO ── */}
      <section
        aria-label="Service Hero"
        className="relative overflow-hidden border-b border-border min-h-[400px] sm:min-h-[500px] lg:min-h-[580px] flex items-center"
      >
        <Image
          src={data.image}
          alt={`${data.title} — ${data.heroAltSuffix}`}
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40"
          aria-hidden="true"
        />

        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage:
              "linear-gradient(to right,white 1px,transparent 1px),linear-gradient(to bottom,white 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden="true"
        />

        <header className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 pb-10 sm:pb-14 lg:pb-16 pt-24 sm:pt-28 z-10">
          <nav aria-label="Breadcrumb" className="mb-6">
            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors
                         rounded-md py-1.5 px-3 bg-primary/90 hover:bg-primary text-white shadow-lg active:scale-95"
            >
              <Arr size={14} aria-hidden="true" />
              {svc.title}
            </Link>
          </nav>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] text-white mb-5 max-w-3xl drop-shadow-md">
            {data.title}
          </h1>

          <p className="text-base sm:text-lg text-white/85 leading-relaxed max-w-2xl mb-6 drop-shadow-sm">
            {data.description}
          </p>

          <div className="flex flex-wrap gap-2 sm:gap-3 mb-8">
            {data.features?.map((f: string, i: number) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium
                           border border-white/20 bg-black/30 text-white rounded-full backdrop-blur-md"
              >
                <CheckCircle2
                  size={12}
                  className="text-white/80"
                  aria-hidden="true"
                />
                {f}
              </span>
            ))}
          </div>
        </header>
      </section>

      {/* ── 2. OVERVIEW ── */}
      <section
        aria-labelledby="overview-heading"
        className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20"
      >
        <div className="space-y-4 sm:space-y-6">
          <h2
            id="overview-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground"
          >
            {data.overviewTitle}
          </h2>
          <div
            className="w-10 sm:w-12 h-1 bg-primary rounded-full"
            aria-hidden="true"
          />
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-4xl">
            <span className="font-semibold text-foreground">
              {data.startDescription},{" "}
            </span>{" "}
            {data.longDescription}
          </p>
        </div>
      </section>

      {/* ── 3. AD EXAMPLE SHOWCASE (New Section) ── */}
      <section
        aria-labelledby="example-heading"
        className="bg-muted/10 border-y border-border overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Text & Copyright */}
            <div className="space-y-6">
              <h2
                id="example-heading"
                className="text-2xl sm:text-3xl font-bold text-foreground"
              >
                {data.exampleTitle}
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {data.exampleDesc}
              </p>

              {data.exampleFeatures && (
                <ul className="space-y-3 pt-2">
                  {data.exampleFeatures.map((feature: string, i: number) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-sm sm:text-base text-foreground font-medium"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Right: Social Media Ad Mockup UI */}
            <div className="relative w-full max-w-md mx-auto lg:ml-auto bg-card rounded-2xl border border-border shadow-2xl p-4 sm:p-6 flex flex-col gap-4 transform transition-transform hover:-translate-y-1">
              {/* Ad Header (Sponsor) */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-md">
                    <Sparkles size={18} className="text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground leading-none">
                      {locale === "en" ? "YourBrand" : locale === "fr" ? "VotreMarque" : "علامتك التجارية"}{" "}
                    </p>
                    <p className="text-[11px] text-muted-foreground font-medium mt-1">
                      {locale === "en"
                        ? "Sponsored"
                        : locale === "fr"
                          ? "Sponsorisé"
                          : "إعلان"}{" "}
                    </p>
                  </div>
                </div>
                <MoreHorizontal
                  size={20}
                  className="text-muted-foreground cursor-pointer"
                />
              </div>

              {/* Ad Copy */}
              <p className="text-sm text-foreground/90 leading-snug">
                {locale === "en"
                  ? "Stop scrolling! 🚀 Transform your business with scroll-stopping visuals designed to convert. Click below to claim your offer. 👇"
                  : locale === "fr"
                    ? "Arrêtez de défiler! 🚀 Transformez votre entreprise avec des visuels qui arrêtent le défilement conçus pour convertir. Cliquez ci-dessous pour réclamer votre offre. 👇"
                    : "توقف عن التمرير! 🚀 حوّل أعمالك مع تصاميم إعلانية توقف التمرير وتم تصميمها للتحويل. انقر أدناه لطلب عرضك. 👇"}
              </p>

              {/* Main Visual/Product Presentation */}
              <div className="relative w-full aspect-square sm:aspect-[4/4] rounded-xl overflow-hidden bg-muted flex flex-col items-center justify-center border border-border/50 group">
                <Image
                  src="/images/projects/machianeAlavie.jpg"
                  alt="Example of a social media ad design showcasing a product with clear branding and a call-to-action."
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform"
                />
              </div>

              {/* Call to Action Bar */}
              <div className="flex items-center justify-between bg-muted/50 border border-border p-3 sm:p-4 rounded-xl">
                <div>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-1">
                    {locale === "en"
                      ? "Limited Offer"
                      : locale === "fr"
                        ? "Offre Limitée"
                        : "عرض محدود"}{" "}
                  </p>
                  <p className="text-sm font-bold text-foreground">
                    {locale === "en"
                      ? "Limited Time Offer"
                      : locale === "fr"
                        ? "Offre à Temps Limité"
                        : "عرض محدود الوقت"}{" "}
                  </p>
                </div>
                <button className="bg-primary text-primary-foreground text-sm font-bold px-5 py-2.5 rounded-lg shadow-sm hover:opacity-90 active:scale-95 transition-all">
                  {locale === "en"
                    ? "Learn More"
                    : locale === "fr"
                      ? "En savoir plus"
                      : "أعرف أكثر"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. WHAT YOU'LL GAIN (Benefits) ── */}
      {data.benefits?.length > 0 && (
        <section
          aria-labelledby="benefits-heading"
          className="border-b border-border"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
            <div className="text-center mb-10 sm:mb-14">
              <h2
                id="benefits-heading"
                className="text-2xl sm:text-3xl font-bold mb-3 text-foreground"
              >
                {data.benefitsTitle}
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
                {data.benefitsDesc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {data.benefits.map(
                (b: { title: string; text: string }, i: number) => {
                  const Icon = BENEFIT_ICONS[i % BENEFIT_ICONS.length];
                  return (
                    <article
                      key={i}
                      className="relative p-6 sm:p-8 rounded-2xl  border border-primary/40 bg-card hover:shadow-md overflow-hidden flex flex-col items-center text-center"
                    >
                      <div className="w-14 h-14 rounded-full bg-background border border-border flex items-center justify-center mb-5 shadow-sm">
                        <Icon
                          className="w-6 h-6 text-primary"
                          aria-hidden="true"
                        />
                      </div>
                      <h3 className="font-bold text-foreground mb-3 text-lg">
                        {b.title}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {b.text}
                      </p>
                    </article>
                  );
                },
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── 5. PROCESS ── */}
      {data.process?.length > 0 && (
        <section
          aria-labelledby="process-heading"
          className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20"
        >
          <div className="text-center mb-12 sm:mb-16">
            <h2
              id="process-heading"
              className="text-2xl sm:text-3xl font-bold mb-3 text-foreground"
            >
              {data.processTitle}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
              {data.processDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 relative">
            <div
              className="hidden md:block absolute top-7 left-[16.66%] right-[16.66%] border-t-2 border-dashed border-border"
              aria-hidden="true"
            />

            {data.process.map(
              (p: { step: string; title: string; text: string }, i: number) => (
                <article
                  key={i}
                  className="flex flex-col items-center text-center gap-4 relative z-10"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-card border border-primary/20 flex items-center justify-center z-10 shrink-0 shadow-sm">
                    <span className="text-base sm:text-lg font-bold text-primary">
                      {p.step}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2 text-lg">
                      {p.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed px-2">
                      {p.text}
                    </p>
                  </div>
                </article>
              ),
            )}
          </div>
        </section>
      )}

      {/* ── 6. TOOLS WE USE ── */}
      {data.toolsList?.length > 0 && (
        <section
          aria-labelledby="tools-heading"
          className="py-12 sm:py-16 border-t border-border bg-muted/5"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10 sm:mb-14">
              <h2
                id="tools-heading"
                className="text-2xl sm:text-3xl font-bold mb-3 text-foreground"
              >
                {data.toolsTitle}
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
                {data.toolsDesc}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
              {data.toolsList.map((toolName: string, i: number) => {
                const Icon = getToolIcon(toolName);
                return (
                  <div
                    key={i}
                    className="flex items-center justify-center gap-2 sm:gap-3 py-2.5 sm:py-3 px-5 sm:px-6 rounded-full border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all group cursor-default"
                  >
                    <Icon
                      className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary transition-colors"
                      aria-hidden="true"
                    />
                    <span className="text-xs sm:text-sm font-semibold text-foreground/80 group-hover:text-foreground">
                      {toolName}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── 7. CTA ── */}
      <section
        aria-label="Call to Action"
        className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16"
      >
        <div className="relative rounded-2xl border border-primary/20 bg-card overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative text-center py-10 sm:py-16 px-5 sm:px-12 z-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 max-w-2xl mx-auto leading-tight text-foreground">
              {svc.ctat_title}
            </h2>
            <p className="text-muted-foreground mb-6 sm:mb-8 max-w-lg mx-auto leading-relaxed text-sm sm:text-base">
              {svc.cta_desc}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <Link
                href={`/${locale}/contact`}
                className="w-full sm:w-auto group inline-flex items-center justify-center gap-2
                           px-8 py-3.5 rounded-xl bg-primary text-primary-foreground
                           font-semibold text-sm sm:text-base
                           hover:opacity-90 active:scale-95 transition-all
                           shadow-lg shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {svc.cta_btn}
                <ArrFwd
                  size={16}
                  className=" group-hover:translate-x-0.5 transition-transform"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href={`/${locale}/services`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2
                           px-8 py-3.5 rounded-xl border border-border bg-background
                           text-foreground font-semibold text-sm sm:text-base
                           hover:border-primary/30 hover:bg-muted/50 active:scale-95 transition-all
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {data.AnothersrvcBtn}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
