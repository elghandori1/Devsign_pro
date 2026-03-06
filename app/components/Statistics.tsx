import AnimatedCounter from "./AnimatedCounter";

interface StatsTranslations {
  years: string;
  projects: string;
  satisfaction: string;
  systems: string;
}
export default function Statistics({ translations }: { translations: StatsTranslations }) {
  if (!translations) {
    return null;
  }
  const stats = [
    { value: "3+", label: translations.years },
    { value: "9+", label: translations.projects },
    { value: "4+", label: translations.systems },
    { value: "98%", label: translations.satisfaction },
  ];

  return (
<section aria-labelledby="stats-title" className="transition-colors py-2 sm:py-10 border border-border bg-muted/5 backdrop-blur-md transition-colors duration-300 max-w-7xl mx-auto rounded-xl duration-300 fade-in-section">
  <div className="max-w-screen-xl px-4 mx-auto">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="group flex flex-col items-center text-center p-4 sm:p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-2">
            <AnimatedCounter value={stat.value} />
          </div>
          <p className="text-xs sm:text-sm md:text-base font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
            {stat.label}
          </p>
          <div className="w-12 h-0.5 bg-primary/20 rounded-full mt-3 group-hover:w-16 group-hover:bg-primary/40 transition-all duration-300"></div>
        </div>
      ))}
    </div>
  </div>
</section>
  );
}