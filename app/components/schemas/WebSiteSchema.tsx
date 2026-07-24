// app/components/schemas/WebSiteSchema.tsx

interface Props {
  baseUrl: string;
  locale: string;
  name: string;
  description: string;
}

export function WebSiteSchema({ baseUrl, locale, name, description }: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name,
    description,
    inLanguage: locale === "en" ? "en-US" : locale === "ar" ? "ar-MA" : "fr-MA",
    publisher: { "@id": `${baseUrl}/#organization` }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}