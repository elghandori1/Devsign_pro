// app/components/schemas/ProfessionalServiceSchema.tsx
import infos from "@/app/dictionaries/global.json";
import { serializeJsonLd } from "@/app/lib/serializeJsonLd";

type SchemaLocale = "en" | "fr";

interface Props {
  baseUrl: string;
  locale: string;
  description: string;
}

/** Services offered, with the public "starting from" price where one is published. */
const SERVICES: {
  path: string;
  minPrice?: number;
  name: Record<SchemaLocale, string>;
}[] = [
  {
    path: "/services/web-development",
    minPrice: 1200,
    name: {
      en: "Website development (WordPress or Next.js)",
      fr: "Création de site internet (WordPress ou Next.js)",
    },
  },
  {
    path: "/services/ecommerce-development",
    minPrice: 2500,
    name: {
      en: "E-commerce development (Shopify, WooCommerce or Next.js)",
      fr: "Création de boutique en ligne (Shopify, WooCommerce ou Next.js)",
    },
  },
  {
    path: "/services/technical-seo",
    minPrice: 450,
    name: {
      en: "Technical SEO audit and optimization",
      fr: "Audit et optimisation SEO technique",
    },
  },
  {
    path: "/services/seo-content-optimization",
    name: {
      en: "SEO and GEO content optimization",
      fr: "Optimisation de contenu SEO et GEO",
    },
  },
  {
    path: "/services/business-dashboards",
    name: {
      en: "Custom web applications and business dashboards",
      fr: "Applications web et tableaux de bord sur mesure",
    },
  },
];

export function ProfessionalServiceSchema({
  baseUrl,
  locale,
  description,
}: Props) {
  const lang: SchemaLocale = locale === "fr" ? "fr" : "en";

  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${baseUrl}/#business`,
    name: "Devsignpro",
    url: `${baseUrl}/${lang}`,
    description,
    inLanguage: lang === "fr" ? "fr-FR" : "en",
    logo: `${baseUrl}/logo/devsignpro-logo.jpg`,
    image: `${baseUrl}/cover/Designpro-cover.jpg`,
    founder: { "@id": `${baseUrl}/#person` },
    email: infos.email,
    telephone: infos.phoneNumber,
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      addressCountry: "FR",
    },
    areaServed: [
      { "@type": "Country", name: "France" },
      { "@type": "Place", name: "Europe" },
      { "@type": "Country", name: "Morocco" },
      { "@type": "Place", name: "Worldwide (remote)" },
    ],
    knowsAbout: [
      "Next.js",
      "React",
      "Express.js",
      "Shopify",
      "WordPress",
      "WooCommerce",
      "Technical SEO",
      "Generative Engine Optimization",
      "AI Search Optimization",
      "Core Web Vitals",
    ],
    sameAs: [
      infos.social.instagram.split("?")[0],
      infos.social.linkedin,
      infos.social.github,
      infos.social.facebook,
    ].filter(Boolean),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Devsignpro services",
      itemListElement: SERVICES.map((service) => ({
        "@type": "Offer",
        url: `${baseUrl}/${lang}${service.path}`,
        itemOffered: {
          "@type": "Service",
          name: service.name[lang],
          url: `${baseUrl}/${lang}${service.path}`,
          inLanguage: lang === "fr" ? "fr-FR" : "en",
          provider: { "@id": `${baseUrl}/#business` },
        },
        ...(service.minPrice
          ? {
              priceSpecification: {
                "@type": "PriceSpecification",
                minPrice: service.minPrice,
                priceCurrency: "EUR",
              },
            }
          : {}),
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
    />
  );
}
