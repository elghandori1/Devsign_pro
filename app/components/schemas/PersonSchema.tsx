// app/components/schemas/PersonSchema.tsx
interface PersonSchemaProps {
  baseUrl: string;
  locale: string;
  name: string;
  jobTitle: string;
  description: string;
  image: string;
  social: {
    linkedin?: string;
    github?: string;
    facebook?: string;
  };
}

export function PersonSchema({ baseUrl, locale, name, jobTitle, description, image, social }: PersonSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#person`,
    name,
    jobTitle,
    description,
    url: `${baseUrl}/${locale}`,
    image,
    worksFor: { "@id": `${baseUrl}/#organization` },
    knowsAbout: locale === "en"
      ? [
          "Web Development",
          "Next.js",
          "React",
          "SEO",
          "AI Search Optimization",
          "Answer Engine Optimization",
          "Generative Engine Optimization",
          "Business Dashboard Automation",
          "Social Media Design",
          "TypeScript",
          "Node.js",
        ]
      : locale === "ar"
        ? [
            "تطوير الويب",
            "Next.js",
            "React",
            "تحسين محركات البحث",
            "تحسين البحث بالذكاء الاصطناعي",
            "تحسين محركات الإجابة",
            "تحسين المحركات التوليدية",
            "أتمتة لوحة معلومات الأعمال",
            "تصميم وسائل التواصل الاجتماعي",
            "TypeScript",
            "Node.js",
          ]
        : [
            "Développement Web",
            "Next.js",
            "React",
            "SEO",
            "Optimisation de la recherche par IA",
            "Optimisation des moteurs de réponse",
            "Optimisation des moteurs génératifs",
            "Automatisation du tableau de bord des affaires",
            "Conception des médias sociaux",
            "TypeScript",
            "Node.js",
          ],
    knowsLanguage: [
      { "@type": "Language", name: "English" },
      { "@type": "Language", name: "French" },
      { "@type": "Language", name: "Arabic" },
    ],
    sameAs: [social.linkedin, social.github, social.facebook].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}