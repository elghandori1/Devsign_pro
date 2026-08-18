// app/[locale]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { getDictionary } from "@/app/lib/dictionary";
import { Locale, i18n } from "@/i18n-config";
import { buildPageMetadata, getBaseUrl } from "@/app/lib/buildPageMetadata";
import Statistics from "../components/Statistics";
import SubTitle from "../components/SubTitles";
import ServicesGrid from "../components/ServicesGrid";
import AboutMeSection from "../components/AboutMeSection";
import WhyWeAreSection from "../components/WhyWeAreSection";
import ProjectsShowcase from "../components/ProjectsShowcase";
import ContactSection from "../components/ContactSection";
import ScrollReveal from "../components/ScrollReveal";
import ArticlesSection from "../components/ArticlesSection";
import TechStackSection from "../components/TechStackSection";
import CVDownloadPopup from "../components/CVDownloadPopup";
import FAQSection from "../components/FAQSection";
import { FAQPageSchema, PersonSchema } from "@/app/components/schemas";
import infos from "@/app/dictionaries/global.json";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }, { locale: "ar" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = i18n.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : i18n.defaultLocale;

  const isEnglish = locale === "en";
  const isArabic = locale === "ar";

  const title = isEnglish
    ? "Web Developer & SEO Expert in Morocco | Freelancer"
    : isArabic
      ? "مطور ويب وخبير SEO في المغرب | مستقل"
      : "Développeur Web & Expert SEO au Maroc | Freelance";

  const description = isEnglish
    ? "Freelance Web Developer & SEO Expert in Morocco. I build high-performance websites with Technical SEO & AI Search Optimization."
    : isArabic
      ? "مطور ويب مستقل وخبير SEO في المغرب. أصمم مواقع سريعة وعالية الأداء مع تحسين تقني لمحركات البحث والذكاء الاصطناعي لتعزيز ظهور أعمالك."
      : "Développeur Web Freelance & Expert SEO au Maroc. Je crée des sites performants, optimisés SEO technique et recherche IA. Boostez votre visibilité.";

  const keywords = isEnglish
    ? [
        "next.js developer morocco",
        "full stack developer morocco",
        "web developer morocco",
        "seo specialist morocco",
        "ai engine optimization",
        "ai search optimization",
        "freelance web developer morocco",
        "website optimization morocco",
        "business dashboard automation",
        "social media design morocco",
        "next.js seo",
        "high performance websites",
      ]
    : isArabic
      ? [
          "مطور ناكست المغرب",
          "مطور ويب متكامل المغرب",
          "مطور ويب المغرب",
          "خبير سيو المغرب",
          "تحسين محركات الذكاء الاصطناعي",
          "تحسين البحث بالذكاء الاصطناعي",
          "مطور ويب مستقل",
          "أتمتة الأعمال",
          "تصميم سوشيال ميديا",
          "تحسين المواقع",
        ]
      : [
          "développeur next.js maroc",
          "développeur full-stack maroc",
          "développeur web maroc",
          "expert seo maroc",
          "optimisation ia maroc",
          "optimisation moteur ia",
          "développeur web freelance",
          "automatisation tableau bord",
          "design social media maroc",
          "optimisation site web maroc",
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
  const articlesPage = dict.pages.articles_page;
  const baseUrl = getBaseUrl();
  const jobTitle =
    locale === "en"
      ? "Web Developer & SEO Specialist"
      : locale === "ar"
        ? "مطور ويب وخبير تحسين محركات البحث"
        : "Développeur Web & Spécialiste SEO";

  const isEnglish = locale === "en";
  const isArabic = locale === "ar";
  const description = isEnglish
    ? "Freelance Web Developer & SEO Expert in Morocco. I build high-performance websites with Technical SEO & AI Search Optimization."
    : isArabic
      ? "مطور ويب مستقل وخبير SEO في المغرب. أصمم مواقع سريعة وعالية الأداء مع تحسين تقني لمحركات البحث والذكاء الاصطناعي لتعزيز ظهور أعمالك."
      : "Développeur Web Freelance & Expert SEO au Maroc. Je crée des sites performants, optimisés SEO technique et recherche IA. Boostez votre visibilité.";
  const faqs = isEnglish
    ? [
        {
          question:
            "What is AI Search Optimization and how is it different from SEO?",
          answer:
            "AI Search Optimization ensures your website appears in AI-powered search engines like ChatGPT, Google AI Overviews, and Perplexity. While traditional SEO focuses on ranking in Google Search, AIO structures your content so AI engines can understand, cite, and recommend your business as a trusted source.",
        },
        {
          question: "Why should I choose Next.js for my business website?",
          answer:
            "Next.js delivers superior performance, SEO-friendliness, and scalability out of the box. With server-side rendering, static generation, and built-in Core Web Vitals optimization, Next.js sites load faster, rank higher, and convert better than traditional WordPress or plain React sites.",
        },
        {
          question: "How much does it cost to hire a web developer in Morocco?",
          answer:
            "Pricing depends on project scope and complexity. A professional business website typically starts from 8,000 MAD, while full-stack applications and AI-integrated dashboards are quoted based on specific requirements. Contact me for a free consultation and detailed estimate.",
        },
        {
          question: "Do you work with international clients or only Morocco?",
          answer:
            "While I'm based in Morocco, I work with startups and businesses globally. My websites are built with international SEO, multilingual support, and global performance standards — ready to serve customers anywhere in the world.",
        },
      ]
    : isArabic
      ? [
          {
            question: "ما هو تحسين البحث بالذكاء الاصطناعي وكيف يختلف عن SEO؟",
            answer:
              "تحسين البحث بالذكاء الاصطناعي يضمن ظهور موقعك في محركات البحث المدعومة بالذكاء الاصطناعي مثل ChatGPT وGoogle AI Overviews وPerplexity. بينما يركز SEO التقليدي على الترتيب في بحث Google، يقوم AIO بتنظيم محتواك بحيث يمكن لمحركات الذكاء الاصطناعي فهمه والاستشهاد به والتوصية بعملك كمصدر موثوق.",
          },
          {
            question: "لماذا يجب أن أختار Next.js لموقع أعمالي؟",
            answer:
              "Next.js يوفر أداءً فائقًا، وسهولة تحسين محركات البحث، وقابلية التوسع من البداية. مع العرض من جانب الخادم، والتوليد الثابت، وتحسين Core Web Vitals المدمج، فإن مواقع Next.js يتم تحميلها بشكل أسرع، وتحصل على ترتيب أعلى، وتحقق معدلات تحويل أفضل من مواقع WordPress التقليدية أو React العادية.",
          },
          {
            question: "كم تكلفة توظيف مطور ويب في المغرب؟",
            answer:
              "تعتمد الأسعار على نطاق المشروع وتعقيده. عادةً ما يبدأ سعر موقع الأعمال الاحترافي من 8000 درهم مغربي، بينما يتم تقديم عروض أسعار للتطبيقات الكاملة ولوحات التحكم المدمجة بالذكاء الاصطناعي بناءً على المتطلبات المحددة. اتصل بي للحصول على استشارة مجانية وتقدير مفصل.",
          },
          {
            question: "هل تعمل مع عملاء دوليين أم فقط في المغرب؟",
            answer:
              "على الرغم من أنني مقيم في المغرب، إلا أنني أعمل مع الشركات الناشئة والأعمال التجارية على مستوى العالم. يتم بناء مواقعي مع تحسين محركات البحث الدولية، ودعم متعدد اللغات، ومعايير الأداء العالمية — جاهزة لخدمة العملاء في أي مكان في العالم.",
          },
        ]
      : [
          {
            question:
              "Qu'est-ce que l'Optimisation de Recherche par IA et en quoi est-elle différente du SEO ?",
            answer:
              "L'Optimisation de Recherche par IA garantit que votre site web apparaît dans les moteurs de recherche alimentés par l'IA tels que ChatGPT, Google AI Overviews et Perplexity. Alors que le SEO traditionnel se concentre sur le classement dans la recherche Google, l'AIO structure votre contenu pour que les moteurs d'IA puissent comprendre, citer et recommander votre entreprise comme source fiable.",
          },
          {
            question:
              "Pourquoi devrais-je choisir Next.js pour mon site web d'entreprise ?",
            answer:
              "Next.js offre des performances supérieures, une optimisation SEO et une évolutivité dès le départ. Avec le rendu côté serveur, la génération statique et l'optimisation intégrée des Core Web Vitals, les sites Next.js se chargent plus rapidement, se classent mieux et convertissent mieux que les sites WordPress traditionnels ou React simples.",
          },
          {
            question:
              "Combien coûte l'embauche d'un développeur web au Maroc ?",
            answer:
              "Les prix dépendent de la portée et de la complexité du projet. Un site web professionnel commence généralement à partir de 8000 MAD, tandis que les applications full-stack et les tableaux de bord intégrés à l'IA sont devisés en fonction des exigences spécifiques. Contactez-moi pour une consultation gratuite et un devis détaillé.",
          },
          {
            question:
              "Travaillez-vous avec des clients internationaux ou seulement au Maroc ?",
            answer:
              "Bien que je sois basé au Maroc, je travaille avec des startups et des entreprises à l'échelle mondiale. Mes sites web sont construits avec un SEO international, un support multilingue et des normes de performance mondiales — prêts à servir les clients partout dans le monde.",
          },
        ];

  return (
    <main className="bg-background text-foreground transition-colors duration-300 min-h-screen">
      <FAQPageSchema faqs={faqs} />
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
            <div className="flex flex-col gap-5 sm:gap-6 self-start">
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
                {isArabic ? (
                  <>
                    <span
                      className="text-transparent bg-clip-text bg-gradient-to-r
                       from-foreground to-muted-foreground
                       dark:from-foreground dark:to-muted"
                    >
                      {t.hero.title_line1}{" "}
                    </span>
                    {t.hero.title_highlight}
                  </>
                ) : (
                  <>
                    {t.hero.title_line1}{" "}
                    <span
                      className="text-transparent bg-clip-text bg-gradient-to-r
                       from-foreground to-muted-foreground
                       dark:from-foreground dark:to-muted"
                    >
                      {t.hero.title_highlight}
                    </span>
                  </>
                )}
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
                className={`flex flex-col xs:flex-row sm:flex-row gap-3 w-full sm:w-auto`}
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
                  href={`/${locale}/portfolio`}
                  className="inline-flex items-center justify-center gap-2
               px-5 sm:px-7 py-2.5 sm:py-3.5 bg-card border border-border
               text-foreground font-semibold rounded-xl text-sm sm:text-base
               hover:border-primary/30 hover:bg-muted/50 active:scale-95
               transition-all"
                >
                  {t.hero.cta_secondary}
                  {isArabic ? (
                    <ArrowLeft size={16} aria-hidden="true" />
                  ) : (
                    <ArrowRight size={16} aria-hidden="true" />
                  )}
                </Link>
              </div>
            </div>

            {/* ── PROFILE SIDE - ENLARGED IMAGE ── */}
            <div
              className={`flex justify-center ${isArabic ? "lg:order-1" : "lg:order-2"}`}
            >
              <div className="relative w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[360px] xl:max-w-[400px]">
                <div
                  className="absolute -inset-4 rounded-3xl border border-primary/10"
                  aria-hidden="true"
                />
                <div
                  className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none"
                  aria-hidden="true"
                />

                <div className="relative rounded-2xl border border-border bg-card overflow-hidden shadow-xl">
                  {/* image — better portrait proportions */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src="/images/mohammed-profile.png"
                      alt={
                        t.hero.profile_name +
                        (locale === "ar"
                          ? " — صورة الملف الشخصي"
                          : locale === "fr"
                            ? " — photo de profil"
                            : " — profile picture")
                      }
                      width={420}
                      height={525}
                      className="w-full h-full object-cover object-top
                       transition-transform duration-700 hover:scale-105"
                      priority
                      sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 420px"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="px-4 py-3 border-t border-border">
                    <p className="font-semibold text-foreground text-sm truncate">
                      {t.hero.profile_name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate mt-2">
                      {t.hero.profile_role}
                    </p>

                    <div className="mt-3 space-y-2">
                      <Link
                        href={`/${locale}/about`}
                        className="w-full inline-flex items-center justify-center gap-2
                         px-3 py-2 bg-primary text-primary-foreground font-semibold
                         rounded-lg text-xs hover:opacity-90 active:scale-95 transition-all"
                      >
                        {t.hero.cta_more_about}
                      </Link>
                      <CVDownloadPopup
                        buttonText={t.hero.cta_download_cv || "Download CV"}
                        fileName="mohammed-elghandori-full-stack-cv.pdf"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section aria-labelledby="statistics-heading">
        <ScrollReveal>
          <Statistics
            translations={t.stats}
            locale={locale}
            id="statistics-heading"
          />
        </ScrollReveal>
      </section>

      <section aria-labelledby="services-heading">
        <ScrollReveal delay={0.04}>
          <SubTitle
            sectionLabel={t.services_section.sectionLabel}
            id="services-heading"
          />
          <ServicesGrid
            sectionData={t.services_section}
            servicesData={dict.pages.services_page.services}
            locale={locale}
          />
        </ScrollReveal>
      </section>

      <section aria-labelledby="projects-heading">
        <ScrollReveal delay={0.05}>
          <SubTitle
            sectionLabel={t.projects_section.heading}
            id="projects-heading"
          />
          <ProjectsShowcase
            description={t.projects_section.description}
            projectsData={dict.pages.portfolio_page.projects}
            locale={locale}
          />
        </ScrollReveal>
      </section>

      <section aria-labelledby="why-us-heading">
        <ScrollReveal delay={0.05}>
          <SubTitle
            sectionLabel={t.why_we_are_section.sectionLabel}
            id="why-us-heading"
          />
          <WhyWeAreSection
            translations={t.why_we_are_section}
            locale={locale}
          />
        </ScrollReveal>
      </section>

      <section aria-labelledby="about-heading">
        <ScrollReveal delay={0.05}>
          <SubTitle
            sectionLabel={t.about_section.sectionLabel}
            id="about-heading"
          />
          <AboutMeSection translations={t.about_section} locale={locale} />
        </ScrollReveal>
      </section>

      <section aria-labelledby="tech-heading">
        <ScrollReveal delay={0.05}>
          <SubTitle sectionLabel={t.techStack.title} id="tech-heading" />
          <TechStackSection data={t.techStack} headingId="tech-heading" />
        </ScrollReveal>
      </section>

      <section aria-labelledby="articles-heading">
        <ScrollReveal delay={0.05}>
          <SubTitle
            sectionLabel={articlesPage.sectionLabel}
            id="articles-heading"
          />
          <ArticlesSection
            description={articlesPage.description}
            articles={articlesPage.articles.slice(0, 3)}
            locale={locale}
          />
        </ScrollReveal>
      </section>

      <section aria-labelledby="faq-heading">
        <ScrollReveal delay={0.05}>
          <SubTitle
            sectionLabel={
              isArabic ? "الأسئلة الشائعة" : locale === "fr" ? "FAQ" : "FAQ"
            }
            id="faq-heading"
          />
          <FAQSection faqs={faqs} locale={locale} />
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
    </main>
  );
}
