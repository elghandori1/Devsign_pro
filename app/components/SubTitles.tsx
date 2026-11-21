interface SubTitleProps {
  sectionLabel: string;
  id?: string;
}

export default function SubTitle({ sectionLabel, id }: SubTitleProps) {
  if (!sectionLabel) return null;

  return (
    <div className="mt-2 bg-transparent px-2 py-4 sm:mt-4 sm:py-6">
      <div className="max-w-screen-xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          <div className="flex-1 min-w-6 max-w-[80px] sm:max-w-none border-t border-foreground/20" />
          <h2
            id={id}
            className="font-bold text-lg sm:text-xl uppercase min-w-0 text-center text-balance"
          >
            {sectionLabel}
          </h2>
          <div className="flex-1 min-w-6 max-w-[80px] sm:max-w-none border-t border-foreground/20" />
        </div>
         <div
          className="mt-3 mx-auto w-12 h-1 bg-primary rounded-full"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
