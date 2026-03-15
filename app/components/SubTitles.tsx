interface Translations {
  sectionLabel: string;
}

export default function SubTitle({ translations }: { translations: Translations }) {
  if (!translations) {
    return null;
  }
  const { sectionLabel } = translations;

  return (
<div className="bg-transparent py-6 sm:py-8 mt-6 sm:mt-8 px-2">
  <div className="max-w-screen-xl mx-auto text-center">
    <div className="flex items-center justify-center gap-3 sm:gap-4">
      <div className="flex-1 max-w-[80px] sm:max-w-none border-t border-foreground/20" />
      <h2 className="text-primary font-bold text-lg sm:text-xl uppercase shrink-0">
        {sectionLabel}
      </h2>
      <div className="flex-1 max-w-[80px] sm:max-w-none border-t border-foreground/20" />
    </div>
    <div
      className="w-12 h-[2px] bg-primary mx-auto mt-2"
      aria-hidden
    />
  </div>
</div>
  );
}