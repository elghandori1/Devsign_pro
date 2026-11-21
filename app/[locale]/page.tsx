// app/[locale]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getDictionary } from "@/app/lib/dictionary";
import { Locale, i18n } from "@/i18n-config";
import { buildPageMetadata, getBaseUrl } from "@/app/lib/buildPageMetadata";
import SubTitle from "../components/SubTitles";
import ServicesGrid from "../components/ServicesGrid";
import AboutMeSection from "../components/AboutMeSection";
import WhyWeAreSection from "../components/WhyWeAreSection";
import ProjectsShowcase from "../components/ProjectsShowcase";
import ContactSection from "../components/ContactSection";
import ScrollReveal from "../components/ScrollReveal";
import TechStackSection from "../components/TechStackSection";
import FAQSection from "../components/FAQSection";
import CustomerProblemsSection from "../components/CustomerProblemsSection";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import {
  FAQPageSchema,
  PersonSchema,
  ProfessionalServiceSchema,
} from "@/app/components/schemas";
import infos from "@/app/dictionaries/global.json";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = i18n.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : i18n.defaultLocale;

  const isEnglish = locale === "en";
  const title = isEnglish
    ? "Technical SEO & AI Search Consultant | Devsignpro"
    : "Consultant SEO Technique en France | Devsignpro";

  const description = isEnglish
    ? "Technical SEO and AI search consultant based in France, helping businesses improve indexing, performance and search visibility."
    : "Consultant SEO technique et GEO en France. J’optimise les sites web et boutiques en ligne pour Google, ChatGPT et Perplexity.";

  const keywords = isEnglish
    ? [
        "technical seo consultant",
        "technical seo consultant France",
        "technical seo audit",
        "website seo optimization",
        "technical seo fixes",
        "ecommerce seo consultant",
        "ai search optimization consultant",
        "geo consultant",
        "core web vitals optimization",
        "international seo consultant",
      ]
    : [
          "consultant seo france",
          "consultant seo technique",
          "consultant geo france",
          "audit seo technique",
          "optimisation seo site web",
          "optimisation seo boutique en ligne",
          "référencement naturel",
          "référencement ia",
          "visibilité chatgpt",
          "google ai overviews",
          "optimisation core web vitals",
        ];

  return buildPageMetadata({
    locale,
    title,
    description,
    keywords,
    route: "",
    ogImagePath: "/cover/Designpro-cover.jpg",
    type: "website",
  });
}

export default async function Home({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale: Locale = i18n.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : i18n.defaultLocale;

  const dict = await getDictionary(locale);
  const t = dict.homepage;
  const baseUrl = getBaseUrl();
  const jobTitle =
    locale === "en"
      ? "Technical SEO and AI Search Consultant"
      : "Consultant SEO et GEO en France";

  const isEnglish = locale === "en";
  const description = isEnglish
    ? "Technical SEO and AI search consultant based in France, helping businesses improve website indexing, performance and search visibility."
    : "Consultant SEO technique et GEO en France. J’optimise les sites web et boutiques en ligne pour Google, ChatGPT, Google AI Overviews et Perplexity.";
  const faqs = isEnglish
    ? [
        {
          question: "Can you improve an existing website without rebuilding it?",
          answer:
            "Yes. I first review crawling, indexing, structure, content, performance and conversion paths. If the foundation is sound, I prioritize targeted improvements. I only recommend a rebuild when the current platform prevents reliable progress.",
        },
        {
          question:
            "What is AI Search Optimization and how is it different from SEO?",
          answer:
            "AI Search Optimization helps systems such as ChatGPT, Google AI Overviews and Perplexity understand and retrieve your content. It builds on traditional SEO with clear answer-focused content, structured data, accessible pages and stronger entity and trust signals. It improves eligibility and visibility, but no consultant can guarantee a citation.",
        },
        {
          question: "Should I choose WordPress or Next.js for my business website?",
          answer:
            "WordPress is a practical choice when your team wants to manage pages and content through a familiar dashboard. Next.js is better suited to highly customized experiences, advanced performance requirements, and web applications. I recommend the solution that fits your content, budget, and maintenance needs.",
        },
        {
          question: "What types of opportunities are you open to in France?",
          answer:
            "I am open to student roles, fixed-term contracts and permanent positions in France, focused on technical SEO, web development or a role combining both. My portfolio is designed to help recruiters and technical teams evaluate how I analyze, build and verify solutions.",
        },
      ]
    : [
          {
            question:
              "Pouvez-vous améliorer un site existant sans le reconstruire ?",
            answer:
              "Oui. Je commence par analyser l’exploration, l’indexation, la structure, le contenu, les performances et les parcours de conversion. Si la base est saine, je privilégie des corrections ciblées. Je recommande une refonte uniquement lorsque la plateforme actuelle empêche une progression fiable.",
          },
          {
            question:
              "Qu'est-ce que l'Optimisation de Recherche par IA et en quoi est-elle différente du SEO ?",
            answer:
              "L'optimisation pour la recherche IA aide ChatGPT, Google AI Overviews et Perplexity à comprendre et retrouver les informations de votre site. Elle complète le référencement naturel avec un contenu clair, des données structurées, des pages accessibles et des signaux de confiance cohérents, sans pouvoir garantir une citation.",
          },
          {
            question:
              "WordPress ou Next.js : quelle solution pour mon site d'entreprise ?",
            answer:
              "WordPress convient si vous souhaitez gérer facilement vos pages et vos contenus depuis une interface connue. Next.js est adapté aux expériences très personnalisées, aux exigences de performance avancées et aux applications web. Je recommande la solution selon vos contenus, votre budget et vos besoins de maintenance.",
          },
          {
            question: "Quelles opportunités recherchez-vous en France ?",
            answer:
              "Je suis disponible pour un poste étudiant, un CDD ou un CDI en France, centré sur le SEO technique, le développement web ou un rôle réunissant les deux. Mon portfolio permet aux recruteurs et aux équipes techniques d’évaluer ma façon d’analyser, de construire et de vérifier une solution.",
          },
        ];

  return (
    <main className="bg-background text-foreground transition-colors duration-300 min-h-screen">
      <FAQPageSchema faqs={faqs} />
      <ProfessionalServiceSchema
        baseUrl={baseUrl}
        locale={locale}
        description={description}
      />
      <PersonSchema
        baseUrl={baseUrl}
        locale={locale}
        jobTitle={jobTitle}
        description={description}
        image={`${baseUrl}/images/mohammed-profile.png`}
        social={{
          linkedin: infos.social.linkedin,
          github: infos.social.github,
          facebook: infos.social.facebook,
          instagram: infos.social.instagram.split("?")[0],
        }}
      />
      <section
        className="relative overflow-hidden hero-section-light border-b border-border"
        aria-labelledby="hero-heading"
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
          className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-20 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 lg:items-stretch">
            <div className="flex flex-col justify-center gap-5 sm:gap-6">
              <div
                className="inline-flex items-center gap-2 bg-primary/10 text-primary
  border border-primary/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium w-fit"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"
                  aria-hidden="true"
                />
                {t.hero.availability ?? "Available for new projects"}
              </div>
              <h1
                id="hero-heading"
                className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight leading-[1.2]"
              >
                {t.hero.title_line1}{" "}
                <span
                  className="text-transparent bg-clip-text bg-gradient-to-r
                   from-foreground to-muted-foreground
                   dark:from-foreground dark:to-muted"
                >
                  {t.hero.title_highlight}
                </span>
              </h1>

              {/* description */}
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-xl">
                {t.hero.description}
              </p>

              {/* GEO line */}
              <p className="text-sm sm:text-base lg:text-md text-muted-foreground">
                {t.hero.description_GEO}
              </p>

              {/* CTA buttons */}
              <div
                className="flex flex-col xs:flex-row sm:flex-row gap-3 w-full sm:w-auto"
              >
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center justify-center gap-2
               px-5 sm:px-7 py-2.5 sm:py-3.5 bg-primary text-primary-foreground
               font-semibold rounded-xl text-sm sm:text-base
               hover:opacity-90 active:scale-95 transition-all
               shadow-lg shadow-primary/25"
                >
                  {t.hero.cta_primary}
                </Link>

                <Link
                  href={`/${locale}/services`}
                  className="inline-flex items-center justify-center gap-2
               px-5 sm:px-7 py-2.5 sm:py-3.5 bg-card border border-border
               text-foreground font-semibold rounded-xl text-sm sm:text-base
               hover:border-primary/30 hover:bg-muted/50 active:scale-95
               transition-all"
                >
                  {t.hero.cta_secondary}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground">
                {t.hero.supporting_promise}
              </p>
            </div>

            <div className="flex h-full justify-center lg:order-2 lg:justify-end">
              <div className="relative w-full max-w-[320px] sm:max-w-[380px] lg:h-full lg:max-w-[440px] xl:max-w-[480px]">
                <div
                  className="absolute -inset-4 rounded-3xl border border-primary/10"
                  aria-hidden="true"
                />
                <div
                  className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none"
                  aria-hidden="true"
                />

                <figure className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
                  <div className="relative aspect-[4/5] overflow-hidden lg:aspect-auto lg:min-h-[340px] lg:flex-1">
                    <Image
                      src="/images/mohammed-profile.png"
                      alt={
                        t.hero.profile_name +
                        (locale === "fr"
                          ? " — photo de profil"
                          : " — profile picture")
                      }
                      width={420}
                      height={525}
                      className="h-full w-full object-cover object-top"
                      preload
                      fetchPriority="high"
                      loading="eager"
                      sizes="(max-width: 640px) 320px, (max-width: 1024px) 380px, (max-width: 1280px) calc(50vw - 4rem), 560px"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
                      aria-hidden="true"
                    />
                  </div>

                  <figcaption className="border-t border-border px-4 py-3">
                    <p className="font-semibold text-foreground text-sm">
                      {t.hero.profile_name}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {t.hero.profile_role}
                    </p>

                    <div className="mt-3">
                      <Link
                        href={`/${locale}/about`}
                        className="w-full inline-flex items-center justify-center gap-2
                         px-3 py-2 bg-primary text-primary-foreground font-semibold
                         rounded-lg text-xs hover:opacity-90 active:scale-95 transition-all"
                      >
                        {t.hero.cta_more_about}
                      </Link>
                    </div>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CustomerProblemsSection
        content={t.customer_problems_section}
        locale={locale}
      />

      <section aria-labelledby="services-heading">
        <ScrollReveal delay={0.04}>
          <ServicesGrid
            sectionData={t.services_section}
            locale={locale}
            headingId="services-heading"
          />
        </ScrollReveal>
      </section>

      <section aria-labelledby="projects-heading">
        <ScrollReveal delay={0.05}>
          <ProjectsShowcase
            heading={t.projects_section.heading}
            headingId="projects-heading"
            description={t.projects_section.description}
            projectsData={dict.pages.portfolio_page.projects}
            locale={locale}
          />
        </ScrollReveal>
      </section>

      <section aria-labelledby="about-heading">
        <ScrollReveal delay={0.05}>
          <AboutMeSection
            translations={t.about_section}
            locale={locale}
            headingId="about-heading"
          />
        </ScrollReveal>
      </section>

      <section aria-labelledby="why-us-heading">
        <ScrollReveal delay={0.05}>
          <WhyWeAreSection
            translations={t.why_we_are_section}
            locale={locale}
            headingId="why-us-heading"
          />
        </ScrollReveal>
      </section>

      <section aria-labelledby="tech-heading">
        <ScrollReveal delay={0.05}>
          <TechStackSection
            data={t.techStack}
            headingId="tech-heading"
            locale={locale}
          />
        </ScrollReveal>
      </section>

     <section aria-labelledby="contact-heading">
        <ScrollReveal delay={0.05}>
          <SubTitle
            sectionLabel={t.contact_section.sectionLabel}
            id="contact-heading"
          />
          <ContactSection translations={t.contact_section} locale={locale} />
        </ScrollReveal>
      </section>

      <section aria-labelledby="faq-heading">
        <ScrollReveal delay={0.05}>
          <SubTitle
            sectionLabel="FAQ"
            id="faq-heading"
          />
          <FAQSection faqs={faqs} locale={locale} />
        </ScrollReveal>
      </section>

      <FloatingWhatsApp locale={locale} />
    </main>
  );
}
