// /app/[locale]/about/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, Target, Zap, MessageCircle, BarChart3,
  Trophy, HelpCircle, Heart, BookOpen, ChevronRight, Sparkles,
} from "lucide-react";
import { Locale, i18n } from "@/i18n-config";
import { getDictionary } from "@/app/lib/dictionary";
import { buildPageMetadata, getBaseUrl } from "@/app/lib/buildPageMetadata";

type Props = { params: Promise<{ locale: string }> };
const STORY_IMAGE = "/images/alex-suprun-ZHvM3XIOHoE-unsplash.jpg";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = i18n.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : i18n.defaultLocale;

  const title =
    locale === "en" ? "About Me | Web Developer & Designer — Devsign"
    : locale === "ar" ? "عني | مطور ويب ومصمم - ديفساين"
    : "À Propos | Développeur Web & Designer — Devsign";

  const description =
    locale === "en" ? "Professional developer and designer in Morocco. SEO-optimized websites, business automation, AI integration, and ad design for startups and SMBs."
    : locale === "ar" ? "مطور ومصمم محترف من المغرب. مواقع محسّنة للسيو، أتمتة الأعمال، دمج الذكاء الاصطناعي وتصميم إعلانات للشركات الناشئة والمتوسطة."
    : "Développeur et designer au Maroc. Sites SEO, automatisation, intégration IA et design publicitaire pour startups et PME.";

  const keywords =
    locale === "en" ? ["web developer Morocco", "designer", "portfolio", "freelance"]
    : locale === "ar" ? ["مطور ويب المغرب", "مصمم", "أعمالي"]
    : ["développeur web Maroc", "designer", "portfolio"];

  return buildPageMetadata({ locale, title, description, route: "/about", keywords });
}

const VALUE_ICONS = [Target, Zap, MessageCircle, BarChart3];

function CheckCircle({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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

  const title =
    locale === "en" ? "About Me | Web Developer & Designer — Devsign"
    : locale === "ar" ? "عني | مطور ويب ومصمم - ديفساين"
    : "À Propos | Développeur Web & Designer — Devsign";

  const description =
    locale === "en" ? "Professional developer and designer in Morocco. SEO-optimized websites, business automation, AI integration, and ad design for startups and SMBs."
    : locale === "ar" ? "مطور ومصمم محترف من المغرب. مواقع محسّنة للسيو، أتمتة الأعمال، دمج الذكاء الاصطناعي وتصميم إعلانات للشركات الناشئة والمتوسطة."
    : "Développeur et designer au Maroc. Sites SEO, automatisation, intégration IA et design publicitaire pour startups et PME.";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${baseUrl}/${locale}/about#webpage`,
    url: `${baseUrl}/${locale}/about`,
    name: title,
    description,
    inLanguage: locale,
    isPartOf: { "@id": `${baseUrl}/#website` },
    publisher: { "@id": `${baseUrl}/#organization` },
    mainEntity: { "@id": `${baseUrl}/#person` },
  };

  if (!t) return null;

  return (
    <main
      className="min-h-screen bg-background hero-section-light"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── 1. HERO ── */}
      <section className="relative overflow-hidden border-b border-border">
        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right,currentColor 1px,transparent 1px),linear-gradient(to bottom,currentColor 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* ambient glow */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary
                          px-4 py-2 rounded-full text-sm font-medium mb-6 border border-primary/20">
            <Sparkles size={13} />
            {t.title ?? "About me"}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight
                         mb-6 max-w-3xl leading-[1.1]">
            {t.heading}
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            {t.intro}
          </p>

          {/* Stats strip */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-10 max-w-sm sm:max-w-md">
            {[
              { value: "5+",  label: t.stats?.years    ?? "Years Experience" },
              { value: "98%", label: t.stats?.clients  ?? "Happy Clients" },
              { value: "20+", label: t.stats?.projects ?? "Projects" },
            ].map((s) => (
              <div key={s.label}
                className="text-center py-4 px-2 rounded-xl bg-primary/5 border border-primary/10">
                <div className="text-2xl sm:text-3xl font-bold text-primary">{s.value}</div>
                <div className="text-[11px] sm:text-xs text-muted-foreground mt-1 leading-tight">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. WHO I AM ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* text */}
          <div className={`space-y-5 ${isRtl ? "lg:order-2" : ""}`}>
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary
                             px-4 py-2 rounded-full text-sm font-medium border border-primary/20">
              {t.whoIAm?.title}
            </span>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t.whoIAm?.paragraph1}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t.whoIAm?.paragraph2}
            </p>
          </div>

          {/* image */}
          <div className={`relative ${isRtl ? "lg:order-1" : ""}`}>
            <div className="relative  max-w-sm mx-auto lg:max-w-none">
              {/* decorative ring */}
              <div className="absolute -inset-3 rounded-3xl border border-primary/10" />
              <div className="relative rounded-2xl overflow-hidden border border-border shadow-xl">
                <Image
                  src="/images/md-ishak-raman-x45xE1P6Fe4-unsplash.jpg"
                  alt="Mohammed — full-stack developer and designer at Devsign"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 500px"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. EXPERIENCE BANNER ── */}
      {t.experience && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20">
          <div className="relative rounded-2xl border border-primary/20 bg-primary/5 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
            <div className="relative text-center py-10 sm:py-14 px-6 sm:px-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t.experience.title}</h2>
              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg max-w-3xl mx-auto">
                {t.experience.paragraph}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── 4. STORY & MISSION ── */}
      {t.storyMissionValues && (
        <section className="border-t border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
              {t.storyMissionValues.title}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

              {/* story + mission */}
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
                  <div key={label} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center
                                    justify-center shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{label}</h3>
                      <p className="text-muted-foreground leading-relaxed">{text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* story image */}
              <div className={`relative ${isRtl ? "lg:order-1" : ""}`}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-border">
                  <Image
                    src={STORY_IMAGE}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
              </div>
            </div>

            {/* values checklist */}
            {t.storyMissionValues.values?.length > 0 && (
              <div className="mt-14">
                <h3 className="text-xl font-semibold text-center mb-8">
                  {t.storyMissionValues.valuesTitle}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {t.storyMissionValues.values.map((item: string, i: number) => (
                    <div key={i}
                      className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border
                                 hover:border-primary/30 hover:shadow-md transition-all duration-200">
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── 5. HACKATHONS ── */}
      {t.hackathons?.items?.length > 0 && (
        <section className="border-t border-border bg-muted/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">{t.hackathons.title}</h2>
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary
                               px-4 py-2 rounded-full text-sm font-medium border border-primary/20">
                <Trophy className="w-4 h-4" />
                {t.hackathons.subtitle}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {t.hackathons.items.map(
                (item: { name: string; location: string; year: string; place: string }, i: number) => (
                  <div key={i}
                    className="group flex items-start gap-4 p-5 rounded-2xl bg-card border border-border
                               hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center
                                    shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Trophy className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-foreground mb-1.5 truncate">{item.name}</h3>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                        <span>{item.year}</span>
                        <span className="text-border">•</span>
                        <span>{item.location}</span>
                        <span className="text-border">•</span>
                        <span className="text-primary font-medium">{item.place}</span>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── 6. HOW CAN I HELP ── */}
      {t.howCanIHelp?.items?.length > 0 && (
        <section className="border-t border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">{t.howCanIHelp.title}</h2>
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary
                               px-4 py-2 rounded-full text-sm font-medium border border-primary/20">
                <HelpCircle className="w-4 h-4" />
                {t.howCanIHelp.subtitle}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {t.howCanIHelp.items.map((item: string, i: number) => (
                <div key={i}
                  className="group flex items-start gap-3 p-4 sm:p-5 rounded-xl bg-card border border-border
                             hover:border-primary/30 hover:shadow-md transition-all duration-200">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center
                                  shrink-0 group-hover:bg-primary/20 transition-colors mt-0.5">
                    <ChevronRight className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm sm:text-base text-muted-foreground leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 7. CORE VALUES ── */}
      {t.values?.length > 0 && (
        <section className="border-t border-border bg-muted/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                {t.valuesSection?.title ?? "Core Values"}
              </h2>
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary
                               px-4 py-2 rounded-full text-sm font-medium border border-primary/20">
                <Heart className="w-4 h-4" />
                {t.valuesSection?.subtitle ?? "What I Stand For"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {t.values.map((item: { title: string; text: string }, i: number) => {
                const Icon = VALUE_ICONS[i % VALUE_ICONS.length];
                return (
                  <div key={item.title}
                    className="group p-5 sm:p-6 rounded-2xl bg-card border border-border
                               hover:border-primary/30 hover:shadow-xl hover:-translate-y-0.5
                               transition-all duration-300">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center
                                    mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── 8. CTA ── */}
      <section className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <div className="relative rounded-2xl border border-primary/20 bg-card overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10
                            rounded-full blur-3xl pointer-events-none" />

            <div className="relative text-center py-12 sm:py-16 px-6 sm:px-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                {t.cta?.title ?? "Ready to Bring Your Vision to Life?"}
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
                {t.cta?.description ?? "Let's work together to create something amazing."}
              </p>
              <Link
                href={`/${locale}/contact`}
                className="group inline-flex items-center gap-2 px-8 py-3.5
                           bg-primary text-primary-foreground font-semibold rounded-xl
                           hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/20"
              >
                {t.cta?.button ?? t.cta}
                <ArrowRight
                  size={17}
                  className={`transition-transform group-hover:${isRtl ? "-translate-x-1" : "translate-x-1"}
                              ${isRtl ? "rotate-180" : ""}`}
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}