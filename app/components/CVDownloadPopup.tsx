"use client";

import { useEffect, useState, type ReactNode } from "react";

interface CVOption {
  id: string;
  label: string;
  color: string;
  ringColor: string;
  fileName: string;
  description: string;
  icon: ReactNode;
}

interface CVDownloadPopupProps {
  buttonText: string;
  popupTitle: string;
  popupDescription: string;
  popupFooter: string;
  cvOptions: CVOption[];
  isRtl?: boolean;
}

export default function CVDownloadPopup({
  buttonText,
  popupTitle,
  popupDescription,
  popupFooter,
  cvOptions,
  isRtl = false,
}: CVDownloadPopupProps) {
  const [showCVPopup, setShowCVPopup] = useState(false);

  useEffect(() => {
    if (!showCVPopup) {
      return;
    }

    const body = document.body;
    const html = document.documentElement;
    const previousBodyOverflow = body.style.overflow;
    const previousHtmlOverflow = html.style.overflow;

    body.style.overflow = "hidden";
    html.style.overflow = "hidden";

    return () => {
      body.style.overflow = previousBodyOverflow;
      html.style.overflow = previousHtmlOverflow;
    };
  }, [showCVPopup]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowCVPopup(false);
      }
    };

    if (showCVPopup) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [showCVPopup]);

  return (
    <>
      <button
        onClick={() => setShowCVPopup(true)}
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
      </button>

      {showCVPopup && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center p-2 sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cv-popup-title"
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowCVPopup(false)}
            aria-hidden="true"
          />

          <div
            className={`relative w-full overflow-hidden rounded-t-3xl border border-border bg-card p-4 shadow-2xl sm:max-w-sm sm:rounded-2xl sm:p-6 max-h-[calc(100dvh-1rem)] sm:max-h-[90vh] ${isRtl ? "text-right" : "text-left"}`}
          >
            <div className="flex max-h-[calc(100dvh-2rem)] sm:max-h-[calc(90vh-3rem)] flex-col overflow-hidden">
              <div className="sm:hidden flex justify-center mb-3">
                <div className="h-1 w-10 rounded-full bg-border" />
              </div>

              <button
                onClick={() => setShowCVPopup(false)}
                className={`absolute top-3 sm:top-4 ${isRtl ? "left-3 sm:left-4" : "right-3 sm:right-4"} rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground touch-manipulation`}
                aria-label="Close"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="mb-4 pr-10 text-center sm:mb-6 sm:pr-0">
                <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 sm:mb-3 sm:h-12 sm:w-12">
                  <svg
                    className="h-5 w-5 text-primary sm:h-6 sm:w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3
                  id="cv-popup-title"
                  className="text-base font-semibold text-foreground sm:text-lg"
                >
                  {popupTitle}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                  {popupDescription}
                </p>
              </div>

              <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1 -mr-1 sm:space-y-3">
                {cvOptions.map((cv) => {
                  const isDevOps = cv.id === "devops";
                  return (
                    <a
                      key={cv.id}
                      href={isDevOps ? undefined : `/CV/${cv.fileName}`}
                      download={!isDevOps}
                      onClick={(e) => {
                        if (isDevOps) {
                          e.preventDefault(); // Prevent navigation
                          return;
                        }
                        setShowCVPopup(false);
                      }}
                      className={`group flex items-center gap-3 rounded-xl border border-border p-3 transition-all ${
                        isDevOps
                          ? "opacity-50 cursor-not-allowed"
                          : "touch-manipulation hover:border-primary/30 hover:bg-muted/50 active:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
                      } sm:gap-4 ${cv.ringColor}`}
                      aria-disabled={isDevOps}
                      tabIndex={isDevOps ? -1 : 0}
                    >
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white sm:h-10 sm:w-10 ${cv.color}`}
                      >
                        {cv.icon}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                          {cv.label}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-muted-foreground">
                          {cv.description}
                        </p>
                      </div>

                      <svg
                        className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                    </a>
                  );
                })}
              </div>

              <p className="pt-3 text-center text-[10px] text-muted-foreground sm:pt-4 sm:text-xs">
                {popupFooter}
              </p>

              <div className="h-[env(safe-area-inset-bottom)] sm:h-0" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
