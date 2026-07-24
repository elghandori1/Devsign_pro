// app/components/schemas/ProfessionalServiceSchema.tsx
interface ServiceItem {
  name: string;
  description: string;
}

interface Props {
  baseUrl: string;
  locale: string;
  name: string;
  description: string;
  email: string;
  phone: string;
  logoUrl: string;
  founderId: string;
  services: ServiceItem[];
  social: Record<string, string | undefined>;
}

export function ProfessionalServiceSchema({
  baseUrl,
  locale,
  name,
  description,
  email,
  phone,
  logoUrl,
  founderId,
  services,
  social,
}: Props) {
  const orgId = `${baseUrl}/#organization`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": orgId,
    name,
    url: `${baseUrl}/${locale}`,
    logo: {
      "@type": "ImageObject",
      url: logoUrl,
      width: 512,
      height: 512,
    },
    email,
    telephone: phone,
    description,
    foundingDate: "2021",
    priceRange: "$$",
    founder: { "@id": founderId },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Casablanca",
      addressRegion: "Casablanca-Settat",
      addressCountry: "MA",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email,
      contactType: "customer service",
      availableLanguage: ["English", "French", "Arabic"],
    },
    knowsAbout:
      locale === "en"
        ? [
            "Web Development",
            "Next.js",
            "React",
            "SEO",
            "AI Search Optimization",
            "Technical SEO",
            "Business Automation",
            "Social Media Advertising",
            "Full-Stack Development",
          ]
        : locale === "ar"
          ? [
              "تطوير الويب",
              "Next.js",
              "React",
              "تحسين محركات البحث",
              "تحسين البحث بالذكاء الاصطناعي",
              "SEO التقني",
              "أتمتة الأعمال",
              "إعلانات وسائل التواصل الاجتماعي",
              "تطوير Full-Stack",
            ]
          : [
              "Développement Web",
              "Next.js",
              "React",
              "SEO",
              "Optimisation de la recherche par IA",
              "SEO technique",
              "Automatisation des affaires",
              "Publicité sur les réseaux sociaux",
              "Développement Full-Stack",
            ],
    areaServed: [
      { "@type": "Country", name: "Morocco" },
      { "@type": "Place", name: "Worldwide (Remote)" },
    ],
    sameAs: [
      social.linkedin,
      social.instagram,
      social.facebook,
      social.github,
    ].filter(Boolean),
    provider: { "@id": founderId },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: name,
      description: description,
      itemListElement: services.map((svc, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: svc.name,
          description: svc.description,
          provider: { "@id": orgId },
          areaServed: { "@type": "Country", name: "Morocco" },
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
