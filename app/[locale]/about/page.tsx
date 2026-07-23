// /app/[locale]/about/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Target,
  Trophy,
  HelpCircle,
  Heart,
  BookOpen,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Locale, i18n } from "@/i18n-config";
import { getDictionary } from "@/app/lib/dictionary";
import { buildPageMetadata, getBaseUrl } from "@/app/lib/buildPageMetadata";
import { FAQPageSchema } from "@/app/components/schemas/FAQPageSchema";

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
      ? "About Mohammed Elghandori | Full-Stack Web Developer & SEO Expert in Morocco"
      : locale === "ar"
        ? "مطور ويب Full-Stack وخبير SEO في المغرب | حول محمد الغنضوري"
        : "À propos | Développeur Full-Stack & Expert SEO au Maroc";

  const description =
    locale === "en"
      ? "Learn about Mohammed Elghandori, a Full-Stack Web Developer in Morocco specializing in Next.js, Technical SEO, AI Search Optimization, and scalable web solutions. Let's build your next project."
      : locale === "ar"
        ? "تعرّف على محمد الغنضوري مطور ويب Full-Stack في المغرب متخصص في Next.js وSEO التقني وتحسين الظهور في محركات البحث بالذكاء الاصطناعي وبناء مواقع ويب عالية الأداء. لنبدأ مشروعك."
        : "Découvrez Mohammed Elghandori, développeur Full-Stack au Maroc spécialisé en Next.js, SEO technique, optimisation de recherche IA et création de solutions web performantes. Parlons de votre projet.";

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

  const title =
    locale === "en"
      ? "About Mohammed Elghandori | Full-Stack Developer & SEO Specialist in Morocco"
      : locale === "ar"
        ? "عن محمد الغنضوري | مطور ويب Full-Stack وخبير SEO في المغرب"
        : "À propos de Mohammed Elghandori | Développeur Full-Stack & Expert SEO au Maroc";

  const description =
    locale === "en"
      ? "Learn about Mohammed Elghandori, a freelance Full-Stack Web Developer in Casablanca, Morocco. Specializing in Next.js, Technical SEO, GEO, AEO, and AI-powered solutions for businesses."
      : locale === "ar"
        ? "تعرّف على محمد الغنضوري مطور ويب Full-Stack مستقل في الدار البيضاء، المغرب. متخصص في Next.js وSEO التقني وGEO وAEO والحلول المدعومة بالذكاء الاصطناعي."
        : "Découvrez Mohammed Elghandori, développeur Full-Stack freelance à Casablanca, Maroc. Spécialisé en Next.js, SEO technique, GEO, AEO et solutions IA pour entreprises.";

  const faqs = [
    {
      question:
        locale === "en"
          ? "Who is Mohammed Elghandori?"
          : locale === "ar"
            ? "من هو محمد الغنضوري؟"
            : "Qui est Mohammed Elghandori ?",

      answer:
        locale === "en"
          ? "Mohammed Elghandori is a freelance Full-Stack Web Developer and SEO Specialist based in Morocco. He specializes in building high-performance websites, e-commerce stores, business dashboards, and custom web applications using Next.js, React, and TypeScript. Every project is optimized with Technical SEO, Core Web Vitals, structured data, and AI Search Optimization to improve visibility on Google, Google AI Overviews, ChatGPT, Perplexity, and other AI-powered search engines. He is an alumnus of 1337 School (42 Network)."
          : locale === "ar"
            ? "محمد الغنضوري هو مطور ويب Full-Stack ومستشار SEO مستقل من المغرب. يتخصص في تطوير مواقع ويب عالية الأداء، ومتاجر إلكترونية، ولوحات تحكم، وتطبيقات ويب مخصصة باستخدام Next.js وReact وTypeScript. يتم تحسين جميع المشاريع باستخدام SEO التقني وCore Web Vitals والبيانات المنظمة وتحسين الظهور في محركات البحث المعتمدة على الذكاء الاصطناعي مثل Google AI Overviews وChatGPT وPerplexity. وهو خريج مدرسة 1337 التابعة لشبكة 42 العالمية."
            : "Mohammed Elghandori est un développeur web Full-Stack freelance et spécialiste SEO basé au Maroc. Il conçoit des sites web performants, des boutiques e-commerce, des tableaux de bord et des applications web sur mesure avec Next.js, React et TypeScript. Chaque projet est optimisé grâce au SEO technique, aux Core Web Vitals, aux données structurées et à l'optimisation pour les moteurs de recherche basés sur l'IA comme Google AI Overviews, ChatGPT et Perplexity. Il est diplômé de l'école 1337 (Réseau 42).",
    },
    {
      question:
        locale === "en"
          ? "What is your process for building high-performance websites and web applications?"
          : locale === "ar"
            ? "ما هي منهجيتك في بناء مواقع الويب وتطبيقات الويب عالية الأداء؟"
            : "Quelle est votre méthodologie pour créer des sites web et des applications performants ?",

      answer:
        locale === "en"
          ? "Every project follows a structured development process to ensure quality and long-term success. I begin by understanding your business goals and user needs, then plan the project architecture, user experience, and technical requirements. Development focuses on clean, scalable code, responsive design, performance optimization, Technical SEO, accessibility, and security. Before launch, every website is tested across devices, optimized for Core Web Vitals, and prepared for search engines and AI-powered search platforms. After deployment, I continue providing support, maintenance, and future improvements when needed."
          : locale === "ar"
            ? "أتبع منهجية تطوير واضحة لضمان الجودة والأداء على المدى الطويل. أبدأ بفهم أهداف المشروع واحتياجات المستخدمين، ثم أخطط لبنية النظام وتجربة المستخدم والمتطلبات التقنية. أثناء التطوير أركز على كتابة كود نظيف وقابل للتوسع، وتصميم متجاوب، وتحسين الأداء، وSEO التقني، وإمكانية الوصول، والأمان. قبل الإطلاق يتم اختبار المشروع بالكامل وتحسينه وفق معايير Core Web Vitals وتجهيزه لمحركات البحث ومنصات البحث المعتمدة على الذكاء الاصطناعي. كما أقدم الدعم والصيانة والتطوير المستقبلي عند الحاجة."
            : "Chaque projet suit une méthodologie claire afin de garantir qualité, performance et évolutivité. Je commence par comprendre vos objectifs métier et les besoins de vos utilisateurs, puis je définis l'architecture, l'expérience utilisateur et les aspects techniques. Le développement est réalisé avec un code propre, une conception responsive, des optimisations de performance, le SEO technique, l'accessibilité et la sécurité. Avant la mise en ligne, chaque projet est testé, optimisé pour les Core Web Vitals et préparé pour les moteurs de recherche ainsi que les plateformes de recherche basées sur l'IA. J'assure également le suivi et les améliorations après le lancement.",
    },
    {
      question:
        locale === "en"
          ? "What technologies and tools do you work with?"
          : locale === "ar"
            ? "ما هي التقنيات والأدوات التي تستخدمها؟"
            : "Quelles technologies et outils utilisez-vous ?",
      answer:
        locale === "en"
          ? "I build high-performance solutions using a modern tech stack: Frontend & Backend (React, Next.js, TypeScript, Node.js, Express.js, NestJS), and Databases & DevOps (MySQL, MongoDB, Docker, Git, and modern cloud deployment workflows). Beyond core development, I specialize in SEO & AI Optimization (implementing Schema.org, structured data, Core Web Vitals tuning, and AI-ready content architecture) and Business Automation (using n8n, Make, and OpenAI APIs). I always select the technology stack tailored to your specific business requirements to deliver secure, scalable, and maintainable digital solutions."
          : locale === "ar"
            ? "أقوم ببناء حلول رقمية عالية الأداء باستخدام مجموعة تقنيات حديثة: الواجهات الأمامية والخلفية (React, Next.js, TypeScript, Node.js, Express.js, NestJS)، وقواعد البيانات وأدوات النشر (MySQL, MongoDB, Docker, Git، بالإضافة إلى أحدث أساليب النشر السحابي). بالإضافة إلى التطوير الأساسي، أتخصص في تحسين محركات البحث والذكاء الاصطناعي (تطبيق Schema.org، البيانات المنظمة، تحسين مقاييس ويب الأساسية Core Web Vitals، وهندسة محتوى جاهزة للذكاء الاصطناعي) وأتمتة الأعمال (باستخدام n8n, Make، وواجهات برمجة تطبيقات OpenAI). أختار دائماً مجموعة التقنيات الأنسب لمتطلبات عملك المحددة لضمان تقديم حلول رقمية آمنة، قابلة للتوسع، وسهلة الصيانة."
            : "Je développe des solutions performantes en m'appuyant sur une stack technologique moderne : Frontend & Backend (React, Next.js, TypeScript, Node.js, Express.js, NestJS), et Bases de données & DevOps (MySQL, MongoDB, Docker, Git, ainsi que des workflows de déploiement cloud modernes). Au-delà du développement pur, je me spécialise dans l'optimisation SEO & IA (mise en place de Schema.org, données structurées, optimisation des Core Web Vitals et architecture de contenu prête pour l'IA) et l'automatisation des processus (via n8n, Make et les API OpenAI). Je choisis toujours la pile technologique la plus adaptée à vos besoins métier spécifiques afin de livrer des solutions numériques sécurisées, évolutives et maintenables.",
    },
    {
      question:
        locale === "en"
          ? "Why choose a web developer in Morocco?"
          : locale === "ar"
            ? "لماذا تختار مطور ويب في المغرب؟"
            : "Pourquoi choisir un développeur web au Maroc ?",
      answer:
        locale === "en"
          ? "Working with a web developer in Morocco gives businesses access to modern development expertise at competitive rates while benefiting from convenient collaboration across European and African time zones. Mohammed Elghandori builds fast, secure, scalable websites, business dashboards, e-commerce platforms, and custom web applications using modern technologies and industry best practices. Every project is designed to improve performance, user experience, search visibility, and long-term business growth."
          : locale === "ar"
            ? "يمنحك العمل مع مطور ويب في المغرب خبرة حديثة في تطوير الويب بتكلفة تنافسية، مع سهولة التعاون بفضل توافق المناطق الزمنية مع أوروبا وأفريقيا. يقوم محمد الغندوري بتطوير مواقع ويب، ومتاجر إلكترونية، ولوحات تحكم، وتطبيقات ويب مخصصة تكون سريعة وآمنة وقابلة للتوسع باستخدام أحدث التقنيات وأفضل الممارسات. يركز كل مشروع على تحسين الأداء، وتجربة المستخدم، والظهور في نتائج البحث، وتحقيق نمو مستدام للأعمال."
            : "Collaborer avec un développeur web au Maroc permet de bénéficier d'une expertise moderne à un coût compétitif tout en profitant d'un fuseau horaire adapté à l'Europe et à l'Afrique. Mohammed Elghandori conçoit des sites web, des boutiques e-commerce, des tableaux de bord et des applications web sécurisés, rapides et évolutifs en utilisant des technologies modernes et les meilleures pratiques du secteur. Chaque projet est pensé pour améliorer les performances, l'expérience utilisateur, la visibilité en ligne et la croissance de votre entreprise.",
    },
  ];
  const aboutSchema = {
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
      itemScope
      itemType="https://schema.org/AboutPage"
    >
      <FAQPageSchema faqs={faqs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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

      <section
        className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16"
        aria-labelledby="who-i-am-heading"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-10 lg:gap-16 items-center">
          <div className="space-y-5">
            <span
              id="who-i-am-heading"
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20"
            >
              {t.whoIAm?.title}
            </span>

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
                content="Full-Stack Web Developer & SEO Specialist"
              />
              <div className="absolute -inset-3 rounded-3xl border border-primary/10" />
              <figure className="relative rounded-2xl overflow-hidden border border-border shadow-xl aspect-[3/4]">
                <Image
                  src="/images/profile.png"
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

      {t.experience && (
        <section
          className="max-w-6xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20"
          aria-labelledby="experience-heading"
        >
          <div className="relative rounded-2xl border border-primary/20 bg-primary/5 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
            <div className="relative text-center py-10 sm:py-14 px-6 sm:px-12">
              <h2
                id="experience-heading"
                className="text-2xl sm:text-3xl font-bold mb-4"
              >
                {t.experience.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg max-w-3xl mx-auto">
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
                        <span className="text-sm text-muted-foreground">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" role="list">
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
                  <article
                    key={i}
                    className="group flex items-start gap-4 p-5 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                    role="listitem"
                  >
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
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
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
                ),
              )}
            </div>
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
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20">
                <HelpCircle className="w-4 h-4" aria-hidden="true" />
                {t.howCanIHelp.subtitle}
              </span>
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
                  <span className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section
        className="border-t border-border bg-primary/5"
        aria-labelledby="faq-heading"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <header className="text-center mb-10 sm:mb-14">
            <h2
              id="faq-heading"
              className="text-2xl sm:text-3xl font-bold mb-3"
            >
              {locale === "en"
                ? "Frequently Asked Questions"
                : locale === "ar"
                  ? "الأسئلة الشائعة"
                  : "Questions Fréquemment Posées"}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {locale === "en"
                ? "Everything you need to know about working with me."
                : locale === "ar"
                  ? "كل ما تحتاج لمعرفته حول العمل معي."
                  : "Tout ce que vous devez savoir sur la collaboration avec moi."}
            </p>
          </header>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group rounded-xl border border-border bg-card overflow-hidden"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-primary/5 transition-colors">
                  <h3
                    className="font-semibold text-foreground pr-4"
                    itemProp="name"
                  >
                    {faq.question}
                  </h3>
                  <span className="shrink-0 w-5 h-5 rounded-full border border-primary/30 flex items-center justify-center text-primary group-open:rotate-180 transition-transform">
                    <ChevronRight
                      size={12}
                      className={isRtl ? "rotate-180" : ""}
                    />
                  </span>
                </summary>
                <div
                  className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed"
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <div itemProp="text">{faq.answer}</div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section
        className="border-t border-border bg-muted/10"
        aria-labelledby="cta-heading"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
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
