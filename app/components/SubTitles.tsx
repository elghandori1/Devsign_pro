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
          <div className="flex-1 border-t border-gray-300"></div>
          <h2 className="text-blue-500 font-bold text-xl uppercase whitespace-nowrap">
            {sectionLabel}
          </h2>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Subtitle */}
        {/* <p className="text-gray-600 mt-2 text-sm sm:text-base">
          {subtext}
        </p> */}

        {/* Small blue Underline */}
        <div className="w-12 h-[2px] bg-blue-500 mx-auto mt-2"></div>
      </div>
    </div>
  );
}