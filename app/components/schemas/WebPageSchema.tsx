// app/components/schemas/WebPageSchema.tsx
interface Props {
  baseUrl: string;
  locale: string;
  title: string;
  description: string;
  route?: string;
  ogImagePath?: string;
}

export function WebPageSchema({
  baseUrl,
  locale,
  title,
  description,
  route = "",
  ogImagePath = "/cover/Designpro-cover.jpg",
}: Props) {
  const currentUrl = `${baseUrl}/${locale}${route ? `/${route}` : ""}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${currentUrl}#webpage`,
    url: currentUrl,
    name: title,
    description,
    inLanguage: locale === "en" ? "en-US" : locale === "ar" ? "ar-MA" : "fr-MA",
    image: {
      "@type": "ImageObject",
      url: ogImagePath.startsWith("http")
        ? ogImagePath
        : `${baseUrl}${ogImagePath.startsWith("/") ? "" : "/"}${ogImagePath}`,
      width: 1200,
      height: 630,
    },
    isPartOf: { "@id": `${baseUrl}/#website`},
    about: { "@id": `${baseUrl}/#person` },
    mainEntity: { "@id": `${baseUrl}/#person` },
    dateModified: new Date().toISOString().split("T")[0],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}