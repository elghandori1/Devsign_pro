// /app/[locale]/about/page.tsx
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
  Award,
  Code2,
  Heart,
  Globe,
  Coffee,
  BookOpen,
  Sparkles,
  ChevronRight,
  Star,
  Briefcase,
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
        ? "عني | مطور ويب ومصمم - ديفساين"
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
  const t = dict.pages?.about_page;
  const isRtl = locale === "ar";

  if (!t) return null;

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 via-transparent to-transparent" />
        </div>

        <div className="relative px-4 sm:px-6 py-16 sm:py-20 md:py-28">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-4xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                {t.subtitle}
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent mb-6">
                {t.heading}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                {t.intro}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto">
          {/* Introduction with Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
            <div className={`space-y-6 ${isRtl ? "lg:order-2" : ""}`}>
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-primary">
                  <div className="h-px w-8 bg-primary" />
                  <span className="text-sm font-medium uppercase tracking-wider">
                    {locale === "en" ? "Who I Am" : locale === "fr" ? "Qui je suis" : "من أنا"}
                  </span>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t.paragraph1}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t.paragraph2}
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                <div className="text-center p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <div className="text-2xl font-bold text-primary">5+</div>
                  <div className="text-xs text-muted-foreground">
                    {locale === "en" ? "Years Experience" : locale === "fr" ? "Ans d'expérience" : "سنوات خبرة"}
                  </div>
                </div>
                <div className="text-center p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <div className="text-2xl font-bold text-primary">50+</div>
                  <div className="text-xs text-muted-foreground">
                    {locale === "en" ? "Happy Clients" : locale === "fr" ? "Clients satisfaits" : "عملاء سعداء"}
                  </div>
                </div>
                <div className="text-center p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <div className="text-2xl font-bold text-primary">100+</div>
                  <div className="text-xs text-muted-foreground">
                    {locale === "en" ? "Projects" : locale === "fr" ? "Projets" : "مشروع"}
                  </div>
                </div>
              </div>
            </div>

            <div className={`relative ${isRtl ? "lg:order-1" : ""}`}>
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="relative rounded-2xl overflow-hidden border-2 border-primary/20 shadow-2xl">
                  <Image
                    src={ABOUT_IMAGE}
                    alt=""
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                    sizes="(max-width: 1024px) 100vw, 500px"
                  />
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-xl" />
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-secondary/10 rounded-full blur-xl" />
              </div>
            </div>
          </div>

          {/* Who I Am Section */}
          {t.whoIAm && (
            <div className="mb-20 p-8 rounded-3xl bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                  {t.whoIAm.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {t.whoIAm.text}
                </p>
              </div>
            </div>
          )}

          {/* Story, Mission & Values */}
          {t.storyMissionValues && (
            <div className="mb-20">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
                {t.storyMissionValues.title}
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className={`space-y-8 ${isRtl ? "lg:order-2" : ""}`}>
                  <div className="group">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {locale === "en" ? "My Story" : locale === "fr" ? "Mon parcours" : "قصتي"}
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed pl-13">
                      {t.storyMissionValues.story}
                    </p>
                  </div>
                  <div className="group">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Target className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {locale === "en" ? "My Mission" : locale === "fr" ? "Ma mission" : "مهمتي"}
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed pl-13">
                      {t.storyMissionValues.mission}
                    </p>
                  </div>
                </div>
                <div className={`relative ${isRtl ? "lg:order-1" : ""}`}>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={STORY_IMAGE}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>
                </div>
              </div>

              {t.storyMissionValues.values?.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-xl font-semibold text-center mb-8">
                    {t.storyMissionValues.valuesTitle}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {t.storyMissionValues.values.map((item: string, i: number) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-4 rounded-xl bg-card/50 border border-border hover:border-primary/30 transition-all hover:shadow-lg"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Hackathons & Events */}
          {t.hackathons?.items?.length > 0 && (
            <div className="mb-20">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <Trophy className="w-4 h-4" />
                  {t.hackathons.title}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                  {t.hackathons.title}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {t.hackathons.subtitle}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {t.hackathons.items.map(
                  (item: { name: string; year: string; place: string }, i: number) => (
                    <div
                      key={i}
                      className="group relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-card to-primary/5 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl"
                    >
                      <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all" />
                      <div className="relative z-10">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            <Trophy className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground mb-1">
                              {item.name}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>{item.year}</span>
                              <span>•</span>
                              <span>{item.place}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* How Can I Help */}
          {t.howCanIHelp?.items?.length > 0 && (
            <div className="mb-20">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <HelpCircle className="w-4 h-4" />
                  {t.howCanIHelp.title}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                  {t.howCanIHelp.title}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {t.howCanIHelp.subtitle}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {t.howCanIHelp.items.map((item: string, i: number) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-5 rounded-xl bg-card/30 border border-border hover:bg-card/50 transition-all hover:border-primary/30 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <ChevronRight className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Values Section */}
          {t.values && t.values.length > 0 && (
            <div className="mb-20">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <Heart className="w-4 h-4" />
                  {locale === "en"
                    ? "What I Stand For"
                    : locale === "ar"
                      ? "ما أؤمن به"
                      : "Ce qui me guide"}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold">
                  {locale === "en"
                    ? "Core Values"
                    : locale === "ar"
                      ? "القيم الأساسية"
                      : "Valeurs fondamentales"}
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {t.values.map(
                  (item: { title: string; text: string }, i: number) => {
                    const Icon = valueIcons[i % valueIcons.length];
                    return (
                      <div
                        key={item.title}
                        className="group p-6 rounded-2xl bg-card/50 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                      >
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="relative mt-16">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-3xl blur-3xl" />
            <div className="relative text-center py-16 px-6 rounded-3xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                {locale === "en"
                  ? "Ready to Bring Your Vision to Life?"
                  : locale === "fr"
                    ? "Prêt à Donner Vie à Votre Vision ?"
                    : "مستعد لإضفاء الحيوية على رؤيتك؟"}
              </h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                {locale === "en"
                  ? "Let's work together to create something amazing"
                  : locale === "fr"
                    ? "Travaillons ensemble pour créer quelque chose d'incroyable"
                    : "دعنا نعمل معًا لإنشاء شيء رائع"}
              </p>
              <Link
                href={`/${locale}/contact`}
                className="group inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all hover:gap-3 shadow-lg hover:shadow-xl"
              >
                {t.cta}
                <ArrowRight
                  size={18}
                  className={`group-hover:translate-x-1 transition-transform ${isRtl ? "rotate-180" : ""}`}
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Helper component for checkmark
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