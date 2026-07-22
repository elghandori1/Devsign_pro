// components/PortfolioSchema.tsx
import { getBaseUrl } from "@/app/lib/buildPageMetadata";
import info from "@/app/dictionaries/global.json";

interface Project {
  title: string;
  description: string;
  href: string;
  image: string;
  tech?: string;
}

interface PortfolioSchemaProps {
  locale: string;
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
    name: title,
    description: description,
    url: `${baseUrl}/${locale}/portfolio`,
    provider: {
      "@type": "ProfessionalService",
      name: "Devsignpro",
      url: baseUrl,
      telephone: info.phoneNumber,
      email: info.email,
      address: {
        "@type": "PostalAddress",
        addressCountry: "MA",
        addressLocality: info.address || "morocco",
      },
      serviceType:
        locale === "en"
          ? [
              "Web Development",
              "SEO Optimization",
              "AI Automation",
              "Dashboard Development",
            ]
          : locale === "ar"
            ? [
                "تطوير الويب",
                "تحسين SEO",
                "أتمتة الذكاء الاصطناعي",
                "تطوير لوحات التحكم",
              ]
            : [
                "Développement web",
                "Optimisation SEO",
                "Automatisation IA",
                "Développement dashboards",
              ],
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.title,
          description: project.description,
          url: `${baseUrl}/${locale}${project.href}`,
          image: `${baseUrl}${project.image}`,
          creator: {
            "@type": "Person",
            name: info.linkedinName || "devsignpro",
            url: baseUrl,
          },
          ...(project.tech && {
            keywords: project.tech.split(",").map((t) => t.trim()),
          }),
        },
      })),
    },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name:
          locale === "ar" ? "الرئيسية" : locale === "fr" ? "Accueil" : "Home",
        item: `${baseUrl}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: title,
        item: `${baseUrl}/${locale}/portfolio`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
