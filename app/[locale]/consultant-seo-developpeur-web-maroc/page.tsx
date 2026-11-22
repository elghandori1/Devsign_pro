import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  MapPinned,
  SearchCheck,
  ShoppingBag,
  Sparkles,
  Wrench,
} from "lucide-react";
import { FAQPageSchema } from "@/app/components/schemas";
import FAQSection from "@/app/components/FAQSection";
import { getBaseUrl } from "@/app/lib/buildPageMetadata";
import { serializeJsonLd } from "@/app/lib/serializeJsonLd";
import { MOROCCO_PAGE_PATHS } from "@/app/lib/moroccoPage";

type Props = { params: Promise<{ locale: string }> };

const HERO_IMAGE = "/images/about/mohammed-elghandori-presentation-projet-web.jpg";
const PAGE_UPDATED = "2026-11-21T09:00:00+01:00"; // ISO 8601 date-time with timezone (required by Google)

const frenchFaqs = [
  {
    question: "Êtes-vous basé au Maroc ?",
    answer:
      "Je suis originaire du Maroc et je travaille aujourd’hui en France. J’accompagne les entreprises marocaines à distance, avec un contact direct, un périmètre défini et les standards de qualité attendus sur le marché européen.",
  },
  {
    question: "Quels services proposez-vous aux entreprises au Maroc ?",
    answer:
      "Je réalise des audits et corrections SEO techniques, l’optimisation de contenu pour Google et les moteurs IA, la création ou la refonte de sites web et des boutiques en ligne Shopify, WooCommerce ou Next.js.",
  },
  {
    question: "Pouvez-vous améliorer un site qui existe déjà ?",
    answer:
      "Oui. Je commence par identifier ce qui limite l’exploration, l’indexation, les performances, le contenu ou la conversion. Selon le diagnostic, je peux corriger l’existant ou recommander une refonte ciblée.",
  },
  {
    question: "Travaillez-vous avec des entreprises de Casablanca, Rabat, Marrakech ou d’autres villes ?",
    answer:
      "Oui. La collaboration se fait à distance, quelle que soit la ville. Les échanges, validations et livraisons sont organisés en ligne avec des étapes claires.",
  },
  {
    question: "Comment obtenir un devis pour un projet au Maroc ?",
    answer:
      "Envoyez le lien de votre site, votre objectif principal et les contraintes déjà connues. Je réponds sous 24 heures avec les premières questions et la prochaine étape adaptée.",
  },
];

const englishFaqs = [
  {
    question: "Can I hire you as a freelance web developer from Morocco?",
    answer:
      "Yes. I’m a Moroccan web developer and SEO consultant now based in France, and I work remotely on projects for businesses in Morocco and abroad. You deal directly with me, with a defined scope, clear stages and a reply within 24 hours.",
  },
  {
    question: "Do you work with international companies and tourism businesses in Morocco?",
    answer:
      "Yes. Hotels, riads, tour operators, exporters and international companies in Morocco often need a website in several languages. I build sites and online stores that work in English and French, with the technical SEO each market needs.",
  },
  {
    question: "What services do you provide for businesses in Morocco?",
    answer:
      "I provide technical SEO audits and fixes, content optimization for Google and AI search, website creation and redesign, and Shopify, WooCommerce or Next.js online stores.",
  },
  {
    question: "Can you improve an existing website?",
    answer:
      "Yes. I first identify what is limiting crawling, indexing, performance, content or conversions. I can then improve the existing website or recommend a focused rebuild when necessary.",
  },
  {
    question: "How can I request a quote for a project in Morocco?",
    answer:
      "Send me your website URL, primary objective and the main problem you want to solve. I will reply within 24 hours with initial questions and the most appropriate next step.",
  },
];

// French URL: serves the French page only. The English page lives at
// /en/seo-consultant-web-developer-morocco (see that route's page.tsx).
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "fr" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "fr" && locale !== "en") {
    return { robots: { index: false, follow: false } };
  }

  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/${locale}${MOROCCO_PAGE_PATHS[locale]}`;
  const frenchUrl = `${baseUrl}/fr${MOROCCO_PAGE_PATHS.fr}`;
  const englishUrl = `${baseUrl}/en${MOROCCO_PAGE_PATHS.en}`;
  const isFrench = locale === "fr";
  const title = isFrench
    ? "Consultant SEO et Développeur Web Maroc | Devis gratuit"
    : "SEO Consultant & Web Developer from Morocco | Free Quote";
  const description = isFrench
    ? "Originaire du Maroc et basé en France : audit SEO, contenu optimisé, sites web et boutiques en ligne pour les entreprises marocaines. Réponse sous 24 h."
    : "Moroccan SEO consultant and web developer based in France: SEO audits, content, websites and online stores for businesses in Morocco and abroad.";
  const image = `${baseUrl}${HERO_IMAGE}`;

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    keywords: isFrench
      ? [
          "consultant SEO Maroc",
          "consultant SEO et GEO Maroc",
          "développeur web pour entreprise Maroc",
          "développeur web Maroc",
          "expert SEO Maroc",
          "création site web Maroc",
          "audit SEO technique Maroc",
          "référencement naturel Maroc",
          "développement e-commerce Maroc",
        ]
      : [
          "SEO consultant Morocco",
          "SEO expert Morocco",
          "SEO specialist Morocco",
          "web developer Morocco",
          "freelance web developer Morocco",
          "hire web developer Morocco",
          "web developer and SEO expert from Morocco",
          "Moroccan web developer",
          "ecommerce developer Morocco",
        ],
    alternates: {
      canonical: url,
      languages: { "fr-MA": frenchUrl, "en-MA": englishUrl, "x-default": englishUrl },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Devsignpro",
      locale: isFrench ? "fr_MA" : "en_MA",
      type: "website",
      images: [{ url: image, width: 800, height: 800, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@devsign_pro",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export default async function MoroccoMarketPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== "fr" && locale !== "en") notFound();

  const isFrench = locale === "fr";
  const faqs = isFrench ? frenchFaqs : englishFaqs;
  const baseUrl = getBaseUrl();
  const pageUrl = `${baseUrl}/${locale}${MOROCCO_PAGE_PATHS[locale]}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: isFrench ? "Consultant SEO et Développeur Web Maroc | Devis gratuit" : "SEO Consultant & Web Developer from Morocco | Free Quote",
        description: isFrench ? "Originaire du Maroc et basé en France : audit SEO, contenu optimisé, sites web et boutiques en ligne pour les entreprises marocaines. Réponse sous 24 h." : "Moroccan SEO consultant and web developer based in France: SEO audits, content, websites and online stores for businesses in Morocco and abroad.",
        inLanguage: isFrench ? "fr-MA" : "en-MA",
        dateModified: PAGE_UPDATED,
        primaryImageOfPage: { "@id": `${pageUrl}#primaryimage` },
        isPartOf: { "@id": `${baseUrl}/#website` },
        about: { "@id": `${pageUrl}#service` },
        mainEntity: { "@id": `${pageUrl}#service` },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: isFrench
          ? "Services SEO et développement web pour le Maroc"
          : "SEO and web development services for Morocco",
        serviceType: isFrench
          ? ["Audit SEO technique", "Optimisation de contenu SEO et GEO", "Création de site web", "Création de boutique en ligne"]
          : ["Technical SEO audit", "SEO and GEO content optimization", "Website development", "Online store development"],
        description: isFrench ? "Originaire du Maroc et basé en France : audit SEO, contenu optimisé, sites web et boutiques en ligne pour les entreprises marocaines. Réponse sous 24 h." : "Moroccan-born, France-based SEO consultant and web developer: SEO audits, content, websites and online stores for businesses in Morocco. Reply in 24h.",
        image: { "@id": `${pageUrl}#primaryimage` },
        provider: { "@id": `${baseUrl}/#person` },
        brand: { "@id": `${baseUrl}/#business` },
        areaServed: { "@type": "Country", name: "Morocco" },
        audience: { "@type": "BusinessAudience", audienceType: isFrench ? "TPE, PME, e-commerçants et agences au Maroc" : "Small businesses, ecommerce brands and agencies in Morocco" },
        availableChannel: {
          "@type": "ServiceChannel",
          serviceLocation: { "@type": "VirtualLocation", url: pageUrl },
        },
      },
      {
        "@type": "ImageObject",
        "@id": `${pageUrl}#primaryimage`,
        url: `${baseUrl}${HERO_IMAGE}`,
        contentUrl: `${baseUrl}${HERO_IMAGE}`,
        width: 800,
        height: 800,
        caption: isFrench ? "Présentation d’un projet web devant une équipe technique" : "Presenting a web project to a technical team",
        creator: { "@id": `${baseUrl}/#person` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: isFrench ? "Accueil" : "Home",
            item: `${baseUrl}/${locale}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: isFrench ? "Services web et SEO pour le Maroc" : "Web and SEO services for Morocco",
            item: pageUrl,
          },
        ],
      },
    ],
  };

  const services = isFrench ? [
    {
      icon: SearchCheck,
      title: "Audit et corrections SEO techniques",
      text: "Identifier et corriger les problèmes de crawl, d’indexation, de structure, de performance et de données structurées qui limitent votre visibilité.",
      href: "/fr/services/technical-seo",
      label: "Voir le service SEO technique",
    },
    {
      icon: Code2,
      title: "Création et refonte de sites web",
      text: "Construire un site professionnel rapide, accessible et organisé autour de vos services, de vos clients et de votre référencement naturel.",
      href: "/fr/services/web-development",
      label: "Voir le développement web",
    },
    {
      icon: ShoppingBag,
      title: "Boutiques en ligne",
      text: "Créer ou améliorer une boutique Shopify, WooCommerce ou Next.js avec un parcours mobile clair, un paiement sécurisé et une base SEO solide.",
      href: "/fr/services/ecommerce-development",
      label: "Voir le développement e-commerce",
    },
    {
      icon: Wrench,
      title: "Optimisation de contenu SEO et GEO",
      text: "Aligner vos pages sur ce que vos clients recherchent au Maroc, renforcer le maillage interne et préparer votre contenu à être cité par Google et les moteurs IA.",
      href: "/fr/services/seo-content-optimization",
      label: "Voir l’optimisation de contenu",
    },
  ] : [
    {
      icon: SearchCheck,
      title: "Technical SEO audits and fixes",
      text: "Find and fix crawling, indexing, site structure, performance and structured-data problems that restrict your search visibility.",
      href: "/en/services/technical-seo",
      label: "Explore technical SEO services",
    },
    {
      icon: Code2,
      title: "Website development and redesign",
      text: "Build a fast, accessible business website structured around your services, customers and organic search goals.",
      href: "/en/services/web-development",
      label: "Explore web development",
    },
    {
      icon: ShoppingBag,
      title: "Ecommerce development",
      text: "Create or improve a Shopify, WooCommerce or Next.js store with a clear mobile journey, secure payments and a strong SEO foundation.",
      href: "/en/services/ecommerce-development",
      label: "Explore ecommerce development",
    },
    {
      icon: Wrench,
      title: "SEO and GEO content optimization",
      text: "Align your pages with what your customers search for in Morocco, strengthen internal linking and prepare your content to be cited by Google and AI search.",
      href: "/en/services/seo-content-optimization",
      label: "Explore content optimization",
    },
  ];

  const steps = isFrench ? [
    {
      title: "Comprendre votre marché et votre objectif",
      text: "Nous clarifions votre offre, les clients visés au Maroc, le rôle du site et les résultats attendus avant de parler de technologie.",
    },
    {
      title: "Auditer l’existant ou définir la bonne base",
      text: "J’analyse le site, les données disponibles et les contraintes. Si le projet démarre de zéro, je prépare une structure adaptée à l’intention de recherche.",
    },
    {
      title: "Corriger, construire et vérifier",
      text: "J’interviens directement sur le code ou le CMS, puis je contrôle le mobile, l’accessibilité, les performances, l’indexation et les parcours de conversion.",
    },
  ] : [
    {
      title: "Understand your market and objective",
      text: "We clarify your offer, target customers in Morocco, the website’s role and the expected outcome before discussing technology.",
    },
    {
      title: "Audit the current site or define the right foundation",
      text: "I review the website, available data and constraints. For a new project, I prepare a structure aligned with customer search intent.",
    },
    {
      title: "Build, improve and verify",
      text: "I work directly on the code or CMS, then verify mobile usability, accessibility, performance, indexing and conversion journeys.",
    },
  ];

  return (
    <main className="bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
      <FAQPageSchema faqs={faqs} />

      <section className="relative overflow-hidden border-b border-border hero-section-light" aria-labelledby="morocco-heading">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_22%,color-mix(in_srgb,var(--primary)_15%,transparent),transparent_34%),radial-gradient(circle_at_88%_78%,color-mix(in_srgb,var(--primary)_9%,transparent),transparent_30%)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:py-24">
          <nav aria-label={isFrench ? "Fil d’Ariane" : "Breadcrumb"} className="mb-8 text-sm text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href={`/${locale}`} className="inline-flex min-h-11 items-center transition hover:text-primary">{isFrench ? "Accueil" : "Home"}</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-foreground">{isFrench ? "Services pour le Maroc" : "Services for Morocco"}</li>
            </ol>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[minmax(300px,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <header className="lg:order-2">
              <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-primary">
                <MapPinned className="size-4" aria-hidden="true" />
                {isFrench ? "Originaire du Maroc · Expérience en France" : "Moroccan-born · Based in France · Remote worldwide"}
              </p>
              <h1 id="morocco-heading" className="mt-5 max-w-4xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                {isFrench ? "Consultant SEO et développeur web marocain pour les entreprises au Maroc" : "SEO Consultant and Web Developer from Morocco"}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {isFrench
                  ? "Consultant SEO et GEO et développeur web originaire du Maroc, je travaille aujourd’hui en France selon les standards du marché européen. J’aide les TPE, PME, e-commerçants et agences au Maroc à être visibles sur Google et dans les réponses IA : audit SEO technique, optimisation du contenu, création de sites web et de boutiques en ligne."
                  : "I’m a Moroccan SEO and GEO consultant and web developer, now based in France. I help businesses in Morocco, and companies abroad looking for a developer from Morocco, get found on Google and in AI answers: technical SEO audits, content optimization, websites and online stores."}
              </p>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {isFrench
                  ? "Vous échangez directement avec la personne qui analyse, recommande et réalise les corrections, à distance et avec des étapes claires."
                  : "You work directly with the person who audits, recommends and implements the improvements, remotely and through clear stages."}{" "}
                <Link href={`/${locale}/about`} className="inline-flex min-h-11 items-center font-semibold text-foreground underline decoration-primary/50 underline-offset-4 hover:text-primary">
                  {isFrench ? "Découvrir mon parcours en France" : "Read about my background in France"}
                </Link>
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={`/${locale}/contact`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:brightness-110">
                  {isFrench ? "Demander un devis gratuit" : "Get a free quote"}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link href={`/${locale}/portfolio`} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border bg-card px-6 py-3 font-semibold transition hover:border-primary/40 hover:text-primary">
                  {isFrench ? "Voir les réalisations" : "View recent work"}
                </Link>
              </div>
            </header>

            <figure className="mx-auto w-full max-w-md lg:order-1">
              <div className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-black/10">
                <Image
                  src={HERO_IMAGE}
                  alt={isFrench
                    ? "Mohammed Elghandori, consultant SEO et développeur web, présentant un projet web devant une équipe technique"
                    : "Mohammed Elghandori, SEO consultant and web developer, presenting a web project to a technical team"}
                  fill
                  preload
                  fetchPriority="high"
                  sizes="(max-width: 1024px) 92vw, 36vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-center text-sm text-muted-foreground">
                {isFrench ? "Présentation d’un projet web devant une équipe technique" : "Presenting a web project to a technical team"}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card" aria-labelledby="morocco-france-heading">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
          <header className="max-w-3xl">
            <Sparkles className="size-6 text-primary" aria-hidden="true" />
            <h2 id="morocco-france-heading" className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              {isFrench ? "Une vision des deux marchés : le Maroc et la France" : "Two markets, one perspective: Morocco and France"}
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              {isFrench
                ? "Originaire du Maroc, je comprends les attentes de vos clients. Installé en France, j’applique les méthodes et le niveau d’exigence du marché européen à votre site."
                : "Being from Morocco, I understand your customers’ expectations. Being based in France, I bring European methods and quality standards to your website."}
            </p>
          </header>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {(isFrench
              ? [
                  ["Des standards du marché européen", "Vitesse, accessibilité, données structurées et respect du RGPD : votre site suit le niveau d’exigence attendu en France, où la concurrence sur Google est forte."],
                  ["Une connaissance du marché marocain", "Vos clients, leurs habitudes d’achat et leurs recherches au Maroc sont pris en compte dès la structure du site et le choix des mots-clés."],
                  ["Un site prêt pour l’international", "Si vous visez aussi des clients en France ou en Europe, votre site est pensé dès le départ pour plusieurs langues et plusieurs marchés."],
                ]
              : [
                  ["European market standards", "Speed, accessibility, structured data and GDPR compliance: your website meets the level expected in France, where Google competition is strong."],
                  ["Knowledge of the Moroccan market", "Your customers, their buying habits and their searches in Morocco shape the site structure and keyword choices from the start."],
                  ["A website ready for international growth", "If you also target customers in France or Europe, your website is planned from day one for several languages and markets."],
                ]
            ).map(([title, text]) => (
              <li key={title} className="rounded-2xl border border-border bg-background p-6">
                <CheckCircle2 className="size-5 text-primary" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-border" aria-labelledby="morocco-services-heading">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
          <header className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary">{isFrench ? "Services pour votre activité" : "Services for your business"}</p>
            <h2 id="morocco-services-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              {isFrench ? "Du problème de visibilité à la solution technique" : "From visibility problems to technical solutions"}
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              {isFrench
                ? "Choisissez le service qui correspond à votre problème. Chaque lien mène vers une page détaillée : livrables, cas d’usage et méthode de travail."
                : "Choose the service that matches your problem. Each link opens a detailed page explaining the deliverables, relevant use cases and working method."}
            </p>
          </header>
          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {services.map((service) => (
              <li key={service.title}>
                <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition hover:border-primary/35 sm:p-7">
                  <service.icon className="size-6 text-primary" aria-hidden="true" />
                  <h3 className="mt-5 text-xl font-bold">{service.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground sm:text-base">{service.text}</p>
                  <Link href={service.href} className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-primary hover:underline">
                    {service.label}<ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-primary/5" aria-labelledby="morocco-method-heading">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <header>
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary">{isFrench ? "Méthode de collaboration" : "How we work"}</p>
              <h2 id="morocco-method-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                {isFrench ? "Une mission à distance, structurée et vérifiable" : "A structured and transparent remote project"}
              </h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                {isFrench
                  ? "Le travail à distance ne doit pas rendre le projet flou. Chaque étape répond à une question précise et produit un résultat que vous pouvez relire ou tester."
                  : "Remote work should not make a project unclear. Each stage answers a specific question and produces something you can review or test."}
              </p>
            </header>
            <ol className="divide-y divide-border border-y border-border">
              {steps.map((step, index) => (
                <li key={step.title} className="grid gap-3 py-6 sm:grid-cols-[3rem_1fr]">
                  <span className="text-sm font-bold text-primary" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-lg font-bold">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-y border-border" aria-labelledby="morocco-proof-heading">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1fr_0.82fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary">{isFrench ? "Compétences et preuves" : "Skills and evidence"}</p>
            <h2 id="morocco-proof-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              {isFrench ? "Des résultats concrets sur Google" : "Proven results on Google"}
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              {isFrench
                ? "Pour un site d’entreprise, la refonte et le SEO technique ont apporté plus de 2 900 nouveaux utilisateurs en deux mois et la première position sur Google pour son mot-clé principal. J’applique la même méthode aux entreprises marocaines : diagnostic, corrections, puis mesure dans Search Console."
                : "For a business website, the rebuild and technical SEO brought more than 2,900 new users in two months and first place on Google for its main keyword. I apply the same method to businesses in Morocco: diagnosis, fixes, then measurement in Search Console."}
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {isFrench
                ? "Formé à 1337 UM6P au sein du réseau 42 au Maroc, puis à 42 Paris, j’ai aussi remporté plusieurs hackathons d’ingénierie au Maroc."
                : "Trained at 1337 UM6P within the 42 Network in Morocco, then at 42 Paris, I have also won several engineering hackathons in Morocco."}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h3 className="text-lg font-bold">{isFrench ? "Évaluer mon travail avant de me contacter" : "Review my work before contacting me"}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {isFrench
                ? "Consultez les réalisations publiées avec autorisation, puis choisissez le service qui correspond à votre besoin."
                : "Explore projects published with client permission, then choose the service that best matches your requirements."}
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Link href={`/${locale}/portfolio`} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:brightness-110">{isFrench ? "Voir le portfolio" : "View my portfolio"}</Link>
              <Link href={`/${locale}/about`} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border px-5 py-3 font-semibold transition hover:border-primary/35 hover:text-primary">{isFrench ? "Découvrir mon parcours" : "Read about my background"}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20" aria-labelledby="morocco-faq-heading">
        <header className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary">{isFrench ? "Questions fréquentes" : "Frequently asked questions"}</p>
          <h2 id="morocco-faq-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            {isFrench ? "Travailler avec Devsignpro depuis le Maroc" : "Working with Devsignpro from Morocco"}
          </h2>
        </header>
        <FAQSection faqs={faqs} locale={locale} />
      </section>

      <section className="px-4 pb-14 sm:px-6 sm:pb-20" aria-labelledby="morocco-cta-heading">
        <div className="mx-auto max-w-6xl rounded-3xl border border-border bg-card px-6 py-10 text-center sm:px-10 sm:py-14">
          <h2 id="morocco-cta-heading" className="text-2xl font-bold tracking-tight sm:text-3xl">{isFrench ? "Votre site doit mieux représenter et soutenir votre activité ?" : "Should your website do more for your business?"}</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            {isFrench
              ? "Envoyez le lien de votre site, votre objectif et le principal problème rencontré. Je vous réponds sous 24 heures avec une première orientation."
              : "Send your website URL, objective and main challenge. I will reply within 24 hours with an initial recommendation and the most useful next step."}
          </p>
          <Link href={`/${locale}/contact`} className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3 font-semibold text-primary-foreground transition hover:brightness-110">
            {isFrench ? "Demander un devis gratuit" : "Get a free quote"}<ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
