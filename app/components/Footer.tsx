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

export default function Footer({
  footerTags,
  footer,
  locale,
}: HomeFooterProps) {
  if (!footer) return null;

  const isRtl = locale === "ar";
  const year = new Date().getFullYear();
  const copyright = footer.copyright.replace("{year}", String(year));

  return (
    <footer
      role="contentinfo"
      dir={isRtl ? "rtl" : "ltr"}
      className="relative border-t border-border bg-gradient-to-b from-muted/10 via-muted/20 to-muted/40 py-14 sm:py-16 overflow-hidden"
    >
      {/* background glow */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.08),transparent_60%)]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* TAGS SECTION */}
        {footerTags?.tags?.length > 0 && (
          <div className="text-center mb-10 sm:mb-12">
            <p className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-[0.2em] mb-6">
              {footerTags.title}
            </p>

            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {footerTags.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full text-xs sm:text-sm font-medium 
                  bg-card/70 backdrop-blur border border-border 
                  text-foreground/90 shadow-sm
                  hover:border-primary/60 hover:text-primary 
                  hover:bg-primary/5 hover:shadow-md
                  transition-all duration-300 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* BOTTOM PART */}
        <div className="text-center pt-8 border-t border-border/70 space-y-2">
          <p className="text-sm sm:text-base font-semibold tracking-wide text-foreground/90">
            {footer.tagline}
          </p>

          <p className="text-xs sm:text-sm text-muted-foreground">
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}