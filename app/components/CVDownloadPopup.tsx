interface CVDownloadPopupProps {
  buttonText: string;
  fileName: string;
}

export default function CVDownloadPopup({
  buttonText,
  fileName,
}: CVDownloadPopupProps) {
  return (
    <a
      href={`/CV/${fileName}`}
      download
      className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 sm:px-3 sm:py-2 border border-primary text-primary font-semibold rounded-lg text-xs sm:text-sm hover:bg-primary hover:text-primary-foreground active:scale-95 transition-all touch-manipulation"
    >
      <svg
        className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      <span className="whitespace-nowrap">{buttonText}</span>
    </a>
  );
}
