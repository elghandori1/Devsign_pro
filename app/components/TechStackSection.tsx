// components/TechStackSection.tsx
interface TechStackItem {
  name: string;
  use: string;
  why: string;
}

interface TechStackData {
  title: string;
  subtitle: string;
  items: TechStackItem[];
  extra: string;
}

interface TechStackSectionProps {
  data: TechStackData;
  headingId: string;
}

export default function TechStackSection({
  data,
}: TechStackSectionProps) {
  return (
    <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-2 sm:pt-4">
      <div className="max-w-7xl mx-auto">
          <p className="text-center mb-8 sm:mb-10 text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {data.subtitle}
          </p>
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 text-start">
          {data.items.map((item) => (
            <div
              key={item.name}
              className="rounded-2xl border border-border/60 bg-card p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/20"
            >
              <h3 className="text-lg font-bold text-primary">{item.name}</h3>
              <p className="mt-1 mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {item.use}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.why}
              </p>
            </div>
          ))}
        </div>

        <p className="text-xs sm:text-sm text-muted-foreground max-w-3xl mx-auto text-center leading-relaxed mt-8 sm:mt-10">
          {data.extra}
        </p>
      </div>
    </div>
  );
}
