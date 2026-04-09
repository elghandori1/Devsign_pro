interface GoalTranslations {
  title: string;
  description: string;
}

export default function Goalcomponent({ translations }: { translations: GoalTranslations }) {
  if (!translations) return null;

  return (
    <section className="py-14 sm:py-20 transition-colors duration-300 w-full">
      <div className=" mx-auto max-w-7xl">
        <div className="relative rounded-2xl bg-card dark:bg-card/70 border border-border/50 dark:border-border/50 shadow-lg dark:shadow-none overflow-hidden transition-colors duration-300">
          {/* Subtle gradient overlay for depth */}
          <div
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none"
            style={{
              background: "linear-gradient(135deg, rgb(37 99 235) 0%, transparent 60%)",
            }}
          />
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-6 tracking-tight">
              {translations.title}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground text-center max-w-2xl mx-auto leading-relaxed">
              {translations.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
