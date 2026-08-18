// app/components/schemas/PersonSchema.tsx
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
            "Nest.js",
            "Technical SEO",
            "AI Search Optimization",
            "Core Web Vitals",
            "Schema.org",
          ]
        : locale === "ar"
          ? [
              "تطوير الويب",
              "Next.js",
              "React.js",
              "تحسين محركات البحث (SEO)",
              "تحسين البحث بالذكاء الاصطناعي",
              "أداء المواقع (Core Web Vitals)",
            ]
          : [
              "Développement Web",
              "Next.js",
              "React.js",
              "SEO Technique",
              "Optimisation de la recherche IA",
              "Core Web Vitals",
            ],

    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Morocco",
    },
    "knowsLanguage": ["English", "French", "Arabic"],
    "sameAs": [social.linkedin, social.github, social.facebook].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
