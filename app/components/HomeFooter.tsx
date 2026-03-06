import { Locale } from "@/i18n-config";

interface FooterTagsTranslations {
  title: string;
  tags: string[];
}

interface FooterTranslations {
  copyright: string;
  tagline: string;
}

interface HomeFooterProps {
  footerTags: FooterTagsTranslations;
  footer: FooterTranslations;
  locale: Locale;
}

export default function HomeFooter({ footerTags, footer, locale }: HomeFooterProps) {
  if (!footer) return null;
  const isRtl = locale === "ar";
  const year = new Date().getFullYear();
  const copyright = footer.copyright.replace("{year}", String(year));

  return (
    <footer
      role="contentinfo"
      className="border-t border-border bg-muted/20 py-10 sm:py-12 transition-colors duration-300"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {footerTags?.tags?.length > 0 && (
          <div className="text-center mb-8">
            <p className="text-sm font-medium text-muted-foreground mb-3">{footerTags.title}</p>
            <div className="flex flex-wrap justify-center gap-2">
              {footerTags.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full text-sm bg-muted/50 text-muted-foreground border border-border hover:border-primary/40 hover:text-foreground transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
        <div className="text-center pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground">{footer.tagline}</p>
          <p className="text-xs text-muted-foreground mt-2">{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
