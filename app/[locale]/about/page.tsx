// /app/[locale]/about/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Target,
  Trophy,
  BookOpen,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Locale, i18n } from "@/i18n-config";
import { getDictionary } from "@/app/lib/dictionary";
import { buildPageMetadata, getBaseUrl } from "@/app/lib/buildPageMetadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = i18n.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : i18n.defaultLocale;

  const title =
    locale === "en"
      ? "About Mohammed Elghandori | Full-Stack & SEO Expert"
      : locale === "ar"
        ? "عن محمد الغنضوري | مطور ويب Full-Stack وخبير SEO"
        : "À propos de Mohammed | Développeur Full-Stack & SEO";

  const description =
    locale === "en"
      ? "Learn about Mohammed Elghandori, a Full-Stack Web Developer in Morocco specializing in Next.js, Technical SEO, and AI Search Optimization."
      : locale === "ar"
        ? "تعرّف على محمد الغنضوري، مطور ويب Full-Stack في المغرب. متخصص في Next.js، SEO التقني، وتحسين البحث بالذكاء الاصطناعي لبناء مواقع عالية الأداء."
        : "Découvrez Mohammed Elghandori, développeur Full-Stack au Maroc expert en Next.js, SEO technique et optimisation pour la recherche IA.";

  const keywords =
    locale === "en"
      ? [
          "Mohammed Elghandori",
          "freelance web developer Morocco",
          "Next.js developer Casablanca",
          "full-stack developer Morocco",
          "Technical SEO expert Morocco",
          "GEO specialist",
          "AEO specialist",
          "AI search optimization Morocco",
          "hire web developer Morocco",
          "1337 School developer",
          "42 Network Morocco",
          "ISTA NTIC",
          "web developer portfolio",
          "software engineer Morocco",
          "React developer Morocco",
        ]
      : locale === "ar"
        ? [
            "محمد الغنضوري",
            "مطور ويب مستقل المغرب",
            "مطور Next.js الدار البيضاء",
            "مطور متكامل المغرب",
            "خبير SEO تقني المغرب",
            "متخصص GEO",
            "متخصص AEO",
            "تحسين البحث بالذكاء الاصطناعي",
            "توظيف مطور ويب المغرب",
            "مطور 1337 School",
            "شبكة 42 المغرب",
            "معرض أعمال مطور",
          ]
        : [
            "Mohammed Elghandori",
            "développeur web freelance Maroc",
            "développeur Next.js Casablanca",
            "développeur full-stack Maroc",
            "expert SEO technique Maroc",
            "spécialiste GEO",
            "spécialiste AEO",
            "optimisation recherche IA Maroc",
            "embaucher développeur web Maroc",
            "développeur 1337 School",
            "réseau 42 Maroc",
            "portfolio développeur web",
          ];

  return buildPageMetadata({
    locale,
    title,
    description,
    route: "/about",
    keywords,
    ogImagePath: "/cover/Designpro-mohammed-cover.jpg",
    type: "website",
  });
}

function CheckCircle({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

export default async function AboutPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale: Locale = i18n.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : i18n.defaultLocale;

  const dict = await getDictionary(locale);
  const t = dict.pages?.about_page;
  const isRtl = locale === "ar";
  const baseUrl = getBaseUrl();

  const ProfileSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${baseUrl}/${locale}/about#profile`,
    url: `${baseUrl}/${locale}/about`,
    mainEntity: {
      "@id": `${baseUrl}/#person`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name:
          locale === "en" ? "Home" : locale === "ar" ? "الرئيسية" : "Accueil",
        item: `${baseUrl}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: locale === "en" ? "About" : locale === "ar" ? "عنّي" : "À propos",
        item: `${baseUrl}/${locale}/about`,
      },
    ],
  };

  if (!t) return null;

  return (
    <main
      className="min-h-screen bg-background hero-section-light"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ProfileSchema) }}
      />

      <section
        className="relative overflow-hidden border-b border-border"
        aria-labelledby="about-hero-heading"
      >
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right,currentColor 1px,transparent 1px),linear-gradient(to bottom,currentColor 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute -top-24 -left-24 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-14">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 border border-primary/20">
            <Sparkles size={13} aria-hidden="true" />
            {t.title ?? "About me"}
          </div>

          <h1
            id="about-hero-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 max-w-5xl leading-[1.15]"
            itemProp="headline"
          >
            {t.heading}
          </h1>

          <p
            className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl"
            itemProp="description"
          >
            {t.intro}
          </p>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl">
            {t.intro_2}
          </p>
          <div
            className="grid grid-cols-3 gap-3 sm:gap-4 mt-10 max-w-sm sm:max-w-md"
            role="list"
            aria-label="Key statistics"
          >
            {[
              { value: "3+", label: t.stats?.years ?? "Years Experience" },
              { value: "98%", label: t.stats?.clients ?? "Happy Clients" },
              { value: "15+", label: t.stats?.projects ?? "Projects" },
            ].map((s) => (
              <div
                key={s.label}
                className="text-center py-4 px-2 rounded-xl bg-primary/5 border border-primary/10"
                role="listitem"
                itemScope
                itemType="https://schema.org/QuantitativeValue"
              >
                <meta itemProp="value" content={s.value} />
                <div className="text-2xl sm:text-3xl font-bold text-primary">
                  {s.value}
                </div>
                <div className="text-[11px] sm:text-xs text-muted-foreground mt-1 leading-tight">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 1. WHO I AM SECTION */}
      <section
        className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16"
        aria-labelledby="who-i-am-heading"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-10 lg:gap-16 items-center">
          <div className="space-y-5">
            <h2
              id="who-i-am-heading"
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20"
            >
              {t.whoIAm?.title}
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {t.whoIAm?.paragraph1}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t.whoIAm?.paragraph2}
            </p>
          </div>

          <div className={`relative ${isRtl ? "lg:order-1" : ""}`}>
            <div
              className="relative max-w-xs mx-auto lg:max-w-none"
              itemScope
              itemType="https://schema.org/Person"
            >
              <meta itemProp="name" content="Mohammed Elghandori" />
              <meta
                itemProp="jobTitle"
                content={
                  locale === "en"
                    ? "Web Developer & SEO Specialist"
                    : locale === "ar"
                      ? "مطور ويب وخبير تحسين محركات البحث"
                      : "Développeur Web & Spécialiste SEO"
                }
              />
              <div className="absolute -inset-3 rounded-3xl border border-primary/10" />
              <figure className="relative rounded-2xl overflow-hidden border border-border shadow-xl aspect-[3/4]">
                <Image
                  src="/images/mohammed-profile.png"
                  alt="Mohammed Elghandori - Full-Stack Web Developer and SEO Specialist in Morocco, founder of Devsignpro"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  priority
                  itemProp="image"
                />
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TECH PHILOSOPHY SECTION */}
      {t.tech_philosophy && (
        <section
          className="max-w-6xl mx-auto px-4 sm:px-6 pb-10 sm:pb-14"
          aria-labelledby="tech-heading"
        >
          {/* Added relative, rounded card, border, and overflow-hidden to contain the gradient */}
          <div className="relative rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-10 overflow-hidden shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />

            {/* Added z-10 so the text sits cleanly ON TOP of the gradient */}
            <div className="relative z-10">
              <h2
                id="tech-heading"
                className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-3"
              >
                {t.tech_philosophy.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg max-w-4xl">
                {t.tech_philosophy.paragraph}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 3. EXPERIENCE SECTION */}
      {t.experience && (
        <section
          className="max-w-6xl mx-auto px-4 sm:px-6 pb-10 sm:pb-16"
          aria-labelledby="experience-heading"
        >
          <div className="relative rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-10 overflow-hidden shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />

            <div className="relative z-10">
              <h2
                id="experience-heading"
                className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-3"
              >
                {t.experience.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg max-w-4xl">
                {t.experience.paragraph}
              </p>
            </div>
          </div>
        </section>
      )}

      {t.storyMissionValues && (
        <section
          className="border-t border-border"
          aria-labelledby="story-heading"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
            <h2
              id="story-heading"
              className="text-2xl sm:text-3xl font-bold text-center mb-12"
            >
              {t.storyMissionValues.title}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div className={`space-y-8 ${isRtl ? "lg:order-2" : ""}`}>
                {[
                  {
                    icon: BookOpen,
                    label: t.storyMissionValues.storyLabel ?? "My Story",
                    text: t.storyMissionValues.story,
                  },
                  {
                    icon: Target,
                    label: t.storyMissionValues.missionLabel ?? "My Mission",
                    text: t.storyMissionValues.mission,
                  },
                ].map(({ icon: Icon, label, text }) => (
                  <article key={label} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon
                        className="w-5 h-5 text-primary"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{label}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {text}
                      </p>
                    </div>
                  </article>
                ))}
              </div>

              <div className={`relative ${isRtl ? "lg:order-1" : ""}`}>
                <figure className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-border">
                  <Image
                    src="/images/about/profile1.png"
                    alt="Mohammed Elghandori working on web development and SEO projects in Morocco"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </figure>
              </div>
            </div>

            {t.storyMissionValues.values?.length > 0 && (
              <div className="mt-14">
                <h3 className="text-xl font-semibold text-center mb-8">
                  {t.storyMissionValues.valuesTitle}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {t.storyMissionValues.values.map(
                    (item: string, i: number) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all duration-200"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                        <span className="text-sm text-foreground/80">
                          {item}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {t.hackathons?.items?.length > 0 && (
        <section
          className="border-t border-border bg-muted/10"
          aria-labelledby="hackathons-heading"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
            <header className="text-center mb-10">
              <h2
                id="hackathons-heading"
                className="text-2xl sm:text-3xl font-bold mb-3"
              >
                {t.hackathons.title}
              </h2>
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20">
                <Trophy className="w-4 h-4" aria-hidden="true" />
                {t.hackathons.subtitle}
              </span>
            </header>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0 m-0">
              {" "}
              {t.hackathons.items.map(
                (
                  item: {
                    name: string;
                    location: string;
                    year: string;
                    place: string;
                  },
                  i: number,
                ) => (
                  <li key={i}>
                    <article className="group flex items-start gap-4 p-5 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Trophy
                          className="w-5 h-5 text-primary"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-foreground mb-1.5 truncate">
                          {item.name}
                        </h3>
                        {/* CHANGED: text-muted-foreground to text-foreground/80 */}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-foreground/80">
                          <time dateTime={item.year}>{item.year}</time>
                          <span className="text-border">•</span>
                          <span>{item.location}</span>
                          <span className="text-border">•</span>
                          <span className="text-primary font-medium">
                            {item.place}
                          </span>
                        </div>
                      </div>
                    </article>
                  </li>
                ),
              )}
            </ul>
          </div>
        </section>
      )}

      {t.howCanIHelp?.items?.length > 0 && (
        <section
          className="border-t border-border"
          aria-labelledby="help-heading"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
            <header className="text-center mb-10">
              <h2
                id="help-heading"
                className="text-2xl sm:text-3xl font-bold mb-3"
              >
                {t.howCanIHelp.title}
              </h2>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {t.howCanIHelp.items.map((item: string, i: number) => (
                <div
                  key={i}
                  className="group flex items-start gap-3 p-4 sm:p-5 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all duration-200"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors mt-0.5">
                    <ChevronRight
                      className="w-4 h-4 text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="text-sm sm:text-base text-foreground/80 leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section
        aria-labelledby="cta-heading"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20">
          <div className="relative rounded-2xl border border-primary/20 bg-card overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative text-center py-12 sm:py-16 px-6 sm:px-12">
              <h2
                id="cta-heading"
                className="text-2xl sm:text-3xl font-bold mb-4"
              >
                {t.cta?.title ?? "Ready to Bring Your Vision to Life?"}
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
                {t.cta?.description ??
                  "Let's work together to create something amazing."}
              </p>
              <Link
                href={`/${locale}/contact`}
                className="group inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/20"
              >
                {t.cta?.button ?? t.cta}
                <ArrowRight
                  size={17}
                  className={`transition-transform group-hover:${isRtl ? "-translate-x-1" : "translate-x-1"} ${isRtl ? "rotate-180" : ""}`}
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
