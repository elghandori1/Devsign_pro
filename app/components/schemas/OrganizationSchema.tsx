// app/components/schemas/OrganizationSchema.tsx
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

export function OrganizationSchema({
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
    "@type": ["Organization", "ProfessionalService"],
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
    knowsAbout: [
      "Web Development",
      "Next.js",
      "React",
      "SEO",
      "AI Search Optimization",
      "Technical SEO",
      "Business Automation",
      "Social Media Advertising",
      "Full-Stack Development",
    ],
    areaServed: [
      { "@type": "Country", name: "Morocco" },
      { "@type": "Place", name: "Worldwide (Remote)" },
    ],
    sameAs: [social.linkedin, social.instagram, social.facebook, social.github].filter(Boolean),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Services",
      itemListElement: services.map((svc, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          "@id": `${baseUrl}/#service-${index + 1}`,
          name: svc.name,
          description: svc.description,
          provider: { "@id": orgId },
          areaServed: { "@type": "Country", name: "Morocco" },
        },
      })),
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}