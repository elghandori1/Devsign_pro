import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Locale, i18n } from "@/i18n-config";
import getTrans from "@/app/lib/translation";
import { getBaseUrl, buildPageMetadata } from "@/app/lib/seo";

type Props = { params: Promise<{ locale: string }> };

const PROJECT_IMAGES: Record<string, string> = {
  "E-Commerce Platform": "/images/md-ishak-raman-x45xE1P6Fe4-unsplash.jpg",
  "Plateforme E-Commerce": "/images/md-ishak-raman-x45xE1P6Fe4-unsplash.jpg",
  "منصة تجارة إلكترونية": "/images/md-ishak-raman-x45xE1P6Fe4-unsplash.jpg",
  "Business Automation Dashboard": "/images/alex-suprun-ZHvM3XIOHoE-unsplash.jpg",
  "Tableau de bord d'automatisation": "/images/alex-suprun-ZHvM3XIOHoE-unsplash.jpg",
  "لوحة أتمتة الأعمال": "/images/alex-suprun-ZHvM3XIOHoE-unsplash.jpg",
  "Brand & Social Ads": "/images/christopher-campbell-rDEOVtE7vOs-unsplash.jpg",
  "Identité & Publicités réseaux": "/images/christopher-campbell-rDEOVtE7vOs-unsplash.jpg",
  "الهوية والإعلانات الاجتماعية": "/images/christopher-campbell-rDEOVtE7vOs-unsplash.jpg",
};

function getProjectImage(title: string): string {
  return PROJECT_IMAGES[title] ?? "/images/md-ishak-raman-x45xE1P6Fe4-unsplash.jpg";
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = i18n.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : i18n.defaultLocale;
  const baseUrl = getBaseUrl();

  const title =
    locale === "en"
      ? "My Work | Portfolio — Web, Systems & Design — Devsign"
      : locale === "ar"
        ? "أعمالي | معرض أعمال — ويب، أنظمة وتصميم — ديفساين"
        : "Mes Projets | Portfolio — Web, Systèmes & Design — Devsign";

  const description =
    locale === "en"
      ? "Selected projects: e-commerce, business automation, and ad design. Websites and systems that drive results for startups and businesses."
      : locale === "ar"
        ? "مشاريع مختارة: تجارة إلكترونية، أتمتة أعمال، وتصميم إعلانات. مواقع وأنظمة تحقق النتائج."
        : "Projets sélectionnés : e-commerce, automatisation et design. Sites et systèmes qui génèrent des résultats.";

  const keywords =
    locale === "en"
      ? ["portfolio", "projects", "web development", "e-commerce", "automation", "design"]
      : locale === "ar"
        ? ["أعمالي", "مشاريع", "تطوير ويب", "تصميم"]
        : ["portfolio", "projets", "développement web", "design"];

  return buildPageMetadata({
    locale,
    baseUrl,
    title,
    description,
    path: "/portfolio",
    keywords,
  });
}

export default async function PortfolioPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale: Locale = i18n.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : i18n.defaultLocale;
  const dict = await getTrans(locale);
  const t = dict.pages?.portfolio;
  const isRtl = locale === "ar";

  if (!t || !t.projects?.length) return null;

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

          <div className="space-y-10 sm:space-y-14">
            {t.projects.map(
              (
                project: {
                  title: string;
                  description: string;
                  tech: string;
                  category: string;
                },
                index: number
              ) => {
                const img = getProjectImage(project.title);
                const isEven = index % 2 === 0;
                return (
                  <article
                    key={project.title}
                    className="group rounded-2xl border border-border bg-card/50 overflow-hidden hover:bg-card hover:shadow-lg transition-all duration-300"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                      <div
                        className={`relative aspect-[4/3] md:aspect-auto md:min-h-[280px] ${
                          isEven ? "md:order-1" : "md:order-2"
                        }`}
                      >
                        <Image
                          src={img}
                          alt=""
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                      <div
                        className={`p-6 sm:p-8 flex flex-col justify-center ${
                          isEven ? "md:order-2" : "md:order-1"
                        }`}
                      >
                        <span className="text-xs font-medium uppercase tracking-wider text-primary mb-2">
                          {project.category}
                        </span>
                        <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">
                          {project.title}
                        </h2>
                        <p className="text-muted-foreground leading-relaxed mb-3">
                          {project.description}
                        </p>
                        <p className="text-sm text-muted-foreground/80 mb-4">
                          {project.tech}
                        </p>
                        <span className="inline-flex items-center gap-2 text-primary font-medium text-sm">
                          {t.viewCase}
                          <ExternalLink size={14} aria-hidden />
                        </span>
                      </div>
                    </div>
                  </article>
                );
              }
            )}
          </div>

          {/* Why Clients Choose My Work */}
          {t.whyChooseUs?.reasons?.length > 0 && (
            <div className="mt-16 pt-12 border-t border-border">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {t.whyChooseUs.title}
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl">
                {t.whyChooseUs.subtitle}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {t.whyChooseUs.reasons.map(
                  (r: { title: string; text: string }, i: number) => (
                    <div
                      key={r.title}
                      className="p-6 rounded-2xl border border-border bg-card/50 hover:bg-card transition-colors"
                    >
                      <h3 className="font-semibold text-foreground mb-2">
                        {r.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {r.text}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          <div className="mt-14 text-center">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              {t.cta}
              <ArrowRight
                size={18}
                className={isRtl ? "rotate-180" : ""}
                aria-hidden
              />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
