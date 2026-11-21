// app/components/schemas/PersonSchema.tsx
import { serializeJsonLd } from "@/app/lib/serializeJsonLd";

interface PersonSchemaProps {
  baseUrl: string;
  locale: string;
  jobTitle: string;
  description: string;
  image: string;
  social: {
    linkedin?: string;
    github?: string;
    facebook?: string;
    instagram?: string;
    };
}

export function PersonSchema({
  baseUrl,
  locale,
  jobTitle,
  description,
  image,
  social,
}: PersonSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#person`,
    "name": "Mohammed Elghandori",
    "jobTitle": jobTitle,
    "description": description,
    "url": `${baseUrl}/${locale}/about`,
    "image": image,
    "knowsAbout":
      locale === "en"
        ? [
            "Next.js",
            "React.js",
            "Express.js",
            "Shopify",
            "WordPress",
            "Technical SEO",
            "AI Search Optimization",
            "Core Web Vitals",
            "Schema.org",
          ]
        : [
              "Développement Web",
              "Next.js",
              "React.js",
              "Express.js",
              "Shopify",
              "WordPress",
              "SEO Technique",
              "Optimisation de la recherche IA",
              "Core Web Vitals",
            ],

    "address": {
      "@type": "PostalAddress",
      "addressCountry": "FR",
    },
    "nationality": { "@type": "Country", "name": "Morocco" },
    "worksFor": { "@id": `${baseUrl}/#business` },
    "sameAs": [social.linkedin, social.github, social.facebook, social.instagram].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
    />
  );
}
