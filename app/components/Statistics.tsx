import { Users, Clock, BarChart3, Shield } from "lucide-react";

interface StatItem {
  value: number;
  prefix?: string;
  suffix?: string;
  text: string;
  subtext: string;
}

interface StatsTranslations {
  items: StatItem[];
}

export default function Statistics({
  translations,
  locale,
  id = "stats-heading",
}: {
  translations: StatsTranslations;
  locale: string;
  id?: string;
}) {
  if (!translations?.items) return null;

  const icons = [Users, Clock, BarChart3, Shield];

  const headingText =
    locale === "en"
      ? "Key Business Metrics and Achievements"
      : locale === "fr"
        ? "Principaux indicateurs et réalisations"
        : "المقاييس والإنجازات الرئيسية";

  return (
    <section
      className="max-w-7xl mx-auto px-4 py-12 sm:py-16 fade-in-section"
      aria-labelledby={id}
    >
      <div className="text-center mb-8 sm:mb-10">
        <h2 id={id} className="font-bold text-lg sm:text-xl uppercase shrink-0">
          {headingText}
        </h2>
        <div
          className="mt-3 mx-auto w-12 h-1 bg-primary rounded-full"
          aria-hidden="true"
        />
      </div>

      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 list-none p-0">
        {translations.items.map((item, idx) => {
          const Icon = icons[idx];

          return (
            <li
              key={`stat-${idx}`}
              className="stat-animate text-center group p-4 sm:p-6 rounded-2xl border border-border/50 bg-card/30 transition hover:bg-card hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
              style={{ animationDelay: `${idx * 120}ms` }}
            >
              {/* Icon */}
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300"
                aria-hidden="true"
              >
                <Icon className="w-6 h-6" />
              </div>

              <p className="font-bold text-3xl sm:text-4xl text-foreground tabular-nums">
                {item.prefix}
                {item.value}
                {item.suffix}
              </p>
              <h3 className="text-sm sm:text-base font-semibold text-foreground mt-2">
                {item.text}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                {item.subtext}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}