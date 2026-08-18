// app/components/schemas/WebSiteSchema.tsx
import { localeToBcp47, type Locale } from "@/i18n-config";

interface Props {
  baseUrl: string;
  locale: string;
  description: string;
}

export function WebSiteSchema({ baseUrl, locale, description }: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: "Devsignpro",
    description,
    inLanguage: localeToBcp47(locale as Locale),
    publisher: {
      "@id": `${baseUrl}/#person`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
