import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Target,
  Zap,
  MessageCircle,
  BarChart3,
  Trophy,
  HelpCircle,
} from "lucide-react";
import { Locale, i18n } from "@/i18n-config";
import { getDictionary } from "@/app/lib/dictionary";
import { buildPageMetadata } from "@/app/lib/buildPageMetadata";

type Props = { params: Promise<{ locale: string }> };

const ABOUT_IMAGE = "/images/md-ishak-raman-x45xE1P6Fe4-unsplash.jpg";
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
    locale === "en"
      ? "About Me | Web Developer & Designer — Devsign"
      : locale === "ar"
        ? "عني | مطور ويب ومصمم — ديفساين"
        : "À Propos | Développeur Web & Designer — Devsign";

  const description =
    locale === "en"
      ? "Professional developer and designer in Morocco. SEO-optimized websites, business automation, AI integration, and ad design for startups and SMBs."
      : locale === "ar"
        ? "مطور ومصمم محترف من المغرب. مواقع محسّنة للسيو، أتمتة الأعمال، دمج الذكاء الاصطناعي وتصميم إعلانات للشركات الناشئة والمتوسطة."
        : "Développeur et designer au Maroc. Sites SEO, automatisation, intégration IA et design publicitaire pour startups et PME.";

  const keywords =
    locale === "en"
      ? ["about", "web developer Morocco", "designer", "portfolio", "freelance"]
      : locale === "ar"
        ? ["عني", "مطور ويب المغرب", "مصمم", "أعمالي"]
        : ["à propos", "développeur web Maroc", "designer", "portfolio"];

  return buildPageMetadata({
    locale,
    title,
    description,
    route: "/about",
    keywords,
  });
}

const valueIcons = [Target, Zap, MessageCircle, BarChart3];

export default async function AboutPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale: Locale = i18n.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : i18n.defaultLocale;
  const dict = await getDictionary(locale);
  const t = dict.pages?.about;
  const isRtl = locale === "ar";

  if (!t) return null;

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
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-8">
            {t.heading}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-3 space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t.intro}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t.paragraph1}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t.paragraph2}
              </p>
            </div>
            <div className="lg:col-span-2">
              <div className="aspect-square max-w-sm rounded-2xl overflow-hidden border border-border bg-card">
                <Image
                  src={ABOUT_IMAGE}
                  alt=""
                  width={400}
                  height={400}
                  className="w-full h-full object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 400px"
                />
              </div>
            </div>
          </div>

          {/* Who I Am */}
          {t.whoIAm && (
            <div className="mt-16 pt-12 border-t border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {t.whoIAm.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-3xl">
                {t.whoIAm.text}
              </p>
            </div>
          )}

          {/* Story, Mission & Values */}
          {t.storyMissionValues && (
            <div className="mt-16 pt-12 border-t border-border">
              <h2 className="text-2xl font-bold text-foreground mb-8">
                {t.storyMissionValues.title}
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {locale === "en"
                        ? "My story"
                        : locale === "ar"
                          ? "قصتي"
                          : "Mon parcours"}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t.storyMissionValues.story}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {locale === "en"
                        ? "My mission"
                        : locale === "ar"
                          ? "مهمتي"
                          : "Ma mission"}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t.storyMissionValues.mission}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border bg-card">
                    <Image
                      src={STORY_IMAGE}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                </div>
              </div>
              {t.storyMissionValues.values?.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    {t.storyMissionValues.valuesTitle}
                  </h3>
                  <ul className="space-y-2">
                    {t.storyMissionValues.values.map(
                      (item: string, i: number) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-muted-foreground"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Hackathons & Events */}
          {t.hackathons?.items?.length > 0 && (
            <div className="mt-16 pt-12 border-t border-border">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {t.hackathons.title}
              </h2>
              <p className="text-muted-foreground mb-8">
                {t.hackathons.subtitle}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {t.hackathons.items.map(
                  (
                    item: { name: string; year: string; place: string },
                    i: number
                  ) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card/50 hover:bg-card transition-colors"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Trophy className="w-6 h-6 text-primary" aria-hidden />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-foreground truncate">
                          {item.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.year} · {item.place}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* How Can I Help */}
          {t.howCanIHelp?.items?.length > 0 && (
            <div className="mt-16 pt-12 border-t border-border">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {t.howCanIHelp.title}
              </h2>
              <p className="text-muted-foreground mb-8">
                {t.howCanIHelp.subtitle}
              </p>
              <ul className="space-y-4">
                {t.howCanIHelp.items.map((item: string, i: number) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card/30 hover:bg-card/50 transition-colors"
                  >
                    <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden />
                    <span className="text-muted-foreground leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Values (existing) */}
          {t.values && t.values.length > 0 && (
            <div className="mt-16 pt-12 border-t border-border">
              <h2 className="text-xl font-semibold text-foreground mb-8">
                {locale === "en"
                  ? "What I stand for"
                  : locale === "ar"
                    ? "ما أؤمن به"
                    : "Ce qui me guide"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {t.values.map(
                  (item: { title: string; text: string }, i: number) => {
                    const Icon = valueIcons[i % valueIcons.length];
                    return (
                      <div
                        key={item.title}
                        className="p-5 rounded-xl border border-border bg-card/50 hover:bg-card transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <Icon
                              className="w-5 h-5 text-primary"
                              aria-hidden
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground mb-1">
                              {item.title}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {item.text}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  }
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
