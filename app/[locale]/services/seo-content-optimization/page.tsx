import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  FileText,
  Link2,
  MessageSquareText,
  Search,
  ShieldCheck,
  Target,
} from "lucide-react";
import { buildPageMetadata, getBaseUrl } from "@/app/lib/buildPageMetadata";
import { serializeJsonLd } from "@/app/lib/serializeJsonLd";
import { i18n, localeToBcp47, type Locale } from "@/i18n-config";

type Props = { params: Promise<{ locale: string }> };
type Card = { title: string; text: string };
type FAQ = { q: string; a: string };

type Content = {
  seo: { title: string; description: string; keywords: string[] };
  breadcrumb: { label: string; home: string; services: string; current: string };
  hero: {
    eyebrow: string;
    heading: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    promise: string[];
  };
  problems: { eyebrow: string; heading: string; description: string; items: string[] };
  definition: { eyebrow: string; heading: string; answer: string; note: string };
  scope: { eyebrow: string; heading: string; description: string; items: Card[] };
  transformation: {
    eyebrow: string;
    heading: string;
    description: string;
    before: { label: string; items: string[] };
    after: { label: string; items: string[] };
  };
  deliverables: { eyebrow: string; heading: string; description: string; items: Card[] };
  process: { eyebrow: string; heading: string; steps: Card[] };
  measurement: { eyebrow: string; heading: string; description: string; items: string[]; note: string };
  fit: { eyebrow: string; heading: string; items: Card[] };
  related: { heading: string; items: { title: string; href: string; label: string }[] };
  faq: { eyebrow: string; heading: string; items: FAQ[] };
  cta: { heading: string; description: string; button: string };
};

const CONTENT: Record<Locale, Content> = {
  fr: {
    seo: {
      title: "Optimisation de contenu SEO, GEO et CRO | Devsignpro",
      description:
        "Optimisation de contenu SEO, GEO et CRO en France : intentions de recherche, mots-clés, architecture, maillage interne, E-E-A-T et conversion.",
      keywords: [
        "optimisation contenu SEO",
        "stratégie de contenu SEO France",
        "consultant GEO France",
        "optimisation recherche IA",
        "référencement ChatGPT",
        "maillage interne SEO",
        "intention de recherche SEO",
        "optimisation CRO site web",
      ],
    },
    breadcrumb: {
      label: "Fil d’Ariane",
      home: "Accueil",
      services: "Services",
      current: "Optimisation de contenu SEO, GEO et CRO",
    },
    hero: {
      eyebrow: "Contenu, visibilité et conversion",
      heading: "Optimisation de contenu SEO, GEO et CRO",
      description:
        "J’améliore les pages d’un site pour qu’elles répondent clairement aux recherches de vos prospects, soient plus faciles à comprendre par Google et les moteurs IA, et conduisent davantage de visiteurs vers une prise de contact ou un achat.",
      primaryCta: "Demander un devis gratuit",
      secondaryCta: "Voir la méthode",
      promise: [
        "Réponse sous 24h",
        "Recommandations reliées à vos objectifs",
        "Contenu, maillage et conversion traités ensemble",
      ],
    },
    problems: {
      eyebrow: "Problèmes fréquents",
      heading: "Votre site est indexé, mais ses pages ne convainquent pas",
      description:
        "La technique peut être saine sans que le contenu corresponde aux recherches, démontre votre valeur ou aide le visiteur à avancer.",
      items: [
        "Les pages ciblent plusieurs intentions et se concurrencent entre elles.",
        "Les titres et textes décrivent l’entreprise sans répondre aux questions des clients.",
        "Google comprend mal quelle page doit se positionner sur quel sujet.",
        "Le contenu reste difficile à extraire ou à citer dans les réponses générées par IA.",
        "Les preuves, l’auteur, l’expérience et les informations de confiance sont insuffisants.",
        "Le trafic existe, mais les demandes de devis, appels ou ventes restent faibles.",
      ],
    },
    definition: {
      eyebrow: "Réponse claire",
      heading: "Qu’est-ce que l’optimisation SEO, GEO et CRO du contenu ?",
      answer:
        "C’est l’amélioration coordonnée de l’intention de recherche, des informations, de la structure des pages, du maillage interne et des appels à l’action. Le SEO aide la page à être trouvée et comprise, le GEO facilite sa récupération par les moteurs IA, et le CRO aide le visiteur à passer à l’étape suivante.",
      note:
        "Cette prestation ne remplace pas un audit SEO technique. Elle intervient sur ce que vos pages disent, prouvent et font faire après que les problèmes de crawl, d’indexation ou de rendu ont été écartés ou corrigés.",
    },
    scope: {
      eyebrow: "Périmètre",
      heading: "Une stratégie page par page, sans bourrage de mots-clés",
      description:
        "Chaque page reçoit un rôle précis afin d’éviter la cannibalisation et de créer un parcours cohérent entre découverte, comparaison et conversion.",
      items: [
        {
          title: "Intentions et mots-clés",
          text: "Regrouper les requêtes par besoin réel, étape d’achat et type de page, puis attribuer un sujet principal à chaque URL.",
        },
        {
          title: "Architecture éditoriale",
          text: "Décider quelles pages conserver, fusionner ou créer, avec une hiérarchie claire entre pages piliers, services, études de cas et articles.",
        },
        {
          title: "Contenu utile et extractible",
          text: "Réécrire les réponses, titres et sections dans un format clair pour les lecteurs, Google, ChatGPT, AI Overviews et Perplexity.",
        },
        {
          title: "E-E-A-T et confiance",
          text: "Renforcer les preuves visibles : auteur, expérience, méthode, sources, réalisations, informations de contact et cohérence de l’entité.",
        },
        {
          title: "Maillage interne",
          text: "Relier les pages selon leur rôle et leur proximité sémantique avec des ancres utiles, sans multiplier les liens artificiels.",
        },
        {
          title: "CRO et parcours",
          text: "Clarifier la proposition de valeur, les objections, les preuves et les appels à l’action selon le niveau de décision du visiteur.",
        },
      ],
    },
    transformation: {
      eyebrow: "Avant et après",
      heading: "Transformer une page descriptive en page qui aide à décider",
      description:
        "L’objectif n’est pas d’allonger le texte. Il est de supprimer l’ambiguïté et de placer la bonne information au bon moment.",
      before: {
        label: "Avant",
        items: [
          "Une page qui mélange plusieurs services",
          "Des expressions génériques répétées",
          "Peu de preuves ou de réponses concrètes",
          "Un seul bouton sans contexte",
        ],
      },
      after: {
        label: "Après optimisation",
        items: [
          "Une intention et un objectif de conversion précis",
          "Des réponses structurées et faciles à extraire",
          "Des preuves et signaux de confiance vérifiables",
          "Des liens et CTA adaptés au parcours du visiteur",
        ],
      },
    },
    deliverables: {
      eyebrow: "Livrables",
      heading: "Ce que vous recevez",
      description:
        "Le périmètre dépend du nombre de pages, de vos données disponibles et du niveau de réécriture ou d’intégration nécessaire.",
      items: [
        { title: "Carte intentions–pages", text: "Les sujets, intentions, mots-clés et objectifs attribués à chaque URL prioritaire." },
        { title: "Plan de contenu", text: "La structure recommandée, les questions à traiter, les preuves nécessaires et les liens internes." },
        { title: "Optimisations ou réécriture", text: "Des contenus directement exploitables, adaptés à votre ton et validés avec vos informations réelles." },
        { title: "Parcours de conversion", text: "Une hiérarchie de CTA et de liens vers les services, preuves et prises de contact pertinentes." },
        { title: "Recommandations GEO", text: "Des réponses autonomes, données structurées pertinentes et signaux d’entité cohérents, sans promesse de citation." },
        { title: "Mesure et priorités", text: "Les indicateurs à suivre et une liste d’actions classées par impact et effort." },
      ],
    },
    process: {
      eyebrow: "Méthode",
      heading: "De la recherche à la mesure",
      steps: [
        { title: "Comprendre", text: "Clarifier vos offres, audiences, preuves, objectifs commerciaux et pages prioritaires." },
        { title: "Rechercher", text: "Étudier les requêtes, les résultats de recherche, les questions clients et les contenus déjà visibles." },
        { title: "Structurer", text: "Définir le rôle de chaque page, le maillage et le contenu nécessaire à la décision." },
        { title: "Optimiser", text: "Réécrire ou intégrer les améliorations SEO, GEO, sémantiques et CRO validées." },
        { title: "Vérifier", text: "Contrôler le rendu, les liens, les métadonnées, les données structurées et les événements de conversion." },
      ],
    },
    measurement: {
      eyebrow: "Mesure",
      heading: "Des résultats suivis avec des indicateurs utiles",
      description:
        "Le succès dépend du point de départ, de la concurrence, de l’autorité du site et de la mise en œuvre. Aucun positionnement ni aucune citation IA ne peut être garanti.",
      items: [
        "Impressions, clics, CTR et requêtes dans Search Console",
        "Pages d’entrée et progression des groupes de requêtes",
        "Clics vers les contacts, formulaires envoyés et demandes qualifiées",
        "Engagement sur les sections importantes et abandons du parcours",
      ],
      note: "Le trafic n’est pas la seule finalité : la qualité des demandes et la compréhension de votre offre comptent aussi.",
    },
    fit: {
      eyebrow: "Projets adaptés",
      heading: "Quand choisir cette prestation ?",
      items: [
        { title: "Site existant sans stratégie claire", text: "Vos pages sont en ligne, mais les sujets, mots-clés et objectifs se chevauchent." },
        { title: "Refonte ou lancement", text: "Vous voulez définir l’architecture et le contenu avant de concevoir les écrans ou développer les gabarits." },
        { title: "Trafic qui convertit peu", text: "Des visiteurs arrivent, mais la valeur, les preuves ou la prochaine étape restent peu claires." },
      ],
    },
    related: {
      heading: "Services complémentaires",
      items: [
        { title: "Vérifier l’exploration, l’indexation et la performance", href: "/services/technical-seo", label: "Audit SEO technique" },
        { title: "Créer ou refondre la plateforme qui porte le contenu", href: "/services/web-development", label: "Développement web" },
        { title: "Comparer toutes les prestations", href: "/services", label: "Voir les services" },
      ],
    },
    faq: {
      eyebrow: "Questions fréquentes",
      heading: "Avant d’optimiser vos contenus",
      items: [
        { q: "Quelle différence avec un audit SEO technique ?", a: "L’audit technique vérifie notamment le crawl, l’indexation, le rendu, les canonicals, la performance et les données structurées. Cette prestation travaille surtout l’intention, les réponses, les preuves, le maillage éditorial et la conversion. Les deux peuvent être combinés lorsqu’un site cumule les deux types de problèmes." },
        { q: "Pouvez-vous réécrire les pages existantes ?", a: "Oui. Je peux fournir les recommandations, réécrire les pages prioritaires ou intégrer les changements selon la plateforme et le périmètre convenu." },
        { q: "Le GEO garantit-il une présence dans ChatGPT ou Google AI Overviews ?", a: "Non. Il améliore la clarté, l’extractibilité et les signaux de confiance qui peuvent aider les systèmes à comprendre et récupérer le contenu, mais aucun prestataire ne peut garantir une citation ou une visibilité permanente." },
        { q: "Faut-il créer beaucoup de nouvelles pages ?", a: "Pas nécessairement. Je commence par vérifier si les pages existantes peuvent être clarifiées, regroupées ou mieux reliées. Une nouvelle page est justifiée seulement lorsqu’elle répond à une intention distincte et apporte une information utile." },
      ],
    },
    cta: {
      heading: "Vos pages doivent être trouvées, comprises et convaincantes",
      description: "Envoyez-moi l’URL du site, les pages prioritaires et l’objectif commercial. Je vous réponds sous 24h avec les informations nécessaires pour cadrer la prestation.",
      button: "Demander un devis gratuit",
    },
  },
  en: {
    seo: {
      title: "SEO Content Optimization, AI Search & CRO | Devsignpro",
      description:
        "SEO content optimization for search and AI discovery: search intent, keyword mapping, content architecture, internal links, E-E-A-T signals and CRO.",
      keywords: [
        "SEO content optimization service",
        "SEO content strategy consultant",
        "AI search optimization consultant",
        "GEO consultant",
        "search intent optimization",
        "internal linking strategy",
        "E-E-A-T content optimization",
        "website conversion optimization",
      ],
    },
    breadcrumb: { label: "Breadcrumb", home: "Home", services: "Services", current: "SEO content optimization, AI search and CRO" },
    hero: {
      eyebrow: "Content, visibility and conversion",
      heading: "SEO content optimization for search, AI answers and conversions",
      description:
        "I improve website pages so they answer what prospects are searching for, are easier for Google and AI search systems to understand, and guide more qualified visitors toward an enquiry or purchase.",
      primaryCta: "Get a Free Quote",
      secondaryCta: "See the process",
      promise: ["Response within 24 hours", "Recommendations tied to business goals", "Content, internal links and CRO handled together"],
    },
    problems: {
      eyebrow: "Common problems",
      heading: "Your website is indexed, but its pages do not help people decide",
      description: "A technically sound website can still miss the search intent, fail to demonstrate value or leave the next step unclear.",
      items: [
        "Pages target several intents and compete with one another.",
        "Headings and copy describe the company without answering customer questions.",
        "Search engines cannot clearly identify which page should rank for each topic.",
        "Important information is difficult for AI search systems to retrieve or cite.",
        "Experience, authorship, evidence and trust information are too weak or unclear.",
        "Traffic arrives, but enquiries, calls or purchases remain low.",
      ],
    },
    definition: {
      eyebrow: "Clear answer",
      heading: "What is SEO, AI search and CRO content optimization?",
      answer:
        "It is the coordinated improvement of search intent, page information, content structure, internal linking and calls to action. SEO helps a page get found and understood, AI search optimization improves retrievability, and CRO helps visitors take the next useful step.",
      note:
        "This does not replace a technical SEO audit. It focuses on what pages say, prove and ask visitors to do after crawling, indexing and rendering blockers have been ruled out or fixed.",
    },
    scope: {
      eyebrow: "Scope",
      heading: "A page-by-page strategy without keyword stuffing",
      description: "Each page receives a distinct role to reduce cannibalization and create a coherent path from discovery to comparison and conversion.",
      items: [
        { title: "Search intent and keywords", text: "Group queries by real need, buying stage and page type, then assign one primary subject to each URL." },
        { title: "Content architecture", text: "Decide what to retain, merge or create, with a clear hierarchy across hubs, services, case studies and articles." },
        { title: "Useful, extractable answers", text: "Rewrite headings, sections and answers clearly for readers, Google, ChatGPT, AI Overviews and Perplexity." },
        { title: "E-E-A-T and trust", text: "Strengthen visible evidence such as authorship, experience, methods, sources, projects, contact details and entity consistency." },
        { title: "Internal linking", text: "Connect pages according to their purpose and semantic relationship using helpful anchors rather than artificial link volume." },
        { title: "CRO and user journeys", text: "Clarify the value proposition, objections, proof and calls to action for each visitor’s decision stage." },
      ],
    },
    transformation: {
      eyebrow: "Before and after",
      heading: "Turn a descriptive page into a page that supports a decision",
      description: "The goal is not to make pages longer. It is to remove ambiguity and provide the right information at the right moment.",
      before: { label: "Before", items: ["One page mixing several services", "Repeated generic phrases", "Little evidence or specific answers", "One button without decision context"] },
      after: { label: "After optimization", items: ["One clear intent and conversion goal", "Structured, extractable answers", "Verifiable evidence and trust signals", "Links and CTAs matched to the journey"] },
    },
    deliverables: {
      eyebrow: "Deliverables",
      heading: "What you receive",
      description: "Scope depends on the number of pages, available evidence and whether you need recommendations, rewriting or direct implementation.",
      items: [
        { title: "Intent-to-page map", text: "Topics, intents, keywords and goals assigned to each priority URL." },
        { title: "Content plan", text: "Recommended page structure, questions to answer, evidence to add and internal links." },
        { title: "Optimization or rewriting", text: "Usable content aligned with your tone and validated against real business information." },
        { title: "Conversion path", text: "A CTA and internal-link hierarchy leading to the right services, evidence and contact points." },
        { title: "AI search recommendations", text: "Standalone answers, relevant structured data and consistent entity signals, without promising citations." },
        { title: "Measurement plan", text: "The metrics to monitor and a prioritized action list based on expected impact and effort." },
      ],
    },
    process: {
      eyebrow: "Process",
      heading: "From research to measurement",
      steps: [
        { title: "Understand", text: "Clarify your offers, audiences, evidence, commercial goals and priority pages." },
        { title: "Research", text: "Review queries, search results, customer questions and content already earning visibility." },
        { title: "Structure", text: "Define each page’s purpose, internal links and the information needed for a decision." },
        { title: "Optimize", text: "Write or implement the approved SEO, AI-search, semantic and CRO improvements." },
        { title: "Verify", text: "Check rendering, links, metadata, structured data and meaningful conversion events." },
      ],
    },
    measurement: {
      eyebrow: "Measurement",
      heading: "Track outcomes with useful indicators",
      description: "Results depend on the starting point, competition, site authority and implementation. Rankings and AI citations cannot be guaranteed.",
      items: ["Search Console impressions, clicks, CTR and queries", "Landing pages and query-cluster progress", "Contact clicks, submitted forms and qualified enquiries", "Engagement with key sections and journey drop-offs"],
      note: "Traffic is not the only goal: the quality of enquiries and how clearly prospects understand the offer also matter.",
    },
    fit: {
      eyebrow: "Suitable projects",
      heading: "When should you choose this service?",
      items: [
        { title: "Existing website without a clear strategy", text: "Pages are live, but their topics, keywords and goals overlap." },
        { title: "Launch or redesign", text: "You want to define architecture and content before designing screens or building templates." },
        { title: "Traffic that converts poorly", text: "Visitors arrive, but the value, evidence or next step remains unclear." },
      ],
    },
    related: {
      heading: "Related services",
      items: [
        { title: "Check crawling, indexing and performance", href: "/services/technical-seo", label: "Technical SEO audit" },
        { title: "Build or redesign the platform carrying the content", href: "/services/web-development", label: "Web development" },
        { title: "Compare every service", href: "/services", label: "View all services" },
      ],
    },
    faq: {
      eyebrow: "Frequently asked questions",
      heading: "Before optimizing your content",
      items: [
        { q: "How is this different from a technical SEO audit?", a: "A technical audit checks crawling, indexing, rendering, canonicals, performance and structured data. This service focuses on intent, answers, evidence, editorial internal links and conversion. They can be combined when a website has both kinds of problem." },
        { q: "Can you rewrite existing pages?", a: "Yes. I can provide recommendations, rewrite priority pages or implement changes depending on the platform and agreed scope." },
        { q: "Does AI search optimization guarantee visibility in ChatGPT or Google AI Overviews?", a: "No. It improves clarity, retrievability and trust signals that may help systems understand and retrieve the content, but no provider can guarantee a citation or permanent visibility." },
        { q: "Do we need to create many new pages?", a: "Not necessarily. I first check whether existing pages can be clarified, consolidated or linked more effectively. A new page is justified only when it serves a distinct intent and provides useful information." },
      ],
    },
    cta: {
      heading: "Your pages should be found, understood and persuasive",
      description: "Send me the website URL, priority pages and commercial goal. I will reply within 24 hours with what I need to scope the work.",
      button: "Get a Free Quote",
    },
  },
};

const SCOPE_ICONS = [Target, FileText, MessageSquareText, ShieldCheck, Link2, BarChart3] as const;
const PAGE_UPDATED = "2026-11-21";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

function resolveLocale(rawLocale: string): Locale {
  return i18n.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : i18n.defaultLocale;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const content = CONTENT[locale];

  return buildPageMetadata({
    locale,
    title: content.seo.title,
    description: content.seo.description,
    keywords: content.seo.keywords,
    route: "/services/seo-content-optimization",
    ogImagePath: "/cover/Designpro-cover.jpg",
    type: "website",
  });
}

export default async function SeoContentOptimizationPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const content = CONTENT[locale];
  const baseUrl = getBaseUrl();
  const pageUrl = `${baseUrl}/${locale}/services/seo-content-optimization`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: content.seo.title,
        description: content.seo.description,
        inLanguage: localeToBcp47(locale),
        dateModified: PAGE_UPDATED,
        isPartOf: { "@id": `${baseUrl}/#website` },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        mainEntity: { "@id": `${pageUrl}#service` },
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: content.hero.heading,
        description: content.hero.description,
        url: pageUrl,
        serviceType:
          locale === "fr"
            ? "Optimisation de contenu SEO, GEO et CRO"
            : "SEO content optimization, AI search and CRO",
        provider: { "@id": `${baseUrl}/#person` },
        areaServed:
          locale === "fr"
            ? [{ "@type": "Country", name: "France" }, { "@type": "Place", name: "Europe" }]
            : { "@type": "Place", name: "Worldwide" },
        offers: {
          "@type": "Offer",
          url: pageUrl,
          availability: "https://schema.org/InStock",
          description: locale === "fr" ? "Tarif sur devis selon le nombre de pages et le périmètre" : "Custom quote based on page count and scope",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        inLanguage: localeToBcp47(locale),
        mainEntity: content.faq.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: content.breadcrumb.home, item: `${baseUrl}/${locale}` },
          { "@type": "ListItem", position: 2, name: content.breadcrumb.services, item: `${baseUrl}/${locale}/services` },
          { "@type": "ListItem", position: 3, name: content.breadcrumb.current, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <main className="bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />

      <section aria-labelledby="content-optimization-heading" className="relative overflow-hidden border-b border-border hero-section-light">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,color-mix(in_srgb,var(--primary)_14%,transparent),transparent_34%),radial-gradient(circle_at_88%_74%,color-mix(in_srgb,var(--primary)_9%,transparent),transparent_30%)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:py-20">
          <nav aria-label={content.breadcrumb.label} className="mb-8 text-sm text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href={`/${locale}`} className="inline-flex min-h-11 items-center hover:text-primary">{content.breadcrumb.home}</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href={`/${locale}/services`} className="inline-flex min-h-11 items-center hover:text-primary">{content.breadcrumb.services}</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-foreground">{content.breadcrumb.current}</li>
            </ol>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.72fr)] lg:gap-16">
            <header>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{content.hero.eyebrow}</p>
              <h1 id="content-optimization-heading" className="mt-4 max-w-4xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl">{content.hero.heading}</h1>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">{content.hero.description}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={`/${locale}/contact`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                  {content.hero.primaryCta}<ArrowRight size={17} aria-hidden="true" />
                </Link>
                <a href="#method" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border bg-card px-6 py-3 font-semibold transition hover:border-primary/40 hover:text-primary">{content.hero.secondaryCta}</a>
              </div>
              <ul className="mt-7 grid gap-3 text-sm sm:grid-cols-3">
                {content.hero.promise.map((item) => <li key={item} className="flex gap-2 leading-relaxed"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" /><span>{item}</span></li>)}
              </ul>
            </header>

            <div className="rounded-3xl border border-border bg-card p-5 shadow-xl sm:p-7" aria-label={content.transformation.heading}>
              <div className="rounded-2xl border border-border bg-background p-5">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{content.transformation.before.label}</span>
                <p className="mt-3 text-lg font-semibold text-muted-foreground line-through decoration-primary/60">{content.transformation.before.items[0]}</p>
              </div>
              <div className="flex justify-center py-3 text-primary" aria-hidden="true"><ArrowRight className="rotate-90" /></div>
              <div className="rounded-2xl border border-primary/25 bg-primary/5 p-5">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{content.transformation.after.label}</span>
                <p className="mt-3 text-lg font-semibold">{content.transformation.after.items[0]}</p>
                <div className="mt-5 grid grid-cols-3 gap-2" aria-hidden="true">
                  <span className="h-2 rounded-full bg-primary" /><span className="h-2 rounded-full bg-primary/55" /><span className="h-2 rounded-full bg-primary/25" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="problems-heading" className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
          <header className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{content.problems.eyebrow}</p><h2 id="problems-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{content.problems.heading}</h2><p className="mt-5 leading-relaxed text-muted-foreground">{content.problems.description}</p></header>
          <ul className="mt-9 grid gap-x-8 md:grid-cols-2">{content.problems.items.map((item) => <li key={item} className="flex gap-3 border-t border-border py-5"><Search className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" /><span className="font-medium leading-relaxed">{item}</span></li>)}</ul>
        </div>
      </section>

      <section aria-labelledby="definition-heading" className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-7 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[0.62fr_1.38fr] lg:gap-16">
          <header><p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{content.definition.eyebrow}</p><h2 id="definition-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{content.definition.heading}</h2></header>
          <div>
            <p className="text-lg font-medium leading-relaxed sm:text-xl">{content.definition.answer}</p>
            <p className="mt-5 border-l-2 border-primary pl-4 leading-relaxed text-muted-foreground">{content.definition.note}</p>
            <Link href={`/${locale}/services/technical-seo`} className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-primary hover:underline">
              {locale === "fr" ? "Vérifier la base avec un audit SEO technique" : "Check the foundation with a technical SEO audit"}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="scope-heading" className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
          <header className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{content.scope.eyebrow}</p><h2 id="scope-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{content.scope.heading}</h2><p className="mt-5 leading-relaxed text-muted-foreground">{content.scope.description}</p></header>
          <ul className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{content.scope.items.map((item, index) => { const Icon = SCOPE_ICONS[index] ?? Target; return <li key={item.title} className="rounded-2xl border border-border bg-card p-6 sm:p-7"><span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary" aria-hidden="true"><Icon size={21} /></span><h3 className="mt-5 text-xl font-semibold">{item.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{item.text}</p></li>; })}</ul>
        </div>
      </section>

      <section aria-labelledby="deliverables-heading" className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 sm:py-20 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <header><p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{content.deliverables.eyebrow}</p><h2 id="deliverables-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{content.deliverables.heading}</h2><p className="mt-5 leading-relaxed text-muted-foreground">{content.deliverables.description}</p></header>
          <ol className="divide-y divide-border border-y border-border">{content.deliverables.items.map((item, index) => <li key={item.title} className="grid gap-3 py-5 sm:grid-cols-[2.5rem_1fr] sm:py-6"><span className="text-sm font-semibold text-primary" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><div><h3 className="text-lg font-semibold">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">{item.text}</p></div></li>)}</ol>
        </div>
      </section>

      <section id="method" aria-labelledby="process-heading" className="scroll-mt-24 border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
          <header className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{content.process.eyebrow}</p><h2 id="process-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{content.process.heading}</h2></header>
          <ol className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-5">{content.process.steps.map((step, index) => <li key={step.title} className="rounded-2xl border border-border bg-background p-6"><span className="text-sm font-semibold text-primary" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h3 className="mt-5 text-xl font-semibold">{step.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.text}</p></li>)}</ol>
        </div>
      </section>

      <section aria-labelledby="related-heading" className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16"><h2 id="related-heading" className="text-2xl font-bold tracking-tight sm:text-3xl">{content.related.heading}</h2><ul className="mt-7 grid gap-4 md:grid-cols-3">{content.related.items.map((item) => <li key={item.href}><Link href={`/${locale}${item.href}`} className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition hover:border-primary/35"><span className="font-semibold leading-relaxed">{item.title}</span><span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-primary">{item.label}<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span></Link></li>)}</ul></div>
      </section>

      <section aria-labelledby="faq-heading" className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 sm:py-20 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16"><header><p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{content.faq.eyebrow}</p><h2 id="faq-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{content.faq.heading}</h2></header><div>{content.faq.items.map((item, index) => <details key={item.q} open={index === 0} className="group border-t border-border first:border-t-0"><summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden"><h3 className="text-base font-semibold leading-snug sm:text-lg">{item.q}</h3><ChevronDown className="size-5 shrink-0 text-primary transition-transform group-open:rotate-180" aria-hidden="true" /></summary><p className="pb-5 text-sm leading-relaxed text-muted-foreground sm:text-base">{item.a}</p></details>)}</div></div>
      </section>

      <section aria-labelledby="content-cta-heading" className="px-4 py-12 sm:px-6 sm:py-20">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-border hero-section-light px-6 py-12 sm:px-10 sm:py-16 lg:px-16"><div className="absolute right-0 top-0 size-72 translate-x-1/3 -translate-y-1/3 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" /><div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end"><div className="max-w-3xl"><h2 id="content-cta-heading" className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{content.cta.heading}</h2><p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{content.cta.description}</p></div><Link href={`/${locale}/contact`} className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:brightness-110">{content.cta.button}<ArrowRight size={17} aria-hidden="true" /></Link></div></div>
      </section>
    </main>
  );
}
