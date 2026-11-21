import type { Metadata } from "next";
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

type Props = { params: Promise<{ locale: string }> };

const route = "/consultant-seo-developpeur-web-maroc";

const frenchFaqs = [
  {
    question: "Êtes-vous basé au Maroc ?",
    answer:
      "Je suis basé en France et originaire du Maroc. J’accompagne les entreprises marocaines à distance avec un contact direct, un périmètre défini et des livrables adaptés au projet.",
  },
  {
    question: "Quels services proposez-vous aux entreprises au Maroc ?",
    answer:
      "Je réalise des audits et corrections SEO techniques, des créations ou refontes de sites web, des boutiques en ligne et des applications web ou tableaux de bord sur mesure.",
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
    question: "Are you based in Morocco?",
    answer:
      "I am based in France and originally from Morocco. I work remotely with Moroccan businesses through direct communication, a defined scope and clear project deliverables.",
  },
  {
    question: "What services do you provide for businesses in Morocco?",
    answer:
      "I provide technical SEO audits and fixes, website creation and redesign, ecommerce development, and custom web applications or business dashboards.",
  },
  {
    question: "Can you improve an existing website?",
    answer:
      "Yes. I first identify what is limiting crawling, indexing, performance, content or conversions. I can then improve the existing website or recommend a focused rebuild when necessary.",
  },
  {
    question: "Do you work with companies across Morocco?",
    answer:
      "Yes. I work remotely with businesses in Casablanca, Rabat, Marrakech and other cities. Reviews, approvals and delivery are organized online through clear project stages.",
  },
  {
    question: "How can I request a quote for a project in Morocco?",
    answer:
      "Send me your website URL, primary objective and the main problem you want to solve. I will reply within 24 hours with initial questions and the most appropriate next step.",
  },
];

export function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "fr" && locale !== "en") {
    return { robots: { index: false, follow: false } };
  }

  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/${locale}${route}`;
  const frenchUrl = `${baseUrl}/fr${route}`;
  const englishUrl = `${baseUrl}/en${route}`;
  const isFrench = locale === "fr";
  const title = isFrench
    ? "Consultant SEO & Développeur Web pour le Maroc | Devsignpro"
    : "Web Developer & SEO Consultant for Morocco | Devsignpro";
  const description = isFrench
    ? "Originaire du Maroc et basé en France, j’accompagne les entreprises marocaines en SEO technique, création de sites, e-commerce et applications web."
    : "Moroccan-born and based in France, I help businesses in Morocco with technical SEO, websites, ecommerce and custom web applications.";
  const image = `${baseUrl}/cover/Designpro-cover.jpg`;

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    keywords: isFrench
      ? [
          "consultant SEO Maroc",
          "développeur web pour entreprise Maroc",
          "développeur web Maroc",
          "expert SEO Maroc",
          "création site web Maroc",
          "audit SEO technique Maroc",
          "référencement naturel Maroc",
          "développement e-commerce Maroc",
        ]
      : [
          "web developer Morocco",
          "website developer Morocco",
          "SEO consultant Morocco",
          "SEO expert Morocco",
          "web developer and SEO expert from Morocco",
          "technical SEO audit Morocco",
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
      images: [{ url: image, width: 1200, height: 630, alt: title }],
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
  const pageUrl = `${baseUrl}/${locale}${route}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: isFrench
          ? "Consultant SEO et développeur web pour le Maroc"
          : "Web developer and SEO consultant for Morocco",
        description: isFrench
          ? "Services de SEO technique, développement web, e-commerce et applications sur mesure pour les entreprises au Maroc."
          : "Technical SEO, web development, ecommerce and custom application services for businesses in Morocco.",
        inLanguage: isFrench ? "fr-MA" : "en-MA",
        isPartOf: { "@id": `${baseUrl}/#website` },
        about: { "@id": `${pageUrl}#service` },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: isFrench
          ? "Services SEO et développement web pour le Maroc"
          : "SEO and web development services for Morocco",
        serviceType: isFrench
          ? ["Audit SEO technique", "Développement web", "Développement e-commerce", "Applications web sur mesure"]
          : ["Technical SEO audit", "Web development", "Ecommerce development", "Custom web applications"],
        provider: { "@id": `${baseUrl}/#person` },
        areaServed: { "@type": "Country", name: "Morocco" },
        availableChannel: {
          "@type": "ServiceChannel",
          serviceLocation: { "@type": "VirtualLocation", url: pageUrl },
        },
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
      title: "Applications et tableaux de bord",
      text: "Développer un outil métier, un espace client ou un dashboard sur mesure lorsque les solutions standards ne répondent pas à votre fonctionnement.",
      href: "/fr/services/business-dashboards",
      label: "Voir les applications sur mesure",
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
      title: "Custom applications and dashboards",
      text: "Develop an internal tool, customer portal or custom dashboard when standard software does not fit your business processes.",
      href: "/en/services/business-dashboards",
      label: "Explore custom applications",
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

          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(300px,0.7fr)] lg:gap-16">
            <header>
              <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-primary">
                <MapPinned className="size-4" aria-hidden="true" />
                {isFrench ? "Originaire du Maroc · Basé en France · Collaboration à distance" : "Originally from Morocco · Based in France · Remote collaboration"}
              </p>
              <h1 id="morocco-heading" className="mt-5 max-w-4xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl">
                {isFrench ? "Consultant SEO et développeur web pour les entreprises au Maroc" : "Web developer and SEO consultant for businesses in Morocco"}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {isFrench
                  ? "J’aide les TPE, PME, e-commerçants et agences marocaines à améliorer leur visibilité sur Google, corriger leur site et construire des expériences web rapides qui facilitent la prise de contact ou la vente."
                  : "I help Moroccan small businesses, ecommerce brands and agencies improve their Google visibility, fix website problems and build fast web experiences that support enquiries and sales."}
              </p>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {isFrench
                  ? "Devsignpro réunit SEO technique et développement web dans une même intervention. Vous échangez directement avec la personne qui analyse, recommande et réalise les corrections."
                  : "Devsignpro combines technical SEO and web development in one service. You work directly with the person who audits, recommends and implements the improvements."}
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

            <aside className="rounded-3xl border border-border bg-card p-6 shadow-xl shadow-black/5 sm:p-8" aria-label={isFrench ? "Positionnement Devsignpro pour le Maroc" : "Devsignpro positioning for Morocco"}>
              <Sparkles className="size-6 text-primary" aria-hidden="true" />
              <h2 className="mt-5 text-xl font-bold">{isFrench ? "Un lien réel avec le marché marocain" : "A genuine connection to the Moroccan market"}</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {isFrench
                  ? "Je suis originaire du Maroc, formé à 1337 UM6P au sein du réseau 42, et actuellement installé en France. Cette double perspective me permet de comprendre les attentes locales tout en appliquant des standards techniques adaptés aux projets internationaux."
                  : "I am originally from Morocco, trained at 1337 UM6P within the 42 Network, and currently based in France. This perspective helps me understand local expectations while applying technical standards suited to international projects."}
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                {(isFrench
                  ? ["Interlocuteur direct", "SEO et code dans la même prestation", "Projet suivi à distance avec des étapes claires"]
                  : ["Direct communication", "SEO and development in one service", "Remote delivery through clear project stages"]
                ).map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
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
                ? "La page d’accueil présente l’offre globale. Chaque service ci-dessous mène vers une page détaillée pour comprendre les livrables, les cas d’usage et la méthode de travail."
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
              {isFrench ? "Une expertise web et SEO au service du marché marocain" : "A web developer and SEO specialist from Morocco"}
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              {isFrench
                ? "Basé en France et originaire du Maroc, j’interviens à distance sur la technique, le contenu, la performance et l’architecture des sites. Cette expérience me permet d’accompagner des entreprises marocaines avec une méthode claire et des standards adaptés aux projets internationaux."
                : "I am a Moroccan-born web developer and SEO specialist currently based in France. I work remotely with businesses in Morocco on technical SEO, content structure, performance and website architecture."}
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {isFrench
                ? "Les études de cas montrent le contexte, les choix de réalisation et les résultats vérifiables lorsqu’ils sont disponibles. Les projets académiques démontrent aussi ma maîtrise des systèmes, réseaux, architectures temps réel et environnements conteneurisés."
                : "My case studies explain the project context, implementation decisions and verifiable outcomes when data is available. Academic projects also demonstrate experience with systems, networks, real-time architecture and containerized environments."}
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
