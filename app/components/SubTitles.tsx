interface Translations {
  sectionLabel: string;
}

export default function SubTitle({ translations }: { translations: Translations }) {
  if (!translations) {
    return null;
  }
  const { sectionLabel } = translations;

  return (
    <div className="bg-transparent py-8 mt-8">
      <div className="max-w-screen-xl mx-auto text-center">
        <div className="flex items-center justify-center gap-4">
          <div className="flex-1 border-t border-border"></div>
          <h2 className="text-primary font-bold text-xl uppercase whitespace-nowrap">
            {sectionLabel}
          </h2>
          <div className="flex-1 border-t border-border"></div>
        </div>
        <div className="w-12 h-[2px] bg-primary mx-auto mt-2" aria-hidden />
      </div>
    </div>
  );
}