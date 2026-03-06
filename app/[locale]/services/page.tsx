import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Monitor, Cpu, Palette, ArrowRight, Check, Award, Code2, FileCheck } from "lucide-react";
import { Locale, i18n } from "@/i18n-config";
import getTrans from "@/app/lib/translation";
import { getBaseUrl, buildPageMetadata } from "@/app/lib/seo";

const SERVICES_HERO_IMAGE = "/images/alex-suprun-ZHvM3XIOHoE-unsplash.jpg";

type Props = { params: Promise<{ locale: string }> };

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = i18n.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : i18n.defaultLocale;
  const dict = await getTrans(locale);
  const t = dict.pages?.services;
  const baseUrl = getBaseUrl();

  const title =
    locale === "en"
      ? "Services | Web Development, SEO, Automation & Design — Devsign"
      : locale === "ar"
        ? "الخدمات | تطوير ويب، سيو، أتمتة وتصميم — ديفساين"
        : "Services | Développement Web, SEO, Automatisation & Design — Devsign";

  const description =
    locale === "en"
      ? "Professional services: lightweight SEO-optimized websites, business automation, AI integration, and high-converting ad design for startups and SMBs."
      : locale === "ar"
        ? "خدمات احترافية: مواقع محسّنة للسيو، أتمتة الأعمال، دمج الذكاء الاصطناعي، وتصميم إعلانات عالية التحويل للشركات الناشئة والمتوسطة."
        : "Services professionnels : sites web SEO, automatisation, intégration IA et design publicitaire à fort taux de conversion pour startups et PME.";

  const keywords =
    locale === "en"
      ? ["web development services", "SEO websites", "business automation", "AI integration", "ad design", "Morocco"]
      : locale === "ar"
        ? ["خدمات تطوير الويب", "مواقع سيو", "أتمتة الأعمال", "تصميم إعلانات", "المغرب"]
        : ["services développement web", "sites SEO", "automatisation entreprise", "design publicitaire", "Maroc"];

  return buildPageMetadata({
    locale,
    baseUrl,
    title,
    description,
    path: "/services",
    keywords,
  });
}

export default async function ServicesPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale: Locale = i18n.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : i18n.defaultLocale;
  const dict = await getTrans(locale);
  const t = dict.pages?.services;
  const isRtl = locale === "ar";

  if (!t) return null;

  const services = [
    {
      key: "web",
      title: t.web.title,
      description: t.web.description,
      features: t.web.features,
      icon: Monitor,
      href: `/${locale}/services/web-development`,
    },
    {
      key: "systems",
      title: t.systems.title,
      description: t.systems.description,
      features: t.systems.features,
      icon: Cpu,
      href: `/${locale}/services/business-systems`,
    },
    {
      key: "design",
      title: t.design.title,
      description: t.design.description,
      features: t.design.features,
      icon: Palette,
      href: `/${locale}/services/social-design`,
    },
  ];

  return (
    <div
      className="min-h-screen bg-background text-foreground transition-colors duration-300"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <section className="px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm font-medium uppercase tracking-wider text-primary mb-2">
            {t.subtitle}
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
            {t.heading}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-12">
            {t.description}
          </p>

          <div className="space-y-8 sm:space-y-10">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.key}
                  className="group relative p-6 sm:p-8 rounded-2xl border border-border bg-card/50 hover:bg-card transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors">
                      <Icon className="w-6 h-6 text-primary" aria-hidden />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">
                        {service.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {service.description}
                      </p>
                      <ul className="flex flex-wrap gap-2 mb-4">
                        {service.features?.map((f: string) => (
                          <li
                            key={f}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm bg-muted/50 dark:bg-muted/30 text-muted-foreground"
                          >
                            <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={service.href}
                        className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                      >
                        {t.cta}
                        <ArrowRight
                          size={16}
                          className={isRtl ? "rotate-180" : ""}
                          aria-hidden
                        />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Why We're the Best Choice */}
          {t.whyChooseUs && (
            <div className="mt-16 pt-12 border-t border-border">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {t.whyChooseUs.title}
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl">
                {t.whyChooseUs.subtitle}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {t.whyChooseUs.reasons?.map(
                  (r: { title: string; text: string }, i: number) => {
                    const icons = [Award, Code2, FileCheck];
                    const Icon = icons[i % icons.length];
                    return (
                      <div
                        key={r.title}
                        className="p-6 rounded-2xl border border-border bg-card/50 hover:bg-card transition-colors"
                      >
                        <div className="w-11 h-11 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4">
                          <Icon className="w-5 h-5 text-primary" aria-hidden />
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">
                          {r.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {r.text}
                        </p>
                      </div>
                    );
                  }
                )}
              </div>
              <div className="relative aspect-[21/9] max-w-4xl mx-auto rounded-2xl overflow-hidden border border-border bg-card">
                <Image
                  src={SERVICES_HERO_IMAGE}
                  alt={t.whyChooseUs.imageCaption ?? ""}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 896px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <p className="absolute bottom-4 left-4 right-4 text-sm text-muted-foreground font-medium">
                  {t.whyChooseUs.imageCaption}
                </p>
              </div>
            </div>
          )}

          <div className="mt-14 text-center">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              {t.cta}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
