// components/PortfolioSchema.tsx
import { getBaseUrl } from "@/app/lib/buildPageMetadata";
import { serializeJsonLd } from "@/app/lib/serializeJsonLd";
import { localeToBcp47, type Locale } from "@/i18n-config";

interface Project {
  title: string;
  description: string;
  slug: string; 
  image: string;
  tech?: string[];
}

interface PortfolioSchemaProps {
  locale: Locale;
  title: string;
  description: string;
  projects: Project[];
}

export default function PortfolioSchema({
  locale,
  title,
  description,
  projects,
}: PortfolioSchemaProps) {
  const baseUrl = getBaseUrl();

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${baseUrl}/${locale}/portfolio#webpage`,
    "url": `${baseUrl}/${locale}/portfolio`,
    "name": title,
    "description": description,
    "inLanguage": localeToBcp47(locale),
    "isPartOf": { "@id": `${baseUrl}/#website` },
    "about": { "@id": `${baseUrl}/#person` },
    "mainEntity": {
      "@type": "ItemList",
      "@id": `${baseUrl}/${locale}/portfolio#projects-list`,
      "itemListElement": projects.map((project, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `${baseUrl}/${locale}/portfolio/${project.slug}`,
        "name": project.title,
        "item": {
          "@type": "CreativeWork",
          "name": project.title,
          "url": `${baseUrl}/${locale}/portfolio/${project.slug}`,
          "image": project.image.startsWith("http")
            ? project.image
            : `${baseUrl}${project.image}`,
          "author": { "@id": `${baseUrl}/#person` }
        }
      }))
    }
  };
  
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": locale === "fr" ? "Accueil" : "Home",
        "item": `${baseUrl}/${locale}`,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": locale === "ar" ? "معرض الأعمال" : "Portfolio",
        "item": `${baseUrl}/${locale}/portfolio`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />
    </>
  );
}
